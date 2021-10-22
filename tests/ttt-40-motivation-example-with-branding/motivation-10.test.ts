import { runApp } from '../../src/ttt-10-motivational-example/app';

describe('Set job state happy tests', () => {

  test('Set job to status: true', async () => {
    const unvalidatedJobStatus: unknown = { id: '12345678', status: true };
    const result = runApp(unvalidatedJobStatus);
    expect(result).toBe('success');
  });

  test('Set job to status: false', async () => {
    const unvalidatedJobStatus: unknown = { id: '12345678', status: false };
    const result = runApp(unvalidatedJobStatus);
    expect(result).toBe('success');
  });

});

describe('Set job state bad input tests', () => {

  test('Set job to status: true', async () => {
    const unvalidatedJobStatus: unknown = { id: '1234 5678', status: true };
    expect(() => runApp(unvalidatedJobStatus)).toThrow();
  });

});
