/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1110124 Leslie  Leslie	1101463		新增本作業
 * 1120804 Joe	   Joe		序127		強制帳號型別為String避免純數字帳號無法登入
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbAccount", "_lbName", "_lbStatus");

AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	if (xObjectName.split('_').length == 4)
		xObjectName = xObjectName.split('_')[3];

	switch (xObjectName) {
		case "btLogin":
			//1120804	Joe		序127	強制帳號型別為String避免純數字帳號無法登入
			// var acc = $(e.target).data('loginacc');
			var acc = String($(e.target).data('loginacc'));
			if (window.confirm('是否確定切換登入為[ ' + $(e.target).closest('tr').find('span[id*="lbAccount2"]').text() + ' ]')) {
				var sAuthws = document.all.H_AuthWS.value;
				//1120424	Leslie[1111150]	[Merge]並修改執行方式(AjaxPro)
				var sOrgNo = $('#htxOrgNo').val();
				var rtn = IF1.IFT300.LogonFromServer(acc, sOrgNo).value
				if (!rtn.startsWith('ERR-')) {
					if (rtn == "")
						alert(acc + "帳號不存在。");
					else {
						opener.location = opener.location.origin + "/ms/sso.html?SAMLart=" + rtn;
						jf_CloseSelf();
                    }
				}
				else {
					alert(rtn);
                }
				/*
				var param = new Array(2);
				param[0] = '';
				param[1] = acc;
				var result = jf_CallW(sAuthws, 'WinLogon', false, param);
				if (result.error == false) {
					if (result.value == "") {
						alert(acc + "帳號不存在。");
					}
					else if (result.value.startsWith('ERR-'))
						alert(result.value);
					else {
						opener.location = opener.location.origin + "/ms/sso.html?SAMLart=" + result.value;
						jf_CloseSelf();
					}
				}
				else
					alert(result.errorDetail.string);*/
				//1120424	Leslie[1111150]	[Merge]並修改執行方式(AjaxPro)	==END==
			}
			Page_BlockSubmit = true;
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}



/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
 