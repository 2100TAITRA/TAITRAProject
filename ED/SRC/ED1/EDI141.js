/*
DATE	SA		PRG		MGR_NO			DESC
1040119	David	Kevin_C	1030919			新增程式
1050722 David   Zen     1050087         二代公文修改
1050816 Kevin   Zen     1050700         XSS修正
1051019 Leslie  Kenny   1050087         二代公文修改
1070830 Kevin   Justin  1070678         弱掃AJAX修改
1070904	Kevin	Justin	1070678			弱掃修正CookieHttpOnly
1080816 Kevin	Joe		1080628			修正開啟子視窗前需進行編碼
1110926	David   Joe		1110669			新增紙本簽核維護
1130613	Zen		Zen		序127			修正具PRIV_EDT141權利之帳號開啟後錯誤之問題
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

//1050722 Zen 1050087  二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
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
	if (document.all["txUserId"].value != "")
	{
		txUserId_OnBlur();
		//1130613 Zen 序127 修正具PRIV_EDT141權利之帳號開啟後錯誤之問題
		fnGetdlUnit('Init');
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
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
	    case "btUser"://負責人
	        if (document.all["H_PrivInfo"].value == "Y") {
	            fnQueryUser('txUserId', 'txUserName');
	            
	        }
	        Page_BlockSubmit = true;
			break;
		case "btNew":
			Page_BlockSubmit=true;
			if(document.all["txUserId"].value!="")
				txUserId_OnBlur();
			var strOrgNo = jf_Trim(document.all["H_OrgNo"].value);
			var strUserID = jf_Trim(document.all["txUserId"].value);
			if(document.getElementById("dlUnit").selectedIndex!=-1)
				document.all["H_DlValue"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].value;
			if(jf_CheckBeforSave())
			{
				var strArray = document.all["H_DlValue"].value.split(";");
				//1110926	Joe		1110669		新增紙本簽核維護--S
				if (document.all.rbSignTypeP.checked)
					strUrl = "EDT1411.aspx?Mode=0&OrgNo=" + strOrgNo + "&OuID=" + strArray[1] + "&RoleID=" + strArray[3] + "&USERNAME=" + strUserID;
				else
				    //1110926	Joe		1110669		新增紙本簽核維護--E
				    strUrl = "EDT141.aspx?Mode=0&OrgNo=" + strOrgNo + "&OuID=" + strArray[1] + "&RoleID=" + strArray[3] + "&USERNAME=" + strUserID;
				jf_OpenChildWin(strUrl, "EDT141", 770, 500 );
			}
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050722 Zen 1050087  二代公文修改
//function jf_ToolBarHandle()
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
	
    //1050722 Zen 1050087  二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit=true;
			if (document.all["txUserId"].value != "")
			    if (!txUserId_OnBlur())
			        return;
			if(document.getElementById("dlUnit").selectedIndex!=-1)
				document.all["H_DlValue"].value = document.all["dlUnit"].options[document.all["dlUnit"].selectedIndex].value;
			if(jf_CheckBeforSave())
				Page_BlockSubmit=false;
		    //1050722 Zen 1050087  二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
//搜尋及開啟子視窗前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	var strUserId = jf_Trim(document.all["txUserId"].value);
	if (strUserId == "")
	{
		strErrMsg += "帳號不可空白\n";
	    //1050722 Zen 1050087  二代公文修改
		//document.all["txUserId"].focus();
		$('#txUserId').focus();
	}
	if (document.all["H_DlValue"].value == "")
	{
		strErrMsg += "單位不可空白\n";
	    //1050722 Zen 1050087  二代公文修改
		document.all["txUserId"].focus();
		$('#txUserId').focus();
    }
	
	strErrMsg=strErrMsg.substring(0,strErrMsg.length-1);
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值

//1050722 Zen 1050087  二代公文修改
var currUserFld;
var currUserNameFld;

function CallBack(argCallerId)
{
	//1110926	Joe		1110669		新增紙本預排流程設定
	//if (argCallerId == "EDT141")
	if (argCallerId == "EDT141" || argCallerId == "EDT1411")
	{
		var strMode = jf_Trim(document.all.lbReturnValue.options[0].value);
		//若回傳直為1，重新進行搜尋
		if(strMode == "1")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btSearch";
	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",0);
			}
		}
	    //1050722 Zen 1050087  二代公文修改
		//document.all["txUserId"].focus();
		$('#txUserId').focus();
    }
    //1050722 Zen 1050087  二代公文修改--begin
	if (argCallerId == "IFC020")
	{
	    $('#' + currUserFld).val(GetElement(jf_Trim($('#lbReturnValue')[0].options[0].value), 0));

	    if (document.all[currUserFld].value != "")
	        txUserId_OnBlur();
	}
    //1050722 Zen 1050087  二代公文修改--end
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//開啟人員帳號子視窗
function fnQueryUser(strUserFld, strUserNameFld)
{
	Page_BlockSubmit = true;
	
	var rtn = new RtnVal();

    //1050722 Zen 1050087  二代公文修改
	//var ret = jf_ShowPersonDialog("");
	jf_ShowPersonDialog("");

    //1050722 Zen 1050087  二代公文修改
	//if (ret)
	//{
	//	document.all[strUserFld].value = GetElement(ret, 0);		
	//	fnGetEmpName(strUserFld,strUserNameFld);
	//	txUserId_OnBlur();		
    //}

    //1050722 Zen 1050087  二代公文修改
	currUserFld = strUserFld;
	currUserNameFld = strUserNameFld;
}
//txUserId_OnBlur觸發
var strLastUserID="";
var bHasCheck = false;
function txUserId_OnBlur()
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	if(strLastUserID!=document.all["txUserId"].value)
	{
		if(fnGetEmpName('txUserId','txUserName'));
			strLastUserID=document.all["txUserId"].value;
		
		if(document.all["txUserId"].value!="")
		{
			if(document.all["H_PrivInfo"].value =="Y")
			{
				if(document.getElementById("dlUnit").disabled==false)
				{
					//1110926	Joe		1110669		選單統一另寫函式取得，供使用者切換簽核類別使用
					fnGetdlUnit('Init');
					/*
				    //1070830 Justin [1070678]弱掃AJAX修改
				    //var UserInfo = EDI141.GetUnit(document.all["txUserId"].value, document.all["SsoArtifact"].value);
				    var UserInfo = ED1.EDI141.GetUnit(document.all["txUserId"].value, document.all["SsoArtifact"].value);
					if(UserInfo.value.strErrMsg == "")
					{
						while(document.all["dlUnit"].options.length>0) 
						{ 
							document.all["dlUnit"].options.remove(0); 
						}
						var option;
						var bIsSelected = false;
						for(var i = 0;i<UserInfo.value.PlayRolesCount;i++)
						{
							option = document.createElement("option");
							option.text = UserInfo.value.strDName[i]+"["+UserInfo.value.SuperiorUnitName[i]+"]--"+UserInfo.value.PlayRolesName[i];
							option.value = UserInfo.value.SuperiorUnitNameValue[i]+";"+UserInfo.value.SuperiorUnitCode[i]+";"+UserInfo.value.PlayRolesNameValue[i]+";"+UserInfo.value.RoleNo[i];
							document.all["dlUnit"].options.add(option);
							if(!bIsSelected)
							{
								if(UserInfo.value.RoleNo[i]=="OD99")
								{
									document.all["dlUnit"].value = option.value;
									bIsSelected=true;
								}
							}
						}
					}
					else
						jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([UserInfo.value.strErrMsg]) ), "" );
						*/
				}
	  
			}
		}
		else
		{
		    bHasCheck = false;
		    return false;
		}
	}
	bHasCheck = false;
	return true;
}
//帶出姓名
function fnGetEmpName(strUserID,strUserNameFld)
{
	if(document.all[strUserID].value=="")
	{
		document.all[strUserNameFld].value = "";
		return rtn;
	}
	if (document.all[strUserID].readOnly)
		return rtn;	
		
	var rtn = new RtnVal();

    //1050816 Zen 1050700 XSS修正
	//var strUserId = document.all[strUserID].value;
	var strUserId = encodeURI(document.all[strUserID].value);
	
	rtn = fnGetUserInfo(strUserId);

	if(rtn.bSuccess == true)
	{
		document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
		return true;
	}
	else
	{
		alert(rtn.strErrMsg)
		document.all[strUserNameFld].value = "";
		document.all[strUserID].value = "";
		return false;
	}
}
//取得帳號之姓名，及其所扮演承辦人的角色資訊
function fnGetUserInfo(strUserId)
{
	var rtn = new RtnVal();
	rtn.bSuccess = true;
	rtn.strErrMsg = "";
	rtn.rtnVal = new Array(2);
		
	var arWSParam = new Array(2);

    //1050816 Zen 1050700 XSS修正
	//arWSParam[0] = document.all["H_OrgNo"].value;
	arWSParam[0] = encodeURI(document.all["H_OrgNo"].value);

	arWSParam[1] = strUserId;
	var callObj = jf_CallWA("../EDLIB/EDWS.asmx", "GetAccountInfo", false, arWSParam);
	if (!callObj.error && callObj.value.m_bSuccess)
	{
		var objWsRtn = callObj.value;
		var DeptCount = objWsRtn.Count;
		var DeptNoList = new Array();
		var DeptNameList = new Array();
		
		rtn.strMsg = objWsRtn.EmpName;//將姓名儲存起來
		
		//取得有承辦人角色的單位
		for(idx = 0 ; idx < DeptCount ; idx++)
		{
			DeptNoList.push(objWsRtn.DeptNo[idx]);
			DeptNameList.push(objWsRtn.DeptName[idx]);
		}
		rtn.rtnVal[0] = DeptNoList;
		rtn.rtnVal[1] = DeptNameList;
		
	}
	else
	{
		if(callObj.error)
			rtn.strErrMsg = callObj.errorDetail.string;
		else
			rtn.strErrMsg = callObj.value.m_strErrMsg;
	}

	if(rtn.strErrMsg != "")
	{
		rtn.bSuccess = false;
		return rtn;
	}
	
	return rtn;	
}
function jf_ShowPersonDialog(argParam)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	var artifact = document.all.SsoArtifact.value;

    //1050722 Zen 1050087  二代公文修改--begin
	//var ret = jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact, "480", "370"); //回傳值：CN, displayName, Path	
	//return ret;
	//jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact, "800", "600"); //回傳值：CN, displayName, Path
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact + "&nSearch=" + argParam, "800", "600");
	jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact + "&nSearch=" + encodeURIComponent(argParam), "800", "600");
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
    //1050722 Zen 1050087  二代公文修改--end
}
function GetElement(argStr,argIdx)
{
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}
//各function回傳資料用的
function RtnVal()
{
	this.bSuccess	= false;
	this.strErrMsg	= "";
	this.strMsg		= "";
	this.rtnVal		= new Object;
}
//組出子視窗URL
function ReturnValue(argSeq, argOuID, argRoleID, argUserName)
{
	try
	{
	    var strOrgNo = jf_Trim(document.all["H_OrgNo"].value);
	    //1110926	Joe		1110669		新增紙本簽核維護--S
	    if (document.all.rbSignTypeP.checked)
	        strUrl = "EDT1411.aspx?Mode=1&OrgNo=" + strOrgNo + "&OuID=" + argOuID + "&RoleID=" + argRoleID + "&USERNAME=" + argUserName + "&FLOWSET_SEQ=" + argSeq;
	    else
	        //1110926	Joe		1110669		新增紙本簽核維護--E
		    strUrl = "EDT141.aspx?Mode=1&OrgNo="+strOrgNo+"&OuID="+argOuID+"&RoleID="+argRoleID+"&USERNAME="+argUserName+"&FLOWSET_SEQ="+argSeq;
		jf_OpenChildWin(strUrl, "EDT141", 800, 600 );
	}
	catch (e) {}
}

