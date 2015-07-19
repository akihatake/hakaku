/**
 * @author team はかく
 */

//----------------------------------
// グローバル変数定義
//----------------------------------
// リクエストURLのベース
var baseURL = 'http://webapi.suntory.co.jp/barnavi/v2/shops?'
// リスエストURLに追加するパラメータ定義
var param = {
  key: '0954a2c2b34db5c0bc4c3a3182f145af90c358ccde0f94aebf58bd14607f329e',  // アクセスキー
  pattern: '1',       // 位置情報での検索設定
  lat: '39.702075',   // 緯度の初期値
  lng: '141.149297',  // 経度の初期値
//  datum: 'tokyo',   // 位置情報の計測基準
  range: '1000',      // 現在位置から検索する範囲（メートル指定）
  format: 'json',     // レスポンスのフォーマット
  url: 'localhost'    // コールバックのURL
};
// オプション
var optionObj = {
	"enableHighAccuracy": false,
	"timeout": 8000,
	"maximumAge": 5000,
};
// エラーコード
var errorMessage = {
	0: "原因不明のエラー",
	1: "位置情報の取得が許可されていません",
	2: "電波状況などで位置情報が取得できません",
	3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました",
};
// 表示速度の向上対策
var dialog = $('#msgDialog');
var msg = $('#msgContent');
var result = $('#result');


//--------------------------------------
// メイン処理（ページ読み込み時に実行する処理）
//--------------------------------------
$(document).ready( function(){
  initDsp();
　getGeolocation();
});


//--------------------------------------
// 画面初期化
//--------------------------------------
function initDsp() {
  result.empty();  
};


//--------------------------------------
// 位置情報取得と表示処理
//--------------------------------------
function getGeolocation() {
	// 端末の対応状況チェック
	if (navigator.geolocation) {
    // 現在位置を取得できる場合
    navigator.geolocation.getCurrentPosition(successFunc,errorFunc,optionObj);
  } else {
    // 現在位置を取得できない場合
    var i = 0;
    var hoge = setInterval(function() {
      i++;
      // 終了条件
      if (i == 1) {
        clearInterval(hoge);
        msg.html("この端末では、現在位置を取得できません。");
        dialog.modal();
      }
    }, 1000);
  }
}
// 位置情報取得成功時の処理
function successFunc(position){
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log('緯度:' + latitude);
  console.log('経度:' + longitude);

  // 取得した緯度経度をリクエストパラメータにセット
  param.lat = latitude;
  param.lng = longitude;

  // ページ描画
  getItems();
};
// 位置情報取得失敗時の処理
function errorFunc(error){
	//エラー表示
  msg.html(errorMessage[error.code]);
  dialog.modal();
};


//--------------------------------------
// WebAPIでBARデータ取得と表示
//--------------------------------------
function getItems() {
  $.getJSON(baseURL, param, function(data) {
    var shopData = data.shops;
    var allResults = shopData.results_available;
    var showResults = shopData.results_returned;

    // 検索結果をHTMLタグで出力
    for(var i = 0; i < showResults; i++) {
        result.append($('<a href="' + shopData.shop[i].url_pc + '" class="list-group-item" target="_blank">'
           + '<span class="glyphicon glyphicon-glass" aria-hidden="true"></span>　'
           + '<strong>' + shopData.shop[i].name + '</strong>'
           + '<br />' + '営業時間：　' + shopData.shop[i].open
           + '<br />' + '　定休日：　' + shopData.shop[i].close
           + '</a>'));
    }

    console.log('総件数:' + allResults);
    console.log('表示件数:' + showResults);
  }).done(function() {
    console.log("second success");
  }).fail(function() {
    console.log("error");
    msg.html("お店情報を取得できません。");
    dialog.modal();
  }).always(function() {
    console.log("complete");
  });
}


//--------------------------------------
// ボタンイベント追加
//--------------------------------------
$('#btnSearch').click(function(){
  initDsp();
　getGeolocation();
});
