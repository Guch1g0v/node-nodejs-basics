import { open } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CONSTANTS from './constants.js';

const { FILES_DIRNAME, NEW_FILE_NAME, FILE_CONTENT, ERROR_MESSAGE } = CONSTANTS;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  try {
    const filePath = path.resolve(__dirname, FILES_DIRNAME, NEW_FILE_NAME);
    const file = await open(filePath, 'wx');
    await file.writeFile(FILE_CONTENT);
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(ERROR_MESSAGE);
    }
    throw error;
  }
};

await create();
