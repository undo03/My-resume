/**
 * Created by 35107 on 2017/5/24.
 */


var animateTimer = null;

var winW, winH, boxh;
/*REM*/
function freshRem() {
    winW = document.documentElement.clientWidth;
    var desW = 750,
        ratio = winW / desW;
    winW <= desW ? document.documentElement.style.fontSize = ratio * 100 + 'px' : null;
    winH = document.documentElement.clientHeight;
    boxh = (winW / 10).toFixed(2);
}
freshRem();
window.addEventListener('resize', freshRem, false);

function createBg(oBox, AnimationName) {
    var bgDiv = oBox.querySelector('.bg');
    bgDiv.innerHTML = '';
    var timex = 0;
    frg = document.createDocumentFragment();
    for (var i = 0; i < Math.ceil(winH / boxh); i++) {
        timex += 0.05;
        for (var j = 0; j < 10; j++) {
            var oDiv = document.createElement('div');
            oDiv.style.height = boxh + 'px';
            oDiv.style.width = boxh + 'px';
            oDiv.style.webkitAnimationName = AnimationName;
            oDiv.style.webkitAnimationDuration = '1s';
            oDiv.style.webkitAnimationTimingFunction = 'linear';
            oDiv.style.webkitAnimationDelay = timex + j * 0.05 + 's';
            oDiv.style.webkitAnimationFillMode = 'both';
            frg.appendChild(oDiv);
        }
    }
    bgDiv.appendChild(frg);
}
/*page2左侧动画背景动态创建*/
var oContainer = document.getElementById('page2_left');
function createDiv() {
    oContainer.innerHTML = '';
    var divH = Math.ceil(winH / 15);
    var frg = document.createDocumentFragment();
    for (var i = 0; i < 15; i++) {
        var item = document.createElement('div');
        item.style.height = divH + 'px';
        item.style.webkitAnimationDelay = 1 + i * 0.1 + 's';
        item.className = 'item';
        frg.appendChild(item);
    }
    oContainer.appendChild(frg);
}
/*page2右侧基本信息依次滑入*/
~function () {
    var lis = document.querySelector('.info').getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        var curLi = lis[i];
        curLi.style.webkitAnimationDelay = 2.5 + i * 0.1 + 's';
    }
}();

(function () {
    var oLis = document.querySelectorAll('.page5 .pro-list li');
    console.log(oLis);
    var delay = 1.5;
    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i];
        delay += .2;
        cur.style.webkitAnimationDelay = delay + 's';
    }
})();


(function () {
    var str = '本人性格开朗、为人诚恳、乐观向上、兴趣广泛、拥有较强适应能力和学习能力。忠实诚信，讲原则，说到做到，不推卸责任；有自制力，做事情始终坚持有始有终，从不半途而废，肯学习，有问题不逃避，愿意虚心向他人学习，愿意以谦虚态度赞扬接纳优越者，会用100%的热情和精力投入到工作中。';
    var frg = document.createDocumentFragment();
    for (var i = 0; i < str.length; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerHTML = str[i];
        oSpan.style.webkitAnimationDelay = 1.5+(i * 0.05) + 's';
        frg.appendChild(oSpan);
    }
    document.querySelector('.page6 .self-evaluation p').appendChild(frg);
})();

var animationArr = ['rotate', 'disapper', 'scale', 'rotate', 'disapper', 'scale', 'rotate', 'disapper', 'scale'];
//var arrow = document.querySelector('.arrow');
var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    // shortSwipes: false,
    onSlideChangeEnd: function (swiper) {
        var cinIn = swiper.activeIndex,
            slides = swiper.slides;
        if (!swiper['startY']) {
            createBg(slides[1], animationArr[1]);
            slides[1].id = 'page1';
        }
        [].forEach.call(slides, function (item, index) {
            index !== cinIn ? item.id = null : null;
        });
    },
    onTouchStart: function (swiper, event) {
        swiper['startY'] = event.touches[0].clientY;

    },
    onSliderMove: function (swiper, event) {
        var cinIn = swiper.activeIndex,
            slides = swiper.slides,
            sLen = slides.length;
        swiper['curY'] = event.touches[0].clientY;
        var dir = swiper['curY'] - swiper['startY'];
        var step = null;
        var moveId = 'page';
        var moveStep = null;
        dir > 0 ? moveStep = cinIn - 1 : moveStep = cinIn + 1;
        switch (moveStep) {
            case 0:
                moveId += sLen - 2;
                step = 0;
                break;
            case -1:
                moveId += sLen - 3;
                step = sLen - 3;
                break;
            case sLen - 1:
                moveId += 1;
                step = sLen - 1;
                break;
            case sLen :
                moveId += 2;
                step = 2;
                break;
            default:
                moveId += moveStep;
                step = moveStep;
        }
        if (!slides[step]['isCreate']) {
            createBg(slides[step], animationArr[step]);
            if (step === 2) {
                createDiv();
            }
            slides[step].id = moveId;
            slides[step]['isCreate'] = true;
        }

    },
    onTouchEnd: function (swiper, event) {
        var dir = swiper['curY'] - swiper['startY'];
        var cinIn = swiper.activeIndex,
            slides = swiper.slides,
            sLen = slides.length;
        var step = null;
        var moveStep = null;
        dir > 0 ? moveStep = cinIn - 1 : moveStep = cinIn + 1;
        switch (moveStep) {
            case 0:
                step = 0;
                break;
            case -1:
                step = sLen - 3;
                break;
            case sLen - 1:
                step = sLen - 1;
                break;
            case sLen :
                step = 2;
                break;
            default:
                step = moveStep;
        }
        slides[step]['isCreate'] = false;
        if (Math.abs(dir) < winH / 2) {
            slides[step].id = null;
            slides[step].querySelector('.bg').innerHTML = '';
        }
    }
});

~function () {
    var musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');

    musicMenu.addEventListener('click', function () {
        if (musicAudio.paused) {//->暂停
            musicAudio.play();
            musicMenu.className = 'music move';
            return;
        }
        musicAudio.pause();
        musicMenu.className = 'music';
    }, false);

    function controlMusic() {
        musicAudio.volume = 0.5;
        musicAudio.play();
        musicAudio.addEventListener('canplay', function () {
            musicMenu.style.display = 'block';
            musicMenu.className = 'music move';
        }, false);
    }

    window.setTimeout(controlMusic, 2000);
}();