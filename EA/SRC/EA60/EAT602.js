/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號		概要
 * -------------------------------------------------------------------------------------------------
 * 0961017		Cola	000959		支援計劃批號批次帶回功能
 * 1000322		Davy	1000248		新增憑證登錄及檢視功能
 * 1001013		Jeff	1000806		修改移轉日期為必要欄位，且輸入日期時會檢核是否有大於所有批號裡最大的屆滿移轉日期
 * 1010427      Cloud   1010321     修改移交時不該檢核最大屆移轉日期
 * 1031028		Kenny	1030836		配合SSL修改傳入元件之URL
 * 1031112	    Leslie	Kevin_C		1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 104.06.17	Gabby	1040324		增加WebFileIO錯誤訊息處理
 * 1060608      Kenny   1050087     二代系統升級
 * 1060929      Zen     1060885     新增批號是否已加入計畫編號之檢核
 * 1070731      Zen     1070678     弱掃Hardcoded Absolute Path修正
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1080619		Kevin_C	1080477		修正儲存時沒有清理批號導致SQL指令錯誤
 * 1110103      Zen     1101292     修正多次點擊重複PostBack之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var LayoutModeNew = 0;
var LayoutModeModify = 1;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_txPlanNum", "_lbDate", "_lbDesc");

//1060608	Joe		1050087		二代公文修改--S
// if(document.all.tbTool)
// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
// if(document.all.dg1)
// document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1060608	Joe		1050087		二代公文修改--E

InitObj();

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
    //1060608	Joe		1050087		二代公文修改--S
    // jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null);
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    // jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, null);
    // jf_CallWS("EAT602.asmx", "PlanDetailCnt", false, null);
    //1060608	Joe		1050087		二代公文修改--E
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060608	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060608	joe		1050087		二代修改配合行動平台
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    /*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/

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
        case "btKeyHelp":
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            break;

        case "btHelp":
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C2.aspx";
            jf_OpenChildWin(pUrl, "EAT400C2", 750, 500);
            break;

        case "btAdd":
            if (CheckBeforeAdd())
            {
                //1060929 Zen 1060885 新增批號是否已加入計畫編號之檢核
                //if (CheckPlanNoExist())
                if (CheckPlanNoExist() && txPlanNoOnblur())
                {
                    Page_BlockSubmit = false;
                    //Marked by Cola 案件數量會透過CS端算出, 在此不再計算
                    //SummaryFileDetail();
                    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                    IsServerHandling = true;
                    //1060608 Joe 1050087 二代公文修改
                    //__doPostBack("","");
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                    Page_BlockSubmit = true;
            }
            else
            {
                Page_BlockSubmit = true;
            }
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060608 Joe 1050087 二代公文修改，傳入參數event
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

    //1060608 Joe 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060608 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //10001013	Jeff	1000806	新增檢核日期
            if(jf_ConfirmSave() && ChechTranDate()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060608 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060608 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060608 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060608	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["txTPlan"].focus();
            $('#txTPlan').focus();
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EAT602C1.aspx";
            jf_OpenChildWin(strUrl, "EAT602C1", 700, 500);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060608 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060608 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1000321 Davy [1000248] 新增憑證登錄及檢視功能
        case "btReg":
            //1060608 Joe 1050087 二代公文修改--S
            // if(jf_ConfirmReg())
            // Page_BlockSubmit = false;				
            // else
            // Page_BlockSubmit = true;			
            //jf_ToolBarSubmit();
            Page_BlockSubmit = true;
            document.all.fileInput.click();
            //1060608 Joe 1050087 二代公文修改--E
            break;
        case "btView":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EAT602C2.aspx?argOrgNo=" + document.all["txOrgNo"].value + "&argPlanNo=" + document.all["txTPlan"].value;
            jf_OpenChildWin(strUrl, "EAT602C2", 800, 300);
            break;

            //以下屬於DataGrid ToolBar
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
        case "btDeleteSelected":
            Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect");
            //1060608 Joe 1050087 二代公文修改
            //jf_SelectBarSubmit();
            jf_SelectBarSubmit(xObjectName);
            break;

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
    //1001013	Jeff	1000806		移轉交日期為必要欄位
    if (jf_Trim(document.all["txTDate"].value) == "")
    {
        strErrMsg += "移轉(交)日期不可空白\n";
        //1060608	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txTDate"].focus();
        $('#txTDate').focus();
    }

    /*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;*/
    //1000322 Davy [1000248] 將發文字號改為非必要欄位
    //if(document.all["txWord"].value=="" && document.all["txNumber"].value == "")
    //	strErrMsg += "請輸入發文字號\n"	;	

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
                //1060608 Joe 1050087 二代公文修改
                // jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                //1060608	Joe	1050087	二代系統升級，調整focus寫法
                //document.all[InValidControlName].focus();
                $('#' + InValidControlName).focus();
                return false;
            }
        }
    }
    return true;
}

