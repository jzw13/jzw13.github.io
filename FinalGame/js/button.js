function showModal(){
    $(".overlay").show();
    $(".modal").fadeIn("slow");
}

function hideModal(){
    $(".overlay").hide();
    $(".modal").hide();
}

function showOver() {
            $(".overlay").show();
            $(".over").fadeIn("slow");
}

function hideOver() {
        $(".overlay").hide();
        $(".over").hide();
}
function showAbout(){
    $(".AboutText").show();
}
function hideAbout(){
    $(".AboutText").hide();
}

function OverReset() {
            debugger;
            paused = false;
            hideOver();
            stage = 1;
            score = 0;
            var stgStr = String(stage);
            $(".game").removeClass(".tile");
            var Tiles = shuffle(tiles);
            setup(Tiles);
            $(".game").show("300");
            $(".timer")[0].innerHTML = "03:00";
            $(".score")[0].innerHTML = "0";
            $(".stage")[0].innerHTML = stgStr;
            restartTimer();
}