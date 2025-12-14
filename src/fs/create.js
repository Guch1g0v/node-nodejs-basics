import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';

const create = async () => {
  const fileName = 'fresh.txt';
  const fileContent = 'I am fresh and young';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToFile = path.join(__dirname, CONSTANTS.fs.files, fileName);
  if (await isFileExists(pathToFile)) {
    throw new Error(ERRORS.fs.operationFailed);
  }
  await fs.writeFile(pathToFile, fileContent);
};

await create();
