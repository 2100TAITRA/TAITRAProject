/*
DATE	SA		PRG		MGR_NO			DESC
0980219	Yvonne	Albert	0971022			增加"識別碼"欄位，並依DL_HAS_DOCHASH判斷是否顯示此欄位
1000225 Leslie  Davis   0991043         新增"受文機關"搜尋條件
1000425	David	David	1000108			避免快顯封鎖，調整打包下載邏輯，改由呼叫DLI300處理
1000714 David   Kevin   1000587         網址參數(機關名稱)加入Escape避免亂碼
1001118 David   Kevin   1000771         附件下載區外網支援多重瀏覽器
1001121 David   Kevin   1000771         附件下載區外網加入檢核DL_HAS_DOCHASH以及發文日期
1020604	Kevin	Kevin	1020341			將發文日期、識別碼檢核檢核獨立設定
1031112	Leslie	Kevin_C	1020726			於__doPostBack前加上IsServerHandling=true,避免重複執行
1040617	Cloud	Kevin_C	1040485			外網也要小日曆
1041130 Cloud	Kevin_C	1040871			修正選擇發布單位無效的問題
1050511 Cloud   Zen     1050087         二代公文修改
1051004 Cloud   Cloud   1050087         二代公文修改
1051019	Leslie	Joe		1050087		    二代修改配合行動平台
1060407 Leslie  Cloud   1060160         增加傳入Key值
1070108 Cloud   Zen     1060262         (北榮)增加發文日期提示文字
1080522 Leslie	Kevin	1080366			 外網關閉Script InLine
1080904 Kevin	Kevin	1080539			修正內網不會跳出錯誤訊息問題
1091119	Leslie	Zen     1090885         停用網址列權杖避免滲透弱點
1110819 Zen     Zen     1101478         (考試院)UI調整及新增驗證碼功能
1130815 Kevin   Cloud   1130747         調整DG介面
1130906 Kevin   Cloud   1130747         內網不須做驗證
1140206 Zen     Zen     東工序21        修正不含總收角色之帳號開啟錯誤之問題
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
//1050511 Zen 1050087 二代公文修改--begin
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//var txSubject = 1;
//var txIssueNo = 5;
//var txStartIssueDate = 7;
//var txEndIssueDate = 9;
//var txPageCntSet =1;
//var txViewPage =11;
//var ddlDept = 3;
var txSubject = 'txSubject';
var txIssueNo = 'txIssueNo';
var txStartIssueDate = 'txStartIssueDate';
var txEndIssueDate = 'txEndIssueDate';
var txPageCntSet = 'txPageCntSet';
var txViewPage = 'txViewPage';

//0980220 Albert 0971022 新增識別碼欄位，ID設定為11
var txIdentifyCode = 'txIdentifyCode';
//[0991043] davis 新增"受文機關"搜尋條件，ID設定為13
var txOrgName = 'txOrgName';
//1050511 Zen 1050087 二代公文修改--end

//1080522 Kevin 1080366 外網關閉Script InLine
//ToolBarEventHandle();

var KeyObjectArr = new Array();
var MesgArr = new Array();
var FieldNameArr = new Array();
var Page_Validators = new Array(document.getElementById("Validator"));

var theForm = document.forms['DLMI100'];
if (!theForm)
{
	theForm = document.DLMI100;
}

//1080904 Kevin 1080539 修正內網不會跳出訊息問題
if (document.all.ValidationSummary1.textContent != "無" && document.all.ValidationSummary1.textContent != "")
    alert(document.all.ValidationSummary1.textContent);

//1110819 Zen 1101478 (考試院)UI調整及新增驗證碼功能
 //1110928 Leslie  增修因AjaxPro無法通過資安設定環境下的替代方案，全都改成WebService處理
/*AjaxPro.Request.prototype.timeout = function ()
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
}*/

