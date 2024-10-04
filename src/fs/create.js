import { open } from 'fs/promises';
import path from 'path';
import CONSTANTS from './constants.js';
import { getDirname, throwError } from './utils.js';

const { FILES_DIRNAME, NEW_FILE_NAME, FILE_CONTENT } = CONSTANTS;

const __dirname = getDirname(import.meta.url);

const create = async () => {
  try {
    const filePath = path.resolve(__dirname, FILES_DIRNAME, NEW_FILE_NAME);
    const file = await open(filePath, 'wx');
    await file.writeFile(FILE_CONTENT);
  } catch (error) {
    throwError(error);
  }
};

await create();
