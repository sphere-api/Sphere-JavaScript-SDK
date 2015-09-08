window.SphereSDK || (function(window) {

  window.SphereSDK = (function(document) {
    var baseUrl = 'https://www.sphere.com/auth/#/';

    var currentWindow = null;
    var elmId = 'sphere_auth_iframe';
    var currentCallback = null;

    var resizeEvent = function() {
      var iframe = document.getElementById(elmId + '_iframe');
      var width = parseFloat(iframe.style.width);
      var height = parseFloat(iframe.style.height);
      var left = (window.innerWidth / 2) - (width / 2);
      var top = (window.innerHeight / 2) - (height / 2);
      iframe.style.left = left + 'px';
      iframe.style.top = top + 'px';
    };

    var createIframe = function(url, isVisible, width, height) {
      width = width || 0;
      height = height || 0;
      var left = (window.innerWidth / 2) - (width / 2);
      var top = (window.innerHeight / 2) - (height / 2);

      var iframe = document.createElement('iframe');
      iframe.style.width = width + 'px';
      iframe.style.height = height + 'px';
      iframe.style.position = 'absolute';
      iframe.style.display = isVisible ? 'block' : 'none';
      iframe.style.zIndex = '10000';
      iframe.style.left = left + 'px';
      iframe.style.top = top + 'px';
      iframe.frameBorder = 0;
      iframe.src = url;
      iframe.id = elmId + '_iframe';

      var overlay = document.createElement('div');
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.position = 'fixed';
      overlay.style.display = isVisible ? 'block' : 'none';
      overlay.style.zIndex = '9999';
      overlay.style.left = 0;
      overlay.style.top = 0;
      overlay.style.background = 'rgba(0,0,0,0.85)';
      overlay.id = elmId;
      overlay.appendChild(iframe);

      document.body.appendChild(overlay);

      window.addEventListener('resize', resizeEvent);
    };

    var removeIframe = function() {
      var elm = document.getElementById(elmId);
      if(elm) {
        elm.parentNode.removeChild(elm);
      }
      window.removeEventListener('resize', resizeEvent);
    };

    var openWindow = function(url, width, height) {
      width = width || 0;
      height = height || 0;
      var left = (screen.width / 2) - (width / 2);
      var top = (screen.height / 2) - (height / 2);

      currentWindow = window.open(url, 'Sphere', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);
      window.setTimeout(function() {
        currentWindow.postMessage('ping', '*');
      }, 2500);
    };

    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    // Listen to message from child window
    eventer(messageEvent, function(e) {
      if(!e.data || typeof e.data !== 'string') {
        return;
      }
      
      var data = JSON.parse(e.data);

      // Triggering active callback
      if(currentCallback) {
        currentCallback(data);
        currentCallback = null;
      }

      // Closing window or active iframe
      if(currentWindow) {
        currentWindow.close();
      }
      else {
        removeIframe();
      }

    }, false);

    return {

      isAuthenticated: function(callback) {
        var url = baseUrl + 'isAuthenticated';
        createIframe(url, false);

        if(callback) {
          currentCallback = callback;
        }
      },

      login: function(callback) {
        var url = baseUrl + 'login';
        openWindow(url, 380, 600);

        if(callback) {
          currentCallback = callback;
        }
      },

      register: function(callback) {
        var url = baseUrl + 'register';
        openWindow(url, 380, 600);

        if(callback) {
          currentCallback = callback;
        }
      },

      logout: function(callback) {
        var url = baseUrl + 'logout';
        createIframe(url, false);

        if(callback) {
          currentCallback = callback;
        }
      }

    };

  }(document));

}(window));