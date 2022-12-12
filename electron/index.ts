const path = require('path')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  // console.log(path.join(__dirname, '../dist/index.html'));
  win.loadURL(process.env['VITE_DEV_SERVER_URL'])
  // win.loadFile(path.join(__dirname, '../dist/index.html'))
  // if(app.isPackaged) {
  //   win.loadFile(path.join(__dirname, '/dist/index.html'))
  // } else {
  //   win.loadURL(process.env['VITE_DEV_SERVER_URL'])
  // }
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