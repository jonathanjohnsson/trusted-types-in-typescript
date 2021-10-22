// Validation that interconnects validation between different
// properties. Simple example:

type SumsToTen = {
  value1: number;
  value2: number;
} & { readonly __brand: unique symbol };

function createSumsToTenOrThrow(value1: number, value2: number): SumsToTen {
  if (value1 + value2 !== 10) {
    throw Error(`Failed to create SumsToTen. value1: ${value1}, value2: ${value2}`);
  }
  return { value1, value2 } as SumsToTen;
}

function sum(s: SumsToTen): number {
  return s.value1 + s.value2;
}

const s1 = createSumsToTenOrThrow(4, 9);
const result1 = sum(s1);

type FakeSumsToTen = {
  value1: number;
  value2: number;
} & { readonly __brand: unique symbol };

const s2 = { value1: 1, value2: 2} as FakeSumsToTen
const result2 = sum(s2);
