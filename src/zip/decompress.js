import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const decompress = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcPath = path.resolve(__dirname, 'files', 'archive.gz');
    const destPath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
    const src = createReadStream(srcPath);
    const dest = createWriteStream(destPath);
    const gunzip = createGunzip();
    await pipeline(src, gunzip, dest);
  } catch (error) {
    throw error;
  }
};

await decompress();
