/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 104.02.05	Kevin_C		1030959	新增程式
 * 1040714		Kevin_C		1040490	DropDownList新增僅含一級單位，修改一級單位onblur邏輯，避免查到前次選擇的二級單位，修正隸屬機關下拉選單無法更改一、二級單位的問題
 * 1051130      Justin      1050087 二代公文修改
 * 1070830		Joe			1070678	配合內政部IIS環境設定改為使用AjaxPro
 ****************************************************************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
//1051130 Justin [1050087] 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
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
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if(document.all["AlertMsgForNonePriv"])
	    if (document.all["AlertMsgForNonePriv"].value == "1") {
	        alert("目前使用者不含此查詢作業使用權限");
	        close();
	    }
	document.all["dlDept"].onchange();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051130 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051130 Justin [1050087] 二代公文修改 
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
	
    //1051130 Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
		    //1051130 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["dlDept"].onchange();
		    //1051130 Justin [1050087] 二代公文修改
			//document.all["txUserName"].focus();
			$('#txUserName').focus();
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1051130 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1051130 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1051130 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function DeptOnChange()
{
	var dlSect = document.all["dlSect"];//必宣告，每次"."都會耗費時間，只做一次比較看不出影響
	fnClearDropDownList(dlSect);
	var str    = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值

	if(document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
	    //var value = IFR014.GetSub(document.all["SsoArtifact"].value,str).value;//呼叫IFR014GetSub ，檢視程式碼，可以找到v3內建的SsoAritifat的值
	    //1040714	Kevin_C	1040490	修正隸屬機關下拉選單無法更改一、二級單位的問題
	    //var UserInfo = IFR014.GetSub(document.all["SsoArtifact"].value,str).value;
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
	    // var UserInfo = IFR014.GetSub(document.all["dlOrgno"].value, str).value;
	    var UserInfo = IF1.IFR014.GetSub(document.all["dlOrgno"].value, str).value;
		if(UserInfo.strErrMsg == "")
			if(UserInfo.strRtv.length >0)
			{  
				fnClearDropDownList(dlSect);//呼叫清空dlSect物件
				dlSect.options.add(new Option("",""));//DropDownList新增一個空白
				//1040714	Kevin_C	1040490	DropDownList新增僅含一級單位
				dlSect.options.add(new Option("(僅含一級單位)","N"));
				for(var i=0;i<UserInfo.strRtv.length;i++)
				{
					var strSect = UserInfo.strRtv[i];//將取到的二級單位的值放入
					dlSect.options.add(new Option(strSect.split('|')[0],strSect.split('|')[1]));//將name和value分別存入strSect中
				}
			}
		if (document.all["H_Sect"].value != "")
		    dlSect.value = document.all["H_Sect"].value;
		//1040714	Kevin_C	1040490	避免更換一級單位後，H_Sect還保留二級單位的值
		if(dlSect.value != document.all["H_Sect"].value)
		{
			dlSect.selectedIndex = 0;
			document.all["H_Sect"].value = "";
		}
	}
	else
	{
		fnClearDropDownList(dlSect);
		document.all.H_Sect.value="";
	}
}
function SecOnChange()
{
	document.all["H_Sect"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;
}
function fnClearDropDownList(obj)//專用呼叫清空控制項
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);			
}
