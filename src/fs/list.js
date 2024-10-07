import { checkFileExists, getFilePath, throwError } from './utils.js';
import CONSTANTS from './constants.js';
import { readdir } from 'fs/promises';

const list = async () => {
  const src = getFilePath(CONSTANTS.FILES_DIRNAME);
  const isSrcExist = await checkFileExists(src);
  if (!isSrcExist) {
    throwError();
  }
  try {
    const dirContent = await readdir(src);
    console.log(dirContent);
  } catch (error) {
    throw error;
  }
};

await list();
