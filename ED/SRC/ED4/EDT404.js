/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0971211	--		Leslie	0970991		檔管局，修改"改分"、"銷號"的流程可分別設定
1011004	Kevin	Kevin	1010261		新增檢核來文不可銷號
1020123	Kevin	Kevin	1020049		修正dlApplyTypeOnChange有兩個問題
1020223	Kevin	Jagle	1020149		修正開啟時會跳出錯誤訊息
1020801 Kevin	Erin	1020537		修正確認後無法正常關閉問題(將第一次call webservice mark掉)
1030916	David	Cloud	1030427		[觀光局]支援分辦人員直接申請及增加核可按鈕
1030926 Cloud	Hank	1030254		增加不可銷號時，依參數決定是否自動關閉視窗
1031016	Cloud	Cloud	1030254		修改原鎖死建議改分單位行為，判斷邏輯
1040224 --		Cloud   --			修正申請別判斷錯誤bug
1040729	Cloud	Kevin_C	1040628		MERGE_1040414(3.0.54)增加銷號可支援自行核可
1050505 Cloud   Justin  1050087     二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
1061103 Kevin	Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1070830 Kevin   Justin  1070678     弱掃AJAX修改
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1080514	Cloud	Cloud	1080047		一併修正刪除下拉選單方法
1080514	Cloud	Kevin_C	1080047		修正使用物件錯誤的問題
1080814	Cloud	Cloud	1080567		(港務公司)增加檢核分文後4小時不可執行申請
1080339	Kevin	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
1080916 Kevin	Kevin_C	1080774		新增撤回功能
1081231	Cloud	Kevin_C	1081095		修正取下拉選單選項的屬性在IE不支援的問題
1091110	Cloud	Joe		1090709		新增移文功能
1091207	Cloud	Joe		1090709		通知開啟鎖定選項
1091211	Cloud	Joe		1090709		補上選回改分時，選單名稱須調整回來
1100607 Cloud   Cloud   1100655 	(港務公司)移文申請提供可自行設定申請流程
1100719	Cloud	Joe		1100660		成大調整欄位名稱
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1110126 Cloud   Cloud   1101418     新增線上瀏覽及夾帶附件功能		新增功能線上瀏覽、參考附件
1110706 Cloud   Cloud   1110467     由edt415開起時僅能關閉
1110821 Cloud   Cloud   1110629     修正無附件不該顯示title問題
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

