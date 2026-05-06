/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1081015      Cloud   1080858 新增單位庫房公文銷毀計畫維護作業
 * 1120321      Cloud   1120211 升級二代
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
//* 1120321      Cloud   1120211 升級二代
/*if (document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/
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
    //* 1120321      Cloud   1120211 升級二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl() {
    var xObjectName = document.activeElement.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
    	case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "EAT403C1.aspx?&SAMLart="+GetParam("SAMLart");
            jf_OpenChildWin(pUrl, "EAT403C1", 850, 500);
            break;
    	    //* 1120321      Cloud   1120211 升級二代
    	/*case "ibExtDateS":
    		Page_BlockSubmit = true;
    		jf_CallCalendar(document.all["txDesDateS"], event.screenX, event.screenY);
    		break;
    	case "ibExtDateE":
    		Page_BlockSubmit = true;
    		jf_CallCalendar(document.all["txDesDateE"], event.screenX, event.screenY);
    		break;*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//* 1120321      Cloud   1120211 升級二代
//function jf_ToolBarHandle() {
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
    //* 1120321      Cloud   1120211 升級二代
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //* 1120321      Cloud   1120211 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
                //* 1120321      Cloud   1120211 升級二代
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //* 1120321      Cloud   1120211 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //* 1120321      Cloud   1120211 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            //* 1120321      Cloud   1120211 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //* 1120321      Cloud   1120211 升級二代
        /*case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPreview();
            jf_ToolBarSubmit();
            break;*/
        case "btPreview":
            //* 1120321      Cloud   1120211 升級二代
            //Page_BlockSubmit = !jf_ConfirmPreview();
            Page_BlockSubmit = !ConfirmPreview();
            //* 1120321      Cloud   1120211 升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave() {
    var bRtnbool = false;

    if (CheckBeforSave()) {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew) {
            if (CheckDataExist())//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function CheckBeforSave() {
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txDesDateS"].value == "" && document.all["txDesDateE"].value == "") {
        strErrMsg += "擬銷燬日期起迄不可皆為空白。";
        document.all["txDesDateS"].focus();
    }
    if (!CheckCDATE("txDesDateS", "擬銷燬日期(起)", true))
        return false;

    if (!CheckCDATE("txDesDateE", "擬銷燬日期(訖)", true))
        return false;

    var strSDate = document.all.txDesDateS.value;
    var strEDate = document.all.txDesDateE.value;

    if (strSDate == "" && strEDate != "") {
        document.all["txDesDateS"].value = document.all["txDesDateE"].value;
    }
    if (strSDate != "" && strEDate == "") {
        document.all["txDesDateS"].value = document.all["txDesDateE"].value;
    }

    // 當起值 > 迄值需作起迄交換	
    if (strSDate != "" && strEDate != "" && strSDate > strEDate) {
        document.all.txSDate.value = strEDate;
        document.all.txEDate.value = strSDate;
    }
    var strYearS = strSDate.substring(0, 3);
    var strYearE = strEDate.substring(0, 3);
    if (parseInt(strYearE) - parseInt(strYearS) > 1)
        strErrMsg = "擬銷燬日期區間不可大於一年。";
    

    if (strErrMsg != "") {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}
var bHasCheck = false;
function CheckCDATE(argObj, strMsg) {

    if (bHasCheck) {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;

    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            document.all[argObj].focus();
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;

}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID) {
        if (jf_IsWebServiceSuccess(argResult)) {
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else {
            //document.all["txReadOnly"].value = "";
        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {

    if (argCallerId == "EAT403C1") {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        document.all["txPlanNo"].focus();
        Page_BlockSubmit = false;
        jf_OpenButtonSubmit();
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}



/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckPlanNo() {
	if (document.all["txPlanNo"].value != "") {
		if (!CheckDataExist()) {
			Page_BlockSubmit = false;
			alert("此銷毀批號不存在");
			document.all["txPlanNo"].focus();
		}
	}
}
function CheckDataExist() {
    
    var strCode = EA40.EAT403.CheckExist(document.all["txPlanNo"].value).value;
    if (strCode == "Y")
        return true;
    else if (strCode == "N")
        return false;
    else
    {
        alert(strCode);
        return false;
    }
       
}
function dlSourcelist_onblur() {
    var strCode = EA40.EAT403.GetDeptInfo(document.all["dlSourcelist"].options[document.all["dlSourcelist"].selectedIndex].value).value;
    if (strCode.indexOf("ERR") != -1) {
        alert(strCode);
    }
    document.all["H_DEPTNO"].value = "";
    while (document.all.dlDept.options[0] != null) {
    	document.all.dlDept.options[0] = null;
    }
    var SectDropListChild = document.createElement("OPTION");
    SectDropListChild.value = "";
    SectDropListChild.text = "";
    document.all.dlDept.options.add(SectDropListChild);
    var arrDeptList = strCode.split(';');
    for (var i = 0; i < arrDeptList.length; i++) {
        SectDropListChild = document.createElement("OPTION");
        SectDropListChild.value = arrDeptList[i].split('|')[0];
        SectDropListChild.text = arrDeptList[i].split('|')[1];
        document.all.dlDept.options.add(SectDropListChild);
    }

}
function GetDeptNo() {
	document.all["H_DEPTNO"].value = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;

}
function GetParam(p) {
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if (rg_szItems.length == 2) {
		var rg_szItems2 = rg_szItems[1].split("&");
		for (var i = 0; i < rg_szItems2.length; i++) {
			var rg_items = rg_szItems2[i].split("=");
			if (rg_items[0] == p)//"SAMLart")
				return rg_items[1];
		}

	}
}
//* 1120321      Cloud   1120211 升級二代
function ConfirmPreview()
{
    if (document.all["txPlanNo"].value == "") {
        alert("銷毀批號不可為空白");
        document.all["txPlanNo"].focus();
        return false;
    }
    else
        return true;
    
}


