import { EOL } from 'os';
import { Transform } from 'stream';

const transform = async () => {
  try {
    const transform = (data, _, callback) => {
      const str = data.toString().trim().split('').reverse().join('');
      callback(null, `${str}${EOL}`);
    };
    const transformStream = new Transform({
      transform,
    });

    process.stdin.pipe(transformStream).pipe(process.stdout);
  } catch (error) {
    throw error;
  }
};

await transform();
