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
function jf_FocustAt()			//設定頁面開啟後焦點設定
function jf_GetParentCheckBox()	//TreeView中,取得某特定CheckBox的上層CheckBox
function jf_UnCheckAllParent()	//Uncheck特定CheckBox的所有上層CheckBox
function jf_CheckAllChildren()	//Check特定CheckBox的所有下層CheckBox
function jf_UnCheckAllChildren()//UnCheck特定CheckBox的所有下層CheckBox
function jf_GetArtifact()		//由網址參數中取得Artifact
**********************************************************/
/*
DATE	SA		PRG		MGR_NO		DESC
0970826	Stella	Yvonne	0970817		修改jf_CallWS，在onserviceavailable的event觸發後，再callService，避免發生service unavailable
0980105			Leo		0971032		增加onbeforeunload時將迴圈中斷，以避免程式無法關閉的狀況
0980717	Stella	Albert	0980358、0980360 解決Client端如果沒有註冊W32.dll發生的問題
1010222 Leslie	David	1010116		點選畫面離開功能鍵時，判斷欄位異動須排除隱藏欄位
1030910 David	David	1020726		(Merge)配合土銀NLB，修改原jf_CallWS()邏輯，改為傳入Artifact
1031028	Kevin	Kevin	1030836		新增支援SSL
1031111	Leslie	--		1020726		修正因升級.Net 4.5後，程式必定於__doPostBack()時呼叫ClientButtonControl()，而造成的錯誤document.activeElement錯誤
1040205	David	David	1040033		由V3複製jf_CallW()過來
1050930	Leslie	--		--			修改Enter鍵改為Tab的行為
1051222	Kevin	Kevin	1051150		修正Client Potential Code Injection
1060817	Cloud	Kevin_C	1060719		修正阻擋ENTER事件無效的問題
1061019	Cloud	Cloud	1061031		修正如程式本身有非透過toolbar事件postback，在toolbar事件觸發卻被檢核組檔後，又透過控制項觸發postback卻會執行被駔檔的toolbar事件問題
1061027	Leslie	Leslie	1061033		修改預設為清除模式，[1061059]
1071011	Leslie	Kevin_C	----		[NCKU107087]增加檢核物件是否支援文字選取行為
1080610	Leslie	Leslie	1080513		配合Chrome[75.0.3770.80]更新後會重覆觸發PostBack，強制重置變數
1090929	Kevin	Kevin	1090729		弱掃修正Client Reflected File Download
1091117	Leslie	Leaslie	1080943		改用WebMethodInfo取代WSDL
1110520 Leslie	Leslie	1110371		純檔管升級二代
1110701	Kevin	Kevin	1110629 	調整ToolBar UI
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

//1041223	Leslie	Leslie	--		二代公文系統相關修改

//1081219	Leslie	針對升級jQuery3.4.1後，document.ready事件改用Deferred()執行，會造成IE與Chrome行為不同，引起一連串異常現象，改用原生addEventListener('DOMContentLoaded')
//$(document).ready(function () {
document.addEventListener( "DOMContentLoaded",function(){
	$('.V2_GenericBannerToolBar > input[type=submit] , .V2_GenericBannerToolBar > select').each(function () { 
		this.addEventListener('click', jf_ToolBarHandle);
		//$(this).on('tap',function(){jf_ToolBarHandle()});
		if($(this).attr('DefaultStyle') == undefined)
			return;
		var currMode;
		try{
		 currMode = jf_GetActionMode();
		}catch(e){}
		if(currMode == undefined)
			currMode = 0;
		var ModeStyle = $(this).attr('DefaultStyle').split(';')[currMode];
		var style = (ModeStyle.split(':')[1] == 'block')?"":"none";
		$(this).css('display',style);
	});	
	
	$('.DgSelectToolBar>input[type=submit]').each(function(){
		this.addEventListener('click',jf_ToolBarHandle);
	})
	
	$('.PopUp').each(function(){
		$(this).css('cursor','pointer');
	})
	
	//1051123	Leslie	針對ToolBar可能會變二行，增加判斷後處理畫面往下移
	if ($('.DivBaseTable,.BaseTable').length)
	if($('.DivBaseTable,.BaseTable').offset().top < $('#tbTool').height())$('.DivBaseTable,.BaseTable').css('margin-top',$('#tbTool').height()+20+'px');

	//1110701 Kevin 1110629 新增ToolBar分隔線
	$('<span class="ToolBarSpan">|</span>').insertBefore(  $('.V2_GenericBannerToolBar input:not([style*="display: none"]):not(:first):not(.hide)') );
	
	//1110701 Kevin 1110629 考試院隱藏設定、狀態列
	var oOpener = GetSSOPage();
	if (oOpener.SSO_CONFIG) {

		if (oOpener.SSO_CONFIG.OrgNickName=='EXAM') {
			$('#SetupBtn').hide();
			$('.footStatus').hide();
		}
	}
})

function jf_WindowOnLoad()
{
	document.oncontextmenu=jf_BlockContextMenu
	document.onkeydown = jf_DocumentOnKeyDown
	jf_Init();
	jf_SaveInitValue();
	jf_PrintFile();
	
	try
	{		
		try{jf_MenuInit();}catch(e){}
		document.body.className='';
		ProjectOnLoad();
		ClientOnLoad();
		
		//1031111	Leslie	修正因升級.Net 4.5後，程式必定於__doPostBack()時呼叫ClientButtonControl()，而造成的錯誤document.activeElement錯誤
		//					於頁面載入後，一律先Focus到一個可輸入的欄位，以避免document.activeElement為null
		if(!document.activeElement)
		{
			jf_FocusToFirstInput();
		}
		jf_FocusAt();
	}
	catch(e)
	{
		//alert(e);
		alert("Exception occured in initialization!\nError Message:"+e.Message+", e.id:"+e.id);
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
		//1051222 Kevin 1051150 修正Client Potential Code Injection
		//arrValue[i]=document.all[KeyObjectArr[i]].value
		//arrFieldName[i]=FieldNameArr[i];
		arrValue[i] = encodeURI(document.all[KeyObjectArr[i]].value);
		arrFieldName[i] = encodeURI(FieldNameArr[i]);
	}
	
	if (argOrgNo!="")
	{
		arrFieldName[arrFieldName.length]="SOURCE_ORGNO"
		//1051222 Kevin 1051150 修正Client Potential Code Injection
		//arrValue[arrValue.length]=argOrgNo;
		arrValue[arrValue.length] = encodeURI(argOrgNo);
	}
	var arWSParam = new Array(3);
	
	//1051222 Kevin 1051150 修正Client Potential Code Injection
	//arWSParam[0] = document.all["KeyTableName"].value;//"EMPLOYEE";
	arWSParam[0] = encodeURI(document.all["KeyTableName"].value);
	arWSParam[1] = arrFieldName;
	arWSParam[2] = arrValue;
				
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

//1050505	Leslie	二代修改
//function jf_ConvertEnterToTab()
function jf_ConvertEnterToTab(event)
{
	//1060817	Kevin_C	1060719	修正阻擋ENTER事件無效的問題
	if(event.returnValue == false)
		return;
	//1050505	Leslie	二代修改
	//OriginalKeyCode = event.keyCode;
	OriginalKeyCode = event.keyCode||event.charCode;
	if(document.activeElement.type=='submit')
	   return;
	   
	//1050505	Leslie	二代修改
	if(event.keyCode)
	if(event.keyCode==13)
	//1050930	Leslie	修改Enter鍵改為Tab的"行為"(非舊IE環境，無法變更回傳的鍵值，只能改其"行為")
	   //event.keyCode=9;
	{
		/* FOCUS ELEMENT */
		//1060817	Kevin_C	1060719	不要抓到tabindex為負數的欄位
		//var inputs = $(document.activeElement).parents("form").eq(0).find(":input:visible:enabled");
		var inputs = $(document.activeElement).parents("form").eq(0).find(":input:visible:enabled:not([tabindex^='-'])");
		var idx = inputs.index(document.activeElement);

		if (idx == inputs.length - 1) {
			inputs[0].select()
		} else {
			inputs[idx + 1].focus(); //  handles submit buttons
			//1071011	Kevin_C	[NCKU107087]增加檢核物件是否支援文字選取行為
			if('select' in inputs[idx+1])
			inputs[idx + 1].select();
		}
		event.preventDefault();
	}
}


