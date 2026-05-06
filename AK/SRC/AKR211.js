/*
 * DATE     SA      PRG     MGR_NO      DESC
 * 1050720  Cloud   Justin  1050087     二代公文修改
 * 1051019  Leslie  Joe		1050087		二代修正配合行動平台
 * 1070412  Cloud   Zen     1070380     修正分頁方式啟用方式及逾期未歸還稽催單預覽錯誤之問題
 * 1091103  Cloud   Joe     1090741 	參照弱掃No Request Validation修正方式，避免危險字元被阻擋導致POSTBACK失敗
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050720 Justin 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050720 Justin 1050087 二代公文修改
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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

//1050720 Justin 1050087 二代公文修改 
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
	
    //1050720 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    //1050720 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050720 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050720 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			//1091103	Joe		1090741		參照弱掃No Request Validation修正方式，避免危險字元被阻擋導致POSTBACK失敗
		    jf_SubjectEncode();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
	//[0960382]Add by Cola 若點選確定後(透過訊息單一入口顯示) 則關閉視窗
	if (document.all["WClose"] != null)
	{
		if (document.all["WClose"].value == "1")
			window.close();
	}	
	ChangeEnable();
    //1070412 Zen 1070380 修正分頁方式啟用方式及逾期未歸還稽催單預覽錯誤之問題
	ChangePagingEnable();
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
    //1050720 Justin 1050087 二代公文修改 
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

//未歸還只有一種格式報表所以UI上不可以選擇 #2006.05.01 Andy
function ChangeEnable()
{
	if(document.all.rbIns.checked == true)
	{
		document.all.rbDept.disabled = false;
		document.all.rbSect.disabled = false;
		document.all.rbUser.disabled = false;
		document.all.cb341020000A.disabled = false;
	    //1070412 Zen 1070380 修正分頁方式啟用方式及逾期未歸還稽催單預覽錯誤之問題
		ChangePagingEnable();
	}
	if(document.all.rbBor.checked == true || document.all.rbAtt.checked == true) //[950754]Add by Cola 新增類型：附件逾期
	{
		document.all.rbDept.disabled = true;
		document.all.rbSect.disabled = true;
		document.all.rbUser.disabled = true;
		document.all.cb341020000A.disabled = true;
	}
}
//1090504	Cloud	1080750		AKR211支援開啟AKI802及ODT230、EAT310 -S
function fnOpenAKI888(argDocNo)
{
    var strUrl = "AKI888.aspx?SourceOrgno=" + document.all["SOURCE_ORGNO"].value + "&DocNo=" + argDocNo + "&SAMLart=" + document.all["SsoArtifact"].value;
	jf_OpenChildWin(strUrl, "AKI888", 760, 520 );
}
function fnOpenODT230(argDocNo)
{
	var strUrl = "../../ODDEP/ODT230.aspx?argDocNo="+argDocNo+"&SAMLart=" + document.all["SsoArtifact"].value;
	jf_OpenChildWin(strUrl, "ODT230", 760, 520 );
}
function fnOpenEAT310(argBorNo)
{
	var strUrl = "../../EA/EA03/EAT310.aspx?argBorNo="+argBorNo+"&SAMLart=" + document.all["SsoArtifact"].value;
	jf_OpenChildWin(strUrl, "EAT310", 760, 520 );
}
//1090504	Cloud	1080750		AKR211支援開啟AKI802及ODT230、EAT310 -E

//1070412 Zen 1070380 修正分頁方式啟用方式及逾期未歸還稽催單預覽錯誤之問題
function ChangePagingEnable()
{
    if (document.all['cb341020000A'].checked)
    {
        document.all['rbDept'].disabled = true;
        document.all['rbSect'].disabled = true;
        document.all['rbUser'].disabled = true;
    }
    else
    {
        document.all['rbDept'].disabled = false;
        document.all['rbSect'].disabled = false;
        document.all['rbUser'].disabled = false;
    }
}

//1091103	Joe		1090741		參照弱掃No Request Validation修正方式，避免危險字元被阻擋導致POSTBACK失敗
function jf_SubjectEncode()
{
	for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++) {
		document.all["dg1__ctl" + iRow + "_txSubject"].value = encodeURIComponent(document.all["dg1__ctl" + iRow + "_txSubject"].value);
	}
}