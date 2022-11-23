export function getLatestVersion(uri: string) {
  return fetch(uri)
    .then((x) => x.json())
    .then((x) => x.name)
    .catch(Promise.reject);
}
