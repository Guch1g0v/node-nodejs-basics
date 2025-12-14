import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, CONSTANTS.fs.files);
  const destPath = path.join(__dirname, CONSTANTS.fs.filesCopy);
  const isSrcExists = await isFileExists(srcPath);
  const isDestExists = await isFileExists(destPath);
  if (!isSrcExists || isDestExists) {
    throw new Error(ERRORS.fs.operationFailed);
  }
  await fs.cp(srcPath, destPath, { recursive: true });
};

await copy();
