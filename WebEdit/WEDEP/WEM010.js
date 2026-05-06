/*
DATE	SA		PRG		MGR_NO	DESC
0970324 Stella	Leo		0970335	開啟時只能開啟非群組受文者，儲存時同一owner不可建立相同的受文者名稱
0980713 Stella	David	0980256	類別為公司行號時，顯示電子交換相關欄位
0980903 Stella	David	0980462	開啟時顯示群組資訊，並可由群組中新增、刪除
0980918 Stella	David	0980455	使用WebFileIO時，應傳入Artifact
1000905 David	David	1000678	海外單位才可預設使用海外發文
1011222	------	Cloud	1011052	修正海外發文方式判斷錯誤
1031112 Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1031121 Kevin   Kenny   1030836 配合SSL調整使用的網址協定
1040115 Cloud	Gabby	1030972	修正個人機關會蓋掉共用機關的問題
1040617	Leslie 	Gabby	1040324	增加WebFileIO錯誤訊息處理
1040728	David	Kevin_C	1040543	若是國合會，海外單位改成駐外單位
1050201	Cloud	Kevin_C	1041053	避免清除時隱藏欄位被清空
1050607	Cloud	Cloud	1050616	修正使用清除鍵後，子視窗查詢帶回無反應，且功能鈕皆無法使用情況
1050622	Cloud	Kenny	1050087 二代公文系統相關修改
1051031	Leslie	Joe		1050087	二代修改配合行動平台
1061018	Cloud	Kevin_C	1060915	修正GetOrgInfo傳入Session會出錯的問題
1070817 Kevin	Kevin_C 1070678 弱掃Hardcoded Absolute Path修正
1070830	Leslie	Kevin_C	1070678	因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
1080214	Kevin	Joe		1080179	弱掃修正Hardcoded Absolute Path
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
1110225	David	David	1101481	新增個人專區檢核邏輯
1120815	David	Joe		1120245	修正機關&群組名稱不可使用括弧的問題
1140828	Joe		Joe		--		自測修正僅針對維護介面進行Basic資料隱藏
1141110	David	David	1141112	海外發文支援外貿使用
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1070830	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
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
var wsGetEchoOrgName

//1050622	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050622	Kenny	[1050087]   二代公文系統相關修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

var CallerID = "";
//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	//0980903	David	0980462	點選dg2中查詢功能鍵
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btSearchGrp"));
	var HelpID = "dg2__ctl" + pNo + "_btSearchGrp";

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
		//0980903	David	0980462	點選dg2中查詢功能鍵時開啟WEM010C1
		case HelpID:
			Page_BlockSubmit=true;
			CallerID = pNo;
			var strUrl = "";
			var strOrgID  = document.all["H_Orgno"].value;
			var strDeptID = document.all["H_Dept"].value;
			var strOwnerID= document.all["H_Owner"].value;
			//1120525   Joe     1120126     機關檔架構調整
			//strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID="+strOrgID+"&DeptID="+strDeptID+"&UserID="+strOwnerID+"&K1=WEM020";
			//1140828	Joe		--			自測修正僅針對維護介面進行Basic資料隱藏
			// strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM010";
			strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM010Edit";
			//1050622	Kenny	[1050087]   二代公文系統相關修改，一併調整開啟視窗大小
			//jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 600 );
		break;
	}	
}

//1050622	Kenny	[1050087]   二代公文系統相關修改
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
/*	justin
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/
	//1050622	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	//1120525   Joe     1120126     機關檔架構調整
	/*
	var strOrgID = document.all["H_Orgno"].value;
	var strDeptID = document.all["H_Dept"].value;
	var strOwnerID = document.all["H_Owner"].value;
	//1050201	Kevin_C	1041053	記錄隱藏欄位 -S
	var strHasAuth = document.all["H_HasAuth"].value;
	var strServiceURL = document.all["H_ServiceURL"].value;
	var strReturnOwner = document.all["H_ReturnOwner"].value;
	var strHasOs = document.all["H_HasOs"].value;
	//1050201	Kevin_C	1041053	記錄隱藏欄位 -E
	*/
	var strHasOs = document.all["H_HasOs"].value;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050622	Kenny	[1050087]   二代公文系統相關修改
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
			//1050622	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050622	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050622	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//1050201	Kevin_C	1041053	避免隱藏欄位被清空 -S
			//jf_ConfirmClean();
			if(jf_ConfirmClean())
			{
				//1120525   Joe     1120126     機關檔架構調整
				/*
				document.all["H_Orgno"].value = strOrgID;
				document.all["H_Dept"].value = strDeptID;
				document.all["H_Owner"].value = strOwnerID;
				document.all["H_HasAuth"].value = strHasAuth;
				document.all["H_ServiceURL"].value = strServiceURL;
				document.all["H_ReturnOwner"].value = strReturnOwner;
				*/
				document.all["H_HasOs"].value = strHasOs;
			}
			//1050201	Kevin_C	1041053	避免隱藏欄位被清空 -E
			Cleandg2();//0980903	David	0980462	清除dg2
			document.all["dlOrgType"].selectedIndex = 0;
			document.all["dlElcType"].selectedIndex = 0;
			//1050622	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txOrgID"].focus();
			//1120525   Joe     1120126     機關檔架構調整
			//$('#txOrgID').focus();
			$('#txSYSIDMain').focus();
			break;
		case "btSearch":
			var strUrl = "";
			//1120525   Joe     1120126     機關檔架構調整
			Page_BlockSubmit = true;
			//strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID="+strOrgID+"&DeptID="+strDeptID+"&UserID="+strOwnerID+"&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			//1140828	Joe		--			自測修正僅針對維護介面進行Basic資料隱藏
			// strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM010Edit";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			//1050622	Kenny	[1050087]   二代公文系統相關修改，一併調整開啟視窗大小
			//jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 600 );
			break;
		case "btImport":
			Page_BlockSubmit = true;
			strUrl = "WEM010C2.aspx?rtnObj=lbReturnValue&OrgID="+strOrgID+"&DeptID="+strDeptID+"&UserID="+strOwnerID+"&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "WEM010C2", 700, 300 );
			break;
		case "btExport":
			var bExport = window.confirm("匯出資料範圍：\n確認：全部  取消：本筆");
			if (bExport)
				document.all.H_txExportRange.value = "all";
			else
				document.all.H_txExportRange.value = "one";
			Page_BlockSubmit = false;
			//1050622	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			IsServerHandling =false;
			for(var i=0;i<document.all.length;i++)
			{		
				document.all[i].style.cursor = "";
			}

			for(var i=0;i<document.all.tags("input").length;i++)
			{
				if(document.all.tags("input")[i].type == "text")
					document.all.tags("input")[i].readOnly = false;
			}
			window.status = "";
			break;
		case "btHelp":
			Page_BlockSubmit = true;
			strUrl = "Lib/WEM010_HELP.DOC";
			jf_OpenChildWin(strUrl, "WEM010HELP", 700, 500 );
			break;
	}
}

