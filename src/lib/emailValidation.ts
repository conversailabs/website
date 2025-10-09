/**
 * Email validation utilities for business email verification
 */

// List of personal/consumer email domains to block
const PERSONAL_EMAIL_DOMAINS = [
  // Gmail
  'gmail.com',
  'googlemail.com',

  // Microsoft
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',

  // Yahoo
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.co.in',
  'yahoo.ca',
  'yahoo.com.au',
  'yahoo.fr',
  'yahoo.de',
  'ymail.com',
  'rocketmail.com',

  // Apple
  'icloud.com',
  'me.com',
  'mac.com',

  // AOL
  'aol.com',
  'aim.com',

  // Privacy-focused
  'protonmail.com',
  'proton.me',
  'tutanota.com',
  'tutamail.com',

  // Other popular personal email providers
  'mail.com',
  'gmx.com',
  'gmx.net',
  'zoho.com',
  'zohomail.com',
  'yandex.com',
  'yandex.ru',
  'mail.ru',
  'rediffmail.com',
  'fastmail.com',
  'hushmail.com',
  'inbox.com',
];

/**
 * Check if an email address is a valid format
 */
export const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Extract domain from email address
 */
export const getEmailDomain = (email: string): string => {
  const parts = email.toLowerCase().trim().split('@');
  return parts.length === 2 ? parts[1] : '';
};

/**
 * Check if email domain is a personal/consumer email provider
 */
export const isPersonalEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  return PERSONAL_EMAIL_DOMAINS.includes(domain);
};

/**
 * Check if email is a valid business email
 * Returns true if valid business email, false if personal email or invalid
 */
export const isBusinessEmail = (email: string): boolean => {
  if (!isValidEmailFormat(email)) {
    return false;
  }

  return !isPersonalEmail(email);
};

/**
 * Get validation error message for email
 * Returns null if email is valid, error message string if invalid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }

  if (!isValidEmailFormat(email)) {
    return 'Please enter a valid email address';
  }

  if (isPersonalEmail(email)) {
    return 'Please use your work email address (Gmail, Outlook, Yahoo, etc. are not allowed)';
  }

  return null;
};

/**
 * Validate email and return both validity and error message
 */
export const validateBusinessEmail = (email: string): {
  isValid: boolean;
  error: string | null;
} => {
  const error = getEmailValidationError(email);
  return {
    isValid: error === null,
    error,
  };
};
