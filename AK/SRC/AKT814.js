/*
 * DATE     PRG     MGR_NO      DESC
 * 1060220  Justin  1050087     二代公文修改
 * 1101105  Zen     1101294     修正查詢人員選單外之資料發生錯誤之問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg() {
    //1060220  Justin [1050087] 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060220  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;



    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    var arr = xObjectName.split("_");
    var pNo = arr[2].substring(3, arr[2].length);
    var pName = arr[3];

    switch (pName) {
        case "btDetail":
            Page_BlockSubmit = true;
            var borno = document.all["dg1__ctl" + pNo + "_txBorNo"].value;
            //1060220  Justin [1050087] 二代公文修改
            //var seqno = document.all["dg1__ctl" + pNo + "_lbNo"].innerText;
            var seqno = document.all["dg1__ctl" + pNo + "_lbNo"].textContent;
            if (borno == "" || seqno == "") return;
            var xUrl = "AKT814C1.aspx?BOR_NO=" + borno;
            OpenChildWindow(xUrl);
            break;
    }

}

function OpenChildWindow(sUrl) {
    var gChidkWinStyle = "width=750,height=440,fullscreen=no,resizable=yes,menubar=no,titlebar=no,scrollbars=yes,toolbar=no,center=yes";
    oWindowID = open(sUrl, "", gChidkWinStyle);
}

//1060220  Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1060220  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1060220  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (CheckBeforSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060220  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060220  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            /*			
                    case "btOpen":
                        Page_BlockSubmit = !jf_CheckKeyObject();
                        jf_ToolBarSubmit();
                        break;
                    case "btDelete":
                        Page_BlockSubmit = !jf_ConfirmDelete();
                        jf_ToolBarSubmit();
                        break;
                    case "btClean":
                        Page_BlockSubmit = true;
                        jf_ConfirmClean();
                        document.all["txDocNo"].focus();
                        break;
                    case "btPrint":
                        if(CheckBeforPrint())
                        {
                            if(jf_ConfirmPrint())
                            {
                                IsServerHandling = true;
                                jf_ShowWaitState();	
                                Page_BlockSubmit = false;
                            }
                            else
                                Page_BlockSubmit = true;
                        }
                        else
                            Page_BlockSubmit = true;
                        jf_ToolBarSubmit();
                        break;
                    case "btPreview":
                        if(CheckBeforPrint())
                        {
                            if(jf_ConfirmPrint())
                            {
                                IsServerHandling = true;
                                jf_ShowWaitState();	
                                Page_BlockSubmit = false;
                            }
                            else
                                Page_BlockSubmit = true;
                        }
                        else
                            Page_BlockSubmit = true;
                        jf_ToolBarSubmit();
                        break;
            */
    }
}

function CallBack(argCallerId) {
    /*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
	*/

}

function ClientOnLoad() {
    CheckHidden("dlUnit", "dlName");
    CheckHidden("dlTUnit", "dlTName");
    ShowMsg();
    //alert(document.all["DEPT檔案資訊組"].value);
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult) {
    //webserver回傳後動作
    //檢查回傳的webserverID
    /*//範例
    if (argResult.id == wsGetGrpNameID)
    {
    //檢查執行是否成功
    if(jf_IsWebServiceSuccess(argResult))
    {
        document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
    }
    else
    {
        document.all["txGrp_Name"].value = "";
        document.all["txGrp_No"].focus();
    }
}
*/
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060220  Justin [1050087] 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
//檢查成功回值true
function CheckBeforSave() {
    if (CheckEmpty())
        return CheckDetail();
}

//不可空白檢查
function CheckEmpty() {
    var bRtnbool = false;
    var strTUnit = document.all["dlTUnit_Text"].value;
    var strTName = document.all["dlTName_Text"].value;
    var strDate = document.all["txDate"].value;
    var strErrMsg = "";

    if (strDate == "") {
        strErrMsg = "移交日期不可為空白" + "\n" + strErrMsg;
        //1060220  Justin [1050087] 二代公文修改
        //document.all["txDate"].focus();
        $('#txDate').focus();
    }
    if (strTName == "") {
        strErrMsg = "移交人不可為空白" + "\n" + strErrMsg;
        //1060220  Justin [1050087] 二代公文修改
        //document.all["dlTName_Text"].focus();
        $('#dlTName_Text').focus();
    }
    if (strTUnit == "") {
        strErrMsg = "移交單位不可為空白" + "\n" + strErrMsg;
        //1060220  Justin [1050087] 二代公文修改
        //document.all["dlTUnit_Text"].focus();
        $('#dlTUnit_Text').focus();
    }

    if (strErrMsg != "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        bRtnbool = false;
    }
    else
        bRtnbool = true;

    return bRtnbool;
}

//不可相同檢查 & 至少一筆detail檢查
function CheckDetail() {
    var strName = document.all["dlName_Text"].value;
    var strTName = document.all["dlTName_Text"].value;
    var strErrMsg = "";
    var bCheck = false;

    //不可相同檢查
    if (strName == strTName) {
        strErrMsg = "調案人與移交人不可相同" + "\n" + strErrMsg;
        //1060220  Justin [1050087] 二代公文修改
        //document.all["dlTName_Text"].focus();
        $('#dlTName_Text').focus();
    }
    //至少一筆detail檢查

    //paul CheckOther()當他機關借調有一筆為否的後的話傳回FALSE,不檢查至少一筆的勾選
    //反正則代表沒有他機關借調為否的項目,才檢查至少一筆勾選
    if (CheckOther()) {
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
            if (document.all["dg1__ctl" + iRow + "_cbIsTran"] != null) {
                if (document.all["dg1__ctl" + iRow + "_cbIsTran"].checked)
                    bCheck = true;
            }
        }

        if (!bCheck)
            strErrMsg = "至少勾選一筆資料" + "\n" + strErrMsg;
    }

    if (strErrMsg != "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }
    else
        return true;
}

function CheckOther() {
    //paul CheckOther()當他機關借調有一筆為否的後的話傳回FALSE,不檢查至少一筆的勾選
    //反正則代表沒有他機關借調為否的項目,才檢查至少一筆勾選

    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
        //1060220  Justin [1050087] 二代公文修改 
        //if (document.all["dg1__ctl"+iRow+"_lbOther"].innerText == "否")
        if (document.all["dg1__ctl" + iRow + "_lbOther"].textContent == "否")
            return false;
    }
    return true;
}
//預覽/列印前欄位檢查
function CheckBeforPrint() {
    var bRtnbool = false;

    return bRtnbool;
}


