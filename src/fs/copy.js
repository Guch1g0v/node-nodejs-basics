import { mkdir, copyFile, readdir } from 'fs/promises';
import path from 'path';
import CONSTANTS from './constants.js';
import { checkFileExists, getFilePath, throwError } from './utils.js';

const { FILES_DIRNAME, FILES_DIRNAME_COPY } = CONSTANTS;

const copy = async () => {
  try {
    const src = getFilePath(FILES_DIRNAME);
    const isSrcExists = await checkFileExists(src);
    if (!isSrcExists) {
      throwError();
    }
    const dest = getFilePath(FILES_DIRNAME_COPY);
    await mkdir(dest);
    const files = await readdir(src);
    for (const file of files) {
      const fromSrc = path.join(src, file);
      const toDest = path.join(dest, file);
      await copyFile(fromSrc, toDest);
    }
  } catch (error) {
    throwError(error);
  }
};

await copy();
