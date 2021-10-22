// Attempt: Tag the value in a clever way using TypeScript

// Taken from the last example here:
// https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands
// Long discussion on nominal typing here: https://github.com/Microsoft/TypeScript/issues/202
// Roadmap for adding nominal typing to Typescript: https://github.com/Microsoft/TypeScript/wiki/Roadmap

export interface JobStatus {
  id: Id;
  status: boolean;
}

// // Explaining intersection types: https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
// type Both = { a: string } & { b: string };
// const a_and_b: Both = { a: 'a', b: 'b'};
// console.log(a_and_b);

type Brand<K, T> = K & { __brand: T };

export type Id = Brand<string, 'Id'>; // length 8, no spaces
// Same as
//export type Id = string & { __brand: 'Id' };

// Brand<string, 'Id'> is the same type as `string & { __brand: 'Id' }`

export function createIdOrThrow(unvalidatedId: unknown): Id {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable  @typescript-eslint/no-unsafe-call */
  const idAny = unvalidatedId as any;
  if ((idAny?.length !== 8 || idAny?.includes(' '))) {
    throw new Error(`Failed to create Id. Bad value: ${unvalidatedId}`);
  }
  // Lie to TypeScript, for a good cause.
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

// This doesn't work:
type Country = Brand<string, 'Country'>;
const country = 'Sweden' as Country;
setStatus(country, true);

// But being more evil breaks it:
type OtherId = Brand<string, 'Id'>;
const otherId = '12345678' as OtherId;
setStatus(otherId, true);

// So TypeScript doesn't treat our Id type as unique.
// Could be fixed by namespacing your "brands" or similar.

// We also have the minor thing that TypeScript believes
// that this non-existing field exists.
jobStatus.id.__brand;


// Microsoft themselves apparently uses the name "brand" for this:
// https://github.com/Microsoft/TypeScript/issues/202#issuecomment-142144357
