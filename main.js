const os = require('os');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const electron = require('electron');
const { app, BrowserWindow, dialog, ipcMain, shell } = electron;

const template = require('./app/lib/page-template');
const randomHex = require('./app/lib/random-hex');
var form, previewWindow, content;

app.on('ready', function(){
	form = new BrowserWindow({
    height: 720,
    width: 500
  });

	form.loadURL(`file://${__dirname}/app/views/form.html`);
});

ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({ properties: ['openFile', 'openDirectory']}, function(files){
    if (files) event.sender.send('selected-file', files[0]);
  });
});

ipcMain.on('save-file-dialog', function (event, state) {
  const options = { title: 'Save File' };
  var filecontent;

  if (state.type === 'html'){
    options.filters = [{ name: 'HTML', extensions: ['html'] }];
    filecontent = template({
      meta: {
        stylesheets: ['https://fonts.googleapis.com/css?family=Roboto', 
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
           'https://normalize-css.googlecode.com/svn/trunk/normalize.css'
        ],
        scripts: []
      }, 
      content: marked(state.content)
    });
  } else {
    options.filters = [{ name: 'Markdown', extensions: ['md'] }];
    filecontent = state.content;
  }

  dialog.showSaveDialog(options, function (filename) {
    fs.writeFile(filename, filecontent, function(err){
      if(err) throw err;
      event.sender.send('markdown-written', filename);
    });
  });
});

ipcMain.on('open-preview-window', function(event, content){
  var file = `${__dirname}/.temp/${randomHex(9)}.html`;
  var html = template({
    meta: {
      stylesheets: [
        'https://fonts.googleapis.com/css?family=Roboto', 
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        '../app/index.css'
       ],
       scripts: []  
    }, 
    content: marked(content)
  });
 
  fs.writeFile(file, html, function(err){
    if(err) throw err;
    
    let win = new BrowserWindow();
    win.loadURL(`file://${file}`);
  });
});

exports.content = content;