/********************************************************
function jf_CallWS			//呼叫WebService API
function jf_Clean(argIsCleanAnyway)			//清除document上所有物件的值,讓使用者重新輸入，傳入的參數argIsCleanAnyway為bool值，表示要清除所有的Element
												//若argIsCleanAnyway不是true或未傳入參數，則被設為readOnly的Element將不會被清除
function jf_CheckDataExist(argOrgNo)	//確認所有鍵值欄位是否已有資料存在資料庫, 若找到資料回傳true, 反之則傳 false
					//argOrgNo：機關代碼  可空白，表示不以機關代碼做篩選條件
function jf_CheckKeyObject()		//確認所有鍵值欄位是否為空白
function jf_CheckFull()			//確認該TextBox是否已輸滿(length = maxlength)
function jf_ConfirmDelete()		//確認刪除
function jf_ConfirmCancel()		//確認取消
function jf_ConfirmClean(argIsCleanAnyway)		//確認清除，傳入的參數argIsCleanAnyway為bool值，表示要清除所有的Element
												//若argIsCleanAnyway不是true或未傳入參數，則被設為readOnly的Element將不會被清除
function jf_ConfirmExit()		//確認離開
function jf_ConfirmPreview()		//確認預覽
function jf_ConfirmPrint()		//確認列印
function jf_DocumentOnKeyDown()		//註冊document的onKeyDown,裡面呼叫jf_BlockBackKey() 
					//及jf_ConvertEnterToTab
function jf_IsModified()		//回傳是否有欄位值已遭更動
function jf_Init()			//設定 保留/清除模式　及 StatusBar資訊
function jf_ReloginSetStatusMsg(argUser,argOrgName)
					//重新登入時，設定Statusbar使用者姓名及使用者機關名稱，
					//傳入argUser使用者姓名及argOrgName使用者機關名稱
function jf_SaveInitValue()		//儲存所有欄位物件的狀態
function jf_SwitchModeButton()		//切換模式: 保留->清除  or   清除->保留
function jf_GetActionMode()
function jf_GetSessionID()
function jf_SetModeButton()		//依Cookie值來設定目前模式
function jf_SetTimeOutFlag()		//
function jf_SetStatusMsg()		//設定Statusbar程式自訂訊息，傳入argMsg訊息字串
function jf_IsTimeOut()			//
function jf_PrintFile()			//列印檔案.
function jf_BannerExit()
function jf_ToolBarSubmit()
function jf_FocusAt()			//設定頁面開啟後焦點設定
function jf_GetParentCheckBox()	//TreeView中,取得某特定CheckBox的上層CheckBox
function jf_UnCheckAllParent()	//Uncheck特定CheckBox的所有上層CheckBox
function jf_CheckAllChildren()	//Check特定CheckBox的所有下層CheckBox
function jf_UnCheckAllChildren()//UnCheck特定CheckBox的所有下層CheckBox

//以下為93.12.26 Andy新增
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)			//取得選取之DropDownList值
function jf_CheckSpecialKeyPress()											//檢查MsgDiag開啟權限
function jf_SelectAll(argTableName, argCheckBoxName)						//全部選取
function jf_SelectInverse(argTableName, argCheckBoxName)					//反向選取
function jf_SelectClear(argTableName, argCheckBoxName)						//清除選取
function jf_DeleteSelected(argTableName, argCheckBoxName, argTableFields)	//刪除選取			
function jf_RowUp(argTableName, argCheckBoxName, argTableFields)			//上移一筆
function jf_RowDown(argTableName, argCheckBoxName, argTableFields)			//下移一筆

//以下為94.03.15 Andy新增
function jf_CheckEmail(argEmail) //檢查Email格式，將傳入之參數檢查後的結果以bool型態回傳。
**********************************************************/
/*
DATE	SA		PRG		MGR_NO		DESC
0970826	Stella	Yvonne	0970817		修改jf_CallWS，在onserviceavailable的event觸發後，再callService，避免發生service unavailable
0980105			Leo		0971032		增加onbeforeunload時將迴圈中斷，以避免程式無法關閉的狀況
0980717	Stella	Albert	0980358、0980360 解決Client端如果沒有註冊W32.dll發生的問題
1000425	Leslie	David	1000108		1.因應外網程式，新增template_utf8_v3_Outside.js供外網程式使用
									2.因外網程式不使用WS，取消W32元件註冊行為
1010222 Leslie	David	1010116		點選畫面離開功能鍵時，判斷欄位異動須排除隱藏欄位
1031028	Kevin	Kevin	1030836		新增支援SSL
1070824	Kevin	Joe		1070678		弱掃修正Client Potential Code Injection
1080118	Kevin	Kevin_C	1070678		修正弱掃Client Potential Code Injection
*/
var FileType		= "FileType";
var KeepMode		= "Keep";
var CleanMode		= "Clean";
var PdfFormat		= "PDF";
var WordFormat		= "WORD";
var value = new Array(document.forms[0].elements.length);
var FirstInvokeWS   = true;
var LayoutModeNew		= 0;
var LayoutModeModify	= 1;
var OriginalKeyCode	= 0;
var gArServiceName	= new Array();	//目前頁面用的WS名稱
var gServiceAvailable	= false;	//WebService是否可以被呼叫

window.onload = jf_WindowOnLoad;

function jf_WindowOnLoad()
{
	document.oncontextmenu=jf_BlockContextMenu
	document.onkeydown = jf_DocumentOnKeyDown
	jf_Init();
	jf_SaveInitValue();
	jf_PrintFile();
	var funcName;
	try
	{
		try{jf_MenuInit();}catch(e){}
		document.body.className = '';
		funcName = "jf_ShowValidator()";
		jf_ShowValidator();
		funcName = "ProjectOnLoad()";
		ProjectOnLoad();
		funcName = "ClientOnLoad()";
		ClientOnLoad();
		funcName = "jf_FocusAt()";
		jf_FocusAt();
	}
	catch(e)
	{
		alert("Exception occured in initialization!\nError Name:"+e.name+", Message:"+e.message+", Function:"+funcName);
	}

	FirstInvokeWS  = false;
}