/*1050505 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

//David 95.06.13 控制Page_Load時是否讓單位名稱DL顯示
document.all["dListDeptNo"].disabled = true;
//document.all["dListDeptNo"].className = "displayOnly";
//1031016	Cloud	[1030254]	修改原鎖死建議改分單位行為，判斷邏輯
//if(document.all["dlApplyType"].disabled)-選單鎖死 且申請別為銷號
//1040224   Cloud   修正申請別判斷錯誤bug
//if(document.all["dlApplyType"].disabled && document.all["dlApplyType"].selectedIndex==0)
if (document.all["dlApplyType"].disabled && document.all["dlApplyType"].selectedIndex == 1)//不可異動申請別且選擇為銷號
{
    document.all["dListDeptNo"].className = "displayOnly";
	//1091110	Joe	1090709	新增移文選項--S
	document.all["lbTranDesc"].className = "hide";
	document.all["dlAssignOrg"].style.display = "none";
}
else if (document.all["dlApplyType"].selectedIndex == 2) {
	document.all["dListDeptNo"].style.display = "none";
	document.all["dlAssignOrg"].disabled = false;
	document.all["dlAssignOrg"].className = "";
	document.all["Label9"].style.display = "";
	document.all["Label9"].innerText = "建議移文單位：";
	document.all["lbTranDesc"].className = "InputFieldText";
}
else {
	document.all["dlAssignOrg"].style.display = "none";
	document.all["lbTranDesc"].className = "hide";
	//1091110	Joe	1090709	新增移文選項--E
    document.all["dListDeptNo"].disabled = false;
    document.all["dListDeptNo"].className = "";
    document.all["dListDeptNo"].style.display = "";
    document.all["Label9"].style.display = "";
}
//1070830 Justin [1070678]弱掃AJAX修改
//1080514	Kevin_C	---	修正
// AjaxPro.Request.prototype.timeout = function () {
    // try {
        // this.duration = new Date().getTime() - this.__start;
        // var r = this.onTimeout(this.duration, this);
        // if (typeof r == "undefined" || r != false) {
            // this.abort();
        // } else {
            // this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        // }
    // }
    // catch (error) {

    // }
    // finally {

    // }
// }
//1110706 Cloud 補上AJAXPRO
 AjaxPro.Request.prototype.timeout = function () {
 try {
 this.duration = new Date().getTime() - this.__start;
 var r = this.onTimeout(this.duration, this);
 if (typeof r == "undefined" || r != false) {
 this.abort();
 } else {
 this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
 }
 }
 catch (error) {

 }
 finally {
 }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1020801  Erin [1020537] mark掉第一次call webservice，避免影響window close無法正常關閉視窗
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次

    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //dlSpdNo_onchange();

    //↓000385 by Leo 0960503 每次重讀時建議改分單位都一定會出現，改為看申請別是改分時才顯示
    oTimerId = setInterval("fnAfterPageLoad()", 10);
    //↑000385 by Leo
    //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)判斷申請以及是否可自行核可然後啟/停用核准鈕-S
    var vIndex = document.all["dlApplyType"].selectedIndex;
    //1050509 Justin 1050087 二代公文修改
    //var BtApprove = document.all.tbTool.getItem(12);
    if (vIndex == 0)
    {
        if (document.all["APPROVESHARE"] && document.all["APPROVESHARE"].value == "N")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",true);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', true);
			$('#btApprove').prop('disabled', true);
        else if (document.all["APPROVESHARE"] && document.all["APPROVESHARE"].value == "Y")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",false);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', false);
			$('#btApprove').prop('disabled', false);
    }
    else
    {
        if (document.all["APPROVEDESTORY"] && document.all["APPROVEDESTORY"].value == "N")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",true);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', true);
			$('#btApprove').prop('disabled', true);
        else if (document.all["APPROVEDESTORY"] && document.all["APPROVEDESTORY"].value == "Y")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",false);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', false);
			$('#btApprove').prop('disabled', false);
    }
    //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)判斷申請以及是否可自行核可然後啟/停用核准鈕-S
    //1110821 Cloud 1110629 固定加入附件按鈕位置，加入附件僅有未申請會呈現-故不會與流程dg同時存在，避免距離太遠，沒有流程時將對應div隱藏
    if (document.all.dg1)
    {
        if(document.all.dg1.length==1)
            document.all.dg1div.className="hide"
    }
    else
        document.all.dg1div.className = "hide"
}

//↓000385 by Leo 0960503 每次重讀時建議改分單位都一定會出現，改為看申請別是改分時才顯示
var oTimerId;
function fnAfterPageLoad()
{
    clearInterval(oTimerId); //clear
    fnControlDeptHide()
}
//↑000385 by Leo
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
        //1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-新增加入附件--S
    	case "btAddFile":
    		document.getElementById('fileInput').click();
    		break;
    	    //1110126 Cloud     1101418     新增線上瀏覽及夾帶附件功能-新增加入附件--E
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
//1050505 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050505 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
                //1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-新增上傳功能
                UploadFile();
            }
            else
                Page_BlockSubmit = true;
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            /*1050505 Justin 1050087 二代公文修改--Start--
			var ddlIdx=2;
			var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            Page_BlockSubmit = !jf_CheckBeforSave();
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
            {
                IsServerHandling = true;
                //1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-新增上傳功能
                UploadFile();
            }
            jf_ToolBarSubmit(xObjectName);
            //1050505 Justin 1050087 二代公文修改--End--
            break;
        case "btCheck":
            //1110706 Cloud     1110467     由edt415開起時僅能關閉
            if (document.all["CLOSE"])
                jf_CloseSelf();
            Page_BlockSubmit = false;
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            if (jf_CheckKeyObject())
            {
                var strArtifact = document.all.nArtifact.value;
                var strOrgNo = document.all.nSourceOrgno.value;
                var strDocNo = document.all["txDocNo"].value;
                var strApplyNo = document.all["txApplyNo"].value;
                var strHttp = document.all.nHttp.value;
                //var strUrl = strHttp +"ODI260.aspx?nFrom=EDT404&pDocNo="+strDocNo+"&uApplyNo=" + strApplyNo+"&SAMLart=" + strArtifact;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                //1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-修正取得網址
                //var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT404&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
                var strUrl = "../ED2/EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT404&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 800, 600);
            }
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1030916	Cloud	[1030427]		[觀光局]支援分辦人員直接申請及增加核可按鈕
        case "btApprove":
            Page_BlockSubmit = true;
            if (jf_CheckBeforSave())
            {
                //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)修改銷號可使用自行核可-拿掉檢核
                //Page_BlockSubmit = !CheckBeforApprove();
                Page_BlockSubmit = false;
            }
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
            //1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-新增線上瀏覽--S
	    case "btPreviewOnline":
	        Page_BlockSubmit = true;
			var Artifact = encodeURI(jf_Trim(document.all.SsoArtifact.value));
            var DocNo = encodeURI(jf_Trim(document.all["txDocNo"].value));
            var OrgNo = encodeURI(jf_Trim(document.all.nSourceOrgno.value));
	        DownloadDocument(Artifact, DocNo, OrgNo);
			break;
		//1080916	Kevin_C	1080774		新增撤回
		case "btBack":
			Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
			jf_ToolBarSubmit(xObjectName);
			break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
        bRtnbool = true;

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	//1080423	Kevin_C	1080047	增加字數檢核
	//1080514	Kevin_C	1080047	修正使用物件錯誤的問題
	//if (!isMaxLength(document.all.txApplyReason,'變更原因','300'))
	if (!isMaxLength(document.all.txReason,'變更原因','300'))
        return false;
	
    var bRtnbool = true;
    var strErrMsg = "";
    var buf = "";
    var strReason = document.all["txReason"].value;

    if (strReason == "")
    {
        if (strErrMsg != "") buf = "\n";
		//1081231	Kevin_C	1081095		修正欄位名稱不正確的問題
        //strErrMsg = "原因分析不可為空白" + buf + strErrMsg;
		strErrMsg = "變更原因不可為空白" + buf + strErrMsg;
        /*1050505 Justin 1050087 二代公文修改
		document.all["txReason"].focus();*/
        $('#txReason').focus();
    }
    if (strReason.length > 300)
    {
        if (strErrMsg != "") buf = "\n";
		//1081231	Kevin_C	1081095		修正欄位名稱不正確的問題
        //strErrMsg = "原因分析長度不可大於300個字" + buf + strErrMsg;
		strErrMsg = "變更原因長度不可大於300個字" + buf + strErrMsg;
        /*1050505 Justin 1050087 二代公文修改
		document.all["txReason"].focus();*/
        $('#txReason').focus();
    }
    //1030916 Cloud	[1030427] 增加判斷改分時改分單位不可空白
	//1091110	Joe		1090709		新增系統參數判斷是否檢核改分單位
	// if(document.all["dlApplyType"].selectedIndex==0)
	if(document.all["dlApplyType"].selectedIndex==0 && document.all["CheckDept"].value == "Y")
    {
        if (document.all["dListDeptNo"].selectedIndex == 0)
        {
            if (strErrMsg != "") buf = "\n";
            strErrMsg = "改分時，改分單位不可空白。" + buf + strErrMsg;
        }
    }
	//1091110	Joe		1090709		新增檢核移文單位
	else if(document.all["dlApplyType"].selectedIndex==2  && document.all["CheckUseTran"].value == "Y")
	{
		if(document.all["dlAssignOrg"].selectedIndex==0)
		{
			if (strErrMsg != "") buf="\n";
				strErrMsg = "移文時，移文單位不可空白。"+buf+strErrMsg;
		}		
	}

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}
//1030916	Cloud	[1030427] 新增核准按鈕功能-核准鈕增加判斷改分或是銷號
//1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)修改銷號可使用自行核可-拿掉檢核
//function CheckBeforApprove()
//{
//	var bRtnbool = true;

