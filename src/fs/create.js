import { open } from 'fs/promises';
import CONSTANTS from './constants.js';
import { getFilePath, throwError } from './utils.js';

const { FILES_DIRNAME, NEW_FILE_NAME, FILE_CONTENT } = CONSTANTS;

const create = async () => {
  try {
    const filePath = getFilePath(FILES_DIRNAME, NEW_FILE_NAME);
    const file = await open(filePath, 'wx');
    await file.writeFile(FILE_CONTENT);
  } catch (error) {
    throwError(error);
  }
};

await create();
