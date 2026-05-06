/*
DATE	SA		PRG		MGR_NO      DESC
1050822 David	Zen     1050087     二代公文修改
1060518 Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050822 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050822 Zen 1050087 二代公文修改
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
	
	switch (xObjectName)
	{
		case "btAll":
			Page_BlockSubmit=true;
			if (document.all["dg1"] != null)
			{
			    //1050822 Zen 1050087 二代公文修改
				//for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
			    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
			    {
					if (document.all["dg1__ctl"+iRow+"_cbMark"].checked == false)
						document.all["dg1__ctl"+iRow+"_cbMark"].checked = true;
				}
			}
			break;
		case "btClean":
			Page_BlockSubmit=true;
			if (document.all["dg1"] != null)
			{
			    //1050822 Zen 1050087 二代公文修改
				//for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
			    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
			    {
					if (document.all["dg1__ctl"+iRow+"_cbMark"].checked == true)
						document.all["dg1__ctl"+iRow+"_cbMark"].checked = false;
				}
			}
			break;
		case "btChange":
			Page_BlockSubmit=true;
			if (document.all["dg1"] != null)
			{
			    //1050822 Zen 1050087 二代公文修改
				//for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
			    for (var iRow = 2; iRow < document.all["dg1"].rows.length + 1; iRow++)
			    {
					if (document.all["dg1__ctl"+iRow+"_cbMark"].checked)
						document.all["dg1__ctl"+iRow+"_cbMark"].checked = false;
					else
						document.all["dg1__ctl"+iRow+"_cbMark"].checked = true;
				}
			}
			break;
	}	
}

//1050822 Zen 1050087 二代公文修改
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
	
    //1050822 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if(document.all.cbType1.checked == false && document.all.cbType2.checked == false)
			{
				alert("請勾選'會簽類別'");
				return;
			}
			if(document.all.cbCond1.checked == false && document.all.cbCond2.checked == false)
			{
				alert("請勾選'目前狀態'");
				return;
			}
			IsServerHandling = true;
			jf_ShowWaitState();	
			Page_BlockSubmit = false;
		    //1050822 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if (document.all["dg1"] == null || document.all["dg1"].rows == null)
			{
				alert("請先搜索資料");
				return;
			}
			if(CheckPrint())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			{
				Page_BlockSubmit = true;
				alert("請勾選欲列印之公文再執行此操作");
			}
		    //1050822 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (document.all["dg1"] == null || document.all["dg1"].rows == null)
			{
				alert("請先搜索資料");
				return;
			}
			if(CheckPrint())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
			{
				Page_BlockSubmit = true;
				alert("請勾選欲列印之公文再執行此操作");
			}
		    //1050822 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CheckPrint()
{
	if (document.all["dg1"] == null)
		return false;
	for (var iRow=2;iRow<document.all["dg1"].rows.length+2;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_lbDocNo"].value != "")
			if( document.all["dg1__ctl"+iRow+"_cbMark"].checked == true)
				return true;
	}
	return false;
}

function CallBack(argCallerId)
{
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
}

function ClientOnLoad()
{
    //1050822 Zen 1050087 二代公文修改
	//if (document.all["dg1"] == null)
	//	document.all["dtHead"].className = "hide";
	//else
	//	document.all["dtHead"].className = "";
	ShowMsg();
}

function OnWSResult(argResult)
{}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argDocNo)
{

}

