/*
DATE    SA		PG      MGR_NO   	DESC
1050601 Kevin   Zen     1050087     二代公文修改
1051019	Leslie	Joe		1050087		二代修改配合行動平台
1060518 Leslie  Zen     1060215     innerText相關修改
1070904 Kevin	Justin	1070678		弱掃修正CookieHttpOnly
1080816 Kevin	Joe		1080628		修正開啟子視窗前需進行編碼1150206	Zen		Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var SPLIT		= '|';
//1050601 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;



//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo     = xObjectName.substring(8,xObjectName.indexOf("_btHelp"));
	var pNoHelp = "dg1__ctl"+pNo+"_btHelp";
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case pNoHelp:
			fnOpen('IFC010.aspx' + GetAllParamStr(),'460','400');
			break;
	}	
}
//1050601 Zen 1050087 二代公文修改
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
	
    //1050601 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050601 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			var obj_addedStore = document.all.nDispatch;
			var obj_deledStore = document.all.nDel;
			var obj_addedUnit = document.all.ddUnit;
			var obj_deledUnit = document.all.ddDel;
			
			var obj_addedStore1 = document.all.nDNoUnit;			
			var obj_addedUnit1 = document.all.DNoUnit;
			
			
			obj_addedStore.value = "";
			for(var i=0 ; i<obj_addedUnit.length ; i++)
			{
				if(obj_addedUnit[i].value == "") continue;
				if(obj_addedStore.value != "") obj_addedStore.value += SPLIT;
				obj_addedStore.value += obj_addedUnit[i].value;
			}
			obj_deledStore.value = "";
			for(var i=0 ; i<obj_deledUnit.length ; i++)
			{
				if(i!=0) obj_deledStore.value += SPLIT;
				obj_deledStore.value += obj_deledUnit[i].value;
			}
			
			obj_addedStore1.value = "";
			for(var i=0 ; i<obj_addedUnit1.length ; i++)
			{
				if(obj_addedUnit1[i].value == "") continue;
				if(obj_addedStore1.value != "") obj_addedStore1.value += SPLIT;
				obj_addedStore1.value += obj_addedUnit1[i].value;
			}
			
			
			Page_BlockSubmit = !jf_ConfirmSave();
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050601 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//清除ddUnit的值
			var obj = document.all.ddUnit;
			var len = obj.length;
			for(var i=0 ; i<len ; i++)
				obj.remove(0);
			//清除ddDel的值
			obj = document.all.ddDel;
			len = obj.length;
			for(var i=0 ; i<len ; i++)
				obj.remove(0);
			//清除DNoUnit的值
			var obj = document.all.DNoUnit;
			var len = obj.length;
			for(var i=0 ; i<len ; i++)
				obj.remove(0);
			break;
	    case "btSearch":
	        //1050713 Zen 1050087 二代公文修改
	        //var ret = jf_ShowVirtualDirDialog(document.all.txVDNo.value);
	        jf_ShowVirtualDirDialog(document.all.txVDNo.value);
	        Page_BlockSubmit = true;

	        //1050713 Zen 1050087 二代公文修改--begin
			//if(ret != null)
			//{
			//	document.all.txVDNo.value = GetElement(ret, 0);
			//	Page_BlockSubmit = false;
			//}
			//else
			//{
			//	Page_BlockSubmit = true;
			//	return;
			//}
	        //jf_ToolBarSubmit();
	        //1050713 Zen 1050087 二代公文修改--end

			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			break;
	}
}
//IFM110C1 虛擬目錄共用視窗
function jf_ShowVirtualDirDialog(argParam, argOrgNo)
{
    //1050713 Zen 1050087 二代公文修改
    //var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
    //jf_SaveCookie("nSearch", argParam);
    //1050713 Zen 1050087 二代公文修改--begin
    //var ret = fnOpen("IFM110C1.htm" + param, "490", "420"); //回傳值：CN, displayName, Path
    //return ret;
    //jf_ShowModal("IFM110C1.htm" + GetAllParamStr(), "800", "600");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFM110C1.htm" + GetAllParamStr() + "&nSearch=" + argParam, "800", "600");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFM110C1.htm" + GetAllParamStr() + "&nSearch=" + encodeURIComponent(argParam), "800", "600");
	jf_ShowModal("IFM110C1.htm" + GetAllParamStr() + "&nSearch=" + encodeURIComponent(argParam));
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
    //1050713 Zen 1050087 二代公文修改--end

}
function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
	if(argParamStr == "")
		return "";
	if(typeof(argOrgNo) == "undefined" || argOrgNo == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasOrgNoParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
		{
			arrOnePara[1] = argOrgNo;
			bHasOrgNoParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasOrgNoParam == false)
		ret += "&nOrgNo=" + argOrgNo;
	return ret;
}
function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}
function jf_SaveCookie(argCookieName, argValue)
{
	document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
}
//1050713 Zen 1050087 二代公文修改
var currTxId;
var currTeIndex;

function CallBack(argCallerId)
{
    //1050713 Zen 1050087 二代公文修改--begin
    if (argCallerId == "IFM110C1")
    {
        $('#txVDNo').val(GetElement(jf_Trim($('#lbReturnValue')[0].options[0].value), 0));

        if (document.all["txVDNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_ToolBarSubmit('btSearch');
        }
        $('#txVDNo').focus();
    } 
    if (argCallerId == "IFC010")
    {
        var DNoUnitobj = document.all.DNoUnit;
        var oOption1 = document.createElement("OPTION");

        if (currTeIndex < DNoUnitobj.length)
            if (DNoUnitobj[currTeIndex].value != "")
                jf_DeleteItem(currTxId, currTeIndex);
        DNoUnitobj.add(oOption1);
        oOption1.value = GetElement(jf_Trim($('#lbReturnValue')[0].options[0].value), 0)
        oOption1.textContent = oOption1.value;
        document.all[currTxId].value = GetElement(jf_Trim($('#lbReturnValue')[0].options[0].value), 0)
        $('#txVDNo').focus();
    }
    //1050713 Zen 1050087 二代公文修改--end
}

function ShowMsg() {
    //1050627 Zen 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}
function ClientOnLoad()
{
	//ShowMsg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckBeforSave())//檢查key值是否輸入
	{		
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist(""))//檢查鍵值是否已存在
				{
					if (window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (jf_Trim(document.all["txVDNo"].value) == "")
	{
	    strErrMsg += "虛擬目錄名稱不可空白\n";
	    //1050601 Zen 1050087 二代公文修改
	    //document.all["txVDNo"].focus();
	    $('#txVDNo').focus();
	}	
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function jf_DeleteItem(argTextBoxId, argIdx)
{
	Page_BlockSubmit = true;
	//var obj = document.all.ddUnit;
	var obj1= document.all.DNoUnit;

	if( argIdx >= obj1.length ) return;

	//obj[argIdx].text  = "";
	//obj[argIdx].value = "";
	obj1[argIdx].text  = "";
	obj1[argIdx].value = "";
	document.all[argTextBoxId].value = "";
}

function jf_SetItem(argTextBoxId,argIdx)
{
	Page_BlockSubmit = true;

	//var ddUnitobj = document.all.ddUnit;
    //1050713 Zen 1050087 移至callback內執行
	//var DNoUnitobj = document.all.DNoUnit;

    //1050713 Zen 1050087 二代公文修改
    //var ret = jf_ShowServerDialog("");//回傳格式=名稱,說明,PATH

    //1050713 Zen 1050087 紀錄ID和index
	currTxId = argTextBoxId;
	currTeIndex = argIdx;

	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC010.htm" + GetAllParamStr(), "800", "600");
	jf_ShowModal("IFC010.htm" + GetAllParamStr());

    //1050713 Zen 1050087 移至callback內執行
	//if (ret != null)
    //{
	//若是對已有值的伺服器TextBox作重新設定，則必須先刪除該伺服器再行新增
	//if( argIdx < DNoUnitobj.length )
	//	if(DNoUnitobj[argIdx].value != "")
	//		jf_DeleteItem(argTextBoxId, argIdx);
	//新增option到ddUnit中，並顯示伺服器名稱於伺服器TextBox中
	/*var oOption = document.createElement("OPTION");		
	ddUnitobj.add(oOption);		
	oOption.value     = GetElement(ret,2);
	oOption.innerText = oOption.value;*/
	//var oOption1 = document.createElement("OPTION");
	//DNoUnitobj.add(oOption1);
	//oOption1.value     = GetElement(ret,0);
	//oOption1.innerText = oOption1.value;
	//document.all[argTextBoxId].value = GetElement(ret, 1);
    //}

}
//1050713 Zen 1050087 二代公文修改
/*
function jf_ShowServerDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IFC010.htm" + GetAllParamStr(),"460","400"); //回傳值：CN, displayName, Path
	return ret;
}
*/
function GetElement(argStr,argIdx)
{	
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}
