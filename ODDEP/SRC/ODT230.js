/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
0980828	Stella	Albert	0980460		檢核預計歸檔日期無誤才PostBack
1020220	Kevin	Kevin	1020032		(國合會)新增檢核延後歸檔天數
1020801 Kevin	Erin	1020537		修正確認後無法正常關閉問題(將onload時第一次call webservice mark掉)
1031112	Leslie	Kevin_C	1020726		於__doPostBack前加上IsServerHandling=true,避免重複執行
1050513 Cloud   Justin  1050087     二代公文修改
1050823 Cloud   Justin  1050087     二代公文修改，第一次變更應歸檔日期時不PostBack,避免變更後執行預覽
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1071005 Kevin   Joe		1071003		修正開啟時Trim鍵值欄位避免後續使用異常
1080514	Cloud	Kevin_C	1080047		修正使用物件錯誤的問題
1080916 Kevin	Kevin_C	1080774		新增撤回功能
1130729 Cloud   Alexander   1130696 新增本次申請延後天數、申請延後次別
1130926 Cloud   Cloud   1130696     修正日期上限未檢核問題
1131104 Cloud   Cloud   1130696     修正日期上限未檢核問題-未考慮空白問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050513 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050513 Justin 1050087 二代公文修改 
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
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
        /*
		case "":
			break;
		*/
    }
}

//1050513 Justin 1050087 二代公文修改 
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

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050513 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btCheck":
            Page_BlockSubmit = false;
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = false;
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = document.all.nUrl.value;
            //strUrl="http://deva.nfa.com.tw/AKD/(12enb545wjtmzgecrsn0ei55)/AKR212.aspx?nMode=Child&SAMLart=ab3abde4-f539-4ce0-92a0-d6db186b10d9";
            //var strUrl = "http://AKR212.aspx?nMode=Child";
            jf_OpenChildWin(strUrl, "AKR212", 700, 500);
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btOpen":
            if (ConfirmOpen())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            Page_BlockSubmit = !CheckBeforSave();
            /*1050513 Justin 1050087 二代公文修改 
			var tbItem = getDropDownListOfToolBar();
			var aOptions = tbItem.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
		    jf_ToolBarSubmit();*/
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (CheckBeforDelete())
            {
                if (jf_ConfirmDelete())
                    SetCanSubmit();
                else
                    SetCanNotSubmit();
            }
            else
            {
                SetCanNotSubmit();
            }
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = false;
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
        case "btSearchFlow":
            Page_BlockSubmit = true;
            if (ConfirmOpen())
            {
                var strDocNo = document.all["txDocNo"].value;
                var strSourceOrgno = document.all.nSourceOrgno.value;
                //var strUrl ="ODI260.aspx?nFrom=ODT230&pDocNo="+strDocNo+"&SAMLart=" + strArtifact;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                var strArtifact = document.all["nArtifact"].value;
                var strUrl = "../../ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=ODT230&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !CheckBeforSave();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforSave();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
			//1080916	Kevin_C	1080774		新增撤回
		case "btBack":
			Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
			jf_ToolBarSubmit(xObjectName);
			break;
    }
}



//###############################################################################
//							Button Click Function
//###############################################################################
//開啟前檢查
function ConfirmOpen()
{
    //1071005	Joe		1071003		開啟前TRIM鍵值，避免後續使用異常
	document.all["txDocNo"].value = document.all["txDocNo"].value.trim();
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforOpen())
            bRtnbool = true;
        else
            bRtnbool = false;
    }
    return bRtnbool;
}

