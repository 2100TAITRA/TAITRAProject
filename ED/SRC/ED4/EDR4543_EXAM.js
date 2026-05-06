/*	
DATE	SA		PG		MGR_NO  DESC
1110321	Kevin	Joe	    1101576	新增EDR4543_EXAM 單位公文處理情形統計表列印作業
1110412 Kevin	Kevin	--		修正考試院開啟程式
1110817	Kevin	Joe	  	1110645	新增匯出Excel功能
1120912 Kevin	Joe     1120802 修改日期欄位判斷方式
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
	//1110822	Joe	  	1110645	新增匯出Excel功能
	if(document.all["dlDept_Text"].value == "")
		document.all.btExcel.disabled = true;
	else
		document.all.btExcel.disabled = false;
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
		//1110822	Joe		1110645		新增匯出Excel功能
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

    //1120912   Joe     1120802     修改日期欄位判斷方式
    //if (document.all.txDateS.value == '' && document.all.txDateE.value == '') {
    if (document.all.txDateS.value == '' || document.all.txDateE.value == '') {
        strErrMsg += '日期欄位不可為空';
        $('#txDateS').focus();
    }
    else if (document.all.txDateE.value > document.all.hMaxMonth.value) {
        strErrMsg += '列印月份不可大於目前統計最大月份';
        $('#txDateS').focus();
    }

    //1120912   Joe     1120802     修改日期欄位判斷方式
    if (!CheckDATE('txDateS', '列印日期(起)'))
        return false;
    if (!CheckDATE('txDateE', '列印日期(迄)'))
        return false;
    

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
            //1120912   Joe     1120802     修改日期欄位判斷方式
            //return;
            return false;
        }
        if (strDate > document.all.hMaxMonth.value) {
            alert(argMsg + '不可大於目前統計最大月份');
            $('#' + argObj).focus();
            //1120912   Joe     1120802     修改日期欄位判斷方式
            //return;
            return false;
        }

        var DateArr = ED4.EDR4543_EXAM.GetStaticDate(document.all["H_OrgNo"].value, strDate).value;
        if (DateArr[0] != "") {
            alert(DateArr[0]);
            $('#' + argObj).focus();
            //1120912   Joe     1120802     修改日期欄位判斷方式
            //return;
            return false;
        }
        
        document.all.txDateS.value = DateArr[1];
        document.all.txDateE.value = DateArr[2];
    }

    //1120912   Joe     1120802     修改日期欄位判斷方式
    return true;
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
		//1110822	Joe		1110645		新增匯出Excel功能
		document.all.btExcel.disabled = true;
		return false;
	}
	if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value)) {
		if (ComboBoxCheck("dlDept", "承辦單位")) {
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
			//1110822	Joe		1110645		新增匯出Excel功能
			document.all.btExcel.disabled = false;
		}
		else {
			document.all["dlDept_Text"].value = "";
			document.all["H_Dept"].value = "";
			//1110822	Joe		1110645		新增匯出Excel功能
			document.all.btExcel.disabled = true;
			alert("承辦單位不存在");
			return false;
		}
	}
	return bCheckOK;
}