//1050503	Leslie	二代系統修改
//function jf_DocumentOnKeyDown()
function jf_DocumentOnKeyDown(event)
{
	//1050503	Leslie	二代系統修改
   //jf_BlockBackKey();
   //jf_ConvertEnterToTab();
   var rtn = jf_BlockBackKey(event);
   jf_ConvertEnterToTab(event);
   return rtn;	//回傳退回鍵是否有效
}


function jf_CheckFull()
{
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
}

function jf_IsModified()
{
   for(i=0;i< document.forms[0].elements.length;i++)
   {
      //1010222 David 1010116 點選畫面離開功能鍵時，判斷欄位異動須排除隱藏欄位
	  if(document.forms[0].elements[i].style && document.forms[0].elements[i].style.display 
      && document.forms[0].elements[i].style.display.toLowerCase() == "none")
		continue;
	  //1081223	Leslie	修正隱藏欄位判斷，不是只有在style設display才是隱藏欄位
	  else if(document.forms[0].elements[i].className=="hide" || document.forms[0].elements[i].type =="hidden")
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
		//1081223	Leslie	修正隱藏欄位判斷，不是只有在style設display才是隱藏欄位
		else if(Node.parentNode.className == "hide")
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
   
		//1050324	Leslie	二代狀態列
		$('.footStatus').text(window.defaultStatus);
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
   
   //1050324	Leslie	二代狀態列
	$('.footStatus').text(window.defaultStatus);
}

function jf_Init()
{
	if(document.all.StatusValue != null)
	{
		//1050324	Leslie	二代狀態列
		window.defaultStatus = document.all.StatusValue.value;
		$('.footStatus').text(document.all.StatusValue.value);
	}

	//確認Cookie值存不存在
	if(jf_ReadCookie("Mode")==null)
		//1061027	Leslie[1061033]	預設改為清除模式
		//jf_SaveCookieWithExpire("Mode", KeepMode);		//預設保留模式
		jf_SaveCookieWithExpire("Mode", CleanMode);

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
		window.setTimeout("jf_SetTimeOutFlag()",jf_ReadCookie("TimeOutLimit"));	
}	

function jf_SetTimeOutFlag()
{
	jf_SaveCookie("TimeOutFlag","true");
}	

//1050823	Leslie	避免跳二次TimeOut訊息
var alertFlag = false;

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
		//1050823	Leslie	避免跳二次TimeOut訊息
		if(alertFlag){
			alertFlag = false;
			return true
		}
		else
			alertFlag = true;
        //oWin = window.open(jf_ReadCookie("LoginPage"),"請重新登入",pOption);
        //oWin.focus();
		
        //1050823	Leslie	整併TemplateV2與V3行為，TimeOut後應自動關閉
        //alert('操作逾時,請關閉本應用程式後,請重新開啟應用程式!!');
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
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
			   jf_RedirectToCustomErrPage();
			}
			else
				//1050623	Leslie	配合二代以JSON格式回傳，並考量格式轉換後的適用性，增加直接取得ArrayList(回傳後即為陣列)的值
				//alert( obj.ErrorClass.ErrMessage[0].text);
				{
					
					if(obj.ErrorClass.ErrMessage[0].text)
						alert(obj.ErrorClass.ErrMessage[0].text);
					else
						alert(obj.ErrorClass.ErrMessage[0]);
				}
				
			
			return false;
		}
	}
	
	return true;
	
}
function jf_RedirectToCustomErrPage()
{
	document.location = "Template\\Lib\\customErr.aspx";
}

