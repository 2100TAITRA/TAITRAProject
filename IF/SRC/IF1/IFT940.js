/*
DATE	SA	    PRG	    MGR_NO	DESC
1030423	Kevin	Kevin	1010629	新增程式
1030626	Kevin	Kevin	1010629	調整補簽方式由AJAX逐筆處理DB資料
1040216	Kevin	Kevin_C	1030974	呼叫LoginCOM.GetCertMapAccount時需傳入機關代碼
1040728	Kevin	Kevin	1030160	新增支援外呈外會補簽
1040917	Leslie	Kevin	1040758	增進效能調整補簽方式
1051109	Kevin	Kevin	1050087         二代系統升級
1080117	Kevin	Joe		1080049	弱掃修正Heuristic SQL Injection
1080306 Kevin	Kevin	1080112 新增檢核分會中流程不可補簽
1080419	Kevin	Joe		1080049	弱掃錯誤修正
1080508 Kevin 	Kevin	--		修正IFT940不需執行還卡
1090924 Kevin 	Kevin	1090703 104年法規公文改用SHA2加簽
1100201	Leslie	Joe		1090927	取消使用document.activeElement
1101119	Kevin	Kevin	高大序34修正全選無作用問題
1110315 Kevin	Joe 	1110174 調整權限控制增加單位長官可替底下人員進行補簽
1131231	Eric	Leslie	1131006	修正補簽結果的異常處理
1140513 Leslie 	Zen		1140331	調整至工作站補簽
1140923 Zen     Zen     1141335 修正於FileServer補簽具多筆待補簽流程之公文時異常之問題
1150206	Zem		Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1051109 Kevin 1050087 二代系統升級
//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//
////1040917 Kevin 1040758 增加DataGrid用toolbar
//if (document.all.dgDoc)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dgDoc__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dgDoc__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dgDoc__ctl" + pNo + "_txInput1"];
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
        //1101119 Kevin 高大序34 修正全選無作用問題
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dgDoc", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dgDoc", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dgDoc", "_cbSelect");
            break;
        //1110315   Joe 1110174     調整權限控制增加單位長官可替底下人員進行補簽
        case "btSet":
            Page_BlockSubmit = true;
            //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
            //jf_ShowModal("IFC021.aspx?iic021SelectType=Account&DeptNo=" + document.all.H_Dept.value, "480", "640");
            jf_ShowModal("IFC021.aspx?iic021SelectType=Account&DeptNo=" + document.all.H_Dept.value);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051109 Kevin 1050087 二代系統升級
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

    //1051109 Kevin 1050087 二代系統升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    //1080117	Joe		1080049		弱掃修正Heuristic SQL Injection
    //1080419	Joe		1080049		弱掃錯誤修正
    // txUserName.value = txUserName.value.toUpperCase().trim();
    document.all.txUserName.value = document.all.txUserName.value.toUpperCase().trim();
    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_ConfirmOpen();
            //1051109 Kevin 1050087 二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //1051109 Kevin 1050087 二代系統升級 Start
            Page_BlockSubmit = true;
            if (ResignBeforeNew())
            {
                nowCert = '';
                var sc = new SmartCard();
                sc.getCert().then(function (rslt)
                {
                    sc.reset();
                    if (rslt.success)
                    {

                        nowCert = rslt.cert.certb64;
                        //1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
                        //jf_ShowModal("IFT920C2.htm", "300", "300");
                        jf_ShowModal("IFT920C2.htm");
                    }
                    else if (!!rslt.errMsg)
                    {
                        alert(rslt.errMsg);
                    }
                })
                    .fail(function (rslt)
                    {
                        sc.reset();
                        alert(rslt.errMsg);
                    });
            }
            /*
            if (jf_CheckBeforSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;

            jf_ToolBarSubmit();
            */
            //1051109 Kevin 1050087 End
            break;
        case "btStop":
            Page_BlockSubmit = !jf_ConfirmOpen();
            //1051109 Kevin 1050087 二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1051109 Kevin 1050087 二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1040917 Kevin 1040758 增加dg用Toolbar
        //以下屬於DataGrid ToolBar
        //1101119 Kevin 高大序34 修正全選無作用問題
        /*
    case "btSelectAll":
        Page_BlockSubmit = true;
        jf_SelectAll("dgDoc", "_cbSelect");
        break;
    case "btSelectInverse":
        Page_BlockSubmit = true;
        jf_SelectInverse("dgDoc", "_cbSelect");
        break;
    case "btSelectClear":
        Page_BlockSubmit = true;
        jf_SelectClear("dgDoc", "_cbSelect");
        break;
        */
    }
}

