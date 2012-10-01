function ScreenCast(element) {
    this.element = element;
    this.userMediaObject = null;
    this.stream = null;

    // should be refactored
    this.recorder = null;

    this.initialize();
}

ScreenCast.prototype.initialize = function() {
    if (!this.isSupported()) {
        console.log('Your browser doesn\'t support ScreenCast.');
        return;
    }

    this.setUserMediaObject();
};

ScreenCast.prototype.isSupported = function() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

ScreenCast.prototype.setUserMediaObject = function() {
    this.userMediaObject = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
};

ScreenCast.prototype.start = function() {
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
};