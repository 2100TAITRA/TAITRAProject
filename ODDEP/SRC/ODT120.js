/*
DATE 	SA		PRG		MGR_NO	DESC
0951019	Stella	Charles	955104	二層式登記桌修改
0960315 Stella	Whay	960053	標籤列印由條碼機輸出 for 臺科大
1031028	Leslie	Kenny	1030836	配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324	增加WebFileIO錯誤訊息處理
1050711 David   Justin  1050087 二代公文修改
1120926 Kevin   Zen     1120752 修正共用題號區間時取號可能重複之問題
1131126 Kevin   Zen     1120752 修正無法預印明年度標籤之問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1131126 Zen 1120752 修正無法預印明年度標籤之問題
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}


/*1050711 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;*/

function ShowMsg()
{
    /*1050711 Justin 1050087 二代公文修改
    if (document.all["ValidationSummary1"].innerText != "")
        alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btDel"));
    var btDel;
    if (document.all["dg1__ctl" + pNo + "_btDel"] != null)
        btDel = document.all["dg1__ctl" + pNo + "_btDel"].id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btAdd":
            Page_BlockSubmit = true;
            if (CheckBeforeAdd())
            {
                btAdd();
                document.all["txDocNoS_M"].value = "";
                document.all["txDocNoE_M"].value = "";
                //1050711 Justin 1050087 二代公文修改
                //document.all["txDocNoS_M"].focus();
                $('#txDocNoS_M').focus();
            }
            break;
        case btDel:
            Page_BlockSubmit = true;
            DeleteRow(pNo);
            break;
    }
}

//1050711 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050711 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            //還原隱藏欄位值
            var strDeptName = document.all["dlDept_Text"].value;
            var strDocStart = document.all["H_DocStart"].value;
            var strDocEnd = document.all["H_DocEnd"].value;
            var strSysDate = document.all["H_SysDate"].value;
            jf_ConfirmClean();
            document.all["dlDept_Text"].value = strDeptName;
            document.all["H_DocStart"].value = strDocStart;
            document.all["H_DocEnd"].value = strDocEnd;
            document.all["H_SysDate"].value = strSysDate;
            //回復初始化
            document.all["rb1"].checked = true;
            document.all["rbSingleZone"].checked = true;
            rbZone_OnClick("rbSingleZone");
            //focus
            //1050711 Justin 1050087 二代公文修改
            //document.all["txDocNoS"].focus();
            $('#txDocNoS').focus();
            break;
        case "btPrint":
        case "btPreview":
            jf_PADCHAR(document.all.txUseYear, 3, 0);
            Page_BlockSubmit = !CheckBeforePrint(xObjectName);
            //1050711 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function ClientOnLoad()
{
    ShowMsg();
    if (document.all["rbSingleZone"].checked)
        rbZone_OnClick("rbSingleZone");
    //1120926 Zen 1120752 修正共用題號區間時取號可能重複之問題，新增條碼重印選項
    else if (document.all["rbReprint"].checked)
        rbZone_OnClick("rbReprint");
    else
        rbZone_OnClick("rbMultiZone");

    /*1050711 Justin 1050087 二代公文修改 移除無用jf_CallWS
    jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, null);*/
    //[需求單955104] 初始時先儲存二級單位下拉式選單的Text、Value、所有選項Value  Charles 0951018
    if (document.all["H_OD_FLOW_TYPE"].value == "2")
    {
        //設定收文科別的下拉選單
        if (document.all["dlDept_Text"].value == "")
        {
            while (document.all["dlSubDept"].length > 0)
                document.all["dlSubDept"].remove(0);
            document.all["dlSubDept"].size = 2;
            document.all["dlSubDept"].options.add(new Option("", ""));
            document.all["dlSubDept_Text"].value = "";
        }
        if (document.all["dlSubDept_Text"].value != "")
            document.all["dlSubDept_Container"].className = "";
        else
            document.all["dlSubDept_Container"].className = "DisplayOnly";
    }
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_SubDept"].value = document.all["dlSubDept_Text"].value;
    document.all["H_SubDept_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"], document.all["H_SubDept"].value);
    document.all["H_dlSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);

    //無值不顯示
    jf_HandleComboxStatus("dlSubDept");

    //台科大條碼機列印條碼
    DownLoadPrintFile();
    //1050711 Justin 1050087 二代公文修改，判斷瀏覽器--Start--
    if (getIEVersion() == -1 && document.all["H_ORG_NO"].value == "310040000Q")
        if (!confirm("非IE瀏覽器無法進行條碼整合功能，是否繼續使用"))
            close();
    //1050711 Justin 1050087 二代公文修改，判斷瀏覽器--End--
}

