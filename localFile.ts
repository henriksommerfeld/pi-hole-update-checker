import { VersionInfo } from "./main.ts";

const savedVersionFilePath = "./last-checked-version.json";

export function getLastCheckedVersion(): VersionInfo {
  try {
    return JSON.parse(Deno.readTextFileSync(savedVersionFilePath));
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return {
        core: "0.0",
        adminLte: "0.0",
        ftl: "0.0",
      };
    }
    throw e;
  }
}

export function saveLastCheckedVersion(version: VersionInfo) {
  Deno.writeTextFileSync(savedVersionFilePath, JSON.stringify(version));
}
