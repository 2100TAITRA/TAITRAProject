/***************************************************************************************************
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號		概要
 * -------------------------------------------------------------------------------------------------
 * 2011.08.18	Jeff		1000631		新增程式
 * 1060516      Justin      1060400     二代公文修改
 * *************************************************************************************************/
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
var strTableFields = new Array("_lbDocNo", "_hlAppNo", "_lbSiType","_lbAppDate","_lbStatus","_lbCls","_lbKYear","_lbMediaNo","_lbFileCnt","_lbFileUnit","_lbItName","_lbItFormat");
//1060516 Justin [1060400] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	GetComBoValue("dlDept_Text","dlDept");
	GetComBoValue("dlUser_Text","dlUser");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060516 Justin [1060400] 二代公文修改
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
	    /*1060516 Justin [1060400] 二代公文修改
		case "btCalendarS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txSendS, event.screenX, event.screenY);
           break;
       case "btCalendarE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txSendE, event.screenX, event.screenY);
           break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060516 Justin [1060400] 二代公文修改 
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
	
    //1060516 Justin [1060400] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if(Comcheck() && SyncDL("dlUser_Text","dlUser","") && BeforeSearch() && CheckBeforeSearch())
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			if(document.all.dg1==null)
			{
				Page_BlockSubmit = true;
				alert("請先做查詢動作!");
			}
			else  if(!Checkdg())
			{
				Page_BlockSubmit = true;
				alert("至少勾選一筆資料!");
			}
			else if(Comcheck())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
			    //1060516 Justin [1060400] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
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
    //1031120 Hank 處理第二級欄位(Reference from EAM005) [1030603] start
    if (argResult.id !=null)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{	
			if(argResult.id == CallWS_ID_SECT)
			{
				if(jf_IsWebServiceSuccess(argResult))
				{			
					WSResult = argResult.value;		
					
					document.all["dlSectName_Container"].className = "";
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
			    //1060516 Justin [1060400] 二代公文修改
			    //document.all["lbUpperClsName"].innerText = jf_Trim(argResult.value.RtnField0[0]);
			    document.all["lbUpperClsName"].textContent = jf_Trim(argResult.value.RtnField0[0]);
			}		
		}
    }    
    //1031120 Hank 處理第二級欄位(Reference from EAM005) [1030603] end
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

//組出回傳值
function ReturnValue(argLink)
{
    
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;

	    opener.window.CallBack("UDI100");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查是否有勾選
function Checkdg()
{
	var InOk=false;
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			InOk=true;
		}
	}
	return InOk;

}
//Combobox Onblur處理
function SyncDL(argObject,argName)
{	
	var bDept = false;
	var IsOk=true;
	//如果不為空
	if (jf_Trim(document.all[argObject].value) != "")
	{
		for ( var i = 0 ; i < document.all[argName].length ; i++)
		{
			if(document.all[argName].options[i].text == document.all[argObject].value )
			{
				document.all[argName].selectedIndex = i;
				bDept = true;
				break;
			}
		}		
		if (!bDept)
		{	
				//1031120  Hank 不明作用 移除 [1030603]
				//return;	
				//1031120  Hank 找不到則selectIndex設-1 並清除隱藏value欄位[1030603]
				document.all[argName].selectedIndex =-1;
				document.all["H_"+argName+"_Value"].value = "";	
				//1031120  Hank 允許使用者手動輸入 故不存在選單內時不做清除及警告動作 [1030603]
				/*
				document.all[argName].selectedIndex = 0;
				document.all[argObject].value = "";
				if(argName=="dlUser")
					alert('您所輸入之承辦人不存在於系統中。');				
				document.all[argObject].focus();
				return;	
				*/
		}	
		GetComBoValue(argObject,argName);
	}
	//如果為空清除
	else
	{
		if(argName=="dlDept")
		{
			document.all["dlUser"].options.length = 0;
			document.all["dlUser_Text"].value="";
			document.all["H_dlUser_Value"].value = "";	
			document.all["H_dlDept_Text"].value="";
			document.all["H_dlDept_Value"].value = "";				
		}
		else
			document.all["H_"+argName+"_Value"].value="";
	}
	return IsOk;
}
//ComBoBox Onchange檢核
function OnChangeCheck(argObject,argName)
{
	
	if(argObject=="dlDept_Text" && jf_Trim(document.all[argObject].value)!=jf_Trim(document.all["H_"+argName+"_Text"].value))
	{
		//清空承辦人相關欄位
		document.all["dlUser_Text"].value="";
		document.all["H_dlUser_Value"].value = "";
	}
	GetComBoValue(argObject,argName);

	
}
//只單獨檢查承辦單位(點選查詢時)，因為承辦單位onblur檢核在lib裡面。如果寫在跟承辦人同一地方 會跳兩次錯誤訊息
function Comcheck()
{
	var IsOk=true;
	if(jf_Trim(document.all["dlDept_Text"].value)!=jf_Trim(document.all["H_dlDept_Text"].value) && jf_Trim(document.all["dlDept_Text"].value)!="")
	{
		alert("該承辦單位不存在");
		document.all["H_dlDept_Value"].value="";
		document.all["H_dlDept_Text"].value = "";
	    //1060516 Justin [1060400] 二代公文修改
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
		document.all["H_dlUser_Value"].value="";
		document.all["dlUser_Text"].value="";
		document.all["dlUser_Text"].options.length = 0;
		IsOk= false;
	}
	
	return IsOk;
	
}
//取得ComBox值
function GetComBoValue(argObject,argName)
{
	var strArr1 = new Array();
	if(jf_Trim(document.all[argObject].value)!="")
	{
		//103120 Hank 處理前先檢查selectedIndex是否小於0 [1030603]
		if(document.all[argName].selectedIndex>=0)
		{
			strArr1 = document.all[argName].options[document.all[argName].selectedIndex].value.split(':');	
			if(argName=="dlUser")
			{
				//103120 Hank 先判斷切割後大小 [1030603]
				if(strArr1.length>=4)
				{
					document.all["H_"+argName+"_Value"].value = strArr1[2];		
				}
				else
				{
					document.all["H_"+argName+"_Value"].value = "";
				}
			}
			else
			{
				document.all["H_"+argObject].value = strArr1[1];
				document.all["H_"+argName+"_Value"].value = strArr1[0];
			}	
		}
	}
}
//檢核日期格式用------start---------
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(ObjName != argObj)
		CheckedDate = false;
	ObjName = argObj;
	
	var strDate = jf_Trim(document.all[argObj].value);
	
		
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(strBDate != strDate)
			CheckedDate = false;	
		
		strBDate = strDate;

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1060516 Justin [1060400] 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}
///-----end-------
function CheckBeforeSearch()
{

	if(!CheckDATE("txSendS","申請日期(起)",true))
		return false;
	if(!CheckDATE("txSendE","申請日期(訖)",true))
		return false;
		
	var strDateS = document.all["txSendS"].value;
	var strDateE = document.all["txSendE"].value;
	
	if(strDateS != "" && strDateE != "" && strDateS > strDateE)
	{
		document.all.txSendS.value = strDateE;
		document.all.txSendE.value = strDateS;
	}
	else if (strDateS == "" || strDateE == "")
	{
		if(strDateS == "")
		{
			document.all["txSendS"].value=document.all["txSendE"].value;
		}
		else
		{
			document.all["txSendE"].value=document.all["txSendS"].value;
		}
	}
	return true;
}

