/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1140916      Cloud   1141137 新增外貿客製化作業
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

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

function ShowMsg()
{
    jf_ShowValidator();
}


function ClientButtonControl(e)
{
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
        case "btAll"://全選
            Page_BlockSubmit = true;
            var strObjName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++) {
                strObjName = "dg1__ctl" + i + "_cbChangeVol";
                document.all[strObjName].checked = true;
            }
            break;
        case "btClear"://清除
            Page_BlockSubmit = true;
            var strObjName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++) {
                strObjName = "dg1__ctl" + i + "_cbChangeVol";
                document.all[strObjName].checked = false;
            }
            break;
        case "btRever"://反向
            Page_BlockSubmit = true;
            var strObjName = "";
            var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
            for (i = 2; i < pDg1Len; i++) {
                strObjName = "dg1__ctl" + i + "_cbChangeVol";
                if (document.all[strObjName].checked)
                    document.all[strObjName].checked = false;
                else
                    document.all[strObjName].checked = true;
            }
            break;
    }
}

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

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !FormValidforOpen();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            
            //if (document.all["H_NEWVOL"].value == "1")
            //{
                //if (document.all["txVol"].value == "")
                //{
                    //alert("卷次號不可為空。");
                    //$('#txVol').focus();
                    //Page_BlockSubmit = true;
                //}
                //else
                    //Page_BlockSubmit = false;
            //}
            //else
            {
                if (ConfirmSave())//是否通過儲存前必要檢查
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                    Page_BlockSubmit = true;
            }
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            $('#txYear').focus();
            document.all["rbSplit"].checked = true;
            document.all["rbReset"].checked = true;
            break;
        
            
    }
}

function CallBack(argCallerId)
{ }

function ClientOnLoad()
{
    ShowMsg();
}

function OnWSResult(argResult)
{

    if (argResult.id == wsDuplicateID)
    {
        if (!argResult.value.RtnBool)
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您輸入的檔號為該案的第一卷，無上一案卷可併入。"])), "");
    }
    if (argResult.id == iCallID_CLSKEY)
    {
        if (!jf_IsWebServiceSuccess(argResult))
        {
            document.all[iCallID_CLSid].value = "";
            $('#' + iCallID_CLSid).focus();
        }
        else
        {
            var WSResult;
            WSResult = argResult.value;

            if (iCallID_CLSid == "txClsN")
                document.all["H_CLSKEY_N"].value = WSResult.CLS_KEY;
            else
                document.all["H_CLSKEY"].value = WSResult.CLS_KEY;

            if (document.all["txVerNo"].disabled = false)
                document.all["txVerNo"].value = WSResult.VerNo;
        }
    }
    
   
	//*修改支援年度onblur取得版本-S
    if (argResult.id == iCallID_YearVerNo)//
    {
    	WSResult = argResult.value;
    	if (WSResult.ErrorClass.IsErr)
    	{
			var bAlert = true;
    		if (WSResult.ErrorClass.ErrMessage[0].indexOf("輸入區間含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-s
				if(document.all["txVerNo"].value!="")
				{
					var checkmsg = WSResult.ErrorClass.ErrMessage[0].split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["txVerNo"].value)
							{
								bAlert = false;
								break;
							}
						}
					}

				}
				if(bAlert)
				{
					document.all["txVerNo"].value = "";
					document.all["txVerNo"].focus();
					alert(WSResult.ErrorClass.ErrMessage[0]);
				}
				//* 2021.03.16	Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-調整先判斷版本填入資訊是否符合使用區間，再跳出訊息-e
    		}
    		else
    		{
    			document.all[CurrentObjId].value = "";
				alert(WSResult.ErrorClass.ErrMessage[0]);
    		}
    	}
    	else
    	{
    		if (CurrentObjId == "txYear")//年度號ONLBUR-帶回版本別一律設定
    		{
    			document.all["txVerNo"].value = WSResult.strVerNo;
    		}
    		else//版本別onblur
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["txYear"].value == "" || document.all["txYear"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["txYear"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					document.all["txYear"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["txYear"].value == "" || document.all["txYear"].value < WSResult.strSdate || document.all["txYear"].value > WSResult.strEdate)
    				{
    					if (document.all["txYear"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					document.all["txYear"].value = WSResult.strEdate;
    				}
    			}
    		}
    	}
    }
}


