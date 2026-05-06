/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PM          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1040518  Kevin       Gabby       1040134     新增EDI105綜合批次核可捷徑作業
 * 1050422	Cloud		Joe 		1050087		二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
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
function ReturnValue(strName)
{
		var strParam = GetAllParamStr();
		if(strParam == "")
			strParam = "?";
		if(strName=="公文展期批次核可作業")
		{
			var strUrl = "../../../ED/ED2/EDT221.aspx" + strParam;
			var ret = jf_OpenChildWin(strUrl, "EDT221",1000,600);
		}
		else if(strName=="專案申請批次核可作業")
		{
			var strUrl = "../../../ED/ED2/EDT251.aspx" + strParam;
			var ret = jf_OpenChildWin(strUrl, "EDT251",1000,600);
		}
		else if(strName=="專案通案申請批次核可作業")
		{
			var strUrl = "../../../ED/ED2/EDT256.aspx" + strParam;
			var ret = jf_OpenChildWin(strUrl, "EDT256",1000,600);
		}
}
function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location.search);	//一樣要經過解碼
	if( pUrl != -1 )
		return pUrl;
	return strParam;
}