function msToDate(msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let result = year +
        '-' +
        ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
        '-' +
        ((date + 1) < 10 ? '0' + date : date) +
        ' ' +
        ((hour + 1) < 10 ? '0' + hour : hour) +
        ':' +
        ((minute + 1) < 10 ? '0' + minute : minute) +
        ':' +
        ((second + 1) < 10 ? '0' + second : second);

    return result;
}

function getTs(time) {
    var arr = time.split(/[- :]/),
        _date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]),
        timeStr = Date.parse(_date)
    return timeStr
}

function handlePublishTimeDesc(post_modified) {
    // 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
    var curTime = new Date();
    var postTime = new Date(post_modified); //部分浏览器不兼容此转换建议所以对此进行补充（指定调用自己定义的函数进行生成发布时间的时间戳）

    //var timeDiff = curTime.getTime() - postTime.getTime();
    //上面一行代码可以换成以下（兼容性的解决）
    var timeDiff = curTime.getTime() - getTs(post_modified);

    // 单位换算
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = week * 4;
    var year = month * 12;

    // 计算发布时间距离当前时间的周、天、时、分
    var exceedyear = Math.floor(timeDiff / year);
    var exceedmonth = Math.floor(timeDiff / month);
    var exceedWeek = Math.floor(timeDiff / week);
    var exceedDay = Math.floor(timeDiff / day);
    var exceedHour = Math.floor(timeDiff / hour);
    var exceedMin = Math.floor(timeDiff / min);


    // 最后判断时间差到底是属于哪个区间，然后return

    if (exceedyear < 100 && exceedyear > 0) {
        return exceedyear + '年前';
    } else {
        if (exceedmonth < 12 && exceedmonth > 0) {
            return exceedmonth + '月前';
        } else {
            if (exceedWeek < 4 && exceedWeek > 0) {
                return exceedWeek + '星期前';
            } else {
                if (exceedDay < 7 && exceedDay > 0) {
                    return exceedDay + '天前';
                } else {
                    if (exceedHour < 24 && exceedHour > 0) {
                        return exceedHour + '小时前';
                    } else {
                        return exceedMin + '分钟前';
                    }
                }
            }
        }
    }
}

function formatTime(msec) {
    return handlePublishTimeDesc((msToDate(msec)))
}
module.exports = {
    formatTime: formatTime
}