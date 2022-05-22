<template> 
  <!-- Header -->
  <header id="header">
    <div class="logo">
      <a class="green-btn-text" href="#">Url Shortener</a>
    </div>
  </header>
  <!-- End Header -->
  <UrlShortener />
  <!-- Footer -->
  <footer id="footer">
    <div class="container d-flex justify-content-end">
      <div class="copyright">
        &copy; Copyright <strong><span>2022 UrlShortener</span></strong>. All Rights Reserved
      </div>
    </div>
  </footer>
  <!-- End Footer -->
		<!-- <div id="preloader"></div>
		<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a> -->
</template>

<script>
import { select, onscroll } from 'assets/js/shortcut.js'
import UrlShortener from 'components/UrlShortener.vue'

export default {
  name: 'App',
  components: {
    UrlShortener,
  },
  methods: {    
  },
  mounted() {
    //Preloader
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.style.display = "none";
      });
    }
    //Back to top button
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  },
}
</script>

<style lang="scss">
@import 'assets/scss/_variables.scss';

/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
#header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  height: 120px;
	padding: 0;
	background: $background-color;	
	.logo {
		height: 70px;
		width: auto;
		a {
			height: 100%;
      font-size: 50px;
      line-height: 1.2;
      letter-spacing: 1px;
			text-align: center;
			color: $green-default;
			text-shadow: 0 2px 2px $green-disabled;
			text-decoration: none;
		}
	}
}

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
#footer {
	position: relative;
	width: 100%;
	border-top: 1px #E0E0E0 solid;
	color: $dark-text-color;
	font-size: 14px;
	.copyright {
		margin: 19px 7px;
		text-align: center;
		font-family: 'PingFang HK';
		font-style: normal;
		font-weight: 400;
		line-height: 21px;
		color: $grey;
	}
}
</style>
