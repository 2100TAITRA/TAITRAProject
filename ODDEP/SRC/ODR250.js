/*
DATE 	SA	PRG	MGR_NO	DESC
0951225	Stella	Shelly	951366	公文文號未清空修改
0960528	--		Cola	000483	修正當輸入之公文並不在待歸檔公文時 -- 告知警告訊息
1000216	Zola	Linda	1000153	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
1020423	David	Jagle	1020233	增加承辦人下拉選單(當前角色為承辦人且有代理承辦人時才生效)
1050322	David	David	1050087	二代公文修改
1100125 Cloud   Cloud   1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。
1110317	Cloud	Cloud	1110267	修正重複點擊造成重複postback問題
1110705 Cloud   Cloud   1110646 增加線上簽核選項與紙本來文轉線上簽核公文連動
1110902 Cloud   Cloud   1110987 修改ODR250開啟ODI110時收文單位預設為檔案室
1121201	Cloud   Cloud   1120900 修正無法連續掃描問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050322 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
document.all.txCheckDocNo.onkeydown = jf_CheckEnterPress;

function ShowMsg()
{
	//1050322 David 1050087 二代公文修改
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}

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
		case "btBatchNo":   //送文批號子視窗
		    var pUrl = "";
		    //1110902 Cloud   Cloud   1110987 修改ODR250開啟ODI110時收文單位預設為檔案室
		    //pUrl = "ODI110.aspx?argMode=1";
		    pUrl = "ODI110.aspx?argMode=1&argFrom=ODR250";
			//1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
			//jf_OpenChildWin(pUrl,"ODI110",580,420);
			jf_OpenChildWin(pUrl,"ODI110",900,600);
			Page_BlockSubmit = true;
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;			
			SelectAll();
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			SelectInverse();
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			SelectClear();
			break;
		case "btEnter":
			Page_BlockSubmit = true;
			jf_btEnter();
			break;
	}	
}

//1050322 David 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	{
		//1110317	Cloud	Cloud	1110267	修正重複點擊造成重複postback問題
		Page_BlockSubmit = true;
	   return;
	}
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1050322 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
    //1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-S
	var strStatus = "";
	if (document.all["cbSignP"].checked)
	    strStatus += "1";
	else
	    strStatus += "0";
	if (document.all["cbSignE"].checked)
	    strStatus += ";1";
	else
	    strStatus += ";0";
	if (document.all["cbSignERcvP"].checked)
	    strStatus += ";1";
	else
	    strStatus += ";0";

	document.all["h_txCheckBoxStatus"].value = strStatus;
    //1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-E
	
	switch (xObjectName)
	{
		case "btOpen":
			if(CheckBeforeOpen())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (CheckBoforeSave())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			//1020423	Jagle	[1020233]	確認隱藏欄位紀錄的是正確的VALUE值
			ddlUserOnchange();
			Page_BlockSubmit = false;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			blPrint = true;
		case "btPreview":
			if(CheckBeforPrint(xObjectName))
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050322 David 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId == "ODI110")
	{
		document.all.txBatchNo.value = document.all["lbReturnValue"].options[0].value;
		jf_OpenButtonSubmit();
	}
}

function ClientOnLoad()
{
	ShowMsg();
	//jeff 0950530 列印張數
	var nPage = parseInt(document.all.txPage.value);
	for(var i=0;i<(nPage-1);i++)
		jf_PrintFile();		
		
	//1020423	Jagle	[1020233]	判斷有無選擇承辦人
	if(document.all.H_UserValue.value != "")
	{
		for(var i = 0 ; i < document.all.ddlUser.length ; i++)
		{
			if(document.all.H_UserValue.value == document.all.ddlUser.options[i].value)
				document.all.ddlUser.selectedIndex = i;
		}
	}
	//1100125 Cloud   Cloud   1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。
	jf_EnableSecrb();
    //1110705 Cloud    1110646 增加線上簽核選項與紙本來文轉線上簽核公文
	if (document.all["uOrgNickName"].value == "EXAM") {
	    document.all["chESign"].className = "hide"
	    document.all["chSignType"].className = "dTR"
	    if (document.all["Init"] && document.all["Init"].value == "TRUE")
	        jf_EnablecbRcvE();
        else
	        jf_SetCheckBox();
	}
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
	//1050322 David 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function CheckBeforeOpen()
{
	if(!CheckUnEmpty("txBatchNo","請輸入送文批號後再開啟"))
		return false;
	return true;
}

function CheckBoforeSave()
{
	var bRtn = false;
	
	if( document.all.dg2 != null ) //ferdy no.950360 #95.08.22
	{
		//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
		//for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		for (var iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
		{
			if (document.all["dg2__ctl"+iRow+"_cb1"].checked)
			{
				bRtn = true;break;
			}
		}
		if (!bRtn)
		{
			document.all["dg2__ctl2_cb1"].focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			if (document.all["dg3__ctl"+iRow+"_cb13"].checked)
			{
				bRtn = true;break;
			}
		}
		if (!bRtn)
		{
			document.all["dg3__ctl2_cb13"].focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
		}
	}

	return bRtn;
}

function CheckUnEmpty(argFieldName,argErrMsg)
{
	if(document.all[argFieldName].value == "")
	{
		document.all[argFieldName].focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argErrMsg])),"");		
		return false;
	}
	return true;
}

//預覽/列印前欄位檢查
function CheckBeforPrint(argObjectName)
{
	var Msg = "";
	if(argObjectName == "btPrint")
		Msg = "列印";
	else
		Msg = "預覽";
	if(!CheckUnEmpty("txBatchNo","請輸入送文批號後再"+Msg))
		return false;
	return true;
}

//全選
function SelectAll()
{
	if( document.all.dg2 != null ) //ferdy no.950360 與dg3共用
	{
		//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
		//for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		for (var iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
		{
			document.all["dg2__ctl"+iRow+"_cb1"].checked = true;
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			document.all["dg3__ctl"+iRow+"_cb13"].checked = true;
		}
	}
		
		
}
//反向
function SelectInverse()
{
	if( document.all.dg2 != null ) //ferdy no.950360 與dg3共用
	{
		//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
		//for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		for (var iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
		{
			if (document.all["dg2__ctl"+iRow+"_cb1"].checked)
				document.all["dg2__ctl"+iRow+"_cb1"].checked = false;
			else
				document.all["dg2__ctl"+iRow+"_cb1"].checked = true;
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			if (document.all["dg3__ctl"+iRow+"_cb13"].checked)
				document.all["dg3__ctl"+iRow+"_cb13"].checked = false;
			else
				document.all["dg3__ctl"+iRow+"_cb13"].checked = true;
		}
	}
}
//取消
function SelectClear()
{
	if( document.all.dg2 != null ) //ferdy no.950360 與dg3共用
	{
		//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
		//for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		for (var iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
		{
			document.all["dg2__ctl"+iRow+"_cb1"].checked = false;
		}
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			document.all["dg3__ctl"+iRow+"_cb13"].checked = false;
		}
	}
}

//檢查是否按下Enter鍵,是則呼叫jf_btEnter()
function jf_CheckEnterPress()
{
	if(event.keyCode == 13)
		jf_btEnter();
}

//按下確認鍵後將輸入文號勾選
function jf_btEnter()
{
	var strCheckDocNo = jf_Trim(document.all["txCheckDocNo"].value);
	if( document.all.dg2 != null ) //ferdy no.950360 
	{
		//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
		//for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		for (var iRow=2;iRow<document.all.dg2.rows.length+1;iRow++)
		{
			//1050322 David 1050087 二代公文修改
			//if (document.all["dg2__ctl"+iRow+"_lbDocNo"].innerText == strCheckDocNo)
			if (document.all["dg2__ctl"+iRow+"_lbDocNo"].textContent == strCheckDocNo)
			{
				document.all["dg2__ctl"+iRow+"_cb1"].checked = true;
				document.all["txCheckDocNo"].value ="";		//清空公文文號input
				//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
				//document.all["txCheckDocNo"].focus();			
				break;
			}
			//Cola 000483 -- 當輸入之公文並不在dg時 -- 告知警告訊息 -- start --
			//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
			//if (iRow == document.all.dg2.rows.length+1)
			if (iRow == document.all.dg2.rows.length)
			{
				//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
				//if(strCheckDocNo != "")
				{
					alert('查無該筆待歸檔公文文號');
					document.all["txCheckDocNo"].value ="";		//清空公文文號input
					//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一併修正BUG
					//document.all["txCheckDocNo"].focus();				
				}
			}	
			//Cola -- end --
		}	
	}
	else //輸入子文無法選取
	{
		for (var iRow=2;iRow<document.all.dg3.rows.length+1;iRow++)
		{
			//1050322 David 1050087 二代公文修改
			//if (document.all["dg3__ctl"+iRow+"_lbDocNo3"].innerText == strCheckDocNo)
				if (document.all["dg3__ctl"+iRow+"_lbDocNo3"].textContent == strCheckDocNo)
			{
				document.all["dg3__ctl"+iRow+"_cb13"].checked = true;
				document.all["txCheckDocNo"].value ="";		//清空公文文號input
				//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題
				//document.all["txCheckDocNo"].focus();
				break;
			}
			//Cola 000483 -- 當輸入之公文並不在dg時 -- 告知警告訊息 -- start --
			if (iRow == document.all.dg3.rows.length)
			{
				alert('查無該筆待歸檔公文文號');
				document.all["txCheckDocNo"].value ="";		//清空公文文號input
				//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題
				//document.all["txCheckDocNo"].focus();				
			}	
			//Cola -- end --			
		}	
	}
	//Cola 修正當用掃瞄機掃入, 會自動focus 回公文文號之欄位 -- start -- 2007/05/28
	if(event.keyCode == 13)
	{
		//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題
		//document.all["btSelectClear"].focus();		
		//event.keyCode = 9;	
		event.returnValue = false;
	}
	//1121201	Cloud     1120900 修正掃描後會focus至確認鈕造成無法連續掃描的問題-一率focus回文號欄位
	document.all["txCheckDocNo"].focus();
	//Cola -- end --
}

//1020423	Jagle	[1020233]	承辦人下拉選單ONCHANGE事件
function ddlUserOnchange()
{
	document.all.H_UserValue.value = document.all.ddlUser.value;
}
//1100125 Cloud     1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。-s
function jf_EnableSecrb() {
    if (document.all.cbIncludeSecDoc.checked)
    {
        document.all.rbIncludeSecAll.disabled = false;
        document.all.rbIncludeSecRcvP.disabled = false;
    }
    else
    {
        document.all.rbIncludeSecAll.disabled = true;
        document.all.rbIncludeSecRcvP.disabled = true;
    }
}
//1100125 Cloud     1101552 修改是否包含密件公文為選項控制，並依環境變數[OD_ELEC_NEED_RPT] 控制預設值。-e
//1110705 Cloud    1110646 增加線上簽核選項與紙本來文轉線上簽核公文連動-S
function jf_EnablecbRcvE() {
    if (document.all.cbSignE.checked) {
        document.all.cbSignERcvP.disabled = true;
        document.all.cbSignERcvP.checked = true;
    }
    else {
        document.all.cbSignERcvP.disabled = false;
        document.all.cbSignERcvP.checked = false;
    }
}
//1110705 Cloud   Cloud   1110646 增加線上簽核選項與紙本來文轉線上簽核公文連動-E
//1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-S
function jf_SetCheckBox() {
    var statusList = document.all["h_txCheckBoxStatus"].value.split(';');
    if (statusList[0] == "1")
        document.all["cbSignP"].checked = true;
    else
        document.all["cbSignP"].checked = false;
    if (statusList[1] == "1")
        document.all["cbSignE"].checked = true;
    else
        document.all["cbSignE"].checked = false;
    if (statusList[2] == "1")
        document.all["cbSignERcvP"].checked = true;
    else
        document.all["cbSignERcvP"].checked = false;
    if (document.all.cbSignE.checked) {
        document.all.cbSignERcvP.disabled = true;
        document.all.cbSignERcvP.checked = true;
    }
}
//1110705 Cloud    1110646 依postback前紀錄的狀態 重勾CheckBox-E