/******************************************
*
*  function jf_CloseMenu()
*  功能: Close選擇Format視窗
*
******************************************/
function jf_CloseMenu() 
{
	var x, y;
	var menuId = FileType;
	
	x = window.event.x + document.body.scrollLeft; 
	y = window.event.y + document.body.scrollTop;
	ul = parseInt(document.all[menuId].style.left);
	ut = parseInt(document.all[menuId].style.top);
	dl = ul+parseInt(document.all[menuId].style.width);
	dt = ut+parseInt(document.all[menuId].style.height);
	
	if (x < ul || x > dl  || y < ut || y > dt)
	{	
		document.all[menuId].style.display = "none";
		
		//將使用者的選擇存回Cookie		
		if(document.all.rlFileType_0.checked)
			jf_SaveCookieWithExpire("FORMAT", PdfFormat);	//設為PDF格式
		else
			jf_SaveCookieWithExpire("FORMAT", WordFormat);	//設為PDF格式
			
	}
}

function jf_CheckDataExist(argOrgNo)
{
	var arrValue=new Array(KeyObjectArr.length);
	var arrFieldName=new Array(KeyObjectArr.length);
	
	for(var i=0; i < KeyObjectArr.length;i++)
	{
		arrValue[i]=jf_Trim(document.all[KeyObjectArr[i]].value);
		arrFieldName[i]=FieldNameArr[i];
	}
	
	if (argOrgNo!="")
	{
		arrFieldName[arrFieldName.length]="SOURCE_ORGNO"
		arrValue[arrValue.length]=argOrgNo;
	}
	
	var arWSParam = new Array(3);
	
	//1070824	Joe		1070678	Client Potential Code Injection--S
	// arWSParam[0] = document.all["KeyTableName"].value;//"EMPLOYEE";
	// arWSParam[1] = arrFieldName;
	// arWSParam[2] = arrValue;
	arWSParam[0] = encodeURI(document.all["KeyTableName"].value);//"EMPLOYEE";
	arWSParam[1] = encodeURI(arrFieldName);
	arWSParam[2] = encodeURI(arrValue);
	//1070824	Joe		1070678	Client Potential Code Injection--E
				
	callObj = jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	
	if(jf_IsWebServiceSuccess(callObj))
	{
		if(callObj.value.RtnBool == true)
			return true;
		
		return false;
	}
	else
		return false;
}

function jf_CheckKeyObject()
{
	var strMsg="";
	//var arr = new Array();
	var IsFocus =true;
	
	for(var i=0; i < KeyObjectArr.length;i++)
	{
		if(jf_Trim(document.all[KeyObjectArr[i]].value)=='')
		{
			if (strMsg!="")
				strMsg+="\n";
			strMsg+=MesgArr[i]+"欄位不可空白";
			
			if (IsFocus)
				document.all[KeyObjectArr[i]].focus();
			
			IsFocus = false;

		}
	}
	if (strMsg=="")
		return true;
	else
	{
		alert(strMsg);
		return false;
	}
}

function jf_ConvertEnterToTab()
{
	OriginalKeyCode = event.keyCode;
	if(document.activeElement.type=='submit')
	   return;
	   
	if(event.keyCode==13)
	   event.keyCode=9;
}


function jf_DocumentOnKeyDown()
{
   jf_BlockBackKey();
   jf_ConvertEnterToTab();
}

function jf_CheckFull()
{
   /*
   if(event.keyCode==9)
      return;
   if(event.keyCode==16)
      return;

   if(document.activeElement.value==null)
      return;
		
   var len1=document.activeElement.value.length;
   var len2=document.activeElement.maxLength;
   var currentMatch=null;

   if(len1 == len2)
   {
	  if (document.activeElement.tabIndex>-1)
	  {
		for(i=0;i< document.activeElement.form.elements.length;i++)
		{
			if(currentMatch == null)
			{
				if(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex)
				{
					if(document.activeElement.form.elements[i].style.visibility == "hidden")
						continue;
					if(document.activeElement.form.elements[i].className=="hidden")
						continue;

					if(document.activeElement.form.elements[i].style.display == "none")
						continue;
					if(document.activeElement.form.elements[i].className=="hide")
						continue;

					if(document.activeElement.form.elements[i].disabled == true)
						continue;

					currentMatch = document.activeElement.form.elements[i];
				}
			}
			else
			{
				if((document.activeElement.form.elements[i].tabIndex < currentMatch.tabIndex)&&
					(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex))
				{
					if(document.activeElement.form.elements[i].style.visibility == "hidden")
						continue;
					if(document.activeElement.form.elements[i].className=="hidden")
						continue;

					if(document.activeElement.form.elements[i].style.display == "none")
						continue;
					if(document.activeElement.form.elements[i].className=="hide")
						continue;

					if(document.activeElement.form.elements[i].disabled == true)
						continue;
					currentMatch = document.activeElement.form.elements[i];
				}
			}
			
		}
	  }
	  if(currentMatch !=null)
	     currentMatch.focus();
   }
    */
}

function jf_IsModified()
{
   for(i=0;i< document.forms[0].elements.length;i++)
   {
      //1010222 David 1010116 點選畫面離開功能鍵時，判斷欄位異動須排除隱藏欄位
      if(document.forms[0].elements[i].style && document.forms[0].elements[i].style.display 
      && document.forms[0].elements[i].style.display == "none")
		continue;
	  else
	  {
	     if(CheckParentHidden(document.forms[0].elements[i]))
			continue;
	  }

      if(document.forms[0].elements[i].type=='text')
      {
         if(value[i] != document.forms[0].elements[i].value)
            return true;
      }
      if(document.forms[0].elements[i].type=='select-one')
      {
         if(value[i] != document.forms[0].elements[i].selectedIndex)
            return true;
      }
      if(document.forms[0].elements[i].type=='checkbox')
      {
         if(value[i] != document.forms[0].elements[i].checked)
            return true;
      }
      if(document.forms[0].elements[i].type=='radio')
      {
         if(value[i] != document.forms[0].elements[i].checked)
           return true;
      }
      if(document.forms[0].elements[i].type=='textarea')
      {
         if(value[i] != document.forms[0].elements[i].value)
            return true;
      }
   }
   
   return false;
}

