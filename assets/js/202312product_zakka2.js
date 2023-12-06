$(function () {
	var breakPoint = 768,
		isSp = !1,
		$win = $(window),
		winH = $win.height(),
		winW = $win.width(),
		current_pos = $win.scrollTop(),
		current_btm = $win.scrollTop() + winH,
		$body = $('body'),
		$scrollContents = $('.scroll-contents'),
		$scrollInner = $('.scroll-inner'),
		$container = $('.g-container')
		;

	// 1.関数の定義
	function setHeight() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	// 2.初期化
	setHeight();
	// 3.ブラウザのサイズが変更された時・画面の向きを変えた時に再計算する
	window.addEventListener('resize', setHeight);


	$win.width() < breakPoint && (isSp = !0);
	$win.on({
		load: function () {
			winH = $win.height();
			winW = $win.width();
			current_pos = $win.scrollTop();

			$container.addClass("show");
			$scrollContents.addClass("scrollable");
			$scrollInner.addClass("show");
			$body.removeClass('noscroll');
			if (!isSp) {
				$container.addClass("scrollable-vertical");
			}

			verticalScrollFunctions();

			if (isSp) {
				$scrollContents.on("scroll", function () {
					verticalScrollFunctions();
				});
			} else {
				$scrollContents.on("scroll", function () {
					verticalScrollSync();
					verticalScrollFunctions();
				});
			}

			scrollFunction();
			modalToggle();
			// $('[data-speed]').each(function(){
            //     parallax($(this));
            // })
			parallax();
		},
		scroll: function () {
			winH = $win.height();
			winW = $win.width();
			current_pos = $win.scrollTop();

			scrollFunction();
			// $('[data-speed]').each(function(){
            //     parallax($(this));
            // })
			parallax();
		},
		resize: function () {
			winW = $win.width();
		}
	});

	$(".main-visual").click(function () {
		if (winW <= 768) {
			var scrollTarget = $(".main-lead").offset().left - 40 - $scrollContents.offset().left;
			$scrollContents.animate({ scrollLeft: scrollTarget }, "slow");
		}
	});

	//pcの場合呼び出される
	function scrollFunction() {
		isSp || horizontalScrollSync()
	}

	//水平
	function horizontalScrollSync() {
		var containerHeight = $container.height();

		var scrollLeftPosition = current_pos / (containerHeight - winH) * ($scrollInner.width() + 20 - $scrollContents.width());

		//差が15以上ある場合にのみ設定されるため、頻繁なスクロールイベントを処理することを避けることができます。
		if (Math.abs($scrollContents.scrollLeft() - scrollLeftPosition) > 15) {
			$scrollContents.scrollLeft(scrollLeftPosition);
		}
	}

	//垂直
	function verticalScrollSync() {
		var scrollContentsLeftPos = $scrollContents.scrollLeft();

		var scrollTopPosition = scrollContentsLeftPos / ($scrollInner.width() + 20 - winW) * ($container.height() - winH);

		//差が15以上ある場合にのみ設定されるため、頻繁なスクロールイベントを処理することを避けることができます。
		if (Math.abs($win.scrollTop() - scrollTopPosition) > 15) {
			$win.scrollTop(scrollTopPosition);
		}
	}

	//垂直
	function verticalScrollFunctions() {
		var scrollContentsW = $scrollContents.width();
		var scrollContentsPos = $scrollContents.scrollTop();

		$(".scroll-in").each(function () {
			if ($(this).offset().left < scrollContentsPos + (5 * scrollContentsW) / 6) {
				$(this).addClass("show");
			}
		});

	}

	function modalToggle() {
		var $modal = $('.modal-wrapper');

		$('.modal-link').click(function () {
			$modal.addClass('show');
			$body.addClass('noscroll');
		});
		$modal.click(function (e) {
			if (!$(e.target).closest('.modal').length) {
				$modal.removeClass('show');
				$body.removeClass('noscroll');
			}
		})
		$('.close-btn').click(function () {
			$modal.removeClass('show');
			$body.removeClass('noscroll');
		});
	}

	var $parallax = $('.item-parallax');
	if ($parallax.length) {
		parallax();
		$scrollContents.on('scroll', parallax);
	}
	function parallax() {
		$parallax.each(function () {
			var $this = $(this);
			var parallax_pos_sp = $this.offset().left;
			var parallax_pos_pc = $this.offset().top;

			if (isSp) {
				$this.css('transform', 'translateX(' + -(current_btm - parallax_pos_sp - (winH / 1.75)) * 0.1 + 'px)');
				console.log('parallax_pos_sp', parallax_pos_sp)
			} else {
				$this.css('transform', 'translateX(' + (current_btm - parallax_pos_pc - (winH / 1.75)) * 0.1 + 'px)');
				console.log('parallax_pos_pc', parallax_pos_pc)
			}

		});
	}

	// function parallax(obj){
    //     var targetObj = obj,
    //         objH = targetObj.height(),
    //         viewportCenter = current_btm,
    //         movedY = 0,
    //         targetDistance = 0,
    //         ratio = 1;
    //     var props2 = targetObj.css('transform');
    //     if(props2 !== 'none'){
    //         movedY = props2.split('(')[1].split(')')[0].split(', ')[5] - 0;
    //     }
    //     if(targetObj.attr('data-speed')){
    //         ratio = targetObj.attr('data-speed') - 0;
    //     }
    //     targetDistance = targetObj.offset().left - viewportCenter - movedY;
    //     targetObj.css({transform: 'translateX(' + (targetDistance * ratio) + 'px)'})
    // }

	// function parallax(){
	// 	var itemWidth = $('.item-content-wrapper').width();
	// 	var setW      = current_pos/(itemWidth - (1000))*100;

	// 	$('.item-background').css('background-position-x',setW + '%');
		
	// }

	// function setSideBar() {
    //     var $current = $('.scroll-bar > .current');
    //     var contH    = $('.p-wrapper').outerHeight();
    //     var setH     = winTop/(contH - winH)*100;

    //     $current.css('height', setH + '%');
    // };

});