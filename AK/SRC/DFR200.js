/*
DATE 	SA		PRG		MGR_NO		DESC
1060426	Cloud	Joe		1050087		二代升級
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060426	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060426	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}

//1060426	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060426	Joe	1050087	二代系統升級
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
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

//1060426	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060426	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			
			//1060426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			
			//1060426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			
			//1060426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			
			//1060426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
		case "btSearch":
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			break;
		case "btPreview":
			var Sdate=document.all["tbSCN_DATE1"].value;
		    var Edate=document.all["tbSCN_DATE2"].value;
		
		   if(Sdate=="" || Edate=="")
		   {
		     alert("請指定掃描期間"); 
		     Page_BlockSubmit = true;
		     if(Sdate=="")
			//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["tbSCN_DATE1"].focus();
			$('#tbSCN_DATE1').focus();
		     else
			//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["tbSCN_DATE2"].focus();
			$('#tbSCN_DATE2').focus();
		   }
		   else
		   {
		      if(Sdate.length<7)
		      {
		         ADD_ZERO('tbSCN_DATE1')
		         Sdate=document.all["tbSCN_DATE1"].value;
		      }
		      
		      if(Edate.length<7)
		      {
		         ADD_ZERO('tbSCN_DATE2')
		         document.all["tbSCN_DATE2"].value;
		      }
		     
		      if(Sdate>Edate)
		      {
		         alert("掃描期間起不可以大於迄");
				//1060426	Joe	1050087	二代系統升級，調整focus寫法
				//document.all["tbSCN_DATE1"].focus();
				$('#tbSCN_DATE1').focus();
		         Page_BlockSubmit = true;
		      }
		      else
		      {
				Page_BlockSubmit = false;
				jf_ShowWaitState();
				IsServerHandling = true;				
				//1060426	Joe	1050087	二代系統升級
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
		      }
		    
		   }
		    
			
    		break;
	}
}
function Upper()    //轉換大寫方程式
{
	if (event.keyCode >= 97 && event.keyCode <=122)
		event.keyCode = event.keyCode - 32;	
		
		
  if(document.all["tbDOC_NO"].value!="")
  {
     document.all('rbADJUST_0').checked="checked"
  }
}

function number_check() //只限定數字輸入的方程式
{

  if(window.event.keyCode < 48 || window.event.keyCode > 57)
  window.event.returnValue=false;
}

function ADD_ZERO(DateField)
{
  var DATE=document.all[DateField].value;
  var i;
  var ZERO="";
 
 if(DATE != "")
		for(i=DATE.length;i<7;i++)
			ZERO+="0";
    
    document.all[DateField].value=ZERO+DATE;
    check(document.all[DateField])
}


function check(T)   //日期合法性檢查
{
  if(T.readOnly==false)
  {
    if((document.activeElement.id!="btCANCEL"))
    {
      if(!CheckCDATE(T.value))
      {
        if(T==document.all["tbSCN_DATE1"])
        {
         alert("掃描起值日期不合法,請重新輸入");
			//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["tbSCN_DATE1"].focus();
			$('#tbSCN_DATE1').focus();
         Page_BlockSubmit = true;
        }
        else
        {
         alert("掃描迄值日期不合法,請重新輸入");
			//1060426	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["tbSCN_DATE2"].focus();
			$('#tbSCN_DATE2').focus();
         Page_BlockSubmit = true;
        } 
       
      }
    }
  }
}

function CheckCDATE(Q)
{
  var pYear,pMonth,pDay;
  pYear=parseInt(Q.substring(0,3),10)+1911;
  pMonth=parseInt(Q.substring(3,5),10);
  pDay=parseInt(Q.substring(5,7),10);
  
   if(!ValidDate(pYear,pMonth-1,pDay))
   {
     return false
   }
   else
   {
     return true
   }
 }


function ValidDate(y,m,d)
{
  with(new Date(y,m,d)) return ((getDate()==d) && (getMonth()==m))
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060426	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