//	if(document.all["dlApplyType"].selectedIndex==1)
//	{
//		bRtnbool = false;
//		alert("銷號流程無法直接核可，請進行線上申請傳送。");
//	}
//	return bRtnbool;
//}

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

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
/*/取出DropDownList的selected value
function GetDropDownListSelectedValue(argObjId)
{
	var index = document.all[argObjId].selectedIndex;
	return document.all[argObjId].options[index].value;
}*/

function GetToolbarCtrl(argId)
{
    return document.all.tbTool.getItem(argId);
    for (var i = 0; i < 20; i++)
    {
        var o = document.all.tbTool.getItem(i);
        if (o != null)
        {
            alert(o.getAttribute("ID"));
            if (o.getAttribute("ID") == argId)
                return o;
        }
    }
    return null;
}

function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050505 Justin 1050087 二代公文修改--Start--
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txReason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //document.all["txReason"].focus();
    $('#txReason').focus();
    //1050505 Justin 1050087 二代公文修改--End--
}


/*
function dlSpdNo_onchange()
{
	var index = document.all["dlSpdNo"].selectedIndex;
	var val = document.all["dlSpdNo"].options[index].value;
	var strDueDate = document.all["H_DueDate"].value;
	var argDueDate = strDueDate.split(':');

	if (val == "1")//普通件
	{
		document.all["txNDueDate"].value = argDueDate[0];
		fnSetTextBoxReadOnly("txNDueDate");
	}
	else if (val == "2")//速件
	{
		document.all["txNDueDate"].value = argDueDate[1];
		fnSetTextBoxReadOnly("txNDueDate");
	}
	else if (val == "3")//最速件
	{
		document.all["txNDueDate"].value = argDueDate[2];
		fnSetTextBoxReadOnly("txNDueDate");
	}
	else if (val == "4")//限辦
	{
		fnSetTextBoxReadWrite("txNDueDate");
	}
}

function fnSetTextBoxReadWrite(elementId)
{
	document.all[elementId].className = "InputFieldText";
	document.all[elementId].readOnly = false;
	//document.all[elementId].disabled = false;//disabled=true會導致server看不到value
}

function fnSetTextBoxReadOnly(elementId)
{
	document.all[elementId].className = "DisplayOnly";
	document.all[elementId].readOnly = true;
	document.all[elementId].style.color = "Navy";
	//document.all[elementId].disabled = true;//避免觸發onclick事件
}

//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
		}
	}
}*/

