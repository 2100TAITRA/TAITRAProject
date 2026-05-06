/*
 * 0990708          Johnny  0990401 新增公文性質查詢選項
 * 1050531 Kevin    Zen     1050087 二代公文修改
 * 1060518 Leslie   Zen     1060215 innerText相關修改 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050531 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;


//1050531 Zen 1050087 二代公文修改--begin
//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050531 Zen 1050087 二代公文修改--end

//0990708 新增公文性質查詢選項 0990401 Johnny
Change_BType(document.all.dlDocProperty.options[document.all.dlDocProperty.selectedIndex].value)//初始化BTypeNo
select_BType(document.all.H_BTypeNo.value)//選擇btypeno

//0960524 950758 MATTE 
function jf_rbPrize_onclick()
{
	if(document.all["rbPrize"].checked)
	{
	  	document.all["ComPrint"].disabled = true;
		document.all["SeprPrint"].disabled = true;
	} 
}
//0960524 950758 MATTE
function jf_rbDeptUser_onclick()
{
	if(document.all["rbDept"].checked||document.all["rbUser"].checked)
	{
	  	document.all["ComPrint"].disabled = false;
		document.all["SeprPrint"].disabled = false;
	}
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
//1050531 Zen 1050087 二代公文修改
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
	
    //1050531 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			//0990708 新增公文性質查詢選項 0990401 Johnny
			document.all.H_BTypeNo.value=document.all.dlBTypeNo.options[document.all.dlBTypeNo.selectedIndex].value;//紀錄選取的BTypeNo
			
			Page_BlockSubmit = !CheckBeforePrint();
		    //1050531 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
			{
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["lbMaxYear"].innerText = "目前統計最大年月：" +
			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
				//iris 修改檢核列印月份不可大於目前統計月份之欄位
			    //1060518 Zen 1060215 innerText相關修正			    //document.all["h_txYM"].innerText = strMaxUseDate;
			    document.all["h_txYM"].value = strMaxUseDate;
			}
		}
	}
}

function ClientOnLoad()
{
	if(document.all["MTable1"].disabled == true)
	{
		document.all["MTable1"].disabled = true;
		document.all["txSMon"].disabled = true;
		document.all["txEMon"].disabled = true;
		document.all["dlBTypeNo"].disabled = true;
	}
	if(document.all["rbPrize"].checked)
	{
	  	document.all["ComPrint"].disabled = true;
		document.all["ComPrint"].checked = true;
		document.all["SeprPrint"].disabled = true;
	} 
	
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
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

//月份onblur
function CheckMonth(argObj,strMsg)
{
	var strMonth = document.all[argObj].value;
	if (strMonth != "")
	{
		if (strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,'0');
			document.all[argObj].value = strMonth;
		}
		if (!jf_CheckCDATE(strMonth+"01"))
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050531 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
		}
	}
}

function CheckBeforePrint()
{
	var bRtn = true;
	var strSMon = jf_Trim(document.all["txSMon"].value);
	var strEMon = jf_Trim(document.all["txEMon"].value);
	if (strSMon + strEMon == "")
	{
		bRtn = false;
	    //1050531 Zen 1050087 二代公文修改
		//document.all["txSMon"].focus();
		$('#txSMon').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印月份不可皆為空白"])),"");
	}
	if(bRtn==true)
		bRtn= ConfirmData();
	return bRtn;
}
function ConfirmData()
{
		if(document.all.h_txYM.value=="")
		{
			return  false;
		}
		var bRtnbool = true;
		var year1 = parseInt(document.all.txSMon.value.substr(0,3));
		if(year1 == 0)
			year1 = parseInt(document.all.txSMon.value.substr(1,2));
		var month1 = parseInt(document.all.txSMon.value.substr(3,2));
		if(month1 == 0)
			month1 = parseInt(document.all.txSMon.value.substr(4,1));
			
		var year2 = parseInt(document.all.h_txYM.value.substr(0,3));
		if(year2 == 0)
			year2 = parseInt(document.all.h_txYM.value.substr(1,2));
		var month2 = parseInt(document.all.h_txYM.value.substr(3,2));
		if(month2 == 0)
			month2 = parseInt(document.all.h_txYM.value.substr(4,1));
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
		    //1050531 Zen 1050087 二代公文修改
			//document.all["txSMon"].focus();
			$('#txSMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
		year1 = parseInt(document.all.txEMon.value.substr(0,3));
		if(year1 == 0)
			year1 = parseInt(document.all.txEMon.value.substr(1,2));
		month1 = parseInt(document.all.txEMon.value.substr(3,2));
		if(month1 == 0)
			month1 = parseInt(document.all.txEMon.value.substr(4,1));
			
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
		    //1050531 Zen 1050087 二代公文修改
			//document.all["txEMon"].focus();
			$('#txEMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
	return bRtnbool;
}

//0990708 新增公文性質查詢選項 0990401 Johnny --start
function Change_BType(argValue)
{
	document.all.dlBTypeNo.length=0;
	//加入一筆空的
	document.all.dlBTypeNo.options.add(new Option("","") );
	if(argValue != "")
	{
		for(var n=0; n < document.all.H_dlBType.length; n++)
		{
			if(document.all.H_dlBType.options[n].value.split(':')[0] == argValue)
				document.all.dlBTypeNo.options.add(new Option(document.all.H_dlBType.options[n].text,document.all.H_dlBType.options[n].value.split(':')[1]) );
				
		}
	}
	else//重新加入全部BTYPENO
	{
		for(var n=0; n < document.all.H_dlBType.length; n++)
			document.all.dlBTypeNo.options.add(new Option(document.all.H_dlBType.options[n].text,document.all.H_dlBType.options[n].value.split(':')[1]) );
	}
}

function select_BType(argValue)
{
	for(var n=0; n < document.all.dlBTypeNo.length; n++)
		if(document.all.dlBTypeNo.options[n].value == argValue)
			document.all.dlBTypeNo.selectedIndex=n;
}
//0990708 --end