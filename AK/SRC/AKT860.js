/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2006.07.21	Ferdy	950634	呼叫CheckID檢核申請人身份證字號前，先檢查第1位為英文，2-8位為數字
 * 2008.07.01	Cola	0970604	新增檢核調用時間不可空白，避免通知書轉出失敗
 * 2010.11.11   Debra   0990547 新增提供附件複製品功能
 * 2016.08.09   Kevin   1050700 弱掃XSS修正
 * 1060504		Joe		1050087	二代系統升級
 * 1061103		Zen		1061071	修正點擊核可多次會收到重複通知之問題
 * 1070412      Zen     1061071 修正檢核失敗後無法postback之問題
 * 1070731      Zen     1070678 弱掃Hardcoded Absolute Path修正
 * 1070830      Zen     1070678 弱掃Ajax修正
 * 1120608      Cloud   1120073 修改如借出複製品不檢核是否輸入應用時間，切換項目時不重製數量
 * 1121030      Cloud   1120862 修正儲存未正確寫入問題
 * 1130930      Jason   1130941 航港局弱掃修正Reflected XSS Specific Clients
 * 1140512      Andy    1140264 新增匯出EXCEL、ODS功能
 * 1150209      Andy    1150104 修正收費資料無法正常顯示的問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070830 Zen 1070678 弱掃Ajax修正
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

//1060504	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060504	Joe	1050087	二代系統升級
    // if (document.all["ValidationSummary1"].textContent != "")
    // alert(document.all["ValidationSummary1"].textContent);
    jf_ShowValidator();
}

//1060504	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060504	Joe	1050087	二代系統升級
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
        case "btKeyHelp": //申請書號查詢
            var pUrl = "";
            pUrl = "AKS501.aspx?"
            if (document.all["dlDept"].selectedIndex != -1)
                pUrl += "k1=" + document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;
            else
                pUrl += "k1=";
            if (document.all["dlUser"].selectedIndex != -1)
                pUrl += "k2=" + document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;
            else
                pUrl += "k2=";
            pUrl += "&k3=&rtnObj=lbReturnValue";
            jf_OpenChildWin(pUrl, "AKI850", 750, 500);
            Page_BlockSubmit = true;
            break;
    }
}

//1060504	Joe	1050087	二代系統升級，傳入參數event
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

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060504	Joe	1050087	二代系統升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = false;
            if (!CheckBeforeSave())
            {
                Page_BlockSubmit = true;
            }
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            var strFileNoSep = document.all.txFileNoSep.value;
            if (jf_ConfirmClean())
            {
                document.all.txPubAddress.value = "";
                document.all.txBehalfAddress.value = "";
                document.all.txProxyAddress.value = "";
                var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1
                var pSubjectAry = new Array(pDg1Len - 1)
                //Clean Value
                if (pDg1Len > 1)
                {
                    var strtxSubject = "";
                    for (var i = 2; i < pDg1Len + 1; i++)
                    {
                        strtxSubject = "dg1__ctl" + i + "_txSubject";
                        document.all[strtxSubject].value = "";
                    }
                }
            }
            document.all.txFileNoSep.value = strFileNoSep;
            //1060504	Joe	1050087	二代系統升級，調整focus寫法
            //document.all.txApplyNo.focus();
            $('#' + document.all.txApplyNo.id).focus();
            Page_BlockSubmit = true;
            break;
        case "btSearch":
            //SAMPLE CODE
            /*
			var strUrl = "";
			xOldKey = document.all["txUserName"].value;
			strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
			*/
            break;
        case "btPrint":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1140512   Andy    1140264 新增匯出EXCEL、ODS功能
        case "btExcel":
        case "btODS":
        case "btInfoOut":
        case "btInfoEdit":
        case "btInfoPrint":
            document.all["BF"].Title = "請選擇轉出檔案所存放的目錄";
            //CAESAR 先MARKE掉
            /*
			if(document.all["BF"].ShowDialog(0) !=0)  //有指定值
			{
				document.all.txClientDLPath.value = document.all["BF"].Path;
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			*/
            //1070731 Zen 1070678 弱掃Hardcoded Absolute Path修正
            //document.all.txClientDLPath.value = "c:\\TEMP";
            //2008.09.11 Add by Cola 新增必需輸入應用時間，否則不可繼續
            //* 1120608      Cloud   1120073 修改如借出複製品不檢核是否輸入應用時間，切換項目時不重製數量
            //if (document.all["txTime"].value == "")
				pEmptyColumn = "";//先清空訊息避免殘留
            if (!CheckTxTime())
            {
                //* 1120608      Cloud   1120073 修改如借出複製品不檢核是否輸入應用時間，切換項目時不重製數量
                //alert('請輸入應用時間');
				alert(pEmptyColumn+"不可空白");
                //1060504	Joe	1050087	二代系統升級，調整focus寫法
                //document.all["txTime"].focus();
                $('#txTime').focus();
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;
            //1060504	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKS501")
    {
        document.all["txApplyNo"].value = document.all["lbReturnValue"].options[0].text;

        //old text change postback
        //document.all["txApplyNoPostBack"].value = document.all["lbReturnValue"].options[0].text;

        //回傳值為鍵值時，觸動TextChange事件
        //__doPostBack();//for .NET Framework 1.0
        //__doPostBack("","");//for .NET Framework 1.1

        //new template submit
        //1060504	Joe	1050087	二代系統升級
        Page_BlockSubmit = false;
        jf_OpenButtonSubmit();
        //1060504	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txApplyNo"].focus();
        $('#txApplyNo').focus();
    }

    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;

}