//取消TextBox中enter的功能
//1080424	Kevin_C	1080047		二代Enter會轉TAB，故不需另外註冊函式處理
//function fnHandleTextarea()
//{
//    if (event.keyCode == 13)
//        event.cancelBubble = true;
//}
//David 95.06.13 控制選擇改分時顯示或隱藏單位名稱DL
function fnControlDeptHide()
{
    //1020123 Kevin 1020049 修正dlApplyTypeOnChange有兩個問題
    if (!dlApplyType_onchange())
        return;

    var vIndex = document.all["dlApplyType"].selectedIndex;
    //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)增加判斷是否可以自行核可改分並啟用/停用按鈕
    //1050509 Justin 1050087 二代公文修改
    //var BtApprove = document.all.tbTool.getItem(12);

    if (vIndex == 0)
    {
        document.all["dListDeptNo"].style.display = "";
        document.all["Label9"].style.display = "";
		//1091211	Joe		1090709		補上選回改分時，選單名稱須調整回來
		//1100719	Joe		1100660		成大調整欄位名稱--S
        if (document.all["H_OrgNick"].value == 'NUK')
			document.all["Label9"].textContent = "改分單位：";
		else
			//1100719	Joe		1100660		成大調整欄位名稱--E
			document.all["Label9"].textContent = "建議改分單位：";
		//1091110	Joe		1090709		改分時隱藏移文選項
		document.all["dlAssignOrg"].style.display = "none";
		document.all["lbTranDesc"].className = "hide";
        //0971211	Leslie[0970991]	重設傳送對象內容為"改分"的流程
        fnControlNextFlowSync("H_dlOD06");
        //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)增加判斷是否可以自行核可銷毀並啟用/停用按鈕-S
        if (document.all["APPROVESHARE"] && document.all["APPROVESHARE"].value == "N")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",true);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', true);
			$('#btApprove').prop('disabled', true);
        else if (document.all["APPROVESHARE"] && document.all["APPROVESHARE"].value == "Y")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",false);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', false);
			$('#btApprove').prop('disabled', false);
        //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)增加判斷是否可以自行核可銷毀並啟用/停用按鈕-E
		//1091207	Joe		通知開啟鎖定選項
		if(document.all["NotifyOpen"] && document.all["NotifyOpen"].value=="Y")
			document.all["dListDeptNo"].disabled = true;
		else
			document.all["dListDeptNo"].disabled = false;
    }
    else if (vIndex == 1)
    {
        //document.all["dListDeptNo"].disabled = false;
        document.all["dListDeptNo"].selectedIndex = 0;
        document.all["dListDeptNo"].style.display = "none";
		//1091110	Joe		1090709		銷號時隱藏移文選項
		document.all["dlAssignOrg"].style.display = "none";
        document.all["Label9"].style.display = "none";
		document.all["lbTranDesc"].className = "hide";
        //0971211	Leslie[0970991]	重設傳送對象內容為"銷號"的流程
        fnControlNextFlowSync("H_dlOD07");
        //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)增加判斷是否可以自行核可銷毀並啟用/停用按鈕-S
        if (document.all["APPROVEDESTORY"] && document.all["APPROVEDESTORY"].value == "N")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",true);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', true);
			$('#btApprove').prop('disabled', true);
        else if (document.all["APPROVEDESTORY"] && document.all["APPROVEDESTORY"].value == "Y")
            //1050509 Justin 1050087 二代公文修改
            //BtApprove.setAttribute("disabled",false);
			//1080339	Kevin_C	1080339		jQuery1.x升2.2，調整物件屬性設定方式
            //$('#btApprove').attr('disabled', false);
			$('#btApprove').prop('disabled', false);
        //1040729	Kevin_C	1040628	MERGE_1040414(3.0.56)增加判斷是否可以自行核可銷毀並啟用/停用按鈕-E
		//1091207	Joe		通知開啟鎖定選項
		if(document.all["NotifyOpen"] && document.all["NotifyOpen"].value=="Y")
			document.all["dListDeptNo"].disabled = true;
		else
			document.all["dListDeptNo"].disabled = false;
    }
	//1091110	Joe		1090709		新增移文選項
	else {
		document.all["dlAssignOrg"].style.display = "";
		document.all["Label9"].style.display = "";
		document.all["dListDeptNo"].style.display = "none";
		document.all["Label9"].textContent = "建議移文單位：";
		document.all["lbTranDesc"].className = "InputFieldText";
		//1100607 Cloud    1100655 	(港務公司)移文申請提供可自行設定申請流程
        //fnControlNextFlowSync("H_dlOD06");
        fnControlNextFlowSync("H_dlOD10");
		if(document.all["APPROVESHARE"] && document.all["APPROVESHARE"].value=="N")
			BtApprove.setAttribute("disabled",true);
		else if(document.all["APPROVESHARE"] && document.all["APPROVESHARE"].value=="Y")
			BtApprove.setAttribute("disabled",false);
		//1091207	Joe		通知開啟鎖定選項
		if(document.all["NotifyOpen"] && document.all["NotifyOpen"].value=="Y")
			document.all["dlAssignOrg"].disabled = true;
		else
			document.all["dlAssignOrg"].disabled = false;
	}
}
//David 95.06.13 使DDL同步變化
function fnControlDeptSync()
{
    var vIndex = document.all["dListDeptNo"].selectedIndex;
    document.all["dltempDept"].selectedIndex = vIndex;
    document.all["txTempBox"].value = document.all["dltempDept"].options[vIndex].value;
}

