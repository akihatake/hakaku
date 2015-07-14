/**
 * @author team はかく
 */

// ページ読み込み時に実行したい処理
$(document).ready( function(){
  initDsp();
	//端末チェック
	if(navigator.geolocation) {
    //現在位置を取得できる場合
    navigator.geolocation.getCurrentPosition(successFunc,errorFunc,optionObj);
  }else{
    //現在位置を取得できない場合
  	//エラーコードに合わせたエラー内容をアラート表示

    var i = 0;
    var hoge = setInterval(function() {
      i++;
      //終了条件
      if (i == 1) {
        clearInterval(hoge);
        $('#msgContent').html("あなたの端末では、現在位置を取得できません。");
        $('#msgDialog').modal();
      }
    }, 1000);

  }
});


// 画面初期化
function initDsp() {
};


//成功した時の関数
function successFunc(position){
  var i = 0;
  var hoge = setInterval(function() {
      i++;
      //終了条件
      if (i == 1) {
        clearInterval(hoge);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $('#msgContent').html('緯度：' + latitude + '<br />' + '経度：' + longitude);
        $('#msgDialog').modal();
      }
  }, 1000);
  
  //$("#result").html("<ul><li>あああ</li><li>いいい</li><li>ううう</li></ul>");
};

//失敗した時の関数
function errorFunc(error){
	//エラーコードのメッセージを定義
	var errorMessage = {
		0: "原因不明のエラーが発生しました…。",
		1: "位置情報の取得が許可されませんでした…。",
		2: "電波状況などで位置情報が取得できませんでした…。",
		3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
	};

	//エラーコードに合わせたエラー内容をアラート表示
  $('#msgContent').html(errorMessage[error.code]);
  $('#msgDialog').modal();
};

//オプション・オブジェクト
var optionObj = {
	"enableHighAccuracy": false,
	"timeout": 8000,
	"maximumAge": 5000,
};
