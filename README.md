# SLOPKIT

PS5 jailbreak host by **X-F1REBALL-X**.

**Live:** [https://x-f1reball-x.github.io/SLOPKIT-PS5/](https://x-f1reball-x.github.io/SLOPKIT-PS5/)

## How to use

1. Open the site on the PS5 browser — the jailbreak starts automatically.
2. Wait for **Jailbreak completed successfully**.
3. Payload Manager loads automatically after the ELF loader.

Supported firmwares: about **9.00–12.00**.

## Credits

- Host UI: **X-F1REBALL-X**
- Exploit chain: [jordyidk/slopkit](https://github.com/jordyidk/slopkit)
- Egy, Sonic, Yenyen, Zeco, Gezine, Echostretch, Ufm42, TheFloW, John Tornblom, Flatz, Idlesauce, and the PS5 R&D Discord

## WebKit Autoloader (homescreen icon)

After a successful jailbreak, install the **PS5-WebKit-Autoloader** homescreen app from [PS5-WebKit-Autoloader](https://github.com/X-F1REBALL-X/PS5-WebKit-Autoloader).

1. Jailbreak once with this host.
2. In Payload Manager, send `payloads/webkit-autoloader-installer.elf` (or load it via elfldr on port 9021).
3. Reboot once.
4. Open **PS5-WebKit-Autoloader** from the PS5 homescreen.

After a successful jailbreak, this host also auto-sends `payload-manager.elf` and then the branded `webkit-autoloader-installer.elf` via elfldr.

