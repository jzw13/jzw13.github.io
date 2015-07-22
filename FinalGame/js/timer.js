//倒數函數
function countdown() {
    var str = $(".timer")[0].innerHTML;
    remain_time = Number(str[1]) * 60 + Number(str.slice(3, 5)) - 1;
    var min = parseInt(remain_time / 60);
    var s1 = parseInt((remain_time - min * 60) / 10);
    var second = remain_time - min * 60 - s1 * 10;
    var new_time = '0'+String(min) + ':' + String(s1) + String(second);
    $(".timer")[0].innerHTML = new_time;
}

//新局重新計時
function restartTimer(){
	window.clearInterval(t);
	window.clearInterval(out);
	init_time = $('.timer')[0].innerHTML;
	init_seconds = Number(init_time[0]) * 60 + Number(init_time.slice(3,5));
	var t = window.setInterval(countdown, 1000);
	var out = window.setTimeout(function(){
		window.clearInterval(t);
		Gameover();
	},(3*60)*1000 + 1000);
}
    
var t = window.setInterval(countdown, 1000);
var out = window.setTimeout(function(){
	window.clearInterval(t);
    Gameover();
},(3*60)*1000 + 1000);