//0971211	Leslie[0970991]	設定目前申請別的傳送對象
function fnControlNextFlowSync(argApplyType)
{
    /*1050509 Justin 1050087 二代公文修改
	var ddlIdx=2;
	var nextOpt = GetToolbarCtrl(ddlIdx);
	var aOptions = nextOpt.getOptions();*/
     //1080514	Cloud		修正刪除下拉選單方法
    // var aOptions = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex];
    var aOptions = document.all.ddlNextUser.options.length;
    var srcObj = document.all[argApplyType];

    //先清空
    /*1050509 Justin 1050087 二代公文修改
	while (aOptions.length > 0)*/
    //1080514	Cloud		修正刪除下拉選單方法
    //while (aOptions != null)
    for(var i =0; i < aOptions ; i++)
    {
        //1080514	Cloud		修正刪除下拉選單方法
        /*
        var oChield = aOptions.children(0);
        aOptions.removeChild(oChield);*/
        document.all.ddlNextUser.remove(0);
    }

    //再把新的選單設定回去
    for (var j = 0; j < srcObj.length; j++)
    {
        var oChild = document.createElement("OPTION");
        oChild.text = srcObj[j].text;
        oChild.value = srcObj[j].value;
        document.all.ddlNextUser.add(oChild, j);
		
        ////1080514	Cloud		修正刪除下拉選單方法--S
        // var oSrcChild = srcObj.children(j);
        // oChild.value = oSrcChild.value;
        ////1080514	Cloud		修正刪除下拉選單方法--E
        /*1050505 Justin 1050087 二代公文修改
		oChild.innerText = oSrcChild.innerText;*/
        ////1080514	Cloud		修正刪除下拉選單方法--S
        // oChild.textContent = oSrcChild.textContent;
        // aOptions.appendChild(oChild);
        ////1080514	Cloud		修正刪除下拉選單方法--E
    }
}

