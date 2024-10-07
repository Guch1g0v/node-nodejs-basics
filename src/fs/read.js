import CONSTANTS from './constants.js';
import { getFilePath, checkFileExists, throwError } from './utils.js';
import { readFile } from 'fs/promises';

const read = async () => {
  const src = getFilePath(CONSTANTS.FILES_DIRNAME, 'fileToRead.txt');
  const isSrcExist = await checkFileExists(src);
  if (!isSrcExist) {
    throwError();
  }
  try {
    const content = await readFile(src, { encoding: 'utf8' });
    console.log(content);
  } catch (error) {
    throw error;
  }
};

await read();
