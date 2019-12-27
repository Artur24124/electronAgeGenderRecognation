const electron = require('electron');
const Datastore = require('nedb');
const faceapi = require('face-api.js');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let db;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences:
        {
          nodeIntegration: true,
          backgroundThrottling: true
        }
  });

  mainWindow.loadURL(
      isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Database (NeDB)
const userData = app.getPath('userData');

db = new Datastore({ filename: userData +'/db/notes.db', timestampData: true });
db.loadDatabase();

ipcMain.on('addScreen', (event, screen) => {
  db.insert(screen, (err, newScreen) => {
    if (!err) {
      db.find({}).sort({ updatedAt: -1 }).exec((err, screens) => {
        if (!err) {
          mainWindow.webContents.send('screen:added', screens, newScreen);
        }
      });
    }
  });
});

ipcMain.on('fetchScreens', (event) => {
  db.find({}).sort({ updatedAt: -1 }).exec((err, screens) => {
    if (!err) {
      mainWindow.webContents.send('fetched:screens', screens);
    }
  });
});
