//将url路径search参数转为json对象形式
function parseQueryString(url){
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
    if(arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
}


//将数字都转换为两位的
function num2double(number){
    number=(number.toString().length==2) ? number : ('0'+number);
    return number;
}

//将标准时间转换格式 2017/07/27 08:20:08
//参数2是默认导出格式
function forMatDate(date,default_val=true){
    date=new Date(Number(date));
    var year=date.getFullYear();
    var month=num2double(date.getMonth()+1);
    var dat=num2double(date.getDate());
    var hours=num2double(date.getHours());
    var min=num2double(date.getMinutes());
    var sen=num2double(date.getSeconds());
    if(default_val){
        date=year+'/'+month+'/'+dat+' '+hours+':'+min+':'+sen;
    }else{
        date=year+month+dat+hours+min+sen;
    }
    
    return date;
}



export {
    parseQueryString,
    forMatDate
}