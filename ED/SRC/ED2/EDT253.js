/*
DATE	SA		PRG		MGR_NO			DESC
1130412	David	Joe		1130055			新增程式
1131001 Kevin	Kevin	1130941			弱掃修正
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
    catch (error) {}
    finally { }
}

var dgColumnLength = 4;
var nTableRowNow = 1;
var nTableRowMax = 0;
var defTarget = { TxName: '', OUId: '', RoleId: '', UserId: '', OUName: '', RoleName: '', UserName: '' };
var bFirstWWKF = true;//判斷是否為預排流程第一關(預排流程沒有已完成簽核的流程)
var bChange = false;//紀錄是否有異動

var uSelectedColor = 'orange';//勾選
var uDoubleRowColor = "#C9F5F3";//雙數列底色
var uSingleRowColor = "#FFFFFF";//單數列底色

var wwkfItem = {
	ADDBY : "",
	CREATE_BY : "",
	OWN_OU_ID : "",
	OWN_OU_NAME : "",
	OWN_ROLE_ID : "",
	OWN_ROLE_NAME : "",
	OWN_USER_ID : "",
	OWN_USER_NAME : "",
	RADIO_SELECTED_1 : "",
	SEND_BY : "",
	SEND_TIME : "",
	SIGN_F : "",
	TX_NAME : "",
};

var wwkfCoworkItem = {
	ADDBY : "",
	CREATE_BY : "",
	OWN_OU_ID : "",
	OWN_OU_NAME : "",
	OWN_ROLE_ID : "",
	OWN_ROLE_NAME : "",
	OWN_USER_ID : "",
	OWN_USER_NAME : "",
	RADIO_SELECTED_1 : "",
	SEND_BY : "",
	SEND_TIME : "",
	SIGN_F : "",
	TX_NAME : "",
	COWORK_OPTIONS : []
};

var gTxNameForExternalOu = "順會";
var gTxNameForAfterAPPOu = "後會";
var gProgressRoleId = "";
var gProgressRoleName = "";
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	init();
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
	   return;

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
		case "btAdd":
			Page_BlockSubmit = true;
			fnAddFlowNew();
			break;
		case "btDgSelectAll":
			Page_BlockSubmit = true;
			fnSelectAll();
			break;
		case "btDgInverse":
			Page_BlockSubmit = true;
			fnSelectInverse();
			break;
		case "btDgDelete":
			Page_BlockSubmit = true;
			fnDelete();
			break;
		case "btDgMoveUp":
			Page_BlockSubmit = true;
			fnMoveUp();
			break;
		case "btDgMoveDown":
			Page_BlockSubmit = true;
			fnMoveDown();
			break;
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
		Page_BlockSubmit = true;
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
		case "btSave":
			Page_BlockSubmit = true;
			fnSave();
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			var bCancel = false;
			if (!bChange)
				bCancel = true;
			else if (window.confirm("您已修改過內容,確定要取消嗎?"))
				bCancel = true;
			if (bCancel)
			{
				opener.document.all.lbReturnValue.length = 1;
				opener.document.all.lbReturnValue.options[0].value = "Cancel";
				opener.window.CallBack("EDT253");
				close();
			}
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	if (jf_CheckBeforSave())
		bRtnbool = true;

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//將 ODWWKF.XML load 進來後，顯示在流程table中
function LoadXmlToTable(objwwkf)
{
	var pNodeVal = "";
	ClearTable(document.all.dg1);
	nTableRowNow = 1;
	nTableRowMax = 0;

	for (var iRow = 0; iRow < objwwkf.length; iRow++)
	{
		var nRowIdx = iRow + 1;
		//Insert Row
		var NewRow = document.all.dg1.insertRow(nRowIdx);
		nTableRowNow++;
		nTableRowMax++;

		for (var j = 0; j < dgColumnLength; j++)
		{
			document.all.dg1.rows[nRowIdx].insertCell(j);
		}

		var strInnerHtml = "";

		var trStyle = "text-align:center;";
		var ItemDisable = "";
		var CheckBoxHidden = "";
		//選
		if (objwwkf[iRow].SIGN_F.toUpperCase()=="Y")
		{
			trStyle += "background-color: darkgray;";
			ItemDisable = "disabled";
			//判斷是否為預排流程第一關(預排流程沒有已完成簽核的流程)
			bFirstWWKF = false;
			//已走過流程不顯示CheckBox
			CheckBoxHidden = "hidden";
		}
		else
		{
			if (defTarget.TxName == '')
			{
				//1131001 Kevin 1130941 弱掃修正
				defTarget.TxName = htmlencode(objwwkf[iRow].TX_NAME);
				defTarget.OUId = htmlencode(objwwkf[iRow].OWN_OU_ID);
				defTarget.RoleId = htmlencode(objwwkf[iRow].OWN_ROLE_ID);
				defTarget.UserId = htmlencode(objwwkf[iRow].OWN_USER_ID);
				defTarget.OUName = htmlencode(objwwkf[iRow].OWN_OU_NAME);
				defTarget.RoleName = htmlencode(objwwkf[iRow].OWN_ROLE_NAME);
				defTarget.UserName = htmlencode(objwwkf[iRow].OWN_USER_NAME);
			}
		}

		//分會相關處理
		if (objwwkf[iRow].TX_NAME != "分會")
		{
			//隱藏欄位
			
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_OU_ID);
			strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_ROLE_ID);
			strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_ROLE_NAME);
			strInnerHtml += "<INPUT id=\"txOwnRoleName" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleName" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].CREATE_BY);
			strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].SEND_BY);
			strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].SEND_TIME);
			strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].ADDBY); //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
			if (pNodeVal == null) //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
				pNodeVal == "0"; //舊資料一律視為「加入流程」方式加入
			strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].RADIO_SELECTED_1);
			if (pNodeVal == null) //RadioSelected1  (1:改分, 2:順會, 3:分會) 
				pNodeVal = "2"; //舊資料一律視為順會
			strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

			//選+隱藏欄位
			if(CheckBoxHidden != "")
				document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " " +CheckBoxHidden + ">" + strInnerHtml;
			else
				document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " onclick=\"fnSetColor("+nTableRowMax+")\" >" + strInnerHtml;
			//單位
			//1131001 Kevin 1130941 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[1].innerHTML = htmlencode(objwwkf[iRow].OWN_OU_NAME);
			//異動別
			//1131001 Kevin 1130941 弱掃修正
			document.all.dg1.rows[nRowIdx].cells[2].innerHTML = htmlencode(objwwkf[iRow].TX_NAME);
			//分會明細按鈕
			if(objwwkf[iRow].SIGN_F.toUpperCase()!="Y")
			{
				document.all.dg1.rows[nRowIdx].cells[3].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
				document.all.dg1.rows[nRowIdx].cells[3].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
				document.all.dg1.rows[nRowIdx].cells[3].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";
			}
		}
		else
		{
			//隱藏欄位
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_OU_ID);
			strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_ROLE_ID);
			strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].OWN_ROLE_NAME);
			strInnerHtml += "<INPUT id=\"txOwnRoleName" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleName" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].CREATE_BY);
			strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].SEND_BY);
			strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			//1131001 Kevin 1130941 弱掃修正
			pNodeVal = htmlencode(objwwkf[iRow].SEND_TIME);
			strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = "1"; //ADDBY  -- 加入方式 (0:加入流程, 1:加入流程點)
			strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
			pNodeVal = 3;//RadioSelected1  (1:改分, 2:順會, 3:分會) 
			strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
	
			//由wwkf中取出分會單位資訊
			var strOuId = "";
			var strOuName = "";
			var strOuNameList ="";
			var iCoworkOptionLength = objwwkf[iRow].COWORK_OPTIONS.length;
			for(var inum = 0 ; inum < iCoworkOptionLength ; inum++)
			{
				//1131001 Kevin 1130941 弱掃修正
				strOuId += htmlencode(objwwkf[iRow].COWORK_OPTIONS[inum].OWN_OU_ID);
				if(inum != iCoworkOptionLength-1)
					strOuId += "|";
				//1131001 Kevin 1130941 弱掃修正
				strOuName += htmlencode(objwwkf[iRow].COWORK_OPTIONS[inum].OWN_OU_NAME);
				if(inum != iCoworkOptionLength-1)
					strOuName += "|";
				//1131001 Kevin 1130941 弱掃修正
				strOuNameList += htmlencode(objwwkf[iRow].COWORK_OPTIONS[inum].OWN_OU_NAME);
				if(inum != iCoworkOptionLength-1)
					strOuNameList += ",";
			}

			//選+隱藏欄位
			document.all.dg1.rows[nRowIdx].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" " + ItemDisable + " onclick=\"fnSetColor("+nTableRowMax+")\" >" + strInnerHtml + "<INPUT id=\"txTreadInfo"+nTableRowMax+"\" type=\"hidden\" name=\"txTreadInfo"+nTableRowMax+"\" OwnOuId="+strOuId+" OwnOuName="+strOuName+">";;
			//單位
			document.all.dg1.rows[nRowIdx].cells[1].innerHTML = strOuNameList;
			//異動別
			document.all.dg1.rows[nRowIdx].cells[2].innerHTML = "分會";
			//分會明細按鈕
			if(objwwkf[iRow].SIGN_F.toUpperCase()!="Y")
			{
				document.all.dg1.rows[nRowIdx].cells[3].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
				document.all.dg1.rows[nRowIdx].cells[3].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
				document.all.dg1.rows[nRowIdx].cells[3].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";				
			}
		}

		$(NewRow).attr('style','text-align:center');
		if(objwwkf[iRow].SIGN_F.toUpperCase()=="Y")
			$(NewRow).attr('style','text-align:center; background-color:darkgray');

		if(CheckBoxHidden == "")
			$(NewRow).bind('click', rowsOnClick);
	}
}

function ClearTable(argTable)
{
	var MaxRow = argTable.rows.length - 1;
	for (var i = 0; i < MaxRow; i++)
	{
		argTable.deleteRow(1);
	}
}

function init()
{
	//修正GridDiv高度問題，避免多出右邊BAR
	$('.GridDiv').each(function () {
		var oldHeight = $(this).height();
		var newHeight = window.innerHeight - $(this).offset().top - ($('.footStatus').height() | 0) - 90;
		if (oldHeight < newHeight)
			$(this).height(newHeight);
	});

	var Flow = JSON.parse('[' + document.all['H_JsonData'].value + ']');

	document.all.rbDeptFirst.checked = true;
	DeptTypeChange();

	LoadXmlToTable(Flow);
}

//插入流程點
function fnAddPoint(pOuId, pOuName)
{
	if (pOuId == "")
	{
		alert('請選擇單位');
		return false;
	}

	//異動別
	var pRadioSelected1 = "2"; //RadioSelected1  (1:改分, 2:順會, 3:分會, 4:後會) 預設值 2
	if (document.all.rbCoworkType2.checked)
		pRadioSelected1 = "4";

	var TargetOuId = pOuId.substr(0, 2);

	var pTxName = GetTxName(pOuId, $('#H_IcOuid').val());
	if (pTxName == "")
	{
		alert('無法判定異動別，請重新點選');
		return false;
	}

	//檢核會辦對象單位角色是否有扮演人員
	if(pTxName == gTxNameForExternalOu || pTxName == gTxNameForAfterAPPOu)
	{
		let strCheckMsg = "";
		let strTargetRoleNo = "OD17";

		let RolePlayObj = ED2.EDT217.CheckRolePlay(jf_GetArtifact(), document.all.OrgNo.value, pOuId, strTargetRoleNo).value;
		if(RolePlayObj)
		{
			if(RolePlayObj.bSuccess)
			{
				if (RolePlayObj.CheckMsg != "")
				{
					if(strCheckMsg != "")
						strCheckMsg += "，";
					strCheckMsg += RolePlayObj.CheckMsg;
				}
			}
			else
			{
				alert("無法加入會辦流程：" + RolePlayObj.ErrMsg);
				return;
			}
		}

		if(strCheckMsg != "")
		{
			alert(strCheckMsg + "，請重新確認會辦對象後重新設定");
			return;
		}
	}

	AddFlowPoint(pOuId, pOuName, pRadioSelected1, pTxName, TargetOuId);
}

function AddFlowPoint(pOuId, pOuName, pRadioSelected1, pTxName, iTargetOuId)
{
	var InsertIndex = fnGetInsertRowIndex();

	//Insert Row
	var NewRow = document.all.dg1.insertRow(InsertIndex);
	nTableRowNow++;
	nTableRowMax++;

	for (var j = 0; j < dgColumnLength; j++)
		document.all.dg1.rows[InsertIndex].insertCell(j);

	var strInnerHtml = "";

	//隱藏欄位
	var pNodeVal = pOuId;
	strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"" + htmlencode(pNodeVal) + "\">";
	strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"" + htmlencode(gProgressRoleId) + "\">";
	strInnerHtml += "<INPUT id=\"txOwnRoleName" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleName" + nTableRowMax + "\" value=\"" + htmlencode(gProgressRoleName) + "\">";
	pNodeVal = $('#h_UserId').val();
	strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + htmlencode(pNodeVal) + "\">";
	strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"\">";
	strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"\">";

	pNodeVal = "1"//加入方式 (0:加入流程, 1:加入流程點)
	strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + htmlencode(pNodeVal) + "\">";

	pNodeVal = pRadioSelected1;//(1:改分, 2:順會, 3:分會) 
	strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + htmlencode(pNodeVal) + "\">";

	//選+隱藏欄位
	document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" onclick=\"fnSetColor("+nTableRowMax+")\">" + strInnerHtml;
	//單位
	document.all.dg1.rows[InsertIndex].cells[1].innerHTML = htmlencode(pOuName);
	//異動別
	document.all.dg1.rows[InsertIndex].cells[2].innerHTML = htmlencode(pTxName);
	//分會明細按鈕
	document.all.dg1.rows[InsertIndex].cells[3].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
	document.all.dg1.rows[InsertIndex].cells[3].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
	document.all.dg1.rows[InsertIndex].cells[3].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";

	$(NewRow).attr('style','text-align:center');

	bChange = true;//紀錄是否有異動

	$(NewRow).bind('click', rowsOnClick);
}

function fnGetInsertRowIndex()
{
	//紀錄是否有取得勾選項目
	var bGetChecked = false;

	var nRowStart = document.all.dg1.rows.length;
	for(var idg = document.all.dg1.rows.length-1 ; idg > 0 ; idg--)
	{
		var cbCheckObj = document.all.dg1.rows[idg].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)//判斷最後一個勾選的流程
		{
			//紀錄是否有取得勾選項目
			bGetChecked = true;

			nRowStart = idg+1
			break;
		}
	}
	var nRowIdx = nRowStart;

	return nRowIdx;
}

function GetTxName(argToOuId, argInChargeOu)
{
	var T = argToOuId.substr(0, 2);
	var M = parseInt(argInChargeOu.substr(0, 2), 10);

	//初始化
	gProgressRoleId = "";
	gProgressRoleName = "";

	if (T == "91")//總收
	{
		gProgressRoleId = "OD91";
		gProgressRoleName = "收文人員";
		return "退文";
	}
	else if (T == "92")//總發
	{
		gProgressRoleId = "OD92";
		gProgressRoleName = "繕印人員";
		return "送總發文";
	}
	else if (T == "93")//研考
	{
		gProgressRoleId = "OD96";
		gProgressRoleName = "OD96";
		return "送銷號";
	}
	else if (T == "94")//檔管
	{
		gProgressRoleId = "OD95";
		gProgressRoleName = "檔管人員";
		return "歸檔";
	}
	else if (T.indexOf("9") == 0 && T != "90")//一層決行
	{
		gProgressRoleId = "OD17";
		gProgressRoleName = "登記桌";
		return "送請簽核";
	}
	else
	{
		if (argToOuId.substr(0, 2) == argInChargeOu.substr(0, 2))//承辦單位
		{
			return "辦畢退回";
		}
		if(argToOuId.substr(0, 2) != argInChargeOu.substr(0, 2))//非承辦單位
		{
			gProgressRoleId = "OD17";
			gProgressRoleName = "登記桌";

			if (document.all.rbCoworkType2.checked)
				return gTxNameForAfterAPPOu;
			else
				return gTxNameForExternalOu;
		}
	}
}

function SetRole(argRoleId, argRoleName, argRoleIdDefault, argRoleNameDefault)
{
	if (argRoleId == "") //若未指定roleId則自動帶default
	{
		gProgressRoleId = argRoleIdDefault;
		gProgressRoleName = argRoleNameDefault;
	}
	else
	{
		gProgressRoleId = argRoleId;
		gProgressRoleName = argRoleName;
	}
}
//全選的FUNCTION
function fnSelectAll()
{
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled)
			cbCheckObj.checked = true;
	}
}

//反向的FUNCTION
function fnSelectInverse()
{
	var len = document.all.dg1.rows.length;
	for (var i = 1 ; i < len ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
			cbCheckObj.checked = false;
	}
}

//刪除流程點
function fnDelete()
{
	if (!IsRowSelected())
		return;

	for (var i = document.all.dg1.rows.length -1; i > 0 ; i--)//刪除流程時要由大到小逐一刪除
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if ((cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked && singleRowIndex == "") || i == singleRowIndex)
		{
			var nRowIdx = GetTableRowIdx(document.all.dg1.rows[i].cells[0].innerHTML, "cbCheck");

			document.all.dg1.deleteRow(i);
			nTableRowNow--;
		}
	}
	bChange = true;//紀錄是否有異動
	SetDgColor();//底色處理
}

//判斷是否選取
function IsRowSelected()
{
	var bSelect = false;
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
		{
			bSelect = true;
			break;
		}
	}

	if (!bSelect && singleRowIndex == "")
	{
		alert("請先選擇流程");
		return false;
	}
	return true;
}

function GetelectedIndex()
{
	var rtnArr = new Array();
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.checked)
			rtnArr.push(i);
	}
	return rtnArr;
}

function CheckTop(argIndex)
{
	if(argIndex == 1)
		return true;

	var cbCheckObj = document.all.dg1.rows[argIndex-1].cells[0].childNodes[0];
	if(cbCheckObj && cbCheckObj.disabled)
		return true;

	return false;
}

function fnMoveUp()
{
	if (!IsRowSelected()) return;

	var nRowSelectedIndex;
	if (singleRowIndex == "")
		nRowSelectedIndex = GetelectedIndex();
	else {
		var rtnArr = new Array();
		rtnArr.push(singleRowIndex);
		nRowSelectedIndex = rtnArr;
		singleRowIndex = "";
	}

	if (CheckTop(nRowSelectedIndex[0]))
	{
		alert('已至最上筆');
		return;
	}

	var nRowIdx = GetTableRowIdx(document.all.dg1.rows[nRowSelectedIndex[0]].cells[0].innerHTML, "cbCheck");

	var len = nRowSelectedIndex.length;
	for (var i = 0 ; i < len ; i++)//由小到大移動
	{
		var idx = nRowSelectedIndex[i];
		fnExchangeTableRow(idx, idx - 1);
		nRowSelectedIndex[i] = idx - 1;
	}
	bChange = true;//紀錄是否有異動
	SetDgColor();//底色處理
}

function fnMoveDown()
{
	if (!IsRowSelected()) return;

	//取得有勾選的Index
	var nRowSelectedIndex;
	if (singleRowIndex == "")
		nRowSelectedIndex = GetelectedIndex();
	else {
		var rtnArr = new Array();
		rtnArr.push(singleRowIndex);
		nRowSelectedIndex = rtnArr;
		singleRowIndex = "";
	}

	var endIdx = nRowSelectedIndex[nRowSelectedIndex.length - 1];
	if (endIdx == document.all.dg1.rows.length - 1)
	{
		alert('已至最末筆');
		return;
	}

	var nRowIdx = GetTableRowIdx(document.all.dg1.rows[endIdx].cells[0].innerHTML, "cbSignF");

	var len = nRowSelectedIndex.length - 1;
	for (var i = len ; i > -1 ; i--)//由大到小移動
	{
		var idx = nRowSelectedIndex[i];
		fnExchangeTableRow(idx, idx + 1);
		nRowSelectedIndex[i] = idx + 1;
	}
	bChange = true;//紀錄是否有異動
	SetDgColor();//1底色處理
}

//對調兩筆table row
function fnExchangeTableRow(nRowIdxSelected, nRowIdxNext)
{
	var pTmpAry = Array()
	var bNowItemChecked = false;//紀錄原本的"選"是否勾選
	var bNextItemChecked = false;//紀錄要被交換的"選"是否勾選

	//keep target row(nRowIdxNext) value
	for (var i = 0; i < dgColumnLength; i++)
	{
		pTmpAry[i] = document.all.dg1.rows[nRowIdxNext].cells[i].innerHTML;
		if(i == 0)//紀錄原本的"選"是否勾選
		{
			var cbNextSelectCheckObj = document.all.dg1.rows[nRowIdxNext].cells[0].childNodes[0];
			bNextItemChecked = cbNextSelectCheckObj.checked;
		}
	}
	//Set Target row value = selected row value
	for (var i = 0; i < dgColumnLength; i++)
	{
		if(i == 0)//紀錄要被交換的"選"是否勾選
		{
			var cbNowSelectCheckObj = document.all.dg1.rows[nRowIdxSelected].cells[0].childNodes[0];
			bNowItemChecked = cbNowSelectCheckObj.checked;
		}

		document.all.dg1.rows[nRowIdxNext].cells[i].innerHTML = document.all.dg1.rows[nRowIdxSelected].cells[i].innerHTML;

		if(i == 0)
		{
			var cbNowSelectCheckObj = document.all.dg1.rows[nRowIdxNext].cells[0].childNodes[0];
			cbNowSelectCheckObj.checked = bNowItemChecked;
		}
	}

	//Set source row = target row old value
	for (var i = 0; i < dgColumnLength; i++)
	{
		document.all.dg1.rows[nRowIdxSelected].cells[i].innerHTML = pTmpAry[i];
		if(i == 0)
		{
			var cbNextSelectCheckObj = document.all.dg1.rows[nRowIdxSelected].cells[0].childNodes[0];
			cbNextSelectCheckObj.checked = bNextItemChecked;
		}
	}
}

//因為寫入Table可能是用insert的方式加入，因此每個table的row，在要取得隱藏欄位的值時
//所使用的RowIdx可能沒有按照順序，所以用此function來取得RowIdx
function GetTableRowIdx(argHtml, argKeyWord)
{
	var pI = argHtml.indexOf(argKeyWord);
	var nRowIdx = 0;
	var pTmpStr = "";

	if (pI != -1)
	{
		pTmpStr = argHtml.substr(pI + argKeyWord.length);
		pI = pTmpStr.indexOf(" ");
		pTmpStr = pTmpStr.substr(0, pI);
		try
		{
			nRowIdx = parseInt(pTmpStr);
		}
		catch (e)
		{
			nRowIdx = 0;
		}
	}
	return nRowIdx;
}

//儲存處理
function fnSave()
{
	var wwkfSaveObj = [];
	var IsHandleNextFlow = false;
	var CoworkAppOuId = "";
	var CoworkEndType = "0";
	var Target = new Array();

	for (var iRow = 1 ; iRow < document.all.dg1.rows.length ; iRow++)
	{
		var nRowIdx = GetTableRowIdx(document.all.dg1.rows[iRow].cells[0].innerHTML,"cbCheck");
		var SaveItem;

		var HideInfos = document.all.dg1.rows[iRow].cells[0];

		var SIGN_F = HideInfos.childNodes[0].disabled ? 'Y' : 'N';
		var nowOuId = HideInfos.childNodes[1].value;
		var nowRoleId = HideInfos.childNodes[2].value;
		var nowRoleName = HideInfos.childNodes[3].value;

		var nowOuName = document.all.dg1.rows[iRow].cells[1].innerText;
		var nowTxName = document.all.dg1.rows[iRow].cells[2].innerText;

		if(nowTxName != "分會")
		{
			SaveItem = $.extend({}, wwkfItem);
		}
		else
		{
			SaveItem = $.extend({}, wwkfCoworkItem);
			SaveItem.COWORK_OPTIONS = [];
		}

		SaveItem.OWN_USER_ID = "";
		SaveItem.OWN_USER_NAME = "";
		SaveItem.OWN_OU_ID = nowOuId;
		SaveItem.OWN_OU_NAME = nowOuName;
		SaveItem.OWN_ROLE_ID = nowRoleId;
		SaveItem.OWN_ROLE_NAME = nowRoleName;
		SaveItem.CREATE_BY = HideInfos.childNodes[4].value;
		SaveItem.SEND_BY = HideInfos.childNodes[5].value;
		SaveItem.SEND_TIME = HideInfos.childNodes[6].value;
		SaveItem.ADDBY = HideInfos.childNodes[7].value;
		SaveItem.RADIO_SELECTED_1 = HideInfos.childNodes[8].value;
		SaveItem.SIGN_F = HideInfos.childNodes[0].disabled ? 'Y' : 'N';
		SaveItem.TX_NAME = nowTxName;

		//當tx_name為分會時要增加COWORK_OPTIONS節點
		if(nowTxName == "分會" && document.all["txTreadInfo"+nRowIdx])
		{
			var $txTreadInfo = $(document.all["txTreadInfo"+nRowIdx]);

			var strOuId   = $txTreadInfo.attr("OwnOuId").split('|');
			var strOuName   = $txTreadInfo.attr("OwnOuName").split('|');

			for( OuNum = 0 ; OuNum < strOuId.length ; OuNum++)
			{
				var CoworkItem = $.extend({}, wwkfItem);

				CoworkItem.OWN_USER_ID = "";
				CoworkItem.OWN_USER_NAME = "";
				CoworkItem.OWN_OU_ID = strOuId[OuNum];
				CoworkItem.OWN_OU_NAME = strOuName[OuNum];
				CoworkItem.OWN_ROLE_ID = "";
				CoworkItem.OWN_ROLE_NAME = "";
				CoworkItem.CREATE_BY = document.all["txCreateBy"+nRowIdx].value;
				CoworkItem.SEND_BY = "";
				CoworkItem.SEND_TIME = "";
				CoworkItem.ADDBY = document.all["txAddBy"+nRowIdx].value;
				CoworkItem.RADIO_SELECTED_1 = document.all["txRadioSelected1"+nRowIdx].value;
				CoworkItem.SIGN_F = document.all["cbCheck"+nRowIdx].disabled ? 'Y' : 'N';
				CoworkItem.TX_NAME = "分會";

				SaveItem.COWORK_OPTIONS[OuNum] = CoworkItem;
			}
		}

		wwkfSaveObj[wwkfSaveObj.length] = SaveItem;

		var cbCheckObj = document.all.dg1.rows[iRow].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && !IsHandleNextFlow)
		{
			IsHandleNextFlow = true;

			if (nowOuId != defTarget.OUId || nowRoleId != defTarget.RoleId || nowTxName != defTarget.TxName)
			{
				Target.push($('#H_NowMsg').val());
				Target.push(nowTxName);
				Target.push(nowOuId);
				Target.push(nowOuName);
				Target.push(nowRoleId);
				Target.push(nowRoleName);
			}
		}
	}

	var DocInfo = new Array();
	DocInfo.push($('#OrgNo').val());
	DocInfo.push($('#txDocNo').val());
	DocInfo.push($('#H_LastProg').val());
	DocInfo.push($('#H_LastDt').val());
	DocInfo.push(jf_GetArtifact());
	DocInfo.push($('#H_ServicePath').val());
	DocInfo.push($('#H_DocPath').val());
	DocInfo.push($('#H_ClientPath').val());

	var SaveObj = ED2.EDT253.SaveProc(wwkfSaveObj, DocInfo, Target);
	if (SaveObj.value != "")
		alert(SaveObj.value);
	else
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].value = "Save";
		opener.WWKFobj = Target;
		opener.window.CallBack("EDT253");
		close();
	}
}


//新增分會流程
function fnAddThread(argOuList)
{
	if(argOuList != "")
	{
		var arrOuList = argOuList.split("|");
		if(arrOuList.length <= 1)
		{
			alert("分會對象至少選取兩位以上");
			return;
		}
	
		//檢核會辦單位是否有登記桌人員
		let strCheckMsg = "";
		let strTargetRoleNo = "OD17";
		for(let i=0;i < arrOuList.length;i++)
		{
			let arrOuInfo = arrOuList[i].split(";");
			let strOuId = arrOuInfo[0];
			let RolePlayObj = ED2.EDT217.CheckRolePlay(jf_GetArtifact(), document.all.OrgNo.value, strOuId, strTargetRoleNo).value;
			if(RolePlayObj)
			{
				if(RolePlayObj.bSuccess)
				{
					if (RolePlayObj.CheckMsg != "")
					{
						if(strCheckMsg != "")
							strCheckMsg += "，";
						strCheckMsg += RolePlayObj.CheckMsg;
					}
				}
				else
				{
					alert("無法加入分會流程：" + RolePlayObj.ErrMsg);
					return;
				}
			}
		}
		if(strCheckMsg != "")
		{
			alert("無法加入分會流程：" + strCheckMsg + "，請重新確認會辦對象後重新設定");
			return;
		}

		var InsertIndex = fnGetInsertRowIndex();

		//Insert Row
		var NewRow = document.all.dg1.insertRow(InsertIndex);
		nTableRowNow++;
		nTableRowMax++;

		for (var j = 0; j < dgColumnLength; j++)
			document.all.dg1.rows[InsertIndex].insertCell(j);
			
		var strInnerHtml = "";

		//隱藏欄位
		strInnerHtml += "<INPUT id=\"txOwnOuId" + nTableRowMax + "\" type=\"hidden\" name=\"txOwnOuId" + nTableRowMax + "\" value=\"\">";
		strInnerHtml += "<INPUT id=\"txOwnRoleId" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRoleId" + nTableRowMax + "\" value=\"\">";
		strInnerHtml += "<INPUT id=\"txOwnRoleName" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnRolename" + nTableRowMax + "\" value=\"\">";
		//1131001 Kevin 1130941 弱掃修正
		var pNodeVal = htmlencode($('#h_UserId').val());
		strInnerHtml += "<INPUT id=\"txCreateBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";
		strInnerHtml += "<INPUT id=\"txSendBy" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"\">";
		strInnerHtml += "<INPUT id=\"txSendTime" + nTableRowMax + "\" type=\"hidden\" name=\"twOwnUserId" + nTableRowMax + "\" value=\"\">";

		pNodeVal = "1"//加入方式 (0:加入流程, 1:加入流程點)
		strInnerHtml += "<INPUT id=\"txAddBy" + nTableRowMax + "\" type=\"hidden\" name=\"txAddBy" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

		pNodeVal = "3";//(1:改分, 2:順會, 3:分會) 
		strInnerHtml += "<INPUT id=\"txRadioSelected1" + nTableRowMax + "\" type=\"hidden\" name=\"txRadioSelected1" + nTableRowMax + "\" value=\"" + pNodeVal + "\">";

		var strOuId = "";
		var strOuName = "";
		var strOuNameList ="";
		for(var i=0;i < arrOuList.length;i++)
		{
			var arrOuInfo = arrOuList[i].split(";");
			strOuId += arrOuInfo[0];
			if(i !=arrOuList.length-1)
				strOuId += "|";
			strOuName += arrOuInfo[1];
			if(i != arrOuList.length-1)
				strOuName += "|";
			strOuNameList += arrOuInfo[1];
			if(i != arrOuList.length-1)
				strOuNameList += ",";
		}
		strInnerHtml += "<INPUT id=\"txTreadInfo"+nTableRowMax+"\" type=\"hidden\" name=\"txTreadInfo"+nTableRowMax+"\" OwnOuId="+htmlencode(strOuId)+" OwnOuName="+htmlencode(strOuName)+" >"

		//選+隱藏欄位
		document.all.dg1.rows[InsertIndex].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nTableRowMax + "\" type=\"checkbox\" onclick=\"fnSetColor("+nTableRowMax+")\">" + strInnerHtml;
		//單位
		document.all.dg1.rows[InsertIndex].cells[1].innerHTML = htmlencode(strOuNameList);
		//異動別
		document.all.dg1.rows[InsertIndex].cells[2].innerHTML = "分會";
		//分會明細按鈕
		document.all.dg1.rows[InsertIndex].cells[3].innerHTML = "<INPUT id=\"btMoveUp" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveUp(" + nTableRowMax + ")\" name=\"btMoveUp" + nTableRowMax + "\" value=\"↑\">";
		document.all.dg1.rows[InsertIndex].cells[3].innerHTML += "<INPUT id=\"btMoveDown" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleMoveDown(" + nTableRowMax + ")\" name=\"btMoveDown" + nTableRowMax + "\" value=\"↓\">";
		document.all.dg1.rows[InsertIndex].cells[3].innerHTML += "<INPUT id=\"btDelete" + nTableRowMax + "\" type=\"button\" onclick=\"fnSingleDelete(" + nTableRowMax + ")\" name=\"btDelete" + nTableRowMax + "\" value=\"刪\">";

		$(NewRow).attr('style','text-align:center');

		bChange = true;//紀錄是否有異動

		//點選處理
		$(NewRow).bind('click', rowsOnClick);
	}
}

//新增DataGrid點選列的底色處理
function rowsOnClick()
{
	try
	{
		if(event && event.srcElement && event.srcElement.parentElement && event.srcElement.parentElement.rowIndex >= 0)
		{
			var iSelected = event.srcElement.parentElement.rowIndex;
			var cbCheckObj = document.all.dg1.rows[iSelected].cells[0].childNodes[0];
			if(cbCheckObj && !cbCheckObj.disabled)
			{
				cbCheckObj.checked = !cbCheckObj.checked;
				if(cbCheckObj.checked)
				{
					event.srcElement.parentElement.style.backgroundColor = uSelectedColor;
				}
				else
				{
					if(iSelected % 2 == 0)
						event.srcElement.parentElement.style.backgroundColor = uDoubleRowColor;
					else
						event.srcElement.parentElement.style.backgroundColor = uSingleRowColor;
				}
			}
		}
	}
	catch(e)
	{
		alert('點選流程時發生錯誤');
	}
}

//新增DataGrid底色處理
function SetDgColor()
{
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled)
		{
			if(cbCheckObj.checked)
			{
				document.all.dg1.rows[i].style.backgroundColor = uSelectedColor;
			}
			else
			{
				if(i % 2 == 0)
					document.all.dg1.rows[i].style.backgroundColor = uDoubleRowColor;
				else
					document.all.dg1.rows[i].style.backgroundColor = uSingleRowColor;
			}
		}
	}
}

//新增選勾選後底色處理
function fnSetColor(argIndex)
{
	for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
	{
		var cbCheckName = "cbCheck" + argIndex;
		var cbCheckObj = document.all.dg1.rows[i].cells[0].childNodes[0];
		if(cbCheckObj && !cbCheckObj.disabled && cbCheckObj.id == cbCheckName)
		{
			if(cbCheckObj.checked)
			{
				document.all.dg1.rows[i].style.backgroundColor = uSelectedColor;
			}
			else
			{
				if(i % 2 == 0)
					document.all.dg1.rows[i].style.backgroundColor = uDoubleRowColor;
				else
					document.all.dg1.rows[i].style.backgroundColor = uSingleRowColor;
			}
			break;
		}
	}
}

function htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

var singleRowIndex = "";
function fnSingleMoveUp(argIndex) {
	singleRowIndex = fnGetdg1SingleCtrlIndex(argIndex);
	fnMoveUp();
	singleRowIndex = "";
}
function fnSingleMoveDown(argIndex) {
	singleRowIndex = fnGetdg1SingleCtrlIndex(argIndex);
	fnMoveDown();
	singleRowIndex = "";
}
function fnSingleDelete(argIndex) {
	singleRowIndex = fnGetdg1SingleCtrlIndex(argIndex);
	fnDelete();
	singleRowIndex = "";
}

function fnGetdg1SingleCtrlIndex(argIndex) {
	var rtnIndex = 1;
	for (var i = 1; i < document.all.dg1.rows.length; i++) {
		if (document.all.dg1.rows[i].cells[0].childNodes[0].id == "cbCheck" + argIndex) {
			rtnIndex = i;
			break;
		}
	}
	return rtnIndex;
}

var DeptType = "";
function DeptTypeChange() {
	if (document.all.rbDeptCowork.checked)
		document.all.DivCoworkType.className = "dTD";
	else
		document.all.DivCoworkType.className = "hide";

	if (document.all.rbDeptFirst.checked) DeptType = "F";
	else if (document.all.rbDeptCowork.checked) {
		DeptType = "C";
		document.all.rbCoworkType1.checked = true;
	}
	else if (document.all.rbDeptNow.checked) DeptType = "N";
	else DeptType = "O";

	nDeptInsertRow = 1;

	for (var i = document.all.dgDept.rows.length - 1; i > 0; i--)//刪除流程時要由大到小逐一刪除
	{
		document.all.dgDept.deleteRow(i);
	}
	initDeptDg();
}

function initDeptDg() {
	if (document.all.rbDeptFirst.checked) DeptType = "F";
	else if (document.all.rbDeptCowork.checked) DeptType = "C";
	else if (document.all.rbDeptNow.checked) DeptType = "N";
	else DeptType = "O";

	var DeptObj = ED2.EDT253.GetDeptRoleInfo(document.all.OrgNo.value, $('#H_IcOuid').val().substr(0, 2), DeptType).value;
	if (DeptObj) {
		if (DeptObj.bSuccess) {
			if (DeptObj.DeptRoleInfo.length > 0) {
				for (var iDept = 0; iDept < DeptObj.DeptRoleInfo.length; iDept++) {
					var strDept = DeptObj.DeptRoleInfo[iDept];
					if (strDept.split('|')[0].length >= 3)
						AddDept(strDept.split('|')[0], strDept.split('|')[1], "S");
					//1111101	Joe		調整代碼定義
					else if(document.all.rbDeptNow.checked)
						AddDept(strDept.split('|')[0], strDept.split('|')[1], "O");
					else
						AddDept(strDept.split('|')[0], strDept.split('|')[1], "D");
				}
			}
		}
		else {
			alert(DeptObj.ErrMsg);
		}
	}
}

var nDeptMaxRow = 1;
var nDeptInsertRow = 1;
var showName = "";

//Type:O-OWN D-Dept S-Sect
function AddDept(argOuId, argOuName, argType) {
	var InsertIndex = nDeptInsertRow;
	var NewRow = document.all.dgDept.insertRow(InsertIndex);

	for (var j = 0; j < 2; j++)
		document.all.dgDept.rows[InsertIndex].insertCell(j);

	//隱藏欄位
	strInnerHtml = "<INPUT id=\"txOuId" + nDeptMaxRow + "\" type=\"hidden\" name=\"txOuId" + nDeptMaxRow + "\" value=\"" + htmlencode(argOuId) + "\">";
	strInnerHtml += "<INPUT id=\"txOuName" + nDeptMaxRow + "\" type=\"hidden\" name=\"txOuName" + nDeptMaxRow + "\" value=\"" + htmlencode(argOuName) + "\">";
	if(argType == "O")
		strInnerHtml += "<INPUT id=\"txSpread" + nDeptMaxRow + "\" type=\"hidden\" name=\"txSpread" + nDeptMaxRow + "\" value=\"Y\">";
	else
		strInnerHtml += "<INPUT id=\"txSpread" + nDeptMaxRow + "\" type=\"hidden\" name=\"txSpread" + nDeptMaxRow + "\" value=\"N\">";
	

	//選+隱藏欄位
	document.all.dgDept.rows[nDeptInsertRow].cells[0].innerHTML = "<INPUT id=\"cbCheck" + nDeptMaxRow + "\" type=\"checkbox\">" + strInnerHtml;

	var showName = "";

	if (argType == "D" || argType == "O") {
		showName = htmlencode(argOuName);
	}
	else if (argType == "S") {
		showName = "&nbsp;&nbsp;" + htmlencode(argOuName);
	}

	if (argType == "D")
		document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = "<a href=\"javascript:fnSpread('" + nDeptMaxRow + "')\">" + showName + "</a>";
	else
		document.all.dgDept.rows[nDeptInsertRow].cells[1].innerHTML = showName;

	$(NewRow).attr('style', 'text-align:left');
	nDeptMaxRow++;
	nDeptInsertRow++;
}

function fnGetDgDpetInsertRowIndex(argMastRowId) {
	var nDeptInsertRow = 1;
	for (var i = 1; i < document.all.dgDept.rows.length; i++) {
		if (document.all.dgDept.rows[i].cells[0].childNodes[0].id == "cbCheck" + argMastRowId) {
			nDeptInsertRow = i + 1;
			break;
		}
	}
	return nDeptInsertRow;
}

function fnSpread(argRowId) {
	//單位已展開
	if (document.all["txSpread" + argRowId].value == "Y")
	{
		fnClosed(argRowId);
		return;
	}

	nDeptInsertRow = fnGetDgDpetInsertRowIndex(argRowId);

	document.all["txSpread" + argRowId].value = "Y";
	var SpreadList = ED2.EDT253.GetDeptRoleInfo(document.all.OrgNo.value, document.all["txOuId" + argRowId].value, "S").value;
	if (SpreadList) {
		if (SpreadList.bSuccess) {
			if (SpreadList.DeptRoleInfo.length > 0) {
				for (var iDept = 0; iDept < SpreadList.DeptRoleInfo.length; iDept++) {
					var strDept = SpreadList.DeptRoleInfo[iDept];
					if (strDept.split('|')[0].length >= 3)
						AddDept(strDept.split('|')[0], strDept.split('|')[1], "S");
					else
						AddDept(strDept.split('|')[0], strDept.split('|')[1], "D");
				}
			}
		}
		else {
			alert(SpreadList.ErrMsg);
		}
	}
	nDeptInsertRow = 0;
}

function fnClosed(argRowId)
{
	var DeptNo = document.all["txOuId" + argRowId].value;
	
	for(var i = document.all.dgDept.children[0].children.length -1 ; i > 0; i--){
		//底下科別的資料刪除
		if(document.all.dgDept.children[0].children[i].children[0].children[1].value.length == 3 && document.all.dgDept.children[0].children[i].children[0].children[1].value.substring(0,2) == DeptNo)
			document.all.dgDept.children[0].children[i].remove();
	}
		
	//展開收回
	document.all["txSpread" + argRowId].value = 'N';
}

function fnAddFlowNew() {
	
	if(document.all.rbDeptCowork.checked == true && document.all.rbCoworkType3.checked == true)
	{
		var oulist = "";
		var Stamp = "";
		for (var i = 1; i < document.all.dgDept.rows.length; i++) 
		{
			if (document.all.dgDept.rows[i].cells[0].childNodes[0].checked) 
			{
				oulist += Stamp + document.all.dgDept.rows[i].cells[0].childNodes[1].value + ";" +  document.all.dgDept.rows[i].cells[0].childNodes[2].value;
				Stamp = "|";
				document.all.dgDept.rows[i].cells[0].childNodes[0].checked = false;
			}
		}
		if(oulist != "")
			fnAddThread(oulist);
	}
	else
	{
		for (var i = 1; i < document.all.dgDept.rows.length; i++) 
		{
			if (document.all.dgDept.rows[i].cells[0].childNodes[0].checked) 
			{
				fnAddPoint(document.all.dgDept.rows[i].cells[0].childNodes[1].value, document.all.dgDept.rows[i].cells[0].childNodes[2].value);
				document.all.dgDept.rows[i].cells[0].childNodes[0].checked = false;
			}
		}
	}
}
