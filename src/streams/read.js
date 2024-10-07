import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EOL } from 'os';

const read = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = path.resolve(__dirname, 'files', 'fileToRead.txt');
    const fileStream = createReadStream(file);
    fileStream.on('data', (data) => {
      process.stdout.write(`${data}${EOL}`, 'utf8');
    });
  } catch (error) {
    throw error;
  }
};

await read();