function ClientOnLoad()
{
    //jf_CallWS("Lib/AK_LIB.asmx", "BubbleFun", false, null);
    SetTot();
    TabChange("1");
    ShowMsg();
    //InsPaperCharge();
    CbPostForOnClick();
    //1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients
    jf_SetSubjectDecode();
}

function OnWSResult(argResult)
{
    if (argResult.id == iCallID_ChkPubAddress)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            if (document.all.txPubAddress.value == "")
            {
                if (argResult.value.RtnField0[0] != "true")
                    document.all.txPubAddress.value = argResult.value.RtnField0[0];
            }
        }
    }
    else if (argResult.id == iCallID_CheckPID)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            if (!argResult.value.RtnBool)
            {
                alert("身分證字號輸入不合法!");
                //1060504	Joe	1050087	二代系統升級，調整focus寫法
                //document.all[Id].focus();
                $('#' + Id).focus();
            }
        }
    }
}

//1000906	Jeff	增加一個參數傳入
//function OnWSResult2(argResult, argObjResult, argObjFocus)
function OnWSResult2(argResult, argHideObj, argObjResult, argObjFocus)
{
    if (argResult.id == iCallID_GetApplyDocInfo)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all[argObjResult].value = argResult.value.Subject;
            //1000906	Jeff	文號欄位只顯示文號，檔號紀錄在隱藏欄位
            document.all[argObjFocus].value = argResult.value.DocNo;
            document.all[argHideObj].value = argResult.value.FileNo;
        }
        else
        {
            //1060504	Joe	1050087	二代系統升級，調整focus寫法
            //document.all[argObjFocus].focus();
            $('#' + argObjFocus).focus();
        }
    }
}

