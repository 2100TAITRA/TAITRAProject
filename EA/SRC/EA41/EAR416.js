/*
DATE		SA		PRG		    MGR_NO			DESC
1091019     Cloud   Zen		    1090575         新增EAR416 檔卷盤點清單
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
    var xObjectName = e.target.id;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
    var xObjectName;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btStatistic":
            Page_BlockSubmit = true;
            var strUrl = "/AK/AKP210.aspx?SAMLart=" + jf_GetArtifact();
            jf_OpenChildWin(strUrl, "AKP210", 800, 600);
            break;
        case "btPreview":
            Page_BlockSubmit = false;
            SwapValue('txClientCadrNoS', 'txClientCadrNoE');
            SwapValue('txManageBankNoS', 'txManageBankNoE');
            SwapValue('txManageCaseNoS', 'txManageCaseNoE');
            SwapValue('txFileYearS', 'txFileYearE');
            SwapValue('txFileCaseS', 'txFileCaseE');
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function ZeroPadding(argId, argValue, argLength) {
    if (argValue != '')
        document.all[argId].value = jf_PADL(argValue, argLength, '0');
}

function SwapValue(argIdS, argIdE) {
    var strValueS = $('#' + argIdS).val();
    var strValueE = $('#' + argIdE).val();

    if (strValueS == '' && strValueE != '')
        $('#' + argIdS).val(strValueE);
    else if (strValueS != '' && strValueE == '')
        $('#' + argIdE).val(strValueS);
    else if (Number(strValueS) > (Number(strValueE))) {
        $('#' + argIdS).val(strValueE);
        $('#' + argIdE).val(strValueS);
    }
}