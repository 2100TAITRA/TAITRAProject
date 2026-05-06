/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ---------------------------------------------------------------------------------------------
 * 日期		修改人		單號		摘要
 * ---------------------------------------------------------------------------------------------
 * 1071012  Zen         1050087 二代升級
 * 1090318	Cloud		1081109		修改支援年度/版本互轉
 * 1100204  Zen         1090927     取消使用document.activeElement
 * 1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-錯誤自行處理
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

//1071011 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1071011 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1071011 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1071011 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1071011 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1071011 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            InitObj();
            break;
        case "btPrint":
        case "btPreview":
            Page_BlockSubmit = !CheckFileNoRangeFormat("txVerNo", "txFileYear", "txFileCls1", "txFileCls2", "txFileCase1", "txFileCase2", "txFileVol1", "txFileVol2");
            //1071011 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
var bMsg = true;
var iCallID_CLS = null;
var iCallID_CASE = null;
var iCallID_CLS_2 = null;
var iCallID_CASE_2 = null;
//處理呼叫WebService回傳值
//1090312 Cloud 1081109 補上取得版本別
var wsGetVerYearID = null;
var CurrOBjdID = null;
var oldYearValue = "";
function OnWSResult(argResult)
{
    //分類號(起)
    if (argResult.id == iCallID_CLS)
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (WSResult.m_bSuccess && WSResult.ClsKey != "")
            {
                if (jf_Trim(document.all["txVerNo"].value) == "")
                    document.all["txVerNo"].value = WSResult.VerNo;
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCls1"].innerText = WSResult.ClsName;
                document.all["lbFileCls1"].value = WSResult.ClsName;
            	//1090318 Cloud	1081109 增加紀錄鍵直
                document.all["h_txFileClsKey1"].value = WSResult.ClsKey;

                bMsg = true;
            }
            else
            {
                //1100204 Zen 1090927 取消使用document.activeElement
                //if (document.activeElement.id == "txFileCase1")
                if (CurrOBjdID == "txFileCase1")
                    bMsg = false;
                alert("無此分類號(起)");
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCls1"].innerText = "";
                document.all["lbFileCls1"].value = "";
                document.all["txFileCls1"].value = "";
                //1071011 Zen 1050087 二代升級
                //document.all["txFileCls1"].focus();
                $('#txFileCls1').focus();
            	//1090318 Cloud	1081109 增加紀錄鍵直
                document.all["h_txFileClsKey1"].value = "";
            }
        }
        else
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCls1"].innerText = "";
            document.all["lbFileCls1"].value = "";
            document.all["txFileCls1"].value = "";
            //1071011 Zen 1050087 二代升級
            //document.all["txFileCls1"].focus();
            $('#txFileCls1').focus();
        	//1090318 Cloud	1081109 增加紀錄鍵直
            document.all["h_txFileClsKey1"].value = "";

        }
    }
    //分類號(訖)
    if (argResult.id == iCallID_CLS_2)
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (WSResult.m_bSuccess && WSResult.ClsKey != "")
            {
                if (jf_Trim(document.all["txVerNo"].value) == "")
                    document.all["txVerNo"].value = WSResult.VerNo;
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCls2"].innerText = WSResult.ClsName;
                document.all["lbFileCls2"].value = WSResult.ClsName;
            	//1090318 Cloud	1081109 增加紀錄鍵直
                document.all["h_txFileClsKey2"].value = WSResult.ClsKey;
                bMsg = true;
            }
            else
            {
                //1100204 Zen 1090927 取消使用document.activeElement
                //if (document.activeElement.id == "txFileCase2")
                if (CurrOBjdID == "txFileCase2")
                    bMsg = false;
                alert("無此分類號(訖)");
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCls2"].innerText = "";
                document.all["lbFileCls2"].value = "";
                document.all["txFileCls2"].value = "";
                //1071011 Zen 1050087 二代升級
                //document.all["txFileCls2"].focus();
                $('#txFileCls2').focus();
            	//1090318 Cloud	1081109 增加紀錄鍵直
                document.all["h_txFileClsKey2"].value = "";
            }
        }
        else
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCls2"].innerText = "";
            document.all["lbFileCls2"].value = "";
            document.all["txFileCls2"].value = "";
            //1071011 Zen 1050087 二代升級
            document.all["txFileCls2"].focus();
            $('#txFileCls2').focus();
        	//1090318 Cloud	1081109 增加紀錄鍵直
            document.all["h_txFileClsKey2"].value = "";
        }
    }
    //案次號(起)
    if (argResult.id == iCallID_CASE)
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (WSResult.m_bSuccess)
            {
                if (jf_Trim(document.all["txFileYear"].value) == "")
                    document.all["txFileYear"].value = WSResult.CaseYear;
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCase1"].innerText = WSResult.CaseName;
                document.all["lbFileCase1"].value = WSResult.CaseName;
            }
            else
            {
                alert("無此案次號(起)");
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCase1"].innerText = "";
                document.all["lbFileCase1"].value = "";
                document.all["txFileCase1"].value = "";
                //1071011 Zen 1050087 二代升級
                //document.all["txFileCase1"].focus();
                $('#txFileCase1').focus();
            }
        }
        else
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCase1"].innerText = "";
            document.all["lbFileCase1"].value = "";
            document.all["txFileCase1"].value = "";
            //1071011 Zen 1050087 二代升級
            //document.all["txFileCase1"].focus();
            $('#txFileCase1').focus();
        }
    }
    //案次號(訖)
    if (argResult.id == iCallID_CASE_2)
    {
        WSResult = argResult.value;
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (WSResult.m_bSuccess)
            {
                if (jf_Trim(document.all["txFileYear"].value) == "")
                    document.all["txFileYear"].value = WSResult.CaseYear;
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCase2"].innerText = WSResult.CaseName;
                document.all["lbFileCase2"].value = WSResult.CaseName;
            }
            else
            {
                alert("無此案次號(訖)");
                //1071011 Zen 1050087 二代升級
                //document.all["lbFileCase2"].innerText = "";
                document.all["lbFileCase2"].value = "";
                document.all["txFileCase2"].value = "";
                //1071011 Zen 1050087 二代升級
                //document.all["txFileCase2"].focus();
                $('#txFileCase2').focus();
            }
        }
        else
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCase2"].innerText = "";
            document.all["lbFileCase2"].value = "";
            document.all["txFileCase2"].value = "";
            //1071011 Zen 1050087 二代升級
            //document.all["txFileCase2"].focus();
            $('#txFileCase2').focus();
        }
    }
    	//1090312 Cloud 1081109 修改支援叫用年度/版本互轉-s
    if (argResult.id == wsGetVerYearID)
    {
		//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-錯誤自行處理
    	//if (jf_IsWebServiceSuccess(argResult))
		if (!argResult.error && argResult.value.m_bSuccess)
    	{
    		if (CurrOBjdID == "txFileYear")
    		{
    			document.all["txVerNo"].value = argResult.value.strVerNo;
    			oldYearValue = document.all["txFileYear"].value;
    		}
    		else
    		{
    			var dt = new Date();
    			var strSysYear = dt.getFullYear() - 1911;
    			var WSResult = argResult.value;
    			if (WSResult.strEdate == "" || WSResult.strEdate >= strSysYear)//啟用中-無停用日或是停用日大於等於系統日
    			{
    				if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < WSResult.strSdate)//年度為空或是輸入年度小於起日則跳出訊息後直接帶入
    				{
    					if (document.all["txFileYear"].value != "")//不為空再跳提醒
    						alert("該版本啟用中，系統將預設帶入系統年。");
    					oldYearValue = document.all["txFileYear"].value = strSysYear;
    				}
    			}
    			else//停用版本
    			{
    				//年度為空白或是輸入年度不合理(小於起日或是大於停止日)則跳出訊息預設代最大
    				if (document.all["txFileYear"].value == "" || document.all["txFileYear"].value < WSResult.strSdate || document.all["txFileYear"].value > WSResult.strEdate)
    				{
    					if (document.all["txFileYear"].value != "")//不為空再跳提醒
    					{
    						if (WSResult.strSdate != WSResult.strEdate)
    							alert("該版本使用於：" + WSResult.strSdate + "~" + WSResult.strEdate + "年，系統將預設帶入最大年度。");
    						else
    							alert("該版本使用於：" + WSResult.strSdate + "年，系統將預設帶入。");
    					}
    					oldYearValue = document.all["txFileYear"].value = WSResult.strEdate;
    				}
    			}
    		}
    	}
    	else
    	{

    		if (callObj.value.m_strErrMsg.indexOf("輸入年度含有多個版本") != -1)//年度有多版本，跳出提示訊息，但不進行清空年度，清空版本即可，供使用者自行輸入
    		{
				
				//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-S
				var bAlert = true;		
				if(document.all["txVerNo"].value!="")
				{
					var checkmsg = argResult.value.m_strErrMsg.split('版本')
					for(var i=0 ;i<checkmsg.length;i++)
					{
						if(checkmsg[i].indexOf("啟用區間為")!=-1)
						{
							if(checkmsg[i].split('啟用區間為')[0]==document.all["txVerNo"].value)
							{
								bAlert = false;
								break;
							}
						}
					}
				}
				if(bAlert)
				{
					document.all["txVerNo"].value = "";
					document.all["txVerNo"].focus();
					oldYearValue = document.all["txFileYear"].value;
					//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-錯誤自行處理
					alert(callObj.value.m_strErrMsg);
				}
				//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-E
    		}
    		else
    		{
    			document.all[CurrOBjdID].value = "";
    			$('#' + CurrOBjdID).focus();
				//1100316		Cloud	1100273	修正年度/版本互轉未考量版本已填之情況-錯誤自行處理
				alert(callObj.value.m_strErrMsg);
    		}
    	}
    }
	//1090312 Cloud 1081109 修改支援叫用年度/版本互轉-e
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