/*1041221	Leslie	停用
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
try
{
	var o = new ActiveXObject("W32.Thread");
}
catch(e)
{
	//開啟頁面使下載W32.dll
	window.open('../../../STD/LIB/CheckW32.htm','_self','');
}
function jf_Wait(argMilliseconds)
{	
	o.Wait(argMilliseconds);
}
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
			*//*1041221	Leslie	停用
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
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15]);
	else if (argParam.length ==17 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16]);
	else if (argParam.length ==18 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16] , argParam[17]);
	else if (argParam.length ==19 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16] , argParam[17], argParam[18]);
	else if (argParam.length ==20 )
       callID = service.Serv.callService(callObj , jf_GetSessionID() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16] , argParam[17], argParam[18], argParam[19]);
//由onserviceavailable事件判斷WS是否可用，不再使用是否為第一次呼叫判斷
	if(!argAsync)
	{
		if( FirstInvokeWS )
			return callID;
	}
	
	return callID;
	*//*1041221	Leslie	停用
}/*1041221	Leslie	停用*/
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

/*1041221	Leslie	停用
function SetgServiceAvailable(callObj,argAsync,argParam)
{
	if(!service.Serv) return new ErrCallId(); //0980105 Leo 避免Webservice物件不存在的時候跳錯誤訊息。
	
	//1030910 David (Merge)配合土銀NLB架構，改為傳入Artifact	==START==
	if (argParam == null)
       //callID = service.Serv.callService(callObj , jf_GetSessionID() );
	   callID = service.Serv.callService(callObj , jf_GetArtifact() );
    else if (argParam[0] == null)
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam);
	else if (argParam.length ==1 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0]);
	else if (argParam.length ==2 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4]);
	else if (argParam.length ==6 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6]);
	else if (argParam.length ==8 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8]);
	else if (argParam.length ==10 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10]);
	else if (argParam.length ==12 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13]);
	else if (argParam.length ==15 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15]);
	else if (argParam.length ==17 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16]);
	else if (argParam.length ==18 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16] , argParam[17]);
	else if (argParam.length ==19 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16] , argParam[17], argParam[18]);
	else if (argParam.length ==20 )
       //callID = service.Serv.callService(callObj , jf_GetSessionID() ,
	   callID = service.Serv.callService(callObj , jf_GetArtifact() ,
							argParam[0] , argParam[1], argParam[2] , argParam[3],
							argParam[4] , argParam[5], argParam[6] , argParam[7],
							argParam[8] , argParam[9], argParam[10], argParam[11],
							argParam[12] , argParam[13], argParam[14], argParam[15],
							argParam[16] , argParam[17], argParam[18], argParam[19]);
	//1030910 David (Merge)配合土銀NLB架構，改為傳入Artifact	==END==	
	return callID;
}/*1041221	Leslie	停用*/
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
	//1051222 Kevin 1051150 修正Client Potential Code Injection
	//return document.all.SessionID.value;
	return encodeURI(document.all.SessionID.value);
}

