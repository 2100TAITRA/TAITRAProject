/*
DATE	SA		PRG		MGR_NO		DESC
1060930 Kevin   Justin  1060099     新增本作業
1070803 Kevin   Justin	1070678		弱掃修正Client Cookies Inspection
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1080514	Cloud	Kevin_C	1080047		修正使用物件錯誤的問題
1091124	Leslie	Leslie	1090885		取消網址列的權杖，配合修正取得網址參數邏輯
1110103	Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1140630 Joe     Andy    1140550     修正錯誤視窗顯示的限制字數與資料庫設定不一致的況狀
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

var strClickBtn = "";
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
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    case "btHelp1":
	        jf_ShowOrgDialogForPersonWithOrgNo(document.all.H_txOrgNo.value);
	        strClickBtn = "btHelp1";
	        break;
	    case "btHelp2":
	        strClickBtn = "btHelp2";
	        jf_ShowOrgDialogForPersonWithOrgNo(document.all.H_txOrgNo.value);
	        break;
	}
}

function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
    var arrSelectType = new Array(1);
    arrSelectType[0] = "Account";
    var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
}

function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
    var sSelectType = "";
    for (var i = 0; i < argSelectType.length; i++) {
        if (i != 0)
            sSelectType += ",";
		//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--S
        //sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
    }
    //jf_SaveCookie("iic021StrctureType", argParam);
    //jf_SaveCookie("iic021SelectType", sSelectType);
    //if (argOrgNo)
    //    jf_SaveCookie("iic021OrgNo", argOrgNo);

    //jf_ShowModal("../../../../IF/IF1/IFC021.aspx" + GetAllParamStr(), "288", "470");
	jf_ShowModal("../../../../IF/IF1/IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--E
}
function GetAllParamStr()
{
    var strParam = "";
    var pUrl = unescape(this.location.search);	//一樣要經過解碼
	//1091124	Leslie[1090885]	取消網址列的權杖
    /*if (pUrl != -1)
        return pUrl;*/
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
		else
			strParam = "?";	//串上"?"以避免外部呼叫端會串上各程式專用的參數
	}
    return strParam;
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

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
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
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;

            if (document.all.ddlNextUser.options.length != 0) 
            {
                document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            }
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCheck":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btSearch":
	        Page_BlockSubmit = true;
	        var strUrl = "";
	        strUrl = "EAI812.aspx?rtnObj=lbReturnValue";
	        jf_OpenChildWin(strUrl, "EAT812", 800, 600);
	        break;
		case "btSearchFlow":
            Page_BlockSubmit = true;
			if(jf_CheckKeyObject())
			{
				var strOrgNo = jf_Trim(document.all.H_txOrgNo.value);
				var strApplyNo = document.all.txAppno.value;
				var strArtifact = document.all.SsoArtifact.value;
				strUrl = "../../../ED/ED2/EDI200.aspx?SOURCE_ORGNO="+strOrgNo+"&argMsgFrom=EAT812&argMsgFromId="+strApplyNo+"&SAMLart=" +strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 800, 600 );
			}
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit(xObjectName);
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
		    if (jf_CheckDataExist(jf_Trim(document.all.H_txOrgNo.value)))//檢查鍵值是否已存在
			{
		        alert("此單號已存在，請按開啟查看");
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
	//1080423	Kevin_C	1080047	增加字數檢核
	//1080514	Kevin_C	1080047	修正使用物件錯誤的問題
	//if (!isMaxLength(document.all.txApplyReason,'申請原因及移交檔號或公文文號','100'))
	//1140630   Andy    1140550 修正錯誤視窗顯示的限制字數與資料庫設定不一致的況狀
	//	if (!isMaxLength(document.all.txAppreason,'申請原因及移交檔號或公文文號','100'))
	if (!isMaxLength(document.all.txAppreason,'申請原因及移交檔號或公文文號','200'))
        return false;
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["H_txDeptID"].value == "" || document.all["txUserName"].value == "") {
		strErrMsg += "請選擇承辦人\n";
	    $('#btHelp1').focus();
	}
	else if (document.all["txUserName"].value != document.all["H_txActUserName"].value)
	{
		strErrMsg += "承辦人需為目前使用者\n";
	}
	if (document.all["H_txTranOuID"].value == "" || document.all["txTranUserID"].value == "") {
	    strErrMsg += "請選擇接管人";
	    $('#btHelp2').focus();
	}
	if (document.all["txAppreason"].value == "") {
		strErrMsg += "申請原因不可空白\n";
        $('#txAppreason').focus();
	}
	else if (document.all["txAppreason"].value.length > 200)
	{
		strErrMsg += "申請原因長度不可超過200字!\n";
		$('#txAppreason').focus();
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
	if(argCallerId == "EAI812")
	{
		document.all["txAppno"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txAppno"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	}
    if (argCallerId == "IFC021")
    {
        if (strClickBtn != "")
        {
            switch (strClickBtn)
            {
                case "btHelp1":
                    if (document.all.lbReturnValue.options[0].value == document.all["H_txActUserName"].value)
                    {
                        document.all.txDeptName.value = document.all.lbReturnValue.options[9].value;
                        document.all.H_txDeptID.value = document.all.lbReturnValue.options[8].value;
                        document.all.txUserName.value = document.all.lbReturnValue.options[0].value;
                        document.all.txEmpName.value = document.all.lbReturnValue.options[2].value;
                    }
                    else
                        alert("承辦人需為目前使用者");
                    break;
                case "btHelp2":
                    document.all.txTranOuName.value = document.all.lbReturnValue.options[9].value;
                    document.all.H_txTranOuID.value = document.all.lbReturnValue.options[8].value;
                    document.all.txTranUserID.value = document.all.lbReturnValue.options[0].value;
                    document.all.txTranUserName.value = document.all.lbReturnValue.options[2].value;
                    break;
            }
			//1070905 Justin [1070678]弱掃修正Client Cookies Inspection
            jf_SaveCookie("iic021OrgNo", "");
        }
    }

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查日期格式
function CheckDate(argObj, argObjName)
{
	if (argObj.value != "")
	{
		jf_PADCHAR(argObj, 7, '0');
		if (!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
			$('#' + argObj.id).focus();
			return false;
		}
	}
}
//1080423	Kevin_C	1080047	增加字數檢核 -S
var bHasCheck = false;
function isMaxLength(obj,argText,argMaxNum)
{
	if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
			bHasCheck = false;
			return false;
		}
    } else if (obj.value.length > nMaxNum)
    {
		event.returnValue = false;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
        obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
    }
	bHasCheck = false;
	return true;
}
//1080423	Kevin_C	1080047	增加字數檢核 -E