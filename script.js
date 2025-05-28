console.log('読み込み成功');
window.addEventListener('load', function () {
    console.log('関数実行');
    const config = { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] };

    // slick初期化処理
    function handleSlickReinit(target) {
        const $slider = jQuery(target);
        $slider.slick('slickPause');
        console.log('停止:', target);

        $slider.slick('unslick');
        console.log('slick unslicked:', target);

        $slider.slick({
            infinite: true,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            speed: 500,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
            adaptiveHeight: false,
            responsive: [
                { breakpoint: 960, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2 } }
            ]
        });

        console.log('slick 再初期化:', target);
    }

    // 対象の要素を監視
    function observeTarget(target) {
        if (target.classList.contains('slick-initialized')) return;
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    mutation.attributeName === 'class' &&
                    mutation.target.classList.contains('slick-initialized')
                ) {
                    handleSlickReinit(mutation.target);
                    observer.disconnect();
                }
            });
        });
        observer.observe(target, config);
    }

    // 初期DOMにある対象を処理
    document.querySelectorAll('[id^="home-carousel-"]').forEach(observeTarget);

    // 新規追加されたノードを監視
    const rootObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.id && node.id.startsWith('home-carousel-')) {
                    observeTarget(node);
                }
            });
        });
    });

    // body全体を監視（または必要に応じて限定的な親要素）
    rootObserver.observe(document.body, { childList: true, subtree: true });
});

// 動画詳細の自動スライドを無効化する処理
window.addEventListener('load', function () {
    const config = { attributes: true, attributeFilter: ['class'] };

    // slick再初期化処理
    function handleSlickReinit(target) {
        const $slider = jQuery(target);
        $slider.slick('slickPause');
        console.log('停止:', target);

        $slider.slick('unslick');
        console.log('slick unslicked:', target);

        $slider.slick({
            infinite: true,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            speed: 500,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
            adaptiveHeight: false,
            responsive: [
                { breakpoint: 960, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2 } }
            ]
        });

        console.log('slick 再初期化:', target);
    }

    // 単一要素を取得
    const target = document.querySelector('.courses-slider');

    // 要素が存在すれば監視開始
    if (target && !target.classList.contains('slick-initialized')) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    mutation.attributeName === 'class' &&
                    mutation.target.classList.contains('slick-initialized')
                ) {
                    handleSlickReinit(mutation.target);
                    observer.disconnect(); // 一度処理したら監視終了
                }
            });
        });

        observer.observe(target, config);
    }
});
