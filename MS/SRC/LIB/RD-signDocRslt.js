//1110421 Kevin 1110164 弱掃移動script至js
//1140723 Leslie[1141011]	弱掃修正[Prototype Pollution]，限制參數白名單
//1140801 Leslie[1141011]	弱掃修正[Prototype Pollution]，使用Map物件替代

//1140801	Leslie[1141011]	弱掃修正[Prototype Pollution]，使用Map物件替代
// var params;
var params = new Map();
// 2019.10.28 - 1080339 Eric, jQuery 3.0 upgrade 修正
//  jQuery 3.0修正套用後 window的'load' callback 會在 $(function(){ ... })前被叫用 
//   修改前是$(document).ready(function(){...})先被叫用, 之後才是window的'load' callback
let _dfdDone = null;

window.addEventListener("load", function() {
	if (_dfdDone==null) {
		_dfdDone = $.Deferred();
	}

	// 2019.10.28 - 1080339 Eric, jQuery 3.0 upgrade 修正
	console.log('window.onload event handler...');
	// 1040201 - 叫用window.close()可關閉此分頁視窗
	//window.close();
	_dfdDone.promise()
	.then(function(){
		console.log('_dfdDone resolved callback...');
		window.close();
	})
	.fail(function(){
		window.close();
	});
});

/* urlParam:
 *		signCert, signValue, docNo, msgId, account
 *		errCode, errMsg
 * update localStorage fields:
 *		OK-> signDocError, signatureValue-$msgId$, signCert-$msgId$, signDocNo, signMsgId
 *		FAIL-> signDocError
 * 		signValueUpdated 
 */
//1081028 Eric 1080339 jQuery 3.0 upgrade!
//$(document).ready(function() {
$(function() {
	console.log('jquery ready called...');

	if (_dfdDone==null) {
		_dfdDone = $.Deferred();
	}

    var parameter = window.location.search;
	//alert('parameter=' + parameter);
	
    params = parseUrlParam(parameter);
    //alert('params lenght=' + params.length);
    
    var str_value = "";
    var str = "";
    for(var propertyName in params) {
        //alert('' + propertyName + '=' + params[propertyName]);
        
        str = "" + propertyName + "=" + unescape(params[propertyName]) + "\r\n";
        //alert(str);
        str_value += str;
    }
    
    //alert(str_value);
    $("#rslt_pane").text("[params dump]\r\n" + str_value);
	
	// 2022.1.5 - 1101433 Eric, add appVer;
	let appVer='';
	var errObj=null, errCode='', errMsg='';
	var signCert='', signature='', docNo='', msgId='';

    // 2023.5.23 - Eric, bug-fix
	//str = params['errCode'];
    str = params['appVer'];
	if (!!str && str.length) {
		appVer = decodeURIComponent(str);
	}
	
	str = params['errCode'];
	if (!!str && str.length) {
		errCode = decodeURIComponent(str);
	}
	
	if (errCode.length) {
		str = params['errMsg'];
		if (!!str && str.length) {
			errMsg = decodeURIComponent(str);
		}
		//alert('作業時發生錯誤! 錯誤碼:' + errCode + ', 錯誤說明:' + errMsg);
		
		errObj = {
			'appVer': appVer,
			errCode: errCode,
			errMsg: errMsg
		};
						
		localStorage.setItem('signDocError', JSON.stringify(errObj));

		// 2022.1.5 - 1101433 Eric, bug-fix DocSign app加簽錯誤未正確提示異常資訊問題!
		var date = new Date();
		localStorage.setItem('signValueUpdated', date.toString());

		_dfdDone.reject($.extend({success:false}, errObj)); //1081028 Eric 1080339 jQuery 3.0 upgrade!
	}
    else {
		str = params['signCert'];
		if (!!str && str.length) {
			signCert = decodeURIComponent(str);
			//alert('signCert=' + theSignCert)
		}
		
		str = params['signValue'];
		if (!!str && str.length) {
			signature = decodeURIComponent(str);
		}
		
		str = params['docNo'];
		if (!!str && str.length) {
			docNo = decodeURIComponent(str);
		}
		
		str = params['msgId'];
		if (!!str && str.length) {
			msgId = decodeURIComponent(str);
		}
		
		if (signCert.length && signature.length && docNo.length && msgId.length) {
			localStorage.setItem('signDocError', '');
			localStorage.setItem('signatureValue-' + msgId, signature);
			localStorage.setItem('signCert-' + msgId, signCert);
			localStorage.setItem('signDocNo', docNo);
			localStorage.setItem('signMsgId', msgId);
			if (!!appVer && appVer.length) {
				localStorage.setItem('docSignAppVer', appVer); // 2022.1.5 - 1101433 Eric
			}
			var date = new Date();
			localStorage.setItem('signValueUpdated', date.toString());

			_dfdDone.resolve({success:true}); //1081028 Eric 1080339 jQuery 3.0 upgrade!
		}
		else {
			var missing = [];
			if (signCert.length==0) {
				missing.push('signCert');
			}
			if (signature.length==0) {
				missing.push('signature');
			}
			if (docNo.length==0) {
				missing.push('docNo');
			}
			if (msgId.length==0) {
				missing.push('msgId');
			}
			errMsg = '回傳內容異常, 缺少下列欄位:' + missing;
			//alert(_errMsg);
			errObj = {'appVer': appVer, errCode:-100, errMsg:errMsg};
			localStorage.setItem('signDocError', JSON.stringify(errObj));
			var date = new Date();
			localStorage.setItem('signValueUpdated', date.toString());

			_dfdDone.reject($.extend({success:false}, errObj)); //1081028 Eric 1080339 jQuery 3.0 upgrade!
			console.log('jquery ready done [localStorage updated]...');
		}
	}
});

function parseUrlParam(url) {
    var str=""; //參數中等號左邊的值
	//1140801	Leslie[1141011]	弱掃修正[Prototype Pollution]，使用Map物件替代
    // var params = {}; //參數中等號右邊的值
    var params = new Map(); //參數中等號右邊的值
    if(url.indexOf("?")!=-1) {
        //如果網址有"?"符號
        var ary=url.split("?")[1].split("&");
        //取得"?"右邊網址後利用"&"分割字串存入ary陣列 ["a=1","b=2","c=3"]
        for(var i in ary){
            //取得陣列長度去跑迴圈，如:網址有三個參數，則會跑三次
            str=ary[i].split("=")[0];
            //取得參數"="左邊的值存入str變數中
            if (str.length) {
				//1140723	Leslie[1141011]	弱掃修正[Prototype Pollution]，限制參數白名單
				//若str等於想要抓取參數 如:b
				// str_value = decodeURI(ary[i].split("=")[1]);
				// //取得b等號右邊的值並經過中文轉碼後存入str_value
				// if (str_value!=null) {
					// params[str] = str_value;
					// //alert(str+"="+str_value);
				// }
				switch(str){
					case 'appVer':
					case 'errCode':
					case 'errMsg':
					case 'signCert':
					case 'signValue':
					case 'docNo':
					case 'msgId':
						//若str等於想要抓取參數 如:b
						str_value = decodeURI(ary[i].split("=")[1]);
						//取得b等號右邊的值並經過中文轉碼後存入str_value
						if (str_value!=null) {
							params[str] = str_value;
						}
						break;
				}
            }
        }
    }
    
    return params;
}

//1110421 Kevin 1110164 弱掃移動script至js
$("#close_btn").on("click", function() {
	closeWindow();
	});

function closeWindow() {
	window.opener = null;
	window.close();
}