//获取主播详细信息
function getAnchorDetail(anchor_id){
    var param={
        anchor_id:anchor_id
    }
    anchor(param,function(data){
        toast.hide();
        // console.log("anchor is :"+JSON.stringify(data))
        if(data){
            // data.description="在美国混迹多年的旅游达人\n" +
            //     "        留学、租房不用愁，听老马给你解说美国当地人文趣事趣事趣事趣事趣事趣事趣事趣事留学、\n" +
            //     "        租房不用愁，听老马给你解说美国当地人文趣事趣事趣事趣事趣事趣事趣事趣事留学、\n" +
            //     "        租房不用愁，听老马给你解说美国。"                    //用于测试
            anchor_introduction_all=data.description
            if(data.description.length>0){
                data.description=showDescription(data.description)  //对主播简介做数据处理
                data.more=anchor_introduction_all!=data.description?true:false  //判断是否显示“显示更多”按钮
            }
            else{
                data.more=false
            }
            // console.log("anchor new is :"+JSON.stringify(data))
            var interText = doT.template($("#anchor_detail_content_template").text())
            $("#anchor_detail_content").html(interText(data))
        }
        else{

        }
    },function(){
        if(anchor_id==null){
            toast.hide();
            openDialog("请求失败",['确定'],function(ret){
                console.log(ret)
                return
            })
        }
    })
}
//主播下所有可用的专辑列表
function getAnchorAllAlbum(anchor_id){
    var param={
        anchor_id:anchor_id
    }
    album(param,function(datas){
        toast.hide();
        // console.log("album is :"+JSON.stringify(datas))
        if(datas.count>0){
            var data=datas.results
            for(var i=0;i<data.length;i++){
                data[i].play_times=handleData(data[i].play_times)
                var interText = doT.template($("#anchor_special_template").text())
                $("#anchor_special").append(interText(data[i]))
            }
            var interText = doT.template($("#anchor_special_count_template").text())
            $("#anchor_special_count").html(interText("专辑（"+datas.count+"）"))
        }
        else{
            var interText = doT.template($("#anchor_special_count_template").text())
            $("#anchor_special_count").html(interText("专辑"))
            $("#anchor_special").html(nothing("暂时还没有上传专辑"))
        }
    },function(){
        toast.hide();
        openDialog("请求失败",['确定'],function(ret){
            console.log(ret)
            return
        })
    })
}
//主播下所有可用的节目列表
function getAnchorAllProgram(anchor_id){
    var param={
        anchor_id:anchor_id
    }
    program(param,function(datas){
        toast.hide();
        // console.log("album is :"+JSON.stringify(datas))
        if(datas.count>0){
            var data=datas.results
            for(var i=0;i<data.length;i++){
                data[i].index=i;
                data[i].play_times=handleData(data[i].play_times);
                var interText = doT.template($("#anchor_program_template").text());
                $("#anchor_program").append(interText(data[i]));
            }
        }
        else{
            $("#anchor_program").html(nothing("暂时还没有上传节目"))
        }
    },function(){
        toast.hide();
        openDialog("请求失败",['确定'],function(ret){
            console.log(ret)
            return
        })
    })
}