//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/

//日期格式檢查
function txDate_onblur() {
    var strValue = document.all["txDate"].value;

    if (!strValue == "") {
        if (strValue.length < 7) {
            strValue = jf_PADL(strValue, 7, '0');
            document.all["txDate"].value = strValue;
        }
        if (!jf_CheckCDATE(strValue)) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["移交日期"])), "");
            //1060220  Justin [1050087] 二代公文修改
            //document.all["txDate"].focus();
            $('#txDate').focus();
        }
    }
}

function CheckBeforeSearch() {
    var strUnit = document.all["dlUnit_Text"].value;
    var strName = document.all["dlName_Text"].value;

    if (strUnit == "" && strName == "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["移交單位，調案人"])), "");
        //1060220  Justin [1050087] 二代公文修改
        //document.all["dlUnit_Text"].focus();
        $('#dlUnit_Text').focus();
        return false;
    }
    else if (strUnit == "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["移交單位"])), "");
        //1060220  Justin [1050087] 二代公文修改
        //document.all["dlUnit_Text"].focus();
        $('#dlUnit_Text').focus();
    }
    else if (strName == "") {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["調案人"])), "");
        //1060220  Justin [1050087] 二代公文修改
        //document.all["dlName_Text"].focus();
        $('#dlName_Text').focus();
    }
    else
        return true;
}

function Combobox_onblur(argId) {
    var bRtnBool = false;
    var strValue = document.all[argId + "_Text"].value;

    if (strValue != "") {
        for (var iItem = 0; iItem < document.all[argId].options.length; iItem++) {
            if (strValue == document.all[argId].options[iItem].text)
                bRtnBool = true;
        }
        if (!bRtnBool) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入資料不存在"])), "");
            //1060220  Justin [1050087] 二代公文修改
            //document.all[argId + "_Text"].focus();
            $('#' + argId + '_Text').focus();
        }
    }
}


function UserOnBlur(Userobj, num) {
    if (Userobj.options == null) {
        document.all["txUserValue" + num].value = "";
        return;
    }
    if (Userobj.options.length == 0) {
        document.all["txUserValue" + num].value = "";
        return;
    }
    var index = Userobj.selectedIndex;
    if (index == -1) {
        document.all["txUserValue" + num].value = "";
        return;
    }
    document.all["txUserValue" + num].value = Userobj.options[index].value;
}

function InsertDept(unit, account) {

    //	if(unit=="dlUnit")
    //	{

    //跑dlUnit的迴圈
    var tmptext = "";
    for (i = 1; i < document.all[account].length; i++) {
        if (i == 1)
            tmptext = document.all[account].options[i].text + ":" + document.all[account].options[i].value
        else
            tmptext += "," + document.all[account].options[i].text + ":" + document.all[account].options[i].value
        //alert(document.all["dlName"].options[i].text);
        //alert(document.all["dlName"].options[i].value);
    }
    var selectedunit = document.all[unit].selectedIndex;
    //1060220  Justin [1050087] 二代公文修改
    //document.all["DEPT" + document.all[unit](selectedunit).text].value = tmptext;
    document.all["DEPT" + document.all[unit][selectedunit].text].value = tmptext;
    //alert("1" + document.all["DEPT"+document.all[unit](selectedunit).text].value);
    //	}
}
function CheckHidden(unit, account) {
    //	if(unit=="dlUnit")
    //	{
    var selectedunit = document.all[unit].selectedIndex;
    //1060220  Justin [1050087] 二代公文修改
    //if (document.all["DEPT" + document.all[unit](selectedunit).text].value == "")
    if (document.all["DEPT" + document.all[unit][selectedunit].text].value == "")
        return true;


    //將值塞回dlName
    //clear the ComboBox of User


    //if(document.all[account].length != undefined);
    if (document.all[account].length != 1) {
        document.all[account + "_Text"].value = "";
        var len = document.all[account].length;
        for (i = 0 ; i < len ; i++)
            document.all[account].remove(0);
    }

    //add new data into the ComboBox of User
    //1060220  Justin [1050087] 二代公文修改
    //var resultObj = document.all["DEPT" + document.all[unit](selectedunit).text].value.split(",");
    var resultObj = document.all["DEPT" + document.all[unit][selectedunit].text].value.split(",");
    len = resultObj.length;

    //1101105 Zen 1101294 修正查詢人員選單外之資料發生錯誤之問題，還原空白選項
    document.all[account].options.add(new Option("",""));
    for (i = 0 ; i < len ; i++) {
        //分出TEXT與VALUE
        var tmptext = resultObj[i].substr(0, resultObj[i].indexOf(":"));

        var tmpvalue = resultObj[i].substr(resultObj[i].indexOf(":") + 1);

        var objOption = new Option(tmptext, tmpvalue)
        document.all[account].options.add(objOption);

    }


    return false;
    //	}
}