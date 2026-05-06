/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.25		David	951272	修改按下編目校核鍵後，游標移至未填欄位
 * 96.03.19		David	960066	中央，相關機關預設帶出第一個選項
 * 96.05.29		Cola	000607	退件修改，下拉式選單之值若有相同，則顯示選單中下一筆 
 * 96.10.03		Cola	--		修改編目檢核時若檢核出錯時會postback回server端將已填欄位清空之問題, 同時修改按下儲存時先不進行編目檢核 
 * 96.11.28		Cola	951388	檔案數量額外新增一組欄位
 * 97.02.12		Cola	0970115	使用encodeURIComponent Function將檔號加密，避免EAI304 呼叫WebService失效
 * 97.07.16		Cola	0970576	(檔管局)開啟/儲存/編目校核時，均檢核該案下有無案件
 * 97.11.07		Cola	0970988	密等與應用限制之連動
 * 97.11.18		Leslie	0970969	依附件七定義，修正"案情摘要"之相關檢核，並增加可開啟EAC206案情摘要明細維護作業
 * 99.09.16		Leslie	0990509	修改開啟EAC204之視窗大小
 //1060215      Zen     1050087 二代公文修改
 //1060818		Zen     1050087 修正點擊案件瀏覽後下拉選單被清空之問題
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1070921		Zen		1070678 修正弱掃錯誤
 * 1080716		Cloud	1080550	修改開啟EAI304時改為傳案次號、分類號鍵值
 * 1081114		Kevin_C	1080753	MERGE[1070940]新增取得最新案卷資料功能鈕
 * 1090227		Kevin_C	1090052	[000607]應判斷檔案有關機關Combobox有下一選項才取用該選項
 * 1090312		Cloud	1081109	修改版本/年度互轉功能
 * 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
 * 1101110      Zen     1100338 配合109年法規應用限制為限制開放時應用註記不可為空
 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題
 * 1120712      Cloud   --      遇到bug一併修
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
var oChildWinId = "";
var dlCaseNoIndex = 10;

//96.03.19 960066 David
var LayoutModeNew = 0;
var LayoutModeModify = 1;

window.onunload = CloseChildWin;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

if (document.all.tbTool)
{
    ToolBarEventHandle();
    //1060215 Zen 1050087 二代公文修改
    //document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
}

//1070830 Zen 1070678 弱掃Ajax修正
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060215 Zen 1050087 二代公文修改
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, null);
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //96.03.19 960066 David 中央，相關機關預設帶出第一個選項 - Start
    var EAM200_BRINGOUT_ORGINFO = document.all["EAM200_BRINGOUT_ORGINFO"].value;
    var Mode = "0";//document.all["Mode"].value;

    if (document.all["TemplateMode"])
        Mode = document.all["TemplateMode"].value;

    if (EAM200_BRINGOUT_ORGINFO == "Y")
    {
        if (LayoutModeModify == parseInt(Mode, 10))
            fn_Choose1st_itme();
    }
    //96.03.19 960066 David - End
}

