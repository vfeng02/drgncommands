const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');
const url =require('url');
const isDev = require("electron-is-dev");
// const storage = require('electron-storage');

// import { app, BrowserWindow, dialog, ipcMain } from 'electron';
// import * as path from 'path';
// import * as url from 'url';

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({});
    if (!canceled) {
        return filePaths[0];
    }
}

function handleGetCommands() {
  // const isPending = true;
  console.log("in handle get commands")

  const data = fs.readFileSync(path.join(__dirname, '../../db.json'), "utf8");
  // const commands = JSON.parse(data);
  // console.log("commands: " + commands.commands);
  return data;

  // fs.readFile(path.join(__dirname, '../../db.json'), "utf8")
  // .then((res) => {
  //   // console.log("received result "+ res)
  //   return JSON.parse(res);
  // })
  // // .then((data) => {
  // //   // isPending = false;
  // //   // return (null, isPending, data);
  // //   // console.log("resolving data " + data);
  // //   return data;
  // // })
  // .catch((err) => {
  //   if (err.name === 'AbortError') {
  //     console.log('fetch aborted')
  //   } else {
  //     // auto catches error
  //     // isPending = false;
  //     // return (err.message, isPending, null);
  //     console.log("encountered error with message: " + err.message);
  //     return err.message;
  //   }
  // });

  // fs.readFile(path.join(__dirname, '../../db.json'), 'utf-8', (err, data) => {
  //   if (err) {
  //     throw Error("Could not load command data from json");
  //   }
  //   isPending = false;
  //   return (isPending, JSON.parse(data));
  // })

  // storage.get(path.join(__dirname, '../../db'))
  // .then(data => {
  //   return data;
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  
  // return data;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      webSecurity: false // for other ways to access local filesystem, https://github.com/electron/electron/issues/23393#issuecomment-623694579
    }
  });

  // Vite dev server URL

  mainWindow.loadURL(isDev ? 'http://localhost:5173/' : url.format({
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.handle('getCommands', handleGetCommands);
    createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});