//1041223	Leslie	二代公文系統修改
//function jf_ToolBarSubmit()
function jf_ToolBarSubmit(argSubmitBut)
{
	//var o=document.all.tbTool.getItem(event.flatIndex);
	//document.all.ToolBarSenderID.value = o.getAttribute("ID");
	//1061019	Cloud [1061031]修正如程式本身有非透過toolbar事件postback，在toolbar事件觸發卻被檢核組檔後，又透過控制項觸發postback卻會執行被駔檔的toolbar事件問題
	//$('#ToolBarSenderID').val(argSubmitBut);
	
	if(Page_BlockSubmit==false)
	{
		//1061019	Cloud [1061031]修正如程式本身有非透過toolbar事件postback，在toolbar事件觸發卻被檢核組檔後，又透過控制項觸發postback卻會執行被駔檔的toolbar事件問題
		$('#ToolBarSenderID').val(argSubmitBut);
		IsServerHandling = true;
		jf_ShowWaitState();
		//__doPostBack("tbTool",event.flatIndex);
		__doPostBack("tbTool",0);
		//1080610	Leslie[1080513]	配合Chrome更新後會重覆觸發PostBack，強制重置變數
		Page_BlockSubmit = true;
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
			if(!document.all[document.all["FocusAt"].value].disabled)
				document.all[document.all["FocusAt"].value].focus();
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

//1030910 David (Merge)配合土銀NLB，增加此函式由網址參數中取得Artifact
function jf_GetArtifact()
{
	//1030904	Leslie	修正AK有些子視窗未被傳入Artifact之問題
	//return GetParam("SAMLart");
	//1091119	Leslie[1090885]	改為一律由Cookie中取得
	//var strArtifact = GetParam("SAMLart");
	//if(strArtifact == "")
	//{
		//1051222 Kevin 1051150 修正Client Potential Code Injection
		//return jf_ReadCookie("SAMLart");
		//1091119	Leslie[1090885]	改為一律由Cookie中取得
		//strArtifact = jf_ReadCookie("SAMLart");
		var strArtifact = jf_ReadCookie("SAMLart");
	//}
	//1051222 Kevin 1051150 修正Client Potential Code Injection
	//return strArtifact;
	return encodeURI(strArtifact);
}
		
//取得參數值
function GetParam(ParamName)
{
	var arr = this.GetParamArray();
	if( ParamName == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == ParamName )
			return arr[i][1];
	return "";		
}

function GetParamArray()
{
	var arrayOfParamLen = 0;
	var arrayOfParam = new Array(0);
	
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i,j,k;
		i = pUrl.indexOf("?");
		var paramStr = pUrl.substr(i+1); 
		var arr = paramStr.split("&");
		for(j=0 ; j<arr.length ; j++)
		{
			
			k = arr[j].indexOf("=");
			if( k != -1 )
			{
				arrayOfParam[arrayOfParamLen] = new Array(2);
				arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0,k);
				arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k+1);
				arrayOfParamLen++;
			}
		}
	}
	return arrayOfParam;
}

