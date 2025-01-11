// Add TypeScript interface for NavigatorUAData if not already defined
interface NavigatorUAData {
  platform: string;
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
}

export type Platform = 'mac' | 'windows' | 'linux' | 'other';

/**
 * Detects the current platform using modern APIs with fallbacks. Yes, this is a browser sniff. No, in most cases it
 * shouldn't be used. Currently, the use case is for displaying platform-specific keyboard shortcuts through the
 * `<quiet-hotkey>` component which, to the best of my knowledge, can't be reliably feature-detected.
 */
export function detectPlatform(): Platform {
  // Try using modern navigator.userAgentData first
  if ('userAgentData' in navigator) {
    const uaData = navigator.userAgentData as NavigatorUAData;
    const platform = uaData.platform.toLowerCase();

    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    if (platform.includes('linux')) return 'linux';
  }

  // Fallback to userAgent string if userAgentData is not available
  const userAgent = navigator.userAgent.toLowerCase();

  if (/macintosh|mac os x|mac|ipad|iphone|ipod/.test(userAgent)) return 'mac';
  if (/win/.test(userAgent)) return 'windows';
  if (/linux|android|unix|bsd/.test(userAgent)) return 'linux';

  return 'other';
}
