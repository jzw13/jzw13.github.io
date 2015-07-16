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

	$(document).on('click','.popup',function(){
		$(".show").hide();
		$(this).hide();
		$(".comment-container").hide();
	})
	$(document).on('click','.pic-grid img',function()
	{	
		bigImg='';
		$(".popup").show();
		$(".show").show();
		$(".comment-container").show();
		bigImg = $(this).attr("src");
		$(".show img.big").attr("src",bigImg);
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
var pics = 14;

//載入圖片格
function AddPhotoGrid(elem)
{
	if(pics >= maxPics)
				return;
	var order = (++pics) % 40 + 1;
	var li = document.createElement("li");
	li.setAttribute("class","pic-grid");

	var photo = document.createElement("img");
	photo.src = "img/" + order +".jpg";
	photo.alt = "pic"+ order;
	var info = document.createElement("info");

	li.appendChild(photo);
	li.appendChild(info);
	document.getElementById(elem).appendChild(li);

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


current_latitude = 40;
current_longitude = 116;
//獲取距離
function getDistance(){
	$.getJSON("http://jzw13.github.io/HW4/ext/location.json",function(data){
		var locs = data.location;
		for(i = 0 ; i < info.length ; i++){
			var StartNS = current_latitude / 180 * Math.PI;
			var StartEW = current_longitude / 180 * Math.PI;
			var StopNS = locs[i].latitude / 180 * Math.PI;
			var StopEW = locs[i].longitude / 180 * Math.PI;
			var EarthR = 6371;


			var dist= Math.acos(Math.sin(StartNS) * Math.sin(StopNS) + Math.cos(StartEW) * Math.cos(StopEW) * Math.cos(StartNS - StartEW)) * EarthR;
			dist = parseInt(dist);



			var dist= Math.acos(Math.sin(StartNS) * Math.sin(StopNS) + Math.cos(StartEW) * Math.cos(StopEW) * Math.cos(StartNS - StartEW)) * EarthR;
			dist = parseInt(dist);


			var locdata = ("<h3>您距離此圖 "+ dist+"公里</h3></p>");
			$(".comment-container").append(locdata);}})

}

//獲取當前位置


function showComment1()
{	
	$.getJSON("http://jzw13.github.io/HW4/ext/comment_dialog.json",function(data){
		var com = data.comments;
		debugger;
		for(i = 0 ; i < com.length ;i++)
		{
			var commentdata = ("<p><h2>"+com[i].author+"</h2><p>"+com[i].review+"</p>");
			$(".comment-container").append(commentdata);
		}
		})
}

