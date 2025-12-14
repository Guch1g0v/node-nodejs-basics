import fs from 'node:fs/promises';

export const ERRORS = {
  fs: {
    operationFailed: 'FS operation failed',
  },
};

export const CONSTANTS = {
  fs: {
    files: 'files',
    filesCopy: 'files_copy',
  },
};

export const isFileExists = async (pathToFile) => {
  try {
    await fs.access(pathToFile);

    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
};