//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
        bRtnbool = CheckBeforSave();
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//檢查成功回值true
var wsDuplicateID;
function CheckBeforSave()
{
    var bRtnbool = true;
    var strOldVol = "";
    var nVolNum = "";
    //1140925 Cloud 併卷邏輯-暫不需要先mark-改為檢核新卷號是否輸入完整
    //var strEFileVolNo = document.all["H_strEFileVolNo"].value;
    //var nEFileVolNoLength = strEFileVolNo.length;
    //if (document.all["txVol"].value.substr(0, nEFileVolNoLength) != strEFileVolNo)
    //{
    //    strOldVol = Number(document.all["txVol"].value) - 1;
    //    strOldVol = jf_PADL(String(strOldVol), 4, '0');
    //}
    //else
    //{
    //    nVolNum = Number(document.all["txVol"].value.substr(strEFileVolNo.length, (4 - nEFileVolNoLength))) - 1;
    //    strOldVol = strEFileVolNo + jf_PADL(String(nVolNum), (4 - nEFileVolNoLength), '0');
    //}

    //if (document.all["rbMerge"].checked)
    //{
    //    var argKeyName = new Array(4);
    //    var argKeyValue = new Array(4);

    //    argKeyName[0] = "FILE_YEAR";
    //    argKeyName[1] = "FILE_CLS";
    //    argKeyName[2] = "FILE_CASE";
    //    argKeyName[3] = "FILE_VOL";
    //    argKeyValue[0] = document.all["txYear"].value;
    //    argKeyValue[1] = document.all["txCls"].value;
    //    argKeyValue[2] = document.all["txCase"].value;
    //    argKeyValue[3] = strOldVol;

    //    var arWSParam = new Array(3);
    //    arWSParam[0] = "DOC_MAIN";
    //    arWSParam[1] = argKeyName;
    //    arWSParam[2] = argKeyValue;
    //    callObj = jf_CallWS("Template/lib/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
    //    wsDuplicateID = callObj.id;
    //    OnWSResult(callObj);
    //    bRtnbool = callObj.value.RtnBool;
    //}
    var fr = document.AKT330_TAITRA;
    var pRtnValue = true;
    if (fr.txYearN.value == "" || fr.txClsN.value == "" || fr.txCaseN.value == "" || fr.txVolN.value == "") {
        pRtnValue = false;
        var ErrMsg = "";
        var focusAt = null;
        if (fr.txVolN.value == "") {
            ErrMsg = "、卷次號";
            focusAt = fr.txVolN;
        }
        if (fr.txCaseN.value == "") {
            ErrMsg = "、案次號" + ErrMsg;
            focusAt = fr.txCaseN;
        }
        if (fr.txClsN.value == "") {
            ErrMsg = "、分類號" + ErrMsg;
            focusAt = fr.txClsN;
        }
        if (fr.txYearN.value == "") {
            ErrMsg = "、年度號" + ErrMsg;
            focusAt = fr.txYearN;
        }
        
        ErrMsg = ErrMsg.substr(1, ErrMsg.length);

        var ErrName = new Array(1);
        ErrName[0] = "欲分入卷的"+ErrMsg;
        alert(FormatStr(jf_GetErrMsg(UnAllowEmpty), ErrName));
        $('#' + focusAt.id).focus();
        bRtnbool = false;
    }


    if (bRtnbool)	//前面的檢核通過，才做這裡的檢核
    {
        var strType = "";
        var iFirstSeq = 0;
        var iLastSeq = 0;
        var iAllCount = 0;
        if (document.all["rbMerge"].checked)			//併入前一卷的末端(僅影响本卷檔號)        
        {
            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
                if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    iLastSeq = document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent;
                    break;
                }
            }
            iFirstSeq = document.all["dg1__ctl2_lbSEQ_NO"].textContent;
            iAllCount = (iLastSeq - iFirstSeq) + 1;//-避免只勾選一筆所以+1
            var rtn = AK.AKT330_TAITRA.CheckVolCount(document.all["h_SourceOrgno"].value, document.all["txYear"].value, document.all.H_CLSKEY.value, document.all.H_CASEKEY.value, document.all.txVol.value, iAllCount.toString(), "rbMerge").value;
            if (rtn != "") {
                alert(rtn);
                return false;
            }
            strType = "0";
        }
        else if (document.all["rbInsert"].checked)	//分為獨立一卷(影响本卷含以後所有卷)
            strType = "3";
        else
        {
			//
			//取得要加入的筆數
            var iaddCount = 0;
            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
				if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    iaddCount++;
				}
			}
            var rtn = AK.AKT330_TAITRA.CheckVolCount(document.all["h_SourceOrgno"].value, document.all["txYearN"].value, document.all.H_CLSKEY_N.value, document.all.H_CASEKEY_N.value, document.all.txVolN.value, iaddCount.toString(), "rbSplit").value;
            if (rtn.indexOf("ERR") != -1) {
                alert(rtn);
                return false;
            }
            else
                document.all["txVolNMaxSeq"].value = rtn;
            //* 1140923      Cloud   1141137 -以下先保留-外貿不提供
            //if (document.all["rbMax"].checked)		//併入後一卷的末端(僅影响本卷檔號)
            //    strType = "1";
            //else {
            //    //併入後一卷的前端(影响本卷檔號及下一卷)
            //    strType = "2";
            //}
        }
        //* 1110216      Cloud   1101503 增加目次號重排功能-以下先保留
        //var strFileNo = "";
        //if (!document.all["rbReSortSeq"].checked) {

        //    for (var i = 2; i <= document.all["dg1"].rows.length + 1; i++) {
        //        if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
                    
        //            strFileNo = document.all["dg1__ctl" + i + "_lbYear"].textContent;
        //            break;
        //        }
        //    }
        //    var value = AK.AKT330_TAITRA.CheckVolStatus(document.all["h_SourceOrgno"].value, strFileNo, strType).value;
        //    if (value != "") {
        //        alert(value);
        //        bRtnbool = false;
        //    }
        //}
        //else
        //    bRtnbool = true;
    }
    return bRtnbool;
}

