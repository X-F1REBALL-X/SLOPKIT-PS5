function detectDeviceFromUa(ua) {
  ua = ua || "";
  if (/PlayStation 5/i.test(ua)) return "PlayStation 5";
  if (/PlayStation 4/i.test(ua)) return "PlayStation 4";
  if (/PlayStation Vita|PS Vita/i.test(ua)) return "PS Vita";
  if (/iPhone/.test(ua)) {
    var im = /iPhone OS (\d+)[._](\d+)/.exec(ua);
    return im ? ("iPhone (iOS " + im[1] + "." + im[2] + ")") : "iPhone";
  }
  if (/iPad/.test(ua)) {
    var pm = /CPU OS (\d+)[._](\d+)/.exec(ua);
    return pm ? ("iPad (iPadOS " + pm[1] + "." + pm[2] + ")") : "iPad";
  }
  if (/Android/.test(ua)) {
    var am = /Android ([\d.]+)/.exec(ua);
    var brand = /;\s*([^;)]+?)\s+Build\//.exec(ua);
    var name = brand ? brand[1].replace(/\s+/g, " ").trim() : "Android phone";
    // Chrome freezes UA Android version at 10 — do not trust it alone
    if (am && (am[1] === "10" || am[1].indexOf("10.") === 0)) {
      return name + " (checking real Android version…)";
    }
    return am ? (name + " (Android " + am[1] + ")") : name;
  }
  if (/Windows NT/.test(ua)) {
    var wm = /Windows NT ([\d.]+)/.exec(ua);
    var ver = { "10.0": "10/11", "6.3": "8.1", "6.2": "8", "6.1": "7" };
    var w = wm ? (ver[wm[1]] || wm[1]) : "";
    return w ? ("Windows PC (" + w + ")") : "Windows PC";
  }
  if (/Macintosh|Mac OS X/.test(ua)) {
    var mm = /Mac OS X (\d+)[._](\d+)/.exec(ua);
    return mm ? ("Mac (macOS " + mm[1] + "." + mm[2] + ")") : "Mac";
  }
  if (/CrOS/.test(ua)) return "Chromebook";
  if (/Linux/.test(ua)) return "Linux PC";
  if (/Mobile/.test(ua)) return "Mobile device";
  return "Unknown device";
}

function formatDeviceHints(uaFallback, hints) {
  if (!hints) return uaFallback;
  var model = (hints.model || "").trim();
  var platVer = (hints.platformVersion || "").trim();
  var platform = (hints.platform || "").trim();
  if (!platform && navigator.userAgentData) {
    platform = navigator.userAgentData.platform || "";
  }
  if (/Android/i.test(platform) || /Android/i.test(uaFallback)) {
    var ver = platVer ? platVer.split(".")[0] : "";
    if (model && ver) return model + " (Android " + ver + ")";
    if (model) return model + " (Android)";
    if (ver) return "Android phone (Android " + ver + ")";
  }
  if (model && platVer) return model + " (" + platform + " " + platVer + ")";
  if (model) return model;
  return uaFallback;
}

function resolveDeviceLabel(ua, done) {
  var fallback = detectDeviceFromUa(ua);
  try {
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      navigator.userAgentData
        .getHighEntropyValues(["model", "platformVersion", "platform"])
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
