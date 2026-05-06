/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 97.03.19		Cola	951274	若本文及另存附件兩者cb皆無勾選，跳警示訊息告知使用者
 *100.08.16		Jeff	1000631 配合檔館局特殊媒體需求變更程式畫面與相關連動
 * 1060315		Justin	1050087	二代公文修改
 * 1080528		Kevin_C	1080359	客委會增加匯出EXCEL功能
 * 1100610      Zen     1100483 (中興大學)新增客製化Excel、ODS、TXT格式之報表
 * 1140603      Daniel  1140219 選擇檔管局格式時增加匯出ODS功能
 * 1140603      Daniel  1140387 (客委會)增加匯出非檔管局格式Excel功能
 * 1140902      Daniel  1140805 (北榮)新增北榮專用案卷選項、報表、EXCEL
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
//1060315  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060315  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次*/
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1000816	jeff  1000631		程式開啟時連動檢查
    RadioButtonOnClick();
    //1140902      Daniel  1140805 (北榮)程式開啟時連動檢查
    RptTypeOnClick();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
        case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            //1060315  Justin [1050087] 二代公文修改
            //jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060315  Justin [1050087] 二代公文修改 
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

    //1060315  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060315  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            jf_ConfirmClean(true);
            Page_BlockSubmit = true;
            //1060315  Justin [1050087] 二代公文修改
            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            InitObj();
            break;
        case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
            break;
        case "btPrint":
            if (!jf_CheckBeforSave())
            {   
                //1140603      Daniel  1140219 修正Page_BlockSubmit判斷錯誤
                //Page_BlockSubmit = false;
                Page_BlockSubmit = true;
            }
            else
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                //1060315  Justin [1050087] 二代公文修改 
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btPreview":
        //1080528	Kevin_C	1080359	客委會增加匯出EXCEL功能
        case "btExcel":
        //1100610 Zen 1100483 (中興大學)新增客製化Excel、ODS、TXT格式之報表
        case "btODS":
        case "btTXT":
            if (!jf_CheckBeforSave())
            {
                Page_BlockSubmit = false;

            }
            else
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                //1060315  Justin [1050087] 二代公文修改 
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	/*var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;*/
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txPlanNo"].value == "")
    {
        strErrMsg += "清理批號不可空白\n";
        //1060315  Justin [1050087] 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    //[951274]Add by Cola判斷列印別 -- start --
    if (document.all["cbDoc"].checked == false && document.all["cbAtt"].checked == false)
    {
        //1000816	Jeff		1000631		當選則為紙本簽核時才需要判斷
        if (document.all["rbElc"].checked == false && document.all["rbSpe"].checked == false)
            strErrMsg += "列印別必須至少選擇一項\n";
    }
    //Cola -- end --

	/*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}*/

    strErrMsg = CheckFileNoRange(strErrMsg);

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
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
        //1060315  Justin [1050087] 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
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
//檢核該清理批號是否存在
function CheckPlanNo()
{
    //1140603 Daniel 1140219  修正判斷順序錯誤問題
    //if (!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
        
    if (document.all["txPlanNo"].value != "")
    {
        if (!jf_CheckDataExist(""))
            {
            Page_BlockSubmit = false;
            alert("此清理批號不存在");
            //1060315  Justin [1050087] 二代公文修改
            //document.all["txPlanNo"].focus();
            //$('#txPlanNo').focus();
            }
    }
}

//補0
function CallPadFunc(strObjName)
{
    switch (strObjName)
    {
        case "txYearS":
        case "txYearE":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 3, "0");
            break;
    }
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

//1100610 Zen 1100483 (中興大學)新增客製化Excel、ODS、TXT格式之報表，註解無用邏輯
////處理列印別的控制
//function ControlPrintStyle(strObjName)
//{
//    switch (strObjName)
//    {
//        case "cbAtt":
//            if (document.all["cbAtt"].checked)
//            {
//                document.all["cbFM"].checked = false;
//                document.all["cbFM"].disabled = true;
//            }
//            else
//            {
//                document.all["cbFM"].checked = true;
//                document.all["cbFM"].disabled = false;
//            }
//            break;
//        case "cbFM":
//            if (document.all["cbFM"].checked == false)
//            {
//                document.all["cbshowdocno"].checked = false;
//                document.all["cbshowdocno"].className = "DisplayOnly";
//                document.all["cbshowdocno"].readOnly = true;
//                document.all["cbshowdocno"].disabled = true;
//                //1080528	Kevin_C	1080359	客委會增加匯出EXCEL功能
//                document.all["btExcel"].disabled = true;
//            }
//            else
//            {
//                document.all["cbshowdocno"].className = "";
//                document.all["cbshowdocno"].readOnly = false;
//                document.all["cbshowdocno"].disabled = false;
//                //1080528	Kevin_C	1080359	客委會增加匯出EXCEL功能
//                document.all["btExcel"].disabled = false;
//            }
//            break;
//    }
//}

//1000816	Jeff	1000631		RadioButton連動
function RadioButtonOnClick()
{

    document.all["dlMediaType"].className = "displayOnly";
    document.all["dlMediaType"].disabled = true;
    if (!document.getElementById("rbPaper").checked)
    {
        document.all["cbDoc"].className = "displayOnly";
        document.all["cbDoc"].disabled = true;
        document.all["cbDoc"].checked = false;
        document.all["cbAtt"].className = "displayOnly";
        document.all["cbAtt"].disabled = true;
        document.all["cbAtt"].checked = false;
        if (document.getElementById("rbSpe").checked)
        {
            //1060315  Justin [1050087] 二代公文修改
            //document.all["dlMediaType"].className = "InputFieldLabel";
            document.all["dlMediaType"].className = "";
            document.all["dlMediaType"].disabled = false;
        }

    }
    else 
    {
        document.all["cbDoc"].className = "";
        document.all["cbDoc"].disabled = false;
        document.all["cbDoc"].checked = true;
        document.all["cbAtt"].className = "";
        document.all["cbAtt"].disabled = false;
    }

    //1100610 Zen 1100483 (中興大學)新增客製化Excel、ODS、TXT格式之報表
    //1140603 Daniel  1140387 (客委會)增加匯出非檔管局格式Excel功能
    if (document.all['H_txOrgNickName'].value == "HAC") {
        document.all["cbshowdocno"].checked = true;
        document.all["cbshowdocno"].className = "";
        document.all["cbshowdocno"].readOnly = false;
        document.all["cbshowdocno"].disabled = false;
        document.all["btExcel"].disabled = false;
        document.all["btODS"].disabled = false;
        document.all["btTXT"].disabled = true;
        document.all["btPreview"].disabled = false;
    }
    //1140604      Daniel  1140219 (退輔會)不勾選於本文報表顯示文號(僅檔管局格式額外提供此功能)。
    else if (document.all['H_txOrgNickName'].value == "VAC") {
        document.all["cbshowdocno"].checked = false;
        document.all["cbshowdocno"].className = "";
        document.all["cbshowdocno"].readOnly = true;
        document.all["cbshowdocno"].disabled = true;
        document.all['rbPrototype'].checked = false;
        document.all["rbPrototype"].readOnly = true;
        document.all["rbPrototype"].disabled = true;
        document.all['cbFM'].checked = true;
        document.all["cbFM"].readOnly = true;
        document.all["btExcel"].disabled = false;
        document.all["btODS"].disabled = false;
        document.all["btTXT"].disabled = true;
        document.all["btPreview"].disabled = false;
    }
    //if (document.all['rbPrototype'].checked)
    else if (document.all['rbPrototype'].checked) {
        document.all["cbshowdocno"].checked = false;
        document.all["cbshowdocno"].className = "DisplayOnly";
        document.all["cbshowdocno"].readOnly = true;
        document.all["cbshowdocno"].disabled = true;
        document.all["btExcel"].disabled = true;
        document.all["btODS"].disabled = true;
        document.all["btTXT"].disabled = true;
        document.all["btPreview"].disabled = false;
    }
    else if (document.all['cbFM'].checked) {
        document.all["cbshowdocno"].checked = true;
        document.all["cbshowdocno"].className = "";
        document.all["cbshowdocno"].readOnly = false;
        document.all["cbshowdocno"].disabled = false;
        document.all["btExcel"].disabled = false;
        //1140603      Daniel  1140219 選擇檔管局格式時增加匯出ODS功能
        //document.all["btODS"].disabled = true;
        document.all["btODS"].disabled = false;
        document.all["btTXT"].disabled = true;
        document.all["btPreview"].disabled = false;
    }
    else if (document.all['rbNCHU'].checked) {
        document.all["cbshowdocno"].checked = false;
        document.all["cbshowdocno"].className = "DisplayOnly";
        document.all["cbshowdocno"].readOnly = true;
        document.all["cbshowdocno"].disabled = true;
        document.all["btExcel"].disabled = false;
        document.all["btODS"].disabled = false;
        document.all["btTXT"].disabled = false;
        document.all["btPreview"].disabled = true;
    } else if (document.all['rbTypeCase'].checked) {
        document.all["cbAtt"].disabled = true;
    }
    
}
    //1140902      Daniel  1140805 (北榮)新增北榮專用案卷選項、報表、EXCEL
function RptTypeOnClick() {
    if (document.all['rbTypeCase'].checked) {
        document.all["btExcel"].disabled = false;
        document.all["rbTPVGH"].disabled = false;
        document.all["rbTPVGH"].checked = true;
        document.all["cbDoc"].checked = true;
        document.all["cbFM"].disabled = true;
        document.all["rbPrototype"].disabled = true;
        document.all["cbshowdocno"].disabled = true;
        document.all["cbshowdocno"].checked = false;
        document.all["cbAtt"].disabled = true;
    } else {
        document.all["btExcel"].disabled = false;
        document.all["rbTPVGH"].disabled = true;
        document.all["cbFM"].checked = true;
        document.all["cbFM"].disabled = false;
        document.all["rbPrototype"].disabled = false;
        document.all["cbshowdocno"].disabled = false;
        document.all["cbshowdocno"].checked = true;
        document.all["cbAtt"].disabled = false;
    }
}