/*各(起/訖)欄位Onblur時帶出相關資訊	*/
function TbOnBlur(argTextBox)
{
	//1090318 Cloud 1081109 增加支援年度 版本互轉
	CurrOBjdID = argTextBox;
    var xObjectName = document.activeElement.id;

    if ((xObjectName == "btExit") || (xObjectName == "btExitImg"))
        return;
    var param = new Array(5);
    //分類號(起)
    if (argTextBox == "txFileCls1" || argTextBox == "txVerNo")
    {

    	//1090312 Cloud 1081109 補上取得年度
    	if (argTextBox == "txVerNo" && document.all["txVerNo"].value != "")
    	{
    		var arWSParam = new Array(3);
    		arWSParam[0] = document.all["txFileYear"].value;
    		arWSParam[1] = document.all["txVerNo"].value;
    		arWSParam[2] = "VerNo";
    		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
    		wsGetVerYearID = callObj.id;
    		OnWSResult(callObj);
    	}
        if (document.all["txFileCls1"].value == "")
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCls1"].innerText = "";
            document.all["lbFileCls1"].value = "";
            return;
        }
        if (bMsg)
        {	//1090318 Cloud 1081109 增加支援年度 整合叫用ws_getcls
        	var param = new Array(4);
        	param[0] = document.all["H_OrgNo"].value;
            param[1] = document.all["txVerNo"].value;
            param[2] = document.all["txFileCls1"].value;
            param[3] = document.all["txFileYear"].value;
			//1090318 Cloud 1081109 增加支援年度 整合叫用ws_getcls
            /*param[4] = "";
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, param);*/
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, param);
            iCallID_CLS = RtnObj.id;
            OnWSResult(RtnObj);
        }
        else
            bMsg = true;
    }
    //分類號(訖)
    if (argTextBox == "txFileCls2")
    {
        if (document.all["txFileCls2"].value == "")
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCls2"].innerText = "";
            document.all["lbFileCls2"].value = "";
            return;
        }
        if (bMsg)
        {
        	
            var param = new Array(4);
            param[0] = document.all["H_OrgNo"].value;
            param[1] = document.all["txVerNo"].value;
            param[2] = document.all["txFileCls2"].value;
            param[3] = document.all["txFileYear"].value;
        	//1090318 Cloud 1081109 增加支援年度 整合叫用ws_getcls
            /*param[4] = "";

            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, param);*/
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, param);
            iCallID_CLS_2 = RtnObj.id;
            OnWSResult(RtnObj);
        }
        else
            bMsg = true;
    }
    //案次號(起)
    if (argTextBox == "txFileCase1")
    {
        if (jf_Trim(document.all["txFileCase1"].value) == "")
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCase1"].innerText = "";
            document.all["lbFileCase1"].value = "";
            return;
        }
        else
        {
            if (jf_Trim(document.all["txFileCls1"].value) == "")
            {
                alert("請輸入分類號(起)");
                //1071011 Zen 1050087 二代升級
                //document.all["txFileCls1"].focus();
                $('#txFileCls1').focus();
                return;
            }
        }
        if (bMsg)
        {
        	//1090318 Cloud	1081109 整合叫用ws_CheckCase
            /*param[0] = document.all["H_OrgNo"].value;
            param[1] = document.all["txVerNo"].value;
            param[2] = document.all["txFileCls1"].value
            param[3] = document.all["txFileYear"].value;
            param[4] = document.all["txFileCase1"].value;
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, param);*/
        	param[0] = document.all["H_OrgNo"].value;
        	param[1] = document.all["txFileYear"].value;
        	param[2] = document.all["h_txFileClsKey1"].value
            param[3] = document.all["txFileCase1"].value;
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, param);
            iCallID_CASE = RtnObj.id;
            OnWSResult(RtnObj);
        }
        else
            bMsg = true;
    }
    //案次號(訖)
    if (argTextBox == "txFileCase2")
    {
        if (document.all["txFileCase2"].value == "")
        {
            //1071011 Zen 1050087 二代升級
            //document.all["lbFileCase2"].innerText = "";
            document.all["lbFileCase2"].value = "";
            return;
        }
        else
        {
            if (document.all["txFileCls2"].value == "")
            {
                alert("請輸入分類號(訖)");
                //1071011 Zen 1050087 二代升級
                //document.all["txFileCls2"].focus();
                $('#txFileCls2').focus();
                return;
            }
        }
        if (bMsg)
        {
        	//1090318 Cloud	1081109 整合叫用ws_CheckCase
            /*param[0] = document.all["H_OrgNo"].value;
            param[1] = document.all["txVerNo"].value;
            //判斷分類號(訖)欄位是否有值
            if (document.all["txFileCls2"].value == "")
                param[2] = jf_Trim(document.all["txFileCls1"].value);
            else
                param[2] = jf_Trim(document.all["txFileCls2"].value);
            param[3] = document.all["txFileYear"].value;
            param[4] = document.all["txFileCase2"].value;
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetClsCase", false, param);*/
        	param[0] = document.all["H_OrgNo"].value;
        	param[1] = document.all["txFileYear"].value;
            //判斷分類號(訖)欄位是否有值
            if (document.all["txFileCls2"].value == "")
            	param[2] = jf_Trim(document.all["h_txFileClsKey1"].value);
            else
            	param[2] = jf_Trim(document.all["h_txFileClsKey2"].value);
            param[3] = document.all["txFileCase2"].value;
            RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, param);
            iCallID_CASE_2 = RtnObj.id;
            OnWSResult(RtnObj);
        }
        else
            bMsg = true;
    }
	//1090318 Cloud	1081109 修改支援年度版本互轉
    if (argTextBox == "txFileYear")
    {
    	if (document.all["txFileYear"].value != "")
    	{
    		PADZERO(document.all["txFileYear"], 3);
    		var arWSParam = new Array(3);
    		arWSParam[0] = document.all["txFileYear"].value;
    		arWSParam[1] = document.all["txVerNo"].value;
    		arWSParam[2] = "Year";
    		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetVerYear", false, arWSParam);
    		wsGetVerYearID = callObj.id;
    		OnWSResult(callObj);
    	}
    }

}

