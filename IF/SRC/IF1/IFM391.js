/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050913	Kevin	Kevin_C	1050087		新增程式
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 1060511	Kevin	Justin	1060215		調整檔案下載行為
 * 1101002	Joe		Joe		1100907		修改章戳內容支援多行輸入
 * 1120915	Joe		Joe		1120709		弱掃修正XSS
 * 1131212  Zen     Zen     1130988     支援依文別設定是否啟用個人章戳
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1131212 Zen 1130988 支援依文別設定是否啟用個人章戳
var gSetCateStamp = "";
var rsrcMgr = [];

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

//指定DataGrid欄位
//1131212 Zen 1130988 支援依文別設定是否啟用個人章戳，修正群組排序異常問題
//var strTableFields = new Array("_lbGroupName", "_lbGroupID", "_lbStampName", "_lbContent", "_h_Stamp");
var strTableFields = new Array("_lbGroupName", "_lbGroupID", "_lbStampName", "_lbContent", "_h_Stamp", '_H_txGroupID', '_H_txGroupName', '_h_CateList');
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (document.all.SigPreviewErr)
    {
        if (document.all.SigPreviewErr.value != "")
        {
            alert("預覽失敗:" + document.all.SigPreviewErr.value);
        }
        else if (document.all.SigPath.value != "")
        {
            //1060511 Justin [1060215] 調整檔案下載行為
            //openDlg(document.all.SigPath.value, "1", "URL", document.all.SigWidth.value, document.all.SigHeight.value);
            openDlg(document.all.SigPath.value, "0", "PortableDocFormat", document.all.SigWidth.value, document.all.SigHeight.value);
        }
        else
            alert("預覽失敗:當案路徑為空值");
    }

    //1131212 Zen 1130988 支援依文別設定是否啟用個人章戳
    $('input[id*="btSetCateList"]').on('click', function ()
    {
        var strCateList = $(this).parent().find('input[type="text"]').val();
        var strPara = "?cateList=" + encodeURI(strCateList);
        gSetCateStamp = $(this).closest('tr').find('span[id*="lbStampName"]').text();
        openDlg("IFM392C1.aspx" + strPara, jf_GetArtifact(), "URL");
    });

    if (opener && 'theWebServices' in opener.window)
    {
        opener.window.theWebServices.getPublicRsrc({
            success: function (xmlnode)
            {
                var diTemp = $(xmlnode).find('[名稱="公文樣版"] 檔案');
                diTemp.each(function ()
                {
                    let sDocType = $(this).attr('函類別');
                    if (sDocType == "")
                        sDocType = $(this).attr('文別');
                    if (rsrcMgr.indexOf(sDocType) == -1)
                        rsrcMgr.push(sDocType);
                })
                IF1.IFM391.WriteDocCate(rsrcMgr);
            },
            error: function (e)
            {
                alert('無法取得共用資源檔，請由公文系統首頁開啟本作業。');
            }
        })
    }
    else
    {
        alert('無法取得共用資源檔，請由公文系統首頁開啟本作業。');
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019	joe		1050087		二代修改配合行動平台
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //取得確實按下的是哪個鍵
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btViewSig"));
    if (document.all["dg1__ctl" + pNo + "_btViewSig"] != null)
        xObjectName = "btViewSig";
    var pNo2 = xObjectName.substring(8, xObjectName.indexOf("_btDeleteSig"));
    if (document.all["dg1__ctl" + pNo2 + "_btDeleteSig"] != null)
        xObjectName = "btDeleteSig";

    if (xObjectName.indexOf("dg1__ctl") != -1)
    {
        xObjectName
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    Page_BlockSubmit = true;
    switch (xObjectName)
    {
        case "btNNewSig":
            if (jf_Trim(document.all["txGroupName"].value) == "")
            {
                alert('尚未輸入群組名稱,請輸入後再點選產生章戳');
                document.all["txGroupName"].focus();
                return;
            }
            if (jf_Trim(document.all["txStampName"].value) == "")
            {
                alert('尚未輸入章戳名稱,請輸入後再點選產生章戳');
                document.all["txStampName"].focus();
                return;
            }
            //1101002	Joe		1100907		修改章戳內容支援多行輸入
            // if (jf_Trim(document.all["txFirstLine"].value+document.all["txSecondLine"].value+document.all["txEndLine"].value) == "") 
            if (jf_Trim(document.all["txStampContent"].value) == "") 
            {
                alert('尚未輸入章戳內容,請輸入後再點選產生章戳');
                //1101002	Joe		1100907		修改章戳內容支援多行輸入
                // document.all["txFirstLine"].focus();
                document.all["txStampContent"].focus();
                return;
            }
            Page_BlockSubmit = false;
            IsServerHandling = true;
            __doPostBack("btNNewSig", "");
            break;
        case "btNLoadNew":
            if (jf_Trim(document.all["txGroupName"].value) == "")
            {
                alert('尚未輸入群組名稱,請輸入後再點選產生章戳');
                document.all["txGroupName"].focus();
                return;
            }
            if (jf_Trim(document.all["txStampName"].value) == "")
            {
                alert('尚未輸入章戳名稱,請輸入後再點選產生章戳');
                document.all["txStampName"].focus();
                return;
            }
            //.上傳檔案
            if (![$('#txFilePath')[0].files[0]][0])
            {
                alert("請先選擇檔案");
                break;
            }
            var strFileNAme = fnOnUpload();
            Page_BlockSubmit = false;
            IsServerHandling = true;
            __doPostBack("btNLoadNew", strFileNAme);
            break;
        case "btViewSig":
            var arrRtn = IF1.IFM391.btPrview(parseInt(pNo) - 1, document.all["dg1__ctl" + pNo + "_h_Stamp"].value, document.all.txAccount.value, document.all.h_OrgNo.value, document.all.h_txFilePath.value);
            if (arrRtn.value[3] != "")
            {
                alert("預覽失敗:" + arrRtn.value[3]);
            }
            else if (arrRtn.value[0] != "")
            {
                //1060511 Justin [1060215] 調整檔案下載行為
                //openDlg(arrRtn.value[0], "1", "URL", arrRtn.value[1], arrRtn.value[2]);
                openDlg(arrRtn.value[0], "0", "PortableDocFormat", arrRtn.value[1], arrRtn.value[2]);
            }
            else
                alert("預覽失敗:當案路徑為空值");
            break;
        case "btDeleteSig":
            Page_BlockSubmit = false;
            IsServerHandling = true;
            __doPostBack("btDeleteSig", pNo2);
            break;
        case "btUp":
            Page_BlockSubmit = true;
            jf_RowUp("dg1", "_cbSelect", strTableFields);
            break;
        case "btDown":
            Page_BlockSubmit = true;
            jf_RowDown("dg1", "_cbSelect", strTableFields);
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
        case "btSave":
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnOnUpload()
{
    var strFileIOWS = document.all["h_FileIOWS"].value;
    var strStorePath = document.all["h_txFilePath"].value;
    var strUploadFile = [$('#txFilePath')[0].files[0]];
    if (document.all.II_USE_SSL != null)
    {
        if (document.all.II_USE_SSL.value == "Y")
            strFileIOWS = strFileIOWS.replace("http://", "https://");
    }
    var strArtifact = document.all.SsoArtifact.value;
    var ioWS = new WebFileIO(strFileIOWS, strArtifact);
    ioWS.upload(strStorePath, strUploadFile, UploadCallBack);
    //.紀錄檔案名稱
    return strUploadFile[0].name;
}
function UploadCallBack(result)
{
    if (result.hasError)
    {
        alert(result.ErrorMessage)
    }
}
//向上移動
function jf_RowUp(argTableName, argCheckBoxName, argTableFields)
{
    if (document.all[argTableName] == null)
        return;

    var strTemp = new Array();
    var nChecked = 0;
    var nCount = 0;

    var len = document.all[argTableName].rows.length + 1;
    //取得勾選列的關聯動作
    var strRelatedAct = "";
    for (i = 2; i < len; i++)
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.checked)
        {
            if (nCount == 0)
            {
                var len2 = argTableFields.length;
                for (j = 0; j < len2; j++)
                {
                    //1131212 Zen 1130988 支援依文別設定是否啟用個人章戳，修正群組排序異常問題
                    //if (argTableFields[j] == "_h_Stamp")
                    if (argTableFields[j] == "_h_Stamp" || argTableFields[j] == "_H_txGroupID" || argTableFields[j] == "_H_txGroupName" || argTableFields[j] == "_h_CateList")
                        strTemp[j] = document.all[argTableName + "__ctl" + i + argTableFields[j]].value;
                    else
                        strTemp[j] = document.all[argTableName + "__ctl" + i + argTableFields[j]].innerHTML;
                }
                strRelatedAct = document.getElementById(argTableName + "__ctl" + i + "_ddlRelatedAct").selectedIndex;
                nChecked = i;
                nCount += 1;
            }
            else
            {
                alert("一次只能移動一筆資料");
                return;
            }
        }
    }

    //單一選取且不為第一筆
    if (nCount == 1 && nChecked != 2)
    {
        document.all[argTableName + "__ctl" + nChecked + argCheckBoxName].checked = false;
        document.all[argTableName + "__ctl" + (nChecked - 1) + argCheckBoxName].checked = true;

        document.getElementById(argTableName + "__ctl" + nChecked + "_ddlRelatedAct").selectedIndex = document.getElementById(argTableName + "__ctl" + (nChecked - 1) + "_ddlRelatedAct").selectedIndex;
        document.getElementById(argTableName + "__ctl" + (nChecked - 1) + "_ddlRelatedAct").selectedIndex = strRelatedAct;

        var len3 = argTableFields.length;
        for (j = 0; j < len3; j++)
        {
            //1131212 Zen 1130988 支援依文別設定是否啟用個人章戳，修正群組排序異常問題
            //if (argTableFields[j] == "_h_Stamp")
            if (argTableFields[j] == "_h_Stamp" || argTableFields[j] == "_H_txGroupID" || argTableFields[j] == "_H_txGroupName" || argTableFields[j] == "_h_CateList")
            {
                document.all[argTableName + "__ctl" + nChecked + argTableFields[j]].value = document.all[argTableName + "__ctl" + (nChecked - 1) + argTableFields[j]].value;
                document.all[argTableName + "__ctl" + (nChecked - 1) + argTableFields[j]].value = strTemp[j];
            }
            else
            {
                document.all[argTableName + "__ctl" + nChecked + argTableFields[j]].innerHTML = document.all[argTableName + "__ctl" + (nChecked - 1) + argTableFields[j]].innerHTML;
                //1120915  Joe		1120709			弱掃修正XSS
                // document.all[argTableName+"__ctl"+ (nChecked-1) + argTableFields[j]].innerHTML = strTemp[j];
                document.all[argTableName + "__ctl" + (nChecked - 1) + argTableFields[j]].innerHTML = htmlencode(strTemp[j]);
            }
        }
    }
}

//向下移動
function jf_RowDown(argTableName, argCheckBoxName, argTableFields)
{
    if (document.all[argTableName] == null)
        return;

    var strTemp = new Array();
    var nChecked = 0;
    var nCount = 0;

    var len = document.all[argTableName].rows.length + 1;
    //取得勾選列的關聯動作
    var strRelatedAct = "";
    for (i = 2; i < len; i++) 
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.checked)
        {
            if (nCount == 0)
            {
                var len2 = argTableFields.length;
                for (j = 0; j < len2; j++)
                {
                    //1131212 Zen 1130988 支援依文別設定是否啟用個人章戳，修正群組排序異常問題
                    //if (argTableFields[j] == "_h_Stamp")
                    if (argTableFields[j] == "_h_Stamp" || argTableFields[j] == "_H_txGroupID" || argTableFields[j] == "_H_txGroupName" || argTableFields[j] == "_h_CateList")
                        strTemp[j] = document.all[argTableName + "__ctl" + i + argTableFields[j]].value;
                    else
                        strTemp[j] = document.all[argTableName + "__ctl" + i + argTableFields[j]].innerHTML;
                }
                strRelatedAct = document.getElementById(argTableName + "__ctl" + i + "_ddlRelatedAct").selectedIndex;
                nChecked = i;
                nCount += 1;
            }
            else
            {
                alert("一次只能移動一筆資料");
                return;
            }
        }
    }

    //單一選取且不為最後一筆
    if (nCount == 1 && nChecked != document.all[argTableName].rows.length)
    {
        document.all[argTableName + "__ctl" + nChecked + argCheckBoxName].checked = false;
        document.all[argTableName + "__ctl" + (nChecked + 1) + argCheckBoxName].checked = true;

        document.getElementById(argTableName + "__ctl" + nChecked + "_ddlRelatedAct").selectedIndex = document.getElementById(argTableName + "__ctl" + (nChecked + 1) + "_ddlRelatedAct").selectedIndex;
        document.getElementById(argTableName + "__ctl" + (nChecked + 1) + "_ddlRelatedAct").selectedIndex = strRelatedAct;

        var len3 = argTableFields.length;
        for (j = 0; j < len3; j++)
        {
            //1131212 Zen 1130988 支援依文別設定是否啟用個人章戳，修正群組排序異常問題
            //if (argTableFields[j] == "_h_Stamp")
            if (argTableFields[j] == "_h_Stamp" || argTableFields[j] == "_H_txGroupID" || argTableFields[j] == "_H_txGroupName" || argTableFields[j] == "_h_CateList")
            {
                document.all[argTableName + "__ctl" + nChecked + argTableFields[j]].value = document.all[argTableName + "__ctl" + (nChecked + 1) + argTableFields[j]].value;
                document.all[argTableName + "__ctl" + (nChecked + 1) + argTableFields[j]].value = strTemp[j];
            }
            else
            {
                document.all[argTableName + "__ctl" + nChecked + argTableFields[j]].innerHTML = document.all[argTableName + "__ctl" + (nChecked + 1) + argTableFields[j]].innerHTML;
                //1120915  Joe		1120709			弱掃修正XSS
                // document.all[argTableName+"__ctl"+ (nChecked+1) + argTableFields[j]].innerHTML = strTemp[j];
                document.all[argTableName + "__ctl" + (nChecked + 1) + argTableFields[j]].innerHTML = htmlencode(strTemp[j]);
            }
        }
    }
}
//1101002	Joe		1100907		修改章戳內容支援多行輸入
function fntxStampContentChange(argControl)
{
    if (event.keyCode == 13)
    {
        event.returnValue = false;
        var idx = document.all.txStampContent.selectionStart;
        document.all.txStampContent.value = document.all.txStampContent.value.substring(0, idx) + "\n" + document.all.txStampContent.value.substring(idx);
        document.all.txStampContent.setSelectionRange(idx + 1, idx + 1);
    }
}

//1120915  Joe		1120709			弱掃修正XSS
function htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//1131212 Zen 1130988 支援依文別設定是否啟用個人章戳
function CallBack(argCallerId)
{
    if (argCallerId == "IFM392C1")
    {
        if (gSetCateStamp != "")
        {
            $('span[id*="lbStampName"]').each(function ()
            {
                if ($(this).text() == gSetCateStamp)
                {
                    $(this).closest('tr').find('input[id*="h_CateList"]').val(jf_Trim(document.all.lbReturnValue.options[0].value));
                }
            })
            gSetCateStamp = "";
        }
    }
}