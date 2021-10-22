import { createJobStatusOrThrow } from './validation/validation';
import { Database } from './service/service';

export function runApp(unvalidatedJobStatus: unknown): 'success' {
  const database = new Database();

  const jobStatus = createJobStatusOrThrow(unvalidatedJobStatus);

  return database.setJobStatus(jobStatus);
}
