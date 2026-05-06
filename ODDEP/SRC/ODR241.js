/*
DATE 	SA		PRG		MGR_NO	DESC
0951025	Stella	Charles	955091	二層式架構修改
0960329 Stella  Zoey	000297	新增註冊機關代碼，供開啟ODI260
0960630 --		Leo		0970665	刪除在按下催辦單時出現的alert訊息，應該是前人在debug時產生的結果
0980824	Stella	David	0980391	二級單位選單增加(僅含一級單位)選項
0990819			Johnny	0990402 新增excel匯出 (CDC需求單)
0991020			Johnyy			加上artifact
1001121 Kevin	Ken		1000888	新增標檢局催辦單、會辦催辦單
1031112 Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1040416	Kevin	Kenny	1040233	調整全選/反選邏輯；唯主辦公文可選取
1041223	Leslie	Leslie	--		二代公文系統相關修改
1050525	Leslie	Kenny	1050087	二代公文系統相關修改，以最新SOP調整修改方式
1110127	Kevin   Joe		1110011	增加Client端日期顯示處理
1111101	Kevin   Joe		--		新增ODR240~242判斷不顯示OD17
1140604	Zen		Zen		1140179	(退輔會)調整預設排序方式為承辦人，且此時額外依承辦人公文件數做小計，支援匯出ODS
*/

//1041223	Leslie	Leslie	--		二代公文系統相關修改
$(document).ready(function ()
{
    $('.V2_GenericBannerToolBar > input[type=submit]').each(function ()
    {
        this.addEventListener('click', jf_ToolBarHandle);
        //$(this).on('tap',function(){jf_ToolBarHandle()});
        if ($(this).attr('defaultstyle') == undefined)
            return;
        var ModeStyle = $(this).attr('defaultstyle').split(';')[jf_GetActionMode()];
        var style = (ModeStyle.split(':')[1] == 'block') ? "" : "none";
        $(this).css('display', style);
    });
})

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1041223	Leslie	二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1041223	Leslie	二代公文系統相關修改
    jf_ShowValidator();
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btAll":

            if (document.all["dg1"] != null)
            {
                for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
                {
                    //1040416	Kenny	[1040233]	同時滿足CheckBox為enable狀態下(主辦公文)才選取
                    //if (document.all["dg1__ctl"+iRow+"_cbMark"].checked == false)
                    if (document.all["dg1__ctl" + iRow + "_cbMark"].checked == false && document.all["dg1__ctl" + iRow + "_cbMark"].disabled == false)
                        document.all["dg1__ctl" + iRow + "_cbMark"].checked = true;
                }
            }
            Page_BlockSubmit = true;
            break;
        case "btClean":
            if (document.all["dg1"] != null)
            {
                for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
                {
                    if (document.all["dg1__ctl" + iRow + "_cbMark"].checked == true)
                        document.all["dg1__ctl" + iRow + "_cbMark"].checked = false;
                }
            }
            Page_BlockSubmit = true;
            break;
        case "btChange":

            if (document.all["dg1"] != null)
            {
                for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
                {
                    if (document.all["dg1__ctl" + iRow + "_cbMark"].checked)
                        document.all["dg1__ctl" + iRow + "_cbMark"].checked = false;
                    //1040416	Kenny	[1040233]	同時滿足CheckBox為enable狀態下(主辦公文)才選取；修改進入條件
                    //else
                    else if (!document.all["dg1__ctl" + iRow + "_cbMark"].checked && document.all["dg1__ctl" + iRow + "_cbMark"].disabled == false)
                        document.all["dg1__ctl" + iRow + "_cbMark"].checked = true;
                }
            }
            Page_BlockSubmit = true;
            break;
        //1041223	Leslie	二代公文系統相關修改，以JQueryUI取代
        /*case "btDate1":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txDate1, event.screenX, event.screenY);
            break;
        case "btDate2":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txDate2, event.screenX, event.screenY);
            break;
        case "btSDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
            break;
        case "btEDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
            break;*/
    }
}

//1041223	Leslie	二代公文系統相關修改
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

    //1041223	Leslie	二代公文系統相關修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName)
    {
        case "btSearch":
            if (jf_CheckBeforeSearch())	//[需求單955091] 查詢前檢查 Charles 0951025
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050107	Leslie	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
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
            //1050107	Leslie	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
        //0990819 新增excel匯出 (CDC需求單) [0990402]-Johnny
        case "btExcel":
        //1140604 Zen 1140179 ，支援匯出ODS
        case "btODS":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
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
            //1050107	Leslie	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1001121 Kevin	Ken		1000888	新增標檢局催辦單、會辦催辦單
        case "btTicket2":
        case "btTicket":
            Page_BlockSubmit = !CheckBeforTicket();
            //1050107	Leslie	二代公文系統相關修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    //將lbReturnValue的資料帶入適當的欄位
    if (argCallerId == "ODT220")
    {
        //無回傳
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    /*document.all["H_Value"].value = document.all["dlDept_Text"].value;
    document.all["H_Change"].value = "";
    if (document.all["dg1"] == null)
        document.all["dtHead"].className = "hide";
    else
        document.all["dtHead"].className = "";*/
    ShowMsg();

    //1041223	Leslie	二代公文系統相關修改
    //jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
    //[需求單955091] 初始時先儲存下拉式選單的Text、Value、所有選項Value Charles 0951024
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);


    //無值不顯示
    jf_HandleComboxStatus("dlSect");
}

