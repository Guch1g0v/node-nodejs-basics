import CONSTANTS from './constants.js';
import { checkFileExists, getFilePath, throwError, getDirname } from './utils.js';
import { rm } from 'fs/promises';

const __dirname = getDirname(import.meta.url);

const remove = async () => {
  const fileToRemove = getFilePath(__dirname, CONSTANTS.FILES_DIRNAME, 'fileToRemove.txt');
  const isFileExist = await checkFileExists(fileToRemove);
  if (!isFileExist) {
    throwError();
  }
  try {
    rm(fileToRemove);
  } catch (error) {
    throw error;
  }
};

await remove();
