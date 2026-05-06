/*
DATE		SA		PRG		MGR_NO	DESC
0960706		Charles	Charles	------	(台科大)每次加入要能自動捲動到該列
1020415		Leslie	Jagle	1020269	(台科大)開啟AKM330時增加傳入權杖
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1031120     Kevin   Kenny   1030836 配合SSL調整使用的網址協定
1061027		Cloud	Kevin_C	1050087	升二代
1120831		Kevin   Joe		1120709	弱掃修正XSS
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

//指定DataGrid欄位


//1061027	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

strSelectedNo="";
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1061027	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	if(document.all.dg1!=null)
	{
		if(document.all["dg1__ctl2_cbSelect"]==null)
			var strDisable= "disabled";
		else
			var strDisable= "";
		var dgRows =document.all.dg1.rows.length;
		for (var RowCount=2 ; RowCount < dgRows+1; RowCount++)
		{
			if(RowCount ==2)
			{
				document.all["dg1__ctl"+RowCount+"_rbMainNo"].outerHTML = "<input  type='radio' name='Main' value='"+RowCount+"'  onclick='jf_rbMain("+RowCount+")' Checked "+strDisable+" />";
				if(document.all["dg1__ctl"+RowCount+"_cbSelect"]!=null)
					document.all["dg1__ctl"+RowCount+"_cbSelect"].disabled=true;
				document.all.h_txComNo.value=RowCount;
			}
			else
				document.all["dg1__ctl"+RowCount+"_rbMainNo"].outerHTML = "<input  type='radio' name='Main' value='"+RowCount+"' onclick='jf_rbMain("+RowCount+")' "+strDisable+" />";
		}
		strSelectedNo=dgRows-1;;
		//1061027	Kevin_C	1050087	升二代
		//document.all.tdSelNo.innerText = "已選取 "+strSelectedNo+" 筆 / 共"+strSelectedNo+" 筆";
		document.all.tdSelNo.textContent = "已選取 "+strSelectedNo+" 筆 / 共"+strSelectedNo+" 筆";
	}
}


/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{

}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061027	Kevin_C	1050087	升二代
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
	
	//1061027	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	switch (xObjectName)
	{
		case "btSave":
				beforeSvae();
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
				//1061027	Kevin_C	1050087	升二代
				//jf_ToolBarSubmit();	
				jf_ToolBarSubmit(xObjectName);	
			break;
		case "btClean":
			Page_BlockSubmit = false;
			//1061027	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/


/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
		if(jf_IsWebServiceSuccess(argResult))
		{
			var blAdd= true;
			var strRow = document.all.h_txComNo.value;
			//1061027	Kevin_C	1050087	升二代
			//var strComNo = document.all["dg1__ctl"+strRow+"_hlDocNo"].innerText;
			var strComNo = document.all["dg1__ctl"+strRow+"_hlDocNo"].textContent;
			//var strFileNoO = document.all["dg1__ctl2_lbFileNo"].innerText+document.all["dg1__ctl2_lbFileVS"].innerText;
			var strFileNoO = document.all["h_txFileNo"].value;
			//1061027	Kevin_C	1050087	升二代 -S
			//var strDeptNo = document.all["dg1__ctl"+strRow+"_h_lbDeptNo"].innerText;
			//var strUserId = document.all["dg1__ctl"+strRow+"_h_lbUserId"].innerText;
			var strDeptNo = document.all["dg1__ctl"+strRow+"_h_lbDeptNo"].textContent;
			var strUserId = document.all["dg1__ctl"+strRow+"_h_lbUserId"].textContent;
			//1061027	Kevin_C	1050087	升二代 -E
			
			var strDocNo = argResult.value.DocNo;		
			var strFileNoN = argResult.value.FileNo;
			//if(strFileNoN.indexOf("0",0)==0)
				//strFileNoN = strFileNoN.substr(1,strFileNoN.length-1);

			if(strDocNo !="")
			{ 
				if(argResult.value.ComNo !="" && argResult.value.ComNo != strComNo)
				{
					alert("公文文號"+strDocNo+"已有併案關係，請解其除併案關係。");
					document.all.txWitNo.value="";
					//1061027	Kevin_C	1050087	升二代
					//document.all["txWitNo"].focus();
					$('#txWitNo').focus();
					return;
				}
				var strMsg = "";
				if(strFileNoN!= "----"&&strFileNoO != strFileNoN)
				{
					strMsg += "目前加入之文號"+strDocNo+"：\n檔號與主號之檔號不同，設定併案關聯後原檔號將修正與主號相同!!";
					/*blAdd = confirm("目前加入之文號"+strDocNo+"之檔號與主號之檔號不同，\n設定併案關聯後原檔號將修正與主號相同，是否進行加入");
					if(blAdd == false)
					{
						document.all.txWitNo.value="";
						document.all["txWitNo"].focus();
						return;
					}*/
				}
				if(argResult.value.DeptNo != strDeptNo || argResult.value.UserName !=strUserId )
				{
					if(strMsg == "")
						strMsg += "目前加入之文號"+strDocNo+"：";
					strMsg += "\n承辦單位與主號之承辦單位不同!!";
					/*blAdd = confirm("目前加入之文號"+strDocNo+"之承辦單位與主號之承辦單位不同，\n是否進行加入");
					if(blAdd == false)
					{
						document.all.txWitNo.value="";
						document.all["txWitNo"].focus();
						return;
					}*/
				}
				if(strMsg != "")
				{
					strMsg += "\n\n是否仍要加入?";
					blAdd = confirm(strMsg);
					if(blAdd == false)
					{
						document.all.txWitNo.value="";
						//1061027	Kevin_C	1050087	升二代
						//document.all["txWitNo"].focus();
						$('#txWitNo').focus();
						return;
					}
				}
			}
			else 
			{
				alert("無法取得公文文號"+document.all.txWitNo.value+"之資料");
				blAdd = false;
			}
				
			if(blAdd == true)
				AddDocInfo(argResult.value);
		}
			document.all["txWitNo"].value = "";
			//1061027	Kevin_C	1050087	升二代
			//document.all["txWitNo"].focus();
			$('#txWitNo').focus();
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

}

