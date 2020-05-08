///<reference path="../../utils/template/index.d.ts" />
///<reference path="../../gulp/tsd/min/min.d.ts" />
var ratio = window.devicePixelRatio;
var startY = 0, endY = 0, currentScorll = 0;
var totalHeight = 0;
// 物理参数
var cw = null;
var ch = null;
var widthratio = null;
var heightratio = null;
var scorllratio = null;
// 记录滚动位置
var resetScorllHeight = 0;
// 定时器
var Timer = null, TimerObj = {};
// 事件触发坐标位置
var EventsTriggerPosition = {};
// 音乐开关
var musicTurn = true;
var Global_Scale: number, Hozis: number;
// 图片路径
var imgLoadSrc = {
    "BackgroundMapping": "/static/images/active/bg.jpg",
    // 素材一部分
    "MaterialOne_one": "/static/images/active/resource/2048/1-1.png",
    "MaterialOne_two": "/static/images/active/resource/2048/1-2.png",
    "MaterialOne_three": "/static/images/active/resource/2048/1-3.png",
    "MaterialOne_four": "/static/images/active/resource/2048/1-4.png",
    // 素材二部分
    "MaterialTwo_one": "/static/images/active/resource/2048/2-1.png",
    "MaterialTwo_two": "/static/images/active/resource/2048/2-2.png",
    "MaterialTwo_three": "/static/images/active/resource/2048/2-3.png",
    "MaterialTwo_four": "/static/images/active/resource/2048/2-4.png",
    "m_off": "/static/images/active/music_off.png",
    "m_on": "/static/images/active/music_on.png",
    "slider": "/static/images/active/slider.png",
}
// 存放加载完的图片
var imgLoadingObj = {};
// 是否加载完全图片
var IsTrueLoadingAll = false;
// 针对UC浏览器音乐自动播放
var PointAtMusic = true;
window.onload = function () {
    // 获取画布
    var canvas = document.getElementById('canvas');
    var cxt = (<any>canvas).getContext('2d');
    // 获取musicDOM
    var musicPlay = document.getElementById('music');
    // var audio = new Audio();
    // 画布宽高
    cw = canvas.offsetWidth;
    ch = canvas.offsetHeight;
    widthratio = cw / 375;
    heightratio = ch / 667;
    scorllratio = widthratio * ratio / 2;
    // 进度条
    var loadingImg = new Image();
    loadingImg.src = "/static/images/active/resource/loading/load.png";
    // 加载图片数量
    var countImgDownload = 0;
    //
    var ParachuteRotate: number, ShockSounds: number, handsShock: number, GrassMove: number;
    var newCommonRotate = new CommonRotate(10);
    loadingImg.onload = function () {
        animateLoading(loadingImg, 1, countImgDownload, 0);
        for (var i in imgLoadSrc) {
            (function (i) {
                var img = new Image();
                img.src = imgLoadSrc[i];
                img.onload = function () {
                    imgLoadingObj[i] = img;
                    clearInterval(TimerObj[countImgDownload])
                    countImgDownload++;
                    animateLoading(loadingImg, Math.round(countImgDownload / Object.keys(imgLoadSrc).length * 100), countImgDownload, Object.keys(imgLoadSrc).length);
                    if (countImgDownload == Object.keys(imgLoadSrc).length) {
                        // console.log("加载完步")
                        IsTrueLoadingAll = true;
                        clearInterval(TimerObj[Object.keys(imgLoadSrc).length])
                        clearCanvas()
                        animateCanvas();
                        // audio.src = "/static/images/active/159487_Acoustic_Loop_41.mp3";
                        // audio.preload = "true";
                        // audio.loop = true;
                        // audio.id = 'myAudio3';
                        // audio.autoplay = true;
                        // 默认初始播放音乐
                        // audio.play();
                        // (<any>musicPlay).play();
                    }
                }
            })(i)
        }
    }
    /**
     *主页面动画canvas渲染
     *
     */
    function animateCanvas() {  //animateCanvas就是画每一帧动画的函数。
        ParachuteRotate = newCommonRotate.move();
        ShockSounds = newCommonRotate.shock(1.08, 0.01);
        handsShock = newCommonRotate.shakeHands(-5, 5, 0.4);
        clearCanvas();
        drawCanvas();
        (<any>window).RAF(animateCanvas);  //动画更流畅  实现setInterval的效果
    }
    // 兼容动画requestAnimationFrame
    (<any>window).RAF = (function () {
        return (<any>window).requestAnimationFrame || (<any>window).webkitRequestAnimationFrame || (<any>window).mozRequestAnimationFrame || (<any>window).oRequestAnimationFrame || (<any>window).msRequestAnimationFrame || function (callback) { (<any>window).setTimeout(callback, 1000 / 60); };
    })();
    /**
     *加载页面动画
     *
     * @param {*} loadingImg 绘制图片
     * @param {*} countImgDownload 当前绘制的图片数量转换的进度值
     * @param {*} loadingNumber 当前绘制的图片数量
     * @param {*} loadMax 最大图片数量
     */
    function animateLoading(loadingImg: Element, countImgDownload: number, loadingNumber: number, loadMax: number) {
        TimerObj[loadingNumber] = setInterval(() => {
            GrassMove = newCommonRotate.Grass(380, 1);
            ParachuteRotate = newCommonRotate.move();
            clearCanvas()
            drawLoading(loadingImg, countImgDownload)
        }, 1000 / 60)
    }
    var prevalue = 0;
    /**
     *绘制装载加载页
     *
     * @param {*} imgObj 加载页图片对象
     * @param {*} processValue  加载进度值
     */
    function drawLoading(imgObj: Element, processValue: number) {
        if (processValue >= prevalue) {
            prevalue = processValue;
        }
        resizeCanvas(cw * ratio, ch * ratio);
        cxt.save()
        cxt.fillStyle = "#000";
        cxt.fillRect(0, 0, cw * ratio, ch * ratio);
        cxt.restore()
        cxt.save()
        var gradient = cxt.createLinearGradient(0, 0, prevalue, 0);
        gradient.addColorStop("0", "#3fafff");
        gradient.addColorStop("0.5", "#ecf7ff");
        gradient.addColorStop("1.0", "#91ebff");
        cxt.textBaseline = "middle";
        cxt.textAlign = "center";
        cxt.font = "40pt Calibri"
        cxt.fillStyle = gradient;
        cxt.fillText("Loading... " + prevalue + "%", (375 * ratio * widthratio) / 2, (867 * ratio * widthratio) / 2);
        cxt.restore()

        cxt.save()
        drawImage(imgObj, 70, 27, 111, 48, 284 - GrassMove, 352);//后面的草
        cxt.restore()
        cxt.save()
        drawImage(imgObj, 193, 146, 376, 164, 96, 300);//车身
        cxt.restore()
        cxt.save()
        cxt.translate((128 + 42 / 4) * ratio * widthratio, (356 + 44 / 4) * ratio * widthratio);
        cxt.rotate(ParachuteRotate * 200);
        drawImage(imgObj, 255, 31, 42, 44, -42 / 4, -44 / 4);//左边轮胎
        cxt.restore()
        cxt.save()
        cxt.translate((218 + 43 / 4) * ratio * widthratio, (356 + 42 / 4) * ratio * widthratio);
        cxt.rotate(ParachuteRotate * 200);
        drawImage(imgObj, 436, 32, 43, 42, -43 / 4, -42 / 4);//右边轮胎
        cxt.restore()
        cxt.save()
        drawImage(imgObj, 547, 31, 108, 48, 414 - GrassMove, 352);//前面的草 
        cxt.restore()
        cxt.save()
        drawImage(imgObj, 0, 79, 193, 150, 0, 307);//左边黑背景
        cxt.restore()
        cxt.save()
        drawImage(imgObj, 0, 246, 181, 150, 284, 307);//右边边黑背景
        cxt.restore()
    }
    /**
     *绘制背景图
     *
     */
    function drawBack() {
        // resizeCanvas(cw * ratio, ch * ratio);
        /************************************************************背景图**********************************************************************************************/
        cxt.translate(0, currentScorll);
        cxt.save()
        var picHeight = cw * imgLoadingObj["BackgroundMapping"].height * ratio / imgLoadingObj["BackgroundMapping"].width;
        totalHeight = picHeight - ch * ratio;
        cxt.drawImage(imgLoadingObj["BackgroundMapping"], 0, 0, cw * ratio, picHeight);
        cxt.restore()
    }
    /**
     *绘制主页面
     *
     */
    function drawCanvas() {
        resizeCanvas(cw * ratio, ch * ratio);
        drawBack()
        /************************************************************飞机遮盖云朵1**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_one"], 1114, 963, 367, 280, 0, 458);
        cxt.restore()
        /************************************************************飞机遮盖云朵2**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 1072, 21, 917, 1019, -35, 88);
        cxt.restore()
        // /************************************************************顶部云层**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 17, 37, 1042, 926, 0, 0);
        cxt.restore()

        /************************************************************顶部字**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_one"], 27, 37, 750, 514, 0, 0);
        cxt.restore()

        /************************************************************欢迎来到外汇圈**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 100 * scorllratio) {
            if (-currentScorll < 300 * scorllratio) {
                Global_Scale = distanceScoll(100, 110, 130, "ZOOM", 0);
            } else {
                Global_Scale = 0;
            }
        } else {
            Global_Scale = 1;
        }
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_one"], 826, 37, 236, 537, 20 / Global_Scale, 130 / Global_Scale);
        cxt.restore()
        /************************************************************红色飞机（大）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 212 * scorllratio) {
            // 飞机尾气
            drawImage(imgLoadingObj["MaterialOne_one"], 563, 858, 339, 364, 252, 358);
            // 飞机
            drawImage(imgLoadingObj["MaterialOne_one"], 630, 609, 204, 207, 160, 258);
        } else {
            Hozis = cloudsDistance(60, 2);
            cxt.translate(Hozis, Hozis);
            // 飞机尾气
            drawImage(imgLoadingObj["MaterialOne_one"], 563, 858, 339, 364, 400, 503);
            // 飞机
            drawImage(imgLoadingObj["MaterialOne_one"], 630, 609, 204, 207, 310, 408);
        }
        cxt.restore()
        /************************************************************红色飞机（小）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 250 * scorllratio) {
            // 飞机
            drawImage(imgLoadingObj["MaterialOne_one"], 935, 677, 78, 79, 216, 416);
            // 飞机尾气
            drawImage(imgLoadingObj["MaterialOne_one"], 70, 814, 332, 371, 249, 454);
        } else {
            Hozis = cloudsDistance(150, 1.4);
            cxt.translate(Hozis, Hozis)
            // 飞机尾气
            drawImage(imgLoadingObj["MaterialOne_one"], 70, 814, 332, 371, 320, 523);
            // 飞机
            drawImage(imgLoadingObj["MaterialOne_one"], 935, 677, 78, 79, 290, 488);
        }
        cxt.restore()
        /************************************************************一群降落伞小人**********************************************************************************************/
        // cxt.save()
        // drawImage(imgLoadingObj["MaterialOne_one"], 72, 628, 21, 29,204,272);  //不动
        // cxt.restore()
        // 动
        if (-currentScorll > 920 * scorllratio) {

        } else {
            cxt.save()
            cxt.translate(230 * ratio * widthratio, 300 * ratio * widthratio);
            Global_Scale = distanceScoll(150, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            cxt.rotate(ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_one"], 160, 609, 47, 68, 0, 0);
            cxt.restore()
            cxt.save()
            cxt.translate(254 * ratio * widthratio, 342 * ratio * widthratio);
            Global_Scale = distanceScoll(160, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            cxt.rotate(ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_one"], 287, 596, 63, 94, 0, 0);
            cxt.restore()
            cxt.save()
            cxt.translate(164 * ratio * widthratio, 442 * ratio * widthratio);
            Global_Scale = distanceScoll(170, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            cxt.rotate(ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_one"], 417, 596, 123, 147, 0, 0);
            cxt.restore()
        }

        /************************************************************第二层楼房**********************************************************************************************/

        /************************************************************火箭3号最左边楼后面（由上至下数）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 1820 * scorllratio) {
            // drawImage(imgLoadingObj["MaterialOne"], 1917, 1927, 233, 233, -280, 527); 
        } else {
            Hozis = cloudsDistance(500, 0.5);
            cxt.translate(Hozis, -Hozis)
            drawImage(imgLoadingObj["MaterialOne_two"], 1742, 1740, 233, 233, 280, 527);
        }
        cxt.restore()
        /************************************************************冒烟大楼**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 912, 1063, 249, 727, 35, 659);
        cxt.restore()

        /************************************************************冒烟大楼上面de 字**********************************************************************************************/
        if (-currentScorll > 2025 * scorllratio) {

        } else {
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 752 * ratio * widthratio);
            Global_Scale = distanceScoll(750, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1179, 63, 63, -10, -10); //亏
            cxt.restore()
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 784 * ratio * widthratio);
            Global_Scale = distanceScoll(770, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1242, 63, 65, -10, -10); //空
            cxt.restore()
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 818 * ratio * widthratio);
            Global_Scale = distanceScoll(790, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1309, 63, 69, -10, -10); //爆
            cxt.restore()
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 855 * ratio * widthratio);
            Global_Scale = distanceScoll(810, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1379, 63, 65, -10, -10); //仓
            cxt.restore()

            cxt.save()
            cxt.translate(80 * ratio * widthratio, 889 * ratio * widthratio);
            Global_Scale = distanceScoll(830, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1448, 63, 67, -10, -10); //无
            cxt.restore()
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 923 * ratio * widthratio);
            Global_Scale = distanceScoll(850, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1515, 63, 65, -10, -10); //处
            cxt.restore()
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 956 * ratio * widthratio);
            Global_Scale = distanceScoll(870, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1585, 63, 65, -10, -10); //躲
            cxt.restore()
            cxt.save()
            cxt.translate(80 * ratio * widthratio, 991 * ratio * widthratio);
            Global_Scale = distanceScoll(890, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1197, 1655, 63, 65, -10, -10); //避
            cxt.restore()
        }

        /************************************************************冒烟大楼下面窗户很多的楼房**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 825, 1800, 343, 186, -5, 1022);
        cxt.restore()

        /************************************************************大草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 17, 1540, 527, 219, 117, 1005);
        cxt.restore()
        /************************************************************无人巴士**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2210 * scorllratio) {
            // drawImage(imgLoadingObj["MaterialOne_two"], 2228, 1284, 353, 172, -373, 1029); 
        } else {
            Hozis = cloudsDistance(600, 0.3);
            cxt.translate(Hozis, 0);
            drawImage(imgLoadingObj["MaterialOne_two"], 328, 1284, 353, 172, 373, 1029);
        }
        cxt.restore()
        /************************************************************小草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 71, 1319, 156, 81, 300, 1074);
        cxt.restore()

        /************************************************************火箭1号（由上至下数）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 1890 * scorllratio) {
            // drawImage(imgLoadingObj["MaterialOne_one"], 1422, 1560, 233, 234, -360, 557); 
        } else {
            Hozis = cloudsDistance(800, 0.5);
            cxt.translate(Hozis, -Hozis)
            drawImage(imgLoadingObj["MaterialOne_one"], 1422, 1560, 233, 234, 360, 557);
        }
        cxt.restore()
        /************************************************************火箭2号（大=由上至下数）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 1880 * scorllratio) {
            // drawImage(imgLoadingObj["MaterialOne_one"], 1422, 1833, 375, 376, -359, 581); 
        } else {
            Hozis = cloudsDistance(820, 3);
            cxt.translate(Hozis, -Hozis)
            drawImage(imgLoadingObj["MaterialOne_one"], 527, 1432, 375, 376, 359, 581);
        }
        cxt.restore()

        /************************************************************爆炸烟雾**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2226 * scorllratio) {

        } else {
            cxt.translate(-3 * ratio * widthratio, 1114 * ratio * widthratio);
            Global_Scale = distanceScoll(980, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_one"], 1075, 1617, 246, 246, 0, -123);
        }
        cxt.restore()
        /************************************************************落地成盒**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2228 * scorllratio) {

        } else {
            cxt.translate(20 * ratio * widthratio, 1107 * ratio * widthratio);
            Global_Scale = distanceScoll(1010, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_one"], 1765, 1354, 100, 36, 0, -10);
        }
        cxt.restore()
        /************************************************************对话框（由上至下数）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2036 * scorllratio) {

        } else {
            cxt.translate(345 * ratio * widthratio, 1020 * ratio * widthratio);
            Global_Scale = distanceScoll(1120, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_one"], 1376, 1319, 312, 78, -160, -40);
        }
        cxt.restore()
        /************************************************************对话框（盒子上面的对话由上至下数）**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2180 * scorllratio) {

        } else {
            cxt.translate(40 * ratio * widthratio, 1061 * ratio * widthratio);
            Global_Scale = distanceScoll(1120, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_one"], 1012, 1390, 311, 115, 0, -30);
        }
        cxt.restore()

        /************************************************************飞机遮盖云朵3**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_one"], 1114, 288, 751, 526, 0, 392);
        drawImage(imgLoadingObj["MaterialOne_one"], 1114, 37, 454, 173, 150, 522);
        cxt.restore()

        /************************************************************桥**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_two"], 46, 1025, 747, 197, 1, 1112);
        cxt.restore()

        /************************************************************第三层马路**********************************************************************************************/

        /************************************************************野心疯狂超载**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2546 * scorllratio) {

        } else {
            cxt.translate(194 * ratio * widthratio, 1274 * ratio * widthratio);
            Global_Scale = distanceScoll(1600, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_three"], 56, 38, 609, 126, -152, -64);
        }
        cxt.restore()
        /************************************************************左边飘动的云朵**********************************************************************************************/
        /************************************************************右边飘动的云朵**********************************************************************************************/
        if (-currentScorll > 2720 * scorllratio) {

        } else {
            cxt.save()
            cxt.translate(ParachuteRotate * 50, 0);
            drawImage(imgLoadingObj["MaterialOne_four"], 58, 233, 192, 67, -22, 1328);
            cxt.restore()
            cxt.save()
            cxt.translate(-ParachuteRotate * 40, 0);
            drawImage(imgLoadingObj["MaterialOne_four"], 107, 65, 210, 86, 285, 1315);
            cxt.restore()
        }

        /************************************************************蓝色车子**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2780 * scorllratio) {
            // drawImage(imgLoadingObj["MaterialOne_three"], 1317, 2654, 355, 188, 375, 1359);
        } else {
            Hozis = cloudsDistance(1750, 1);
            cxt.translate(-Hozis, 0)
            drawImage(imgLoadingObj["MaterialOne_three"], 1280, 268, 355, 188, -175, 1359);
        }
        cxt.restore()

        /************************************************************锋芒太露**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2720 * scorllratio) {

        } else {
            Hozis = cloudsDistance(1750, 1);
            cxt.translate(-165 * ratio * widthratio - Hozis, 1365 * ratio * widthratio);
            Global_Scale = distanceScoll(2300, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_three"], 1654, 12, 198, 80, -90, -40);
        }
        cxt.restore()
        /************************************************************稳住我们能赢**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2690 * scorllratio) {

        } else {
            Hozis = cloudsDistance(1750, 1);
            cxt.translate(-123 * ratio * widthratio - Hozis, 1355 * ratio * widthratio);
            Global_Scale = distanceScoll(2200, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_three"], 1655, 507, 200, 60, -0, -30);
        }
        cxt.restore()
        /************************************************************你是猪吗**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2536 * scorllratio) {

        } else {
            Hozis = cloudsDistance(1750, 1);
            cxt.translate(-20 * ratio * widthratio - Hozis, 1375 * ratio * widthratio);
            Global_Scale = distanceScoll(2000, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_three"], 1694, 633, 139, 82, -0, -40);
        }
        cxt.restore()

        /************************************************************蓝色车子上  蓝衣服男挥动的手**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2780 * scorllratio) {

        } else {
            Hozis = cloudsDistance(1750, 1);
            // 先平移画布中心
            cxt.translate(-142 * ratio * widthratio - Hozis, 1381 * ratio * widthratio);
            cxt.rotate(ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_three"], 1201, 212, 88, 41, -40, 0);
        }
        cxt.restore()
        /************************************************************蓝色车子上  红衣服女挥动的手**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 2780 * scorllratio) {

        } else {
            Hozis = cloudsDistance(1750, 1);
            cxt.translate(-110 * ratio * widthratio - Hozis, 1380 * ratio * widthratio);
            cxt.rotate(-ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_three"], 1359, 212, 57, 29, -30, 0);
        }
        cxt.restore()
        /************************************************************左边红头发女孩**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2100, 1.5);
        if (-currentScorll > 2266 * scorllratio) {
            if (-currentScorll > 2820 * scorllratio) {

            } else {
                drawImage(imgLoadingObj["MaterialOne_three"], 875, 258, 102, 143, 20, 1379);
            }
        } else {
            cxt.translate(-Hozis, 0)
            drawImage(imgLoadingObj["MaterialOne_three"], 875, 258, 102, 143, -100, 1379);
        }
        cxt.restore()
        /************************************************************左边红头发女孩会动的手**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2100, 1.5);
        if (-currentScorll > 2266 * scorllratio) {
            if (-currentScorll > 2820 * scorllratio) {

            } else {
                cxt.translate(51 * ratio * widthratio, 1391 * ratio * widthratio);
                cxt.rotate(ParachuteRotate * 2);
                drawImage(imgLoadingObj["MaterialOne_three"], 1000, 277, 71, 34, 0, 0);
            }
        } else {
            cxt.translate(-62 * ratio * widthratio - Hozis, 1391 * ratio * widthratio);
            cxt.rotate(ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_three"], 1000, 277, 71, 34, 0, 0);
        }
        cxt.restore()
        /************************************************************铁轨**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_three"], 822, 66, 806, 98, 0, 1446);
        cxt.restore()
        /************************************************************铁轨上的两层云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_three"], 456, 232, 325, 259, -32, 1402);
        drawImage(imgLoadingObj["MaterialOne_three"], 45, 220, 331, 264, 250, 1394);
        cxt.restore()

        /************************************************************汇车**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2150, 1);
        if (-currentScorll > 2410 * scorllratio) {
            if (-currentScorll > 3520 * scorllratio) {

            } else {
                cxt.translate(190 * ratio * widthratio, (1575 + 136) * ratio * widthratio);
                cxt.rotate(ParachuteRotate);
                drawImage(imgLoadingObj["MaterialOne_three"], 1504, 538, 123, 204, -30, -50);
            }
        } else {
            cxt.translate(190 * ratio * widthratio, 1575 * ratio * widthratio - Hozis);
            cxt.rotate(ParachuteRotate);
            drawImage(imgLoadingObj["MaterialOne_three"], 1504, 538, 123, 204, -30, -50);
        }
        cxt.restore()
        /************************************************************汇车左边字 现在没空听我的没错**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 3362 * scorllratio) {

        } else {
            cxt.translate(160 * ratio * widthratio, 1674 * ratio * widthratio);
            Global_Scale = distanceScoll(2330, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_four"], 747, 47, 274, 56, -140, -20);
        }
        cxt.restore()
        /************************************************************汇车右边字 再等等，机会没来**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 3362 * scorllratio) {

        } else {
            cxt.translate(226 * ratio * widthratio, 1674 * ratio * widthratio);
            Global_Scale = distanceScoll(2300, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_four"], 454, 43, 248, 58, 0, -30);
        }
        cxt.restore()
        /************************************************************汇车右边字 到底要怎做呀**********************************************************************************************/
        cxt.save()
        cxt.translate(226 * ratio * widthratio, 1720 * ratio * widthratio);
        Global_Scale = distanceScoll(2380, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_four"], 466, 151, 199, 58, 0, -30);
        cxt.restore()

        /************************************************************拦车路障(左边)**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2350, 1);
        cxt.translate(110 * ratio * widthratio, 1762 * ratio * widthratio);
        if (-currentScorll > 2480 * scorllratio) {
            cxt.rotate(Math.PI / 180 * -132);
            drawImage(imgLoadingObj["MaterialOne_three"], 1217, 661, 171, 82, -80, -9);
        } else {
            cxt.rotate(Math.PI / 180 * Hozis / scorllratio);
            drawImage(imgLoadingObj["MaterialOne_three"], 1217, 661, 171, 82, -80, -9);
        }
        cxt.restore()
        /************************************************************拦车路障(右边)**********************************************************************************************/
        cxt.save()
        cxt.translate(272 * ratio * widthratio, 1763 * ratio * widthratio);
        if (-currentScorll > 2480 * scorllratio) {
            cxt.rotate(Math.PI / 180 * 132);
            drawImage(imgLoadingObj["MaterialOne_three"], 1218, 538, 171, 82, -5, -5);
        } else {
            cxt.rotate(Math.PI / 180 * -Hozis / scorllratio);
            drawImage(imgLoadingObj["MaterialOne_three"], 1218, 538, 171, 82, -5, -5);
        }
        cxt.restore()

        /************************************************************犹豫纠结错失良机**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 3260 * scorllratio) {

        } else {
            cxt.translate(190 * ratio * widthratio, 1556 * ratio * widthratio);
            Global_Scale = distanceScoll(2050, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialOne_two"], 1302, 1617, 389, 203, -90, -10);
        }
        cxt.restore()

        /************************************************************旋转叶子下的云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_four"], 21, 415, 384, 273, -29, 1809);
        drawImage(imgLoadingObj["MaterialOne_four"], 361, 256, 414, 291, 219, 1801);
        cxt.restore()

        /************************************************************旋转叶子左**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2500, 1);
        cxt.translate(-5 * ratio * widthratio, 1838 * ratio * widthratio);
        cxt.rotate(Math.PI / 180 * -Hozis * 0.1);
        drawImage(imgLoadingObj["MaterialOne_two"], 1353, 1136, 410, 413, -100, -100);
        cxt.restore()

        /************************************************************旋转叶子右**********************************************************************************************/
        cxt.save()
        cxt.translate(383 * ratio * widthratio, 1838 * ratio * widthratio);
        cxt.rotate(Math.PI / 180 * -Hozis * 0.1);
        drawImage(imgLoadingObj["MaterialOne_four"], 878, 135, 413, 412, -105, -100);
        cxt.restore()

        /************************************************************骷髅左闪电**********************************************************************************************/
        cxt.save()
        cxt.translate((-30 + 204) * ratio * widthratio, (1974 + 165) * ratio * widthratio);
        Global_Scale = distanceScoll(3170, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 962, 792, 408, 663, -204, -165);
        cxt.restore()
        /************************************************************骷髅右闪电**********************************************************************************************/
        cxt.save()
        cxt.translate(201 * ratio * widthratio, (1974 + 663 / 4) * ratio * widthratio);
        Global_Scale = distanceScoll(3170, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 1436, 792, 408, 663, 0, -663 / 4);
        cxt.restore()
        /************************************************************骷髅背景镜子**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_three"], 463, 944, 285, 358, 122, 2044);
        cxt.restore()

        /************************************************************空投1(左到右)**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 4000 * scorllratio) {

        } else {
            cxt.translate(100 * ratio * widthratio, 1958 * ratio * widthratio);
            Global_Scale = distanceScoll(2700, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            cxt.rotate(ParachuteRotate * 2);
            drawImage(imgLoadingObj["MaterialOne_four"], 1353, 1098, 78, 108, 0, 0);
        }
        cxt.restore()
        /************************************************************空投2(左到右)**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 3834 * scorllratio) {

        } else {
            cxt.translate(206 * ratio * widthratio, 1874 * ratio * widthratio);
            Global_Scale = distanceScoll(2800, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            cxt.rotate(-ParachuteRotate * 3);
            drawImage(imgLoadingObj["MaterialOne_four"], 982, 1090, 69, 92, -15, 0);
        }
        cxt.restore()
        /************************************************************空投3(左到右)**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 4100 * scorllratio) {

        } else { }
        cxt.translate(249 * ratio * widthratio, 1961 * ratio * widthratio);
        Global_Scale = distanceScoll(2850, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        cxt.rotate(ParachuteRotate * 4);
        drawImage(imgLoadingObj["MaterialOne_four"], 1125, 1066, 144, 171, -20, 0);
        cxt.restore()

        /************************************************************骷髅上面左右飘动的云**********************************************************************************************/
        cxt.save()
        cxt.translate(ParachuteRotate * 100, 0);
        drawImage(imgLoadingObj["MaterialOne_three"], 209, 579, 139, 70, 30, 2021);
        drawImage(imgLoadingObj["MaterialOne_three"], 30, 591, 115, 58, 291, 2051);
        cxt.restore()

        /************************************************************骷髅盒子**********************************************************************************************/
        cxt.save()
        cxt.translate(191 * ratio * widthratio, 2138 * ratio * widthratio);
        Global_Scale = distanceScoll(3170, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 15, 820, 389, 218, -100, -50);
        cxt.restore()
        /************************************************************骷髅头**********************************************************************************************/
        cxt.save()
        cxt.translate((106 + 165 / 2) * ratio * widthratio, (2014 + 187 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(3320, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 699, 726, 165, 187, -165 / 2, -187 / 2);
        cxt.restore()
        /************************************************************盒子上的字（路遇伏地魔）**********************************************************************************************/
        cxt.save()
        cxt.translate((76) * ratio * widthratio, (2108) * ratio * widthratio);
        Global_Scale = distanceScoll(3500, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 22, 722, 173, 49, 0, 0);
        cxt.restore()
        /************************************************************盒子上的字（落地成盒）**********************************************************************************************/
        cxt.save()
        cxt.translate((146) * ratio * widthratio, (2144) * ratio * widthratio);
        Global_Scale = distanceScoll(3540, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 252, 722, 144, 49, 0, 0);
        cxt.restore()
        /************************************************************盒子上的字（搭上猪队友）**********************************************************************************************/
        cxt.save()
        cxt.translate((226) * ratio * widthratio, (2108) * ratio * widthratio);
        Global_Scale = distanceScoll(3580, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_three"], 448, 722, 167, 49, 0, 0);
        cxt.restore()

        /************************************************************这简直是噩梦**********************************************************************************************/
        cxt.save()
        cxt.translate((173) * ratio * widthratio, (2255) * ratio * widthratio);
        Global_Scale = distanceScoll(3400, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialOne_four"], 405, 649, 389, 117, -97, 0);
        cxt.restore()

        /************************************************************狙击手深色草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_four"], 954, 843, 218, 144, -10, 2318);
        /************************************************************右边深色草丛**********************************************************************************************/
        drawImage(imgLoadingObj["MaterialOne_four"], 523, 1131, 316, 138, 244, 2318);
        cxt.restore()
        /************************************************************狙击手**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 3696 * scorllratio) {
            cxt.translate((-56) * ratio * widthratio, (2318 + 154 / 2) * ratio * widthratio);
            cxt.rotate(ParachuteRotate * 0.1);
            drawImage(imgLoadingObj["MaterialOne_four"], 930, 643, 330, 154, -0, -154 / 2);
        } else {
            Hozis = cloudsDistance(3530, 1);
            cxt.translate((-156) * ratio * widthratio - Hozis, (2318 + 154 / 2) * ratio * widthratio);
            cxt.rotate(ParachuteRotate * 0.1);
            drawImage(imgLoadingObj["MaterialOne_four"], 930, 643, 330, 154, 0, -154 / 2);
        }
        cxt.restore()

        /************************************************************奔跑的人男**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_four"], 589, 915, 111, 127, 206, 2323);
        cxt.restore()
        /************************************************************奔跑的人男的手**********************************************************************************************/
        cxt.save()
        cxt.translate((235 + 41 / 2) * ratio * widthratio, (2299 + 75 / 2) * ratio * widthratio);
        cxt.rotate(ParachuteRotate * 1.5);
        drawImage(imgLoadingObj["MaterialOne_four"], 548, 854, 41, 75, -20, -35);
        cxt.restore()
        /************************************************************奔跑的人女**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_four"], 746, 914, 80, 129, 286, 2323);
        cxt.restore()
        /************************************************************奔跑的人女的手**********************************************************************************************/
        cxt.save()
        cxt.translate((269 + 63 / 2) * ratio * widthratio, (2338) * ratio * widthratio);
        cxt.rotate(ParachuteRotate * -0.6);
        drawImage(imgLoadingObj["MaterialOne_four"], 825, 870, 63, 43, -63 / 2, 0);
        cxt.restore()
        /************************************************************岩石左右**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne_four"], 89, 1123, 350, 228, -40, 2385);
        drawImage(imgLoadingObj["MaterialOne_four"], 71, 838, 372, 212, 224, 2385);
        cxt.restore()
        /************************************************************岩石下方 飘动的云**********************************************************************************************/
        cxt.save()
        cxt.translate(ParachuteRotate * 30, 0);
        drawImage(imgLoadingObj["MaterialOne_three"], 30, 591, 115, 58, 22, 2435);
        cxt.restore()
        cxt.save()
        cxt.translate(ParachuteRotate * 30, 0);
        drawImage(imgLoadingObj["MaterialOne_three"], 713, 579, 162, 64, 252, 2425);
        cxt.restore()
        cxt.save()
        cxt.translate(-ParachuteRotate * 30, 0);
        drawImage(imgLoadingObj["MaterialOne_three"], 463, 576, 162, 64, -20, 2585);
        cxt.restore()
        cxt.save()
        cxt.translate(ParachuteRotate * 30, 0);
        drawImage(imgLoadingObj["MaterialOne_three"], 209, 579, 139, 70, 328, 2535);
        cxt.restore()

        /************************************************************使用素材2**********************************************************************************************/
        /************************************************************外汇犹如一个吃鸡战场**********************************************************************************************/
        cxt.save()
        Global_Scale = distanceScoll(4350, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.translate((186) * ratio * widthratio, (2465) * ratio * widthratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_two"], 260, 44, 473, 155, -118, 0);
        cxt.restore()
        // /************************************************************汇乎部分之蓝色背景**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 268, 537, 204, 227, 43, 2798);//6
        drawImage(imgLoadingObj["MaterialTwo_one"], 1074, 656, 382, 482, 106, 2585);
        cxt.restore()
        /************************************************************汇乎部分之一堆烂尾楼**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 51, 533, 69, 314, -10, 2729);  //1
        drawImage(imgLoadingObj["MaterialTwo_one"], 710, 619, 157, 322, 256, 2776);//10
        cxt.restore()

        /************************************************************汇乎部分之中间的人**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 4680 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_two"], 569, 234, 642, 591, 46, 2550);
        } else {
            Hozis = cloudsDistance(4500, 1);
            cxt.translate((46 + 642 / 5) * ratio * widthratio, (2550 + 591 / 2) * ratio * widthratio);
            Global_Scale = distanceScoll(4500, 0, 0, "REDUCE", 120 / scorllratio);
            cxt.scale(Global_Scale, Global_Scale);
            cxt.rotate(Math.PI / 180 * (180 + Hozis / scorllratio));
            drawImage(imgLoadingObj["MaterialTwo_two"], 569, 234, 642, 591, -642 / 5, -591 / 2);
        }
        cxt.restore()

        /************************************************************汇乎部分之一堆烂尾楼**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 513, 542, 158, 316, 3, 2819);//5
        drawImage(imgLoadingObj["MaterialTwo_one"], 887, 980, 159, 316, 318, 2816);//11
        drawImage(imgLoadingObj["MaterialTwo_one"], 197, 909, 485, 295, 60, 2843);//7
        cxt.restore()

        cxt.save()
        if (-currentScorll > 4710 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 695, 1004, 180, 119, 256, 2820);//草5
        } else {
            Hozis = cloudsDistance(4550, 1);
            cxt.translate(0, Hozis);
            drawImage(imgLoadingObj["MaterialTwo_one"], 695, 1004, 180, 119, 256, 2900);//草5
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 145, 533, 89, 172, -10, 2790);//2
        drawImage(imgLoadingObj["MaterialTwo_one"], 42, 884, 127, 254, -4, 2843);//3
        cxt.restore()

        cxt.save()
        if (-currentScorll > 4715 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 51, 1626, 104, 70, -5, 2918);//草1
        } else {
            Hozis = cloudsDistance(4600, 1);
            cxt.translate(-Hozis, 0);
            drawImage(imgLoadingObj["MaterialTwo_one"], 51, 1626, 104, 70, -65, 2918);//草1
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 10, 1381, 242, 202, 0, 2953);//4
        drawImage(imgLoadingObj["MaterialTwo_one"], 29, 1207, 223, 155, 20, 2865);//草2
        drawImage(imgLoadingObj["MaterialTwo_one"], 279, 1420, 313, 261, 79, 2928);//9
        cxt.restore()

        cxt.save()
        if (-currentScorll > 4900 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 315, 1266, 227, 111, 139, 2898);//草3
        } else {
            Hozis = cloudsDistance(4700, 1);
            cxt.translate(Hozis, 0);
            drawImage(imgLoadingObj["MaterialTwo_one"], 315, 1266, 227, 111, 239, 2898);//草3
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 637, 1322, 304, 295, 226, 2858);//12
        drawImage(imgLoadingObj["MaterialTwo_one"], 1892, 48, 127, 175, 315, 3000);//蓝色红1
        cxt.restore()
        // // 左右飘动的云
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 88, 2681, 191, 67, (-30 + ParachuteRotate * 20), 2868);//12
        drawImage(imgLoadingObj["MaterialTwo_one"], 93, 2820, 209, 86, (315 - ParachuteRotate * 20), 2900);//蓝色红1
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5028 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_two"], 214, 224, 290, 139, -10, 2993);//草4
        } else {
            Hozis = cloudsDistance(4860, 1);
            cxt.translate(0, Hozis);
            drawImage(imgLoadingObj["MaterialTwo_two"], 214, 224, 290, 139, -10, 3073);//草4
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_two"], 223, 388, 282, 214, -3, 3033);//8
        drawImage(imgLoadingObj["MaterialTwo_one"], 1617, 44, 259, 358, 223, 2999);//13
        cxt.restore()

        /************************************************************汇乎部分之一堆文件**********************************************************************************************/
        cxt.save()
        if (-currentScorll > 6144 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 562, 0, 93, 185, 56, 3258);//碎文件1
        } else {
            Hozis = cloudsDistance(5200, 1);
            cxt.translate(Hozis * 0.16, -Hozis * 0.5)
            drawImage(imgLoadingObj["MaterialTwo_one"], 562, 0, 93, 185, 132, 3023);//碎文件1
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 6018 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 909, 7, 121, 198, 220, 3270);//碎文件2
        } else {
            Hozis = cloudsDistance(5200, 1);
            cxt.translate(-Hozis * 0.21, -Hozis * 0.6)
            drawImage(imgLoadingObj["MaterialTwo_one"], 909, 7, 121, 198, 132, 3023);//碎文件2
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 6232 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 684, 253, 93, 89, 120, 3380);//碎文件3
        } else {
            Hozis = cloudsDistance(5200, 1);
            cxt.translate(Hozis * 0.02, -Hozis * 0.7)
            drawImage(imgLoadingObj["MaterialTwo_one"], 684, 253, 93, 89, 132, 3023);//碎文件3
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 6332 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 849, 330, 72, 90, 202, 3420);//碎文件4
        } else {
            Hozis = cloudsDistance(5200, 1);
            cxt.translate(0, -Hozis * 0.7)
            drawImage(imgLoadingObj["MaterialTwo_one"], 849, 330, 72, 90, 202, 3023);//碎文件4
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 6432 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 814, 508, 22, 25, 182, 3490);//碎文件5
        } else {
            Hozis = cloudsDistance(5200, 1);
            cxt.translate(0, -Hozis * 0.7)
            drawImage(imgLoadingObj["MaterialTwo_one"], 814, 508, 22, 25, 182, 3023);//碎文件5
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5510 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_two"], 186, 634, 197, 124, 132, 3278);//避雷避坑
        } else {
            Hozis = cloudsDistance(5000, 1);
            cxt.translate(0, -Hozis)
            drawImage(imgLoadingObj["MaterialTwo_two"], 186, 634, 197, 124, 132, 3023);//避雷避坑
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5520 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 1903, 271, 105, 125, 199, 3234);//橘色块
        } else {
            Hozis = cloudsDistance(5100, 1);
            cxt.translate(0, -Hozis)
            drawImage(imgLoadingObj["MaterialTwo_one"], 1903, 271, 105, 125, 199, 3023);//橘色块
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5620 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 1775, 434, 199, 235, 112, 3188);//强化知识装备
        } else {
            Hozis = cloudsDistance(5200, 1);
            cxt.translate(Hozis * 0.1, -Hozis * 0.8)
            drawImage(imgLoadingObj["MaterialTwo_one"], 1775, 434, 199, 235, 132, 3023);//强化知识装备
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5508 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 1545, 434, 204, 297, 166, 3123);//故事贴
        } else {
            Hozis = cloudsDistance(5300, 1);
            cxt.translate(0, -Hozis)
            drawImage(imgLoadingObj["MaterialTwo_one"], 1545, 434, 204, 297, 166, 3023);//故事贴
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5600 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 1074, 327, 201, 269, 85, 3103);//技术贴
        } else {
            Hozis = cloudsDistance(5400, 1);
            cxt.translate(Hozis * 0.46, -Hozis * 0.8)
            drawImage(imgLoadingObj["MaterialTwo_one"], 1074, 327, 201, 269, 132, 3023);//技术贴
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5690 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 1309, 361, 210, 207, 212, 3114);//经验贴
        } else {
            Hozis = cloudsDistance(5500, 1);
            cxt.translate(-Hozis * 0.88, -Hozis)
            drawImage(imgLoadingObj["MaterialTwo_one"], 1309, 361, 210, 207, 132, 3023);//经验贴
        }
        cxt.restore()

        cxt.save()
        if (-currentScorll > 5780 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_one"], 1121, 47, 161, 235, 38, 3086);//外汇领域专家
        } else {
            Hozis = cloudsDistance(5600, 1);
            cxt.translate(Hozis, -Hozis * 0.67)
            drawImage(imgLoadingObj["MaterialTwo_one"], 1121, 47, 161, 235, 132, 3023);//外汇领域专家
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1309, 46, 274, 283, 132, 3023);//交易高手
        cxt.restore()

        /************************************************************喝饮料的金童玉女**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_four"], 565, 0, 392, 394, -106, 3408);//男头
        drawImage(imgLoadingObj["MaterialTwo_four"], 691, 685, 377, 388, 276, 3408);//女头
        cxt.restore()

        cxt.save()
        cxt.translate((16 + 0 / 2) * ratio * widthratio, (3596 + 90 / 2) * ratio * widthratio);
        cxt.rotate(handsShock * 0.01);
        drawImage(imgLoadingObj["MaterialTwo_four"], 856, 438, 194, 90, 0, -90 / 2);//男童左手
        cxt.restore()

        cxt.save()
        cxt.translate((-12 + 194 / 5) * ratio * widthratio, (3596 + 90 / 2) * ratio * widthratio);
        cxt.rotate(-handsShock * 0.02);
        drawImage(imgLoadingObj["MaterialTwo_four"], 586, 438, 195, 90, -194 / 5, -90 / 2);//男童右手(外侧)
        cxt.restore()

        cxt.save()
        cxt.translate((262 + 194 / 2) * ratio * widthratio, (3596 + 90 / 2) * ratio * widthratio);
        cxt.rotate(handsShock * 0.01);
        drawImage(imgLoadingObj["MaterialTwo_four"], 612, 1106, 194, 90, -194 / 2, -90 / 2);//女童右手(有表)
        cxt.restore()

        cxt.save()
        cxt.translate((290 + 194 / 4) * ratio * widthratio, (3594 + 94 / 2) * ratio * widthratio);
        cxt.rotate(-handsShock * 0.02);
        drawImage(imgLoadingObj["MaterialTwo_four"], 921, 1088, 194, 94, -194 / 4, -94 / 2);//女童左手(没表,外侧)
        cxt.restore()

        /************************************************************电脑桌+笔记本**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_four"], 1027, 60, 82, 153, 80, 3566);//男桌阔落
        drawImage(imgLoadingObj["MaterialTwo_four"], 1027, 302, 139, 84, 99, 3598);//男桌笔记本
        drawImage(imgLoadingObj["MaterialTwo_four"], 397, 900, 260, 101, 196, 3588);//女桌笔记本
        drawImage(imgLoadingObj["MaterialTwo_four"], 630, 596, 375, 56, -5, 3638);//男桌
        drawImage(imgLoadingObj["MaterialTwo_four"], 709, 1235, 369, 55, 196, 3638);//女桌
        cxt.restore()

        /************************************************************金童玉女对话**********************************************************************************************/
        cxt.save()
        cxt.translate((88) * ratio * widthratio, (3432 + 56 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(5700, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 64, 50, 263, 56, 0, -56 / 2);//大神们外汇怎么玩？
        cxt.restore()

        cxt.save()
        cxt.translate((82 + 429 / 2) * ratio * widthratio, (3462 + 80 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(5750, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 103, 143, 429, 80, -429 / 2, -80 / 2);//先把基础知识。。。。。。
        cxt.restore()

        cxt.save()
        cxt.translate((60 + 467 / 2) * ratio * widthratio, (3508 + 79 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(5800, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 63, 260, 467, 79, -467 / 2, -79 / 2);//不要急功近利。。。。。。。。
        cxt.restore()

        cxt.save()
        cxt.translate((154 + 260 / 2) * ratio * widthratio, (3552 + 79 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(5850, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 237, 385, 260, 79, -260 / 2, -79 / 2);//看我技术分享...........
        cxt.restore()

        /************************************************************球 + 音响**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_four"], 125, 578, 397, 227, -12, 3664);//音响机体(左)
        drawImage(imgLoadingObj["MaterialTwo_three"], 1595, 344, 397, 227, 192, 3664);//音响机体(右)
        cxt.restore()

        cxt.save()
        if (musicTurn) {
            cxt.translate((44 + 106 / 4) * ratio * widthratio, (3722 + 102 / 4) * ratio * widthratio);
            cxt.scale(ShockSounds, ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo_four"], 163, 425, 106, 102, -106 / 4, -102 / 4);//左2.1  喇叭
        } else {
            drawImage(imgLoadingObj["MaterialTwo_four"], 163, 425, 106, 102, 44, 3722);//左2.1  喇叭
        }
        cxt.restore()

        cxt.save()
        if (musicTurn) {
            cxt.translate((112 + 106 / 4) * ratio * widthratio, (3722 + 102 / 4) * ratio * widthratio);
            cxt.scale(ShockSounds, ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo_four"], 322, 425, 106, 102, -106 / 4, -102 / 4);//左2.2
        } else {
            drawImage(imgLoadingObj["MaterialTwo_four"], 322, 425, 106, 102, 112, 3722);//左2.2
        }
        cxt.restore()

        cxt.save()
        if (musicTurn) {
            cxt.translate((216 + 104 / 4) * ratio * widthratio, (3722 + 101 / 4) * ratio * widthratio);
            cxt.scale(ShockSounds, ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1639, 147, 104, 101, -104 / 4, -101 / 4);//右2.1
        } else {
            drawImage(imgLoadingObj["MaterialTwo_three"], 1639, 147, 104, 101, 216, 3722);//右2.1
        }
        cxt.restore()

        cxt.save()
        if (musicTurn) {
            cxt.translate((284 + 104 / 4) * ratio * widthratio, (3722 + 101 / 4) * ratio * widthratio);
            cxt.scale(ShockSounds, ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1821, 147, 104, 101, -104 / 4, -101 / 4);//右2.2
        } else {
            drawImage(imgLoadingObj["MaterialTwo_three"], 1821, 147, 104, 101, 284, 3722);//右2.2
        }
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(6100, 1);
        cxt.translate((-80 + 282 / 4) * ratio * widthratio, (3652 + 276 / 4) * ratio * widthratio);
        cxt.rotate(Math.PI / 180 * -Hozis * 0.1);
        drawImage(imgLoadingObj["MaterialTwo_four"], 147, 94, 282, 276, -282 / 4, -276 / 4);//左球
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(6100, 1);
        cxt.translate((320 + 281 / 4) * ratio * widthratio, (3652 + 276 / 4) * ratio * widthratio);
        cxt.rotate(Math.PI / 180 * -Hozis * 0.1);
        drawImage(imgLoadingObj["MaterialTwo_three"], 244, 1638, 281, 276, -281 / 4, -276 / 4);//右球
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_four"], 447, 119, 81, 236, 20, 3664);//左星星
        drawImage(imgLoadingObj["MaterialTwo_three"], 141, 1663, 80, 236, 320, 3664);//右星星
        cxt.restore()

        /************************************************************人腿旁边的星星**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1539, 797, 88, 88, 10, 3858);//星星1
        drawImage(imgLoadingObj["MaterialTwo_one"], 1691, 812, 59, 58, 94, 3790);//星星2
        drawImage(imgLoadingObj["MaterialTwo_one"], 1812, 825, 36, 36, 340, 3854);//星星3
        drawImage(imgLoadingObj["MaterialTwo_one"], 1891, 807, 69, 69, 220, 3984);//星星4
        drawImage(imgLoadingObj["MaterialTwo_two"], 50, 762, 111, 110, 282, 4024);//星星5
        cxt.restore()
        /************************************************************捧起来的人**********************************************************************************************/
        cxt.save()
        cxt.translate((142) * ratio * widthratio, (3868 + 368 / 2) * ratio * widthratio);
        cxt.rotate(-ParachuteRotate * 0.2);
        drawImage(imgLoadingObj["MaterialTwo_three"], 1066, 171, 499, 368, 0, -368 / 2);//后腿
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_three"], 587, 438, 404, 442, -22, 3862);//身体
        cxt.restore()

        cxt.save()
        cxt.translate((60) * ratio * widthratio, (3728 + 400 / 2) * ratio * widthratio);
        cxt.rotate(ParachuteRotate * 0.2);
        drawImage(imgLoadingObj["MaterialTwo_three"], 85, 94, 496, 400, 0, -400 / 2);//前腿
        cxt.restore()
        /************************************************************手下的云朵**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 85, 1748, 813, 259, -18, 4088);//一堆手
        drawImage(imgLoadingObj["MaterialTwo_one"], 1446, 1649, 119, 304, 10, 4050);//托身体的手1(蓝色字标注)
        drawImage(imgLoadingObj["MaterialTwo_one"], 1664, 1617, 184, 401, 78, 4030);//托身体的手2(蓝色字标注)
        cxt.restore()
        // 欢呼的手
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1217, 1649, 96, 148, 32, 4098 + (handsShock));//欢呼的手 金色字标注1
        cxt.restore()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1771, 1301, 127, 265, 112, 4088 + (-handsShock));//欢呼的手 金色字标注2
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1211, 1305, 108, 278, 178, 4088 + (handsShock));//欢呼的手 金色字标注3
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1409, 1344, 110, 171, 238, 4108 + (-handsShock));//欢呼的手 金色字标注4
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_one"], 1591, 1344, 90, 150, 302, 4088 + (handsShock));//欢呼的手 金色字标注5
        cxt.restore()

        // 欢呼的手上面的字
        cxt.save()
        cxt.translate((32 + 400 / 2) * ratio * widthratio, (4052 + 60 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(7000, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 1575, 938, 400, 60, -400 / 2, -60 / 2);//行情分析小能手，关键时刻拯救你
        cxt.restore()

        cxt.save()
        cxt.translate((132) * ratio * widthratio, (4088 + 61 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(7100, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 1521, 1033, 400, 61, 0, -61 / 2);//牛人奋斗史，偶尔八卦一下也可以
        cxt.restore()

        cxt.save()
        cxt.translate((42 + 443 / 2) * ratio * widthratio, (4126 + 59 / 2) * ratio * widthratio);
        Global_Scale = distanceScoll(7200, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_one"], 1528, 1129, 443, 59, -443 / 2, -59 / 2);//潜伏黄金市场
        cxt.restore()
        // yun轻微上下飘动
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_two"], 39, 959, 910, 413, -22, 4130 + (ParachuteRotate * 10));//深色
        drawImage(imgLoadingObj["MaterialTwo_two"], 61, 1399, 898, 499, -40, 4092 + (ParachuteRotate * 10));
        cxt.restore()

        // 汇乎求知计划
        cxt.save()
        cxt.translate((21 + 670 / 4) * ratio * widthratio, (4330) * ratio * widthratio);
        Global_Scale = distanceScoll(7500, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_three"], 1075, 612, 670, 214, -670 / 4, 0);
        cxt.restore()

        // 两个牛头
        cxt.save()
        cxt.translate((24 + 284 / 4) * ratio * widthratio, (4480 + 246 / 4) * ratio * widthratio);
        Global_Scale = distanceScoll(8000, 0, 0, "REDUCE", 100 / scorllratio);
        if (-currentScorll > 8120 * scorllratio) {
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1423, 904, 284, 246, -284 / 4, -246 / 4);//红牛
        } else {
            cxt.rotate(Global_Scale * 6.28)
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1423, 904, 284, 246, -284 / 4, -246 / 4);//红牛
        }
        cxt.restore()

        cxt.save()
        cxt.translate((214 + 284 / 4) * ratio * widthratio, (4483 + 240 / 4) * ratio * widthratio);
        Global_Scale = distanceScoll(8000, 0, 0, "REDUCE", 100 / scorllratio);
        if (-currentScorll > 8120 * scorllratio) {
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1060, 916, 284, 240, -284 / 4, -240 / 4);//蓝牛
        } else {
            cxt.rotate(-Global_Scale * 6.28)
            cxt.scale(Global_Scale, Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1060, 916, 284, 240, -284 / 4, -240 / 4);//蓝牛
        }
        cxt.restore()

        // 牛头下的云
        cxt.save()
        Hozis = cloudsDistance(8120, 1);
        if (-currentScorll > 8322 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_three"], 1395, 1206, 257, 137, 294, 4640);//右
        } else {
            cxt.translate(Hozis, 0)
            drawImage(imgLoadingObj["MaterialTwo_three"], 1395, 1206, 257, 137, 394, 4640);//右
        }
        cxt.restore()
        cxt.save()
        Hozis = cloudsDistance(8120, 1);
        if (-currentScorll > 8388 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_three"], 1107, 1229, 220, 119, -20, 4640);//左
        } else {
            cxt.translate(-Hozis, 0)
            drawImage(imgLoadingObj["MaterialTwo_three"], 1107, 1229, 220, 119, -150, 4640);//左
        }
        cxt.restore()

        cxt.save()
        cxt.translate((120 + 274 / 4) * ratio * widthratio, (4640 + 129 / 4) * ratio * widthratio);
        Global_Scale = distanceScoll(8200, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_three"], 614, 1118, 274, 129, -274 / 4, -129 / 4);//还有更多福利等你领取
        cxt.restore()

        /************************************************************大礼盒**********************************************************************************************/
        cxt.save()
        cxt.translate((80 + 429 / 4) * ratio * widthratio, (4722 + 410 / 4) * ratio * widthratio);
        Global_Scale = distanceScoll(8444, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.rotate(Global_Scale * 6)
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_three"], 63, 951, 429, 410, -429 / 4, -410 / 4);
        cxt.restore()

        /************************************************************大礼盒上漂浮的云**********************************************************************************************/
        cxt.save()
        cxt.translate((70) * ratio * widthratio, (4852) * ratio * widthratio);
        Global_Scale = distanceScoll(8600, 0, 0, "REDUCE", 100 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale)
        drawImage(imgLoadingObj["MaterialTwo_three"], 88, 675, 191, 67, (0 + ParachuteRotate * 20), 0);//左
        cxt.restore()
        cxt.save()
        cxt.translate((200) * ratio * widthratio, (4840) * ratio * widthratio);
        Global_Scale = distanceScoll(8600, 0, 0, "REDUCE", 100 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale)
        drawImage(imgLoadingObj["MaterialTwo_three"], 93, 814, 209, 86, (0 - ParachuteRotate * 20), 0);//右
        cxt.restore()
        /************************************************************大礼盒下的云朵+草云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_four"], 93, 1380, 869, 371, -20, 4880);
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(8820, 1);
        if (-currentScorll > 9024 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_three"], 1679, 1322, 326, 275, -40, 4932);//左草云
        } else {
            cxt.translate(-Hozis, 0);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1679, 1322, 326, 275, -140, 4932);//左草云
        }
        cxt.restore()
        cxt.save()
        Hozis = cloudsDistance(8820, 1);
        if (-currentScorll > 9024 * scorllratio) {
            drawImage(imgLoadingObj["MaterialTwo_three"], 1661, 1705, 331, 282, 250, 4932);//右草云
        } else {
            cxt.translate(Hozis, 0);
            drawImage(imgLoadingObj["MaterialTwo_three"], 1661, 1705, 331, 282, 350, 4932);//右草云
        }
        cxt.restore()
        /************************************************************汇乎，我们构建的是专业的外汇知识问答平台**********************************************************************************************/
        cxt.save()
        cxt.translate((80 + 407 / 4) * ratio * widthratio, (5070 + 0 / 4) * ratio * widthratio);
        Global_Scale = distanceScoll(9150, 0, 0, "REDUCE", 120 / scorllratio);
        cxt.scale(Global_Scale, Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo_three"], 552, 1325, 407, 240, -407 / 4, 0);
        cxt.restore()

        /************************************************************汇乎下载(周边漂浮的云朵)**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_three"], 1435, 1413, 145, 51, (40 + ParachuteRotate * 25), 5190);//紫色标注1
        drawImage(imgLoadingObj["MaterialTwo_three"], 1458, 1751, 122, 50, (268 + ParachuteRotate * 20), 5140);//紫色标注2
        drawImage(imgLoadingObj["MaterialTwo_three"], 1420, 1527, 176, 72, (72 - ParachuteRotate * 28), 5320);//紫色标注3
        drawImage(imgLoadingObj["MaterialTwo_three"], 1445, 1638, 191, 67, (216 - ParachuteRotate * 23), 5270);//紫色标注4
        cxt.restore()

        /************************************************************汇乎下载**********************************************************************************************/
        cxt.save()
        EventsTriggerPosition["HH_DOWNLOAD"] = {
            pisx: 118 * widthratio,
            pisY: ((5220 * widthratio) * ratio + currentScorll) / ratio,
            Range: {
                minPisY: ((5220 * widthratio) * ratio + currentScorll) / ratio,
                maxPisY: 276 * widthratio / 2 + (((5220 * widthratio) * ratio + currentScorll) / ratio),

                minPisX: 118 * widthratio,
                maxPisX: 118 * widthratio + 276 * widthratio / 2
            }
        }
        drawImage(imgLoadingObj["MaterialTwo_three"], 1087, 1445, 276, 276, 118, 5220);//汇乎图片
        drawImage(imgLoadingObj["MaterialTwo_three"], 614, 1012, 244, 16, 130, 5370);//下载汇乎APP字
        cxt.restore()

        /************************************************************底部**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo_four"], 46, 1801, 750, 706, 0, 5140);//底部框
        cxt.restore()
        /************************************************************底部**********************************************************************************************/
        /************************************************************进入官网**********************************************************************************************/
        cxt.save()
        EventsTriggerPosition["GO_OFFICIAL_WEB"] = {
            pisx: 12 * widthratio,
            pisY: ((5454 * widthratio) * ratio + currentScorll) / ratio,
            Range: {
                minPisY: ((5454 * widthratio) * ratio + currentScorll) / ratio,
                maxPisY: 49 * widthratio / 2 + (((5454 * widthratio) * ratio + currentScorll) / ratio),

                minPisX: 12 * widthratio,
                maxPisX: 12 * widthratio + 201 * widthratio / 2
            }
        }
        drawImage(imgLoadingObj["MaterialTwo_four"], 56, 2557, 201, 49, 12, 5454);//进入官网
        cxt.restore()

        /************************************************************再看一次**********************************************************************************************/
        cxt.save()
        EventsTriggerPosition["SEE_AGAIN"] = {
            pisx: 258 * widthratio,
            pisY: ((5454 * widthratio) * ratio + currentScorll) / ratio,
            Range: {
                minPisY: ((5454 * widthratio) * ratio + currentScorll) / ratio,
                maxPisY: 49 * widthratio / 2 + (((5454 * widthratio) * ratio + currentScorll) / ratio),

                minPisX: 258 * widthratio,
                maxPisX: 258 * widthratio + 204 * widthratio / 2
            }
        }
        drawImage(imgLoadingObj["MaterialTwo_four"], 557, 2556, 204, 49, 258, 5454);//再看一次
        cxt.restore()

        /************************************************************顶部音乐开关**********************************************************************************************/
        cxt.save()
        cxt.translate(0, -currentScorll)
        EventsTriggerPosition["MUSIC_ON"] = {
            pisx: 310 * widthratio,
            pisY: ((8 * widthratio) * ratio + currentScorll) / ratio,
            Range: {
                minPisY: ((8 * widthratio) * ratio) / ratio,
                maxPisY: 102 * widthratio / 2,
                // maxPisY:102*widthratio/2+(((8*widthratio)*ratio+currentScorll)/ratio),

                minPisX: 310 * widthratio,
                maxPisX: 310 * widthratio + 102 * widthratio / 2
            }
        }
        if (musicTurn) {
            drawImage(imgLoadingObj["m_on"], 0, 0, 102, 102, 310, 8);
        } else {
            drawImage(imgLoadingObj["m_off"], 0, 0, 102, 102, 310, 8);
        }
        cxt.restore()
        /************************************************************下滑提醒**********************************************************************************************/
        cxt.save()
        if (PointAtMusic) {
            if (-currentScorll > 0) {

            } else {
                cxt.fillStyle = "rgba(220,220,220,0.6)";
                cxt.fillRect(0, 0, cw * ratio, ch * ratio);
                cxt.translate(0, handsShock * 10);
                drawImage(imgLoadingObj["slider"], 0, 0, 99, 99, 162.5, ch - (90 * widthratio * ratio) / 2);
            }
            cxt.restore()
        }
    }
    /**
     *ZOOM type 缩放比例区间x-y 放大 y-z 缩小  reduce  缩放比例区间x-y 放大 y-z 缩小至1
     *  ZOOM x为滚动初始位置，x-y 放大  y-z缩小至无 type = ZOOM distance（不需要）
        *  REDUCE x为滚动初始位置，y，z（不需要） type=REDUCE diatance=100以上 例如 110 放大区间为 0-1.1
     * @param {number} x 
     * @param {number} y
     * @param {number} z
     * @param {string} type
     * @param {number} distance
     * @returns
     */
    function distanceScoll(x: number, y: number, z: number, type: string, distance: number) {
        var scale: number;
        if (type == "ZOOM") {
            scale = -currentScorll <= x * scorllratio ? 1 : (-currentScorll > x * scorllratio && -currentScorll <= y * scorllratio ? ((1 - (currentScorll + x * scorllratio) / 100)) : (1 + ((currentScorll + z * scorllratio) / 100)));
            return scale > 0 ? scale : 0;
        }
        if (type == "REDUCE") {
            scale = -currentScorll <= x * scorllratio ? 0 : (-currentScorll > x * scorllratio && -currentScorll <= (x + distance) * scorllratio ? (-currentScorll - (x * scorllratio)) / 100 : (((currentScorll + (x + distance * 2) * scorllratio)) / 100) <= 1 ? 1 : ((currentScorll + (x + distance * 2) * scorllratio)) / 100);
            return scale;
        }
    }
    /**
     *  画布固定位置触发
     *
     * @param {number} dis 滚动距离
     * @param {number} speed 速度
     * @returns
     */
    function cloudsDistance(dis: number, speed: number) {
        return -currentScorll > dis * scorllratio ? (currentScorll + dis * scorllratio) * speed : 0;
    }
    /**
     *获取画布点击坐标
     *
     * @param {number} x 鼠标点击的X坐标
     * @param {number} y 鼠标点击的Y坐标
     * @returns
     */
    function windowToCanvas(x: number, y: number) {
        if (IsTrueLoadingAll) {
            var cvsbox = canvas.getBoundingClientRect();
            return { x: Math.round(x - cvsbox.left), y: Math.round(y - cvsbox.top) };
        }
    }
    // 画布的点击功能
    canvas.onclick = function (e) {
        e.preventDefault();
        var clickXY = windowToCanvas(e.clientX, e.clientY);
        if (IsTrueLoadingAll && !PointAtMusic) {
            if (EventsTriggerPosition.hasOwnProperty("MUSIC_ON") && clickXY.x < EventsTriggerPosition["MUSIC_ON"].Range.maxPisX && clickXY.x > EventsTriggerPosition["MUSIC_ON"].Range.minPisX && clickXY.y < EventsTriggerPosition["MUSIC_ON"].Range.maxPisY && clickXY.y > EventsTriggerPosition["MUSIC_ON"].Range.minPisY) {
                if (musicTurn) {
                    // console.log("音乐关了！");
                    musicTurn = false;
                    (<any>musicPlay).pause()
                } else {
                    // console.log("音乐开了！");
                    musicTurn = true;
                    (<any>musicPlay).play()
                }
            }
            if (EventsTriggerPosition.hasOwnProperty("HH_DOWNLOAD") && clickXY.x < EventsTriggerPosition["HH_DOWNLOAD"].Range.maxPisX && clickXY.x > EventsTriggerPosition["HH_DOWNLOAD"].Range.minPisX && clickXY.y < EventsTriggerPosition["HH_DOWNLOAD"].Range.maxPisY && clickXY.y > EventsTriggerPosition["HH_DOWNLOAD"].Range.minPisY) {
                // console.log("汇乎下载啦！")
            }
            if (EventsTriggerPosition.hasOwnProperty("GO_OFFICIAL_WEB") && clickXY.x < EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.maxPisX && clickXY.x > EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.minPisX && clickXY.y < EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.maxPisY && clickXY.y > EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.minPisY) {
                // console.log("进入官网啦！")
            }
            if (EventsTriggerPosition.hasOwnProperty("SEE_AGAIN") && clickXY.x < EventsTriggerPosition["SEE_AGAIN"].Range.maxPisX && clickXY.x > EventsTriggerPosition["SEE_AGAIN"].Range.minPisX && clickXY.y < EventsTriggerPosition["SEE_AGAIN"].Range.maxPisY && clickXY.y > EventsTriggerPosition["SEE_AGAIN"].Range.minPisY) {
                // console.log("再看一遍啦！")
                currentScorll = 0;
            }
        }
    }
    /**
     *绘制画布封装
     *
     * @param {Element} img 绘制图片dom对象
     * @param {number} imgx 组合图坐标X
     * @param {number} imgy 组合图坐标Y
     * @param {number} imgw 组合图裁剪宽度
     * @param {number} imgh 组合图裁剪高度
     * @param {number} canvasx  画布绘制的位置坐标X
     * @param {number} canvasy  画布绘制的位置坐标Y
     */
    function drawImage(img: Element, imgx: number, imgy: number, imgw: number, imgh: number, canvasx: number, canvasy: number) {
        cxt.drawImage(img, imgx, imgy, imgw, imgh, canvasx * ratio * widthratio, canvasy * ratio * widthratio, (imgw * ratio * widthratio) / 2, (imgh * ratio * widthratio) / 2);
    }

    /**
     *清空画布
     *
     */
    function clearCanvas() {
        // cxt.clearRect(0, 0, 375 * ratio, totalHeight)
        cxt.clearRect(0, 0, (<any>canvas).width, (<any>canvas).height);
    }
    /**
     *画布旋转角度
     *
     * @param {number} deg 旋转角度
     */
    function CommonRotate(deg: number) {
        // 旋转参数
        this.rotate = 1;
        this.flag = true;
        this.deg = deg;
        // 音响放大参数
        this.soundsShocks = null;
        this.shockFlag = 1;
        this.soundFlag = true;
        // 欢呼手
        this.maxPeak = null;
        this.minPeak = null;
        this.computedPeak = null;
        this.shakeFlag = true;
        // 草丛位移
        this.GrassInit = 0;
        this.GrassCompany = null;
        this.GrassMoveMaxDis = null;
        this.GrassFlag = true;
    }
    // 旋转参数
    CommonRotate.prototype.move = function () {
        if (this.rotate >= 1) {
            this.flag = true
        }
        if (this.rotate <= -1) {
            this.flag = false
        }
        if (this.flag) {
            this.rotate -= 0.01;
        } else {
            this.rotate += 0.01;
        }
        return Math.PI / 180 * (this.rotate) * this.deg
    }
    // 音响放大参数
    CommonRotate.prototype.shock = function (soundsValue: number, Company: number) {
        // soundsValue最大倍数Company递增值
        this.soundsShocks = soundsValue;
        if (this.shockFlag <= 1) {
            //做++
            this.soundFlag = true;
        }
        if (this.shockFlag > this.soundsShocks) {
            //做--
            this.soundFlag = false;
        }
        if (this.soundFlag) {
            this.shockFlag += Company;
        } else if (!this.soundFlag) {
            this.shockFlag -= Company;
        }
        return this.shockFlag
    }
    // 欢呼手
    CommonRotate.prototype.shakeHands = function (minPeak: number, maxPeak: number, speed: number) {
        // minPeak,maxPeak,speed 开始值，结束值，速度
        this.minPeak = minPeak;
        this.maxPeak = maxPeak;
        if (this.computedPeak <= this.minPeak) {
            //做++
            this.shakeFlag = true;
        }
        if (this.computedPeak > this.maxPeak) {
            //做--
            this.shakeFlag = false;
        }
        if (this.shakeFlag) {
            this.computedPeak += speed;
        } else if (!this.shakeFlag) {
            this.computedPeak -= speed;
        }
        return this.computedPeak
    }
    // 草丛位移
    CommonRotate.prototype.Grass = function (GrassMoveMaxDis: number, GrassCompany: number) {
        // GrassMoveMaxDis,GrassCompany 位移距离，位移速度
        this.GrassMoveMaxDis = GrassMoveMaxDis;
        this.GrassCompany = GrassCompany
        if (this.GrassInit < this.GrassMoveMaxDis) {
            //做++
            this.shakeFlag = true;
        }
        if (this.GrassInit > this.GrassMoveMaxDis) {
            //做--
            this.shakeFlag = false;
        }
        if (this.shakeFlag) {
            this.GrassInit += GrassCompany;
        } else if (!this.shakeFlag) {
            this.GrassInit = 0;
        }
        return this.GrassInit
    };
    /**
     *重置画布
     *
     * @param {*} width
     * @param {*} height
     */
    function resizeCanvas(width: any, height: any) {
        fx.dom('#canvas')[0].setAttribute('width', width);
        fx.dom('#canvas')[0].setAttribute('height', height);
        cxt.clearRect(0, 0, (<any>canvas).width, (<any>canvas).height);
    };
    // 画布监听重置机型
    function changeCanvas() {
        ratio = (<any>window).devicePixelRatio;
        cw = canvas.offsetWidth;
        ch = canvas.offsetHeight;
        widthratio = cw / 375;
        heightratio = ch / 667;
        scorllratio = widthratio * ratio / 2;
        if (IsTrueLoadingAll) {
            currentScorll = resetScorllHeight * scorllratio;
            drawCanvas()
        }
    }
    // 监听窗口大小变化
    (<any>window).onresize = function () {
        changeCanvas()
    };
    // <div id="musicpart">
    //     <audio id="music" src="./resource/159487_Acoustic_Loop_41.mp3" type ="audio/mp3" loop controls>您的浏览器不支持 audio 标签。</audio>
    // </div>
    // 微信内置浏览器自动播放
    document.addEventListener("WeixinJSBridgeReady", function () {
        (<any>musicPlay).play();
    }, false);
    /** 
     * 用于缓动的变量 
     */
    // var startMoveTime = 0;
    var startMove = 0;
    // 监听滚动
    (<any>window).addEventListener('touchstart', e => {
        if (IsTrueLoadingAll) {
            // e.preventDefault();
            var touch = e.changedTouches[0];
            startY = touch.pageY;
            // startMoveTime = e.timeStamp || Date.now();
            startMove = startY;
        }
    }, { passive: false });
    (<any>window).addEventListener('touchmove', e => {
        e.preventDefault();
        if (IsTrueLoadingAll) {
            var touch = e.changedTouches[0];
            endY = touch.pageY;
            currentScorll += (endY - startY) * 2;
            startY = endY;
            if (-currentScorll >= totalHeight) {
                currentScorll = -totalHeight;
            }
            if (currentScorll >= 0) {
                currentScorll = 0;
            }
            resetScorllHeight = currentScorll / scorllratio;
            // clearCanvas()
        }
        // drawCanvas()
        // console.log(currentScorll,"坐标")
    }, { passive: false });
    (<any>window).addEventListener('touchend', e => {
        var touch = e.changedTouches[0];
        var lastY = touch.pageY;
        // 滑动缓动 更流畅点
        // 判断滚动方向
        //向下滑 startMove-lastY>0 正方向
        //向上滑 startMove-lastY<=0 反方向
        var v = startMove - lastY;
        var preStart: number;
        // (function (start, end) {
        //     // 原地点击
        //     if (v == 0 || -currentScorll <= 0) {
        //         return;
        //     }
        //     var dir = v > 0 ? -1 : 1; //加速度方向
        //     // var speed = (dir > 0 ? -v : v) / (endTime - startMoveTime);
        //     var _end = end; end = end || 0;
        //     var step = function () {
        //         if (-currentScorll >= totalHeight) {
        //             currentScorll = -totalHeight;
        //             return;
        //         }
        //         if (-currentScorll <= 0) {
        //             currentScorll = 0;
        //             return;
        //         }
        //         preStart = start;
        //         start = start + (end - start) / 2;
        //         currentScorll = currentScorll + dir * (start - preStart);
        //         if (Math.abs(start - _end) < 1) {
        //             return;
        //         }
        //         (<any>window).RAF(step);
        //     };
        //     step();
        // })(0, 200);
        // 针对UC浏览器音乐自动播放touchstart无效
        if (((<any>musicPlay).currentTime == 0 && -currentScorll > 0)) {
            PointAtMusic = false;
            (<any>musicPlay).play();
        }
    }, { passive: false });
}

