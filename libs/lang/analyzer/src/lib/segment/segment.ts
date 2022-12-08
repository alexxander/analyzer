import { spawn } from 'child_process';
import path from 'path';
import { BaseToken } from '../utils/tokens';

const process = spawn('python3', [path.join(__dirname, './segment.py')]);

export async function segment(text: string): Promise<BaseToken[]> {
  return new Promise((resolve, reject) => {
    const off = () => {
      process.stdout.off('data', onStdOut);
      process.stderr.off('data', onStdErr);
    };
    const onStdOut = (data: Buffer) => {
      off();
      resolve(JSON.parse(data.toString()));
    };
    const onStdErr = (data: Buffer) => {
      off();
      reject(data.toString());
    };

    process.stdout.on('data', onStdOut);
    process.stderr.once('data', onStdErr);

    process.stdin.write(text.trim().replace(/\n/g, '\\n') + '\n');
  });
}

export function stopSegmentProcess() {
  return process.kill('SIGINT');
}
