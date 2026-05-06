/*	
DATE	SA		PG		MGR_NO  DESC
1020902	--		Cloud	        修正下拉選單有選擇東西後按下查詢會異常的錯誤
1040825	Leslie	Kevin_C	1040695	增加處理DataGrid超連結的函式
1050823 David	Zen     1050087 二代公文修改
1050902	David	Zen		1050778 鐵改局需求新增查詢條件和報表欄位
1051019 Leslie  Kenny   1050087 二代公文修改
1051130 David   Zen     1051175 新增鐵改局查詢條件和報表欄位
1060602 David   Zen     1060429 新增結案日期欄位和調整報表
1060809 David	Kevin_C 1060670	增加取得theWebServices供子視窗使用
1061227 David   Zen     1061233 (鐵改局)新增含需回覆公文查詢條件及調整報表副表頭顯示
1070117 David   Zen     1070047 (鐵改局)新增匯出Excel功能
1070830 Kevin   Justin  1070678 弱掃AJAX修改
1080403 Kevin   Joe		1080286 Ajax參考錯誤修正
1090107	Kevin_C	Joe		1081095	修正JS使用函式避免IE不支援導致程式判斷錯誤
1140409 Zen     Zen     1131243 支援記錄續辦文號
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

//1070830 Justin [1070678]弱掃AJAX修改
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
//1050823 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


//1050826 Zen 1050778 取得伺服器、專案名稱
var strServerName = "";		//站台所在伺服器名稱
var strODVirName = "";		//ODDEP虛擬目錄名稱
var iCallID_GetBTypeNo = "";

//1060809 Kevin_C 1060670 增加取得theWebServices供子視窗使用
//window.theWebServices = opener.theWebServices;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050826 Zen 1050778 取得伺服器、專案名稱
    strServerName = encodeURI(document.all.H_WebServer.value);
    strODVirName = encodeURI(document.all.OD_VIR_NAME.value);

    //1050909 Zen 1050778 預設業務類別
    if (document.all.ddlProperty.selectedIndex != 0)
    {
        ddlProperty_onchange();
        var ddlWorkType = document.all.ddlWorkType;
        var workTypeIndex = encodeURI(document.all.h_workTypeIndex.value)
        //1061227 Zen 1061233 修正業務類別未初始化之Bug
        if (workTypeIndex != '')
        {
            ddlWorkType.selectedIndex = workTypeIndex;
            ddlWorkType_onchange();
        }
    }
    //1061227 Zen 1061233 (鐵改局)新增含需回覆公文查詢條件
    else if (document.all['OrgNickName'].value == 'RRB')
        document.getElementById('Reply').className = 'dTR';
    $(window).trigger('resize');

    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
        case "btRcvDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all["txRcvDateS"], event.screenX, event.screenY);
            break;
        case "btRcvDateE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all["txRcvDateE"], event.screenX, event.screenY);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050823 Zen 1050087 二代公文修改
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

    //1050823 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
        case "btPrint":
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1050823 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1070117 Zen 1070047 (鐵改局)新增匯出Excel功能
        case "btExcel":
            if (document.all['OrgNickName'].value == 'RRB')
            {
                Page_BlockSubmit = !CheckBeforeSearch();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
    }
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
    if (argResult.id == iCallID_GetBTypeNo)
    {
        if (jf_IsWebServiceSuccess(argResult) && argResult.value.RtnStr != "")
        {
            document.all.ddlWorkType.disabled = false;
            var pTmpAry = argResult.value.RtnStr.split(":");

            var ddlWorkType = document.all.ddlWorkType;
            var emptyItem = new Option('', '');
            ddlWorkType.options.add(emptyItem);

            for (var i = 0; i < pTmpAry.length; i++)
            {
                var pTmpAry2 = pTmpAry[i].split(",");

                //1061227 Zen 1061233 僅顯示業務類別名稱
                //var newItem = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                var newItem = new Option(pTmpAry2[1], pTmpAry2[0]);
                ddlWorkType.options.add(newItem);
            }
        }
        else if (argResult.value.RtnStr == "")
        {
            document.all.ddlWorkType.disabled = true;
        }
        else
        {
            alert('Service Unavailable');
        }
    }
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    var strSDate = jf_Trim(document.all.txRcvDateS.value);
    var strEDate = jf_Trim(document.all.txRcvDateE.value);
    var strDocS = jf_Trim(document.all.txDocNoS.value);
    var strDocE = jf_Trim(document.all.txDocNoE.value);
    //1051130 Zen 1051175 新增案件編號查詢條件
    var strCaseNoS = jf_Trim(document.all.txCaseNoS.value);
    var strCaseNoE = jf_Trim(document.all.txCaseNoE.value);

    //1060602 Zen 1060429 新增結案日期欄位
    var strCloseDateS = jf_Trim(document.all.txCloseDateS.value);
    var strCloseDateE = jf_Trim(document.all.txCloseDateE.value);

    //1140409 Zen 1131243 支援記錄續辦文號
    let strFurtherDocNoS = $('#txFurtherDocNoS').val();
    let strFurtherDocNoE = $('#txFurtherDocNoE').val();

    var bRtn = true;
    //1060602 Zen 1060429 新增結案日期欄位
    //if (strSDate == "" && strEDate == "" && strDocS == "" && strDocE == "")
    //1140409 Zen 1131243 支援記錄續辦文號
    //if (strSDate == "" && strEDate == "" && strDocS == "" && strDocE == "" && strCloseDateS == "" && strCloseDateE == "")
    if (strSDate == "" && strEDate == "" && strDocS == "" && strDocE == "" && strCloseDateS == "" && strCloseDateE == "" && strFurtherDocNoS == '' && strFurtherDocNoE == '')
    {
        //1060602 Zen 1060429 新增結案日期欄位
        //alert("公文文號或收創文日期至少需輸入一項條件");
        //1140409 Zen 1131243 支援記錄續辦文號
        //alert("公文文號、收創文日期、結案日期至少需輸入一項條件");
        alert("公文文號、續辦文號、收創文日期、結案日期至少需輸入一項條件");
        //1050823 Zen 1050087 二代公文修改
        //document.all["txDocNoS"].focus();
        $('#txDocNoS').focus();
        return false;
    }

    if (!CheckDATE("txRcvDateS", "收創文日期(起)"))
    {
        bRtn = false;

        return;
    }
    if (!CheckDATE("txRcvDateE", "收創文日期(迄)"))
    {
        bRtn = false;

        return;
    }
    if (strSDate != "" && strEDate != "" && strSDate > strEDate)
    {
        document.all.txRcvDateS.value = strEDate;
        document.all.txRcvDateE.value = strSDate;
    }
    if (strDocS != "" && strDocE != "" && strDocS > strDocE)
    {
        document.all.txDocNoS.value = strDocE;
        document.all.txDocNoE.value = strDocS;
    }
    if (strSDate == "" && strEDate != "")
    {
        document.all.txRcvDateS.value = strEDate;

    }
    if (strSDate != "" && strEDate == "")
    {
        document.all.txRcvDateE.value = strSDate;

    }
    if (strDocS == "" && strDocE != "")
    {
        document.all.txDocNoS.value = strDocE;

    }
    if (strDocS != "" && strDocE == "")
    {
        document.all.txDocNoE.value = strDocS;
    }

    //1051130 Zen 1051175 新增案件編號查詢條件
    if (strCaseNoS == "" && strCaseNoE != "")
        document.all.txCaseNoS.value = strCaseNoE;
    else if (strCaseNoS != "" && strCaseNoE == "")
        document.all.txCaseNoE.value = strCaseNoS;
    else if (strCaseNoS.localeCompare(strCaseNoE) == 1)
    {
        document.all.txCaseNoS.value = strCaseNoE;
        document.all.txCaseNoE.value = strCaseNoS;
    }

    //1060602 Zen 1060429 新增結案日期欄位
    if (strCloseDateS == "" && strCloseDateE != "")
        document.all.txCloseDateS.value = strCloseDateE;
    else if (strCloseDateS != "" && strCloseDateE == "")
        document.all.txCloseDateE.value = strCloseDateS;
    else if (strCloseDateS.localeCompare(strCloseDateE) == 1)
    {
        document.all.txCloseDateS.value = strCloseDateE;
        document.all.txCloseDateE.value = strCloseDateS;
    }

    //1140409 Zen 1131243 支援記錄續辦文號
    if (strFurtherDocNoS == '' && strFurtherDocNoE != '')
        $('#txFurtherDocNoS').val(strFurtherDocNoE);
    else if (strFurtherDocNoS != '' && strFurtherDocNoE == '')
        $('#txFurtherDocNoE').val(strFurtherDocNoS);
    else if (Number(strFurtherDocNoS) > (Number(strFurtherDocNoE))) 
    {
        $('#txFurtherDocNoS').val(strFurtherDocNoE);
        $('#txFurtherDocNoE').val(strFurtherDocNoS);
    }

    return bRtn;
}
var bHasCheck = false;
function CheckDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
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
            //1050823 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}
function dlDeptOnChange()
{
    var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
    var dlSect = document.all["dlSect"];
    var dlUser = document.all["dlUser"];
    document.all["h_DeptInfo"].value = str;//將單位放入隱藏欄位
    document.all["h_SectInfo"].value = "";
    document.all["h_UserInfo"].value = "";
    fnClearDropDownList(dlSect);
    fnClearDropDownList(dlUser);
    //1020902	--		Cloud	修正下拉選單有選擇東西後按下查詢會異常的錯誤
    document.all.SectList.value = "";
    document.all.UserList.value = "";
    if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
    {
        //1050823 Zen 1050087 二代公文修改
        //document.all["dlSect"].className = "InputFieldText";
        document.all["dlSect"].className = "";
        //1070830 Justin [1070678]弱掃AJAX修改
        //var Sectvalue = EDI411.GetSub(document.all["SsoArtifact"].value, str).value;
        var Sectvalue = ED4.EDI411.GetSub(document.all["SsoArtifact"].value, str).value;
        if (Sectvalue.length > 0)
        {
            dlSect.options.add(new Option("", ""));//DropDownList新增一個空白
            for (var i = 0; i < Sectvalue.length; i++)
            {
                var strSect = Sectvalue[i];
                dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
                //1020902	--		Cloud	修正下拉選單有選擇東西後按下查詢會異常的錯誤
                document.all.SectList.value += strSect + ";"
            }
            //1070830 Justin [1070678]弱掃AJAX修改
            //var Uservalue = EDI411.GetUser(document.all["SsoArtifact"].value, str).value;
            var Uservalue = ED4.EDI411.GetUser(document.all["SsoArtifact"].value, str).value;
            if (Uservalue.length > 0)
            {
                dlUser.options.add(new Option("", ""));
                for (var i = 0; i < Uservalue.length; i++)
                {
                    var strUser = Uservalue[i];
                    dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                    //1020902	--		Cloud	修正下拉選單有選擇東西後按下查詢會異常的錯誤
                    document.all.UserList.value += strUser + ";"
                }
            }
        }
        else
        {
            //1050823 Zen 1050087 二代公文修改
            //document.all["dlSect"].className = "HIDE";
            document.all["dlSect"].className = "hide";
            dlUser.options.add(new Option("", ""));//DropDownList新增一個空白

            //1080403    Joe	1080286 Ajax參考錯誤修正
            // var Uservalue = EDI411.GetUser(document.all["SsoArtifact"].value, str).value;
            var Uservalue = ED4.EDI411.GetUser(document.all["SsoArtifact"].value, str).value;
            if (Uservalue.length > 0)
            {
                for (var i = 0; i < Uservalue.length; i++)
                {
                    var strUser = Uservalue[i];
                    dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                }
            }
        }
    }
    else
    {
        fnClearDropDownList(dlSect);
        //1050823 Zen 1050087 二代公文修改
        //document.all["dlSect"].className = "HIDE";
        document.all["dlSect"].className = "hide";
    }
}
function dlSectOnChange()
{
    var str = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
    var dlUser = document.all["dlUser"];
    document.all["h_SectInfo"].value = str;//將科別放入隱藏欄位
    document.all["h_UserInfo"].value = "";
    fnClearDropDownList(dlUser);
    //1020902	--		Cloud	修正下拉選單有選擇東西後按下查詢會異常的錯誤
    document.all.UserList.value = "";
    if (document.all["dlSect"].selectedIndex > 0)//index有可能是0"空白"的情況
    {
        //1050823 Zen 1050087 二代公文修改
        //document.all["dlUser"].className = "InputFieldText";
        document.all["dlUser"].className = "";
        //1080403    Joe	1080286 Ajax參考錯誤修正
        // var Uservalue = EDI411.GetUser(document.all["SsoArtifact"].value, str).value;
        var Uservalue = ED4.EDI411.GetUser(document.all["SsoArtifact"].value, str).value;
        dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
        if (Uservalue.length > 0)
        {
            for (var i = 0; i < Uservalue.length; i++)
            {
                var strUser = Uservalue[i];
                dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                //1020902	--		Cloud	修正下拉選單有選擇東西後按下查詢會異常的錯誤
                document.all.UserList.value += strUser + ";"
            }
        }
        else//無人員清空下拉選單
        {
            fnClearDropDownList(dlUser);
        }
    }
    else//有二級單位選單，選擇空白時，應帶出一級單位所有人員
    {
        fnClearDropDownList(dlUser);
        dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
        //1080403    Joe	1080286 Ajax參考錯誤修正
        // var Uservalue = EDI411.GetUser(document.all["SsoArtifact"].value, document.all["h_DeptInfo"].value).value;
        var Uservalue = ED4.EDI411.GetUser(document.all["SsoArtifact"].value, document.all["h_DeptInfo"].value).value;
        if (Uservalue.length > 0)
        {
            for (var i = 0; i < Uservalue.length; i++)
            {
                var strUser = Uservalue[i];
                dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                //1020902	--		Cloud	修正下拉選單有選擇東西後按下查詢會異常的錯誤
                document.all.UserList.value += strUser + ";"
            }
        }
    }
}
function dlUserOnChange()
{
    var str = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
    document.all["h_UserInfo"].value = str;//將帳號放入隱藏欄位
}

//1050826 Zen 1050778 公文性質取得業務類別--begin
function ddlProperty_onchange()
{
    document.all.h_workTypeValue.value = '';

    document.all.ddlWorkType.innerHTML = "";

    //1061227 Zen 1061233 (鐵改局)新增含需回覆公文查詢條件
    if (document.all['OrgNickName'].value == 'RRB')
        document.getElementById('Reply').className = 'dTR';

    $(window).trigger('resize');
    if (document.all.ddlProperty.selectedIndex == 0)
        return;
    //1061227 Zen 1061233 (鐵改局)新增含需回覆公文查詢條件
    else if (document.all['OrgNickName'].value == 'RRB')
        document.getElementById('Reply').className = 'hide';

    var param = new Array();

    param[0] = encodeURI(document.all.h_OrgNo.value);
    param[1] = encodeURI(document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value);

    callObj = jf_CallWS("http://" + strServerName + "/" + strODVirName + "/lib/TIME_LIB.asmx", "GetBTypeNo", false, param);
    iCallID_GetBTypeNo = callObj.id;
    OnWSResult(callObj);

}

function ddlWorkType_onchange()
{
    var ddlWorkType = document.all.ddlWorkType;
    document.all.h_workTypeIndex.value = ddlWorkType.selectedIndex;
    document.all.h_workTypeValue.value = ddlWorkType.options[ddlWorkType.selectedIndex].value;
    //1061227 Zen 1061233 (鐵改局)調整報表副表頭顯示，記錄業務類別
    //1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
    // document.all.h_workTypeText.value = ddlWorkType.selectedOptions[0].text;
    document.all.h_workTypeText.value = document.all.ddlWorkType.options[document.all.ddlWorkType.selectedIndex].text;
}
//1050826 Zen 1050778 公文性質取得業務類別--end

function fnClearDropDownList(obj)//專用呼叫清空
{
    while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
        obj.options.remove(0);
}
//1040825	Kevin_C	1040695	增加處理DataGrid超連結的函式 -S
function OpenEDT412(argDocNo)
{
    var strDocNo = "";
    if (argDocNo != null)
        strDocNo = "&DOC_NO=" + argDocNo;
    var strURL = "EDT412.aspx?SAMLart=" + document.all.SsoArtifact.value + strDocNo;
    jf_OpenChildWin(strURL, "EDT412", 950, 500);
}
function OpenODI260(argOrgNo, argDocNo, argWidth, argHeight)
{
    if (argOrgNo != null)
        var strSource = "&SOURCE_ORGNO=" + argOrgNo;
    else
        var strSource = "";
    var strURL = "../../../ODDEP/ODI260.aspx?pDocNo=" + argDocNo + "&SAMLart=" + document.all.SsoArtifact.value + strSource;
    jf_OpenChildWin(strURL, "ODI260", argWidth, argHeight);
}
//1040825	Kevin_C	1040695	增加處理DataGrid超連結的函式 -E

//1120130
function OpenDocView(argArt, argDocNo, argOrgNo, argSignType)
{
    try
    {
        var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#artifact#', argArt);
        unvSrc = unvSrc.replace('#DocNo#', argDocNo);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, argOrgNo);

        var objViewDoc = {
            UNVObj: JSON.parse(unvSrc),
            docInfoPage: "AKI802",
            openDocModule: 'AOL',
            signType: argSignType,
            readOnlyMode: false,
            disableSave: true
        };
        var $docId = jf_GetSessionID() + "_" + (+new Date());
        localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
        var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
        jf_OpenChildWin(unvUrl, "ODR240ViewDoc");

    } catch (e)
    {
        alert('開啟失敗');
    }
}