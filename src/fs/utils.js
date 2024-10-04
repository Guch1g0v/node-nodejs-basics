import path from 'path';
import { fileURLToPath } from 'url';
import CONSTANTS from './constants.js';

export const getDirname = (metaPathUrl) => {
  const __filename = fileURLToPath(metaPathUrl);
  return path.dirname(__filename);
};

export const throwError = (error) => {
  if (error.code === 'EEXIST') {
    throw new Error(CONSTANTS.ERROR_MESSAGE);
  }
  throw error;
};