function UserChange(argDeptId, argUserId)
{
    akjf_User2DeptHandle(argDeptId, argUserId);
    if (document.all[argUserId].selectedIndex != -1)
    {
        jf_DropDownListOnClick(argUserId + "_Text", argUserId, argUserId + "_Label");
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060504	Joe	1050087	二代系統升級
    // document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
    document.all[argLabelId].style.display = "none";
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
        {
            // 新增模式需檢查鍵值是否已存在
            if (jf_GetActionMode() == LayoutModeNew)
            {
                if (jf_CheckDataExist())//檢查鍵值是否已存在
                {
                    //所顯示訊息請各自系統自行規劃
                    //以下訊息以檔管系統範例
                    //  
                    //	if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
                    //	bRtnbool = true;
                    //
                }
                else
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
    var bRtnbool = false;

    return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;

    return bRtnbool;
}


//Client端物件OnExit事項檢查範例
/*
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btExit") || (document.activeElement.id == "btExitImg")
	     || (document.activeElement.id == "btCancel") || (document.activeElement.id == "btCancelImg") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	
	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/

function TabChange(argTab)
{
    switch (argTab)
    {
        case "1":
            document.all["DIV1"].className = "";
            document.all["DIV2"].className = "hide";
            document.all["DIV3"].className = "hide";
            break;
        case "2":
            document.all["DIV1"].className = "hide";
            document.all["DIV2"].className = "";
            document.all["DIV3"].className = "hide";
            break;
        case "3":
            document.all["DIV1"].className = "hide";
            document.all["DIV2"].className = "hide";
            document.all["DIV3"].className = "";
            break;
    }
}

var iCallID_ChkPubAddress = null;
var iCallID_CheckPID = null;
var Id = null;
function TbOnBlur(strObjName)
{
    var pIsValid = true;
    var pStr = "";

    if (strObjName == "txApplyDate" || strObjName == "txPubBirth" || strObjName == "txBehalfBirth" || strObjName == "txRcvDate")
    {
        pVal1 = jf_Trim(document.all[strObjName].value);
        if (pVal1 != "")
        {
            document.all[strObjName].value = jf_PADL(pVal1, 7, "0");
            if (!jf_CheckCDATE(pVal1))
            {
                pStr = pStr + "日期格式錯誤：" + pVal1 + "\n\r";
                //1060504	Joe	1050087	二代系統升級，調整focus寫法
                //if (pIsValid) document.all[strObjName].focus();
                if (pIsValid)
                    $('#' + strObjName).focus();
                pIsValid = false;
            }
        }
    }

    if (pStr != "")
    {
        alert(pStr);
        return;
    }

    //95.09.20 David 應應驗證需求，去除驗證身份證字號功能
    /*
	// 身分證字號檢查
	if(strObjName == "txPubId" || strObjName == "txBehalfId")
	{
		Id = strObjName;
		if(document.all[strObjName].value == "")
			return;
		//FERDY NO.950634 檢查第一位為英文，2-8位為數字 #95.07.21
		var re = /[A-Z]{1}[0-9]{9}/;
		var IsValid = re.test(document.all[strObjName].value);
		if( !IsValid )
		{
			alert("身分證字號輸入不合法!");
			document.all[strObjName].focus();
			return;
		} //ferdy end			
		var param = new Array(1);
		param[0] = document.all[strObjName].value;
		callObj = jf_CallWS("lib/AK_LIB.asmx","CheckPID",false,param);
		iCallID_CheckPID = callObj.id;
		OnWSResult( callObj );
	}
	*/

    //自動帶出申請人住址
    if (strObjName == "txPubName" || strObjName == "txPubBirth" || strObjName == "txPubId")
    {
        var KeyName = new Array(3)
        KeyName[0] = "PUB_NAME";
        KeyName[1] = "PUB_BIRTH";
        KeyName[2] = "PUB_ID";

        if (document.all["txPubName"].value == "" || document.all["txPubBirth"].value == "" || document.all["txPubId"].value == "" || document.all["txPubAddress"].value != "") return;
        var KeyValue = new Array(3);
        KeyValue[0] = document.all["txPubName"].value;
        KeyValue[1] = document.all["txPubBirth"].value;
        KeyValue[2] = document.all["txPubId"].value;

        //1050809 Zen 1050700 弱掃XSS修正
        KeyValue[0] = encodeURI(KeyValue[0]);
        KeyValue[1] = encodeURI(KeyValue[1]);
        KeyValue[2] = encodeURI(KeyValue[2]);

        var RtnFldName = new Array(1);
        RtnFldName[0] = "PUB_ADDRESS";
        var OrdFldName = new Array(1);
        OrdFldName[0] = "APPLY_DATE DESC";

        var param = new Array(5);
        param[0] = "APPLY_MAIN";
        param[1] = KeyName;
        param[2] = KeyValue;
        param[3] = RtnFldName;
        param[4] = OrdFldName;

        callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);
        iCallID_ChkPubAddress = callObj.id;
        OnWSResult(callObj);
    }

}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (CheckBeforeSave())
    {
        // 新增模式需檢查鍵值是否已存在
        /*
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist())//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
				bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
		*/
        bRtnbool = true;
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
var pEmptyColumn = "";
var pEmptyColumnFocusValid = true;
function CheckBeforeSave()
{
    var pIsValid = true;
    pEmptyColumn = "";
    pEmptyColumnFocusValid = true;
    HasValue("txApplyDate", "申請日期");
    HasValue("txRcvNo", "收文文號");
    HasValue("txRcvDate", "收文日期");
    HasValue("txPubName", "申請人姓名");
    HasValue("txPubBirth", "申請人出生年月日");
    HasValue("txPubId", "申請人身分證明文件字號");
    HasValue("txPubAddress", "申請人住址");
    //[0970604]Add by Cola 調用時間不可空白，避免通知書轉出時出錯
    //* 1120608      Cloud   1120073 修改如借出複製品不檢核是否輸入應用時間，切換項目時不重製數量
    //HasValue("txTime", "調用時間");
    //* 1121030      Cloud   1120862 修正儲存未正確寫入問題
    //CheckTxtime();
    CheckTxTime();
    
    
    //電話至少需輸入一個
    if (jf_Trim(document.all.txPubHTel.value) == "" && jf_Trim(document.all.txPubOTel.value) == "")
    {
        //if(pEmptyColumn != "") pEmptyColumn +="、";
        pEmptyColumn += "申請人電話(至少需輸入一個)\n\r";
        if (pEmptyColumnFocusValid)
        {
            //1060504	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["txPubHTel"].focus();
            $('#txPubHTel').focus();
            pEmptyColumnFocusValid = false;
        }
    }

    if (jf_Trim(document.all["txBehalfName"].value) != "")
    {
        HasValue("txBehalfBirth", "代理人出生年月日(代理人有輸入時)");
        HasValue("txBehalfId", "代理人身分證明文件字號(代理人有輸入時)");
        HasValue("txBehalfAddress", "代理人住址(代理人有輸入時)");
        //電話至少需輸入一個
        if (jf_Trim(document.all.txBehalfHTel.value) == "" && jf_Trim(document.all.txBehalfOTel.value) == "")
        {
            //if(pEmptyColumn != "") pEmptyColumn +="、";
            pEmptyColumn += "代理人電話(代理人有輸入時至少需輸入一個)\n\r";
            if (pEmptyColumnFocusValid)
            {
                //1060504	Joe	1050087	二代系統升級，調整focus寫法
                //document.all["txBehalfHTel"].focus();
                $('#txBehalfHTel').focus();
                pEmptyColumnFocusValid = false;
            }
        }
        HasValue("txRelation", "代理人與申請人的關係(代理人有輸入時)\n\r");
    }

    //至少需一項申請目的	
    if (!document.all["cbPurpose1"].checked
	 && !document.all["cbPurpose2"].checked
	 && !document.all["cbPurpose3"].checked
	 && !document.all["cbPurpose4"].checked
	 && !document.all["cbPurpose5"].checked
	 && !document.all["cbPurpose6"].checked)
    {
        //if(pEmptyColumn != "") pEmptyColumn +="、";
        pEmptyColumn += "申請目的(至少需勾選一項)\n\r";
        if (pEmptyColumnFocusValid)
        {
            //1060504	Joe	1050087	二代系統升級，調整focus寫法
            //document.all["cbPurpose1"].focus();
            $('#cbPurpose1').focus();
            pEmptyColumnFocusValid = false;
        }
    }
    //申請目的--其他
    if (document.all["cbPurpose6"].checked)
    {
        HasValue("txOtherPurpose", "申請目的-其他(勾選其他項目時)\n\r");
    }

    //申請原件說明(判斷是否有選擇原件)
    var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1
    var strDlApplyView = "";
    var strDlApplyCopy = "";
    var strtxDocNo = "";
    var pHasOrigin = false;  //借原件
    for (var i = 2; i < pDg1Len + 1; i++)
    {
        strDlApplyView = "dg1__ctl" + i + "_dlApplyView";
        strDlApplyCopy = "dg1__ctl" + i + "_dlApplyCopy";
        strtxDocNo = "dg1__ctl" + i + "_txDocNo";

        if (jf_Trim(document.all[strtxDocNo].value) == "") continue;

        if (document.all[strDlApplyView].value == "1") //原件
        {
            pHasOrigin = true;
        }

        if (document.all[strDlApplyView].value == "" && document.all[strDlApplyCopy].value == "") //都沒勾選
        {
            //if(pEmptyColumn != "") pEmptyColumn +="、";
            pEmptyColumn += "明細-序 " + (i - 1) + " (抄錄閱覽、提供複製品至少需選擇一項)\n\r";
            if (pEmptyColumnFocusValid)
            {
                //1060504	Joe	1050087	二代系統升級，調整focus寫法
                //document.all[strDlApplyView].focus();
                $('#' + strDlApplyView).focus();
                pEmptyColumnFocusValid = false;
            }
        }
    }

    if (pHasOrigin)
    {
        HasValue("txOriginReason", "閱覽檔案原件事由(申請原件時)");
    }

    if (pEmptyColumn != "")
    {
        alert("以下欄位不可空白：\n\r" + pEmptyColumn);
        return false
    }

    return true;
}

/*
//開啟前檢查
function CheckBeforeOpen()
{
	var bRtnbool = false;
	var strObjName = "txApplyDate";
	var pIsValid = true;
	pEmptyColumn = "";
	HasValue("txApplyNo","申請書號");
	HasValue("txPubName","申請人姓名");
	HasValue("txPubBirth","申請人出生年月日");
	HasValue("txPubId","申請人身分證明文件字號");
	
	if(pEmptyColumn != "")
	{
		alert("以下欄位不可空白：\n\r" + pEmptyColumn);
		return false
	}
	
	return true;
}
*/

function HasValue(strObjName, strObjDesc)
{
    if (jf_Trim(document.all[strObjName].value) == "")
    {
        //if(pEmptyColumn != "") pEmptyColumn +="、";
        pEmptyColumn += strObjDesc + "\n\r";
        if (pEmptyColumnFocusValid)
        {
            try
            {
                //1060504	Joe	1050087	二代系統升級，調整focus寫法
                //document.all[strObjName].focus();
                $('#' + strObjName).focus();
            }
            catch (e)
            { }
            pEmptyColumnFocusValid = false;
        }
    }
}

function jf_IsWebServiceSuccessNoAlert(argResult)
{
    if (argResult.error)
    {
        alert(argResult.errorDetail.string);
        return false;
    }
    else
    {
        obj = argResult.value;
        if (obj.ErrorClass.IsErr)
        {
            if (obj.ErrorClass.IsRedirect)
            {
                jf_RedirectToCustomErrPage();
                return false;
            }
            else
                return true;
        }
    }
    return true;
}


//設定合計
function SetTot()
{
    var pTotal = 0;
    var pDg1Len = document.all.dg2.rows.length;  //with header
    for (var i = 2; i < pDg1Len + 1; i++)
    {
        var strTxPrices = "dg2__ctl" + i + "_txPrices";
        var strTxUnitCost = "dg2__ctl" + i + "_txUnitCost";
        var strTxUnitCount = "dg2__ctl" + i + "_txUnitCount";
        if (document.all[strTxUnitCost].value != "" && document.all[strTxUnitCount].value != "")
            pTotal += parseFloat(document.all[strTxPrices].value);
    }

    if (!isNaN(pTotal))
        document.all.txTotal.value = RoundNum(pTotal, 1);

}

//將 num 取小數 dp位 (四捨五入)  **最多14位，超過會錯
function RoundNum(num, dp)
{
    var sh = Math.pow(10, dp)
    return Math.round(num * sh) / sh
}

function dlChargeNoOnChange(argSeq)
{
    var strTxUnitCost = "dg2__ctl" + argSeq + "_txUnitCost";
    var strDlChargeNo = "dg2__ctl" + argSeq + "_dlChargeNo";
    var strTxChargeUnit = "dg2__ctl" + argSeq + "_txChargeUnit";
    var strTxPrices = "dg2__ctl" + argSeq + "_txPrices";
    var strTxUnitCount = "dg2__ctl" + argSeq + "_txUnitCount";
    var pTemp = document.all[strDlChargeNo].options[document.all[strDlChargeNo].selectedIndex].value;

    if (pTemp == "")
    {
        document.all[strTxPrices].value = "0";
        document.all[strTxUnitCost].value = "";
        document.all[strTxChargeUnit].value = "";
        document.all[strTxUnitCount].value = "1";
        SetTot();//[0970604]Add by Cola 此種情況下也進行計算
        return;
    }

    var pTempAry = pTemp.split(',');  //charge_no,unitCost,ChargeUnit,is_variable

    document.all[strTxUnitCost].value = pTempAry[1];
    document.all[strTxChargeUnit].value = pTempAry[2];
    //* 1120608      Cloud   1120073 修改如借出複製品不檢核是否輸入應用時間，切換項目時不重製數量
    //document.all[strTxUnitCount].value = "1"; //預設值

    if (pTempAry[3] == "1")  //非固定費用 -> 開放金額輸入
    {
        document.all[strTxPrices].readOnly = false;
        document.all[strTxPrices].style.backgroundColor = "FFFFFF";
    }
    else
    {
        document.all[strTxPrices].readOnly = true;
        document.all[strTxPrices].style.backgroundColor = "LightGrey";
    }

    if (!isNaN(parseFloat(document.all[strTxUnitCost].value)))  //金額=單價*數量
        document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);

    SetTot();
}


function TxUnitCountOnBlur(argSeq)
{
    var strTxUnitCount = "dg2__ctl" + argSeq + "_txUnitCount";
    var strTxPrices = "dg2__ctl" + argSeq + "_txPrices";
    var strTxUnitCost = "dg2__ctl" + argSeq + "_txUnitCost";
    if (document.all[strTxUnitCount].value == "")
        document.all[strTxUnitCount].value = "1"; //預設值

    if (isNaN(parseFloat(document.all[strTxUnitCount].value)) || parseFloat(document.all[strTxUnitCount].value) <= 0)
    {
        alert("請輸入大於0的數字");
        //1060504	Joe	1050087	二代系統升級，調整focus寫法
        //document.all[strTxUnitCount].focus();
        $('#' + strTxUnitCount).focus();
        return;
    }
    if (!isNaN(parseFloat(document.all[strTxUnitCost].value)))  //金額=單價*數量
        document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);
    SetTot();
}


