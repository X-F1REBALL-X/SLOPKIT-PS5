/* Simple device family label for non-matching block screen. */
/* device.js?v=7 — bump query when changing (cache bust). */

function detectDeviceFromUa(ua) {
  ua = ua || "";
  if (/PlayStation 5/i.test(ua)) return "PS5";
  if (/PlayStation 4/i.test(ua)) return "PS4";
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPhone";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows NT|Macintosh|Mac OS X|CrOS|Linux/i.test(ua)) return "PC";
  if (/Mobile/i.test(ua)) return "Android";
  return "PC";
}

function formatDeviceHints(uaFallback, hints) {
  try {
    var platform = (hints && hints.platform) || "";
    if (!platform && navigator.userAgentData) {
      platform = navigator.userAgentData.platform || "";
    }
    if (/Android/i.test(platform)) return "Android";
    if (/iPhone|iOS|iPadOS/i.test(platform)) return "iPhone";
    if (/Windows|macOS|Mac|Linux|Chrome OS|ChromeOS/i.test(platform)) return "PC";
  } catch (e) {}
  return uaFallback || detectDeviceFromUa(navigator.userAgent || "");
}

function resolveDeviceLabel(ua, done) {
  var fallback = detectDeviceFromUa(ua);
  try {
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      navigator.userAgentData
        .getHighEntropyValues(["platform"])
        .then(function (hints) {
          done(formatDeviceHints(fallback, hints));
        })
        .catch(function () {
          done(fallback);
        });
      return;
    }
  } catch (e) {}
  done(fallback);
}
