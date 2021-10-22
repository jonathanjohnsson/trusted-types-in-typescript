class AgeBrand { private readonly brand = 'Age'; }
export type Age = number & AgeBrand;

class HeightBrand { private readonly brand = 'Height'; }
export type Height = number & HeightBrand;

interface Person {
  readonly height: Height;
  readonly age: Age;
}

function ageFrom(value: number): Age {
  if (value > 0) {
    return value as Age;
  }
  throw new Error('Invalid age');
}

function heightFrom(value: number): Height {
  if (value > 0) {
    return value as Height;
  }
  throw new Error('Invalid height');
}

function formatAge(age: Age): string {
  return age.toFixed(0);
}

function formatHeight(height: Height): string {
  return height.toFixed(0);
}

const person: Person = { age: ageFrom(35), height: heightFrom(180) };
console.log(formatHeight(person.height));
console.log(formatAge(person.height));
