if (typeof window == "undefined") {
  const window = {
    location: {
      search: "",
    },
  };
}
if (window.location.search.includes("debug")) debugger;
window.Neofetch = {};

// Define environment variables, to align with upstream
Neofetch.escapeCharacter = "\u001b"; // Not implemented upstream, just to make the code neater
// TODO: add the versions with color, maybe make a script to generate icons array from neofetch as json and add it to the file
// At least they're recognizable

/**
 * Taken from the original Neofetch project
 */
Neofetch.osList = {
  windows: {
    names: ["Windows"],
    // @prettier-ignore start
    ascii: `[?25l[?7l[0m[36m[1m
################  ################
################  ################
################  ################
################  ################
################  ################
################  ################
################  ################

################  ################
################  ################
################  ################
################  ################
################  ################
################  ################
################  ################[0m
[16A[9999999D
[?25h[?7h`,
    // @prettier-ignore end
  }, // Don't bother detecting different Windows versions, show them all as win11 for now (Would accept PR)
  chrome: {
    names: ["Chrome", "Chrome OS"],
    // @prettier-ignore start
    ascii: `[?25l[?7l[0m[31m[1m            .,:loool:,.
        .,coooooooooooooc,.
     .,lllllllllllllllllllll,.
    ;ccccccccccccccccccccccccc;
[0m[32m[1m  '[0m[31m[1mccccccccccccccccccccccccccccc.
[0m[32m[1m ,oo[0m[31m[1mc::::::::okO[37m[0m[1m000[0m[33m[1m0OOkkkkkkkkkkk:
[0m[32m[1m.ooool[0m[31m[1m;;;;:x[37m[0m[1mK0[0m[34m[1mkxxxxxk[37m[0m[1m0X[0m[33m[1mK0000000000.
[0m[32m[1m:oooool[0m[31m[1m;,;O[37m[0m[1mK[0m[34m[1mddddddddddd[37m[0m[1mKX[0m[33m[1m000000000d
[0m[32m[1mlllllool[0m[31m[1m;l[37m[0m[1mN[0m[34m[1mdllllllllllld[37m[0m[1mN[0m[33m[1mK000000000
[0m[32m[1mlllllllll[0m[31m[1mo[37m[0m[1mM[0m[34m[1mdccccccccccco[37m[0m[1mW[0m[33m[1mK000000000
[0m[32m[1m;cllllllllX[37m[0m[1mX[0m[34m[1mc:::::::::c[37m[0m[1m0X[0m[33m[1m000000000d
[0m[32m[1m.ccccllllllO[37m[0m[1mNk[0m[34m[1mc;,,,;cx[37m[0m[1mKK[0m[33m[1m0000000000.
[0m[32m[1m .cccccclllllxOO[37m[0m[1mOOO[0m[32m[1mOkx[0m[33m[1mO0000000000;
[0m[32m[1m  .:ccccccccllllllllo[0m[33m[1mO0000000OOO,
[0m[32m[1m    ,:ccccccccclllcd[0m[33m[1m0000OOOOOOl.
[0m[32m[1m      '::ccccccccc[0m[33m[1mdOOOOOOOkx:.
[0m[32m[1m        ..,::cccc[0m[33m[1mxOOOkkko;.
[0m[32m[1m            ..,:[0m[33m[1mdOkxl:.[0m
[18A[9999999D
[?25h[?7h`,
    // @prettier-ignore end
  },
  linux: {
    names: ["Linux"],
    // @prettier-ignore start
    ascii: `[?25l[?7l[38;5;8m[1m        #####
[38;5;8m[1m       #######
[38;5;8m[1m       ##[37m[0m[1mO[38;5;8m[1m#[37m[0m[1mO[38;5;8m[1m##
[38;5;8m[1m       #[0m[33m[1m#####[38;5;8m[1m#
[38;5;8m[1m     ##[37m[0m[1m##[0m[33m[1m###[37m[0m[1m##[38;5;8m[1m##
[38;5;8m[1m    #[37m[0m[1m##########[38;5;8m[1m##
[38;5;8m[1m   #[37m[0m[1m############[38;5;8m[1m##
[38;5;8m[1m   #[37m[0m[1m############[38;5;8m[1m###
[0m[33m[1m  ##[38;5;8m[1m#[37m[0m[1m###########[38;5;8m[1m##[0m[33m[1m#
[0m[33m[1m######[38;5;8m[1m#[37m[0m[1m#######[38;5;8m[1m#[0m[33m[1m######
[0m[33m[1m#######[38;5;8m[1m#[37m[0m[1m#####[38;5;8m[1m#[0m[33m[1m#######
[0m[33m[1m  #####[38;5;8m[1m#######[0m[33m[1m#####[0m
[12A[9999999D
[?25h[?7h`,
    // @prettier-ignore end
  },
  mac: {
    names: ["Mac", "iOS"],
    // @prettier-ignore start
    ascii: `[?25l[?7l[0m[32m[1m                    c.'
                 ,xNMM.
               .OMMMMo
               lMM"
     .;loddo:.  .olloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
[0m[33m[1m .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
[0m[31m[1m;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
[0m[31m[1m.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 [0m[35m[1m'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    [0m[34m[1mkMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       "cooc*"    "*coo'"[0m
[17A[9999999D
[?25h[?7h`,
    // @prettier-ignore end
  },
  unknown: {
    names: ["Unknown"],
    // @prettier-ignore start
    ascii: `?`,
    // @prettier-ignore end
  },
};
// <<<<<<< main

