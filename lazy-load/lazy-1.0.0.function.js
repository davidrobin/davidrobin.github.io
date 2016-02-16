function lazy(selector, threshold) {

  var pixelDensity = 1.5;

  var lazyElements = document.querySelectorAll(selector);

  var lazyFadeElements = document.querySelectorAll(selector + '.fade');

  if (typeof threshold === 'undefined') {

    var threshold = 0;

  }

  /* 
  FUNCTIONS
  */

  function loadBG(element, url) {

    element.style.backgroundImage = "url('" + url + "')";

  } // End of loadBG Function

  function loadIMG(element, url) {

    element.src= url;

  } // End of loadIMG Function

  function loadFadeBG(element, url) {

    var image = document.createElement('img');

    image.style.position= 'absolute';

    image.style.top= '-10000px';

    document.querySelector('body').appendChild(image);

    image.src = url;

    image.addEventListener('load', function() {

      element.classList.add('fade-overlay');

      this.style.display = 'none';

    });

  } // End of loadFadeBG Function

  function loadFadeIMG(element) {

    element.classList.add('fade-img');

  } // End of loadFadeIMG Function

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

    } // End of LOOP for

  } // End of IF LazyElement found

  function fadeImg() {

    var scrollPos = document.body.scrollTop;

      // IF one or more Elements are found
      if ( lazyFadeElements.length > 0 ) {

        var lazyFadeElement = '';

        for ( i=0; i < lazyFadeElements.length; i++ ) {

          // Define current Lazy Element
          lazyFadeElement = lazyFadeElements[i];

          if ( lazyFadeElement.getBoundingClientRect().top <= window.innerHeight - threshold && !lazyFadeElement.classList.contains('fade-show')) {

          // Images
          if ( lazyFadeElement.getAttribute("data-src-2x") && window.devicePixelRatio >= pixelDensity || lazyFadeElement.getAttribute("data-src") ) {

            loadFadeIMG(lazyFadeElement);
            lazyFadeElement.classList.add('fade-show');

          }

          // Background Images with BACKGROUND-IMAGE: url('') attribute
          else if ( lazyFadeElement.getAttribute("data-bg-2x") && window.devicePixelRatio >= pixelDensity || lazyFadeElement.getAttribute("data-bg") ) {

            var url = lazyFadeElement.getAttribute("data-bg-2x") || lazyFadeElement.getAttribute("data-bg");

            loadFadeBG(lazyFadeElement, url);
            lazyFadeElement.classList.add('fade-show');

          }

        } // End of IF Scroll >= LazyFadeElement Top

        } // End of LOOP for

      } // End of IF LazyFadeElement found

  } // End of fadeImg Function

  var scrollActiv = false;

  window.addEventListener('scroll', function() {

    if (!scrollActiv) {

      scrollActiv = true;

      fadeImg();

      setTimeout(function() { 

        scrollActiv = false;

      }, 

      100); 

    } // End of IF ScrollACtiv is false

}); // End of SCROLL Function

  setTimeout(fadeImg, 250);

} // End of LAZY Function
