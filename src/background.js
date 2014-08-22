chrome.app.runtime.onLaunched.addListener(function(data) {
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
  }, function(appWindow) {
    if (!data.items)
      return;
    appWindow.contentWindow.addEventListener('load', function() {
      appWindow.contentWindow.showImage(data.items[0].entry);
    });
  });
});
