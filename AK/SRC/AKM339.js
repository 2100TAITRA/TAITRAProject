/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060218      Joe		1050087 二代升級
 * 1060724      Joe		1050087 二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;

	//1060218	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060218	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1060218	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060218	Joe	1050087	二代系統升級
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

//1060218	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060218	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			CheckFileValueProcess();
			//IsServerHandling = true;
			var pdlRem="";
			var ptbDesc="";
			var pMsg="";
			var IsFocus=true;
			for(var i=2;i<12;i++)
			{
				pdlRem="dg1__ctl"+i+"_dlREM";
				ptbDesc="dg1__ctl"+i+"_tbDESC";
				if ((document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value=="" || document.all[ptbDesc].value=="") && (document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value!="" || document.all[ptbDesc].value!=""))
				{
					pMsg+="序號"+(i-1);
					if (document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value=="")
					{
						pMsg+="，附註項欄位";
						
						if (IsFocus)
						{
							//1060218	Joe	1050087	二代系統升級，調整focus寫法
							//document.all[pdlRem].focus();
							$('#' + pdlRem).focus();
						}
						
						IsFocus=false;
					}
						
					if (document.all[ptbDesc].value=="")
					{
						pMsg+="，附註內容欄位";
						
						if (IsFocus)
						{
							//1060218	Joe	1050087	二代系統升級，調整focus寫法
							//document.all[ptbDesc].focus();
							$('#' + ptbDesc).focus();
						}
						
						IsFocus=false;
					}
					
					pMsg+="不可空白\n";
				}
			}
			
			if (pMsg!="")
			{
				alert(pMsg);
				Page_BlockSubmit = true;
			}
			//1060218	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1060218	Joe	1050087	二代系統升級--S
		// case "btPrint":
			// Page_BlockSubmit = !jf_ConfirmPrint();
			// jf_ToolBarSubmit();
			// break;
		// case "btPreview":
			// Page_BlockSubmit = !jf_ConfirmPreview();
			// jf_ToolBarSubmit();
			// break;
		//1060218	Joe	1050087	二代系統升級--E
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();	
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
//mickey 03/09/27 新增
//名稱jf_dlTypeOnChanged()
//作用：1.取出編目日期
//		
function CheckFileValueProcess()
{
	var KeyName = new Array(2);
	KeyName[0] = "SOURCE_ORGNO";
	KeyName[1] = "DOC_NO";
	var KeyValue = new Array(2);
	KeyValue[0] = document.all["tbOrgNo"].value;
	//1060724	Joe		1050087		二代公文修改
	// KeyValue[1] = document.all["tbDocNo"].value;
	KeyValue[1] = document.all["_k1"].value;
	var RtnFld = new Array(1);
	RtnFld[0] = "INPFILE_DATE";
	var OrdFldName = new Array(1);
	OrdFldName[0] = "DOC_NO";
	var param = new Array(5);
	param[0] = "DOC_MAIN";
	param[1] = KeyName;
	param[2] = KeyValue;
	param[3] = RtnFld;
	param[4] = OrdFldName;
	RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue",false,param);
	//1060724	Joe		1050087		二代公文修改
	// document.all["tbInpFileDate"].textContent = RtnObj.value.RtnField0[0] ;
	document.all["tbInpFileDate"].value = RtnObj.value.RtnField0[0] ;
}

