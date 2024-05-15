function withData(param, suffix){
    let res = param < 10 ? '0' + param : '' + param;
    if (suffix) {
        res += suffix;
    }
    return res;
}
function getLoopArray(start,end, suffix){
    start = start || 0;
    end = end || 1;
    let array = [];
    for (let i = start; i <= end; i++) {
        array.push(withData(i, suffix));
    }
    return array;
}
function getMonthDay(year,month, suffix){
    year = month.replace('年', '');
    month = month.replace('月', '');

    let flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
    suffix = suffix ? suffix : '日';
    switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            array = getLoopArray(1, 31, suffix)
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            array = getLoopArray(1, 30, suffix)
            break;
        case '02':
            array = flag ? getLoopArray(1, 29, suffix) : getLoopArray(1, 28, suffix)
            break;
        default:
            array = '月份格式不正确，请重新输入！'
    }
    return array;
}
function getNewDateArry(){
    // 当前时间的处理
    let newDate = new Date();
    let year = withData(newDate.getFullYear()),
        mont = withData(newDate.getMonth() + 1),
        date = withData(newDate.getDate()),
        hour = withData(newDate.getHours()),
        minu = withData(newDate.getMinutes()),
        seco = withData(newDate.getSeconds());

    return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear,endYear,date) {
    // 返回默认显示的数组和联动数组的声明
    let dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
    let start = startYear || 1978;
    let end = endYear || 2100;
    // 默认开始显示数据
    let defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    let titleMap = ['年', '月', '日', '时', '分', '秒'];
    dateTimeArray[0] = getLoopArray(start,end, titleMap[0]);
    dateTimeArray[1] = getLoopArray(1, 12, titleMap[1]);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1], titleMap[2]);
    dateTimeArray[3] = getLoopArray(0, 23, titleMap[3]);
    dateTimeArray[4] = getLoopArray(0, 59, titleMap[4]);
    dateTimeArray[5] = getLoopArray(0, 59, titleMap[5]);

    dateTimeArray.forEach((current,index) => {
        dateTime.push(current.indexOf(defaultDate[index]+titleMap[index]));
    });

    return {
        dateTimeArray: dateTimeArray,
        dateTime: dateTime
    }
}
module.exports = {
    dateTimePicker: dateTimePicker,
    getMonthDay: getMonthDay
}