function BeforeSearch()
{
	var IsOk=true;
	if(jf_Trim(document.all["txSendE"].value)=="" && jf_Trim(document.all["txSendS"].value)==""
			&& jf_Trim(document.all["dlDept_Text"].value)=="" && jf_Trim(document.all["dlUser_Text"].value)==""
			&& document.all["dlType"].options[document.all["dlType"].selectedIndex].value=="")
	{	
		alert("請至少輸入一樣條件");	
		IsOk=false;
	}
	return IsOk;	
}


//1031120 Hank 下拉選單變更事件 [1030603] start
var CallWS_ID_SECT;

//dlSectName下拉選單連動(Reference from EAM005)
function SyncSc()
{
	//暫存目前UserName
	var strUserTemp = document.all["dlUser_Text"].value;
	if (document.all["dlDept_Text"].value != "")
	{
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlSectName"].length ; i++)
		{
			if(document.all["dlSectName"].options[i].text == document.all["dlSectName_Text"].value )
			{
				document.all["dlSectName"].selectedIndex = i;
				document.all["H_txSectName"].value = document.all["dlSectName"].options[i].value.split(':')[2];
				bSect = true;
				break;
			}
		}
		
		if (!bSect)
		{
			if(document.all["dlSectName_Text"].value=="")
			{
				document.all["H_txSectName"].value = "";
				var strUser = document.all["dlUser_Text"].value;
				ClearDL(document.all["dlUser"]);
				document.all["dlUser_Text"].value =strUser;
			}
		}
	}
	else
	{

	}
	if(document.all["dlSectName_Text"].value=="" || bSect)
	{
		//檢查若原選擇UserName存在更新後下拉選單 則指定User
		jf_SectNameCheck('dlSectName','dlUser');
		for(var i=0;i<document.all["dlUser"].length;i++)
		{
			if(document.all["dlUser"].options[i].text==strUserTemp)
			{
				document.all["dlUser"].selectedIndex = i;
				document.all["dlUser_Text"].value=strUserTemp;
			}
		}
	}
	else
	{
		ClearDL(document.all["dlUser"]);
		
		//至少要有兩行 不然選單會變形
		document.all["dlUser"].options.add(new Option("",""));
		document.all["dlUser"].options.add(new Option("",""));
		document.all["dlUser"].size = 2;
	}
	
}
//將DropDownList裡的item清除 (Reference from EAM005)
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	
    //1031110 Hank 將cssClass調整為InputFieldLabel [1030603]
    //1060516 Justin [1060400] 二代公文修改
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
				document.all["H_txSectName"].value =  "";
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

