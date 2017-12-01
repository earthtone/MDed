const os = require('os');
const fs = require('fs');
const path = require('path');

const electron = require('electron');
const { app, BrowserWindow, dialog, ipcMain, shell } = electron;

var mainWindow;

app.on('ready', function(){
	mainWindow = new BrowserWindow();
	mainWindow.maximize();
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({ properties: ['openFile', 'openDirectory']}, function(files){
    if (files) event.sender.send('selected-file', files[0]);
  });
});

ipcMain.on('save-file-dialog', function (event, filePath) {
  const options = {
    title: 'Save File',
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  };

  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('save-file', filename)
  });
});