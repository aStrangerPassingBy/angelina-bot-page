const path = require('path')
const electron = require('electron')
const { app, BrowserWindow } = require('electron')

const Menu = electron.Menu;
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
  // console.log(path.join(__dirname, '../dist/index.html'));
  // win.loadURL(process.env['VITE_DEV_SERVER_URL'])
  // win.loadFile(path.join(__dirname, '../dist/index.html'))
  if(app.isPackaged) {
    win.loadFile(path.join(__dirname, '/dist/index.html'))
  } else {
    // win.loadURL(process.env['VITE_DEV_SERVER_URL'] as string)
    win.loadURL('http://127.0.0.1:5173/')
    // win.loadURL('http://localhost:5173/')
  }
}

app.whenReady().then(() => {
  createWindow()
  console.log('ready');
  app.on('activate', () => {
    console.log('activate');
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  console.log('window-all-closed');
  if (process.platform !== 'darwin') app.quit()
})