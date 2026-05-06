/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號	概要
 * -------------------------------------------------------------------------------------------------
 * 97.09.30		Cola	0970898	修正檔號檢核邏輯
 //1060217      Zen     1050087 二代公文修改
 * 1060416		Kevin_C	1050781	新增預覽功能鍵
 * 1070322      Zen     1070311 修正二代升級衍生問題
 * 1070518      Justin  1070305 新增匯出Excel、ODS
 * 1090318		Cloud	1081109	修改支援輸入年度、分類即可取得版本別
 * 1111214      Cloud   1111860 修改支援銓敘部個人案使用
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsGetClsID;
var wsGetClsCaseID;
var bIsDoubleMsg = false;
var bIsDoubleMsg2 = false;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1060217 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060217 Zen 1050087 二代公文修改
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, null);
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //* 1111214      Cloud   1111860 修改支援銓敘部個人案使用
    FileTypeOnClick();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060217 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060217 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
            //1070322 Zen 1070311 修正二代升級衍生問題，搬移至ClientButtonControl()
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect");
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060217 Zen 1050087 二代公文修改
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

    //1060217 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            //[0970898]Modify by Cola 判斷若有輸入到案次號時, 年度號及分類號之起迄值是否相同
            //* 1111214      Cloud   1111860 修改支援銓敘部個人案使用
            if (document.all["rbPer"].checked == true) {
                if (jf_Trim(document.all["txPerYear"].value) == "") {
                    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["年度號不可為空白。"])), "");
                    $('#txFileYearS').focus();
                    Page_BlockSubmit = true;
                }
                else
                    Page_BlockSubmit = false;
            }
            else {
                if (!jf_CheckFileNo())
                    Page_BlockSubmit = true;
                else
                    Page_BlockSubmit = false;

                txFileCls_onblur('S');
                txFileCls_onblur('E');

                //1000330	Howard	100149	修改搜尋時至少輸入年度號條件

                if (jf_Trim(document.all["txVerNo"].value) == "" && jf_Trim(document.all["txFileYearS"].value) == "" && jf_Trim(document.all["txFileClsS"].value) == "" && jf_Trim(document.all["txFileCaseS"].value) == "" &&
                    jf_Trim(document.all["txFileYearE"].value) == "" && jf_Trim(document.all["txFileClsE"].value) == "" && jf_Trim(document.all["txFileCaseE"].value) == "") {

                    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入年度號之條件，以縮小查詢範圍"])), "");
                    //1060217 Zen 1050087 二代公文修改
                    //document.all["txFileYearS"].focus();
                    $('#txFileYearS').focus();
                    Page_BlockSubmit = true;
                }
            }
            //1060217 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = true;
            if (jf_CheckBeforSave())
            {
                ReturnValue();
                close();
            }
            break;
        case "btExit":
            close();
            break;
            //1060416	Kevin_C	1050781	新增預覽功能鍵
        case "btPreview":
        //1070518 Justin  [1070305]新增匯出Excel、ODS
        case "btExcel":
        case "btODS":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
            //1070322 Zen 1070311 修正二代升級衍生問題，搬移至ClientButtonControl()
            ////以下屬於DataGrid ToolBar
            //case "btSelectAll":
            //	Page_BlockSubmit = true;
            //	jf_SelectAll("dg1", "_cbSelect");
            //	break;
            //case "btSelectInverse":
            //	Page_BlockSubmit = true;
            //	jf_SelectInverse("dg1", "_cbSelect");
            //	break;
            //case "btSelectClear":
            //	Page_BlockSubmit = true;
            //	jf_SelectClear("dg1", "_cbSelect");
            //	break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = false;

    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == true)
        {
            bRtnbool = true;
            break;
        }
    }

    if (bRtnbool == false)
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult, srcType)
{
    //webserver回傳後動作
    if (argResult.id == wsGetClsID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all["txVerNo"].value = argResult.value.VerNo;
            document.all["H_VerNo"].value = argResult.value.VerNo;
            document.all["H_ClsKey" + srcType].value = argResult.value.ClsKey;
            //紀錄前次版本別
            document.all["H_VerNo"].value = document.all["txVerNo"].value;
        }
        else
        {
            document.all["H_ClsKey" + srcType].value = "";
            if (argResult.value.m_strErrMsg.substring(0, 3) == "年度號")
                //1060217 Zen 1050087 二代公文修改
                //document.all["txFileYear" + srcType].focus();//年度號不正確
                $('#txFileYear' + srcType).focus();//年度號不正確
            else if (argResult.value.m_strErrMsg.indexOf("、") >= 0)
                //1060217 Zen 1050087 二代公文修改
                //document.all["txVerNo"].focus();
                $('#txVerNo').focus();
            else
                //1060217 Zen 1050087 二代公文修改
                //document.all["txFileCls" + srcType].focus();
                $('#txFileCls' + srcType).focus();

            Page_BlockSubmit = true;//[0970898]Add by Cola 若錯誤則不允許post back
        }
    }
    else if (argResult.id == wsGetClsCaseID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.CaseYear != "")
                document.all["txFileYear" + srcType].value = argResult.value.CaseYear;
        }
        else
        {
            if (argResult.value.m_strErrMsg.indexOf("、") >= 0)
                //1060217 Zen 1050087 二代公文修改
                //document.all["txFileYear" + srcType].focus();
                $('#txFileYear' + srcType).focus();
            else
                //1060217 Zen 1050087 二代公文修改
                //document.all["txFileCase" + srcType].focus();
                $('#txFileCase' + srcType).focus();
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
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function txFileYear_onblur(srcType)
{
    var strYear = document.all["txFileYear" + srcType].value;
    if (strYear != "")
    {
        strYear = jf_PADL(strYear, 3, '0');
        document.all["txFileYear" + srcType].value = strYear;
    }
    txFileCase_onblur(srcType);
}

function txVerNo_onblur()
{
    var strLastVerNo = document.all["H_VerNo"].value;
    var strNowVerNo = document.all["txVerNo"].value;
    if (strLastVerNo != strNowVerNo)
    {
        //[0970898]Modify by Cola 跳出此訊息之情境僅在版別有變更、且檔號起迄有值之情況下才跳出
        if (jf_Trim(document.all["txFileYearS"].value) + jf_Trim(document.all["txFileClsS"].value) + jf_Trim(document.all["txFileCaseS"].value) +
			jf_Trim(document.all["txFileYearE"].value) + jf_Trim(document.all["txFileClsE"].value) + jf_Trim(document.all["txFileCaseE"].value) != "")
        {
            if (window.confirm("變更版本後將清空所有卷號，是否繼續?"))
            {
                document.all["txFileYearS"].value = "";
                document.all["txFileYearE"].value = "";
                document.all["txFileClsS"].value = "";
                document.all["txFileClsE"].value = "";
                document.all["txFileCaseS"].value = "";
                document.all["txFileCaseE"].value = "";
                document.all["H_ClsKeyS"].value = "";
                document.all["H_ClsKeyE"].value = "";
                document.all["H_VerNo"].value = document.all["txVerNo"].value;
            }
            else
            {
                document.all["txVerNo"].value = document.all["H_VerNo"].value;
            }
        }
    }
    else
    {
        txFileCls_onblur('S');
    }
}

function txFileCls_onblur(srcType)
{
    /*if (bIsDoubleMsg == true)
	{
		bIsDoubleMsg = false;
		return;
	}*/
    //1060217 Zen 1050087 二代公文修改
    //var actElementId = document.activeElement.id;
    //var srcElementId = event.srcElement.id;
    //if ((actElementId == "txFileCls" + srcType && srcElementId == "txVerNo") || (actElementId == "txVerNo" && srcElementId == "txFileCls" + srcType))
    //	bIsDoubleMsg = true;

    if (document.all["txFileCls" + srcType].value == "")
    {
        document.all["H_ClsKey" + srcType].value = "";
        return;
    }
	//* 1090318		Cloud	1081109	修改支援輸入年度、分類即可取得版本別-為維持城市本身邏輯，當有輸入年度號時改為叫用getcls
    if (document.all["txFileYear" + srcType].value != "" &&  document.all["txVerNo"].value=="")
    {   
    	var arWSParam = new Array(5);
    	arWSParam[0] = document.all["H_Source"].value;
    	arWSParam[1] = document.all["txVerNo"].value;
    	arWSParam[2] = document.all["txFileCls" + srcType].value;
    	arWSParam[3] = document.all["txFileYear" + srcType].value;
    	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
    }
    else
    {
    	var arWSParam = new Array(5);
    	arWSParam[0] = document.all["H_Source"].value;
    	arWSParam[1] = document.all["txVerNo"].value;
    	arWSParam[2] = document.all["txFileCls" + srcType].value;
    	arWSParam[3] = document.all["txFileYear" + srcType].value;
    	//[0970898]Add by Cola 因改為透過ws_GetClsCase檢核分類號, 取代原本之ws_GetCls, 因此需要額外傳一個參數
    	arWSParam[4] = "";
    	//callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);
    	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, arWSParam);
    }

    wsGetClsID = callObj.id;
    OnWSResult(callObj, srcType);
}

