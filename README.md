# Lazy Loaded Simple Slideshow

Yes, yet another jQuery slideshow plugin! I wrote this because I wanted a simple to 
use slideshow which would only load the aditional images if Javascript is enabled 
and the DOM is ready. You can also have custom HTML as a slide.

## Usage

### Simple code example

	<div id="promo-home">
		<div><img src="assets/images/home/banners/banner-1.jpg" width="630" height="280" alt="Default image"></div>
	</div>
	<script type="application/javascript" src="assets/js/jquery.simpleslideshow.js"></script>
	<script type="application/javascript">
	jQuery(function($){
		var slideshowData = [
			'<img src="assets/images/banner-2.jpg" alt="banner 2">', 
			'<a href="http://www.aliaspooryorik.com/"><img src="assets/images/banner-3.jpg" alt="Banner with link"></a>'
		];
		$('#promo-home').simpleSlideshow( {
			slideshowData: slideshowData
		} );
	});
	</script>
	
### The code above will create this HTML
	<div id="promo-home">
		<div style="display: block; "><img src="assets/images/home/banners/banner-1.jpg" width="630" height="280" alt="Default image"></div>
		<div style="display: none; "><img src="assets/images/home/banners/banner-2.jpg" alt="Banner 2"></div>
		<div style="display: none; "><a href="http://www.aliaspooryorik.com/"><img src="assets/images/home/banners/banner-3.jpg" alt="Banner with link"></a></div>
	</div>
	<div id="promo-home-paging">
		<a data-slide="0" style="cursor:pointer" class="current-slide">1</a>
		<a data-slide="1" style="cursor:pointer">2</a>
		<a data-slide="2" style="cursor:pointer">3</a>
	</div>

### Styling with CSS

You are free to use whatever CSS you like, but this may help you get started

	#promo-home {width:650px; height:300px; margin:0 0 30px 0; position:relative;}
	#promo-home div {position:absolute; top:0; left:0; margin:0; padding:0; width:650px; height:300px; z-index: 11;}
	#promo-home-paging a {background-color:#d0d0d0; color:white; padding:5px; margin-right:5px;}
	#promo-home-paging a.current-slide {background-color:red;}
	
### optional arguments

The simpleSlideshow plugin accepts four arguments which are shown below (with the defaults). They are all optional.

	$('#promo-home').simpleSlideshow( {
		slideshowData: slideshowData, // an array of additional images
		slideFadeSpeed: 2000, // the amount of time (in ms) it takes to fade between slides
		slidePauseSpeed: 4000, // the amount of time (in ms) to show the slide for
		paging: true // show paging controls
	} );
	
### Working with JSON

You can also power the slideshow using JSON. For example:

<div id="promo-home">
	<div><img src="assets/images/home/banners/banner-1.jpg" width="630" height="280" alt="Default image"></div>
</div>


<script type="application/javascript" src="assets/js/jquery.simpleslideshow.js"></script>
<script type="application/javascript">
jQuery(function($){
	// this JSON could come from an AJAX call
	var slideshowData = [
		{"src":"assets/images/banner-2.jpg", "alt":"banner 2"},
		{"src":"assets/images/banner-3.jpg", "alt":"banner 3", "href":"http://www.aliaspooryorik.com/"}
	];
	$('#promo-home').simpleSlideshow( {
		slideshowData: slideshowData
	} );
});
</script>