//儲存前檢查
function jf_ConfirmOpen()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txUserName"].value == "")
    {
        strErrMsg += "憑證擁有者不可空白\n";
        document.all["txUserName"].focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/********** 以下為按下儲存鍵後相關處理 **********/

//1051109 Kevin 1050087 二代系統升級
/*
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    //1040917 Kevin 1040758 增進效能調整補簽方式
    var bSelected = false;
    for (var iDg = 2; iDg <= document.all.dgDoc.rows.length ; iDg++)
    {
        if (document.all["dgDoc__ctl" + iDg + "_cbSelect"].checked)
        {
            bSelected = true;
        }
    }
    if (!bSelected)
    {
        alert("請選擇欲補簽公文。");
        return false;
    }

    if (!ReadCard())
    {
        fnHideMessageBlock();
        return false;
    }
    fnHideMessageBlock();

    var UserName = new String(document.all["txUserName"].value);

    var CardUser = new String(document.all["H_txCardUser"].value);

    if (UserName.toUpperCase() != CardUser.toUpperCase() && document.all["cbProxyReturn"].checked)//憑證使用者與補簽使用者不同
    {
        //增加代理還卡之補簽檢核
        var strReason = new String(jf_Trim(document.all["txReSignReason"].value));

        if (strReason == "")	//表示有勾代理還卡，代理原因應不為空
        {
            alert("代理還卡時，其代理原因不可為空白。");
            return false;
        }
    }
    else if (UserName.toUpperCase() != CardUser.toUpperCase())//憑證使用者與補簽使用者不同
    {
        alert("此憑證[" + CardUser + "]並未與帳號[" + UserName + "]鏈結,不允許執行補簽");
        return false;
    }

    if (!ResignFunction())
    {
        fnHideMessageBlock();
        return false;
    }
    fnHideMessageBlock();

    return true;
}
*/

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

    //1051109 Kevin 1050087 二代系統升級
    if (argCallerId == "IFT920C2")
    {
        pincode = document.all.lbReturnValue.options[0].value;
        if (pincode != '')
            ResignNew();
    }
    //1110315   Joe 1110174     調整權限控制增加單位長官可替底下人員進行補簽
    if (argCallerId == "IFC021")
    {
        document.all.txUserName.value = document.all.lbReturnValue.options[0].value;
        document.all.lbEmpName.textContent = document.all.lbReturnValue.options[2].value;
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

//1051109 Kevin 1050087 二代系統升級 Start
var nowCert;
function ResignBeforeNew()
{
    bReSignAllSelect = true;

    iMsgNow = 0;
    iMsgTotal = 0;
    AllMsg = '';
    strWebFileIO = '';

    //1140513 Zen 1140331 調整至工作站補簽
    arrDgOrgNo = [];
    arrDgDocNo = [];
    arrDgMsgId = [];
    arrDgComeOthers = [];
    arrDgDocPath = [];

    for (var i = 2; i <= document.all.dgDoc.rows.length; i++)
    {

        if (!document.all["dgDoc__ctl" + i + "_cbSelect"].checked)
        {
            bReSignAllSelect = false;
            continue;
        }
        if (strWebFileIO == '')
            strWebFileIO = document.all["dgDoc__ctl" + i + "_lbWebFileIO"].textContent;

        var DocNo = document.all["dgDoc__ctl" + i + "_lbDocNo"].textContent;
        var MsgId = document.all["dgDoc__ctl" + i + "_lbMsgId"].textContent;

        //1080306 Kevin 1080112 新增檢核分會中流程不可補簽
        if (MsgId.indexOf('分會中') != -1)
            continue;

        //1140513 Zen 1140331 調整至工作站補簽
        var arrSingleDocMsgid = MsgId.replace(/\s/g, ";").split(";");
        for (var jDocMsg = 0; jDocMsg < arrSingleDocMsgid.length; jDocMsg++)
        {
            var singleMsg = arrSingleDocMsgid[jDocMsg];

            arrDgOrgNo.push(document.all["dgDoc__ctl" + i + "_lbOrgno"].textContent);
            arrDgDocNo.push(document.all["dgDoc__ctl" + i + "_lbDocNo"].textContent);
            arrDgMsgId.push(singleMsg);
            arrDgComeOthers.push(document.all["dgDoc__ctl" + i + "_lbComeOthers"].textContent);
            arrDgDocPath.push(document.all["dgDoc__ctl" + i + "_lbDocPath"].textContent);
        }

        iMsgTotal += MsgId.replace(/\s/g, ";").split(";").length;
        AllMsg += MsgId.replace(/\s/g, ";") + ";";
    }

    if (iMsgTotal == 0)
    {

        if (bReSignAllSelect)
        {

            //1080508 Kevin 修正IFT940不需執行還卡
            //UpdateCardInfo();//無補簽公文 直接還卡
            fnHideMessageBlock();
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            jf_ToolBarSubmit("btSave");
            return false;
        }
        else
        {
            signFail("請選擇欲補簽公文。");
            return false;
        }
    }
    return true;
}

function ResignNew()
{
    try
    {
        fnShowMessage("待補簽資料準備中...");

        var UserName = document.all.txUserName.value.toUpperCase();

        var arWSParam = new Array(2);
        arWSParam[0] = nowCert;
        arWSParam[1] = document.all.H_txOrgNo.value;

        var wsRet = jf_CallW(document.all.H_txAuthWs.value, "GetMOICAMapAccount", false, arWSParam);
        if (jf_IsWebServiceSuccess(wsRet))
        {

            if (wsRet.value == "")
            {
                signFail("此卡片尚未與帳號鏈結。");
                return;
            }

            var CardUser = wsRet.value.split("|")[1].toUpperCase();

            //憑證使用者與補簽使用者不同
            if (UserName != CardUser && document.all.cbProxyReturn.checked)
            {
                //增加代理還卡之補簽檢核
                if (jf_Trim(document.all.txReSignReason.value) == "")
                {
                    signFail("代理還卡時，其代理原因不可為空白。");
                    return;
                }
            }
            else if (UserName != CardUser) //憑證使用者與補簽使用者不同
            {
                signFail("此憑證[" + CardUser + "]並未與帳號[" + UserName + "]鏈結,不允許執行補簽");
                return;
            }
        }
        else
        {

            signFail("呼叫失敗:" + wsRet.value.m_strErrMsg);
            return;
        }

        //1140513 Zen 1140331 調整至工作站補簽
        var wsRet;
        var arWSParam;
        if (document.all['H_DocsignByWorkStation'].value != 'Y')
        {
            arWSParam = new Array(2);
            arWSParam[0] = document.all.H_txOrgNo.value;
            arWSParam[1] = AllMsg;
            wsRet = jf_CallWA(strWebFileIO, "GetResignSignInfo", false, arWSParam, true);
        }
        else
        {
            var arWSParam = new Array(6);
            arWSParam[0] = arrDgOrgNo;
            arWSParam[1] = arrDgDocNo;
            arWSParam[2] = arrDgMsgId;
            arWSParam[3] = arrDgComeOthers;
            arWSParam[4] = arrDgDocPath;
            arWSParam[5] = strWebFileIO;
            wsRet = jf_CallWA(strWebSfolderUrl, "wksGetResignSignInfo", false, arWSParam, true);
        }

        if (jf_IsWebServiceSuccess(wsRet))
        {
            if (wsRet.value.m_bSuccess)
            {

                //II_LEGAL_CA 略過
                arrSignWait = wsRet.value.RtnStr.split(";");
                dbSignMsg = "";
                doSignMsg = "";
                doSignWait = "";
                doSignCert = "";
                uSignature = "";

                //1140513 Zen 1140331 調整至工作站補簽
                arrDoSignMsg = [];
                arrDoSignSi = [];
                arrDoSignature = [];

                doSignatureErr = "";
                doSignature();
            }
            else
            {
                signFail("呼叫失敗:" + wsRet.value.m_strErrMsg);
                return;
            }
        }
    }
    catch (e)
    {

        signFail("ResignFunction Err:" + e.message);
        return;
    }
}

var bReSignAllSelect;

var iMsgTotal;
var iMsgNow;

var strWebFileIO;
var AllMsg;

//1140513 Zen 1140331 調整至工作站補簽
var strWebSfolderUrl = document.all.H_WebSfolderUrl.value;
let arrDgOrgNo = [];
let arrDgDocNo = [];
let arrDgMsgId = [];
let arrDgComeOthers = [];
let arrDgDocPath = [];

var pincode;
var arrSignWait;
var dbSignMsg;
var doSignMsg;
var doSignWait;
var doSignCert;
var uSignature;
var doSignatureErr;
//1131231	Leslie[1131006]	修正補簽結果的異常處理
var doResignRslt;

//1140513 Zen 1140331 調整至工作站補簽
let arrDoSignMsg = [];
let arrDoSignSi = [];
let arrDoSignature = [];

function signFail(ErrMsg)
{
    bReSignAllSelect = false;
    fnShowMessage(ErrMsg);
    jf_ShowMsg(ErrMsg, "");
    fnHideMessageBlock();
}

function signSuccess()
{
    if (doSignatureErr)
    {
        signFail(doSignatureErr, "");
        return;
    }

    fnShowMessage("檢核憑證有效性...");
    if (!checkCertValidity())
        return;

    fnShowMessage("更新公文封裝檔中...");
    if (!UpdateResignInfo())
        return;

    fnShowMessage("更新公文基資中...");
    if (!UpdateDocInfo())
        return;

    //1080508 Kevin 修正IFT940不需執行還卡
    //fnShowMessage("還卡中...");
    //if (bReSignAllSelect)
    //   UpdateCardInfo();

    jf_ShowMsg("補簽完成，共" + iMsgTotal + "份流程。", "");

    fnHideMessageBlock();
    IsServerHandling = true;
    jf_ShowWaitState();
    Page_BlockSubmit = false;
    jf_ToolBarSubmit("btSave");
}

function doSignature()
{
    if (iMsgNow >= iMsgTotal)
        return;

    fnShowMessage("目前進度:" + (iMsgNow + 1) + "/" + iMsgTotal + "流程補簽中...");

    var strErrMsg = arrSignWait[iMsgNow].split("@")[1];
    if (strErrMsg.indexOf("ERR-") != -1)
    {
        if (strErrMsg.indexOf("目前已有補簽記錄") != -1)
        {
            dbSignMsg += arrSignWait[iMsgNow].split("@")[0] + ";";
        }
        else
        {
            doSignatureErr += arrSignWait[iMsgNow].split("@")[0] + "發生錯誤:" + arrSignWait[iMsgNow].split("@")[1] + ";\r\n";

        }
        if (iMsgNow == iMsgTotal - 1)
            signSuccess();
        else
        {
            iMsgNow++;
            setTimeout(doSignature, 500);
        }
    }
    else
    {

        var sc = new SmartCard();

        //1090924 Kevin 1090703 104年法規公文改用SHA2加簽 Start
        //sc.makeSignature(arrSignWait[iMsgNow].split("@")[1], 'base64', pincode, 'SHA1').then(function (rslt)
        // 由取得測試用待簽內容, 由其格式判定叫用加簽函式時使用的參數!
        let sTobeSignB64 = arrSignWait[iMsgNow].split("@")[1];

        /*
         * 叫用_getHashAlgorithm()以判定回傳待簽內容使用的hashAlgorithm及encode
         */
        let hashInfo = _getHashAlgorithm(sTobeSignB64);
        if (typeof hashInfo.alg == 'string' && hashInfo.alg.length)
        {
            $('#hashAlgShow').val('hashAlg=' + hashInfo.alg + ', encode=' + hashInfo.encode);
        }
        else
        {
            $('#hashAlgShow').val('ERROR!');
        }

        if (typeof hashInfo.alg == 'string' && hashInfo.alg.length) 
        {
            /*
             * 取得叫用sc.makeSignature之_encode及_hashAlg參數值.
             */
            let _encode = hashInfo.encode;
            let _hashAlg = hashInfo.alg;
            if (_encode == 'hashBase64')
            {
                _hashAlg = ''; // 若eoncode為'hashBase64', 跨平台網頁元件會自行判定hash algorithm, 故給空字串.
            }

            // 叫用跨平台網頁元件簽章函式sc.makeSignature, 傳入 _encode 及 _hashAlg 參數.
            sc.makeSignature(arrSignWait[iMsgNow].split("@")[1], _encode, pincode, _hashAlg).then(function (rslt)
            //1090924 Kevin 1090703 End
            {
                sc.reset();

                if (rslt.success)
                {
                    dbSignMsg += arrSignWait[iMsgNow].split("@")[0] + ";";

                    //1140513 Zen 1140331 調整至工作站補簽
                    //1140923 Zen 1141335 修正於FileServer補簽具多筆待補簽流程之公文時異常之問題
                    if (document.all['H_DocsignByWorkStation'].value != 'Y')
                    {

                        doSignMsg += arrSignWait[iMsgNow].split("@")[0] + ";";
                        doSignWait += arrSignWait[iMsgNow].split("@")[1] + ";";
                        doSignCert += rslt.certb64 + ";";
                        uSignature += rslt.signature + ";";
                    }
                    //1140923 Zen 1141335 修正於FileServer補簽具多筆待補簽流程之公文時異常之問題
                    else
                    {
                        arrDoSignMsg.push(arrSignWait[iMsgNow].split("@")[0]);
                        arrDoSignSi.push(arrSignWait[iMsgNow].split("@")[1]);
                        arrDoSignature.push(rslt.signature);
                        doSignCert = rslt.certb64;
                    }

                    if (iMsgNow == iMsgTotal - 1)
                        signSuccess();
                    else
                    {
                        iMsgNow++;
                        setTimeout(doSignature, 500);
                    }
                }
                else if (!!rslt.errMsg)
                {
                    signFail(rslt.errMsg)
                }
            })
                .fail(function (rslt)
                {
                    sc.reset();
                    signFail(rslt.errMsg);
                });
            //1090924 Kevin 1090703 104年法規公文改用SHA2加簽
        }
    }
}

function checkCertValidity()
{
    //1140513 Zen 1140331 調整至工作站補簽
    //if (arrDoSignMsg.length != 0)
    //    return true;

    var arWSParam = new Array(3);
    arWSParam[0] = nowCert;
    arWSParam[1] = '2';
    arWSParam[2] = document.all.H_txOrgNo.value;

    var wsRet = jf_CallW(document.all.H_txAuthWs.value, "CheckCertificateValidity", false, arWSParam, true);
    if (jf_IsWebServiceSuccess(wsRet))
    {
        if (wsRet.value == 0)
        {

            return true;
        }
        else
        {

            switch (wsRet.value)
            {
                case -1:
                    signFail("憑證已過效期");
                    break;
                case -2:
                    signFail("憑證CA簽章驗證失敗");
                    break;
                case -3:
                    signFail("憑證已廢止");
                    break;
                case -4:
                    signFail("憑證用途錯誤");
                    break;
                case -5:
                    signFail("機關憑證失效");
                    break;
                case -6:
                    signFail("機關憑證未鏈結");
                    break;
                default:
                    signFail("驗證憑證發生未預期錯誤");
                    break;
            }
            return false;
        }
    }
}

function UpdateResignInfo()
{
    //1140513 Zen 1140331 調整至工作站補簽
    //if (doSignMsg == "")
    //if (arrDoSignMsg.length != 0)
    //    return true;

    //1140513 Zen 1140331 調整至工作站補簽
    var wsRet;
    var arWSParam;
    if (document.all['H_DocsignByWorkStation'].value != 'Y')
    {
        arWSParam = new Array(6);
        arWSParam[0] = document.all.H_txOrgNo.value;
        arWSParam[1] = doSignMsg;
        arWSParam[2] = jf_Trim(document.all.txReSignReason.value);
        arWSParam[3] = doSignWait;
        arWSParam[4] = uSignature;
        arWSParam[5] = doSignCert;
        wsRet = jf_CallWA(strWebFileIO, "UpdateResignInfo", false, arWSParam, true);
    }
    else
    {
        let arrDoOrgNo = [];
        let arrDoDocNo = [];
        let arrDoComeOthers = [];
        let arrDoDocPath = [];

        for (var iMsg = 0; iMsg < arrDoSignMsg.length; iMsg++)
        {
            let msgIdIndex = arrDgMsgId.indexOf(arrDoSignMsg[iMsg]);
            if (msgIdIndex !== -1)
            {
                arrDoOrgNo.push(arrDgOrgNo[msgIdIndex]);
                arrDoDocNo.push(arrDgDocNo[msgIdIndex]);
                arrDoComeOthers.push(arrDgComeOthers[msgIdIndex]);
                arrDoDocPath.push(arrDgDocPath[msgIdIndex]);
            }
            else
            {
                signFail(`無法取得MsgId對應基資:${msgId}` + wsRet.value.m_strErrMsg);
                return false;
            }
        }

        arWSParam = new Array(10);
        arWSParam[0] = arrDoOrgNo;//string[] argOrgNo
        arWSParam[1] = arrDoDocNo; //string[] argDocNo
        arWSParam[2] = arrDoSignMsg; //string[] argMsgId
        arWSParam[3] = arrDoComeOthers;//string[] argComeOthers
        arWSParam[4] = jf_Trim(document.all.txReSignReason.value); //string sSignReason
        arWSParam[5] = arrDoSignSi; //string[] resignSI
        arWSParam[6] = arrDoSignature; //string[] signatureValue
        arWSParam[7] = doSignCert; //string signCert
        arWSParam[8] = arrDoDocPath; //string[] argDocPath
        arWSParam[9] = strWebFileIO; //string argFileServerWS

        wsRet = jf_CallWA(strWebSfolderUrl, "wksUpdateResignInfo", false, arWSParam, true);
    }

    if (jf_IsWebServiceSuccess(wsRet))
    {
        if (!wsRet.value.m_bSuccess)
        {
            signFail("呼叫失敗:" + wsRet.value.m_strErrMsg);
            return false;
        }
        //1131231	Leslie[1131006]	修正補簽結果的異常處理
        else
            doResignRslt = wsRet.value.RtnStr;
    }
    return true;
}

function UpdateDocInfo()
{
    var ErrMsg = '';

    for (var i = 2; i <= document.all.dgDoc.rows.length; i++)
    {

        if (!document.all["dgDoc__ctl" + i + "_cbSelect"].checked)
            continue;

        var DocNo = document.all["dgDoc__ctl" + i + "_lbDocNo"].textContent;
        var MsgId = document.all["dgDoc__ctl" + i + "_lbMsgId"].textContent.replace(/\s/g, ";");

        if (dbSignMsg.indexOf(MsgId) == -1)
        {
            ErrMsg += "文號" + DocNo + "未完成封裝檔更新，不更新資料庫。\r\n";
            continue;
        }

        //1131231	Leslie[1131006]	修正補簽結果的異常處理
        if (doResignRslt.includes(`${MsgId}@ERR-`))
        {
            let idxStart = doResignRslt.indexOf(`${MsgId}@ERR-`) + `${MsgId}@ERR-`.length;
            let idxEnd = doResignRslt.indexOf(';', idxStart);
            ErrMsg += `文號${DocNo}：${doResignRslt.substring(idxStart, idxEnd)}，不更新資料庫。\r\n`;
            continue;
        }

        var arWSParam = new Array(2);
        arWSParam[0] = DocNo;
        arWSParam[1] = MsgId;
        var wsRet = jf_CallWS("IFT920WS.asmx", "UpdateWTREStatus", false, arWSParam);
        if (jf_IsWebServiceSuccess(wsRet))
        {
            if (!wsRet.value.RtnBool)
            {
                ErrMsg += "更新資料庫失敗，" + wsRet.value.m_strErrMsg + "\r\n";
            }
        }
    }
    if (ErrMsg != "")
    {

        signFail(ErrMsg);
        return false;
    }
    else
        return true;
}

function UpdateCardInfo()
{
    fnShowMessage("註記還卡中...");

    var CardList = document.all["nCardList"].value;
    var Items2 = CardList.split(";");
    if (Items2.length > 1)
    {
        for (var i = 0; i < Items2.length - 1; i++)
        {
            var Item2 = Items2[i].split("-");
            var CardId = Item2[0];
            var UserName = Item2[1];
            var cbReturnId = Item2[2];

            var arWSParam = new Array(2);
            arWSParam[0] = CardId;
            arWSParam[1] = UserName;

            if (document.all[cbReturnId].checked)
            {
                var wsRet = jf_CallWS("IFT920WS.asmx", "UpdateBOCDStatus", false, arWSParam);
                if (jf_IsWebServiceSuccess(wsRet))
                {
                    if (!wsRet.value.RtnBool)
                    {
                        jf_ShowMsg("呼叫UpdateBOCDStatus失敗:" + wsRet.value.m_strErrMsg, "");
                    }
                }
            }
        }
    }
}

//1090924 Kevin 1090703 104年法規公文改用SHA2加簽
function _getHashAlgorithm(sTobeSignB64)
{
    let HASHALG_SHA1 = 'SHA1';
    let HASHALG_SHA256 = 'SHA256';
    let sHashHeaderb64_SHA1 = 'MCEwCQYFKw4DAhoFAAQU'; // 2017.1.18 - 若回傳待簽資料SHA1 hash, 則header為此值!
    let sHashHeaderb64_SHA256 = 'MDEwDQYJYIZIAWUDBAIBBQAEI'; // 2017.3.16 - 若回傳待簽資料SHA256 hash, 則header為此值!
    let sXMLToBeSignHeaderb64 = 'PFNpZ25lZEluZm8+PENhbm9uaWNhbGl6YXRpb25NZXRob2Q'; // 2020.2.20 - 1090154 Eric, 確認是否為XML待簽內容: <SignedInfo><CanonicalizationMethod...  
    let sHashAlg_SHA1 = 'http://www.w3.org/2000/09/xmldsig#sha1';
    let sHashAlg_SHA256 = 'http://www.w3.org/2001/04/xmlenc#sha256';

    let fHashSign = false;
    let _hashAlg = '';
    if (sTobeSignB64.indexOf(sHashHeaderb64_SHA1) == 0)
    {
        _hashAlg = HASHALG_SHA1;
        fHashSign = true;
    }
    else if (sTobeSignB64.indexOf(sHashHeaderb64_SHA256) == 0)
    {
        _hashAlg = HASHALG_SHA256;
        fHashSign = true;
    }
    else if (sTobeSignB64.indexOf(sXMLToBeSignHeaderb64) == -1)
    {
        console.log('無效的待簽XML內容!');
        return { alg: '', encode: '' };
    }

    if (!fHashSign)
    {
        let sTobeSignXML = Base64.decode(sTobeSignB64);
        if (!!sTobeSignXML && sTobeSignXML.length)
        {
            if (sTobeSignXML.indexOf(sHashAlg_SHA1) !== -1)
            {
                _hashAlg = HASHALG_SHA1;
            }
            else if (sTobeSignXML.indexOf(sHashAlg_SHA256) !== -1)
            {
                _hashAlg = HASHALG_SHA256;
            }
        }
    }
    return { alg: _hashAlg, encode: fHashSign ? 'hashBase64' : 'base64' };
}


/*
function ReadCard()
{
    try
    {
        fnShowMessage("取得憑證...");

        var ret = document.all.ocx.Init("");
        if (ret == false)
        {
            alert("封裝元件初始化失敗,無法進行憑證鏈結");
            return false;
        }

        document.all.ocx.SetUIMode(false);

        ret = document.all.ocx.IsSmartCardAvailable(1);// GCA =0; MOICA =1; Temp =2;
        if (ret == false)
        {
            alert("請插入智慧卡!!");
            return false;
        }

        ret = document.all.ocx.SetMode(3);
        if (ret == false)
        {
            alert('封裝元件SetMode(3)失敗');
            return false;
        }

        ret = document.all.sso.SetTargetUser(document.all["H_txArtifact"].value);
        if (ret == false)
        {
            alert("SetTargetUser fail");
            return false;
        }

        document.all["H_txCardCert"].value = document.all.ocx.GetSignerBase64Cert();

        //1040216	Kevin_C	1030974	呼叫LoginCOM.GetCertMapAccount時需傳入機關代碼
        //ret = document.all.sso.GetCertMapAccount(document.all["H_txCardCert"].value);
        ret = document.all.sso.GetCertMapAccount(document.all["H_txCardCert"].value, document.all["H_txOrgNo"].value);

        if (ret == "")
        {
            alert("此卡片尚未與帳號鏈結");
            return false;
        }

        document.all["H_txCardUser"].value = ret.split("|")[1];

        var strErrMsg = IFT940.CheckCert(document.all["H_txCardCert"].value).value;

        if (strErrMsg != "")
        {
            alert(strErrMsg);
            return false;;
        }

        var sFeatures = "dialogHeight: 130px; dialogWidth: 250px; dialogTop: 300px; dialogLeft: 300px; edge: Raised; center: Yes; help: No; resizable: No; status: No";
        //var sPin = window.showModalDialog("IFT940C1.htm", "sadfasfd", sFeatures);
        var sPin = window.showModalDialog("IFT940C1.htm", "IFT940C1", sFeatures);

        fnShowMessage("驗證密碼中...");
        ret = document.all.ocx.VerifyPIN(sPin)

        if (ret == false)
        {
            alert("密碼錯誤!!!");
            return false;
        }

        ret = document.all.ocx.GetCertCAName();
        if (ret != "")
        {
            var LegalCA = document.all.sso.GetEnvSet("II_LEGAL_CA");

            if (LegalCA.indexOf(ret) < 0)
            {
                alert('您目前使用之憑證之憑證機構[' + LegalCA + ']，與系統設定可補簽之憑證機構[' + LegalCA + ']不符,請插入正確卡片。');
                return false;
            }
        }
    }
    catch (e)
    {
        alert("ReadCard Err:" + e.message);
        return false;
    }
    return true;
}

function ResignFunction()
{
    try
    {
        var Artifact = document.all["H_txArtifact"].value;

        var CardUser = new String(document.all["H_txCardUser"].value);

        var UserInfo = IFT940.GetReSignUserInfo(Artifact, CardUser.toUpperCase()).value;

        if (UserInfo[0].indexOf("ERR-") != -1)
        {
            alert(UserInfo[0]);
            return false;
        }

        var sSignAcc = UserInfo[0];//UserInfo[0]	帳號
        var sSignName = UserInfo[1];//UserInfo[1]	姓名
        var sSignDept = UserInfo[2];//UserInfo[2]	單位
        var sSignRole = UserInfo[3];//UserInfo[3]	角色
        var sSignTitle = UserInfo[4];//UserInfo[4]	職稱
        var sSignTime = UserInfo[5];//UserInfo[5]	補簽時間	
        var sSignReason = document.all["txReSignReason"].value;

        var WorkPath = "C:\\temp\\work\\";

        //1040917 Kevin 1040758 調整計數方式 Start
        ////1030626 Kevin 1010629 新增訊息
        //alert("開始進行公文補簽，共" + (document.all.dgDoc.rows.length - 1) + "份公文。");
        var iDocTotal = 0;
        var iDocNow = 1;
        var iDocDone = 0;
        for (var i = 2; i <= document.all.dgDoc.rows.length; i++)
        {
            if (document.all["dgDoc__ctl" + i + "_cbSelect"].checked)
                iDocTotal++;
        }
        //1040917 Kevin 1040758 End

        for (var i = 2; i <= document.all.dgDoc.rows.length; i++)
        {
            //1040917 Kevin 1040758 增進效能調整補簽方式
            if (!document.all["dgDoc__ctl" + i + "_cbSelect"].checked)
                continue;

            var DocNo = document.all["dgDoc__ctl" + i + "_lbDocNo"].innerText;
            var MsgId = document.all["dgDoc__ctl" + i + "_lbMsgId"].innerText;
            var BorDate = document.all["dgDoc__ctl" + i + "_lbBorDate"].innerText;

            //1040728 Kevin 1030160 新增支援外呈外會補簽
            var strOrgno = document.all["dgDoc__ctl" + i + "_lbOrgno"].innerText;
            var strComeOthers = document.all["dgDoc__ctl" + i + "_lbComeOthers"].innerText;

            var DocXmlPath = WorkPath + DocNo + "-X.XML";

            //1040917 Kevin 1040758 調整計數方式
            //fnShowMessage("目前進度:" + (i - 1) + "/" + (document.all.dgDoc.rows.length - 1) + ",公文[" + DocNo + "]補簽中...");
            fnShowMessage("目前進度:" + iDocNow + "/" + iDocTotal + ",公文[" + DocNo + "]補簽中...");
            iDocNow++;

            //1040917 Kevin 1040758 增進效能調整補簽方式
            ////下載封裝檔
            //ret = document.all.sso.DownloadDocument(Artifact, DocNo, WorkPath);
            //if (ret == false)
            //{
            //	alert("公文[" + DocNo + "]補簽失敗:DownloadDocument fail");
            //	return false;
            //}
            var strDocPath = document.all["dgDoc__ctl" + i + "_lbDocPath"].innerText;
            var strWebFileIO = document.all["dgDoc__ctl" + i + "_lbWebFileIO"].innerText;
            if (!fnDownloadDocXml(strDocPath, DocNo + "-X.XML", DocNo + ".SI", WorkPath, strWebFileIO))
                return false;

            //1040917 Kevin 1040758 增進效能調整補簽方式
            var arrMsgId = MsgId.replace(/\ /g, ";").split(";");

            //1040917 Kevin 1040758 增進效能調整補簽方式
            for (var iMsgId = 0; iMsgId < arrMsgId.length - 1; iMsgId++)
            {
                //1040917 Kevin 1040758 增進效能調整補簽方式
                var MsgId = arrMsgId[iMsgId];

                //增加檢核封裝檔版本，以配合使用不同函式進行補簽
                var VerNo = document.all.ocx.GetEnvelopeVersion(DocXmlPath);

                if (VerNo == "1.2")//99年以前版本
                {
                    ret = document.all.ocx.ResignDocument2(DocXmlPath, DocNo, MsgId, BorDate, sSignReason);
                }
                else//99年法規修正後版本
                {
                    //1040728 Kevin 1030160 新增支援外呈外會補簽
                    //ret = document.all.ocx.ResignDocument_2010SPEC(DocXmlPath, DocNo, MsgId, sSignReason, sSignTime, sSignDept, sSignTitle, sSignName, sSignAcc, sSignRole);
                    ret = document.all.ocx.ResignDocument_ComeOthers(DocXmlPath, strOrgno, DocNo, MsgId, strComeOthers, sSignReason, sSignTime, sSignDept, sSignTitle, sSignName, sSignAcc, sSignRole);
                }
                if (ret == false)
                {
                    alert("公文[" + DocNo + "]補簽失敗:ResignDocument fail");
                    return false;
                }
            }

            var remotePath = document.all.sso.GetDocRemotePath(DocNo);
            var webFileIO = document.all.sso.GetDocWebFileIOUrl(DocNo);

            ret = document.all.sso.UploadDocument(Artifact, DocNo, webFileIO, remotePath, DocXmlPath, 0);

            if (ret == false)
            {
                alert("公文[" + DocNo + "]補簽失敗:UploadDocument fail");
                return false;
            }

            //1040917 Kevin 1040758 增進效能調整補簽方式
            MsgId = document.all["dgDoc__ctl" + i + "_lbMsgId"].innerText.replace(/\ /g, ";");

            //1030626 Kevin 1010629 調整補簽方式
            var strErrMsg = IFT940.UpdateDoc(MsgId, DocNo, document.all["H_txOrgNo"].value).value;

            if (strErrMsg != "")
            {
                alert(strErrMsg);
                return false;
            }

            //1040917 Kevin 1040758 調整計數方式
            iDocDone++;
        }

        //1040917 Kevin 1040758 調整計數方式
        ////1030626 Kevin 1010629 新增訊息
        //alert("公文補簽完成，共" + (document.all.dgDoc.rows.length - 1) + "份公文。");
        alert("公文補簽完成，共" + iDocDone + "份公文。");
    }
    catch (e)
    {
        alert("ResignFunction Err:" + e.message);
        return false;
    }
    return true; 
}
*/
//1051109 Kevin 1050087 End

var gLastReason = "";

function SetReSignReason(obj)
{
    if (obj.checked)
    {
        document.all["txReSignReason"].value = gLastReason;
        document.all["lbReSignReason"].className = "RequireField";
        document.all["txReSignReason"].className = "RequireField";
    }
    else
    {
        gLastReason = document.all["txReSignReason"].value;
        document.all["txReSignReason"].value = "本人還卡";
        document.all["lbReSignReason"].className = "InputFieldLabel";
        document.all["txReSignReason"].className = "InputFieldText";
    }
}

function fnShowMessage(sMessage)
{
    //1051109 Kevin 1050087 二代系統升級
    //window.status = sMessage;
    //1051109 Kevin 1050087 二代系統升級
    //spanMsg.innerText = sMessage;
    spanMsg.textContent = sMessage;
    //1131231	Leslie[1131006]	修正錯誤訊息區塊的顯示
    // tbOpenMsg.style.display = '';
    // tbOpenMsg.style.pixelTop = (document.body.clientHeight / 2) - (tbOpenMsg.offsetHeight / 2) + (document.body.scrollTop);
    // tbOpenMsg.style.pixelLeft = (document.body.clientWidth / 2) - (tbOpenMsg.offsetWidth / 2) + (document.body.scrollLeft);
    $('#tbOpenMsg').show().css({
        'top': `${(document.body.clientHeight / 2) - (tbOpenMsg.offsetHeight / 2) + (document.body.scrollTop)}px`,
        'left': `${(document.body.clientWidth / 2) - (tbOpenMsg.offsetWidth / 2) + (document.body.scrollLeft)}px`
    })
}

function fnHideMessageBlock()
{
    tbOpenMsg.style.display = 'none';
}

//1051109 Kevin 1050087 二代系統升級
/*
//1040917 Kevin 1040758 自行下載SI
function fnDownloadDocXml(strDocPath, strDocXml, strDocSI, strWorkPath, strWebFileIO)
{
    var soap = new ActiveXObject("WSWrapper.WebFileIO");

    var serviceURL = strWebFileIO;

    if (document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
        serviceURL = serviceURL.replace("http://", "https://");

    try
    {
        soap.Init(serviceURL);
        soap.AddFile(strDocPath, strDocXml);
        soap.AddFile(strDocPath, strDocSI);
        soap.Download(document.all["H_txArtifact"].value, false, strWorkPath);
    }
    catch (e)
    {
        var strErrMsg = e.message;
        if (soap.hasError)
            strErrMsg += soap.ErrorMessage;
        alert("連接伺服器" + serviceURL + "下載檔案失敗，錯誤訊息為:" + strErrMsg);
        return false;
    }
    return true;
}
*/
