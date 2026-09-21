/* Device label for non-PS5 block screen. Prefer Client Hints; UA is fallback. */

var DEVICE_MODEL_NAMES = {
  // OnePlus (Oppo's CPH codes)
  CPH2747: "OnePlus 15",
  CPH2645: "OnePlus 13",
  CPH2653: "OnePlus 13",
  CPH2581: "OnePlus 12",
  CPH2573: "OnePlus 12",
  CPH2449: "OnePlus 11",
  CPH2423: "OnePlus 11",
  CPH2413: "OnePlus 10 Pro",
  CPH2415: "OnePlus 10T",
  CPH2417: "OnePlus Nord",
  CPH2451: "OnePlus Nord 3",
  CPH2493: "OnePlus Nord CE 3",
  // Samsung examples
  "SM-S928B": "Samsung Galaxy S24 Ultra",
  "SM-S918B": "Samsung Galaxy S23 Ultra",
  "SM-S911B": "Samsung Galaxy S23",
  "SM-G991B": "Samsung Galaxy S21",
  "SM-A546B": "Samsung Galaxy A54"
};

function marketingNameForModel(model) {
  if (!model) return "";
  var key = String(model).trim();
  if (DEVICE_MODEL_NAMES[key]) return DEVICE_MODEL_NAMES[key];
  var upper = key.toUpperCase();
  if (DEVICE_MODEL_NAMES[upper]) return DEVICE_MODEL_NAMES[upper];
  // Generic OnePlus / Oppo CPH family
  if (/^CPH\d+/i.test(key)) return "OnePlus";
  if (/^SM-/i.test(key)) return "Samsung";
  if (/^Pixel\s*\d/i.test(key)) return key;
  if (/^ONEPLUS/i.test(key)) return key.replace(/^ONEPLUS[\s_-]*/i, "OnePlus ");
  return "";
}

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
    var raw = brand ? brand[1].replace(/\s+/g, " ").trim() : "";
    var market = marketingNameForModel(raw);
    var name = market ? (market + " · " + raw) : (raw || "Android phone");
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
  var market = marketingNameForModel(model);
  var ver = platVer ? platVer.split(".")[0] : "";

  if (/Android/i.test(platform) || /Android/i.test(uaFallback)) {
    var parts = [];
    if (market) parts.push(market);
    if (model && model !== market) parts.push(model);
    var head = parts.length ? parts.join(" · ") : (model || "Android phone");
    if (ver) return head + " (Android " + ver + ")";
    return head + " (Android)";
  }

  if (market && model) {
    return ver
      ? market + " · " + model + " (" + platform + " " + ver + ")"
      : market + " · " + model;
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
