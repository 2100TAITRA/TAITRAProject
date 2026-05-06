/*	
DATE	SA		PRG		MSG_NO          DESC	
1000403 David	Zola	1000035 		允許儲存沒有機關代碼的來文機關預設來文字與主旨內容
1050426 David   Zen     1050087         二代公文修改
1060518 Leslie  Zen     1060215         innerText相關修改*/

var CurrOrgIdObj;
var CurrOrgNameObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050426 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050426 Zen 1050087 二代公文修改
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
		case "btOrgPrompt":
			CurrOrgIdObj = document.all.txOrgNo;
			CurrOrgNameObj = document.all.txOrgName;
			var strUrl = "";
		    //1050714 Zen 1050087 WEM010C1子視窗修改--begin
		    //strUrl = "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + CurrOrgIdObj.value;
			var path = document.all.H_Wed010C1Path.value;
			strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
		    //1050714 Zen 1050087 WEM010C1子視窗修改--end
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
			Page_BlockSubmit=true;
			break;
	}
}
//1050426 Zen 1050087 二代公文修改
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
	
    //1050426 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
		    //1050426 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
		    break;
	}
}

function CallBack(argCallerId)
{
	//來文機關查詢子視窗
	if(argCallerId == "WEM010C1")
	{
	    var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050714 Zen 1050087 WEM010C1子視窗修改
	    //var DeptArray = DeptInfo.split(',');
	    var DeptArray = DeptInfo.split('^');
		//David	Zola	1000035 帶回選擇的機關識別碼
		document.all["h_OrgID"].value = DeptArray[0];		
		CurrOrgNameObj.value = DeptArray[1];
		CurrOrgIdObj.value = DeptArray[2];	
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1050426 Zen 1050087 二代公文修改
	//jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,null);
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function ReturnValue(argSubNo,argSubject)
{
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = argSubNo;
    opener.document.all.lbReturnValue.options[0].value = argSubject;
    opener.window.CallBack("ODT130C1");
    close();
}

function OrgNo_onblur()
{
	if (document.all["txOrgNo"].value == "")
	{
		document.all["txOrgName"].value = "";
		//1000403 Zola	1000035 機關識別碼清為空字串
		document.all["h_OrgID"].value = ""; 
	}
	else
		//1000403 Zola 1000035 新增機關識別碼傳回參數
		GetOrgInfo(document.all.txOrgNo,document.all.txOrgName,document.all.h_OrgID);
}

//1000403 Zola 1000035 新增機關識別碼傳回參數
//function GetOrgInfo(argTxObj,argLbObj)
function GetOrgInfo(argTxObj,argLbObj,argOrgID)
{
	if(argTxObj.value == "")
		return;

	var wsParam = new Array();
	wsParam[0] = argTxObj.value;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);

	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
				
				//1000403 Zola 1000035 傳回機關識別碼 - START
				//argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);		//1000403 Zola 1000035 註記掉
				argOrgID.value = jf_Trim(CallWsObj.value._OrgID[0]);	
				argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);		//1000403 Zola 1000035 回傳"識別碼+機關名稱"		
				//1000403 Zola 1000035 傳回機關識別碼 - END
			}
			else
			{
				argLbObj.value = "";
				argTxObj.focus();
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["查無此機關代碼"])),"");
			}
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}
}
