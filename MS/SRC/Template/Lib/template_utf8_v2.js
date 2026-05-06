/********************************************************
function jf_CallWS			//呼叫WebService API
function jf_Clean()			//清除document上所有物件的值,讓使用者重新輸入
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
function jf_FocustAt()			//設定頁面開啟後焦點設定
function jf_GetParentCheckBox()	//TreeView中,取得某特定CheckBox的上層CheckBox
function jf_UnCheckAllParent()	//Uncheck特定CheckBox的所有上層CheckBox
function jf_CheckAllChildren()	//Check特定CheckBox的所有下層CheckBox
function jf_UnCheckAllChildren()//UnCheck特定CheckBox的所有下層CheckBox
**********************************************************/

/*
DATE	SA		PRG		MGR_NO				DESC
0980717 		Albert	0980358、0980360	解決Client端如果沒有註冊W32.dll發生的問題
1080515	Kevin	Joe		1080350				弱掃修正Client Potential Code Injection
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

window.onload = jf_WindowOnLoad;

function jf_WindowOnLoad()
{
	document.oncontextmenu=jf_BlockContextMenu
	document.onkeydown = jf_DocumentOnKeyDown
	jf_Init();
	jf_SaveInitValue();
	jf_PrintFile();
	
	try
	{
		jf_MenuInit();
		document.body.className='';
		ProjectOnLoad();
		ClientOnLoad();
		jf_FocusAt();
	}
	catch(e)
	{
		//alert(e);
		//alert("Exception occured in initialization!\nError Message:"+e.Message);
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
		arrValue[i]=document.all[KeyObjectArr[i]].value
		arrFieldName[i]=FieldNameArr[i];
	}
	
	if (argOrgNo!="")
	{
		arrFieldName[arrFieldName.length]="SOURCE_ORGNO"
		arrValue[arrValue.length]=argOrgNo;
	}
	var arWSParam = new Array(3);
	
	//1080515 Joe 1080350	Client Potential Code Injection--S
	// arWSParam[0] = document.all["KeyTableName"].value;//"EMPLOYEE";
	// arWSParam[1] = arrFieldName;
	// arWSParam[2] = arrValue;
	arWSParam[0] = encodeURI(document.all["KeyTableName"].value);//"EMPLOYEE";
	arWSParam[1] = encodeURI(arrFieldName);
	arWSParam[2] = encodeURI(arrValue);
	//1080515 Joe 1080350	Client Potential Code Injection--E
				
	callObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	
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
   if(event.keyCode==9)
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
					if(document.activeElement.form.elements[i].className=="hidden")
						continue;

					currentMatch = document.activeElement.form.elements[i];
				}
				
			}
			else
			{
				if((document.activeElement.form.elements[i].tabIndex < currentMatch.tabIndex)&&
					(document.activeElement.form.elements[i].tabIndex > document.activeElement.tabIndex))
				{
					if(document.activeElement.form.elements[i].className=="hidden")
						continue;
					currentMatch = document.activeElement.form.elements[i];
				}
			}
			
		}
	  }
	  
	  if(currentMatch !=null)
	     currentMatch.focus();
   }
}

function jf_IsModified()
{
   for(i=0;i< document.forms[0].elements.length;i++)
   {
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
		jf_SaveCookieWithExpire("Mode", KeepMode);		//預設保留模式

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
		window.setTimeout("jf_SetTimeOutFlag()",jf_ReadCookie("TimeOutLimit"));
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
		   document.forms[0].elements[i].selectedIndex = -1;
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
		jf_CloseWindow("1","");
}

function jf_ConfirmPreview()
{
	if(jf_IsModified())
		return window.confirm("您已修改內容且未儲存,確認要預覽報表嗎?")
	else
		return true;
}

function jf_ConfirmPrint()
{
	if(jf_IsModified())
		return window.confirm("您已修改內容且未儲存,確定要列印報表嗎?")
	else
		return true;
}

function jf_ResetTimeOutFlag()
{
	//Reset flag
	jf_SaveCookie("TimeOutFlag","false");
	//重新計時
	if(jf_ReadCookie("TimeOutLimit") != "")
		window.setTimeout("jf_SetTimeOutFlag()",jf_ReadCookie("TimeOutLimit"));	
}	

function jf_SetTimeOutFlag()
{
	jf_SaveCookie("TimeOutFlag","true");
}	

function jf_IsTimeOut()
{
    var screen_height = window.screen.height
    var screen_width  = window.screen.width
    var subwin_height = 170
    var subwin_width  = 290
    var subwin_top    = (screen_height - subwin_height) / 2
    var subwin_left   = (screen_width  - subwin_width ) / 2
 
    //  OPTIONS //
    var pDir      = "directories=no"
    var pLcn      = "location=no"
    var pMenu     = "menubar=no"
    var pStatus   = "status=no"
    var pTool     = "toolbar=no"
    var pScroll   = "scrollbars=no"
    var pResize   = "resizable=no"
    var pHeight   = "height=" + subwin_height
    var pWidth    = "width=" + subwin_width
    var pTop      = "top=" + subwin_top
    var pLeft     = "left=" + subwin_left
 
    var pOption = pDir + ',' + pHeight + ',' + pLcn + ',' + pMenu + ',' + pStatus + ',' 
                + pTool + ',' + pScroll + ',' + pResize+','+pWidth+','+pTop+','+pLeft
 
    if(jf_ReadCookie("NonCheck")=="true")
        return false;
    if(jf_ReadCookie("TimeOutFlag")=="true")
    {
        oWin = window.open(jf_ReadCookie("LoginPage"),"請重新登入",pOption);
        oWin.focus();
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
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
			   jf_RedirectToCustomErrPage();
			}
			else
				alert( obj.ErrorClass.ErrMessage[0].text);
			
			return false;
		}
	}
	
	return true;
	
}
function jf_RedirectToCustomErrPage()
{
	document.location = "Template\\Lib\\customErr.aspx";
}
//0980717 Albert 0980358、0980360 解決Client端如果沒有註冊W32.dll發生的問題
try
{
	//var o = new ActiveXObject("W32.Thread");
}
catch(e)
{
	//開啟頁面使下載W32.dll
	window.open('../../../STD/LIB/CheckW32.htm','_self','');
}
function jf_CallWS(argService, argFunName, argAsync, argParam)
{
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
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9]);

	if(!argAsync)
	{
		if( FirstInvokeWS )
			return callID;
	}
	
	return callID;
}

function jf_PrintFile()
{
	if(document.all.PrintFilePath != null)
	{
		ht = new ActiveXObject("DnP.PrintPDF");
		ht.PlugInSource = document.all.PlugInSource.value;
		ht.Print(document.all.PrintFilePath.value);
    }	
}

function jf_GetActionMode()
{
	return parseInt(document.all.TemplateMode.value);
}

function jf_GetSessionID()
{
	//1080515 Joe 1080350 修正Client Potential Code Injection
	//return document.all.SessionID.value;	
	return encodeURI(document.all.SessionID.value);	
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
			document.all[document.all["FocusAt"].value].focus();;
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
		