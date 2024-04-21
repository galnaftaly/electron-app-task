const { contextBridge, ipcRenderer } = require("electron");

const electronHandler = {
  api: {
    calculateSum(a, b) {
      ipcRenderer.send("CALCULATE_SUM", +a, +b);
    },
  },
  ipcRenderer: {
    sendMessage: (channel, ...data) => {
      ipcRenderer.send(channel, ...data);
    },
    receiveMessage: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);
