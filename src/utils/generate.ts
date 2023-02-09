/* eslint-disable import/prefer-default-export */
// generates an array of 4 random numbers that add up to a max value
export function generate4NumbersUnder(max = 100): number[] {
  function randombetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const r1 = randombetween(1, max - 3);
  const r2 = randombetween(1, max - 2 - r1);
  const r3 = randombetween(1, max - 1 - r1 - r2);
  const r4 = max - r1 - r2 - r3;

  const array = [r1, r2, r3, r4];

  return array;
}

export function generateNumberBetween(min = 1, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates session id from access token
 * @param accessToken
 * @returns {string} session id
 */
export function generateSessionId(accessToken: string): string {
  const sessionId = accessToken.split('.')[2];

  return sessionId;
}
