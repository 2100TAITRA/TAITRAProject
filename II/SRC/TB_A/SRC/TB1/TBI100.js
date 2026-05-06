/*
DATE	SA		PRG		MGR_NO		DESC
1000418	David	David	1000280		新增「排除代理人查閱」條件
1010924	David	Cloud	1010533		[僑委會]進階查詢新增承辦人、承辦單位查詢條件
1040612	Cloud	Kevin_C	1040278		多傳入參數決定升冪或降冪排序
1140630 Zen		1140299		Daniel	新增查詢過期公文功能。
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
	var strSAMLart	= GetParam("SAMLart");
	var strUserKey	= GetParam("UserId");
	if(strUserKey =="")
	{
		TBI110.location = "TBI110.aspx?SAMLart=" + strSAMLart; 
		TBI120.location = "TBI120.aspx?SAMLart=" + strSAMLart;
	}
	else
	{
		TBI110.location = "TBI110.aspx?SAMLart=" + strSAMLart +"&UserId="+strUserKey; 
		TBI120.location = "TBI120.aspx?SAMLart=" + strSAMLart +"&UserId="+strUserKey;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1000418 David 1000280 多傳入「排除代理人查閱」條件
//function fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead)
//1010924	Cloud	1010533		[僑委會]進階查詢新增承辦人、承辦單位查詢條件
//function fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead,argRemoveProxyRead)
//1040612	Kevin_C	1040278	多傳入參數決定升冪或降冪排序
//function fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead,argRemoveProxyRead,argAccount,argRpsDeptNo)
//1140630	Daniel 1140299	新增查詢過期公文功能。
//function fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead,argRemoveProxyRead,argAccount,argRpsDeptNo,argSortWay)
function fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank, argShowNoRead, argRemoveProxyRead, argAccount, argRpsDeptNo, argSortWay, argSearchExpire)
{
	try{
		//1000418 David 1000280 多傳入「排除代理人查閱」條件
		//TBI120.fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead);
		//1010924	Cloud	1010533		[僑委會]進階查詢新增承辦人、承辦單位查詢條件
		//TBI120.fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead,argRemoveProxyRead);
		//1040612	Kevin_C	1040278	多傳入參數決定升冪或降冪排序
		//TBI120.fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank ,argShowNoRead,argRemoveProxyRead,argAccount,argRpsDeptNo);
		//1140630	Daniel 1140299	新增查詢過期公文功能。
		//TBI120.fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank, argShowNoRead, argRemoveProxyRead, argAccount, argRpsDeptNo, argSortWay);
		TBI120.fnSetData(argDateS, argDateE, argDocNo, argBulletinID, argDeptNo, argCategoryID, argSubject, argRank, argShowNoRead, argRemoveProxyRead, argAccount, argRpsDeptNo, argSortWay, argSearchExpire);
	}
	catch(ex){};
}

function fnSearch()
{
	try{
		TBI120.fnSearch();
	}
	catch(ex){};
}

function fnSetSearchMode(argMode)
{
	try{
		TBI120.fnSetSearchMode(argMode);
	}
	catch(ex){};
}

function fnSetPageCount(argPageCount)
{
	try{
		TBI120.fnSetPageCount(argPageCount);
	}
	catch(ex){};
}

function fnGetArtifact()
{
	return GetParam("SAMLart");
}
function fnSetShowNoRead(argSetShowNoRead)
{
	try{
		TBI120.fnSetShowNoRead(argSetShowNoRead);
	}
	catch(ex){};
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

function fnServerHandle()
{
	try{
		TBI110.fnServerHandle();
	}
	catch(ex){};
}