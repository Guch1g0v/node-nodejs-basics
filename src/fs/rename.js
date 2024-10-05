import { rename as fsRename } from 'fs/promises';
import { checkFileExists, getDirname, getFilePath, throwError } from './utils.js';
import CONSTANTS from './constants.js';

const __dirname = getDirname(import.meta.url);

const rename = async () => {
  const oldPath = getFilePath(__dirname, CONSTANTS.FILES_DIRNAME, 'wrongFilename.txt');
  const newPath = getFilePath(__dirname, CONSTANTS.FILES_DIRNAME, 'properFilename.md');
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