//1010222 David 1010116 新增判斷上層節點是否為隱藏
function CheckParentHidden(argNode)
{
	var Node = argNode;
	while(Node.parentNode != null)
	{
		if(Node.parentNode.style && Node.parentNode.style.display 
		&& Node.parentNode.style.display.toLowerCase() == "none")
			return true;

		Node = Node.parentNode;
	}
	return false;
}

function jf_SaveInitValue()
{
	for(i=0;i< document.forms[0].elements.length;i++)
	{
		if(document.forms[0].elements[i].type=='text')
			value[i] = document.forms[0].elements[i].value;
		if(document.forms[0].elements[i].type=='select-one')
			value[i] = document.forms[0].elements[i].selectedIndex;
		if(document.forms[0].elements[i].type=='checkbox')
			value[i] = document.forms[0].elements[i].checked;
		if(document.forms[0].elements[i].type=='radio')
			value[i] = document.forms[0].elements[i].checked;
		if(document.forms[0].elements[i].type=='textarea')
			value[i] = document.forms[0].elements[i].value;
		
	}
}

function jf_ReloginSetStatusMsg(argUser,argOrgName)
{
    
   if(window.defaultStatus != "")
   {
		strMsg = window.defaultStatus;
		Status = strMsg.split("｜");
		
		if (Status.length==4)
		{
			Status[2]=jf_PADR(argUser,5,"　");
			Status[3]="隸屬機關："+argOrgName;
		}
		
		if (Status.length==3)
		{
			if (document.all.StatusMode.value=="none")
			{
				Status[1]=jf_PADR(argUser,5,"　");
				Status[2]="隸屬機關："+argOrgName;
			}
			else
				Status[2]=jf_PADR(argUser,5,"　");
		}
		
		if (Status.length==2)
			Status[1]=jf_PADR(argUser,5,"　");
		
		strMsg=Status.join("｜");
		
		window.defaultStatus =strMsg;
   
   }
   
   if (opener != null)
   {
		if(opener.window.jf_ReloginSetStatusMsg!=null)
			 opener.window.jf_ReloginSetStatusMsg(argUser,argOrgName);
	}
   
}

function jf_SetStatusMsg(argMsg)
{   
   if(window.defaultStatus == "")
		return;
   
   strMsg = window.defaultStatus;
   Status = strMsg.split("｜");
   
   if (Status.length==4)
  		Status[1]=jf_PADR(argMsg,20,'　');   
   
   if (Status.length==3)
   {
		if (document.all.StatusMode.value=="none")
			Status[0]=jf_PADR(argMsg,20,'　');
		else
			Status[1]=jf_PADR(argMsg,20,'　');
   }
   
   if (Status.length==2)
		Status[0]=jf_PADR(argMsg,20,'　');
   
   
   strMsg=Status.join("｜");
   
   window.defaultStatus =strMsg;
}

function jf_Init()
{
	if(document.all.StatusValue != null)
		window.defaultStatus = document.all.StatusValue.value;

	//確認Cookie值存不存在
	if(jf_ReadCookie("Mode")==null)
		jf_SaveCookieWithExpire("Mode", CleanMode);		//預設清除模式 #2006.02.08 Andy

	if( document.all.rlFileType_0 != null)
	{
		if(jf_ReadCookie("FORMAT")==null)
		{	
			if(document.all.rlFileType_0.checked)
				jf_SaveCookieWithExpire("FORMAT", PdfFormat);	//設為PDF格式
			else
				jf_SaveCookieWithExpire("FORMAT", WordFormat);	//設為PDF格式
		}
	
		if(jf_ReadCookie("FORMAT") == PdfFormat)
			document.all.rlFileType_0.checked =true;
		else
			document.all.rlFileType_1.checked =true;
	}
	else
	{
		if(jf_ReadCookie("FORMAT")==null)
			jf_SaveCookieWithExpire("FORMAT", PdfFormat);	//設為PDF格式
	}
		
	jf_SetModeButton();
	
	//註冊timeout時間
	if(jf_ReadCookie("TimeOutLimit") != "")
	{
		window.setTimeout("jf_SetTimeOutFlag()", jf_ReadCookie("TimeOutLimit"));
	}
}

function jf_Clean(argIsCleanAnyway)
{
	for(i=0;i< document.forms[0].elements.length;i++)
	{
		if( argIsCleanAnyway != true )
		{
			if(document.forms[0].elements[i].readOnly)
				continue;
		}
			
		if(document.forms[0].elements[i].type=='text')
		   document.forms[0].elements[i].value = '';
		if(document.forms[0].elements[i].type=='select-one')
		   document.forms[0].elements[i].selectedIndex = 0;
		if(document.forms[0].elements[i].type=='checkbox')
		   document.forms[0].elements[i].checked = false;
		if(document.forms[0].elements[i].type=='radio')
		   document.forms[0].elements[i].checked = false;
		if(document.forms[0].elements[i].type=='textarea')
		   document.forms[0].elements[i].value = '';
	}
}


function jf_SwitchModeButton()
{
	if(jf_ReadCookie("Mode") == KeepMode)
		jf_SaveCookieWithExpire("Mode",CleanMode);
	else
		jf_SaveCookieWithExpire("Mode",KeepMode);
		
	jf_SetModeButton();
}

function jf_SetModeButton()
{
	if(jf_ReadCookie("Mode") == KeepMode )
	{
		if(document.all.btMode != null)
			document.all.btMode.value = "保留模式";
	}
	else
	{
		if(document.all.btMode != null)
			document.all.btMode.value = "清除模式";
	}
}

   
function jf_ConfirmDelete()
{
	return window.confirm("確定要刪除嗎?");
}

