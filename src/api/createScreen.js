const { ipcRenderer } = window.require('electron');

export const createScreen = (payload) => {
    return new Promise(resolve => {
        ipcRenderer.send('addScreen', payload);
        ipcRenderer.on('screen:added', (event, screens) => {
            resolve(screens);
        });
    });
};