/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1001104	David   KEN		1000893		新增程式
 * 1051005  David   Justin  1050087     二代公文修改
 * 1051019  Leslie  Kenny   1050087     二代公文修改
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
//1051005 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{

	ShowClassName("txClassNo");
	
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
		
		case "btHelp":
			var strUrl = "";
			var strClassNo = jf_Trim(document.all["txClassNo"].value);			
			strUrl = "EDC521.aspx?rtnObj=lbReturnValue&ClassNo=" + strClassNo;
		    //1051005 Justin 1050087 二代公文修改
			//jf_OpenChildWin(strUrl, "EDC521", 700, 500);
			jf_OpenChildWin(strUrl, "EDC521", 800, 600);
			break;
		
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051005 Justin 1050087 二代公文修改 
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
	
    //1051005 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1051005 Justin 1050087 二代公文修改
			//document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;
		case "btSearch":			
			var strUrl = "";
			var strSubNo = jf_Trim(document.all["txSubNo"].value);
			var strSubName = jf_Trim(document.all["txSubName"].value);
			var strClassNo = jf_Trim(document.all["txClassNo"].value);			
			strUrl = "EDC522.aspx?rtnObj=lbReturnValue&argSubNo=" + strSubNo + "&argSubName=" + strSubName + "&argClassNo=" + strClassNo;
		    //1051005 Justin 1050087 二代公文修改
			//jf_OpenChildWin(strUrl, "EDC522", 700, 500);
			jf_OpenChildWin(strUrl, "EDC522", 800, 600);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1051005 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1051005 Justin 1050087 二代公文修改 
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
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
	var strErrMsg= "";	

	if(!CheckClassNo("txClassNo","",true))
		return false;
		
	if(!CheckSubNo("txSubNo","",true))
		return false;
	
	if (jf_Trim(document.all["txSubNo"].value) == "")
	{
	    strErrMsg += "小類代碼不可空白\n";
	    //1051005 Justin 1050087 二代公文修改
	    //document.all["txSubNo"].focus();
	    $('#txSubNo').focus();
	}
	
	if (jf_Trim(document.all["txSubName"].value) == "")
	{
	    strErrMsg += "小類名稱不可空白\n";
	    //1051005 Justin 1050087 二代公文修改
	    //document.all["txSubName"].focus();
	    $('#txSubName').focus();
	}
	
	if (jf_Trim(document.all["txClassNo"].value) == "")
	{
	    strErrMsg += "大類代碼不可空白\n";
	    //1051005 Justin 1050087 二代公文修改
	    //document.all["txClassNo"].focus();
	    $('#txClassNo').focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if(argCallerId == "EDC521")
	{
		document.all["txClassNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);		
		if(document.all["txClassNo"].value != "")
		{
			Page_BlockSubmit=false;
			ShowClassName("txClassNo");			
		}
	    //1051005 Justin 1050087 二代公文修改
		//document.all["txClassNo"].focus();
		$('#txClassNo').focus();
	}	
	if(argCallerId == "EDC522")
	{
		document.all["txSubNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);		
		if(document.all["txSubNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}		
	}	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CheckSubNo(argObj,strMsg)
{  
var strSubNo = jf_Trim(document.all[argObj].value);
var strClassNo = jf_Trim(document.all["txClassNo"].value);
	if (strSubNo != "")
	{
		if (strSubNo.length < 3)
		{
			strSubNo = jf_PADL(strSubNo,3,'0');
			document.all[argObj].value = strSubNo;
		}
		if(strClassNo!="")
		{
			var Cnt=strSubNo/10-strClassNo;
			if(Cnt>=1 || Cnt<0)
			{
				document.all[argObj].value="";	
			    //1051005 Justin 1050087 二代公文修改
				//document.all[argObj].focus();
				$('#' + argObj).focus();
				alert("與大類代碼不相符");	
				return false;					
			}	
		}
	}	
	return true;
}

function ShowClassName(argObj)
{
var strSubNo = jf_Trim(document.all["txSubNo"].value);
var strClassNo = jf_Trim(document.all[argObj].value);
	if (strClassNo != "")
	{
		if (strClassNo.length < 2)
		{
			strClassNo = jf_PADL(strSubNo,2,'0');
			document.all[argObj].value = strClassNo;
		}
		if(strClassNo!="")
		{
			for(var i=0 ; i<document.all["dlClassNo"].length ; i++)
			{
			    if (strClassNo == document.all["dlClassNo"].options[i].value)
			        //1051005 Justin 1050087 二代公文修改
			        //document.all["lbClassName"].innerText=document.all["dlClassNo"].options[i].text;
			        document.all["lbClassName"].textContent = document.all["dlClassNo"].options[i].text;
			}			
		}
	}	
}


function CheckClassNo(argObj,strMsg)
{  
var strSubNo = jf_Trim(document.all["txSubNo"].value);
var strClassNo = jf_Trim(document.all[argObj].value); 
    var Cnt="";
    if (strSubNo!="")
		Cnt=strSubNo/10-strClassNo;
    
	if (strClassNo != "")
	{
		if (strClassNo.length < 2)
		{
			strClassNo = jf_PADL(strClassNo,2,'0');
			document.all[argObj].value = strClassNo;
		}
	
		for(var i=0 ; i<document.all["dlClassNo"].length ; i++)
		{
			if(strClassNo==document.all["dlClassNo"].options[i].value)
			{
				if(Cnt!="")
				{
					if(Cnt<1 && Cnt>=0)
					{
					    //1051005 Justin 1050087 二代公文修改
					    //document.all["lbClassName"].innerText=document.all["dlClassNo"].options[i].text;
					    document.all["lbClassName"].textContent = document.all["dlClassNo"].options[i].text;
						return true;
					}
					else
					{
					    document.all[argObj].value = "";
					    //1051005 Justin 1050087 二代公文修改
					    //document.all["lbClassName"].innerText="";
					    //document.all[argObj].focus();
					    document.all["lbClassName"].textContent = "";
					    $('#' + argObj).focus();
						alert("與小類代碼不相符");	
						return false;											
					}
				}
				else
				{
				    //1051005 Justin 1050087 二代公文修改
				    //document.all["lbClassName"].innerText=document.all["dlClassNo"].options[i].text;
				    document.all["lbClassName"].textContent = document.all["dlClassNo"].options[i].text;
					return true;
				}
			}
		}			
		document.all[argObj].value = "";
	    //1051005 Justin 1050087 二代公文修改
	    //document.all["lbClassName"].innertext="";
	    //document.all[argObj].focus();
		document.all["lbClassName"].textContent = "";
		$('#' + argObj).focus();
		alert("大類代碼不存在");
		return false;		
	}	
	return true;
}
