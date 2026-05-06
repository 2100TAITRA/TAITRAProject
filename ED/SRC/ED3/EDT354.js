/*
DATE		SA		PRG		MGR_NO		DESC
1111012		David	Joe		1110884		新增程式
1111220		David	Joe		序56		銓敘部增修需求，調整送繕日期不為必要欄位，併修正日期合理性處理
1120202		David	Joe		序121		銓敘部增修需求，新增DocView功能、由文號新增不排除已讀公文、程式預設開啟
1120512     David	Joe     序291       調整報表排序處理
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    case "btAdd":
	        Page_BlockSubmit = true;
	        fnDocOnblur("Add");
	        break;
	    case "btdgSet":
	        Page_BlockSubmit = !jf_CheckBeforSet();
	        __doPostBack("btdgSet", 0);
            break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
{
	var xObjectName;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    Page_BlockSubmit = !jf_CheckBeforSearch();
		    if (document.all.txAddFlag.value == "Y")
		        Page_BlockSubmit = !window.confirm("查詢後會清除現已輸入的文號改以查詢結果顯示，請問是否繼續?");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_CheckBeforPreview();
			jf_ToolBarSubmit(xObjectName);
			break;
        case "btSelectAll":
            Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			dgCtrlOrderChg();
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			dgCtrlOrderChg();
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			dgCtrlOrderChg();
            break;
	}
}

function jf_CheckBeforSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	//1111220	Joe		序56	銓敘部增修需求，調整送繕日期不為必要欄位，併修正日期合理性處理--S
	/*
	if (document.all["txSendDateS"].value + document.all["txSendDateE"].value == "")
	{
		strErrMsg += "送繕日期不可為空\n";
		$('#txSendDateS').focus();
	}
	*/
	//1111220	Joe		序56	銓敘部增修需求，調整送繕日期不為必要欄位，併修正日期合理性處理--E

	if (!CheckCDATE("txSendDateS", "送繕日期(起)"))
	    return false;
	if (!CheckCDATE("txSendDateE", "送繕日期(迄)"))
		return false;
	//1120203	Joe		序121		銓敘部增修需求，新增紀錄最後更新時間
	if (!CheckCDATE("txUpdateDateS", "送出日期(起)"))
	    return false;
	if (!CheckCDATE("txUpdateDateE", "送出日期(迄)"))
	    return false;

	//1111220	Joe		序56	銓敘部增修需求，調整送繕日期不為必要欄位，併修正日期合理性處理--S
	if (document.all.txSendDateS.value == "")
		document.all.txSendDateS.value = document.all.txSendDateE.value;
	else if (document.all.txSendDateE.value == "")
		document.all.txSendDateE.value = document.all.txSendDateS.value;
	else if (document.all.txSendDateS.value > document.all.txSendDateE.value)
	{
		var strTemp = document.all.txSendDateE.value;
		document.all.txSendDateE.value = document.all.txSendDateS.value;
		document.all.txSendDateS.value = strTemp;
	}
	//1111220	Joe		序56	銓敘部增修需求，調整送繕日期不為必要欄位，併修正日期合理性處理--E

	//1120203	Joe		序121		銓敘部增修需求，新增紀錄最後更新時間
	if (document.all.txUpdateDateS.value == "")
		document.all.txUpdateDateS.value = document.all.txUpdateDateE.value;
	else if (document.all.txUpdateDateE.value == "")
		document.all.txUpdateDateE.value = document.all.txUpdateDateS.value;
	else if (document.all.txUpdateDateS.value > document.all.txUpdateDateE.value) {
		var strTemp = document.all.txUpdateDateE.value;
		document.all.txUpdateDateE.value = document.all.txUpdateDateS.value;
		document.all.txUpdateDateS.value = strTemp;
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}


