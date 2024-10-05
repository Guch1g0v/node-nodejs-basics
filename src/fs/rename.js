import { rename as fsRename } from 'fs/promises';
import { checkFileExists, getFilePath, throwError } from './utils.js';
import CONSTANTS from './constants.js';
const { FILES_DIRNAME } = CONSTANTS;

const rename = async () => {
  const oldPath = getFilePath(FILES_DIRNAME, 'wrongFilename.txt');
  const newPath = getFilePath(FILES_DIRNAME, 'properFilename.md');
  const isOldFileExists = await checkFileExists(oldPath);
  const isNewFileExists = await checkFileExists(newPath);
  if (!isOldFileExists || isNewFileExists) {
    throwError();
  }
  try {
    await fsRename(oldPath, newPath);
  } catch (error) {
    throw error;
  }
};

await rename();