//檢查分類號正確性
var iCallID_CLSKEY = null;
var iCallID_CLSid = null;
function CheckClsNo(argID)
{
    var strCLS = document.all[argID].value;
    iCallID_CLSid = argID;
    if (strCLS != "")
    {
    	var param1 = new Array(3);
    	param1[0] = document.all["txVerNo"].value;
        param1[1] = document.all[argID].value;
        if (argID =="txClsN")
            param1[2] = document.all["txYearN"].value;
        else
            param1[2] = document.all["txYear"].value;
    	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetCLS", false, param1);

    	iCallID_CLSKEY = RtnObj.id;
    	OnWSResult(RtnObj);
    }
}



//搜尋前檢查
function FormValidforOpen()
{
    var fr = document.AKT330_TAITRA;
    var pRtnValue = true;
    if (fr.txYear.value == "" || fr.txCls.value == "" || fr.txCase.value == "" || fr.txVol.value == "" || fr.txVerNo.value == "")
    {
        pRtnValue = false;
        var ErrMsg = "";
        var focusAt = null;
        if (fr.txVol.value == "")
        {
            ErrMsg = "、卷次號";
            focusAt = fr.txVol;
        }
        if (fr.txCase.value == "")
        {
            ErrMsg = "、案次號" + ErrMsg;
            focusAt = fr.txCase;
        }
        if (fr.txCls.value == "")
        {
            ErrMsg = "、分類號" + ErrMsg;
            focusAt = fr.txCls;
        }
        if (fr.txVerNo.value == "") {
            ErrMsg = "、版本別" + ErrMsg;
            focusAt = fr.txCls;
        }
        ErrMsg = ErrMsg.substr(1, ErrMsg.length);

        var ErrName = new Array(1);
        ErrName[0] = ErrMsg;
        alert(FormatStr(jf_GetErrMsg(UnAllowEmpty), ErrName));
        $('#' + focusAt.id).focus();
    }
    return pRtnValue;
}

