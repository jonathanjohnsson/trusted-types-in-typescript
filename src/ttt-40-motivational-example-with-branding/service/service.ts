import { JobStatus, Id } from '../validation/validation';

export class Database {
  setJobStatus(jobStatus: JobStatus): 'success' {
    if (this.getCurrentStatus(jobStatus.id) === jobStatus.status) {
      console.log(`Status is already set to the expected value. id: ${jobStatus.id}, status: ${jobStatus.status}`);
      return 'success';
    }
    this.setStatus(jobStatus.id, jobStatus.status);
    console.log(`Set status for job: id: ${jobStatus.id}, status: ${jobStatus.status}`);
    return 'success';
  }

  getCurrentStatus(_id: Id): boolean {
    // Real world: currentStatus is picked up from some database, using _id
    const currentStatus = true;
    return currentStatus;
  }

  setStatus(_id: Id, _status: boolean): void {
    // Real world: status is set to `_status` for the job in some database

    // How would you convince yourself that _id is really a validated id?
  }
}
