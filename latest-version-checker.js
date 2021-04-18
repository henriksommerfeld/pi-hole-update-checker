import rp from 'request-promise';
import $ from 'cheerio';

export async function getLatestVersion(url) {
  try {
    const html = await rp(url);
    const links = $('main .release-entry .release-header a', html);
    const text = $(links[0]).text();
    return text;
  } catch (error) {
    Promise.reject(error);
  }
}
