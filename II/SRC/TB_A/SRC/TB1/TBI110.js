/*	日期	SA		PG		單號		描述
	0961109	--		Matte	0960188		TBI100公佈欄連動畫面
	1000418	David	David	1000280		新增排除代理人查閱
	1010501	David	Cloud	1010322     日期欄位新增小日曆
	1010924	David	Cloud	1010533		[僑委會]搜尋條件，搜尋結果新增承辦單位承辦人
	1040612	Cloud	Kevin_C	1040278		多傳入參數決定升冪或降冪排序，增加更新按鈕
    1050929 Cloud   Cloud   1051027     升級二代  
	1051019	Leslie	Joe			1050087		二代修改配合行動平台
	1070803 Kevin   Justin	1070678		弱掃修正Client Cookies Inspection
	1071001	Leslie	Kevin_C	1070678		因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
	1130726	Leslie	Zen		序152		配合低解析度跑版調整欄位定位
	1131230 Zen     Jason   屏東序1223  修改按下清除按鈕回到預設值
	1140630 Zen		1140299		Daniel	新增查詢過期公文功能。
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
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
//紀錄Call WebService物件的id
//var wsDuplicateID;

//指定DataGrid欄位
//1050929   Cloud   [1051027]   升級二代
//var allCate = document.all["dg1__ctl" + 2 + "_hlCategory"].innerText;
var allCate = document.all["datagrid1__ctl" + 2 + "_hlCategory"].textContent;
if(allCate.substring(0,4) == "所有分類")
	document.all["datagrid1__ctl2_hlCategory"].className = "Bold";
//var strTableFields = new Array("_hlCategory");

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1000418 David 1000280 新增「排除代理人查詢」連動
	fnLinkRemoveProxy();
	//1040612	Kevin_C	1040278		預設降冪
	document.all.rbDESC.checked = true;

	//1130726 Zen 序152 配合低解析度跑版調整欄位定位
	document.body.style.overflowX = 'hidden';
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
	
	Page_BlockSubmit=true;
	switch (xObjectName)
	{
	    case "btSimple":
            //1050929   CLOUD   升級二代
			//document.all.divSimple.style.display = "";
	        //document.all.divAdvance.style.display = "none";
	        document.all.divSimple.className = "";
			document.all.divAdvance.className = "hide";
			//1140630	Daniel 1140299	隱藏"顯示過期公告"CheckBox;
			document.all.divAdvance2.className = "hide";
			document.all.txCount.focus();
			parent.fnSetSearchMode(1);
			//1131230 Jason   屏東序1223  新增判斷為簡易查詢或是進階查詢
			document.all.txIsAdvanceSearch.textContent = "N";
			break;
	    case "btAdvance":
	        //1050929   CLOUD   升級二代
			//document.all.divSimple.style.display = "none";
	        //document.all.divAdvance.style.display = "";
			document.all.divSimple.className = "hide";
	        document.all.divAdvance.className = "";
			//1140630	Daniel 1140299	顯示"顯示過期公告"CheckBox
	        document.all.divAdvance2.className = "";
			SetCondStatus();
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位
			//document.all.ImgbtSearch.focus();
			parent.fnSetSearchMode(2);
			//1131230 Jason   屏東序1223  新增判斷為簡易查詢或是進階查詢
			document.all.txIsAdvanceSearch.textContent = "Y";
			break;
		case "ImbtClear":
			document.all.txDateS.value = "";
			document.all.txDateE.value = "";
			document.all.txDocNo.value = "";
			document.all.txBulletinNo.value = "";
			document.all.txSubject.value = "";
			//1010924	David	Cloud	1010533		[僑委會]搜尋條件，搜尋結果新增承辦單位承辦人
			document.all.txAccount.value = "";
			document.all.txName.value = "";
			//1131230    Jason   屏東序1223  修改按下清除按鈕回到預設值
			document.all.dlDept.selectedIndex = 0;
			document.all.dlRpsDept.selectedIndex = 0;
			break;
		case "ImgbtSearch":
			var ShowNoRead ="";
			//1000418 David 1000280 新增排除代理人查閱
			var RemoveProxyRead = "";
			if(document.all["cbShowNoRead"])
			{
				ShowNoRead = document.all["cbShowNoRead"].checked;
				if(ShowNoRead)
					RemoveProxyRead = document.all["cbRemoveProxyRead"].checked;
			}
			var strSateS		= jf_Trim(document.all.txDateS.value);
			var strSateE		= jf_Trim(document.all.txDateE.value);
			var strDocNo		= jf_Trim(document.all.txDocNo.value);
			var strBulletinNo	= jf_Trim(document.all.txBulletinNo.value);
			var strDeptNo		= "";
			if (document.all.dlDept)
				strDeptNo		= document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
			var strCategoryID	= document.all.dlCategory.options[document.all.dlCategory.selectedIndex].value;
			var strSubject		= jf_Trim(document.all.txSubject.value);
			//1010924	Cloud	1010533		[僑委會]搜尋條件，新增承辦單位承辦人
			//1030829	Cloud	補上沒有選單時處理
			var strRpsDeptNo	= "";
			if (document.all.dlRpsDept)
				strRpsDeptNo		= document.all.dlRpsDept.options[document.all.dlRpsDept.selectedIndex].value;
			var strAccount			= jf_Trim(document.all.txAccount.value);
			//1040612	Kevin_C	1040278		從RadioButton決定升冪或降冪排序
			var strSortWay = "";
			if(document.all.dlRank.selectedIndex != 1)
			{
			    if (document.all.rbASC.checked)
					strSortWay = "ASC";
			    if (document.all.rbDESC.checked)
					strSortWay = "DESC";
			}
			//1140630	Daniel 1140299	新增查詢過期公文功能。
			var strSearchExpire = "";
			if (document.all.cbSearchExpire.checked)
				strSearchExpire="Y"
			else
				strSearchExpire="N"

			if (strSateS + strSateE + strDocNo + strBulletinNo + strDeptNo + strSubject+strAccount != "")
			{
				//1000418 David 1000280 新增排除代理人查閱
				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead);
				//1010924	Cloud	1010533		[僑委會]搜尋條件，新增承辦單位承辦人
				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead);
				//1040612	Kevin_C	1040278		多傳入參數決定升冪或降冪排序
				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
				//1140630	Daniel 1140299	新增查詢過期公文功能。
				//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo,strSortWay);
				parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex, ShowNoRead, RemoveProxyRead, strAccount, strRpsDeptNo, strSortWay, strSearchExpire);
				parent.fnSearch();
			}
			else
			{
				var bShowAlertMsg = true;
				if(document.all["cbShowNoRead"])
					if(document.all["cbShowNoRead"].checked)
						bShowAlertMsg = false;
				if(bShowAlertMsg)
				{
					//1010924	Cloud	1010533		[僑委會]搜尋條件，新增承辦單位承辦人
					//1030829	Cloud	增加條件
					//if(strRpsDeptNo+strAccount == "")
					if(strSateS+strSateE+strBulletinNo+strDeptNo+strCategoryID+strSubject+strRpsDeptNo+strAccount == "")
						alert("您所輸入的條件太少，請至少填入一個條件以加快查詢的速度。");
					else
						//1040612	Kevin_C	1040278		多傳入參數決定升冪或降冪排序
						//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
						//1140630	Daniel 1140299	新增查詢過期公文功能。
						//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo,strSortWay);
						parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex, ShowNoRead, RemoveProxyRead, strAccount, strRpsDeptNo, strSortWay, strSearchExpire);
						parent.fnSearch();
				}
				else
				{
					//允許查詢
					//1000418 David 1000280 新增排除代理人查閱
					//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead);
					//1010924	Cloud	1010533		[僑委會]搜尋條件，新增承辦單位承辦人
					//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead);
					//parent.fnSearch();
					//1040612	Kevin_C	1040278		多傳入參數決定升冪或降冪排序
					//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo);
					//1140630	Daniel 1140299	新增查詢過期公文功能。
					//parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex ,ShowNoRead,RemoveProxyRead,strAccount,strRpsDeptNo,strSortWay);
					parent.fnSetData(strSateS, strSateE, strDocNo, strBulletinNo, strDeptNo, strCategoryID, strSubject, document.all.dlRank.selectedIndex, ShowNoRead, RemoveProxyRead, strAccount, strRpsDeptNo, strSortWay, strSearchExpire);
					parent.fnSearch();
				}
			}
			break;
		//1010501	Cloud	1010322     日期欄位新增小日曆
		case "btDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		case "btDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;
		//1010924	Cloud	1010533		[僑委會]搜尋條件，搜尋結果新增承辦單位承辦人
		case "btAccount":
			Page_BlockSubmit = true;
			//var strUrl = "../../../II/IIC020.htm?SAMLart=" + document.all.SsoArtifact.value;
			//1051005	Cloud	[1050087]	升級二代
			//var strUrl = "../../../../IF/IF1/IFC020.htm?SAMLart=" + document.all.SsoArtifact.value;
			//fnOpen(strUrl,'450','360');
			jf_ShowOrgDialogForPersonTbi110();
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位
			$(window).trigger('resize');
			break;
		//1040612	Kevin_C	1040278		增加更新按鈕
	    case "btRefresh":
	        PageRefresh();
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
function ReturnValue(argOrgNo, argCategoryID)
{
	//1040612	Kevin_C	1040278		記錄目前狀態供更新按鈕使用
    document.all["h_LastClick"].value = argOrgNo + "|" + argCategoryID;
	var ShowNoRead ="";
	var RemoveProxyRead = "";
	if(document.all["cbShowNoRead"])
	{
		//1000418 David 1000280 新增排除代理人查閱
		ShowNoRead = document.all["cbShowNoRead"].checked;
		if(ShowNoRead)
			RemoveProxyRead = document.all["cbRemoveProxyRead"].checked;
	}
	if(IsServerHandling)
	   return;
	//1000418 David 1000280 新增「排除代理人查閱」條件
	//parent.fnSetData("", "", "", "", "", argCategoryID, "","",ShowNoRead);
	//1011001	Cloud	新增承辦人承辦單位條件
	//parent.fnSetData("", "", "", "", "", argCategoryID, "","",ShowNoRead,RemoveProxyRead);
	parent.fnSetData("", "", "", "", "", argCategoryID, "","",ShowNoRead,RemoveProxyRead,"","");
	parent.fnSearch();
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnSetPageCount()
{
	var obj = event.srcElement;
	var strCount = jf_Trim(obj.value);
	if (strCount == "" || strCount == "0" || parseInt(strCount,10) != strCount)
	{
		event.returnValue = "";
		alert("請輸入正確的數字。");
		obj.focus();
		return;
	}
	parent.fnSetPageCount(strCount);
}
function fnSetShowNoRead()
{
	//1000418 David 1000280 新增「排除代理人查詢」連動
	fnLinkRemoveProxy();
	
    //1000418 David 1000280 進階查詢中，點選「排除代理人查閱」或「只顯示未查閱公告」時，不要自動查詢
    //1050929   Cloud   [1051027]   升級二代
    //if(document.all.divAdvance.style.display == "")
	if (document.all.divAdvance.className == "")
		return;	

	var ShowNoRead =null;
	var RemoveProxyRead = "";
	if(document.all["cbShowNoRead"])
	{
		//1000418 David 1000280 新增排除代理人查閱
		ShowNoRead = document.all["cbShowNoRead"].checked;
		if(ShowNoRead)
			RemoveProxyRead = document.all["cbRemoveProxyRead"].checked;
	}
	
	//0960188	
	var argCategoryID	= document.all.dlCategory.options[0].value;
	//1000418 David 1000280 新增排除代理人查閱
	//parent.fnSetData("", "", "", "", "", argCategoryID, "","",ShowNoRead);
	//1010924	David	Cloud	1010533		[僑委會]搜尋條件，搜尋結果新增承辦單位承辦人
	//parent.fnSetData("", "", "", "", "", argCategoryID, "","",ShowNoRead,RemoveProxyRead);
	parent.fnSetData("", "", "", "", "", argCategoryID, "","",ShowNoRead,RemoveProxyRead,"","");
	
	parent.fnSearch();

	IsServerHandling = true;
	jf_ShowWaitState();
	__doPostBack("lbReturnValue","");
}
function fnServerHandle()
{
	IsServerHandling = false;
}

//日期onblur
function CheckCDATE(argObj,strMsg)
{
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
			jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
		}
	}
}

function SetCondStatus()
{
	if(document.all["ShowCondDate"])
	{
		if(document.all["ShowCondDate"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trDate1"].className = "";
			//document.all["trDate2"].className = "";
			document.all["trDate1"].className = "dTR";
			document.all["trDate2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	if(document.all["ShowCondDocNo"])
	{
		if(document.all["ShowCondDocNo"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trDocNo1"].className = "";
			//document.all["trDocNo2"].className = "";
			document.all["trDocNo1"].className = "dTR";
			document.all["trDocNo2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	if(document.all["ShowCondBulletinNo"])
	{
		if(document.all["ShowCondBulletinNo"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trBulletinNo1"].className = "";
			//document.all["trBulletinNo2"].className = "";
			document.all["trBulletinNo1"].className = "dTR";
			document.all["trBulletinNo2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	if(document.all["ShowCondDept"])
	{
		if(document.all["ShowCondDept"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trDept1"].className = "";
			//document.all["trDept2"].className = "";
			document.all["trDept1"].className = "dTR";
			document.all["trDept2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	if(document.all["ShowCondCategory"])
	{
		if(document.all["ShowCondCategory"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trCategory1"].className = "";
			//document.all["trCategory2"].className = "";
			document.all["trCategory1"].className = "dTR";
			document.all["trCategory2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	if(document.all["ShowCondSubject"])
	{
		if(document.all["ShowCondSubject"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trSubject1"].className = "";
			//document.all["trSubject2"].className = "";
			document.all["trSubject1"].className = "dTR";
			document.all["trSubject2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	//1010924	Cloud	1010533		[僑委會]搜尋條件，新增承辦單位承辦人
	if(document.all["ShowCondAccount"])
	{
		if(document.all["ShowCondAccount"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trAccount1"].className = "";
			//document.all["trAccount2"].className = "";
			document.all["trAccount1"].className = "dTR";
			document.all["trAccount2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
	if(document.all["ShowCondRpsDept"])
	{
		if(document.all["ShowCondRpsDept"].value == "Y")
		{
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--begin
			//document.all["trRpsDept1"].className = "";
			//document.all["trRpsDept2"].className = "";
			document.all["trRpsDept1"].className = "dTR";
			document.all["trRpsDept2"].className = "dTR";
			//1130726 Zen 序152 配合低解析度跑版調整欄位定位--end
		}
	}
}

//1000418 David 1000280 新增「排除代理人查詢」連動處理
function fnLinkRemoveProxy()
{
	if(document.all["cbShowNoRead"])
	{
		if(document.all["cbShowNoRead"].checked)
			document.all["cbRemoveProxyRead"].disabled = false;
		else
		{
			document.all["cbRemoveProxyRead"].disabled = true;
			document.all["cbRemoveProxyRead"].checked = false;
		}
	}
}
//1010924	Cloud	1010533		新增承辦人帳號查詢子視窗
function fnOpen(argUrl,argW,argH)
{
	var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
	//var ret = window.showModalDialog(argUrl, "", sFeatures);
	if(ret != null)
	{
		var value = ret.split('|');
		document.all.txAccount.value = value[0];
		document.all.txName.value = value[1];
	}
}
//1010924	Cloud	1010533		[僑委會]搜尋條件，搜尋結果新增承辦單位承辦人
function txAccount_OnBlur()
{
	var Account = document.all.txAccount.value;
	if(Account != "")
	{
		//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
		//var UserObj = TBI110.CheckAccount(document.all.SsoArtifact.value,Account).value;
		var UserObj = TB1.TBI110.CheckAccount(document.all.SsoArtifact.value,Account).value;
		
		if(!UserObj)
		{
			document.all.txAccount.value = "";
			document.all.txName.value = "";
			alert("此帳號不存在");
		}
		else
		{
			document.all.txAccount.value = UserObj[0];
			document.all.txName.value = UserObj[1];
		}
	}
	else
		document.all.txName.value = "";
}
//1040612	Kevin_C	1040278		更新按鈕函式，分為簡易查詢及進階查詢
function PageRefresh()
{
    //1040612	Kevin_C	1040278		簡易查詢
    //1050929   Cloud   [1051027] 升級二代
    //if (document.all["h_LastClick"].value != "" && document.all.divAdvance.style.display != "") {
    if (document.all["h_LastClick"].value != "" && document.all.divAdvance.className != "") {
        strTemp = document.all["h_LastClick"].value.split("|");
        strOrgNo = strTemp[0];
        strCategoryID = strTemp[1];
        ReturnValue(strOrgNo, strCategoryID);
    }
    //1040612	Kevin_C	1040278		ㄧ開啟就更新的情況
    //1050929   Cloud   [1051027] 升級二代
    //else if(document.all.divAdvance.style.display != "")
    else if (document.all.divAdvance.className != "")
	{
		ReturnValue("", "");
	}
	//1040612	Kevin_C	1040278		進階查詢
    else {
		//1100201	Joe		1090927		取消使用document.activeElement
        // document.activeElement.id = "ImgbtSearch";
        // ClientButtonControl();
        event.target.id = "ImgbtSearch";
        ClientButtonControl(event);
    }
}
//1040612	Kevin_C	1040278		若排序選單沒選擇日期時，Disable升降冪按鈕
function dlRankChange()
{
    if(document.all.dlRank.selectedIndex == 1)
    {
        document.all.rbASC.disabled = true;
        document.all.rbDESC.disabled = true;
    }
    else
    {
        document.all.rbASC.disabled = false;
        document.all.rbDESC.disabled = false;
    }
}
//1051005	Cloud	[1050087] 升級二代
function CallBack(argCallerId)
{
	if (argCallerId == "IFC021")
	{
		document.all.txName.value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all.txAccount.value = jf_Trim(document.all.lbReturnValue.options[0].value);
	}
}
//1051005	Cloud	升級二代-因tbi110視窗較小，使用共用函式開啟顯示會異常調整自行開啟
function jf_ShowOrgDialogForPersonTbi110()
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	jf_ShowOrgDialogByLevelTbi110("0", arrSelectType);
}
/// <summary>
/// argParam等於0時(預設)，顯示機關,單位,角色與扮演人員
/// argParam等於1時，顯示機關,單位與放置在機關單位底下的AD帳號物件
/// argSelectType is a string array, the element may be: Org, Unit, Role or Account
///  so, it means user can select Org, Unit, Role and Account
/// <summary>
function jf_ShowOrgDialogByLevelTbi110(argParam, argSelectType)
{
	var sSelectType = "";
	for (var i = 0; i < argSelectType.length; i++)
	{
		if (i != 0)
			sSelectType += ",";
		//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--S
        //sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
	}
	//jf_SaveCookie("iic021StrctureType", argParam);
	//jf_SaveCookie("iic021SelectType", sSelectType);
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--E
	var artifact = document.all.SsoArtifact.value;
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection
	//openDlgTbi110("../../../IF/IF1/IFC021.htm?SAMLart=" + artifact); //回傳值：CInfo
	openDlgTbi110("../../../IF/IF1/IFC021.htm?SAMLart=" + artifact + "&iic021SelectType=" + sSelectType);
}
function openDlgTbi110(url)
{
	var $dlg = $("#dlgASPXPage").clone(true);
	/* 按下[關閉]鍵 */
	$dlg.find('a.closeBtn').click(function ()
	{
		$.modal.close();
	});

	/*var w = window.innerWidth - 80,
		h = window.innerHeight - 130;

	if (argWidth != undefined)
		w = argWidth;

	if (argHeight != undefined)
		h = argHeight;

	if (h > (w * 0.75))	//避免超出畫面
		h = h * 0.75 - 80;*/

	$.modal($dlg,
			{
				appendTo: $('body'),
				overlayCss: { height: 600, width: 270 },
				minWidth: 270,
				minHeight: 600
			});

	$dlg.trigger('create');

	var $frame = $dlg.find('iframe.aspx_page_content');
	if ($frame.length)
	{
		var urlWithParam = '';
		/*if (url.toLowerCase().lastIndexOf("workpath") != -1 && url.length)
		{
			urlWithParam = url;
			$frame[0].src = urlWithParam;
			if (artifact == '1')
			{
				$($frame[0]).load(function ()
				{
					$frame[0].contentWindow.print();
				});
			}
			else
			{
				if (type != 'PortableDocFormat')
				{
					$($frame[0]).load(function ()
					{
						$.modal.close();
					})
				}
			}
		}
		else if (!!artifact && artifact.length > 2 && url.length)
		{
			urlWithParam = url + '&SAMLart=' + artifact;
			$frame[0].src = urlWithParam;
		}
		else
		{
			$frame[0].src = url;
		}*/
		$frame[0].src = url;
	}
	$('#simplemodal-container').css("left", '-5');
	$('#simplemodal-container').width('240');
}
