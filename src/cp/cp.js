import { fork } from 'child_process';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptJs = path.resolve(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = fork(scriptJs, args, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(data, 'utf8');
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
