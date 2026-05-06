/*
DATE	SA		PRG		MGR_NO		DESC
1031028	Kevin	Kevin	1030836		新增支援SSL
*/

/************************************************************************   
 #-------------------------------------------------------- Window
 jf_OpenWindow			開啟新視窗
 jf_CloseWindow		關閉主程式之視窗
 jf_BlockContextMenu()	阻擋使用者按下滑屬右鍵來popup menu選單
 jf_ConvertEnterToTab()	將Enter鍵轉成Tab鍵,讓使用者可以Enter轉換focus 
 jf_OpenChildWin        開啟子視窗
 jf_ShowModal			以ShowModal型式開啟子視窗
 
 #-------------------------------------------------------- Date
 jf_CallCal        		開啟小日曆
 jf_CallCalendar		開啟小月曆
 jf_ChkDateFmt     		檢查西元｜民國日期是否正確
 jf_CheckCDATE			檢查輸入之民國日期字串是否正確
 
 #-------------------------------------------------------- String
 jf_StrValidate		檢查字串是否於合法範圍內
 jf_IsNum          		檢查字串是否為數字格式（含負數）
 jf_PADCHAR				若是物件值不為空字串時,將字串左邊補足特定字元
 jf_PADL           		指定字元補足字串的左邊
 jf_PADR           		指定字元補足字串的右邊
 jf_Trim           		去除字串首尾的空白
 jf_UPPERCASE			輸入值轉成大寫
 FormatStr			字串內容設定
 
 #-------------------------------------------------------- Cookie
 jf_ReadCookie     		讀取cookie變數
 jf_SaveCookie     		儲存cookie變數
 jf_SaveCookieWithExpire	儲存cookie變數,將來會support Timeout時間

 #-------------------------------------------------------- CheckBox Select
 jf_SelectItem         	處理選取的checkbox
 jf_ClearAllItem       	不選全部的checkbox，並回存cookie
 jf_SelectAllItem      	選取全部的checkbox，並回存cookie
 jf_ClearPageItem      	不選本頁的checkbox，並回存cookie
 jf_SelectPageItem     	選取本頁的checkbox，並回存cookie
 jf_SelectReverseItem  	反向選取  checkbox，並回存cookie
 jf_SelectRangeItem    	處理選擇範圍內的checkbox，並回存cookie
 jf_CallSel            	開啟選取提示子視窗

 #-------------------------------------------------------- Obj
 jf_InpNumOnly     		只允許動作物件輸入數字（僅對IE有效）
 jf_SelDDMenu      		根據傳入值選取DropDownMenu值
 jf_CancelEnterKey		鎖住Enter鍵

 #-------------------------------------------------------- Change Page/Rec
 jf_ChangePage     		切換至 summary 的新頁面
 jf_ChangeRec      		切換至 detail  的新頁面
 
 #-------------------------------------------------------- Client
 jf_ShowWaitState		Server端處理時，改變Client端顯示狀態，讓使用者知道程式正在處理中

 #-------------------------------------------------------- alert
 jf_ShowMeg				顯示訊息

 #-------------------------------------------------------- DataGrid
 jf_Assemble			組出DataGrid內物件的ClientID
 
 #-------------------------------------------------------- Client javascript control
 jf_BlockBackKey		取消client端按下"<-"回上頁功能
  
 #-------------------------------------------------------- Template 選擇檔案格式功能:PDF or WORD
 jf_OpenMenu			Pop-up選擇視窗
 jf_CloseMenu			close選擇視窗
**********************************************************************************************/


/**********************************************************************************************
  Name : function jf_OpenWindow(argUrl, argWinName, argOption)
  Desc : 開啟新視窗
  Parm : argUrl     : string 欲開啟網頁之url
    	 argWinName : string 欲開啟新視窗之視窗名稱 # 建議使用主程式+子視窗之程式代號，以避免WindowName重覆
    	 argOption  : string 新視窗之屬性，如fullscreen=no,Height=123,width=123等
  Rtn  : int 回傳新視窗Handle
 **********************************************************************************************/	
function jf_OpenWindow(argUrl, argWinName, argOption)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argUrl = argUrl.replace(/http:/ig, 'https:');
	
	gWindowID = open(argUrl, argWinName, argOption);
	gWindowID.focus();
	return gWindowID;
}

/**********************************************************************************************
  Name : function jf_CloseWindow(argConfirm)
  Desc : 關閉主程式之視窗
  Parm : argConfirm	: string 關閉視窗前是否需詢問 # 0:否 / 1:是
		 argChildWinHandle : array of 子視窗物件
  Rtn  : none
 **********************************************************************************************/	
function jf_CloseWindow(argConfirm, argChildWinHandle)
{
	if (argConfirm == "1")
		ret = window.confirm("確定要離開本程式嗎？");
	else
		ret = true;
		
	if (ret) 
	{
		for (i=0; i < argChildWinHandle.length ; i++) //關閉主程式所屬之子視窗
  		{ 
  			if (argChildWinHandle[i] && argChildWinHandle[i].open && !argChildWinHandle[i].closed)
  				argChildWinHandle.close();
		}
  		window.close();
	}
}