//1011004 Kevin 1010261 新增檢核來文不可銷號
function dlApplyType_onchange()
{
    //1020223	Jagle	[1020149]	增加判斷隱藏欄位是否存在
    //if(document.all["H_RcvCanNull"].value != "")
	//1080814	Cloud	1080567		(港務公司)增加檢核分文後4小時不可執行申請-增加檢核有通過時效檢核才進行後續檢核
	if (!document.all["NoPassCheckTime"])//此欄位僅有未通過時效檢核時才存在
	{
	    if (document.all["H_RcvCanNull"] && document.all["H_RcvCanNull"].value != "")
	    {
			//1091110	Joe		1090709		修正銷號判斷	
			//if (document.all["dlApplyType"].selectedIndex = 1)
			if (document.all["dlApplyType"].selectedIndex == 1)
	        {
	            document.all["dlApplyType"].selectedIndex = 0;
	            alert(document.all["H_RcvCanNull"].value);
	            //1030924 Hank [1030254] 公文無法進行銷號時 判斷是否關閉視窗 : START
	            if (document.all["H_CantNullClose"] && document.all["H_CantNullClose"].value == "Y")
	            {
	                window.open('', '_self', '');
	                window.close();
	            }
	            //1030924 Hank [1030254] 公文無法進行銷號時 判斷是否關閉視窗 : END
	            return false;
	        }
	    }
	}
    return true;
}
//1080423	Kevin_C	1080047	增加字數檢核 -S
var bHasCheck = false;
function isMaxLength(obj,argText,argMaxNum)
{
	if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
			bHasCheck = false;
			return false;
		}
    } else if (obj.value.length > nMaxNum)
    {
		event.returnValue = false;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
		obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
    }
	bHasCheck = false;
	return true;
}
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-新增加入附件--S
//存放檔案物件及暫存(格式檢核未放入)
var AllFiles = [];
function fnAddFile() {
	if (!document.all.dgAttach)
		return;
	var strFileFullPath = "";
	var strSrcFileName = "";
	//取得檔案資訊方式
	for (var iFile = 0 ; iFile < $('#fileInput')[0].files.length ; iFile++) {
		var bFileNameCheck = true;
		var bFileSizeCheck = true;
		var currentFile = $('#fileInput')[0].files[iFile];
		var nFileSize = Math.ceil(currentFile.size / 1024);

		var strFileName = currentFile.name;
		for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
			//原先已有之附件
			if (document.all["dgAttach__ctl" + (i + 1) + "_lbFileName"])
				strSrcFileName = document.all["dgAttach__ctl" + (i + 1) + "_lbFileName"].textContent;
			else
				strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].textContent;
			if (strFileName == strSrcFileName) {
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
				$('btAddFile').focus();
				return;
			}
		}

		fnAddAttach(strFileName, strFileFullPath, "", "", "", "");
		AllFiles.push($('#fileInput')[0].files[iFile]);
	    //1110821 Cloud   Cloud   1110629     修正無附件不該顯示title問題
		if (AllFiles.length != 0) {
		    document.all.dgAttach.className = "";
		    document.all.dgAttachhead.className = "dghead";
		}
	}

	//將focus設到加入附件的按鈕以便使用者繼續加入
	$('btAddFile').focus();
}

