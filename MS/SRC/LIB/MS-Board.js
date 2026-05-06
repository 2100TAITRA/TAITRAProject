var _dbgBillboardPageInitLog = ''; // for debug...
var _BoardPageId = 'billboardCtxt';
//
// 2012.4.13 - 測試jQM page relative events
//

// => 頁面載入且套用相關class完成後會叫用(button/list等controls已轉換為touch UI controls)
$(document).on('pageinit', '#' + _BoardPageId, function(event) {
    _dbgBillboardPageInitLog += '#billboardCtxt - pageinit event.\r\n';
});

// => 頁面載入, 尚未套用相關class叫用 (在 'pagecreate' event 之前)
$(document).on('pagebeforecreate', '#' + _BoardPageId, function(event) {
    _dbgBillboardPageInitLog += '#billboardCtxt - pagebeforecreate event.\r\n';
});
 
// => 頁面載入, 尚未套用相關class叫用 (在 'pagebeforecreate' event 之後)
$(document).on('pagecreate', '#' + _BoardPageId, function(event) {
    _dbgBillboardPageInitLog += '#billboardCtxt - pagecreate event.\r\n';
});