function txFileCase_onblur(srcType)
{
    /*if (bIsDoubleMsg2 == true)
	{
		bIsDoubleMsg2 = false;
		return;
	}*/
    //1060217 Zen 1050087 二代公文修改
    //var actElementId = document.activeElement.id;
    //var srcElementId = event.srcElement.id;
    //if ((actElementId == "txFileCase" + srcType && srcElementId == "txFileYear" + srcType) || (actElementId == "txFileYear" + srcType && srcElementId == "txFileCase" + srcType))
    //	bIsDoubleMsg2 = true;
    if (document.all["txFileCase" + srcType].value == "")
    {
        //document.all["H_CaseKey"].value = "";
        return;
    }

    var arWSParam = new Array(4);
    arWSParam[0] = document.all["H_Source"].value;
    arWSParam[1] = document.all["txFileYear" + srcType].value;
    arWSParam[2] = document.all["H_ClsKey" + srcType].value;
    arWSParam[3] = document.all["txFileCase" + srcType].value;
    var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, arWSParam);
    wsGetClsCaseID = callObj.id;
    OnWSResult(callObj, srcType);
}

//組出回傳值
function ReturnValue()
{
    try
    {
        var strVal = "";
        var strBuf = "";
        for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
        {
            if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == false)
                continue;
            //1060217 Zen 1050087 二代公文修改
            //strVal += strBuf + document.all["dg1__ctl" + iRow + "_lbFileCase"].innerText + ":" + document.all["dg1__ctl" + iRow + "_lbClsKey"].innerText;
            strVal += strBuf + document.all["dg1__ctl" + iRow + "_lbFileCase"].textContent + ":" + document.all["dg1__ctl" + iRow + "_lbClsKey"].textContent;
            strBuf = "^";
        }
        var argVal = strVal.split('^');
        opener.document.all.lbReturnValue.length = argVal.length;
        for (var iArr = 0; iArr < argVal.length; iArr++)
        {
            if (argVal[iArr] == "") continue;
            var argRet = argVal[iArr].split(':');
            opener.document.all.lbReturnValue.options[iArr].text = argRet[0];//案號
            opener.document.all.lbReturnValue.options[iArr].value = argRet[1] + ":" + argRet[2] + ":" + argRet[3];//分類鍵值+案次鍵值+版本別
        }
        opener.window.CallBack("EAC204");
        close();
    }
    catch (e) { }
}
function jf_CheckFileNo()
{
    var bRtnbool = false;
    if (document.all["txFileCaseS"].value != "" || document.all["txFileCaseE"].value != "")
    {
        if ((document.all["txFileYearS"].value + document.all["txFileClsS"].value != document.all["txFileYearE"].value + document.all["txFileClsE"].value)
		&& (document.all["txFileYearE"].value + document.all["txFileClsE"].value != "")
		&& (document.all["txFileYearS"].value + document.all["txFileClsS"].value != ""))
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["指定案次號時，年度號及分類號之起迄值必需相同"])), "");
            //1060217 Zen 1050087 二代公文修改
            //document.all["txFileClsE"].focus();
            $('#txFileClsE').focus();
            bRtnbool = false;
        }
        else
        {
            bRtnbool = true;
        }
    }
    else
        bRtnbool = true;

    return bRtnbool;
}
//* 1111214      Cloud   1111860 修改支援銓敘部個人案使用-S
function FileTypeOnClick()
{
    if (document.all["rbOrg"].checked == true)//機關檔
    {
        document.all["Label1"].textContent = "版 本 別：";
        setTexTdisable(false);
        document.all["txVerNo"].className = "";
        document.all["txPerYear"].className = "hide";
        if (document.all["btPreview"])
            document.all["btPreview"].className = "";
        if (document.all["btExcel"])
            document.all["btExcel"].className = "";
        if (document.all["btODS"])
            document.all["btODS"].className = "";
    }
    else//個人檔
    {
        document.all["Label1"].textContent = "年 度 號：";
        document.all["txVerNo"].className = "hide";
        document.all["txPerYear"].className = "";
        document.all["cbBefore95"].checked = false;
        document.all["cbWithSec"].checked = false;
        document.all["cbINPFILE_DATE"].checked = false;
        if (document.all["btPreview"])
            document.all["btPreview"].className = "hide";
        if (document.all["btExcel"])
            document.all["btExcel"].className = "hide";
        if (document.all["btODS"])
            document.all["btODS"].className = "hide";
        setTexTdisable(true);
    }
}
function setTexTdisable(isdisable)
{
    document.all["txFileYearS"].disabled = isdisable;
    document.all["txFileClsS"].disabled = isdisable;
    document.all["txFileCaseS"].disabled = isdisable;
    document.all["txFileYearE"].disabled = isdisable;
    document.all["txFileClsE"].disabled = isdisable;
    document.all["txFileCaseE"].disabled = isdisable;
    document.all["txNum"].disabled = isdisable;
    document.all["cbINPFILE_DATE"].disabled = isdisable;
    document.all["cbBefore95"].disabled = isdisable;
    document.all["cbWithSec"].disabled = isdisable;
    document.all["dlMgrUser"].disabled = isdisable;
}
function txPerYearOnBlur()
{ document.all["txPerYear"].value = jf_PADL(document.all["txPerYear"].value, 3, "0"); }
//* 1111214      Cloud   1111860 修改支援銓敘部個人案使用-E