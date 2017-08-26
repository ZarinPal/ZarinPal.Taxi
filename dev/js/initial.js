define(['jquery', 'slick', 'TweenMax'], ($, slick, TweenMax) => {
	$(document).ready(function () {
		let colors = '';
		$('.showcases').slick({
			autoplay: true,
			autoplaySpeed: 7500,
			dots: false,
			arrows: true,
			speed: 800,
			rtl: true,
			edgeFriction: 10,
			cssEase: 'ease-in-out'
		});
		$('.showcases').on('beforeChange', function (event, slick, cS, nextSlide) {
			const currentSlide = $('.showcases').find('.slide').eq(nextSlide+1);
			const color = currentSlide.data('color');
			colors += color + ' ';
			$('.showcases').removeClass(colors).addClass(color);
		});

		$('.signup-form').submit(function(e){
			const $submit = $('.signup-form .submit');
			const $message = $('.message');
			e.preventDefault();
			$.ajax({
				url:'https://api.zarinpal.com/rest/v3/oauth/registerUser.json',
				method:'POST',
				data: {
					'first_name': $('#first-name').val(),
					'last_name': $('#last-name').val(),
					'mobile': $('#number').val()
				},
				beforeSend: function () {
					$submit.addClass('loading').attr('disabled', true);
				},
				complete: function () {
					$submit.removeClass('loading').attr('disabled', false);
				}
			})
			.done(function (){
				$message.removeClass('danger success').addClass('success').html('مشخصات شما با موفقیت ثبت شد.');
			})
			.fail(function(){
				$message.removeClass('danger success').addClass('danger').html('عملیات ناموفق.');
			});
		});



		/**
		* Scroll
		*/
		$('a[href^="#"]').click(function(event){
			var element = $(this).attr('href'),
				offset  = $(element).offset().top;

			$('html, body').animate({scrollTop: offset}, 700);
			return false;
		});

		/**
		 * load and effect of header elements.
		 */
		$(function pageLoader() {
			setTimeout(function() {
				e()
			}, 50);
			var t = new TimelineMax({
				onUpdate: function() {},
				onComplete: function() {}
			})
			var e = function() {
				var introBox = $('.introbox')
				, lite = $('#heading-lite')
				, cover = $('#header-cover')
				, n = $('#heading-large')
				, r = $('#paragraph-lead')
				, w = $('#video-banner')
				, p = $('#header-features')
				, c = $('.icon-scroll')
				, s = $('nav.menu');
				t.to(introBox, .8, {
					y: '-100%',
					ease: Power3.easeInOut
				}, 'start').from(cover, 2, {
					opacity: 0,
					scale: 1.1,
					ease: Expo.linear
				}, 'start').from(s, 2, {
					opacity: 0,
					rotationY: -2,
					rotationZ: -100,
					ease: Expo.easeOut
				}, 'start').from(lite, 2, {
					opacity: 0,
					y: -50,
					rotationY: -14,
					rotationZ: -8,
					ease: Expo.easeInOut
				}, 'start =1.5').from(n, 1, {
					opacity: 0,
					y: -80,
					rotationY: -5,
					rotationZ: -8,
					ease: Expo.easeOut
				}, 'start =1.5').from(r, 1, {
					opacity: 0,
					y: 80,
					rotationY: -40,
					rotationZ: -8,
					ease: Expo.easeOut
				}, 'start =2').from(w, 2, {
					opacity: 0,
					y: 100,
					ease: Expo.easeOut
				}, 'start =2.5').from(p, 1, {
					opacity: 0,
					y: 100,
					ease: Expo.easeOut
				}, 'start =3').to(c, 1, {
					opacity: 1,
					ease: Expo.easeOut
				}, 'start =3.5')
			}
		});

		/**
		 * .animate element in a screen view?
		 */
		$(function inView() {
			$(window).on('scroll', function () {
				scrollInView();
			});
			scrollInView();

			const $el = $('.animate');

			function scrollInView() {
				window.requestAnimationFrame(() => {
					const scrollTop = $(window).scrollTop();
					const windowHeight = $(window).outerHeight();
					const fullHeight = scrollTop + windowHeight;
					$.each($el, function() {
						const t = $(this);
						const height = t.outerHeight();
						const offsetTop = t.offset().top;
						(offsetTop + height >= scrollTop - 100) && (offsetTop <= fullHeight) ? t.addClass('in-view') : t.removeClass('in-view')
					});
				});
			};
		});

	});
});
