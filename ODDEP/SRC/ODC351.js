/*
DATE	SA		PRG		MGR_NO	DESC
1000506	David	Kevin	1000865	修改可註記電子轉紙本發文
1050418 David   Justin  1050087 二代公文修改
1050087 Leslie	Zen		1050087 修正client button 無法postback之錯誤
1130708 Joe     Jason   1130487 ODC351轉紙本功能未生效
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050418 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050418 Justin 1050087 二代公文修改 
	//if (document.all["ValidationSummary1"].innerText != "")
	//   alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btPaperIssue"));
	var btPaperIssue;

	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btPaperIssue"] != null)
	{
		btPaperIssue = document.all["dg1__ctl" + pNo + "_btPaperIssue"].id;
	}
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		//kevina
	    case btPaperIssue:
	        //1050419 Justin 1050087 二代公文修改
		    //document.all["H_txSeqNo"].value = document.all["dg1__ctl" + pNo + "_lbSeqNo"].innerText;
			document.all["H_txSeqNo"].value = document.all["dg1__ctl" + pNo + "_lbSeqNo"].textContent;
			//1130708  Jason   1130487 ODC351轉紙本功能未生效--增加隱藏欄位判斷
			document.all["H_txSeq"].value = document.all["dg1__ctl" + pNo + "_lbSeq"].textContent;
			Page_BlockSubmit=false;
			//1051102 Zen 1050087 修正client button 無法postback之錯誤
	        __doPostBack(xObjectName, event.flatIndex);
			break;
	}	
}

//1050418 Justin 1050087 二代公文修改 
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

    //1050418 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
		    //1050418 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			if(document.all.txSDate.value=="" && document.all.txEDate.value=="")
			{
				alert("發文日期起訖不可均為空白!!");
				document.all.txSDate.focus();
				Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = false;
		    //1050418 Justin 1050087 二代公文修改 
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
		    //1050607 Justin 1050087 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function ClientOnLoad()
{
	ShowMsg();
}