function CheckBeforOpen()
{
    //檢查公文文號txDocNo
    if (!CheckNotEmptyAndAlert("txDocNo", "公文文號"))
        return false;
    //檢查申請日期txTxDate
    //if(!CheckNotEmptyAndAlert("txTxDate","申請日期"))
    //	return false;

    return true;
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
            bRtnbool = true;
        else
            bRtnbool = false;
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	//1080423	Kevin_C	1080047	增加字數檢核
	//1080514	Kevin_C	1080047	修正使用物件錯誤的問題
	//if (!isMaxLength(document.all.txApplyReason,'延後歸檔原因','60'))
	if (!isMaxLength(document.all.txExReason,'延後歸檔原因','60'))
        return false;
    //檢查申請日期txTxDate
    //if(!CheckNotEmptyAndAlert("txTxDate","申請日期"))
    //	return false;
    //檢查本次申請展期天數不能為空白
    if (!CheckNotEmptyAndAlert("txCurrExDays", "預計歸檔日期"))
        return false;
    //檢查延後歸檔原因不能為空白
    if (!CheckNotEmptyAndAlert("txExReason", "延後歸檔原因"))
        return false;

    //0980828	Leslie	檢核輸入之日期是否大於應歸檔日期
    if (!CompareDate())
        return false;

    //0980828	Leslie	檢核是否確實取得正確的傳送對象
    if (!document.all["isGetNewFlow"] || document.all["isGetNewFlow"].value != "Y")
    {
        return txCurrExDays_onchange();
    }

    //檢查是否有設定傳送對象
    /*
	if(document.all.hData_RoleCode.value == "" ||
	document.all.hData_OrgCode.value == "" )
	{
		AlertCustMsg("傳送對象未設定，無法進行傳送");
		return false;
	}
	*/
    return true;
}

//刪除前欄位檢查
function CheckBeforDelete()
{
    //如果目前狀態是已核准,則不允許刪除
    if (document.all.h_UpdateF.value == "1")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已經檔案室確認之延後歸檔申請不能直接刪除"])), "");
        return false;
    }
    return true;

}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;

    return bRtnbool;
}


//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
    //將lbReturnValue的資料帶入適當的欄位
    if (argCallerId == "AKR212")
    {
        document.all["txDocNo"].value = jf_Trim(document.all["lbReturnValue"].options[0].value);
        if (document.all["txDocNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    ShowMsg();
    //1020801  Erin [1020537] mark掉第一次call webservice，避免影響window close無法正常關閉視窗
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    /*
    if (argResult.id == CheckDocNoID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.RtnBool)
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入之文號不存在"])),"");						
				document.all.txDocNo.value = "";
				FocusAt(document.all.txDocNo);
				
			}
		}		
	}	
	*/
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050513 Justin 1050087 二代公文修改 
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}


//###############################################################################
//						Server端Register之Function
//###############################################################################

//Client端物件onblur事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;

	if(document.all.txDocNo.value == "")
		return;
	var arWSParam = new Array(3);
	arWSParam[0] = "TODO_LIST";
	var arFieldName = new Array(2);
	arFieldName[0] = "SOURCE_ORGNO";
	arFieldName[1] = "DOC_NO";
	arWSParam[1] = arFieldName;
	var arFieldValue = new Array(2);
	arFieldValue[0] = document.all.SourceOrgNo.value;
	arFieldValue[1] = document.all.txDocNo.value;
	arWSParam[2] = arFieldValue;
	callObj = jf_CallWS("template/lib/sys.asmx","CheckDataKeyDuplicate",false,arWSParam);
	CheckDocNoID = callObj.id;
	OnWSResult(callObj);	

}
*/
//常用申請理由
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050513 Justin 1050087 二代公文修改 
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txExReason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1050513 Justin 1050087 二代公文修改
    //document.all["txExReason"].focus();
    $('#txExReason').focus();
}

//檢查日期格式並Alert訊息
function txTxDate_onblur()
{
    if (!CheckDate(document.all.txTxDate, "申請日期"))
        //1050513 Justin 1050087 二代公文修改
        //FocusAt(document.all.txTxDate);
        FocusAt(txTxDate);
}

//1020220 Kevin 1020032 用不到Mark
//function txCurrExDays_onblur()
//{
//	if(!CheckDate(document.all.txCurrExDays,"預計歸檔日期"))
//	{
//		FocusAt(document.all.txCurrExDays);
//		return;
//	}
//}

