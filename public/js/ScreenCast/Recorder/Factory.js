function ScreenCastRecorderFactory() { }

ScreenCastRecorderFactory.prototype.build = function(stream) {
  return new ScreenCastRecorder(stream);
};