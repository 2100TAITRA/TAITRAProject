/*
DATE	SA		PRG		MGR_NO			DESC
1050428 David   Zen     1050087         二代公文修改
1060518 Leslie  Zen     1060215         innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var CurrOrgIdObj;
var CurrOrgNameObj;

//1050428 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050428 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btOpenElec"));
	var btElec;
	if (document.all["dg1__ctl"+pNo+"_btOpenElec"] != null)
		btElec = document.all["dg1__ctl"+pNo+"_btOpenElec"].id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btHelp":
			var strUrl = "";
			/*
			strUrl = "III600.aspx?rtnObj=lbReturnValue&nMode=1";
			jf_OpenChildWin(strUrl, "III600", 700, 500 );
			*/
			CurrOrgIdObj = document.all.txOrgno;
			CurrOrgNameObj = document.all.txOrgName;
			var strUrl = "";
		    //1050518 Zen 1050087 WEM010C1子視窗修改--begin
			var path = document.all.H_Wed010C1Path.value;
			//strUrl = "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + CurrOrgIdObj.value;
			//jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
			strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all["h_OrgNo"].value + "&K1=WEM010";
			jf_OpenChildWin(strUrl, "WEM010C1", 1024, 768);
		    //1050518 Zen 1050087 WEM010C1子視窗修改--end
			Page_BlockSubmit = true;
			break;
	}
}

//1050428 Zen 1050087 二代公文修改
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
	
    //1050428 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050428 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			var index = 0;
			if (document.all["dlSecNo"].className == "DisplayOnly")
				index = document.all["dlSecNo"].selectedIndex;
			jf_ConfirmClean();
			document.all["dlSecNo"].selectedIndex = index;
		    //1050519 Zen 修正focus
			//document.all["txSDate"].focus();
			$('#txSDate').focus();
			break;
		case "btDelete":
			Page_BlockSubmit = true;
			
			//判斷是否有選取
			var nSelected=0;
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			var strCbDelete = "";
			for(var i=2;i<pDg1Len;i++)
			{
				strCbDelete = "dg1__ctl"+i+"_cbDelete";
				if(!document.all[strCbDelete].checked) continue;
				nSelected++;
			}
						
			if(nSelected==0)
			{
				alert("請先選取要刪除的公文");
				return;
			}
			
			if(confirm("確定要刪除所選的這 "+nSelected+" 筆公文?"))
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit();
			}
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId == "WEM010C1")
	{
	    var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050518 Zen 1050087 WEM010C1子視窗修改
	    //var DeptArray = DeptInfo.split(',');
	    var DeptArray = DeptInfo.split('^');
		CurrOrgNameObj.value = DeptArray[1];
		CurrOrgIdObj.value = DeptArray[2];		
	}
	
	if (argCallerId == "III600")
	{
		document.all["txOrgno"].value  = document.all["lbReturnValue"].options[0].value;
		document.all["txOrgName"].value= document.all["lbReturnValue"].options[1].value;
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
	jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, null);
	jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,null);
}

function OnWSResult(argResult)
{
    if (argResult.id == wsGetOrgNameID)
    {
		//檢查執行是否成功
		if(!argResult.error && argResult.value != "")
		{
			document.all["txOrgName"].value = argResult.value[0][1];
			document.all["txOrgno"].value = argResult.value[0][0];
		}
		else
		{
		    alert('查無此機關');
		    //1050519 Zen 修正focus
		    //document.all["txOrgno"].focus();
		    $('#txOrgno').focus();
		}
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
function ReturnValue(argDocNo)
{
	//只帶回公文文號，母視窗呼叫開啟功能鍵
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = argDocNo;
    opener.window.CallBack("ODT135");
    close();
}

function CheckBeforeSearch()
{
	var bRtn = true;
	var strSDate = document.all["txSDate"].value;
	var strEDate = document.all["txEDate"].value;
	if (strSDate == "" && strEDate == "")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期起訖欄位不可皆為空白"])),"");
	    //1050519 Zen 修正focus
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
	}
	return bRtn;
}

var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgno()
{
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno != "")
	{
		/*
		var arWSParam = new Array(1);
		arWSParam[0] = strOrgno;
		callObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, arWSParam);
		wsGetOrgNameID = callObj.id;
		OnWSResult(callObj);
		IsServerHandling = true;
		//jf_ShowWaitState();
		*/
		GetOrgInfo(document.all.txOrgno,document.all.txOrgName);
	}
	else
	{
		document.all["txOrgName"].value = "";
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
		    //1050519 Zen 修正focus
			//document.all[argObj].focus();
			$('#'+ argObj).focus();
		}
	}
}

function txOrgNo_onblur()
{//txOrgNo
	if(document.all.txOrgno.value == "")
	{
		//清除掉label中的值
		document.all.txOrgName.value = "";
	}
	else
	{
		GetOrgInfo(document.all.txOrgno,document.all.txOrgName);
	}
}

function GetOrgInfo(argTxObj,argLbObj)
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
				argTxObj.value = CallWsObj.value.OrgID[0];
				argLbObj.value = CallWsObj.value.OrgName[0];
				
			}		
		}
		else
		{
			alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
		}
	}		
}
