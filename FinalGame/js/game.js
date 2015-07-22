var u1, d1, l1, r1;
var u2, d2, l2, r2;
var temp1, j;
var paused = false;
var guess = null;
var score = 0;
var stage = 1;
var tiles;

//將字牌順序打亂
function shuffle(array) {
    var counter = array.length;
    var temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

//插入元素
function buildHTML(Tiles) {
    var frag = '';
    var t = (stage - 1) % 3 + 1;
    for (var attr in Tiles) {
        if (attr == 0 || attr == 1 || attr == 2 || attr == 3 || attr == 4 || attr == 5 || attr == 6 || attr == 7 || attr == 8 || attr == 16 || attr == 24 || attr == 32 || attr == 40 || attr == 48 || attr == 56 || attr == 15 || attr == 23 || attr == 31 || attr == 39 || attr == 47 || attr == 55 || attr == 63 || attr == 57 || attr == 58 || attr == 59 || attr == 60 || attr == 61 || attr == 62) {
            if (!Tiles[attr].trad) {
                frag += '<div class="tile" clickable="1" id="' + attr + '" data-id="' + Tiles[attr].id + '"><div class="inside">\
                                <img src="img/img' + t + '/' + Tiles[attr].img + '.png"\
                                /></div></div>';
                Tiles[attr].trad = true;
                Tiles[attr].img -= 100;
            } else {
                frag += '<div class="tile" clickable="1" id="' + attr + '" data-id="' + Tiles[attr].id + '"><div class="inside">\
                                <img src="img/img' + t + '/' + Tiles[attr].img + '.png"\
                                /></div></div>';
                Tiles[attr].trad = false;
                Tiles[attr].img += 100;

            }
        } else {
            if (!Tiles[attr].trad) {
                frag += '<div class="tile" clickable="0" id="' + attr + '" data-id="' + Tiles[attr].id + '"><div class="inside">\
                                <img src="img/img' + t + '/' + Tiles[attr].img + '.png"\
                                /></div></div>';
                Tiles[attr].trad = true;
                Tiles[attr].img -= 100;
            } else {
                frag += '<div class="tile" clickable="0" id="' + attr + '" data-id="' + Tiles[attr].id + '"><div class="inside">\
                                <img src="img/img' + t + '/' + Tiles[attr].img + '.png"\
                                /></div></div>';
                Tiles[attr].trad = false;
                Tiles[attr].img += 100;

            }
        }
    };
    return frag;
}

//按牌事件
function tileClicked() {
    debugger;
    var i;
    var temp;
    var u, d, l, r;
    var u0, d0, l0, r0;
    var scoreStr;
    var $tile = $(this);
    if (!paused && !$tile.find(".inside").hasClass("matched") && !$tile.find(".inside").hasClass("picked") && $tile.attr("clickable") == '1') {
        $tile.find(".inside").addClass("picked");
        if (!guess) {
            guess = $(this).attr("data-id");
            temp1 = $(this).attr("id");
            j = parseInt(temp1);
            u1 = j - 8;
            d1 = j + 8;
            l1 = j - 1;
            r1 = j + 1;
            u2 = String(u1);
            d2 = String(d1);
            l2 = String(l1);
            r2 = String(r1);
        } else if (guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
            $(".picked").addClass("matched");
            guess = null;
            $(".matched").hide(500);
            temp = $tile.attr("id");
            debugger;
            score += 100;
            scoreStr = String(score);
            $(".score")[0].innerHTML = scoreStr;
            i = parseInt(temp);
            u0 = i - 8;
            d0 = i + 8;
            l0 = i - 1;
            r0 = i + 1;
            u = String(u0);
            d = String(d0);
            l = String(l0);
            r = String(r0);
            if (u >= 0) {
                var x = document.getElementById(u);
                $(x).attr("clickable", "1");
            }
            if (d <= 63) {
                var y = document.getElementById(d);
                $(y).attr("clickable", "1");
            }
            if (l >= 0) {
                var z = document.getElementById(l);
                $(z).attr("clickable", "1");
            }
            if (r <= 63) {
                var w = document.getElementById(r);
                $(w).attr("clickable", "1");
            }
            if (u1 >= 0) {
                var x = document.getElementById(u2);
                $(x).attr("clickable", "1");
            }
            if (d1 <= 63) {
                var y = document.getElementById(d2);
                $(y).attr("clickable", "1");
            }
            if (l1 >= 0) {
                var z = document.getElementById(l2);
                $(z).attr("clickable", "1");
            }
            if (r1 <= 63) {
                var w = document.getElementById(r2);
                $(w).attr("clickable", "1");
            }
        } else {
            guess = null;
            paused = true;
            setTimeout(function() {
                $(".picked").removeClass("picked");
                paused = false;
            },
            600);
        }
        if ($(".matched").length == $(".tile").length) {
            win();
        }
    }
}

//過關
function win() {
    paused = true;
    setTimeout(function() {
        window.clearInterval(t);
        window.clearInterval(out);
        showModal();
        $(".game").fadeOut();
    },
    1000);
}

//載入下一關
function reset() {
    paused = false;
    hideModal();
    stage += 1;
    var stgStr = String(stage);
    $(".game").removeClass(".tile");
    var Tiles = shuffle(tiles);
    setup(Tiles);
    $(".game").show("300");
    $(".timer")[0].innerHTML = "03:00";
    $(".stage")[0].innerHTML = stgStr;
    restartTimer();
}

//遊戲結束
function Gameover() {
    setTimeout(function() {
        showOver();
        $('.game').fadeOut;
    })
}

//監測按鍵事件
function checkClick() {
    $(".tile").on("click", tileClicked);
    $(".restart").on("click", reset);
    $(".restart2").on("click", OverReset);
}

//建立
function setup(Tiles) {
    var x = buildHTML(Tiles);
    $(".game").html(x);
    var c = checkClick();
}

//初始化
function init() {
    var t = tiles;
    $(".welcomepage").hide(800);
    var tilesArray = $.merge(t, t);
    var Tiles = shuffle(tilesArray);
    setup(Tiles);
}
$(".newgame").on('click', init);
$(".about").on("click", showAbout);
$(".AboutText").on("click", hideAbout);

