/*
 * ----------------------------------------------------------------------
 * Simple Slideshow with optional paging
 * John Whish www.aliaspooryorik.com
 * ----------------------------------------------------------------------
 * Wiki: https://github.com/aliaspooryorik/Lazy-Loaded-Simple-Slideshow
 * ----------------------------------------------------------------------
 */
(function( $ ) {

	$.fn.simpleSlideshow = function( options ) {
		// default options
		var settings = $.extend( {
			'slideshowData'			: [],
			'slideFadeSpeed'		: 2000,
			'slidePauseSpeed'		: 4000,
			'paging'				: true
		}, options );
	
		// refer to settings as settings.xyz 
		var $this = $(this);
		
		// get the number of additional images
		var slideshowlen = settings.slideshowData.length;
	
		// check that the array has items and the slideshow container exists in the page
		if ($this.length > 0 && slideshowlen > 0){
			
			// loop and append additional images
			$.each(settings.slideshowData, function(ndx, el){
				if ($.isPlainObject(el)) {
					var banner = '<img src="' + el.src + '" alt="' + el.alt + '">';
					if (el.href) {
						banner = '<a href="' + el.href + '">' + banner + '</a>';
					}
				} 
				else {
					var banner = el;
				}
				$placeholder = $('<div>').hide().append(banner);
				$this.append($placeholder);
				
			});
			
			
			// get all images for the slideshow
			var $slideshow = $this.find('div');
			
			// paging
			var pagerID = $this[0].id + '-paging';
			if (settings.paging) {
				$pager = $('<div>').attr('id', pagerID);
				$slideshow.each(function(ndx){
					var slideIndex = ndx + 1;
					$('<a data-slide=' + ndx + '>' + slideIndex + '</a>').attr({
						style: 'cursor:pointer'
					}).click(function(){
						$slideshow.fadeOut(settings.slideFadeSpeed).eq($(this).data('slide')).fadeIn(settings.slideFadeSpeed);
						clearInterval(t);
					}).appendTo($pager);
				});
				$this.after($pager.show());
				$pager.find('a:eq(0)').addClass('current-slide');
			}
			
			// a really simple function to animate banners
			var slideOrdinal = 1;
			changeSlide = function(){
				slideOrdinal = slideOrdinal === $slideshow.length ? 1 : slideOrdinal + 1;
				$slideshow.siblings().filter(':visible').fadeOut(settings.slideFadeSpeed).end().eq(slideOrdinal - 1).fadeIn(settings.slideFadeSpeed);
				$('#'+pagerID+'>a').removeClass('current-slide').eq(slideOrdinal-1).addClass('current-slide');
			};
			
			// wait before firing
			t = setInterval(changeSlide, settings.slidePauseSpeed);
		}
	};
	
})( jQuery );