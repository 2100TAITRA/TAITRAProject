/* jshint -W100 */

/*
DATE    SA		PG      MGRNO		Desc
1051005 Kevin   Kevin               首頁取得系統公告、公布欄
1101110 Kevin   Kevin   1101336     更新WebServiceNameSpace
1130827 Kevin   Kevin   1130840     移除無用資訊
1141010 Zen     Zen     1141112     以OC首頁為底改寫為OM首頁
1150529 Kevin   Kevin   1150391     弱掃修正
 */

//
// jQM's 'mobileinit' event handler
//
if (typeof workerEnve == 'undefined' || workerEnve === false)
{
    $(document).on('mobileinit', function ()
    {
        //$.mobile.loadingMessage = "登入系統中...";
        $.mobile.pageLoadErrorMessage = "載入網頁失敗！";
        $.mobile.changePage.defaults.changeHash = false;
    });
}

//
// 2013.3 - 擴充 theWebServices 以實作 AuthWS, SAMLWS proxy functions
//
// Note:
//  options有下列選項:
//   url: Web Service之URL, 若未指定, 則使用系統的預設值(theWebServices載入時自動存入ws_urls陣列中)
//
(function ($)
{
    if (!!theWebServices)
    {
        // 2013.3.4 - 實作 AuthWs proxy
        theWebServices.authws = {
            /*
			 * 由登入系統 (叫用AuthWS.LogonByPasswordWithLimitsAndOrgNo)
			 */
            logonByPasswordWithMachineType: function (orgNo, userId, password, machineType, options)
            {
                var _dfd = $.Deferred();
                //1130827 Kevin 1130840 移除無用資訊
				//1150529 Kevin 1150391 弱掃修正
                //var wsUrl = (options && options.url) ? options.url : '/OM_O/OMLIB/OMAuthWS.asmx';
                var wsUrl = (options && options.url) ? options.url : '/OM_O_ASP/OMLIB/OMAuthWS.asmx';
                var wsFuncName = 'LogonByPasswordWithLimitsAndOrgNoAndMachineType';
                if (!wsUrl || wsUrl.length == 0)
                {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
                    return _dfd.promise();
                }

                var async = false;
                if (options && (typeof options.async !== 'undefined') && (options.async === true))
                {
                    async = true;
                }

                var params = {
                    "argOrgNo": orgNo
                    , "argAccount": userId
                    , "argPassword": password
                    , "argMachineType": "1"
                };

                window.theWebServices.invokeWS(wsUrl, wsFuncName, '2100t', params, async, function (r, xml)
                {
                    theLogger.log(r);

                    if (r.length === 0)
                    {
                        _dfd.reject(new Error('回傳權仗為空字串!'));
                    }
                    else
                    {
                        _dfd.resolve(r);
                    }
                });
                return _dfd.promise();
            },
            /* 登出系統 (叫用AuthWS.Logout)
			 */
            logout: function (artifact, options)
            {
            	//1130827 Kevin 1130840 移除無用資訊
				//1150529 Kevin 1150391 弱掃修正
                //var wsUrl = (options && options.url) ? options.url : '/OM_O/OMLIB/OMAuthWS.asmx';
                var wsUrl = (options && options.url) ? options.url : '/OM_O_ASP/OMLIB/OMAuthWS.asmx';
                if (!wsUrl || wsUrl.length == 0)
                {
                    theLogger.error('-ERR- AuthWS.logout was invoked, but WS\'s url was missing!');
                    throw new Error('AuthWS尚未設定服務網址URL');
                }

                var params = {
                    "argArtifact": artifact
                };

                window.theWebServices.invokeWS(wsUrl, 'Logout', '2100t', params, false, function (r, xml)
                {
                    theLogger.log("-I- AuthWS.logout returns:" + r);
                    if (r && r == "true")
                    {
                        res = r;
                    }
                    else
                    {
                        throw new Error('叫用AuthWS.Logout失敗!' + r);
                    }
                });

                return res;

            },
            getSpotLightMsg: function (artifact, options)
            {
            	//1130827
				//1150529 Kevin 1150391 弱掃修正
                //var wsUrl = (options && options.url) ? options.url : '/OM_O/OMLIB/OMAuthWS.asmx';
                var wsUrl = (options && options.url) ? options.url : '/OM_O_ASP/OMLIB/OMAuthWS.asmx';
                var params = new SOAPClientParameters(), res;
                params.add("argArtifact", artifact);

                var params = {
                    "argArtifact": artifact
                };

                window.theWebServices.invokeWS(wsUrl, 'GetSpotLightMsg', '2100t', params, false, function (r, xml)
                {
                    theLogger.log(r);
                    if (typeof r == 'string')
                    {
                        res = r;
                    }
                    else if (r != null) // 2015.03.16 Kevin 新增判斷回傳值為空字串
                    {
                        res = '';
                    }
                    else
                    {
                        throw new Error('叫用AuthWS.GetSpotLightMsg!');
                    }
                });

                return res;

            },
            getUserProgramsJSON: function (SAMLart, options)
            {
                var _dfd = $.Deferred();
                //1130827 Kevin 1130840 移除無用資訊
				//1150529 Kevin 1150391 弱掃修正
                //var wsUrl = (options && options.url) ? options.url : '/OM_O/OMLIB/OMAuthWS.asmx';
                var wsUrl = (options && options.url) ? options.url : '/OM_O_ASP/OMLIB/OMAuthWS.asmx';
                var wsFuncName = 'GetUserProgramsJSON';
                if (!wsUrl || wsUrl.length === 0)
                {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
                    return _dfd.promise();
                }

                var async = false;
                if (options && (typeof options.async !== 'undefined') && (options.async === true))
                {
                    async = true;
                }

                var params = {
                    "argArtifact": SAMLart
                };

                window.theWebServices.invokeWS(wsUrl, wsFuncName, '2100t', params, async, function (r, xml)
                {
                    if (typeof _debug == 'boolean' && !!_debug)
                    {
                        theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
                        theLogger.log('    ' + JSON.stringify(r));
                    }

                    if (r.indexOf('ERR-') === -1)
                    {
                        _dfd.resolve(r);
                    }
                    else
                    {
                        _dfd.reject(new Error('取得應用程式選單失敗:' + r.m_strErrMsg));
                    }
                });

                return _dfd.promise();
            }
        };
		
        // 2013.3.4 - 實作 SAMLWS proxy
        theWebServices.SAMLWS = {
            /*
			 * 取得行動平台簽核的使用者Profile
			 */
            getUserInfoForPad: function (artifact, options)
            {
                var _dfd = $.Deferred();

                //1080128 Kevin 非必要函式不呼叫
                _dfd.resolve();
                return _dfd.promise();
            }
        };
    }

    /*
	 * 2012.2.17
	 */
    theSSO.MP.login = function login(org_id, user_id, password, finish_callback)
    {
        var SAMLart = '';

        try
        {
            // 2014.8 - change logon function to logonByPasswordWithMachineType
            var promise = window.theWebServices.authws.logonByPasswordWithMachineType(org_id, user_id, password, 1);
            promise.done(function (rslt)
            {
                if (rslt.indexOf('ERR-') === -1)
                {
                    SAMLart = rslt;
                    window.localStorage.Artifact = SAMLart;
                    theLogger.log("-I- Logon succeeded. SAMLart=" + SAMLart);
                    //1060329 Kevin 紀錄權杖
                    theSSO.Artifact = SAMLart;
                    //alert("Logon succeeded. SAMLart=" + SAMLart);
                    //1070831	Leslie	配合滲透測試，登入後直接把Artifact寫入Cookie
					//1091103 Kevin 1090766 修正CookieHttpOnly
                    //document.cookie = 'SAMLart=' + escape(SAMLart) + ';path=/';
					$.ajax({
						type:"POST",
						//1130827 Kevin 1130840 移除無用資訊
						//1141010 Zen 1141112 以OC首頁為底改寫為OM首頁
                        //url:"/OC/OC1/OCregistCookie.ashx?ck="+SAMLart,
						//1150529 Kevin 1150391 弱掃修正
                        //url:"/OM_O/OMLIB/OMregistCookie.ashx?ck="+SAMLart,
                        url:"/OM_O_ASP/OMLIB/OMregistCookie.ashx?ck="+SAMLart,
						//data:'{"ck":"'+SAMLart+'"}',	//保留功能
						contentType:"application/json; charset=utf-8",
						dataType:"text" // "json" // 2019.12.25 - 1080339 Eric, jQuery 3 upgrade.
					});

                    // 記錄登入成功之機關代碼及帳號
                    window.localStorage.latest_login_orgid = org_id;
                    window.localStorage.latest_login_userid = user_id;

                    // 2012.2.29 - 測cookies [expire funtionality]
                    var expire_normal = new Date();
                    var expire_short = new Date();

                    var nowStr = expire_short.toGMTString();

                    if (finish_callback)
                    {
                        finish_callback(SAMLart);
                    }
                    else
                    {
                        SSOUtil.loading('hide');
                    }
                }
                else
                {
                    SSOUtil.loading('hide');
                    var sErr = rslt.substr(4);
                   
                        alert("登入錯誤:" + sErr);
                        SSOUtil.loading('hide');
                   
                }
            })
			.fail(function (errObj)
			{
			    alert(errObj);
			    //1051111 Kevin 修正部分登入失敗時會一值顯示登入中
			    SSOUtil.loading('hide');
			});
        }
        catch (err)
        {
            SSOUtil.loading('hide');
            if (typeof err.message === 'undefined')
            {
                alert('登入系統錯誤-叫用登入函式(logonByPasswordWithMachineType)失敗. [no responseText]');
            }
            else
            {
                alert('登入系統錯誤-叫用登入函式(logonByPasswordWithMachineType)失敗:' + err.message);
            }
        }
    }
})(jQuery);

/*
 * jQuery's ready() call back function
 */
// 2019.10.28 - 1080339 Eric, jQuery 3 upgrad
//$(document).ready(function() {
$(function() {
    function _initControls()
    {
        var lorgid = window.localStorage['latest_login_orgid'];
        var luserid = window.localStorage['latest_login_userid'];

        if (typeof luserid === 'string' && luserid.length)
        {
            $('#in_userid')[0].value = luserid;
        }
    }

    _initControls();

    $('#btn_login').on('click', function ()
    {
        // 2012.8.29 - 改用MobiScroll
        var orgid = 'OC';
        var userid = $('#in_userid')[0].value;
        var password = $('#in_password')[0].value;

        if (typeof orgid === 'string' && typeof userid === 'string' && typeof password === 'string')
        {
            if (orgid.length > 0 && userid.length > 0 && password.length > 0)
            {
                SSOUtil.loading('show', { text: '正在登入系統...', textVisible: true, theme: 'c' });

                window.scrollTo(0, 0);
                theSSO.MP.login(orgid, userid, password, _postLoginProcess);
            }
            else
            {
                alert("帳號或密碼不可為空白!");
            }
        }
        else
        {
            alert("帳號或密碼不可為空白!");
        }
    });
});