//新增加入附件共用函式
function fnAddAttach(argFileName, argFileFullPath, argFileSize, argFileDesc, argFileType, argFileDraftSeq) {
	var rowCnt = document.all.dgAttach.rows.length;
	//設定row的背景色
	var rowBgColor = (rowCnt % 2) ? "White" : "#C9F3F5";
	//create row
	var row = document.createElement("TR");
	row.style.backgroundColor = rowBgColor;
	//create column
	var colSeq = document.createElement("TD");
	colSeq.setAttribute("align", "middle");
	colSeq.setAttribute("nowrap", "nowrap");
	colSeq.className = "InputFieldLabel";
	colSeq.innerText = rowCnt;
	var colFile = document.createElement("TD");
	colFile.setAttribute("align", "Left");
	var spanFileName = document.createElement("SPAN");
	var spanFilePath = document.createElement("SPAN");
	var spanFileSize = document.createElement("SPAN");
	var spanFileDesc = document.createElement("SPAN");
	var spanFileComeFrom = document.createElement("SPAN");
	var spanFileDraftSeq = document.createElement("SPAN");
	spanFileName.name = "FileName";
	spanFileName.textContent = argFileName;
	spanFilePath.name = "FilePath";
	spanFilePath.textContent = argFileFullPath;
	spanFileSize.name = "FileSize";
	spanFileSize.textContent = argFileSize;
	spanFileDesc.name = "FileDesc";
	spanFileDesc.textContent = argFileDesc;
	spanFileComeFrom.name = "FileComeFrom";
	spanFileComeFrom.textContent = argFileType;
	spanFileDraftSeq.name = "FileDraftSeq";
	spanFileDraftSeq.textContent = argFileDraftSeq;
	spanFileName.className = "InputFieldLabel";
	spanFilePath.style.display = "none";
	spanFileSize.style.display = "none";
	spanFileDesc.style.display = "none";
	spanFileComeFrom.style.display = "none";
	spanFileDraftSeq.style.display = "none";
	colFile.appendChild(spanFileName);
	colFile.appendChild(spanFilePath);
	colFile.appendChild(spanFileSize);
	colFile.appendChild(spanFileDesc);
	colFile.appendChild(spanFileComeFrom);
	colFile.appendChild(spanFileDraftSeq);
	//附件描述
	var coldes = document.createElement("TD");

	coldes.setAttribute("align", "middle");
	coldes.setAttribute("nowrap", "nowrap");
	
    coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" style=\"WIDTH: 14em;\" value=\"" + argFileDesc + "\"/>";
    


	var colDel = document.createElement("TD");
	colDel.setAttribute("align", "middle");
	colDel.setAttribute("nowrap", "nowrap");
	//刪除按鈕
	colDel.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_btDelete\" type=\"submit\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
	colDel.setAttribute("visible", "true");

	var strOpenPath = argFileFullPath.replace(/\\/g, "\\\\");
	//Add to dgAttach
	row.appendChild(colSeq);
	row.appendChild(colFile);
	row.appendChild(coldes);
	row.appendChild(colDel);
	document.all.dgAttach.children[0].appendChild(row);

}

