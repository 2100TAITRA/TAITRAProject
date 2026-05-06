/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1041221		Kenny		1040846		新增程式
 * 1060823      Zen         1050087     二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060823 Zen 1050087 二代升級//if (document.all.tbTool)
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060823 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060823 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
//1060823 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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
	
    //1060823 Zen 1050087 二代升級	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = e.target.id;
	
	switch (xObjectName)
	{
	    case "btPrint":
	        if (!CheckBeforePrint())
	            Page_BlockSubmit = true;
	        else
	            Page_BlockSubmit = false;
	        //1060823 Zen 1050087 二代升級	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
			break;
	    case "btPreview":
	        if (!CheckBeforePrint())
	            Page_BlockSubmit = true;
	        else
	            Page_BlockSubmit = false;
	        //1060823 Zen 1050087 二代升級	        //jf_ToolBarSubmit();
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
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
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
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CheckBeforePrint()
{
    var strSamplingNoS = document.all.txSamplingNoS.value;
    var strSamplingNoE = document.all.txSamplingNoE.value;
    var strDocNoS = document.all.txDocNoS.value;
    var strDocNoE = document.all.txDocNoE.value;
    var strTmp = "" ;

    var blChecked = false;
    var strErrMsg= "";

    if (strSamplingNoS != "" || strSamplingNoE != "")
    {
        if (strSamplingNoS != "" && strSamplingNoE == "")
            document.all.txSamplingNoE.value = strSamplingNoS;
        else if ( (strSamplingNoS == "" && strSamplingNoE != "") )
            document.all.txSamplingNoS.value = strSamplingNoE;
        else if ((strSamplingNoS != "" && strSamplingNoE != ""))
        {
            if (strSamplingNoS > strSamplingNoE)
            {
                document.all.txSamplingNoS.value = strSamplingNoE;
                document.all.txSamplingNoE.value = strSamplingNoS;
            }
        }

        blChecked = true;
    }
    if (strDocNoS != "" || strDocNoE != "")
    {
        if (strDocNoS != "" && strDocNoE == "")
            document.all.txDocNoE.value = strDocNoS;
        else if ((strDocNoS == "" && strDocNoE != ""))
            document.all.txDocNoS.value = strDocNoE;
        else if ((strDocNoS != "" && strDocNoE != ""))
        {
            if (strDocNoS > strDocNoE)
            {
                document.all.txDocNoS.value = strDocNoE;
                document.all.txDocNoE.value = strDocNoS;
            }
        }

        blChecked = true;
    }

    if (!blChecked)
    {
        strErrMsg = "請需至少輸入抽樣編號或是公文文號條件。";
        //1060823 Zen 1050087 二代升級        //document.all.txSamplingNoS.focus();
        $('#txSamplingNoS').focus();

        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return blChecked;
}
