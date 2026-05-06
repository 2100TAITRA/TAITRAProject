/*
DATE		SA		PRG		MGR_NO	DESC
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050725     Kevin   Kenny   1050087 二代公文系統相關修改
1051019		Leslie	Joe		1050087	二代修改配合行動平台
1070717		Kevin	Joe		1070678	修正弱掃Heap Inspection
1070823	Kevin	Joe		1070678	修正弱掃Use Of Hardcoded Password
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050725	Kenny   [1050087]	二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050725	Kenny   [1050087]	二代公文系統相關修改--Stsrt--
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050725	Kenny   [1050087]	二代公文系統相關修改--End--
}


//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		case "btSave":
			if(document.all["rbSetPassWD"].checked)
			{
				//1070717	Joe		1070678		修正弱掃Heap Inspection
				// if(jf_Trim(document.all["txPassWord"].value)=="")
				if(jf_Trim(document.all["txMima"].value)=="")
				{
					alert("密碼不可為空白,請重新輸入");
                    //1050725	Kenny   [1050087]	二代公文系統相關修改
					//document.all["txPassWord"].focus();
					//1070717	Joe		1070678		修正弱掃Heap Inspection
                    // $('#txPassWord').focus();
                    $('#txMima').focus();
					Page_BlockSubmit=true;			
					return;
				}	
				//1070717	Joe		1070678		修正弱掃Heap Inspection
				// if(document.all["txPassWord"].value != document.all["txReCheckPW"].value)
				if(document.all["txMima"].value != document.all["txReCheckPW"].value)
				{
					alert("二次輸入之密碼不符，請重新輸入確認密碼。");
					document.all["txReCheckPW"].value = "";
                    //1050725	Kenny   [1050087]	二代公文系統相關修改
					//document.all["txReCheckPW"].focus();
                    $('#txReCheckPW').focus();
					Page_BlockSubmit=true;			
					return;
				}
			}
			
			if(document.all["cbPWEnableF"])
			if(document.all["cbPWEnableF"].checked && document.all["cbChangPW"].checked)
			{
				alert("您已選擇了 [密碼永久有效]。使用者在下次登入時不需要變更密碼。");
				document.all["cbChangPW"].checked = false;
			}
			
			Page_BlockSubmit = false;
		    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			IsServerHandling = true;
			__doPostBack("btSave",1);
			break;
	}	
}

function jf_ToolBarHandle()
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
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		case "btSave":
			jf_ToolBarSubmit();
			break;
		case "btClose":
			Page_BlockSubmit = true;
			close();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();	
	
	if(document.all.DUMMY_USERKEY!=null)
	{
		//1070717	Joe		1070678		修正弱掃Heap Inspection
		// document.all.txPassWord.value =  document.all.DUMMY_USERKEY.value;
		document.all.txMima.value =  document.all.DUMMY_USERKEY.value;
		document.all.txReCheckPW.value =  document.all.DUMMY_USERKEY.value;
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}



function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//1050725	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--Start--
//function jf_Update_Dg(argDept,argUnit,argEmpl)
//{
//	alert(argDept.innerText);
//	alert(argUnit.innerText);
//	alert(argEmpl.innerText);

//	ddlDept.value = 

//	Page_BlockSubmit = true;
//}

//function jf_Delete_Dg(argIndex)
//{
//	document.all["DGINDEX"].value = argIndex;
//}
//1050725	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE--End--

function StatusChange()
{
	if(document.all["rbSetPassWD"].checked)
	{
		//1070717	Joe		1070678		修正弱掃Heap Inspection
		// document.all["txPassWord"].disabled = false;
		document.all["txMima"].disabled = false;
		document.all["txReCheckPW"].disabled = false;
	}
	else
	{
		//1070717	Joe		1070678		修正弱掃Heap Inspection
		// document.all["txPassWord"].disabled = true;
		document.all["txMima"].disabled = true;
		document.all["txReCheckPW"].disabled = true;
	}
}