function jf_ConfirmCancel()
{
	Rtnbool = false;
	if(jf_IsModified())
	{
		Rtnbool = window.confirm("您已修改過內容,確定要取消嗎?");
		if (Rtnbool)		
			jf_ReloadValue();
	}
	else
		Rtnbool = window.confirm("確定要取消嗎?");
	return Rtnbool;	
}

function jf_ReloadValue()
{
  for(i=0;i< document.forms[0].elements.length;i++)
  {
    if(document.forms[0].elements[i].type=='text')
         document.forms[0].elements[i].value = value[i];
    if(document.forms[0].elements[i].type=='select-one')
          document.forms[0].elements[i].selectedIndex = value[i];
	if(document.forms[0].elements[i].type=='checkbox')
		document.forms[0].elements[i].checked = value[i];
	if(document.forms[0].elements[i].type=='radio')
		document.forms[0].elements[i].checked = value[i];
	if(document.forms[0].elements[i].type=='textarea')
         document.forms[0].elements[i].value = value[i];
   }
}

function jf_ConfirmClean(argIsCleanAnyway)
{
	var ret = window.confirm("確定要清除嗎?");
	if(ret)
	   jf_Clean(argIsCleanAnyway);
	return ret;
}

function jf_ConfirmExit()
{
	if(jf_IsModified())
	{
		if(window.confirm("您已修改過內容,確定要離開嗎?"))
			jf_CloseWindow("0","");
	}
	else
		jf_CloseWindow("0","");
}

function jf_ConfirmPreview()
{
	/*
	if(jf_IsModified())
		return window.confirm("您已修改內容且未儲存,確認要預覽報表嗎?")
	else
	*/
		return true;
}

function jf_ConfirmPrint()
{
	/*
	if(jf_IsModified())
		return window.confirm("您已修改內容且未儲存,確定要列印報表嗎?")
	else
	*/
		return true;
}

function jf_ResetTimeOutFlag()
{
	//Reset flag
	jf_SaveCookie("TimeOutFlag","false");
	//重新計時
	if(jf_ReadCookie("TimeOutLimit") != "")
		window.setTimeout("jf_SetTimeOutFlag()", jf_ReadCookie("TimeOutLimit"));	
}	

function jf_SetTimeOutFlag()
{
	jf_SaveCookie("TimeOutFlag", "true");
}	

function jf_IsTimeOut()
{
	if(jf_ReadCookie("TimeOutFlag")=="true")
    {
		alert("本應用程式已經TimeOut，將自動關閉，請重新開啟應用程式");
        jf_CloseWindow("0", "");
        return true;
    }
    else
        return false;
}

function jf_IsWebServiceSuccess(argResult)
{			
	if(argResult.error)
	{
	    alert(argResult.errorDetail.string);
	    return false;
	}
	else
	{
		var strAttach = "";
		
		obj = argResult.value;
		if(obj.m_bSuccess == null || obj.m_bSuccess == "undefined")
			return true;
			
		if(!obj.m_bSuccess)
		{
			if(obj.m_strMsg == "")
			{
				if(obj.m_bRedirect)
				{
					if(window.document.all["txLogFileName"] != null)
						strAttach = window.document.all["txLogFileName"].value;
						
					var strLogFilePath = obj.m_strErrPageQueryStr + "&argAttach=New_" + strAttach;
					jf_OpenMsgWin(strLogFilePath, "CustomErrPage");
				}
				else
				{
					if(obj.m_strErrMsg != "")
						alert("錯誤來源：" + obj.m_strErrSource + "\n" + "錯誤訊息：" + obj.m_strErrMsg + "\n" + "堆疊追蹤：\n" + obj.m_strErrStack);
				}
			}
			else
			{
				alert(obj.m_strMsg);
			}
			return false;
		}
	}
	return true;
}

function jf_RedirectToCustomErrPage()
{
	document.location = "..\\..\\..\\STD\\LIB\\CustomErr.aspx";
}

//Call WebService (Basic)
function jf_CallW(argService, argFunName, argAsync, argParam)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argService = argService.replace(/http:/ig, 'https:');
		
	//Yvonne	0970826	0970817	在此先註冊EVENT觸發後要呼叫的function，避免使用useService後，EVENT已被觸發但未完成註冊EVENT觸發後要呼叫function的動作
	if(gArServiceName.join(",").indexOf(argService.toUpperCase()) == -1)
	{
		gServiceAvailable = false;
		gArServiceName.push(argService.toUpperCase());
		service.onserviceavailable=function(){gServiceAvailable = true;o.StopWaiting();};
		document.body.onunload=function(){gServiceAvailable = true;o.StopWaiting();};//0980105 Leo 0971032 避免離開頁面時while迴圈未停止
		//無論同步或非同步，皆需等callback function OK之後再callservice
		/*
		if(argAsync)//非同步
			service.onserviceavailable=function(){return SetgServiceAvailable(callObj,argAsync,argParam)};
		else//同步
			service.onserviceavailable=function(){gServiceAvailable = true;};
			*/
	}
	else
		gServiceAvailable = true;
	var callObj = new Object();
    callObj.funcName = argFunName;      // Name of the remote function.
    callObj.async = argAsync;         // A Boolean that specifies the type of call
    callObj.timeout = 5;         // Timeout for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	//in order to avoid the service unavailable problem
	//conver the service to uppercase cause the uppercase service is invoked
	//when this page is onloaded, the 2nd invocation of this web service will success
	argService = argService.toUpperCase();
	if( document.all.service == null)
		return;
	if( document.all.SessionID == null )
		return;
    service.useService(argService+"?WSDL","Serv");
    //無論同步或非同步，皆需等callback function OK之後再callservice
    //if(!gServiceAvailable && !argAsync)
    if(!gServiceAvailable)
	{
			while(!gServiceAvailable)
				//0970908	setTimeout在IE7下因安全限制無法使用
				//jf_Pause(100);	
				jf_Wait(1000);
			return SetgServiceAvailableW(callObj,argAsync,argParam);
    }
    else
		return SetgServiceAvailableW(callObj,argAsync,argParam);
		//Yvonne	0970826	0970817	移至SetgServiceAvailable函式中
