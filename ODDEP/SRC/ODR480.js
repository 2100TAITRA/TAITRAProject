/*
DATE 	SA		PRG		MGR_NO	DESC
1001102 Yvonne	Kevin	1000752	新增填報系統資料報表
1001202 Yvonne	Kevin	1000640	新增統計發文細項EXCEL、僑委會客製報表
1031204	Kevin	Kevin	--		新增ClientButtonControl()之宣告避免錯誤
1040115 Kevin	Hank	1030966 新增產出ODR480L2之Excel報表
1050519 Kevin   Justin  1050087 二代公文修改
1060510	Kevin	Joe		1060215 修改控制項傳值方式
1071218 Kevin   Zen     1071218 提供彙整報表之功能
1080903	Kevin	Zen		1080339 jQuery升級2.2.4
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050519 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050519 Justin 1050087 二代公文修改 
	if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

//1031204 Kevin 新增ClientButtonControl()之宣告避免錯誤
//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        /*
		case "":
			break;
		*/
    }
}

//1050519 Justin 1050087 二代公文修改 
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
	
    //1050519 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
		case "btExcel":
			Page_BlockSubmit = !CheckBeforePrint();
		    //1050519 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
  			if (strMaxUseDate == "")
  			{
  			//1050519 Justin 1050087 二代公文修改--Start--
  			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
  			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
  			}
  			else {
  			    //document.all["lbMaxYear"].innerText = "目前統計最大年月：" +
  			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3, 2) + "月";
  			}
				//iris 修改檢核列印月份不可大於目前統計月份之欄位
		        //document.all["h_txYM"].innerText = strMaxUseDate;
				//1060510	Joe		1060215		修改控制項傳值方式
				// document.all["h_txYM"].textContent =strMaxUseDate;
				document.all["h_txYM"].value =strMaxUseDate;
		    //1050519 Justin 1050087 二代公文修改--End--
		}
	}
}