function jf_CheckBeforPreview() {
    var bRtnbool = false;

    if (document.all.dg1) {
        for (var i = 2; i <= document.all.dg1.rows.length; i++) {
            if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
                bRtnbool = true;
                break;
            }
        }

        if (bRtnbool == false)
            alert("請至少勾選一筆公文");
    }
    else
    {
        alert("無公文資料，請先查詢或輸入公文");
    }

    return bRtnbool;
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
		if(jf_IsWebServiceSuccess(argResult))
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
	//來文機關查詢子視窗
	if(argCallerId == "WEM010C1")
	{
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢核日期格式
function CheckCDATE(argObj, strMsg) {
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}


function fnDocOnblur(argType) {
    if (event.keyCode == 13 || argType == "Add") {
        if (document.all.dg1) {
            for (var i = 2; i <= document.all.dg1.rows.length; i++) {
				//1120202	Joe		序121	調整文號為Hyperlink
                // if (document.all["dg1__ctl" + i + "_lbDocNo"].textContent == document.all.txDocNo.value) {
                if (document.all["dg1__ctl" + i + "_hlDocNo"].textContent == document.all.txDocNo.value) {
                    //1120417   Joe     序236    調整為刷入條碼後勾選選項不新增
                    //alert("文號" + document.all.txDocNo.value + "已存在於清單內，請重新輸入。");
                    document.all["dg1__ctl" + i + "_cbSelect"].checked = true;
					document.all.txDocNo.value = '';
					//1120512	Joe		序291		調整報表排序、刷條碼後執行Focus
					document.all.txPreviewOrder.value += ";" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent;
					$('#txDocNo').focus();
                    return;
                }
            }
        }
        Page_BlockSubmit = false;
        IsServerHandling = true;
        __doPostBack("btAdd", 0);
    }
}

function jf_CheckBeforSet()
{
    var bRtnbool = false;
	var docList = '';
	var Buffer = '';

    if (document.all.dg1) {
        for (var i = 2; i <= document.all.dg1.rows.length; i++) {
            if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
                bRtnbool = true;
				if(document.all["dg1__ctl" + i + "_lbSendKind"].textContent != "")
				{
					//1120202	Joe		序121	調整文號為Hyperlink
					// docList += Buffer + document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
					docList += Buffer + document.all["dg1__ctl" + i + "_hlDocNo"].textContent;
					Buffer = "、";
				}
					
            }
        }

        if (bRtnbool == false)
            alert("請至少勾選一筆公文");
    }
	
	if(docList != "")
		return window.confirm("文號" + docList + "已有設定公文類別，請問是否需繼續設定");
	
    return bRtnbool;
}

//1120202	Joe		--		新增DOCVIEW功能
function DownloadDocument(argDocNo, argOrgNo, argSignType) {
	var artifact = jf_GetArtifact();
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
    try {
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#artifact#', artifact);
        unvSrc = unvSrc.replace('#DocNo#', strDocNo);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, strOrgNo);

        var sUnvObj = unvSrc;
        if (sUnvObj !== "") {
            var UnvObj = JSON.parse(sUnvObj);
            var objViewDoc = {
                UNVObj: UnvObj,
                docInfoPage: "EDT354",
                openDocModule: 'AOL',
				signType: argSignType,
                readOnlyMode: false,
                disableSave: true
            };
            var $docId = jf_GetSessionID() + "_" + (+new Date());
            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
            jf_OpenChildWin(unvUrl, "ViewDoc");
        }
    } catch (e) {
        alert('開啟失敗');
    }
}
//1120512	Joe		序291	紀錄報表排序
function KeepOrderList(e) {
    var id = e.id.replace('dg1__ctl', '').replace('_cbSelect', '');
    var argSeq = document.all["dg1__ctl" + id + "_lbSEQ_NO"].textContent;
    if (document.all["dg1__ctl" + id + "_cbSelect"].checked)
        document.all.txPreviewOrder.value += ";" + argSeq;
	else {
		var newlist = "";
		var oldlist = document.all.txPreviewOrder.value.split(';');
		for (var i = 0; i < oldlist.length; i++) {
			if (oldlist[i] != argSeq && oldlist != "")
				newlist += ";" + oldlist[i];
		}
		document.all.txPreviewOrder.value = newlist;
    }
}

function dgCtrlOrderChg() {
	document.all.txPreviewOrder.value = '';
	var newlist = "";
	for (var i = 2; i <= document.all.dg1.rows.length; i++) {
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
			newlist += ";" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent;
		}
	}
	document.all.txPreviewOrder.value = newlist;
}