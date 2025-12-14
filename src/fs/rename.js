import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';

const rename = async () => {
  const wrongFilename = 'wrongFilename.txt';
  const properFilename = 'properFilename.md';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const oldPath = path.join(__dirname, CONSTANTS.fs.files, wrongFilename);
  const newPath = path.join(__dirname, CONSTANTS.fs.files, properFilename);

  const isSrcExists = await isFileExists(oldPath);
  const isDestExists = await isFileExists(newPath);

  if (!isSrcExists || isDestExists) {
    throw new Error(ERRORS.fs.operationFailed);
  }

  await fs.rename(oldPath, newPath);
};

await rename();
