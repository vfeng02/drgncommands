const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    saveAndRun: ([path, content]) => ipcRenderer.invoke('save-and-run', [path, content]),
    writeFile: ([path, content]) => ipcRenderer.send('write-file', [path, content]),
    runScript: (path) => ipcRenderer.send('run-script', path)
});