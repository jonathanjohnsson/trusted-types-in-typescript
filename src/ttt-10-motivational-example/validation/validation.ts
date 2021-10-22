export interface JobStatus {
  id: string; // length 8, no spaces
  status: boolean;
}

export function createJobStatusOrThrow(obj: unknown): JobStatus {

  // This parsing is not very careful, we will improve it later.

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable  @typescript-eslint/no-unsafe-call */
  const objAny = obj as any;

  // Validate that obj is actually a JobStatus object
  if ((objAny.id?.length !== 8 || objAny.id?.includes(' '))
    || (objAny.status !== true && objAny.status !== false)) {
    throw new Error('JobStatus validation failed');
  }

  // Promise TypeScript that the type of obj is JobStatus
  return obj as JobStatus;
}
