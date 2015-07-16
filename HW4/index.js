window.onscroll = function(){
	var ScrT = document.body.scrollTop;
	var CliH = document.body.clientHeight;
	var ScrH = document.body.scrollHeight;
	if(ScrT >=ScrH - CliH - 1000)
	{
		AddPhotoGrid("ul1");
		InsertPhotoGrid();
	}
}

//放大
$(function(){
	var bigImg= '';
	var _index=0;
	$(".popup").click(function(){
		$(".show").hide();
		$(this).hide();
		$(".comment-container").hide();
	});
	$(".pic-grid img").click(function()
	{
		$(".popup").show();
		$(".show").show();
		$(".comment-container").show();
		bigImg = $(this).attr("src");
		$(".show img.big").attr("src",bigImg);
		_index = $(this).index();
	});
})

//返回頁頂
$(function(){
    $("#BackToTop").click(function(){
        jQuery('html,body').animate({
            scrollTop:0
        },300);
    });
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 150){
            $('#BackToTop').fadeIn("fast");
        } else {
            $('#BackToTop').stop().fadeOut("fast");
        }
    });
 });

var maxPics = 200;
var pics = 40;

//載入圖片格
function AddPhotoGrid(elem)
{
	if(pics >= maxPics)
		return;
	var order = (++pics) % 40 + 1;
	document.getElementById(elem).innerHTML+=(
		'<li class="pic-grid">'+
		'<div class="info"></div>'+
		'<img src="img/' + order +'.jpg"' + ' alt="Pic' + order +'">' +
		'</li>');
}

//將圖片格插入Column中
function InsertPhotoGrid()
{
	var ulgrids= new Array();
	var containerHeight = 0;
	for(i = 0 ; i < 4 ; i++)
	{
		ulgrids[i] = document.getElementById("ul" + (i + 1));
		if(ulgrids[i].clientHeight > containerHeight)
			containerHeight = ulgrids[i].clientHeight;
	}
	for(i = 0 ; i < 4 ; i++)
	{
		while(ulgrids[i].clientHeight < containerHeight - 200)
		{
			if(pics >= maxPics)
				return;
			AddPhotoGrid("ul"+ (i + 1));
		}
	}
}



//獲取距離
function getDistance(){
	var info = document.getElementsByClassName('info');
	for(i = 0 ; i < info.length ; i++){
		var StartNS = current_latitude / 180 * Math.PI;
		var StartEW = current_longitude / 180 * Math.PI;
		var StopNS = location[i].latitude / 180 * Math.Pi;
		var StopEW = location[i].longitude / 180 * Math.PI;
		var EarthR = 6371;

		var dist= Math.acos(Math.sin(StartNS) * Math.sin(StopNS) + Math.cos(StartEW) * Math.cos(StopEW) * Math.cos(StartNS - StartEW)) * EarthR;
		dist = parseInt(dist);

		info[i].innerHTML = '<p>這張圖片距離您 ' + dist +' 公里!</p>';
	}

}

//獲取當前位置
function showLocation(pos){
	current_longitude = pos.coords.latitude;
	current_latitude = position.coords.longtitude;
}

function getLocation(){
	if(navigator.geolocation)
	{
		navigator.goolocation.getCurrentPosition(showPosition);		
	}
	else 
	{
		alert("Oops!Something goes wrong!");
	}
}



