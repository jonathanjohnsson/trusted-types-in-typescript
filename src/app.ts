import { runApp } from './ttt-10-motivational-example/app';

// Data coming in from some endpoint.
// const unvalidatedJobStatus: unknown = { id: '12345678', status: true };
const unvalidatedJobStatus: unknown = { id: '12345678', status: false };

runApp(unvalidatedJobStatus);

setTimeout(() => ({}), 100);
