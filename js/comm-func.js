import {parseTime} from "./index";

/**
 * Created by zhao on 2019/4/18.
 */
export function cloneDeep() {
    function checkType(target) {
        return Object.prototype.toString.call(target).slice(8, -1)
    }
    var result, checkedType = checkType(target)
    if (checkedType === 'Array') {
        result = []
    } else if (checkedType === 'Object') {
        result = {}
    } else {
        return target
    }
    //递归遍历对象或数组中的属性值或元素为原始值为止
    for (var key in target) {
        if ( checkType(target[key]) === 'Array' || checkType(target[key]) === 'Object') {
            result[key] = cloneDeep(target[key])
        } else {
            result[key] = target[key]
        }
    }
    return result
}
// 计算字节长度 汉字2 字母1
export function countBytesLength(str){
    var length = 0
    //首先遍历传入的字符串
    for(var i = 0; i < str.length; i++) {
        if (str[i].charCodeAt(i) > 255) {
            length += 2
        } else {
            length++
        }
    }
    return length
}
// isNaN函数
export function isNaN(num) {
    var ret = Number(num)
    ret += ''
    if (ret === 'NaN') {
        return true
    }
    return false
}
// typeof函数
export function typeOf(value) {
    return Object.prototype.toString.call(val).slice(8, -1)
}
// 防抖函数
export function debounce (func, wait=300) {
    var timer
    return function () {
        if (timer) {
            clearTimeOut(timer)
        }
        timer = setTimeout({
            func.apply(this, arguments)
    }, wait)
    }
}
// 节流函数
export function throttle (fn, wait=300) {
    var prev = +new Date()
    return function () {
        var now = +new Date()
        if (prev - now > 300) {
            fn.apply(this, arguments)
            prev = now
        }
    }
}
export function ajax (options) {
    options = options || {}
    options.url = options.url || ''
    options.method = options.method.toUpperCase() || 'GET'
    options.async = options.async || true
    options.data = options.data || null
    options.success = options.success || function () {}
    var xhr = null
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.open(options.url, options.method, options.async)
    var postData = []
    for (var key in options.data) {
        postData.push(key + '='+ options.data[key])
    }
    if (options.method === 'POST') {
        xhr.open(options.method, options.url, options.async )
        xhr.send(postData)
    } else if (options.method === 'GET') {
        xhr.open(options.mehtod, options.url + postData.join('&'), options.async)
        xhr.send(null)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.success(xhr.responseText)
        }
    }
}
var areaArr = [
    { id: 10000, name: '中国' },
    { pid: 10000, id: 11000, name: '浙江省' },
    { pid: 11000, id: 11100, name: '杭州市' },
    { pid: 11100, id: 11101, name: '西湖区' },
    { pid: 11100, id: 11102, name: '萧山区' },
    { pid: 11000, id: 11200, name: '金华市' },
    { pid: 11200, id: 11201, name: '京东区' },
    { pid: 11200, id: 11202, name: '婺城区' },
    { pid: 10000, id: 12000, name: '湖南省' },
    { pid: 12000, id: 12100, name: '长沙市' },
    { pid: 12100, id: 12101, name: '长沙市区1' },
    { pid: 12100, id: 12102, name: '长沙市区2' },
    { pid: 12000, id: 12200, name: '岳阳市' },
    { pid: 12200, id: 12201, name: '岳阳市区1' },
    { pid: 12200, id: 12202, name: '岳阳市区2' }
];

export function tree (data) {
    data.forEach(item => {
        if (item.pid !== 0) {
            data.forEach(val => {
                if (val.id === item.pid) {
                    if (!val.children) {
                        val.children = [];
                    }
                    val.children.push(item);
                }
            });
        }
    });
    data = data.filter(item => !item.pid);
    return data;
}

/*
判断浏览器的类型
*/
export function BrowserType() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera || userAgent.indexOf('rv:11') > -1; // 判断是否IE浏览器
    var isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf('Firefox') > -1; // 判断是否Firefox浏览器
    var isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1; // 判断是否Safari浏览器
    var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; // 判断Chrome浏览器
    if (isIE) {
        if (userAgent.indexOf('rv:11') > -1) {
            return 'IE11';
        }
        if (userAgent.indexOf('rv:12') > -1) { // 这一段还没验证
            return 'IE12';
        }
        /* var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
                                                            reIE.test(userAgent); */
        var fIEVersion = parseFloat(RegExp['$1']);
        if (fIEVersion === 7) { return 'IE7'; } else if (fIEVersion === 8) { return 'IE8'; } else if (fIEVersion === 9) { return 'IE9'; } else if (fIEVersion === 10) { return 'IE10'; } else if (fIEVersion === 11) { return 'IE11'; } else if (fIEVersion === 12) { return 'IE12'; } else { return '0'; } // IE版本过低
    } // isIE end
    if (isFF) { return 'FF'; }
    if (isOpera) { return 'Opera'; }
    if (isSafari) { return 'Safari'; }
    if (isChrome) { return 'Chrome'; }
    if (isEdge) { return 'Edge'; }
}

/**
 * 获取接口返回的流转成blob对象下载
 * @param fileName  自定义文件名称
 * @param blob  接口返回的流数据
 *  const content = res;
 const blob = new Blob([content]);
 */

export function downLoadFile(fileName, blob) {
    if (!fileName || !blob) {
        return false;
    }
    if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
    }
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000;
    } else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        );
    }
}

/**
 *@desc: 判断元素是否超出长度，true 超出，false 没有
 *@selector: 元素选择器，可被querySelector识别的
 *
 *<el-tooltip :content="data" placement="top" effect="light" :disabled="tooltipShow">
 *  <div class="modification" :class="'modification-' + curKey">{{ data }}</div>
 *</el-tooltip>
 * this.$nextTick(() => {
 *    this.tooltipShow = !isEllipsis(`.modification-${this.curKey}`);
 * });
*/
export function isEllipsis(selector) {
    const box = document.querySelector(selector);
    return box.scrollWidth > box.offsetWidth;
}


/**
 * // 例如 url为 https://www.baidu.com?a=1&b=2
 * // window.location.href.queryString();
 * // {a:1,b:2}
 *
 * */
(function(pro){
    function queryString(){
        var obj = {},
            reg = /([^?&#+]+)=([^?&#+]+)/g;
        this.replace(reg,function($0,$1,$2){
            obj[$1] = $2;
        })
        return obj;
    }
    pro.queryString = queryString;
}(String.prototype));



export default {
    cloneDeep,
    countBytesLength,
    BrowserType,
    downLoadFile,
    formatTime,
    tree
}
