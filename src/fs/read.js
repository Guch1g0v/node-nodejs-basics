import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';
import { createReadStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filename = 'fileToRead.txt';
  const filePath = path.join(__dirname, CONSTANTS.fs.files, filename);
  if (!(await isFileExists(filePath))) {
    throw new Error(ERRORS.fs.operationFailed);
  }
  const fileStat = await fs.stat(filePath);
  if (!fileStat.isFile()) {
    throw new Error(ERRORS.fs.operationFailed);
  }
  const readableStream = createReadStream(filePath);
  readableStream.pipe(process.stdout);
  readableStream.on('end', () => {
    process.stdout.write('\n');
  });
};

await read();
