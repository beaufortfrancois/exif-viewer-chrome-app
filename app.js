var tags = [];

var exifView = document.querySelector('.exif');
var searchBox = document.querySelector('input[type=search]');
var thumbnail = document.querySelector('.thumbnail');

function pickImage() {
    var options = {type: 'openFile', accepts: [{mimeTypes: ['image/jpeg']}]};
    chrome.fileSystem.chooseEntry(options, function(fileEntry) {
        fileEntry.file(function(file) {
            var imageUrl = URL.createObjectURL(file);
            thumbnail.style.backgroundImage = 'url(' + imageUrl + ')';
            var reader = new FileReader();
            reader.onload = getExifTags;
            reader.readAsArrayBuffer(file);
        });
    })
}

function getExifTags(event) {
    var exif = new ExifReader();
    try {
        exif.load(event.target.result);
        var allTags = exif.getAllTags();
        if (Object.keys(allTags).length) {
            tags = [];
            var tagNames = Object.keys(allTags).sort();
            for (var i = 0; i < tagNames.length; i++)
                tags.push([tagNames[i], allTags[tagNames[i]]]);
            showTags();
        }
        else {
            showError();
        }
    }
    catch(e) {
        showError()
    }
    exifView.scrollTop = 0;
}

function showError() {
    exifView.textContent = '';
    var p = document.createElement('p');
    p.innerHTML = 'No EXIF data';
    exifView.appendChild(p);
    searchBox.disabled = true;
}

function showTags() {
    exifView.textContent = '';
    var filter = new RegExp(searchBox.value, 'i');
    for (var i = 0; i < tags.length; i++) {
        var name = '' + tags[i][0];
        var description = '' + tags[i][1].description;
        if (!filter || (filter && (name.search(filter) !== -1 || description.search(filter) !== -1)) ) {
            var tag = document.createElement('li');
            tag.innerHTML = '<span class="tag-name">' + name + '</span>' +
                            '<span class="tag-description">'+ description + '</span>';
            exifView.appendChild(tag)
        }
    }
    searchBox.disabled = false;
    searchBox.focus();
}

searchBox.addEventListener('input', showTags);
thumbnail.addEventListener('click', pickImage);
