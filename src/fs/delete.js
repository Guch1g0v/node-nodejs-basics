import CONSTANTS from './constants.js';
import { checkFileExists, getFilePath, throwError } from './utils.js';
import { rm } from 'fs/promises';

const remove = async () => {
  const fileToRemove = getFilePath(CONSTANTS.FILES_DIRNAME, 'fileToRemove.txt');
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
