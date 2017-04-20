var audio = document.querySelector('#music')
//绑定timeupdate事件
$("#slider").roundSlider({
    handleSize: "1,1",
    width: 22,
    radius: 100,
    value: 0,
    max: "100",
    startAngle: 90,
    step: "0.005",
    showTooltip: false,
    editableTooltip: false,
    sliderType: "min-range",
    drag: function (args) {
        seek(args);
    },
    change: function (args) {
        // handle the change event here
        seek(args);
    }
    });

    $(audio).on("timeupdate", function(){
        seektimeupdate();
    });

    function seektimeupdate(){
        var nt = audio.currentTime * (100 / audio.duration);
        $("#slider").roundSlider("option", "value", nt);
    }
    function seek(event){
        var val = event.value;
        $("#slider").roundSlider("option", "value", val);
        seekto = audio.duration * (val / 100);
        audio.currentTime = seekto;
    }
