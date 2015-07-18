/**
 * @author team はかく
 */
//var sample = 'http://webapi.suntory.co.jp/barnavi/v2/shops?key=0954a2c2b34db5c0bc4c3a3182f145af90c358ccde0f94aebf58bd14607f329e&pattern=1&lat=39.702075&lng=141.149297&range=1000&format=json&url=localhost'

var baseURL = 'http://webapi.suntory.co.jp/barnavi/v2/shops?'
var param = {
  key: '0954a2c2b34db5c0bc4c3a3182f145af90c358ccde0f94aebf58bd14607f329e',
  pattern: '1',
  lat: '39.702075',
  lng: '141.149297',
  range: '1000',
  format: 'json',
  url: 'localhost'
};
var allResults = 0;
var showResults = 0;


// ページ読み込み時に実行したい処理
$(document).ready( function(){
  // 画面初期化
  initDsp();

  // 位置情報取得と結果表示
　getGeolocation();

  // ボタンイベント追加
  $('#btnSearch').click(function(){
  　getGeolocation();
  })
});

function getGeolocation() {
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
}

// 画面初期化
function initDsp() {
  $('#result').remove('a');  
};


//成功した時の関数
function successFunc(position){
  /*
  var i = 0;
  var hoge = setInterval(function() {
      i++;
      //終了条件
      if (i == 1) {
        clearInterval(hoge);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //$('#msgContent').html('緯度：' + latitude + '<br />' + '経度：' + longitude);
        //$('#msgDialog').modal();
        console.log('緯度:' + latitude);
        console.log('経度:' + longitude);
        getItems();
      }
  }, 1000);
  */
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log('緯度:' + latitude);
  console.log('経度:' + longitude);
//  param.lat = latitude;
//  param.lng = longitude;
  getItems();


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


// WebAPIでデータ取得と表示
function getItems() {
  // 画面初期化
  /*
  $('#result').$(function() {
    $('<a>').remove();  
  });
  */

　// 位置情報
  $.getJSON(baseURL, param, function(data) {
    console.log('success!!');

    allResults = data.shops.results_available;
    showResults = data.shops.results_returned;
    console.log('総件数:' + allResults);
    console.log('表示件数:' + showResults);

    var ulObj = $("#result");
    for(var i = 0; i < showResults; i++) {
        var shopName = data.shops.shop[i].name;
        ulObj.append($('<a href="#" class="list-group-item">' + shopName + '</a>'));
    }
  }).done(function() {
    console.log("second success");
  }).fail(function() {
    console.log("error");
  }).always(function() {
    console.log("complete");
  });
}
