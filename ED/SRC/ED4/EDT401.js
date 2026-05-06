/*
DATE	SA		PRG		MGR_NO				DESC
1060803	Kevin	Joe		1050087				二代系統升級
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

//1060803	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060803	Joe		1050087		二代公文修改
	// jf_CallWA("../EDLIB/EDWS.asmx", "GetDocInfo", false, null);
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060803	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060803	joe		1050087		二代修改配合行動平台
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

	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060803 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060803 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if (!fnCheckBeforeSubmit())
			{
				Page_BlockSubmit = true;
				break;
			}
			Page_BlockSubmit = !(jf_ConfirmPrint() && fnCheckData());
			//1060803 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (!fnCheckBeforeSubmit())
			{
				Page_BlockSubmit = true;
				break;
			}
			Page_BlockSubmit = !(jf_ConfirmPreview() && fnCheckData());
			//1060803 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function fnCheckBeforeSubmit()
{
	if	(	jf_Trim(document.all.txDocNo1.value) == "" &&
			jf_Trim(document.all.txDocNo2.value) == "" &&
			jf_Trim(document.all.txDocNo3.value) == "" &&
			jf_Trim(document.all.txDocNo4.value) == "" &&
			jf_Trim(document.all.txDocNo5.value) == "" &&
			jf_Trim(document.all.txDocNo6.value) == ""
		)
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請至少輸入一筆公文文號"]) ), "" );
		return false;
	}
	return true;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var bHasCheck = false;
var bHasChecked	=	false;

function jf_OnBlur(argDate ,argMsg)
{
	if (!Check_CDATE(argDate, argMsg))
		//1060803	Joe	1050087	二代系統升級，調整focus寫法
		// document.all[argDate].focus();
		$('#' + argDate).focus();			
}


function Check_CDATE(argObj , strMsg )
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;

	if (strDate != "")
	{
			if (strDate.length < 5)
			{
				strDate = jf_PADL(strDate,5,'0');
				document.all[argObj].value = strDate;
			}
		if (!jf_Check_CDATE(strDate , 5))
		{
			//1060803	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#' + argObj).focus();		
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}

function jf_Check_CDATE(argStr , arglength) 
{
	// adapting for other layouts should be easy
	if (argStr.length < arglength)
		{argStr = jf_PADL(argStr,arglength,'0');}
	var pYear,pMonth,pDay;
	pYear=parseInt(argStr.substring(0,3),10)+1911;
	pMonth=parseInt(argStr.substring(3,5),10);
	pDay = arglength ;
	if (!jf_validDate(pYear, pMonth-1, pDay)) 
		{return false}
	else 
		{return true}
	
	bHasCheck = false;
	return true;
}
function jf_validDate(y, m, d) // m = 0..11
 { with (new Date(y, m, d)) return ((getMonth()==m)) }


function jf_CallWebService(argDocNo)
{
	if(jf_Trim(document.all[argDocNo].value) == "")
	{
		document.all[argDocNo].value = "" ;
		return;
	}
	if (bHasChecked)
	{
		bHasChecked = false;
		return;
	}
	var arWSParam = new Array(3);
	arWSParam[0] = document.all[argDocNo].value	;
	arWSParam[1] = document.all.dlOrg.value		;
	arWSParam[2] = document.all.dlDept.value	;
	
	CallWsObj = jf_CallWA("../EDLIB/EDWS.asmx", "GetDocInfo", false, arWSParam);
	if(jf_IsWebServiceSuccess(CallWsObj))
	{
		document.all[argDocNo].value= CallWsObj.value.DocNo;
		//CallWsObj
		if(!CallWsObj.value.Exist)
		{
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["該公文文號不存在！"]) ), "" );
			//1060803	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argDocNo].focus();
			$('#' + argDocNo).focus();		
			return;
		}
		else if(!CallWsObj.value.Right)
		{
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["權限不足，您無法查閱此份公文！"]) ), "" );
			//1060803	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argDocNo].focus();
			$('#' + argDocNo).focus();		
			return;
		}
	}
	else
	{
		return;
	}
}
//檢查資料是否正確
function fnCheckData()
{
	if(fnCheckBeforeSubmit())
	{
		for(var i = 1 ; i<=5 ; i++)
		{
			var strDocNo_ID	= "txDocNo" + i ;
			var strDocNo	=	 jf_Trim(document.all[strDocNo_ID].value);
			if(strDocNo!= "")
			{
				bHasChecked = true;
				
				var arWSParam = new Array(3);
				arWSParam[0] = document.all[strDocNo_ID].value	;
				arWSParam[1] = document.all.dlOrg.value		;
				arWSParam[2] = document.all.dlDept.value	;
				CallWsObj = jf_CallWA("../EDLIB/EDWS.asmx", "GetDocInfo", false, arWSParam);
				if(jf_IsWebServiceSuccess(CallWsObj))
				{
						document.all[strDocNo_ID].value= CallWsObj.value.DocNo;
						//CallWsObj
						if(!CallWsObj.value.Exist)
						{
							jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["該公文文號不存在！"]) ), "" );
							//1060803	Joe	1050087	二代系統升級，調整focus寫法
							// document.all[strDocNo_ID].focus();
							$('#' + strDocNo_ID).focus();		
							return false;
						}
						else if(!CallWsObj.value.Right)
						{
							jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["權限不足，您無法查閱此份公文！"]) ), "" );
							//1060803	Joe	1050087	二代系統升級，調整focus寫法
							// document.all[strDocNo_ID].focus();
							$('#' + strDocNo_ID).focus();
							return false;
						}
				}
			}
			bHasChecked = true;
		}
		return true;
	}
}













