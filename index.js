// Initiaize requirements
const { app, BrowserWindow, session, ipcMain } = require('electron');
const loudness = require('loudness');
const dcClient = require('discord-rich-presence')('1087387430191112252');
const fs = require('fs');
const { download } = require('electron-dl');
const decompress = require("decompress");

let appList = [];
let activeApp = null;

// Set presence for Discord
dcClient.updatePresence({
    state: 'Idle',
    details: 'Looking what to do',
    startTimestamp: Date.now(),
    largeImageKey: '',
    smallImageKey: '',
    instance: false,
});

// INITIALIZE THE APP WITH JSON (WILL BE REPLACED WITH FILE)
let devInfo = {
    "deviceName": "Unregistered DeskTV",
    "vol": 0,
    "mute": false,
    "account": ""
};

async function loadInfo() {
    try {
        data = fs.readFileSync(app.getPath("userData") + "/config/config.json", 'utf8');
        json = JSON.parse(data);
        devInfo = json;
        return;
    } catch (err) {
        try {
            fs.mkdirSync(app.getPath("userData") + "/config");
            fs.writeFile(app.getPath("userData") + "/config/config.json", JSON.stringify(devInfo), function (error) {
                if (error) throw error;
            });
        } catch (error) {
            console.error(error);
        }
        console.error(err);
        return;
    }
}

async function volume() {
    devInfo.vol = await loudness.getVolume();
    devInfo.mute = await loudness.getMuted();
}

// Initialize windows
let win;
let appwin = null;
let remotewin;

// Initialize socket.io
const io = require('socket.io-client');

let socket;

// Function to download apps
async function downloadApp(appName) {
    // Use download-function of 'electron-dl' to download
    await download(win, "http://cdn.sodianetwork.de/tv/apps/" + appName + ".zip", {
        directory: app.getPath("userData") + "/apps",
        onCompleted: (file) => {
            // Decompress file with 'decompress'
            decompress(app.getPath('userData') + "/apps/" + appName + ".zip", app.getPath('userData') + "/apps/" + appName)
                .then((files) => {
                    // Delete the archive
                    fs.unlinkSync(app.getPath('userData') + "/apps/" + appName + ".zip");
                })
            .catch((error) => {
                console.log(error);
                // Delete the archive
                fs.unlinkSync(app.getPath('userData') + "/apps/" + appName + ".zip");
            });
        }
    });
}

// Create main menu
async function createWindow() {
    await loadInfo();
    
    win = new BrowserWindow({
        fullscreen: true,
        frame: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        }
    });

    if (devInfo.account == "") {
        win.loadFile("./www/login.html");
    } else {
        win.loadFile('./www/index.html');
    }
    
    // Hide cursor
    win.webContents.on('dom-ready', (event)=> {
        //let css = '* { cursor: none !important; }';
        //win.webContents.insertCSS(css);
    });

    //win.webContents.openDevTools();

    volume();
    socket = io('http://remote.tv.sodianetwork.de/');

    socket.on("message", (msg) => {
        const json = JSON.parse(msg);
        //console.log(json);
        
        if (json.type == "initId") {
            remotewin = new BrowserWindow({
                fullscreen: true,
                frame: false
            });
    
            remotewin.loadURL(`file://${__dirname}/www/qrwindow.html?key=${json.value}`);
        } else if (json.type == "key") {
                 if (json.value == "up") {BrowserWindow.getFocusedWindow().webContents.executeJavaScript("window.dispatchEvent(new Event('dtv-up'))")}
            else if (json.value == "down") {BrowserWindow.getFocusedWindow().webContents.executeJavaScript("window.dispatchEvent(new Event('dtv-down'))")}
            else if (json.value == "left") {BrowserWindow.getFocusedWindow().webContents.executeJavaScript("window.dispatchEvent(new Event('dtv-left'))")}
            else if (json.value == "right") {BrowserWindow.getFocusedWindow().webContents.executeJavaScript("window.dispatchEvent(new Event('dtv-right'))")}
            else if (json.value == "vlm-up") {
                if (devInfo.vol < 95) {
                    loudness.setVolume(vol + 5);
                    devInfo.vol += 5;
                } else {
                    loudness.setVolume(100);
                    devInfo.vol = 100;
                }
            }
            else if (json.value == "vlm-down") {
                if (devInfo.vol > 5) {
                    loudness.setVolume(vol - 5);
                    devInfo.vol -= 5;
                } else {
                    loudness.setVolume(0);
                    devInfo.vol = 0;
                }
            }
            else if (json.value == "vlm-mute") {loudness.setMuted(!devInfo.mute); devInfo.mute = !devInfo.mute}
            //console.log(json.value);
        } else if (json.type == "connection") {
            remotewin.close();
    
            socket.send({"receiver": json.value, "content": JSON.stringify({"type": "info", "value": {"name": deviceName}})});
        }
    });
}

