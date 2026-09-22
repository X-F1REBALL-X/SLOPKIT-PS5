# sjb

PS5 jailbreak host.

**Link:** https://x-f1reball-x.github.io/sjb/

![sjb](slopkit/sjb.jpg)

## Firmwares

**Supported: 9.00 – 12.00 only.**

Other firmwares will not work on this host. If you are on a different firmware, install [WK Autoloader](https://github.com/X-F1REBALL-X/WK-Autoloader) manually.

## What it does

After jailbreak, installs automatically (**no download needed**):

1. **Payload Manager** — opens while the jailbreak page is still open
2. **WK Autoloader** (homescreen app) — installs after that (uses the browser)

After reboot, open **WK Autoloader** from the homescreen to jailbreak again without the browser host.

The Autoloader updates **only if a newer version is available**. Same version is skipped.

## Important: Payload Manager auto-open

If Payload Manager is set to **open its page automatically**, **WK Autoloader will not install**.

Do one of these:

1. **Turn off** Payload Manager auto-open / auto page, then run the jailbreak again from this host — WK Autoloader installs automatically.
2. **Or** install manually: in Payload Manager, send `webkit-autoloader-installer.elf` (from this host / Releases).

## Offline

After the first visit caches the host, **no internet is needed** to jailbreak with sjb.

## Notes

### Block Sony updates (DNS)

1. Settings → Network → Set Up Internet Connection.
2. Use **Custom** setup.
3. DNS Settings: **Manual**.
4. Primary DNS: `62.210.38.117`
5. Leave Secondary DNS empty.
6. Save and test connection (fail to Sony is OK).

DNS by **Nomadic** — blocks official system updates.

## Setup

1. Set Nomadic DNS (see Notes)
2. Open the link on the PS5 browser (first visit: wait for cache)
3. Wait for the jailbreak to finish
4. **Payload Manager** opens first
5. Then **WK Autoloader** installs (browser may open the install page) — see Important above if it does not
6. Reboot
7. Open **WK Autoloader** from the homescreen

Homescreen app: [WK Autoloader](https://github.com/X-F1REBALL-X/WK-Autoloader)

## Credits

**Thanks**: jordyidk · TheFloW · Gezine · Echo Stretch · itsPLK · and the scene
