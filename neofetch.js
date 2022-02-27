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
    ascii: `################  ################
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
################  ################`,
    // @prettier-ignore end
  }, // Don't bother detecting different Windows versions, show them all as win11 for now (Would accept PR)
  chrome: {
    names: ["Chrome", "Chrome OS"],
    // @prettier-ignore start
    ascii: `        .,coooooooooooooc,.
    .,lllllllllllllllllllll,.
   ;ccccccccccccccccccccccccc;
 'ccccccccccccccccccccccccccccc.
,ooc::::::::okO0000OOkkkkkkkkkkk:
.ooool;;;;:xK0kxxxxxk0XK0000000000.
:oooool;,;OKdddddddddddKX000000000d
lllllool;lNdllllllllllldNK000000000
llllllllloMdcccccccccccoWK000000000
;cllllllllXXc:::::::::c0X000000000d
.ccccllllllONkc;,,,;cxKK0000000000.
.cccccclllllxOOOOOOkxO0000000000;
 .:cccccccclllllllloO0000000OOO,
   ,:ccccccccclllcd0000OOOOOOl.
     '::cccccccccdOOOOOOOkx:.
       ..,::ccccxOOOkkko;.
           ..,:dOkxl:.`,
    // @prettier-ignore end
  },
  linux: {
    names: ["Linux"],
    // @prettier-ignore start
    ascii: `        #####
       #######
       ##O#O##
       #######
     ###########
    #############
   ###############
   ################
  #################
#####################
#####################
  #################`,
    // @prettier-ignore end
  },
  mac: {
    names: ["Mac", "iOS"],
    // @prettier-ignore start
    ascii: `                    'c. 
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX. 
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`,
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
  if (window.location.search.includes("debug")) debugger;
  // loop through the keys in Neofetch.osList
  for (const key in Neofetch.osList) {
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
  return output;
};
if (typeof process !== "undefined") {
  if (process instanceof EventEmitter) {
    module.exports = { neofetch: Neofetch };
  }
}
