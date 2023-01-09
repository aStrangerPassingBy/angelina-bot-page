import { join } from 'node:path';
import { app, BrowserWindow, Menu } from 'electron';

process.env.DIST = join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public');

let win: BrowserWindow | null;
const preload = join(__dirname, './preload.js');
const url = process.env['VITE_DEV_SERVER_HOSTNAME'] || process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1366,
    minHeight: 780,
    icon: join(process.env.PUBLIC!, 'favicon.ico'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload,
    },
  });

  // 删除默认菜单
  Menu.setApplicationMenu(null);
  
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });

  if (url) {
    win.loadURL(url);
  } else {
    win.loadFile(join(process.env.DIST!, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(() => {
  createWindow();

  // 在苹果设备中，没有打开任何窗口的情况下程序依旧运行，监听一个事件创建一个新窗口
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // 在windows和linux上，关闭所有窗口通常会完全退出一个程序
  app.on('window-all-closed', () => {
    // 判断不是苹果设备，则调用app.quit()
    if(process.platform !== 'darwin') app.quit();
  });
});