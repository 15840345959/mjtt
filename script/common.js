function download(){
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        $(location).attr('href', 'https://itunes.apple.com/cn/app/%E7%BE%8E%E6%99%AF%E5%90%AC%E5%90%AC-%E5%85%A8%E7%90%83%E6%99%AF%E7%82%B9%E8%AE%B2%E8%A7%A3%E8%AF%AD%E9%9F%B3%E5%AF%BC%E6%B8%B8/id945386876?mt=8');
    }
    else{
        $(location).attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.tommy.mjtt_an_pro&channel=0002160650432d595942&fromcase=60001')
    }
}

//获取浏览器参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function playMusic(id){
    var player = $("#player")[0]; /*jquery对象转换成js对象*/
    var player_src=$("#player").attr("src")  //正在播放的音频文件
    var audio_index=$("#program_play_"+id).attr("audio-index");  //要播放的音频文件
    console.log("正在播放的音频文件 is : " + JSON.stringify(player_src)+" ; 要播放的音频文件 is : " + JSON.stringify(audio_index))
    if(player_src==audio_index){
        if (player.paused){ /*如果已经暂停*/
            player.play(); /*播放*/
            $("#program_play_"+id+" .style-program-list-cover-play img").attr("src","./image/play_close.png")
        }else {
            player.pause();/*暂停*/
            $("#program_play_"+id+" .style-program-list-cover-play img").attr("src","./image/play_start.png")
        }
    }
    else{
        player.pause();/*暂停*/
        $("#player").attr("src",audio_index);
        var player = $("#player")[0]; /*jquery对象转换成js对象*/
        var player_src2=$("#player").attr("src")
        console.log("要更换的音频文件 is : " + JSON.stringify(player_src2))
        player.play(); /*播放*/
        $(".style-program-list-cover-play img").attr("src","./image/play_start.png")
        $("#program_play_"+id+" .style-program-list-cover-play img").attr("src","./image/play_close.png")
    }
}



var GetLength = function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}

//对显示简介进行信息处理
function showDescription(data){
    var win_width=$(window).width();
    if(win_width>=375&&win_width<412){
        if (GetLength(data) > 80) {
            $("#anchor_introduction").text(cutstr($("#anchor_introduction").text(), 80));
            return cutstr(data, 80)
        }
        else{
            return data;
        }
    }
    else if(win_width>=412&&win_width<=414){
        if (GetLength(data) > 120) {
            return cutstr(data, 120)
        }
    }
    else{
        if (GetLength(data) > 100) {
            return cutstr(data, 100)
        }
        else{
            return data
        }
    }
}

//点击更多加载详情
var introduction_all
function getMore(){
    $("#anchor_introduction").text(introduction_all);
    $('#more').hide();
}

//对数据进行处理
function handleData(data){
    if(data<10000){
        return data;
    }
    else if(data>=10000&&data<100000000){
        if(data%10000==0){
            data=data/10000
            return data+"万";
        }
        else{
            var data_m=parseInt(data / 10000);
            var data_t=parseInt((data-data_m*10000) / 1000);
            data=data_m+"."+data_t;
            return data+"万";
        }
    }
    else if(data>=100000000){
        if(data%100000000==0){
            data=data/100000000
            return data+"亿";
        }
        else{
            var data_m=parseInt(data / 100000000);
            var data_t=parseInt((data-data_m*100000000) / 10000000);
            data=data_m+"."+data_t;
            return data+"亿";
        }
    }
}


//弹窗
var dialog = new auiDialog({})
function openDialog(msg,buttons,callback){
    dialog.alert({
        title:"友情提示",
        msg:msg,
        buttons:buttons
    },callback)
}

//没有数据时的提示信息
function nothing(content){
    var str="<img src=\"./image/nothing.png\" class=\"style-nothing-image\" />\n" +
        "<div class=\"style-nothing-content aui-font-size-14\">"+content+"</div>";
    return str;
}

//提示窗
var toast = new auiToast();
function showToast(type,title){
    switch (type) {
        case "success":
            toast.success({
                title:title,
                duration:2000
            });
            break;
        case "fail":
            toast.fail({
                title:title,
                duration:2000
            });
            break;
        case "custom":
            toast.custom({
                title:title,
                html:'<i class="aui-iconfont aui-icon-laud"></i>',
                duration:2000
            });
            break;
        case "loading":
            toast.loading({
                title:title,
                duration:2000
            },function(ret){
                // console.log(ret);
                setTimeout(function(){
                    toast.hide();
                }, 3000)
            });
            break;
        default:
            // statements_def
            break;
    }
}