function CallBack(argCallerId)
{
	var RtnStr;
	var RtnArr;
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "WEM010C1")
	{
		RtnStr = document.all["lbReturnValue"].options[0].value;
		RtnArr = RtnStr.split('^');
		
		//0980903	David	0980462	修改WEM010C1回傳處理--Start
		if (CallerID == "")
		{
			//1120525   Joe     1120126     機關檔架構調整
			//document.all["txOrgID"].value = RtnArr[0];
			document.all["txSYSIDMain"].value = RtnArr[0];
			//document.all["H_ReturnOwner"].value = RtnArr[10];
			var OrgNo = RtnArr[10];
			if (OrgNo == "BASIC")
				document.all.H_WEM010C1OWNER.value = "BASIC";
			else if (OrgNo == document.all.H_UserInfoOrg.value)
				document.all.H_WEM010C1OWNER.value = "ORG";
			else
				document.all.H_WEM010C1OWNER.value = "USER";
			//問題單號：940569 修改人：FERDY 日期：950601 內容：具維護全機關資料權限不檢查目前角色與資料OWNER是否一致 區塊編號：05 END
			//1120525   Joe     1120126     機關檔架構調整
			/*
			if( document.all.H_HasAuth.value == "N" )
			{//alert(document.all.H_HasAuth.value);
				if (document.all["H_Owner"].value != document.all["H_ReturnOwner"].value)
					document.all["H_Answer"].value = window.confirm("您非此筆資料的擁有者，您要新增屬於您的該筆資料嗎?");
				else document.all["H_Answer"].value = "";
			}
			document.all["txOrgIDTxChange"].value = document.all["txOrgID"].value;
			*/
			//回傳值為鍵值時，觸動TextChange事件
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			//1050607	Cloud	[1050616]修正使用清除鍵後，子視窗查詢帶回無反應，且功能鈕皆無法使用情況
			Page_BlockSubmit = false;
			//1120525   Joe     1120126     機關檔架構調整
			//__doPostBack("","");//for .NET Framework 1.1
			jf_ToolBarSubmit("btOpen");
		}
		else
		{
			if(RtnArr[2] != document.all["H_Owner"].value)
				alert("您非此筆群組的擁有者，無法將機關資訊新增至此群組中。");
			else
			{
				var CheckDone = true;
				var GrpNo = RtnArr[0];
				for (var iRow = 2 ; iRow < document.all["dg2"].rows.length+1 ; iRow++)//檢核群組是否重複
				{
					var HadGrpNo = document.all["dg2__ctl"+iRow+"_txGrpNo"].value;
					if(GrpNo == HadGrpNo && CallerID != iRow)
					{
						CheckDone = false;
						if(document.all["dg2__ctl"+CallerID+"_txGrpName"].value == "")
							document.all["dg2__ctl"+CallerID+"_txGrpNo"].value = "";
						alert("群組代號["+GrpNo+"]已存在。");
						break;
					}
				}
				if(CheckDone)
				{
					document.all["dg2__ctl"+CallerID+"_txGrpNo"].value= RtnArr[0];
					document.all["dg2__ctl"+CallerID+"_txGrpName"].value = RtnArr[1];
					document.all["dg2__ctl"+CallerID+"_txSYSID"].value = RtnArr[14];
				}
			}
		}//End
	}	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	//1050622	Kenny	[1050087]   二代公文系統相關修改，取消無用code--Srat--
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("WEOrgInfo.asmx","GetEchoOrgName"  ,false,  null);
	//jf_CallWS("WEOrgInfo.asmx", "GetOrgInfo", false, null);//0980903	David	0980462	新增呼叫WS GetOrgInfo()
	//1050622	Kenny	[1050087]   二代公文系統相關修改，取消無用code--End--
	jf_ShowHide();
	ShowMsg();
    //1040728 Kevin_C 1040543 若是國合會，海外單位改成駐外單位
	//1141110 David 1141112 海外發文支援外貿使用，調整判斷
	//if (document.all["H_OrgNickName"].value == "ICDF")
	if(document.all["H_OrgNickName"].value == "ICDF" || document.all["H_OrgNickName"].value == "TAITRA")
	{
		//1050622	Kenny	[1050087]   二代公文系統相關修改
	    //document.all["lbOverSea"].innerText = "駐外單位：";
		document.all["lbOverSea"].textContent = "駐外單位：";
	}
}

