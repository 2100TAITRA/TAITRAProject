/*	
DATE	SA		PG		MGR_NO      DESC
1111122	Kevin	Kevin   1111013	    新增EDR4546_EXAM 公文處理情形統計表
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
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;


    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btStatic":  //執行統計
			//1110412 Kevin 修正考試院開啟程式
            //var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
			var xUrl = "../../../ODDEP/ODP420_EXAM.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
            jf_OpenChildWin(xUrl, "ODP420", 760, 500);
            Page_BlockSubmit = true;
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
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
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    var strErrMsg = '';
    var bRtn = true;

    if (document.all.txDateS.value == '' && document.all.txDateE.value == '') {
        strErrMsg += '日期欄位不可皆為空';
        $('#txDateS').focus();
    }
    /*
    else if (document.all.txDateE.value > document.all.hMaxMonth.value) {
        strErrMsg += '列印月份不可大於目前統計最大月份';
        $('#txYearmonth').focus();
    }
    */

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        bRtn = false;
    }

    return bRtn;
}

function CheckDATE(argObj, argMsg)
{
    var strErrMsg = '';
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            jf_ShowMsg(strErrMsg, '');
            $('#' + argObj).focus();
            return;
        }
    }
}


function ComboBoxCheck(argComboBoxID, argKeyMsg) {
	var bRtnBool = false;
	var ComboBoxObj = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
		return bRtnBool;
	}

	for (i = 0; i < ComboBoxObj.options.length; i++) {
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text) {
			bRtnBool = true;
			break;
		}
	}

	if (!bRtnBool) {
		$('#' + argComboBoxID + "_Text").focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}
//ComboBox 處理
function dlDept_Text_onblur() {
	var bCheckOK = true;
	if (dlDept.value == "") {
		document.all["dlDept_Text"].value = "";
		document.all["H_Dept"].value = "";
		document.all["H_Dept_Value"].value = "";
		return false;
	}
	if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value)) {
		if (ComboBoxCheck("dlDept", "承辦單位")) {
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
		}
		else {
			document.all["dlDept_Text"].value = "";
			document.all["H_Dept"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}
	return bCheckOK;
}