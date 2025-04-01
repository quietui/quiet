import fs from 'fs/promises';
import { parse } from 'node-html-parser';
import path from 'path';

/**
 * Looks for matching `<img src="*.svg">` elements and outputs them inline, optionally altering colors.
 *
 * @param {Object} eleventyConfig - 11ty config object
 * @param {Object} options - Plugin options
 * @param {Object} options.colorMap - Map of original colors to replacement colors
 * @param {Function} options.shouldProcess - Function to determine if an image should be processed
 * @param {String} options.inputDir - Input directory for resolving SVG paths
 */
export function imgToSvgPlugin(eleventyConfig, options = {}) {
  const { colorMap = {}, inputDir = '.', shouldProcess = filename => filename.endsWith('.svg') } = options;

  // Register a transform to process HTML after it's been generated
  eleventyConfig.addTransform('svgColorsTransform', async function (content, outputPath) {
    // Only process HTML files
    if (!outputPath || !outputPath.endsWith('.html')) {
      return content;
    }

    try {
      const doc = parse(content);
      const allImages = doc.querySelectorAll('img');

      // Filter images based on shouldProcess function
      const svgImages = allImages.filter(img => {
        const src = img.getAttribute('src');
        return src && shouldProcess(src);
      });

      // If no matching images, return unmodified content
      if (!svgImages.length) {
        return content;
      }

      // Process each matched image
      for (const img of svgImages) {
        // Get the src and alt attributes
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || '';
        const classNames = img.getAttribute('class') || '';
        const styles = img.getAttribute('style') || '';

        if (!src) continue;

        // Calculate the filesystem path to the SVG
        const svgPath = path.join(inputDir, src);

        try {
          // Read the SVG file
          console.log('Processing SVG: ' + svgPath);
          const svgContent = await fs.readFile(svgPath, 'utf8');

          // Parse the SVG content
          const svgDom = parse(svgContent);
          const svgRoot = svgDom.querySelector('svg');

          if (!svgRoot) continue;

          // Add aria-label from alt text
          svgRoot.setAttribute('aria-label', alt);

          if (classNames) svgRoot.setAttribute('class', classNames);
          if (styles) svgRoot.setAttribute('style', styles);

          // Apply color replacements from colorMap
          let modifiedSvgContent = svgDom.toString();

          // Replace colors based on colorMap
          Object.entries(colorMap).forEach(([oldColor, newColor]) => {
            // Create a regex to replace all instances of the color
            // This handles different formats: named colors, hex, rgb, etc.
            const colorRegex = new RegExp(`(fill|stroke)=(["'])${oldColor}\\2`, 'gi');
            modifiedSvgContent = modifiedSvgContent.replace(colorRegex, `$1=$2${newColor}$2`);

            // Also handle inline styles with colors
            const styleRegex = new RegExp(`(fill|stroke):\\s*${oldColor}`, 'gi');
            modifiedSvgContent = modifiedSvgContent.replace(styleRegex, `$1: ${newColor}`);
          });

          // Replace the img tag with the modified SVG
          img.replaceWith(modifiedSvgContent);
        } catch (err) {
          console.error(`Error processing SVG ${src}:`, err);
        }
      }

      return doc.toString();
    } catch (err) {
      console.error('Error in svgColorsTransform:', err);
      return content;
    }
  });
}
