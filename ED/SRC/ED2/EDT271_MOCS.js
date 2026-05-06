/*
DATE	SA		PRG		MGR_NO		DESC
1111130	David	David	1110881		新增程式
1120213	David	David	-------		(需求序13、彙整表序116)勾選「續辦」時，連動「選」一併勾選
1120406	David	David	-------		(彙整表序206(銓敘部需求序8))新增「重取」功能
1120407	David	David	-------		(彙整表序207(銓敘部需求序2))新增「設定傳送流程」功能
1120414	David	David	-------		(彙整表序226(銓敘部需求序14))送發前檢核公文是否有稿件
1120417	David	David	-------		(銓敘部問題彙整表序236(現場序105))新增判斷核決者選項是不需異動、取消核決還是設定核決者
1120428	David	David	-------		(銓敘部問題彙整表序266(現場上線需求彙整表序15))移除既有的排序條件選項
1130124	David	Zen		1130022		調整強制簽收子視窗大小
1130417	David	David	1130055		新增可設定預排流程功能
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	cbSelectOnClick();

	//1120217 David 承辦人使用時隱藏傳送對象
	if(document.all.ddlSubFolder.value == "主辦")
		document.all.trTranser.className = 'hide';
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	{
		Page_BlockSubmit=true;
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	{
		Page_BlockSubmit=true;
		return;
	}

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSubFolder":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		//1120406 David 新增「重取」功能鍵
		case "btSearch":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSet":
			Page_BlockSubmit = true;
			if(document.all.CheckSendCount.textContent != "0")
			{
				document.all["txRtnAppUserId"].value = "";
				document.all["txRtnAppRoleId"].value = "";
				document.all["txRtnAppName"].value = "";
				document.all["txRtnApprovedTime"].value = "";
				document.all["txRtnIssueType"].value = "";
				document.all["txRtnStoreType"].value = "";
				document.all["txRtnFileCnt"].value = "";
				document.all["txRtnFileUnit"].value = "";

				strUrl = "EDT271C1_MOCS.aspx?rtnObj=lbReturnValue";
				jf_OpenChildWin(strUrl, "EDT271_MOCSC1", 800, 600);
			}
			else
				alert("請先勾選要設定的公文");
			break;
		case "btTransfer":
			Page_BlockSubmit = true;
			if(CheckBeforeTransfer())
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btSetTransfer":
			Page_BlockSubmit = true;
			if(document.all.CheckSendCount.textContent != "0")
			{
				strUrl = "EDT271C3_MOCS.aspx?rtnObj=lbReturnValue";
				jf_OpenChildWin(strUrl, "EDT271_MOCSC3", 800, 600);
			}
			else
				alert("請先勾選要設定的公文");
			break;
		case "btForceRcv":
			Page_BlockSubmit = true;
			strUrl = "EDT271C2_MOCS.aspx?rtnObj=lbReturnValue";
			//1130124 Zen 1130022 調整強制簽收子視窗大小
			//jf_OpenChildWin(strUrl, "EDT271_MOCSC2", 800, 600);
			OpenChildWin(strUrl, "EDT271_MOCSC2", 400, 250);
			break;
		case "btUpdateTAType":
			Page_BlockSubmit = true;
			if(document.all.CheckSendCount.textContent != "0")
			{
				let arrErrDoc = [];
				for (var i = 2; i <= document.all.dg1.rows.length; i++)
				{
					let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

					if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
						continue;

					if (document.all["dg1__ctl" + i + "_hPtyNo"].value != $('#TADocProperty').val())
						arrErrDoc.push(strDocNo);
				}

				if(arrErrDoc.length > 0)
				{
					alert("文號" + arrErrDoc.join("、") + "非任審案，不需校正。");
					return;
				}

				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			else
				alert("請先勾選要校正的公文");
			break;
		case "btChangeTA":
			Page_BlockSubmit = true;
			if(document.all.CheckSendCount.textContent != "0")
			{
				let strErrMsg = "";
				let arrErrPtyDoc = [];
				let arrApproved = [];
				for (var i = 2; i <= document.all.dg1.rows.length; i++)
				{
					let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

					if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
						continue;

					if (document.all["dg1__ctl" + i + "_hPtyNo"].value == $('#TADocProperty').val())
						arrErrPtyDoc.push(strDocNo);
					if (document.all["dg1__ctl" + i + "_lbdgAppUsername"].textContent != "")
						arrApproved.push(strDocNo);
				}

				if(arrErrPtyDoc.length > 0)
					strErrMsg += "文號" + arrErrPtyDoc.join("、") + "已是任審案，不需轉換。\n";
				if(arrApproved.length > 0)
					strErrMsg += "文號" + arrApproved.join("、") + "已核決，不可轉換。\n";

				if(strErrMsg != "")
					alert(strErrMsg);
				else
				{
					Page_BlockSubmit = false;
					jf_ToolBarSubmit(xObjectName);
				}
			}
			else
				alert("請先勾選要轉換的公文");
			break;
		case "btChangeNormal":
			Page_BlockSubmit = true;
			if(document.all.CheckSendCount.textContent != "0")
			{
				let strErrMsg = "";
				let arrErrPtyDoc = [];
				let arrApproved = [];
				for (var i = 2; i <= document.all.dg1.rows.length; i++)
				{
					let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

					if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
						continue;

					if (document.all["dg1__ctl" + i + "_hPtyNo"].value != $('#TADocProperty').val())
						arrErrPtyDoc.push(strDocNo);
					if (document.all["dg1__ctl" + i + "_lbdgAppUsername"].textContent != "")
						arrApproved.push(strDocNo);
				}

				if(arrErrPtyDoc.length > 0)
					strErrMsg += "文號" + arrErrPtyDoc.join("、") + "非任審案，不需轉換。\n";
				if(arrApproved.length > 0)
					strErrMsg += "文號" + arrApproved.join("、") + "已核決，不可轉換。\n";

				if(strErrMsg != "")
					alert(strErrMsg);
				else
				{
					if (window.confirm("轉一般公文會清空任審資訊，請問是否繼續？"))
					{
						Page_BlockSubmit = false;
						jf_ToolBarSubmit(xObjectName);
					}
				}
			}
			else
				alert("請先勾選要轉換的公文");
			break;
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			cbSelectOnClick();
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			cbSelectOnClick();
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			cbSelectOnClick();
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
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
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
	if(argCallerId == "EDT271C1")
	{
		document.all["txRtnAppUserId"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRtnAppRoleId"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txRtnAppName"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txRtnApprovedTime"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		document.all["txRtnIssueType"].value = jf_Trim(document.all.lbReturnValue.options[4].value);
		document.all["txRtnStoreType"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
		document.all["txRtnFileCnt"].value = jf_Trim(document.all.lbReturnValue.options[6].value);
		document.all["txRtnFileUnit"].value = jf_Trim(document.all.lbReturnValue.options[7].value);
		//1120417 David 新增判斷是不需異動、取消核決還是設定核決者
		document.all["txRtnAppSelectType"].value = jf_Trim(document.all.lbReturnValue.options[8].value);

		Page_BlockSubmit=false;
		jf_ToolBarSubmit("btSet");
	}
	if(argCallerId == "EDT271C2")
	{
		Page_BlockSubmit=false;
		jf_ToolBarSubmit("btOrder");
	}
	//1120407 David 新增「設定傳送流程」功能
	if(argCallerId == "EDT271C3")
	{
		Page_BlockSubmit=true;
		if(document.all['dg1'])
		{
			for (var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
				{
					document.all["dg1__ctl" + i + "_hToOuID"].value = document.all.lbReturnValue.options[0].value;
					document.all["dg1__ctl" + i + "_hToOuName"].value = document.all.lbReturnValue.options[1].value;
					document.all["dg1__ctl" + i + "_lbdgToUser"].textContent = document.all.lbReturnValue.options[1].value;
					document.all["dg1__ctl" + i + "_hTxName"].value = document.all.lbReturnValue.options[2].value;
					document.all["dg1__ctl" + i + "_hToRoleID"].value = "OD17";
					document.all["dg1__ctl" + i + "_hToRoleName"].value = "登記桌";
					document.all["dg1__ctl" + i + "_hToUserID"].value = "";
					document.all["dg1__ctl" + i + "_hToUserName"].value = "";
				}
			}
		}
	}
	//1130417 David 1130055 新增預排流程帶回處理
	if(argCallerId == "EDT253")
	{
		Page_BlockSubmit=true;
		let strType = document.all.lbReturnValue.options[0].value;
		if(strType == "Save")
		{
			let strTxName = WWKFobj[1];
			let strToOuId = WWKFobj[2];
			let strToOuName = WWKFobj[3];
			let strToRoleId = WWKFobj[4];
			let strToRoleName = WWKFobj[5];

			document.all["dg1__ctl" + strOpenWWKKSeq + "_hToOuID"].value = strToOuId;
			document.all["dg1__ctl" + strOpenWWKKSeq + "_hToOuName"].value = strToOuName;
			document.all["dg1__ctl" + strOpenWWKKSeq + "_lbdgToUser"].textContent = strToOuName;
			document.all["dg1__ctl" + strOpenWWKKSeq + "_hTxName"].value = strTxName;
			document.all["dg1__ctl" + strOpenWWKKSeq + "_hToRoleID"].value = "OD17";
			document.all["dg1__ctl" + strOpenWWKKSeq + "_hToRoleName"].value = "登記桌";
			document.all["dg1__ctl" + strOpenWWKKSeq + "_hToUserID"].value = "";
			document.all["dg1__ctl" + strOpenWWKKSeq + "_hToUserName"].value = "";
		}
		strOpenWWKKSeq = "";
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
function cbSelectOnClick() {
	if(document.all['dg1'])
	{
		var iCnt = 0;
		for (var i = 2; i <= document.all['dg1'].rows.length; i++)
			if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
				iCnt++

		document.all.CheckSendCount.textContent = iCnt;
	}
}

function SelectDgFromDocNo() {
	var bSet = false;

	if (document.all.txDocNo2.value == "")
		return;

	for (var i = 2; i <= document.all['dg1'].rows.length; i++) {
		if (document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent == document.all.txDocNo2.value) {
			document.all["dg1__ctl" + i + "_cbSelect"].checked = true;
			bSet = true;
			break;
        }
	}

	if (!bSet)
		alert('查無符合文號：' + document.all.txDocNo2.value);

	document.all.txDocNo2.value = '';
	cbSelectOnClick();
}

//1120428 David 移除既有的排序條件功能
/*function ChgOrderBy() {
	Page_BlockSubmit = false;
	jf_ToolBarSubmit("btSubFolder");
}*/

