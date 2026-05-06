/*
DATE	SA		PRG		MGR_NO	DESC 
1000826			KEN	    1000826	新增
1031110 Cloud	Hank	1030603 新增支援二級單位
1060525 Cloud   Justin  1060400 二代公文修改
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
//1060525 Justin [1060400] 二代公文修改
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
    //1060525 Justin [1060400] 二代公文修改
    if (document.all["H_txDept"].value == "")
    {
        document.all["dlDept_Text"].value = "";
        document.all["dlSectName_Text"].value = "";
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060525 Justin [1060400] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
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
	    //日歷
	    /*1060525 Justin [1060400] 二代公文修改
		case 'btCalS':
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txSDate"], event.screenX, event.screenY);
			break;
		case 'btCalE':
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txEDate"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060525 Justin [1060400] 二代公文修改 
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
	
    //1060525 Justin [1060400] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		
		case "btPrint":
			Page_BlockSubmit = !jf_CheckRequiredFile(); 
		    //1060525 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_CheckRequiredFile(); 
		    //1060525 Justin [1060400] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}


/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    //1031110 Hank 處理第二級欄位(Reference from EAM005) [1030603] start
    if (argResult.id !=null)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{	
			if(argResult.id == CallWS_ID_SECT)
			{
				if(jf_IsWebServiceSuccess(argResult))
				{			
					WSResult = argResult.value;		
					//1060525 Justin [1060400] 二代公文修改
					//document.all["dlSectName_Container"].className = "";
					document.all["dlSectName_Container"].className = "custom-combobox";
					document.all["dlSectName"].className = "";
					document.all["dlSectName_Text"].className = "";
					
					document.all["dlSectName_Text"].value = "";
					
					while(document.all.dlSectName.options[0] != null)
					{
						document.all.dlSectName.options[0]=null;				
					}
					
					var DropListChild = document.createElement("OPTION");
					DropListChild.text = "";
					DropListChild.value = "";
					document.all.dlSectName.options.add(DropListChild);
					
					if(WSResult.SecNo.length != 0)
					{

						ClearDL(document.all["dlSectName"]);			
						
						var Blank_Data = document.createElement("OPTION");
						Blank_Data.text = "";
						Blank_Data.value = "";				
						document.all.dlSectName.options.add(Blank_Data);
													
						for(var i=0;i<WSResult.SecNo.length;i++)
						{
							var SectDropListChild = document.createElement("OPTION");
							SectDropListChild.text = WSResult.SecName[i];
							//為了與EA_LIB.CS中Function組出元素相同，額外新增兩欄位
							SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
							document.all.dlSectName.options.add(SectDropListChild);
						}
						if(document.all["dlSectName"].options.length > 10)
						{
							document.all["dlSectName"].size = 10;
						}
						else
							document.all["dlSectName"].size = document.all["dlSectName"].options.length;
						
						document.all["dlSectName_Container"].disabled = false;

					}
					else
					{				
						while(document.all.dlSectName.options[0] != null)
						{
							document.all.dlSectName.options[0]=null;				
						}
						document.all["dlSectName_Container"].disabled = true;	

					}
				}	
			}
			else
			{				
			    //1060525 Justin [1060400] 二代公文修改
			    //document.all["lbUpperClsName"].innerText = jf_Trim(argResult.value.RtnField0[0]);
			    document.all["lbUpperClsName"].textContent = jf_Trim(argResult.value.RtnField0[0]);
			}		
		}
    }    
    //1031110 Hank 處理第二級欄位(Reference from EAM005) [1030603] end
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//日期onblur

bHasCheck = false;

function CheckCDATE(argObj,strMsg)
{

if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
bHasCheck = true;

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
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1060525 Justin [1060400] 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			bHasCheck = false;
			return false;
		}
	}
		bHasCheck = false;
	return true;

}


function jf_CheckRequiredFile()
{
	
	var strErrMsg = "";
	if (document.all["txSDate"].value == "" && document.all["txEDate"].value == "")
	{
	    alert("點收日期起迄欄位不能皆為空");
	    //1060525 Justin [1060400] 二代公文修改
	    //document.all["txSDate"].focus();
	    $('#txSDate').focus();
		return false;

	}
	
	
	var strSDate = document.all.txSDate.value;
	var strEDate = document.all.txEDate.value;
	
	if(!CheckCDATE("txSDate","點收日期(起)",true))
		return false;

	if(!CheckCDATE("txEDate","點收日期(訖)",true))
		return false;

	// 當起值 > 迄值需作起迄交換	
	if(strSDate != "" && strEDate != "" && strSDate > strEDate )
	{
		document.all.txSDate.value = strEDate;
		document.all.txEDate.value = strSDate;
	}	
		return true ;
	
}


//1031110 Hank 下拉選單變更事件 [1030603] start
var CallWS_ID_SECT;

//dlDept下拉選單連動(Reference from EAM005)
function SyncDL()
{	
	if (document.all["dlDept_Text"].value != "")
	{
		var strArr1 = new Array();
		var strArr2 = new Array();	
		var bAction = true;
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlDept"].length ; i++)
		{
			if(document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value )
			{
				document.all["dlDept"].selectedIndex = i;
				document.all["H_txDept"].value = document.all["dlDept"].options[i].value.split(':')[0];
			    //1060525 Justin [1060400] 二代公文修改
				document.all["H_txDeptN"].value = document.all["dlDept"].options[i].value.split(':')[1];
				bDept = true;
				break;
			}
		}
		
		if(document.all["dlDept"].selectedIndex != -1)
		{
			strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["H_txDept"].value = strArr1[0];
		    //1060525 Justin [1060400] 二代公文修改
			document.all["H_txDeptN"].value = strArr1[1];
		}
		else
			bAction = false;

		//取二級單位用
		var param1 = new Array(3);
		param1[0] = false;
		param1[1] = true;
		param1[2] = strArr1[0];
		
		var RtnObjSect;	
		
		if(bDept)
		{
			if(bAction)
			{	
			    document.all["H_txSectName"].value = "";
			    //1060525 Justin [1060400] 二代公文修改
			    document.all["H_txSectN"].value = "";
				RtnObjSect = jf_CallWS("../EALIB/EA_LIB.asmx","GetDepts",false,param1);
				CallWS_ID_SECT = RtnObjSect.id;
				OnWSResult(RtnObjSect);
			}
		}
		else
		{
			ClearDL(document.all["dlSectName"]);
		}

	}
	else
	{
	    ClearDL(document.all["dlSectName"]);
	    //1060525 Justin [1060400] 二代公文修改
	    document.all["H_txDeptN"].value = "";
	    document.all["H_txSectName"].value = "";
	    document.all["H_txSectN"].value = "";
	}

}
//1031111 Hank 下拉選單存值 [1030603]
function SyncSc()
{
	if(jf_Trim(document.all["dlSectName_Text"].value)!="")
	{
		for ( var i = 0 ; i < document.all["dlSectName"].length ; i++)
		{
			if(document.all["dlSectName"].options[i].text == document.all["dlSectName_Text"].value )
			{
				document.all["dlSectName"].selectedIndex = i;
				document.all["H_txSectSelect"].value = document.all["dlSectName"].options[i].value.split(':')[2];
				break;
			}
		}
	}
	else
	{
		document.all["H_txSectSelect"].value = "";
	}
	
	if (document.all["dlSectName_Text"].value != "")
	{
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlSectName"].length ; i++)
		{
			if(document.all["dlSectName"].options[i].text == document.all["dlSectName_Text"].value )
			{
				document.all["dlSectName"].selectedIndex = i;
				document.all["H_txSectName"].value = document.all["dlSectName"].options[i].value.split(':')[2];
			    //1060525 Justin [1060400] 二代公文修改
				document.all["H_txSectN"].value = document.all["dlSectName"].options[i].value.split(':')[3];
				bSect = true;
				break;
			}
		}
		
	}
}
//將DropDownList裡的item清除 (Reference from EAM005)
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	
    //1031110 Hank 將cssClass調整為InputFieldLabel [1030603]
    //1060525 Justin [1060400] 二代公文修改
	//argObj.className = "InputFieldLabel";
    //document.all[argObj.id + "_Text"].className = "InputFieldLabel";
	argObj.className = "custom-combobox";
	document.all[argObj.id + "_Text"].className = "custom-combobox";
	//1031110 Hank 清除text [1030603]
	document.all[argObj.id + "_Text"].value =  "";
		
	return;
}

//1031119 Hank 下拉選單onblur處理 [1030603]
function dlDeptOnblur(argSectObj)
{
	var bDept=false;
	var strSectTemp = document.all["H_txDept"].value;
	for ( var i = 0 ; i < document.all["dlDept"].length ; i++)
	{
		if(document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value )
		{
			document.all["dlDept"].selectedIndex = i;
			document.all["H_txDept"].value = document.all["dlDept"].options[i].value.split(':')[0];
			bDept = true;
			break;
		}
	}
	
	var strSectValueTemp="";
	if(document.all["dlDept"].selectedIndex>=0)
	{
		strArrTemp = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
		if(strArrTemp.length>=4)
		{
			strSectValueTemp = strArrTemp[0];
		}
	}

	if(strSectTemp!=strSectValueTemp)
	{
		//取二級單位
		var param1 = new Array(3);
		param1[0] = false;
		param1[1] = true;
		param1[2] = document.all["H_txDept"].value;
		
		var RtnObjSect;	
		
		if(bDept)
		{
			if(param1[2]!="")
			{	
			    document.all["H_txSectName"].value = "";
			    //1060525 Justin [1060400] 二代公文修改
			    document.all["H_txSectN"].value = "";
				RtnObjSect = jf_CallWS("../EALIB/EA_LIB.asmx","GetDepts",false,param1);
				CallWS_ID_SECT = RtnObjSect.id;
				OnWSResult(RtnObjSect);
			}
		}
		else
		{
			ClearDL(document.all["dlSectName"]);
		}
	}
	
}

//1031110 Hank 下拉選單變更事件 [1030603] end
