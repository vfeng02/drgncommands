const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const url =require('url');
const isDev = require("electron-is-dev");
const nodeChildProcess = require('child_process');

let mainWindow;

if (require('electron-squirrel-startup')) app.quit();

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({});
    if (!canceled) {
        return filePaths[0];
    }
}

function handleRunScript (event, scriptName) {
  console.log("in handle run script")
  let script = nodeChildProcess.spawn('python', ['/Users/vickyfeng/Desktop/Thesis/drgnslurm/src/main/hello.py']);

  console.log('PID: ' + script.pid);

  script.stdout.on('data', (data) => {
      console.log('stdout: ' + data);
  });

  script.stderr.on('data', (err) => {
      console.log('stderr: ' + err);
  });

  script.on('exit', (code) => {
      console.log('Exit Code: ' + code);
  });
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
  // console.log(isDev)

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
    ipcMain.on('run-script', handleRunScript);
    ipcMain.handle('dialog:openFile', handleFileOpen);
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