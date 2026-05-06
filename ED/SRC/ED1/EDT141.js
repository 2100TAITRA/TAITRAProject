/*
DATE	SA		PRG		MGR_NO			DESC
1021023 David   Eric    1020672         修正儲存時無法存入OU_ID、OU_NAME、ROLE_ID、ROLE_NAME
1040119	David	Kevin_C	1030919			個人化預排流程支援多組設定
1050722 David   Zen     1050087         二代公文修改
1050817 Kevin   Zen     1050700         弱掃XSS修正
1051019 Leslie  Kenny   1050087         二代公文修改
1060518 Leslie  Zen     1060215         innerText相關修改
1070830 Kevin   Justin  1070678         弱掃AJAX修改
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050722 Zen 1050087  二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1040119	Kevin_C	1030919	開啟時先進行一次ONBLUR帶出畫面值
	if(document.all["txUserId"]!="")
		document.all["txUserId"].onblur();
	//1040119	Kevin_C	1030919	以子視窗方式回傳值
	if(document.all["H_Close"].value=="Y")
		ReturnValue('1');
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
		case "btUser"://負責人
			fnQueryUser('txUserId','txUserName');
			Page_BlockSubmit = true;
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
		case "btOpen":
			//1040119	Kevin_C	1030919	不需要
			//fnGetEmpName('txUserId','txUserName');
			//1021023 Eric	1020672 開啟時取得選單內的值
			//1040119	Kevin_C	1030919 下拉選單改為TEXT
			//if(document.all["dlUnit"].options.length==0) 
			//{ 
			//	txUserId_OnBlur();
			//}
			document.all["H_DlValue"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].value;
		    //1060518 Zen 1060215 innerText相關修正
			//document.all["H_DlText"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].innerText;
			document.all["H_DlText"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].textContent;
			Page_BlockSubmit = !jf_CheckKeyObject();			
		    //1050722 Zen 1050087  二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			//if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			//{
				//1040119	Kevin_C	1030919	修改儲存的程式邏輯
				Page_BlockSubmit=true;
				
				var arID = document.all["H_DlValue"].value.split(";");
				if(jf_CheckBeforSave())
				{
				    //1070830 Justin [1070678]弱掃AJAX修改
				    //var cRtn = EDT141.IsDefFlowSet(document.all["H_OrgNo"].value, arID[1], arID[3], document.all["txUserId"].value, document.all["H_FlowSet_SEQ"].value).value;
				    var cRtn = ED1.EDT141.IsDefFlowSet(document.all["H_OrgNo"].value, arID[1], arID[3], document.all["txUserId"].value, document.all["H_FlowSet_SEQ"].value).value;
				    if(cRtn.strErrMsg!="")
						jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([cRtn.strErrMsg]) ), "" );
					else if (cRtn.bIsSet)
					{
						if(document.all["cbDefFlow"].checked)
						{
							if(window.confirm("目前單位角色之個人化預排流程已有其他組設定為預設流程，請問是否繼續儲存?"))
							{
								IsServerHandling = true;
								jf_ShowWaitState();	
								Page_BlockSubmit = false;
							}
						}
						else
							Page_BlockSubmit = false;
					}
					else
					{
						document.all["cbDefFlow"].checked = true;
						IsServerHandling = true;
						jf_ShowWaitState();	
						Page_BlockSubmit = false;
					}
				}
				
				
				//Page_BlockSubmit = false;
			//}
			//else
			//	Page_BlockSubmit = true;
		    //1050722 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050722 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1040119	Kevin_C	1030919	取消時以子視窗方式傳回值，值為0
			if(!Page_BlockSubmit)
				ReturnValue('0');
			//jf_ToolBarSubmit();
			break;
		//1040119	Kevin_C	1030919 不需要 -S
		/*case "btClean":
			Page_BlockSubmit = true;
			//1021023 Eric	1020672 管理者帳號才執行
			if(document.all["H_PrivInfo"].value =="Y")
		    {
				var H_PrivInfo = jf_Trim(document.all["H_PrivInfo"].value);
				var H_RoleNo = jf_Trim(document.all["H_RoleNo"].value);
				var H_RoleName = jf_Trim(document.all["H_RoleName"].value);
				var H_OuId = jf_Trim(document.all["H_OuId"].value);
				var H_OuName = jf_Trim(document.all["H_OuName"].value);
				var H_DefaultFlow = jf_Trim(document.all["H_DefaultFlow"].value);
				jf_ConfirmClean(true);
				document.all["H_PrivInfo"].value = H_PrivInfo;
				document.all["H_RoleNo"].value = H_RoleNo;
				document.all["H_RoleName"].value = H_RoleName;
				document.all["H_OuId"].value = H_OuId;
				document.all["H_OuName"].value = H_OuName;
				document.all["H_DefaultFlow"].value = H_DefaultFlow;
			}
			//1021023 Eric	1020672 清空dropdownlist
	        while(document.all["dlUnit"].options.length>0) 
            { 
				document.all["dlUnit"].options.remove(0); 
			}
			document.all["txUserId"].focus();
			break;
		case "btSearch":
			
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txUserId"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			jf_SelectBarSubmit();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
		*/
		//1040119	Kevin_C	1030919 不需要 -E
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1040119	Kevin_C	1030919 不需要 -S
/*function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
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

*/
//1040119	Kevin_C	1030919 不需要 -E
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	//1040119	Kevin_C	1030919 不需要
	/*if (document.all["txUserId"].value == "")
	{
		strErrMsg += "帳號不可空白\n";
		document.all["txUserId"].focus();
	}*/
	/*
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}*/

	//1040119	Kevin_C	1030919 檢核預排流程名稱
	var strFlowSetName = jf_Trim(document.all["txFlowSetName"].value);
	if (strFlowSetName == "")
	{
	    strErrMsg += "預排流程名稱不可空白\n";
	    //1050722 Zen 1050087  二代公文修改
	    //document.all["txFlowSetName"].focus();
	    $('#txFlowSetName').focus();
	}
	strErrMsg=strErrMsg.substring(0,strErrMsg.length-1);
	//1040119	Kevin_C	1030919 不需要
	//if(!jf_CheckBlankAndAlert())
	//	bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
