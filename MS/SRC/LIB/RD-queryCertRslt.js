//1110421 Kevin 1110164 弱掃移動script至js
//1140723 Leslie[1141011]	弱掃修正[Prototype Pollution]，限制參數白名單
//1140801 Leslie[1141011]	弱掃修正[Prototype Pollution]，使用Map物件替代

// 2019.11.12 - 1080339 Eric, jQuery 3.0 upgrade 修正
//  jQuery 3.0修正套用後 window的'load' callback 會在 $(function(){ ... })前被叫用 
//   修改前是$(document).ready(function(){...})先被叫用, 之後才是window的'load' callback
let _dfdDone = null;
window.addEventListener("load", function() {
	// 2019.10.28 - 1080927 Eric, add some function for bug tracking
	console.log('window.onload event handler...');

	if (_dfdDone==null) {
		_dfdDone = $.Deferred();
	}

	// 1040201 - 叫用window.close()可關閉此分頁視窗
	let keepOpen = false;
	if (typeof localStorage.dev_keep_query_cert_open==='string' && localStorage.dev_keep_query_cert_open==='1') {
		keepOpen = true;
	}
	if (!keepOpen) {
		let _prm = _dfdDone.promise();
		_prm
		.then(function(){
			console.log('_dfdDone resolved callback...');
			window.close();
		})
		.fail(function(){
			window.close();
		});
	}
});

