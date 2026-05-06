/*
DATE	SA		PRG		MGR_NO	DESC
1000506	David	Kevin	1000865	增強查詢功能
1050413 David   Justin  1050087 二代公文修改
1090721	David	David	1090220	調整文號OnBlur邏輯同AKI800，新增OnBlur事件
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050413 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050413 Justin 1050087 二代公文修改 
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
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

    //1050414 Justin 1050087 二代公文修改 
	/*switch (xObjectName)
	{
		case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
	}*/
}

//1050413 Justin 1050087 二代公文修改
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
	
    //1050413 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
		    if(document.all.txSDate.value=="" && document.all.txEDate.value=="")
		    {
				alert("發文日期起訖不可均為空白!!");
				document.all.txSDate.focus();
				Page_BlockSubmit = true;
		    }
			else
		    {
				Page_BlockSubmit = false;
		    }
		    //1050413 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CheckCDATE(argObj,strMsg)
{
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
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
		}
	}
}

function ClientOnLoad()
{
	ShowMsg();
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050419 Justin 1050087 二代公文修改
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function SelectRow(argDocNo)
{
	var strUrl = "";			
	strUrl = "ODC351.aspx?DocNo="+argDocNo;
	jf_OpenChildWin(strUrl, "ODC351", 810, 520 );
}

//1090721 David 1090220 新增文號OnBlur處理
function jf_DocNoOnBlur(argid)
{
	var obj = document.all[argid];
	if(obj.value=="")
		return;
	if (obj.id == "txDocNoS") {
		$('#txDocNoE').val(obj.value);
	}
}