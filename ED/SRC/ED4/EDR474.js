/*
DATE	SA		PRG		MGR_NO		DESC
1050720	KEVIN	JOE		1050087		二代系統升級
1050803	Kevin	Joe		1050087		修改子視窗大小
1051019 Leslie  Kenny   1050087     二代公文修改
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

//1050720 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
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
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050720 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050720 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(xUrl,"ODP420",760,500);
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			if(jf_Trim(document.all.txYearSt.value)=="" && jf_Trim(document.all.txYearEt.value)!="")
				document.all.txYearSt.value = document.all.txYearEt.value;
			if(jf_Trim(document.all.txYearSt.value)=="")
		    {
				alert("報表起迄不可為空白!!");
				//1050720 Joe 1050087 二代公文修改
				//document.all.txYearSt.focus();
				$('#' + document.all.txYearSt.id).focus();
				Page_BlockSubmit = true;
		    }
		    else
		    {
				if(jf_CheckYearMonth("txYearSt","報表起"))
				{
					if(jf_CheckYearMonth("txYearEt","報表迄"))
						Page_BlockSubmit = false;
					else
						Page_BlockSubmit = true;
				}
				else
					Page_BlockSubmit = true;
			}
			if(jf_Trim(document.all.txYearEt.value)=="")
				document.all.txYearEt.value = document.all.txYearSt.value;
			//1050720 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
			{
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
				document.all["lbMaxYear"].textContent = "目前統計最大年月："+
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
			}
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
function jf_CheckYearMonth(obj,objName)
{
	if(jf_Trim(document.all[obj].value) != "")
	{
		var strDate = jf_Trim(document.all[obj].value);
		strDate += "01";
		strDate = jf_PADL(strDate,7,"0");
		document.all[obj].value = strDate.substr(0,5);
		
		if (!jf_CheckCDATE(strDate))
		{
			document.all[obj].value = "";
			alert(objName+"欄位月份格式有誤，請重新輸入");
			//1050720 Joe 1050087 二代公文修改
			//document.all[obj].focus();
			$('#' + obj).focus();
			return false;
		}
		else return true;
	}
	else return true;
}