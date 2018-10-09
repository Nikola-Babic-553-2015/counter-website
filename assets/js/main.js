(function ($) {
  $(document).ready(function () {
    "use strict";

    /* Image background */

    if ($('#background-image').length > 0 && snowflakesBackgroundImage) {
      $('#background-image').css({backgroundImage: 'url("' + snowflakesBackgroundImage + '")'});
    }

    if ($('#background-image-snowflakes').length > 0 && snowflakesBackgroundImage) {
      $('#background-image-snowflakes').css({backgroundImage: 'url("' + snowflakesBackgroundImage + '")'});
    }



    /* Countdown */
    if ($('#countdown').length > 0) {
      $('#countdown').countdown({
        until: new Date(site_launch_date),
        layout: '<div class="countdown-section"><div class="countdown-amount">{dn}</div><span class="countdown-period">{dl}</span></div>'
        + '<div class="countdown-section"><div class="countdown-amount">{hnn}</div><span class="countdown-period">{hl}</span></div>'
        + '<div class="countdown-section"><div class="countdown-amount">{mnn}</div><span class="countdown-period">{ml}</span></div>'
        + '<div class="countdown-section secs"><div class="countdown-amount">{snn}</div><span class="countdown-period">{sl}</span></div>'
      });
    }


    if ($('body').hasClass('snowflakes')) {
      snow_init();
    }


    if ($('#preloader').length > 0 && ($('#youtube-bg').length === 0 || isMobile())) {
      removePreloader();
    }

    if ($('#home').length > 0 && $('#content').length > 0) {

      window.addEventListener('wheel', onWheel);

      var t, hasWheelListener = true;

      window.up = function () {
        var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        if (top > 0) {
          if (hasWheelListener) {
            window.removeEventListener('wheel', onWheel);
            window.addEventListener('wheel', notWheel);
            hasWheelListener = false;
          }
          window.scrollBy(0, ((top + 10) / -10));
          t = setTimeout('up()', 20);
        } else {
          if (!hasWheelListener) {
            setTimeout(function () {
              window.removeEventListener('wheel', notWheel);
              window.addEventListener('wheel', onWheel);
            }, 600);
            hasWheelListener = true;
          }
          clearTimeout(t);
        }
        return false;
      };

      window.down = function () {
        var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        var element = document.getElementById('content').offsetTop;
        if (top < element) {
          if (hasWheelListener) {
            window.removeEventListener('wheel', onWheel);
            window.addEventListener('wheel', notWheel);
            hasWheelListener = false;
          }
          window.scrollBy(0, autoScrollSpeed);
          //((element - top + 10) / 10)
          t = setTimeout('down()', 10);
        } else {
          if (!hasWheelListener) {
            setTimeout(function () {
              window.removeEventListener('wheel', notWheel);
              window.addEventListener('wheel', onWheel);
            }, 600);
            hasWheelListener = true;
          }
          clearTimeout(t);
        }
        return false;
      };
    }
  });

  function onWheel (e) {
    var home = document.getElementById('home');
    var content = document.getElementById('content');
    //console.log(e.deltaY);
    //if (e.deltaY < -1) {
    //  window.up();
    //}
    //else
    if (e.deltaY > 1) {
      window.down();
    }
    return false;
  }

  function notWheel (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  function removePreloader() {
    var preloader = document.getElementById('preloader');

    preloader.style.opacity = 0;
    setTimeout(function () {
      preloader.parentNode.removeChild(preloader);
    }, 1000);
  }

  function isMobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }


})(jQuery);
