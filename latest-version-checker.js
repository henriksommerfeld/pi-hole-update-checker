import rp from 'request-promise';
import $ from 'cheerio';

export async function getLatestStableVersion() {
  try {
    const html = await rp('https://github.com/pi-hole/pi-hole/releases/');
    const links = $('main .release-entry .release-header a', html);
    const text = $(links[0]).text();
    return text;
  } catch (error) {
    Promise.reject(error);
  }
}
