function lazy(selector) {

  var pixelDensity = 1.5;

  var i = 0;

  var lazyElements = document.querySelectorAll(selector);

  function loadBG(element, url) {

    if (element.classList.contains('fade')) {

      var image = document.createElement('img');

      image.style.position= 'absolute';

      image.style.top= '-10000px';

      document.querySelector('body').appendChild(image);

      image.src = url;

      image.addEventListener('load', function() {

        element.classList.add('fade-overlay');

        element.style.backgroundImage = "url('" + url + "')";

        this.style.display = 'none';

      });

    }

    else {

      element.style.backgroundImage = "url('" + url + "')";

    }

  }


  function loadIMG(element, url) {

    element.src= url;

    if (element.classList.contains('fade')) {

      element.addEventListener('load', function() {
        
          element.classList.toggle('fade-img');

      });

    }

  }

  // IF one or more Elements are found
  if ( lazyElements.length > 0 ) {

    var lazyElement = '';

    for ( i=0; i < lazyElements.length; i++ ) {

      // Define current Lazy Element
      lazyElement = lazyElements[i];

      // HighDPI images
      if ( lazyElement.getAttribute("data-src-2x") && window.devicePixelRatio >= pixelDensity ) {

        loadIMG(lazyElement, lazyElement.getAttribute("data-src-2x"));

      }

      // Images with SRC attribute
      else if ( lazyElement.getAttribute("data-src") ) {

        loadIMG(lazyElement, lazyElement.getAttribute("data-src"));

      }

      // Objects with HREF attribute
      else if ( lazyElement.getAttribute("data-href") ) {

        lazyElement.href = lazyElement.getAttribute("data-href");

      }

      // Objects with DATA attribute
      else if ( lazyElement.getAttribute("data-data") ) {

        lazyElement.data = lazyElement.getAttribute("data-data");

      }

      // HighDPI Background Images with BACKGROUND-IMAGE: url('') attribute
      else if ( lazyElement.getAttribute("data-bg-2x") && window.devicePixelRatio >= pixelDensity ) {

        loadBG(lazyElement, lazyElement.getAttribute("data-bg-2x"));

      }

      // Background Images with BACKGROUND-IMAGE: url('') attribute
      else if ( lazyElement.getAttribute("data-bg") ) {

        loadBG(lazyElement, lazyElement.getAttribute("data-bg"));

      }

      else {

        return false;

      }

    } // End of LOOP for

  } // End of IF LazyElement found

} // End of LAZY Function
