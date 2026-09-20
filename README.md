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

After a successful jailbreak, you can install [PLK WebKit Autoloader](https://github.com/itsPLK/ps5-webkit-autoloader) so the next boots use a homescreen app instead of typing a URL.

1. Jailbreak once with this site (browser).
2. In Payload Manager, send `payloads/webkit-autoloader-installer.elf` (or load it via elfldr on port 9021).
3. Reboot once.
4. Open **WebKit Autoloader** from the PS5 homescreen.

Note: Autoloader uses PLK's built-in exploit host, not this site's custom UI.
