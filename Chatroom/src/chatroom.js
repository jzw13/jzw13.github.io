var myDataRef = new Firebase('https://jzw13.firebaseio.com');
var localText='';
var localUser='';
var users = myDataRef.child('namelist');
var chats = myDataRef.child('chat');
var userref;
var onlinelistref;
var localdate;
var localtime;

//獲取現有user
users.on("value",function(snapshot){
	userref = snapshot.val();
	displayOnlineUsers();
});


//使用者暱稱輸入
function enterAccount(){
	if($("#account").val() !=='')
	{
		localUser = $("#account").val();
		if(checkUserName(localUser) === false)
		{
			alert("Let's chat!");
			$(".popup").css({"display":"none"});
			onlinelistref = users.push({name:localUser});
			onlinelistref.onDisconnect().remove();
		}
		else
		{
			alert("This username is used.Please insert another name.")
		}
	}
	else{
		alert("Please insert username!");
	}
}

//訊息輸入
function enterMessage(){
	if($('#Messagebox').val() !=='')
	{
		localText = $("#Messagebox").val();
		var mydate = new Date();
		localtime = mydate.toLocaleTimeString();
		localdate = mydate.toLocaleDateString();
		chats.push({name:localUser,text: localText,date:localdate,time:localtime});
		$("#Messagebox").val("");
	}
	else
	{
		alert("Please don't send empty message.");
	}
}

//顯示在線使用者
function displayOnlineUsers()
{
	$("#userlist").empty();
	for(var attr in userref)
	{
		var u =('<h3>&#9786 ' + userref[attr].name +'</h3>');
		$("#userlist").append(u);
	}
};

//檢查是否重複
function checkUserName(loUser){
	var ex = false;
	for(var attr in userref)
	{
		if(loUser === userref[attr].name)
			ex = true;
	}
	return ex;
};

//實時更新對話列表
chats.on('child_added',function(snapshot){
	var message = snapshot.val();
	displayMessage(message.name,message.text,message.date,message.time);
});

//展示對話
function displayMessage(name,message,date,time){
	var content = ('<h5>' + name +'('+date+' '+time+') </h5><h1> '+message+'</h1>');
	$("#chatUI").append(content);
	$('#chatUI')[0].scrollTop = $('#chatUI')[0].scrollHeight;
}

//按鍵事件
$(window).load(function(){
	$("#Send").click(enterMessage);
	$("#accountsend").click(function(){
		enterAccount();
	});
})


//enter事件
$(window).keydown(function(e){
	if(e.keyCode === 13)
	{
		enterMessage();
	}
});
