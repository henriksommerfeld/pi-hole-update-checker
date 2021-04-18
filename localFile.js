import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const savedVersionFilePath = path.resolve(
  path.resolve(''),
  './last-checked-version.json'
);

export function getLastCheckedVersion() {
  if (!existsSync(savedVersionFilePath)) {
    return {
      core: '0.0',
      adminLte: '0.0',
      ftl: '0.0',
    };
  }

  const lastCheckedVersion = readFileSync(savedVersionFilePath, 'utf8');
  return JSON.parse(lastCheckedVersion);
}

export function saveLastCheckedVersion(version) {
  writeFileSync(savedVersionFilePath, JSON.stringify(version));
}