function OnWSResult(argResult,pNo)
{
    //檢查回傳的webserverID
    if (argResult.id == wsGetEchoOrgName)
    {
		//0970424 Leo 取得webservice回傳資料，若有值代表機關名稱重覆。
		if(argResult.value.Count != 0)
		{
			var strEchoOrgName ="";
			var strComma = "";
			var ResVal = argResult.value;
			var OrgCount = ResVal.Count
			for(var idx=0 ; idx < OrgCount ; idx++)
			{
				strEchoOrgName += strComma + ResVal.OrgName[idx]
				strComma = ",";
			}
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["以下機關名稱已存在，請修正後再行儲存：\r\n\t"+strEchoOrgName])),"");
			return false;
		}
		else
		{
			return true;
		}
	}

	//0980903	David	0980462	新增呼叫WS GetOrgInfo()回傳處理--Start
	 if (argResult.id == wsGetOrgInfoID)
    {
		//檢查執行是否成功
		if(argResult.value.Count != 0)
		{
			if(argResult.value.IsGrp == true)//群組
			{
				if(argResult.value.OwnerID[0] == document.all["H_Owner"].value)//檢核擁有者
				{
					document.all["dg2__ctl"+pNo+"_txGrpNo"].value = document.all["dg2__ctl"+pNo+"_txGrpNo"].value.toUpperCase();
					document.all["dg2__ctl"+pNo+"_txGrpName"].value = argResult.value.OrgName[0];
					document.all["dg2__ctl"+pNo+"_txSYSID"].value = argResult.value.SysId[0];
				}
				else
				{
					document.all["dg2__ctl"+pNo+"_txGrpNo"].value = "";
					document.all["dg2__ctl"+pNo+"_txGrpName"].value = "";
					document.all["dg2__ctl"+pNo+"_txSYSID"].value = "";
					//1050622	Kenny	[1050087]   二代公文系統相關修改
					//document.all["dg2__ctl"+pNo+"_txGrpNo"].focus();
					$('#dg2__ctl'+pNo+'_txGrpNo').focus();
					alert("您非此筆群組的擁有者，無法將機關資訊新增至此群組中。");
				}
			}
			else//非群組
			{
				var OrgId = document.all["dg2__ctl"+pNo+"_txGrpNo"].value;
				document.all["dg2__ctl"+pNo+"_txGrpNo"].value = "";
				document.all["dg2__ctl"+pNo+"_txGrpName"].value = "";
				document.all["dg2__ctl"+pNo+"_txSYSID"].value = "";
				//1050622	Kenny	[1050087]   二代公文系統相關修改
				//document.all["dg2__ctl"+pNo+"_txGrpNo"].focus();
				$('#dg2__ctl'+pNo+'_txGrpNo').focus();
				alert("此代碼["+OrgId+"]之類別不為群組。");
			}
		}
		else
		{
			document.all["dg2__ctl"+pNo+"_txGrpNo"].value = "";
			document.all["dg2__ctl"+pNo+"_txGrpName"].value = "";
			document.all["dg2__ctl"+pNo+"_txSYSID"].value = "";
			//1050622	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dg2__ctl"+pNo+"_txGrpNo"].focus();
			$('#dg2__ctl'+pNo+'_txGrpNo').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此群組代碼"])),"");
		}
	}
	//End
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050622	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	//1040115 Gabby[1030972] 修正個人機關會蓋掉共用機關的問題
	var strSource = jf_Trim(document.all["H_Orgno"].value);
	//1120525   Joe     1120126     機關檔架構調整
	//var strOrgID = jf_Trim(document.all["txOrgID"].value);
	var strSYSID = jf_Trim(document.all["txSYSIDMain"].value);
	var strOwner  = jf_Trim(document.all["H_Owner"].value); 
	//1040115 Gabby[1030972]--END

	if (CheckBeforSave())
	{
		//1120525   Joe     1120126     機關檔架構調整
		//if (document.all["txOrgID"].value != "")
		if (document.all["txSYSIDMain"].value != "")
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				//1040115 Gabby[1030972] 修正個人機關會蓋掉共用機關的問題，修改CLIENT端檢核
				//if(jf_CheckDataExist(""))//檢查鍵值是否已存在
				//1070830	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
				//if(WEM010.ClientCheckKeyExist(strSource,strOwner,strOrgID).value)
				//1120525   Joe     1120126     機關檔架構調整
				//if(WebEditWs.WEM010.ClientCheckKeyExist(strSource,strOwner,strOrgID).value)
				if (WebEditWs.WEM010.ClientCheckKeyExist(strSource, strOwner, strSYSID).value)
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
		else
			bRtnbool = true;
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	if (document.all["dlElcType"].selectedIndex == 0)
	{
		if (document.all["txStdID"].value == "")
		{
			bRtnbool = false;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["電子交換狀況為使用中，機關代碼"])),"");
		}
	}
	//Cola
	//1000905 David 1000678 檢核改以VALUE判斷
	//if (document.all["dlIssueType"].selectedIndex == 4)
	if (document.all["dlIssueType"].options[document.all["dlIssueType"].options.selectedIndex].value == 4)
	{
		if (document.all["txMail"].value == "")
		{
			bRtnbool = false;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["發文方式為電子郵件，電子信箱"])),"");		
		}
	}

	//1000905 David 1000678 海外單位才可預設使用海外發文
	//1011222	------	Cloud	1011052	修正海外發文方式判斷錯誤
	//if(document.all["dlIssueType"].options[document.all["dlIssueType"].options.selectedIndex].value == "5" && 
	if(document.all["dlIssueType"].options[document.all["dlIssueType"].options.selectedIndex].value == "7" && 
		document.all["dlOverSea"].options[document.all["dlOverSea"].options.selectedIndex].value != "1")
	{
		bRtnbool = false;
		//1141110 David 1141112 海外發文支援外貿使用，調整文字
		//alert("海外單位才可預設使用海外發文方式！");
		let strOsIssueMsg = "海外單位才可預設使用海外發文方式！";
		if(document.all["H_OrgNickName"].value == "TAITRA")
			strOsIssueMsg = "駐外單位才可預設使用駐外下載發文方式！";

		alert(strOsIssueMsg);
	}

	//1110225 David 1101481 新增個人專區檢核邏輯
	if ($('#dlIssueType').find(":selected").val() == "9")
	{
		if($("#txInternalUnit").val() == "" && $("#txInternalAccount").val() == "")
		{
			bRtnbool = false;
			alert("預設發文方式使用個人專區需設定對應內部單位代碼或帳號");
		}
	}
	//1120815	Joe		1120245		修正機關&群組名稱不可使用括弧的問題
	if (document.all.txOrgName.value.indexOf("｜") != -1 || document.all.txOrgName.value.indexOf("|") != -1)
	{
		bRtnbool = false;
		alert("機關名稱不可使用|。");
	}

	//0970424 Leo 先檢核頁面上的資料，避免nickname重覆
	var OrgNameList = new Array();
	var wsCheckeList = new Array();
	OrgNameList.push("["+document.all.txOrgName.value+"]");
	wsCheckeList.push(document.all.txOrgName.value);
	var RowCount = document.all["dg1"].rows.length
	for (var iRow=2;iRow< RowCount;iRow++)
	{
		tmpName = "["+document.all["dg1__ctl"+iRow+"_txName"].value+"]";
		wstmpName = document.all["dg1__ctl"+iRow+"_txName"].value;
		if (tmpName  != "[]")
		{
			var strCheckString = OrgNameList.toString();
			if(strCheckString.indexOf(tmpName) != -1)
			{
				alert("第"+(iRow-1).toString()+"筆名稱重覆-"+tmpName);		
				return false;
			}
			OrgNameList.push(tmpName);
			wsCheckeList.push(wstmpName);
		}
	}
	//0970424 Leo 0970335 Call Webservice檢核機關名稱是否重覆
	var arWSParam = new Array(5);
	arWSParam[0] = document.all["H_Orgno"].value;
	arWSParam[1] = document.all["H_Dept"].value;
	arWSParam[2] = document.all["H_Owner"].value; 
	//1120525   Joe     1120126     機關檔架構調整
	//arWSParam[3] = jf_GetActionMode()==LayoutModeNew?"":document.all["txOrgID"].value;
	arWSParam[3] = jf_GetActionMode() == LayoutModeNew ? "" : document.all["txSYSIDMain"].value;
	arWSParam[4] = wsCheckeList;
	//1050622	Kenny	[1050087]   二代公文系統相關修改；不需session改叫用jf_CallW即可
	//var callObj = jf_CallWS("WEOrgInfo.asmx","GetEchoOrgName"  ,false,  arWSParam);
	var callObj = jf_CallW("WEOrgInfo.asmx","GetEchoOrgName"  ,false,  arWSParam);
	wsGetEchoOrgName = callObj.id;
	if(OnWSResult(callObj) == false)
	{
		bRtnbool = false;
	}
	
	//0980903	David	0980462	檢核群組是否有處理，避免輸入完直接點選儲存而未檢核
	if(!CheckTxGrpNo())
		bRtnbool = false;
	
	return bRtnbool;
}
//依類別設定特定欄位是否顯示
function jf_ShowHide()
{
	var pOrgType = document.all["dlOrgType"].options[document.all["dlOrgType"].selectedIndex].value;
	switch (pOrgType)
	{
		//機關或單位，顯示 tb2機關代碼 櫃號 tr3 聯絡人
		case "1":
		case "2":
		//0980713	David	0980256	類別為公司行號時，顯示電子交換相關欄位
		case "3":
			trAccount.style.display='none';
			//1050622	Kenny	[1050087]   二代公文系統相關修改；table display屬性設定為block的改直接給予空白值''避免套用css設定後畫面跑掉
			//tb2.style.display = 'block';
			tb2.style.display = '';
			tr3.style.display = 'block';
			/*
			document.all.lbMan.style.display = 'block';
			document.all.txMan.style.display = 'block';
			*/
			//0980713	David	0980256	類別為公司行號時，不顯示內部單位代碼欄位
			//if(pOrgType=='1')
			if(pOrgType=='1' || pOrgType == '3')
				trUnit.style.display='none';
			else
				trUnit.style.display='block';
			//0980713	David	0980256	類別為公司行號時，不顯示櫃號欄位
			if(pOrgType=='3')
			{
				tdlbCabinet.style.display = 'none';
				tdtxCabinet.style.display = 'none';
			}
			else
			{
				tdlbCabinet.style.display = 'block';
				tdtxCabinet.style.display = 'block';
			}
		break;
		//0980713	David	0980256	類別為公司行號時，顯示電子交換相關欄位
		//case "3"://公司
		case "5"://個人
			tb2.style.display = 'none';
			trUnit.style.display='none';
			document.all["dlElcType"].selectedIndex = -1;
			document.all["txCabinetNo"].value ="";
			if (pOrgType == "5")
			{
				trAccount.style.display='block';
				tr3.style.display = 'none';
				document.all["txMan"].value = "";
			}
			else
			{
				trAccount.style.display='none';
				tr3.style.display = 'block';
			}
		break;
	}
}

