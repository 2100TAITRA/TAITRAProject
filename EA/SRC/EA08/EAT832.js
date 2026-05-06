/*
DATE	SA		PRG		MGR_NO	DESC
1140310 Cloud   Cloud   1131145 新增調案批次審核
1140418	Cloud   Cloud   1131145 補上全選時，應該要取得最大角色及核可權資料
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
const cMaxrole = {};
const cDueDate = {};




/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (document.all["SHOWERRMSG"]) {
        alert(document.all["SHOWERRMSG"].value);
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
    
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    strBtId = xObjectName;
    switch (xObjectName)
    {
        case 'btHelpS':
        case 'btHelpE':
            Page_BlockSubmit = true;
            var strUrl = "/AK/AKS502_SMEG.aspx?rtnObj=lbReturnValue&k1=0&SAMLart=" + jf_GetArtifact();
            jf_OpenChildWin(strUrl, "AKS502", 800, 600);
            break;
        	//以下屬於DataGrid ToolBar
    	case 'btDgClear':
    		Page_BlockSubmit = true;
    		jf_SelectClear('dg1', '_cbSelect')
    		break;
    	case 'btDgAll':
    		Page_BlockSubmit = true;
			//1140418	  Cloud   1131145 補上全選時，應該要取得最大角色及核可權資料
			for(i = 2; i <= document.all["dg1"].rows.length; i++)
			{
				var obj = document.all["dg1__ctl"+ i + "_cbSelect"];
				if(obj.disabled == false)
				{
					obj.checked = true;	
					GetEmableDueDate("dg1__ctl"+ i + "_cbSelect");
				}
			}

    		break;
    	case 'btDgInverse':
    		Page_BlockSubmit = true;
    		jf_SelectInverse('dg1', '_cbSelect')
    		break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/

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
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btApprove":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
    	    Page_BlockSubmit = !jf_ConfirmSave();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["rbAll"].checked = true;
            document.all["rbBortAll"].checked = true;
            break;
      

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;
    


    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    
    var bHasRecord = false;
    var bHasCheck = false;
    if (document.all["dg1"] == null || document.all["dg1"].rows.length < 2) {
        alert("沒有調案資料可供執行作業。");
        return false;
    }
    else {
        for (i = 2; i <= document.all["dg1"].rows.length; i++) {
            if (document.all['dg1__ctl' + i + '_cbSelect'].checked) {
                bHasCheck = true;
                break;
            }
        }
    }
    
    if (bHasCheck == false)
    {
        alert("至少勾選一筆資料。");
        return false;
    }
    return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/

//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
   
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
var strBtId = '';
function CallBack(argCallerId)
{
    if (argCallerId == "AKS502") {
        if (strBtId == "btHelpS")
            document.all["txBorNoS"].value = document.all["lbReturnValue"].options[0].value;
        else
            document.all["txBorNoE"].value = document.all["lbReturnValue"].options[0].value;
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
var bHasCheck = false;
//檢查日期格式
/**********************************************
處理公文資訊的段落
**********************************************/

function dlPhraseNo_onchange() {
    var index = document.all["dlPhraseNo"].selectedIndex;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["tbOpinion"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    document.all["tbOpinion"].focus();
}
function GetEmableDueDate(id) {
    //叫用Ajax 取得是否有核可權及DueDate
    if (document.all[id].checked) {
        
        var id_secs = new Array(4);
        id_secs = id.split("_", 4);
        var strFlowNo = id_secs[0] + "__" + id_secs[2] + "_H_FLOWNO";
        var strOuid = id_secs[0] + "__" + id_secs[2] + "_H_OwnOuid";
        var strStep = id_secs[0] + "__" + id_secs[2] + "_H_STEP";
        var strMsgID = id_secs[0] + "__" + id_secs[2] + "_H_MSGID";
        var strDueDataType = document.all["uDUE_DATE_TYPE"].value;
        var strBorDays = id_secs[0] + "__" + id_secs[2] + "_H_DueDays";
        
        var strMaxRole = id_secs[0] + "__" + id_secs[2] + "_H_MAXROLE";
        var strEnabled = id_secs[0] + "__" + id_secs[2] + "_H_Enabled";
        var strDueDate = id_secs[0] + "__" + id_secs[2] + "_H_DueDate";
        //CheckRoleEnable(string source_orgno, string strFlowNo, string strOuid, string strStep, string strMsgID, string strDueDataType, string strBorDays)
        //沒取過才CallAjax-否則從物件裡取
        var bGetRole = true;
        var bGetDueDate = true;
        var MaxRoleid = document.all[strFlowNo].value + "|" + document.all[strOuid].value + "|" + document.all[strStep].value;
        var DueDateid = strDueDataType + "|" + document.all[strBorDays].value;

        if (cMaxrole[MaxRoleid] != undefined) {
            document.all[strFlowNo].value = "";
            bGetRole = false;
            var TempValue = cMaxrole[MaxRoleid].split('|');
            document.all[strMaxRole].value = TempValue[0] + "|" + TempValue[1];
            document.all[strEnabled].value = TempValue[2];
        }
        if (cDueDate[DueDateid] != undefined) { document.all[strBorDays].value = ""; bGetDueDate = false; document.all[strDueDate].value = cDueDate[DueDateid];}
            
        if (bGetRole || bGetDueDate) {
            var ApplyInfo = EA08.EAT832.CheckRoleEnable(document.all["SOURCENO"].value, document.all[strFlowNo].value, document.all[strOuid].value, document.all[strStep].value, document.all[strMsgID].value, strDueDataType, document.all[strBorDays].value, document.all["H_OWNUSER"].value).value;
            if (ApplyInfo.indexOf("ERR") != -1) { }
            else {
                //strRtn += maxRoleiNFO.MaxRole.SuperiorUnitCode.AsString() + "|" + maxRoleiNFO.MaxRole.RoleNo.AsString() + "|" + maxRoleiNFO.strAppEnable+|+strLimit;
                var TempValue = ApplyInfo.split('|');
                document.all[strMaxRole].value = TempValue[0] + "|" + TempValue[1];
                document.all[strEnabled].value = TempValue[2];
                document.all[strDueDate].value = TempValue[3];
                //記錄到物件裡
                if (bGetRole)
                    cMaxrole[MaxRoleid] = TempValue[0] + "|" + TempValue[1] + "|" + TempValue[2];
                if (bGetDueDate)
                    cDueDate[DueDateid] = TempValue[3];
            }
        }
    }

}