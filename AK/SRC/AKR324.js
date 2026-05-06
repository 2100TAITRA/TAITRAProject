/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2023.12.19   Cloud   1121073 新增本作業
 * 2023.12.22   Cloud   1121073 現場因同卷可能會跨多資料夾，要可以重複印 故拿掉檢核
 * 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能-客戶希望提供文號連續刷入功能並保留檔號輸入時檢核檔號行為，為避免觸發重複文號、檔號重複檢核，將文號欄位移至上方，修改相關處理邏輯
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//* 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能-客戶希望提供文號連續刷入功能並保留檔號輸入時檢核檔號行為，為避免觸發重複文號、檔號重複檢核，將文號欄位移至上方，修改相關處理邏輯
document.all.txDocNo.onkeydown = jf_CheckEnterPress
function jf_CheckEnterPress()
{
    if (event.keyCode == 13) {
        GetDocData();
        event.returnValue = false;
    }
}
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
//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array();


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
	jf_ShowValidator();
}
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName) {
		case "ibVer":
			var pUrl = "";
			pUrl = "../EA/EA01/EAC004.aspx";
			jf_OpenChildWin(pUrl, "EAC004", 750, 500);
			Page_BlockSubmit = true;
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
		case "btClean":
			Page_BlockSubmit = true;
			var strVerNo = document.all["H_VerNo"].value;
			var strOrgNo = document.all['H_txSourceOrgno'].value;
			if (jf_ConfirmClean(false)) {
				document.all["H_VerNo"].value = strVerNo;
			}
			document.all['H_txSourceOrgno'].value = strOrgNo;
			document.all['rblClsCaseName_1'].checked = true;
			break;
		case "btPreview":
		    if (Checkvalue()) {
		        Page_BlockSubmit = false;
		        IsServerHandling = true;
		    }
		    else
		        Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
//* 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能-客戶希望提供文號連續刷入功能並保留檔號輸入時檢核檔號行為，為避免觸發重複文號、檔號重複檢核，將文號欄位移至上方，修改相關處理邏輯
//function GetDocData(argId, argType) {
function GetDocData() {

    //* 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能-客戶希望提供文號連續刷入功能並保留檔號輸入時檢核檔號行為，為避免觸發重複文號、檔號重複檢核，將文號欄位移至上方，修改相關處理邏輯	
    //if (document.all[argId].value == '')
    if (document.all['txDocNo'].value == '') {
        return;
        document.all['txDocNo'].focus();
    }
	//* 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能
	/*let pNo = argId.substring(8, argId.indexOf('_' + argType));
	let strDocNo = document.all['dg1__ctl' + pNo + '_txDocNo'].value;*/
	let strDocNo = document.all['txDocNo'].value;
	if (strDocNo == '')
		return;
	let rtnObj = AK.AKR324.GetDocData(document.all['H_txSourceOrgno'].value, strDocNo).value;
	if (rtnObj.indexOf("ERR") != -1) {
	    alert(rtnObj.split('-')[1]);
	    //* 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能
		//document.all['dg1__ctl' + pNo + '_txDocNo'].value = "";
	    //document.all['dg1__ctl' + pNo + '_txDocNo'].focus();
	    document.all['txDocNo'].value = "";
	    document.all['txDocNo'].focus();
	}
	else {
	    let strRtnArr = rtnObj.split('|');
	    //* 2024.01.04   Cloud   1121073 修改調整提供刷入文號功能-調整，程式自動找空白塞入
		//document.all['dg1__ctl' + pNo + '_txDocNo'].value = "";
		//document.all['dg1__ctl' + pNo + '_txYear'].value = strRtnArr[0];
		//document.all['dg1__ctl' + pNo + '_txClass'].value = strRtnArr[1];
		//document.all['dg1__ctl' + pNo + '_txCase'].value = strRtnArr[2];
		//document.all['dg1__ctl' + pNo + '_txVol'].value = strRtnArr[3];
		//document.all['dg1__ctl' + pNo + '_txClassName'].value = strRtnArr[4];
		//document.all['dg1__ctl' + pNo + '_txCaseName'].value = strRtnArr[5];
	    //document.all['dg1__ctl' + pNo + '_txCaseKey'].value = strRtnArr[6];
	    for (var i = 2; i < document.all['dg1'].rows.length + 1; i++) {
	        let txYear = document.all['dg1__ctl' + i + '_txYear'].value;
	        let txClassNo = document.all['dg1__ctl' + i + '_txClass'].value;
	        let txCaseNo = document.all['dg1__ctl' + i + '_txCase'].value;
	        let txVol = document.all['dg1__ctl' + i + '_txVol'].value;

	        if (txYear == '' || txClassNo == '' || txCaseNo == '' || txVol == '')//有空就換掉
	        {
	            document.all['dg1__ctl' + i + '_txYear'].value = strRtnArr[0];
	            document.all['dg1__ctl' + i + '_txClass'].value = strRtnArr[1];
	            document.all['dg1__ctl' + i + '_txCase'].value = strRtnArr[2];
	            document.all['dg1__ctl' + i + '_txVol'].value = strRtnArr[3];
	            document.all['dg1__ctl' + i + '_txClassName'].value = strRtnArr[4];
	            document.all['dg1__ctl' + i + '_txCaseName'].value = strRtnArr[5];
	            document.all['dg1__ctl' + i + '_txCaseKey'].value = strRtnArr[6];
                break
	        }
	    }
	    document.all['txDocNo'].value = "";
	    document.all['txDocNo'].focus();
	}
}
//檢查DataGrid資料列是否填完整
function Checkvalue() {
    let BhasData = false;
    let strSeqlist = "";
    let bRtn = true;

    for (var i = 2; i < document.all['dg1'].rows.length + 1; i++) {
        let txYear = document.all['dg1__ctl' + i + '_txYear'].value;
        let txClassNo = document.all['dg1__ctl' + i + '_txClass'].value;
        let txCaseNo = document.all['dg1__ctl' + i + '_txCase'].value;
        let txVol = document.all['dg1__ctl' + i + '_txVol'].value;

        if (txYear == '' && txClassNo == '' && txCaseNo == '' && txVol == '')//全空不檢核 
            continue;
        else {
            BhasData = true;
            //檢核是否有重複
            if (txYear == '' || txClassNo == '' || txCaseNo == '' || txVol == '') {
                if (strSeqlist != "")
                    strSeqlist += "、"
                strSeqlist += i.toString();
            }
        }
    }
    if (!BhasData) {
        bRtn = false;
        alert("請至少輸入一筆資料。");
    }
    else {
        if (strSeqlist != "") {
            bRtn = false;
            alert(strSeqlist + '資料輸入不完整。');
        }
        else {
            //* 2023.12.22   Cloud   1121073 現場因同卷可能會跨多資料夾，要可以重複印 故拿掉檢核
            /*let ShowSeq = 0;
            let ShowSeq1 = 0;
            for (var i = 2; i < document.all['dg1'].rows.length + 1; i++) {
                if( bRtn == false)
                    break;
                let txYear = document.all['dg1__ctl' + i + '_txYear'].value;
                let txClassNo = document.all['dg1__ctl' + i + '_txClass'].value;
                let txCaseNo = document.all['dg1__ctl' + i + '_txCase'].value;
                let txVol = document.all['dg1__ctl' + i + '_txVol'].value;

                if (txYear == '' && txClassNo == '' && txCaseNo == '' && txVol == '')//全空不檢核 
                    continue;
                else {

                    for (var j = 2; j < document.all['dg1'].rows.length + 1; j++) {
                        let txYear2 = document.all['dg1__ctl' + j + '_txYear'].value;
                        let txClassNo2 = document.all['dg1__ctl' + j + '_txClass'].value;
                        let txCaseNo2 = document.all['dg1__ctl' + j + '_txCase'].value;
                        let txVol2 = document.all['dg1__ctl' + j + '_txVol'].value;

                        if (txYear == txYear2 && txClassNo == txClassNo2 && txCaseNo == txCaseNo2 && txVol == txVol2) {
                            if (i != j) {
                                ShowSeq = i - 1;
                                ShowSeq1 = j - 1;
                                alert('序' + ShowSeq.toString() + '與序' + ShowSeq1.toString() + '重複。請重新輸入');
                                bRtn = false;
                                break;
                            }
                        }

                    }

                }
            }*/

        }
    }
    return bRtn;
}


/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
var bMsg = true;
var iCallID_CLS = null;
var iCallID_CASE = null;
var CurrentObjId;
function OnWSResult(argResult) {
	if (argResult.id == iCallID_CLS) {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true) {
			if (WSResult.ErrorClass.ErrMessage.length != 0) {
				bMsg = false;
				ClearnText("CLS");
				document.all["dg1__ctl" + WorkSeq + "_txClass"].focus();
				alert("無此分類號");
				WorkSeq = "";
			}
			else {
			    document.all["dg1__ctl" + WorkSeq + "_txClassName"].value = argResult.value.ClsName;
			    WorkSeq = "";
			}
		}
	}
	if (argResult.id == iCallID_CASE) {
		WSResult = argResult.value;
		if (WSResult.ErrorClass.IsRedirect != true) {
			if (WSResult.ErrorClass.ErrMessage.length != 0) {
				ClearnText("CASE");
				document.all["dg1__ctl" + WorkSeq + "_txCase"].focus();
				alert("無此案次號");
                WorkSeq = "";
			}
			else {
			    document.all["dg1__ctl" + WorkSeq + "_txCaseName"].value = argResult.value.CaseName;
			    document.all["dg1__ctl" + WorkSeq + "_txCaseKey"].value = argResult.value.Key;
			    WorkSeq = "";
			}
		}
	}
}
function ClearnText(argMode) {
    var strDG = "dg1";
	if (argMode == "CLS") {
		document.all[strDG + "__ctl" + WorkSeq + "_txClass"].value = "";
		document.all[strDG + "__ctl" + WorkSeq + "_txClassName"].value = "";
	}
	document.all[strDG + "__ctl" + WorkSeq + "_txCase"].value = "";
	document.all[strDG + "__ctl" + WorkSeq + "_txVol"].value = "";
	document.all[strDG + "__ctl" + WorkSeq + "_txCaseName"].value = "";
	document.all[strDG + '__ctl' + WorkSeq + '_txCaseKey'].value = "";
	
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {
	if (argCallerId == "EAC004") {
	    document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
	    document.all["txVerNo"].focus();
	    //jf_chkVerNo();
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

function jf_chkVerNo() {
    var HasData = false;
	if (document.all["txVerNo"].value == document.all["H_VerNo"].value)
	    return;
	var dg = document.all.dg1;
	var strDG = "dg1";
	for (var iRow = 2; iRow < dg.rows.length + 1; iRow++) {
	    let txYear = document.all['dg1__ctl' + iRow + '_txYear'].value;
	    let txClassNo = document.all['dg1__ctl' + iRow + '_txClass'].value;
	    let txCaseNo = document.all['dg1__ctl' + iRow + '_txCase'].value;
	    let txVol = document.all['dg1__ctl' + iRow + '_txVol'].value;

	    if (txYear != '' && txClassNo != '' && txCaseNo != '' && txVol != '')
	    { HasData = true; continue; }
	}
	if (HasData) {
	    if (window.confirm("變更版本後將清空所有卷號，是否繼續?")) {
	        for (var iRow = 2; iRow < dg.rows.length + 1; iRow++) {
	            document.all[strDG + "__ctl" + iRow + "_txDocNo"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txYear"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txClass"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txCase"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txVol"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txCaseName"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txClassName"].value = "";
	            document.all[strDG + "__ctl" + iRow + "_txCaseKey"].value = "";
	        }
	        document.all["H_VerNo"].value = document.all["txVerNo"].value;
	    }
	    else {
	        document.all["txVerNo"].value = document.all["H_VerNo"].value;
	    }
	    $('#txVerNo').focus();
	}
	
}
var WorkSeq = "";
function jf_checkClsNo(argId, argType) {

	if (bMsg) {
		
		let pNo = argId.substring(8, argId.indexOf('_' + argType));
		WorkSeq = pNo;
		if (document.all["dg1__ctl" + pNo + "_txClass"].value == "11") { alert("個人檔請改為使用 EAR223 產生封面及標籤。");}
		else {
		    var param = new Array(3);
		    if (document.all["txVerNo"].value != "" && document.all["dg1__ctl" + pNo + "_txYear"].value != "" && document.all["dg1__ctl" + pNo + "_txClass"].value != "") {
		        param[0] = document.all["txVerNo"].value;
		        param[1] = document.all["dg1__ctl" + pNo + "_txClass"].value;
		        param[2] = document.all["dg1__ctl" + pNo + "_txYear"].value;
		        RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param);
		        iCallID_CLS = RtnObj.id;
		        OnWSResult(RtnObj);
		    }
		}
	}
	else
		bMsg = true;


}

function jf_CheckCaseMain(argId, argType) {

    if (bMsg) {

        let pNo = argId.substring(8, argId.indexOf('_' + argType));
        WorkSeq = pNo;
        if (document.all["txVerNo"].value!="" && document.all["dg1__ctl" + pNo + "_txYear"].value != "" && document.all["dg1__ctl" + pNo + "_txClass"].value != "" && document.all["dg1__ctl" + pNo + "_txCase"].value != "") {
            var param = new Array(5);
            param[0] = document.all["dg1__ctl" + pNo + "_txYear"].value;
            param[1] = document.all["dg1__ctl" + pNo + "_txClass"].value;
            param[2] = document.all["dg1__ctl" + pNo + "_txCase"].value;
            param[3] = "";
            param[4] = document.all["txVerNo"].value;
            RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, param);
            iCallID_CASE = RtnObj.id;
            OnWSResult(RtnObj);
        }
	}
	else
		bMsg = true;
}

		
	