function TxPricesOnBlur(argSeq)
{
    var strTxPrices = "dg2__ctl" + argSeq + "_txPrices";

    if (isNaN(document.all[strTxPrices].value))
    {
        alert("請輸入數字");
        //1060504	Joe	1050087	二代系統升級，調整focus寫法
        //document.all[strTxPrices].focus();
        $('#' + strTxPrices).focus();
        return;
    }

    SetTot();
}
//只允許輸入數字與","
function jf_InpNumAndCommaOnly()
{
    //只有 數字 & 逗號(44) 允許輸入
    if (((event.keyCode < 48) || (event.keyCode > 57)) && (event.keyCode != 44))
    {
        event.returnValue = false;
    }
}

//檢查駁回原因的輸入值
function txRejectCodeOnBlur(argSeq)
{
    var strObjName = "dg1__ctl" + argSeq + "_txRejectCode";
    var pTemp = jf_Trim(document.all[strObjName].value);
    if (pTemp.substr(pTemp.length - 1, pTemp.length) == ",")
        pTemp = pTemp.substr(0, pTemp.length - 1);
    document.all[strObjName].value = pTemp;
    if (pTemp == "") return;
    if (!CheckInputCode(pTemp))
    {
        //1060504	Joe	1050087	二代系統升級，調整focus寫法
        //document.all[strObjName].focus();
        $('#' + strObjName).focus();
        return;
    }

    //檢查輸入代碼只能為1-8
    if (!CheckInputRejectCode(pTemp))
    {
        //1060504	Joe	1050087	二代系統升級，調整focus寫法
        //document.all[strObjName].focus();
        $('#' + strObjName).focus();
        return;
    }
}

