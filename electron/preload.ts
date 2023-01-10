import { contextBridge, ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
  
});

contextBridge.exposeInMainWorld('electronApi', {
  openBrowser: (url: string) => ipcRenderer.send('openBrowser', url)
})