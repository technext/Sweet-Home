///////////////////////////////
// Smart Resize
///////////////////////////////

(function($,sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                    timeout = null;
            };
            if (timeout)
                clearTimeout(timeout); else if (execAsap)
                func.apply(obj, args);
                timeout = setTimeout(delayed, threshold || 100);
        };
    }
  
    // smartresize 
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})

(jQuery,'smartresize');

$(document).ready(function(){

  ///////////////////////////////
  // Header Fixed
  ///////////////////////////////



var menu = $('#navigation');
var origOffsetY = menu.offset().top;

function scroll() {
   if ($(window).scrollTop() >= origOffsetY) {
       $('#navigation').addClass('nav-wrap');
       $('#header').addClass('exp');
       //$('.content').addClass('menu-padding');
   } else {
       $('#navigation').removeClass('nav-wrap');
       $('#header').removeClass('exp');
       //$('.content').removeClass('menu-padding');
   }



   if($(window).scrollTop() + $(window).height() == $(document).height()) {
   addPackery();
}


  }

 document.onscroll = scroll;

 ///////////////////////////////
// Fix the Home Height
///////////////////////////////

    var setHomeBannerHeight = function(){
        var homeHeight= $(window).height();
        $('#overlay-1').height(homeHeight);
    }

    setHomeBannerHeight();

    ///////////////////////////////
// One page Smooth Scrolling
///////////////////////////////

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            return false;
        }
    }
});


});


/*-----------------------------------------------------------------------------------------------------*/


$(document).ready(function(){

	var header_height = $('#header').height();

	/* parallax header */
	function parallax(){
	  var scrolled = $(window).scrollTop();
	  $('#header .backstretch img').css('top',''+-(scrolled*0.44)+'px');
      $('.heading').css('background-position', 'center '+-(scrolled*0.5)+'px');
	}


    /* backstretch slider */
    $('.header-slide').backstretch([
      "img/bg01.jpg",
      "img/bg02.jpg",
      "img/bg03.jpg"
      ], {
        fade: 850,
        duration: 2000
    });


    /* navbar */
	$(window).scroll(function(){
		parallax();
		if($(window).scrollTop() > header_height){
            //$('.navbar').css('border-bottom-color', '#3bafda');
		}else{
            //$('.navbar').css('border-bottom-color', '#fff');
		}
	});


    /* nice scroll */
    $( 'html' ).niceScroll({
        cursorcolor: '#434a54',
        cursorwidth: '10px',
        cursorborder: '1px solid #434a54',
        cursoropacitymax: 0.9,                
        scrollspeed: 200,
        zindex: 1060
    });

    /* scrolltop */
    $('.scroltop').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });



    /* modal */
    $('.modal').on('shown.bs.modal', function () {
        var curModal = this;
        $('.modal').each(function(){
            if(this != curModal){
                $(this).modal('hide');
            }
        });
    });


    /* tooltip */
    $('[rel="tooltip"]').tooltip();

    /* carousel single */
    $('#slider-property').carousel({
        interval: 6500
    })
});