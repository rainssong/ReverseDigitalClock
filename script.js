var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: '',
        countDown: '123'
    }
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
    var cd = new Date();
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];

    var now = new Date().getTime();
    var distance = new Date("Dec 31, " + cd.getFullYear() + " 23:59:59").getTime() - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    clock.countDown = zeroPadding(hours,2) + ":" + zeroPadding(minutes,2) + ":" + zeroPadding(seconds,2);
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}

var cd = new Date();
var daysOfYear = Math.floor((cd - new Date(cd.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)); // 一年中过去的天数
var progress = Math.floor(daysOfYear / 365 * 100); // 进度条进度

function updateProgress() {
    var progressBarFill = document.querySelector(".progress-bar-fill");
    progressBarFill.style.width = progress + "%";
}

updateProgress();