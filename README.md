# Lazy Loaded Simple Slideshow

Yes, yet another jQuery slideshow plugin! I wrote this because I wanted a simple to 
use slideshow which would only load the aditional images if Javascript is enabled 
and the DOM is ready.

## Usage

### Code
	<div id="promo-home">
		<div><img src="assets/images/home/banners/banner-1.jpg" width="630" height="280" alt="Default image"></div>
	</div>
	<script type="application/javascript" src="assets/js/jquery.simpleslideshow.js"></script>
	<script type="application/javascript">
	jQuery(function($){
		var slideshowData = [
			{"src":"assets/images/home/banners/banner-2.jpg", "alt":"This is banner"},
			{"src":"assets/images/home/banners/banner-3.jpg", "alt":"Banner with link", href:"http://www.aliaspooryorik.com/"},
			{"src":"assets/images/home/banners/banner-4.jpg", "alt":"Banner number 4"}
		];
		$('#promo-home').simpleSlideshow( {
			slideshowData: slideshowData
		} );
	});
	</script>
	
### Output
	<div id="promo-home">
		<div style="display: block; "><img src="assets/images/home/banners/banner-1.jpg" width="630" height="280" alt="Default image"></div>
		<div style="display: none; "><img src="assets/images/home/banners/banner-2.jpg" alt="This is banner"></div>
		<div style="display: none; "><a href="http://www.aliaspooryorik.com/"><img src="assets/images/home/banners/banner-3.jpg" alt="Banner with link"></a></div>
		<div style="display: none; "><img src="assets/images/home/banners/banner-4.jpg" alt="Banner number 4"></div>
	</div>
	<div id="promo-home-paging">
		<a data-slide="0" style="cursor:pointer">1</a>
		<a data-slide="1" style="cursor:pointer">2</a>
		<a data-slide="2" style="cursor:pointer">3</a>
		<a data-slide="3" style="cursor:pointer">4</a>
	</div>

### CSS

You are free to use whatever CSS you like, but this may help you get started

	#promo-home {width:650px; height:300px; margin:0 0 30px 0; position:relative;}
	#promo-home div {position:absolute; top:0; left:0; margin:0; padding:0; width:650px; height:300px; z-index: 11;}
	#promo-home img {border:10px solid #FFF; box-shadow: 0px 0px 4px #8b8b8b;}
	#promo-home-paging a {background-color:#d0d0d0; color:white; padding:5px; margin-right:5px;}
	
### optional arguments

	$('#promo-home').simpleSlideshow( {
		slideshowData: slideshowData, // an array of additional images
		slideFadeSpeed: 2000, // the amount of time (in ms) it takes to fade between slides
		slidePauseSpeed: 4000, // the amount of time (in ms) to show the slide for
		paging: true // show paging controls
	} );