//分類號空白時，年度/版本onblur時進行互轉
var iCallID_YearVerNo = null;
var CurrentObjId;
function txonblur(argTextBox)
{
	CurrentObjId = argTextBox;
	//年度號
	if (argTextBox == "txYear")
	{
		if (document.all["txYear"].value == "")
		{ return; }
		else
		{
			document.all["txYear"].value = jf_PADL(document.all["txYear"].value, 3, "0");
			jf_GetClassVer("Year");
		}
    }

    if (argTextBox == "txYearN") {
        if (document.all["txYearN"].value == "") { return; }
        else {
            document.all["txYearN"].value = jf_PADL(document.all["txYearN"].value, 3, "0");
        }
    }

	if (argTextBox == "txVerNo")
	{
		if (document.all["txVerNo"].value == "")
		{ return; }
		else
			jf_GetClassVer("VerNo");
		if (document.all["txVerNo"].value !== "")//
        {
            if (document.all["txCls"].value != "")
                CheckClsNo("txCls");
            if (document.all["txClsN"].value != "")
                CheckClsNo("txClsN");
		}
    }
    if (argTextBox == "txVol") {
        //組成完整案次號
        if (document.all["txVol"].value != "") {
            document.all["txVol"].value = jf_PADL(document.all["txVol"].value, 4, "0");

            SetValueToFileCase();
            if (document.all["txVol"].value == "0000") {
                alert(alertTitle + "\n卷次號 不可為0000 ");
                document.all["txVol"].value = "";

                $("#txVol")[0].focus();
            }
            else if (document.all["txYear"].value != "" && document.all["txCls"].value != "" && document.all["txCase"].value != "" && document.all["txVol"].value != "") {
                //修改此段取得案卷名、分類號鍵值
                var VolInfo = AK.AKT330_TAITRA.GetVolInfo(document.all["h_SourceOrgno"].value, document.all["txYear"].value, document.all["H_CLSKEY"].value, document.all["txCase"].value, document.all["txVol"].value);
                if (VolInfo.value[0] != "") {
                    document.all.H_CASEKEY.value = VolInfo.value[0];
                }
                else {
                    alert('該案卷不存在，請重新輸入。');
					$("#txVol")[0].focus();
                }
            }
        }
    }
    if (argTextBox == "txVolN") {
        
        if (document.all["txVolN"].value != "") {
            document.all["txVolN"].value = jf_PADL(document.all["txVolN"].value, 4, "0");
            //組成完整案次號
            SetValueToFileCase("NEW");
            if (document.all["txVolN"].value == "0000") {
                alert(alertTitle + "\n卷次號 不可為0000 ");
                document.all["txVolN"].value = "";

                $("#txVolN")[0].focus();
            }
            else if (document.all["txYearN"].value != "" && document.all["txClsN"].value != "" && document.all["txCaseN"].value != "" && document.all["txVolN"].value != "") {
                //修改此段取得案卷名、分類號鍵值
                var VolInfo = AK.AKT330_TAITRA.GetVolInfo(document.all["h_SourceOrgno"].value, document.all["txYearN"].value, document.all["H_CLSKEY_N"].value, document.all["txCaseN"].value, document.all["txVolN"].value);
                if (VolInfo.value[0] != "") {
                    document.all.H_CASEKEY_N.value = VolInfo.value[0];
                }
                else {
                    alert('該案卷不存在，請重新輸入。');
                    document.all["txVolN"].value = "";
                }
            }
        }
    }
    //國別
    if (argTextBox == "txCountryCode") {
        if (document.all["txCountryCode"].value == "")
            return;
        else
            document.all["txCountryCode"].value = jf_PADR(document.all["txCountryCode"].value, 3, '0');
    }
    //處別
    if (argTextBox == "txOfficeCode") {
        if (document.all["txOfficeCode"].value == "")
            return;
        else
            document.all["txOfficeCode"].value = jf_PADL(document.all["txOfficeCode"].value, 3, '0');
    }
    //細目號/產品別
    if (argTextBox == "txProductCode") {
        if (document.all["txProductCode"].value == "")
            return;
        else
            document.all["txProductCode"].value = jf_PADR(document.all["txProductCode"].value, 3, '0');
    }
    //國別
    if (argTextBox == "txCountryCodeN") {
        if (document.all["txCountryCodeN"].value == "")
            return;
        else
            document.all["txCountryCodeN"].value = jf_PADR(document.all["txCountryCodeN"].value, 3, '0');
    }
    //處別
    if (argTextBox == "txOfficeCodeN") {
        if (document.all["txOfficeCodeN"].value == "")
            return;
        else
            document.all["txOfficeCodeN"].value = jf_PADL(document.all["txOfficeCodeN"].value, 3, '0');
    }
    //細目號/產品別
    if (argTextBox == "txProductCodeN") {
        if (document.all["txProductCodeN"].value == "")
            return;
        else
            document.all["txProductCodeN"].value = jf_PADR(document.all["txProductCodeN"].value, 3, '0');
    }
}
function jf_GetClassVer(argCallFrom)
{
	var strYear = document.all["txYear"].value;
	var strVerNo = document.all["txVerNo"].value;
	var param1 = new Array(3);
	if ((strYear == "" && argCallFrom == "Year") || (strVerNo == "" && argCallFrom == "VerNo"))
		return;
	param1[0] = strYear;
	param1[1] = strVerNo;
	param1[2] = argCallFrom;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetVerYear", false, param1);
	iCallID_YearVerNo = RtnObj.id;
	OnWSResult(RtnObj);
}
// 1110216      Cloud   1101503 補強勾選一筆之後disabled其他勾選框，避免使用者以為可跳號勾選，勾選重排序號則清除勾選-s
//此段不需要，外貿提供多件勾選分件 - 先Mark
//function DisAbledCheckBox(e, argMode) {

