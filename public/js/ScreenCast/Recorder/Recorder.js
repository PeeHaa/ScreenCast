function ScreenCastRecorder(localMediaStream) {
    this.stream = localMediaStream;
    this.data = null;
}

ScreenCastRecorder.prototype.start = function() {
    this.data = this.stream.record();
};

ScreenCastRecorder.prototype.stop = function() {
    this.stream.stop();
    this.data.getRecordedData(function(blob) {
        console.log(blob);
    });
};