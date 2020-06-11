
import { getLatestStableVersion } from './latest-version-checker.js';
import { sendPushoverNotification } from './notify.js';
import { getLastCheckedVersion, saveLastCheckedVersion } from './localFile.js';

async function main() {
  try {
    const lastCheckedVersion = getLastCheckedVersion();
    console.log("main -> lastCheckedVersion", lastCheckedVersion)
    const latestVersion = await getLatestStableVersion();
    
    if (latestVersion !== lastCheckedVersion) {
      const message = `🥧 New version ${latestVersion} is now available 🕳 
      
      Upgrade with 'pihole -up'`;
      sendPushoverNotification(message);
      saveLastCheckedVersion(latestVersion);
    }
    else {
      const message = `ℹ No upgrade for Pi-hole, ${latestVersion} is the latest.`;
      sendPushoverNotification(message);
    }
  } catch (error) {
    console.log("main -> error", error)
    const message = `⚠️ Pi-hole update check failed`;
    sendPushoverNotification(message);
  }
}

main(); 
  