//1031120 Hank 重建選單 [1030603]
function jf_SectNameCheck(argSectComboBoxID, argUserComboBoxID)
{
	/*** 離開欄位時檢查代碼或名稱是否存在 ***/
	
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var SectComboBoxObj     = document.all[argSectComboBoxID];

	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
	var UserNameMem = SectComboBoxTextObj.value;

	var val = SectComboBoxObj.value;
	var arr = val.split(":");
	if( arr[2] == "" ) val = arr[0];
	else val = arr[2];

	//二級欄位為空則取一級
	if(SectComboBoxTextObj.value == "")
	{
		val = document.all["dlDept"].value.split(":")[0];
	}
	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

	var resultObj = null;
	if( callObj.error )
	{
		alert(callObj.errorDetail.string);
	}
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}
	
	//clear the ComboBox of User
	len = UserComboBoxObj.length;
	for( i=0 ; i<len ; i++ )
		UserComboBoxObj.remove(0);

	//add new data into the ComboBox of User
	len = resultObj.UserName.length;
	UserComboBoxObj.size = len > 0 ? (len + 1) : 2;
	UserComboBoxObj.options.add(new Option("",""));
	for( i=0 ; i<len ; i++ )
	{
		var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
		UserComboBoxObj.options.add(objOption);
	}

	//clear the data of ComboBox of User and reset it.
	UserComboBoxTextObj.value = "";
	UserComboBoxObj.selectedIndex = -1;
	for( i=0 ; i<len ; i++ )
	{
		if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
		{
			UserComboBoxTextObj.value = resultObj.EmpName[i];
			UserComboBoxObj.selectedIndex = i;
			break;
		}
	}
}

//1031120 Hank 下拉選單變更事件 [1030603] end