//上載檔案
//1080214	Joe		1080179		弱掃修正Hardcoded Absolute Path--S
/*
function jf_UploadFile()
{
	var bRtn = false;
	document.all.BF.Title = '請選取要匯入的檔案';
	document.all.BF.Filter = 'CSV(逗號分隔)(*.csv)|*.csv|文字檔(*.txt)|*.txt|所有類別(*.*)|*.*';
	if (document.all.BF.ShowDialog(0) != 0)
	{
		var pFileFullName = document.all.BF.path;
		var nFileIdx = pFileFullName.lastIndexOf('\\');
		var pFileDirName = pFileFullName.substring(0,nFileIdx);
		var pFileName = pFileFullName.substring(nFileIdx+1,pFileFullName.length);
		var pServerUrl = 'http://bob/WebFileIo/T2100FileIOService.asmx';
	    //1031121   Kenny   [1030836]   配合SSL調整使用的網址協定
		if (document.all.II_USE_SSL != null) {
		    if (document.all.II_USE_SSL.value == "Y")
		        pServerUrl = pServerUrl.replace("http://", "https://");
		}
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
		try
		{
			var soap = new ActiveXObject("WSWrapper.WebFileIO");
			soap.Init(pServerUrl);
			soap.AddFile('c:\\temp',pFileName,pFileDirName);
		//可以AddFile多筆
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
		//try
		//{
			//0980918	David	0980455	使用WebFileIO時，應傳入Artifact
			//soap.Upload('', true);
			soap.Upload(document.all["H_Artifact"].value, true);
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
			bRtn = true;
		}
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
		//catch(e){}
		catch(e)
		{
			ErrorMessage+=e.message;
			if (soap.hasError)
			{
				ErrorMessage +=soap.ErrorMessage;
				if (soapAttach.hasError)
					ErrorMessage +=soapAttach.ErrorMessage;	
			}
			alert("連接伺服器"+serviceURL+"上傳檔案發生錯誤："+ErrorMessage);			
		}
		//if (soap.hasError)
		//{
		//	ErrorMessage +=soap.ErrorMessage;
		//	if (soapAttach.hasError)
		//		ErrorMessage +=soapAttach.ErrorMessage;
		//	alert('上傳檔案發生錯誤：'+ErrorMessage);
		//}
		//else
			//bRtn = true;
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
	}
	return bRtn;
}
*/
//1080214	Joe		1080179		弱掃修正Hardcoded Absolute Path--E

