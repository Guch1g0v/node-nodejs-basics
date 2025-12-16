import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS, ERRORS, isFileExists } from './helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });
const timeFormatter = new Intl.DateTimeFormat('en', {
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
      const stat = await fs.lstat(fullPath);
      let type = 'file';
      if (dirent.isDirectory()) {
        type = 'directory';
      } else if (dirent.isSymbolicLink()) {
        type = 'symlink';
      }
      const birthtime = stat.birthtime;
      const month = monthFormatter.format(birthtime);
      const day = dayFormatter.format(birthtime);
      const time = timeFormatter.format(birthtime);
      const info = {
        type,
        size: stat.size,
        date: `${month} ${day} ${time}`,
        name: dirent.name,
      };
      return info;
    })
  );
  console.table(results);
};

await list();
