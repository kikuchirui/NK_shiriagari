$(function () {
	var breakPoint = 768,
		isSp = !1,
        $win = $(window),
        winH = $win.height(),
        winW = $win.width(),
        current_pos = $win.scrollTop(),
        $body = $('body'),
		$scrollContents = $('.scroll-contents'),
		$scrollInner    = $('.scroll-inner'),
		$container      = $('.g-container') 
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

	$win.width() < breakPoint && (isSp = !0);
	$win.on({
		load: function () {
			winH = $win.height();
        	winW = $win.width();
        	current_pos = $win.scrollTop();

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
				$scrollContents.on("scroll", function() {
					verticalScrollSync();
					verticalScrollFunctions();
				});
			}
		
			scrollFunction();
		},
		scroll: function () {
			winH = $win.height();
        	winW = $win.width();
        	current_pos = $win.scrollTop();

			scrollFunction();
		},
		resize: function () {
        	winW = $win.width();
		}
	});

	$(".main-visual").click(function() {
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
		
		var scrollLeftPosition = current_pos / (containerHeight - winH) * ( $scrollInner.width() + 20 - $scrollContents.width());
		
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
	  
		$(".scroll-in").each(function() {
		  if ($(this).offset().left < scrollContentsPos + (5 * scrollContentsW) / 6) {
			$(this).addClass("show");
		  }
		});
	  
	}
  
});