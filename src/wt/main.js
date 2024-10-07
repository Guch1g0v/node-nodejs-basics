import { cpus } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerJS = path.resolve(__dirname, 'worker.js');

const createWorkerPromise = (n) => {
  return new Promise((resolve) => {
    const worker = new Worker(workerJS);
    worker.postMessage(n);
    worker.on('message', (result) => {
      resolve(result);
    });
  });
};

const cpuCores = cpus();
const STARTING_NUMBER = 10;

const performCalculations = async () => {
  const results = [];
  cpuCores.forEach((_, i) => {
    results.push(createWorkerPromise(STARTING_NUMBER + i));
  });
  console.log(await Promise.all(results));
};

await performCalculations();
