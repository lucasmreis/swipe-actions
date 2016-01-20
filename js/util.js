//
// Simple, pure functions
//

export const between = (x, min, max) =>
  x < min
    ? min
    : x > max
      ? max
      : x;
