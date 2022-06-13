const {BrowserWindow, app, ipcMain} = require("electron");
const path = require("path");
const Youtube = require("./app/utils/YoutubeDownload");
const ytb = new Youtube();

app.disableHardwareAcceleration();

function createWindow() {
    const win = new BrowserWindow({
        height: 720,
        width: 1280,
        minHeight: 620,
        minWidth: 952,
        autoHideMenuBar: true,
        center: true,
        title: "Youtube - Downloader",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile(path.join(__dirname, "app", "app.html"));

    ipcMain.on("download", (evt, data) => {
        ytb.download(data.url, data.quality);
    })
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})