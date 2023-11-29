// 変数の形式を揃える
//ex1) キャメールケース：camelCase
//ex2) スネークケース：snake_case
//シングルクオート か ダブルクオート揃える


$(function () {
	var breakPoint    = 768,
		isSp          = !1,
        $win          = $(window),
        winH          = $win.height(),
        winW          = $win.width(),
        current_pos   = $win.scrollTop(),
        current_btm   = current_pos + winH,
        currentCenter = current_pos + winH / 2,
        $body         = $('body'),
        pageHeight    = $(document).innerHeight(); //セミコロン消す
		// $scrollContents = $('.scroll-contents') // 複数使うものは変数にしても良さそう
		// $scrollInner    = $('.scroll-inner') // 複数使うものは変数にしても良さそう
		// $container      = $('.g-container') // 複数使うものは変数にしても良さそう
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

	$body.addClass('noscroll');

	$(window).width() < breakPoint && (isSp = !0); // $(window) → $winに置き換える
	$win.on({
		load: function () {
			// winW = $win.width(); // 取得する
			// winH = $win.height(); // 取得する
			// current_pos   = $win.scrollTop() // 取得する

			setTimeout(function () {
				$(".loading").addClass("complete");

				setTimeout(function() {
					$(".scroll-contents").addClass("scrollable");
					$(".scroll-inner").addClass("show");
					$body.removeClass('noscroll');
					$body.addClass('scroll'); // $body.removeClass('noscroll')しているのでaddClassしなくても大丈夫そう
					if (!isSp) {
						$(".g-container").addClass("scrollable-vertical");
					}					
				}, 2500);
		
				setTimeout(function() {
					verticalScrollFunctions();
				}, 3500);
		
				if (isSp) {
					$(".scroll-contents").on("scroll", function () {
						verticalScrollFunctions();
						walkingPan();
					});
				} else {
					$(".scroll-contents").on("scroll", function() {
						verticalScrollSync();
						verticalScrollFunctions();
					});
				}
		
				scrollFunction();
				walkingPan();
			}, 1000);
		},
		scroll: function () {
			// winW = $win.width(); // 取得する
			// winH = $win.height(); // 取得する
			// current_pos   = $win.scrollTop() // 取得する
			
			scrollFunction();
			walkingPan();
			
		},
		resize: function () {
			// winW = $win.width(); // 取得する

			walkingPan();
		}
	});

	function walkingPan() {
		var scrollPos = $(this).scrollTop(); // $(this)がスクロールとリサイズのとき該当するものが無さそうです
		var pan1YPosition = Math.sin(scrollPos / 20) * 3;
		var pan2YPosition = Math.sin(scrollPos / 20) * 3;
		var pan3YPosition = Math.sin(scrollPos / 20) * 3;
		var rotation2 = Math.sin(scrollPos / 30) * 8;
		var rotation3 = Math.sin(scrollPos / 30) * 2.5;

		var scrollPosLeft = $(".scroll-contents").scrollLeft();
		var pan1YPositionSp = Math.sin(scrollPosLeft / 20) * 3;
		var pan2YPositionSp = Math.sin(scrollPosLeft / 20) * 3;
		var pan3YPositionSp = Math.sin(scrollPosLeft / 20) * 3;
		var rotation2Sp = Math.sin(scrollPosLeft / 30) * 8;
		var rotation3Sp = Math.sin(scrollPosLeft / 30) * 2.5;

		var pan = $('.walk-pan');

		console.log(".scroll-contents scrolleft;" + $(".scroll-contents").scrollLeft());

		if ($(window).width() > breakPoint) { // $(window).width() → winWに置き換える
			if (pan.offset().left + pan.outerWidth() >= $('[data-walk-end]').offset().left) {
				pan.css({
					'position': 'absolute',
					'margin-left': '370px',
				});
				pan.addClass('walk-end');
				$('.walk-pan .pan1').css('transform', 'translateY(0)');
				$('.walk-pan .pan2').css('transform', 'translateY(0) rotate(0)');
				$('.walk-pan .pan3').css('transform', 'translateY(0) rotate(0)');
			} else {
				$('.walk-pan .pan1').css('transform', 'translateY(' + pan1YPosition + 'px)');
				$('.walk-pan .pan2').css('transform', 'translateY(' + pan2YPosition + 'px) rotate(' + rotation2 + 'deg)');
				$('.walk-pan .pan3').css('transform', 'translateY(' + pan3YPosition + 'px) rotate(' + rotation3 + 'deg)');
			}
		} else {
			if (!pan.hasClass('walk-end')) {
				if ($(".scroll-contents").scrollLeft() > pan.offset().left - 20) {
				  pan.addClass('fixed-sp');
				}
			}
			if (pan.offset().left <= $('[data-walk-start]').offset().left + $('[data-walk-start]').outerWidth()) {
				pan.removeClass('fixed-sp');
			}
			if (pan.offset().left + pan.outerWidth() >= $('[data-walk-end]').offset().left) {
				pan.css({
					'position': 'absolute',
					'margin-left': $(window).height() < 635 ? ((370 / 635) * 100) + 'vh' : '370px',
				});	
				// pan.css({
				// 	'position': 'absolute',
				// 	'margin-left': $(window).height() <= 635 ? ($('[data-walk-end]').offset().left - 20) + 'px' : '370px',
				// });
				  
				pan.addClass('walk-end');
				pan.removeClass('fixed-sp');

			}

			if (pan.hasClass('fixed-sp')) {
				$('.walk-pan .pan1').css('transform', 'translateY(' + pan1YPositionSp + 'px)');
				$('.walk-pan .pan2').css('transform', 'translateY(' + pan2YPositionSp + 'px) rotate(' + rotation2Sp + 'deg)');
				$('.walk-pan .pan3').css('transform', 'translateY(' + pan3YPositionSp + 'px) rotate(' + rotation3Sp + 'deg)');
			} else {
				$('.walk-pan .pan1').css('transform', 'translateY(0)');
				$('.walk-pan .pan2').css('transform', 'translateY(0) rotate(0)');
				$('.walk-pan .pan3').css('transform', 'translateY(0) rotate(0)');				
			}
		}
	}

	//pcの場合呼び出される
	function scrollFunction() {
		isSp || horizontalScrollSync()
	}

	//水平
	function horizontalScrollSync() {
		var $win = $(window); // 上で宣言しているので要らなそう
        var winH = $win.height(); // 上で宣言しているので要らなそう
		var current_pos = $win.scrollTop(); // 上で宣言しているので要らなそう
		
		var $scrollContents = $(".scroll-contents"); 
		var $scrollInner = $(".scroll-inner");
		var containerHeight = $(".g-container").height();
		
		var scrollLeftPosition = current_pos / (containerHeight - winH) * ( $scrollInner.width() + 20 - $scrollContents.width());
		
		//差が15以上ある場合にのみ設定されるため、頻繁なスクロールイベントを処理することを避けることができます。
		if (Math.abs($scrollContents.scrollLeft() - scrollLeftPosition) > 15) {
		  $scrollContents.scrollLeft(scrollLeftPosition);
		}
	}

	//垂直
	function verticalScrollSync() {
		var $win = $(window); // 上で宣言しているので要らなそう
		var winH = $win.height(); // 上で宣言しているので要らなそう
		var winW = $win.width(); // 上で宣言しているので要らなそう
		var scrollContentsLeftPos = $(".scroll-contents").scrollLeft();
		var $scrollInner = $(".scroll-inner");
		var $container = $(".g-container");
		
		var scrollTopPosition = scrollContentsLeftPos / ($scrollInner.width() + 20 - winW) * ($container.height() - winH);

		//差が15以上ある場合にのみ設定されるため、頻繁なスクロールイベントを処理することを避けることができます。
		if (Math.abs($win.scrollTop() - scrollTopPosition) > 15) { // $win.scrollTop → current_posに置き換える
		  $win.scrollTop(scrollTopPosition);
		}
	}

	//垂直
	function verticalScrollFunctions() {
		var scrollContentsW = $(".scroll-contents").width();
		var scrollContentsPos = $(".scroll-contents").scrollTop();
	  
		console.log("scroll");
	  
		$(".scroll-in").each(function() {
		  if ($(this).offset().left < scrollContentsPos + (5 * scrollContentsW) / 6) {
			$(this).addClass("show");
		  }
		});
	  
		if ($('.main-lead').hasClass('show')) {
		  $('.walk-pan').addClass('show');
		}
	}
  
});