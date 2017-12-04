const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const marked = require('marked');

var filePath;

document.querySelector('#md-ed__pick').addEventListener('click', pick);
document.querySelector('#md-ed__preview').addEventListener('click', preview);
document.querySelector('#md-ed__save').addEventListener('click', save);
document.querySelector('#md-ed__generate').addEventListener('click', save);

ipc.on('selected-file', function (event, path) {
	if(!path.match(/\.md/ig)){
		alert('Not a valid file type');
		return;
	}

	var content = fs.readFileSync(path).toString();
  document.querySelector('#md-file__selected').textContent = `You selected: ${path}`;
  document.querySelector('#md-ed__input').value = content;
});

function pick(e){
	e.preventDefault();
	ipc.send('open-file-dialog');
}

function preview(e){
	e.preventDefault();
	
	var content = document.querySelector('#md-ed__input').value;
	ipc.send('open-preview-window', content);
}

function save(e){
	e.preventDefault();
	var type = this.dataset.type || 'md';
	var content = document.querySelector('#md-ed__input').value;
	ipc.send('save-file-dialog', { type, content });
}