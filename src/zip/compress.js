import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const compress = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcPath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.resolve(__dirname, 'files', 'archive.gz');
    const src = createReadStream(srcPath);
    const dest = createWriteStream(destPath);
    const gzip = createGzip();
    await pipeline(src, gzip, dest);
  } catch (error) {
    throw error;
  }
};

await compress();