/*    
	if (argParam == null)
       callID = service.Serv.callService(callObj);
       else if (argParam[0] == null)
       callID = service.Serv.callService(callObj ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }
//由onserviceavailable事件判斷WS是否可用，不再使用是否為第一次呼叫判斷
	if(!argAsync)
	{
		if( FirstInvokeWS )
			return callID;
	}
	
	return callID;
	*/
}
function ErrCallId()
{
	var id = 0;
	var error = true;
	var errorDetail = new errDetail();	
}
function errDetail()
{
	var code = "Client";
	var string = "頁面重置";
	var row = null;
}
function SetgServiceAvailableW(callObj,argAsync,argParam)
{
	if(!service.Serv) return new ErrCallId(); //0980105 Leo 避免Webservice物件不存在的時候跳錯誤訊息。
	
	if (argParam == null)
       callID = service.Serv.callService(callObj);
    else if (argParam[0] == null)
       callID = service.Serv.callService(callObj ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }

	return callID;
}
//Yvonne	0970826	0970817
//程式暫停幾(毫)秒
function jf_Pause( argMilliseconds )
{
    //視窗於幾(毫)秒後關閉
    var sDialogScript = 'window.setTimeout( function () { window.close(); }, ' + argMilliseconds + ');';
    window.showModalDialog('javascript:document.writeln ("<script>' + sDialogScript + '<' + '/script>")');
}
//0980717 Albert 0980358、0980360 解決Client端如果沒有註冊W32.dll發生的問題
//var o = new ActiveXObject("W32.Thread");
//1000425 David 1000108 外網程式不使用WS，取消W32元件註冊行為
/*try
{
	var o = new ActiveXObject("W32.Thread");
}
catch(e)
{
	//開啟頁面使下載W32.dll
	window.open('../../../STD/LIB/CheckW32.htm','_self','');
}*/
function jf_Wait(argMilliseconds)
{	
	o.Wait(argMilliseconds);
}
//Call WebService (Auto Plus SeesionID)
function jf_CallWS(argService, argFunName, argAsync, argParam)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argService = argService.replace(/http:/ig, 'https:');
		
	//Yvonne	0970826	0970817	在此先註冊EVENT觸發後要呼叫的function，避免使用useService後，EVENT已被觸發但未完成註冊EVENT觸發後要呼叫function的動作
	if(gArServiceName.join(",").indexOf(argService.toUpperCase()) == -1)
	{
		gServiceAvailable = false;
		gArServiceName.push(argService.toUpperCase());
		service.onserviceavailable=function(){gServiceAvailable = true;o.StopWaiting();};
		document.body.onunload=function(){gServiceAvailable = true;o.StopWaiting();};//0980105 Leo 0971032 避免離開頁面時while迴圈未停止
		//無論同步或非同步，皆需等callback function OK之後再callservice
		/*
		if(argAsync)//非同步
			service.onserviceavailable=function(){return SetgServiceAvailable(callObj,argAsync,argParam)};
		else//同步
			service.onserviceavailable=function(){gServiceAvailable = true;};
			*/
	}
	else
		gServiceAvailable = true;
	var callObj = new Object();
    callObj.funcName = argFunName;      // Name of the remote function.
    callObj.async = argAsync;         // A Boolean that specifies the type of call
    callObj.timeout = 5;         // Timeout for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	//in order to avoid the service unavailable problem
	//conver the service to uppercase cause the uppercase service is invoked
	//when this page is onloaded, the 2nd invocation of this web service will success
	argService = argService.toUpperCase();
	if( document.all.service == null)
		return;
	if( document.all.SessionID == null )
		return;
    service.useService(argService+"?WSDL","Serv");
    //無論同步或非同步，皆需等callback function OK之後再callservice
    //if(!gServiceAvailable && !argAsync)
    if(!gServiceAvailable)
	{
			while(!gServiceAvailable)
				//0970908	setTimeout在IE7下因安全限制無法使用
				//jf_Pause(100);	
				jf_Wait(1000);
			return SetgServiceAvailable(callObj,argAsync,argParam);
    }
    else
		return SetgServiceAvailable(callObj,argAsync,argParam);
		//Yvonne	0970826	0970817	移至SetgServiceAvailable函式中		
/*		
	if (argParam == null)
       callID = service.Serv.callService(callObj , jf_GetSessionID() );
       else if (argParam[0] == null)
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }
//由onserviceavailable事件判斷WS是否可用，不再使用是否為第一次呼叫判斷
	if(!argAsync)
	{
		if( FirstInvokeWS )
			return callID;
	}
	
	return callID;
	*/
}
function SetgServiceAvailable(callObj,argAsync,argParam)
{
	if(!service.Serv) return new ErrCallId(); //0980105 Leo 避免Webservice物件不存在的時候跳錯誤訊息。
	
	if (argParam == null)
       callID = service.Serv.callService(callObj , jf_GetSessionID() );
    else if (argParam[0] == null)
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }
	
	return callID;
}
//Call WebService (Auto Plus Artifact)
function jf_CallWA(argService, argFunName, argAsync, argParam)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argService = argService.replace(/http:/ig, 'https:');
		
	//Yvonne	0970826	0970817	在此先註冊EVENT觸發後要呼叫的function，避免使用useService後，EVENT已被觸發但未完成註冊EVENT觸發後要呼叫function的動作
	if(gArServiceName.join(",").indexOf(argService.toUpperCase()) == -1)
	{
		gServiceAvailable = false;
		gArServiceName.push(argService.toUpperCase());
		service.onserviceavailable=function(){gServiceAvailable = true;o.StopWaiting();};
		document.body.onunload=function(){gServiceAvailable = true;o.StopWaiting();};//0980105 Leo 0971032 避免離開頁面時while迴圈未停止
		//無論同步或非同步，皆需等callback function OK之後再callservice
		/*
		if(argAsync)//非同步
			service.onserviceavailable=function(){return SetgServiceAvailable(callObj,argAsync,argParam)};
		else//同步
			service.onserviceavailable=function(){gServiceAvailable = true;};
			*/
	}
	else
		gServiceAvailable = true;
	var callObj = new Object();
    callObj.funcName = argFunName;      // Name of the remote function.
    callObj.async = argAsync;         // A Boolean that specifies the type of call
    callObj.timeout = 5;         // Timeout for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	//in order to avoid the service unavailable problem
	//conver the service to uppercase cause the uppercase service is invoked
	//when this page is onloaded, the 2nd invocation of this web service will success
	argService = argService.toUpperCase();
	if( document.all.service == null)
		return;
	if( document.all.SessionID == null )
		return;
    service.useService(argService+"?WSDL","Serv");
    //無論同步或非同步，皆需等callback function OK之後再callservice
    //if(!gServiceAvailable && !argAsync)
    if(!gServiceAvailable)
	{
			while(!gServiceAvailable)
				//0970908	setTimeout在IE7下因安全限制無法使用
				//jf_Pause(100);	
				jf_Wait(1000);
			return SetgServiceAvailableWA(callObj,argAsync,argParam);
    }
    else
		return SetgServiceAvailableWA(callObj,argAsync,argParam);
		//Yvonne	0970826	0970817	移至SetgServiceAvailableWA函式中
