const path = require('path')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    // 未隐藏头部时，height和minHeight相差20px，但是大小一样
    // width: 616,
    // height: 569,
    // minWidth: 616,
    // minHeight: 589,
    width: 1040,
    height: 660,
    minWidth: 1040,
    minHeight: 660,
    // 隐藏头部
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
    // win.loadURL('http://127.0.0.1:5173/')
    win.loadURL('http://localhost:5173/')
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