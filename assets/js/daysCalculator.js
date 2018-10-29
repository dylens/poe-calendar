window.day = 0;

//获取以current为第一天的一周的数组
function weekDays(current) {
    var week = new Array();
    //current.getDate() 获取当前日期位于本月的第几天，9.24则为24
    //current.getDay() 获取当前日期位于星期的第几天，周日=0，周一=1，周二=2，周三=3，周四=4，周五=5，周六=6
    //9.29为周六，29-6+1计算得到日期为9.24
    //设置current日期为计算得到的周一的日期
    current.setDate((current.getDate() - current.getDay() + 1));
    //循环添加包括周一在内的7天到week数组中
    for (var i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return week;
}

//计算日期d的年份以及处于今年的第几周
function weekNumber(d) {
    // 复制一个UTC时间的d，同时也为了不改变原始值
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

    // 表达式: d.getUTCDate() + 4 - (d.getUTCDay() || 7)， 获取日期d所在周的周四
    // 其中表达式： d.getUTCDay() || 7
    //   当d.getUTCDay()不为0时，直接返回该值
    //   如果日期在周日，d.getUTCDay()值为0，则 (d.getUTCDay() || 7) 返回值为7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // 获取今年的第一天
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // 计算所在周的周四位于本年的第几周
    // 一天有86400秒=60秒*60分钟*24小时，86400000毫秒
    // +1是为了避免0/7取整为0
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // 返回年份和所处星期数的数组
    return [d.getUTCFullYear(), weekNo];
}