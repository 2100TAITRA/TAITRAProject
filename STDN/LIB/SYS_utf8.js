/*
DATE	SA		PRG		MGR_NO		DESC
1031028	Kevin	Kevin	1030836		新增支援SSL
1050223	Leslie	Leslie	--			配合二代系統修改相關函式
1050308	Leslie						二代系統修改
1050823	Leslie	--		--			二代問題修改，增加子視窗最小限制
1080523 Leslie  --      1080380     [Merge 1070907]內政部資安檢測調整，配合Cookie的HttpOnly，修正Cookie使用方式
*/

/************************************************************************   
 #-------------------------------------------------------- Window
 jf_OpenWindow				開啟新視窗
 jf_CloseWindow				關閉主程式之視窗
 jf_OpenChildWin			開啟子視窗
 jf_OpenMsgWin				開啟MsgDiag或CustomErrPage視窗	(93.12.26 Andy新增)
 jf_ShowModal				以ShowModal型式開啟子視窗
 jf_BlockContextMenu()		阻擋使用者按下滑屬右鍵來popup menu選單
 jf_ConvertEnterToTab()		將Enter鍵轉成Tab鍵,讓使用者可以Enter轉換focus
 
 #-------------------------------------------------------- Date
 jf_CallCal        			開啟小日曆
 jf_CallCalendar			開啟小月曆
 jf_ChkDateFmt     			檢查西元｜民國日期是否正確
 jf_CheckCDATE				檢查輸入之民國日期字串是否正確
 jf_CheckEDATE				檢查輸入之西曆日期字串是否正確
 
 #-------------------------------------------------------- String
 jf_StrValidate				檢查字串是否於合法範圍內
 jf_IsNum          			檢查字串是否為數字格式（含負數）
 jf_PADCHAR				若是物件值不為空字串時,將字串左邊補足特定字元
 jf_PADL           			指定字元補足字串的左邊
 jf_PADR           			指定字元補足字串的右邊
 jf_Trim           			去除字串首尾的空白
 jf_UPPERCASE				輸入值轉成大寫
 FormatStr				字串內容設定
 jf_base64decode(str)			將base64字串解碼
 
 #-------------------------------------------------------- Cookie
 jf_ReadCookie     			讀取cookie變數
 jf_SaveCookie     			儲存cookie變數
 jf_SaveCookieWithExpire	儲存cookie變數,將來會support Timeout時間

 #-------------------------------------------------------- CheckBox Select
 jf_SelectItem         		處理選取的checkbox
 jf_ClearAllItem       		不選全部的checkbox，並回存cookie
 jf_SelectAllItem      		選取全部的checkbox，並回存cookie
 jf_ClearPageItem      		不選本頁的checkbox，並回存cookie
 jf_SelectPageItem     		選取本頁的checkbox，並回存cookie
 jf_SelectReverseItem  		反向選取  checkbox，並回存cookie
 jf_SelectRangeItem    		處理選擇範圍內的checkbox，並回存cookie
 jf_CallSel            		開啟選取提示子視窗

 #-------------------------------------------------------- Obj
 jf_InpNumOnly     			只允許動作物件輸入數字（僅對IE有效）
 jf_SelDDMenu      			根據傳入值選取DropDownMenu值
 jf_CancelEnterKey			鎖住Enter鍵

 #-------------------------------------------------------- Change Page/Rec
 jf_ChangePage     			切換至 summary 的新頁面
 jf_ChangeRec      			切換至 detail  的新頁面
 
 #-------------------------------------------------------- Client
 jf_ShowWaitState			Server端處理時，改變Client端顯示狀態，讓使用者知道程式正在處理中

 #-------------------------------------------------------- alert
 jf_ShowMeg					顯示訊息
 jf_ShowMsg					顯示訊息
 jf_ShowValidator			顯示錯誤訊息(93.12.19 Andy新增)

 #-------------------------------------------------------- DataGrid
 jf_Assemble				組出DataGrid內物件的ClientID
 
 #-------------------------------------------------------- Client javascript control
 jf_BlockBackKey			取消client端按下"<-"回上頁功能
  
 #-------------------------------------------------------- Template 選擇檔案格式功能:PDF or WORD
 jf_OpenMenu				Pop-up選擇視窗
 jf_CloseMenu				close選擇視窗
**********************************************************************************************/

