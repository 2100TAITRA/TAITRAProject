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
	TBI140.location = "TBI140.aspx" + strParam;

	//TBI150.location = "TBI150.aspx?SAMLart=" + strSAMLart + "&SeqNo=" + strSeqNo +  "&BulletinId=" + strBulletinId; 
	//TBI160.location = "TBI160.aspx?SAMLart=" + strSAMLart + "&SeqNo=" + strSeqNo +  "&BulletinId=" + strBulletinId; 
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
	//TBI140.location = "TBI140.aspx?SAMLart=" + strSAMLart + "&SeqNo=" + iCount +  "&BulletinId=" + argBulletinId  + "&BulletinNum=" + BulletinNum; 
	//TBI140.location = "TBI140.aspx?SAMLart=" + strSAMLart + "&SeqNo=&BulletinId=" + argBulletinId; 
	//TBI160.location = "TBI160.aspx?SAMLart=" + strSAMLart + "&SeqNo=&BulletinId=" + argBulletinId; 
	return BulletinNum;
}

function fnDownload()
{
	TBI140.fnDownload();
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
		//window.close();//0980904	David	使用FRAME方式無法關閉視窗
	}
}