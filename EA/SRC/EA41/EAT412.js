/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 97.10.01		Cola	0970649	(交通部)新增櫥位號加入條件、DataGrid新增顯示櫥位號
 *100.08.15		Jeff	1000631	配合檔管局特殊媒體類型，因應修改畫面欄位名稱一併修正跳出提示時的欄位名稱
 * 103.11.12    Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 1060712		Kevin_C	1050087	升二代
 * 1061227		Justin	--		修正升二代問題
 * 1070327      Zen     1070092 修正二代升級衍生問題
 * 1091116		Cloud	1090792	配合法規調整保存狀態註記行為 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1101101		Cloud	---		測試發現，修正
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
var strTableFields = new Array("_cbSelect", "_lbFileNo", "_lbDocNo", "_lbKeepState", "_lbReason");

//1060712	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if (document.all.dg1)
    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

InitObj();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060712	Kevin_C	1050087	升二代
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//* 2020.11.16	Cloud	1090792	配合法規調整保存狀況代碼，新增已遺失註記與連動-S
	dlKEEPSTATEDlOnBlur();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

    /*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1070327 Zen 1070092 修正二代升級衍生問題，搬移至ClientButtonControl()
    var Index = ChooseType();

    switch (xObjectName)
    {
        case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            break;

        case "dlMediaType":
            Page_BlockSubmit = false;
            //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
            IsServerHandling = true;
            __doPostBack("", "");
            break;

        case "rbMarkClean":
            Page_BlockSubmit = true;
            if (document.all["rbMarkClean"].checked)
            {
                document.all["dlComplete"].disabled = true;
                document.all["dlComplete"].className = "DisplayOnly";
                document.all["dlKeepState"].disabled = false;
                document.all["dlKeepState"].className = "";
            }
            break;

        case "rbMarkComplete":
            Page_BlockSubmit = true;
            if (document.all["rbMarkComplete"].checked)
            {
                document.all["dlKeepState"].disabled = true;
                document.all["dlKeepState"].className = "DisplayOnly";
                document.all["dlComplete"].disabled = false;
                document.all["dlComplete"].className = "";
            }
            break;

        case "btAdd_Stock":
        case "btDocAdd":
        case "btFileAdd":
            AutoBringOut();
            if (!CheckAddFieldEmpty(xObjectName))
                Page_BlockSubmit = true;
            else
            {
                Page_BlockSubmit = false;
                //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                IsServerHandling = true;
                //1070327 Zen 1070092 修正二代升級衍生問題
                //__doPostBack("", "");
                jf_ToolBarSubmit(xObjectName);
            }
            break;

        case "btSet":
            if (!CheckDgCBox())
                Page_BlockSubmit = true;
            else
            {
                Page_BlockSubmit = false;
                //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                IsServerHandling = true;
                //1070327 Zen 1070092 修正二代升級衍生問題
                //__doPostBack("", "");
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btAll":
            if (window.confirm("批號內所含公文可能過多，是否仍要加入?"))
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = true;
            //1070327 Zen 1070092 修正二代升級衍生問題
            jf_ToolBarSubmit(xObjectName);
            break;

            //1070327 Zen 1070092 修正二代升級衍生問題，搬移至ClientButtonControl()
            //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect" + Index);
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect" + Index);
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect" + Index);
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect3");
            jf_SelectBarSubmit(xObjectName);
            break;

            /*case "btDocAdd":
                Page_BlockSubmit = !jf_CheckBeforSave();
                break;
            
            case "btFileAdd":
                Page_BlockSubmit = !jf_CheckBeforSave();
                break;
            
            case "btSet":
                Page_BlockSubmit = !jf_CheckSet();			
                break;*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060712	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
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

    //1060712	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;
    //1070327 Zen 1070092 修正二代升級衍生問題，搬移至ClientButtonControl()
    //var Index = ChooseType();
    switch (xObjectName)
    {
        case "btOpen":
            if (jf_Trim(document.all["txPlanNo"].value) != "")
                Page_BlockSubmit = false;
            else
            {
                alert("清理批號不可為空白");
                Page_BlockSubmit = true;
                //1060712	Kevin_C	1050087	升二代
                //document.all["txPlanNo"].focus();
                $('txPlanNo').focus();
            }
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
        case "btClean":
            Page_BlockSubmit = false;
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //if(jf_ConfirmSave()) //是否通過儲存前必要檢查
            if (CheckDocNoExist())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
                //1060712	Kevin_C	1050087	升二代
                //jf_ToolBarSubmit();	
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btCancel":
            Page_BlockSubmit = false;
            jf_ConfirmClean(true);
            //1060712	Kevin_C	1050087	升二代 -S
            //jf_ToolBarSubmit();	
            //document.all["txPlanNo"].focus();
            jf_ToolBarSubmit(xObjectName);
            $('txPlanNo').focus();
            //1060712	Kevin_C	1050087	升二代 -E
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060712	Kevin_C	1050087	升二代
            //document.all["txPlanNo"].focus();
            $('txPlanNo').focus();
            document.all["dg1"].className = "hide";
            InitObj();
            break;

        case "btSearch":
            if (jf_Trim(document.all["txPlanNo"].value) == "")
            {
                alert("清理批號不可空白");
                Page_BlockSubmit = true;
            }
            else
            {
                Page_BlockSubmit = false;
            }
            //1060712	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();	
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btSearch2":
            var strUrl = "";
            strUrl = "EAR411.aspx";
            jf_OpenChildWin(strUrl, "EAR411", 850, 630);
            break;
            //1070327 Zen 1070092 修正二代升級衍生問題，搬移至ClientButtonControl()
            //    //以下屬於DataGrid ToolBar
            //case "btSelectAll":
            //	Page_BlockSubmit = true;
            //	jf_SelectAll("dg1", "_cbSelect"+Index);
            //	break;
            //case "btSelectInverse":
            //	Page_BlockSubmit = true;
            //	jf_SelectInverse("dg1", "_cbSelect"+Index);
            //	break;
            //case "btSelectClear":
            //	Page_BlockSubmit = true;
            //	jf_SelectClear("dg1", "_cbSelect"+Index);
            //	break;
            //case "btDeleteSelected":			
            //	Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect3");
            //	jf_SelectBarSubmit();
            //	break;

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txPlanNo"].value == "")
    {
        strErrMsg += "清理批號不可空白\n";
        //1060712	Kevin_C	1050087	升二代
        //document.all["txPlanNo"].focus();
        $('txPlanNo').focus();
    }
    /*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
	*/
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
        {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
            {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                //1060712	Kevin_C	1050087	升二代 -S
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
                //document.all[InValidControlName].focus();
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                $(InValidControlName).focus();
                //1060712	Kevin_C	1050087	升二代 -E
                return false;
            }
        }
    }
    return true;
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
        if (jf_IsWebServiceSuccess(argResult))
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
    /*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        if (document.all["txPlanNo"].value != "")
        {
            Page_BlockSubmit = false;
            document.all.ToolBarSenderID.value = "btOpen";
            if (Page_BlockSubmit == false)
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                __doPostBack("tbTool", 0);
            }
        }
        //1060712	Kevin_C	1050087	升二代
        //document.all["txPlanNo"].focus();
        $('txPlanNo').focus();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckSet()
{
    if (document.all.rbMarkClean.checked && document.all.dlClean.value == "")
    {
        alert('未選擇註記項目');
        return false;
    }

    if (document.all.rbMarkComplete.checked && document.all.dlComplete.value == "")
    {
        alert('未選擇註記項目');
        return false;
    }

    return true;
}

//檢核該清理批號是否存在
function CheckPlanNo()
{
    var ActionJudge = false;
    var bJudge = false;

    if (document.all["txPlanNoBak"].value == "")
    {
        document.all["txPlanNoBak"].value = document.all["txPlanNo"].value;
        ActionJudge = true;
    }
    if (document.all["txPlanNoBak"].value != document.all["txPlanNo"].value)
        ActionJudge = false;
    else if (document.all["txPlanNoBak"].value == document.all["txPlanNo"].value)
        ActionJudge = true;

    if (!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
        bJudge = true;

    //1060712	Kevin_C	1050087	升二代
    //if(!jf_CheckDataExist_Custom("PLAN_DETAIL","PLAN_NO","txPlanNo") && document.all["txPlanNo"].value != "")
    if (document.all["txPlanNo"].value != "" && !jf_CheckDataExist_Custom("PLAN_DETAIL", "PLAN_NO", "txPlanNo"))
        bJudge = true;

    if (!ActionJudge)
        CheckDgEmpty();

    if (bJudge)
    {
        Page_BlockSubmit = false;
        alert("清理批號不存在");
        //1060712	Kevin_C	1050087	升二代
        //document.all["txPlanNo"].focus();
        $('txPlanNo').focus();
    }
}

function CheckDgEmpty()
{
    var dgCount = document.all["dg1"].rows.length;
    if (dgCount != 2)	//dg1中有資料
    {
        var ret = window.confirm("變更清理批號會清空下方資料表內容，確定嗎?");
        if (ret)
        {
            document.all["txPlanNoBak"].value = document.all["txPlanNo"].value;
            for (i = 2; i < dgCount + 1; i++)
            {/*
				if(document.forms[0].elements[i].type=='text')
					document.forms[0].elements[i].value = '';
				if(document.forms[0].elements[i].type=='select-one')
					document.forms[0].elements[i].selectedIndex = 0;
				if(document.forms[0].elements[i].type=='checkbox')
					document.forms[0].elements[i].checked = false;
				if(document.forms[0].elements[i].type=='radio')
					document.forms[0].elements[i].checked = false;
				if(document.forms[0].elements[i].type=='textarea')
					document.forms[0].elements[i].value = '';
					*/
                document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerHTML = "";
                document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
                document.all["dg1__ctl" + i + "_lbFileNo"].innerHTML = "";
                document.all["dg1__ctl" + i + "_lbDocNo"].innerHTML = "";
                document.all["dg1__ctl" + i + "_lbKeepState"].innerHTML = "";
                document.all["dg1__ctl" + i + "_lbReason"].innerHTML = "";
            }
        }
        else
        {
            document.all["txPlanNo"].value = document.all["txPlanNoBak"].value;
        }
    }
}

