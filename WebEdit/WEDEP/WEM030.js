/*
DATE	SA		PRG		MGR_NO		DESC
0980918	Stella	David	0980455		使用WebFileIO時，應傳入Artifact
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1050127	Cloud	Kevin_C	1050001		加上後括號避免程式出錯
1050725 Cloud	Kevin_C	1050087		升二代
1051031	Leslie	Joe		1050087		二代修改配合行動平台
1100725	David	Joe		1100648		新增CSV匯入匯出功能
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050725	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050725	Kevin_C	1050087	升二代 -S
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050725	Kevin_C	1050087	升二代 -E

window.onunload = fnWindowOnUnLoad;
function fnWindowOnUnLoad()
{
	window.returnValue = true;
}

//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
/* justin	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/
	switch (xObjectName)
	{
		case "btSelect":
			for (var iRow=2 ; iRow < document.all["dg1"].rows.length+1 ; iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == false)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
			}
			Page_BlockSubmit=true;
			break;
		case "btChange":
			for (var iRow=2 ; iRow<document.all["dg1"].rows.length+1 ; iRow++)
			{
				if (document.all["dg1__ctl"+iRow+"_cb1"].checked == false)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = true;
				else if (document.all["dg1__ctl"+iRow+"_cb1"].checked == true)
					document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
			}
			Page_BlockSubmit=true;
			break;
		case "btRemove":
			btRemoveClick();
			Page_BlockSubmit=true;
			break;
		case "btInsert":
			//1050725	Kevin_C	1050087	升二代
			//if (jf_GetActionMode() == 0)//新增
			//{
			//	document.all["txWord"].focus();
			//	alert("請先選取要編輯的詞庫，並按下開啟鍵後再新增");
			//	return;
			//}
			if (document.all["txWord"].value == "")
			{
				//1050725	Kevin_C	1050087	升二代
				//document.all["txWord"].focus();
				$('#txWord').focus();
				jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["新增常用詞"])),"");
			}
			//1050725	Kevin_C	1050087	升二代 -S
			else if(document.all["dg1"].rows.length > 30)
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["詞庫組數以達上限30組，無法新增常用詞"])),"");
			}
			//1050725	Kevin_C	1050087	升二代 -E
			else
			{
				if (document.all["rb1"].checked)
					btInsertClick1();
				else if (document.all["rb2"].checked)
				{
					if (document.all["txSeq"].value == "")
					{
						//1050725	Kevin_C	1050087	升二代
						//document.all["txSeq"].focus();
						$('#txSeq').focus();
						jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["所要插入的序"])),"");
					}
					else
						btInsertClick2();
				}
			}
			Page_BlockSubmit=true;
			break;
	}
}

//1050725	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
/*	justin
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/	
	//1050725	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			//1050725	Kevin_C	1050087	升二代
			//fnOnUpload();
			Page_BlockSubmit = false;
			//1050725	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
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
			//1050725	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
			//1100725	Joe		1100648		新增檔案匯入匯出功能--S
		case "btImport":
			csvImport.click();
			Page_BlockSubmit = true;
			break;
	    case "btExport":
	        Page_BlockSubmit = false;
	        var Buffer = '';
	        for (var i = 2; i < document.all["dg1"].rows.length + 1; i++) {
	            document.all["H_ExportInfo"].value += Buffer + document.all["dg1__ctl" + i + "_txUsual"].value;
	            Buffer = '^';
	        }
	        jf_ToolBarSubmit(xObjectName);
	        break;
			//1100725	Joe		1100648		新增檔案匯入匯出功能--E
		case "btCancel":
			//1050725	Kevin_C	1050087	升二代 -S
			//Page_BlockSubmit = !jf_ConfirmCancel();
			//jf_ToolBarSubmit();
			Page_BlockSubmit = true;
			if(parent){parent.$('#extdlg_close_btn').trigger('click');}
			else
				jf_CloseSelf();
			//1050725	Kevin_C	1050087	升二代 -E
			break;
	}
}

function CallBack(argCallerId)
{}

function ClientOnLoad()
{
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//1050725	Kevin_C	1050087	升二代 -S
	// if (document.all["H_DownLoad"].value != "")
		// fnOnDownload();
	// document.all["H_DownLoad"].value = "";
	//1050725	Kevin_C	1050087	升二代 -E
}
//1050725	Kevin_C	1050087	升二代 -S
// function fnOnUpload()
// {
	// var soap = new ActiveXObject("WSWrapper.WebFileIO");
	// var index = document.all["dlWordType"].selectedIndex;
	// var H_Name = document.all["dlWordType"].options[index].value;
	////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
	////soap.Init(document.all["H_ServiceURL"].value);
	// var serviceURL = document.all["H_ServiceURL"].value ;
	// if ( document.all.II_USE_SSL != null )
	// {
		// if ( document.all.II_USE_SSL.value == "Y" )
			// serviceURL = serviceURL.replace("http://", "https://") ;
	// }
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	// try
	// {
		// soap.Init(serviceURL);
		
		// soap.AddFile(document.all["H_ServerPath"].value, H_Name, document.all["H_LocalPath"].value);
	////可以AddFile多筆
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	////try
	////{
		////0980918	David	0980455	使用WebFileIO時，應傳入Artifact
		////soap.Upload(jf_GetSessionID(), true);
		// soap.Upload(document.all["H_Artifact"].value, true);
	// }
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
	////catch(e){}
	// catch(e)
	// {
		// var strErrMsg = e.message;		
		// if (soap.hasError)
			// strErrMsg += soap.ErrorMessage;
		// alert("連接伺服器"+serviceURL+"上傳檔案至AP伺服器失敗，錯誤訊息為:"+strErrMsg);		
	// }
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
// }

// function fnOnDownload()
// {
	// var soap = new ActiveXObject("WSWrapper.WebFileIO");
	// var soapMgmt = new ActiveXObject("WSWrapper.WebFileIO");
	////1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
	////soap.Init(document.all["H_ServiceURL"].value);
	////soapMgmt.Init(document.all["H_ServiceURL"].value);
	// var serviceURL = document.all["H_ServiceURL"].value
	// if ( document.all.II_USE_SSL != null )
	// {
		// if ( document.all.II_USE_SSL.value == "Y" )
			// serviceURL = serviceURL.replace("http://", "https://") ;
	// }
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	// try
	// {
		// soap.Init(serviceURL);
		// soapMgmt.Init(serviceURL);
		
		// soap.AddFile(document.all["H_ServerPath"].value, document.all["H_Name"].value);
		// soapMgmt.AddFile(document.all["H_ServerPath"].value, "UserRsrcMgmt.XML");
		////可以AddFile多筆
		////0980918	David	0980455	使用WebFileIO時，應傳入Artifact
		////soap.Download(jf_GetSessionID(), false, document.all["H_LocalPath"].value);
		// soap.Download(document.all["H_Artifact"].value, false, document.all["H_LocalPath"].value);
		// var MgmtLocalPath = document.all["H_LocalPath"].value.replace("Dict\\","");
		
		////soapMgmt.Download(jf_GetSessionID(),true, MgmtLocalPath);
		// soapMgmt.Download(document.all["H_Artifact"].value,true, MgmtLocalPath);
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
	////1050127	Kevin_C	1050001	加上後括號避免程式出錯
	// }
	// catch(e)
	// {
		// var strErrMsg = e.message;		
		// if (soap.hasError)
			// strErrMsg += soap.ErrorMessage;
		// if (soapMgmt.hasError)
			// strErrMsg += soapMgmt.ErrorMessage;
		// alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);		
	// }
	////1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
// }
//1050725	Kevin_C	1050087	升二代 -E
function OnWSResult(argResult)
{}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050725	Kevin_C	1050087	升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
		bRtnbool = CheckBeforSave();
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	var strBuffer="";
	var iSeq;
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		for (var iCol=iRow+1;iCol<document.all["dg1"].rows.length+1;iCol++)
		{
			if (document.all["dg1__ctl"+iRow+"_txUsual"].value == document.all["dg1__ctl"+iCol+"_txUsual"].value)
			{
				bRtnbool = false;
				iSeq = iRow
				break;
			}
		}
		if (!bRtnbool)
			break;
	}
	if (!bRtnbool)
	{
		//1050725	Kevin_C	1050087	升二代
		//document.all["dg1__ctl"+iSeq+"_txUsual"].focus();
		$('#dg1__ctl'+iSeq+'_txUsual').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["常用詞不可重複"])),"");
	}
	else
	{
		//1050725	Kevin_C	1050087	升二代
		document.all["H_KeyWord"].value = "";
		for (var i=2;i<document.all["dg1"].rows.length+1;i++)
		{
			//1050725	Kevin_C	1050087	升二代
			if(document.all["dg1__ctl"+i+"_txUsual"].value == "")
				continue;
			document.all["H_KeyWord"].value += strBuffer + document.all["dg1__ctl"+i+"_txUsual"].value;
			strBuffer = "^";
		}
	}
	
	return bRtnbool;
}

function btRemoveClick()
{
	var len = document.all["dg1"].rows.length;
	var iCount=0;
	//若有勾選則將下一筆value寫入上一筆
	for (var iCheck=2;iCheck<len+1;iCheck++)
	{
		if (iCheck > iCheck-iCount)
			document.all["dg1__ctl"+(iCheck-iCount)+"_txUsual"].value = document.all["dg1__ctl"+iCheck+"_txUsual"].value;
		if (document.all["dg1__ctl"+iCheck+"_cb1"].checked)
			iCount++;
	}
	//清空CheckBox
	for (var iRow=2;iRow<document.all["dg1"].rows.length;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
			document.all["dg1__ctl"+iRow+"_cb1"].checked = false;
	}
	//剩下最後的iCount筆刪掉
	for (var iDel=1;iDel<=iCount;iDel++)
	{
		document.all["dg1"].deleteRow(len-iDel);
	}
}

function btInsertClick1()
{
	var InsertRow;
	var len;
	
	InsertRow = document.all["dg1"].insertRow();
	len = document.all["dg1"].rows.length;	//先Insert so長度已+1
	
	//1050725	Kevin_C	1050087	升二代 -S
	////ID整除==單數序
	//if (len % 2==0)
	//	InsertRow.style.backgroundColor = "#F7F7DE";
	////置中
	//InsertRow.style.textAlign = "Center";
	//1050725	Kevin_C	1050087	升二代 -E
	
	//選
	var cb1 = document.createElement("input");
	cb1.setAttribute("type","checkbox");
	cb1.setAttribute("id","dg1__ctl"+len+"_cb1");
	InsertRow.insertCell(0).appendChild(cb1);
	//序
	var lbNo = document.createElement("span");
	lbNo.setAttribute("id","dg1__ctl"+len+"_lbNo");
	//1050725	Kevin_C	1050087	升二代
	//lbNo.setAttribute("innerText",len-1);
	lbNo.textContent=len-1;
	InsertRow.insertCell(1).appendChild(lbNo);
	
	//常用詞彙	
	var txUsual = document.createElement("input");
	txUsual.setAttribute("type","text");
	txUsual.setAttribute("value",document.all["txWord"].value);
	txUsual.setAttribute("id","dg1__ctl"+len+"_txUsual");
	InsertRow.insertCell(2).appendChild(txUsual);
	//txUsual.style.width = "400px";
	txUsual.style.width = "25em";
}

/****************************************************************************************
	插入於序txSeq前
	1.先新增一筆在最後一個row
	2.把序之後的值往下移
	3.把txWord的值帶入序那一筆
*****************************************************************************************/
function btInsertClick2()
{
	var InsertRow;
	var iSeq;
	var len;
	
	InsertRow = document.all["dg1"].insertRow();
	iID = Number(document.all["txSeq"].value)+1;
	len = document.all["dg1"].rows.length;
	
	//1050725	Kevin_C	1050087	升二代 -S
	////ID整除==單數序
	//if (len % 2==0)
	//	InsertRow.style.backgroundColor = "#F7F7DE";
	////置中
	//InsertRow.style.textAlign = "Center";
	//1050725	Kevin_C	1050087	升二代 -E
	
	//row-選
	var cb1 = document.createElement("input");
	cb1.setAttribute("type","checkbox");
	cb1.setAttribute("id","dg1__ctl"+len+"_cb1");
	InsertRow.insertCell(0).appendChild(cb1);
	//row-序
	var lbNo = document.createElement("span");
	lbNo.setAttribute("id","dg1__ctl"+len+"_lbNo");
	//1050725	Kevin_C	1050087	升二代
	//lbNo.setAttribute("innerText",len-1);
	lbNo.textContent=len-1;
	InsertRow.insertCell(1).appendChild(lbNo);
	
	//row-常用詞彙	
	var txUsual = document.createElement("input");
	txUsual.setAttribute("type","text");
	txUsual.setAttribute("id","dg1__ctl"+len+"_txUsual");
	InsertRow.insertCell(2).appendChild(txUsual);
	//txUsual.style.width = "400px";
	txUsual.style.width = "25em";
	
	//往下移
	for (var iRow=Number(len)-1;iRow>=iID;iRow--)
	{
		document.all["dg1__ctl"+(iRow+1)+"_txUsual"].value = document.all["dg1__ctl"+iRow+"_txUsual"].value;
	}
	//帶入序該筆的值
	document.all["dg1__ctl"+iID+"_txUsual"].value = document.all["txWord"].value;
}

//1100725	Joe		1100648		新增匯入匯出功能--S
function ImportCsvFile(){
    if (document.all.csvImport.value != "") {
		Page_BlockSubmit = !window.confirm("匯入功能會取代目前已設定的詞庫資料，請問是否執行？");
		jf_ToolBarSubmit("btImport");
	}
}
//1100725	Joe		1100648		新增匯入匯出功能--E