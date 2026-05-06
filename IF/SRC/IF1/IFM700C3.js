/*
Date		SA		PRG		MGR_NO	DESC	
1001123 		Ivory	1000539		新增公告對象設定程式
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050720		Kevin	Kevin_C	1050087	升二代
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
1070803		Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
1070905		Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
1150206		Zen		Andy	序63    修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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

//1050720	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		case "btSetTarget":
			Page_BlockSubmit = true;
			fnbtAddOrgItem();
			break;
		case "btAddTarget":
			if(document.all.hTargetPath.value == "")
			{
				Page_BlockSubmit = true;
				return;
			}
			document.all.hAddTarget.value = document.all.hTargetPath.value;
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			__doPostBack("btAddTarget", "");
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050720	Kevin_C	1050087	升二代
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
	
	//1050720	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//1050720	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050720	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050720	Kevin_C	1050087	升二代
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
    if (argResult.id == wsDuplicateID)
    {
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
	//1050720	Kevin_C	1050087	升二代 -S
	if(argCallerId == "IFC021")
	{
		if (document.all["lbReturnValue"].options) 
		{
			document.all["txOrgNo"].value = document.all.lbReturnValue.options[7].value;
			document.all.hTargetPath.value = document.all.lbReturnValue.options[3].value;
			if(document.all.lbReturnValue.options[1].value == "Role")
			{
				document.all["txIdType"].value = "2";
				document.all["txId1"].value = document.all.lbReturnValue.options[8].value;
				document.all["txId2"].value = document.all.lbReturnValue.options[4].value;
				document.all["txTarget"].value = document.all.lbReturnValue.options[9].value+" "+document.all.lbReturnValue.options[5].value;
			}
			else
			{
				document.all["txId2"].value = "";
				if(document.all.lbReturnValue.options[1].value == "Org" || document.all.lbReturnValue.options[1].value == "Unit" )
				{
					document.all["txIdType"].value = "1";
					document.all["txTarget"].value = document.all.lbReturnValue.options[9].value;
					document.all["txId1"].value = document.all.lbReturnValue.options[8].value;
				}
				else if(document.all.lbReturnValue.options[1].value == "Account")
				{
					document.all["txIdType"].value = "0";
					document.all["txTarget"].value = document.all.lbReturnValue.options[2].value;
					document.all["txId1"].value = document.all.lbReturnValue.options[0].value;
				}
				
			}
		}
	}
	//1050720	Kevin_C	1050087	升二代 -E
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnSetValues()
{
   var sFeatures="dialogHeight: 450 px;dialogWidth:450px";
   return sFeatures;
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050720	Kevin_C	1050087	升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function fnDelTarget(argDN, ind)
{
	//儲存DelTarget's DN以供Server端作刪除之用
	document.all.hDelTarget.value = argDN;
	//刪除該row
	document.all.dg1.deleteRow(ind + 1);
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	IsServerHandling = true;
	__doPostBack("", "");
}

//公告對象button click 事件   
//以下修正儲存邏輯(可與目前IFI700及AuthWS相符)
//將公告對象，設為"帳號、角色、單位、機關"均可設定
function fnbtAddOrgItem() 
{	
	//1050720	Kevin_C	1050087	升二代，移除沒用的程序 -S
	//if(document.all.txOrgNo)
	//{
	//	var OrgNo = document.all.txOrgNo.value;
	//	jf_ReadCookie("iic021OrgNo", OrgNo);
	//}
	//1050720	Kevin_C	1050087	升二代，移除沒用的程序 -E
	var arrSelectType = new Array(4);
	arrSelectType[0] = "Org";
	arrSelectType[1] = "Role";
	arrSelectType[2] = "Account";
	arrSelectType[3] = "Unit";
	//1050720	Kevin_C	1050087	升二代 -S
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	//if(ret)
	//{
	//	document.all["txOrgNo"].value = ret.SourceOrgNo;
	//	document.all.hTargetPath.value = ret.Path;
	//	if(ret.InfoType == "Role")
	//	{	
	//		document.all["txIdType"].value = "2";
	//		document.all["txId1"].value = ret.SuperiorUnitCode;
	//		document.all["txId2"].value = ret.Code;
	//		document.all["txTarget"].value = ret.FullName;
	//	}
	//	else
	//	{	
	//		document.all["txTarget"].value = ret.Name;
	//		document.all["txId1"].value = ret.Code;
	//		document.all["txId2"].value = "";
	//		if(ret.InfoType == "Org" || ret.InfoType == "Unit" )
	//			document.all["txIdType"].innerText = "1";
	//		else if(ret.InfoType == "Account")
	//			document.all["txIdType"].innerText = "0";
			
	//	}
	//}	
	jf_ShowOrgDialogByLevel("0", arrSelectType);
	//1050720	Kevin_C	1050087	升二代 -E
}
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
        // sSelectType += "'" + argSelectType[i] + "'";
        sSelectType += argSelectType[i];
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
	// jf_SaveCookie("iic021StrctureType"	, argParam);
	// jf_SaveCookie("iic021SelectType"	, sSelectType);

	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, argOrgNo);
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
	//1050720	Kevin_C	1050087	升二代，修子視窗 -S
	//var ret= fnOpen("IFC021.htm","288","470");
	////清除Cookie
	//if(argOrgNo)
	//	jf_SaveCookie("iic021OrgNo"	, "");
	//return ret;
	// else
		// jf_SaveCookie("iic021OrgNo"	, "");
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	// jf_ShowModal("IFC021.htm", 288, 470);
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType);
	//1050720	Kevin_C	1050087	升二代，修子視窗 -E
}
//1050720	Kevin_C	1050087	升二代，修子視窗，移除沒用的程序
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}