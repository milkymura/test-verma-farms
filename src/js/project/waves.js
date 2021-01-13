function waves() {
    $('.divider-wave').each(function() {
        const el = $(this)[0]
        const { color } = $(this).data()

        const waveColor = {
            1: COLOR_1,
            2: COLOR_2,
            3: COLOR_3,
        }[color]

        lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: waveColor
        });
    })
}