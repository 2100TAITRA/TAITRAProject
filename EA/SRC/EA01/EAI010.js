/*
DATE		SA		PRG		    MGR_NO			DESC
1060215     Cloud   Justin      1050087         二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1060215  Justin [1050087] 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060215  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
		//無值不顯示
	jf_HandleComboxStatus("dlSect");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060215  Justin [1050087] 二代公文修改
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
//1060215  Justin [1050087] 二代公文修改 
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
	
    //1060215  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit =!jf_ConfirmClean(true);
			//document.all["dlDept_Text"].focus();
		    //1060215  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1060215  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
	}
}

// 確認查詢前承辦單位欄位是否空白 空白--無查詢的權利許可
function CheckBeforeSearch()
{
	if( document.all["txOk_h"].value == "Y" )
	  return true ;
	else
	{
	  alert('抱歉，您無權限使用檢調未還公文查詢作業。');
	  return false ;  
	}
}


//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060215  Justin [1050087] 二代公文修改
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");
			    //document.all[InValidControlName].focus();
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
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
    if (argResult.id !=null)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{	

					WSResult = argResult.value;		

					//1060725 Justin [1050087] 二代公文修改
					//document.all["dlSect_Container"].className = "";
					//document.all["dlSect"].className = "";
					//document.all["dlSect_Text"].className = "";
					document.all["dlSect_Container"].className = "custom-combobox";
					document.all["dlSect"].className = "custom-combobox";
					document.all["dlSect_Text"].className = "custom-combobox";

					document.all["dlSect_Text"].value = "";
					
					while(document.all.dlSect.options[0] != null)
					{
						document.all.dlSect.options[0]=null;				
					}
					
					var DropListChild = document.createElement("OPTION");
					DropListChild.text = "";
					DropListChild.value = "";
					document.all.dlSect.options.add(DropListChild);
					
					if(WSResult.SecNo.length != 0)
					{


						ClearDL(document.all["dlSect"]);			
						
						var Blank_Data = document.createElement("OPTION");
						Blank_Data.text = "";
						Blank_Data.value = ":";				
						document.all.dlSect.options.add(Blank_Data);

													
						for(var i=0;i<WSResult.SecNo.length;i++)
						{
							var SectDropListChild = document.createElement("OPTION");
							SectDropListChild.text = WSResult.SecName[i];
							SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
							document.all.dlSect.options.add(SectDropListChild);
						}
						if(document.all["dlSect"].options.length > 10)
						{
							document.all["dlSect"].size = 10;
						}
						else
							document.all["dlSect"].size = document.all["dlSect"].options.length;
						
						document.all["dlSect_Container"].disabled = false;
					}
					else
					{				
						while(document.all.dlSect.options[0] != null)
						{
							document.all.dlSect.options[0]=null;				
						}
						document.all["dlSect_Container"].disabled = true;	

					}
		}
    }    
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值

	
function ReturnValue(argBorNo,argReBorCount)
{
    
	var strUrl = "";
	var Artifact = jf_Trim(document.all.SsoArtifact.value);
	strUrl = "../../../AK/AKT810C1.aspx?SAMLart="+Artifact +"&rtnObj=lbReturnValue&k1="+argBorNo+"&ReBorCount="+argReBorCount+"&nMode=User";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
	jf_OpenChildWin(strUrl, "AKT810C1", 850, 500 );
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var CallWS_ID_SECT

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
				document.all["txDeptNo_h"].value = document.all["dlDept"].options[i].value.split(':')[0];
				bDept = true;
				break;
			}
		}
		
		if (!bDept)
		{
			document.all["dlDept"].selectedIndex = -1;
			document.all["dlDept_Text"].value = "";
			document.all["txDeptNo_h"].value = "";
			alert('您所輸入之承辦單位不存在於系統中。');
		}
		
		if(document.all["dlDept"].selectedIndex != -1)
		{
			strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["txDeptNo_h"].value = strArr1[0];
		}
		else
			bAction = false;
		//取二級單位用
		var param1 = new Array(3);
		param1[0] = false;
		param1[1] = true;
		param1[2] = strArr1[0];
			
		var RtnObjSect;	
			
		if(bAction)
		{	
			document.all["txSectNo_h"].value =  "";
			RtnObjSect = jf_CallWS("../EALIB/EA_LIB.asmx","GetDepts",false,param1);
			CallWS_ID_SECT = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
		
		akjf_DeptCheck('dlDept','dlUser');
		if( document.all["dlUser"].length < 10 )
			document.all["dlUser"].size = document.all["dlUser"].length ;
		else
		    document.all["dlUser"].size = 10 ;	
		    
		    
		 
		if ( document.all["dlSect"].options.length <=1 )
			document.all["dlSect_Container"].className = "hide";
		else
		{
			//1060725 Justin [1050087] 二代公文修改
			//document.all["dlSect_Container"].className = "InputFieldText" ;	
			//document.all["dlSect"].CssClass = "InputFieldText" ;
			document.all["dlSect_Container"].className = "custom-combobox";
			document.all["dlSect"].className = "custom-combobox";
		}	
			    
	}
	else
		document.all["dlSect_Container"].className = "hide";
	
}
function SyncSc()
{
	if (document.all["dlDept_Text"].value != "")
	{
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlSect"].length ; i++)
		{
			if(document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value )
			{
				document.all["dlSect"].selectedIndex = i;
				document.all["txSectNo_h"].value = document.all["dlSect"].options[i].value.split(':')[2];
				bSect = true;
				break;
			}
		}
		
		if (!bSect && document.all["dlSect_Text"].value != "")
		{
			document.all["dlSect"].selectedIndex = -1;
			document.all["dlSect_Text"].value = "";
			document.all["txSectNo_h"].value = "";
			alert('您所輸入之承辦科別不存在於該承辦單位下。');
		    //1060215  Justin [1050087] 二代公文修改
			//document.all["dlSect_Text"].focus();
			$('#dlSect_Text').focus();
		}
		else
		{
			akjf_DeptCheck('dlDept','dlUser');
		}
		if ( document.all["dlSect"].length != 0 && document.all["dlSect_Text"].value != "(僅含一級單位)")
		{
			akjf_DeptCheck('dlSect','dlUser');
		}
		if( document.all["dlSect_Text"].value == "(僅含一級單位)" )
			akjf_DeptoOnlyCheck('dlUser') ;
			
	}
	else
	{
		document.all["dlSect"].selectedIndex = -1;
		document.all["dlSect_Text"].value = "";
		document.all["txSectNo_h"].value = "";	
		alert('請先選擇承辦單位再選擇承辦科別。');
	    //1060215  Justin [1050087] 二代公文修改
		//document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
	}
}

function SyncUser()
{
	if (document.all["dlDept_Text"].value != "")
	{
		var bDept = false;
		var bUser = false;
		
		for ( var i = 0 ; i < document.all["dlUser"].length ; i++)
		{
			if(document.all["dlUser"].options[i].text == document.all["dlUser_Text"].value )
			{
				document.all["dlUser"].selectedIndex = i;
				document.all["txUserNo_h"].value = document.all["dlUser"].options[i].value.split(':')[2];
				bUser = true;
				break;
			}
		}
		
		if (!bUser)
		{
			document.all["dlUser"].selectedIndex = -1;
			document.all["dlUser_Text"].value = "";
			alert('您所輸入之調案人不存在於該承辦單位下。');
		    //1060215  Justin [1050087] 二代公文修改
			//document.all["dlUser_Text"].focus();
			$('#dlUser_Text').focus();
		}
	}
	else
	{
		document.all["dlUser"].selectedIndex = -1;
		document.all["dlUser_Text"].value = "";	
		alert('請先選擇承辦單位再選擇調案人。');
	    //1060215  Justin [1050087] 二代公文修改
		//document.all["dlUser_Text"].focus();
		$('#dlUser_Text').focus();
	}
}

function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}


// 帶出僅含一級單位調案人 
function akjf_DeptoOnlyCheck(argUserComboBoxID)
{

	var UserComboBoxObj     = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];


	len = UserComboBoxObj.length;
	for( i=0 ; i<len ; i++ )
	{
		
		arr = UserComboBoxObj.options[i].value.split(":");
		if( arr[1] != "" )
		{
			UserComboBoxObj.remove(i);	
			len-- ;
			i-- ;
		}
	}
	
	
	//clear the data of ComboBox of User and reset it.
	UserComboBoxTextObj.value = "";
	UserComboBoxObj.selectedIndex = -1;

}

function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	    //1060215  Justin [1050087] 二代公文修改
	    //document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}

