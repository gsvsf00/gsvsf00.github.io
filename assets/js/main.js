;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		// Get the current theme's chart border color from CSS variables
		const chartColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-border-color').trim() || '#FF9000';
		const trackColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#333' : '#f5f5f5';
		
		$('.chart').each(function() {
			const $this = $(this);
			const $dataPercent = $this.data('percent');
			
			// The HTML already contains the correct structure with spans and skill names
			// We don't need to modify it, just initialize the chart
			
			// Initialize the chart
			$this.easyPieChart({
				scaleColor: false,
				lineWidth: 4,
				lineCap: 'butt',
				barColor: chartColor,
				trackColor: trackColor,
				size: 160,
				animate: 1000
			});
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

// New functions for WhatsApp and Email contact
function sendViaWhatsApp() {
    // Get form data
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    
    // Format message for WhatsApp
    var whatsappMessage = "Hello, my name is " + firstName + " " + lastName + ".\n\n";
    whatsappMessage += "Subject: " + subject + "\n\n";
    whatsappMessage += message;
    
    // Phone number should be in international format without any symbols, e.g., 551199999999
    // Replace this with your actual WhatsApp number in international format (no plus sign, no dashes)
    var phoneNumber = "5585998401693"; 
    
    // Create WhatsApp web link
    var whatsappLink = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
}

function sendViaEmail() {
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var senderEmail = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    
    // Your email address
    var yourEmail = 'bielsen.tech@gmail.com';
    
    // Format the message body with sender details
    var body = "From: " + firstName + " " + lastName + " <" + senderEmail + ">\n\n" + message;
    
    // Try to detect user's email client
    var userAgent = navigator.userAgent.toLowerCase();
    
    // The mailto link
    var mailtoLink = "mailto:" + yourEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    
    // Special handling for common clients
    if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') === -1) {
        // For Gmail in Chrome
        var gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(yourEmail) + 
                      "&su=" + encodeURIComponent(subject) + 
                      "&body=" + encodeURIComponent(body);
        
        window.open(gmailLink, '_blank');
    } else if (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1 || userAgent.indexOf('edge') > -1) {
        // For Outlook Web
        var outlookLink = "https://outlook.office.com/mail/deeplink/compose?to=" + encodeURIComponent(yourEmail) + 
                        "&subject=" + encodeURIComponent(subject) + 
                        "&body=" + encodeURIComponent(body);
        
        window.open(outlookLink, '_blank');
    } else {
        // Default to mailto for other browsers/clients
        window.location.href = mailtoLink;
    }
}