//0980903	David	0980462	新增CheckGrpInfo函式，於txGrpNo欄位Onblur時呼叫
var wsGetOrgInfoID;//宣告webserver回傳值id
var CheckGrpInfoDone = false;
function CheckGrpInfo(argRow,argIsCheckDone)
{	
	if(CheckGrpInfoDone)
	{
		CheckGrpInfoDone = false;
		return true;
	}

	if(argIsCheckDone)
		CheckGrpInfoDone = true;
	
	var pNo = "";
	
	if(argRow == null)
	{
		var xObjectName = event.srcElement.id;
		pNo = xObjectName.substring(8,xObjectName.indexOf("_txGrpNo"));
	}
	else
		pNo = argRow;
		
	if(document.all["dg2__ctl"+pNo+"_txGrpNo"].value == '')
	{
		document.all["dg2__ctl"+pNo+"_txGrpName"].value = "";
		document.all["dg2__ctl"+pNo+"_txSYSID"].value = "";
		return true;
	}
	else
	{
		var GrpNo = document.all["dg2__ctl"+pNo+"_txGrpNo"].value.toUpperCase();
		for (var iRow = 2 ; iRow < document.all["dg2"].rows.length+1 ; iRow++)
		{
			var HadGrpNo = document.all["dg2__ctl"+iRow+"_txGrpNo"].value;
			if(GrpNo == HadGrpNo && pNo !=iRow)
			{
				document.all["dg2__ctl"+pNo+"_txGrpNo"].value = "";
				document.all["dg2__ctl"+pNo+"_txGrpName"].value = "";
				alert("群組代號["+GrpNo+"]已存在。");
				return false;
			}
		}
	}

	if(!IsServerHandling)
	{
		if (document.all["dg2__ctl"+pNo+"_txGrpNo"].value != "")
		{	
			Page_BlockSubmit=true;
			
			var arWSParam = new Array(4);
			arWSParam[0] = document.all["dg2__ctl"+pNo+"_txGrpNo"].value;
			arWSParam[1] = document.all["H_Orgno"].value;
			arWSParam[2] = document.all["H_Dept"].value;
			arWSParam[3] = document.all["H_Owner"].value;
			
			//1061018	Kevin_C	1060915	修正GetOrgInfo傳入Session會出錯的問題
			//callObj = jf_CallWS("WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			callObj = jf_CallW("WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			wsGetOrgInfoID = callObj.id;
			OnWSResult(callObj,pNo);
		}
	}
}
//0980903	David	0980462	清除dg2
function Cleandg2()
{
	for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
	{
		if (document.all["dg2__ctl"+iRow+"_txGrpName"].value != "")
		{
			document.all["dg2__ctl"+iRow+"_txGrpName"].value = "";
			document.all["dg2__ctl"+pNo+"_txSYSID"].value = "";
		}
	}
}
//0980903	David	0980462	執行各功能鍵前呼叫，避免未觸發onblur而造成資料錯誤
function CheckTxGrpNo()
{
	for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
	{
		if(document.all["dg2__ctl"+iRow+"_txGrpNo"].value != "" && document.all["dg2__ctl"+iRow+"_txGrpName"].value == "")
			return CheckGrpInfo(iRow,true);
		if(document.all["dg2__ctl"+iRow+"_txGrpNo"].value == "" && document.all["dg2__ctl"+iRow+"_txGrpName"].value != "")
			return CheckGrpInfo(iRow,true);
	}
	return true;
}