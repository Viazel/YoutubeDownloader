const Youtube = require("./utils/YoutubeDownload");
const path = require("path");
const ipc = require("electron").ipcRenderer;
let pathText = document.getElementById("pathText");
const mp4Button = document.getElementById("mp4Button");
const mp3Button = document.getElementById("mp3Button");

const ytb = new Youtube();

pathText.value = ytb.getPath();

mp4Button.addEventListener("click", () => {
    pathText = document.getElementById("pathText");
    const mp4URL = document.getElementById("mp4Input");
    const isCheckLowQuality = document.getElementById("360").checked;

    ytb.setPath(pathText.value);
    if(mp4URL.value !== null){
        ipc.send("download", {url: mp4URL.value, quality: isCheckLowQuality ? "360" : "720"});
        mp4URL.value = "Is downloading..."
    }
})

mp3Button.addEventListener("click", () => {
    const mp3URL = document.getElementById("mp3Input");
    pathText = document.getElementById("pathText");

    ytb.setPath(pathText.value);
    if(mp3URL.value !== null){
        ipc.send("download", {url: mp3URL.value, quality: "mp3"});
        mp3URL.value = "Is downloading..."
    }
})