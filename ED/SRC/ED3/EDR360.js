/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1070110   Justin   1050087     二代公文修改
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
//1070110 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    cbDetail_OnClick()
    //1070110 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070110 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
		case "btHelp":
			var strUrl = "";
			strUrl = "../../../WEDEP/WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+document.all.txOrgno.value;
			//1070110 Justin [1050087] 二代公文修改
			//jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
			jf_OpenChildWin(strUrl, "WEM010C1", 800, 600);
			Page_BlockSubmit=true;
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070110 Justin [1050087] 二代公文修改 
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
	
    //1070110 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(document.all.txPostDateS.value=="" && document.all.txPostDateE.value=="") 
			{
			    //1070110 Justin [1050087] 二代公文修改
			    //document.all.txPostDateS.focus();
			    $('#txPostDateS').focus();
				alert("郵寄日期起訖不可均為空白!!");
				Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = !CheckMailType();
		    //1070110 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
    if (argResult.id == iCallID_CheckOrgNo)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(argResult.value.Count > 0)
			{
				document.all.txOrgno.value = jf_Trim(argResult.value.OrgID[0]);
				document.all.txOrgName.value = jf_Trim(argResult.value.OrgName[0]);
			}
			else
				document.all.txOrgName.value = "";
			
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
	if(argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		//1070110 Justin [1050087] 二代公文修改
		//var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)
		{
			document.all["txOrgName"].value = jf_Trim(DeptArray[1]);
			document.all["txOrgno"].value = jf_Trim(DeptArray[2]);
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

var iCallID_CheckOrgNo = null;
function CheckOrgNo()
{
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno=="")	
	{
		document.all["txOrgno"].value = "";
		document.all["txOrgName"].value = "";
		return;
	}
	var wsParam = new Array();
	wsParam[0] = strOrgno;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	
	var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx","GetOrgInfo",false,wsParam);
	iCallID_CheckOrgNo = CallWsObj.id;
	OnWSResult(CallWsObj);
}

function CheckDateS()
{
	var strDateValue ;
	strDateValue = document.all.txPostDateS.value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDateS.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["遞送日期"])),"");
	    //1070110 Justin [1050087] 二代公文修改
	    //document.all.txPostDateS.focus();
		$('#txPostDateS').focus();
	}
}

function CheckDateE()
{
	var strDateValue ;
	strDateValue = document.all.txPostDateE.value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDateE.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["遞送日期"])),"");
		document.all.txPostDateE.focus();
	    //1070110 Justin [1050087] 二代公文修改
	    //document.all.txPostDateE.focus();
		$('#txPostDateE').focus();
	}
}

function CheckMailType()
{
	var bRtn = false;
	for (var iRow = 2; iRow <= document.all.dg1.rows.length; iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbPost"].checked)
		{
			bRtn = true;break;
		}
	}
	if (!bRtn)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆郵寄方式"])),"");
	}
	return bRtn;
}

function dlTime_onchange()
{
	var index = document.all["dlTime"].selectedIndex;
	var obj = document.all["dlTime"].options[index];

	if (obj.value == "") 
	{
		document.all["txSTime"].value = "";
		document.all["txETime"].value = "";
	}
	else
	{
		var argValue = obj.value.split(":");
		document.all["txSTime"].value = argValue[0];
		document.all["txETime"].value = argValue[1];
	}
}

function rbType_OnClick()
{
	if (document.all["rbTypeAll"].checked)
		rbTypeAllOnClick();
	else
		rbTypeSelectOnClick();
}

function rbTypeAllOnClick()
{
	if (document.all.dg1 == null)
		return;
	if (document.all.dg1.rows.length < 2)
		return;
	for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbPost"].checked = true;
		document.all["dg1__ctl"+iRow+"_cbPost"].disabled = "disabled";
	}
}

function rbTypeSelectOnClick()
{
	if (document.all.dg1 == null)
		return;
	if (document.all.dg1.rows.length < 2)
		return;
	for (var iRow=2;iRow<=document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbPost"].disabled = "";
	}
}

function cbDetail_OnClick()
{
	if(document.all.cbDetail.checked)
		document.all.cbUnit.disabled = false;
	else
	{
		document.all.cbUnit.disabled = true;
		if(document.all.cbUnit.checked)
			document.all.cbUnit.checked = false;
	}
}
