/**
 * -------------------------------------------------
 * Simple Slideshow with optional paging
 * John Whish www.aliaspooryorik.com
 * -------------------------------------------------
 * Usage:
 * <div id="promo-home">
 * 	<div><img src="assets/images/home/banners/banner-1.jpg" width="630" height="280" alt="Default image" /></div>
 * </div>
 * <script type="application/javascript" src="assets/js/jquery.simpleslideshow.js"></script>
 * <script type="application/javascript">
 * jQuery(function($){
 *   var slideshowData = [
 * 	   {"src":"assets/images/home/banners/banner-2.jpg", "alt":"This is banner"},
 * 	   {"src":"assets/images/home/banners/banner-3.jpg", "alt":"Nanner with link", href:"http://www.aliaspooryorik.com/"},
 * 	   {"src":"assets/images/home/banners/banner-4.jpg", "alt":"Banner number 4"}
 * 	 ];
 * 	 $('#promo-home').simpleSlideshow( {
 * 	   slideshowData: slideshowData
 * 	 } );
 * });
 * </script>
 * -------------------------------------------------
 */
(function( $ ) {

	$.fn.simpleSlideshow = function( options ) {
		// default options
		var settings = $.extend( {
			'slideshowData'			: [],
			'slideFadeSpeed'		: 2000,
			'slidePauseSpeed'		: 4000
		}, options );
	
		// refer to settings as settings.xyz 
		var $this = $(this);
		
		// get the number of additional images
		var slideshowlen = settings.slideshowData.length;
	
		// check that the array has items and the slideshow container exists in the page
		if ($this.length > 0 && slideshowlen > 0){
			
			// loop and append additional images
			$.each(settings.slideshowData, function(ndx, el){
				var banner = '<img src=' + el.src + ' alt=' +el.alt + '>';
				if (el.href){
					banner = '<a href=' + el.href + '>' + banner + '</a>';
				}
				$placeholder = $('<div>').hide().append(banner);
				$this.append($placeholder);
			});
			
			
			// get all images for the slideshow
			var $slideshow = $this.find('div');
			
			$pager = $('<div>').attr('id', $this[0].id + '-paging');
			$slideshow.each(function(ndx){
				var slideIndex = ndx+1;
				$('<a data-slide=' + ndx + '>' + slideIndex +'</a>').attr({style:'cursor:pointer'}).click(function(){
					$slideshow.fadeOut(settings.slideFadeSpeed).eq($(this).data('slide')).fadeIn(settings.slideFadeSpeed);
					clearInterval(t);
				}).appendTo($pager);
			});
			$this.after($pager.show());
			
			// a really simple function to animate banners
			var slideOrdinal = 1;
			changeSlide = function(){
				slideOrdinal = slideOrdinal === $slideshow.length ? 1 : slideOrdinal + 1;
				$slideshow.siblings().filter(':visible').fadeOut(settings.slideFadeSpeed).end().eq(slideOrdinal - 1).fadeIn(settings.slideFadeSpeed);
			};
			
			// wait before firing
			t = setInterval(changeSlide, settings.slidePauseSpeed);
		}
	};
	
})( jQuery );