//1060608 Joe 1050087 二代公文修改--S
function fnRegPostBack()
{
    Page_BlockSubmit = !jf_ConfirmReg();
}
//1060608 Joe 1050087 二代公文修改--S

//1000321 Davy [1000248] 新增憑證登錄及檢視功能
function jf_ConfirmReg()
{
    //1060608 Joe 1050087 二代公文修改--S
    var strFileFullPath = "";
    // document.all.BF.Title = "請選擇待登錄憑證公鑰檔";
    // document.all.BF.Filter = "憑證公鑰檔 (*.CER)|*.CER";
    // if(document.all.BF.ShowDialog(0) != 0)  //有指定值
    // strFileFullPath = document.all.BF.Path;
    // else
    // return false;
    strFileFullPath = document.all.fileInput.files[0].name;
    //1060608 Joe 1050087 二代公文修改--S

    if (strFileFullPath.substr(strFileFullPath.lastIndexOf(".") + 1).toUpperCase() != "CER")
    {
        alert("您欲登錄的檔案非正確之憑證公鑰檔，請重新選擇正確憑證檔進行登錄。");
        return false;
    }

    //上傳檔案					
    var strWebService = document.all["WEB_SERVICE"].value;
    var strArtifact = document.all.SsoArtifact.value;

    //1060608 Joe 1050087 二代公文修改--S
    //soap = new ActiveXObject("WSWrapper.WebFileIO")
    try
    {
        var ioWS = new WebFileIO(strWebService, strArtifact);
        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        // if ( document.all.II_USE_SSL != null )
        // {
        // if ( document.all.II_USE_SSL.value == "Y" )
        // strWebService = strWebService.replace("http://", "https://") ;
        // }

        // soap.Init(strWebService);
        // soap.AddFile("C:\\TEMP",
        // strFileFullPath.substr(strFileFullPath.lastIndexOf("\\")+1),
        // strFileFullPath.substr(0,strFileFullPath.lastIndexOf("\\")+1));
        // soap.Upload(strArtifact, true);
        // document.all.txFileName.value = "C:\\TEMP\\"+strFileFullPath.substr(strFileFullPath.lastIndexOf("\\")+1);
        //1070731 Zen 1070678 弱掃Hardcoded Absolute Path修正
        //document.all.txFileName.value = "C:\\TEMP\\" + strFileFullPath;
        document.all.txFileName.value = document.all['WORK_PATH'].value + strFileFullPath;
        Upload(ioWS);
        //1060608 Joe 1050087 二代公文修改--E
    }
    catch (e)
    {
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
        //alert(e.Message);
        //alert("上傳檔案失敗!\n" );
        var strErrMsg = e.message;
        if (soap.hasError)
            strErrMsg += soap.ErrorMessage;
        alert("連接伺服器" + strWebService + "上傳檔案至AP伺服器失敗，錯誤訊息為:" + strErrMsg);
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
        return false;
    }
    return true;
}

//1060608 Joe 1050087 二代公文修改--S
function Upload(ioWS)
{
    ioWS.upload(document.all['WORK_PATH'].value, $('#fileInput')[0].files, UploadCallBack);
}

