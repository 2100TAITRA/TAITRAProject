/*
DATE 	 SA		 PRG	  MGR_NO	DESC
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
function ClientOnLoad() {

    dlDeptOnChang();
    if (document.all.txSectIndex.value != "") {
        document.all.dlSect.selectedIndex = document.all.txSectIndex.value;
    }
    dlSectOnChang();
    if (document.all.txUserIndex.value != "") {
        document.all.dlUser.selectedIndex = document.all.txUserIndex.value;
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            if(jf_CheckBeforePrint())
            {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btSave":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDoc":
            Page_BlockSubmit = true;
            //jf_ToolBarSubmit(xObjectName);
            //openDlg(document.all.DocUrl.value, document.all.SsoArtifact.value);
            window.open(document.all.DocUrl.value);
            break;
    }
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢核欄位不可為空白、大小順序、是否大於最大統計月份
function jf_CheckBeforePrint()
{
    var bChecked = true;

    if (document.all.dlSect.selectedIndex != -1) {
        document.all.txSect.value = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;
        document.all.txSectIndex.value = document.all.dlSect.selectedIndex;
        
    }
    if (document.all.dlUser.selectedIndex != -1) {
        document.all.txUser.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
        document.all.txUserIndex.value = document.all.dlUser.selectedIndex;
    }

    var strS = jf_Trim(document.all.txDocNoS.value);
    var strE = jf_Trim(document.all.txDocNoE.value);
    if(document.all.rbTypeAll.checked && strS == "" &&  strE =="")
	{
	    $('#' + document.all.txDocNoS.id).focus();
		bChecked = false;
		alert("公文狀態選擇全部時，文號不可為空白。");
    }

    var strMonth = jf_Trim(document.all.txCloseDate.value);
    if (strMonth != "") {
        if (strMonth.length < 5) {
            strMonth = jf_PADL(strMonth, 5, "0");
            document.all.txCloseDate.value = strMonth;
        }
        if (!jf_CheckCDATE(strMonth + "01")) {
            document.all.txCloseDate.value = "";
            $('#txCloseDate').focus();
            bChecked = false;
            alert("輸入的月份格式錯誤，請重新輸入");
        }
    }

	return bChecked;
}


function dlDeptOnChang() {

    if (document.all.dlDept.disabled)
        return;

    var strDeptNo = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;

    fnClearDropDownList(document.all.dlSect);
    fnClearDropDownList(document.all.dlUser);

    if (strDeptNo == "") {
        fnHideDropDownList(document.all.dlSect);
        return;
    }

    //初始化二級選單
    var SectObj = ED4.EDT4901_EXAM.GetSectInfo(jf_GetArtifact(), strDeptNo).value;
    if (SectObj) {
        if (SectObj.bSuccess) {
            if (SectObj.SectInfo.length > 0) {
                document.all.dlSect.options.add(new Option("", ""));
                for (var iSect = 0; iSect < SectObj.SectInfo.length; iSect++) {
                    var strSect = SectObj.SectInfo[iSect];
                    document.all.dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
                }
            }
        }
        else {
            alert(SectObj.ErrMsg);
        }
    }

    fnHideDropDownList(document.all.dlSect);

    //初始化人員選單
    var UserObj = ED4.EDT4901_EXAM.GetUserInfo(jf_GetArtifact(), strDeptNo).value;
    if (UserObj) {
        if (UserObj.bSuccess) {
            document.all.dlUser.options.add(new Option("", ""));
            for (var iUser = 0; iUser < UserObj.Userinfo.length; iUser++) {
                var UserInfo = UserObj.Userinfo[iUser];
                if (UserInfo) {
                    var strUserName = UserInfo.UserName;
                    var strEmpName = UserInfo.EmpName;
                    document.all.dlUser.options.add(new Option(strEmpName, strUserName));
                }
            }
        }
        else {
            alert(UserObj.ErrMsg);
        }
    }

    fnHideDropDownList(document.all.dlUser);
}

function dlSectOnChang() {

    if (document.all.dlSect.disabled)
        return;

    var strSectNo = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;

    fnClearDropDownList(document.all.dlUser);

    if (strSectNo == "") {
        dlDeptOnChang();
        return;
    }

    //初始化人員選單
    var UserObj = ED4.EDT4901_EXAM.GetUserInfo(jf_GetArtifact(), strSectNo).value;
    if (UserObj) {
        if (UserObj.bSuccess) {
            document.all.dlUser.options.add(new Option("", ""));
            for (var iUser = 0; iUser < UserObj.Userinfo.length; iUser++) {
                var UserInfo = UserObj.Userinfo[iUser];
                if (UserInfo) {
                    var strUserName = UserInfo.UserName;
                    var strEmpName = UserInfo.EmpName;
                    document.all.dlUser.options.add(new Option(strEmpName, strUserName));
                }
            }
        }
        else {
            alert(UserObj.ErrMsg);
        }
    }

    fnHideDropDownList(document.all.dlUser);
}

//清空選單
function fnClearDropDownList(obj) {
    while (obj.options.length > 0)
        obj.options.remove(0);
}

function fnHideDropDownList(obj) {
    if (obj.options.length == 0)
        obj.className = "hide";
    else
        obj.className = "";
}