function CheckBeforeTransfer()
{
	if(document.all.CheckSendCount.textContent != "0")
	{
		let arrErrDoc = [];
		if($('#rbTransferIssue')[0].checked)
		{
			for (var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				let arrErr = [];
				let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

				if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
					continue;

				let strCloseType = document.all["dg1__ctl" + i + "_hCloseType"].value;
				if (strCloseType != "1" && strCloseType != "2")
					arrErr.push("擬辦設定選擇非發文");

				if(document.all["dg1__ctl" + i + "_lbdgAppUsername"].textContent == "")
					arrErr.push("尚未核決");
				
				//1120414 David 送發前檢核公文是否有稿件
				if(document.all["dg1__ctl" + i + "_hDraftState"].value != "Y")
					arrErr.push("無稿件");

				if(arrErr.length > 0)
				{
					let strDocErr = "文號[" + strDocNo + "]" + arrErr.join("、");
					arrErrDoc.push(strDocErr)
				}
			}

			if(arrErrDoc.length > 0)
			{
				alert("送發前檢核異常：\n" + arrErrDoc.join("\n"));
				return false;
			}
		}
		else if($('#rbTransferStore')[0].checked)
		{
			for (var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				let arrErr = [];
				let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

				if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
					continue;
				
				let strCloseType = document.all["dg1__ctl" + i + "_hCloseType"].value;
				let strDocState = document.all["dg1__ctl" + i + "_hDocState"].value;
				let strAppUserName = document.all["dg1__ctl" + i + "_lbdgAppUsername"].textContent;
				let strIssueDate = document.all["dg1__ctl" + i + "_hIssueDate"].value;
				
				if ((strDocState != "09" && strDocState != "10" && strCloseType != "3")
					|| (strCloseType != "3" && strIssueDate == ""))
					arrErr.push("尚未執行發文");

				if(document.all["dg1__ctl" + i + "_lbdgAppUsername"].textContent == "")
					arrErr.push("尚未核決");

				if(arrErr.length > 0)
				{
					let strDocErr = "文號[" + strDocNo + "]" + arrErr.join("、");
					arrErrDoc.push(strDocErr)
				}
			}

			if(arrErrDoc.length > 0)
			{
				alert("歸檔前檢核異常：\n" + arrErrDoc.join("\n"));
				return false;
			}
		}
		else if($('#rbTransferNormal')[0].checked)
		{
			for (var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				let arrErr = [];
				let strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

				if(!document.all["dg1__ctl" + i + "_cbSelect"].checked)
					continue;
				
				if(document.all["dg1__ctl" + i + "_hTxName"].value == "")
					arrErr.push("尚未設定傳送對象");

				if(arrErr.length > 0)
				{
					let strDocErr = "文號[" + strDocNo + "]" + arrErr.join("、");
					arrErrDoc.push(strDocErr)
				}
			}

			if(arrErrDoc.length > 0)
			{
				alert("送出前檢核異常：\n" + arrErrDoc.join("\n"));
				return false;
			}
		}
		else if($('#rbTransferRPSUser')[0].checked)
		{}
	}
	else
	{
		alert("請先勾選要傳送的公文");
		return false;
	}

	return true;
}

