/*
日期	SA		PG		NO			DESC
1000816	Yvonne	David	1000566		調整程式行為，以達到此程式可正常使用
1001101	David	David	1000566		於畫面顯示已勾選的單位
1050715 David   Zen     1050087     二代公文修改
1060518 Leslie  Zen     1060215     innerText相關修改
1100818	Kevin	Joe		1100991		弱掃修正Client Potential XSS
1140918	Cloud	Cloud	1140839		新增申請類別選單
1141008 Cloud   Cloud   1140839     北榮副校長為一層決行二級單位，經評估，一般二級單位已經不會有需要再分派管理科別的情況故修改，如為一層決行單位時，如有二級單位，增加提供二級單位選單
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050715 Zen 1050087  二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050715 Zen 1050087  二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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

//1050715 Zen 1050087  二代公文修改
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

    //1050715 Zen 1050087  二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !CheckKeyObject();
		    //1050715 Zen 1050087  二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050715 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050715 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050715 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
		    //1050715 Zen 1050087  二代公文修改
			//document.all["dlDept_Text"].focus();
			$('#dlDept_Text').focus();
			break;
	}
}

function CallBack(argCallerId)
{}

function ClientOnLoad()
{
    //1050715 Zen 1050087  二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);

	//1001101 David 1000566 如隱藏選單有值，顯示至畫面中
    ShowCheckedOuName();

    //1050715 Zen 1050087  二代公文修改
    document.all.dlDept_Text.style.color = 'red';
    document.all.dlRole_Text.style.color = 'red';
	document.all.dlUser_Text.style.color = 'red';
	//1141008 Cloud   1140839     北榮副校長為一層決行二級單位，經評估，一般二級單位已經不會有需要再分派管理科別的情況故修改，如為一層決行單位時，如有二級單位，增加提供二級單位選單
	document.all.dlSect_Text.style.color = 'red';


}

function OnWSResult(argResult)
{
	if (argResult.id == wsDuplicateID)
	{
		if(jf_IsWebServiceSuccess(callObj))
		{
			if(callObj.value.RtnBool == true)
				return true;
			else
				return false;
		}
		else
			return false;
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(CheckDataExist())//檢查鍵值是否已存在
				{
					if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
						bRtnbool = true;
				}
				else
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
	}
	return bRtnbool;
}

function CheckKeyObject()
{
	var strDept;
	var strRole;
	var strUser;
	var strErrMsg = "";
	var bRtnbool = true;

	strDept = document.all["dlDept_Text"].value;
	strRole = document.all["dlRole_Text"].value;
	strUser = document.all["dlUser_Text"].value;
	if (strUser == "")
	{
		strErrMsg = "作業人員不可空白\n" + strErrMsg;
	    //1050715 Zen 1050087  二代公文修改
		//document.all["dlUser_Text"].focus();
		$('#dlUser_Text').focus();
	}
	if (strRole == "")
	{
		strErrMsg = "作業角色不可空白\n" + strErrMsg;
	    //1050715 Zen 1050087  二代公文修改
		//document.all["dlRole_Text"].focus();
		$('#dlRole_Text').focus();
    }
	if (strDept == "")
	{
		strErrMsg = "單位名稱不可空白\n" + strErrMsg;
	    //1050715 Zen 1050087  二代公文修改
		//document.all["dldept_Text"].focus();
		$('#dldept_Text').focus();
    }
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}

	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	var bCheck = false;

	if (document.all.dg1 == null)
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無負責作業單位"])),"");
	}
	else
	{
		for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
		{
			if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
			{
				bCheck = true;
				break;
			}
		}
		if (!bCheck)
		{
			bRtnbool = false;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])),"");
		}
	}

	return bRtnbool;
}

var wsDuplicateID;
function CheckDataExist()
{
	//1140918	Cloud	1140839		新增申請類別選單-開啟之後才能維護，不會有新增模式的檢核，直接取消叫用
	//var strDept="";
	//var strRole="";
	//var strUser="";
	//var argDept = new Array(4);
	//var argRole = new Array(3);
	//var argUser = new Array(3);
	//var arKeyName = new Array(3);
	//var arKeyValue= new Array(3);
	

	////單位名稱
	//for (var iArr=0;iArr<document.all["dlDept"].options.length;iArr++)
	//{
	//	if (document.all["dlDept"].options[iArr].text == document.all["dlDept_Text"].value)
	//	{
	//		strDept = document.all["dlDept"].value;
	//		if (strDept != "")
	//			argDept = strDept.split(':');
	//	}
	//}
	////作業角色
	//for (var iArr=0;iArr<document.all["dlRole"].options.length;iArr++)
	//{
	//	if (document.all["dlRole"].options[iArr].text == document.all["dlRole_Text"].value)
	//	{
	//		strRole = document.all["dlRole"].value;
	//		if (strRole != "")
	//			argRole = strRole.split(':');
	//	}
	//}
	////作業人員
	//for (var iArr=0;iArr<document.all["dlUser"].options.length;iArr++)
	//{
	//	if (document.all["dlUser"].options[iArr].text == document.all["dlUser_Text"].value)
	//	{
	//		strUser = document.all["dlUser"].value;
	//		if (strUser != "")
	//			argUser = strUser.split(':');
	//	}
	//}

	//arKeyName[0]  = "OU_ID";
	//arKeyName[1]  = "ROLE_ID";
	//arKeyName[2] = "USER_ID";
	//arKeyValue[0] = argDept[0];
	//arKeyValue[1] = argRole[1];
	//arKeyValue[2] = argUser[2];

	//var arWSParam = new Array(5);
	//arWSParam[0] = "ASSIGNMENT";
	//arWSParam[1] = arKeyName;
	//arWSParam[2] = arKeyValue;
	//callObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	//wsDuplicateID = callObj.id;
	//return OnWSResult(callObj);
	return false;
}

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
		{
			document.all["H_DeptChange"].value = document.all["dlDept_Text"].value;
			//__doPostBack();//for .NET Framework 1.0
			//1140918	Cloud	1140839		新增申請類別選單-一併修正切換選單無作用問題
			__doPostBack("bDeptChange","");//for .NET Framework 1.1
			IsServerHandling = true;
			jf_ShowWaitState();
		}
	} 
}
//1141008 Cloud   1140839     北榮副校長為一層決行二級單位，經評估，一般二級單位已經不會有需要再分派管理科別的情況故修改，如為一層決行單位時，如有二級單位，增加提供二級單位選單
function dlSecT_Onblur() {
	if (odjf_CheckComboBox("dlSect")) {
		//值若變更時，觸動TextChange事件
		if (document.all["dlSect_Text"].value != document.all["H_Sect"].value) {
			document.all["H_SectChange"].value = document.all["dlSect_Text"].value;
			__doPostBack("bSectChange", "");
			IsServerHandling = true;
			jf_ShowWaitState();
		}
	}
}

function dlRole_onblur()
{
	if (odjf_CheckComboBox("dlRole"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlRole_Text"].value != document.all["H_Role"].value)
		{
			document.all["H_RoleChange"].value = document.all["dlRole_Text"].value;
			//__doPostBack();//for .NET Framework 1.0
			//1140918	Cloud	1140839		新增申請類別選單-一併修正切換選單無作用問題
			//__doPostBack("","");//for .NET Framework 1.1
			__doPostBack("bRoleChange","");//for .NET Framework 1.1
			IsServerHandling = true;
			jf_ShowWaitState();
		}
	} 
}

//1001101 David 1000566
function cb1_onclick()
{
	//清空以勾選的單位清單
	while(document.all["ddlCkeckOu"].options.length)
		document.all["ddlCkeckOu"].remove(0);
	//取得所有勾選項目，並重新加入至隱藏選單中
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cb1"].checked)
		{
			var opt = document.createElement("OPTION");
			opt.value = document.all["dg1__ctl"+iRow+"_txUnitNo"].value;
			opt.text = document.all["dg1__ctl"+iRow+"_txUnitName"].value;
			document.all["ddlCkeckOu"].options.add(opt);
		}
	}
	ShowCheckedOuName();
}

//1001101 David 1000566 如隱藏選單有值，顯示至畫面中
function ShowCheckedOuName()
{
	//清空原本的TABLE
	for (var i = document.all["tCkeckOu"].rows.length-1 ; i > 0 ; i--)
	{
	    //1050715 Zen 1050087  二代公文修改
	    //document.all["tCkeckOu"].children.tags("TBODY")[0].removeChild(document.all["tCkeckOu"].rows[i]);
	    document.all["tCkeckOu"].children[0].removeChild(document.all["tCkeckOu"].rows[i]);
	}

	//將目前勾選的單位顯示於畫面中
	if(jf_GetActionMode() == LayoutModeModify)
	{
		document.all["tCkeckOu"].style.display = "";

		for(var i = 0 ; i < document.all["ddlCkeckOu"].options.length ; i++)
		{
			var row = document.createElement("TR");
			var colOuName = document.createElement("TD");
		    //1050715 Zen 1050087  二代公文修改
			//colOuName.setAttribute("height","31px");
			//1100818	Joe		1100991		弱掃修正Client Potential XSS
			// colOuName.innerHTML = document.all["ddlCkeckOu"].options[i].text;
			colOuName.innerHTML = Htmlencode(document.all["ddlCkeckOu"].options[i].text);
			row.appendChild(colOuName);
		    //1050715 Zen 1050087  二代公文修改
			//document.all["tCkeckOu"].children.tags("TBODY")[0].appendChild(row);
			document.all["tCkeckOu"].children[0].appendChild(row);
		}
	}
	else
		document.all["tCkeckOu"].style.display = "none";
}


//1100818	Joe		1100991		弱掃修正Client Potential XSS
function Htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}