//1110926	Joe		1110669		當簽核類型切換時，調整對應單位顯示--S
function fnGetdlUnit(argType)
{
	var UserInfo = ED1.EDI141.GetUnit(document.all["txUserId"].value, document.all["SsoArtifact"].value);
	if (UserInfo.value.strErrMsg == "") {
		while (document.all["dlUnit"].options.length > 0) {
			document.all["dlUnit"].options.remove(0);
		}
		var option;
		var bIsSelected = false;
		var DeptList = new Array();
		for (var i = 0; i < UserInfo.value.PlayRolesCount; i++) {
			option = document.createElement("option");
			//紙本簽核只顯示到單位
			if (document.all.rbSignTypeP.checked)
			{
				option.text = UserInfo.value.strDName[i] + "[" + UserInfo.value.SuperiorUnitName[i] + "]";
				option.value = UserInfo.value.SuperiorUnitNameValue[i] + ";" + UserInfo.value.SuperiorUnitCode[i] + ";;";
			}
			else
			{
				option.text = UserInfo.value.strDName[i] + "[" + UserInfo.value.SuperiorUnitName[i] + "]--" + UserInfo.value.PlayRolesName[i];
				option.value = UserInfo.value.SuperiorUnitNameValue[i] + ";" + UserInfo.value.SuperiorUnitCode[i] + ";" + UserInfo.value.PlayRolesNameValue[i] + ";" + UserInfo.value.RoleNo[i];
			}
            //避免同單位多角色時重複顯示
			if (DeptList.includes(option.value))
			    continue;
			else
			    DeptList.push(option.value);

			document.all["dlUnit"].options.add(option);
			if (!bIsSelected) {
				if (UserInfo.value.RoleNo[i] == "OD99") {
					document.all["dlUnit"].value = option.value;
					bIsSelected = true;
				}
			}
		}
		//1111007	Joe		紀錄選單選取
		if(document.all["H_DlValue"].value != "" && argType != "Change")
			document.all["dlUnit"].value = document.all["H_DlValue"].value;
	}
	else
	{
		document.all["H_DlValue"].value = "";
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([UserInfo.value.strErrMsg])), "");	
	}
}
//1110926	Joe		1110669		當簽核類型切換時，調整對應單位顯示--E
//1111007	Joe		紀錄選單選取
function dlUnitOnChange(){
	if(document.getElementById("dlUnit").selectedIndex!=-1)
		document.all["H_DlValue"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].value;
}