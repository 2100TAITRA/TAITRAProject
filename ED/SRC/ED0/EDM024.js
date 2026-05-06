/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060811   Justin   1060378     新增特定業務流程維護作業

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
var HasPriv = false;
var WorkID = "";

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
    cbLowest_Onclick();
	//新增模式非系統管理員功能都先鎖起來
    if (jf_GetActionMode() == LayoutModeNew) {
        if (document.all["H_HasII0002"].value != "Y") {
            document.all["btSave"].disabled = true;
            document.all["btOpen"].disabled = true;
            document.all["btSetUseDept"].disabled = true;
        }
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

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        
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
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
                Page_BlockSubmit = false;
                document.all["H_Appname"].value = document.all.dlAppList.options[document.all.dlAppList.selectedIndex].text;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //跳出輸入原因欄位
            var strDeleteReason = prompt('請輸入刪除原因(50字內)：');
            if (strDeleteReason == null) {
                Page_BlockSubmit = true;
                return;
            }
            document.all["H_DeleteReason"].value = strDeleteReason;
            if (document.all["H_DeleteReason"].value == "") {
                Page_BlockSubmit = true;
                alert('刪除原因不可為空白。');
            }
            else {
                if (document.all["H_DeleteReason"].value.length > 50) {
                    Page_BlockSubmit = true;
                    document.all["H_DeleteReason"].value = prompt('超過字數限制，請重新輸入刪除原因(50字內)：', document.all["H_DeleteReason"].value);
                }
            }
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            $('#txRespNo').focus();
            break;
        //查詢子視窗
	    case "btSearch":
	        Page_BlockSubmit = true;
			var strUrl = "";
            var strRespNo = jf_Trim(document.all["txRespNo"].value);
            strUrl = "EDC024.aspx?nFrom=EDM024&Mode=1";
            jf_OpenChildWin(strUrl, "EDC024", 1366, 768);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
            if (jf_CheckDataExist(document.all["SOURCE_ORGNO"].value))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
    if (document.all["txRespNo"].value == "")
	{
        strErrMsg += "分層負責代碼欄位不可空白\n";
        $('#txRespNo').focus();
	}
	
    if (document.all["txRespConTent"].value == "")
	{
        strErrMsg += "業務內容欄位不可空白\n";
        $('#txRespConTent').focus();
	}

    if (document.all["txRespNo"].value.length > 1 && document.all["txUpResp"].value== "")
    {
        strErrMsg += "非最上層時，上層負責代碼欄位不可空白\n";
        $('#btUpResp').focus();
    }
	if (document.all["cbLowest"].checked ==true && document.all["txUpResp"].value== "")
    {
        strErrMsg += "為最底層時，上層負責代碼欄位不可空白\n";
        $('#btUpResp').focus();
    }
    //檢核上層是否正確
    //1.判斷目前為第幾層
    //2.檢核上層符合邏輯
    if (!CheckExist("txRespNo")) {
        bRtnbool = false;
    }
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}		
	return bRtnbool;
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
		}
		else
		{
		}
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
    if (argCallerId == "EDC024")
	{
		
		if(WorkID!="")//有id 表示為上層使用查詢子視窗
		{
			WorkID="";
			if (document.all["txUpResp"] != null) {
				document.all["txUpResp"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
			}
		}
		else{
			//回傳代碼要做是否可維護檢核
			if (document.all["txRespNo"] != null) {
				document.all["txRespNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
			}
			//檢核權限
			$('#txRespNo').blur();
			if(HasPriv)//有權限才open
			{jf_ToolBarSubmit("btOpen");}
		}
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
//決行層集選單
function dlAppMainChang() {
    var argAppType = encodeURI(document.all.dlAppMain.options[document.all.dlAppMain.selectedIndex].value);
    fnClearDropDownList(document.all.dlAppList);
    var Listvalue = ED0.EDM024.GetAppList(document.all["SOURCE_ORGNO"].value, argAppType).value;
    if (Listvalue.indexOf("ERR") != -1) {
        alert(Listvalue.split('-')[1]);
    }
    else {
        var ListInfo = Listvalue.split('|');
        for (var i = 0; i < ListInfo.length; i++) {
            var oOption = document.createElement("OPTION");
            oOption.text = ListInfo[i];
            oOption.value = i;
            document.all.dlAppList.options.add(oOption);
            document.all.H_Applist.value = ListInfo[i]+"|";
        }
    }
}
function CheckPriv(argUserID) {
	
	if(document.all["txRespNo"].value=="")
		return;
    if (document.all["H_HasII0002"].value != "Y") {
        var Rtnvalue = ED0.EDM024.CheckPriv(document.all["SOURCE_ORGNO"].value, argUserID, document.all["txRespNo"].value).value;
        if (Rtnvalue.indexOf("ERR") != -1) {
            alert(Rtnvalue.split('-')[1]);
            document.all["btSave"].disabled = true;
            document.all["btOpen"].disabled = true;
            document.all["btSetUseDept"].disabled = true;
			HasPriv = false;
        }
        else {
            document.all["btSave"].disabled = false;
            document.all["btOpen"].disabled = false;
			document.all["btSetUseDept"].disabled = false;
			HasPriv = true;
        }
    }
	else
		HasPriv = true;
	
}
function CheckExist(argObjID) {

    //檢核是否符合上下層
    var passCheck = true;
    if (document.all["txUpResp"].value != "" && document.all["txRespNo"].value != "") {
        var RespNolength = document.all["txUpResp"].value.length;
        if (document.all["txRespNo"].value.substring(0, RespNolength) != document.all["txUpResp"].value) {
            passCheck = false;
            switch (argObjID) {
                case "txRespNo":
                    alert('現行輸入分層負責代碼與上層負責代碼，不符合代碼邏輯。');
                    break;
                case "txUpResp":
                    alert('現行輸入上層負責代碼與分層負責代碼，不符合代碼邏輯。');
                    break;
            }
        }
    }
    return passCheck;
}


//清空選單
function fnClearDropDownList(obj)
{
    while (obj.options.length > 1)
        obj.options.remove(1);
}
function btUpResp_Onclick() {
	WorkID = "UpResp";
    Page_BlockSubmit = true;
    var strUrl = "EDC024.aspx?nFrom=EDM024&Mode=2";
    jf_OpenChildWin(strUrl, "EDC024", 1360, 768);
}
function btSetUseDept_Onclick() {
    Page_BlockSubmit = true;
    var strRespNo = jf_Trim(document.all["txRespNo"].value);
    var strUrl = "EDM026.aspx?rtnObj=lbReturnValue&argFrom=EDM024&argRespNo=" + strRespNo;
    jf_OpenChildWin(strUrl, "EDM026", 1280, 1024);
}
function cbLowest_Onclick() {
    if (document.all["cbLowest"].checked) {
        document.all["dTRdlApp"].className = "dTR";
    }
    else {
        document.all["dTRdlApp"].className = "hide";
    }
}
