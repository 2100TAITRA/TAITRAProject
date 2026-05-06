/*
DATE	SA		PRG		MGR_NO	DESC
1111115	David	Joe		1110883	新增程式
1120417	David	Joe		序182	新增報表功能
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
var strTableFields = new Array();

AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		}
		else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) { }
	finally { }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (document.all["h_LastDocNo"].value != "")
    {
        GetDetail(document.all["h_LastDocNo"].value, document.all["h_LastGuid"].value);
    }
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
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//1120417	Joe		序182	新增報表功能
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;		
		case "btResend":
			Page_BlockSubmit = !CheckBeforeResend();
			jf_ToolBarSubmit(xObjectName);
			break;
		    //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dgMain", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dgMain", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dgMain", "_cbSelect");
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
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//確認DATE格式是否正確 
function CheckDATE(argObj,strMsg)
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
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			$('#' + argObj).focus();
			return false;
		}
	}
	else
		return true;
}

function CheckBeforeSearch()
{
    if (document.all.txIuuseDateS.value == "" && document.all.txIuuseDateE.value == "" && document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "")
	{
		alert("請至少輸入一項條件。");
		return false;
	}

    var TempS = document.all["txIuuseDateS"].value;
    var TempE = document.all["txIuuseDateE"].value;
    if (TempS != "" && TempE == "")
        document.all["txIuuseDateE"].value = TempS;
    else if (TempS == "" && TempE != "")
        document.all["txIuuseDateS"].value = TempE;
    else if (TempS != "" && TempE != "" && TempS > TempE) {
        document.all["txIuuseDateS"].value = TempE;
        document.all["txIuuseDateE"].value = TempS;
    }

    TempS = document.all["txDocNoS"].value;
    TempE = document.all["txDocNoE"].value;
    if (TempS != "" && TempE == "")
        document.all["txDocNoE"].value = TempS;
    else if (TempS == "" && TempE != "")
        document.all["txDocNoS"].value = TempE;
    else if (TempS != "" && TempE != "" && TempS > TempE) {
        document.all["txDocNoS"].value = TempE;
        document.all["txDocNoE"].value = TempS;
    }

	return true;
}

function CheckBeforeResend()
{
	var bRtn = false;
	for (var i = 2; i <= document.all.dgMain.rows.length; i++) {
		if (document.all["dgMain__ctl" + i + "_cbSelect"].checked) {
			bRtn = true;
			break;
        }
	}
	if (!bRtn)
	{
		alert("請至少選擇一筆公文進行發文結轉。");
	}

	return bRtn;
}


function GetDetail(argDocNo,argGUID) {

	document.all["spanDocNo"].textContent = argDocNo;
	var DetailObj = ED3.EDI352_MOCS.GetDetail(argGUID);
	if (DetailObj) {
		if (DetailObj.value.ErrMsg == "") {
			//1111207	調整為有資料才顯示
			if (DetailObj.value.OrgName.length > 0) {
			    document.all["h_LastDocNo"].value = argDocNo;
			    document.all["h_LastGuid"].value = argGUID;
				document.all.DivDetail.className = '';

				for (var i = document.all.dgDetail.rows.length; i > 1; i--) {
					document.all.dgDetail.children[0].removeChild(document.all.dgDetail.children[0].children[1]);
				}

				for (var idgCnt = 0; idgCnt < DetailObj.value.IssueNo.length; idgCnt++) {
					var row = document.createElement("TR");
					//序
					var Seq = document.createElement("TD");
					Seq.setAttribute("align", "middle");
					Seq.setAttribute("nowrap", "nowrap");
					Seq.className = "InputFieldLabel";
					Seq.textContent = idgCnt + 1;

					//發文文號
					var colIssueNo = document.createElement("TD");
					var IssueNo = document.createElement("SPAN");
					IssueNo.className = "InputFieldLabel";
					IssueNo.textContent = DetailObj.value.IssueNo[idgCnt];
					colIssueNo.appendChild(IssueNo);

					//支號
					var colSubNo = document.createElement("TD");
					var SubNo = document.createElement("SPAN");
					SubNo.className = "InputFieldLabel";
					SubNo.textContent = DetailObj.value.SubNo[idgCnt];
					colSubNo.appendChild(SubNo);

					//受文機關
					var colOrgName = document.createElement("TD");
					var OrgName = document.createElement("SPAN");
					OrgName.className = "InputFieldLabel";
					OrgName.textContent = DetailObj.value.OrgName[idgCnt];
					colOrgName.appendChild(OrgName);

					//受文者
					var colOrgTitle = document.createElement("TD");
					var OrgTitle = document.createElement("SPAN");
					OrgTitle.className = "InputFieldLabel";
					OrgTitle.textContent = DetailObj.value.OrgTitle[idgCnt];
					colOrgTitle.appendChild(OrgTitle);

					row.appendChild(Seq);
					row.appendChild(colIssueNo);
					row.appendChild(colSubNo);
					row.appendChild(colOrgName);
					row.appendChild(colOrgTitle);

					document.all.dgDetail.children[0].appendChild(row);
				}
			}
			//1111207	調整為有資料才顯示
			else{
				document.all.DivDetail.className = 'hide';
			}
		}
			//1111207	調整為有資料才顯示
		else {
			alert(DetailObj.value.ErrMsg);
			document.all.DivDetail.className = 'hide';
		}
	}
}