//1050711 Justin 1050087 二代公文修改，判斷瀏覽器
function getIEVersion()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");  //for IE 11
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050711 Justin 1050087 二代公文修改 
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;

}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//############################################################################################
//					物		件		Event
//############################################################################################
function ck2_OnClick()
{
    if (document.all["ck2"].checked)
        document.all["txDate"].value = document.all["H_SysDate"].value;
}

function rbZone_OnClick(argType)
{
    if (argType == "rbSingleZone")
    {
        //單一區間
        document.all["plSingle"].className = "";
        document.all["plMulti"].className = "hide";

        //1120926 Zen 1120752 修正共用題號區間時取號可能重複之問題，取號列印隱藏列印條碼區間
        if (document.all['DOC_USED_BYCTRL'].value == "Y")
            document.all['divSingleBarcodeRange'].className = "hide";
    }
    //1120926 Zen 1120752 修正共用題號區間時取號可能重複之問題，新增條碼重印選項
    else if (argType == "rbReprint")
    {
        document.all['divSingleBarcodeRange'].className = "";
        document.all["plMulti"].className = "hide";
    }
    else
    {
        //多區間
        document.all["plSingle"].className = "hide";
        document.all["plMulti"].className = "";
    }
}

function CheckCDATE(argObj, strMsg)
{
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
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1050711 Justin 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}

function txNumberOnBlur()
{
    //1120926 Zen 1120752 修正共用題號區間時取號可能重複之問題
    //if (document.all.txNumber.value != "" && document.all.txUseNo.value != "" && document.all['rbReprint'].checked)
    if (document.all.txNumber.value != "" && document.all.txUseNo.value != "" && document.all['rbSingleZone'].checked)
    {
        document.all.txDocNoS.value = document.all.txUseNo.value.toString();//0930318 justin 取消+1
        document.all.txDocNoE.value = (parseInt(document.all.txUseNo.value.toString() - 1) + parseInt(document.all.txNumber.value.toString())).toString();
    }
    //1120926 Zen 1120752 修正共用題號區間時取號可能重複之問題
    else if (document.all.txNumber.value != "" && document.all.txUseNo.value != "" && document.all['rbReprint'].checked)
    {
        document.all.txDocNoS.value = document.all['txUseNo'].value - document.all['txNumber'].value
        document.all.txDocNoE.value = document.all['txUseNo'].value - 1;
    }
}
//############################################################################################
//					Client Button Click
//############################################################################################
//新增一筆row前檢查
function CheckBeforeAdd()
{
    if (!IsEmpty())
    {
        if (!IsReverse(document.all["txDocNoS_M"].value, document.all["txDocNoE_M"].value))
        {
            if (!IsFull())
                return !CheckIsDuplicate();
        }
    }
}

//檢查起迄是否空白
function IsEmpty()
{
    if (document.all["txDocNoS_M"].value == "" || document.all["txDocNoE_M"].value == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請輸入條碼區間起迄值"])), "");
        return true;
    }
    return false;
}

//檢查是否起迄相反
function IsReverse(SDoc, EDoc)
{
    var iStart = Number(SDoc);
    var iEnd = Number(EDoc);
    if (iStart > iEnd)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["起值不可大於迄值"])), "");
        return true;
    }
    return false;
}

//檢查dg1是否已經滿了(5 筆)
function IsFull()
{
    if (document.all["dg1"] == null)
        return false;
    if (document.all["dg1"].rows.length < 6)
        return false;
    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印區間已滿，不允許您再加入"])), "");
    return true;
}

//是否區間重疊檢查
function CheckIsDuplicate()
{
    if (document.all["dg1"] == null)
        return false;

    var strSeq = "";
    var strBuf = "";
    var argZone;
    var strZone;
    var SDoc = document.all["txDocNoS_M"].value;
    var EDoc = document.all["txDocNoE_M"].value;
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        //1050711 Justin 1050087 二代公文修改
        //strZone = document.all["dg1__ctl" + iRow + "_lbZone"].innerText;
        strZone = document.all["dg1__ctl" + iRow + "_lbZone"].textContent;
        if (strZone != "")
        {
            argZone = strZone.split('~');
            if (IsDuplicate(SDoc, EDoc, argZone[0], argZone[1]))
            {
                strSeq += strBuf + (Number(iRow) - 1);
                strBuf = ",";
            }
        }
    }

    if (strSeq != "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您加入之區間與序號 " + strSeq + " 之區間重疊，系統不允許您加入!"])), "");
        return true;
    }
    return false;
}

