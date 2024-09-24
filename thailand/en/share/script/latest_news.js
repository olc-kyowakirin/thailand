var lts = [];
lts.runsuc = false;
lts.readyInt;

$.fn.kyowalatestNews = function(){
	var mbArray = [];
	var targetId = "";
	var folder = "/news_releases/";
	var hName = "/index.html";
	var idKey = 'latest_news_';
	var years ="";
	var invMin = 3;
	var inCnt =0;
	var xmlsuc = false;
	var xmlInt;

	//var nrLoc = decodeURI(location.href).split('/');
	//var hName = '/' + nrLoc[nrLoc.length-1];

	//release id years serch
	$('[id^=latest_news_]').each(function(i){
		targetId = $(this).attr('id');
		var ty = targetId.split('latest_news_');
		years = ty[1];
	});

	//xml load
	if(years !=""){
		var filName = folder + years + hName + '?' + Math.round( Math.random()*65535);
		$.ajax({
			type: "GET",
			url: filName,
			dataType: "html",
			success: dataset,
			error: function(XMLHttpRequest, textStatus, errorThrown){
				var years1 = Number(years) -1;
				var years2 = years1.toString();
				var nfilName = folder + years2 + hName + '?' + Math.round( Math.random()*65535);
				$.ajax({
					type: "GET",
					url: nfilName,
					dataType: "html",
					success: dataset,
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						//alert(XMLHttpRequest + "/" + textStatust + "/" + errorThrown);
						clearInterval(lts.readyInt);
					}
				});
			}
		});
	} else {
		clearInterval(lts.readyInt);
	}

	function dataset(xml) {
		xmlparse(xml);		//xml -> 配列
		var tmp = [];
		//出力可能判定
		xmlInt = setInterval(function(){
			if(xmlsuc == true){
				clearInterval(xmlInt);
				mbArray.sort(function(a, b) {return a["latest"] > b["latest"] ? 1 : -1;});
				$(mbArray).each(function (i) {
					if((this['date'] != 'undefined')&&(i<invMin) && tmp[this['title']] != '1') {
						if(this['date'] !="") $config['news' + (i+1)]['date'] = this['date'];
						if(this['link'] !="") $config['news' + (i+1)]['link'] = this['link'];
						if(this['title'] !="") $config['news' + (i+1)]['text'] = this['title'];
						if(this['pdf'] !="") $config['news' + (i+1)]['pdf'] = this['pdf'];
						if(this['pdf_capa'] !="") $config['news' + (i+1)]['pdf_capa'] = this['pdf_capa'];
						tmp[this['title']] = '1';
					}
				});
					
				lts.runsuc = true;
			}
		},200);

	}

	function xmlparse(xml) {
		var d_latest = null;
		var d_date = null;	
		var d_link = null;	
		var d_title = null;	
		var d_pdf = null;	
		var d_size = null;
	
		$(xml).find('[id^=' + idKey +']').each(function (i) {
														 
			var dHtml ="";
			var xdt = "";
			var xid =$(this).attr('id').split(idKey);
			d_latest = parseInt(xid[1]);
			var xdta = $(this).text().split(',');
			xdt = xdta[1].toString();
			d_date = xdta[0];

			d_title = $(this).next().text();
			d_link = $(this).next().find('a').attr('href');	

			if($(this).next().html().indexOf('btn_pdf.gif') != -1) {
				d_pdf = d_link;
				d_link = null;
			}

			$(this).next().find('span').each(function (i) {
				d_size = $(this).text();
				d_size = d_size.replace(/\(|\)/g, "");
			});

			mbArray[inCnt] = {'latest':d_latest.toString(),'date':d_date,'link':d_link, 'title':d_title, 'pdf':d_pdf, 'pdf_capa':d_size};
			inCnt++;
			if(inCnt >= invMin) return false;	
		});

		if(inCnt<invMin) {		//latests -> Do not meet the minimum, read the previous year
			var years1 = Number(years)-1;
			var years2 = years1.toString();
			var nfilName = folder + years2 + hName + '?' + Math.round( Math.random()*65535);

			$.ajax({
				type: "GET",
				url: nfilName,
				dataType: "html",
				success: xmlparse,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//dataOut();
					xmlsuc = true;
				}
			});
	
		} else {
			//dataOut();
			xmlsuc = true;

		}


	}

}

document.write('<style>#latestNews{visibility:hidden}</style>');
document.write('<style>#carousel{position:relative;overflow:hidden;height:489px}</style>');
$().kyowalatestNews();
$(document).ready(function(){
	lts.readyInt = setInterval(function(){
		if(lts.runsuc == true) {
			clearInterval(lts.readyInt);
			$("#wrapper").after('<script type="text/javascript" src="share/script/jquery.lib.min.js"></script>');
			$("#latestNews").css('visibility','visible');
		}
	},250);
}); 
