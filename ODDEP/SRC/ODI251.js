/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050524	Justin	1050098 新增ODI251專案申請及專案通案申請查詢作業
 * 1050603  Justin  1050087 二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050603 Justin 1050087 二代公文修改
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick=jf_ToolBarHandle;*/

function ShowMsg()
{
    /*1050603 Justin 1050087 二代公文修改
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
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
	
    /*1050603 Justin 1050087 二代公文修改
	switch (xObjectName)
	{
	    case "txSImg1":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		}		
	    case "txEImg2":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
		}
	    case "txSenImg1":
	    {
	        Page_BlockSubmit = true;
	        jf_CallCalendar(document.all.txSenDate, event.screenX, event.screenY);
	        break;
	    }
	    case "txEenImg2":
	    {
	        Page_BlockSubmit = true;
	        jf_CallCalendar(document.all.txEenDate, event.screenX, event.screenY);
	        break;
	    }
	}*/	
}


//1050603 Justin 1050087 二代公文修改 
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
	
    //1050603 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btSearch":
	    case "btPrint":
	    case "btPreview":
	    case "btExcel":
	        Page_BlockSubmit = !jf_CheckBeforeSearch();
	        adjust();
	        //1050603 Justin 1050087 二代公文修改 
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	var ddlDept=document.all["dlDept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue.split(':');
	
	if (document.all["Btype"].value == "rbType2")
	    document.all["rbType2"].checked = "true";
	else
	    document.all["rbType1"].checked = "true";
	rbType_onchange();

	if(document.all["dlSect"].selectedIndex==0 || document.all["dlSect"].selectedIndex==-1)
	    odjf_SetdlSectByUnitCodeDropDownList(strDeptNo[0], "dlSect", true);
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function CheckDate(id,str)
{
	var strDateValue ;
	strDateValue = document.all[id].value;
	if (strDateValue == "")
	{  
	return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all[id].value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])),"");
	    //1050603 Justin 1050087 二代公文修改 
	    //document.all[id].focus();
		$('#' + id).focus();
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050603 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue()
{

}

