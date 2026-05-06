/*
DATE	SA		PRG		MGR_NO	DESC
1010406 kevin	Ivory	1010127	新增EDR590 公文送達簽收簿列印作業 
1061005 kevin   Justin  1050087 二代公文修改
1070830 Kevin   Justin  1070678 弱掃AJAX修改
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
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
var strTableFields = new Array("_cbSelect","_lbSEQ_NO","_lbDocNo","_H_txDocNo","_lbSubject","_lbIssueDate");
//1061005 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
	
//document.all.txDocNo.onkeydown = jf_CheckEnterPress;	
//1070830 Justin [1070678]弱掃AJAX修改
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	if (jf_GetActionMode()==LayoutModeNew || document.all["H_CLeanRow"].value == "Y" )
		CleanAlldg();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061005 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btBatch":
			Page_BlockSubmit=true;
			strUrl = "EDI590.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EDI590", 700, 500 );
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061005 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1061005 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = false;
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(CheckDocNo() && GetDocList()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1061005 Justin [1050087] 二代公文修改
			//document.all["txBatchNo"].focus();
			$('#txBatchNo').focus();
			break;
		case "btPrint":
			Page_BlockSubmit = !BeforePrint();
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !BeforePrint();
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;
			if(document.all["dg1"] != null)
				jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			if(document.all["dg1"] != null)
				jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			if(document.all["dg1"] != null)
				jf_SelectClear("dg1", "_cbSelect");
			break;	
		case "btDeleteSelected":
			//Page_BlockSubmit = true;
			if(document.all["dg1"] != null)		
				Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
				//jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		    //1061005 Justin [1050087] 二代公文修改 
		    //jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;					
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
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
	if(argCallerId == "EDI590")
	{
		document.all["txBatchNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txBatchNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1061005 Justin [1050087] 二代公文修改
		//document.all["txBatchNo"].focus();
		$('#txBatchNo').focus();
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
//檢查是否按下Enter鍵,是則呼叫CheckDocNo()
//function jf_CheckEnterPress()
//{
//	if(event.keyCode == 13)
//		CheckDocNo();
//}

function BeforePrint()
{
	if( jf_Trim(document.all["txBatchNo"].value) == "" )
	{
		alert("批號不可為空\n");
		return false ;
	}
	return true ;
}
bHasCheck = false;
function CheckDocNo()
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	if (jf_GetActionMode()==LayoutModeNew)//新增模式不須檢核
		return true;
	else if ( jf_Trim(document.all["txDocNo"].value) == "" )
		return true;	
	var strBatchNo = jf_Trim(document.all["txBatchNo"].value);
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	var strOrgno = jf_Trim(document.all["H_SourceOrgno"].value);	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)//檢查文號是否已存在於dg
	{
	    //1061005 Justin [1050087] 二代公文修改 
	    //if(document.all["dg1__ctl" + i + "_lbDocNo"].innerText == strDocNo )
	    if (document.all["dg1__ctl" + i + "_lbDocNo"].textContent == strDocNo)
		{
			alert("公文文號: "+strDocNo+" 已存在於下方資料表\n");
			document.all["txDocNo"].value = "" ;
			bHasCheck = false;
			return false;
		}
	}
	var ArrDetail = new Array(7);
    //1070830 Justin [1070678]弱掃AJAX修改
	//ArrDetail = EDR590.GetBatchDetail(strOrgno, strDocNo).value;
	ArrDetail = ED5.EDR590.GetBatchDetail(strOrgno, strDocNo).value;
	if( ArrDetail[0] == "" )//公文文號為空(無資料)
	{
		alert("公文文號: "+strDocNo+" 尚未進行發文資料更新無法作業\n");
		document.all["txDocNo"].value = "" ;
		bHasCheck = false;		
		return false ;		
	}
	else if ( ArrDetail[6] != "" )//此公文有受文者不在各送達地點群組下
	{
		alert("公文文號: "+strDocNo+" 受文者: "+ArrDetail[6]+" 未列入各送達地點群組無法作業\n");
		document.all["txDocNo"].value = "" ;
		bHasCheck = false;		
		return false;			
	}
	else if( ArrDetail[4] != "" && ArrDetail[4] != strBatchNo )//與畫面批號不相同
	{
		alert("公文文號: "+strDocNo+" 已成批無法作業\n");
		document.all["txDocNo"].value = "" ;
		bHasCheck = false;			
		return false;	
	}
	else
	{		
		var len = document.all.dg1.rows.length;
		for (var iRow=2;iRow<len+1;iRow++)
		{
		    //1061005 Justin [1050087] 二代公文修改 
		    //var checkValue =jf_Trim(document.all["dg1__ctl"+iRow+"_lbDocNo"].innerText) ;
		    var checkValue = jf_Trim(document.all["dg1__ctl" + iRow + "_lbDocNo"].textContent);
			if( checkValue == "" )
			{	
				len = iRow-1;
				break;
			}
		}
		//判斷是否已無空的DataGrid可加入則使用新增Row方式 
		if( len == document.all.dg1.rows.length )
		{
			//新增一列
			var InsertRow = document.all["dg1"].insertRow();
			len =  document.all["dg1"].rows.length;
	
			//ID整除==單數序----幫datagrid上顏色
			if ((len-1) % 2 !=1)
				InsertRow.style.backgroundColor = "#E3C8FF";
			
			//選取
			var cbSelect = document.createElement("input");
			cbSelect.setAttribute("type","checkbox");
			cbSelect.setAttribute("id","dg1__ctl"+len+"_cbSelect");
			InsertRow.insertCell(0).appendChild(cbSelect);		
			cbSelect.style.textAlign = "Center";
			cbSelect.setAttribute("width", "14");
			cbSelect.setAttribute("align","middle");
			cbSelect.checked = true ;
								
			//序
			var lbSEQ_NO = document.createElement("span");
			lbSEQ_NO.setAttribute("id","dg1__ctl"+len+"_lbSEQ_NO");
		    //1061005 Justin [1050087] 二代公文修改 
		    //lbSEQ_NO.setAttribute("innerText",len-1);
			lbSEQ_NO.setAttribute("textContent", len - 1);
			InsertRow.insertCell(1).appendChild(lbSEQ_NO);
			lbSEQ_NO.style.fontFamily  = "細明體";
			lbSEQ_NO.style.fontSize    = "Small";			
			lbSEQ_NO.className ="InputFieldLabel";
			lbSEQ_NO.setAttribute("width", "22");			
			lbSEQ_NO.setAttribute("align","middle");
						
			var lbDocNo = document.createElement("span");
			lbDocNo.setAttribute("id","dg1__ctl"+len+"_lbDocNo");
		    //1061005 Justin [1050087] 二代公文修改 
		    //lbDocNo.setAttribute("innerText", ArrDetail[0]);
			lbDocNo.setAttribute("textContent", ArrDetail[0]);
			InsertRow.insertCell(2).appendChild(lbDocNo);
			lbDocNo.style.fontFamily  = "細明體";
			lbDocNo.style.fontSize    = "Small";
			lbDocNo.className ="InputFieldLabel";			
			lbDocNo.setAttribute("width", "54");
			
			var H_txDocNo = document.createElement("span");
			H_txDocNo.setAttribute("id","dg1__ctl"+len+"_H_txDocNo");
			H_txDocNo.setAttribute("value", ArrDetail[0]);		
			InsertRow.cells(2).appendChild(H_txDocNo);		
			
			var lbSubject = document.createElement("span");
			lbSubject.setAttribute("id","dg1__ctl"+len+"_lbSubject");
		    //1061005 Justin [1050087] 二代公文修改 
			//lbSubject.setAttribute("innerText", ArrDetail[1]);
			lbSubject.setAttribute("textContent", ArrDetail[1]);
			InsertRow.insertCell(3).appendChild(lbSubject);
			lbSubject.style.fontFamily  = "細明體";
			lbSubject.style.fontSize    = "Small";
			lbSubject.className ="InputFieldLabel";			
			lbSubject.setAttribute("width", "240");
		
			var lbIssueDate = document.createElement("span");
			lbIssueDate.setAttribute("id","dg1__ctl"+len+"_lbIssueDate");
		    //1061005 Justin [1050087] 二代公文修改 
			//lbIssueDate.setAttribute("innerText", ArrDetail[2].substring(0,3)+"/"+ArrDetail[2].substring(5,3)+"/"+ArrDetail[2].substring(7,5));
			lbIssueDate.setAttribute("textContent", ArrDetail[2].substring(0, 3) + "/" + ArrDetail[2].substring(5, 3) + "/" + ArrDetail[2].substring(7, 5));
			InsertRow.insertCell(4).appendChild(lbIssueDate);
			lbIssueDate.style.fontSize    = "Small";	
			lbIssueDate.className ="InputFieldLabel";					
			lbIssueDate.setAttribute("width", "34");
			lbIssueDate.setAttribute("align","middle");
		}
		else
		{
			//若DataGrid裡有值則直接加入
		    len++;
		    //1061005 Justin [1050087] 二代公文修改--S
			//document.all["dg1__ctl"+len+"_lbDocNo"].innerText = ArrDetail[0];
			document.all["dg1__ctl"+len+"_H_txDocNo"].value = ArrDetail[0];			
			//document.all["dg1__ctl"+len+"_lbSubject"].innerText = ArrDetail[1];
			//document.all["dg1__ctl" + len + "_lbIssueDate"].innerText = ArrDetail[2].substring(0, 3) + "/" + ArrDetail[2].substring(5, 3) + "/" + ArrDetail[2].substring(7, 5);
			document.all["dg1__ctl" + len + "_lbDocNo"].textContent = ArrDetail[0];
			document.all["dg1__ctl" + len + "_lbSubject"].textContent = ArrDetail[1];
			document.all["dg1__ctl" + len + "_lbIssueDate"].textContent = ArrDetail[2].substring(0, 3) + "/" + ArrDetail[2].substring(5, 3) + "/" + ArrDetail[2].substring(7, 5);
		    //1061005 Justin [1050087] 二代公文修改--E
		}
		document.all["txDocNo"].value = "" ;
	}
	bHasCheck = false;
	return true;
}			

function GetDocList()
{
	var len = document.all.dg1.rows.length;
	var split = "" ;
	for (var iRow=2;iRow<len+1;iRow++)
	{
	    //1061005 Justin [1050087] 二代公文修改--S
	    //var checkValue =jf_Trim(document.all["dg1__ctl"+iRow+"_lbDocNo"].innerText) ;
	    var checkValue = jf_Trim(document.all["dg1__ctl" + iRow + "_lbDocNo"].textContent);
		if( checkValue != "" )
		{
		    //1061005 Justin [1050087] 二代公文修改--S
		    //document.all["H_txDocList"].value += split + jf_Trim(document.all["dg1__ctl"+iRow+"_lbDocNo"].innerText) ;
		    document.all["H_txDocList"].value += split + jf_Trim(document.all["dg1__ctl" + iRow + "_lbDocNo"].textContent);
			split = "|" ;
		}
	}
	if( document.all["H_txDocList"].value == "" )
	{
		alert("請加入至少一筆公文\n");
		return false ;
	}
	return true ;	
}
function CleanAlldg()
{
	var rowCnt = document.all.dg1.rows.length;
	for(var i = rowCnt-1; i>0;i--)
	{
		document.all.dg1.deleteRow(i);
	}
}









