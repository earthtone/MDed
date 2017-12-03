const os = require('os');
const fs = require('fs');
const path = require('path');

const electron = require('electron');
const { app, BrowserWindow, dialog, ipcMain, shell } = electron;

var mainWindow, previewWindow, content;

app.on('ready', function(){
	mainWindow = new BrowserWindow({
    height: 720,
    width: 500
  });
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('open-window', function(event, state){
  let win = new BrowserWindow({ width: 320, height: 700});
  win.loadURL(`file://${__dirname}/app/views/${state.target}.html`);

  exports.content = state.content;
  win.webContents.on('dom-ready', function(event, state){
    event.sender.send('preview-content');
  });
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
    event.sender.send('save-file__md', filename)
  });
});

exports.content = content;