//1110819 Zen 1101478 (考試院)UI調整及新增驗證碼功能
let objCaptcha = null;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
	//1080522 Kevin 1080366 外網關閉Script InLine
	document.all.btOutSearch.onclick = btSearchss;
	document.all.DLMI100.onsubmit = function () { return WebForm_OnSubmit() };
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //0980301 Albert 0971022 設定為0，讓server可以判斷是否按下enter
    document.all["H_tbToolFlag"].value = "0";
    document.all["H_tbSelectFlag"].value = "0";

    //1001118 Kevin [1000771] 依內外網隱藏物件
    if (document.all["H_FromOutside"].value == "Y") {
        document.all["btOutSearch"].style.cssText = "Z-INDEX: 0";
		//1051004 Cloud   Cloud   1050087         二代公文修改
        //document.all["FieldSet"].style.cssText = "Z-INDEX: 0; DISPLAY: none";
        //1070108 Zen 1060262 移除無用設定
        //document.all["txOutIssueNo"].style.cssText = "WIDTH: 76px";
        //document.all["txOutDate"].style.cssText = "WIDTH: 55px";
        //document.all["txOutIdentifyCode"].style.cssText = "WIDTH: 76px";
    }
    else {
        document.all["btOutSearch"].style.cssText = "Z-INDEX: 0; DISPLAY: none";
        //1050511 Zen 1050087 二代公文修改
        //document.all["FieldSet"].style.cssText = "Z-INDEX: 0";
		//1080522 Kevin 1080366 外網關閉Script InLine
		ToolBarEventHandle();
    }
    //1001118 Kevin [1000771] 外網事件
    if (document.all["H_OutSideMes"].value != "") {
        alert(document.all["H_OutSideMes"].value);
        document.all["H_OutSideMes"].value = "";
    }

    //1110819 Zen 1101478 (考試院)UI調整及新增驗證碼功能
    //1130815   Cloud   1130747         調整DG介面-內網不需要MARK
    //RefreshCaptcha();

    $('.ui-datepicker-trigger').css('vertical-align', 'top');
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
	//1080522 Kevin 1080366 外網關閉Script InLine
	if (!e)
		return;
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_Imagebutton2"));
    var btImagebutton2;
    var ObjAttachInfoId;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_Imagebutton2"] != null)
        btImagebutton2 = document.all["dg1__ctl" + pNo + "_Imagebutton2"].id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case "btSearchs":
            jf_SaveButtonType("btSearch");
            Page_BlockSubmit = false;
            break;
        case btImagebutton2:
            //1000425 David 1000108 避免快顯封鎖，打包下載改由DLI300處理
            ObjAttachInfoId = document.all["dg1__ctl" + pNo + "_H_AttachInfoId"].innerText;
            var strDocNo = document.all["dg1__ctl" + pNo + "_tbdgIssueNo"].innerText;
            /*document.all["H_IssueNo"].value = document.all["dg1__ctl" + pNo + "_tbdgIssueNo"].innerText;
			Page_BlockSubmit = !jf_SaveAttachId(ObjAttachInfoId);
			jf_SaveButtonType("DownLoad");*/
            Page_BlockSubmit = true;
            if (ObjAttachInfoId != null || ObjAttachInfoId != "") {
                Download(ObjAttachInfoId, strDocNo);
            }
            break;
    }
}

