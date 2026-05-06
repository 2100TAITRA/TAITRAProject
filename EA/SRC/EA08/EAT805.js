/*
DATE	SA		PRG		MGR_NO		DESC
1051122	Cloud   Kenny	1050087	    二代公文系統相關修改
1070830 Kevin   Zen     1070678     弱掃Ajax修正
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

//1051122	Kenny   [1050087]	二代公文系統相關修改--Start--
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1051122	Kenny   [1050087]	二代公文系統相關修改--End--

//1070830 Zen 1070678 弱掃Ajax修正
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051122	Kenny   [1050087]	二代公文系統相關修改；一併移除無用CODE
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
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
		case "ibVer":
			Page_BlockSubmit=true;
			strUrl = "../EA01/EAC004.aspx";		
            //1051122	Kenny   [1050087]	二代公文系統相關修改；調整開啟視窗大小
			//jf_OpenChildWin(strUrl, "EAC004", 700, 500 );
            jf_OpenChildWin(strUrl, "EAC004", 800, 600 );
			break;
		case "ibCls":
			Page_BlockSubmit=true;
			strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAM005&MODE=1&SHOWALL=1&VER_NO="+document.all["txVerNo"].value;
            //1051122	Kenny   [1050087]	二代公文系統相關修改；調整開啟視窗大小
			//jf_OpenChildWin(strUrl, "EAC005", 700, 500 );
            jf_OpenChildWin(strUrl, "EAC005", 800, 600 );
			break;
		case "btAdd":
			Page_BlockSubmit=false;
            //1051122	Kenny   [1050087]	二代公文系統相關修改；加入IsServerHandling設定及__doPostBack功能--Start--
            IsServerHandling = true;
            __doPostBack("btAdd","");
            //1051122	Kenny   [1050087]	二代公文系統相關修改；加入IsServerHandling設定及__doPostBack功能--End--
			break;
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
		case "btSave":
			Page_BlockSubmit = false;
			//1051122	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
			Page_BlockSubmit = false;
            //1051122	Kenny   [1050087]	二代公文系統相關修改
			//jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;
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
	if(argCallerId == "EAC004")
	{
		document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);		
        //1051122	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txVerNo"].focus();
        $('#txVerNo').focus();
	}

	if(argCallerId == "EAC005")
	{
		document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
		document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);		
        //1051122	Kenny   [1050087]	二代公文系統相關修改
        //document.all["txFileCls"].focus();
        $('#txFileCls').focus();
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
//年度OnBlur
function txYearOnBlur()
{
	document.all["txYear"].value=jf_PADL(document.all["txYear"].value,3,"0");
}

//版本號OnBlur
function txVerNoOnBlur()
{
	if (document.all["txVerNo"].value != "")
	{
        //1070830 Zen 1070678 弱掃Ajax修正
        //var CheckResult = EAT805.CheckVerNo(document.all.nSourceOrgno.value, document.all["txVerNo"].value).value;
        var CheckResult = EA08.EAT805.CheckVerNo(document.all.nSourceOrgno.value, document.all["txVerNo"].value).value;
		if (CheckResult.split(',')[0] == "false")
		{
			document.all["txVerNo"].value = "";
			alert(CheckResult.split(',')[1]);
            //1051122	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txVerNo"].focus();
            $('#txVerNo').focus();
		}
		else
		{
			if (document.all["txFileCls"].value != "")
			{
                //1070830 Zen 1070678 弱掃Ajax修正
                //var CheckResult = EAT805.CheckCls(document.all.nSourceOrgno.value, document.all["txVerNo"].value, document.all["txFileCls"].value).value;
                var CheckResult = EA08.EAT805.CheckCls(document.all.nSourceOrgno.value, document.all["txVerNo"].value, document.all["txFileCls"].value).value;
				if (CheckResult.split(',')[0] == "false")
				{
					document.all["txFileCls"].value = "";
					alert(CheckResult.split(',')[1]);
                    //1051122	Kenny   [1050087]	二代公文系統相關修改
                    //document.all["txFileCls"].focus();
                    $('#txFileCls').focus();
				}
			}
		}
	}
}

//分類號OnBlur
function txFileClsOnBlur()
{
	if (document.all["txFileCls"].value != "")
	{
        //1070830 Zen 1070678 弱掃Ajax修正
        //var CheckResult = EAT805.CheckCls(document.all.nSourceOrgno.value, document.all["txVerNo"].value, document.all["txFileCls"].value).value;
        var CheckResult = EA08.EAT805.CheckCls(document.all.nSourceOrgno.value, document.all["txVerNo"].value, document.all["txFileCls"].value).value;
		if (CheckResult.split(',')[0] == "false")
		{
			document.all["txFileCls"].value = "";
			alert(CheckResult.split(',')[1]);
            //1051122	Kenny   [1050087]	二代公文系統相關修改
            //document.all["txFileCls"].focus();
            $('#txFileCls').focus();
		}
	}
}