function OnWSResult(argResult)
{ }

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050525	Kenny	[1050087]	二代公文系統相關修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argDocNo)
{
    /*	93/01/07 取消功能
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].text = argDocNo;
        opener.window.CallBack("ODR241");
        close();
    */
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = true;
    //[需求單955091] 預覽列印前檢查 Charles 0951025
    if (!jf_CheckBeforeSearch())
        bRtnbool = false;
    return bRtnbool;
}

//催辦單前檢查
function CheckBeforTicket()
{
    var bRtnBool = false;
    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbMark"].checked)
        {
            bRtnBool = true;
            break;
        }
    }
    if (!bRtnBool)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])), "");
    }
    return bRtnBool;
}

function dlDept_Onblur()
{
    if (odjf_CheckComboBox("dlDept"))
    {
        //值若變更時，觸動TextChange事件
        if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
        {
            document.all["H_Change"].value = document.all["dlDept_Text"].value;
            //__doPostBack();//for .NET Framework 1.0
            //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
            IsServerHandling = true;
            jf_ShowWaitState();
            __doPostBack("", "");//for .NET Framework 1.1
        }
    }
}

function fnOpenApply(argDocNo)
{
    var strSysDate = document.all["H_Date"].value;
    //0991020 加上artifact Johnny
    var strArtifact = document.all["H_Artifact"].value;
    var strUrl = "";
    //0991020 加上artifact Johnny
    strUrl = "ODT220.aspx?rtnObj=lbReturnValue&argDocNo=" + argDocNo + "&applyDate=" + strSysDate + "&SAMLart=" + strArtifact;
    jf_OpenChildWin(strUrl, "ODT220", 760, 520);
}

function DocFlowInfo(argDocNo)
{
    var strPage = document.all["H_Url"].value;
    var strWidth = document.all["H_Width"].value;
    var strHeight = document.all["H_Height"].value;
    var strArtifact = document.all["H_Artifact"].value;
    //Zoey [000297, 96/04/02]
    if (document.all.H_SourceOrgNo != null)
        var strSource = "&SOURCE_ORGNO=" + document.all.H_SourceOrgNo.value;
    else
        var strSource = "";
    var strUrl = strPage + "?pDocNo=" + argDocNo + "&SAMLart=" + strArtifact + strSource;
    jf_OpenChildWin(strUrl, "FlowPage", strWidth, strHeight);
}

//[需求單955091] 下拉選單onblur時的檢查 Charles 0951025 ↓
function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            var bSubTree = true;
            if (document.all["H_OD_FLOW_TYPE"].value == "2")
                bSubTree = false;
            //0980824	David	0980391	二級單位選單增加(僅含一級單位)選項
            //odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree);
            //1111101	Joe		--		新增ODR240~242判斷不顯示OD17
            // odjf_SetdlDept("dlDept","dlSect","dlUser","",bSubTree,true);	//初始dlSect、dlUser的處理
            odjf_SetdlDeptWithoutOD17("dlDept", "dlSect", "dlUser", "", bSubTree, true);	//初始dlSect、dlUser的處理

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
            document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;

            //無值不顯示
            jf_HandleComboxStatus("dlSect");
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSect_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            //0980824	David	0980391	配合二級單位選單增加選項，初始承辦人選單配合修改
            //odjf_SetdlSect("dlDept","dlSect","dlUser","",false);	//初始化承辦人選單
            //1111101	Joe		--		新增ODR240~242判斷不顯示OD17
            // odjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);
            odjf_SetdlSectWithoutOD17("dlDept", "dlSect", "dlUser", "", false, true);

            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            document.all["H_dlUser_Value"].value = odjf_SaveCurrDL(document.all["dlUser"]);

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlUser_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
    {
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlUser", "承辦人"))
        {
            document.all["H_User"].value = document.all["dlUser_Text"].value;

            document.all["H_User_Value"].value = odjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    //if(document.all[argComboxID].options.length <=1)
    //	document.all[argComboxID+"_Container"].className = "hide";
    //else
    //	document.all[argComboxID+"_Container"].className = "InputFieldText";
}

//[需求單955091] 查詢前檢查 Charles 0951025
function jf_CheckBeforeSearch()
{
    //1110127	Joe		1110011		增加Client端日期顯示處理--S
    var strS = jf_Trim(document.all.txSDate.value);
    var strE = jf_Trim(document.all.txEDate.value);
    if (strS != "" && strE == "")
        document.all.txEDate.value = strS;
    else if (strS == "" && strE != "")
        document.all.txSDate.value = strE;
    else if (strS > strE)
    {
        document.all.txSDate.value = strE;
        document.all.txEDate.value = strS;
    }

    strS = jf_Trim(document.all.txDate1.value);
    strE = jf_Trim(document.all.txDate2.value);
    if (strS != "" && strE == "")
        document.all.txDate2.value = strS;
    else if (strS == "" && strE != "")
        document.all.txDate1.value = strE;
    else if (strS > strE)
    {
        document.all.txDate1.value = strE;
        document.all.txDate2.value = strS;
    }
    //1110127	Joe		1110011		增加Client端日期顯示處理--E

    if (!dlDept_Text_onblur(true))
        return false;

    if (!dlSect_Text_onblur(true))
        return false;

    if (!dlUser_Text_onblur(true))
        return false;

    return true;
}
//[需求單955101] 下拉選單檢查 Charles 0951025 ↑



/*******************************************************************************************
                其		他		共		用		function
********************************************************************************************/
//日期onblur
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
            //1050525	Kenny	[1050087]	二代公文系統相關修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}