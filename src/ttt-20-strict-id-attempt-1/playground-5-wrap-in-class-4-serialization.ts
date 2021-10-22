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

/* Practical consideration: "deserialization and serialization" */

// Need to reconstruct the object during deserialization/validation

// Depending on what the endpoints you use expect, you
// might need to construct a new object for that as well:
const id = new Id('12345678');
const jobStatus = createJobStatusOrThrow({ id: id, status: true });

const serializedJobStatus = JSON.stringify(jobStatus);
console.log(serializedJobStatus);
// Prints
// '{"id":{"type":"Id","value":"12345678"},"status":true}'
// but perhaps you wanted
// '{"id":"12345678","status":true}'

// Need extra code to wrap and unwrap. Not ideal.
