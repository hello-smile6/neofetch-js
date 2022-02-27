window.Neofetch = {};

// Define environment variables, to align with upstream
Neofetch.escapeCharacter = "\u001b"; // Not implemented upstream, just to make the code neater
// TODO: add the versions with color, maybe make a script to generate icons array from neofetch as json and add it to the file
// At least they're recognizable

/**
 * Taken from the original Neofetch project
 */
Neofetch.osList={
    "windows": `################  ################
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
################  ################`, // Don't bother detecting different Windows versions, show them all as win11 for now (Would accept PR)
    "chrome": `        .,coooooooooooooc,.
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
    "linux": `        #####
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
mac: `
                    'c. 
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
       .cooc,.    .,coo:.`
};
// Icon aliases
Neofetch.osList.chromeos=Neofetch.osList.chrome;
Neofetch.getData = function(opts) {
    let cfg={
        os: "Linux", // Assume the most likely
        browser: "", // Sadly, most likely
        lineEnding: "\n",
    };
    if(typeof window=="object" && typeof Window!=="undefined") {
        // Verify that it is, indeed, a browser
        if(window instanceof Window) {
            // Configure defaults considering browser
            if(navigator?.platform=="Win32") cfg.os="Windows";
            if(navigator?.platform?.startsWith("Linux ")) cfg.os="Linux";
            if(cfg?.os=="Linux") {
                // Detect Chrome OS, which will identify as Linux
                if(navigator?.userAgent?.includes("CrOS")) {
                    cfg.os="Chrome OS"; // Don't worry about browser, that'll be done later in the script
                }
                else {
                  // Mac detection
                    if (navigator.userAgent.includes("Macintosh") && navigator.userAgent.includes("Mac OS")) {
                      cfg.os = "Mac"
                    }
                  // iOS detection
                    if (navigator.userAgent.includes("iPhone OS")) {
                      // They give the same logo so it doesn't matter
                      cfg.os = "Mac"
                    }
                  // iPadOS detection
                    if (navigator.userAgent.includes("iPad")) {
                      // They give the same logo so it doesn't matter
                      cfg.os = "Mac"
                    }
                }
            }
            if(navigator?.vendor=="Google Inc.") cfg.browser="Chrome";
        }
    }
    if(typeof opts=="object") {
        // Process options
        if(typeof opts?.os=="string") cfg.os=opts.os;
        if(typeof opts?.browser=="string") cfg.browser=opts.browser;
        if(typeof opts?.lineEnding=="string") cfg.lineEnding=opts.lineEnding;
    }
    
    let output="";
    // Each output must make sure there is exactly one (1) newline after it.
    if (cfg.os=="Windows") {
        output+="Icon:"+cfg.lineEnding+Neofetch.osList.windows.replaceAll("\n",cfg.lineEnding)+cfg.lineEnding;
    } else {
        if (cfg.os=="Linux") {
            output+="Icon:"+cfg.lineEnding+Neofetch.osList.linux.replaceAll("\n",cfg.lineEnding)+cfg.lineEnding;
        } else {
            if (cfg.os=="Chrome OS") {
            output+="Icon:\n"+Neofetch.osList.chrome.replaceAll("\n",cfg.lineEnding)+cfg.lineEnding;
            } else {
                if (cfg.browser=="Chrome") {
                    output+="Icon:\n"+Neofetch.osList.chrome.replaceAll("\n",cfg.lineEnding)+cfg.lineEnding+cfg.lineEnding+"We didn't have your OS icon, so we used your browser icon instead."+cfg.lineEnding;
                } else {
                  if (cfg.os == "Mac") {
                    output+="Icon:\n"+Neofetch.osList.mac.replaceAll("\n",cfg.lineEnding)+cfg.lineEnding;
                  } else {
                    output+="Icon: Not Implemented"+cfg.lineEnding;
                  }
                }
            }
        }
    }
    return output;
}
if(typeof process!=="undefined") {
    if(process instanceof EventEmitter) {
        module.exports = { neofetch: Neofetch };
    }
}