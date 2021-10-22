// Attempt: Tag the value in a clever way using TypeScript

// Give Id its own type
export interface JobStatus {
  id: Id;
  status: boolean;
}

// Branding with a unique symbol doesn't seem to work when branding primitives.
// declare const IdBrand: unique symbol;
// export type Id = string & typeof IdBrand; // length 8, no spaces

export type Id = string & { readonly __brand: unique symbol; readonly __brandName: 'Id' };

// Consider using `unvalidatedId: string` instead.
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

// This doesn't work:
const myAlmostCorrectId: Id = 'not really an id';
setStatus(myAlmostCorrectId, true);

// This doesn't work ...
type Country = string & { readonly __brand: unique symbol; __brandName: 'Id' };
const country = 'Sweden' as Country;
setStatus(country, true);

// The brand property is accessible in this case :(.
jobStatus.id.__brand;
jobStatus.id.__brandName;
