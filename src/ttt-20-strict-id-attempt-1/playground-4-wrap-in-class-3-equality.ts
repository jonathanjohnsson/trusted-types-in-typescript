// Attempt: wrap the id value in a class, practical considerations

// Give Id its own type
export interface JobStatus {
  id: Id;
  status: boolean;
}

// Wrap the id value
// Use a class to enforce validation
// (Mention TypeScript's `as` here: if you use it without discipline, all hope is lost.)
export class Id {
  // Adding a `private` or `protected` fields can be used to make our type
  // unique: https://www.typescriptlang.org/docs/handbook/classes.html
  private readonly type: string = 'Id';
  public readonly value: string; // length 8, no spaces

  constructor(unvalidatedId: unknown) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    const idAny = unvalidatedId as any;
    if ((idAny?.length !== 8 || idAny?.includes(' '))) {
      throw new Error(`Failed to create Id. Bad value: ${unvalidatedId}`);
    }
    this.value = idAny;
  }

  // Conveniently copy this now :)
  public equals(other: Id): boolean {
    return this.value === other.value;
  }
}

// Expects an object looking like { id: '12345678', status: true }
export function createJobStatusOrThrow(obj: unknown): JobStatus {
  const objAny = obj as any;

  const id = new Id(objAny.id);
  // Validate obj
  if ((objAny.status !== true && objAny.status !== false)) {
    throw new Error('JobStatus validation failed');
  }

  // Since we wrapped Id we can't just case obj,
  // we have to construct a JobStatus ourselves:
  return {
    id: id,
    status: objAny.status
  };
}

/* Practical consideration: equality */

const id1 = new Id('11111111');
const id2 = new Id('11111111');

// Beware of accidental object reference comparison
if (id1 === id2) {
  console.log('Do stuff');
} else {
  console.log('Don\'t do stuff'); // you will end up here
}

// You probably want to compare the wrapped values
if (id1.value === id2.value) {
  console.log('Do stuff'); // you will end up here
} else {
  console.log('Don\'t do stuff');
}

// // Conveniently copy this now :)
// public equals(other: Id): boolean {
//   return this.value === other.value;
// }

// You can't overload the == or === operators in JavaScript,
// but you could try to make it easier to do equality check by value
// by adding an `equals` method to your class
if (id1.equals(id2)) {
  console.log('Do stuff'); // you will end up here
} else {
  console.log('Don\'t do stuff');
}

// Not ideal.
