/*
 * DATE     PRG	    MGR_NO	    DESC
 * 1140620  Leslie  1140128     新增本作業
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


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    $('A[id*="hlDOC_ID"').on('click', viewImageByDocId);
    $('#txDOC_NOS, #txDOC_NOE').on('blur', function (event) {
        var $objOther = (event.target.id == 'txDOC_NOS') ? $('#txDOC_NOE') : $('#txDOC_NOS');

        if ($objOther.val() == '')
            $objOther.val($(event.target).val());
        if ($(event.target).val() == '')
            $objOther.val('');
    })
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null) {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            $('#txDOC_NOS').focus();
            break;
    }
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
    
}
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function viewImageByDocId(event) {
    let strWebService = $('#h_WebService').val();
    let strStartPath = $('#h_StartPath').val();
    let strWorkPath = `${$('#h_WorkPath').val()}\\${jf_GetSessionID()}\\`;
    let currRole = $(event.target).closest('TR');
    let strDocId = $(event.target).text();
    let strSurfaceId = $(event.target).parent().find('span[id*="hDocSURFACEID"]').text();
    let strImgName = `${strDocId}.tiff`;

    var fileIo = T2100FileIoService(strWebService, "", jf_GetArtifact());
    fileIo.copy(`${strStartPath}\\${strSurfaceId}\\${strDocId}\\`, strImgName, strWorkPath, strImgName)
        .then(function (rslt) {
            if (rslt.success) {     //複製成功，確認有影像
                objDoc = {
                    'DocNo': currRole.find('span[id*="lbDOC_NO"]').text(),
                    'Subject': currRole.find('span[id*="lbDocIDXSUBJECT"]').text(),
                    'DocId': strDocId,
                    'ImgPage': currRole.find('span[id*="lbDocPAGES"]').text() * 1,
                    'viewPath': strWorkPath,
                    'viewFile': strImgName,
                    'viewWSDL': strWebService,
                }
                var UnvObj = genUnv(objDoc);

                var objViewDoc = {
                    UNVObj: UnvObj,
                    docInfoPage: "AKI802",
                    openDocModule: 'UniView',
                    signType: 'P',
                    readOnlyMode: true
                };
                var $docId = jf_GetSessionID() + "_" + (+new Date());
                localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                var w = window.screen.availWidth - 100,
                    h = window.screen.availHeight;
                jf_OpenChildWin(unvUrl, "EAI310ViewDoc",w,h);
            }
            else {
                alert(`指定的公文影像，檔案不存在。`)
            }
        })
        .fail(function (err) {
            alert(`調閱影像時發生未知異常：${err.errMsg}`)
        })
}

function CheckBeforeSearch() {
    if ($('input:visible[id*="tx"]').filter((o, u) => $(u).val() != '')?.length == 0) {
        alert('請至少輸入一個條件以增快查詢速度。');
        return false;
    }    
    return true;
}

function genUnv(objDoc) {
    var unvObj = {};
    let ssoServer = $('#SsoServer').val();
    var ssoUser = GetSSOPage().theSSO.User;
    var activeRole = ssoUser.PlayRoles[ssoUser.activeRoleIndex];

    unvObj.UnvRoot = {
        "Version": "3.4",
        "Artifact": jf_GetArtifact(),
        "USER_ORGNO": ssoUser.orgid,
        "WSDLurl": `https://${ssoServer}/ak/AKI500WS.asmx`,
        "WSDLurl2": `https://${ssoServer}/ak/Template/Lib/asmx`,
        "OU_ID": activeRole.unitNo,
        "OU_NAME": "",
        "USER_ID": ssoUser.account,
        "USER_NAME": ssoUser.name,
        "ForceWaterMark": "True",
        "ForceDisplayWaterMark": "TRUE",
        "USER_TITLE": ssoUser.title,
        "CLIENT_IP": "",
        "EnableSaveFile": "TRUE",
        "EnableEditFile": "TRUE",
        "EnablePrintFile": "TRUE",
        "EnablePrintScreen": "TRUE",
        "EraseMode": "0",
        'Doc': {
            "Subject": objDoc.Subject,
            'SourceOrgno': ssoUser.orgid,
            'DocNo': objDoc.DocNo,
            'Att': {
                'Type': '1',
                'Alias': '歷史影像',
                'PrintEnable': 'TRUE',
                'File':[],
            }
        }
    }
    if (objDoc.ImgPage > 1) {
        for (var i = 0; i < objDoc.ImgPage; i++) {
            unvObj.UnvRoot.Doc.Att.File.push({
                'Pages': '1',
                'FileName': `${objDoc.DocId}_SLICE_${i.toString().padStart(4, '0')}.PNG`,
                'FilePath': objDoc.viewPath,
                'WSDL': objDoc.viewWSDL
            })
        }        
    }
    else {
        unvObj.UnvRoot.Doc.Att.File.push({
            'Pages': '1',
            'FileName': objDoc.viewFile,
            'FilePath': objDoc.viewPath,
            'WSDL': objDoc.viewWSDL
        })
    }

    return unvObj;
}