//0980828 Albert 0980460 檢核預計歸檔日期無誤才PostBack
function txCurrExDays_onchange()
{
    var strExDays = jf_Trim(document.all["txCurrExDays"].value);

    //1130729  Alexander   1130696 新增本次申請延後天數、申請延後次別 --避免postback時下次使用未註冊LastOnChangeDate
    //if (strExDays == "")
    //    return false;
	//1130926	Cloud	1130696	不知道為啥要Mark
	if (strExDays == "")
        return false;

    //1020220 Kevin 1020032 CompareDate已經處理
    //if(!CheckDate(document.all.txCurrExDays,"預計歸檔日期"))
    //{
    //	FocusAt(document.all.txCurrExDays);
    //	return false;
    //}

    
    //檢核展期天數是否為數字格式
    if (isNaN(strExDays))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["延後歸檔日期欄位只能輸入數字"])), "");
        return;
    }

    //0980828	Leslie	檢核輸入之日期是否大於應歸檔日期
     
    //1130729  Alexander   1130696 新增本次申請延後天數、申請延後次別 -- 修正未輸入時重複檢核
    //if (!CompareDate())
    //    return false;
    if (strExDays !== "") {
		if (!CompareDate())
            return false;
    }
   
    if (document.all["LastOnChangeDate"]) {
        //1130729  Alexander   1130696 新增本次申請延後天數、申請延後次別
        if (document.all["LastOnChangeDate"].value !== "" && document.all["LastOnChangeDay"].value !== "")
        {
            //1050823 Justin 1050087 二代公文修改，第一次變更應歸檔日期時不PostBack,避免變更後執行預覽
            //if(strExDays == document.all["LastOnChangeDate"].value)
            if (strExDays == document.all["LastOnChangeDate"].value || document.all["LastOnChangeDate"].value == "")
                return true;		//當使用者輸入的日期，與最後一次重取傳送對象的日期相同時，則不再PostBack
        }
    }
    if (document.all["isGetNewFlow"])
        document.all["isGetNewFlow"].value = "N";
    
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
    __doPostBack("txCurrExDays", 0);
}
//1130801  Alexander   1130696 新增本次申請延後天數、申請延後次別 -- 抄上方txCurrExDays_onchange作法
function txExtDay_onchange() {
    var strExtDay = jf_Trim(document.all["txExtDay"].value);
    //1130926 Cloud      1130696     修正日期上限未檢核問題--補上空白不做
    if (strExtDay == "")
        return;

    //檢核展期天數是否為數字格式
    if (isNaN(strExtDay)) {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本次申請延後天數只能輸入數字"])), "");
        return;
    }

    //檢核輸入之日期是否大於應歸檔日期
    if (strExtDay <= 0) {
        //1130926 Cloud     1130696     修正日期上限未檢核問題-調整訊息
        //alert("預計歸檔日期不可小(等)於應歸檔日期!");
        alert("本次申請延後天數不可小(等)於0!");
        document.all["txCurrExDays"].value = "";
        document.all["txExtDay"].value = "";
        return false;
    }
    //1130926 Cloud     1130696    修正未檢核是否超過上限問題
	//1131104	Cloud     1130696    修正未檢核未考慮空白問題
    //if (document.all["MAXEXT_DAYS"] && document.all["MAXEXT_DATE"] && parseInt(strExtDay) > parseInt(document.all["MAXEXT_DAYS"].value)) {
	if (document.all["MAXEXT_DAYS"].value!="" && document.all["MAXEXT_DATE"].value!="" && parseInt(strExtDay) > parseInt(document.all["MAXEXT_DAYS"].value)) {
        alert("歸檔天數超過[" + document.all["MAXEXT_DAYS"].value + "]天需另請專案簽准。");
        $('#txExtDay').focus();
        document.all.txExtDay.value = "";
        document.all.txCurrExDays.value = "";
        return false;
    }
	


    if (document.all["LastOnChangeDay"]) {
        if (document.all["LastOnChangeDate"].value !== "" && document.all["LastOnChangeDay"].value !== "") {
            //當使用者輸入的日期，與最後一次重取傳送對象的日期相同時，則不再PostBack
            if (strExtDay == document.all["LastOnChangeDay"].value || document.all["LastOnChangeDay"].value == "")
                return true;
        }
    }

    if (document.all["isGetNewFlow"])
        document.all["isGetNewFlow"].value = "N";

    // 於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
    __doPostBack("txExtDay", 0);
}

//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName)
{
    document.all[argControlName].disabled = true;
    if (document.all[argControlName].type == "text")
        document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
    document.all[argControlName].disabled = false;
    if (document.all[argControlName].type == "text")
        document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName)
{
    document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName)
{
    document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName)
{
    SetControlDisable(argControlName + "_Text");
    SetControlDisable(argControlName);
}

function SetCombBoxEnable(argControlName)
{
    SetControlEnable(argControlName + "_Text");
    SetControlEnable(argControlName);
}



