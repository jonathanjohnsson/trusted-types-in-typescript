import joi from 'joi';

type alphaNum = 'a' | 'b'

type Id2 = {
  firstCharacter: alphaNum;
  secondCharacter: alphaNum;
  //...
};

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

export interface JobStatus {
  id: Id;
  status: boolean;
}
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