//1001118 Kevin [1000771] 更改外網以POSTBACK處理
function btSearchss() {
    var strErMsg = "";

    if (document.all["txOutIssueNo"].value == "") {
        strErMsg += "發文號";
        //1050511 Zen 1050087 二代公文修改$('#')
        //document.all["txOutIssueNo"].focus();
        $('#txOutIssueNo').focus();
    }
    //1020604 Kevin 1020341 將發文日期、識別碼檢核檢核獨立設定
    //if((document.all["H_DocHash"].value=="Y") && (document.all["txOutDate"].value == ""))
    if (document.all["DL_HAS_ISSUEDATE"] && (document.all["DL_HAS_ISSUEDATE"].value != "N") && (document.all["txOutDate"].value == "")) {
        if (strErMsg != "")
            strErMsg += "、";

        strErMsg += "發文日期";
        //1050511 Zen 1050087 二代公文修改$('#')
        //document.all["txOutIssueNo"].focus();
        $('#txOutIssueNo').focus();
    }
    if ((document.all["H_DocHash"].value == "Y") && (document.all["txOutIdentifyCode"].value == "")) {
        if (strErMsg != "")
            strErMsg += "、";

        strErMsg += "識別碼";
        //1050511 Zen 1050087 二代公文修改$('#')
        document.all["txOutIdentifyCode"].focus();
        $('#txOutIdentifyCode').focus();
    }

    //1110819 Zen 1101478 (考試院)UI調整及新增驗證碼功能
    //1130906 Cloud   1130747         內網不須做驗證
    //1140206 Zen 東工序21 修正不含總收角色之帳號開啟錯誤之問題，還原相關邏輯
    var strVerifyMsg = '';
    if (document.all['btOutVerify'].className != 'hide')
    {
        let txOutVerify = document.all['txOutVerify'].value;
        if (txOutVerify == '')
		{
			if (strErMsg != "")
				strErMsg += "、";
			
            strErMsg += "驗證碼";
		}
        else
        {
             //1110928 Leslie  增修因AjaxPro無法通過資安設定環境下的替代方案，全都改成WebService處理
            //var result = DL1.DLMI100.VerifyCaptcha(txOutVerify, objCaptcha.value.strKey);
            var params = new SOAPClientParameters();
            params.add('argCHV', txOutVerify);
            params.add('argKey', objCaptcha.value.strKey);
            var result = SOAPClient.invokeJSON('/DL/DLLIB/DLWS.asmx', "VerifyCaptcha", params, false, null)
            if (result.value.bIsValid == false)
            {
                strVerifyMsg += "\n驗證失敗";
                RefreshCaptcha();
            }
        }
    }

    if (strErMsg + strVerifyMsg != "") 
	{
		if(strErMsg != '')
			strErMsg += "為必要欄位\n";
		
        alert(strErMsg + strVerifyMsg);
        return;
    }

    jf_SaveButtonType("btSearch");
    Page_BlockSubmit = false;
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
    __doPostBack('tbSelect', '');
}

function jf_SaveAttachId(ObjAttachInfoId) {
    var Rtnbool = false;
    if (ObjAttachInfoId != null || ObjAttachInfoId != "") {
        document.all["H_loadAttachId"].value = ObjAttachInfoId;
        Rtnbool = true;
    }
    return Rtnbool;
}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_SaveButtonType(ButtonType) {
    document.all.H_ButtonType.value = ButtonType;
}

//1050511 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1050511 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckBeforSearch();
            jf_SaveButtonType(xObjectName);
            //1050511 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btChangePage":
            Page_BlockSubmit = !jf_CheckBeforGo("Change");
            jf_SaveButtonType(xObjectName);
            //1050511 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btFirst":
            Page_BlockSubmit = !jf_CheckBeforGo("First");
            jf_SaveButtonType(xObjectName);
            //1050511 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforGo("Preview");
            jf_SaveButtonType(xObjectName);
            //1050511 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btNext":
            Page_BlockSubmit = !jf_CheckBeforGo("Next");
            jf_SaveButtonType(xObjectName);
            //1050511 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btLast":
            Page_BlockSubmit = !jf_CheckBeforGo("Last");
            jf_SaveButtonType(xObjectName);
            //1050511 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
