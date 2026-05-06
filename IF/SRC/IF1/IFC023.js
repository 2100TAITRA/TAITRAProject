/* *
 * Date		SA			PG			MGR_NO		DESC
 * 1040204	Kevin		Kevin_C		1040410		新增程式
 * 1051201  Kevin       Justin      1050087     二代公文修改
 * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1051201 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	$('.footStatus').attr('class', 'hidden');
	//1060614 Cloud 升級二代主視窗過小時，畫面會被壓縮-配合調整
	if (document.all.dg2)
	{
		$("#dg2head tr").css("display", "flex");
		$("#dg2 tr").css("display", "flex");
	}
	else
	{
		$("#dg1head tr").css("display", "flex");
		$("#dg1 tr").css("display", "flex");
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051201 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051201 Justin [1050087] 二代公文修改 
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
	
    //1051201 Justin [1050087] 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btConfirm":
			Page_BlockSubmit = true;
			ReturnValue();
			break;
	}
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
/*Start	回傳物件的宣告	*/
function CGroupUser()
{
	this.Account	= "";
	this.Name	= "";
}
function CGroup()
{
	//Constant data
	this.GroupNo	= "";
	this.GroupName	= "";
	this.GroupUser	= new Array();
	//Methods
	this.AddUser		= AddGroupUser;
	this.GetUserCount	= CalcUserCount;
}
function AddGroupUser(argAccount, argName)
{
	var gUser = new CGroupUser();
	gUser.Account	= argAccount;
	gUser.Name	= argName;
	this.GroupUser[this.GroupUser.length] = gUser;
}
function CalcUserCount()
{
	return this.GroupUser.length;
}
/*End	回傳物件的宣告	*/

function ReturnValue()
{
    var strGroupValue = document.getElementById("dlGroup").options[document.getElementById("dlGroup").selectedIndex];
    if (strGroupValue.value.split("|")[1] == "1")
    {
        if(document.all.dg2)
        {
            var retGroup = new CGroup();
            retGroup.GroupNo = strGroupValue.value.split("|")[0];
            retGroup.GroupName = strGroupValue.text;
            for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++) {
                //1051201 Justin [1050087] 二代公文修改
                //var acc = document.all["dg2__ctl" + iRow + "_txDeptNo"].innerText;
                //var name = document.all["dg2__ctl" + iRow + "_lbDeptName"].innerText;
                var acc = document.all["dg2__ctl" + iRow + "_txDeptNo"].textContent;
                var name = document.all["dg2__ctl" + iRow + "_lbDeptName"].textContent;
                retGroup.AddUser(acc, name);
            }
            if (IsFrame()) {
                //frames
                if (window.parent.parent.fnAddGroupTarget)
                    window.parent.parent.fnAddGroupTarget(retGroup);
            }
            else {
                returnValue = retGroup;
                window.opener = window.parent;
                window.close();
                return;
            }
        }
    }
    else
	if(document.all.dg1)
	{
		var retGroup = new CGroup();
		var selectedObj = document.all.dlGroup.options[document.all.dlGroup.selectedIndex];
		//retGroup.GroupNo	= selectedObj.value;
		retGroup.GroupNo	= strGroupValue.value.split("|")[0];
		retGroup.GroupName	= selectedObj.text;

		for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
		{
		    //1051201 Justin [1050087] 二代公文修改
			//var acc	= document.all["dg1__ctl"+iRow+"_lbUserName"].innerText;
			//var name= document.all["dg1__ctl"+iRow+"_lbEmpName"].innerText;
		    var acc = document.all["dg1__ctl" + iRow + "_lbUserName"].textContent;
		    var name = document.all["dg1__ctl" + iRow + "_lbEmpName"].textContent;
			retGroup.AddUser(acc, name);
		}

		if(IsFrame())
		{
			//frames
			if(window.parent.parent.fnAddGroupTarget)
				window.parent.parent.fnAddGroupTarget(retGroup);
		}
		else
		{
			returnValue = retGroup;
			window.opener = window.parent;
			window.close();
			return;
		}
	}
}
function IsFrame()
{
	if(window.parent.parent != window.parent)
		return true;
	return false;
}