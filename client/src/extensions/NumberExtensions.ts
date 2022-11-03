declare global {
  interface Number {
    clamp(min: number, max: number): number;
  }
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this as number, min), max);
};

export {};