//搜尋前之欄位檢查
function jf_CheckBeforSearch() {
    var bRtn = true;
    var strSAMLart = "";
    //1091119 Zen 1090885 停用網址列權杖避免滲透弱點
    //strSAMLart = GetParam("SAMLart");
    strSAMLart = document.all['H_txArtifact'].value;
    if (strSAMLart == "")
        bRtn = jf_CheckBeforSearchOutside();
    else
        bRtn = jf_CheckBeforSearchInside();
    return bRtn;
}
function jf_CheckBeforSearchInside() {
    var bRtnbool = true;
    //1050511 Zen 1050087 二代公文修改--begin
    //0980302	0971022	Yvonne	修正單位條件消失之問題
    /*
	if(document.all.tbTool.getItem(ddlDept).getAttribute("value") !="")
		document.all["H_tbGetDept"].value = document.all.tbTool.getItem(ddlDept).getAttribute("value");
		
	if (document.all.tbTool.getItem(txSubject).getAttribute("value") == "")
	{
		if(document.all.tbTool.getItem(txIssueNo).getAttribute("value") == "")
		{
			if(document.all.tbTool.getItem(txStartIssueDate).getAttribute("value") == "")
			{
				if(document.all.tbTool.getItem(txEndIssueDate).getAttribute("value") == "")
				{
					if(document.all.tbTool.getItem(ddlDept).getAttribute("value") =="")
					{
						//0980220 Albert 0971022 新增"識別碼"搜尋條件
						if(document.all.tbTool.getItem(txIdentifyCode).getAttribute("value") == "")
						{
						 //[0991043] davis 新增"受文機關"搜尋條件
						 if(document.all.tbTool.getItem(txOrgName).getAttribute("value") == "")
						   {
							 alert("請至少輸入一搜尋條件");
							 document.all.tbTool.getItem(txSubject).focus();
							 bRtnbool = false;
						   }	
						}
					}
					//else
					//	document.all["H_tbGetDept"].value = document.all.tbTool.getItem(ddlDept).getAttribute("value");
					//1041118	Kevin_C	1040871			修正選擇發布單位無效的問題
					else
						document.all["H_tbGetDept"].value = document.all.tbTool.getItem(ddlDept).getAttribute("value");
				}
			}
		}
	}
    */
    //0980302	0971022	Yvonne	修正單位條件消失之問題
    var ddlDept = document.getElementById('ddlDept');
    if (ddlDept.options[ddlDept.selectedIndex].value != "")
        document.all["H_tbGetDept"].value = ddlDept.options[ddlDept.selectedIndex].value;

    if (document.getElementById(txSubject).value == "") {
        if (document.getElementById(txIssueNo).value == "") {
            if (document.getElementById(txStartIssueDate).value == "") {
                if (document.getElementById(txEndIssueDate).value == "") {
                    if (ddlDept.options[ddlDept.selectedIndex].value == "") {
                        //0980220 Albert 0971022 新增"識別碼"搜尋條件
                        if (document.getElementById(txIdentifyCode).value == "") {
                            //[0991043] davis 新增"受文機關"搜尋條件
                            if (document.getElementById(txOrgName).value == "") {
                                alert("請至少輸入一搜尋條件");
                                //1050606 Zen 1050087 二代公文修改
                                //document.all.tbTool.getItem(txSubject).focus();
                                $('#txSubject').focus();
                                bRtnbool = false;
                            }
                        }
                    }
                        //else
                        //	document.all["H_tbGetDept"].value = document.getElementById(ddlDept).getAttribute("value");
                        //1041118	Kevin_C	1040871			修正選擇發布單位無效的問題
                    else
                        document.all["H_tbGetDept"].value = ddlDept.options[ddlDept.selectedIndex].value;
                }
            }
        }
    }
    //1050511 Zen 1050087 二代公文修改--end
    return bRtnbool;
}
//0980220 Albert 0971022 修改外網使用者搜尋限制
function jf_CheckBeforSearchOutside() {
    var bRtnbool = true;
    //1050511 Zen 1050087 二代公文修改
    //if (document.all.tbTool.getItem(txIssueNo).getAttribute("value") == "")
    if (document.getElementById(txIssueNo).value == "") {
        alert("發文號為必要欄位");
        //1050511 Zen 1050087 二代公文修改
        //document.all.tbTool.getItem(txIssueNo).focus();
        $('#txIssueNo').focus();
        bRtnbool = false;
    }
        //1050511 Zen 1050087 二代公文修改
        //else if ((document.all["H_DocHash"].value == "Y") && (document.all.tbTool.getItem(txIdentifyCode).getAttribute("value") == ""))
    else if ((document.all["H_DocHash"].value == "Y") && (document.getElementById(txIdentifyCode).value == "")) {
        alert("識別碼為必要條件");
        //1050511 Zen 1050087 二代公文修改
        //document.all.tbTool.getItem(txIdentifyCode).focus();
        $('#txIdentifyCode').focus();
        bRtnbool = false;
    }
    //[0991043] davis 新增搜尋限制條件
    /*else if(document.all.tbTool.getItem(txOrgName).getAttribute("value") == "")
	{
		alert("受文機關為必要欄位");
		document.all.tbTool.getItem(txOrgName).focus();
		bRtnbool = false;
	}*/
    //if(document.all.tbTool.getItem(txEndIssueDate).getAttribute("value") != "")
    //1050511 Zen 1050087 二代公文修改--begin
    //if (document.all.tbTool.getItem(ddlDept).getAttribute("value") != "")//0980302 Albert 修正錯誤
    //    document.all["H_tbGetDept"].value = document.all.tbTool.getItem(ddlDept).getAttribute("value");
    var ddlDept = document.getElementById('ddlDept');
    if (ddlDept.options[ddlDept.selectedIndex].value != "")
        document.all["H_tbGetDept"].value = ddlDept.options[ddlDept.selectedIndex].value;
    //1050511 Zen 1050087 二代公文修改--end

    return bRtnbool;
}
//搜尋前之欄位檢查
function jf_CheckBeforGo(argType) {
    var bRtnbool = true;
    //1050511 Zen 1050087 二代公文修改
    //if (document.all.tbSelect.getItem(txPageCntSet).getAttribute("value") == "")
    if (document.getElementById(txPageCntSet).value == "") {
        alert("請輸入每頁顯示筆數");
        //1050511 Zen 1050087 二代公文修改
        //document.all.tbSelect.getItem(txPageCntSet).focus();
        $('#txPageCntSet').focus();
        bRtnbool = false;
    }
        //1050511 Zen 1050087 二代公文修改
        //else if (document.all.tbSelect.getItem(txViewPage).getAttribute("value") == "")
    else if (document.getElementById(txViewPage).value == "") {
        alert("請輸入頁數");
        //1050511 Zen 1050087 二代公文修改
        //document.all.tbSelect.getItem(txViewPage).focus();
        $('#txViewPage').focus();
        bRtnbool = false;
    }
    else {
        //1050511 Zen 1050087 二代公文修改--begin
        //var GetPageCntSet = document.all.tbSelect.getItem(txPageCntSet).getAttribute("value");
        //var GetViewPage		= document.all.tbSelect.getItem(txViewPage).getAttribute("value");
        var GetPageCntSet = document.getElementById(txPageCntSet).value;
        var GetViewPage = document.getElementById(txViewPage).value;
        //1050511 Zen 1050087 二代公文修改--end
        var TotalNum = document.all["H_TotalNum"].value;

        if (argType == "Change")
        { }
        else if (argType == "First") {
            GetViewPage = 1;
        }
        else if (argType == "Preview") {
            GetViewPage--;
        }
        else if (argType == "Next") {
            GetViewPage++;
        }
        else if (argType == "Last") {
            GetViewPage = parseInt(TotalNum / GetPageCntSet);
            if (TotalNum % GetPageCntSet != 0)
                GetViewPage++;
        }
        if (GetViewPage > 1) {
            var iTotalPageCount = parseInt(TotalNum / GetPageCntSet);
            if (TotalNum % GetPageCntSet != 0)
                iTotalPageCount++;

            if (GetViewPage > iTotalPageCount && TotalNum != "") {
                alert("輸入條件超過總頁數，請重新輸入。");
                //1050511 Zen 1050087 二代公文修改
                //document.all.tbSelect.getItem(txViewPage).focus();
                $('#txViewPage').focus();
                bRtnbool = false;
            }
        }
        if (GetViewPage <= 0) {
            alert("頁數不可小於0，請重新輸入");
            //1050511 Zen 1050087 二代公文修改
            //document.all.tbSelect.getItem(txViewPage).focus();
            $('#txViewPage').focus();
            bRtnbool = false;
        }
    }
    return bRtnbool;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//按下連結時開啟子視窗
//1060407 Cloud [1060160] 增加傳入key值-已無用-mark
/*function fnHyperLink(argAttachInfoId, argFileSeqNo , argDocNo)
{
    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&FileSeqNo=" + argFileSeqNo;
    //1000309 David 0991043 新增網址參數
    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&FileSeqNo=" + argFileSeqNo";
    var strOrgNo = "";
    if (document.all["H_UserName"].value != "")
        strOrgNo = document.all["H_UserName"].value;
    else if (document.all["H_IssueOrgName"].value != "")
        strOrgNo = document.all["H_IssueOrgName"].value;

    //1000425 David 1000108 多傳入下載類別
    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&FileSeqNo=" + argFileSeqNo+ "&DocNo=" + argDocNo + "&OrgNo=" + strOrgNo;
    //1000714 [1000587] Kevin 網址參數(機關名稱)加入Escape避免亂碼
    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&FileSeqNo=" + argFileSeqNo+ "&DocNo=" + argDocNo + "&OrgNo=" + strOrgNo + "&DLType=0";
    //kevina
    if (argFileSeqNo != "")
	    //1060407 Cloud [1060160] 修改DLI300.ASPX 為DLI300.ASHX-並增加傳入KEY值
	    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&FileSeqNo=" + argFileSeqNo+ "&DocNo=" + argDocNo + "&OrgNo=" + escape(strOrgNo) + "&DLType=0";
	    var strUrl = "DLI300.ashx?AttachInfoId=" + argAttachInfoId + "&FileSeqNo=" + argFileSeqNo + "&DocNo=" + argDocNo + "&OrgNo=" + escape(strOrgNo) + "&DLType=0&Key="+argGuid;
    else
    //1060407 Cloud [1060160] 修改DLI300.ASPX 為DLI300.ASHX-並增加傳入KEY值
	    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&DocNo=" + argDocNo + "&OrgNo=" + escape(strOrgNo) + "&DLType=1";
	    var strUrl = "DLI300.ashx?AttachInfoId=" + argAttachInfoId + "&DocNo=" + argDocNo + "&OrgNo=" + escape(strOrgNo) + "&DLType=1&Key=" + argGuid;
    jf_OpenChildWin(strUrl, "");
}*/

//1000425 David 1000108 新增打包下載使用
//1060407 Cloud [1060160] 增加傳入key值-已無用-mark
/*function Download(argAttachInfoId,argDocNo,argGuid)
{
    var strOrgNo = "";
    if (document.all["H_UserName"].value != "")
        strOrgNo = document.all["H_UserName"].value;
    else if (document.all["H_IssueOrgName"].value != "")
        strOrgNo = document.all["H_IssueOrgName"].value;

    //1000714 [1000587] Kevin 網址參數(機關名稱)加入Escape避免亂碼
    //var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&DocNo=" + argDocNo + "&OrgNo=" + strOrgNo + "&DLType=1";
	//1060407 Cloud [1060160] 增加傳入key值
	//var strUrl = "DLI300.aspx?AttachInfoId=" + argAttachInfoId + "&DocNo=" + argDocNo + "&OrgNo=" + escape(strOrgNo) + "&DLType=1";
	var strUrl = "DLI300.ashx?AttachInfoId=" + argAttachInfoId + "&DocNo=" + argDocNo + "&OrgNo=" + escape(strOrgNo) + "&DLType=1&Key=" + argGuid;
    jf_OpenChildWin(strUrl, "");
}*/

function jf_fnChangePage() {
    if (!Page_BlockSubmit) {
        var button_index = 14;
        //1050511 Zen 1050087 二代公文修改
        //var o = document.all.tbSelect.getItem(button_index);
        var o = document.getElementById(button_index);
        document.all.ToolBarSenderID.value = o.getAttribute("ID");
        IsServerHandling = true;
        jf_ShowWaitState();
        __doPostBack("tbSelect", button_index);
    }
}

//PAGELOAD時，註冊toolbar事件
function ToolBarEventHandle() {
    //1050606 Zen 1050087 二代公文修改--begin
    /*
    var oSDate = GetToolbarCtrl(txStartIssueDate);
    var oEDate = GetToolbarCtrl(txEndIssueDate);
    oSDate.setAttribute("onblur", CheckSDate);
    oSDate.setAttribute("onclick", CallCalendar);
    oEDate.setAttribute("onblur", CheckEDate);
    oEDate.setAttribute("onclick", CallCalendar);
    //1040617	Kevin_C	1040485	外網也要小日曆
    document.all["txOutDate"].setAttribute("onclick", CallCalendar);
    //0980224 Albert 0971022 日期只能輸入數字、發文號&識別碼輸入英文字轉成大寫--start--
    oSDate.setAttribute("onkeypress", InpNumOnly);
    oEDate.setAttribute("onkeypress", InpNumOnly);
    var oIssueNo = GetToolbarCtrl(txIssueNo);
    oIssueNo.setAttribute("onkeyup", ToUpper);
    var oIdentifyCode = GetToolbarCtrl(txIdentifyCode);
    oIdentifyCode.setAttribute("onkeyup", ToUpper);
    //--end--
    */
    $('#txStartIssueDate').on("blur", CheckSDate);
    $('#txEndIssueDate').on("blur", CheckSDate);
    //1050606 Zen 1050087 二代公文修改--end
    
}

function CheckSDate() {
    //1050606 Zen 1050087 二代公文修改
    //var oSDate = GetToolbarCtrl(txStartIssueDate);
    var oSDate = document.all.txStartIssueDate;
    //0980304 Albert 0971022 修改錯誤訊息格式，與DLC100一致
    return CheckToolbarDate(oSDate, "發文日期(起)", true);
}

function CheckEDate() {
    //1050606 Zen 1050087 二代公文修改
    //var oEDate = GetToolbarCtrl(txEndIssueDate);
    var oEDate = document.all.txEndIssueDate;
    //0980304 Albert 0971022 修改錯誤訊息格式，與DLC100一致
    return CheckToolbarDate(oEDate, "發文日期(迄)", true)
}

function CallCalendar() {
    return jf_CallCalendar(this, event.screenX, event.screenY);
}

//檢查Toolbar的日期格式
function CheckToolbarDate(argToolBarObj, strMsg) {
    var strDate = argToolBarObj.value;
    if (strDate == "")
        return true;

    if (strDate.length < 7) {
        strDate = jf_PADL(strDate, 7, '0');
        argToolBarObj.setAttribute("value", strDate);
    }
    if (!jf_CheckCDATE(strDate)) {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
        //1050606 Zen 1050087 二代公文修改
        //argToolBarObj.focus();
        $('#' + argToolBarObj.id).focus();
        return false;
    }
    return true;
}
function GetToolbarCtrl(ObjIndex) {
    //1050511 Zen 1050087 二代公文修改
    //return document.all.tbTool.getItem(ObjIndex);
    return document.getElementById(ObjIndex);
}
//取得參數值
function GetParam(p) {
    var arr = GetParamArray();
    if (p == "") return "";
    for (var i = 0 ; i < arr.length ; i++)
        if (arr[i][0] == p)
            return arr[i][1];
    return "";
}
function GetParamArray() {
    var arrayOfParamLen = 0;
    var arrayOfParam = new Array(0);

    var pUrl = unescape(this.location);
    if (pUrl != -1) {
        var i, j, k;
        i = pUrl.indexOf("?");
        var paramStr = pUrl.substr(i + 1);
        var arr = paramStr.split("&");
        for (j = 0 ; j < arr.length ; j++) {

            k = arr[j].indexOf("=");
            if (k != -1) {
                arrayOfParam[arrayOfParamLen] = new Array(2);
                arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0, k);
                arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k + 1);
                arrayOfParamLen++;
            }
        }
    }
    return arrayOfParam;
}
//0980224 Albert 0971022 發文號、識別碼輸入英文字轉成大寫
function ToUpper() {
    var oIssueNo = GetToolbarCtrl(txIssueNo);
    var oIdentifyCode = GetToolbarCtrl(txIdentifyCode);
    //1050511 Zen 1050087 二代公文修改--begin
    //var upperIssueNo = document.all.tbTool.getItem(txIssueNo).getAttribute("value").toUpperCase();
    //var upperIdentifyCode = document.all.tbTool.getItem(txIdentifyCode).getAttribute("value").toUpperCase();
    var upperIssueNo = document.getElementById(txIssueNo).value.toUpperCase();
    var upperIdentifyCode = document.getElementById(txIdentifyCode).value.toUpperCase();
    //1050511 Zen 1050087 二代公文修改--end
    oIssueNo.setAttribute("value", upperIssueNo);
    oIdentifyCode.setAttribute("value", upperIdentifyCode);
}
//0980224 Albert 0971022 日期只能輸入數字
function InpNumOnly() {
    //可使用backspace鍵	
    if (event.keyCode != 8) {
        if ((event.keyCode < 48) || (event.keyCode > 57))
            event.keyCode = 0;
    }
}
//0980302 Albert 0971022 讓tbSelect可以在輸入區塊按下enter直接搜尋
function jf_QSearch() {
    if (event.keyCode == 13) {
        //判斷是否為按下enter
        document.all["H_tbSelectFlag"].value = "1";
    }
}
//0980302 Albert 0971022 讓tbTool可以在輸入區塊按下enter直接搜尋
function jf_QSearch2() {
    //判斷是否為按下enter
    if (event.keyCode == 13) {
        if (!jf_CheckBeforSearch())
        { }
        else
            document.all["H_tbToolFlag"].value = "1";
    }
}

