const axios = require("axios");
const fs = require("fs");
const config = require("../../config.json");

class YoutubeDownload {

    constructor() {
        this.url = "";
        this.path = `C:\\Users\\${process.env.USERNAME}\\Desktop`
    }

    /**
     * @returns {string}
     */
    getPath(){
        return this.path;
    }

    /**
     * @param {string} path
     */
    setPath(path){
        this.path = path;
    }

    /**
     * @param {string} url
     * @param {string} quality
     */
    download(url, quality){

        this.url = url;

        let urlDownload = "";
        let urlName = "";

        if(quality === "mp3"){

            axios({
                method: "POST",
                url: config.api,
                responseType: "json",
                data: {url: this.url}
            }).then(resp => {
                urlDownload = undefined;
                if(resp.data.mp3Converter === undefined){
                    urlDownload = resp.data.diffConverter;
                }else {
                    urlDownload = resp.data.mp3Converter;
                }
                urlName = resp.data.meta.title;
                axios({
                    method: "GET",
                    url: urlDownload,
                    responseType: "stream"
                }).then(response => {
                    response.data.pipe(fs.createWriteStream(`${this.path}\\${urlName}.mp3`)).on("finish", () => {
                        console.log("Download finish")
                    })
                })
            })

        }else {
            axios({
                method: "POST",
                url: config.api,
                responseType: "json",
                data: {url: this.url}
            }).then(resp => {
                resp.data.url.forEach(r => {
                    if(r.attr.title === "video format: " + quality){
                        urlDownload = r.url
                    }
                })
                urlName = resp.data.meta.title;
                axios({
                    method: "GET",
                    url: urlDownload,
                    responseType: "stream"
                }).then(response => {
                    response.data.pipe(fs.createWriteStream(`${this.path}/${urlName}.mp4`)).on("finish", e => {
                        console.log("Download finish")
                    })
                })
            })
        }
    }

}

module.exports = YoutubeDownload;