/**********************************************************************************************
  Name : function jf_OpenChildWin(argUrl, argWinName, argWidth, argHeight)
  Desc : 開啟子視窗
  Parm : argUrl     : string 欲開啟網頁之url
    	    argWinName : string 欲開啟新視窗之視窗名稱 #建議使用主程式+子視窗之程式代號，以避免WindowName重覆
    	    argWidth   : int    子視窗之寬度
    	    argHigth   : int    子視窗之高度
  Rtn  : int 回傳新視窗Handle
 **********************************************************************************************/	
function jf_OpenChildWin(argUrl, argWinName, argWidth, argHeight)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argUrl = argUrl.replace(/http:/ig, 'https:');
	
	var strWinStyle, strTop, strLeft;
	strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";
	if ( (argWidth != "") || (argWidth != "0") )
	{
	   strWinStyle = strWinStyle + ",width="+argWidth;		
	   strLeft = (screen.width-argWidth)/2;
	   strWinStyle = strWinStyle + ", left="+strLeft;
	}
	if ( (argHeight != "") || (argHeight != "0") )
	{
	   strWinStyle = strWinStyle + ",height="+argHeight;		
	   strTop = (screen.height-argHeight)/2-10;
	   strWinStyle = strWinStyle + ", top="+strTop;
   }
	gWindowID = window.open(argUrl, argWinName, strWinStyle);
	gWindowID.focus();

	return gWindowID;
}


/**********************************************************************************************
  Name : function jf_ShowModal(argUrl, argWidth, argHeight)
  Desc : 以ShowModal型式開啟子視窗
  Parm :	argUrl		: string 欲開啟網頁之url
    	    argWidth	: int    子視窗之寬度
    	    argHeight	: int    子視窗之高度
  Rtn  : int 回傳新視窗Handle
 **********************************************************************************************/	
function jf_ShowModal(argUrl, argWidth, argHeight)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argUrl = argUrl.replace(/http:/ig, 'https:');
	
	var sFeatures="dialogWidth: "+ argWidth + "px;dialogHeight:"+ argHeight+"px";
	var ret = window.showModalDialog(argUrl, "", sFeatures);
	return ret;
}


function jf_ConvertEnterToTab()
{
	if(document.activeElement.type=='submit')
	   return;
	   
	if(event.keyCode==13)
	   event.keyCode=9;
}


/**********************************************************************************************
  Name : function jf_Trim(argStr)
  Desc : 去除字串首尾的空白
  Parm : argStr  : string 原始字串值
  Rtn  : string 回傳去除字串首尾空白後之字串
 **********************************************************************************************/	
function jf_Trim(argStr)
{ 
	var StrLen    = argStr.length;
	var trimStr   = "";
	var returnStr = "";

	for (i = 0; i < StrLen ; i++) 
	{ 
		argStr.substring(i,i+1);
		trimStr = argStr.substring(i,i+1);
		if ((trimStr == " ") && (i != StrLen )) { trimStr = ""; }
		returnStr = returnStr + trimStr;
	}
	return  returnStr;
}

/**********************************************************************************************
  Name : function jf_PADCHAR(argObj,argLength,argFillStr)
  Desc : 若是物件值不為空字串時,將字串左邊補足特定字元
  Parm : argObj     : obj    作用的物件
  		 argLength  : int    補足後字串總長度
  		 argFillStr : string 待補足字串
  Rtn  : string 回傳補足後字串
 **********************************************************************************************/	
function jf_PADCHAR(argObj,argLength,argFillStr)
{
	if(argObj.value!="")
	{
		argObj.value = jf_PADL(argObj.value,argLength,argFillStr);
	}
}

/**********************************************************************************************
  Name : function jf_PADL(argString,argLength,argFillStr)
  Desc : 將字串左邊補足特定字元
  Parm : argString  : string 原始字串值
  		 argLength  : int    補足後字串總長度
  		 argFillStr : string 待補足字串
  Rtn  : string 回傳補足後字串
 **********************************************************************************************/	
function jf_PADL(argString, argLength, argFillStr)
{
	//1140804	Leslie[1141011]	修正弱掃[Unchecked Input For Loop Condition]
	return argString.padStart(argLength, argFillStr);
	/*var pi_length;
	pi_length = argString.length; 
	if(pi_length < argLength )
	{
		return jf_PADL(argFillStr+argString, argLength, argFillStr);
	}
	return argString;*/
}	

/**********************************************************************************************
  Name : function jf_PADR(argString, argLength, argFillStr)
  Desc : 將字串右邊補足特定字元
  Parm : argString  : string 原始字串值
    	 argLength  : int    補足後字串總長度
    	 argFillStr : string 待補足字串
  Rtn  : string 回傳補足後字串
 **********************************************************************************************/	
function jf_PADR(argString, argLength, argFillStr)
{
	//1140804	Leslie[1141011]	修正弱掃[Unchecked Input For Loop Condition]
	return argString.padEnd(argLength, argFillStr);
	/*var trimStr     = jf_Trim(argString);
	var bSrcLength  = trimStr.length;
	var RightStrLen = argLength - bSrcLength;
	var RightStr    = "";

	for (var i = 0; i < RightStrLen; i++) 
	{ 
		RightStr = RightStr + argFillStr;
	}
	return trimStr + RightStr;*/
}

