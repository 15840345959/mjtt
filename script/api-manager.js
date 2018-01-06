var SERVER_URL="https://api.gowithtommy.com/";

//基本的ajax访问后端接口类
/*
    param:参数
    url:访问的接口链接
    method：请求方法
    successCallBack：成功之后执行的方法
    errorCallBack：失败之后的方法
    loadding：加载提示
 */
function ajaxRequest(url, method, successCallBack, errorCallBack, loadding) {
    if (loadding) {
        //隐藏加载提示
    } else {
        showToast("loading","加载中")
    }
    $.ajax({
        type: method,
        url: SERVER_URL+url,
        dataType: "json",
        success: successCallBack,
        error:errorCallBack
    });
}

//获取主播详细信息
function anchor(param,successCallBack,errorCallBack){
    var anchor_id=param.anchor_id
    ajaxRequest("rest/radio/anchor/"+anchor_id, "GET", successCallBack, errorCallBack)
}

//主播下所有可用的专辑列表
function album(param,successCallBack,errorCallBack){
    var anchor_id=param.anchor_id
    ajaxRequest( "rest/radio/anchor/"+anchor_id+"/album/", "GET", successCallBack, errorCallBack)
}

//主播下所有可用的节目列表
function programLists(param,successCallBack,errorCallBack){
    var anchor_id=param.anchor_id
    ajaxRequest("rest/radio/anchor/"+anchor_id+"/program/", "GET", successCallBack, errorCallBack)
}

//获取专辑详细信息
function getAlbumById(param,successCallBack,errorCallBack){
    var album_id=param.album_id
    ajaxRequest("rest/radio/album/"+album_id, "GET", successCallBack, errorCallBack)
}

//专辑下更多节目列表
function getAllProgram(param,successCallBack,errorCallBack){
    var album_id=param.album_id
    var page=param.page
    // console.log("getAllProgram param is : "+JSON.stringify(param))
    if(page==1){
        ajaxRequest("rest/radio/album/"+album_id+"/program/", "GET", successCallBack, errorCallBack)
    }
    else{
        ajaxRequest("rest/radio/album/"+album_id+"/program/?page="+page, "GET", successCallBack, errorCallBack)
    }
}

//获取相关专辑+换一换
function getMorecategory(param,successCallBack,errorCallBack){
    var category_id=param.category_id
    ajaxRequest("rest/radio/category/"+category_id+"/album/", "GET", successCallBack, errorCallBack)
}