//    if (argMode == "RadioButtoWork") {
//        if ($(e.target)[0].id == "rbReSortSeq") {
//            $('input[name*=\"cbChangeVol\"]').prop("checked", false);
//            $('input[name*=\"cbChangeVol\"]').css("opacity", "0.4").prop('disabled', true);
//        }
//        else {
//            $('input[name*=\"cbChangeVol\"]').css("opacity", "").prop('disabled', false);
//        }
//    }
//    else {
//        if (document.all[$(e.target)[0].id].checked == true) {
//            $('input[name*=\"cbChangeVol\"]').css("opacity", "0.4").prop('disabled', true);
//            $(e.target).css("opacity", "").prop('disabled', false);
//            //一併將相同號者打勾
//            var strFileNo = "";
//            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
//                if (document.all["dg1__ctl" + i + "_cbChangeVol"].checked) {
//                    strFileNo = document.all["dg1__ctl" + i + "_lbYear"].textContent;
//                    break;
//                }
//            }
//            for (var i = 2; i <= document.all["dg1"].rows.length; i++) {
//                if (!document.all["dg1__ctl" + i + "_cbChangeVol"].checked && document.all["dg1__ctl" + i + "_lbYear"].textContent==strFileNo) {
//                    document.all["dg1__ctl" + i + "_cbChangeVol"].checked = true;
//                }
//            }

//        }
//        else {
//            $('input[name*=\"cbChangeVol\"]').css("opacity", "").prop('disabled', false);
//            $('input[name*=\"cbChangeVol\"]').prop("checked", false);
//        }
//    }
//}
//補強勾選一筆之後disabled其他勾選框，避免使用者以為可跳號勾選，勾選重排序號則清除勾選-e
function TbOnBlur(argTextBox) {
    
}
function SetValueToFileCase(argType) {
    if (argType !="NEW")
        document.all.txCase.value = document.all.txCountryCode.value + "-" + document.all.txOfficeCode.value + "-" + document.all.txProductCode.value;
    else
        document.all.txCaseN.value = document.all.txCountryCodeN.value + "-" + document.all.txOfficeCodeN.value + "-" + document.all.txProductCodeN.value;
}