/**********************************************************************************************
  Name : function jf_UPPERCASE() 
  Desc : 輸入值轉成大寫
  Parm : none
  Rtn  : none
 **********************************************************************************************/
function jf_UPPERCASE() 
{
//A~Z keyCode 65~90 小寫為97~122
//0~9 keyCode 48~57
//<- keyCode 8 
//TAB keyCode 9
//enter keyCode 13
//Del keyCode 46 
	if (window.event.keyCode >= 97 && window.event.keyCode <= 122 )
	{
		window.event.keyCode=window.event.keyCode-32;
	}
}

/**********************************************************************************************
 Name : function jf_CallCal(argYr, argMn, argDy, argLang, argYrTp)
 Desc : 開啟小日曆 (位於lib/cal.htm)
 Param: argYr : string 年度
        argMn : string 月
        argDy : string 日期
        argLang : 中/英顯示 # CH / EN
        argYrTp : 民國/西元年 # CHY / ENY
 Rtn  : none
 **********************************************************************************************/
function jf_CallCal(argYr, argMn, argDy, argLang, argYrTp)
{
    screen_height = window.screen.height;
    screen_width  = window.screen.width;
    subwin_height = 240;
    subwin_width  = 300;
    subwin_top    = (screen_height - subwin_height) / 2;
    subwin_left   = (screen_width  - subwin_width ) / 2;

    //  ARGUMENTS //
    pYrObj  = argYr;
    pMnObj  = argMn;
    pDyObj  = argDy;
    pLang   = argLang.toUpperCase();
    pYrTp   = argYrTp.toUpperCase();

    pYr     = argYr.value;
    pMn     = argMn.value;
    pDy     = argDy.value;

    if (jf_Trim(pYr) != '') { if (jf_IsNum(pYr)) { pYr = parseInt(pYr); } }
    if (jf_Trim(pMn) != '') { if (jf_IsNum(pMn)) { pMn = parseInt(pMn); } }
    if (jf_Trim(pDy) != '') { if (jf_IsNum(pDy)) { pDy = parseInt(pDy); } }

    if (pYrTp == "ENY") { subwin_width  = 250; }

    //  OPTIONS //
    pDir    = "directories=no";
    pLcn    = "location=no";
    pMenu   = "menubar=no";
    pStatus = "status=no";
    pTool   = "toolbar=no";
    pScroll = "scrollbars=no";
    pResize = "resizable=no";
    pHeight = "height=" + subwin_height;
    pWidth  = "width=" + subwin_width;
    pTop    = "top=" + subwin_top;
    pLeft   = "left=" + subwin_left;
    
    pUrl    = "lib/cal.htm";
    pOption = pDir+','+pHeight+','+pLcn+','+pMenu+','+pStatus+','+pTool+','+pScroll+','+pResize+','+pWidth+','+pTop+','+pLeft;

    jf_OpenWindow(pUrl,"calWin",pOption);
}

/**********************************************************************************************
 Name : function jf_CallCalendar(argShowObj, argX, argY)
 Desc : 顯示小月曆，並將選取的日期顯示在argShowObj上
 Param: argShowObj	: text element object
        argX		: string X軸位置
        argY		: string Y軸位置
 Rtn  : 
***********************************************************************************************/
function jf_CallCalendar(argShowObj, argX, argY)
{
	var sPath = "Template/Lib/calendar.htm";
	strFeatures = "dialogWidth=337px;dialogHeight=330px;center=yes;help=no;status=no;dialogLeft=" + argX + ";dialogTop=" + argY;
	var st = argShowObj.value;
	var sDate = "";
	sDate = showModalDialog(sPath, st, strFeatures);

	if( typeof(sDate) == "undefined" )
		sDate = "";

	st = formatDate(sDate, 0);

	if(st != "")
		argShowObj.value = st;
}
//格式轉換：11/02/2003 --> 0921102
function formatDate(sDate)
{
	if(sDate=="")	return "";
	var arrayDate = sDate.split("/");
	var Dday = arrayDate[0];
	var Dmon = arrayDate[1];
	var Dyea = (parseInt(arrayDate[2]) - 1911) + "";

	if( Dyea.length == 2 )
		Dyea = "0" + Dyea;
	else if( Dyea.length == 1 )
		Dyea = "00" + Dyea;
	
	if( Dmon.length == 1 )
		Dmon = "0" + Dmon;
	if( Dday.length == 1 )
		Dday = "0" + Dday;
	return Dyea + Dmon + Dday;	
}


/**********************************************************************************************
 Name : function jf_ChkDateFmt(argYr, argMn, argDy, argCanNull, argYrTp, argFull)
 Desc : 檢查日期格式是否正確
 Param: argYr : string 年度
        argMn : string 月
        argDy : string 日期
        argCanNull : string 是否可空白 #0:NO / 1:YES
        argYrTp : string 西元/民國 # ENY / CHY
        argFull : string 是否補滿0 # 0:NO / 1:YES        
 Rtn  : Boolean
 **********************************************************************************************/