function dlDept_Text_onblur()
{
	var bCheckOK = true;
	
	var ddlDept=document.all["dlDept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue.split(':');
	
	odjf_SetdlSectByUnitCodeDropDownList(strDeptNo[0], "dlSect", true);
    //1050603 Justin 1050087 二代公文修改 
    //if (document.all["dlSect"].options[1].innerText == "(僅含一級單位)")
	if (document.all["dlSect"].options[1].textContent == "(僅含一級單位)")
	    document.all["dlSect"].remove(1);

	return bCheckOK;
}

function dlSect_onclick() {
    var bCheckOK = true;
    //1050603 Justin 1050087 二代公文修改 
    //if (document.all["dlSect"].options[1].innerText == "(僅含一級單位)")
    if (document.all["dlSect"].options[1].textContent == "(僅含一級單位)")
        document.all["dlSect"].remove(1);

    return bCheckOK;
}

//查詢前檢查
function jf_CheckDropDownList()
{
		
	if(document.all["dlSect"].selectedIndex!=0 && document.all["dlSect"].selectedIndex!=-1)
	{
		var SectItem=document.all["dlSect"].options[document.all["dlSect"].selectedIndex];
		if(SectItem.value!="")
			document.all["H_Sect_Value"].value=SectItem.value.split(':')[2];
		else
			document.all["H_Sect_Value"].value="";
		document.all["H_Sect_Text"].value=SectItem.text;
		document.all["H_Sect_AllValue"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	}
	else
	{
		document.all["H_Sect_Value"].value="";
		document.all["H_Sect_Text"].value="";
		document.all["H_Sect_AllValue"].value="";
	}
	if(document.all["dlDept"].selectedIndex!=0 && document.all["dlDept"].selectedIndex!=-1)
	{
		var DeptItem=document.all["dlDept"].options[document.all["dlDept"].selectedIndex];
		document.all["H_Dept_Value"].value=DeptItem.value.split(':')[0];
	}
	else
	    document.all["H_Dept_Value"].value="";
    
    return true;
}

function jf_CheckBeforeSearch()
{
	var CheckOK=true;
	if(!jf_CheckDropDownList())
		CheckOK=false;
		
	var strSDoc=jf_Trim(document.all["txSDoc"].value);
	var strEDoc=jf_Trim(document.all["txEDoc"].value);
	var strSDate=jf_Trim(document.all["txSDate"].value);
	var strEDate = jf_Trim(document.all["txEDate"].value);
	var strSenDate = jf_Trim(document.all["txSenDate"].value);
	var strEenDate = jf_Trim(document.all["txEenDate"].value);
	var bHasDept=true;
	var bHasSect=true;
	if(document.all["dlDept"].selectedIndex==0 || document.all["dlDept"].selectedIndex==-1)
		bHasDept=false;
	if(document.all["dlSect"].selectedIndex==0 || document.all["dlSect"].selectedIndex==-1)
		bHasSect=false;
	
	if(strSDoc==""&&strEDoc!="")
		document.all["txSDoc"].value=strEDoc;
	else if(strSDoc!=""&&strEDoc=="")
		document.all["txEDoc"].value=strSDoc;
	else if(strSDoc>strEDoc)
	{
		document.all["txSDoc"].value=strEDoc;
		document.all["txEDoc"].value=strSDoc;
	}
	if (strSDoc == "" && strEDoc == "" && strSDate == "" && strEDate == "" && strSenDate == "" && strEenDate == "" && !bHasDept && !bHasSect)
	{
	    alert("公文文號、申請日期、核可日期、承辦單位請至少需輸入一項條件。");
		CheckOK= false;
	}
	if (document.all["Btype"].value == "rbType1")
	{
	    document.all["txReason"].value = "";
	    //1050603 Justin 1050087 二代公文修改 
	    //document.all["txReason"].value = document.all["dlPhraseNo"].options[document.all["dlPhraseNo"].selectedIndex].innerText;
	    document.all["txReason"].value = document.all["dlPhraseNo"].options[document.all["dlPhraseNo"].selectedIndex].textContent;
	}
	else if (document.all["Btype"].value == "rbType2")
	{
	    document.all["txReason"].value = "";

	    //1050603 Justin 1050087 二代公文修改 cells(IE only)--> jQuery(ICEF)--Start--
	    var cellscnt = $('#cblReason').children('tbody').children('tr').children('td').length;
	    //if(document.all["cblReason"].cells.length > 0)
	    if (cellscnt > 0) {
	        //for(var iRcv = 0 ; iRcv < document.all["cblReason"].cells.length ; iRcv++)
	        for (var iRcv = 0 ; iRcv < cellscnt ; iRcv++) {
	            if (document.all["cblReason_" + iRcv].checked) {
	                //var val = document.all["cblReason"].cells[iRcv].innerText;
	                var val = $('#cblReason_' + iRcv + '+ label').text();
	    //1050603 Justin 1050087 二代公文修改 cells(IE only)--> jQuery(ICEF)--End--
	                if (document.all["txReason"].value != "")
	                    val = "，" + val;

	                document.all["txReason"].value += val;
	            }
	        }
	    }
	}
	return CheckOK;
}

function adjust()
{
	var strS = jf_Trim(document.all.txSDate.value);
	var strE = jf_Trim(document.all.txEDate.value);
	var strSen = jf_Trim(document.all.txSenDate.value);
	var strEen = jf_Trim(document.all.txEenDate.value);
	if(strS != "" && strE == "")
		document.all.txEDate.value = strS;
	else if(strS == "" && strE != "")
		document.all.txSDate.value = strE;
	else if(strS > strE)
	{
		document.all.txSDate.value = strE;
		document.all.txEDate.value = strS;
	}
	if (strSen != "" && strEen == "")
	    document.all.txEenDate.value = strSen;
	else if (strSen == "" && strEen != "")
	    document.all.txSenDate.value = strEen;
	else if (strSen > strEen) {
	    document.all.txSenDate.value = strEen;
	    document.all.txEenDate.value = strSen;
	}
}

function rbType_onchange()
{
    if (document.all["rbType1"].checked)
    {
        document.all["dlPhraseNo"].className = "InputFieldText";
        document.all["cblReason"].className = "InputFieldText hide";
        document.all["Btype"].value = "rbType1";
    }
    else
    {
        document.all["dlPhraseNo"].className = "InputFieldText hide";
        document.all["cblReason"].className = "InputFieldText";
        document.all["Btype"].value = "rbType2";
    }	
}

function fnOpenApply(url)
{
    newwin = window.open(url, name, "scrollbars");
    if (document.all)
    {
        newwin.moveTo(0, 0);
        newwin.resizeTo(screen.width, screen.height);
	}
} 