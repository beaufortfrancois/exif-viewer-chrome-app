chrome.app.runtime.onLaunched.addListener(function() {
  var height = 512;
  var goldenRatio = (1 + Math.sqrt(5)) / 2
  var width = Math.round(height * goldenRatio);

  chrome.app.window.create('app.html', {
    id: 'appWindow1',
    minWidth: width,
    minHeight: height,
    bounds: {
      width: width,
      height: height,
    },
  });
});
