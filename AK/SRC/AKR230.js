/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 104.06.09	Gabby	-------	修改WebService NameSpace
 * 1040714		Kevin_C	1040141	修正XSS
 * 1040810		Kenny	1040480	修正PostBack後一級單位選項及單位下拉選單異常
 * 1060220      Justin  1050087 二代公文修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060220  Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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
		case "btStatic":
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;	
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["dlDept"].options.selectedIndex=0;
			document.all["rbFirst"].checked=true;
			break;
		case "btPrint":
		case "btPreview":
		     Page_BlockSubmit = false;
			//年報表
		     if(document.all["rbYearRpt"].checked)
			 {
				if(document.all["txYear"].value == "")
				{
					alert("列印年度欄位不可為空白");
					Page_BlockSubmit = true;
				}
			}
			else//月報表
			{
				if(document.all["txStart"].value=="" || document.all["txEnd"].value=="")
				{
					alert("月份欄位不可空白");
					Page_BlockSubmit = true;
				}
				else
				{
					if(parseInt(document.all["txStart"].value,10)>parseInt(document.all["txEnd"].value,10))
					{
					    alert("列印月份起不可以大於迄!!");
					    //1060220  Justin [1050087] 二代公文修改
					    //document.all["txStart"].focus();
					    $('#txStart').focus();
						Page_BlockSubmit = true;
					}
				}
			}
		    //1060220  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKP210")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
  			if (strMaxUseDate == "")
  			    //1060220  Justin [1050087] 二代公文修改
  			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
  			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
  			    //document.all["lbMaxYear"].innerText = "目前統計最大年月："+
  			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
		}
	}
}

function ClientOnLoad()
{
    //1040810   Kenny   [1040480]   修正PostBack後一級單位選項及單位下拉選單異常
    jfDeptOnChange();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}
function DateBlur(argDate)
{
	var xObjectName = document.activeElement.id;
		
	if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
		return;
	if (document.all[argDate].value=="")
		return;
	if (!jf_CheckCDATE(document.all[argDate].value+"01"))
	{
	    alert("日期格式錯誤");
	    //1060220  Justin [1050087] 二代公文修改
	    //document.all[argDate].focus();
	    $('#' + argDate.id).focus();
	}
}

function jfDeptOnChange()
{
	if (document.all["dlDept"].selectedIndex!=0)
	{
		if(!document.all["rbPerson"].checked)
			document.all["rbSecond"].checked=true;		
		
		document.all["rbFirst"].disabled=true;
	}
	else
		document.all["rbFirst"].disabled=false;
}

/*function DoClick()
{
	if (document.all["dlDept"].selectedIndex!=0)
		document.all["rbSecond"].checked=true;
}*/

function handleYearField(argYearFieldName)
{
	//不處理空白字串
	if(document.all[argYearFieldName].value == "")
		return;
	
	//將字串補碼3碼0
	document.all[argYearFieldName].value = jf_PADL(document.all[argYearFieldName].value,3,"0");	
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060220  Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

