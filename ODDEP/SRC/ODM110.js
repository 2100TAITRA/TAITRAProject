/*	
DATE	SA		PRG		MSG_NO			DESC	
1000403 David	Zola	1000035 		允許儲存沒有機關代碼的來文機關預設來文字與主旨內容
1050408 David   Zen     1050087         二代公文修改
1050518 David   Zen     1050087         WEM010C0子視窗修改
1060518 Leslie  Zen     1060215         innerText相關修改*/
var CurrOrgIdObj;
var CurrOrgNameObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050408 Zen 1050087 二代公文修改
/*
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);
*/
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btOrgPrompt"));
	var btHelp;
	if (document.all["dg1__ctl"+pNo+"_btOrgPrompt"] != null)
	{
		btHelp = document.all["dg1__ctl"+pNo+"_btOrgPrompt"].id;
		CurrOrgIdObj   = document.all["dg1__ctl"+pNo+"_txOrgNo"];
		CurrOrgNameObj = document.all["dg1__ctl"+pNo+"_txOrgName"];
	}
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case btHelp:
		    Page_BlockSubmit = true;
		    //1050518 Zen 1050087 WEM010C0子視窗修改--begin
		    var path = document.all.H_Wed010C1Path.value;
		    //strUrl = "WEM010C1.aspx?OrgID=" + document.all["h_OrgNo"].value + "&K1=Dlg_Dept&Search=" + CurrOrgIdObj.value;
		    //jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
		    strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all["h_OrgNo"].value + "&K1=WEM010";
			jf_OpenChildWin(strUrl, "WEM010C1", 800, 600);
		    //1050518 Zen 1050087 WEM010C0子視窗修改--end
			break;
	}	
}
//1050408 Zen 1050087 二代公文修改
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
	//1050408 Zen 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
			    document.all["dg1__ctl" + iRow + "_txOrgName"].value = "";
		    //1050602 Zen 1050087 二代公文修改
			//document.all["txSubNo"].focus();
			$('#txSubNo').focus();
			break;
	}
}

function CallBack(argCallerId)
{
	//來文機關查詢子視窗
	if(argCallerId == "WEM010C1")
	{
	    var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050519 Zen 1050087 WEM010C0子視窗修改
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
	//1050408 Zen 1050087 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,null);
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool;
	if (CheckEmpty())
		bRtnbool = CheckDuplicate();
	else
		bRtnbool = false;
	return bRtnbool;
}

function CheckEmpty()
{
	var bRtnbool = true;
	if (document.all["txSubject"].value == "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["主旨"])),"");
	}
	return bRtnbool;
}

function CheckDuplicate()
{
	var bRtnbool;
	var strOrgNo1;
	var strOrgNo2;
	var strSeq="";
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		strOrgNo1 = document.all["dg1__ctl"+iRow+"_txOrgNo"].value;
		if (strSeq != "")		break;
		if (strOrgNo1 == "")	continue;
		for (var iCol=iRow+1;iCol<document.all["dg1"].rows.length+1;iCol++)
		{
			strOrgNo2 = document.all["dg1__ctl"+iCol+"_txOrgNo"].value;
			if (strOrgNo2 == "")	continue;
			if (strOrgNo1 == strOrgNo2)
			{
				strSeq = (iRow-1) + "," + (iCol-1);
				break;
			}
		}
	}
	if (strSeq != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號："+strSeq+"重複"])),"");
		var argSeq = strSeq.split(',');
	    //1050602 Zen 1050087 二代公文修改
		//document.all["dg1__ctl" + String(Number(argSeq[1]) + 1) + "_txOrgNo"].focus();
		$("#dg1__ctl" + String(Number(argSeq[1]) + 1) + "_txOrgNo").focus();
	}
	else
		bRtnbool = true;
	return bRtnbool;
}

//1050519 Zen 1050087 WEM010C0子視窗修改
//function txOrgNo_onblur()
function txOrgNo_onblur(event)
{
	var srcObjectName = event.target.id
	var pNo = srcObjectName.substring(8,srcObjectName.indexOf("_txOrgNo"));
	if (document.all["dg1__ctl"+pNo+"_txOrgNo"].value == "")
	{
		document.all["dg1__ctl"+pNo+"_txOrgName"].value = "";
		document.all["dg1__ctl"+pNo+"_h_OrgID"].value = ""; 
	}
	else
		//1000403 Zola	1000035  新增機關識別碼回傳欄位
		//GetOrgInfo(document.all["dg1__ctl"+pNo+"_txOrgNo"],document.all["dg1__ctl"+pNo+"_txOrgName"] );
		GetOrgInfo(document.all["dg1__ctl"+pNo+"_txOrgNo"],document.all["dg1__ctl"+pNo+"_txOrgName"], document.all["dg1__ctl"+pNo+"_h_OrgID"] );
}

//1000403 Zola	1000035  新增機關識別碼回傳欄位
//function GetOrgInfo(argTxObj,argLbObj)
function GetOrgInfo(argTxObj,argLbObj,argh_OrgID)
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
				argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
				argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);
				//1000403 Zola	1000035  當機關代碼為空字串時,設定為機關識別碼--START
				argh_OrgID.value = jf_Trim(CallWsObj.value._OrgID[0]);	
				if (argTxObj.value == "") argTxObj.value = argh_OrgID.value;	
				//1000403 Zola	1000035  當機關代碼為空字串時,設定為機關識別碼--END
			}
			else
			{
				argLbObj.value = "";
			    //1050602 Zen 1050087 二代公文修改
				//argTxObj.focus();
				$('#' + argTxObj.id).focus();
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["查無此機關代碼"])),"");
			}
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
}