function jf_ChkDateFmt(argYr, argMn, argDy, argCanNull, argYrTp, argFull)
{
    var argTmp;

    pYr = jf_Trim(argYr.value);
    pMn = jf_Trim(argMn.value);
    pDy = jf_Trim(argDy.value);
    argYrTp = argYrTp.toUpperCase();

    // ***************** Check Is Nullable ?
    if (argCanNull == 0)
    {
        if (pYr.length == 0) 
        { 
            alert("請輸入年！");
            argYr.focus();
            return false;
        }
        if (pMn.length == 0) 
        {
            alert("請輸入月！");
            argMn.focus();
            return false;
        }
        if (pDy.length == 0)
        {
            alert("請輸入日期！");
            argDy.focus();
            return false;
        }
    }

    // ***************** Check Is DD or YYDD or MMDD Format
    if (pDy.length != 0) 
    {
        if (pYr.length == 0)
        { 
            alert("請輸入年！");
            argYr.focus();
            return false;
        }
        if (pMn.length == 0)
        {
            alert("請輸入月！");
            argMn.focus();
            return false;
        }
    }

    if (pMn.length != 0)
    {
        if (pYr.length == 0)
        {
            alert("請輸入年！");
            argYr.focus();
            return false;
        }
    }
    // ***************** Check Date Value -- YR
    if (pYr.length != 0)
    {
        argTmp = jf_IsNum(parseFloat(pYr));
        if (! jf_IsNum(pYr))
        { 
            alert("年格式錯誤！");
            argYr.focus();
            return false;
        }
        else
        {
            if (parseFloat(pYr) < 1)
            {
                alert("年格式錯誤！");
                argYr.focus();
                return false;
            }
            if (argYrTp == "CHY") { pYr = parseFloat(pYr) + 1911; }
        }
    }

    // ***************** Check Date Value -- MN
    if (pMn.length != 0)
    {
        if (! jf_IsNum(pMn))
        {
            alert("月格式錯誤！");
            argMn.focus();
            return false;
        }
        else
        {
            if ( (parseFloat(pMn) > 12) || (parseFloat(pMn) < 1) )
            {
                alert("月格式錯誤！");
                argMn.focus();
                return false;
            }
        }
    }

    // ***************** Check Date Value -- DY
    if (pDy.length != 0)
    {
        if (! jf_IsNum(pDy))
        {
            alert("日期格式錯誤！");
            argDy.focus();
            return false;
        }
        else
        {
            if (parseFloat(pDy) < 1)
            {
                alert("日期格式錯誤！");
                argDy.focus();
                return false;
            }

            // February
            if (parseFloat(pMn) == 2)
            {
                if ( (parseFloat(pYr) % 400 == 0) ||
                     ( (parseFloat(pYr) % 4 == 0) && (parseFloat(pYr) % 100 != 0) ) )
                {
                    if (parseFloat(pDy) > 29)
                    {
                        alert("日期格式錯誤！");
                        argDy.focus();
                        return false;
                    }
                }
                else
                {
                    if (parseFloat(pDy) > 28)
                    {
                        alert("日期格式錯誤！");
                        argDy.focus();
                        return false;
                    }
                }
            }
            // January March May July August October December
            else if ( (parseFloat(pMn) == 1) || (parseFloat(pMn) == 3)  ||
                      (parseFloat(pMn) == 5) || (parseFloat(pMn) == 7)  ||
                      (parseFloat(pMn) == 8) || (parseFloat(pMn) == 10) ||
                      (parseFloat(pMn) == 12) )
            {
                if (parseFloat(pDy) > 31)
                {
                    alert("日期格式錯誤！");
                    argDy.focus();
                    return false;
                }
            }
            // April June September November
            else
            {
                if (parseFloat(pDy) > 30)
                { 
                    alert("日期格式錯誤！");
                    argDy.focus();
                    return false;
                }
            }
        }
    }

    if (argFull == 1)
    {
        if (pYr.length != 0)
        {
            if (argYrTp == "ENY") { argYr.value = jf_PADL(argYr.value, 4, "0"); }
            else if (argYrTp == "CHY") { argYr.value = jf_PADL(argYr.value, 3, "0"); }
        }
        if (pMn.length != 0) { argMn.value = jf_PADL(pMn, 2, "0"); }
        if (pDy.length != 0) { argDy.value = jf_PADL(pDy, 2, "0"); }
    }
    
    return true;
}

/**********************************************************************************************
 Name : function jf_StrValidate(argStr, argRange)
 Desc : 檢查字串是否於合法範圍內
 Param: argStr   : string 待檢查字串
		argRange : string 合法範圍 # 如:1~5 or 1,3~6
 Rtn  : Boolean
 **********************************************************************************************/
function jf_StrValidate(argStr, argRange)
{
	return false;
}

/**********************************************************************************************
 Name : function jf_IsNum(argStr)
 Desc : 檢查字串是否為數字格式（含負數）
 Param: argStr : string 待檢查字串
 Rtn  : Boolean
 **********************************************************************************************/
