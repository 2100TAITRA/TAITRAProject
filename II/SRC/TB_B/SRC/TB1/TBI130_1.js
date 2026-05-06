/* *
 * Date		SA			PG			MGR_NO		DESC
 * 1040204	Cloud		Gabby		1030930		(榮總)新增TBI130_1
 * */
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
	var strParam = GetAllParamStr();
	var strUserKey		= GetParam("KStr");
	if(strParam == "")
		strParam = "?";
	else
		strParam += "&";
	if(strUserKey != "")
		strParam += "OpenType=2";
	else
		strParam += "OpenType=1";
	TBI140_1.location = "TBI140_1.aspx" + strParam;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnGetBulletinCount()
{
	if (opener)
		return opener.fnGetBulletinCount();
	else
		return 0;
}

function fnGetBulletinId(Idx)
{
	if (opener)
	{
		try
		{
		return opener.fnGetBulletinId(Idx);
		}
		catch(ex)
		{
		alert("找不到查詢主視窗請重新開啟查詢");
		window.close();
		}
	}
	else
		return "";
}

function fnReShow(argBulletinId , iCount)
{
	var strSAMLart = GetParam("SAMLart");
	var BulletinNum		= GetParam("BulletinNum");
	TBI140_1.location = "TBI140_1.aspx?SAMLart=" + strSAMLart + "&SeqNo=" + iCount +  "&BulletinId=" + argBulletinId  + "&BulletinNum=" + BulletinNum; 
}

function fnDownload()
{
	TBI140_1.fnDownload();
}

function fnGetFileCount()
{
	return TBI140.fnGetFileCount();
}

var flag = 0;
function fnShowMsgAndClose(Msg)
{
	if (flag == 0)
	{
		flag = 1;
		alert(Msg);
	}
}