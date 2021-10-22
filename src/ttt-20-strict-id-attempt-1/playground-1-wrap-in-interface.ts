// Attempt: Let start small: just wrap the id value in its own type
// to give it a name.

export interface JobStatus {
  id: Id;
  status: boolean;
}

export interface Id {
  value: string; // length 8, no spaces
}

// Expects an object looking like { id: '12345678', status: true }
export function createJobStatusOrThrow(obj: unknown): JobStatus {

  // This parsing is not very careful, we will improve it later.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable  @typescript-eslint/no-unsafe-call */

  const objAny = obj as any;

  // Validate obj
  if ((objAny.id?.length !== 8 || objAny.id?.includes(' '))
    || (objAny.status !== true && objAny.status !== false)) {
    throw new Error('JobStatus validation failed');
  }

  // Since we wrapped Id we can't just cast obj,
  // we have to construct a JobStatus ourselves:
  return {
    id: { value: objAny.id},
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

// But no enforced validation. TypeScript uses structural typing by default.
const myAlmostCorrectId = { value: 'not really an id' };
setStatus(myAlmostCorrectId, true);
