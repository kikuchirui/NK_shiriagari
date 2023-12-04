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



	$win.on({
		load: function () {
			$('.page-wrapper').addClass('show');

		},
		scroll: function () {
		
		},
		resize: function () {
        	
		}
	});




	
  
});