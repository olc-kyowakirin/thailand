// JavaScript Document



// globalNavi current

$(function(){
	var url = location.pathname.split("/")[1];
	var gNav = $('#globalNavi ul.mega li a:not(.megamenu a)');

	gNav.each(function(){
		if( $(this).attr('href').split("/")[1] == url ) {
			$(this).parents('li').addClass('current');
			$('img:not(.megamenu a)', this).attr('src', $('img:not(.megamenu a)', this).attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1_on$2'));
		};
	});
});


// img modal

$(function(){
	
	var imgModal = $('img.modalImg');
	imgModal.each(function () {
		$(this).after('<span class=' + '"' + 'btnModal' + '"' + '>+ zoom</span>');
	});
	
    $('.btnModal').click(function(){
		var imgModalURL = $(this).siblings('img.modalImg').attr('src');
		$('body').prepend('<div class=' + '"' + 'overlayModal' + '"' + '><div class=' + '"' + 'modal' + '"' + '><span>' + 'close' + '</span><img src=' + '"' + imgModalURL + '"' + '></div></div>');
		$('.overlayModal').css('height', $(document).height() + 'px');
		var ScrTop = $(document).scrollTop();
		var imgHeight = $('.overlayModal .modal img').height();
		$('.overlayModal .modal img, .overlayModal .modal span').css('top', $(window).height() / 2 + ScrTop);
		$('.overlayModal .modal span').css('margin-top', - imgHeight / 2 - 50);
		$('.overlayModal, .modal, .modal span, .modal img').fadeIn(350);
    });
	
    $('body').on('click', '.overlayModal, .modal, .modal span', function(){
        $('.overlayModal, .modal, .modal span, .modal img').remove();
    });
	
});
