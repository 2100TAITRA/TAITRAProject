/*
DATE	SA		PRG		MGR_NO			DESC
1031028	David	Eric	1030160			新增程式
1041217	David	David	1040937			修改回傳ODT130處理邏輯
1050202	David	David	1040937			調整ODT138帶回ODT130資料方式
1050502 David   Zen     1050087         二代公文修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050502 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050502 Zen 1050087 二代公文修改--begin
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050502 Zen 1050087 二代公文修改--end
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    //1050502 Zen 1050087 二代公文修改
        /*
		case "btCalendar1":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			break;
		case "btCalendar2":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			break;
        */
		//1050502 Zen 1050087 二代公文修改
		case "btSelectAll":
			Page_BlockSubmit = true;
			SelectAll();
			break;
		case "btClear":
			Page_BlockSubmit = true;
			SelectClear();
			break;
		case "btReverse":
			Page_BlockSubmit = true;
			SelectInverse();
			break;
	}	
}
//1050502 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050502 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if(CheckBeforeSelect())
			{
				Page_BlockSubmit = false;
			    //1050502 Zen 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btDelete":
			if(fnCheckData())
				Page_BlockSubmit = !jf_ConfirmDelete();
			else	
				Page_BlockSubmit = true;
		    //1050502 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_Clean();
			document.all["txDateS"].focus();
			break;
	}
}

function CallBack(argCallerId)
{
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
}

//1041217 David 1040937 新增回傳公文文號
//function ReturnValue(argSysId)
//1050202 David 1040937 調整ODT138帶回ODT130資料方式
/*function ReturnValue(argSysId, argDocNo)
{
	//1041217 David 1040937 新增回傳公文文號
	//opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = argSysId;
    //opener.document.all.lbReturnValue.options[0].value = argSysId;
	opener.document.all.lbReturnValue.length = 2;
	opener.document.all.lbReturnValue.options[0].text = argSysId;
	opener.document.all.lbReturnValue.options[1].text = argDocNo;

    opener.window.CallBack("ODT138");
    opener.window.focus();
    close();
}*/
function ReturnValue(argSysId, argDocNo, argFromDate, argComeOthers, argOrgOthers, argOrgNoOthers, argSubject, argSpdNo, argRcvTypeDescNo)
{
	opener.document.all.lbReturnValue.length = 9;
	//SYSID
	opener.document.all.lbReturnValue.options[0].text = argSysId;
	//陳核會稿文號
	opener.document.all.lbReturnValue.options[1].text = argDocNo;
	//來文日期
	opener.document.all.lbReturnValue.options[2].text = argFromDate;
	//陳會別
	opener.document.all.lbReturnValue.options[3].text = argComeOthers;
	//來文機關及機關代碼
	opener.document.all.lbReturnValue.options[4].text = argOrgOthers;
	opener.document.all.lbReturnValue.options[5].text = argOrgNoOthers;
	//主旨
	opener.document.all.lbReturnValue.options[6].text = argSubject;
	//速別
	opener.document.all.lbReturnValue.options[7].text = argSpdNo;
	//來源別細項
	opener.document.all.lbReturnValue.options[8].text = argRcvTypeDescNo;

    opener.window.CallBack("ODT138");
    opener.window.focus();
    close();
}
/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//記錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;

//檢查日期格式
function CheckCDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
			document.all[argObj].focus();
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
//檢查日期是否有填
function CheckBeforeSelect()
{
	if (document.all["txDateS"].value==""&&document.all["txDateE"].value=="")
	{
		alert("收文日期不可皆為空白");
		return false
	}
	return true;
}
//刪除前檢查
function fnCheckData()
{
	if(document.all.dg1.Visible == false)
		return false;
	var iCnt = 0;
	var strMsg
	for(var i = 2; i <= document.all.dg1.rows.length ; i++)
	{
		if(document.all["dg1__ctl"+ i +"_cbSelect"].checked == true)
			iCnt++
	}
	if(iCnt == 0)
	{	
		strMsg = "至少要勾選一筆資料";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])),"");
		return false;
	}
	else
		return true;
}

//全選
function SelectAll()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbSelect"].checked = true;
	}
}

//反向
function SelectInverse()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
		else
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = true;
	}
}

//取消
function SelectClear()
{
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
	}
}

