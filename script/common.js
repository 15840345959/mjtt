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