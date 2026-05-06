/*
DATE	SA		PRG		MGR_NO	DESC
1050608	CLOUD	Cloud	1050119	新增此程式
1050701	Cloud	Cloud	1050119	增加回傳機關代碼
1050727	Cloud	Cloud	1050087	升級二代
1050930	Cloud	Cloud	--				二代系統異常時，不適合直接throw 因為無法自行關閉子視窗，錯誤訊息改為跳出訊息且關閉視窗
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050727	Cloud 1050087	升級二代
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
	//jf_ShowValidator();
}

function ClientButtonControl()
{
	
}

function jf_ToolBarHandle()
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
	//1050727	Cloud 1050087	升級二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = true;
			IsServerHandling = true;
			//回寫受文者視窗
			WriteBack();
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			IsServerHandling = true;
			if (window.confirm("將不會進行任何修正，確定要離開本程式嗎？"))
			{
				//1050727	Cloud 1050087	升級二代-呼叫二代資訊關閉
				//window.close();
				var $dlg = parent.$("#WEM010C1_DIV");//找到母視窗關閉鈕位置
				var $btn = $dlg.find("a#differentDlg_close_btn");
				$btn.click();
			}
			//關閉視窗
			break;
		case "btUpdate":
			Page_BlockSubmit = false;
			IsServerHandling = true;
			if (window.confirm("將以選擇資訊更新資料庫，是否繼續執行？"))
			{
				document.all.H_txWorkMode.value = "btUpdate";
				__doPostBack("tbTool", "");
			}
			else
				Page_BlockSubmit = true;
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//1050930	Cloud	二代系統異常時，不適合直接throw 因為無法自行關閉子視窗，錯誤訊息改為跳出訊息且關閉視窗
	if (document.all["Err"] && document.all["Err"].value == "Y")
	{
		alert(document.all["ErrMsg"].value);
		var $dlg = parent.$("#WEM010C1_DIV");//找到母視窗關閉鈕位置
		var $btn = $dlg.find("a#differentDlg_close_btn");
		$btn.click();
	}

	if (!document.all["HasData"])//未讀入XML即進行讀取
	{
		var artifact = fnGetArtifact();
		//1050727	Cloud 1050087	升級二代-以二代方式取得
		//document.all.H_txLocalPath.value = fnGetMsg("WEM010C3_" + artifact, artifact);
		document.all.H_txLocalPath.value = parent.$("#WEM010C1_DIV").find("input#WEM010C3VALUE").val();//取得傳入值
		parent.$("#WEM010C1_DIV").find("input#WEM010C3VALUE").val("");//取得傳入值
		if (document.all.H_txLocalPath.value != "") {
			document.all.H_txWorkMode.value = "btOpen";
			__doPostBack("tbTool", "");
		}
	}
	else
	{
		if (document.all["HasData"].value == "N")//關閉視窗
		{
			alert('受文者資料與資料庫無差異，視窗即將關閉。');
			var $dlg = parent.$("#WEM010C1_DIV");//找到母視窗關閉鈕位置
			var $btn = $dlg.find("a#differentDlg_close_btn");
			$btn.click();

		}
	}
	
}

function jf_hideStatus()
{
	window.status = "";
	event.returnValue = true;
}
//使用SSO元件回傳資訊於不同Domain之程式
//無用mark
/*function fnGetMsg(argName, artifact)
{
	
	if (!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return "";
	}
	return document.all.IEControl.GetMsg(argName);

}*/
function jf_CheckRadioButton(argStartRow,argSeq)
{
	
	var tempvalue = argStartRow;
	//1050727 Cloud	1050087	生級二代
	//document.all["dg1__ctl" + argStartRow + "_txBselect"].innerText = "Y";//註記所選
	document.all["dg1__ctl" + argStartRow + "_txBselect"].value = "Y";//註記所選
	
	argStartRow = ++argStartRow;//從下一筆開始
	
	for (var i = argStartRow; i < document.all["dg1"].rows.length + 1; i++)//往下找
	{
		//1050727 Cloud	1050087	生級二代
		//if (document.all["dg1__ctl" + i + "_lbseq"].innerText == argSeq)
		if (document.all["dg1__ctl" + i + "_lbseq"].textContent == argSeq)
		{
			document.all["dg1__ctl" + i + "_rbselect"].checked = false;
			//1050727 Cloud	1050087	生級二代
			//document.all["dg1__ctl" + i + "_txBselect"].innerText = "";//移除所選
			document.all["dg1__ctl" + i + "_txBselect"].value = "";//移除所選
		}
		else//遇到不同就可以停了
			break;
	}
	argStartRow = --tempvalue;//從上一筆開始
	if (argStartRow == 1)//第一筆不往上找
		return;
	for (var i = argStartRow; i >= 2; i--)//往上找
	{
		//1050727 Cloud	1050087	生級二代
		//if (document.all["dg1__ctl" + i + "_lbseq"].innerText == argSeq)
		if (document.all["dg1__ctl" + i + "_lbseq"].textContent == argSeq)
		{
			document.all["dg1__ctl" + i + "_rbselect"].checked = false;
			//1050727 Cloud	1050087	生級二代
			//document.all["dg1__ctl" + i + "_txBselect"].innerText = "";//移除所選
			document.all["dg1__ctl" + i + "_txBselect"].value = "";//移除所選
		}
		else//遇到不同就可以停了
			break;
	}
}
//回寫視窗功能
function WriteBack()
{
	//將回寫資訊組串
	var strReturnValue = "";
	artifact = fnGetArtifact();
	for (var i = 2; i < document.all["dg1"].rows.length + 1; i++)//往下找
	{
		//if (document.all["dg1__ctl" + i + "_rbselect"].checked == true)
		if (document.all["dg1__ctl" + i + "_txBselect"].value == "Y")
		{
			if (strReturnValue != "")
				strReturnValue += "|";
			//序^發文方式^郵遞區號^地址^Email
			//1050727 Cloud	1050087	生級二代
			//strReturnValue += document.all["dg1__ctl" + i + "_lbseq"].innerText + "^"
			strReturnValue += document.all["dg1__ctl" + i + "_lbseq"].textContent + "^"
			+ ChangeType(document.all["dg1__ctl" + i + "_DLissuetype"].value) + "^"
			+ document.all["dg1__ctl" + i + "_txSpono"].value + "^"
			+ document.all["dg1__ctl" + i + "_txAddress"].value + "^"
			//1050701	Cloud	Cloud	1050119	增加回傳機關代碼;
			//+ document.all["dg1__ctl" + i + "_txEmail"].value
			+ document.all["dg1__ctl" + i + "_txEmail"].value + "^"
			+ document.all["dg1__ctl" + i + "_txStdid"].value;
		}
	}
	//1050727	Cloud 1050087	升級二代-以二代方式關閉
	//fnSetMsg("WEM010C3_" + artifact, strReturnValue, artifact);
	//window.close();
	parent.$("#WEM010C1_DIV").find("input#WEM010C3VALUE").val(strReturnValue);//設定回傳值
	var $dlg = parent.$("#WEM010C1_DIV");//找到母視窗關閉鈕位置
	var $btn = $dlg.find("a#differentDlg_close_btn");
	$btn.click();
}
function ChangeType(argType)
{
	var strIssueType = "";
	switch (argType)
	{
		case "1":
			strIssueType = "人工傳遞";
			break;
		case "2":
			strIssueType = "郵寄";
			break;
		case "3":
			strIssueType = "電子交換";
			break;
		case "4":
			strIssueType = "電子郵件";
			break;
		case "5":
			strIssueType = "內部公布欄";
			break;
		case "6":
			strIssueType = "外部公布欄";
			break;
		case "7":
			strIssueType = "海外";
			break;

	}
	return strIssueType;


}
function fnSetMsg(argName, argValue, artifact)
{
	if (!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return false;
	}
	document.all.IEControl.SetMsg(argName, argValue)
	return true;
}
function fnGetArtifact()
{
	var str = document.location.href;
	var Artifact = "";
	if (str.indexOf("?") != -1)
	{
		var arr = str.split("?");
		str = arr[arr.length - 1];
		var idx = str.indexOf("SAMLart=");
		if (idx == -1)
			return "";
		str = str.substring(idx, str.length).replace("SAMLart=", "");
		idx = str.indexOf("&");
		if (idx == -1)
			idx = str.length;
		str = str.substring(0, idx);
		Artifact = str;
	}
	return Artifact;
}