function UploadCallBack(result)
{
    if (result.hasError)
        alert(result.ErrorMessage)
    else
    {
        jf_ToolBarSubmit("btReg");
    }
}
//1060608 Joe 1050087 二代公文修改--E
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

    if (argResult.id == ws_OrgID)
    {
        if (argResult.value.m_bSuccess)
        {
            document.all["txSourceOrgName"].value = argResult.value.RtnField0;
        }
        else
        {
            //document.all["txSourceOrgName"].value = argResult.value.RtnField0;
            alert("所輸入的機關代碼不合法，請確認");
            //1060608	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["txOrg"].focus();
            $('#txOrg').focus();
        }
    }

    if (argResult.id == ID_PlanDetail)
    {
        var CaseCnt = document.all["txCaseCnt"].value;
        var VolCnt = document.all["txVolCnt"].value;
        var SeqCnt = document.all["txSeqCnt"].value;

        if (CaseCnt == "")
            CaseCnt = 0;
        if (VolCnt == "")
            VolCnt = 0;
        if (SeqCnt == "")
            SeqCnt = 0;

        iCaseCnt = parseInt(CaseCnt);
        iVolCnt = parseInt(VolCnt);
        iSeqCnt = parseInt(SeqCnt);

        n1 = parseInt(argResult.value[0]);
        n2 = parseInt(argResult.value[1]);
        n3 = parseInt(argResult.value[2]);

        iCaseCnt = iCaseCnt + n1;
        iVolCnt = iVolCnt + n2;
        iSeqCnt = iSeqCnt + n3;

        document.all["txCaseCnt"].value = iCaseCnt;
        document.all["txVolCnt"].value = iVolCnt;
        document.all["txSeqCnt"].value = iSeqCnt;

        //Marked by Cola 不需此控制項
        //95.12.26 951286 David
        //document.all["lbCnt"].value = "計  "+document.all["txCaseCnt"].value+"案  "+document.all["txVolCnt"].value+"卷  "+document.all["txSeqCnt"].value+"件";
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
    if (argCallerId == "EAT400C2")
    {
        document.all["txOrg"].value = document.all["lbReturnValue"].options[0].text;
        document.all["txSourceOrgName"].value = document.all["lbReturnValue"].options[0].value;
        //1060608	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txSourceOrgName"].focus();
        $('#txSourceOrgName').focus();
    }

    if (argCallerId == "EAT400C1")
    {
        //[000959]Modify by Cola 支援批號批次帶回 -- start --
        var data = "";
        var tmp = "";
        for (i = 0; i < document.all["lbReturnValue"].length; i++)
        {
            data += tmp + "'" + document.all["lbReturnValue"].options[i].value + "'";
            tmp = ",";
        }
        document.all["txPlanNo"].value = data;
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
        IsServerHandling = true;
        //1060608	Joe	1050087	二代系統升級--S
        Page_BlockSubmit = false;
        //__doPostBack('btAdd','');
        jf_ToolBarSubmit("btAdd");
        //1060608 Joe 1050087 二代公文修改--E
        //Cola -- end --
    }

    if (argCallerId == "EAT602C1")
    {
        document.all["txTPlan"].value = document.all["lbReturnValue"].options[0].value;
        //1060608 Joe 1050087 二代公文修改，修正為查詢後直接開啟--S
        jf_SelectBarSubmit("btOpen");
        //document.all["txTPlan"].focus();
        //1060608 Joe 1050087 二代公文修改，修正為查詢後直接開啟--E
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
    if (!jf_CheckDataExist("") && document.all["txTPlan"].value != "")
    {
        Page_BlockSubmit = false;
        alert("此移轉(交)計畫編號不存在");
        //1060608	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txTPlan"].focus();
        $('#txTPlan').focus();
    }
}

var ws_OrgID = "";
function CheckOrgNo()
{
    var param = new Array(2);
    param[0] = document.all["txOrgNo"].value;
    param[1] = document.all["txOrg"].value;
    if (param[1] != "")
    {
        var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
        ws_OrgID = callObj_Org.id;
        OnWSResult(callObj_Org);
    }
}

//補0
function CallPadFunc(strObjName, argCount)
{
    switch (strObjName)
    {
        case "txTDate":
            {
                if (document.all[strObjName].value != "")
                    document.all[strObjName].value = jf_PADL(document.all[strObjName].value, argCount, "0");
                if (!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
                {
                    alert("輸入日期格式不正確，請檢查");
                    document.all[strObjName].value = "";
                }
                break;
            }
    }
}

function CheckBeforeAdd()
{
    var PlanNo = document.all["txPlanNo"].value;
    var ErrMsg = "";

    if (PlanNo == "")
    {
        ErrMsg = "清理批號不可空白\n";
    }
    if (ErrMsg != "")
    {
        alert(ErrMsg);
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

//檢查DG內是否有重複的欄位
//請自行設定欄位內容的屬性值
//ex:txBox=>value,Label=>innerHTML...等
function CheckPlanNoExist()
{
    var objDgName = "dg1";

    var pDgLen = document.all[objDgName].rows.length;  //有header,筆數為實際筆數+1			
    var strObjName = "";	//First Compare
    var strtxDocNo = "";	//Second Compare
    var strErrMsg = "";		//ErrMsg		
    var strMarkArray = new Array(pDgLen);
    var PlanNo = document.all["txPlanNo"].value;
    /*
	if(pDgLen == 2)
	{
		alert("請先加入資料");
		return false;
	}
	*/

    for (var i = 2; i < pDgLen + 1; i++)
    {
        strObjName = objDgName + "__ctl" + i + "_lbPlanNum";

        if (document.all[strObjName].innerHTML == PlanNo)
            strMarkArray[i] = "1";
    }
    var ErrMsgHeader = "輸入的清理批號第";
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

var ID_PlanDetail = "";

function SummaryFileDetail()
{
    var PlanNo = document.all["txPlanNo"].value;
    var OrgNo = document.all["txOrgNo"].value;
    var param = new Array(2);
    param[0] = PlanNo;
    param[1] = OrgNo;
    var CaseObj = jf_CallWS("EAT602.asmx", "PlanDetailCnt", false, param);
    ID_PlanDetail = CaseObj.id;
    OnWSResult(CaseObj);
}

function InitObj()
{
    if (document.all["txCaseCnt"].value == "" && document.all["txVolCnt"].value == "" && document.all["txSeqCnt"].value == "")
    {
        //1060608 Joe 1050087 二代公文修改--S
        // document.all["Label22"].className = "Hide";
        // document.all["Label24"].className = "Hide";
        // document.all["Label26"].className = "Hide";
        // document.all["Label28"].className = "Hide";
        // document.all["txCaseCnt"].className = "Hide";
        // document.all["txVolCnt"].className = "Hide";
        // document.all["txSeqCnt"].className = "Hide";	
        document.all["Label22"].className = "hide";
        document.all["Label24"].className = "hide";
        document.all["Label26"].className = "hide";
        document.all["Label28"].className = "hide";
        document.all["txCaseCnt"].className = "hide";
        document.all["txVolCnt"].className = "hide";
        document.all["txSeqCnt"].className = "hide";
        //1060608 Joe 1050087 二代公文修改--E
    }
}
//1001013	Jeff	1000806		檢核移轉日期
function ChechTranDate()
{
    //1010427      Cloud   1010321     修改移交時不該檢核最大屆移轉日期
    if (document.all["dlPlanType"].value == "1")//移轉時才做最大屆宜轉日期檢核
    {
        var PlanNo = "";
        var strTemp = "";
        var OrgNo = document.all["txOrgNo"].value;
        var Date = document.all["txTDate"].value;

        for (iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
        {
            //1060608 Joe 1050087 二代公文修改
            // PlanNo = PlanNo + strTemp +document.all["dg1__ctl" + iRow + "_lbPlanNum"].innerText ;
            PlanNo = PlanNo + strTemp + document.all["dg1__ctl" + iRow + "_lbPlanNum"].textContent;
            strTemp = "','";
        }
		// 1080619		Kevin_C	1080477		修正儲存時沒有清理批號導致SQL指令錯誤
		if(PlanNo != "")
		{
	        //1070830 Zen 1070678 弱掃Ajax修正
	        //var Reasoult = EAT602.CheckTranDate(OrgNo, Date, PlanNo).value;
	        var Reasoult = EA60.EAT602.CheckTranDate(OrgNo, Date, PlanNo).value;
	        if (Reasoult.split(';')[0] == "false")
	        {
	            alert(Reasoult.split(';')[1]);
	            return false;
	        }
	    }
    }
    return true;
}

//1060929 Zen 1060885 新增批號是否已加入計畫編號之檢核
function txPlanNoOnblur()
{
    var bPlaned = true;
    if (document.all['txPlanNo'].value != '')
    {
        bPlaned = false;

        var strOrgNo = encodeURI(document.all["txOrgNo"].value);
        var strPlanNo = encodeURI(document.all["txPlanNo"].value);
        //1070830 Zen 1070678 弱掃Ajax修正
        //var strResult = EAT602.CheckPlanNo(strOrgNo, strPlanNo).value;
        var strResult = EA60.EAT602.CheckPlanNo(strOrgNo, strPlanNo).value;
        if (strResult.indexOf('ERR-') != -1)
            alert('判斷批號是否有以屬計畫編號發生異常 : '+ strResult.replace('ERR-', ''));
        else if (strResult != '')
        {
            alert('批號已有所屬計畫編號 : ' + strResult + '，無法加入，請先移除。');
            $('#txPlanNo').focus();
        }
        else
            bPlaned = true;

    }

    return bPlaned;
}