/*
日期	SA		PG		單號		DESC
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1060804 Cloud   Zen     1050087     二代升級
1070709 Kevin   Zen     1070678     弱掃XSS修正
1080716	Leslie	Leslie	1080550		修正開啟EAI304，改為一律傳入Key值，一併修正升級二代+弱掃後遺症
1100504	Kevin	Zen     1100473		弱掃Reflected XSS Specific Clients修正
1131015 Kevin   Zen     1130941     弱掃Client Dynamic File Inclusion修正
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

//1060804 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var iCallID_ToDoList = null;
//1060804 Zen 1050087 二代升級
//var fso = new ActiveXObject("Scripting.FileSystemObject");
var uEditWin, uTimerID;
var uClientPath = "";
var iCallID = 0;
var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //解決StartupScript問題 #2007.07.19 Andy
    if (document.all["CALL_DOC_CHECK"])
    {
        var s = document.all["CALL_DOC_CHECK"].value;
        if (s == "1")
        {
            getOpenerValue('DOC_CHECK');
            document.all["CALL_DOC_CHECK"].value = "";
        }
    }

    //1060804 Zen 1050087 二代升級，改由公文檢索側屜開啟
    //OpenUnv();

    //解決StartupScript問題 #2007.07.19 Andy
    if (document.all["CALLEAI301"])
    {
        var s = document.all["CALLEAI301"].value;
        if (s != "")
        {
            //1060804 Zen 1050087 二代升級
            //jf_OpenSumDocWin(s);
            EAI303fn.jf_OpenSumDocWin(s);
            document.all["CALLEAI301"].value = "";
        }
    }
    if (document.all["OpenEAI302"])
    {
        var s = document.all["OpenEAI302"].value;
        if (s != "")
        {
            //1060804 Zen 1050087 二代升級
            //jf_OpenDetDocWin(s);
            EAI303fn.jf_OpenDetDocWin(s);
            document.all["OpenEAI302"].value = "";
        }
    }
    if (document.all["RelCase"])
    {
        //1070709 Zen 1070678 弱掃XSS修正
        //var s = document.all["RelCase"].value;
        var s = HtmlEncode(document.all["RelCase"].value);
        if (s != "")
        {
            //1080716	Leslie[1080550]	修正開啟EAI304，改為一律傳入Key值，一併修正升級二代+弱掃後遺症
            var caseList = s.split('!!!!');
            var strHtml = "";
            for (var idx = 0; idx < caseList.length; idx++)
            {
                let strCase = caseList[idx].split('$$$');
                if (strCase.length == 3)
                {
                    strHtml += "<A href=javascript:jf_OpenTreeWin('EAI304.aspx?k1=" + strCase[0] + "')>" + strCase[1] + "</A> " + strCase[2] + "<BR>";
                }
            }

            //document.all.divRelCase.insertAdjacentHTML("beforeEnd", s);
            document.all.divRelCase.insertAdjacentHTML("beforeEnd", strHtml);
            //1080716	Leslie[1080550]	修正開啟EAI304，改為一律傳入Key值，一併修正升級二代+弱掃後遺症	--END--
            document.all["RelCase"].value = "";
        }
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060804 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060804 Zen 1050087 二代升級
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
        /*
        case "":
            break;
        */
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060804 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1060804 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSUM1":			// 顯示摘要
        case "btFIRSTDOC1":		// 畫面切換到第一筆
        case "btPRIORDOC1":		// 畫面切換到上一筆
        case "btNEXTDOC1":		// 畫面切換到下一筆
        case "btLASTDOC1":		// 畫面切換到最末筆
        case "btDetailPrint":	// 明細列印
            Page_BlockSubmit = false;
            //1060804 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btIMAGE1":		// 線上瀏覽
            if (document.all.cbSELECT.checked == false)
            {
                document.all.cbSELECT.checked = true;
                SelectItem('DOC_CHECK');
            }
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //1060804 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btEXIT1":			// 離開
            ret = window.confirm("確定要離開本程式嗎？");
            Page_BlockSubmit = true;
            //1060804 Zen 1050087 二代升級
            //if (ret) window.close();
            if (ret)
                jf_CloseSelf();
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
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            var result = argResult.value;
            if (result.substring(0, 1) == "0")
                jf_OpenPDFWin(result.substring(1, result.length), null, "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
            else
            {
                if (result.substring(0, 1) == "1" || result.substring(0, 1) == "2")
                    alert(result.substring(1, result.length));
                else
                    alert(result);
            }
        }
        else
        {
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

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
    try
    {
        opener.document.all.lbReturnValue.length = 3;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.document.all.lbReturnValue.options[1].value = argRead1;
        opener.document.all.lbReturnValue.options[2].value = argRead2;
        opener.window.CallBack("SII020");
        close();
    }
    catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function getOpenerValue(key)
{
    if (document.all["h_tbFlag"].value == "")
    {
        document.all["h_tbFlag"].value = "PostBack";
        document.all[key].value = opener.document.all[key].value;

        setSelect(key);
    }
}

function setSelect(key)
{
    var Info = document.all[key].value;
    var flag;
    var SEQ_NO = document.all["lbSEQ_NO"].innerHTML;

    flag = Info.substr(parseInt(SEQ_NO) - 1, 1);
    /*
    if(flag == "1")
        document.all["cbSELECT"].checked = true;
    else
        document.all["cbSELECT"].checked = false;
    */
}

/*****************************************************
 name: SelectItem
 desc: 處理選取checkbox
*****************************************************/
function SelectItem(argCookie_nm)
{
    var pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    //1060804 Zen 1050087 二代升級
    //var pi_index = Number(document.all["lbSEQ_NO"].innerText);
    var pi_index = Number(document.all["lbSEQ_NO"].TextContent);

    if (document.all.cbSELECT.checked) { pType = '1' }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
}

/**************************************************
  以下處理線上瀏覽
 **************************************************/
//1060804 Zen 1050087 二代升級，改由公文檢索側屜開啟
//function OpenUnv()
//{
//    if (document.all.txUnvFile.value == "") return;

//    DownLoadByHttpTrans();

//    var oShell = new ActiveXObject("Shell.Application");
//    var param = "";
//    //var param = " /filename="+strPath + " /userid=frank /stampPath="+pPath+"\\StampBox.xml" ;
//    var commandtoRun = document.all.txUnvFileLocal.value;
//    oShell.ShellExecute(commandtoRun, param, "", "", "0");

//    document.all.txUnvFile.value = ""; //reset
//}

//function DownLoadByHttpTrans()
//{
//    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//    //document.all.dnFile.Servername = document.all["txServerName"].value; 
//    var serviceURL = document.all["txServerName"].value;
//    if (document.all.II_USE_SSL != null)
//    {
//        if (document.all.II_USE_SSL.value == "Y")
//            serviceURL = serviceURL.replace("http://", "https://");
//    }
//    document.all.dnFile.Servername = serviceURL;

//    document.all.dnFile.Port = document.all["txServerPort"].value;
//    document.all.dnFile.displayProgress = true;

//    var strFile = document.all.txUnvFile.value;
//    document.all.dnFile.addItem(strFile);

//    if (document.all.dnFile.download() == 0)
//    {
//        document.all.dnFile.resetItem();
//        window.status = "下載完畢!";
//    }
//    else
//    {
//        document.all.dnFile.resetItem();
//        alert("下載失敗!\n" + document.all.dnFile.ErrorString);
//        window.status = "下載失敗!";
//    }
//}

//1060804 Zen 1050087 二代升級
var EAI303fn = {
    jf_OpenSumDocWin: function jf_OpenSumDocWin(sUrl)
    {
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //var sUrlHeader = window.location.origin;
        var sUrlFolder = window.location.pathname;
        //1100504 Zen 1100473 弱掃Client DOM XSS修正
        //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        window.location.href = sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    },

    jf_OpenDetDocWin: function jf_OpenDetDocWin(sUrl)
    {
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //var sUrlHeader = window.location.origin;
        var sUrlFolder = window.location.pathname;
        //1100504 Zen 1100473 弱掃Client DOM XSS修正
        //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        window.location.href = sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    }
}

//1070709 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
