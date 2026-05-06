/*
DATE	SA		PRG		MGR_NO			DESC
1070328	David	Zen     1070217         新增EDI245 回閱通知查詢檢視作業
1100422	Kevin	Joe		1090297			新增日期、承辦單位條件
1110321	David	Joe		1101416			依系統參數修改回閱名稱
1140801	Zen		Zen		1140922	        線上瀏覽功能調整為不可編輯模式
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

var strCurrentOrder;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (document.all['rbNewTime'].checked)
        strCurrentOrder = 'rbNewTime';
    else if (document.all['rbDocNo'].checked)
        strCurrentOrder = 'rbDocNo';
    else if (document.all['rbInchargeOu'].checked)
        strCurrentOrder = 'rbInchargeOu';
    jf_SelectClear('dg1', '_cbSelect');

	//1100422	Joe		1100297		新增承辦單位
	//初始時先儲存下拉式選單的Text、Value、所有選項Value
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	
	//1110321	Joe		1101416		依系統參數修改回閱名稱
	if(document.all.RESIGN_SUBFOLDER.value != "")
		document.title = document.title.replace("回閱", document.all.RESIGN_SUBFOLDER.value);

	//無值不顯示
    jf_HandleComboxStatus("dlSect");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf('_btView'));
    var btView;

    //取得確實按下的是哪個？鍵
    if (document.all['dg1__ctl' + pNo + '_btView'] != null)
        btView = document.all['dg1__ctl' + pNo + '_btView'].id;

    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case 'btSelectAll':
            Page_BlockSubmit = true;
            jf_SelectAll('dg1', '_cbSelect');
            break;
        case 'btSelectInverse':
            Page_BlockSubmit = true;
            jf_SelectInverse('dg1', '_cbSelect');
            break;
        case 'btSelectClear':
            Page_BlockSubmit = true;
            jf_SelectClear('dg1', '_cbSelect');
            break;
        case btView:
            var strArtifact = jf_GetArtifact();
            var strDocNo = document.all['dg1__ctl' + pNo + '_lbDocNo'].textContent;
            var strOrgNo = document.all['H_OrgNo'].value;
            var strSignType = document.all['dg1__ctl' + pNo + '_lbSignType'].textContent;
            ViewDoc(strArtifact, strDocNo, strOrgNo, strSignType);
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

    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
    	case 'btSearch':
			//1100422	Joe		1100297		新增查詢條件
        	//Page_BlockSubmit = false;
        	Page_BlockSubmit = !CheckBeforeSearch();
            IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case 'btDelete':
            Page_BlockSubmit = !CheckBeforeDelete();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeDelete()
{
    var dg1 = document.all['dg1'];
    var strMsgIdList = '';

    if (dg1 == undefined)
        return false;

    for (var nRow = 2; nRow <= dg1.rows.length; nRow++)
    {
        var cbSelect = document.all['dg1__ctl' + nRow + '_cbSelect'];
        var lbMsgId = document.all['dg1__ctl' + nRow + '_lbMsgId'];
        if (cbSelect.checked == true)
            strMsgIdList += lbMsgId.textContent + ',';
    }
    strMsgIdList = strMsgIdList.slice(0, -1);
    document.all['H_txMsgIdList'].value = strMsgIdList;

    if (strMsgIdList == '')
    {
        alert('請至少勾選一筆資料');
        return false;
    }

    return true;
}

function DataSort(senderId)
{
    if (strCurrentOrder != senderId)
        jf_ToolBarSubmit('btSearch');
}

function ViewDoc(argArt, argDocNo, argOrgNo, argSignType)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;

    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
        if (wsUrl == undefined)
            wsUrl = opener.opener.theWebServices.url('fileiows');

        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#artifact#', artifact);
        unvSrc = unvSrc.replace('#DocNo#', strDocNo);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, strOrgNo);

        var sUnvObj = unvSrc;
        if (sUnvObj !== '')
        {
            var UnvObj = JSON.parse(sUnvObj);
            var objViewDoc = {
                UNVObj: UnvObj,
                docInfoPage: 'EDI245',
                openDocModule: 'AOL',
                signType: argSignType,
                //1140801 Zen 1140922 線上瀏覽功能調整為不可編輯模式
                //readOnlyMode: false,
                readOnlyMode: true,
                disableSave: true
            };
            var $docId = jf_GetSessionID() + '_' + (+new Date());
            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
            var unvUrl = location.origin + '/MS/RD-ViewDoc.html?Artifact=' + jf_GetArtifact() + '&DocId=' + $docId;
            jf_OpenChildWin(unvUrl, 'ViewDoc');
        }

    } catch (e)
    {
        alert('開啟失敗');
    }
}

//1100422	Joe		1090297		新增日期、承辦單位條件
function DateCheck(argObj, strMsg) {
	strMsg = document.all.dlDate.options[document.all.dlDate.selectedIndex].text + strMsg;

	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			return false;
		}
	}
	return true;
}

function CheckBeforeSearch() {
	var bRtn = true;
	if (document.all.txDateS.value != "" && document.all.txDateE.value == "")
		document.all.txDateE.value = document.all.txDateS.value;
	else if (document.all.txDateE.value != "" && document.all.txDateS.value == "")
		document.all.txDateS.value = document.all.txDateE.value;
	else if (document.all.txDateS.value != "" && document.all.txDateE.value != "" && document.all.txDateS.value > document.all.txDateE.value) {
		var temp = document.all.txDateS.value;
		document.all.txDateS.value = document.all.txDateE.value;
		document.all.txDateE.value = temp;
	}
	
	return bRtn;
}

function dlDept_Text_onblur() {
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value) {
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if (edjf_ComboBoxCheck("dlDept", "承辦單位")) {
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

			var bSubTree = true;
			if (document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;

			//初始dlSect、dlUser的處理
			edjf_SetdlDept("dlDept", "dlSect", "", "", bSubTree, true);

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

			//依選項多寡固定下拉式選單可見長度
			if (document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if (document.all["dlSect"].options.length == 1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
			
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSect_Text_onblur() {
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value) {
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if (edjf_ComboBoxCheck("dlSect", "承辦科別")) {
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

			edjf_SetdlSect("dlDept", "dlSect", "", "", false, true);
					}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}
