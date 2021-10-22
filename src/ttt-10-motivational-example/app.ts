import { createJobStatusOrThrow } from './validation/validation';
import { Database } from './service/service';

export function runApp(unvalidatedJobStatus: unknown): 'success' {
  const database = new Database();

  // Simulating receiving and validating a request from a client
  const jobStatus = createJobStatusOrThrow(unvalidatedJobStatus);

  // Executing the request
  return database.setJobStatus(jobStatus);
}