function CheckInputRejectCode(argStr)
{
    var pTempAry = argStr.split(',');
    for (var i = 0; i < pTempAry.length; i++)
    {
        if (pTempAry[i] < "1" || pTempAry[i] > "8")
        {
            alert('駁回原因代碼需介於1-8');
            return false;
        }

        for (var j = i + 1; j < pTempAry.length; j++)
        {
            if (pTempAry[i] == pTempAry[j])
            {
                alert('駁回原因代碼重覆輸入：' + pTempAry[i]);
                return false;
            }
        }
    }
    return true;
}

//檢查遮掩頁次的輸入值
function txRejectPageOnBlur(argSeq)
{
    var strObjName = "dg1__ctl" + argSeq + "_txRejectPage";
    var pTemp = jf_Trim(document.all[strObjName].value);
    if (pTemp.substr(pTemp.length - 1, pTemp.length) == ",")
        pTemp = pTemp.substr(0, pTemp.length - 1);
    document.all[strObjName].value = pTemp;
    if (pTemp == "") return;

    if (!CheckInputCode(pTemp))
    {
        //1060504	Joe	1050087	二代系統升級，調整focus寫法
        //document.all[strObjName].focus();
        $('#' + strObjName).focus();
    }
}

function CheckInputCode(argStr)
{
    for (var i = 0; i < argStr.length; i++)
    {
        var pCode = argStr.charCodeAt(i);
        if ((pCode < 48 || pCode > 57) && pCode != 44)
        {
            alert("輸入值包含不合法字元，請修正。需輸入多個值時，請以逗號(,)區隔。");
            return false;
        }
    }
    return true;
}

