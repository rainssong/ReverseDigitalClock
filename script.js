var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: '',
        countDown: '',
        progress: 0
    }
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timeConstants = {
    HOUR_MS: 1000 * 60 * 60,
    DAY_MS: 1000 * 60 * 60 * 24,
    MINUTE_MS: 1000 * 60,
    SECOND_MS: 1000
};

// 优化的补零函数，使用预定义的字符串
var zeroPaddings = {
    2: '00',
    4: '0000'
};

function zeroPadding(num, digit) {
    return (zeroPaddings[digit] + num).slice(-digit);
}

// 计算年末日期并缓存，避免重复创建
var yearEndDate;

function getYearEndDate(year) {
    if (!yearEndDate || yearEndDate.getFullYear() !== year) {
        yearEndDate = new Date(year, 11, 31, 23, 59, 59);
    }
    return yearEndDate;
}

function updateTime() {
    var cd = new Date();
    var year = cd.getFullYear();
    
    // 更新时间和日期
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    clock.date = zeroPadding(year, 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];

    // 计算倒计时
    var now = cd.getTime();
    var distance = getYearEndDate(year).getTime() - now;
    var hours = Math.floor((distance % timeConstants.DAY_MS) / timeConstants.HOUR_MS);
    var minutes = Math.floor((distance % timeConstants.HOUR_MS) / timeConstants.MINUTE_MS);
    var seconds = Math.floor((distance % timeConstants.MINUTE_MS) / timeConstants.SECOND_MS);
    clock.countDown = zeroPadding(hours, 2) + ":" + zeroPadding(minutes, 2) + ":" + zeroPadding(seconds, 2);
    
    // 同时更新进度条
    var startOfYear = new Date(year, 0, 1);
    var daysOfYear = Math.floor((cd - startOfYear) / timeConstants.DAY_MS);
    var daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
    clock.progress = Math.floor(daysOfYear / daysInYear * 100);
    updateProgress();
}

function updateProgress() {
    var progressBarFill = document.querySelector(".progress-bar-fill");
    if (progressBarFill) {
        progressBarFill.style.width = clock.progress + "%";
    }
}

// 使用requestAnimationFrame代替setInterval，减少在不可见标签页的性能消耗
var lastUpdate = 0;
function animationLoop(timestamp) {
    // 每秒更新一次
    if (timestamp - lastUpdate >= 1000) {
        updateTime();
        lastUpdate = timestamp;
    }
    requestAnimationFrame(animationLoop);
}

// 初始化
updateTime();
requestAnimationFrame(animationLoop);