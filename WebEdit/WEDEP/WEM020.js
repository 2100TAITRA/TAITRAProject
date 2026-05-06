
/*
DATE	SA		PRG		MGR_NO	DESC
0970324 Stella	Leo		0970335	開啟時只能開啟非群組受文者，儲存時同一owner不可建立相同的受文者名稱
1031112	Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050201	Cloud	Kevin_C	1041053	避免清除時隱藏欄位被清空
1050614	Cloud	Kenny	1050087 二代公文系統相關修改
1051031	Leslie	Joe		1050087	二代修改配合行動平台
1061018	Cloud	Kevin_C	1060915	修正GetOrgInfo傳入Session會出錯的問題
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
1111128 David	Joe     1110854 調整群組資料所屬處理方式
1120815	David	Joe		1120245	修正機關&群組名稱不可使用括弧的問題
1121201	Joe     Justin  1120904 修改：總發開啟群組匯入後，匯入結果為個人群組而非機關群組。
1131120 Joe     Jason   1130857 機關名稱顯示不全
1140828	Joe		Joe		--		自測修正僅針對維護介面進行Basic資料隱藏
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;
var wsGetEchoOrgName;

//1050614	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050614	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);

var CallerID = "";
//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btHelp"));
	var HelpID = "dg2__ctl" + pNo + "_btHelp";

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
/*justin
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/
	switch (xObjectName)
	{
		case HelpID:
			Page_BlockSubmit=true;
			CallerID = pNo;
			var strUrl = "";
			//1120529	Joe		1120126		機關檔架構調整
			/*
			var strOrgID  = document.all["H_Orgno"].value;
			var strDeptID = document.all["H_Dept"].value;
		    //1111128   Joe     1110854     調整群組資料所屬處理方式
			//var strOwnerID= document.all["H_Owner"].value;
			//strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&DeptID=" + strDeptID + "&UserID=" + strOwnerID + "&K1=WEM020Help";
			var strUserID = document.all["H_User"].value;
			strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&DeptID=" + strDeptID + "&UserID=" + strUserID + "&K1=WEM020Help";
			*/
			//1140828	Joe		--			自測修正僅針對維護介面進行Basic資料隱藏
			// strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM020Help";
			strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM020EditHelp";

			//1050614	Kenny	[1050087]   二代公文系統相關修改，一併調整開啟視窗大小
			//jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 600 );
			break;
	}	
}