//1120213 David 勾選「續辦」時，連動「選」一併勾選
function cbContinueOnClick(argCb)
{
	if(document.all[argCb].checked)
	{
		var pNo = argCb.substring(8, argCb.indexOf("_cbContinue"));
		document.all["dg1__ctl" + pNo + "_cbSelect"].checked = true;
		cbSelectOnClick();
	}
}

//1130124 Zen 1130022 調整強制簽收子視窗大小
function OpenChildWin(argUrl, argWinName, argWidth, argHeight)
{
	if (document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argUrl = argUrl.replace(/http:/ig, 'https:');

	if (argWinName != "")
	{
		for (var i = 0; i < arrWin.length; i++)
		{
			if (arrWin[i][0] == argWinName)
			{
				if (arrWin[i][1].closed)
					arrWin[i][0] = "";
				else
					arrWin[i][1].close();
			}
		}
	}

	var strWinStyle, strTop, strLeft;
	strWinStyle = "menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";
	if ((argWidth != "") || (argWidth != "0"))
	{
		strWinStyle = strWinStyle + ",width=" + argWidth;
		strLeft = (screen.width - argWidth) / 2;
		strWinStyle = strWinStyle + ", left=" + strLeft;
	}
	if ((argHeight != "") || (argHeight != "0"))
	{
		strWinStyle = strWinStyle + ",height=" + argHeight;
		strTop = (screen.height - argHeight) / 2 - 10;
		strWinStyle = strWinStyle + ", top=" + strTop;
	}

	gWindowID = window.open(argUrl, "", strWinStyle);
	gWindowID.focus();

	arrWin[arrWin.length] = new Array();
	arrWin[arrWin.length - 1][0] = argWinName;
	arrWin[arrWin.length - 1][1] = gWindowID;
	return gWindowID;
}

//1130417 David 1130055 新增設定預排流程功能
var strOpenWWKKSeq = "";
var WWKFobj;
function btWWKFOnClick(argbtWWKF)
{
	Page_BlockSubmit = true;
	strOpenWWKKSeq = argbtWWKF.substring(8, argbtWWKF.indexOf("_btWWKF"));
	let strDocNo = document.all["dg1__ctl" + strOpenWWKKSeq + "_lbdgDocNo"].textContent;

	let strUrl = "EDT253.aspx?nFrom=EDT271&DocNo=" + strDocNo;
	OpenChildWin(strUrl, "EDT271_MOCS", 1024, 768);
}