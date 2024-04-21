const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Session = require("./session");

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: false,
      nodeIntegration: false,
      contextIsolation: true,
      worldSfeExecuteJavaScript: true
    },
  });
  mainWindow.loadFile(path.join(__dirname, "..", "..", "index.html"));
  //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  const session = new Session(ipcMain);
  session.register();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