var iCallID_GetApplyDocInfo = null;
function txDocNoOnBlur(argSeq)
{
    //自動帶出主旨/案名
    var strTxDocNo = "dg1__ctl" + argSeq + "_txDocNo";
    var strTxSubject = "dg1__ctl" + argSeq + "_txSubject";
    //1000906	Jeff	多設一隱藏欄位紀錄檔號
    var strTxDocFileNo = "dg1__ctl" + argSeq + "_txDocFileNo";
    var pTemp = jf_Trim(document.all[strTxDocNo].value);
    //2010.11.11   Debra   0990547 新增提供附件複製品功能--START
    var dlApplyAttachCopy1 = "dg1__ctl" + argSeq + "_dlApplyAttachCopy";
    var dlApproveAttachCopy1 = "dg1__ctl" + argSeq + "_dlApproveAttachCopy";

    //1070830 Zen 1070678 弱掃Ajax修正
    //var strMediaType = AKT860.GetAttCopy(pTemp, argSeq).value;
    var strMediaType = AK.AKT860.GetAttCopy(pTemp, argSeq).value;

    if (strMediaType != "" && document.all["txApplyNo"].value != "")//有媒體
    {
        document.all[dlApplyAttachCopy1].disabled = false;
        document.all[dlApproveAttachCopy1].disabled = false;
    }
    else if (strMediaType == "" && document.all["txApplyNo"].value == "")//for 新增 無附件媒體
    {
        document.all[dlApplyAttachCopy1].disabled = true;
        document.all[dlApproveAttachCopy1].disabled = true;
    }
    else if (strMediaType == "" && document.all["txApplyNo"].value != "")//無附件媒體
    {
        document.all[dlApplyAttachCopy1].disabled = true;
        document.all[dlApproveAttachCopy1].disabled = true;
    }
    else if (strMediaType != "" && document.all["txApplyNo"].value == "")//for 新增 有附件媒體
    {
        document.all[dlApplyAttachCopy1].disabled = false;
        document.all[dlApproveAttachCopy1].disabled = false;
    }

    //end
    if (pTemp == "") return;
    var pTempAry = pTemp.split(document.all["txFileNoSep"].value);
    var param = new Array(6);
    if (pTempAry.length == 5) //檔號
    {
        param[0] = "";
        param[1] = pTempAry[0];
        param[2] = pTempAry[1];
        param[3] = pTempAry[2];
        param[4] = pTempAry[3];
        param[5] = pTempAry[4];
    }
    else  //文號
    {
        param[0] = pTemp;
        param[1] = "";
        param[2] = "";
        param[3] = "";
        param[4] = "";
        param[5] = "";
    }

    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetApplyDocInfo", false, param);
    iCallID_GetApplyDocInfo = callObj.id;
    //1000906	Jeff	增加一個參數傳入
    //OnWSResult2( callObj ,strTxSubject, strTxDocNo);
    OnWSResult2(callObj, strTxDocFileNo, strTxSubject, strTxDocNo);

}

function DownLoadFile()
{
    var xdnFile = document.all["dnFile"];

    xdnFile.ServerName = document.all.txServerIP.value;
    xdnFile.Port = document.all.txServerPort.value;
    var strFile = "";
    try
    {
        strFile = document.all.txFile.value;
    }
    catch (e) { }
    xdnFile.addItem(strFile)

    if (xdnFile.download() == 0)
    {
        xdnFile.resetItem();
        window.status = "下載完畢!";
    }
    else
    {
        xdnFile.resetItem();
        alert("下載失敗!\n" + xdnFile.ErrorString);
        window.status = "下載失敗!";
    }
    Page_BlockSubmit = true;
}


function dlApplyCopyOnChange(argSeq)
{
    var strDlApplyCopy = "dg1__ctl" + argSeq + "_dlApplyCopy";
    var pVal = document.all[strDlApplyCopy].options[document.all[strDlApplyCopy].selectedIndex].value;
    if (pVal == "紙本")
        InsPaperCharge();
}

function dlApproveCopyOnChange(argSeq)
{
    var strDl = "dg1__ctl" + argSeq + "_dlApproveCopy";
    var pVal = document.all[strDl].options[document.all[strDl].selectedIndex].text;
    if (pVal == "紙本")
        InsPaperCharge();
}

