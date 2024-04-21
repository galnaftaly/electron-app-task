class Session {
  constructor(ipcMain) {
    this.ipc = ipcMain;
  }

  register() {
    this.ipc.on("CALCULATE_SUM", (event, a, b) => {
      event.sender.send("CALCULATE_SUM_RETURN", a + b);
    });
  }
}

module.exports = Session;
