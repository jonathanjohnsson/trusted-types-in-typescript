// Attempt: Wrap the id value in a class

// Give Id its own type
export interface JobStatus {
  id: Id;
  status: boolean;
}

// Wrap the id value
// Use a class to enforce validation
export class Id {
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

// But this still works...:
const myAlmostCorrectId = { value: 'not really an id' };
setStatus(myAlmostCorrectId, true);

// ... as does this:
class Country {
  constructor(public readonly value: string) {}
}
const country = new Country('Sweden');
setStatus(country, true);

// TypeScript is structurally typed also for classes.

console.log('End of file');
