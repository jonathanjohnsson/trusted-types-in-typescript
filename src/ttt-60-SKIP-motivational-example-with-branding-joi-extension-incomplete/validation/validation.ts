import joi, { CustomHelpers, ErrorReport, Extension } from 'joi';

class IdBrand { private readonly brand = 'Id'; }
export type Id = string & IdBrand; // length 8, no spaces
const idSchema = joi.string().length(8).alphanum();

export function createIdOrThrow(unvalidatedId: unknown): Id {
  const result = idSchema.validate(unvalidatedId);

  if (result.error) {
    throw result.error; //new Error(`Id validation failed: ${JSON.stringify(result.error)}`);
  }

  return result.value as Id;
}

export const idExtension: Extension = {
  type: 'id',
  validate: function (value: unknown, _helpers: CustomHelpers): unknown {
    try {
      const id = createIdOrThrow(value);
      return { value: id };
    } catch (err: unknown) {
      // Not the best error handling for now
      return { errors: err };
    }
  }
};

function addIdExtension<T extends joi.Root>(joi: T): T & { id: (...args: unknown[]) => joi.Schema } {
  return joi.extend(idExtension) as T & { id: (...args: unknown[]) => joi.Schema };
}

export interface JobStatus {
  id: Id;
  status: boolean;
}
const joiWithId = addIdExtension(joi);
const jobStatusSchema = joiWithId.object().keys({
  id: joiWithId.id(),
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
