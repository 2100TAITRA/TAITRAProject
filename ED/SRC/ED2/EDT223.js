/*
DATE	SA		PRG		MGR_NO		DESC
1071123 Cloud   Cloud   1071133	    修正點擊核可多次會收到重複通知之問
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    $(".footStatus").hide();
    if (document.all.nDelDocNo != null) {
        parent.bottom.location.href = "../../../ODDEP/ODI260.aspx?SAMLart=" + document.all.nArtifact.value + "&pDocNo=" + document.all.nDelDocNo.value + "&nFrom=EDT223&MODE=1";
    }

    if (document.all.closewin)
    {
        if (document.all.closewin.value != "")
        {
            alert(document.all.closewin.value);
        }
        parent.close();
    }
	
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
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
    {
        //1071123 Cloud    1071133	    修正點擊核可多次會收到重複通知之問
        Page_BlockSubmit = true;
        return;
    }
        

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btTransfer":
	        document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
	        document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
	        Page_BlockSubmit = !jf_CheckBeforSave();
	        if (!Page_BlockSubmit)
	            ShowBottomEmpty();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btSearch":
	        Page_BlockSubmit = true;
	        if (jf_CheckKeyObject()) {
	            var strArtifact = document.all.nArtifact.value;
	            var strOrgNo = document.all.nSourceOrgno.value;
	            var strDocNo = document.all["txDocNo"].value;
	            var strApplyNo = document.all["txApplyNo"].value;
	            var strHttp = document.all.nHttp.value;
	            var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT222&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
	            jf_OpenChildWin(strUrl, "EDI200", 800, 600);
	        }
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btApprove":
	        Page_BlockSubmit = !jf_CheckBeforSave();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btReject":
	        Page_BlockSubmit = !jf_CheckBeforSave();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查


//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDesc"].value == "")
	{
		strErrMsg = "簽核意見不可空白";
		$('#txDesc').focus();
	}

	if (strErrMsg != "")
	{

	    bRtnbool = false;
	    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}
	//1071123 Cloud   1071133	    修正點擊核可多次會收到重複通知之問
	else
	{
	    
	    IsServerHandling = true;
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
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ShowBottomEmpty() {
    parent.bottom.location.href = "EDT223Bottom.htm";
}
function CheckBeforDel() {
    //Ericks start 2005/10/14
    if (!parent.bottom.document.all["NonDelSeq"])
        return;
    var strNonDelSeq = parent.bottom.document.all["NonDelSeq"].value;
    var SeqArray = strNonDelSeq.split(",");
    var strlastSeq = SeqArray[SeqArray.length - 1];
    if (document.all["txSeqNo"].value * 1 <= strlastSeq * 1) {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["流程序號" + document.all["txSeqNo"].value + "為檔案室退文之記錄，不允許透過本程式刪除之。請重新進行歸檔"])), "");
        return ;
    }
    //Ericks end 2005/10/14

    if (document.all.h_TxCanDelSeqNo.value == "0") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您目前對此筆公文無刪除異動權限"])), "");
        return ;
    }
    if (document.all["txSeqNo"].value == "") {
        alert("刪除序號不可為空白。");
        $('#txSeqNo').focus();
    }
    //caesar 0940216
    // 如果是創稿,不允許刪除至原點   
    if (document.all.nNewByOu.value == "Y" && document.all.nSignTime.value == "N") {
        if (StringGetInt(document.all.txSeqNo.value) <= 2) {
            //0980811 修改錯誤訊息,使其符合現行狀況[0980375]-Jane
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文目前已被讀取，無法撤銷序號" + StringGetInt(document.all.txSeqNo.value) + "的流程。"])), "");
            document.all["txSeqNo"].value == "";
            $('#txSeqNo').focus();
            return false;
        }
    }

    if (CompareNumber(StringGetInt(document.all.txSeqNo.value), StringGetInt(document.all.h_TxCanDelSeqNo.value))) {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前指定刪除之序" + StringGetInt(document.all.txSeqNo.value) + ",已超出您被允許之處理範圍"])), "");
        document.all["txSeqNo"].value == "";
        $('#txSeqNo').focus();
        return false;
    }
    if (StringGetInt(document.all.txSeqNo.value) == 0) {
        $('#txSeqNo').focus();
        return false;
    }
    return true;

}
//比較數字大小
//如果argNum1 < argNum2則回傳false
//如果argNum1 >= argNum2則回傳true
function CompareNumber(argNum1, argNum2) {
    if (argNum1 == Math.max(argNum1, argNum2))
        return false;
    else
        return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr) {
    var num = argNumStr;

    if (num.length > 0) {
        if (argNumStr.charAt(0) == "0")
            num = argNumStr.substr(1, argNumStr.length - 1);
        if (num.charAt(0) == "0")
            num = StringGetInt(num)
    }
    return num;
}
function dlPhraseNo_onchange() {
    var index = document.all["dlPhraseNo"].selectedIndex;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txDesc"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    $('#txReason').focus();
}
