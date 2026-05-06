/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1110714	 Kevin   Joe	  1110639	新增匯出Excel功能，及考試院回報問題修改
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

//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核--S
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
//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核--E

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
		/*
		case "":
			break;
		*/
		//1110714	Joe		1110639		新增轉出Excel選項--S
		case "btExcel":
			if(document.all.txExcel.value == ""){
				alert('日期欄位不可為空');
			}
		    else if (jf_CheckMonth('txExcel'))
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
		    }
		    else
		        Page_BlockSubmit = true;
			break;
		//1110714	Joe		1110639		新增轉出Excel選項--E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061023 Joe 1050087 二代公文修改，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
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
		case "btPreview":
		    if (jf_CheckPreview())
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
		    }
		    else
		        Page_BlockSubmit = true;
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_CheckPreview()
{
    var bChecked = true;
	//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核
	var strCheckDate="";

    if (document.all.rbRptMonth.checked)
    {
        bChecked = true;
		//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核
		strCheckDate = document.all.txRptMonth.value;
    }
    else if (document.all.rbRptDay.checked)
    {
        bChecked = jf_CheckMonth('txRptDay');
		//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核
		strCheckDate = document.all.txRptDay.value;
    }
    else
    {
        bChecked = jf_CheckMonth('txRptOrg');
		//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核
		strCheckDate = document.all.txRptOrg.value;
    }
	
	//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核--S
    if (bChecked && document.all.rbRptMonth.checked == false)
	{
		var CheckforPreview = ED4.EDR4901_EXAM.IsDataAllChecked(document.all.H_OrgNo.value, strCheckDate, document.all.dlDept.selectedOptions[0].value).value;
		if(CheckforPreview == false)
			bChecked = window.confirm('尚有案件未登錄齊全，請至各類案件辦理情形登錄作業區補登。(按確定則繼續列印、按取消則回原畫面)');
	}
	//1110714	Joe		1110639		考試院序12，登錄情形變更為在預覽前檢核--E
    return bChecked;
}


//列印月份欄位Onblur時，自動補0以及檢查列印月份欄位是否符合格式
function jf_CheckMonth(argMonth)
{
	var bCheckM = true;
	var strMonth = jf_Trim(document.all[argMonth].value);
	if(strMonth != "")
	{
		if(strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,"0");
			document.all[argMonth].value = strMonth;
		}
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all[argMonth].value = "";
			$('#' + argMonth).focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}