function jf_IsNum(argStr)
{
	var pTmpChar  = "";

	for (pIdx = 0; pIdx < argStr.length; pIdx++)
	{
		pTmpChar = argStr.substring(pIdx, pIdx+1);

		if (pIdx == 0) { if (pTmpChar == "-") { continue; } }

		if ( (pTmpChar != "0") && (pTmpChar != "1") && (pTmpChar != "2") && (pTmpChar != "3") &&
			 (pTmpChar != "4") && (pTmpChar != "5") && (pTmpChar != "6") && (pTmpChar != "7") &&
             (pTmpChar != "8") && (pTmpChar != "9") )
		{ return false; }
	}
	return true;
}

/**********************************************************************************************
 Name : function jf_ReadCookie(argCookieName)
 Desc : 讀取cookie變數
 Param: argCookieName : string Cookie名稱
 Rtn  : string 特定Cookie值
 **********************************************************************************************/
function jf_ReadCookie(argCookieName)
{
	var namex = argCookieName + "=";

	if (document.cookie.length == 0) { return null; }
	nameat = document.cookie.indexOf(namex);
	if (nameat == -1) { return null; } // 找不到 name 時
	ValueAt = nameat + namex.length;
	endPos = document.cookie.indexOf(";", ValueAt);
	if (endPos == -1) { return document.cookie.substring(ValueAt); }
	else { return document.cookie.substring(ValueAt, endPos); }
}

/**********************************************************************************************
 Name : function jf_SaveCookie(argCookieName, argValue)
 Desc : 儲存cookie變數
 Param: argCookieName : string Cookie名稱
        argValue : string 欲儲存之值
 Rtn  : none
 **********************************************************************************************/
function jf_SaveCookie(argCookieName, argValue)
{
	document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
}

/**********************************************************************************************
 Name : function jf_SaveCookieWithExpire(argCookieName, argValue)
 Desc : 儲存cookie變數
 Param: argCookieName : string Cookie名稱
        argValue : string 欲儲存之值
 Rtn  : none
 **********************************************************************************************/
function jf_SaveCookieWithExpire(argCookieName, argValue)
{
	jf_SaveCookie(argCookieName,argValue);
}


/**********************************************************************************************
 Name : function jf_SelectItem(argCookieName)
 Desc : 處理選取checkbox，並回存至cookie
 Param: argCookieName : string Cookie名稱
 Rtn  : none
 **********************************************************************************************/
function jf_SelectItem(argCookieName)
{
	var xObjectName = document.activeElement.id;	
	var xobjname = xObjectName.substring(xObjectName.indexOf("cbSELECT"),xObjectName.length);
	var pNo = xObjectName.substring(13,xObjectName.indexOf("_cbSELECT"));	
	
	pStr  = jf_ReadCookie(argCookieName);
	pStr1 = "";
	pStr2 = "";
	pType = 0;
    
	var pi_index = Number(document.all["dgDETAIL_ctrl"+pNo+"_hlSEQ_NO"].innerText);
    
	if (document.activeElement.checked) { pType = "1"; }
	else { pType = "0"; }

	if (pi_index == 1) { pStr1 = ""; }
	else { pStr1 = pStr.substring(0,pi_index-1); }
	pStr2 = pStr.substring(pi_index,pStr.length);

	pStr = pStr1 + pType + pStr2;
	jf_SaveCookie(argCookieName, pStr);
}

/**********************************************************************************************
 Name : function jf_ClearPageItem(argCookieName, argPageBeg, argPageSize, argSender)
 Desc : 不選本頁的checkbox，並回存cookie
 Param: argCookieName : string Cookie名稱
        argPageBeg :
        argPagesize :
        argSender : checkbox物件名
 Rtn  : none
 **********************************************************************************************/
function jf_ClearPageItem(argCookieName, argPageBeg, argPageSize, argSender)
{
    pStr  = jf_ReadCookie(argCookieName);
    pStr1 = "";
    pStr2 = "";
    pType = jf_PADR("", argPagesize, "0");
    pIdx  = 0;

    if (argPageBeg == 1) { pStr1 = ""; }
    else { pStr1 = pStr.substring(0,argPageBeg-1); }
    pStr2 = pStr.substring(argPageBeg+9,pStr.length);

    pStr = pStr1 + pType + pStr2;
    jf_SaveCookie(argCookieName,pStr);

    if (argSender.length > 1)
    {   
        while (pIdx < argSender.length)
        {
            argSender[pIdx].checked = false;
            pIdx++;
        }
    }
    else { argSender.checked = false; }
}

/**********************************************************************************************
 Name : function jf_SelectPageItem(argCookieName, argPageBeg, argPageSize, argSender)
 Desc : 選取本頁的checkbox，並回存cookie
 Param: argCookieName : string Cookie名稱
        argPageBeg :
        argPagesize :
        argSender : checkbox物件名
 Rtn  : none
 **********************************************************************************************/
