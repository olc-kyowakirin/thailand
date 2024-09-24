// Kyowa Hakkou Kirin Co.Ltd
// News Releases
//

var nrs = new Object();
nrs.targetId = "";
nrs.mbHTML = "";
nrs.mbArray = [];
nrs.folder = "/news_releases/";
nrs.hName = "/index.html";
nrs.years ="";
nrs.invMin = 3;
nrs.inCnt =0;
nrs.okflg = false;
nrs.endInt;
nrs.idKey = 'latest_news_';
nrs.classKey = 'div.latestNewsArea';

nrs.releasesOut = (function () {
										
	//release id years serch
	$('[id^=latest_news_]').each(function(i){
		nrs.targetId = $(this).attr('id');
		var ty = nrs.targetId.split('latest_news_');
		nrs.years = ty[1];
	});

	$(nrs.classKey).html('<p>Loading data...</p>');
	$(nrs.classKey).css('visibility','visible');

	//xml load
	if(nrs.years !=""){

		nrs.mbHTML ='<dl class="searchResult">';

		var filName = nrs.folder + nrs.years + nrs.hName + '?' + Math.round( Math.random()*65535);
		$.ajax({
			type: "GET",
			url: filName,
			dataType: "html",
			success: dataset,
			error: function(XMLHttpRequest, textStatus, errorThrown){
					var years1 = Number(nrs.years) -1;
					var years2 = years1.toString();
					var nfilName = nrs.folder + years2 + nrs.hName + '?' + Math.round( Math.random()*65535);
					$.ajax({
						type: "GET",
						url: nfilName,
						dataType: "html",
						success: dataset,
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							//alert(XMLHttpRequest + "/" + textStatust + "/" + errorThrown);
						}
					});
			}
		});
	}

	function dataset(xml) {

		xmlparse(xml);		//xml -> 配列

		//出力可能判定
		nrs.endInt = setInterval(function(){
			if(nrs.okflg == true){
				clearInterval(nrs.endInt);

				nrs.mbArray.sort(function(a, b) {return a["latest"] > b["latest"] ? 1 : -1;});
				nrs.mbHTML ='<dl class="searchResult">';
				$(nrs.mbArray).each(function (i) {
					if(this['data']) nrs.mbHTML += this['data'];
				});
				nrs.mbHTML +='</dl>';

				$(nrs.classKey).html(nrs.mbHTML);
			}
		},100);

	};

});

function xmlparse(xml) {

	$(xml).find('[id^=' + nrs.idKey +']').each(function (i) {
		var dHtml ="";
		var xdt = "";
		var xid =$(this).attr('id').split(nrs.idKey);
		d_latest = parseInt(xid[1]);
		var xdta = $(this).text().split(',');
		xdt = xdta[1].toString();
		dHtml +='<dt>' + $(this).html() +'</dt>';
		if($(this).next()) dHtml += '<dd>' + $(this).next().html() +'</dd>';
		nrs.mbArray[nrs.inCnt] = {'latest':d_latest.toString(),'data':dHtml};
		nrs.inCnt++;
		if(nrs.inCnt >= nrs.invMin) return false;	
	});

	if(nrs.inCnt<nrs.invMin) {		//latests -> Do not meet the minimum, read the previous year
		var years1 = Number(nrs.years)-1;
		var years2 = years1.toString();
		var nfilName = nrs.folder + years2 + nrs.hName + '?' + Math.round( Math.random()*65535);
			
		$.ajax({
			type: "GET",
			url: nfilName,
			dataType: "html",
			success: xmlparse,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				nrs.okflg = true;
			}
		});
	
	} else {
		nrs.okflg = true;
	}

}

document.write('<style>#latest_news_2012{visibility:hidden}</style>');
document.write('<style>#latest_news_2013{visibility:hidden}</style>');
document.write('<style>#latest_news_2014{visibility:hidden}</style>');
document.write('<style>#latest_news_2015{visibility:hidden}</style>');
document.write('<style>#latest_news_2016{visibility:hidden}</style>');
document.write('<style>#latest_news_2017{visibility:hidden}</style>');
document.write('<style>#latest_news_2018{visibility:hidden}</style>');
document.write('<style>#latest_news_2019{visibility:hidden}</style>');
document.write('<style>#latest_news_2020{visibility:hidden}</style>');
document.write('<style>#latest_news_2021{visibility:hidden}</style>');
document.write('<style>#latest_news_2022{visibility:hidden}</style>');
document.write('<style>#latest_news_2023{visibility:hidden}</style>');

nrs.nrLoc = decodeURI(location.href).split('/');
nrs.hName = '/' + nrs.nrLoc[nrs.nrLoc.length-1];

$(document).ready(function(){
	nrs.releasesOut();
});