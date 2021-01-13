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

function homePage() {
    productsSection()
    testimonialSection()
}