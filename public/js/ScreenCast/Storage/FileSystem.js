function ScreenCastStorageFileSystem() {
    this.fileSystemObject = null;
    this.fileSystemHandle = null;

    this.initialize();
}

ScreenCastStorageFileSystem.prototype.isSupported = function() {
    return !!(window.requestFileSystem || window.webkitRequestFileSystem);
};

ScreenCastStorageFileSystem.prototype.setFileSystemObject = function() {
    this.fileSystemObject = window.requestFileSystemSync || window.webkitRequestFileSystemSync;
};

ScreenCastStorageFileSystem.prototype.initialize = function() {
    this.setFileSystemObject();
    this.setFileSystemHandle();

    // ugly hack to make sure we have a valid fileSystemHandle (which is created async)
    var i = 0;
    while (i < 10000) {
        console.log(i);
        if (this.fileSystemHandle !== null) {
            console.log('> Got a handle after ' + i + ' iterations');
            console.log(this.fileSystemHandle);
        }

        i++;
    }

    console.log('Finished loop');

    // DOMFileSystem
    //this.createDirectory();
    /*
    this.fileStorageObject.call(window, window.TEMPORARY, 5*1024*1024, function() {
        this.fileStorageObject.root.getDirectory('Video', {create: true}, function(dirEntry) {
        }, function() {

        });
    }.bind(this), function(e) {
        console.log(e);
    });

    this.userMediaObject.call(navigator, {
        video: true,
        audio: true
    }, function(localMediaStream) {
        this.stream = localMediaStream;

        // should be separated from this class?
        this.element.src = window.URL.createObjectURL(localMediaStream);

        // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
        // See crbug.com/110938.
        this.element.onloadedmetadata = function(e) {
            console.log('Something happened. Do some stuff');
        };
    }.bind(this), function(e) {
        if (e.code === 1) {
          console.log('User declined permissions.');
        }
    });
    */
};

ScreenCastStorageFileSystem.prototype.setFileSystemHandle = function() {
    var self = this;

    this.fileSystemObject.call(window, window.TEMPORARY, 10*1024*1024, function(fileSystemHandle) {
        self.fileSystemHandle = fileSystemHandle;
    }.bind(this), function(e) {
        console.log(e);
    });
};

ScreenCastStorageFileSystem.prototype.write = function() {

};

ScreenCastStorageFileSystem.prototype.createDirectory = function(directoryName) {
    console.log(this.fileSystemHandle);
//    this.fileSystemObject.root.getDirectory(directoryName, {create: true}, function(dirEntry) {
//        console.log(dirEntry);
//    });
};

/*
var writeToFile = function(name, data) {

    fs.root.getFile('Video/' + name, {create: true, exclusive: true}, function(fileEntry) {
        console.log('A file ' + fileEntry.name + ' was created successfully.');
            fs.root.getFile('Video/' + fileEntry.name, {create: false}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                console.log('writing to ' + 'Video/' + fileEntry.name)
                _files.push('Video/' + fileEntry.name);
                window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
                var bb = new BlobBuilder();
                bb.append(data);
                fileWriter.write(bb.getBlob('text/plain'));
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);
}
*/