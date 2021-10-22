// Attempt: Tag the value in a clever way using TypeScript

// Give Id its own type
export interface JobStatus {
  id: Id;
  status: boolean;
}

class IdBrand {
  private readonly brand = 'Id';
}

export type Id = string & IdBrand; // length 8, no spaces

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
const myAlmostCorrectId = 'not really an id';
setStatus(myAlmostCorrectId, true);


// This doesn't work ...
type OldBrand<K, T> = K & { __brand: T };
type Country = OldBrand<string, 'Country'>;
const country = 'Sweden' as Country;
setStatus(country, true);

// ... and neither does this!
type OtherId = Brand<string, 'Id'>;
const otherId = '12345678' as OtherId;
setStatus(otherId, true);

// Trying to be really evil again
class OtherIdBrand {
  private readonly brand = 'Id';
}
// Can't use IdBrand here in the real world because it isn't exported.
export type OtherId2 = string & OtherIdBrand;
const otherId2 = '12345678' as OtherId2;
setStatus(otherId2, true);

// Also, the brand property is not accessible.
jobStatus.id.brand;