function ReturnValue(argDocNo)
{
	/*
	var strArtifact = document.all.Artifact.value;
	var strODWebPath = document.all.ODWebPath.value;
	var strUrl = strODWebPath+"ODI260.aspx?SAMLart="+strArtifact+"&pDocNo="+argDocNo;
	jf_OpenChildWin_ForEAT221(strUrl, "ODI260", 700, 500 );
	*/
	Page_BlockSubmit = true;
	var OrgNo = jf_Trim(document.all.nOrgNo.value);
	var OrgName = jf_Trim(document.all.nOrgName.value);
	var DeptNo = jf_Trim(document.all.nDeptNo.value);
	var EmpName = jf_Trim(document.all.nEmpName.value);
	var UserName = jf_Trim(document.all.nUserName.value);
	var ServerName = document.all.nServerName.value;
	//1020415	Jagle	[1020269]	增加傳入權杖
	//var pUrl = "http:\\\\"+ServerName+"\\AK\\AKM330.aspx?argDocNo=" + argDocNo + "&argMode=m&ORG_NO="+OrgNo+"&DEPT_NO="+DeptNo+"&EMP_NAME="+escape(EmpName)+"&ORG_NAME="+escape(OrgName)+"&USERNAME="+UserName+"&CallerID=EAT220";
	var Artifact = document.all["SsoArtifact"].value;
	//1061027	Kevin_C	1050087	升二代 -S
	//var pUrl = "http:\\\\"+ServerName+"\\AK\\AKM330.aspx?SAMLart="+Artifact+"&argDocNo=" + argDocNo + "&argMode=m&ORG_NO="+OrgNo+"&DEPT_NO="+DeptNo+"&EMP_NAME="+escape(EmpName)+"&ORG_NAME="+escape(OrgName)+"&USERNAME="+UserName+"&CallerID=EAT220";
    ////alert(pUrl);
    ////1031120   Kenny   [1030836]   配合SSL調整使用的網址協定
	//if (document.all.II_USE_SSL != null) {
	//    if (document.all.II_USE_SSL.value == "Y")
	//        pUrl = pUrl.replace("http:\\", "https:\\");
	//}
	var pUrl = "../../../AK/AKM330.aspx?SAMLart=" + Artifact + "&argDocNo=" + argDocNo + "&argMode=m&ORG_NO=" + OrgNo + "&DEPT_NO=" + DeptNo + "&EMP_NAME=" + escape(EmpName) + "&ORG_NAME=" + escape(OrgName) + "&USERNAME=" + UserName + "&CallerID=EAT220";
	//1061027	Kevin_C	1050087	升二代 -E
	jf_OpenChildWin_ForEAT221(pUrl, "AKM330", 900, 768);
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function txWitNo_Onblur()
{
	Page_BlockSubmit = true;
	var strDocNo = document.all.txWitNo.value;
	if(strDocNo.length ==9)
	  strDocNo = "0"+strDocNo; 
	  
	document.all.txWitNo.value= strDocNo;
	if(strDocNo =="")
	{
		return;
	}
	if (document.all.dg1 == null)
	{
	    Page_BlockSubmit = false;
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	    IsServerHandling = true;
		__doPostBack("txWitNo",0);
	}
	else
	{
		if(CheckInDg(strDocNo))
		{
			alert("公文文號"+strDocNo+"已列於下方待設定併案公文清單中，請重新輸入");
			document.all.txWitNo.value="";
			//1061027	Kevin_C	1050087	升二代
			//document.all["txWitNo"].focus();
			$('#txWitNo').focus();
		}
		else
		{
			var arWSParam = new Array(2);
			arWSParam[0] = strDocNo;
			arWSParam[1] = "-";
			CallWsObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ChkDocInfo", false, arWSParam); //使用WebService前必須先呼叫一次
			OnWSResult(CallWsObj);
		}		
	}
}

function CheckInDg(argDocNo)
{
	for (var RowCount=2 ; RowCount < document.all.dg1.rows.length+1; RowCount++)
	{
		//1061027	Kevin_C	1050087	升二代
		//if (document.all["dg1__ctl"+RowCount+"_hlDocNo"].innerText == argDocNo)
		if (document.all["dg1__ctl"+RowCount+"_hlDocNo"].textContent == argDocNo)
			return true;
	}
	return false;
}

function jf_rbMain(argRow)
{
	if(document.all["dg1__ctl2_cbSelect"]!=null)
	{
		var MRow=document.all.h_txComNo.value;
		document.all["dg1__ctl"+MRow+"_cbSelect"].disabled=false;
		document.all.h_txComNo.value = argRow;
		if(!document.all["dg1__ctl"+argRow+"_cbSelect"].checked)
		{
			document.all["dg1__ctl"+argRow+"_cbSelect"].checked=true;
			strSelectedNo++;
			//1061027	Kevin_C	1050087	升二代
			//document.all.tdSelNo.innerText = "已選取 "+strSelectedNo+" 筆 / 共"+(document.all.dg1.rows.length-1)+" 筆";
			document.all.tdSelNo.textContent = "已選取 "+strSelectedNo+" 筆 / 共"+(document.all.dg1.rows.length-1)+" 筆";
		}
		document.all["dg1__ctl"+argRow+"_cbSelect"].disabled=true;	
	}
}

function AddDocInfo(argValue)
{
	var iRow = document.all.dg1.rows.length+1;
	var strInsert="";
	rowArray = dg1.insertRow();
	if((iRow%2)==1)
		rowArray.bgColor="#EEFFDD";
	else
		rowArray.bgColor="white";
		
	c1 = rowArray.insertCell();
	c1.align = "Center";
	c1.innerHTML ="<span id='dg1__ctl"+iRow+"_lbSEQ_NO' style='font-family:細明體;font-size:Small;width:30px;'>"+(iRow-1)+"</span>";
	c1 = rowArray.insertCell();
	c1.align = "Center";
	c1.innerHTML ="<span style='width:38px;'><input  type='radio' name='Main' value='"+iRow+"' onclick='jf_rbMain("+iRow+")' /></span>";
	c1 = rowArray.insertCell();
	c1.align = "Center";
	c1.innerHTML ="<span style='width:38px;'><input id='dg1__ctl"+iRow+"_cbSelect' type='checkbox' name='dg1:_ctl"+iRow+":cbSelect' checked='checked' onclick='jf_cbSel(this)'  /></span>";
	c1 = rowArray.insertCell();
	c1.align = "Center";
	//1120831	Joe		1120709		弱掃修正XSS
	// c1.innerHTML ="<a id='dg1__ctl"+iRow+"_hlDocNo' href='javascript:ReturnValue(\""+argValue.DocNo+"\")' style='font-family:細明體;font-size:Small;width:86px;'>"+argValue.DocNo+"</a>";
	c1.innerHTML ="<a id='dg1__ctl"+iRow+"_hlDocNo' href='javascript:ReturnValue(\""+Htmlencode(argValue.DocNo)+"\")' style='font-family:細明體;font-size:Small;width:86px;'>"+Htmlencode(argValue.DocNo)+"</a>";
	c1 = rowArray.insertCell();
	c1.align = "Left";
	//1120831	Joe		1120709		弱掃修正XSS
	// c1.innerHTML ="<span id='dg1__ctl"+iRow+"_lbSub' style='font-family:細明體;font-size:Small;width:326px;'>"+argValue.FromSubject+"</span>";
	c1.innerHTML ="<span id='dg1__ctl"+iRow+"_lbSub' style='font-family:細明體;font-size:Small;width:326px;'>"+Htmlencode(argValue.FromSubject)+"</span>";
	c1 = rowArray.insertCell();
	c1.align = "Left";
	strInsert = "<span id='dg1__ctl"+iRow+"_lbFileNo' style='font-family:細明體;font-size:Small;width:118px;'></span><BR>";
	strInsert+="<span id='dg1__ctl"+iRow+"_lbFileVS' style='font-family:細明體;font-size:Small;width:76px;'></span>";
	c1.innerHTML =strInsert;
	c1 = rowArray.insertCell();
	c1.align = "Center";
	//1120831	Joe		1120709		弱掃修正XSS
	// strInsert   = "<span id='dg1__ctl"+iRow+"_lbDept' style='font-family:細明體;font-size:Small;'>"+argValue.DeptName+"</span>"
	// strInsert += "<span id='dg1__ctl"+iRow+"_h_lbDeptNo' class='hide' style='font-family:細明體;font-size:XX-Small;width:4px;'>"+argValue.DeptNo+"</span><BR>";
	// strInsert += "<span id='dg1__ctl"+iRow+"_lbUser' style='font-family:細明體;font-size:Small;'>"+argValue.EmpName+"</span>";
	// strInsert += "<span id='dg1__ctl"+iRow+"_h_lbUserId' class='hide' style='font-family:細明體;font-size:XX-Small;width:4px;'>"+argValue.UserName+"</span>"
	strInsert   = "<span id='dg1__ctl"+iRow+"_lbDept' style='font-family:細明體;font-size:Small;'>"+Htmlencode(argValue.DeptName)+"</span>"
	strInsert += "<span id='dg1__ctl"+iRow+"_h_lbDeptNo' class='hide' style='font-family:細明體;font-size:XX-Small;width:4px;'>"+Htmlencode(argValue.DeptNo)+"</span><BR>";
	strInsert += "<span id='dg1__ctl"+iRow+"_lbUser' style='font-family:細明體;font-size:Small;'>"+Htmlencode(argValue.EmpName)+"</span>";
	strInsert += "<span id='dg1__ctl"+iRow+"_h_lbUserId' class='hide' style='font-family:細明體;font-size:XX-Small;width:4px;'>"+Htmlencode(argValue.UserName)+"</span>"
	c1.innerHTML =strInsert;
	strSelectedNo++;
	//1061027	Kevin_C	1050087	升二代
	//document.all.tdSelNo.innerText = "已選取 "+strSelectedNo+" 筆 / 共"+(iRow-1)+" 筆";
	document.all.tdSelNo.textContent = "已選取 "+strSelectedNo+" 筆 / 共"+(iRow-1)+" 筆";

	//[問題單] Charles (台科大)每次加入要能自動捲動到該列 0960706
	document.all.dg1.rows(document.all.dg1.rows.length-1).scrollIntoView(false);
}

function beforeSvae()
{
	if(document.all.dg1!=null)
	{
		var strSelect="";
		var strUnSelect="";
		var iRow = document.all.h_txComNo.value;
		for (var RowCount=2 ; RowCount < document.all.dg1.rows.length+1; RowCount++)
		{
			if(RowCount != iRow)
			{
				if(document.all["dg1__ctl"+RowCount+"_cbSelect"].checked==true)
				{
					if(strSelect !="")
						strSelect += "','";
					//1061027	Kevin_C	1050087	升二代
					//strSelect += document.all["dg1__ctl"+RowCount+"_hlDocNo"].innerText; 
					strSelect += document.all["dg1__ctl"+RowCount+"_hlDocNo"].textContent; 
				}
				else
				{
					if(strUnSelect !="")
						strUnSelect += "','";
					//1061027	Kevin_C	1050087	升二代
					//strUnSelect += document.all["dg1__ctl"+RowCount+"_hlDocNo"].innerText; 
					strUnSelect += document.all["dg1__ctl"+RowCount+"_hlDocNo"].textContent; 
				}
			}
		}
		document.all.h_txDocNo.value="'"+strSelect+"'|'"+strUnSelect+"'";
		//1061027	Kevin_C	1050087	升二代
		//document.all.h_txComNo.value=document.all["dg1__ctl"+iRow+"_hlDocNo"].innerText; 
		document.all.h_txComNo.value=document.all["dg1__ctl"+iRow+"_hlDocNo"].textContent; 
	}		
}
function jf_cbSel(argThis)
{
	if(argThis.checked ==true)
		strSelectedNo++;
	else
		strSelectedNo--;
	//1061027	Kevin_C	1050087	升二代
	//document.all.tdSelNo.innerText = "已選取 "+strSelectedNo+" 筆 / 共"+(document.all.dg1.rows.length-1)+" 筆";
	document.all.tdSelNo.textContent = "已選取 "+strSelectedNo+" 筆 / 共"+(document.all.dg1.rows.length-1)+" 筆";
}


//Charles (台科大)子視窗須有Scrollbar 0960531
function jf_OpenChildWin_ForEAT221(argUrl, argWinName, argWidth, argHeight)
{
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
	strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";
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
    //1031120   Kenny   [1030836]   配合SSL調整使用的網址協定
	if (document.all.II_USE_SSL != null) {
	    if (document.all.II_USE_SSL.value == "Y")
	        argUrl = argUrl.replace("http://", "https://");
	}

	gWindowID = window.open(argUrl, "", strWinStyle);
	gWindowID.focus();

	arrWin[arrWin.length] = new Array();
	arrWin[arrWin.length - 1][0] = argWinName;
	arrWin[arrWin.length - 1][1] = gWindowID;
	return gWindowID;
}

//1120831	Joe		1120709		弱掃修正XSS
function Htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}