//刪除附件
function fnDeleteAttachItem() {
	Page_BlockSubmit = true;
	//先刪除資料

	var deleteRow = event.srcElement.parentNode.parentNode;
	var strDelFileName = "";
	if (deleteRow.cells[1].childNodes[0].textContent.trim() != "")
		strDelFileName = deleteRow.cells[1].childNodes[0].textContent.trim();
	else
		strDelFileName = deleteRow.cells[1].textContent.trim();

	if (document.all.H_AttachDel.value != "")
		document.all.H_AttachDel.value += "|" + strDelFileName;
	else
		document.all.H_AttachDel.value += strDelFileName;
	document.all.dgAttach.children[0].removeChild(deleteRow);
	//再重設序號及style
	for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
		var row = document.all.dgAttach.rows[i];
		var rowBgColor = (i % 2) ? "White" : "rgb(201, 243, 245)";
		row.style.backgroundColor = rowBgColor;
		row.childNodes[0].innerText = i;
	}
    //*1110820    Cloud   1110629 修正無附件不應顯示title問題
	if (document.all.dgAttach.rows.length == 1) {
	    document.all.dgAttach.className = "hide";
	    document.all.dgAttachhead.className = "hide dghead";
	}
}

function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT404\\" + document.all.txApplyNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT404\\" + document.all.txApplyNo.value + "\\";
	var rtnVal = ED4.EDT404.AttDownLoad(DownFromPath, DownToPath, document.all.nArtifact.value, document.all.H_WS.value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
		openDlg(rtnVal[0] + "&OpenType=download", document.all.nArtifact.value, "");
	Page_BlockSubmit = true; 
}
//上傳檔案
var strUpload = "";
function UploadFile() {
	var strSrcFileName = "";
	var strSrcFileDesc = "";
	var strPath = "";
	var strBuffer = "";
	var iDgLength = document.all.dgAttach.rows.length;
	//先將不存在的附件移掉
	for (var i = 1; i < iDgLength; i++) {
		var bIsFileExist = false;
		//取得附件檔名&描述
		strSrcFileName = document.all.dgAttach.rows[i].cells[1].textContent.trim();
		if (document.all.dgAttach.rows[i].cells[2].childNodes[1])
			strSrcFileDesc = document.all.dgAttach.rows[i].cells[2].childNodes[1].value.trim();
		else
			strSrcFileDesc = document.all.dgAttach.rows[i].cells[2].childNodes[0].value.trim();
		for (var iArrfile = 0; iArrfile < AllFiles.length; iArrfile++) {
			if (AllFiles[iArrfile].name == strSrcFileName) {
				bIsFileExist = true;
				break;
			}
		}
		if (!bIsFileExist)
			AllFiles.splice(iArrfile, 1);
		document.all.H_AttachInf.value += strBuffer + strSrcFileName + ":" + strSrcFileDesc;
		strBuffer = "|";
	}
	if (AllFiles.length > 0) {
		try {
			var ioWS = new WebFileIO(document.all.H_WS.value, document.all.nArtifact.value);
			strPath = document.all["H_StartPath"].value + "\\EDT404\\" + document.all.txApplyNo.value + "\\";
			ioWS.upload(strPath, AllFiles, UploadCallBack);
		}
		catch (e) {

		}
	}
}
function UploadCallBack(result) {
	if (result.hasError) {
		alert("上傳附件至SERVER端失敗：" + result.ErrorMessage)
		Page_BlockSubmit = true;
	}
	else {
		IsServerHandling = true;
	}
}
//1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能新增加入附件--E

//1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能--新增線上瀏覽--S
function DownloadDocument(argArt, argDocNo, argOrgNo) {
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
						docInfoPage: "EDT404",
						openDocModule: 'AOL',
						signType: 'E',
						readOnlyMode: true
					};
					var $docId = jf_GetSessionID() + "_" + (+new Date());
					localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
					var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
					jf_OpenChildWin(unvUrl, "EDT404ViewDoc");
				}
			}
			else{
				alert(rtnObj.value.m_strErrMsg);
			}
		}
		else{
			alert(rtnObj.error.errorDetail.string)
		}
	} catch (e) {
		alert('開啟失敗');
	}
}
//1110126 Cloud      1101418     新增線上瀏覽及夾帶附件功能-新增線上瀏覽--E