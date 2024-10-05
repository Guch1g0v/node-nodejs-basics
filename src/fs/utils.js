import path from 'path';
import { fileURLToPath } from 'url';
import CONSTANTS from './constants.js';
import { access, constants } from 'fs/promises';

export const getDirname = (metaPathUrl) => {
  const __filename = fileURLToPath(metaPathUrl);
  return path.dirname(__filename);
};

export const throwError = (error) => {
  if (typeof error === 'undefined') {
    throw new Error(CONSTANTS.ERROR_MESSAGE);
  }
  if (error.code === 'EEXIST') {
    throw new Error(CONSTANTS.ERROR_MESSAGE);
  }
  throw error;
};

export const checkFileExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
};

export const getFilePath = (...args) => {
  return path.resolve(...args);
};
