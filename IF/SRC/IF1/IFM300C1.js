/*
DATE        SA      PRG     MGR_NO      DESC
1050720     Kevin   Kenny   1050087     二代公文系統相關修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
1070803		Kevin	Joe		1070678		修正弱掃Client Cookies Inspection
1070905		Kevin	Joe		1070678		修正弱掃Client Cookies Inspection
1150206		Zen		Andy	序63		修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

//1050720	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1050720	Kenny   [1050087]	二代公文系統相關修改
var strTextBoxId;
var nIdx;

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
	Page_BlockSubmit=true;
	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050720	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050720	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSave":
			var str="";
			for(j=0;j<document.all.lbPlayRole.options.length;j++)
			{
				if( jf_Trim(document.all.lbPlayRole.options[j].text)!='')
					str+=document.all.lbPlayRole.options[j].text+"|";
			}
			document.all.nPlayRole.value=str;
			//1050720	Kenny   [1050087]	二代公文系統相關修改
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
    
    //1050720	Kenny   [1050087]	二代公文系統相關修改--Start--
    if (argCallerId == "IFC021") 
    {
        var strRetPath = jf_Trim(document.all.lbReturnValue.options[3].value);
        var strRetSourceOrgName = jf_Trim(document.all.lbReturnValue.options[6].value);
        var strFullName = document.all.lbReturnValue.options[9].value + " " + document.all.lbReturnValue.options[5].value;
        var duplicate = RoleContains(strRetPath);
		if(duplicate < 0)
		{
			document.all.lbPlayRole.options[nIdx].text	= strRetPath;
			document.all[strTextBoxId].value		= strRetSourceOrgName +" "+ strFullName;
		}
		else
			alert("選取之角色，與第"+(duplicate+1)+"筆重覆。");
    }
    //1050720	Kenny   [1050087]	二代公文系統相關修改--End--
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function jf_DeleteItem(argTextBoxId,argIdx)
{
	document.all.lbPlayRole.options[argIdx].text='';
	document.all[argTextBoxId].value='';
}

function jf_SetItem(argTextBoxId,argIdx)
{
	var orgno = jf_ReadCookie("nOrgNo");
    
    //1050720	Kenny   [1050087]	二代公文系統相關修改--Start--
    strTextBoxId = argTextBoxId;
    nIdx = argIdx;
    //1050720	Kenny   [1050087]	二代公文系統相關修改--End--
	
	//var ret = jf_ShowOrgDialog(SHOW_ROLE);
	var arrSelect = new Array(1);
	arrSelect[0] = "Role";
    //1050720	Kenny   [1050087]	二代公文系統相關修改--Start--
	//var ret = jf_ShowOrgDialogByLevel(0, arrSelect, orgno);//Code, Name, Path, Description
	//if(ret!=null)
	//{
	//	//回傳格式:見II_LIB.js
	//	var duplicate = RoleContains(ret.Path);
	//	if(duplicate < 0)
	//	{
	//		document.all.lbPlayRole.options[argIdx].text	= ret.Path;
	//		document.all[argTextBoxId].value		= ret.SourceOrgName +" "+ ret.FullName;
	//	}
	//	else
	//		alert("選取之角色，與第"+(duplicate+1)+"筆重覆。");
	//}
    jf_ShowOrgDialogByLevel(0, arrSelect, orgno);//Code, Name, Path, Description	
    //1050720	Kenny   [1050087]	二代公文系統相關修改--End--
}

function RoleContains(argKey)
{
	var dlRole = document.all.lbPlayRole;
	for(j=0;j<dlRole.options.length;j++)
	{
		if( jf_Trim(dlRole.options[j].text)!='' && dlRole.options[j].text == argKey )
			return j;
	}
	return -1;
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
    //1050720	Kenny   [1050087]	二代公文系統相關修改；改使用jf_ShowModal開啟子視窗
	//var ret= fnOpen("IFC021.htm","288","470");
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
    // jf_ShowModal("IFC021.htm", "288", "470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
		// jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType, "288", "470");
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "288", "470");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType);
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
	//清除Cookie
	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, "");
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
    //1050720	Kenny   [1050087]	二代公文系統相關修改
	//return ret;
}

//1050720	Kenny   [1050087]	二代公文系統相關修改--Start--
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}
//1050720	Kenny   [1050087]	二代公文系統相關修改--End--