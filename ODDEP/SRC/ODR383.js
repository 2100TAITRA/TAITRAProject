/*
DATE 	SA		PRG		MGR_NO	DESC
1050910	David	Kenny	1050087 二代公文系統相關修改
1060711	David	Kevin_C	1050087	修正沒跳訊息的問題
1120530	Joe		Joe		1050087	新增批號查詢功能
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050910	Kenny	[1050087]   二代公文系統相關修改--Start--
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
//1050910	Kenny	[1050087]   二代公文系統相關修改--End--
//1060711	Kevin_C		1050087	修正沒跳訊息的問題
jf_ShowValidator();
	
var StartRow=2;
var i;

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
		case "btSelectAll":
		    Page_BlockSubmit=true;
		    try
		    {
				SelectAllCb("dg1");
			}
			catch(e){}
			break;
		case "btReverse":
			Page_BlockSubmit=true;
			try
			{
				ReverseChecked("dg1");
			}catch(e){}
			break;
	}	
}

//1050910	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050910	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			if(document.all.txPostDate.value=="")
			{
				//1120530	Joe		--			新增批號查詢功能--S
				if(document.all.ODR383_TYPE.value== "EDT394"){
					if(document.all.txPostSeq.value == "")
					{
						Page_BlockSubmit = true;
						alert("郵寄批號與郵寄日期不可皆為空白!!");
						$('#txPostSeq').focus();
					}
					else
						Page_BlockSubmit = false;
				}
				else
				//1120530	Joe		--			新增批號查詢功能--E
				{
					Page_BlockSubmit = true;
					alert("郵寄日期不可為空白!!");
					//1050910	Kenny	[1050087]   二代公文系統相關修改
					//document.all.txPostDate.focus();
					$('#txPostDate').focus();
				}
			}
			else
			{
				Page_BlockSubmit = false;
			}
			//1050910	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			if(CheckDetail())
			{
				if(document.all.txPositionNo.value !="")
				{
					if((parseInt(document.all.txPositionNo.value) >16) || (document.all.txPositionNo.value=="0"))
					{
						alert("列印位置必須介於0~16!!")
						Page_BlockSubmit = true;
                        //1050910	Kenny	[1050087]   二代公文系統相關修改
                        //document.all.txPositionNo.focus();
                        $('#txPositionNo').focus();
					}
					else
						Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050910	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function SelectAllCb(argTableName)
{
	for(i= StartRow;i<document.all[argTableName].rows.length+1;i++)
	{
		document.all[argTableName+"__ctl"+i+"_ck1"].checked = true;	
	}
}
/// <summary>
/// 按反向將CheckBox之Checked屬性反向
/// <summary>
function ReverseChecked(argTableName)
{
	for(i= StartRow;i<document.all[argTableName].rows.length+1;i++)
	{
		if(document.all[argTableName+"__ctl"+i+"_ck1"].checked)
			document.all[argTableName+"__ctl"+i+"_ck1"].checked = false;
		else
			document.all[argTableName+"__ctl"+i+"_ck1"].checked = true;
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
            //1050910	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
		}
	}
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
function CheckDetail()
{
    var iRow ;
	var strMsg = "";
	var check = false;
	
	for (iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if(document.all["dg1__ctl"+iRow+"_ck1"].checked)
		{ check=true; break;} 
		
	}
	
	if (!check)
	{
		strMsg = "明細資料至少選取一項";
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])),"");
        //1050910	Kenny	[1050087]   二代公文系統相關修改
        //document.all["dg1__ctl2_ck1"].focus();
        $('#dg1__ctl2_ck1').focus();
		return false;
	}
	else
		return true;
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050910	Kenny	[1050087]   二代公文系統相關修改
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

function dlTime_onchange()
{
	var index = document.all["dlTime"].selectedIndex;
	var obj = document.all["dlTime"].options[index];

	if (obj.value == "") 
	{
		document.all["txSTime"].value = "";
		document.all["txETime"].value = "";
	}
	else
	{
		var argValue = obj.value.split(":");
		document.all["txSTime"].value = argValue[0];
		document.all["txETime"].value = argValue[1];
	}
}