//1031111	Leslie	修正因升級.Net 4.5後，程式必定於__doPostBack()時呼叫ClientButtonControl()，而造成的錯誤document.activeElement錯誤
//					於頁面載入後，一律先Focus到一個可輸入的欄位，以避免document.activeElement為null
function jf_FocusToFirstInput()
{
	var inputLength = document.getElementsByTagName("input").length;
	var obj = document.getElementsByTagName("input");
	for(var i=0;i<inputLength;i++)
	{
		if(obj[i].type == "hidden")
			continue;
		if(obj[i].style.visibility == "hidden")
			continue;
		if(obj[i].style.className=="hidden")
			continue;
		if(obj[i].style.display == "none")
			continue;
		if(obj[i].className=="hide")
			continue;
		if(obj[i].disabled == true)
			continue;
		obj[i].focus();
		break;
	}
}

/*1041221	Leslie	停用
//1040205 David 1040033 由V3複製過來
function jf_CallW(argService, argFunName, argAsync, argParam)
{
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argService = argService.replace(/http:/ig, 'https:');
		
	//在此先註冊EVENT觸發後要呼叫的function，避免使用useService後，EVENT已被觸發但未完成註冊EVENT觸發後要呼叫function的動作
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
			*//*1041221	Leslie	停用
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
    if(!gServiceAvailable)
	{
			while(!gServiceAvailable)
				jf_Wait(1000);
			return SetgServiceAvailableW(callObj,argAsync,argParam);
    }
    else
		return SetgServiceAvailableW(callObj,argAsync,argParam);
}
//1040205 David 1040033 由V3複製過來
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
}/*1041221	Leslie	停用*/


/******************************************
*
*  JSON版本 WebServcie處理區
*  功能: 以JSON為介面，呼叫公文系統WebService，取代原有jf_CallW()、jf_CallWS()、jf_CallWA()
*
******************************************/

var service = new Server();