function jf_SelectPageItem(argCookieName, argPageBeg, argPageSize, argSender)
{
    pStr  = jf_ReadCookie(argCookieName);
    pStr1 = "";
    pStr2 = "";
    pType = jf_PADR("", argPageSize, "1");
    pIdx  = 0;

    if (argPageBeg == 1) { pStr1 = ""; }
    else { pStr1 = pStr.substring(0,argPageBeg-1); }
    pStr2 = pStr.substring(argPageBeg+9,pStr.length);

    pStr = pStr1 + pType + pStr2;
    jf_SaveCookie(argCookieName, pStr);

    if (argSender.length > 1)
    {   
        while (pIdx < argSender.length)
        {
            argSender[pIdx].checked = true;
            pIdx++;
        }
    }
    else { argSender.checked = true; }    
}

/**********************************************************************************************
 Name : function jf_ClearAllItem(argCookieName, argSender)
 Desc : 不選全部的checkbox，並回存cookie
 Param: argCookieName : string Cookie名稱
        argSender : checkbox物件名
 Rtn  : none
 **********************************************************************************************/
function jf_ClearAllItem(argCookieName, argSender)
{
    pIdx = 0;
    pStr = jf_ReadCookie(argCookieName);
    if (pStr != null)    
	jf_SaveCookie(argCookieName, jf_PADR("", pStr.length, "0"));
    //jf_SaveCookie(argCookieName,jf_PADR('',1000,'0'))
}

/**********************************************************************************************
 Name : function jf_SelectAllItem(argCookieName, argIndex)
 Desc : 選取全部的checkbox，並回存cookie
 Param: argCookieName : string Cookie名稱
        argIndex : 
 Rtn  : none
 **********************************************************************************************/
