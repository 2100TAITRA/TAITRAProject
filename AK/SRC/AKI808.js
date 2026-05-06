/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1110314		Zen		1110287	二代升級
 * 1110325		Zen		1110287	補提供瀏覽舊公文功能
 * 1110504		Zen		1110287	修正無法瀏覽紙本歷史公文之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1110314	Zen	1110287	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

// if (document.all["ValidationSummary1"].innerText != "")
// alert(document.all["ValidationSummary1"].innerText);

//1110314	Zen	1110287	二代系統升級
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

//1110314	Zen	1110287	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1110314	Zen	1110287	二代系統升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        /*		case "btHelp":
                    var strUrl = "";
                    strUrl = "AKT410C1.aspx?rtnObj=lbReturnValue";
                    jf_OpenChildWin(strUrl, "AKT410C1", 740, 500);
                    Page_BlockSubmit = true;
                    break;
        */
    }
}

//1110314	Zen	1110287	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1110314	Zen	1110287	二代系統升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btFromDoc":
            Page_BlockSubmit = true;
            fnOpenFileView("1");
            break;
        case "btIssueDoc":
            Page_BlockSubmit = true;
            fnOpenFileView("2");
            break;
        case "btDownFromAtt":
            Page_BlockSubmit = true;
            fnOpenFileView("3");
            break;
        case "btDownIssueAtt":
            Page_BlockSubmit = true;
            fnOpenFileView("4");
            break;
        case "btExit":
            Page_BlockSubmit = true;
            window.close();
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKT410C1")
    {

    }
}

function ClientOnLoad()
{
    //	jf_CallWS("lib/AK_LIB.asmx", "ChkPlan", false, null);
}

function OnWSResult(argResult)
{
    var strErrMsg;
    //清理計劃存不存在檢查
    if (argResult.id == wsCheckPlanID)
    {
    }
    //清理計畫是否有將'降解密'納入
}

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}
function fnOpenFileView(argType)
{
    var artifact = document.all.Artifact.value;
    //1110314	Zen	1110287	二代系統升級
    // var strDocNo = document.all["lbDOC_NO"].innerText;
    var strDocNo = document.all["lbDOC_NO"].textContent;
    var strSourceOrgno = document.all["H_txSourceOrgno"].value;
    var UrlPath = "";
    switch (argType)
    {
        case "1":
            //1110325 Zen 1110287 補提供瀏覽舊公文功能
            //UrlPath = "AKI808C1.aspx?DocNo="+strDocNo+"&SAMLart="+document.all.Artifact.value+"&Type=1";
            DownLoadUNI(artifact, strDocNo, strSourceOrgno, '1');
            break;
        case "2":
            //1110314 Zen 1110287 二代升級
            //UrlPath = "AKI808C1.aspx?DocNo="+strDocNo+"&SAMLart="+document.all.Artifact.value+"&Type=2";
            DownLoadUNI(artifact, strDocNo, strSourceOrgno, '2');
            break;
        case "3":
            UrlPath = "AKI808C1.aspx?DocNo=" + strDocNo + "&SAMLart=" + document.all.Artifact.value + "&Type=3";
            jf_OpenChildWin(UrlPath, "AKI808C1", 400, 300);
            break;
        case "4":
            UrlPath = "AKI808C1.aspx?DocNo=" + strDocNo + "&SAMLart=" + document.all.Artifact.value + "&Type=4";
            jf_OpenChildWin(UrlPath, "AKI808C1", 400, 300);
            break;
    }

}

//1110325 Zen 1110287 補提供瀏覽舊公文功能
function DownLoadUNI(argArt, argDocNo, argOrgNo, argFormType)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;

    try
    {
        var wsUrl;
        if (opener.theWebServices != undefined)
            wsUrl = opener.theWebServices.url('fileiows');
        else if (opener.opener.theWebServices != undefined)
            wsUrl = opener.opener.theWebServices.url('fileiows');
        else
            wsUrl = opener.opener.opener.theWebServices.url('fileiows');

		//1110504 Zen 1110287 修正無法瀏覽紙本歷史公文之問題
        //var param = [];
        //param[0] = artifact;
        //param[1] = strDocNo;
        //param[2] = strOrgNo;

        //var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        //if (!rtnObj.error)
        //{
        //	if (rtnObj.value.m_bSuccess)
        //	{
        //var sUnvObj = rtnObj.value.RtnStr;
        var sUnvObj = '{"UnvRoot":{"Version":"3.4","Artifact":"","USER_ORGNO":"","WSDLurl":"","WSDLurl2":"","OU_ID":"","OU_NAME":"","USER_ID":"","USER_NAME":"","ForceWaterMark":"True","ForceDisplayWaterMark":"TRUE","USER_TITLE":"","CLIENT_IP":"","EnableSaveFile":"TRUE","EnableEditFile":"TRUE","EnablePrintFile":"TRUE","EnablePrintScreen":"TRUE","EraseMode":"0","Doc":{"Subject":"","SourceOrgNo":"","DocNo":"","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE","File":{"Pages":"0","FileName":null,"FilePath":null,"WSDL":null}}}}}';
		
        if (sUnvObj != "")
        {
            var UnvObj = JSON.parse(sUnvObj);

			//1110504 Zen 1110287 修正無法瀏覽紙本歷史公文之問題
			UnvObj.UnvRoot.USER_ORGNO = document.all["H_txSourceOrgno"].value;
			UnvObj.UnvRoot.Doc.SourceOrgNo = document.all["H_txSourceOrgno"].value;
			UnvObj.UnvRoot.Doc.DocNo = document.all['lbDOC_NO'].textContent;
			
            UnvObj.UnvRoot.Doc.Att.Type = '8';
            UnvObj.UnvRoot.Doc.Att.Alias = '來文及文稿檔';
            UnvObj.UnvRoot.Doc.Att.File.FilePath = document.all['H_txAKI808WorkPath'].value;

            let strErrMsg = AK.AKI808.PrepareViewDocData(strDocNo, argFormType, artifact, wsUrl);
            if (strErrMsg.value != '')
            {
                alert(strErrMsg.value);
                return;
            }

            var objViewDoc = {
                UNVObj: UnvObj,
                docInfoPage: "AKI808",
                openDocModule: 'AOL',
                signType: 'P',
                readOnlyMode: true,
                HistoryDoc: true
            };
            var $docId = jf_GetSessionID() + "_" + (+new Date());
            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
            jf_OpenChildWin(unvUrl, "AKI808ViewDoc");
        }
        //1110504 Zen 1110287 修正無法瀏覽紙本歷史公文之問題
        //	}
        //	else
        //	{
        //		alert(rtnObj.value.m_strErrMsg);
        //	}
        //}
        //else
        //{
        //	alert(rtnObj.error.errorDetail.string)
        //}
    }
    catch (e)
    {
        alert('開啟失敗');
    }
}
