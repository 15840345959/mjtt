function download(){
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        $(location).attr('href', 'https://itunes.apple.com/cn/app/%E7%BE%8E%E6%99%AF%E5%90%AC%E5%90%AC-%E5%85%A8%E7%90%83%E6%99%AF%E7%82%B9%E8%AE%B2%E8%A7%A3%E8%AF%AD%E9%9F%B3%E5%AF%BC%E6%B8%B8/id945386876?mt=8');
    }
    else{
        $(location).attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.tommy.mjtt_an_pro&channel=0002160650432d595942&fromcase=60001')
    }
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

//js截取字符串，中英文都能用
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
//字符串，长度

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