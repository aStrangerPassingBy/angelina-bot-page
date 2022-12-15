const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

Menu.setApplicationMenu(null);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1040,
    height: 660,
    minWidth: 1040,
    minHeight: 660,
    // 无边框
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // if(app.isPackaged) {
  //   win.loadFile(path.join(__dirname, '/dist/index.html'))
  // } else {
  //   win.loadURL(process.env['VITE_DEV_SERVER_HOSTNAME'] as string || process.env['VITE_DEV_SERVER_URL'] as string);
  // }
  if(process.env['VITE_DEV_SERVER_HOSTNAME'] || process.env['VITE_DEV_SERVER_URL']) {
    win.loadURL(String(process.env['VITE_DEV_SERVER_HOSTNAME'] || process.env['VITE_DEV_SERVER_URL']));
  } else {
    win.loadFile(path.join(__dirname, '/dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  console.log('ready');
  app.on('activate', () => {
    console.log('activate');
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', () => {
  console.log('window-all-closed');
  if(process.platform !== 'darwin') app.quit();
})