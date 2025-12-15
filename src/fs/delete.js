import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';

const remove = async () => {
  const fileNameToRemove = 'fileToRemove.txt';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, CONSTANTS.fs.files, fileNameToRemove);
  if (!(await isFileExists(filePath))) {
    throw new Error(ERRORS.fs.operationFailed);
  }
  await fs.rm(filePath, { recursive: true });
};

await remove();
