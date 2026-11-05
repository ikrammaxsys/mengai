import { createWriteStream, type WriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { format } from 'node:util';

const METHODS = ['log', 'info', 'warn', 'error', 'debug'] as const;
let logStream: WriteStream | null = null;

function writeRawLog(level: string, message: string): void {
  logStream?.write(`[${new Date().toISOString()}] [${level}] ${message}\n`);
}

export async function initializeFileLogging(): Promise<void> {
  const logPath = resolve(process.env.SERVER_LOG_FILE || 'logs/server.txt');
  try {
    await mkdir(dirname(logPath), { recursive: true });
    const stream = createWriteStream(logPath, { flags: 'a' });
    await new Promise<void>((resolveOpen, rejectOpen) => {
      stream.once('open', () => resolveOpen());
      stream.once('error', rejectOpen);
    });
    logStream = stream;
    stream.on('error', (error) => {
      process.stderr.write(`[logger] Could not write ${logPath}: ${error.message}\n`);
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    process.stderr.write(`[logger] Could not open ${logPath}: ${detail}\n`);
    return;
  }

  for (const method of METHODS) {
    const original = console[method].bind(console);
    console[method] = (...args: unknown[]) => {
      writeRawLog(method.toUpperCase(), format(...args));
      original(...args);
    };
  }

  process.on('uncaughtExceptionMonitor', (error, origin) => {
    writeRawLog('UNCAUGHT', `${origin}: ${error.stack ?? error.message}`);
  });
  process.on('unhandledRejection', (reason) => {
    writeRawLog('UNHANDLED_REJECTION', format(reason));
  });

  console.log(`[logger] Writing server logs to ${logPath}`);
}
