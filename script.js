console.log('読み込み成功');
window.addEventListener('load', function () {
    const checkSlickInitialized = setInterval(function () {
        // home-carousel-で始まるクラスを持つすべての要素を対象にする
        const $sliders = jQuery('[id^="home-carousel-"]');

        // 対象が1つ以上存在し、かつ slick-initialized 済みの要素が1つでもあれば処理を実行
        if ($sliders.length && $sliders.filter('.slick-initialized').length > 0) {
            clearInterval(checkSlickInitialized);

            $sliders.each(function () {
                const $slider = jQuery(this);

                // slickを停止・破棄
                $slider.slick('slickPause');
                console.log('停止:', this);

                $slider.slick('unslick');
                console.log('slick unslicked:', this);

                // slickを再初期化
                $slider.slick({
                    infinite: !0,
                    autoplay: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    speed: 500,
                    autoplaySpeed: 5e3,
                    arrows: !1,
                    dots: !0,
                    adaptiveHeight: !1,
                    responsive: [{
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }]
                });

                console.log('slick 再初期化:', this);
            });
        }
    }, 5000);

    const checkActiveContents = setInterval(function () {
        const $slider = jQuery('.active-courses-slider');
        if ($slider.length && $slider.hasClass('slick-initialized')) {
            clearInterval(checkActiveContents);

            // slickを停止・破棄
            $slider.slick('slickPause');
            console.log('停止:', this);

            $slider.slick('unslick');
            console.log('slick unslicked:', this);

            // slickを再初期化
            $slider.slick({
                infinite: !0,
                autoplay: false,
                slidesToShow: 4,
                slidesToScroll: 4,
                speed: 500,
                autoplaySpeed: 5e3,
                arrows: !1,
                dots: !0,
                adaptiveHeight: !1,
                responsive: [{
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }]
            });

            console.log('slick 再初期化（slidesToShow: 5）');
        }
    }, 5000);

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

    // フラグを用意
    let alreadyHandled = false;

    // 要素が存在すれば監視開始
    if (target && !target.classList.contains('slick-initialized')) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (
                    !alreadyHandled &&
                    mutation.attributeName === 'class' &&
                    mutation.target.classList.contains('slick-initialized')
                ) {
                    alreadyHandled = true;
                    handleSlickReinit(mutation.target);
                    observer.disconnect(); // 一度処理したら監視終了
                }
            });
        });

        observer.observe(target, config);
    }
});

// 戻るボタンの遷移変更
document.addEventListener('click', function (e) {
  // クリックされた要素が <a> で、かつ .exit-icon クラスを持っているか確認
  if (e.target.matches('a.exit-icon')) {
    e.preventDefault();
    if (document.referrer) {
      history.back();
    } else {
      window.location.href = '/';
    }
  }
});
