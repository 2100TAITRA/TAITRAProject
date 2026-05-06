/*
DATE 	SA	PRG	MGR_NO	DESC
1090916 Cloud	Cloud	1090559 參照odr250 新增odr250smeg
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
			pUrl = "ODI110.aspx?argMode=1";
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
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1050322 David 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
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
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
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
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
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
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
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
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
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
		for (var iRow=2;iRow<document.all.dg2.rows.length+2;iRow++)
		{
			//1050322 David 1050087 二代公文修改
			//if (document.all["dg2__ctl"+iRow+"_lbDocNo"].innerText == strCheckDocNo)
			if (document.all["dg2__ctl"+iRow+"_lbDocNo"].textContent == strCheckDocNo)
			{
				document.all["dg2__ctl"+iRow+"_cb1"].checked = true;
				document.all["txCheckDocNo"].value ="";		//清空公文文號input
				document.all["txCheckDocNo"].focus();			
				break;
			}
			//Cola 000483 -- 當輸入之公文並不在dg時 -- 告知警告訊息 -- start --
			if (iRow == document.all.dg2.rows.length+1)
			{
				if(strCheckDocNo != "")
				{
					alert('查無該筆待歸檔公文文號');
					document.all["txCheckDocNo"].value ="";		//清空公文文號input
					document.all["txCheckDocNo"].focus();				
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
				document.all["txCheckDocNo"].focus();
				break;
			}
			//Cola 000483 -- 當輸入之公文並不在dg時 -- 告知警告訊息 -- start --
			if (iRow == document.all.dg3.rows.length)
			{
				alert('查無該筆待歸檔公文文號');
				document.all["txCheckDocNo"].value ="";		//清空公文文號input
				document.all["txCheckDocNo"].focus();				
			}	
			//Cola -- end --			
		}	
	}
	//Cola 修正當用掃瞄機掃入, 會自動focus 回公文文號之欄位 -- start -- 2007/05/28
	if(event.keyCode == 13)
	{
		document.all["btSelectClear"].focus();		
		event.keyCode = 9;	
	}	
	//Cola -- end --
}

//1020423	Jagle	[1020233]	承辦人下拉選單ONCHANGE事件
function ddlUserOnchange()
{
	document.all.H_UserValue.value = document.all.ddlUser.value;
}