//1050614	Kenny	[1050087]   二代公文系統相關修改
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
/*	JUSTIN
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/	
	//1050614	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	//1120525   Joe     1120126     機關檔架構調整
	/*
	var strOrgID = document.all["H_Orgno"].value;
	var strDeptID = document.all["H_Dept"].value;
	//1111128   Joe     1110854     調整群組資料所屬處理方式
	 var strOwnerID = document.all["H_Owner"].value;
	var strUserID = document.all["H_User"].value;
	//1050201	Kevin_C	1041053	避免隱藏欄位被清空
	var strIISystemMode = document.all["H_IISystemMode"].value;
	*/
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050614	Kenny	[1050087]   二代公文系統相關修改
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
			//1050614	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050614	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050614	Kenny	[1050087]   二代公文系統相關修改
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
				//1111128   Joe     1110854     調整群組資料所屬處理方式
				// document.all["H_Owner"].value = strOwnerID;
				document.all["H_User"].value = strUserID;
				document.all["H_IISystemMode"].value = strIISystemMode;
				*/
			}
			//1050201	Kevin_C	1041053	避免隱藏欄位被清空 -E
			CleanUI();
			//1050614	Kenny	[1050087]   二代公文系統相關修改
			//document.all["txOrgID"].focus();
			//1120529	Joe		1120126		機關檔架構調整
			//$('#txOrgID').focus();
			$('#txSYSID').focus();
			break;
		case "btSearch":
			//1120529	Joe		1120126		機關檔架構調整
			Page_BlockSubmit = true;
			CallerID = "";
			var strUrl = "";
			//1111128   Joe     1110854     調整群組資料所屬處理方式
			// strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID="+strOrgID+"&DeptID="+strDeptID+"&UserID="+strOwnerID+"&K1=WEM020";
			//1120529	Joe		1120126		機關檔架構調整
			//strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&DeptID=" + strDeptID +"&UserID="+strUserID+"&K1=WEM020";
			//1140828	Joe		--			自測修正僅針對維護介面進行Basic資料隱藏
			// strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM020";
			strUrl = "WEM010C1.aspx?rtnObj=lbReturnValue&K1=WEM020Edit";
			//1050614	Kenny	[1050087]   二代公文系統相關修改，一併調整開啟視窗大小
			//jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 600 );
			break;
		case "btImport":
			Page_BlockSubmit = true;
			//1111128   Joe     1110854     調整群組資料所屬處理方式
			// strUrl = "WEM020C1.aspx?rtnObj=lbReturnValue&OrgID="+strOrgID+"&DeptID="+strDeptID+"&UserID="+strOwnerID+"&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			strUrl = "WEM020C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&DeptID=" + strDeptID + "&Owner=" + strOwnerID + "&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			//1121201 Justin 1120904 修改：總發開啟群組匯入後，匯入結果為個人群組而非機關群組。
			//strUrl = "WEM020C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&DeptID=" + strDeptID + "&UserID=" + strUserID + "&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "WEM020C1", 700, 300 );
			break;
		case "btExport":
			var bExport = window.confirm("匯出資料範圍：\n確認：全部  取消：本筆");
			if (bExport)
				document.all.H_txExportRange.value = "all";
			else
				document.all.H_txExportRange.value = "one";
			Page_BlockSubmit = false;
			//1050614	Kenny	[1050087]   二代公文系統相關修改
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
			strUrl = "Lib/WEM020_HELP.DOC";
			jf_OpenChildWin(strUrl, "WEM020_HELP", 700, 500 );
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
		//群組
		if (CallerID == "")
		{
			//1120529	Joe		1120126		機關檔架構調整--S
			/*
			document.all["txOrgID"].value = RtnArr[0];
			document.all["H_ReturnOwner"].value = RtnArr[2];
			if (document.all["H_Owner"].value != document.all["H_ReturnOwner"].value)
				document.all["H_Answer"].value = window.confirm("您非此群組的擁有者，您要新增屬於您的該筆資料嗎?");
			else document.all["H_Answer"].value = "";
			document.all["txOrgIDTxChange"].value = document.all["txOrgID"].value;
			//回傳值為鍵值時，觸動TextChange事件
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			__doPostBack("","");//for .NET Framework 1.1	
			*/
			document.all["txSYSID"].value = RtnArr[0];
			var Owner = RtnArr[2];
			if (Owner == document.all.H_UserInfoOrg.value)
				document.all.H_WEM010C1OWNER.value = "ORG";
			else
				document.all.H_WEM010C1OWNER.value = "USER";
			IsServerHandling = true;
			Page_BlockSubmit = false;
			jf_ToolBarSubmit("btOpen");
			//1120529	Joe		1120126		機關檔架構調整--E
		}
		else
		{
			document.all["dg2__ctl" + CallerID + "_txOrgno"].value = RtnArr[0];
			//1131120     Jason   1130857     機關名稱顯示不全--將Textbox轉為Label
			//document.all["dg2__ctl"+CallerID+"_txName"].value = RtnArr[1];
			document.all["dg2__ctl" + CallerID + "_lbName"].textContent = RtnArr[1];
			//1121221	Joe		自測修正隱藏欄位需SYSID供明細使用
			document.all["dg2__ctl"+CallerID+"_txOrgSYSID"].value = RtnArr[0];
		}
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	//1050614	Kenny	[1050087]   二代公文系統相關修改，取消無用code
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//1050614	Kenny	[1050087]   二代公文系統相關修改，取消無用code
	//jf_CallWS("WEOrgInfo.asmx", "GetOrgInfo", false, null);
	//1120529	Joe		1120126		機關檔架構調整
	jf_ShowValidator();
}