/*    
	if (argParam == null)
       callID = service.Serv.callService(callObj , jf_GetArtifact() );
       else if (argParam[0] == null)
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }
//由onserviceavailable事件判斷WS是否可用，不再使用是否為第一次呼叫判斷
	if(!argAsync)
	{
		if( FirstInvokeWS )
			return callID;
	}
	
	return callID;
	*/
}
function SetgServiceAvailableWA(callObj,argAsync,argParam)
{
	if(!service.Serv) return new ErrCallId(); //0980105 Leo 避免Webservice物件不存在的時候跳錯誤訊息。
	
	if (argParam == null)
       callID = service.Serv.callService(callObj , jf_GetArtifact() );
       else if (argParam[0] == null)
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }
	
	return callID;
}
function jf_PrintFile()
{
	if(document.all.PrintFilePath != null)
	{
		ht = new ActiveXObject("DnP.PrintPDF");
		ht.PlugInSource = document.all.PlugInSource.value;
		
		//指定列印份數
		if(document.all.PrintCopies != null)
		{
			if(!isNaN(document.all.PrintCopies.value))
				ht.PrintCopies = parseInt(document.all.PrintCopies.value);
		}
		
		ht.Print(document.all.PrintFilePath.value);
    }
}

function jf_GetActionMode()
{
	return parseInt(document.all.TemplateMode.value);
}

function jf_GetSessionID()
{
	//1080118	Kevin_C		1070678	Client Potential Code Injection
	//return document.all.SessionID.value;
	return encodeURI(document.all.SessionID.value);
}

function jf_GetArtifact()
{
	if (document.all.SsoArtifact)
		return document.all.SsoArtifact.value;
	return "";
}

function jf_ToolBarSubmit()
{
	var o=document.all.tbTool.getItem(event.flatIndex);
	document.all.ToolBarSenderID.value = o.getAttribute("ID");
	
	if(Page_BlockSubmit==false)
	{
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("tbTool",event.flatIndex);
	}
}

function jf_SelectBarSubmit()
{
	var o=document.all.tbSelect.getItem(event.flatIndex);
	document.all.ToolBarSenderID.value = o.getAttribute("ID");
	
	if(Page_BlockSubmit==false)
	{
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("tbSelect",event.flatIndex);
	}
}

function jf_OpenButtonSubmit()
{
	document.all.ToolBarSenderID.value = "btOpen";
	
	if(Page_BlockSubmit==false)
	{
		IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("tbTool",0);
	}
}

function jf_BannerExit()
{
    try
    {
		jf_CustomExitHandler();
    }
    catch(e)
    {
       Page_BlockSubmit = true;
	   jf_CloseWindow("1","");
    } 
}

var argPrevId =null;
function jf_SetTreeViewMode(nNodeID)
{
	if(document.getElementById("tv_" + nNodeID).style.backgroundColor=='#ccccff')	
		document.getElementById("tv_" + nNodeID).style.backgroundColor='#ffffff';
	else
		document.getElementById("tv_" + nNodeID).style.backgroundColor='#ccccff';
	
	if(argPrevId)
		document.getElementById("tv_" + argPrevId).style.backgroundColor='#ffffff';
	argPrevId=nNodeID;
	
}

function ChangeImages(node, imgpath, imgMain, imgPlusMinusPrefix, imgPlusMinus)
{
	bSetMainImage = (imgMain != ""); //don't set main image in text modes
	if (node.children.length > 0)
	{
		if (node.children.item(0).tagName == "IMG")
		{
			if (imgPlusMinus != "No") //"No" indicates that it is not needed Plus or Minus image
				node.children.item(0).src = imgpath + imgPlusMinusPrefix + imgPlusMinus + ".gif";
			else //if is not needed Plus/Minus image
			{
				if (bSetMainImage) //if node has image that must be changed
				{
					node.children.item(0).src = imgpath + imgMain;
					bSetMainImage = false;
				}
			}									
		}			
	}
	
	// process situation <A..><Checkbox><needed image></A>
	if (bSetMainImage && node.children.length > 1)
	{
		if (node.children.item(0).tagName == "INPUT" && node.children.item(1).tagName == "IMG")
		{
			node.children.item(1).src = imgpath + imgMain;
			bSetMainImage = false;
		}
	}
	
	//process next tag
	if (bSetMainImage)
	{
		nextNode = node.nextSibling;
		if (nextNode.tagName == "INPUT") //skip checkbox
			nextNode = nextNode.nextSibling;

		if (nextNode.tagName == "IMG") //next tag is needed image
			nextNode.src = imgpath + imgMain;
		else //next tag is <A...>
			if (nextNode.children.length > 0)
			{
				pos = 0;
				if (nextNode.children.item(0).tagName == "INPUT" && nextNode.children.length > 1)	
					pos = 1; // <A..> <Checkbox> <needed image>

				if (nextNode.children.item(pos).tagName == "IMG")							
					nextNode.children.item(pos).src = imgpath + imgMain;
			}
	}		
}
function ExpCol(node, imgpath, imgPlusMinus, imgCollapsed, imgExpanded, nodekey)
{
	if (node != null)
	{
		nextNode = node.nextSibling;
		bFinded = false;
		
		while (nextNode != null && bFinded == false)
		{					
			if (nextNode.tagName == "DIV")
				bFinded = true;	
			else			
				nextNode = nextNode.nextSibling;	
		}
		
		if (nextNode != null && bFinded)
		{						
			if (nextNode.style.display == 'none')
			{
				nextNode.style.display = '';
				ChangeImages(node, imgpath, imgExpanded, 'tv_minus', imgPlusMinus);
			}
			else
			{
				nextNode.style.display = 'none';
				ChangeImages(node, imgpath, imgCollapsed, 'tv_plus', imgPlusMinus);
			}
		}				
	}
}

