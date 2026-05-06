/*
DATE	SA		PRG		MGR_NO			DESC
1110926	David	Joe 	1110669			新增程式
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
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

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
	if(document.all["txUserId"]!="")
		document.all["txUserId"].onblur();

	if(document.all["H_Close"].value=="Y")
		ReturnValue('1');
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
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
		case "btOpen":
			document.all["H_DlValue"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].value;
			document.all["H_DlText"].value = document.all["dlUnit"][document.all["dlUnit"].selectedIndex].textContent;
			Page_BlockSubmit = !jf_CheckKeyObject();			
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
				Page_BlockSubmit=true;
				
				var arID = document.all["H_DlValue"].value.split(";");
				if(jf_CheckBeforSave())
				{
				    var cRtn = ED1.EDT1411.IsDefFlowSet(document.all["H_OrgNo"].value, arID[1], document.all["txUserId"].value, document.all["H_FlowSet_SEQ"].value).value;
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
				jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			if(!Page_BlockSubmit)
				ReturnValue('0');
			break;
	}
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	var strFlowSetName = jf_Trim(document.all["txFlowSetName"].value);
	if (strFlowSetName == "")
	{
	    strErrMsg += "預排流程名稱不可空白\n";
	    $('#txFlowSetName').focus();
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

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
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
		
	var rtn = new RtnVal();
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
function ReturnValue(argValue)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argValue;
	    opener.window.CallBack("EDT1411");
	    close();
	}
	catch (e) {}
}