function CloseChildWin()
{
    if (oChildWinId != "")
        oChildWinId.close();
}
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060215 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
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
        case "btOtherSubject"://案名其他鍵
            Page_BlockSubmit = true;
            var strCaseKey = document.all["H_CaseKey"].value;
            var strUrl = "EAC201.aspx?nCaseKey=" + strCaseKey;
            //1060215 Zen 1050087 二代公文修改
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC201", 530, 300);
            oChildWinId = jf_OpenChildWin(strUrl, "EAC201", 800, 600);
            break;
        case "btRem"://附註項
            Page_BlockSubmit = true;
            var strCaseKey = document.all["H_CaseKey"].value;
            var strUrl = "EAC202.aspx?nCaseKey=" + strCaseKey;
            //1060215 Zen 1050087 二代公文修改
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC202", 660, 400);
            oChildWinId = jf_OpenChildWin(strUrl, "EAC202", 800, 600);
            break;
        case "btSubject"://主題項
            Page_BlockSubmit = true;
            var strCaseKey = document.all["H_CaseKey"].value;
            var strUrl = "EAC203.aspx?nCaseKey=" + strCaseKey;
            //1060215 Zen 1050087 二代公文修改
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC203", 660, 400);
            oChildWinId = jf_OpenChildWin(strUrl, "EAC203", 800, 600);
            break;
        case "btAttInfo"://參照案卷
            Page_BlockSubmit = true;
            var strCaseKey = document.all["H_CaseKey"].value;
            var strVerNo = document.all["txVerNo"].value;
            var strUrl = "EAC205.aspx?nCaseKey=" + strCaseKey + "&nVerNo=" + strVerNo;
            //1060215 Zen 1050087 二代公文修改
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC205", 660, 400);
            oChildWinId = jf_OpenChildWin(strUrl, "EAC205", 800, 600);
            break;
            //0971114	Leslie[0970969]	案情摘要改為可多筆
        case "btCaseDetail"://案情摘要
            Page_BlockSubmit = true;
            var strCaseKey = document.all["H_CaseKey"].value;
            var strUrl = "EAC206.aspx?nCaseKey=" + strCaseKey;
            //1060215 Zen 1050087 二代公文修改
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC206", 800, 600);
            oChildWinId = jf_OpenChildWin(strUrl, "EAC206", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060215 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
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

    CloseChildWin();//關閉舊子視窗

    //[0970576]Add by Cola 讀取案相關資料，判斷該案是否存在 / 該案下案件
    //1070830 Zen 1070678 弱掃Ajax修正
    //var strCheckData = EAM200.CheckFileCount(document.all["H_Source"].value, document.all["txVerNo"].value, document.all["txFileCls"].value, document.all["txFileCase"].value, document.all["txFileYear"].value).value;
    var strCheckData = EA22.EAM200.CheckFileCount(document.all["H_Source"].value, document.all["txVerNo"].value, document.all["txFileCls"].value, document.all["txFileCase"].value, document.all["txFileYear"].value).value;

    //1060215 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;
    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060215 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                //[--]96/10/03 Modify by Cola 由client端進行檢核 - 避免值被清空 -- start --
                if (document.all["H_CaseState"].value == "20")
                {
                    if (!CheckIS_AUDIT("本修改項目將導致本案卷檔案目錄無法通過編目校核，系統將不允許進行儲存。檢核未通過欄位清單："))
                    {
                        Page_BlockSubmit = true;
                    }
                    else
                    {
                        IsServerHandling = true;
                        jf_ShowWaitState();
                        Page_BlockSubmit = false;
                    }
                }
                else
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                //Cola -- end --
            }
            else
                Page_BlockSubmit = true;
            //1060215 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCheck":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查			
            {
                //[--]96/10/03 Modify by Cola 由client端進行檢核 - 避免值被清空 -- start --
                if (!CheckIS_AUDIT("未通過編目校核，下列欄位不可為空白："))
                {
                    Page_BlockSubmit = true;
                }
                else
                {
                    if (!CheckThemeAjax())
                    {
                        alert('請至少輸入一項主題項。');
                        Page_BlockSubmit = true;
                    }
                    else
                    {
                        IsServerHandling = true;
                        jf_ShowWaitState();
                        Page_BlockSubmit = false;
                    }
                }
                //Cola -- end --
            }
            else
                Page_BlockSubmit = true;
            //1060215 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060215 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060215 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            var spl = document.all["H_Split"].value;
            jf_ConfirmClean(true);
            document.all["H_Split"].value = spl;
            //1060215 Zen 1050087 二代公文修改
            //document.all["txFileYear"].focus();
            $('#txFileYear').focus();
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strYear = document.all["txFileYear"].value;
            var strCls = document.all["txFileCls"].value;
            var strCase = document.all["txFileCase"].value;
            var strVerNo = document.all["txVerNo"].value;
            var strUrl = "EAC204.aspx?nCaseYear=" + strYear + "&nClsNo=" + strCls + "&nCaseNo=" + strCase + "&nVerNo=" + strVerNo;
            //0990906	Leslie[0990509]	調整子視窗大小
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC204", 700, 500 );
            //1060215 Zen 1050087 二代公文修改
            //oChildWinId = jf_OpenChildWin(strUrl, "EAC204", 750, 570);
            oChildWinId = jf_OpenChildWin(strUrl, "EAC204", 800, 600);
            break;
        case "btView":
            //1060818 Zen 1050087 修正點擊案件瀏覽後下拉選單被清空之問題
            Page_BlockSubmit = true;
            var strSplit = document.all["H_Split"].value;
            //* 1080716		Cloud	1080550	修改開啟EAI304時改為傳案次號、分類號鍵值
        	//var strFileNo = document.all["txFileYear"].value + strSplit + document.all["txFileCls"].value + strSplit + document.all["txFileCase"].value;
            var strFileNo = document.all["H_ClsKey"].value + '|||' + document.all["H_CaseKey"].value;
            //[0970115]Modify by Cola 使用encodeURIComponent Function將檔號加密，避免EAI304 呼叫WebService失效
            var strUrl = "../EA71/EAI304.aspx?rtnObj=lbReturnValue&k1=" + encodeURIComponent(strFileNo) + "&MODE=1";
            //jf_OpenChildWin(strUrl, "EAI304", 700, 500 );
            jf_OpenTreeWin(strUrl);
            break;
		//1081114 Kevin_C 1080753	MERGE[1070940]新增取得最新案卷資料功能鈕-s
        case "btGetNewCount":
            Page_BlockSubmit = true;
            //密等//保存年限//案卷檔案起始日//案卷檔案訖止日//檔案數量(卷數)//檔案數量(件數)
            var strNowCaseDocInfo = EA22.EAM200.GetNowCaseDocInfo(document.all["H_Source"].value, document.all["H_CaseKey"].value).value.split('|');
            for(var i=0;i<document.all.dlSecNo.options.length;i++)
            {
                if (document.all.dlSecNo.options[i].value == strNowCaseDocInfo[0])
                {
                    document.all.dlSecNo.selectedIndex = i;
                    break;
                }
            }
            document.all["txKeepYear"].value = strNowCaseDocInfo[1];
            document.all["txSDate"].value = strNowCaseDocInfo[2];
            document.all["txEDate"].value = strNowCaseDocInfo[3];
            document.all["txFileCnt"].value = strNowCaseDocInfo[4];
            document.all["txFileDocCnt"].value = strNowCaseDocInfo[5];
            break;
            //1081114 Kevin_C 1080753	MERGE[1070940]新增取得最新案卷資料功能鈕-e
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    //[0970576]Add by Cola 讀取案相關資料，判斷該案是否存在 / 該案下案件
	//1070921 Zen 1070678 修正弱掃錯誤
    //var strCheckData = EAM200.CheckFileCount(document.all["H_Source"].value, document.all["txVerNo"].value, document.all["txFileCls"].value, document.all["txFileCase"].value, document.all["txFileYear"].value).value;
	var strCheckData = EA22.EAM200.CheckFileCount(document.all["H_Source"].value, document.all["txVerNo"].value, document.all["txFileCls"].value, document.all["txFileCase"].value, document.all["txFileYear"].value).value;

    //[0970576]Add by Cola 檢核該案下有無案件，若無案件，秀出訊息後不允許執行儲存動作
    if (strCheckData == "0")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本案卷下無任何案件，不應進行案卷層級編目。"])), "");
        return bRtnbool;
    }
	//1090227		Kevin_C	1090052	增加檢核檔案有關機關不可重複
    if (!CheckdlOrg("Save"))
    {
    	return false;
    }
    //Cola -- end --

    //1101110 Zen 1100338 配合109年法規應用限制為限制開放時應用註記不可為空
    if (document.all['dlApplyLimit'].value == 'R' && document.all['txApplyRemark'].value == '')
    {
        alert('應用限制為限制開放時應用註記不可為空');
		$("#txApplyRemark").focus();
        return false;
    }

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(document.all["H_Source"].value))//檢查鍵值是否已存在
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
    var buf = "";

    var strVerNo = jf_Trim(document.all["txVerNo"].value);
    var strYear = jf_Trim(document.all["txFileYear"].value);
    var strCls = jf_Trim(document.all["txFileCls"].value);
    var strCase = jf_Trim(document.all["txFileCase"].value);
    var strSummary = jf_Trim(document.all["txSummary"].value);
    var strSDate = jf_Trim(document.all["txSDate"].value);
    var strEDate = jf_Trim(document.all["txEDate"].value);
    var strCaseName = jf_Trim(document.all["txCaseName"].value);

    //0971121	Leslie	修正檢核條件，改為300字元(150中文字)
    //if (strSummary.length > 300)
    if (strSummary.length > 150)
    {
        if (jf_CheckCharLength(strSummary) > 300)
        {
            if (strErrMsg != "") buf = "\n";
            strErrMsg = "案情摘要長度不可大於300個字元(150個中文字)" + buf + strErrMsg;	//Add "元(150個中文字)"	By	Leslie
            //1060215 Zen 1050087 二代公文修改
            //document.all["txSummary"].focus();
            $('#txSummary').focus();
        }
    }
    if (strSDate != "" && strEDate != "")
    {
        if (strSDate.length < 7)
        {
            strSDate = jf_PADL(strSDate, 7, '0');
            document.all["txSDate"].value = strSDate;
        }
        if (strEDate.length < 7)
        {
            strEDate = jf_PADL(strEDate, 7, '0');
            document.all["txEDate"].value = strEDate;
        }
        if (Number(strSDate) > Number(strEDate))
        {
            if (strErrMsg != "") buf = "\n";
            strErrMsg = "案卷訖止日期不可大於起始日期" + buf + strErrMsg;
            //1060215 Zen 1050087 二代公文修改
            //document.all["txEDate"].focus();
            $('#txEDate').focus();
        }
    }
    if (strCaseName == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "案名不可空白" + buf + strErrMsg;
        //1060215 Zen 1050087 二代公文修改
        //document.all["txCaseName"].focus();
        $('#txCaseName').focus();
    }
    if (strCls == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "分類號不可空白" + buf + strErrMsg;
        //1060215 Zen 1050087 二代公文修改
        //document.all["txFileCls"].focus();
        $('#txFileCls').focus();
    }
    if (strYear == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "年度號不可空白" + buf + strErrMsg;
        //1060215 Zen 1050087 二代公文修改
        //document.all["txFileYear"].focus();
        $('#txFileYear').focus();
    }
    if (strVerNo == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "版本別不可空白" + buf + strErrMsg;
        //1060215 Zen 1050087 二代公文修改
        //document.all["txVerNo"].focus();
        $('#txVerNo').focus();
    }
    //95.10.02 David
    if (jf_Trim(document.all["dg1__ctl2_dlOrgName_Text"].value) == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "產生機關不可空白" + buf + strErrMsg;
        document.all["dg1__ctl2_dlOrgName_Text"].value = "";
        //95.12.25 951272 David
        //1060215 Zen 1050087 二代公文修改
        //document.all["dg1__ctl2_dlOrgName_Text"].focus();
        $('#dg1__ctl2_dlOrgName_Text').focus();
    }

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
    if (argResult.id == wsGetClsID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
			//1090312	Cloud	[1081109] 補上分類號不存在處理
        	if (argResult.value.ClsKey == "")
        	{
        		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array("分類號不存在")), "");
        		$('#txFileCls').focus();
        		document.all["H_ClsKey"].value = "";
        		document.all["txFileCase"].value = "";
        		document.all["H_CaseKey"].value = "";
        	}
        	//1090312	Cloud	[1081109] 補上分類號不存在處理e
        	else
        	{
        		document.all["txVerNo"].value = argResult.value.VerNo;
        		document.all["H_ClsKey"].value = argResult.value.ClsKey;
        	}
        }
        else
        {
            document.all["H_ClsKey"].value = "";
            document.all["txFileCase"].value = "";
            document.all["H_CaseKey"].value = "";
            if (argResult.value.m_strErrMsg.substring(0, 3) == "年度號")
                //1060215 Zen 1050087 二代公文修改
                //document.all["txFileYear"].focus();//年度號不正確
                $('#txFileYear').focus();//年度號不正確
            else if (argResult.value.m_strErrMsg.indexOf("、") >= 0)
                //1060215 Zen 1050087 二代公文修改
                //document.all["txVerNo"].focus();
                $('#txVerNo').focus();//版本號不正確
            else
                //1060215 Zen 1050087 二代公文修改
                //document.all["txFileCls"].focus();
                $('#txFileCls').focus();//分類號不正確
        }
    }
    else if (argResult.id == wsGetClsCaseID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.CaseYear != "")
                document.all["txFileYear"].value = argResult.value.CaseYear;
            document.all["H_CaseKey"].value = argResult.value.CaseKey;
        }
        else
        {
            document.all["H_CaseKey"].value = "";
            if (argResult.value.m_strErrMsg.indexOf("、") >= 0)
                //1060215 Zen 1050087 二代公文修改
                //document.all["txFileYear"].focus();
                $('#txFileYear').focus();//年度號不正確
            else
                //1060215 Zen 1050087 二代公文修改
                //document.all["txFileCase"].focus();
                $('#txFileCase').focus();//案次號不正確
        }
    }
	//1090312 Cloud 1081109 修改支援叫用年度/版本互轉-s
    else if (argResult.id == wsGetVerYearID)
    {
		//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況
    	//if (jf_IsWebServiceSuccess(argResult))
		if(!argResult.error && argResult.value.m_bSuccess) 
    	{
    		if (CurrOBjdID == "txFileYear")
    		{
				document.all["txVerNo"].value = argResult.value.strVerNo;
				oldYearValue = document.all["txFileYear"].value;
    		}
    		else
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			var WSResult = argResult.value;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["txFileYear"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					oldYearValue = document.all["txFileYear"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < WSResult.strSdate || document.all["txFileYear"].value > WSResult.strEdate)
    				{
    					if (document.all["txFileYear"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					oldYearValue = document.all["txFileYear"].value = WSResult.strEdate;
    				}
    			}
    		}
    	}
    	else
    	{
    			if (callObj.value.m_strErrMsg.indexOf("輸入年度含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    			{
					//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-S
					var bAlert = true;		
					if(document.all["txVerNo"].value!="")
					{
									
						var checkmsg = argResult.value.m_strErrMsg.split('版本')
						for(var i=0 ;i<checkmsg.length;i++)
						{
							if(checkmsg[i].indexOf("啟用區間為")!=-1)
							{
								if(checkmsg[i].split('啟用區間為')[0]==document.all["txVerNo"].value)
								{
									bAlert = false;
									break;
								}
							}
						}
					}
					if(bAlert)
					{
						document.all["txVerNo"].value = "";
						document.all["txVerNo"].focus();
						oldYearValue = document.all["txFileYear"].value;
						alert(argResult.value.m_strErrMsg);
					}
					//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-E
    			}
    			else
    			{
    				document.all[CurrOBjdID].value = "";
    				$('#' + CurrOBjdID).focus();
    			}
    	}
    }
	//1090312 Cloud 1081109 修改支援叫用年度/版本互轉-e
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    if (argCallerId == "EAC204")
    {
        var strSplit = document.all["H_Split"].value;
        var strText = jf_Trim(document.all.lbReturnValue.options[0].text);
        var strValue = jf_Trim(document.all.lbReturnValue.options[0].value);
        var argText = strText.split(strSplit);//年度+分類號+案號
        var argValue = strValue.split(':');//分類鍵值+案次鍵值+版本別
        document.all["txFileYear"].value = argText[0];
        document.all["txFileCls"].value = argText[1];
        document.all["txFileCase"].value = argText[2];
        document.all["H_ClsKey"].value = argValue[0];
        document.all["H_CaseKey"].value = argValue[1];
        document.all["txVerNo"].value = argValue[2];
    	//1090312 CLOUD	1081109 支援年度/版本互轉-紀錄舊值
        oldYearValue = document.all["txFileYear"].value;

        var strBuf = "";
        document.all["H_Value"].value = "";
        for (var iArr = 0; iArr < document.all.lbReturnValue.length; iArr++)
        {
            var txt = jf_Trim(document.all.lbReturnValue.options[iArr].text);
            var val = jf_Trim(document.all.lbReturnValue.options[iArr].value);
            var argTxt = txt.split(strSplit);//年度+分類號+案號
            var argVal = val.split(':');//分類鍵值+案次鍵值+版本別
            document.all["H_Value"].value += strBuf + argTxt[0] + ":" + argTxt[1] + ":" + argTxt[2] + ":" + argVal[0] + ":" + argVal[1] + ":" + argVal[2];
            strBuf = "^";
        }
        if (strText != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1060215 Zen 1050087 二代公文修改
        //document.all["txCaseName"].focus();
        $('#txCaseName').focus();
    }
    if (argCallerId == "EAI304")
    {
        var subject = jf_Trim(document.all.lbReturnValue.options[0].value);
        document.all["txSummary"].value = subject;
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
//1090312 Cloud 1081109 補上取得版本別
var wsGetVerYearID = null;
var CurrOBjdID = null;
var oldYearValue = "";
function txFileYear_onblur()
{
    var strYear = document.all["txFileYear"].value;
    if (strYear != "")
    {
        strYear = jf_PADL(strYear, 3, '0');
        document.all["txFileYear"].value = strYear;
    	//1090312 Cloud 1081109 補上取得版本別-S
        if (oldYearValue != document.all["txFileYear"].value)
        {
        	CurrOBjdID = "txFileYear";
        	var arWSParam = new Array(3);
        	arWSParam[0] = document.all["txFileYear"].value;
        	arWSParam[1] = document.all["txVerNo"].value;
        	arWSParam[2] = "Year";
        	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
        	wsGetVerYearID = callObj.id;
        	OnWSResult(callObj);
        }
    }
	
	//1090312 Cloud 1081109 補上取得版本別-E
    txFileCase_onblur();
}

function txFileCls_onblur(e)
{
    if (bIsDoubleMsg == true)
    {
        bIsDoubleMsg = false;
        return;
    }
    var actElementId = document.activeElement.id;
    //1060215 Zen 1050087 二代公文修改
    //var srcElementId = event.srcElement.id;
    var srcElementId = e.id;
    if ((actElementId == "txFileCls" && srcElementId == "txVerNo") || (actElementId == "txVerNo" && srcElementId == "txFileCls"))
    	bIsDoubleMsg = true;
	//1090312 Cloud 1081109 補上取得版本別-S
    if (srcElementId == "txVerNo" && document.all["txVerNo"].value != "")
    {
    	CurrOBjdID = "txVerNo";
    	var arWSParam = new Array(3);
    	arWSParam[0] = document.all["txFileYear"].value;
    	arWSParam[1] = document.all["txVerNo"].value;
    	arWSParam[2] = "VerNo";
    	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
    	wsGetVerYearID = callObj.id;
    	OnWSResult(callObj);
    	
    }
	//1090312 Cloud 1081109 補上取得版本別-E
    if (document.all["txFileCls"].value == "")
    {
        document.all["H_ClsKey"].value = "";
        return;
    }

    var arWSParam = new Array(3);
    arWSParam[0] = document.all["H_Source"].value;
    arWSParam[1] = document.all["txVerNo"].value;
    arWSParam[2] = document.all["txFileCls"].value;
    arWSParam[3] = document.all["txFileYear"].value;
    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);

    wsGetClsID = callObj.id;
    OnWSResult(callObj);
}

function txFileCase_onblur()
{
    //案卷檔案目錄維護不用檢查案號是否存在
    return;
    if (bIsDoubleMsg2 == true)
    {
        bIsDoubleMsg2 = false;
        return;
    }
    //1060215 Zen 1050087 二代公文修改
    //var actElementId = document.activeElement.id;
    //var srcElementId = event.srcElement.id;
    //if ((actElementId == "txFileCase" && srcElementId == "txFileYear") || (actElementId == "txFileYear" && srcElementId == "txFileCase"))
    //    bIsDoubleMsg2 = true;
    if (document.all["txFileCase"].value == "")
    {
        document.all["H_CaseKey"].value = "";
        return;
    }

    var arWSParam = new Array(4);
    arWSParam[0] = document.all["H_Source"].value;
    arWSParam[1] = document.all["txFileYear"].value;
    arWSParam[2] = document.all["H_ClsKey"].value;
    arWSParam[3] = document.all["txFileCase"].value;
    var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, arWSParam);
    wsGetClsCaseID = callObj.id;
    OnWSResult(callObj);
}

function ToolBarEventHandle()
{
    //1060215 Zen 1050087 二代公文修改--begin
    //var oCaseNo = GetToolbarCtrl(dlCaseNoIndex);
    //oCaseNo.setAttribute("onchange", dlCaseNo_onChange);
	if (document.all.dlCaseNo) {
        var oCaseNo = document.all.dlCaseNo;
		oCaseNo.onchange = dlCaseNo_onChange;
	}
    //1060215 Zen 1050087 二代公文修改--end
}

//1060215 Zen 1050087 二代公文修改
////取出Toolbar物件
//function GetToolbarCtrl(argObjIdx)
//{
//    //return document.all.tbTool.getItem(argObjIdx);
//    for (var i = 0; i < 20; i++)
//    {
//        var o = document.all.tbTool.getItem(i);
//        if (o != null)
//        {
//            alert(o.getAttribute("ID"));
//            if (o.getAttribute("ID") == argObjIdx)
//                return o;
//        }
//    }
//    return null;
//}

function dlCaseNo_onChange()
{
    //96.03.23 960065 David 若發生檢核未通過時，會將Page_BlockSubmit設為true
    //但若觸發dropdownList之Onchange事件，卻未將Page_BlockSubmit設回false
    //導致此時變更案號清單，會無法變更案卷內容之情形發生
    Page_BlockSubmit = false;

    //1060215 Zen 1050087 二代公文修改
    //var oCaseNo = GetToolbarCtrl(dlCaseNoIndex);
    var oCaseNo = document.all.dlCaseNo;

    //1060215 Zen 1050087 二代公文修改
    //var item = oCaseNo.getOptions();
    //var index = item.selectedIndex;
    var item = oCaseNo.options[oCaseNo.selectedIndex];

    //1060215 Zen 1050087 二代公文修改--begin
    //var txt = item[index].text;
    //var val = item[index].value;
    var txt = item.text;
    var val = item.value;
    //1060215 Zen 1050087 二代公文修改--end
    var strSplit = document.all["H_Split"].value;
    var argTxt = txt.split(strSplit);//年度+分類號+案號
    var argVal = val.split(strSplit);//分類鍵值+案次鍵值+版本別
    document.all["txFileYear"].value = argTxt[0];
    document.all["txFileCls"].value = argTxt[1];
    document.all["txFileCase"].value = argTxt[2];
    document.all["H_ClsKey"].value = argVal[0];
    document.all["H_CaseKey"].value = argVal[1];
    document.all["txVerNo"].value = argVal[2];
    //1060215 Zen 1050087 二代公文修改
    //jf_OpenButtonSubmit();
    jf_OpenButtonSubmit('btOpen');
}

//[--]96/10/03 Modify by Cola --start
//Daivd 95.09.19
function CheckIS_AUDIT(strval)
{
    var bRtnbool = true;
    var strErrMsg = "";
    var strBuf = "";

    if (document.all["txCaseName"].value == "")
    {
        strErrMsg += strBuf + "案名";
        strBuf = "、";
        FocusAt(document.all["txCaseName"]);
    }
    if (document.all["txKeepYear"].value == "")
    {
        strErrMsg += strBuf + "保存年限";
        strBuf = "、";
        FocusAt(document.all["txKeepYear"]);
    }
    if (document.all["txSDate"].value == "")
    {
        strErrMsg += strBuf + "案卷檔案起始日期";
        strBuf = "、";
        FocusAt(document.all["txSDate"]);
    }
    if (document.all["txEDate"].value == "")
    {
        strErrMsg += strBuf + "案卷檔案訖止日期";
        strBuf = "、";
        FocusAt(document.all["txEDate"]);
    }
    if (document.all["txFileCnt"].value == "" || document.all["txFileCnt"].value == "0")
    {
        strErrMsg += strBuf + "檔案數量(卷)";
        strBuf = "、";
        FocusAt(document.all["txFileCnt"]);
    }
    //[951388]Add by Cola 額外判斷新增欄位
    if (document.all["txFileDocCnt"].value == "" || document.all["txFileDocCnt"].value == "0")
    {
        strErrMsg += strBuf + "檔案數量(件)";
        strBuf = "、";
        FocusAt(document.all["txFileDocCnt"]);
    }
    if (document.all["txSummary"].value == "")
    {
        strErrMsg += strBuf + "案情摘要";
        strBuf = "、";
        FocusAt(document.all["txSummary"]);
    }
    if (strErrMsg != "")
    {
        bRtnbool = false;
        alert(strval + strErrMsg);
    }
    return bRtnbool;
}
//Cola -- end --

//96.03.19 960066 David
//中央，相關機關預設帶出第一個選項
function fn_Choose1st_itme()
{
    var DgSize = document.all["dg1"].rows.length;
    var tmp_value = new Array();

    for (var i = 0; i < DgSize - 1; i++)
    {
        var dlCnt = document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options.length;
        var val = document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value;

        if (val == "")
        {
            try
            {
                for (var j = 0; j < 10; j++)
                {
                	//1090227		Kevin_C	1090052	options後面必須接[]
                	//var Content = document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options(j).value;
                	var Content = document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options[j].value;

                    if (Content != "")
                    {
                        document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value = Content;
                        break;
                    }
                }
            }
            catch (e)
            {
            }
        }
        //Cola 000607 退件修改 -- start -- dg1中帶出之值 若有相同的情況  則帶下一筆 --
        val = document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value;

        for (var n = 0 ; n < dlCnt ; n++)
        {
        	var num = 0;
        	//1090227		Kevin_C	1090052	options後面必須接[]
        	//if (val == document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options(n).value)
        	if (val == document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options[n].value)
            {
                num = n;
                break;
            }
        }

        for (var k = 0 ; k < tmp_value.length ; k++)
        {
            if (tmp_value[k] == val && val != "")
            {
            	//1090227		Kevin_C	1090052	應判斷檔案有關機關Combobox有下一選項才取用該選項，無下個選項時給空值
            	//document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value = document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options(num + 1).value;
				var strNextOption = document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options[num + 1];
				if (strNextOption)					
					document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value = document.all["dg1__ctl" + (i + 2) + "_dlOrgName"].options[num + 1].value;
				else
					document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value = "";
                val = document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value;
                k = 0;
                num++;
            }
        }
        tmp_value[tmp_value.length] = document.all["dg1__ctl" + (i + 2) + "_dlOrgName_Text"].value;
        //Cola 000607 - end --			
    }
}
//[2007/10/03]add by Cola 新增ajax判斷檢核主題項
function CheckThemeAjax()
{
    var rtnvalue = true;

    //1070830 Zen 1070678 弱掃Ajax修正
    //var str = EAM200.CheckNoAjax(document.all["H_CaseKey"].value, document.all["ORGNO"].value).value;
    var str = EA22.EAM200.CheckNoAjax(document.all["H_CaseKey"].value, document.all["ORGNO"].value).value;

    if (str == "0")
    {
        rtnvalue = false;
    }
    return rtnvalue;


}
function FocusAt(argObj)
{
    try
    {
        if (!argObj.disabled)
            //1060215 Zen 1050087 二代公文修改
            //argObj.focus();
            $('#' + argObj).focus();
    }
    catch (e)
    { }
}
//2008.11.7 Add by Cola 密等/應用限制之連動
function Sec_OnChange(argEnvValue)
{
    var dlSecNo_Index = document.all["dlSecNo"].options[document.all["dlSecNo"].selectedIndex].value;
    if (dlSecNo_Index == "1") //表示普通件
    {
        ddlSelect("dlApplyLimit", argEnvValue.substring(0, 1));
    }
    else if (dlSecNo_Index > "1") //表示密等
    {
        ddlSelect("dlApplyLimit", argEnvValue.substring(1, 2));
    }
}
function ddlSelect(argSelectId, argSelectValue)
{
    var a = 0;
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].value == argSelectValue)
        {
            a = i;
        }
    }
    document.all[argSelectId].selectedIndex = a;
}

//計算傳入的字串中，共計多少字元數(中文字為2字元)
function jf_CheckCharLength(strSummary)
{
    var len = strSummary.length;
    var toLen = 0;
    for (var idx = 0; idx < len; idx++)
    {
        if (strSummary.charCodeAt(idx) > 255)
            toLen += 2;
        else
            toLen++;
    }
    return toLen;
}
//1090227		Kevin_C	1090052	增加檢核檔案有關機關不可重複
function CheckdlOrg(argType)
{
	//避免訊息重複跳導致程式卡住
	if (!argType && document.activeElement.id.indexOf("dlOrgName") != -1)
		return true;

	var strRow1=document.all.dg1__ctl2_dlOrgName_Text.value;
	var strRow2=document.all.dg1__ctl3_dlOrgName_Text.value;
	var strRow3=document.all.dg1__ctl4_dlOrgName_Text.value;
	if (strRow2 != "" && strRow1 == strRow2)
	{
		alert("檔案有關機關不可重複");
		return false;
	}
	else if (strRow3 != "" && (strRow1 == strRow3 || strRow2 == strRow3))
	{
		alert("檔案有關機關不可重複");
		return false;
	}
	else
		return true;
}