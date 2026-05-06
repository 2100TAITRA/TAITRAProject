/*
DATE 	SA		PRG		MGR_NO		DESC
1040320	David	Kevin_C	1040147		新增程式
1040925	David	Kenny	1040701		一併修正角色選擇後又切回空白選項仍可順利儲存錯誤
1051121	David   Kenny	1050087	    二代公文系統相關修改
1110319	David	Joe		1101416		依系統參數修改回閱名稱
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1051121	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1110319	Joe		1101416		依系統參數修改回閱名稱
	if (document.all.RESIGN_SUBFOLDER.value != "")
		document.title = document.title.replace("回閱", document.all.RESIGN_SUBFOLDER.value);
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051121	Kenny   [1050087]	二代公文系統相關修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1051121	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
			var strErrMsg="";
			if(document.all["H_OUID"].value=="")
				strErrMsg += "訊息擁有單位不可空白\n";
			if(document.all["H_RoleID"].value=="")
				strErrMsg += "訊息擁有角色不可空白";
			if(strErrMsg!="")
			{
				Page_BlockSubmit = true;
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
			}
			else
				Page_BlockSubmit = false;
			//1051121	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1051121	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1051121	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1051121	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var InValidName = "";
	var strCompare1="";
	var strCompare2="";
	var strCount;//紀錄重複的列
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//可指定單位不為空白時
		if(document.all["dg1__ctl" + i + "_H_DgOUID"].value != "")
		{
			//可指定角色不可空白
			if(document.all["dg1__ctl" + i + "_H_DgRoleID"].value == "")
			{
				InValidName += ",可指定角色不可空白";			
			}
			nCount="";
			for(var j = i+1; j <= document.all.dg1.rows.length; j++)
			{
				//可指定單位不為空白時
				if(document.all["dg1__ctl" + j + "_H_DgOUID"].value != "")
				{
					//可指定單位+可指定角色不可重複
					strCompare1 = document.all["dg1__ctl" + i + "_H_DgOUID"].value+document.all["dg1__ctl" + i + "_H_DgRoleID"].value
					strCompare2 = document.all["dg1__ctl" + j + "_H_DgOUID"].value+document.all["dg1__ctl" + j + "_H_DgRoleID"].value
					if(strCompare1 == strCompare2)
						nCount = nCount+(j-1)+";";
				}
			}
			if(nCount!="")
			{
				InValidName += ",可指定單位+可指定角色與序"+nCount.split(";")[0];
				for(var j = 1; j < nCount.split(";").length-1; j++)
				{
					InValidName += "、"+nCount.split(";")[j];
				}
				InValidName+="重複";
			}
						
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
                //1051121	Kenny   [1050087]	二代公文系統相關修改
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");
				return false;
			}
		}
	}
		
	return true;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlDeptOnChange(DeptID,SectID,RoleID,H_OUID,H_RoleID)
{
	var dlDeptValue = document.all[DeptID].options[document.all[DeptID].selectedIndex].value;
	var dlSect = document.all[SectID];
	var HdlSect = document.all["H_dlSect"];
	var dlRole = document.all[RoleID];
	var HdlRole = document.all["H_dlRole"];
	fnClearDropDownList(dlSect);
	fnClearDropDownList(dlRole);
	dlSect.options.add(new Option("",""));
	dlRole.options.add(new Option("",""));
	for(var i=0;i<HdlSect.options.length;i++)
	{
		if(HdlSect.options[i].value.substring(0,2) == dlDeptValue)
			dlSect.options.add(new Option(HdlSect.options[i].text,HdlSect.options[i].value))
	}
	for(var i=0;i<HdlRole.options.length;i++)
			if(HdlRole.options[i].value.split(";")[0]==dlDeptValue)
				dlRole.options.add(new Option(HdlRole.options[i].text,HdlRole.options[i].value))
	
	//將單位代碼放入隱藏欄位
	document.all[H_OUID].value=dlDeptValue;
	document.all[H_RoleID].value="";
}
function dlSectOnChange(DeptID,SectID,RoleID,H_OUID,H_RoleID)
{
	var strSectValue = document.all[SectID].options[document.all[SectID].selectedIndex].value;
	var dlRole = document.all[RoleID];
	var HdlRole = document.all["H_dlRole"];
	fnClearDropDownList(dlRole);
	dlRole.options.add(new Option("",""));
	if(document.all[SectID].selectedIndex < 1)
	{
		strSectValue = document.all[DeptID].options[document.all[DeptID].selectedIndex].value;
	}
	for(var i=0;i<HdlRole.options.length;i++)
			if(HdlRole.options[i].value.split(";")[0]==strSectValue)
				dlRole.options.add(new Option(HdlRole.options[i].text,HdlRole.options[i].value))
	//將單位代碼放入隱藏欄位
	document.all[H_OUID].value=strSectValue;
	document.all[H_RoleID].value="";
}
function dlRoleOnChange(RoleID,H_RoleID)
{
	//將角色代碼放入隱藏欄位
	document.all[H_RoleID].value = document.all[RoleID].options[document.all[RoleID].selectedIndex].value.split(";")[1];
	//1040925	Kenny	[1040701]	修正角色選擇後又切回空白選項仍可順利儲存錯誤
	if (document.all[RoleID].selectedIndex == 0)
		document.all[H_RoleID].value = "";
}
function fnClearDropDownList(obj)//專用呼叫清空控制項
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);			
}
