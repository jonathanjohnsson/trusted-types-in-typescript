import joi from 'joi';

class IdBrand { private readonly brand = 'Id'; }
export type Id = string & IdBrand; // length 8, no spaces
const idSchema = joi.string().length(8).alphanum();

export function createIdOrThrow(unvalidatedId: unknown): Id {
  const result = idSchema.validate(unvalidatedId);

  if (result.error) {
    throw new Error(`Id validation failed: ${JSON.stringify(result.error)}`);
  }

  return result.value as Id;
}

class JobStatusBrand { private readonly brand = 'JobStatus'; }
export type JobStatus = {
  readonly id: Id;
  readonly status: boolean;
} & JobStatusBrand;

// Or you could write it as an intersection of the old interface
// and JobStatusBrand. Mention differences between type and interface
// (declaration merging, extending)

const jobStatusSchema = joi.object().keys({
  id: idSchema,
  status: joi.boolean().required()
}).required();

// Expects an object looking like { id: '12345678', status: true }
export function createJobStatusOrThrow(obj: unknown): JobStatus {
  const result = jobStatusSchema.validate(obj);

  if (result.error) {
    throw new Error(`JobStatus validation failed: ${JSON.stringify(result.error)}`);
  }

  return result.value as JobStatus;
}

const id = createIdOrThrow('12345678');
const jobStatus = createJobStatusOrThrow({ id, status: true });
const fakeJobStatus = { id: id, status: true };

function requiresJobStatus(_jobStatus: JobStatus): void {
  return;
}
requiresJobStatus(jobStatus);
requiresJobStatus(fakeJobStatus);
