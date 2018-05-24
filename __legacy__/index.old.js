const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const marked = require('marked');

const randomHex = require('./lib/random-hex');
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
	var assets = Array.from(document.querySelectorAll('input.asset')).map(input => input.value);
	ipc.send('open-preview-window', { content, assets });
}

function save(e){
	e.preventDefault();
	var type = this.dataset.type || 'md';
	var content = document.querySelector('#md-ed__input').value;
	var assets = Array.from(document.querySelectorAll('input.asset')).map(input => input.value);
	ipc.send('save-file-dialog', { type, content, assets });
	document.querySelector('#md-ed__input').value = '';
}

function addInput(selector){
	let input = document.createElement('input');
	let id = `__${randomHex(4)}`;

	input.classList.add('asset');
	input.classList.add('w3-input');

	input.name = `${id}`;
	input.id = id;
	input.placeholder = 'Input Asset URL';
	selector.appendChild(input);
}

function updateDOM(){
	document.querySelectorAll('.asset').forEach(function(input){
		input.addEventListener('focus', function(event){
			event.preventDefault();
			var root = input.parentElement;
			addInput(root);
		});
	});
}

window.addEventListener('load', updateDOM);
const assetsSection = document.querySelector('#md-assets');
var observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
		if(mutation.addedNodes[0].tagName === 'INPUT'){
			updateDOM();
		}
	});
});

observer.observe(assetsSection, {
	attributes: true, 
	childList: true,
	characterData: true
});
