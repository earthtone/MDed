const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const marked = require('marked');

var content, filePath;

document.querySelector('#md-ed__pick').addEventListener('click', function(e){
	e.preventDefault();
	ipc.send('open-file-dialog');
});

ipc.on('selected-file', function (event, path) {
	if(!path.match(/\.md/ig)){
		alert('Not a valid file type');
		return;
	}

	filePath = path;
	content = fs.readFileSync(filePath).toString();

  document.querySelector('#md-file__selected').textContent = `You selected: ${path}`;
  document.querySelector('#md-ed__input').value = content;
});

document.querySelector('#md-ed__preview').addEventListener('click', function(e){
	e.preventDefault();

	content = document.querySelector('#md-ed__input').value;
	
	ipc.send('open-window', {
		target: 'preview',
		content: marked(content)
	});

	alert('mardkown sent');
});

document.querySelector('#md-ed__save').addEventListener('click', function(e){
	e.preventDefault();
	ipc.send('save-file-dialog', filePath);	
});

ipc.on('save-file__md', function(event, pathname){
	content = document.querySelector('#md-ed__input').value;
	fs.writeFile(pathname, content, function(err){
		if(err){
			throw err;
		}

		document.querySelector('#md-ed__input').value = '';
		alert(`${pathname} written`);
	});
});

ipc.on('save-file__html', function(event, state){
	content = `<!DOCTYPE html><html lang="en">
		${document.head.innerHTML.toString()}
		${document.body.innerHTML.toString()}
	</html>`;

	fs.writeFile(state.pathname, content, function(err){
		if(err){
			throw err;
		}

	})
});