/**********************************************************************************************
  Name : function jf_OpenWindow(argUrl, argWinName, argOption)
  Desc : 開啟新視窗
  Parm : argUrl     : string 欲開啟網頁之url
    	 argWinName	: string 欲開啟新視窗之視窗名稱 # 建議使用主程式+子視窗之程式代號，以避免WindowName重覆
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
  Name : function jf_CloseWindow(argConfirm, argChildWinHandle)
  Desc : 關閉主程式之視窗
  Parm : argConfirm			: string 關閉視窗前是否需詢問 # 0:否 / 1:是
		 argChildWinHandle	: array of 子視窗物件
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
		try
		{
			//1050623	Leslie	改用共通的關閉函式
			jf_CloseSelf();
			/*window.top.opener = parent;
			window.top.close();*/
		}
		finally{}
	}
}

var arrWin = new Array();
/**********************************************************************************************
  Name : function jf_OpenChildWin(argUrl, argWinName, argWidth, argHeight)
  Desc : 開啟子視窗
  Parm : argUrl     : string 欲開啟網頁之url
    	 argWinName	: string 欲開啟新視窗之視窗名稱 #建議使用主程式+子視窗之程式代號，以避免WindowName重覆
    	 argWidth   : int    子視窗之寬度
    	 argHigth   : int    子視窗之高度
  Rtn  : int 回傳新視窗Handle
 **********************************************************************************************/
function jf_OpenChildWin(argUrl, argWinName, argWidth, argHeight)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argUrl = argUrl.replace(/http:/ig, 'https:');
		
	if(argWinName != "")
	{
		for(var i=0; i<arrWin.length; i++)
		{
			if(arrWin[i][0] == argWinName)
			{
				if(arrWin[i][1].closed)
					arrWin[i][0] = "";
				else
					arrWin[i][1].close();
			}
		}
	}
	
	//1050823	Leslie	增加子視窗之最小限制邏輯
	argWidth = (argWidth*1 > 1000)?argWidth * 1:1000;
	argHeight = (argHeight*1 > 1000)?argHeight * 1:600;
	
	var strWinStyle, strTop, strLeft;
	//strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";
	strWinStyle = "menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";//davis [0990727] 修改隱藏網址列
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

	gWindowID = window.open(argUrl, "", strWinStyle);
	gWindowID.focus();

	arrWin[arrWin.length] = new Array();
	arrWin[arrWin.length - 1][0] = argWinName;
	arrWin[arrWin.length - 1][1] = gWindowID;
	return gWindowID;
}

/**********************************************************************************************
  Name : function jf_OpenMsgWin(argUrl, argWinName)
  Desc : 開啟MsgDiag或CustomErrPage視窗
  Parm : argUrl     : string 欲開啟網頁之url
    	 argWinName : string 欲開啟新視窗之視窗名稱 #建議使用主程式+子視窗之程式代號，以避免WindowName重覆
  Rtn  : int 回傳新視窗Handle
 **********************************************************************************************/	
