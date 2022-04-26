import { getLatestVersion } from './latest-version-checker.js'
import { sendPushoverNotification } from './notify.js'
import { getLastCheckedVersion, saveLastCheckedVersion } from './localFile.js'

async function main() {
  try {
    const lastCheckedVersion = getLastCheckedVersion()
    console.log('main -> lastCheckedVersion', lastCheckedVersion)
    const corePromise = getLatestVersion(releasePages.core)
    const adminLtePromise = getLatestVersion(releasePages.adminLte)
    const ftlPromise = getLatestVersion(releasePages.ftl)
    const [latestCoreVersion, latestAdminLteVersion, latestFtlVersion] =
      await Promise.all([corePromise, adminLtePromise, ftlPromise])
    const latestVersions = {
      core: latestCoreVersion,
      adminLte: latestAdminLteVersion,
      ftl: latestFtlVersion,
    }
    if (JSON.stringify(latestVersions) !== JSON.stringify(lastCheckedVersion)) {
      const message = `🥧 New Pihole version available
Core: ${latestCoreVersion}
Admin LTE: ${latestAdminLteVersion}
FTL: ${latestFtlVersion}
Upgrade with 'pihole -up'`
      sendPushoverNotification(message)
      saveLastCheckedVersion(latestVersions)
    } else {
      const message = `ℹ No upgrade for Pi-hole`
      sendPushoverNotification(message)
    }
  } catch (error) {
    console.log('main -> error', error)
    const message = `⚠️ Pi-hole update check failed`
    sendPushoverNotification(message)
  }
}

const releasePages = {
  core: 'https://api.github.com/repos/pi-hole/pi-hole/releases/latest',
  adminLte: 'https://api.github.com/repos/pi-hole/AdminLTE/releases/latest',
  ftl: 'https://api.github.com/repos/pi-hole/FTL/releases/latest',
}

main()