function jf_SelectAllItem(argCookieName, argIndex)
{
    pIdx = 0;
    pStr = jf_ReadCookie(argCookieName);
    
    if (pStr != null)    
	jf_SaveCookie(argCookieName, jf_PADR("", pStr.length, "1"));
   // jf_SaveCookie(argCookieName,jf_PADR('',1000,'1'))
    
    var pi_PageSize=Number(document.all["_PageSize"].value);
    var pi_RecCnt=Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {   
        while (pIdx < pi_PageSize)
        {
//		alert("dgDETAIL_ctrl"+(argIndex+pIdx)+"_cbSELECT");
		pi_SEQ=Number(document.all["dgDETAIL_ctrl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);
		document.all["dgDETAIL_ctrl"+(argIndex+pIdx)+"_cbSELECT"].checked = true;
		if (pi_SEQ >=pi_RecCnt){pIdx=pi_PageSize+1;}
         	else{pIdx++;}
        }
    }
    else 
    { 
	document.all["dgDETAIL_ctrl"+argIndex+"_cbSELECT"].checked = true;        
    }    
}

/**********************************************************************************************
 Name : function jf_SelectReverseItem(argCookieName, argIndex)
 Desc : 反向選取checkbox，並回存cookie
 Param: argCookieName : string Cookie名稱
        argIndex : 
 Rtn  : none
 **********************************************************************************************/
function jf_SelectReverseItem(argCookieName, argIndex)
{
    pStr = jf_ReadCookie(argCookieName);
    pRtn = "";
    pIdx = 0
    
    while (pIdx < pStr.length)
    {
        if (pStr.substring(pIdx,pIdx+1) == "0") { pRtn = pRtn + "1"; }
        else if (pStr.substring(pIdx,pIdx+1) == "1") { pRtn = pRtn + "0"; }
        pIdx ++;
    }
    jf_SaveCookie(argCookieName,pRtn);

    pIdx = 0;
    var pi_PageSize=Number(document.all["_PageSize"].value);
    var pi_RecCnt=Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {   
        while (pIdx < pi_PageSize)
        {							
		pi_SEQ=Number(document.all["dgDETAIL_ctrl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);
		document.all["dgDETAIL_ctrl"+(argIndex+pIdx)+"_cbSELECT"].checked = ! document.all["dgDETAIL_ctrl"+(argIndex+pIdx)+"_cbSELECT"].checked;
			
		if (pi_SEQ >=pi_RecCnt){pIdx=pi_PageSize+1;}
            	else{pIdx++;}
        }
    }
    else 
    { 
	document.all["dgDETAIL_ctrl"+argIndex+"_cbSELECT"].checked = !document.all["dgDETAIL_ctrl"+argIndex+"_cbSELECT"].checked;
    }    
}

/**********************************************************************************************
 Name : function jf_SelectRangeItem(argCookieName, argIndex, argBegnum, argEndnum, argType)
 Desc : 處理選擇範圍內的checkbox，並回存cookie
 Param: argCookieName : string Cookie名稱
        argIndex : 
        argBegnum :
        argEndnum :
        argType :
 Rtn  : none
 **********************************************************************************************/
function jf_SelectRangeItem(argCookieName, argIndex, argBegnum, argEndnum, argType)
{
    argBegnum = parseInt(argBegnum);
    argEndnum = parseInt(argEndnum);

    var pStr  = jf_ReadCookie(argCookieName);
    var pStr1 = "";
    var pStr2 = "";
    var pType = jf_PADR("", argEndnum-argBegnum+1, argType);
    var pIdx  = 0;

    if (argBegnum == 1) { pStr1 = ""; }
    else { pStr1 = pStr.substring(0,argBegnum-1); }

    if (argEndnum == (pStr.length)) { pStr2 = ""; }
    else { pStr2 = pStr.substring(argEndnum,pStr.length); }

    pStr = pStr1 + pType + pStr2;
    jf_SaveCookie(argCookieName,pStr);
    
    pIdx = 0;
    var pi_PageSize=Number(document.all["_PageSize"].value);
    var pi_RecCnt=Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {   
        while (pIdx < pi_PageSize)
        {			
		pi_SEQ=Number(document.all["dgDETAIL_ctrl"+(Number(argIndex)+pIdx)+"_hlSEQ_NO"].innerText);
		if (argBegnum <= pi_SEQ && argEndnum >=pi_SEQ){			
			document.all["dgDETAIL_ctrl"+(Number(argIndex)+pIdx)+"_cbSELECT"].checked = argType == 1 ? true:false;
		}
		if (pi_SEQ >=pi_RecCnt){pIdx=pi_PageSize+1; }
		else{pIdx++;}
        }
    }
    else 
    { 
	document.all["dgDETAIL_ctrl"+argIndex+"_cbSELECT"].checked = argType == 1 ? true:false;
    }            
}

/**********************************************************************************************
 Name : function jf_CallSel(argCookieName, argRecCount, argIndex)
 Desc : 開啟選取提示子視窗
 Param: argCookieName : string Cookie名稱
        argRecCount : 
        argIndex :
 Rtn  : none
 **********************************************************************************************/
function jf_CallSel(argCookieName, argRecCount, argIndex)
{
    var screen_height = window.screen.height;
    var screen_width  = window.screen.width;
    var subwin_height = 160;
    var subwin_width  = 200;
    var subwin_top    = (screen_height - subwin_height) / 2;
    var subwin_left   = (screen_width  - subwin_width ) / 2;

    //  OPTIONS //
    var pDir      = "directories=no";
    var pLcn      = "location=no";
    var pMenu     = "menubar=no";
    var pStatus   = "status=no";
    var pTool     = "toolbar=no";
    var pScroll   = "scrollbars=no";
    var pResize   = "resizable=no";
    var pHeight   = "height=" + subwin_height;
    var pWidth    = "width=" + subwin_width;
    var pTop      = "top=" + subwin_top;
    var pLeft     = "left=" + subwin_left
    var pUrl    = "range.asp?gCookie_nm=" +argCookieName+ "&gRecCount=" + argRecCount+ "&gIndex=" + argIndex;
    var pOption = pDir + ',' + pHeight + ',' + pLcn + ',' + pMenu + ',' + pStatus + ',' 
                + pTool + ',' + pScroll + ',' + pResize+','+pWidth+','+pTop+','+pLeft;

    jf_OpenWindow(pUrl,"selWin",pOption);
}

/**********************************************************************************************
 Name : function jf_InpNumOnly()
 Desc : 只允許動作物件輸入數字（僅對IE有效）
 Param: none
 Rtn  : none
 **********************************************************************************************/
function jf_InpNumOnly()
{
   if ((event.keyCode < 48) || (event.keyCode > 57)) { event.returnValue = false }
}

/**********************************************************************************************
 Name : function jf_CancelEnterKey()
 Desc : 鎖住Enter鍵
 Param: none
 Rtn  : none
 **********************************************************************************************/
function jf_CancelEnterKey()
{
	if(event.keyCode == 13)
		event.keyCode = 0;
}

/**********************************************************************************************
 Name : function jf_SelDDMenu(argObj, argVal)
 Desc : 根據傳入值選取DropDownMenu值
 Param: argObj : 動作物件
        argVal : 比較值
 Rtn  : none
 **********************************************************************************************/
function jf_SelDDMenu(argObj, argVal)
{		
    var pIdx = 0; 
    for (pIdx = 0; pIdx < argObj.length; pIdx++)
    {    	  
        if (argObj.options[pIdx].value == argVal)
        {        		
            argObj.options.selectedIndex = pIdx;
            return;
        }
    }
}

/**********************************************************************************************
 Name : function jf_ChangePage(argPagePos, argPage, argForm)
 Desc : 切換至 summary 的新頁面
 Param: argPagePos : 欲移至的頁碼
        argPage : 頁碼Text/HIDDEN
        argForm : 上述物件隸屬的FORM
 Rtn  : none
 **********************************************************************************************/
function jf_ChangePage(argPagePos, argPage, argForm)
{
    argPage.value = argPagePos;
    argForm.submit();
}


function jf_ChangeRec(argPagePos, argRecPos, argPage, argRec, argForm)
{
    argPage.value = argPagePos;
    argRec.value  = argRecPos;
    argForm.submit();
}

/**********************************************************************************************
 Name : function jf_ShowWaitState()
 Desc : 當程式在後端處理時, 改變Client端顯示狀態, 讓使用者知道程式正在處理中.
		改變的顯示狀態如下:
		1.cursor改為漏斗狀
		2.textbox改為唯讀狀態
 Param: none
 Rtn  : none
 **********************************************************************************************/
function jf_ShowWaitState()
{
	if(Page_IsValid==true)
	{
		for(var i=0;i<document.all.length;i++)
		{		
			document.all[i].style.cursor = "wait";
		}
	
		for(var i=0;i<document.all.tags("input").length;i++)
		{
			if(document.all.tags("input")[i].type == "text")
				document.all.tags("input")[i].readOnly = true;
		}
		window.status = "處理中,請稍後!!";
	}
}

/**********************************************************************************************
 Name : function jf_ShowMeg(Context,HeadTest)
 Desc : 顯示訊息
 Param: Context : string 訊息內容
        HeadTest : string 訊息的標題
 Rtn  : none
 **********************************************************************************************/
function jf_ShowMeg(Context,HeadTest)
{
	if (HeadTest!="")
	{s = HeadTest + "\n";}
	else
	{s= ""}
    
    switch (document.all["ValidationSummary1"].displaymode) 
    {
           case "List":
                      s += Context + "\n";
                      break;
                                
           case "BulletList":
                      default: 
                      s += "  - " + Context + "\n";
                      break;
                                
           case "SingleParagraph":
					  s += Context + " ";
                      break;
    }
	alert(s);
}	

/**********************************************************************************************
 Name : function jf_Assemble(argObj,argObjID,assemblyID)
 Desc : 組出DataGrid內物件的ClientID
 Param: argObj : 動作物件
        argObjID : 動作物件的ID
        assemblyID : 需要組出DataGrid內ClientID的物件ID
 Rtn  : string 回傳DataGrid內ClientID
 **********************************************************************************************/
function jf_Assemble(argObj,argObjID,assemblyID)
{
	var dgRowID = argObj.substring(0,argObj.indexOf("_"+argObjID));
	var dgKeyID = dgRowID + "_" + assemblyID;
	return dgKeyID;	
}


/**********************************************************************************************
 Name : function jf_CheckCDATE(argStr)
 Desc : 檢查輸入之民國日期字串(七碼YYYMMDD)是否正確
 Param: argObj : 欲檢查之字串
 Rtn  : Boolean
 **********************************************************************************************/
function jf_CheckCDATE(argStr) 
{ // adapting for other layouts should be easy
 if (argStr.length < 7)
	{argStr = jf_PADL(argStr,7,'0');}
 var pYear,pMonth,pDay;
pYear=parseInt(argStr.substring(0,3),10)+1911;
pMonth=parseInt(argStr.substring(3,5),10);
pDay=parseInt(argStr.substring(5,7),10);

 if (!ValidDate(pYear, pMonth-1, pDay)) 
	{return false}
else {return true}
}

function ValidDate(y, m, d) // m = 0..11
 { with (new Date(y, m, d)) return ((getDate()==d) && (getMonth()==m)) }
 
/**********************************************************************************************
 Name : function jf_CheckEDATE(argStr)
 Desc : 檢查輸入之西曆日期字串(八碼YYYYMMDD)是否正確
 Param: argObj : 欲檢查之字串
 Rtn  : Boolean
 **********************************************************************************************/
function jf_CheckEDATE(argStr) 
{ // adapting for other layouts should be easy
 if (argStr.length < 8)
	{argStr = jf_PADL(argStr,8,'0');}
 var pYear,pMonth,pDay;
pYear=parseInt(argStr.substring(0,4));
pMonth=parseInt(argStr.substring(4,6),10);
pDay=parseInt(argStr.substring(6,8),10);

 if (!ValidDate(pYear, pMonth-1, pDay)) 
	{return false}
else {return true}
}
 

/******************************************
*
*  function jf_BlockBackKey()
*  功能: 取消client端按下"<-"回上頁功能
*
******************************************/
function jf_BlockBackKey()
{
	var code = event.keyCode
	
	if(code==8) // backspace
	   event.keyCode = -1;
}

/******************************************
*
*  function jf_BlockContextMenu()
*  功能: 取消client端,按下滑鼠右鍵清單功能
*
******************************************/
function jf_BlockContextMenu()
{
	//Cancel the context menu
	event.returnValue= false
}

/******************************************
*
*  function jf_OpenMenu()
*  功能: Pop-up選擇Format視窗
*
******************************************/
function jf_OpenMenu(menuId) 
{
  var el;
  el = document.getElementById(menuId);
  el.style.left = window.event.x+15;
  el.style.top  = window.event.y+5;
  el.style.display = "block";
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
 /**********************************************************************************************
 Name : function FormatStr(argFormat,argMsg)
 Desc : 字串內容設定
 Param: argFormat : 訊息格式
        argMsg  : 訊息字串        
 Rtn  : 訊息字串
 **********************************************************************************************/ 
function FormatStr(argFormat,argMsg)
{
	//參數格式檢查
	//1.如果字串內不含"{"則回傳argFormat
	if(argFormat.indexOf("{",0)==-1 )
		return argFormat;
	//2.如果argMsg之長度為0,則直接回傳argFormat
	if(argMsg.length==0)
		return argFormat;
	
	//字串轉換
	for(i=0;i<argMsg.length;i++)
	{
		argFormat=argFormat.replace("{"+i+"}",argMsg[i]);
	}
	return argFormat;
}
