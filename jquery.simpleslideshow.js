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
		if ( methods[options] ) {
			// calling a method;
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'simpleSlideshow' );
				instance[ options ].apply( instance, args );
			});
		} 
		else if ( typeof options === 'object' )
		{
			// initialize and attach to all the jquery objects passed in
			this.each(function() {
				var instance = $.data( this, 'simpleSlideshow' );
				if ( !instance ) { // instance doesn't already exists so create it
					$.data( this, 'simpleSlideshow', new $.simpleSlideshow( options, this ) );
				}
			});
		}
		else {
			$.error( 'Method ' +  options + ' does not exist on jQuery.simpleSlideshow' );
		}
		return this; // return for chaining    
	};
	
	// create a simpleSlideshow class
	$.simpleSlideshow = function( options, element ) {
		this.$el = $( element );
		this._init( options ); // initialize
	};
	
	
	$.simpleSlideshow.prototype = {
		// constructor
		_init: function( options ){
			this.options = $.extend( {
				'slideshowData'			: [],
				'slideFadeSpeed'		: 2000,
				'slidePauseSpeed'		: 4000,
				'paging'				: true,
				'autostart'				: true
			}, options );
			
			// get the number of additional images
			this.slideshowlen = this.options.slideshowData.length;
			this.$slides = [];
			this.currentSlide = 1; // 1 based
			
			$this = this.$el; // the jQuery object referencing the slideshow div (passed in on init)
			
			// check that the array has items and the slideshow container exists in the page
			if (this.slideshowlen > 0){
				
				// loop and append additional images
				$.each(this.options.slideshowData, function(ndx, el){
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
				this.$slides = $this.find('div');
				
				// paging
				this.pagerID = $this[0].id + '-paging';
				if (this.options.paging) {
					$pager = $('<div>').attr('id', this.pagerID);
					this.$slides.each(function(ndx){
						var slideIndex = ndx + 1;
						$('<a data-slide=' + ndx + '>' + slideIndex + '</a>').attr({
							style: 'cursor:pointer'
						}).click(function(){
							
						}).appendTo($pager);
					});
					$this.after($pager.show());
					$pager.find('a:eq(0)').addClass('current-slide');
				}
				
				// a really simple function to animate banners
				//var slideOrdinal = 1;
				
				/*
				changeSlide = function(){
					slideOrdinal = slideOrdinal === $slideshow.length ? 1 : slideOrdinal + 1;
					$slideshow.siblings().filter(':visible').fadeOut(this.options.slideFadeSpeed).end().eq(slideOrdinal - 1).fadeIn(this.options.slideFadeSpeed);
					$('#'+pagerID+'>a').removeClass('current-slide').eq(slideOrdinal-1).addClass('current-slide');
				};
				*/
				

			}
			
			if (this.options.autostart) {
				this.start();
			}
			
		},
		
		
		destroy : function( ) {
			return this.each(function(){
				$(window).unbind('.simpleSlideshow');
			})
		},
		

		start : function( ){
			var context = this; // note setInverval runs in the scope of the window so need to create an anonymous function so that a closure is created that contains a reference to the function
			this.timer = setInterval(
				function(){context.changeSlide();} 
				, this.options.slidePauseSpeed
			);
		},
		
		changeSlide : function( slideOrdinal ){
			slideOrdinal = slideOrdinal || this.currentSlide; // set default for optional argument
			
			this.currentSlide = slideOrdinal+1 > this.$slides.length ? 1 : slideOrdinal + 1;
			var context = this;
			this.$slides.siblings().filter(':visible').fadeOut(this.options.slideFadeSpeed).end().eq(this.currentSlide - 1).fadeIn(this.options.slideFadeSpeed, function(){
				$('#'+context.pagerID+'>a').removeClass('current-slide').eq(context.currentSlide-1).addClass('current-slide');
			});
		},
		
		stop : function( ){
			clearInterval(this.timer);
		}
		
	}
	
	// API	
	var methods = {
		
		

	};
	
})( jQuery );