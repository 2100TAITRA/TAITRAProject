/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050421	David	Joe 	1050087		二代公文修改
 * 1050516	David	Joe 	1050087		機關查詢子視窗處理邏輯調整
 * 1050520	David	JOE		1050087		二代系統升級，調整focus寫法
 * 1050803	Kevin	Joe		1050087		修改子視窗大小
 * 1051019  Leslie  Kenny   1050087     二代公文修改
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

//1050421 Joe 1050087 二代公文修改
/*
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
*/
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	//0981110 David 0980587 若OD_EXEC_CHECK_PRIV = N 隱藏發文單位下拉選單
	
	if(document.all.H_CkPriv.value == "N")
		trIssueByPriv.style.display = 'none';
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
		//0981116 David 0980593 新增日期及受文機關查詢--START
		case "btHelp":
			var strUrl = "";
			var CurrOrgNameObj = document.all["txOrgno"].value;
			//1050516	Joe	1050087	處理子視窗查詢--START
			var path = document.all.H_Wed010C1Path.value;
			//strUrl = "../../../ODDEP/WEM010C1.aspx?OrgID="+document.all["H_Orgno"].value+"&K1=Dlg_Dept&Search="+escape(CurrOrgNameObj);
			strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all["H_Orgno"].value + "&K1=WEM010";
			//1050516	Joe	1050087	處理子視窗查詢--END
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 800, 600 );
			Page_BlockSubmit=true;
		break;
		case "btDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txIssueDate, event.screenX, event.screenY);
		break;
		//END
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050421 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050421 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			if(alerth())
			{
				//1050421 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
			if(alerth())
				//1050421 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
			if(alerth())
				//1050421 Joe 1050087 二代公文修改
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
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			jf_SelectBarSubmit();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
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
    var bWSRtn = false;
    if (argResult.id == wsGetOrgNameID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.ErrorClass.IsErr)
			{
				if(argResult.value.Count > 0)
				{
					bWSRtn = true;
					document.all["txOrgno"].value = jf_Trim(argResult.value.OrgID[0]);
					document.all["txOrgName"].value = jf_Trim(argResult.value.OrgName[0]);
				}
				else
				{
					bWSRtn = false;
					if (event.type == "buttonclick")
						bMsg = false;//不再show第二次訊息
					document.all["txOrgName"].value="";
				}
			}
			else
			{
				bWSRtn = false;
				alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
				//1050520	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txOrgno"].focus();
				$('#txOrgno').focus();
			}
		}
	}
	return bWSRtn;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	//0981116 David 0980593 取得WEM010C1回傳值
	if (argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		//1050516	Joe	1050087	處理子視窗查詢--
		//var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		if(DeptArray[3] != "")
			document.all["txOrgno"].value  = DeptArray[2]+DeptArray[3];
		else
			document.all["txOrgno"].value  = DeptArray[2];
		document.all["txOrgName"].value= DeptArray[1];
	}
	//END
	
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
function alerth()
{
	if(jf_Trim(document.all["txDOC_NO"].value) =="" && jf_Trim(document.all["txBULK_NO"].value) =="" && jf_Trim(document.all["txIssueDate"].value) == ""
	 && jf_Trim(document.all["txOrgno"].value) == "" )
	{
		if(document.all["ddlIssueUnit"] != null)
		{
			if(document.all.ddlIssueUnit.selectedIndex == -1 ||document.all["ddlIssueUnit"].options[document.all.ddlIssueUnit.selectedIndex].value == "")
			{
				alert("畫面上欄位不可皆為空！")
				//1050520	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["txBULK_NO"].focus();
				$('#txBULK_NO').focus();
				return false;
			}
			else
				return true;
		}
		else
		{
			alert("畫面上欄位不可皆為空！")
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txBULK_NO"].focus();
			$('#txBULK_NO').focus();
			return false;
		}
	}
	else
		return true;
}

//0981116 David 0980593 受文機關欄位OnBlur
var bMsg = true;
var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgno()
{	
	var bRtn = true;
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno != "")
	{
		if (bMsg)
		{
			var arWSParam = new Array(4);
			arWSParam[0] = strOrgno;
			arWSParam[1] = document.all["H_Orgno"].value;
			arWSParam[2] = document.all["H_DeptNo"].value;
			arWSParam[3] = document.all["H_UserId"].value;
			callObj = jf_CallWS("../../../ODDEP/lib/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			wsGetOrgNameID = callObj.id;
			bRtn = OnWSResult(callObj);
		}
		else
			bMsg = true;
	}
	else
		document.all["txOrgName"].value = "";
	return bRtn;
}
//0981116 David 0980593 日期欄位檢核
var CheckedDate = false;
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(CheckedDate)
	{
		CheckedDate = false;
		return true;
	}
	if(argIsCheckDone)
		CheckedDate = true;

	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
		else
			return true;
	}
	else
		return true;
}
//0981116 David 0980593 搜尋前檢查
function CheckBeforeSearch()
{
	if(!CheckOrgno())
		return false;
	if(!CheckDATE("txIssueDate","發文日期",true))
		return false;
	return true;
}
