import { mkdir, copyFile, readdir } from 'fs/promises';
import path from 'path';
import CONSTANTS from './constants.js';
import { getDirname, getFilePath, throwError } from './utils.js';

const { FILES_DIRNAME, FILES_DIRNAME_COPY } = CONSTANTS;

const __dirname = getDirname(import.meta.url);

const copy = async () => {
  try {
    const src = getFilePath(__dirname, FILES_DIRNAME);
    const dest = getFilePath(__dirname, FILES_DIRNAME_COPY);
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
