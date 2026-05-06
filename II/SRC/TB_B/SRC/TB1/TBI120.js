/*
DATE 	SA		PRG		MGR_NO	DESC
0970317	Andy	Yvonne	001412	TBI100新增公告清單列印功能
1000418	David	David	1000280	新增排除代理人查閱
1010924	David	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
1020329	Kevin	Cloud	1020229	[港務公司]新增將多筆公告設為已讀的功能
1020506	Kevin	Cloud	1020377	修正公布清單列印功能異常的BUG
1031107	Cloud	-----	-------	4.5net觸發postback時會觸發ClientButtonControl，此時document.activetElement可能為null 會導致異常
1040612	Cloud	Kevin_C	1040278	多傳入參數決定升冪或降冪排序，增加隱藏欄位記錄是否為進階查詢，用ajax取得壓縮檔下載URL
1040624 Cloud  	Kevin_C 1040539 避免列印公布欄清單時，上次搜尋的欄位被修改
1050929 Cloud   Cloud   1051027 升級二代
1051019	Leslie	Joe		1050087	二代修改配合行動平台
1060516	Leslie  Zen		1060215	調整檔案下載行為
1100201	Leslie	Joe		1090927	取消使用document.activeElement
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
parent.fnServerHandle();

//紀錄Call WebService物件的id
var wsDuplicateID;
//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
//1050929 Cloud   Cloud   1051027 升級二代
//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//document.all.tbSelect2.onbuttonclick = jf_ToolBarHandle;

var oChildWindowIds="";
var txViewPage_index=6;
var txTotalPage_index=8;
//1020329	Cloud	1020229	[港務公司]新增將多筆公告設為已讀的功能
var strSep="";


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
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1031107	Cloud	-----	-------	4.5net觸發postback時會觸發ClientButtonControl，此時document.activetElement可能為null 會導致異常
	//1100202	Joe		1090927		二代已改用event.target
	// if(!document.activeElement)
		// return;
	//1051019	Joe		1050087		配合行動平台進行修正
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
	    //1050929   Cloud   升級二代
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
	    case "btDownLoad":
	        document.all["txSearchProc"].value = "DownLoad";
	        Page_BlockSubmit = !CheckCheckedItem();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btView":
	        ViewFirstDetail();
	        break;
	    case "btFirst":
	        ChangePage("First");
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btPreview":
	        ChangePage("Preview");
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btNext":
	        ChangePage("Next");
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btLast":
	        ChangePage("Last");
	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btChangePage":
	        fnPageNumOnChange();
	        break;
	    case "btTranToOD":
	        document.all["txSearchProc"].value = "TranToOD";
	        Page_BlockSubmit = !CheckCheckedItem();
	        jf_ToolBarSubmit(xObjectName);
	        break;
		case "btReLoad":
			//1051005	Cloud	[1050087]	升級二代
	    	//parent.location.reload();	//重新整理 by Shelly
			location.reload();
	        break;
	    case "btPrint":
	        Page_BlockSubmit = true;
	        for (var i = 0; i < document.getElementById("dlBulletinId").options.length; i++)
	            if (jf_Trim(document.getElementById("dlBulletinId").options[i].value) != "") {
	                Page_BlockSubmit = false;
	                break;
	            }
	        if (Page_BlockSubmit == true)
	            alert("畫面沒有任何公告，請先進行查詢");
	        document.all["txSearchProc"].value = "Print";

	        jf_ToolBarSubmit(xObjectName);
	        break;
	    case "btSetTbReaded":
	        document.all["txSearchProc"].value = "btSetTbReaded";
	        if (CheckCheckedItem()) {
	            if (window.confirm('是否確定將序' + strSep + '的公告設為已讀'))
	                Page_BlockSubmit = false;
	            else {
	                document.all["H_txBulletinIdList"].value = "";
	                Page_BlockSubmit = true;
	            }
	            jf_ToolBarSubmit(xObjectName);
	        }
	        else
	            Page_BlockSubmit = true;
	        break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
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
	
	xObjectName = window.event.srcNode.getAttribute("ID");
	alert(xObjectName);
    //1050929   Cloud   升級二代
	/*
	switch (xObjectName)
	{
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
		case "btDownLoad":
			document.all["txSearchProc"].value = "DownLoad";
			Page_BlockSubmit = !CheckCheckedItem();
			jf_SelectBarSubmit();
			break;
		case "btView":
			ViewFirstDetail();
			break;
		case "btFirst":
			ChangePage("First");
			jf_SelectBarSubmit();
			break;
		case "btPreview":
			ChangePage("Preview");
			jf_SelectBarSubmit();
			break;
		case "btNext":
			ChangePage("Next");
			jf_SelectBarSubmit();
			break;
		case "btLast":
			ChangePage("Last");
			jf_SelectBarSubmit();
			break;
		case "btChangePage":
			fnPageNumOnChange();
			break;
		case "btTranToOD":
			document.all["txSearchProc"].value = "TranToOD";
			Page_BlockSubmit = !CheckCheckedItem();
			jf_SelectBarSubmit();
			break;
		case "btReLoad":
			parent.location.reload();	//重新整理 by Shelly
			break;
		case "btPrint"://Yvonne	001412	TBI100新增公告清單列印功能
            //1040624   Kevin_C 1040539 避免列印公布欄清單時，上次搜尋的欄位被修改
		    //Page_BlockSubmit = !CheckBeforePrint();
			//1040702	Kevin_C	1040539	檢核畫面資料，0筆不可列印
		    Page_BlockSubmit = true;
		    for (var i = 0; i < document.getElementById("dlBulletinId").options.length; i++)
		        if (jf_Trim(document.getElementById("dlBulletinId").options[i].value) != "") {
		            Page_BlockSubmit = false;
		            break;
		        }
		    if (Page_BlockSubmit == true)
		        alert("畫面沒有任何公告，請先進行查詢");
		    document.all["txSearchProc"].value = "Print";

			jf_SelectBarSubmit();
			break;
		//1020329	Cloud	1020229	[港務公司]新增將多筆公告設為已讀的功能
		case "btSetTbReaded":
			document.all["txSearchProc"].value = "btSetTbReaded";
			if(CheckCheckedItem())
			{
				if(window.confirm('是否確定將序'+strSep+'的公告設為已讀'))
					Page_BlockSubmit = false;
				else
				{
					document.all["H_txBulletinIdList"].value = "";
					Page_BlockSubmit = true;
				}
				jf_SelectBarSubmit();	
			}
			else
				Page_BlockSubmit = true;
				
			break;
	}*/
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
		if(jf_IsWebServiceSuccess(CallWsObj))
		{
			//document.all["txKeyFld"].value = jf_Trim(CallWsObj.value.RtnStr);
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argBulletinId, argSeqNo)
{
	fnOpenBulletin(argBulletinId, argSeqNo);
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1000418 David 1000280 新增排除代理人查閱參數
//function fnSetData(argPasteDateStart, argPasteDateEnd, argDocNo, argBulletinId, argUnitCode, argCategory, argSubject, argRank ,argShowNoRead)
//1010924	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
//function fnSetData(argPasteDateStart, argPasteDateEnd, argDocNo, argBulletinId, argUnitCode, argCategory, argSubject, argRank ,argShowNoRead,argRemoveProxyRead)
//1040612	Kevin_C	1040278		多傳入參數決定升冪或降冪排序
//function fnSetData(argPasteDateStart, argPasteDateEnd, argDocNo, argBulletinId, argUnitCode, argCategory, argSubject, argRank ,argShowNoRead,argRemoveProxyRead,argAccount,argRpsDeptNo)
function fnSetData(argPasteDateStart, argPasteDateEnd, argDocNo, argBulletinId, argUnitCode, argCategory, argSubject, argRank ,argShowNoRead,argRemoveProxyRead,argAccount,argRpsDeptNo,argSortWay)
{
	document.all["txPasteDateStart"].value	= argPasteDateStart;
	document.all["txPasteDateEnd"].value	= argPasteDateEnd;
	document.all["txDocNo"].value			= argDocNo;
	document.all["txBulletinId"].value		= argBulletinId;
	document.all["txUnitCode"].value		= argUnitCode;
	document.all["txCategory"].value		= argCategory;
	document.all["txSubject"].value			= argSubject;
	document.all["txRank"].value		= argRank;
	document.all["txShowNoRead"].value	= argShowNoRead;
	//1000418 David 1000280 新增排除代理人查閱
	document.all["txRemoveProxyRead"].value	= argRemoveProxyRead;
	//1010924	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
	document.all["txAccount"].value			= argAccount;
	document.all["txRpsDeptNo"].value = argRpsDeptNo;
	//1040612	Kevin_C	1040278		增加隱藏欄位記錄是否為進階查詢
	document.all["txIsAdvanceSearch"].value = "";
	//1040612	Kevin_C	1040278		若argSortWay為undefined為簡易查詢
	if (!argSortWay) {
	    argSortWay = "";
	    document.all["txIsAdvanceSearch"].value = "N";
	}
	else
		document.all["txIsAdvanceSearch"].value = "Y";
	document.all["txSortWay"].value = argSortWay;
}

function fnSearch()
{
	//關密子視窗
	if (oChildWindowIds != "")
		oChildWindowIds.close();
	document.all["txSearchProc"].value = "PostBack";
	//PostBack
	IsServerHandling = true;
	jf_ShowWaitState();
	__doPostBack("txSearchProc","");
}

function fnSetSearchMode(argSearchMode)
{
	document.all["txSearchMode"].value = argSearchMode;
}

function fnSetPageCount(argPageCount)
{
	document.all["txPageCount"].value = argPageCount;
}
function fnSetShowNoRead(argSetShowNoRead)
{
	document.all["txShowNoRead"].value = argSetShowNoRead;
}

function fnPageNumOnChange()
{
    //1050929   Cloud   [1051027]   升級二代直接抓值
    //var oViewPage  = GetToolbarCtrl(txViewPage_index);
    //var iViewPage  = Number(oViewPage.getAttribute("value"));
    //var oTotalPage = GetToolbarCtrl(txTotalPage_index);
	//var iTotalPage = Number(oTotalPage.getAttribute("value"));
    var iViewPage = Number(document.all["txViewPage"].value);
    var iViewPage = Number(document.all["txTotalPage"].value);

	if (isNaN(iViewPage) || (iViewPage < 1) || (iViewPage > iTotalPage))
	{
	    //1050929   Cloud   [1051027]   升級二代
	    //oViewPage.focus();
	    document.all["txViewPage"].onfocus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您所輸入的頁數不正確，請重新輸入。"])),"");
		return;
	}
	fnChangePage();
}
//1050929   Cloud   [1051027]   升級二代 無用
/*function GetToolbarCtrl(argObjIndex)
{
	//alert(argObjIndex);
	return document.all.tbSelect.getItem(argObjIndex);
}*/

function fnChangePage()
{
	//原規劃btChangePage是textbox,此function提供它使用,但textbox無法抓住其事件,故此function仍保留(沒用jf_SelectBarSubmit())
	//觸發tbSelect物件中的button index,以下4個均可
	//btFirst_index		= 8
	//btPreview_index	= 9
	//btNext_index		= 10
    //btLast_index		= 11
    //
	//var button_index=10;
	//var o=document.all.tbSelect.getItem(button_index);
	//document.all.ToolBarSenderID.value = o.getAttribute("ID");
	document.all["txSearchProc"].value = "ChangePage";
	IsServerHandling = true;
	jf_ShowWaitState();
    //__doPostBack("tbSelect",button_index);
	jf_ToolBarSubmit("btChangePage");
}

function fnOpenBulletin(argBulletinId, argSeqNo)
{
	var BulletinNum = document.all["BulletinNum"].value;
	var PageCnt = document.all["PageCnt"].value;
    //1050929   Cloud   [1051027]   升級二代
	//var NowPage = Number(GetToolbarCtrl(txViewPage_index).getAttribute("value"));
    //var AllPage = Number(GetToolbarCtrl(txTotalPage_index).getAttribute("value"));
	var NowPage = Number(document.all["txViewPage"].value);
	var AllPage = Number(document.all["txTotalPage"].value)
	var BulletinNowNum = String(Number(PageCnt)*(NowPage-1) +Number(argSeqNo));
//	var argArtifact = parent.fnGetArtifact();

	var strParam = GetAllParamStr();
	if(strParam == "")
		strParam = "?";
	strUrl = "TBI130.htm" + strParam + "&rtnObj=lbReturnValue&BulletinId=" + argBulletinId + "&SeqNo=" + BulletinNowNum + "&BulletinNum=" + BulletinNum;
	var ret = jf_OpenChildWin(strUrl, "TBI130", 800, 600 );
	oChildWindowIds = ret;
}

function fnGetBulletinCount()
{
	
	if (document.all["dlBulletinId"] == null)
		return 0;
	return document.all["dlBulletinId"].options.length;
}

function fnGetBulletinId(index)
{
	//if (document.all["dlBulletinId"] == null)
	//	return "";
	return document.all["dlBulletinId"].options[index].value;
}

/********************************************************************************
*	下載功能鍵區
*	1.檢查是否勾選資料
*	2.將勾選之BULLETIN_ID放入隱藏欄位txBulletinId中
*	3.PostBack回Server觸發DownLoadProc()
********************************************************************************/
function CheckCheckedItem()
{
	if (document.all["dg1"] == null)
		return;

	//取出勾選的checkbox	
	var strChk="";
	var strBuf="";
	//1020329	Cloud	1020229	[港務公司]新增將多筆公告設為已讀的功能
	strSep=""
	for (var iRow=2;iRow<document.all["dg1"].rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
		{
			//1020329	Cloud	1020229	[港務公司]新增將多筆公告設為已讀的功能
			document.all["H_txBulletinIdList"].value += strBuf + document.all["dg1__ctl"+iRow+"_BulletinId"].value;//儲存ID
			/*strSep+= strBuf + document.all["dg1__ctl"+iRow+"_lbSEQ_NO"].innerText;
			strChk += strBuf + document.all["dg1__ctl"+iRow+"_H_BulletinId"].innerText		//BULLETIN_ID
						+ ":" + document.all["dg1__ctl"+iRow+"_H_SubDir"].innerText			//SUB_DIR
						+ ":" + document.all["dg1__ctl"+iRow+"_H_FileName"].innerText		//PDF_FILENAME
						+ "^" + document.all["dg1__ctl"+iRow+"_H_diFileName"].innerText		//DI_FILENAME
						+ "^" + document.all["dg1__ctl"+iRow+"_H_Attach"].innerText;		//ATTACH*/
		    //1050929   Cloud   [1051027]       升級二代
			strSep += strBuf + document.all["dg1__ctl" + iRow + "_lbSEQ_NO"].textContent;
			strChk += strBuf + document.all["dg1__ctl" + iRow + "_H_BulletinId"].textContent		//BULLETIN_ID
						+ ":" + document.all["dg1__ctl" + iRow + "_H_SubDir"].textContent			//SUB_DIR
						+ ":" + document.all["dg1__ctl" + iRow + "_H_FileName"].textContent		//PDF_FILENAME
						+ "^" + document.all["dg1__ctl" + iRow + "_H_diFileName"].textContent		//DI_FILENAME
						+ "^" + document.all["dg1__ctl" + iRow + "_H_Attach"].textContent;		//ATTACH
			strBuf = ",";
			
		}
	}

	//沒勾選不繼續以下
	if (strChk == "")
	{
		document.all["txBulletinId"].value = "";
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少勾選一筆資料。"])),"");
		return false;
	}
	document.all["txBulletinId"].value = strChk;
	
	return true;
}

/********************************************************************************
*	檢視原文功能鍵區
*	1.只開啟該頁中第一筆公告明細
********************************************************************************/
function ViewFirstDetail()
{
	if (document.all["dg1"] == null)
		return "";
	if (document.all["dg1"].rows.length == 1)
	    return "";
    //1050929   Cloud   [1051027]       升級二代
    //var strSeqNo = document.all["dg1__ctl2_lbSEQ_NO"].innerText;
	var strSeqNo = document.all["dg1__ctl2_lbSEQ_NO"].textContent;
	var strBulId = document.all["dg1__ctl2_BulletinId"].value;
	fnOpenBulletin(strBulId, strSeqNo);
}

//記錄目前真實的頁數
//1050929   Cloud   [1051027] 升級二代 直接從畫面抓取
//var iNowViewPage = Number(GetToolbarCtrl(txViewPage_index).getAttribute("value"));
var iNowViewPage = Number(document.all["txViewPage"].value);
/********************************************************************************
*	換頁功能鍵區
*	1.將目前頁數變更
*	2.PostBack回Server觸發ChangePageProc()
********************************************************************************/
function ChangePage(argType)
{
	switch (argType)
	{
	    case "First"://第一筆
	        //1050929   Cloud   [1051027] 升級二代 直接設定
	        //GetToolbarCtrl(txViewPage_index).setAttribute("value",1);
	        document.all["txViewPage"].value = "1";
			document.all["txSearchProc"].value = "First";
			fnChangePage();
			break;
		case "Preview"://上一筆
			if(iNowViewPage > 1)
			{
			    document.all["txSearchProc"].value = "Preview";
			    //1050929   Cloud   [1051027] 升級二代 直接設定
			    //GetToolbarCtrl(txViewPage_index).setAttribute("value",iNowViewPage-1);
			    document.all["txViewPage"].value = String(iNowViewPage-1);

			}
			fnChangePage();
			break;
	    case "Next"://下一筆
	        //1050929   Cloud   [1051027] 升級二代 直接設定
	        //var iTotalPage = Number(GetToolbarCtrl(txTotalPage_index).getAttribute("value"));
	        var iTotalPage = Number(document.all["txTotalPage"].value);
			if(iNowViewPage < iTotalPage)
			{
			    document.all["txSearchProc"].value = "Next";
			    //1050929   Cloud   [1051027] 升級二代 直接設定
			    //GetToolbarCtrl(txViewPage_index).setAttribute("value",iNowViewPage+1);
			    document.all["txViewPage"].value = String(iNowViewPage+1);
			}
			fnChangePage();
			break;
		case "Last"://最後一筆
		    document.all["txSearchProc"].value = "Last";
		    //1050929   Cloud   [1051027] 升級二代 直接設定
		    //var iTotalPage = Number(GetToolbarCtrl(txTotalPage_index).getAttribute("value"));
		    //GetToolbarCtrl(txViewPage_index).setAttribute("value",iTotalPage);
			document.all["txViewPage"].value = document.all["txTotalPage"].value;
			fnChangePage();
			break;
	}
}
//Yvonne	001412	TBI100新增公告清單列印功能
/********************************************************************************
*	列印功能鍵區
*	1.仿TBI110查詢前的檢查
*	2.PostBack回Server觸發btPrintProc()
********************************************************************************/
//1040624   Kevin_C 1040539 將用不到的Code拿掉
//function CheckBeforePrint()
//{
//	var ShowNoRead ="";
//	var RemoveProxyRead = "";
//	if(parent.TBI110.document.all["cbShowNoRead"])
//	{
//		ShowNoRead = parent.TBI110.document.all["cbShowNoRead"].checked;
//		//1000418 David 1000280 新增排除承辦人查閱
//		if(ShowNoRead)
//			RemoveProxyRead = parent.TBI110.document.all["cbRemoveProxyRead"].checked;
//	}
//	var strSateS		= jf_Trim(parent.TBI110.document.all.txDateS.value);
//	var strSateE		= jf_Trim(parent.TBI110.document.all.txDateE.value);
//	var strDocNo		= jf_Trim(parent.TBI110.document.all.txDocNo.value);
//	var strBulletinNo	= jf_Trim(parent.TBI110.document.all.txBulletinNo.value);
//	var strDeptNo		= "";
//	if (parent.TBI110.document.all.dlDept)
//		strDeptNo		= parent.TBI110.document.all.dlDept.options[parent.TBI110.document.all.dlDept.selectedIndex].value;
//	var strCategoryID	= parent.TBI110.document.all.dlCategory.options[parent.TBI110.document.all.dlCategory.selectedIndex].value;
//	var strSubject		= jf_Trim(parent.TBI110.document.all.txSubject.value);
//	//1010924	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
//	if (parent.TBI110.document.all.dlRpsDept)
//		var strRpsDeptNo		= parent.TBI110.document.all.dlRpsDept.options[parent.TBI110.document.all.dlRpsDept.selectedIndex].value;
//	var strAccount			= jf_Trim(parent.TBI110.document.all.txAccount.value);
			
//	if (strSateS + strSateE + strDocNo + strBulletinNo + strDeptNo + strSubject +strAccount != "")
//	{
//		//1000418 David 1000280 新增排除代理人查閱
//		//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead);
//		//1010924	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
//		//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead);
//		//1020506	Cloud	[1020377]	修正公布清單列印功能異常的BUG-修正傳入參數
//		//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
//		parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject,parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
//		parent.fnSearch();
//		document.all["txSearchProc"].value = "Print";
//		return true;
//	}
//	else
//	{
//		var bShowAlertMsg = true;
//		if(parent.TBI110.document.all["cbShowNoRead"])
//			if(parent.TBI110.document.all["cbShowNoRead"].checked)
//				bShowAlertMsg = false;
//			if(bShowAlertMsg)
//			{
//				//1010924	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
//				if(strRpsDeptNo+strAccount == "")
//				{		
//					alert("您所輸入的條件太少，請至少填入一個條件以加快查詢列印資料的速度。");
//					return false;
//				}
//				else
//				{
//					//1020506	Cloud	[1020377]	修正公布清單列印功能異常的BUG-修正傳入參數
//					//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
//					parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject,parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
//					parent.fnSearch();
//					document.all["txSearchProc"].value = "Print";
//					return true;
//				}
//			}
//			else
//			{
//				//允許查詢
//				//1000418 David 1000280 新增排除代理人查閱
//				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead);
//				//1010924	Cloud	1010533	[僑委會]進階查詢新增承辦人、承辦單位查詢條件，顯示資訊
//				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead);
//				//1020506	Cloud	[1020377]	修正公布清單列印功能異常的BUG-修正傳入參數
//				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
//				parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, parent.TBI110.document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
//				parent.fnSearch();
//				document.all["txSearchProc"].value = "Print";
//				return true;
//			}
//	}
//}
//1040612	Kevin_C	1040278		用ajax取得壓縮檔下載URL
function CallDownLoad(argBulletinId,argUserName, argOrgNo)
{
	//1060516 Zen 1060215 調整檔案下載行為
	//var rtn = TBI120.DownLoadZip(argBulletinId, argUserName, argOrgNo);
	var rtn = TB1.TBI120.DownLoadZip(argBulletinId, argUserName, argOrgNo);
    if (rtn.value.strErr != "")
        alert(rtn.value.strErr);
    else
        window.open(rtn.value.strZipURL)
}