//檢核輸入檔號起訖值格式正確性
function CheckFileNoRangeFormat(argVerNo, argYear, argClsS, argClsE, argCaseS, argCaseE, argVolS, argVolE)
{
    var strVerNo = "";
    var strYear = "";
    var strClsS = "";
    var strClsE = "";
    var strCaseS = "";
    var strCaseE = "";
    var strVolS = "";
    var strVolE = "";


    //取得各欄位輸入值
    if (argVerNo != "")
        strVerNo = jf_Trim(document.all[argVerNo].value);
    if (argYear != "")
        strYear = jf_Trim(document.all[argYear].value);
    if (argClsS != "")
        strClsS = jf_Trim(document.all[argClsS].value);
    if (argClsE != "")
        strClsE = jf_Trim(document.all[argClsE].value);
    if (argCaseS != "")
        strCaseS = jf_Trim(document.all[argCaseS].value);
    if (argCaseE != "")
        strCaseE = jf_Trim(document.all[argCaseE].value);
    if (argVolS != "")
        strVolS = jf_Trim(document.all[argVolS].value);
    if (argVolE != "")
        strVolE = jf_Trim(document.all[argVolE].value);

    if (strVerNo + strYear + strClsS + strClsE + strCaseS + strCaseE + strVolS + strVolE == "")
    {
        alert("請至少輸入一項條件");
        return false;
    }

    //FILE_YEAR
    if (strYear == "")
    {
        //1071011 Zen 1050087 二代升級
        //document.all[argYear].focus();
        $('#' + argYear).focus();
        alert("年度號不可為空白");
        return false;
    }

    //FILE_CLS
    if (argClsS != "" && argClsE != "")
    {
        if (strClsS != "" && strClsE != "")
        {
            if (strClsS > strClsE)
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argClsS].focus();
                $('#' + argClsS).focus();
                alert("分類號起值不可以大於訖值");
                return false;
            }
        }
        else if (strClsS != "")
        {
            strClsE = strClsS;
            document.all[argClsE].value = strClsS;
        }
        else if (strClsE != "")
        {
            strClsS = strClsE;
            document.all[argClsS].value = strClsE;
        }
        else
        {
            if (strYear == "" || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != "")
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argClsS].focus();
                $('#' + argClsS).focus();
                alert("分類號不可為空白");
                return false;
            }
        }
    }
    else if (argClsS != "")
    {
        strClsE = strClsS;
        if (strClsS == "" && (strYear == "" || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != ""))
        {
            //1071011 Zen 1050087 二代升級
            document.all[argClsS].focus();
            $('#' + argClsS).focus();
            alert("分類號不可為空白");
            return false;
        }
    }
    else if (argClsE != "")
    {
        strClsS = strClsE;
        if (strClsE == "" && (strYear == "" || strCaseS != "" || strCaseE != "" || strVolS != "" || strVolE != ""))
        {
            //1071011 Zen 1050087 二代升級
            //document.all[argClsE].focus();
            $('#' + argClsE).focus();
            alert("分類號不可為空白");
            return false;
        }
    }

    //FILE_CASE
    if (argCaseS != "" && argCaseE != "")
    {
        if (strCaseS != "" && strCaseE != "")
        {
            if (strCaseS > strCaseE)
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argCaseS].focus();
                $('#' + argCaseS).focus();
                alert("案次號起值不可以大於訖值");
                return false;
            }
        }
        else if (strCaseS != "")
        {
            strCaseE = strCaseS;
            document.all[argCaseE].value = strCaseS;
        }
        else if (strCaseE != "")
        {
            strCaseS = strCaseE;
            document.all[argCaseS].value = strCaseE;
        }
        else
        {
            if (strVolS != "" || strVolE != "")
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argCaseS].focus();
                $('#' + argCaseS).focus();
                alert("案次號不可為空白");
                return false;
            }
        }

        if (strCaseS != "" || strCaseE != "")
        {
            if (strClsS != strClsE)
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argClsS].focus();
                $('#' + argClsS).focus();
                alert("指定案次號起訖時:分類號必須相同");
                return false;
            }
        }
    }
    else if (argCaseS != "")
    {
        strCaseE = strCaseS;
        if (strCaseS == "" && (strVolS != "" || strVolE != ""))
        {
            //1071011 Zen 1050087 二代升級
            //document.all[argCaseS].focus();
            $('#' + argCaseS).focus();
            alert("案次號(起)不可為空白");
            return false;
        }
    }
    else if (argCaseE != "")
    {
        strCaseS = strCaseE;
        if (strCaseE == "" && (strVolS != "" || strVolE != ""))
        {
            //1071011 Zen 1050087 二代升級
            //document.all[argCaseE].focus();
            $('#' + argCaseE).focus();
            alert("案次號(訖)不可為空白");
            return false;
        }
    }

    //FILE_VOL
    if (argVolS != "" && argVolE != "")
    {
        if (strVolS != "" && strVolE != "")
        {
            if (strVolS > strVolE)
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argVolS].focus();
                $('#' + argVolS).focus();
                alert("卷次號起值不可以大於訖值");
                return false;
            }
        }
        else if (strVolS != "")
        {
            strVolE = strVolS;
            document.all[argVolE].value = strVolS;
        }
        else if (strVolE != "")
        {
            strVolS = strVolE;
            document.all[argVolS].value = strVolE;
        }
        if (strVolS != "" || strVolE != "")
        {
            if (strClsS != strClsE || strCaseS != strCaseE)
            {
                //1071011 Zen 1050087 二代升級
                //document.all[argCaseS].focus();
                $('#' + argCaseS).focus();
                alert("指定卷次號起訖時:分類號-案次號必須相同");
                return false;
            }
        }
    }
    else if (argVolS != "")
    {
        strVolE = strVolS;
        if (strVolS == "")
        {
            //1071011 Zen 1050087 二代升級
            //document.all[argVolS].focus();
            $('#' + argVolS).focus();
            alert("卷次號不可為空白");
            return false;
        }
    }
    else if (argVolE != "")
    {
        strVolS = strVolE;
        if (strVolE == "")
        {
            //1071011 Zen 1050087 二代升級
            //document.all[argVolE].focus();
            $('#' + argVolE).focus();
            alert("卷次號不可為空白");
            return false;
        }
    }
    if (document.all.rbL.checked == true && jf_Trim(document.all["txPos"].value) == "")
    {
        //1071011 Zen 1050087 二代升級
        //document.all["txPos"].focus();
        $('#txPos').focus();
        alert("案卷標籤起始位置不可為空白");
        return false;
    }
    return true;
}

function InitObj()
{
    //1071011 Zen 1050087 二代升級
    //document.all["txFileYear"].focus();
    $('#txFileYear').focus();
    document.all.rbCover.checked = true;
    document.all.rbCls.checked = true;
}

function PADZERO(obj, num)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, num, "0");
    }
}