function jf_OpenMsgWin(argUrl, argWinName)
{
	//1031028 Kevin 1030836 新增支援SSL
	if(document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
		argUrl = argUrl.replace(/http:/ig, 'https:');
	
	if(argWinName != "")
	{
		for(var i=0; i<arrWin.length; i++)
		{
			if(arrWin[i][0] == argWinName)
			{
				if(arrWin[i][1].closed)
					arrWin[i][0] = "";
				else
					arrWin[i][1].close();
			}
		}
	}
	
	var strWinStyle, strTop, strLeft;
	//strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";
	strWinStyle = "menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";//davis [0990727] 修改隱藏網址列
	
	strWinStyle = strWinStyle + ",width=700";
	strLeft = (screen.width-700)/2;
	strWinStyle = strWinStyle + ",left="+strLeft;
	
	strWinStyle = strWinStyle + ",height=500";
	strTop = (screen.height-500)/2-10;
	strWinStyle = strWinStyle + ",top="+strTop;
	
	gWindowID = window.open(argUrl, argWinName, strWinStyle);
	gWindowID.focus();

	arrWin[arrWin.length] = new Array();
	arrWin[arrWin.length - 1][0] = argWinName;
	arrWin[arrWin.length - 1][1] = gWindowID;
	return gWindowID;
}

/**********************************************************************************************
  Name : function jf_ShowModal(argUrl, argWidth, argHeight)
  Desc : 以ShowModal型式開啟子視窗
  Parm : argUrl		: string 欲開啟網頁之url
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
	//1050328	Leslie	二代修改
	//var ret = window.showModalDialog(argUrl, window, sFeatures);
	openDlg(argUrl,"0","URL",argWidth,argHeight);
	//return ret;
}

/**********************************************************************************************
  Name : function jf_BlockContextMenu()
  Desc : 取消client端,按下滑鼠右鍵清單功能
  Parm : none
  Rtn  : none
 **********************************************************************************************/
//1050503	Leslie	二代系統修改
//function jf_BlockContextMenu()
function jf_BlockContextMenu(event)
{
	//Cancel the context menu
	//1050503	Leslie	二代系統修改
 	/*if(document.selection.type == "Text") //使右鍵複製可使用 #2006.08.04 Andy
  		return;
 	else*/ if(document.activeElement.tagName == "TEXTAREA") //#2006.10.03 resare
  		return;
 	else if(document.activeElement.tagName == "INPUT")
  		return;
	//1050503	Leslie	二代系統修改
	//event.returnValue= false;
	return false;
}

/**********************************************************************************************
  Name : function jf_ConvertEnterToTab()
  Desc : 將Enter鍵轉成Tab鍵,讓使用者可以Enter轉換focus
  Parm : none
  Rtn  : none
 **********************************************************************************************/
/*
function jf_ConvertEnterToTab()
{
	if(document.activeElement.type=='submit')
	   return;
	   
	if(event.keyCode==13)
	   event.keyCode=9;
}
*/
/**********************************************************************************************
 Name : function jf_CallCal(argYr, argMn, argDy, argLang, argYrTp)
 Desc : 開啟小日曆 (位於lib/cal.htm)
 Parm : argYr	: string 年度
        argMn	: string 月
        argDy	: string 日期
        argLang	: 中/英顯示 # CH / EN
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
 Parm : argShowObj	: text element object
        argX		: string X軸位置
        argY		: string Y軸位置
 Rtn  : none
***********************************************************************************************/
function jf_CallCalendar(argShowObj, argX, argY)
{
	var sPath = "../../../STD/LIB/calendar.htm";
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
 Parm : argYr		: string 年度
        argMn		: string 月
        argDy		: string 日期
        argCanNull	: string 是否可空白 #0:NO / 1:YES
        argYrTp		: string 西元/民國 # ENY / CHY
        argFull		: string 是否補滿0 # 0:NO / 1:YES        
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
 Name : function jf_CheckCDATE(argStr)
 Desc : 檢查輸入之民國日期字串(七碼YYYMMDD)是否正確
 Parm : argObj	: 欲檢查之字串
 Rtn  : Boolean
 **********************************************************************************************/
function jf_CheckCDATE(argStr) 
{
	// adapting for other layouts should be easy
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
 Parm : argObj	: 欲檢查之字串
 Rtn  : Boolean
 **********************************************************************************************/
function jf_CheckEDATE(argStr) 
{
	// adapting for other layouts should be easy
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

/**********************************************************************************************
 Name : function jf_StrValidate(argStr, argRange)
 Desc : 檢查字串是否於合法範圍內
 Parm : argStr		: string 待檢查字串
		argRange	: string 合法範圍 # 如:1~5 or 1,3~6
 Rtn  : Boolean
 **********************************************************************************************/
function jf_StrValidate(argStr, argRange)
{
	return false;
}

/**********************************************************************************************
 Name : function jf_IsNum(argStr)
 Desc : 檢查字串是否為數字格式（含負數）
 Parm : argStr	: string 待檢查字串
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
  Name : function jf_PADCHAR(argObj,argLength,argFillStr)
  Desc : 若是物件值不為空字串時,將字串左邊補足特定字元
  Parm : argObj     : obj    作用的物件
  		 argLength  : int    補足後字串總長度
  		 argFillStr	: string 待補足字串
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
  		 argFillStr	: string 待補足字串
  Rtn  : string 回傳補足後字串
 **********************************************************************************************/	
function jf_PADL(argString, argLength, argFillStr)
{
	var pi_length;
	pi_length = argString.length; 
	if(pi_length < argLength )
	{
		return jf_PADL(argFillStr+argString, argLength, argFillStr);
	}
	return argString;
}	

/**********************************************************************************************
  Name : function jf_PADR(argString, argLength, argFillStr)
  Desc : 將字串右邊補足特定字元
  Parm : argString  : string 原始字串值
    	 argLength  : int    補足後字串總長度
    	 argFillStr	: string 待補足字串
  Rtn  : string 回傳補足後字串
 **********************************************************************************************/	
function jf_PADR(argString, argLength, argFillStr)
{
	var trimStr     = jf_Trim(argString);
	var bSrcLength  = trimStr.length;
	var RightStrLen = argLength - bSrcLength;
	var RightStr    = "";

	for (var i = 0; i < RightStrLen; i++) 
	{ 
		RightStr = RightStr + argFillStr;
	}
	return trimStr + RightStr;
}

/**********************************************************************************************
  Name : function jf_Trim(argStr)
  Desc : 去除字串首尾的空白
  Parm : argStr		: string 原始字串值
  Rtn  : string 回傳去除字串首尾空白後之字串
 **********************************************************************************************/	
function jf_Trim(argStr)
{ 
	var StrLen    = argStr.length;
	while ( argStr.indexOf(" ") == 0 )
	{
		argStr = argStr.substr(1);
		StrLen--;
	}
	while ( argStr.lastIndexOf(" ") == StrLen-1 )
	{ 
		argStr = argStr.substr(0, StrLen-1);
		StrLen--;
	}
	//1050623	Leslie	增加處理&nbsp;的空白
	while(argStr.indexOf(String.fromCharCode(160)) == 0)
	{
		argStr = argStr.substr(1);
		StrLen--;
	}
	while ( argStr.lastIndexOf(String.fromCharCode(160)) == StrLen-1 )
	{ 
		argStr = argStr.substr(0, StrLen-1);
		StrLen--;
	}
	return argStr;
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
 Name : function FormatStr(argFormat,argMsg)
 Desc : 字串內容設定
 Parm : argFormat	: 訊息格式
        argMsg		: 訊息字串        
 Rtn  : string 訊息字串
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

/**********************************************************************************************
 Name : function jf_ReadCookie(argCookieName)
 Desc : 讀取cookie變數
 Parm : argCookieName	: string Cookie名稱
 Rtn  : string 特定Cookie值
 **********************************************************************************************/
function jf_ReadCookie(argCookieName)
{
	var namex = argCookieName + "=";

    //1070907 Leslie  內政部資安檢測調整，配合Cookie的HttpOnly，改用隱藏欄位取代
	/*if (document.cookie.length == 0) { return null; }
	nameat = document.cookie.indexOf(namex);
	if (nameat == -1) { return null; } // 找不到 name 時
	ValueAt = nameat + namex.length;
	endPos = document.cookie.indexOf(";", ValueAt);
	if (endPos == -1) { return document.cookie.substring(ValueAt); }
	else { return document.cookie.substring(ValueAt, endPos); }*/

	//1071127	Leslie	配合SQL訊息子視窗，修正取得隱藏欄位寫法
	if(!document.all["HiddenCookie"])
		$('body').append("<input id='HiddenCookie' class='hide'>");
	var HiddenCookie = document.all.HiddenCookie.value;
	if (HiddenCookie.length == 0) { return null; }
	nameat = HiddenCookie.indexOf(namex);
	if (nameat == -1) { return null; } // 找不到 name 時
	ValueAt = nameat + namex.length;
	endPos = HiddenCookie.indexOf(";", ValueAt);
	if (endPos == -1) { return HiddenCookie.substring(ValueAt); }
	else { return HiddenCookie.substring(ValueAt, endPos); }
}

/**********************************************************************************************
 Name : function jf_SaveCookie(argCookieName, argValue)
 Desc : 儲存cookie變數
 Parm : argCookieName	: string Cookie名稱
        argValue		: string 欲儲存之值
 Rtn  : none
 **********************************************************************************************/
function jf_SaveCookie(argCookieName, argValue)
{
	//1071127	Leslie	配合SQL訊息子視窗，修正取得隱藏欄位寫法
	if(!document.all["HiddenCookie"])
		$('body').append("<input id='HiddenCookie' class='hide'>");
	
    //1070907 Leslie  內政部資安檢測調整，配合Cookie的HttpOnly，改用隱藏欄位取代
    //document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
    var HiddenCookie = document.all.HiddenCookie.value;
    var currCookie = jf_ReadCookie(argCookieName);
    if (currCookie == null || currCookie == "") {
        document.all.HiddenCookie.value = ((HiddenCookie != "")?HiddenCookie+"; ":"")+argCookieName+"="+escape(argValue);
    }
    else{
        var arKeyValue = HiddenCookie.split(';');
        for (var i = 0; i < arKeyValue.length; i++)
        {
            var val = jf_Trim(arKeyValue[i]).split('=');
            if (val[0] == argCookieName)
                val[1] = argValue;
            arKeyValue[i] = val.join("=");
        }
        document.all.HiddenCookie.value = arKeyValue.join("; ");
    }
}

/**********************************************************************************************
 Name : function jf_SaveCookieWithExpire(argCookieName, argValue)
 Desc : 儲存cookie變數
 Parm : argCookieName	: string Cookie名稱
        argValue		: string 欲儲存之值
 Rtn  : none
 **********************************************************************************************/
function jf_SaveCookieWithExpire(argCookieName, argValue)
{
	jf_SaveCookie(argCookieName,argValue);
}


/**********************************************************************************************
 Name : function jf_SelectItem(argCookieName)
 Desc : 處理選取checkbox，並回存至cookie
 Parm : argCookieName	: string Cookie名稱
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
 Name : function jf_ClearAllItem(argCookieName, argSender)
 Desc : 不選全部的checkbox，並回存cookie
 Parm : argCookieName	: string Cookie名稱
        argSender		: checkbox物件名
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
 Parm : argCookieName	: string Cookie名稱
        argIndex		: 
 Rtn  : none
 **********************************************************************************************/
function jf_SelectAllItem(argCookieName, argIndex)
{
    pIdx = 0;
    pStr = jf_ReadCookie(argCookieName);
    
    if (pStr != null)    
	jf_SaveCookie(argCookieName, jf_PADR("", pStr.length, "1"));
	//jf_SaveCookie(argCookieName,jf_PADR('',1000,'1'))
    
    var pi_PageSize=Number(document.all["_PageSize"].value);
    var pi_RecCnt=Number(document.all["_RecCtn"].value);

    if (pi_RecCnt > 1)
    {   
        while (pIdx < pi_PageSize)
        {
		//alert("dgDETAIL_ctrl"+(argIndex+pIdx)+"_cbSELECT");
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
 Name : function jf_ClearPageItem(argCookieName, argPageBeg, argPageSize, argSender)
 Desc : 不選本頁的checkbox，並回存cookie
 Parm : argCookieName	: string Cookie名稱
        argPageBeg		:
        argPagesize		:
        argSender		: checkbox物件名
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
 Parm : argCookieName	: string Cookie名稱
        argPageBeg		:
        argPagesize		:
        argSender		: checkbox物件名
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
 Name : function jf_SelectReverseItem(argCookieName, argIndex)
 Desc : 反向選取checkbox，並回存cookie
 Parm : argCookieName	: string Cookie名稱
        argIndex		: 
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
 Parm : argCookieName	: string Cookie名稱
        argIndex		: 
        argBegnum		:
        argEndnum		:
        argType			:
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
 Parm : argCookieName	: string Cookie名稱
        argRecCount		: 
        argIndex		:
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
 Desc : 只允許動作物件輸入數字（僅對IE有效），會根據所觸發的鍵盤事件來做不同的處理
 Parm : none
 Rtn  : none
 **********************************************************************************************/
//1050503	Leslie	二代系統修改
 //function jf_InpNumOnly()
 function jf_InpNumOnly(event)
{
	//1050503	Leslie	二代系統修改
	//var kc = event.keyCode;
	var kc = event.keyCode||event.charCode;
	var type = event.type;
	
	switch(type)
	{
		case "keypress" :
			//1050520	Leslie	為了萬惡的FireFox修改的判斷(FireFox的onkeypress會接到命令鍵，例如：上下左右)
			if(event.isChar != undefined)	//Browser is FireFox
				if(event.charCode == 0)			//key is control key
					return true;
				
			//Only allow 0-9, the other will set to nothing
			if ( (kc < 48) || (kc > 57) )
			//event.keyCode = 0;
			//1050308	Leslie	二代系統修改
			{
				event.keyCode = 0;
				//1050503	Leslie	二代系統修改
				//event.returnValue = false;
				return false;
			}
			break;
		case "keyup" : //keyup事件不適合用在阻擋使用者輸入數字之外的按鍵
			break;
		case "keydown" :
			// BackSpace OR Tab OR End OR Home OR Left OR Up OR Right OR Down OR Insert OR Delete OR 0-9
			if ( (kc >= 8 && kc <= 9) || ( kc >= 35 && kc <= 40) || ( kc >= 45 && kc <= 46)  || ( kc >= 48 && kc <= 57) || ( kc >= 96 && kc <= 105) )
				break;
			// The other will set to nothing
			event.keyCode = 0;
			//1050308	Leslie	二代系統修改
			//event.returnValue = false;
			return false;
			break;
	}
}

/**********************************************************************************************
 Name : function jf_SelDDMenu(argObj, argVal)
 Desc : 根據傳入值選取DropDownMenu值
 Parm : argObj	: 動作物件
        argVal	: 比較值
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
 Name : function jf_CancelEnterKey()
 Desc : 鎖住Enter鍵
 Parm : none
 Rtn  : none
 **********************************************************************************************/
function jf_CancelEnterKey()
{
	if(event.keyCode == 13)
		event.keyCode = 0;
}

/**********************************************************************************************
 Name : function jf_ChangePage(argPagePos, argPage, argForm)
 Desc : 切換至 summary 的新頁面
 Parm : argPagePos	: 欲移至的頁碼
        argPage		: 頁碼Text/HIDDEN
        argForm		: 上述物件隸屬的FORM
 Rtn  : none
 **********************************************************************************************/
function jf_ChangePage(argPagePos, argPage, argForm)
{
    argPage.value = argPagePos;
    argForm.submit();
}

/**********************************************************************************************
 Name : function jf_ChangePage(argPagePos, argPage, argForm)
 Desc : 切換至 detail 的新頁面
 Parm : argPagePos	: 欲移至的頁碼
		argRecPos	:
        argPage		: 頁碼Text/HIDDEN
        argRec		:
        argForm		: 上述物件隸屬的FORM
 Rtn  : none
 **********************************************************************************************/
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
 Parm : none
 Rtn  : none
 **********************************************************************************************/
function jf_ShowWaitState()
{
	if(Page_IsValid==true)
	{
		/* #2006.04.13 Andy
		for(var i=0;i<document.all.length;i++)
		{		
			document.all[i].style.cursor = "wait";
		}
		*/
		document.body.style.cursor = "wait";
	
		//1041223	Leslie	二代公文系統相關修改
		//for(var i=0;i<document.all.tags("input").length;i++)
		//{
		//	if(document.all.tags("input")[i].type == "text")
		//		document.all.tags("input")[i].readOnly = true;
		//}
		$('input[type=text]').each(function (){
			this.readOnly = true;
		})
		window.status = "處理中,請稍候!!";
	}
}

/**********************************************************************************************
 Name : function jf_ShowMeg(Context,HeadTest)
 Desc : 顯示訊息
 Parm : Context		: string 訊息內容
        HeadTest	: string 訊息的標題
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
                      s += Context + "\n";
                      break;
                                
           case "SingleParagraph":
					  s += Context + " ";
                      break;
    }
	alert(s);
}

/**********************************************************************************************
 Name : function jf_ShowMsg(Context,HeadTest)
 Desc : 顯示訊息
 Parm : Context		: string 訊息內容
        HeadTest	: string 訊息的標題
 Rtn  : none
 **********************************************************************************************/
function jf_ShowMsg(Context,HeadTest)
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
                      s += Context + "\n";
                      break;
                                
           case "SingleParagraph":
					  s += Context + " ";
                      break;
    }
	alert(s);
}

/**********************************************************************************************
 Name : function jf_ShowValidator()
 Desc : 顯示錯誤訊息
 Parm : none
 Rtn  : none
 **********************************************************************************************/
function jf_ShowValidator()
{
	//1050114	Leslie	配合非IE瀏覽器，改用Validator控制項內容顯示訊息
	//1041214	Leslie	配合非IE瀏覽器，增加字串處理
	//if (document.all["ValidationSummary1"] != null && document.all["ValidationSummary1"].innerText != "")
	//if (document.all["ValidationSummary1"] != null && document.all["ValidationSummary1"].textContent != "")
	if($('#Validator').text() != "" && $('#Validator').text() != "CustomValidator")
	{
		//var str = document.all["ValidationSummary1"].textContent;
		//var strTrimed =str.replace(/[\r\n]/g,"");//去掉换行
		//if(strTrimed != "")
			//alert(str);	//秀出原內容
		//alert(document.all["ValidationSummary1"].innerText);
		alert($('#Validator').text());
	}
}

/**********************************************************************************************
 Name : function jf_Assemble(argObj,argObjID,assemblyID)
 Desc : 組出DataGrid內物件的ClientID
 Parm : argObj		: 動作物件
        argObjID	: 動作物件的ID
        assemblyID	: 需要組出DataGrid內ClientID的物件ID
 Rtn  : string 回傳DataGrid內ClientID
 **********************************************************************************************/
function jf_Assemble(argObj,argObjID,assemblyID)
{
	var dgRowID = argObj.substring(0,argObj.indexOf("_"+argObjID));
	var dgKeyID = dgRowID + "_" + assemblyID;
	return dgKeyID;
}

/**********************************************************************************************
 Name : function jf_BlockBackKey()
 Desc : 取消client端按下"<-"回上頁功能
 Parm : none
 Rtn  : none
 **********************************************************************************************/
//1050503	Leslie	二代系統修改
//function jf_BlockBackKey()
function jf_BlockBackKey(event)
{
	//1050503	Leslie	二代系統修改
	//var code = event.keyCode
	var code = event.keyCode||event.charCode;	
	
	//1050503	Leslie	二代系統修改
	if(document.activeElement.tagName == "TEXTAREA") //#2006.10.03 resare
  		return;
 	else if(document.activeElement.tagName == "INPUT")
  		return;
	
	if(code==8) // backspace
	//1050503	Leslie	二代系統修改
	   //event.keyCode = -1;
	   return false;
	return true;
}

/**********************************************************************************************
 Name : function jf_OpenMenu()
 Desc : Pop-up選擇Format視窗
 Parm : menuId	:
 Rtn  : none
 **********************************************************************************************/
function jf_OpenMenu(menuId) 
{
	var el;
	el = document.getElementById(menuId);
	el.style.left = window.event.x+15;
	el.style.top  = window.event.y+5;
	el.style.display = "block";
}

/**********************************************************************************************
 Name : function jf_CloseMenu()
 Desc : Close選擇Format視窗
 Parm : menuId	:
 Rtn  : none
 **********************************************************************************************/
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
 Name : function  jf_base64decode(str)
 Desc : 將base64字串解碼
 Parm : str	: 要解碼的字串
 Rtn  : 解碼後的字串
 **********************************************************************************************/
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);


function  jf_base64decode(str)
{
var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return utf8to16(out);
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return utf8to16(out);
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }

    //轉出來的中文字要utf16才不會是亂碼
    return utf8to16(out);
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4)
	{ 
	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	    // 0xxxxxxx
	    out += str.charAt(i-1);
	    break;
	  case 12: case 13:
	    // 110x xxxx   10xx xxxx
	    char2 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	    break;
	  case 14:
	    // 1110 xxxx  10xx xxxx  10xx xxxx
	    char2 = str.charCodeAt(i++);
	    char3 = str.charCodeAt(i++);
	    out += String.fromCharCode( ((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) |  ((char3 & 0x3F) << 0));
	    break;
	}
    }

    return out;
}