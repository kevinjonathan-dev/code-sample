/**
 *
 * @param str
 * @returns
 */
export const camelCaseToSentence = (str: string): string => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {
    return str.toUpperCase();
  });
};

/**
 * Remove spaces from email
 * @param email
 * @returns string
 */

export const sanitizeEmail = (email: string): string => {
  return email.replace(/\s/g, '');
};

/**
 * Capitalize first letter
 * @param string
 * @returns
 */
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Format date functino returns that date in a correct format
 * @param date
 * @returns
 */
export const formatDate = (date: string): string => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${day < 10 ? `0${day}` : day} ${months[month - 1]}. ${year}`;
};

/**
 *
 * @param num
 * @returns zero or positive number
 */
export const setMinZero = (num: number): number => (num < 0 ? 0 : num);

/**
 * Validate email
 * @param email
 * @returns
 */
export const validateEmail = (email: string | null): boolean => {
  if (email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  return false;
};

/**
 * Format data for dbRegion, industry, etc
 * @param string
 * @returns string
 */
export const formatData = (str: string): string =>
  str.replace(/\s+/g, '_').toLowerCase();

/**
 * Snake case to title case
 * @param string
 * @returns string
 */

export const snakeToTitleCase = (str: string): string => {
  return str
    .split('_')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
};

/**
 * Format to title case
 * @param string
 * @returns string
 */

export const toTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
};

export const toLocalDateTime = (date: Date) =>
  new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19);

/**
 * Parse emails separated by commas into array
 * @param emails
 * @returns array
 */

export const parseEmails = (emails: string): string[] => {
  const cleanString = emails.replace(/\s/g, '');

  return cleanString.split(',');
};

/**
 * Check is the object is empty
 * @param obj Object
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isObjectEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

/**
 * Truncate text
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */

export const truncateText = (text = '', length: number) => {
  if (text.length > length) {
    let truncatedText = text.slice(0, length);
    truncatedText = truncatedText.slice(0, truncatedText.lastIndexOf(' '));

    return `${truncatedText}...`;
  }

  return text;
};

/**
 * Parse file size to kb or mb
 * @param {number} size
 * @returns {string}
 */

export const parseFileSize = (size: number) => {
  if (size < 1000) {
    return `${size} bytes`;
  }

  if (size < 1000000) {
    return `${(size / 1000).toFixed(2)} kb`;
  }

  return `${(size / 1000000).toFixed(2)} mb`;
};

/**
 * Add all filter
 * @param {array} arr
 * @returns {array}
 */
