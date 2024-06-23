const { app, BrowserWindow } = require('electron');
const path = require('path');

// Set the application's name on macOS
if (process.platform === 'darwin') {
    app.setName("Dust Data Digger");
}


const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
    console.log("No custom icon path set to simplify debugging.");

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Dust Data Digger",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    mainWindow.loadURL(startUrl);

    mainWindow.on('ready-to-show', () => {
        mainWindow.setTitle("Dust Data Digger");
        console.log("Window is ready to show.");
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    console.log(`App name set to: ${app.getName()}`);

}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
