// Attempt: Tag the value in a clever way using TypeScript

// Give Id its own type
export interface JobStatus {
  id: Id;
  status: boolean;
}

class IdBrand { private readonly brand = 'Id'; }

export type Id = string & IdBrand; // length 8, no spaces

export function createIdOrThrow(unvalidatedId: unknown): Id {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable  @typescript-eslint/no-unsafe-call */
  const idAny = unvalidatedId as any;
  if ((idAny?.length !== 8 || idAny?.includes(' '))) {
    throw new Error(`Failed to create Id. Bad value: ${unvalidatedId}`);
  }
  return idAny as Id;
}

// Expects an object looking like { id: '12345678', status: true }
export function createJobStatusOrThrow(obj: unknown): JobStatus {
  const objAny = obj as any;

  createIdOrThrow(objAny.id);
  // Validate obj
  if ((objAny.status !== true && objAny.status !== false)) {
    throw new Error('JobStatus validation failed');
  }

  // We haven't changed the values, so we can just cast the object.
  return objAny as JobStatus;
}

/* Practical consideration: equality */

const id1 = createIdOrThrow('11111111');
const id2 = createIdOrThrow('11111111');

// At runtime id1 and id2 are just strings.
if (id1 === id2) {
  console.log('Do stuff'); // you will end up here
} else {
  console.log('Don\'t do stuff');
}
