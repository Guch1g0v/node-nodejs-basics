import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = (n) => {
  return nthFibonacci(n);
};

parentPort.on('message', (n) => {
  try {
    const data = sendResult(n);
    parentPort.postMessage({ status: 'resolved', data });
    process.exit(0);
  } catch (error) {
    parentPort.postMessage({ status: 'error', data: null });
    process.exit(1);
  }
});