//判斷是否列印區間重疊
function IsDuplicate(SDoc, EDoc, SZone, EZone)
{
    var iSDoc = Number(SDoc);
    var iEDoc = Number(EDoc);
    var iSZone = Number(SZone);
    var iEZone = Number(EZone);

    if ((iSDoc >= iSZone) && (iSDoc <= iEZone))
        return true;
    if ((iEDoc >= iSZone) && (iEDoc <= iEZone))
        return true;
    if ((iSZone >= iSDoc) && (iSZone <= iEDoc))
        return true;
    if ((iEZone >= iSDoc) && (iEZone <= iEDoc))
        return true;
    return false;
}

//新增一筆row
function btAdd()
{
    var InsertRow;
    var len;

    if (document.all["dg1"].rows[1] != null)
    {
        //1050711 Justin 1050087 二代公文修改
        //if (document.all["dg1"].rows[1].cells[1].innerText == "")
        if (document.all["dg1"].rows[1].cells[1].textContent == "\n                                        \n                                    ")
            document.all["dg1"].deleteRow(1);
    }

    InsertRow = document.all["dg1"].insertRow();
    len = document.all["dg1"].rows.length;	//先Insert so長度已+1

    //ID整除==單數序
    /*1050822 Justin 1050087 二代公文修改
    if (len % 2==0)
        InsertRow.style.backgroundColor = "#F7F7DE";
    //置中
    InsertRow.style.textAlign = "Center";*/

    //序
    var lbSeq = document.createElement("span");
    lbSeq.setAttribute("id", "dg1__ctl" + len + "_lbSeq");
    //1050711 Justin 1050087 二代公文修改
    //lbSeq.setAttribute("innerText",len-1);
    InsertRow.insertCell(0).appendChild(lbSeq);
    document.all("dg1__ctl" + len + "_lbSeq").textContent = len - 1;

    //列印區間
    var lbZone = document.createElement("span");
    lbZone.setAttribute("id", "dg1__ctl" + len + "_lbZone");
    //1050711 Justin 1050087 二代公文修改
    //lbZone.setAttribute("innerText", document.all["txDocNoS_M"].value + "~" + document.all["txDocNoE_M"].value);
    InsertRow.insertCell(1).appendChild(lbZone);
    document.all("dg1__ctl" + len + "_lbZone").textContent = document.all["txDocNoS_M"].value + "~" + document.all["txDocNoE_M"].value;

    //執行
    var btDel = document.createElement("input");
    btDel.setAttribute("id", "dg1__ctl" + len + "_btDel");
    btDel.setAttribute("type", "submit");
    btDel.setAttribute("value", "刪除");
    InsertRow.insertCell(2).appendChild(btDel);
}

//刪除點選的該筆row
function DeleteRow(iDel)
{
    var len = document.all["dg1"].rows.length;

    //先將欲刪除的下一筆value寫入上一筆
    for (var iCheck = iDel; iCheck < len + 1; iCheck++)
    {
        //最後一筆不異動
        if (iCheck != len)
        {
            //1050711 Justin 1050087 二代公文修改
            //document.all["dg1__ctl" + iCheck + "_lbZone"].innerText = document.all["dg1__ctl" + (Number(iCheck) + 1) + "_lbZone"].innerText;
            document.all["dg1__ctl" + iCheck + "_lbZone"].textContent = document.all["dg1__ctl" + (Number(iCheck) + 1) + "_lbZone"].textContent;
            document.all["dg1__ctl" + iCheck + "_btDel"].value = document.all["dg1__ctl" + (Number(iCheck) + 1) + "_btDel"].value;
        }
    }

    //再把剩下最後的1筆刪掉
    document.all["dg1"].deleteRow(len - 1);
}

