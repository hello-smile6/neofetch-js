if(window.location.search.includes("debug")) debugger;
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
  }, // Don't bother detecting different Windows versions, show them all as win11 for now (Would accept PR)
  chrome: {
    names: ["Chrome", "Chrome OS"],
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
  },
  linux: {
    names: ["Linux"],
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
  },
  mac: {
    names: ["Mac", "iOS"],
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
  }
};

Neofetch.getASCII = function (name, cfg) {
  if(window.location.search.includes("debug")) debugger;
  // loop through the keys in Neofetch.osList
  for (const key in Neofetch.osList) {
    // check if the current key is equal to the key from the osList
    if (Neofetch.osList[key].names.includes(name)) {
      // return the ASCII art
      return Neofetch.osList[key].ascii.replaceAll("\n",cfg.lineEnding);
    }
  }

};

Neofetch.getData = function (opts) {
  if(window.location.search.includes("debug")) debugger;
  let cfg = {
    os: "Unknown", // Assume the most likely
    browser: "Unknown", // Sadly, most likely
    lineEnding: "\n",
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
        } else {
          // Mac detection
          if (
            navigator.userAgent.includes("Macintosh") &&
            navigator.userAgent.includes("Mac OS")
          ) {
            cfg.os = "Mac";
          }
          // iOS detection
          if (navigator.userAgent.includes("iPhone OS")) {
            // They give the same logo so it doesn't matter
            cfg.os = "Mac";
          }
          // iPadOS detection
          if (navigator.userAgent.includes("iPad")) {
            // They give the same logo so it doesn't matter
            cfg.os = "Mac";
          }
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
  if (cfg.browser == "Chrome" && cfg.os=="Unknown") {
    output +=
      "Icon:" +
      cfg.lineEnding +
      Neofetch.getASCII(cfg.browser, cfg) +
      cfg.lineEnding +
      cfg.lineEnding +
      "We didn't have your OS icon, so we used your browser icon instead." +
      cfg.lineEnding;
  }
  if(cfg.browser=="Unknown" && cfg.os=="Unknown") {
    output +=
      "Icon:" +
      cfg.lineEnding +
      cfg.lineEnding +
      "Unknown"
  }
  return output;
};
if (typeof process !== "undefined") {
  if (process instanceof EventEmitter) {
    module.exports = { neofetch: Neofetch };
  }
}
