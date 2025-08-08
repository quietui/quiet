import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { parseSpaceDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './mesh-gradient.styles.js';

@customElement('quiet-mesh-gradient')
export class QuietMeshGradient extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Space-delimited hex colors for the gradient (e.g. "#ffcc00 #cc3388 #88bbee") */
  @property({ type: String }) colors = '#ff0000 #00ff00 #0000ff';

  /** Space-delimited coordinate pairs (e.g. "0.2,0.3 0.5,0.7") normalized 0-1. If empty, colors are distributed evenly. */
  @property({ type: String }) points = '';

  /** Width of the canvas in pixels */
  @property({ type: Number }) width = 400;

  /** Height of the canvas in pixels */
  @property({ type: Number }) height = 300;

  /** Interpolation method: "linear" or "smooth" */
  @property({ type: String }) interpolation = 'linear';

  /** Tension parameter for curve interpolation (0-1) */
  @property({ type: Number }) tension = 0.5;

  @query('canvas') canvas!: HTMLCanvasElement;

  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private resizeObserver: ResizeObserver | null = null;

  connectedCallback() {
    super.connectedCallback();

    // Watch for size changes on our host element
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Only update if size actually changed and we're using auto-sizing
        if (this.width === 400 && this.height === 400) {
          this.width = Math.floor(width);
          this.height = Math.floor(height);
        }
      }
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  firstUpdated() {
    this.initWebGL();
    this.setupProgram();
    this.draw();
  }

  updated(changedProperties: Map<string, any>) {
    // Handle canvas size changes
    if (changedProperties.has('width') || changedProperties.has('height')) {
      // Set the internal resolution
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Update WebGL viewport to match
      if (this.gl) {
        this.gl.viewport(0, 0, this.width, this.height);
      }
    }

    // Redraw on any property change
    this.draw();
  }

  private initWebGL() {
    this.gl = this.canvas.getContext('webgl', {
      // Use these options for better performance
      alpha: false,
      antialias: false,
      depth: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    }) as WebGLRenderingContext;

    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    this.gl.viewport(0, 0, this.width, this.height);
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private setupProgram() {
    if (!this.gl) return;

    // Simple vertex shader - just passes through positions
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader for static gradient rendering
    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 u_resolution;
      uniform vec3 u_colors[16];
      uniform vec2 u_positions[16];
      uniform int u_colorCount;
      uniform float u_blendIntensity;
      uniform int u_interpolation;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec3 color = vec3(0.0);
        float totalWeight = 0.0;

        // If no positions are provided, create a simple gradient
        if (u_colorCount == 1) {
          color = u_colors[0];
        } else {
          for (int i = 0; i < 16; i++) {
            if (i >= u_colorCount) break;

            vec2 pos = u_positions[i];
            float dist = distance(uv, pos);

            // Smooth gradient falloff with adjustable intensity
            float weight = 1.0 / (1.0 + dist * dist * u_blendIntensity);

            // Apply interpolation method
            if (u_interpolation == 1) {
              weight = pow(weight, 2.0);
            }

            color += u_colors[i] * weight;
            totalWeight += weight;
          }

          if (totalWeight > 0.0) {
            color /= totalWeight;
          }
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile our shaders
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Link them into a program
    this.program = this.gl.createProgram()!;
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error('Unable to link shader program:', this.gl.getProgramInfoLog(this.program));
      return;
    }

    // Create a full-screen quad (two triangles)
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1,
      -1, // bottom left
      1,
      -1, // bottom right
      -1,
      1, // top left
      1,
      1 // top right
    ]);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    // Tell WebGL how to read the position data
    const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  private parseColors(): number[][] {
    const colorStrings = parseSpaceDelimitedTokens(this.colors);
    return colorStrings.map(hex => {
      // Handle both #rgb and #rrggbb formats
      let cleanHex = hex.replace('#', '');
      if (cleanHex.length === 3) {
        cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
      }

      const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
      const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
      const b = parseInt(cleanHex.slice(4, 6), 16) / 255;
      return [r, g, b];
    });
  }

  private parsePoints(): number[][] {
    if (!this.points) {
      // If no points provided, distribute colors evenly
      const colors = this.parseColors();
      const positions: number[][] = [];

      if (colors.length === 1) {
        positions.push([0.5, 0.5]);
      } else if (colors.length === 2) {
        positions.push([0.2, 0.5], [0.8, 0.5]);
      } else if (colors.length === 3) {
        positions.push([0.2, 0.2], [0.8, 0.2], [0.5, 0.8]);
      } else if (colors.length === 4) {
        positions.push([0.2, 0.2], [0.8, 0.2], [0.2, 0.8], [0.8, 0.8]);
      } else {
        // Distribute in a circle for 5+ colors
        const angleStep = (Math.PI * 2) / colors.length;
        for (let i = 0; i < colors.length; i++) {
          const angle = i * angleStep;
          const x = 0.5 + Math.cos(angle) * 0.3;
          const y = 0.5 + Math.sin(angle) * 0.3;
          positions.push([x, y]);
        }
      }

      return positions;
    }

    const pointStrings = parseSpaceDelimitedTokens(this.points);
    return pointStrings.map(point => {
      const [x, y] = point.split(',').map(Number);
      return [x || 0, y || 0];
    });
  }

  private draw() {
    if (!this.gl || !this.program) return;

    // Clear to black
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);

    // Set resolution uniform
    const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

    // Parse and set color data
    const colors = this.parseColors();
    const flatColors = new Float32Array(16 * 3); // Pre-allocate for max colors
    colors.forEach((color, i) => {
      if (i < 16) {
        flatColors[i * 3] = color[0];
        flatColors[i * 3 + 1] = color[1];
        flatColors[i * 3 + 2] = color[2];
      }
    });

    const colorLocation = this.gl.getUniformLocation(this.program, 'u_colors');
    this.gl.uniform3fv(colorLocation, flatColors);

    const colorCountLocation = this.gl.getUniformLocation(this.program, 'u_colorCount');
    this.gl.uniform1i(colorCountLocation, Math.min(colors.length, 16));

    // Parse and set position data
    const positions = this.parsePoints();
    const flatPositions = new Float32Array(16 * 2); // Pre-allocate for max positions
    positions.forEach((pos, i) => {
      if (i < 16) {
        flatPositions[i * 2] = pos[0];
        flatPositions[i * 2 + 1] = 1.0 - pos[1]; // Flip Y to match typical coordinate system
      }
    });

    const positionLocation = this.gl.getUniformLocation(this.program, 'u_positions');
    this.gl.uniform2fv(positionLocation, flatPositions);

    // Set blend intensity based on tension (map tension 0-1 to blend intensity 1-10)
    const blendIntensity = 1 + (1 - this.tension) * 9;
    const blendLocation = this.gl.getUniformLocation(this.program, 'u_blendIntensity');
    this.gl.uniform1f(blendLocation, blendIntensity);

    // Set interpolation method
    const interpolationLocation = this.gl.getUniformLocation(this.program, 'u_interpolation');
    this.gl.uniform1i(interpolationLocation, this.interpolation === 'smooth' ? 1 : 0);

    // Draw our quad
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

  render() {
    return html` <canvas width="${this.width}" height="${this.height}"></canvas> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-mesh-gradient': QuietMeshGradient;
  }
}