//新增一筆A4影印費用
//1.若已存在則Update該筆, 不存在則新增
//2.A4影印費用固定為費用種類的第一筆 -> selectedIndex = 1
function InsPaperCharge()
{
    //取得總影印頁數
    var pPageCnt = GetTotalPageToPrint();
    if (isNaN(pPageCnt))
        pPageCnt = 0;

    var pDgLen = document.all.dg2.rows.length;  //with header
    var pEmptyColIdx = -1; //第一個空白列

    //先搜尋是否有A4影印費用
    for (var i = 2; i < pDgLen + 1; i++)
    {
        var strTxPrices = "dg2__ctl" + i + "_txPrices"; //價格
        var strTxUnitCost = "dg2__ctl" + i + "_txUnitCost"; //單價
        var strTxUnitCount = "dg2__ctl" + i + "_txUnitCount"; //數量
        var strDlChargeNo = "dg2__ctl" + i + "_dlChargeNo";
        //var strTxChargeUnit = "dg2__ctl"+argSeq+"_txChargeUnit";   //頁

        if (document.all[strDlChargeNo].selectedIndex == 0 && pEmptyColIdx == -1)
        {
            pEmptyColIdx = i;
        }

        if (document.all[strDlChargeNo].selectedIndex == 1) //找到A4影印費用
        {
            document.all[strTxUnitCount].value = pPageCnt;
            document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);
            SetTot();
            return;
        }
    }

    //沒有找到A4影印費用，且無空白欄位可填 -> 顯示警告訊息
    if (pEmptyColIdx == -1)
    {
        alert("收費項目已滿，無法新增收費項目「A4影印費用」");
        return;
    }

    //沒有找到A4影印費用，且有空白欄位可填 -> 新增一筆
    if (pEmptyColIdx != -1)
    {
        var strTxPrices = "dg2__ctl" + pEmptyColIdx + "_txPrices"; //價格
        var strTxUnitCost = "dg2__ctl" + pEmptyColIdx + "_txUnitCost"; //單價
        var strTxUnitCount = "dg2__ctl" + pEmptyColIdx + "_txUnitCount"; //數量
        var strDlChargeNo = "dg2__ctl" + pEmptyColIdx + "_dlChargeNo";

        document.all[strDlChargeNo].selectedIndex = 1;
        dlChargeNoOnChange(pEmptyColIdx);

        document.all[strTxUnitCount].value = pPageCnt;	//Fix by Leslie	nPageCnd → pPageCnt
        document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);
        SetTot();
        return;
    }
}

//新增一筆郵寄費用
//1.若已存在則Update該筆, 不存在則新增
//2.郵寄費用固定為費用種類的第二筆 -> selectedIndex = 2
function InsMailCharge()
{
    var pDgLen = document.all.dg2.rows.length;  //with header
    var pEmptyColIdx = -1; //第一個空白列

    //先搜尋是否有A4影印費用
    for (var i = 2; i < pDgLen + 1; i++)
    {
        var strTxPrices = "dg2__ctl" + i + "_txPrices"; //價格
        var strTxUnitCost = "dg2__ctl" + i + "_txUnitCost"; //單價
        var strTxUnitCount = "dg2__ctl" + i + "_txUnitCount"; //數量
        var strDlChargeNo = "dg2__ctl" + i + "_dlChargeNo";
        //var strTxChargeUnit = "dg2__ctl"+argSeq+"_txChargeUnit";   //頁
        //1150209   Andy    1150104     修正收費資料無法正常顯示於報表的問題-新增判斷是否為郵寄收費項目
        var strDlIsMail = document.all[strDlChargeNo].value.split(',')[4];

        if (document.all[strDlChargeNo].selectedIndex == 0 && pEmptyColIdx == -1)
        {
            pEmptyColIdx = i;
        }

        //1150209   Andy    1150104     修正收費資料無法正常顯示於報表的問題
        for (var j = 0; j < document.all[strDlChargeNo].length; j++) {
            if (document.all[strDlChargeNo].options[j].value.split(',')[4] == "Y")
                document.all[strDlChargeNo].options[j].style.display = "";
        }

        //1150209   Andy    1150104     修正收費資料無法正常顯示於報表的問題
        //if (document.all[strDlChargeNo].selectedIndex == 2) //找到郵寄費用
        if (strDlIsMail == "Y") //找到郵寄費用
        {
            document.all[strTxUnitCount].value = "1"; //郵寄單位給1
            document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);
            SetTot();
            return;
        }
    }

    //沒有找到，且無空白欄位可填 -> 顯示警告訊息
    if (pEmptyColIdx == -1)
    {
        alert("收費項目已滿，無法新增收費項目「郵寄費用」");
        return;
    }

    //沒有找到，且有空白欄位可填 -> 新增一筆
    if (pEmptyColIdx != -1)
    {
        var strTxPrices = "dg2__ctl" + pEmptyColIdx + "_txPrices"; //價格
        var strTxUnitCost = "dg2__ctl" + pEmptyColIdx + "_txUnitCost"; //單價
        var strTxUnitCount = "dg2__ctl" + pEmptyColIdx + "_txUnitCount"; //數量
        var strDlChargeNo = "dg2__ctl" + pEmptyColIdx + "_dlChargeNo";

        //1150209   Andy    1150104     修正收費資料無法正常顯示於報表的問題
        //document.all[strDlChargeNo].selectedIndex = 2;
        //dlChargeNoOnChange(pEmptyColIdx);

        //document.all[strTxUnitCount].value = "1"; //郵寄單位給1
        //document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);
        //SetTot();
        //return;

        for (var j = 0; j < document.all[strDlChargeNo].length; j++) {
            strDlChargeNo = "dg2__ctl" + pEmptyColIdx + "_dlChargeNo";
            if (document.all[strDlChargeNo].options[j].value.split(',')[4] == "Y") {
                document.all[strDlChargeNo].selectedIndex = j;
                dlChargeNoOnChange(pEmptyColIdx);

                document.all[strTxUnitCount].value = "1"; //郵寄單位給1
                document.all[strTxPrices].value = parseFloat(document.all[strTxUnitCost].value) * parseFloat(document.all[strTxUnitCount].value);
                SetTot();

                pEmptyColIdx++;
                if (pEmptyColIdx > 12) {
                    alert("收費項目已滿，無法繼續新增收費項目「郵寄費用」");
                    return;
                }
            }
        }
    }
}

