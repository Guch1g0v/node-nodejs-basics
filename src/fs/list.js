import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const list = async () => {
  const targetDir = path.join(__dirname, CONSTANTS.fs.files);
  if (!(await isFileExists(targetDir))) {
    throw new Error(ERRORS.fs.operationFailed);
  }
  const dirents = await fs.readdir(targetDir, { withFileTypes: true });
  const results = await Promise.all(
    dirents.map(async (dirent) => {
      const fullPath = path.join(targetDir, dirent.name);
      const { size, birthtime } = await fs.lstat(fullPath);
      let type = 'file';
      if (dirent.isDirectory()) {
        type = 'directory';
      } else if (dirent.isSymbolicLink()) {
        type = 'symlink';
      }

      return {
        type,
        size,
        date: `${dateFormatter.format(birthtime)}`,
        name: dirent.name,
      };
    })
  );
  console.table(results);
};

await list();
