const { ipcRenderer } = window.require('electron');

export const getAllScreens = () => {
    return new Promise(resolve => {
        ipcRenderer.send('fetchScreens');
        ipcRenderer.on('fetched:screens', (event, screens) => {
            resolve(screens);
        });
    });
};