Neofetch.getASCII = function (name, cfg) {
  "use strict";
  if (window.location.search.includes("debug")) debugger;
  // loop through the keys in Neofetch.osList
  for (let key in Neofetch.osList) {
    // check if the current key is equal to the key from the osList
    if (Neofetch.osList[key].names.includes(name)) {
      // return the ASCII art
      return Neofetch.osList[key].ascii.replaceAll("\n", cfg.lineEnding);
    }
  }
};
// Icon aliases
Neofetch.osList.chromeos = Neofetch.osList.chrome;
Neofetch.ansiRegex = function ({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|");
  return new RegExp(pattern, onlyFirst ? undefined : "g");
};
Neofetch.fixAnsi = function (data) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replaceAll(ansiRegex(), ""); // Seems like Node doesn't have replaceAll(), but browsers do. May be a compat issue in the end.
};
// }
// }
// };

Neofetch.getData = function (opts) {
  if (window.location.search.includes("debug")) debugger;
  let cfg = {
    os: "Unknown", // Unknown by default
    browser: "Unknown", // Unknown by default
    lineEnding: "\n",
    allowColor: false, // Disable color by default
  };
  if (typeof window == "object" && typeof Window !== "undefined") {
    // Verify that it is, indeed, a browser
    if (window instanceof Window) {
      // Configure defaults considering browser
      if (navigator?.platform == "Win32") cfg.os = "Windows";
      if (navigator?.platform?.startsWith("Linux ")) cfg.os = "Linux";
      if (cfg?.os == "Linux") {
        // Detect Chrome OS, which will identify as Linux
        if (navigator?.userAgent?.includes("CrOS")) {
          cfg.os = "Chrome OS"; // Don't worry about browser, that'll be done later in the script
        }
      } else {
        // Mac detection
        if (
          navigator?.userAgent?.includes("Macintosh") &&
          navigator?.userAgent?.includes("Mac OS")
        ) {
          cfg.os = "Mac";
        }
        // iOS detection
        if (navigator?.userAgent?.includes("iPhone OS")) {
          // They give the same logo so it doesn't matter
          cfg.os = "Mac";
        }
        // iPadOS detection
        if (navigator?.userAgent?.includes("iPad")) {
          // They give the same logo so it doesn't matter
          cfg.os = "Mac";
        }
      }
      if (navigator?.vendor == "Google Inc.") cfg.browser = "Chrome";
    }
  }
  if (typeof opts == "object") {
    // Process options
    if (typeof opts?.os == "string") cfg.os = opts.os;
    if (typeof opts?.browser == "string") cfg.browser = opts.browser;
    if (typeof opts?.lineEnding == "string") cfg.lineEnding = opts.lineEnding;
    if (typeof opts?.allowColor == "boolean") cfg.allowColor = opts.allowColor;
  }

  let output = "";
  // Each output must make sure there is exactly one (1) newline after it.
  output +=
    "Icon:" + cfg.lineEnding + Neofetch.getASCII(cfg.os, cfg) + cfg.lineEnding;
  if (cfg.browser == "Chrome" && cfg.os == "Unknown") {
    output +=
      "Icon:" +
      cfg.lineEnding +
      Neofetch.getASCII(cfg.browser, cfg) +
      cfg.lineEnding +
      cfg.lineEnding +
      "We didn't have your OS icon, so we used your browser icon instead." +
      cfg.lineEnding;
  }
  if(cfg.allowColor==false) {
    output=Neofetch.fixAnsi(output);
  }
  return output;
};
if (typeof process !== "undefined") {
  if (process instanceof EventEmitter) {
    module.exports = { neofetch: Neofetch };
  }
}
