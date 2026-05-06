/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060220   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

var xDoc = document.all;

function ShowMsg()
{
    //1060220  Justin [1050087] 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
	//    alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();
}

//1060220  Justin [1050087] 二代公文修改
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

//1060220  Justin [1050087] 二代公文修改 
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
	
    //1060220  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if(document.all.dlAcc.selectedIndex ==0 || document.all.dlAcc.selectedIndex ==-1)
			{
				Page_BlockSubmit = true;
				alert("請輸入帳號!!");
			}
			else
				Page_BlockSubmit = false; 
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			var bDG1 = CheckDetail("dg1");
			var bDG2 = CheckDetail("dg2");
			if (bDG1 || bDG2)
			{
				Page_BlockSubmit= false;
			}
			else
			{
				var strMsg = "請設定 "+document.all["dlAcc"].options[document.all["dlAcc"].selectedIndex].text+" 欲管理之單位";
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])), "");
			    //1060220  Justin [1050087] 二代公文修改
				//document.all["dg1__ctl2_dlDept"].focus();
				$('#dg1__ctl2_dlDept').focus();
				Page_BlockSubmit= true;
			}
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_Con_Delete();
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
	}
}

function CheckDetail(dgObjId)
{
    var iRow ;
	var strMsg = "";
	var choose = false;

	for (iRow=2;iRow<document.all[dgObjId].rows.length+1;iRow++)
	{
		if(document.all[dgObjId+"__ctl"+iRow+"_dlDept"].selectedIndex !=0 && document.all[dgObjId+"__ctl"+iRow+"_dlDept"].selectedIndex !=-1)
		{ 
			choose=true;break;
		}
	}
	
	if (!choose)
		return false;
	else
		return true;
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    ShowMsg();
    //1060220  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	//jf_CallWS("lib/ak_lib.asmx", "CheckDataRow", false, null);
}
function jf_Con_Delete()
{
	return window.confirm("確定要刪除嗎?\n注意：點選確定後，將刪除此帳號管理之所有庫房。");
}