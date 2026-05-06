/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060224   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060224  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060224  Justin [1050087] 二代公文修改
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
		/*
		case "":
			break;
		*/
	}	
}

//1060224  Justin [1050087] 二代公文修改 
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
	
    //1060224  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(!ChkDate(document.all.txYear2S.value))
			{
			    Page_BlockSubmit = true;
			    //1060224  Justin [1050087] 二代公文修改
			    //document.all.txYear2S.focus();
			    $('#txYear2S').focus();
				return;
			}
			if(!ChkDate(document.all.txYear2E.value))
			{
			    Page_BlockSubmit = true;
			    //1060224  Justin [1050087] 二代公文修改
			    //document.all.txYear2E.focus();
			    $('#txYear2E').focus();
				return;
			}
			else
				Page_BlockSubmit = false;
			/*0921221 justin修改
			//起值不可等於訖值 -> 無法比較
			if(document.all.txYear2S.value == document.all.txYear2E.value)
			{
				jf_ShowMeg("輸入年度起值不可等於訖值!","輸入年度範圍有誤")
				Page_BlockSubmit = true;
				document.all.txYear2S.focus();
				return;
			}
			else
				Page_BlockSubmit = false;
			*/
		    //1060224  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
		    //1060224  Justin [1050087] 二代公文修改
			//document.all["txYear2S"].focus();
			$('#txYear2S').focus();
			break;
	}	
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060224  Justin [1050087] 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function ChkDate(argYear)
{
	if( argYear == "")
	{
		jf_ShowMeg("年度不可空白!","輸入年度有誤");
		return false;
	}

	var strYear = jf_PADL(argYear,3,"0");
	
    //年度不可小於最小可統計年度
    //1060224  Justin [1050087] 二代公文修改
    //if( strYear < document.all.laMinCalcYear.innerText )
	if (strYear < document.all.laMinCalcYear.textContent)
	{
		jf_ShowMeg("年度不可小於最小可統計年度!","輸入年度有誤");
		return false;
	}
	
    //年度不可大於目前最大統計年度
    //1060224  Justin [1050087] 二代公文修改
	//if( strYear > document.all.laMaxYearNow.innerText && document.all.laMaxYearNow.innerText != "")
	if (strYear > document.all.laMaxYearNow.textContent && document.all.laMaxYearNow.textContent != "")
	{
		jf_ShowMeg("尚未完成 "+ strYear + " 年度典藏量統計，無法列印 "+ document.all.txYear2S.value +" 至 "+ document.all.txYear2E.value +" 年度之檔案成長量分析表。請先執行檔案典藏數量統計作業。","輸入年度有誤");
		return false;
	}
	return true;	
}

//**********************OnBlur() Exit Trigger*****************************
function txYear2SExit()
{
	if(document.all.txYear2S.value=="") return;	
	document.all.txYear2S.value = jf_PADL(document.all.txYear2S.value,3,"0");
	var InputDate=document.all.txYear2S.value+"0101";
    if(!jf_CheckCDATE(InputDate))
	{
        jf_ShowMeg("請輸入正確日期範圍(000-999)", "輸入格式錯誤");
        //1060224  Justin [1050087] 二代公文修改
        //document.all.txYear2S.focus();
        $('#txYear2S').focus();
	}	
}

function txYear2EExit()
{
	if(document.all.txYear2E.value=="") return;	
	document.all.txYear2E.value = jf_PADL(document.all.txYear2E.value,3,"0");
	var InputDate=document.all.txYear2E.value+"0101";
    if(!jf_CheckCDATE(InputDate))
	{
        jf_ShowMeg("請輸入正確日期範圍(000-999)", "輸入格式錯誤");
        //1060224  Justin [1050087] 二代公文修改
        //document.all.txYear2E.focus();
        $('#txYear2E').focus();
	}	
}