import dayjs from "dayjs";
const DATE_FORMAT = 'YYYY-MM-DD';
/**
 * 将给定的日期格式化为指定的日期字符串。
 * 
 * 此函数接收一个 `Date` 类型的日期对象，并将其按照提供的格式字符串进行格式化。
 * 如果没有提供日期对象，则默认使用当前时间。格式化过程由 `dayjs` 库完成。
 * 
 * @param {Date} date - 需要被格式化的日期对象，默认为当前时间。
 * @param {string} format - 日期的格式字符串，默认为 `DATE_FORMAT` 常量。
 * @returns {string} 返回格式化后的日期字符串。
 */
export function formatToDate(
  date:Date = new Date(), // 默认为当前时间,
  format = DATE_FORMAT
): string {
  return dayjs(date).format(format);
}

    const now = new Date(); //当前日期
  export const nowData = {
        currentYear :now.getFullYear(),//获得当前年份4位年
        currentMonth : now.getMonth(),//获得当前月份0-11
        currentDay : now.getDate()//获得当前是一个月的第几天
    }

    const getCurrentDate = function () {
        return now ;
    };

    //获取前/后n天的日期
  export  const getPreAfterDay = function (AddDayCount,format) {
        var dt= new Date(nowData.currentYear,nowData.currentMonth,nowData.currentDay);
        dt.setDate(dt.getDate()+AddDayCount);//获取AddDayCount天后的日期
        return formatToDate(dt,format);
    }
    //获取前/后n月的日期
 /**
 * 获取指定月份增减后的日期，并按照指定格式返回。
 * 
 * 本函数主要用于计算当前日期向前或向后推移指定月数后的新日期。
 * 例如，如果指定月数为1，则返回当前日期的下一个月的日期。
 * 如果指定的格式化字符串被提供，返回的日期字符串将按照该格式进行格式化。
 * 
 * @param AddMonthCount 要增减的月数，可以为正数（表示向后推移）或负数（表示向前推移）。
 * @param format 日期的输出格式，用于定制返回的日期字符串的样式。
 * @returns 返回按照指定格式格式化后的日期字符串。
 */
export const getPreAfterMonth = function (AddMonthCount, format) {
    // 创建一个基于当前年月日的新Date对象
    var dt = new Date(nowData.currentYear, nowData.currentMonth, nowData.currentDay);
    // 根据传入的月数增减调整Date对象的月份
    dt.setMonth(dt.getMonth() + AddMonthCount);
    // 使用指定的格式化函数将调整后的日期对象转换为字符串并返回
    return formatToDate(dt, format);
};


    /***
     * 获得本周起止时间
     */
  export  const  getCurrentWeek = function (format) {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = getCurrentDate();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);
        //本周 周一
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间
        startStop.push(formatToDate(monday,format)); //本周起始时间
        //添加本周最后一天时间
        startStop.push(formatToDate(sunday,format)); //本周终止时间
        //返回
        return startStop;
    };

    /***
     * 获得本月的起止时间
     */
  export  const getCurrentMonth = function (format) {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear, currentMonth, 1);

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            currentMonth++;
        }

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
        //添加至数组中返回
        startStop.push(formatToDate(firstDay,format));
        startStop.push(formatToDate(lastDay,format));
        //返回
        return startStop;
    };

    /**
     * 得到本季度开始的月份
     * @param month 需要计算的月份
     ***/
 export   const getQuarterSeasonStartMonth = function (month) {
        var quarterMonthStart = 0;
        var spring = 0; //春
        var summer = 3; //夏
        var fall = 6;   //秋
        var winter = 9; //冬
        //月份从0-11
        if (month < 3) {
            return spring;
        }

        if (month < 6) {
            return summer;
        }

        if (month < 9) {
            return fall;
        }

        return winter;
    };

    /**
     * 获得该月的天数
     * @param year年份
     * @param month月份
     * */
  export  const getMonthDays = function (year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    };

    /**
     * 获得本季度的起止日期
     */
  export  const getCurrentSeason = function (format) {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份
        var quarterSeasonStartMonth = getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

        //获得本季度开始的日期
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, getMonthDays(currentYear, quarterSeasonEndMonth));
        //加入数组返回
        startStop.push(formatToDate(quarterSeasonStartDate,format));
        startStop.push(formatToDate(quarterSeasonEndDate,format));
        //返回
        return startStop;
    };

    /***
     * 得到本年的起止日期
     *
     */
  export  const getCurrentYear = function (format) {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = getCurrentDate();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();

        //本年第一天
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        //本年最后一天
        var currentYearLastDate = new Date(currentYear, 11, 31);
        //添加至数组
        startStop.push(formatToDate(currentYearFirstDate,format));
        startStop.push(formatToDate(currentYearLastDate,format));
        //返回
        return startStop;
    };