//1140801	Leslie[1141011]	弱掃修正[Prototype Pollution]，使用Map物件替代
// var params;
var params = new Map();
// 2022.1.5 - 1101433 Eric, DocSign新增回傳appVer(App程式版本)
//1081028 Eric 1080339 jQuery 3.0 upgrade!
//1080125 Eric 1080049/1080179因應弱掃問題, 將原網址參數account及內部之物件變數名稱更名
//1080122 Kevin 1080049 弱掃待修正，內政部不使用先Mark
// urlParam: exist, certowner[原account], cert, subject, ca, startDat, endDate, appVer[2022.1.5-110433新增-Eric]
//$(document).ready(function() {
$(function() {
	console.log('jQuery ready handler...');
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
        
        str = "" + propertyName + "=" + decodeURIComponent(params[propertyName]) + "\r\n";
        //alert(str);
        str_value += str;
    }
    
    //alert(str_value);
    $("#rslt_pane").text("[params dump]\r\n" + str_value);
    
	var errCode='', errMsg='';
	var _exist=false, _certowner='', _cert='', _subject='', _ca='', _startDate='', _endData='', _appVer='';
	var _oldDocSign = false; // 2019.11.5 - 1080927 Eric, for 舊版 DocSing app 提示更新訊息
	str = params['errCode'];
	
	if (!!str && str.length) {
		errCode = decodeURIComponent(str);
	}

	// 2022.1.5 - 1101433 Eric
	let sAppVer = params['appVer'];
	if (!!sAppVer && sAppVer.length) {
		_appVer = decodeURIComponent(sAppVer);
	}
	
	var _rslt = null, _errObj = null;
	var _text = '';
	if (errCode.length && errCode!=='0') {
		str = params['errMsg'];
		if (!!str && str.length) {
			errMsg = decodeURIComponent(str);
		}
		//alert('作業時發生錯誤! 錯誤碼:' + errCode + ', 錯誤說明:' + errMsg);

		str = params['certowner'];
		if (!!str && str.length) {
			_certowner = str;
		}
		
		_errObj = {
			errCode: errCode,
			errMsg: errMsg
		};
		
		localStorage.setItem('queryCertError', JSON.stringify(_errObj));
		if (!!_appVer &&_appVer.length) {
			localStorage.setItem('docSignAppVer', _appVer); // 2022.1.5 - 1101433 Eric
		}

		_text = $('#rslt_pane').text() + 'localStorage[queryCertError]=' + JSON.stringify(_errObj) + '\r\n';
		
		if (!!_certowner && _certowner.length) {
			_rslt = {
				appVer: _appVer,
				certowner : _certowner,
				certExist : false,
				time : new Date()
			};
			localStorage.setItem('certDataUpdated', JSON.stringify(_rslt));
			_text = $('#rslt_pane').text() + 'localStorage[certDataUpdated]=' + JSON.stringify(_rslt) + '\r\n';
		}
		else {
			_rslt = {
				appVer: _appVer,
				certowner: '_unknown',
				certExist: false,
				time : new Date()
			};
			localStorage.setItem('certDataUpdated', JSON.stringify(_rslt));
			_text = $('#rslt_pane').text() + 'localStorage[certDataUpdated]=' + JSON.stringify(rslt) + '\r\n';
		}

		_dfdDone.reject($.extend({success:false}, _rslt));
		console.log('jquery ready done [localStorage updated, error]...');
	}
	else {
		str = params['exist'];
		if (!!str && str.length) {
			if (str=='1' || str=='Y' || str=='y') {
				_exist = true;
			}
		}
		
		str = params['orgNo'];
		if (!!str && str.length) {
			_orgNo = decodeURIComponent(str);
		}
						
		str = params['certowner'];
		if (!!str && str.length) {
			_certowner = decodeURIComponent(str);
		}
		else {
			_oldDocSign = true;
		}
		
		if (!_exist) {
			var certData = {
				exist: false,
				cert: '',
			};
			
			var strData = JSON.stringify(certData);
			localStorage.setItem('certData-' + _certowner, strData);
			if (!!_appVer &&_appVer.length) {
				localStorage.setItem('docSignAppVer', _appVer); // 2022.1.5 - 1101433 Eric
			}

			_text = $("#rslt_pane").text() + 'localStorage[certData-'+_certowner+']=' + strData + '\r\n';	
			_rslt = {
				appVer: _appVer,
				certowner : _certowner,
				certExist : false,
				time : new Date(),
				oldDocSign: _oldDocSign // 2019.11.5 
			}
			localStorage.setItem('certDataUpdated', JSON.stringify(_rslt));
			_dfdDone.resolve($.extend({success:true}, _rslt));
			_text = $("#rslt_pane").text() + 'localStorage[certDataUpdated]=' + JSON.stringify(_rslt) + '\r\n';
		}
		else {
			str = params['cert'];
			if (!!str && str.length) {
				_cert = decodeURIComponent(str);
				//alert('signCert=' + theSignCert)
			}
			
			str = params['subject'];
			if (!!str && str.length) {
				_subject = decodeURIComponent(str);
			}
			
			str = params['ca'];
			if (!!str && str.length) {
				_ca = decodeURIComponent(str);
			}
			
			str = params['startDate'];
			if (!!str && str.length) {
				_startDate = decodeURIComponent(str);
			}
			
			str = params['endDate'];
			if (!!str && str.length) {
				_endDate = decodeURIComponent(str);
			}
			
			if ((_certowner.length || _oldDocSign) && _cert.length && _subject.length && _ca.length &&
				_startDate.length && _endDate.length)
			{

				if (_oldDocSign) {
					let certData = {
						exist: false,
						cert: '',
						oldDocSign: _oldDocSign // 2019.11.5 
					};
					strData = JSON.stringify(certData);
					let _theId = localStorage.latest_login_userid.toUpperCase();
					localStorage.setItem('certData-' + _theId, strData);	
					if (!!_appVer &&_appVer.length) {
						localStorage.setItem('docSignAppVer', _appVer); // 2022.1.5 - 1101433 Eric
					}
				}
				else {
					var certData = {
						exist: true,
						cert: _cert,
						subject: _subject,
						ca: _ca,
						startDate: _startDate,
						endDate: _endDate
					};
					
					var strData = JSON.stringify(certData);
					localStorage.setItem('certData-' + _certowner, strData);
					if (!!_appVer &&_appVer.length) {
						localStorage.setItem('docSignAppVer', _appVer); // 2022.1.5 - 1101433 Eric
					}
				}
				_text = $("#rslt_pane").text() + 'localStorage[certData-'+_certowner+']=' + strData + '\r\n';
				_rslt = {
					appVer: _appVer,
					certowner : _certowner,
					certExist : true,
					time : new Date(),
					oldDocSign : _oldDocSign // 2019.11.5 
				};

				localStorage.setItem('certDataUpdated', JSON.stringify(_rslt));
				_text = $("#rslt_pane").text() + 'localStorage[certDataUpdatee]=' + JSON.stringify(_rslt) + '\r\n';
				
				// dump localStorage object
				if (!!certData && certData.exist) {
					var _sData = localStorage['certData-' + _certowner];
					var _storeData = JSON.parse(_sData);
					//alert('subject='+_storeData.subject + ', ca=' + _storeData.ca);
				}
				_dfdDone.resolve($.extend({success:true}, _rslt));

				//alert("After localStorage.setItem");
			}
			else {
				var missing = [];
				if (cert.length==0) {
					missing.push('cert');
				}
				if (subject.length==0) {
					missing.push('subject');
				}
				if (ca.length==0) {
					missing.push('ca');
				}
				if (startDate.length==0) {
					missing.push('startDate');
				}
				if (endDate.length==0) {
					missing.push('endDate');
				}
				
				_errObj = {
					errCode: errCode,
					errMsg: errMsg
				};
				
				localStorage.setItem('queryCertError', JSON.stringify(_errObj));
				if (!!_appVer &&_appVer.length) {
					localStorage.setItem('docSignAppVer', _appVer); // 2022.1.5 - 1101433 Eric
				}

				_text = $("#rslt_pane").text() + 'localStorage[queryCertError]=' + JSON.stringify(_errObj) + '\r\n';
				if (!!_certowner && _certowner.length) {
					_rslt = {
						appVer: _appVer,
						certowner : _certowner,
						certExist : false,
						time : new Date(),
						oldDocSign: _oldDocSign // 2019.11.5 
					};
					localStorage.setItem('certDataUpdated', JSON.stringify(_rslt));
					_text = $("#rslt_pane").text() + 'localStorage[certDataUpdated]=' + JSON.stringify(_rslt) + '\r\n';
				}
				else {
					_rslt = {
						appVer: _appVer,
						certowner: '_unknown',
						certExist: false,
						time : new Date(),
						oldDocSign: _oldDocSign // 2019.11.5 
					};
					localStorage.setItem('certDataUpdated', JSON.stringify(_rslt));
					_text = $("#rslt_pane").text() + 'localStorage[certDataUpdated]=' + JSON.stringify(_rslt) + '\r\n';
				}
				_dfdDone.resolve($.extend({success:true}, _rslt));
			}
			
			console.log('jQuery ready handler localStorage updated...');

			if (window.location.hostname.indexOf('moivip.fdat.com.tw')!=-1) { // 2019.1.25 - trace
				alert('localStorage.certDataUpdated="' + localStorage.certDataUpdated + '"')	
			}
		}
	}
	
    // 2013.1.3 - 叫用window.close()可關閉此分頁視窗
	//window.opener = null;
    //setTimeout(function() { window.opener=null; window.close(); }, 100);
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
					case 'certowner':
					case 'exist':
					case 'orgNo':
					case 'cert':
					case 'subject':
					case 'ca':
					case 'startDate':
					case 'endDate':
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