function jf_FocusAt()
{
	try{
		if (document.all["FocusAt"])
		{
			if(document.all["FocusAt"].value != "")
			{
				if(document.all[document.all["FocusAt"].value] && !document.all[document.all["FocusAt"].value].disabled)
					document.all[document.all["FocusAt"].value].focus();
			}
		}
	}
	catch(e)
	{
		throw e.value = "jf_FocusAt Err";
	}
}

function jf_GetParentCheckBox(oCheckBox)
{
	var oParent = oCheckBox.parentElement;
	var oSibling=oParent;
	while(oSibling!=null)
	{
		if(oSibling.tagName=="INPUT")
			return oSibling;
		else
			oSibling=oSibling.previousSibling;
	}
	return null;		
}
		
function jf_UnCheckAllParent(oCheckBox)
{
	var oParentCheckBox = jf_GetParentCheckBox(oCheckBox);
	if(oParentCheckBox!=null)
	{
		oParentCheckBox.checked=false;
		jf_UnCheckAllParent(oParentCheckBox);
	}
}
		
function jf_CheckAllChildren(oCheckBox)
{
	var oDiv = oCheckBox.nextSibling;
	while(oDiv!=null)
	{
		if(oDiv.tagName=="DIV")
			break;
		if(oDiv.tagName=="INPUT")
			return;
		else
			oDiv = oDiv.nextSibling;
	}
	if(oDiv==null)
		return;
			
	var nLen =oDiv.all.length;
	for(i=0;i<nLen;i++)
	{
		var oChild = oDiv.all[i];
		if(oChild.tagName=="INPUT")
		{
			oChild.checked=true;
		}
	}
}
		
function jf_UnCheckAllChildren(oCheckBox)
{
	var oDiv = oCheckBox.nextSibling;
	while(oDiv!=null)
	{
		if(oDiv.tagName=="DIV")
			break;
		if(oDiv.tagName=="INPUT")
			return;
		else
			oDiv = oDiv.nextSibling;
	}
	if(oDiv==null)
		return;

	var nLen =oDiv.all.length;
	for(i=0;i<nLen;i++)
	{
		var oChild = oDiv.all[i];
		if(oChild.tagName=="INPUT")
		{
			oChild.checked=false;
		}
	}
}

//以下為 93.12.19 Andy新增

//取得選取之DropDownList值
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}

/********** 以下為Msg Diag處理區 **********/

//輸入Ctrl + F12後開啟MsgDiag視窗
document.onkeyup = jf_CheckSpecialKeyPress;
function jf_CheckSpecialKeyPress()
{
	if(event.ctrlKey)
	{
		if(event.keyCode == "123")
		{
			if(document.all["txPrivilege"].value == "SuperUser")
			{
				jf_OpenMsgWin("../../../STD/LIB/MsgDiag.aspx", "MsgDiag");
			}
		}
	}
}

/********** 以下為DataGrid ToolBar處理區 **********/
var i,j;

//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = true;	
	}
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
		{
			if(obj.checked)
				obj.checked = false;
			else
				obj.checked = true;
		}
	}
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return;
		
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.disabled == false)
			obj.checked = false;
	}
}

//刪除選取
function jf_DeleteSelected(argTableName, argCheckBoxName, argTableFields)
{
	if(document.all[argTableName] == null)
		return;
		
	var nChecked = 0;
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.checked)
		{
			obj.checked = false;
			var len2 = argTableFields.length;
			for(j = 0; j < len2; j++)
			{
				var tmpObj = document.all[argTableName+"__ctl"+ i + argTableFields[j]];
				if(tmpObj.type == "text") //TextBox
				{
					tmpObj.value = "";
				}
				else if(tmpObj.type == "textarea") //TextArea
				{
					tmpObj.value = "";
				}
				else if(tmpObj.type == "checkbox") //CheckBox
				{
					tmpObj.checked = false;
				}
				else if(tmpObj.type == "radio") //RadioButton
				{
					tmpObj.checked = false;
				}
				else if(tmpObj.type == "select-one") //DropDownList
				{
					tmpObj.selectedIndex = 0;
				}
				else if(tmpObj.nodeName == "SPAN") //Label
				{
					tmpObj.innerText = "";
				}
			}
			nChecked = 1;
		}
	}
	
	if(nChecked == 0)
		return false
	else
		return true
}

