 ////Header scroll effect//////

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 10;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250); //distance scrolled without triggering disappear

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure user scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If user scrolled down and are past the navbar, add class .nav_up.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down Disappear
            $('header').removeClass('header__top').addClass('nav_up');
            $('label').removeClass('menu__btn').addClass('nav_up');
        } else {
            // Scroll Up Reappear
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav_up').addClass('header__top');
                $('label').removeClass('nav_up').addClass('menu__btn');
            }
        }
        
        lastScrollTop = st;
    }
/////////////////////////////////////////////////////////////