//############################################################################################
//					Toolbar Button Click
//############################################################################################
//列印前檢查 
function CheckBeforePrint(btName)
{
    //1120926 Zen 1120752 修正共用題號區間時取號可能重複之問題，支援條碼區間swap
    let strDocNoS = $('#txDocNoS').val();
    let strDocNoE = $('#txDocNoE').val();

    if (strDocNoS == '' && strDocNoE != '')
        $('#txDocNoS').val(strDocNoE);
    else if (strDocNoS != '' && strDocNoE == '')
        $('#txDocNoE').val(strDocNoS);
    else if (Number(strDocNoS) > (Number(strDocNoE))) 
    {
        $('#txDocNoS').val(strDocNoE);
        $('#txDocNoE').val(strDocNoS);
    }

    let strUseNo = $('#txUseNo').val();
    strDocNoS = $('#txDocNoS').val();
    strDocNoE = $('#txDocNoE').val();
    if (document.all['rbReprint'].checked && (Number(strUseNo) < Number(strDocNoS) || Number(strUseNo) < Number(strDocNoE)))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["僅允許重印已取號之條碼"])), "");
        return false;
    }

    var strOrgNo = document.all["H_ORG_NO"].value;
    if (strOrgNo == "310040000Q" && btName == "btPreview" && document.all["rbPrBar"].checked)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您預設以條碼機列印，無法預覽"])), "");
        return false;
    }
    if (document.all["rbSingleZone"].checked)
    {
        if (!CheckBySingleZone())
        {
            //1050711 Justin 1050087 二代公文修改
            //document.all["txDocNoS"].focus();
            $('#txDocNoS').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您尚未設定列印區間!!"])), "");
            return false;
        }
        if (IsReverse(document.all["txDocNoS"].value, document.all["txDocNoE"].value))
        {
            //1050711 Justin 1050087 二代公文修改
            //document.all["txDocNoS"].focus();
            $('#txDocNoS').focus();
            return false;
        }
    }
    else
    {
        if (!CheckByMultiZone())
        {
            //1050711 Justin 1050087 二代公文修改
            //document.all["txDocNoS_M"].focus();
            $('#txDocNoS_M').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您尚未設定列印區間!!"])), "");
            return false;
        }
        SetHiddenField();
    }

    //[需求單955102] 預覽 列印前檢查 Charles 0951019
    if (!dlDept_Text_onblur(true))
        return false;

    if (document.all["H_OD_FLOW_TYPE"].value == "2")
    {
        if (!dlSubDept_Text_onblur(true))
            return false;
    }

    return true;
}

//單一區間列印前檢查
function CheckBySingleZone()
{
    if (document.all["txDocNoS"].value == "")
        return false;
    if (document.all["txDocNoE"].value == "")
        return false;
    return true;
}

//多區間列印前檢查
function CheckByMultiZone()
{
    if (document.all["dg1"] == null)
        return false;
    if (document.all["dg1"].rows.length == 1)
        return false;
    if (document.all["dg1"].rows.length > 2)
        return true;
    //若只有一筆，則列印區間不可為空白
    //1050711 Justin 1050087 二代公文修改 
    //if (document.all["dg1"].rows[1].cells[1].innerText == "")
    if (document.all["dg1"].rows[1].cells[1].textContent == "")
        return false;
    return true;
}

//存放區間至server端
function SetHiddenField()
{
    var strZone = "";
    var strValue = "";
    var strBuf = "";
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        //1050711 Justin 1050087 二代公文修改 
        //strZone = document.all["dg1__ctl" + iRow + "_lbZone"].innerText;
        strZone = document.all["dg1__ctl" + iRow + "_lbZone"].textContent;
        strValue += strBuf + strZone;
        strBuf = ":";
    }
    document.all["H_Zone"].value = strValue;
}

