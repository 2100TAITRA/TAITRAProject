/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060913   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060913 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060913 Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//   alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1060913 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
		case "btFromPrompt":	
			CurrOrgIdObj = document.all.txOrgName;
			CurrOrgNameObj = document.all.txFromOrgName;
			var strUrl = "";
		    //1060913 Justin [1050087] 二代公文修改
		    //strUrl = "WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+escape(CurrOrgIdObj.value);
			var path = document.all.H_Wed010C1Path.value;
			strUrl = path + "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + escape(CurrOrgIdObj.value);
			jf_OpenChildWin(strUrl, "WEM010C1", 800, 600 );
			Page_BlockSubmit = true;
			break;
		    /*1060913 Justin [1050087] 二代公文修改
		case "btCalendar1":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			break;
		case "btCalendar2":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			break;*/
		case "btSelectAll":
			Page_BlockSubmit = true;
			SelectAll();
			break;
		case "btClear":
			Page_BlockSubmit = true;
			SelectClear();
			break;
		case "btReverse":
			Page_BlockSubmit = true;
			SelectInverse();
			break;
	}	
}

//1060913 Justin [1050087] 二代公文修改 
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
	
    //1060913 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
		    //1060913 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if(fnCheckData())
				Page_BlockSubmit = !jf_ConfirmDelete();
			else	
				Page_BlockSubmit = true;
		    //1060913 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_Clean();
		    //1060913 Justin [1050087] 二代公文修改
			//document.all["txDocNoS"].focus();
			$('#txDocNoS').focus();
			break;
	}
}

function CallBack(argCallerId)
{
	//來文機關查詢子視窗
	if(argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1060913 Justin [1050087] WEM010C1子視窗修改
	    //var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		CurrOrgNameObj.value = DeptArray[1];
		CurrOrgIdObj.value = DeptArray[2];	
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	ShowMsg();
	jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,null);
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
    //1060913 Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argDocNo, argSubject, argPasteDate, argDocCategory, argSpdNo, argDocPty, argIssueNo, argIssueWord, argIssueName, argBulletinID)
{
    opener.document.all.lbReturnValue.length = 10;
    opener.document.all.lbReturnValue.options[0].text = argDocNo;
    opener.document.all.lbReturnValue.options[1].text = argSubject;
    opener.document.all.lbReturnValue.options[2].text = argPasteDate;
    opener.document.all.lbReturnValue.options[3].text = argDocCategory;
    opener.document.all.lbReturnValue.options[4].text = argSpdNo;
    opener.document.all.lbReturnValue.options[5].text = argDocPty;
    opener.document.all.lbReturnValue.options[6].text = argIssueNo;
    opener.document.all.lbReturnValue.options[7].text = argIssueWord;
    opener.document.all.lbReturnValue.options[8].text = argIssueName;
    opener.document.all.lbReturnValue.options[9].text = argBulletinID;
    opener.window.CallBack("ODT137");
    opener.window.focus();
    close();
}

//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;

//檢查日期格式
function CheckCDATE(argObj,strMsg)
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
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
		    //1060913 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
//刪除前檢查
function fnCheckData()
{
	var iCnt = 0;
	var strMsg
	for(var i = 2; i <= document.all.dg1.rows.length ; i++)
	{
		if(document.all["dg1__ctl"+ i +"_cbSelect"].checked == true)
			iCnt++
	}
	if(iCnt == 0)
	{	
		strMsg = "至少要勾選一筆資料";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])),"");
		return false;
	}
	else
		return true;
}

//全選
function SelectAll()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbSelect"].checked = true;
	}
}

//反向
function SelectInverse()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
		else
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = true;
	}
}

//取消
function SelectClear()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
	}
}

function txOrgName_onblur()
{
	if(document.all.txOrgName.value == "")
	{
		//清除掉label中的值
		document.all.txOrgName.value = "";
		document.all.txFromOrgName.value = "";
	}
	else
	{
		GetOrgInfo(document.all.txOrgName,document.all.txFromOrgName);
	}
}
function GetOrgInfo(argTxObj,argLbObj)
{
	if(argTxObj.value == "")
		return;
	
	var wsParam = new Array();
	wsParam[0] = argTxObj.value;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				if(jf_Trim(CallWsObj.value.OrgID[0])!="")
					argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
				argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);
			}
			else
			{
				if(document.all.IsCheckFromOrg.value=="Y")
				{	
					var orgName = argTxObj.value;
					alert('您所輸入之來文機關['+orgName+']尚未建立於資料庫中,請先透過[WEM010發文機關維護作業]建立後,再行登錄.');
					argTxObj.value = '';
				    //1060913 Justin [1050087] 二代公文修改
					//argTxObj.focus();
					$('#' + argTxObj.id).focus();
				}
			}		
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
}