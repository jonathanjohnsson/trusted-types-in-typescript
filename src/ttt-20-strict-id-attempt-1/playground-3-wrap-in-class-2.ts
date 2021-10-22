// Attempt: wrap the id value in a class

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

/******* Trying to use the type in a normal setting *******/

// Example implementing method from service.ts using our new Id type
function setStatus(_id: Id, _status: boolean): void {
  // Real world: status is set to `_status` for the job in some database

  // How would you convince yourself that _id is really a validated id?
}

// Trying to use setStatus

// Happy case works fine
const jobStatus = createJobStatusOrThrow({ id: '12345678', status: true });
setStatus(jobStatus.id, true);

// This no longer works...:
const myAlmostCorrectId = { value: 'not really an id' };
setStatus(myAlmostCorrectId, true);

// ... trying harder doesn't help ...
const myAlmostCorrectId2 = { value: 'not really an id', type: 'Id' };
setStatus(myAlmostCorrectId2, true);

// ... not even if we really try to be evil:
class Country {
  private readonly type: string = 'Id';
  constructor(public readonly value: string) {}
}
const country = new Country('Sweden');
setStatus(country, true);

// Success!

// Coming back to this question:
// How would you convince yourself that _id is really a validated id?
// * Control/Command+click `Id`, make sure the type looks correct
// * Perhaps search for `as Id` in your code



// Consider mentioning difference between TypeScript's `private`
// and JavaScript's private instance fields
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
