/*
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050606  Justin  1050087 二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

var xDoc = document.all;

//1050606 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050606 Justin 1050087 二代公文修改 
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
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
		/*
		case "":
			break;
		*/
	}	
}

//1050606 Justin 1050087 二代公文修改 
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
	
    //1050606 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
		    Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if ( jf_CheckObjectValue() )
				{
					// 新增模式需檢查鍵值是否已存在
					if (jf_GetActionMode()==LayoutModeNew)
					{
						Page_BlockSubmit= true;
						
						var arKeyName = new Array(1);
						var arKeyValue = new Array(1);
						arKeyName[0] = "POST_NO";
						arKeyValue[0] = document.all["txPostNo"].value;
						
						var arWSParam = new Array(3);
						arWSParam[0] = "POST_MAIN";
						arWSParam[1] = arKeyName;
						arWSParam[2] = arKeyValue;
						
						callObj = jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
						if(callObj.error)
							alert(callObj.errorDetail.string);
						else
						{
							wsCheckDataKeyID = callObj.id;
							OnWSResult(callObj);
						}
					}
					else
						Page_BlockSubmit = false;					
				}
				else
					Page_BlockSubmit = true;
				
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
			
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050606 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean())
			    //1050606 Justin 1050087 二代公文修改 
			    //xDoc.txPostNo.focus();
			    $('#' + txPostNo).focus();
			break;
			break;
		case "btSearch":
			break;
	
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    ShowMsg();
    /*1050606 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null)*/
}

var wsCheckDataKeyID;
function OnWSResult(argResult)
{
    if(argResult.id == wsCheckDataKeyID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnBool == true)
				if ( window.confirm(jf_GetErrMsg(KeyExist)) == false)
				{
				    Page_BlockSubmit = true;
				    //1050606 Justin 1050087 二代公文修改 
				    //xDoc.txPostNo.focus();
				    $('#' + txPostNo).focus();
				}
				else
					Page_BlockSubmit = false;
			else
				Page_BlockSubmit = false;
		}
	}
}
function jf_CheckObjectValue()
{
	var strErr = "";
	var xFocusObj;
	if (xDoc.txPostNo.value == "")
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["遞送方式代號"]))+"\n";
		if (xFocusObj == null)
		    //1050606 Justin 1050087 二代公文修改
		    //xFocusObj = xDoc.txPostNo;
		    xFocusObj = txPostNo;
	}
	if (jf_Trim(xDoc.txPostName.value) == "" && xFocusObj == null)
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["遞送方式名稱"]))+"\n";
		if (xFocusObj == null)
            //1050606 Justin 1050087 二代公文修改
		    //xFocusObj = xDoc.txPostName;	
		    xFocusObj = txPostName;
			
	}

	if (strErr !="")
	{
	    jf_ShowMeg(strErr, "");
	    //1050606 Justin 1050087 二代公文修改
	    //xFocusObj.focus();
	    $('#' + xFocusObj).focus();
		return false;
	}
	else
	{
		return CheckPostCostAndAlert();
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050606 Justin 1050087 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

function CheckPostCostAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	var strWeightChk = ",";
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//重量不為空白
		var weight = document.all["dg1__ctl" + i + "_txWeight"].value;
		if(weight != "")
		{

			//郵資金額不可空白
			var objCost = document.all["dg1__ctl" + i + "_txCost"];
			if(objCost.value == "")
			{
				InValidName += ",郵資金額欄位不可為空白";
				InValidControlName = "dg1__ctl" + i + "_txCost";
			}
			else
			{	
				//郵資金額檢查
				var str = objCost.value;
				var num = parseFloat(str);
				if ( num != str )
				{
					InValidName += ",郵資金額必須為數字。";
					InValidControlName = "dg1__ctl" + i + "_txCost";
				}
				else if ( num < 0 )
				{
					InValidName += ",郵資金額必須大於零。";
					InValidControlName = "dg1__ctl" + i + "_txCost";
				}
				else if ( num >= 100000 )
				{
					InValidName += ",郵資金額必須小於100000。";
					InValidControlName = "dg1__ctl" + i + "_txCost";
				}								
			}
			
			//重量欄位不可重覆設定
			if (strWeightChk.indexOf( "," + weight + "," ) == -1)
				strWeightChk += weight + ",";
			else
			{
				InValidName += ",重量欄位不可重覆設定";
				InValidControlName = "dg1__ctl" + i + "_txWeight";
			}
										
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1050606 Justin 1050087 二代公文修改 
			    //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbSeq"].innerText + "中" + InValidName])), "");
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序號" + document.all["dg1__ctl" + i + "_lbSeq"].textContent + "中" + InValidName])), "");
			    /*1050606 Justin 1050087 二代公文修改
			    document.all[InValidControlName].focus();*/
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
}