function ClientOnLoad()
{
	ShowMsg();
	//1001202 Yvonne Kevin 1000640 新增統計發文細項
	SetTbTool();
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050519 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function CheckBeforePrint()
{
	var bRtn = true;
	var strSMon = jf_Trim(document.all["txSMon"].value);
	var strEMon = jf_Trim(document.all["txEMon"].value);
	if (strSMon + strEMon == "")
	{
	    bRtn = false;
	    /*1050519 Justin 1050087 二代公文修改
		document.all["txSMon"].focus();*/
	    $('#txSMon').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印月份不可皆為空白"])),"");
	}

    //1071218 Zen 1071218 提供彙整報表之功能
	var strSMon = document.all['txSMon'].value;
	var strEMon = document.all['txEMon'].value;

	if (strSMon == '' && strEMon != '')
	    document.all['txSMon'].value = strEMon;
	else if (strSMon != '' && strEMon == '')
	    document.all['txEMon'].value = strSMon;
	else if (Number(strSMon) > (Number(strEMon)))
	{
	    document.all['txSMon'].value = strEMon;
	    document.all['txEMon'].value = strSMon;
	}

	if(bRtn==true)
		bRtn= ConfirmData();
	return bRtn;
}

//###########################################################################################
//				其		他		共		用		function
//###########################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + "01"))
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    /*1050519 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
		    $('#' + argObj).focus();
		}
	}
}
function ConfirmData()
{
		if(document.all.h_txYM.value=="")
		{
			return  false;
		}
		var bRtnbool = true;
		var year1 = parseInt(document.all.txSMon.value.substr(0,3));
		if(year1 == 0)
			year1 = parseInt(document.all.txSMon.value.substr(1,2));
		var month1 = parseInt(document.all.txSMon.value.substr(3,2));
		if(month1 == 0)
			month1 = parseInt(document.all.txSMon.value.substr(4,1));
			
		var year2 = parseInt(document.all.h_txYM.value.substr(0,3));
		if(year2 == 0)
			year2 = parseInt(document.all.h_txYM.value.substr(1,2));
		var month2 = parseInt(document.all.h_txYM.value.substr(3,2));
		if(month2 == 0)
			month2 = parseInt(document.all.h_txYM.value.substr(4,1));
		if(year1>year2||(year1==year2&&month1>month2))
		{
		    strErrMsg = "列印月份不可大於目前統計最大月份\n";
		    /*1050519 Justin 1050087 二代公文修改
			document.all["txSMon"].focus();*/
			$('#txSMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
		year1 = parseInt(document.all.txEMon.value.substr(0,3));
		if(year1 == 0)
			year1 = parseInt(document.all.txEMon.value.substr(1,2));
		month1 = parseInt(document.all.txEMon.value.substr(3,2));
		if(month1 == 0)
			month1 = parseInt(document.all.txEMon.value.substr(4,1));
			
		if(year1>year2||(year1==year2&&month1>month2))
		{
		    strErrMsg = "列印月份不可大於目前統計最大月份\n";
		    /*1050519 Justin 1050087 二代公文修改
			document.all["txEMon"].focus();*/
		    $('#txEMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
	return bRtnbool;
}

//1001102 Kevin	[1000752] 新增填報系統資料報表
function rbOrgUnit_onclick()
{
	if(document.all.rbUnit.checked)
	{
		document.all["cbODR480L2"].disabled = true;
		document.all["cbODR480L2"].checked = false;
		document.all["cbODR480L2"].parentNode.style.cssText = "color:Gainsboro;";	
	}
	if(document.all.rbOrg.checked)
	{
		document.all["cbODR480L2"].disabled = false;
		document.all["cbODR480L2"].parentNode.style.cssText = "InputFieldText";
	}
}

//1001202 Yvonne Kevin 1000640 新增統計發文細項
function cbODR480L2_onclick()
{
	if(document.all.cbIssueDetail.checked && document.all.cbODR480L2.checked)
		document.all.cbIssueDetail.checked = false;

	SetTbTool();
}

//1001202 Yvonne Kevin 1000640 新增統計發文細項
function cbIssueDetail_onclick()
{
	if(document.all.cbIssueDetail.checked && document.all.cbODR480L2.checked)
		document.all.cbODR480L2.checked = false;

	SetTbTool();
}

//1001202 Yvonne Kevin 1000640 新增統計發文細項
function SetTbTool()
{
    //1050519 Justin 1050087 二代公文修改--Start--
	///1040114 Hank [1030966] 當勾選"填報系統資料"時 不將"匯出Excel工具鈕"設為disable -START
	if(document.all.cbIssueDetail.checked)
	{
		//document.all.tbTool.getItem(1).setAttribute("disabled",true);
		//document.all.tbTool.getItem(2).setAttribute("disabled",true);
	    ///document.all.tbTool.getItem(3).setAttribute("disabled",false);
	    //1080903 Zen 1080339 jQuery升級2.2.4--begin
	    //$('#btPreview').attr('disabled', true);
	    //$('#btPrint').attr('disabled', true);
	    $('#btPreview').prop('disabled', true);
	    $('#btPrint').prop('disabled', true);
	    //1080903 Zen 1080339 jQuery升級2.2.4--end
	}
	else if(document.all.cbODR480L2.checked)
	{
		//document.all.tbTool.getItem(1).setAttribute("disabled",false);
		//document.all.tbTool.getItem(2).setAttribute("disabled",false);
	    ///document.all.tbTool.getItem(3).setAttribute("disabled",true);
	    //1080903 Zen 1080339 jQuery升級2.2.4--begin
	    //$('#btPreview').attr('disabled', false);
	    //$('#btPrint').attr('disabled', false);
	    $('#btPreview').prop('disabled', false);
	    $('#btPrint').prop('disabled', false);
	    //1080903 Zen 1080339 jQuery升級2.2.4--end
	}
	else
	{
		//document.all.tbTool.getItem(1).setAttribute("disabled",false);
		//document.all.tbTool.getItem(2).setAttribute("disabled",false);
	    ///document.all.tbTool.getItem(3).setAttribute("disabled",false);
	    //1080903 Zen 1080339 jQuery升級2.2.4--begin
	    //$('#btPreview').attr('disabled', false);
	    //$('#btPrint').attr('disabled', false);
	    $('#btPreview').prop('disabled', false);
	    $('#btPrint').prop('disabled', false);
	    //1080903 Zen 1080339 jQuery升級2.2.4--end
	}
    ///1040114 Hank [1030966] 當勾選"填報系統資料"時 不將"匯出Excel工具鈕"設為disable -END
    //1050519 Justin 1050087 二代公文修改--End--
}