// Create the window for an app
function createAppWindow(appString) {
    let json;
    
    // Check if the App exists
    try {
        data = fs.readFileSync(app.getPath("userData") + "/apps/" + appString + "/config.json", 'utf8');
        json = JSON.parse(data);
    } catch (err) {
        console.error(err);
        return;
    }

    activeApp = appString;
    let node = false;

    // Check if the app is the App Store, if so activate node integration
    if (appString == "tv.desktv.store") {
        node = true;
    }

    appwin = new BrowserWindow({
        fullscreen: true,
        frame: false,
        webPreferences: {
            contextIsolation: !node,
            nodeIntegration: node,
        },
        backgroundColor: json.backgroundColor
    });

    // Check if the app is remote or should be loaded from file
    if (json.urlType == "url") {
        appwin.loadURL(json.url);
    } else if (json.urlType == "file") {
        appwin.loadFile(app.getPath("userData") + "/apps/" + appString + "/" +json.url);
    }

    // Inject JavaScript
    appwin.webContents.executeJavaScript(json.inject);

    // Hide the mouse cursor
    appwin.webContents.on('dom-ready', (event)=> {
        let css = '* { cursor: none !important; }';
        appwin.webContents.insertCSS(css);
    });
    
    appwin.show();

    appwin.on('show', () => {
        // Auto-focus the app
        appwin.focus();

        // Check if the app is the App Store, if so pass the app list as a parameter
        if (appString == "tv.desktv.store") {
            appwin.webContents.executeJavaScript("loadedApps(" + appList + ");");
        }
    });

    // Destroy all objects related to the window
    appwin.on('closed', () => {
        appwin = null;
        activeApp = null;
        dcClient.updatePresence({
            state: 'Idle',
            details: 'Looking what to do',
            startTimestamp: Date.now(),
            largeImageKey: '',
            smallImageKey: '',
            instance: false,
        });
    });

    // Set Discord presence for the application
    dcClient.updatePresence({
        state: "Looking around",
        details: json.name,
        startTimestamp: Date.now(),
        largeImageKey: json.icon,
        instance: false,
    });
}

// Handle app opening from main menu
ipcMain.on('openApp', (event, appName) => {
    if (event.sender.id = win.id) {
        createAppWindow(appName);
    } else {
        //console.log(false);
    }
});

// Handle download request from App Store
ipcMain.on('downloadApp', async (event, appName) => {
    if (event.sender.id == appwin.id && activeApp == "tv.desktv.store") {
        await downloadApp(appName);
        event.sender.executeJavaScript("downloaded(" + appName + ");");
    }
});

ipcMain.on('startAuthenticationDiscord', async (event, appName) => {
    if (event.sender.id = win.id) {
        
        
        win.loadURL("https://discord.com/api/oauth2/authorize?client_id=1087387430191112252&redirect_uri=http%3A%2F%2Flocalhost%3A5836%2Foauth&response_type=code&scope=identify%20email");
    }
});

app.on('ready', async () => {
    
    // Change the User Agent so YouTube can load
    const filter = {
        urls: ['https://*.youtube.com/*', 'http://*.sodianetwork.de/*']
    }
      
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/5.0 NativeTVAds Safari/538.1 DeskTV/1.0';
        callback({ requestHeaders: details.requestHeaders });
    });

    // Manipulate the YouTube script, so the app can use the deviceName instead of YouTube on TV for connections
    session.defaultSession.webRequest.onBeforeRequest({urls: ['https://www.youtube.com/s/_/kabuki/_/js/k=kabuki.base.en_US.dJ0uVMBiDgw.es5.O/am=SAQQgIgABA/d=1/excm=main/rs=ANjRhVm05bNxKsA1bgz-ZuE3gD6QHR4Iug/m=base']}, function(details, callback) {
        callback({
            redirectURL: 'https://sodianetwork.de/yt_manipulate.php?name=' + encodeURIComponent(devInfo.deviceName)
        });
    });
    
    createWindow();

    // Load apps and check if App Store is installed, else install it
    await loadApps();
    if (!fs.existsSync(app.getPath("userData") + "/apps/tv.desktv.store/config.json")) {
        await downloadApp("tv.desktv.store");
        await loadApps();
    }
});

// Function to load the App list
async function loadApps() {
    // Get all files and folders from the apps location
    let files = await fs.promises.readdir(app.getPath('userData') + "/apps");
    
    // Reset app list
    appList = [];

    // Iterate through directory
    for (const file of files) {
        // Get stats of the current indexed file
        stat = await fs.promises.stat(app.getPath('userData') + "/apps/" + file);
        
        // Check if the file is a directory
        if (stat.isDirectory()) {
            // If yes, check if there is a config.json and add it to the app list
            let files2 = await fs.promises.readdir(app.getPath('userData') + "/apps/" + file);
            if (files2.indexOf('config.json') > -1) {
                appList.push(file);
            }
        }
    }

    //Update the app list in the main menu
    win.webContents.executeJavaScript("loadApps(" + JSON.stringify(appList) + ");");
    
    return appList;
}

// Auto-focus the app window every second (Only if DeskTV is in foreground)
setInterval(function() {
    if (appwin != null) {
        appwin.focus();
    }
}, 1000);