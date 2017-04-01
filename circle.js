var music = document.querySelector('#music')
//绑定timeupdate事件
music.addEventListener('timeupdate',function(){
    if (!isNaN(music.duration)) {
        var progressValue = music.currentTime/music.duration; //用时间比来获取进度条的值
        if(progressValue == 1){
            progressValue=0;//当播放完成，进度条跳到开始
        }
    drawCircle(canvas,progressValue);
    };
},false);

drawCircle = function (canvas, percentage) {
    var canvasWidth = 300;
    var innerR = canvasWidth * 0.8 * 0.5;//半径
    var ctx;
    canvas.setAttribute('width', canvasWidth + 'px');
    canvas.setAttribute('height', canvasWidth + 'px');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    ctx.translate(canvasWidth / 2, canvasWidth / 2);
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2, false);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#24666A";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, innerR, Math.PI * 3 / 2, (Math.PI * 3 / 2 + Math.PI * 2 / 180 + percentage * Math.PI * 2), false);
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#D86750";
    ctx.stroke();
};

drawCircle(document.getElementById('canvas'),0);
