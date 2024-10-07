import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = path.resolve(__dirname, 'files', 'fileToWrite.txt');
    const fileStream = createWriteStream(file);

    process.stdin.on('data', (data) => {
      fileStream.write(data);
    });

    process.stdin.on('end', () => {
      fileStream.close();
    });
  } catch (error) {
    throw error;
  }
};

await write();
