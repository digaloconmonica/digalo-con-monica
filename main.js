const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

// Opcionales
app.commandLine.appendSwitch('enable-features', 'CanvasOopRasterization,UseSkiaRenderer');
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false
    }
  });

  // 👇 CAMBIO CLAVE: usar app.getAppPath() en build
  const appRoot = isDev ? __dirname : app.getAppPath(); // <-- esto da ...\resources\app en el .exe
  const indexPath = path.join(appRoot, 'app', 'index.html'); // <-- tu index vive en app/index.html

  win.loadFile(indexPath);

  // Si querés debug cuando está negro:
  // win.webContents.openDevTools({ mode: 'detach' });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
