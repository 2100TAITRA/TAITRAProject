/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.24
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 103.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 105.08.23    Kenny   1050087 二代公文系統相關修改
 * 2016.10.19	Joe		1050087	二代修正配合行動平台
 * 2018.05.23   Cloud   1080419 調整程式邏輯，程式定義為程式開啟時，應歸檔日期迄日預設為系統日，並增加查詢前檢核應歸檔日期不可為空白。
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050823	Kenny	[1050087]   二代公文系統相關修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
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
        //1050823	Kenny	[1050087]   二代公文系統相關修改；移除無用code--Start--
		//case "btAll":
		//	Page_BlockSubmit=true;
		//	if (document.all["dg1"] != null)
		//	{
		//		for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
		//		{
		//			if (document.all["dg1__ctl"+iRow+"_cbMark"].checked == false)
		//				document.all["dg1__ctl"+iRow+"_cbMark"].checked = true;
		//		}
		//	}
		//	break;
		//case "btClean":
		//	Page_BlockSubmit=true;
		//	if (document.all["dg1"] != null)
		//	{
		//		for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
		//		{
		//			if (document.all["dg1__ctl"+iRow+"_cbMark"].checked == true)
		//				document.all["dg1__ctl"+iRow+"_cbMark"].checked = false;
		//		}
		//	}
		//	break;
		//case "btChange":
		//	Page_BlockSubmit=true;
		//	if (document.all["dg1"] != null)
		//	{
		//		for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
		//		{
		//			if (document.all["dg1__ctl"+iRow+"_cbMark"].checked)
		//				document.all["dg1__ctl"+iRow+"_cbMark"].checked = false;
		//			else
		//				document.all["dg1__ctl"+iRow+"_cbMark"].checked = true;
		//		}
		//	}
		//	break;
		//case "btSDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
		//	break;
		//case "btEDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
		//	break;
        //1050823	Kenny	[1050087]   二代公文系統相關修改；移除無用code--End--
	}	
}

//1050823	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050823   Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			//alert(document.all["dlDept_Text"].value);
            //1050823	Kenny	[1050087]   二代公文系統相關修改，由server控制--Start--
			//if (document.all.dg1)
			//{
			//	document.all.dg1.outerHTML = "";
			//}
			//1050823	Kenny	[1050087]   二代公文系統相關修改，由server控制--End--
			//* 2018.05.23	Cloud	1080419 增加檢核應歸檔日期不可皆為空白
			if (document.all.txSDate.value == "" && document.all.txEDate.value == "")
			{
				Page_BlockSubmit =true;
				alert('應歸檔日期起訖不可皆為空白。');
				$('#txSDate').focus();
				return;
			}
			else
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
				//1050823	Kenny	[1050087]   二代公文系統相關修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPush":
			Page_BlockSubmit = true;
			pUrl = "AKP820.aspx";
            //1050823	Kenny	[1050087]   二代公文系統相關修改
			//jf_OpenChildWin(pUrl,"AKP820",700,600);
            jf_OpenChildWin(pUrl,"AKP820",800,600);
			break;

	}
}

function CallBack(argCallerId)
{
}

var oInitValue="";
function ClientOnLoad()
{
	//alert(document.all["H_Value"].value);
	if(document.all["dlDept_Text"].value!="")
    {
	    DeptOnBlur(document.all['dlDept']);
        //1050823	Kenny	[1050087]   二代公文系統相關修改；for Chrome
	    if (document.all["strLoadType"].value == "firstLoad")
            document.all["dlUser_Text"].value = document.all["H_Value"].value.split(':')[3];
    }
	//document.all["H_Change"].value = "";
    //1050823	Kenny	[1050087]   二代公文系統相關修改，表頭已為標準程式功能，移除此部分設定--Start--
	//if (document.all["dg1"] == null)
	//	document.all["dtHead"].className = "hide";
	//else
	//	document.all["dtHead"].className = "";
    //1050823	Kenny	[1050087]   二代公文系統相關修改，表頭已為標準程式功能，移除此部分設定--End--
	ShowMsg();
}

function fnTimeOut()
{
	DeptOnBlur(document.all['dlDept']);
}
function OnWSResult(argResult)
{}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050823	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argDocNo)
{
	opener.document.all.lbReturnValue.length = 1;
	opener.document.all["lbReturnValue"].options[0].text = "DocNo";
	opener.document.all["lbReturnValue"].options[0].value = argDocNo;
	opener.window.CallBack("AKR212");
	close();
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	return bRtnbool;
}

//1050823	Kenny	[1050087]   二代公文系統相關修改，移除無用code--Start--
//催辦單前檢查
//function CheckBeforTicket()
//{
//	var bRtnBool = false;
//	for (var iRow=2;iRow<=document.all["dg1"].rows.length+1;iRow++)
//	{
//		if (document.all["dg1__ctl"+iRow+"_cbMark"].checked)
//		{
//			bRtnBool = true;
//			break;
//		}
//	}
//	if (!bRtnBool)
//	{
//		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
//	}
//	
//	return bRtnBool;
//}
//1050823	Kenny	[1050087]   二代公文系統相關修改，移除無用code--End--

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Change"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState();
			__doPostBack("","");//for .NET Framework 1.1
		}
	} 
}


/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
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
            //1050823	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
		}
	}
}

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			//jf_ShowWaitState();
			__doPostBack("","");//for .NET Framework 1.1
		}
	} 
}


function odjf_CheckComboBox(argDeptComboBoxID)
{
	var bRtnBool = false;
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var DeptComboBoxObj     = document.all[argDeptComboBoxID];
	
	if (DeptComboBoxTextObj == null || DeptComboBoxObj == null)
		return;
	if (DeptComboBoxTextObj.value != "")
	{
		for( i=0 ; i<DeptComboBoxObj.options.length ; i++ )
		{
			if (DeptComboBoxTextObj.value == DeptComboBoxObj.options[i].text)
			{
				bRtnBool = true;
				break;
			}
		}
		if (!bRtnBool)
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入資料不存在"])),"");
            //1050823	Kenny	[1050087]   二代公文系統相關修改
            //DeptComboBoxTextObj.focus();
            $('#'+argDeptComboBoxID + "_Text").focus();
		}
	}
	return bRtnBool;
}

function DeptOnBlur(Deptobj)
{
	if(Deptobj.options == null)
	{
		document.all["H_Change"].value = "";
		return;
	}
	if(Deptobj.options.length == 0)
	{
		document.all["H_Change"].value = "";
		return;
	}
	var index = Deptobj.selectedIndex;
	if(index == -1)
	{
		document.all["H_Change"].value = "";
		return;
	}
	//1050823	Kenny	[1050087]   二代公文系統相關修改
	else if (index == 0)
	{
		document.all["H_Change"].value = "";
		return;
	}
	document.all["H_Change"].value =  Deptobj.options[index].value;
	var len = document.all["dlUser"].length;
	document.all["dlUser"].size = len < 10 ? len : 10;
}

function UserOnBlur(Userobj)
{
	if(Userobj.options == null)
	{
		document.all["H_Value"].value = "";
		return;
	}
	if(Userobj.options.length == 0)
	{
		document.all["H_Value"].value = "";
		return;
	}
	var index = Userobj.selectedIndex;
	if(index == -1)
	{
		document.all["H_Value"].value = "";
		return;
	}
	//1050823	Kenny	[1050087]   二代公文系統相關修改
	else if (index == 0)
	{
		document.all["H_Value"].value = "";
		return;
	}
	document.all["H_Value"].value = Userobj.options[index].value;
}
