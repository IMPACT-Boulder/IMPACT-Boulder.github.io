const { app, BrowserWindow } = require('electron');
const path = require('path');

// Set the application's name on macOS
if (process.platform === 'darwin') {
    app.setName("Dust Data Digger");
}

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Dust Data Digger",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // consider enabling contextIsolation for security
        }
    });

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    console.log(`Loading URL: ${startUrl}`);
    mainWindow.loadURL(startUrl);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
