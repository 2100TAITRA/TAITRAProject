/*
DATE     SA		PRG	MGR_NO		DESC
0970902	 --    Leo   0970735    修改不傳網址參數gUSERNAME    
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/

window.onload = fnOnLoad;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function fnOnLoad()
{
	//0970902 Leo 0970735 不取得gUSERNAME
	//var userId	= GetParam("gUSERNAME");
	//jf_SaveCookie("gUSERNAME", userId);

	var strSAMLart	= GetParam("SAMLart");
	RightFrame.location = "TodoList.aspx?SAMLart=" + strSAMLart; 
	LeftFrame.location = "SYS920.aspx?SAMLart=" + strSAMLart;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function fnGetArtifact()
{
	return GetParam("SAMLart");
}

//取得參數值
function GetParam(p)
{
	var arr = this.GetParamArray();
	if( p == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == p )
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
