import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { ReadStream } from 'fs';
import { finished } from 'stream/promises';

const calculateHash = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = path.resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');

    const fileStream = ReadStream(file);

    fileStream.on('data', (data) => {
      hash.update(data);
    });

    await finished(fileStream);
    console.log(hash.digest('hex'));
  } catch (error) {
    throw error;
  }
};

await calculateHash();