function OnWSResult(argResult,pNo)
{
    //檢查回傳的webserverID
    if (argResult.id == wsGetOrgInfoID)
    {
		//檢查執行是否成功
		if(argResult.value.Count != 0)
		{
			//1131120     Jason   1130857     機關名稱顯示不全--將Textbox轉為Label
			//document.all["dg2__ctl"+pNo+"_txName"].value = argResult.value.OrgName[0];
			document.all["dg2__ctl" + pNo + "_lbName"].textContent = argResult.value.OrgName[0];
			//1120727	Joe		序58		修正另記SYSID供明細儲存用
			document.all["dg2__ctl"+pNo+"_txOrgSYSID"].value = argResult.value.SysId[0];
		}
		else
		{
			//1131120     Jason   1130857     機關名稱顯示不全--將Textbox轉為Label
			//document.all["dg2__ctl"+pNo+"_txName"].value = "";
			document.all["dg2__ctl" + pNo + "_lbName"].textContent = "";
			//1121221	Joe		自測修正未清空SYSID導致資料刪不掉
			document.all["dg2__ctl"+pNo+"_txOrgSYSID"].value = "";
			//1050614	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dg2__ctl"+pNo+"_txOrgno"].focus();
			//1061018 Kevin_C 1060915 避免無窮迴圈清除錯誤欄位
			var strMsg = document.all["dg2__ctl"+pNo+"_txOrgno"].value;
			document.all["dg2__ctl"+pNo+"_txOrgno"].value = "";
			$('#dg2__ctl'+pNo+'_txOrgno').focus();
			//1061018 Kevin_C 1060915 避免無窮迴圈清除錯誤欄位
			//jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此機關代碼"])),"");
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此機關代碼:" + strMsg])),"");
		}
	}
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
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050614	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if (CheckBeforSave())
	{
		//1120529	Joe		1120126		機關檔架構調整
		//if (document.all["txOrgID"].value != "")
		if (document.all["txSYSID"].value != "")
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
		else
			bRtnbool = true;
	}
	
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	if (document.all["txOrgName"].value == "")
	{
		bRtnbool = false;
		//1050614	Kenny	[1050087]   二代公文系統相關修改
		//document.all["txOrgName"].focus();
		$('#txOrgName').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["群組名稱"])),"");
	}
	//1120815	Joe		1120245		修正機關&群組名稱不可使用括弧的問題
	else if (document.all.txOrgName.value.indexOf("｜") != -1 || document.all.txOrgName.value.indexOf("|") != -1)
	{
		bRtnbool = false;
		alert("群組名稱不可使用|。");
	}
	
	//0970424 Leo 先檢核頁面上的資料，避免nickname重覆
	var OrgNameList = new Array();
	var wsCheckeList = new Array();
	OrgNameList.push("["+document.all.txOrgName.value+"]");
	wsCheckeList.push(document.all.txOrgName.value);
	var RowCount = document.all["dg1"].rows.length
	for (var iRow=2;iRow< RowCount;iRow++)
	{
		tmpName = "["+document.all["dg1__ctl"+iRow+"_txNickName"].value+"]";
		wstmpName = document.all["dg1__ctl"+iRow+"_txNickName"].value;
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
	//1120529	Joe		1120126		機關檔架構調整
	//arWSParam[3] = jf_GetActionMode()==LayoutModeNew?"":document.all["txOrgID"].value;
	arWSParam[3] = jf_GetActionMode() == LayoutModeNew ? "" : document.all["txSYSID"].value;
	arWSParam[4] = wsCheckeList;
	//1050614	Kenny	[1050087]   二代公文系統相關修改；不需session改叫用jf_CallW即可
	//var callObj = jf_CallWS("WEOrgInfo.asmx","GetEchoOrgName"  ,false,  arWSParam);
	var callObj = jf_CallW("WEOrgInfo.asmx","GetEchoOrgName"  ,false,  arWSParam);
	wsGetEchoOrgName = callObj.id;
	if(OnWSResult(callObj) == false)
	{
		bRtnbool = false;		
	}
	return bRtnbool;
}

function CleanUI()
{
	for (var iRow=2;iRow<document.all["dg2"].rows.length+1;iRow++)
	{
		//1131120     Jason   1130857     機關名稱顯示不全--將Textbox轉為Label
		//if (document.all["dg2__ctl"+iRow+"_txName"].value != "")
		//	document.all["dg2__ctl"+iRow+"_txName"].value = "";
		if (document.all["dg2__ctl" + iRow + "_lbName"].textContent != "")
			document.all["dg2__ctl" + iRow + "_lbName"].textContent = "";
	}
}

var wsGetOrgInfoID;//宣告webserver回傳值id
function CheckOrgInfo()
{
	var xObjectName = event.srcElement.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_txOrgno"));

	if (document.all["dg2__ctl"+pNo+"_txOrgno"].value == '')
	{
		//1131120     Jason   1130857     機關名稱顯示不全--將Textbox轉為Label
		//document.all["dg2__ctl"+pNo+"_txName"].value = "";
		document.all["dg2__ctl" + pNo + "_lbName"].textContent = "";
		//1121221	Joe		自測修正未清空SYSID導致資料刪不掉
		document.all["dg2__ctl"+pNo+"_txOrgSYSID"].value = "";
		return;
	}
	if (!IsServerHandling)
	{
		if (document.all["dg2__ctl"+pNo+"_txOrgno"].value != "")
		{	
			Page_BlockSubmit=true;
			
			var arWSParam = new Array(4);
			arWSParam[0] = document.all["dg2__ctl"+pNo+"_txOrgno"].value;
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