function DelMailCharge()
{
    var pDgLen = document.all.dg2.rows.length;  //with header
    var pEmptyColIdx = -1; //第一個空白列

    //先搜尋是否有A4影印費用
    for (var i = 2; i < pDgLen + 1; i++)
    {
        var strTxPrices = "dg2__ctl" + i + "_txPrices"; //價格
        var strTxUnitCost = "dg2__ctl" + i + "_txUnitCost"; //單價
        var strTxUnitCount = "dg2__ctl" + i + "_txUnitCount"; //數量
        var strDlChargeNo = "dg2__ctl" + i + "_dlChargeNo";
        //var strTxChargeUnit = "dg2__ctl"+argSeq+"_txChargeUnit";   //頁
        //1150209   Andy    1150104     修正收費資料無法正常顯示於報表的問題-新增判斷是否為郵寄收費項目
        var strDlIsMail = document.all[strDlChargeNo].value.split(',')[4];
        for (var j = 0; j < document.all[strDlChargeNo].length; j++) {
            if (document.all[strDlChargeNo].options[j].value.split(',')[4] == "Y")
                document.all[strDlChargeNo].options[j].style.display = "none";
        }

        //1150209   Andy    1150104     修正收費資料無法正常顯示於報表的問題
        //if (document.all[strDlChargeNo].selectedIndex == 2) //郵寄費用
        if (strDlIsMail == "Y") //郵寄費用
        {
            document.all[strDlChargeNo].selectedIndex = 0;
            dlChargeNoOnChange(i);
            document.all[strTxPrices].value = "0";
        }
    }
}

function CbPostForOnClick()
{
    if (document.all.cbPostFor.checked)
        InsMailCharge();
    else
        DelMailCharge();
}

function GetTotalPageToPrint()
{
    var pDgLen = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1
    var strtxApproveCnt = "";
    var strdlApproveCopy = "";
    var nPageCnt = 0;

    for (var i = 2; i < pDgLen + 1; i++)
    {
        strtxApproveCnt = "dg1__ctl" + i + "_txApproveCnt";
        strdlApproveCopy = "dg1__ctl" + i + "_dlApproveCopy";

        if (document.all[strdlApproveCopy].options[document.all[strdlApproveCopy].selectedIndex].text == "紙本")
        {
            try
            {
                parseInt(document.all[strtxApproveCnt].value, 10)
            }
            catch (e)
            {
                document.all[strtxApproveCnt].value = "0";
            }
            nPageCnt += parseInt(document.all[strtxApproveCnt].value);
        }
    }

    return nPageCnt;
}

function txApproveCntOnBlur(argSeq)
{
    dlApproveCopyOnChange(argSeq);
}
//1120608 Cloud	1120073	修改複製品借出 不需應用時間
function CheckTxTime()
{
    var CheckTxtime = false;
    var pDg1Len = document.all.dg1.rows.length;  //有header,筆數為實際筆數+1
    for (var i = 2; i < pDg1Len + 1; i++) {

        if (jf_Trim(document.all["dg1__ctl" + i + "_txDocNo"].value) == "") continue;

        if (document.all["dg1__ctl" + i + "_dlApproveView"].value == "1") //核准時有原件-則須輸入調用時間
        {
            CheckTxtime = true;
            break;
        }
    }
    if (CheckTxtime)
    {
        HasValue("txTime", "調用時間(申請原件時)");
    }
	if(pEmptyColumn!="")
		return false;
	else
		return true;
}
//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients--S
function jf_SetSubjectDecode() {
    for (var isubject = 2; isubject <= document.all.dg1.rows.length; isubject++) {
        jf_htmlDecode("dg1__ctl" + isubject + "_txSubject");
    }
}
function jf_htmlDecode(argId) {
    var tempVal = document.all[argId].textContent;
    if (tempVal != "") {
        var div = document.createElement('div');
        div.innerHTML = tempVal;
        document.all[argId].textContent = div.textContent;
    }
}

//1130930   Jason   1130941     航港局弱掃修正Reflected XSS Specific Clients--E