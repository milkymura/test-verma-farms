function productsSection() {
    const $productCarousel = $('.prod-carousel')
    const $thumbsParent = $('.grid-x--thumbs')

    const $prodSlide = $('.prod-slide')
    const $thumbSlide = $('.thumb-slide')

    $productCarousel.flickity({
        imagesLoaded: true ,
        adaptiveHeight: true ,
        prevNextButtons: false ,
        pageDots: false
    })


    $productCarousel.on( 'change.flickity', function( event, index ) {
        console.log( 'Slide changed to ' + index )

        const $recentActive = $thumbsParent.find('.selected')
        const $newActive = $thumbsParent.find(`[data-indx="${index}"]`)

        $recentActive.removeClass('selected')
        $newActive.addClass('selected')

    });

    $thumbSlide.click(function() {
        const $currThumb = $(this)
        const { indx } = $currThumb.data()
        const $recentActive = $thumbsParent.find('.selected')

        console.log('indx === ', indx)
        $productCarousel.flickity( 'select', indx );
        $recentActive.removeClass('selected')
        $currThumb.addClass('selected')
    })
}

function testimonialSection() {
    const $testimonialCarousel = $('.testimonial-carousel')

    $testimonialCarousel.flickity({
        imagesLoaded: true ,
        adaptiveHeight: true ,
        prevNextButtons: false ,
        pageDots: false
    })
}

function doPlateSlider() {
    const $gummies = $('.plate-anim__gummies')
    const $hemp = $('.plate-anim__hemp')
    const $border = $('.plate-anim__border')

    const plateWidth = $('#plate-anim').width()

    // set images first
    console.log('plateWidth === ', plateWidth)
    $gummies.find('img').css({ width: `${plateWidth}px` })
    $hemp.find('img').css({ width: `${plateWidth}px` })

    const $triggerEl = $('#about-cbd-section > .grid-container')



    const plateAnimation = new TimelineMax()
        //clip hemp to the left
        .add(TweenMax.fromTo(
            $hemp, 1,
            {
                width: '50%',
            },
            {
                width: '0%',
            }),0
        )
        //open gummies to the left
        .add(TweenMax.fromTo(
            $gummies, 1,
            {
                width: '50%',
            },
            {
                width: '100%',
            }),0
        )
        //move border to the left
        .add(TweenMax.fromTo(
            $border, 1,
            {
                left: `50%`,
            },
            {
                left: `0`,
            }),0
        )

    const controller = new ScrollMagic.Controller()
    const animScene = new ScrollMagic.Scene({
      triggerElement: $triggerEl[0],
      triggerHook: 0,
      duration: '30%',
      tweenChanges: true
    })
        .setTween(plateAnimation)
        // .addIndicators({name: "TESTING"})
        .addTo(controller);
}

function cardCarousel() {
    const $cardCarousel = $('.card-carousel')

    $cardCarousel.flickity({
        imagesLoaded: true ,
        adaptiveHeight: true ,
        prevNextButtons: false ,
        contain: 3,
        pageDots: true
    })
}

function homePage() {
    cardCarousel()
    doPlateSlider()
    productsSection()
    testimonialSection()
}