//1040119	Kevin_C	1030919	Kevin_C	1030919 不需要
//檢查DataGrid資料列是否填完整
/*function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}
	return true;
}*/

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
			//document.all["txUserId"].value = jf_Trim(argResult.value.RtnStr);
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
		document.all["txUserId"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txUserId"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txUserId"].focus();
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
//1021023 Eric	1020672 txUserId_OnBlur觸發
//1040119	Kevin_C	1030919 不需要
/*function txUserId_OnBlur()
{
	if(document.all["txUserId"].value!="")
	{
		if(document.all["H_PrivInfo"].value =="Y")
		{
			if(document.getElementById("dlUnit").disabled==false)
			{
				var UserInfo = EDT141.GetUnit(document.all["txUserId"].value,document.all["SsoArtifact"].value);
				if(UserInfo.value != null)
				{
					while(document.all["dlUnit"].options.length>0) 
					{ 
						document.all["dlUnit"].options.remove(0); 
					}
					var option;
					for(var i = 0;i<UserInfo.value.PlayRolesCount;i++)
					{
					option = document.createElement("option");
					option.text = UserInfo.value.strDName[i]+"["+UserInfo.value.SuperiorUnitName[i]+"]"+"["+UserInfo.value.PlayRolesName[i]+"]";
					option.value = UserInfo.value.SuperiorUnitNameValue[i]+";"+UserInfo.value.SuperiorUnitCode[i]+";"+UserInfo.value.PlayRolesNameValue[i]+";"+UserInfo.value.RoleNo[i];
					document.all["dlUnit"].options.add(option);
					}
				}
			}
  
        }
	}
}*/
//開啟人員帳號子視窗
function fnQueryUser(strUserFld, strUserNameFld)
{
	Page_BlockSubmit = true;
	
	var rtn = new RtnVal();
	var ret = jf_ShowPersonDialog("");
	if(ret)
	{
		document.all[strUserFld].value = GetElement(ret, 0);		
		fnGetEmpName(strUserFld,strUserNameFld);		
	}
}

//各function回傳資料用的
function RtnVal()
{
	this.bSuccess	= false;
	this.strErrMsg	= "";
	this.strMsg		= "";
	this.rtnVal		= new Object;
}
function GetElement(argStr,argIdx)
{
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}
//帶出姓名
function fnGetEmpName(strUserFld,strUserNameFld)
{
	if(document.all[strUserFld].value=="")
	{
		document.all[strUserNameFld].value = "";
		return rtn;
	}
	//1040119	Kevin_C	1030919 readOnly欄位也要帶出姓名
	//if (document.all[strUserFld].readOnly)
	//	return rtn;	
		
	var rtn = new RtnVal();
    //1050817 Zen 1050700 弱掃XSS修正
	//var strUserId = document.all[strUserFld].value;
	var strUserId = encodeURI(document.all[strUserFld].value);
	
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
		document.all[strUserFld].value = "";
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

    //1050817 Zen 1050700 弱掃XSS修正
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
			//if(objWsRtn.RoleNo[idx] == "OD99")
			{
				DeptNoList.push(objWsRtn.DeptNo[idx])
				DeptNameList.push(objWsRtn.DeptName[idx])
			}
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
	jf_SaveCookie("nSearch",argParam);
	var artifact = document.all.SsoArtifact.value;
	//var strUrl = "http://" + document.all["SSOServer"].value;
	//var ret= jf_ShowModal(strUrl+"/II/IIC020.htm?SAMLart=" + artifact,"480","370"); //回傳值：CN, displayName, Path
	var ret= jf_ShowModal("../../../II/IIC020.htm?SAMLart=" + artifact,"480","370"); //回傳值：CN, displayName, Path	
	return ret;
}
//1040119	Kevin_C	1030919 組出回傳值
function ReturnValue(argValue)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argValue;
	    opener.window.CallBack("EDT141");
	    close();
	}
	catch (e) {}
}