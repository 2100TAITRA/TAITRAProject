/*
 * DATE    SA       PRG     MGR_NO  DESC
 * 1050419 Kevin    Justin  1050087 二代公文修改
 * 1050627 Kevin    Justin  1050087 二代ShowModalDialog修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 * 1061103	--		Cloud	1050087	修正升級二代bug
 * 1070803	Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
 * 1070905	Kevin	Joe		1070678	修正弱掃Client Cookies Inspection
 * 1150206	Zen		Andy	序63    修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050419 Justin 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function dlOrgOnChange()
{	

	document.all["txOrgNo"].value=document.all["dlOrg"].value;
	document.all["txTarget"].value="";	
}

//if (document.all["ValidationSummary1"].innerText != "")
	//alert(document.all["ValidationSummary1"].innerText);


//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
		case "btSelect":
			Page_BlockSubmit=true;
			var arrSelectType = new Array(4);
			arrSelectType[0] = "Org";
			arrSelectType[1] = "Unit";
			arrSelectType[2] = "Role";
			arrSelectType[3] = "Account";
		    /*1050627 Justin 1050087 二代ShowModalDialog修改
			var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, document.all["dlOrg"].value);
			if (IsRationalValue(ret))
			{
				document.all["txOrgNo"].value	= ret.SourceOrgNo;
				document.all["txTarget"].value	= ret.Name;
				document.all["txPath"].value	= ret.Path;
			}*/
			jf_ShowOrgDialogByLevel("0", arrSelectType, document.all["dlOrg"].value);
			break;
	}
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
	    // jf_SaveCookie("iic021OrgNo", argOrgNo);
    /*1050627 Justin 1050087 二代ShowModalDialog修改
	var ret= fnOpen("IFC021.htm","288","470");*/
	// jf_ShowModal("IFC021.aspx" + GetAllParamStr(), "288", "470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType, "288", "470");
		jf_ShowModal("IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=" + sSelectType);
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
	//清除Cookie
	//if(argOrgNo)
	//	jf_SaveCookie("iic021OrgNo"	, "");
	//return ret;
    //1050627 Justin 1050087 二代ShowModalDialog修改--END--
}
/*1050627 Justin 1050087 二代ShowModalDialog修改
function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}*/
function jf_SaveCookie(argCookieName, argValue)
{
	document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
}


//1050419 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

    //1050419 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050419 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
    //1050627 Justin 1050087 二代公文修改，行為改成與window.open() 相似，都由CallBack()負責取得回傳值與執行後續行為
    if (argCallerId == "IFC021") {
        if (IsRationalValue(document.all["lbReturnValue"].options)) {
            document.all["txOrgNo"].value = jf_Trim(document.all.lbReturnValue.options[7].value);
			//1061103	--		Cloud	1050087	修正升級二代bug
			if(jf_Trim(document.all.lbReturnValue.options[2].value)!="")
				document.all["txTarget"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
			else if(jf_Trim(document.all.lbReturnValue.options[5].value)!="")
				document.all["txTarget"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
			else if(jf_Trim(document.all.lbReturnValue.options[9].value)!="")
				document.all["txTarget"].value = jf_Trim(document.all.lbReturnValue.options[9].value);
            document.all["txPath"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
            //修改showmodaldialog開啟視窗，清除Cookie
            jf_SaveCookie("iic021OrgNo", "");
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
    //1050627 Justin 1050087 二代公文修改--END--
}

function ClientOnLoad()
{
	
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050419 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function IsRationalValue(val)
{
	if (val == undefined)
		return false;
	if (val == null)
		return false;
	return true;
}

function CheckBeforeSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if (document.all["txTarget"].value == "")
	{
		strErrMsg += "請選擇查詢對象\n";
		bRtnbool = false;
	}
	if (document.all["dlOrg"].value == "")
	{
		strErrMsg += "請選擇機關\n";
		bRtnbool = false;
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}