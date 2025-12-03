import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Function to get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = resolve(__dirname, '..');

export function getFileContent(relativeFilePath: string): string {
    console.log(`Reading from file: ${relativeFilePath}`);
    const absoluteFilePath = resolve(baseDir, 'inputs', relativeFilePath);
    try {
        return readFileSync(absoluteFilePath, 'utf8');
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return '';
    }
}