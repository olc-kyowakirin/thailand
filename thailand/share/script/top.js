// JavaScript Document

$(function(){
	
	$(".js-open").click(function(){
		$('.index-section__list').css('transition', '');
		$(".index-section__list").toggleClass("more");
		$(this).toggleClass("close");
	});
	
	$(window).on('resize', function(){
		$('.index-section__list').css('transition', 'none');
		
	});
	
	var size = $('.index-section__list li').length;
	if(size > 4){
		$(".index-section__list").addClass("slide");
	}
	
});