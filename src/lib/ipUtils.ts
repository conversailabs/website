/**
 * IP Address Utilities
 *
 * Helper functions to extract client IP addresses from NextRequest headers.
 * Handles various proxy configurations (Vercel, Cloudflare, nginx, etc.)
 */

import { NextRequest } from 'next/server';

/**
 * Extract the client's IP address from request headers
 *
 * Checks multiple headers in order of preference:
 * 1. X-Forwarded-For (most common, used by proxies/load balancers)
 * 2. X-Real-IP (used by nginx and some proxies)
 * 3. CF-Connecting-IP (Cloudflare specific)
 * 4. True-Client-IP (Cloudflare Enterprise)
 * 5. X-Client-IP (various proxies)
 * 6. Request IP (direct connection)
 *
 * @param request - NextRequest object
 * @returns IP address string or 'unknown' if not found
 */
export function getClientIp(request: NextRequest): string {
  // Try X-Forwarded-For header (most common)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs (client, proxy1, proxy2, ...)
    // The first IP is the original client
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    if (ips[0]) {
      return ips[0];
    }
  }

  // Try X-Real-IP header (used by nginx)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Try Cloudflare headers
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const trueClientIp = request.headers.get('true-client-ip');
  if (trueClientIp) {
    return trueClientIp;
  }

  // Try X-Client-IP
  const clientIp = request.headers.get('x-client-ip');
  if (clientIp) {
    return clientIp;
  }

  // If all else fails, return unknown
  return 'unknown';
}

/**
 * Validate if a string is a valid IP address (IPv4 or IPv6)
 *
 * @param ip - IP address string to validate
 * @returns true if valid IP, false otherwise
 */
export function isValidIp(ip: string): boolean {
  if (!ip || ip === 'unknown') return false;

  // IPv4 pattern
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;

  // IPv6 pattern (simplified)
  const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}

/**
 * Anonymize IP address for privacy (removes last octet for IPv4)
 *
 * @param ip - IP address to anonymize
 * @returns Anonymized IP address
 */
export function anonymizeIp(ip: string): string {
  if (!isValidIp(ip)) return ip;

  // For IPv4, replace last octet with 0
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      parts[3] = '0';
      return parts.join('.');
    }
  }

  // For IPv6, replace last segment
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length > 0) {
      parts[parts.length - 1] = '0';
      return parts.join(':');
    }
  }

  return ip;
}