//1090221 Kevin 1080366 修正一代內網無法查詢問題
var Page_IsValid = false;

//1080522 Kevin 1080366 外網關閉Script InLine
function WebForm_OnSubmit()
{
	ClientButtonControl();
	//1080904 Kevin 1080539 修正內網檢核不通過仍PostBack問題
	if(Page_BlockSubmit)
		return false;
	
	//1090221 Kevin 1080366 修正一代內網無法查詢問題
	Page_IsValid = true;
	
	if (typeof (ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
	return true;
}

function __doPostBack(eventTarget, eventArgument) {
	if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
		//theForm.__EVENTTARGET.value = eventTarget;
		//theForm.__EVENTARGUMENT.value = eventArgument;
		theForm.submit();
	}
}

var Page_ValidationActive = false;
if (typeof(ValidatorOnLoad) == "function") {
    ValidatorOnLoad();
}

function ValidatorOnSubmit() {
    if (Page_ValidationActive) {
        return ValidatorCommonOnSubmit();
}
else {
        return true;
}
}

function RefreshCaptcha()
{
    //1110928 Leslie  增修因AjaxPro無法通過資安設定環境下的替代方案，全都改成WebService處理
    //objCaptcha = DL1.DLMI100.GenCaptcha();
    var params = new SOAPClientParameters();
    objCaptcha = SOAPClient.invokeJSON('/DL/DLLIB/DLWS.asmx', "GenCaptcha", params, false, null)
    document.all['iVerify'].src = objCaptcha.value.strCaptcha;
}
//1130815   Cloud   1130747         調整DG介面
function fnShowVerifyInfp(argShaInfo,argDocNo,argOrgNo) {
    //將資訊寫入LOCALSTOAGE
    var strVerifValue = argShaInfo.split('_')[0] + "__" + argShaInfo.split('_')[2] + "_tbFileHash";
    localStorage.setItem(argOrgNo + "-" + argDocNo, document.all[strVerifValue].textContent);
    var strUrl = "DLMI100C1.aspx?DocNo=" + argDocNo + "&OrgNo=" + argOrgNo;
    jf_OpenChildWin(strUrl, "DLM100C1","1760","800");
}