function FocusAt(argObj)
{
    /*1050509 Justin 1050087 二代公文修改
	if(!argObj.disabled)
	    argObj.focus();*/
    if (!$('#' + argObj)[0].disabled)
        $('#' + argObj).focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj, argObjName)
{
    if (argObj.value != "")
    {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            //FocusAt(argObj);
            return false;
        }
    }
    return true;
}

//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1, argNum2)
{
    if (argNum1 == Math.min(argNum1, argNum2))
        return false;
    else
        return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
    var num = argNumStr;

    if (num.length > 0)
    {
        if (argNumStr.charAt(0) == "0")
            num = argNumStr.substr(1, argNumStr.length - 1);
        if (num.charAt(0) == "0")
            num = StringGetInt(num)
    }
    return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId, argSelectValue)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        //有可能Value的形式為 v1,v2,v3
        if (GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray, argIndex)
{
    var RtnValueArray = argValueArray.split(",");
    return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId, argSelectText)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].Text == argSelectText)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName, argFieldName)
{
    if (document.all[argObjName].value == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
        /*1050513 Justin 1050087 二代公文修改
		FocusAt(document.all[argObjName]);*/
        FocusAt(argObjName);
        return false;
    }
    return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
    //return intRowIndex = event.srcElement.parentElement.rowIndex;   
    var xObjectName = event.srcElement.id;
    return xObjectName.substring(8, xObjectName.indexOf("_", 8));
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
/*1050513 Justin 1050087 二代公文修改
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
}

function getDropDownListOfToolBar()
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		var obj = document.all.tbTool.getItem(i);
		if(obj.getType() == "dropdownlist")
			return obj;
	}
}*/

//合乎Template的Alert
function AlertCustMsg(argMsg)
{
    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argMsg])), "");
}

function SetCanSubmit()
{
    IsServerHandling = true;
    jf_ShowWaitState();
    Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
    Page_BlockSubmit = true;
}

//1020220 Kevin 1020032 調整檢核
var IsCheck = false;

//0980608	Leslie	檢核預計歸檔日期日期是否大於應歸檔日期
function CompareDate()
{
    //1020220 Kevin 1020032 調整檢核
    if (IsCheck)
    {
        IsCheck = false;
        return;
    }
    else
        IsCheck = true;

    if (document.all["isGetNewFlow"])
        document.all["isGetNewFlow"].value = "N";

    var strExDays = jf_Trim(document.all["txCurrExDays"].value);
    var strExFileDate = document.all["txExtFileDate"].value;

    if (!CheckDate(document.all.txCurrExDays, "預計歸檔日期"))
    {
        //1020220 Kevin 1020032 調整檢核
        IsCheck = false;
        document.all.txCurrExDays.value = "";
		//1130926 Cloud     1130696     補上清除天數
		document.all.txExtDay.value = "";
        return false;
    }

    if (strExFileDate >= strExDays)
    {
        alert("預計歸檔日期不可小(等)於應歸檔日期!");
        //1020220 Kevin 1020032 調整檢核
        IsCheck = false;
        document.all.txCurrExDays.value = "";
		//1130926 Cloud     1130696     補上清除天數
		document.all.txExtDay.value = "";

        /*1050513 Justin 1050087 二代公文修改
		document.all.txCurrExDays.focus();*/
        $('#txCurrExDays').focus();
        return false;
    }

    //1020220 Kevin 1020032 新增檢核延後歸檔天數
	//1131104	Cloud	1130696	配合欄位更換型態，調整判斷
    //if (document.all["MAXEXT_SHOWDATE"] && document.all["MAXEXT_DATE"] && strExDays > document.all["MAXEXT_DATE"].value)
	if (document.all["MAXEXT_SHOWDATE"].value!="" && document.all["MAXEXT_DATE"].value!="" && strExDays > document.all["MAXEXT_DATE"].value)
	{
		alert("歸檔期限超過[" + document.all["MAXEXT_SHOWDATE"].value + "]需另請專案簽准。");
		IsCheck = false;
		/*1050513 Justin 1050087 二代公文修改
		document.all.txCurrExDays.focus();*/
		$('#txCurrExDays').focus();
		document.all.txCurrExDays.value = "";
		return false;
	}
    //1020220 Kevin 1020032 調整檢核
    IsCheck = false;

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