function Server(){

	var WSDL = new Array();
	var _nextId = 0;	//1050706	Leslie	id應統一發配，以避免程式中使用多組不同WebServcie時造成id重覆判斷
	function objWSDL(url,wsdl){
		var _url = url;
		var _oXml = wsdl;
		//var _nextId = 0;	//1050706	Leslie	id應統一發配，以避免程式中使用多組不同WebServcie時造成id重覆判斷
		var _oPara = new Object();
		
		this.url = function(){return _url;};
		this.oXml = function(){return _oXml;};
		
		function _getFuncPara(funcName){
			//配合FileFox，修改查詢XML的行為
			//var child = _oXml.getElementsByName(funcName);			
			var xmlDoc = $.parseXML(new XMLSerializer().serializeToString(_oXml.documentElement))
			var child = $(xmlDoc).find("element[name='"+funcName+"']");
			var rtnArray = new Array();
			if(child.length > 0)
			{
				$ch = $(child[0]);
				$($ch.children()[0]).find("element").each(function(){
				rtnArray[rtnArray.length] = this.attributes["name"].value;
				})
			}
			else
			{
				child = $(xmlDoc).find("s\\:element[name='"+funcName+"']");
				$ch = $(child[0])
				$($ch.children()[0]).find("s\\:element").each(function(){
				rtnArray[rtnArray.length] = this.attributes["name"].value;
				})
			}	
			
			return rtnArray;
		}
		
		function _getJSONfromPara(funcName,Para){
			var rtnObj = new Object();
			//1050413	Leslie	修正因為WebMethod參數數量與傳入的不同，而造成的呼叫錯誤(對不到的參數，自動傳入null)
			// for(var iPara = 0;iPara < Para.length;iPara++){
				// rtnObj[_oPara[funcName][iPara]] = Para[iPara];
			// }
			var arParaName = _oPara[funcName];
			for(var iPara = 0;iPara < arParaName.length;iPara++){
				rtnObj[_oPara[funcName][iPara]] = (Para[iPara] != undefined)?Para[iPara]:null;
			}
			return JSON.stringify(rtnObj);
		}

		this.callService =function (funcName,Para,async){
			if(_oPara[funcName] == null){
				//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
				//_oPara[funcName] = _getFuncPara(funcName);
				_oPara[funcName] = _oXml.Paremeters;
			}
			
			var result = new Object();
			_nextId++;
			
			$.ajax({
                    type: "POST",
                    url: _url+"/"+funcName,
                    contentType: "application/json; charset=utf-8",
                    async: async,
                    cache: false,
                    dataType: 'json',
                    data: _getJSONfromPara(funcName,Para),
                    success: function (data) {
                        if (data.hasOwnProperty("d")) {
                            //$("#txValue").val($("#txValue").val() + data.d);
							result.value = data.d;
							result.id = _nextId;
                        }
                        else {
                            //$("#txValue").val($("#txValue").val() + data);
							result.value = data;
							result.id = _nextId;
                        }
						result.error = false;
						
						if(async)
							OnWSResult(result);
                    },
					error: function(err)
					{
						err.error = true;
						err.errorDetail = new Object();
						err.errorDetail.string = err.statusText;
						err.errorDetail.raw = err;
						result = err;
					}
                });
			if(async){
				return _nextId;
			}
			else
				return result;
		}
	}
	
	function ensureWsdlUrl(szService){
		//增加代換為目前同一DomainName的URL
		if (szService.indexOf("://") > 0){
			var pageDomain = document.location.origin;
			if(szService.indexOf(pageDomain) == -1){
				var si = szService.indexOf("/",szService.indexOf("://")+3);
				return pageDomain + szService.substr(si);
			}
			return szService;
		}
		var baseUrl = document.URL;
		var qi = baseUrl.lastIndexOf("?");
		var url2 = qi > 0 ? baseUrl.substr(0, qi) : baseUrl;
		//1021017 David	 1020803 修正叫用WS時，如WS路徑由網址取得，須排除網址參數中有「/」之問題
		/*return  url2.substr(0, baseUrl.lastIndexOf("/"))
		+ "/" + szService + (szService.indexOf(".")>=0 ? "" : ".asmx?wsdl");*/
		//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL，一律拿掉WSDL
		// return  url2.substr(0, url2.lastIndexOf("/"))//url2為已排除網址參數的網址
		// + "/" + szService + (szService.indexOf(".")>=0 ? "" : ".asmx?wsdl");
		return  url2.substr(0, url2.lastIndexOf("/"))+ "/" + szService + (szService.indexOf(".")>=0 ? "" : ".asmx");
	}
	
	//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
	// this.useService = function (argService,UserName){
	this.useService = function (argService,UserName, argFunName){
		if(argService == null || argService.length == 0){
			throw("Invalid arguments");
			return;
		}	
		
		var url = ensureWsdlUrl(argService);
		//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
		var key = url + "/" + argFunName;
		//if(WSDL[url] == null || WSDL[url] == undefined)
		if(WSDL[key] == null || WSDL[key] == undefined)
		{
			//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
			/*var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("GET", url + "?WSDL", false);
			//1090929 Kevin 1090729 弱掃修正Client Reflected File Download
			xmlHttp.setRequestHeader('Content-disposition', 'attachment; filename=WSDL.xml');
			xmlHttp.send();
			WSDL[url] = new objWSDL(url,xmlHttp.responseXML);*/
			var MethodInfo = WebMethodInfo(url,argFunName);
			WSDL[key] = new objWSDL(url,MethodInfo);
		}
		//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
		//this[UserName] = WSDL[url];
		this[UserName] = WSDL[key];
	}
	
	//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
	function WebMethodInfo(url, method)
	{
		// get WebMethodInfo
		var params = new SOAPClientParameters(), res;
		var key = url +"/"+ method;
		params.add('MethodName', method);
		SOAPClient.invokeJSON(url, "GetWebMethodInfo", params, false, function(r) {
			if(r.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
				var err = {m_bSuccess:false};
				if(!!r.errorDetail) {
					err.m_ErrCode = r.errorDetail;
					err.m_strErrMsg = r.errorDetail.string;
					if(!!r.errorDetail.raw && !!r.errorDetail.raw.responseJSON && !!r.errorDetail.raw.responseJSON.Message) {
						err.m_ErrCode = r.errorDetail.raw.responseJSON.ExceptionType;
						err.m_strErrMsg = r.errorDetail.raw.responseJSON.Message + '\r\n' + r.errorDetail.raw.responseJSON.StackTrace;
					}
				}
				else {	// 無errorDetail?
					err.m_ErrCode = r;
					err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
				}
				return err;
			}
			else if(typeof r.value !== "string") {
				theLogger.error("Error! GetWebMethodInfo(" + key + ")回傳值非字串");
				var err = {m_bSuccess:false, m_ErrCode:-999, m_strErrMsg: "Error! GetWebMethodInfo(" + key + ")回傳值非字串"};
				return err;
			}
			else if(r.value.length == 0) {
				theLogger.error("Error! GetWebMethodInfo(" + key + ")回傳空字串");
				var err = {m_bSuccess:false, m_ErrCode:-998, m_strErrMsg: "Error! GetWebMethodInfo(" + key + ")回傳空字串"};
				return err;
			}
			else
				res = JSON.parse(r.value);
		});
		return res;
	}
}

function jf_CallW(argService, argFunName, argAsync, argParam)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argService = argService.replace(/http:/ig, 'https:');
	
	//1091117	Leslie[1080943]	改用WebMethodInfo取代WSDL
	//service.useService(argService,"Serv");
	service.useService(argService,"Serv",argFunName);
	return service.Serv.callService(argFunName,argParam,argAsync);
}

function jf_CallWS(argService, argFunName, argAsync, argParam)
{
	var arPara = new Array();
	arPara[0] = jf_GetArtifact();
	if( Object.prototype.toString.call( argParam ) === '[object Array]' )
		arPara = arPara.concat(argParam);
	else
		arPara.push(argParam);
		
	return jf_CallW(argService, argFunName, argAsync, arPara);
}

function jf_CallWA(argService, argFunName, argAsync, argParam)
{
	return jf_CallWS(argService, argFunName, argAsync, arPara);
}