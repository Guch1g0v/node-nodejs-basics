import path from 'node:path';
import fs from 'node:fs/promises';

const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MESSAGE = 'FS operation failed';

const dirname = import.meta.dirname;
const pathToFile = path.join(dirname, 'files', FILE_NAME);

const create = async () => {
  try {
    const isFileExists = await fs
      .access(pathToFile, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (isFileExists) {
      throw new Error(ERROR_MESSAGE);
    }
    await fs.writeFile(pathToFile, FILE_CONTENT);
  } catch (e) {
    throw e;
  }
};

await create();