//向上移動
function jf_RowUp(argTableName, argCheckBoxName, argTableFields)
{
	if(document.all[argTableName] == null)
		return;
		
	var strTemp = new Array();
	var nChecked = 0;
	var nCount = 0;
	
	var len = document.all[argTableName].rows.length + 1;
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.checked)
		{
			if(nCount == 0)
			{
				var len2 = argTableFields.length;
				for(j = 0; j < len2; j++)
				{
					var tmpObj = document.all[argTableName+"__ctl"+ i + argTableFields[j]];
					if(tmpObj.type == "text") //TextBox
					{
						strTemp[j] = tmpObj.value;
					}
					else if(tmpObj.type == "textarea") //TextArea
					{
						strTemp[j] = tmpObj.value;
					}
					else if(tmpObj.nodeName == "SPAN") //Label
					{
						strTemp[j] = tmpObj.innerText;
					}
					else if(tmpObj.nodeName == "SELECT") //DropdownList
					{
						strTemp[j] = tmpObj.selectedIndex;
					}
					else if(tmpObj.type == "checkbox") //CheckBox 0960604 Leo
					{
						strTemp[j] = tmpObj.checked;
					}
				}
				nChecked = i;
				nCount += 1;
			}
			else
			{
				alert("一次只能移動一筆資料");
				return;
			}
		}
	}
	
	//單一選取且不為第一筆
	var bChange = true;
	if(nCount == 1 && nChecked != 2)
	{
		document.all[argTableName+"__ctl"+ nChecked + argCheckBoxName].checked = false;
		var nTmp = nChecked - 1;
		while(document.all[argTableName+"__ctl"+ nTmp + argCheckBoxName].disabled == true)
		{
			if(nTmp > 2)
				nTmp--;
			else
			{
				bChange = false;
				break;
			}
		}
		
		if(bChange)
		{
			document.all[argTableName+"__ctl"+ nTmp + argCheckBoxName].checked = true;
		
			var len3 = argTableFields.length;
			for(j = 0; j < len3; j++)
			{
				var ChangedObj = document.all[argTableName+"__ctl"+ nChecked + argTableFields[j]];
				var tmpObj = document.all[argTableName+"__ctl"+ nTmp + argTableFields[j]];
				if(tmpObj.type == "text") //TextBox
				{
					ChangedObj.value = tmpObj.value;
					tmpObj.value = strTemp[j];
				}
				else if(tmpObj.type == "textarea") //TextArea
				{
					ChangedObj.value = tmpObj.value;
					tmpObj.value = strTemp[j];
				}
				else if(tmpObj.nodeName == "SPAN") //Label
				{
					ChangedObj.innerText = tmpObj.innerText;
					tmpObj.innerText = strTemp[j];
				}
				else if(tmpObj.nodeName == "SELECT") //DropdownList
				{
					ChangedObj.selectedIndex = tmpObj.selectedIndex;
					tmpObj.selectedIndex = strTemp[j];
				}
				else if(tmpObj.type == "checkbox") //CheckBox 0960604 Leo
				{
					ChangedObj.checked = tmpObj.checked;
					tmpObj.checked = strTemp[j];
				}

			}
		}
	}
}

//向下移動
function jf_RowDown(argTableName, argCheckBoxName, argTableFields)
{
	if(document.all[argTableName] == null)
		return;
		
	var strTemp = new Array();
	var nChecked = 0;
	var nCount = 0;
	
	var len = document.all[argTableName].rows.length + 1;			
	for(i = 2; i < len; i++)
	{
		var obj = document.all[argTableName+"__ctl"+ i + argCheckBoxName];
		if(obj.checked)
		{
			if(nCount == 0)
			{
				var len2 = argTableFields.length;
				for(j = 0; j < len2; j++)
				{
					var tmpObj = document.all[argTableName+"__ctl"+ i + argTableFields[j]];
					if(tmpObj.type == "text") //TextBox
					{
						strTemp[j] = tmpObj.value;
					}
					else if(tmpObj.type == "textarea") //TextArea
					{
						strTemp[j] = tmpObj.value;
					}
					else if(tmpObj.nodeName == "SPAN") //Label
					{
						strTemp[j] = tmpObj.innerText;
					}
					else if(tmpObj.nodeName == "SELECT") //DropdownList
					{
						strTemp[j] = tmpObj.selectedIndex;
					}
					else if(tmpObj.type == "checkbox") //CheckBox 0960604 Leo
					{
						strTemp[j] = tmpObj.checked;
					}
				}
				nChecked = i;
				nCount += 1;
			}
			else
			{
				alert("一次只能移動一筆資料");
				return;
			}
		}
	}
	
	//單一選取且不為最後一筆
	var bChange = true;
	var nLast = document.all[argTableName].rows.length;
	if(nCount == 1 && nChecked != nLast )
	{
		document.all[argTableName+"__ctl"+ nChecked + argCheckBoxName].checked = false;
		var nTmp = nChecked + 1;
		while(document.all[argTableName+"__ctl"+ nTmp + argCheckBoxName].disabled == true)
		{
			if(nTmp < nLast)
				nTmp++;
			else
			{
				bChange = false;
				break;
			}
		}

		if(bChange)
		{
			document.all[argTableName+"__ctl"+ nTmp + argCheckBoxName].checked = true;
		
			var len3 = argTableFields.length;
			for(j = 0; j < len3; j++)
			{
				var ChangedObj = document.all[argTableName+"__ctl"+ nChecked + argTableFields[j]];
				var tmpObj = document.all[argTableName+"__ctl"+ nTmp + argTableFields[j]];
				if(tmpObj.type == "text") //TextBox
				{
					ChangedObj.value = tmpObj.value;
					tmpObj.value = strTemp[j];
				}
				else if(tmpObj.type == "textarea") //TextArea
				{
					ChangedObj.value = tmpObj.value;
					tmpObj.value = strTemp[j];
				}
				else if(tmpObj.nodeName == "SPAN") //Label
				{
					ChangedObj.innerText = tmpObj.innerText;
					tmpObj.innerText = strTemp[j];
				}
				else if(tmpObj.nodeName == "SELECT") //DropdownList
				{
					ChangedObj.selectedIndex = tmpObj.selectedIndex;
					tmpObj.selectedIndex = strTemp[j];
				}
				else if(tmpObj.type == "checkbox") //CheckBox 0960604 Leo
				{
					ChangedObj.checked = tmpObj.checked;
					tmpObj.checked = strTemp[j];
				}
			}
		}
	}
}

//檢查Email格式，將傳入之參數檢查後的結果以bool型態回傳。
function jf_CheckEmail(argEmail)
{
 var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
 return filter.test(argEmail);
}
