/*
DATE	SA		PRG		MGR_NO		DESC
0981203	--		Albert	0980336		不再自網址參數取得Artifact
1050815 Kevin   Zen     1050700     XSS修正
1051122	Cloud   Kenny	1050087	    二代公文系統相關修改1100204 Leslie  Zen     1090927     取消使用document.activeElement
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

//1051122	Kenny   [1050087]	二代公文系統相關修改
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
//1051122	Kenny   [1050087]	二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051122	Kenny   [1050087]	二代公文系統相關修改
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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051122	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1051122	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckDate();
			//1051122	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1051122	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1051122	Kenny   [1050087]	二代公文系統相關修改
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
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argRead1, argRead2, argRead3, argRead4, argRead5, argRead6, argRead7)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 4;
	    opener.document.all.lbReturnValue.options[0].text  = argRead1;
	    opener.document.all.lbReturnValue.options[0].value = argRead2;
	    opener.document.all.lbReturnValue.options[1].text  = argRead3;
	    opener.document.all.lbReturnValue.options[1].value = argRead4;
	    opener.document.all.lbReturnValue.options[2].text  = argRead5;
	    opener.document.all.lbReturnValue.options[2].value = argRead6;
	    opener.document.all.lbReturnValue.options[3].text  = argRead7;
	    opener.window.CallBack("EAT802");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckDate()
{
	var bRtnbool = true;
	var strErrMsg= "";
	if(document.all["dateBegin"].value != "" && !jf_CheckCDATE(document.all["dateBegin"].value))
	{
		strErrMsg += "申請啟始日期格式不正確\n";
        //1051122	Kenny   [1050087]	二代公文系統相關修改
        //document.all["dateBegin"].focus();
        $('#dateBegin').focus();
	}
	else if(document.all["dateEnd"].value != "" && !jf_CheckCDATE(document.all["dateEnd"].value))
	{
		strErrMsg += "申請結束日期限格式不正確\n";
        //1051122	Kenny   [1050087]	二代公文系統相關修改
        //document.all["dateEnd"].focus();
        $('#dateEnd').focus();
	}
	else if((document.all["dateBegin"].value != "" && document.all["dateEnd"].value != "")&&(document.all["dateEnd"].value*1-document.all["dateBegin"].value*1) < 0)
	{
		strErrMsg += "申請啟始日不可大於結束日\n";
        //1051122	Kenny   [1050087]	二代公文系統相關修改
        //document.all["dateEnd"].focus();
        $('#dateEnd').focus();
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
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btopen"));
    
    //1050819 Zen 1050700 弱掃XSS修正
	if (pNo == '' || pNo == 'dateBegi')
	    return;
	var Href;
	
	//取得申請單號
	Href = document.all["dg1__ctl" + pNo + "_hlLink"].href;
	Href = Href.substring(23,Href.length-1)

    //1050819 Zen 1050700 弱掃XSS修正
	//var APPTYPE = document.all["dg1__ctl" + pNo + "_lbRead3"].innerText;
    //1051122	Kenny   [1050087]	二代公文系統相關修改
	//var APPTYPE = encodeURI(document.all["dg1__ctl" + pNo + "_lbRead3"].innerText);
    var APPTYPE	= encodeURI(document.all["dg1__ctl" + pNo + "_lbRead3"].textContent);

    //1051122	Kenny   [1050087]	將「'」符號移除，否則AKT800自網址參數取值設定欄位時會顯示「'」符號
    Href = Href.replace(/'/g, "");
    
	var params = Href.split(",");

    //1050819 Zen 1050700 弱掃XSS修正
	//eval("ButtonOpenWin(" + params[0] + "," + params[1] + "," + params[4] + ",'" + APPTYPE + "')");
    ButtonOpenWin(params[0], params[1], params[4], APPTYPE);

	Page_BlockSubmit=true;
}

function ButtonOpenWin(orgno,appno,acc,apptype)
{
    //1050819 Zen 1050700 弱掃XSS修正
    apptype = decodeURI(apptype);

	if(apptype=="調案申請")
	{
		strUrl = "../../../AK/AKT800.aspx?BOR_NO="+appno+"&SOURCE_ORGNO="+orgno+"&ACC="+acc+"&REJ=TRUE&PType=RejectNotify";
		//0981203	Albert	0980336	不再自網址參數取得Artifact
		//strUrl = strUrl + "&SAMLart=" + fnGetArtifact();		
		 strUrl = strUrl + "&SAMLart=" + document.all.SsoArtifact.value;
		//strUrl = "HTTP://ntx.ntx.com.tw/AK/AKT800.aspx?BOR_NO="+appno+"&SOURCE_ORGNO="+orgno+"&ACC="+acc+"&REJ=TRUE&PType=RejectNotify";
		jf_OpenChildWin(strUrl, "EAT802", 800, 600 );
	}
	else
	{
		strUrl = "EAT801.aspx?SOURCE_ORGNO="+orgno+"&APPLY_NO="+appno+"&ACC="+acc+"&MODE=VIEW";
		jf_OpenChildWin(strUrl, "EAT802", 700, 500 );
	}
}

//0981203 Albert 0980336 以下fn已不使用
/*
//new --------------------
function fnGetArtifact()
{
	var str = document.location.href;	
	var SAMLartStr = "";
	if (str.indexOf("?") != -1)
	{	
		var arr = str.split("?");
		str = arr[arr.length-1];
		var idx = str.indexOf("SAMLart=");


		var endx = str.lastIndexOf("#")
		if(endx==-1)
			str = str.substring(idx, str.length).replace("SAMLart=", "");
		else
			str = str.substring(idx,endx).replace("SAMLart=", "");
		idx = str.indexOf("&");
		if (idx == -1)
			idx = str.length;
		str = str.substring(0, idx);
		SAMLartStr = str;
	}
   return SAMLartStr;
}
*/