/*
DATE    SA		PRG		MGR_NO	        DESC
1100712 Kevin   Joe     1100646         新增程式(Merge from成大版)
1110622 Kevin  	Kevin  	1110630			新增單位2天內將逾期選項
1140818 Zen     Joeko   1140528         開啟DocView視窗時串入signType屬性
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1110622
    //SetFilterShow("span.MainWork", 'btMainWork');
    SetFilterShow(document.all.cssFilter.value, document.all.btFilter.value);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
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
        case "btMainWork":
            //$('tr span.MainWork').closest('tr').show();   //非主辦案件均隱藏
            SetFilterShow("span.MainWork", xObjectName);
            break;
        case "btCoWork":
            //$('tr span.CoWork').closest('tr').show();   //非會辦案件均隱藏
            SetFilterShow("span.CoWork", xObjectName);
            break;
        case "btOverDue":
            //$('tr img.OverDue').closest('tr').show(); //顯示逾期案件
            SetFilterShow("img.OverDue", xObjectName);
            break;
        case "btWillOver":
            //$('tr img.WillOver').closest('tr').show(); //非將逾期案件均隱藏
            //1110622 Kevin  1110630 新增單位2天內將逾期選項
            //SetFilterShow("img.WillOver", xObjectName);
            SetFilterShow("img.WillOver", xObjectName);
            break;
            //1110622 Kevin  1110630 新增單位2天內將逾期選項
		case "btWill2Over":
		    SetFilterShow("img.WillOver,img.Will2Over", xObjectName);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            /*if (CheckBeforeSearch())
                jf_ToolBarSubmit(xObjectName);*/
            break;
    }
}

function CheckBeforeSearch()
{
   
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var CheckedDate = false;
function CheckDATE(argObj, strMsg, argIsCheckDone)
{
    var strDate = document.all[argObj].value;

    if (strDate != "")
    {
        if (CheckedDate)
        {
            CheckedDate = false;
            return true;
        }
        if (argIsCheckDone)
            CheckedDate = true;

        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }

        if (!jf_CheckCDATE(strDate))
        {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            $('#' + argObj).focus();
            document.all[argObj].value = "";
            CheckedDate = false;
            return false;
        }
        else
            return true;
    }
    else
        return true;
}

function OpenODI260(argOrgNo, argDocNo)
{
    var url = document.all.H_OD_FLOW_PAGE.value + "?pDocNo=" + argDocNo + "&SOURCE_ORGNO=" + argOrgNo + "&SAMLart=" + jf_GetArtifact();
    jf_OpenChildWin(url, "ODI260", 1024, 768);
}

function SetFilterShow(argFilter, btActive)
{
    $('input:disabled').attr('disabled', false);    //啟用被Disabled的按鈕
    $('#' + btActive).attr('disabled', true);       //停用被按下的按用
    $('#dg1 tr:not(:first)').hide()                 //隱蔵所有資料列
    $('tr ' + argFilter).closest('tr').show();      //顯示目標內容
    $('#dg1 span[id*=SEQ_NO]:visible').each(function (idx, obj) {
        $(obj).text(idx + 1);                       //重新設定序號
        if (idx % 2 == 1) {
			//1110622 Kevin  1110630 調整美工
            //$(obj).closest('tr').css('background-color', '#C9F3F5');    //重新設定底色
			$(obj).closest('tr').css('background-color', '#E1F0F8');    //重新設定底色
        }
        else
            $(obj).closest('tr').css('background-color', '#FFFFFF');
    });   
    $(window).trigger('resize');                    //觸發標題列自動調整大小
}

//1140818    Joeko   1140528         開啟DocView視窗時串入signType屬性
/*function DownloadDocument(argArt, argDocNo, argOrgNo) {*/
function DownloadDocument(argArt, argDocNo, argOrgNo, argSignType) {
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
    
    try {
        var wsUrl = opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error) {
            if (rtnObj.value.m_bSuccess) {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "") {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        openDocModule: 'AOL',
                        //1140818    Joeko   1140528         開啟DocView視窗時串入signType屬性
                        /*signType: 'E',*/
                        signType: argSignType,
                        readOnlyMode: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
                }
            }
            else {
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else {
            alert(rtnObj.error.errorDetail.string)
        }
    } catch (e) {
        alert('開啟失敗');
    }
    //1050818	Kevin_C	二代修改，改用二代瀏覽模組 -E
}