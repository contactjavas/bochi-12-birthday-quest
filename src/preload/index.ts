import { contextBridge, ipcRenderer } from 'electron';

export interface IElectronAPI {
  exitApp: () => void;
  toggleFullscreen: () => void;
  isDev: boolean;
}

const api: IElectronAPI = {
  exitApp: () => ipcRenderer.send('app:exit'),
  toggleFullscreen: () => ipcRenderer.send('app:toggle-fullscreen'),
  isDev: process.env.NODE_ENV === 'development',
};

contextBridge.exposeInMainWorld('electronAPI', api);
