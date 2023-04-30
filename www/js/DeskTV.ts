import { ipcRenderer } from "electron";

class DeskTV {
    /**
     * apiVersion
     * @description Version of the API you can use
     */
    apiVersion: String;
    deviceName: String;

    constructor() {
        this.apiVersion = "v1.0";
        this.deviceName = "Florian's DeskTV";
    }

    /**
     * launchApp
     * @description Launches an app with the given identifier or opens the App Store page, if found
     * @since v1.0
     */
    public launchApp(appName: String): void {
        ipcRenderer.send("launchApp", appName);
    }

    /**
     * getVersion
     * @description Returns the Version of the API you can use
     * @alias DeskTV.apiVersion
     * @since v1.0
     */
    public getVersion(): String {
        return this.apiVersion;
    }

    /**
     * getDeviceName
     * @description Returns the name of the DeskTV device
     * @alias DeskTV.deviceName
     * @since v1.0
     */
    public getDeviceName(): String {
        return this.deviceName;
    }
}