//[需求單955104] 下拉選單檢查 Charles 0951018 ↓
function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlDept", "單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;

            if (document.all["H_OD_FLOW_TYPE"].value == "2")
            {
                //設定收文科別的下拉選單
                odjf_SetdlDept("dlDept", "dlSubDept", "", "", false);
                //存ComboBox_Text的value
                document.all["H_SubDept"].value = document.all["dlSubDept_Text"].value;
                //存所選擇的ComboBox項目的value
                document.all["H_SubDept_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"], document.all["H_SubDept"].value);
                //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
                document.all["H_dlSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);
                //依選項多寡固定下拉式選單可見長度
                if (document.all["dlSubDept"].options.length > 10)
                    document.all["dlSubDept"].size = 10;
                else if (document.all["dlSubDept"].options.length == 1)
                    document.all["dlSubDept"].size = 2;
                else
                    document.all["dlSubDept"].size = document.all["dlSubDept"].options.length;
                //無值不顯示
                jf_HandleComboxStatus("dlSubDept");
            }
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSubDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlSubDept_Text"].value != document.all["H_SubDept"].value)
    {
        //呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlSubDept", "二級單位"))
        {
            //存ComboBox_Text的value
            document.all["H_SubDept"].value = document.all["dlSubDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_SubDept_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"], document.all["H_SubDept"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1050711 Justin 1050087 二代公文修改 
        //document.all[argComboxID+"_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}
//[需求單955104] 下拉選單檢查 Charles 0951018 ↑

//1131126 Zen 1120752 修正無法預印明年度標籤之問題，額外帶出目前年度之使用號
function GetUsedNo()
{
    let strSourceOrgno = document.all['H_ORG_NO'].value;
    let strUseYear = document.all['txUseYear'].value;
    let strDeptNo = document.all['H_DeptNo'].value;

    let rtnObj = OD.ODT120.GetUsedNo(strSourceOrgno, strUseYear, strDeptNo);

    document.all["H_DocStart"].value = rtnObj.value.strDocStrat;
    document.all["H_DocEnd"].value = rtnObj.value.strDocEnd;
    document.all["txUseNo"].value = rtnObj.value.strDocUsed;
}

/***********************************
*
*  於clientonload下載txt和bat並執行bat
*
************************************/
function DownLoadPrintFile()
{
    if (document.all["FILE_NAME"])
    {
        var strFileName = document.all["FILE_NAME"].value;
        var strIniFileName = document.all["INI_FILE_NAME"].value;
        var strBatFileName = document.all["BATCH_FILE_NAME"].value;
        var strPath = document.all["FILE_PATH"].value;
        var strPathServer = document.all["FILE_PATH_SERVER"].value;

        var strTranEName = "TranE.exe";
        var strFMTName = "eltron.FMT";

        var strExeName = strPath + strBatFileName;

        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var soap = new ActiveXObject("WSWrapper.WebFileIO");
        try
        {
            if (!fso.FolderExists(strPath)) //下載目的資料夾不存在時建立資料夾
                fso.CreateFolder(strPath);

            //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
            //soap.Init(document.all["AP_FILEIO_WS"].value);
            var serviceURL = document.all["AP_FILEIO_WS"].value
            if (document.all.II_USE_SSL != null)
            {
                if (document.all.II_USE_SSL.value == "Y")
                    serviceURL = serviceURL.replace("http://", "https://");
            }
            soap.Init(serviceURL);

            soap.AddFile(strPathServer, strFileName);
            soap.Download(document.all["SsoArtifact"].value, true, strPath);
        }
        catch (e)
        {
            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
            //alert("下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message);
            alert("連接伺服器" + serviceURL + "下載檔案" + strFileName + "失敗，錯誤訊息：" + e.message + soap.ErrorMessage);
        }
        try
        {
            soap.AddFile(strPathServer, strIniFileName);
            soap.Download(document.all["SsoArtifact"].value, true, strPath);
        }
        catch (e)
        {
            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
            //alert("下載檔案"+strIniFileName+" 失敗，錯誤訊息：" + e.message);
            alert("連接伺服器" + serviceURL + "下載檔案" + strIniFileName + " 失敗，錯誤訊息：" + e.message + soap.ErrorMessage);
        }
        try
        {
            soap.AddFile(strPathServer, strBatFileName);
            soap.Download(document.all["SsoArtifact"].value, true, strPath);
        }
        catch (e)
        {
            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
            //alert("下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message);
            alert("連接伺服器" + serviceURL + "下載檔案" + strBatFileName + "失敗，錯誤訊息：" + e.message + soap.ErrorMessage);
        }
        try
        {
            if (!fso.FileExists(strPath + strTranEName))
            {
                soap.AddFile(strPathServer, strTranEName);
                soap.Download(document.all["SsoArtifact"].value, true, strPath);
            }
        }
        catch (e)
        {
            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
            //alert("下載檔案" + strTranEName + "失敗，錯誤訊息：" + e.message);
            alert("連接伺服器" + serviceURL + "下載檔案" + strTranEName + "失敗，錯誤訊息：" + e.message + soap.ErrorMessage);
        }
        try
        {
            if (!fso.FileExists(strPath + strFMTName))
            {
                soap.AddFile(strPathServer, strFMTName);
                soap.Download(document.all["SsoArtifact"].value, true, strPath);
            }
        }
        catch (e)
        {
            //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
            //alert("下載檔案" + strFMTName + "失敗，錯誤訊息：" + e.message);
            alert("連接伺服器" + serviceURL + "下載檔案" + strFMTName + "失敗，錯誤訊息：" + e.message + soap.ErrorMessage);
        }
        var objShell = new ActiveXObject("Shell.Application");
        objShell.ShellExecute(strPathServer + strBatFileName, "", "", "open", 1);


    }
}