function jf_CheckDataExist_Custom(argTable, argCol, argObj)
{
    var arrValue = new Array(1);
    var arrFieldName = new Array(1);

    arrFieldName[0] = argCol;
    arrValue[0] = document.all[argObj].value;

    var arWSParam = new Array(3);

    arWSParam[0] = argTable;//"EMPLOYEE";
    arWSParam[1] = arrFieldName;
    arWSParam[2] = arrValue;

    //1060712	Kevin_C	1050087	升二代
    //1061227 Justin -- 修正升二代問題
	//* 1101101		Cloud	---		測試發現，修正
    //callObj = jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
    //callObj = jf_CallWS("../../../STDN/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	//* 1101101		Cloud	---		測試發現，修正
	callObj = jf_CallWS("../../../STDN/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);

    if (jf_IsWebServiceSuccess(callObj))
    {
        if (callObj.value.RtnBool == true)
            return true;

        return false;
    }
    else
        return false;
}

function CheckCustomKeyExist(argObjName)
{
    var strErrMsg = "";
    if (!jf_CheckDataExist_Custom("DOC_MAIN", "DOC_NO", "txDocNo") && document.all[argObjName].value != "")
    {
        //1000815	Jeff	1000631		修正跳出警示訊息的欄位名稱
        //strErrMsg += "公文文號不存在\n";
        strErrMsg += "文(編)號不存在\n";
    }
    if (strErrMsg != "")
    {
        alert(strErrMsg);
        //1060712	Kevin_C	1050087	升二代
        //document.all[argObjName].focus();
        $(argObjName).focus();
    }
}

function CheckAddFieldEmpty(activeObjName)
{
    var actionJudge = true;
    var strErrMsg = "";

    if (document.all["txPlanNo"].value == "")
    {
        actionJudge = false;
        strErrMsg += "清理批號不可空白\n";
    }

    switch (activeObjName)
    {
        case "btDocAdd":
            {
                if (document.all["txDocNo"].value == "")
                {
                    actionJudge = false;
                    //1000815	Jeff	1000631		修正跳出警示訊息的欄位名稱
                    //strErrMsg += "公文文號不可空白\n";
                    strErrMsg += "文(編)號不可空白\n";
                }
                break;
            }

        case "btFileAdd":
            {
                if (document.all["txYearS"].value == "" && document.all["txYearE"].value == "" && document.all["txClsS"].value == "" && document.all["txClsE"].value == "" && document.all["txCaseS"].value == "" && document.all["txCaseE"].value == "" && document.all["txVolS"].value == "" && document.all["txVolE"].value == "" && document.all["txSeqS"].value == "" && document.all["txSeqE"].value == "")
                {
                    actionJudge = false;
                    strErrMsg += "檔號不可皆為空白\n";
                }
                else
                {
                    if (CheckFileNoRange(strErrMsg) != "")
                    {
                        strErrMsg = CheckFileNoRange(strErrMsg);
                        actionJudge = false;
                    }
                }
                break;
            }
            //[0970649]Add by Cola 新增櫥位號加入
        case "btAdd_Stock":
            {
                if (document.all["txStockNoS"].value == "" && document.all["txStockNoE"].value == "")
                {
                    actionJudge = false;
                    strErrMsg += "櫥位號區間不可均為空白\n";
                }
                break;
            }
    }

    if (strErrMsg != "")
        alert(strErrMsg);

    return actionJudge;
}

//判斷檔號起訖的合理性
function CheckFileNoRange(argStr)
{
    var JCls = 0;	//0:兩者為空,1:其中一個為空,2:不相等,3:相等
    var JCase = 0;
    var JVol = 0;
    var JSeq = 0;
    var jBool = true;


    if (document.all["txSeqS"].value != "" && document.all["txSeqE"].value != "")
    {
        if (document.all["txSeqS"].value != document.all["txSeqE"].value)
            JSeq = 2;
        else
            JSeq = 3;
    }
    else if (document.all["txSeqS"].value != "" || document.all["txSeqE"].value != "")
        JSeq = 1;
    //////////////////////////////////////////目次
    if (document.all["txVolS"].value != "" && document.all["txVolE"].value != "")
    {
        if (document.all["txVolS"].value != document.all["txVolE"].value)
            JVol = 2;
        else
            JVol = 3;
    }
    else if (document.all["txVolS"].value != "" || document.all["txVolE"].value != "")
        JVol = 1;
    //////////////////////////////////////////卷次
    if (document.all["txCaseS"].value != "" && document.all["txCaseE"].value != "")
    {
        if (document.all["txCaseS"].value != document.all["txCaseE"].value)
            JCase = 2;
        else
            JCase = 3;
    }
    else if (document.all["txCaseS"].value != "" || document.all["txCaseE"].value != "")
        JCase = 1;
    /////////////////////////////////////////案次
    if (document.all["txClsS"].value != "" && document.all["txClsE"].value != "")
    {
        if (document.all["txClsS"].value != document.all["txClsE"].value)
            JCls = 2;
        else
            JCls = 3;
    }
    else if (document.all["txClsS"].value != "" || document.all["txClsE"].value != "")
        JCls = 1;
    /////////////////////////////////////////分類

    if (JSeq == 1)	//只有其中一項，視為錯誤
    {
        argStr += "目次範圍起迄值有誤\n";
        return argStr;
    }

    if (JVol == 1)	//只有其中一項，視為錯誤
    {
        argStr += "卷次範圍起迄值有誤\n";
        return argStr;
    }

    if (JCase == 1)	//只有其中一項，視為錯誤
    {
        argStr += "案次號範圍起迄值有誤\n";
        return argStr;
    }

    if (JCls == 1)	//只有其中一項，視為錯誤
    {
        argStr += "分類號範圍起迄值有誤\n";
        return argStr;
    }

    /////////////////////////////////////95.08.15
    if (JSeq == 2)	//目次不相等
    {
        jBool = false;
        if (JVol != 3)	//若卷次不為相等的情況則提示錯誤訊息
        {
            argStr += "卷次號範圍需相同\n";
            jBool = true;
            return argStr;
        }

        if (JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
        {
            argStr += "案次號範圍需相同\n";
            jBool = true;
            return argStr;
        }

        if (JCls != 3)
        {
            argStr += "分類號範圍需相同\n";
            jBool = true;
            return argStr;
        }

        /*if(!jBool)
		{
			argStr += "目次號範圍需相同\n";			
			return argStr;						
		}*/
    }

    if (JSeq == 0 || JSeq == 3)	//目次為空白，則往上檢查卷次號
    {
        if (JVol == 2)	//卷次不相等
        {
            jBool = false;
            if (JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
            {
                argStr += "案次號範圍需相同\n";
                jBool = true;
                return argStr;
            }

            if (JCls != 3)
            {
                argStr += "分類號範圍需相同\n";
                jBool = true;
                return argStr;
            }

            if (!jBool && JSeq != 0)
            {
                argStr += "卷次號範圍需相同\n";
                return argStr;
            }
        }

        if (JVol == 0)	//若卷次為空白，則往上檢查案次號
        {
            if (JCase == 2)	//若案次不相等，則往上檢查分類號
            {
                jBool = false;
                if (JCls != 3)
                {
                    argStr += "分類號範圍需相同\n";
                    jBool = true;
                    return argStr;
                }

                if (jBool)
                {
                    argStr += "案次號範圍需相同\n";
                    return argStr;
                }
            }
        }

        if (JVol == 3)	//卷次相等，往上檢核案次以及分類是否相等
        {
            if (JCase != 3)
            {
                argStr += "案次號範圍需相同\n";
                return argStr;
            }

            if (JCls != 3)
            {
                argStr += "分類號範圍需相同\n";
                return argStr;
            }
        }
    }

    return argStr;
}

//補0
function CallPadFunc(strObjName)
{
    switch (strObjName)
    {
        case "txYearS":
        case "txYearE":
        case "txSeqE":
        case "txSeqS":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 3, "0");
            break;
        case "txVolS":
        case "txVolE":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 4, "0");
            break;
    }
}

function CheckDgCBox()
{
    var bSelect = false;
    var strErrMsg = "";
    if (document.all.dg1.rows.length != 2)
    {
        for (i = 2; i < document.all.dg1.rows.length + 1; i++)
        {
            if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
            {
                bSelect = true;
                break;
            }
        }
        if (!bSelect)
            strErrMsg += "至少勾選一份公文\n";
    }
    else
    {
        if (document.all["dg1__ctl2_lbFileNo"].innerHTML == "" && document.all["dg1__ctl2_lbFileNo"].innerHTML == "" && document.all["dg1__ctl2_lbFileNo"].innerHTML == "" && document.all["dg1__ctl2_lbFileNo"].innerHTML == "")
        {
            strErrMsg += "DataGrid中無資料，請先設定範圍並加入資料\n";
        }
        else
            bSelect = true;
    }

    if (strErrMsg != "")
        alert(strErrMsg);

    return bSelect;
}

//檢查DG內是否有重複的欄位
//請自行設定欄位內容的屬性值
//ex:txBox=>value,Label=>innerHTML...等
function CheckDocNoExist()
{
    var objDgName = "dg1";

    var pDgLen = document.all[objDgName].rows.length;  //有header,筆數為實際筆數+1			
    var strObjName = "";	//First Compare
    var strtxDocNo = "";	//Second Compare
    var strErrMsg = "";		//ErrMsg		
    var strMarkArray = new Array(pDgLen);

    if (pDgLen == 2)
    {
        if (document.all["dg1__ctl2_lbFileNo"].innerHTML == "" && document.all["dg1__ctl2_lbFileNo"].innerHTML == "" && document.all["dg1__ctl2_lbFileNo"].innerHTML == "" && document.all["dg1__ctl2_lbFileNo"].innerHTML == "")
        {
            alert("請先加入資料");
            return false;
        }
    }

    if (!CheckcbSelect2())
    {
        alert("未勾選更新項目");
        return false;
    }

    for (var i = 2; i < pDgLen; i++)
    {
        strObjName = objDgName + "__ctl" + i + "_lbDocNo";

        for (var j = i + 1; j <= pDgLen; j++)
        {
            strtxDocNo = objDgName + "__ctl" + j + "_lbDocNo";

            if (document.all[strtxDocNo].innerHTML == document.all[strObjName].innerHTML)
            {
                //alert('輸入的公文文號(目次號)與序號 ' + (i-1) + ' 重覆');
                //1060712	Kevin_C	1050087	升二代
                ////document.all[strObjName].focus();
                $(strObjName).focus();
                if (document.all[strtxDocNo].innerHTML != "")
                    strMarkArray[j] = "1";
            }
        }
    }
    //1000815	Jeff	1000631		修正跳出警示訊息的欄位名稱	
    //var ErrMsgHeader = "輸入的公文文號(目次號)第";
    var ErrMsgHeader = "輸入的文(編)號(目次號)第";
    var ErrMsgFooter = "有重複情形,請檢查";
    for (var i = 2; i < pDgLen + 1; i++)
    {
        if (strMarkArray[i] == "1")
        {
            strErrMsg += (i - 1);
            if (i < pDgLen)
                strErrMsg += ",";
            else
                strErrMsg += "項";
        }
    }

    if (strErrMsg != "")
    {
        alert(ErrMsgHeader + strErrMsg + ErrMsgFooter);
        return false;
    }
    else
        return true;

}

function CheckBeforeDeleteSelected(argTableName, argCheckBoxName)
{
    if (document.all[argTableName] == null)
        return false;

    //至少要勾選一筆才return true
    for (iRow = 2; iRow < document.all[argTableName].rows.length + 1; iRow++)
    {
        if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
            return true;
    }
    return false;
}

function InitObj()
{
    document.all["rbMarkClean"].checked = true;
    document.all["rbDoc"].checked = true;
}

function AutoBringOut()
{
    if (document.all["txYearE"].value == "" && document.all["txClsE"].value == "" && document.all["txCaseE"].value == "" && document.all["txVolE"].value == "" && document.all["txSeqE"].value == "")
    {
        document.all["txYearE"].value = document.all["txYearS"].value;
        document.all["txClsE"].value = document.all["txClsS"].value;
        document.all["txCaseE"].value = document.all["txCaseS"].value;
        document.all["txVolE"].value = document.all["txVolS"].value;
        document.all["txSeqE"].value = document.all["txSeqS"].value;
    }

}
function ChooseType()
{
    if (document.all["rb1"].checked)
        return "";
    if (document.all["rb2"].checked)
        return "2";
    if (document.all["rb3"].checked)
        return "3";
}

function CheckcbSelect2()
{
    var CurrCount = document.all.dg1.rows.length;
    var CheckCount = 0;
    for (m = 2; m < CurrCount + 1; m++)
    {
        if (document.all["dg1__ctl" + m + "_cbSelect2"].checked)
        {
            CheckCount++;
        }
    }
    if (CheckCount == 0)
        return false;
    else
        return true;
}
//* 2020.11.16	Cloud	1090792	配合法規調整保存狀況代碼，新增已遺失註記與連動-S
function CheckDosState(argCallFrom)
{
	if (document.all["cbIsmiss"].checked && document.all["cbIsDestroy"].checked)
	{
		alert('不可同時勾選[毀損無法修復]與[已遺失]。');
		document.all[argCallFrom].checked = false;

	}
}
function dlKEEPSTATEDlOnBlur()
{
	if (document.all.dlKeepState.options[document.all.dlKeepState.selectedIndex].value.toUpperCase() == "Z")
	{
		document.all["cbIsmiss"].disabled = false;
		document.all["cbIsDestroy"].disabled = false;
	}
	else
	{
		document.all["cbIsmiss"].disabled = true;
		document.all["cbIsDestroy"].disabled = true;
		document.all["cbIsmiss"].checked = false;
		document.all["cbIsDestroy"].checked = false;
	}
}
//* 2020.11.16	Cloud	1090792	配合法規調整保存狀況代碼，新增已遺失註記與連動-E
