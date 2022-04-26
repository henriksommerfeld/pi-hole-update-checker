import rp from "request-promise";

export async function getLatestVersion(uri) {
  try {
    const versionInfo = await rp({
      method: "GET",
      uri,
      headers: { "User-Agent": "my node script" },
    }).json();
    return versionInfo.name;
  } catch (error) {
    Promise.reject(error);
  }
}
