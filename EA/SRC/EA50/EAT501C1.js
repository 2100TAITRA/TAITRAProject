/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060315   Justin   1050087     二代公文修改
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
//1060315  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060315  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次*/
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改
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
//1060315  Justin [1050087] 二代公文修改 
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
	
    //1060315  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = true;
			var DPLANS = document.all.txDPlanS;
			var DPLANE = document.all.txDPlanE;
			var TIMES = document.all.txTimeS;
			var TIMEE = document.all.txTimeE;
			var YEARS = document.all.txYearS;
			var YEARE = document.all.txYearE;
			//1. 銷毀計畫編號、檔案年度、擬銷毀時間只輸入一值欄位時，帶入該值至另外一欄位
			if ((DPLANS.value != "") && (DPLANE.value == ""))
				DPLANE.value = DPLANS.value;
			if ((DPLANS.value == "") && (DPLANE.value != ""))
				DPLANS.value = DPLANE.value;
				
			if ((TIMES.value != "") && (TIMEE.value == ""))
				TIMEE.value = TIMES.value;
			if ((TIMES.value == "") && (TIMEE.value != ""))
				TIMES.value = TIMEE.value;

			if ((YEARS.value != "") && (YEARE.value == ""))
				YEARE.value = YEARS.value;
			if ((YEARS.value == "") && (YEARE.value != ""))
				YEARS.value = YEARE.value;
				
			//2.銷毀計畫編號、檔案年度、擬銷毀時間起迄值交換檢查
			if ((DPLANS.value != "") && (DPLANE.value != ""))
			{
				if (DPLANS.value > DPLANE.value)
				{
					var tempval = DPLANS.value;
					DPLANS.value = DPLANE.value;
					DPLANE.value = tempval;
				}
			}				
			if ((YEARS.value != "") && (YEARE.value != ""))
			{
				if (YEARS.value > YEARE.value)
				{
					var tempval = YEARS.value;
					YEARS.value = YEARE.value;
					YEARE.value = tempval;
				}
			}
			if ((TIMES.value != "") && (TIMEE.value != ""))
			{
				if (TIMES.value > TIMEE.value)
				{
					var tempval = TIMES.value;
					TIMES.value = TIMEE.value;
					TIMEE.value = tempval;
				}
			}			
			
			if ((DPLANS.value=="") && (YEARS.value=="") && (TIMES.value=="") && (document.all.dlPlanType.selectedIndex == 0) && (document.all.txOrg.value=="") && (document.all.txHistoryOrg.value=="") && (document.all.txPlanNo.value==""))
			{	
			    alert("至少必須輸入一個搜尋條件");
			    //1060315 Justin [1050087] 二代公文修改
			    //DPLANS.focus();
			    $('#txDPlanS').focus();
				return;
			}
			
			Page_BlockSubmit = false;
		    //1060315  Justin [1050087] 二代公文修改 
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
function ReturnValue(argLink, argRead1, argRead2)
{    
	try
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text = argLink;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("EAT501C1");
		close();
	}
	catch (e) {}
    

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ObjOnBlur(argObjName)
{
	switch(argObjName)
	{
		case "txOrg": //清理批號檢查Plan_Main有無存在
			if(document.all.txOrg.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txOrg.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgNameByOrgNo", false, param);
				var iCallID_txOrg = callObj.id;
				document.all.txOrg.value = callObj.value.RtnStr;
			}
			break;
		case "txHistoryOrg":
			if(document.all.txHistoryOrg.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txHistoryOrg.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgNameByOrgNo", false, param);
				var iCallID_txOrg = callObj.id;
				document.all.txHistoryOrg.value = callObj.value.RtnStr;
			}
			break;		
		case "txTimeS":
			if (document.all.txTimeS.value != "")
			{
				if (!jf_CheckCDATE(document.all.txTimeS.value))
				{
				    alert("非正確日期格式");
				    //1060315 Justin [1050087] 二代公文修改
				    //document.all.txTimeS.focus();
				    $('#txTimeS').focus();
				}
				else
				{
					if (document.all.txTimeS.value.length < 7)
						{document.all.txTimeS.value = jf_PADL(document.all.txTimeS.value,7,'0');}
				}
			}
			break;			
		case "txTimeE":
			if (document.all.txTimeE.value != "")
			{
				if (!jf_CheckCDATE(document.all.txTimeE.value))
				{
				    alert("非正確日期格式");
				    //1060315 Justin [1050087] 二代公文修改
				    //document.all.txTimeE.focus();
				    $('#txTimeE').focus();
				}
				else
				{
					if (document.all.txTimeE.value.length < 7)
						{document.all.txTimeE.value = jf_PADL(document.all.txTimeE.value,7,'0');}
				}
			}
			break;					
	}
}