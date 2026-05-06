/*
DATE	SA		PRG		MGR_NO		DESC
1110214	David	Joe		1101455		新增程式WEI001 單位人員查詢子視窗
1120901 Kevin	Joe 	1120709 	弱掃修正Client Potential XSS
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

window.onunload = fnWindowOnUnLoad;
function fnWindowOnUnLoad()
{
	window.returnValue = true;
}

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
		return;

	switch (xObjectName) {
		case "btDeptAdd":
		case "btPersonAdd":
			Page_BlockSubmit = true;
			var AddList = CheckBeforeAdd(xObjectName);
			if (AddList != "") {
				dgBackAdd(AddList);
            }
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;
			for (var iRow = 0; iRow < document.all.dgBack.childNodes[1].childNodes.length - 2; iRow++) {
				document.all["cbBack" + iRow].checked = true;
			}
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			for (var iRow = 0; iRow < document.all.dgBack.childNodes[1].childNodes.length - 2; iRow++) {
				document.all["cbBack" + iRow].checked = !document.all["cbBack" + iRow].checked;
			}
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = true;
			var bDelete = false;
			var AddList = '';

			for (var iRow = 0; iRow < document.all.dgBack.childNodes[1].childNodes.length - 2; iRow++) {
				if (document.all["cbBack" + iRow].checked)
					bDelete = true;
				else
					AddList += document.all["txBack" + iRow].value + "|";
			}
			if (bDelete == false)
				alert('請至少選擇一筆資料');
			else {
				BackList = new Array();
				nTbBackRowNow = 1;
				nTbBackRowMax = 0;
				for (var iDel = document.all.dgBack.childNodes[1].childNodes.length - 1; iDel > 1; iDel--) {
					document.all.dgBack.childNodes[1].childNodes[iDel].outerHTML = '';
				}
				dgBackAdd(AddList);
            }
			break;
	}
}

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
		return;

	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btCheck":
			Page_BlockSubmit = true;
			if(document.all.dgBack.rows.length <= 1)
				alert('請先設定單位或人員');
			else{
				var RtnValue = '';
				for (var iRow = 0; iRow < document.all.dgBack.childNodes[1].childNodes.length - 2; iRow++){
					if(document.all["txBack" + iRow].value.split('^')[2] != "")
						RtnValue += document.all["txBack" + iRow].value.split('^')[3] + "、";
					else
						RtnValue += document.all["txBack" + iRow].value.split('^')[1] + "、";
				}
				RtnValue = RtnValue.substring(0, RtnValue.length-1);
				var $dlg = parent.$("#WEI001_DIV");//找到母視窗關閉鈕位置
				var $btn = $dlg.find("a#WEI001Dlg_close_btn");
				parent.$("#WEI001_DIV").find("#txWEI001RtnValue").val(RtnValue);//將回傳值設定
				$btn.click();
			}
			break;
		case "btQuit":
			Page_BlockSubmit = true;
			var $dlg = parent.$("#WEI001_DIV");//找到母視窗關閉鈕位置
			var $btn = $dlg.find("a#WEI001Dlg_close_btn");
			parent.$("#WEI001_DIV").find("#txWEI001RtnValue").val('');//將回傳值設定
			$btn.click();
			break;
	}
}



function ClientOnLoad()
{	
}



//回傳物件
function CallBack()
{
}

function GetUser(argOrgNo, argDeptNo, argDeptName) {
	var Rtn = WebEditWs.WEI001.GetUser(argOrgNo, argDeptNo).value;
	if (Rtn != "") {
		var UserList = Rtn.split('|');
		//init DgPerson
		for (var iDel = document.all.dgPerson.childNodes[1].childNodes.length - 1; iDel > 1; iDel--) {
			document.all.dgPerson.childNodes[1].childNodes[iDel].outerHTML = '';
        }
		var nTableRowNow = 1;
		var nTableRowMax = 0;
		for (var i = 0; i < UserList.length; i++) {
			var Username = UserList[i].split('^')[0];
			var Empname = UserList[i].split('^')[1];

			var NewRow = document.all.dgPerson.insertRow(nTableRowNow);

			for (var j = 0; j < 2; j++)
				document.all.dgPerson.rows[nTableRowNow].insertCell(j);

			document.all.dgPerson.rows[nTableRowNow].cells[0].innerHTML = "<INPUT id=\"cbPerson" + nTableRowMax + "\" type=\"checkbox\">";
			document.all.dgPerson.rows[nTableRowNow].cells[1].innerHTML = Empname + "<INPUT id=\"txPerson" + nTableRowMax + "\" type=\"hidden\" value=\"" + argDeptNo + "^" + argDeptName + "^" + Username + "^" + Empname + "\">";

			$(NewRow).attr('style', 'text-align:left');
			nTableRowNow++;
			nTableRowMax++;
        }
    }
}

function CheckBeforeAdd(argAddName) {
	var bCheck = false;
	var AddList = '';
	if (argAddName == "btDeptAdd") {
		for (var iRow = 2; iRow < document.all.dgDept.rows.length + 1; iRow++) {
			if (document.all["dgDept__ctl" + iRow + "_cbDept"].checked) {
				bCheck = true;
				AddList += document.all["dgDept__ctl" + iRow + "_txDept"].value + "|";
				document.all["dgDept__ctl" + iRow + "_cbDept"].checked = false;
			}
		}
	}
	else if (argAddName == "btPersonAdd") {
		for (var iRow = 0; iRow < document.all.dgPerson.childNodes[1].childNodes.length - 2; iRow++) {
			if (document.all["cbPerson" + iRow].checked) {
				bCheck = true;
				AddList += document.all["txPerson" + iRow].value + "|";
				document.all["cbPerson" + iRow].checked = false;
			}
		}
	}

	if (!bCheck) {
		alert('請至少選擇一筆資料');
		return '';
	}
	else
		return AddList;
}

var BackList = new Array();
var nTbBackRowNow = 1;
var nTbBackRowMax = 0;

function dgBackAdd(AddList) {
	var AddUser = AddList.split('|');
	var ErrMsg = '';
	for (var i = 0; i < AddUser.length; i++) {
		if (AddUser[i] == "")
			continue;
		//依ou_id、username判斷若資料已存在DG內，則alert且不加入該筆資料
		if(AddUser[i].split('^')[2] != "" && BackList.indexOf(AddUser[i].split('^')[2]) != -1){
			ErrMsg += AddUser[i].split('^')[3] + "、";
			continue;
		}
		else if(AddUser[i].split('^')[2] == "" && BackList.indexOf(AddUser[i].split('^')[0]) != -1){
			ErrMsg += AddUser[i].split('^')[1] + "、";
			continue;
		}
		
		if(AddUser[i].split('^')[2] != "")
			BackList.push(AddUser[i].split('^')[2]);
		else
			BackList.push(AddUser[i].split('^')[0]);
		
		var NewRow = document.all.dgBack.insertRow(nTbBackRowNow);
		for (var j = 0; j < 2; j++)
			document.all.dgBack.rows[nTbBackRowNow].insertCell(j);

		document.all.dgBack.rows[nTbBackRowNow].cells[0].innerHTML = "<INPUT id=\"cbBack" + nTbBackRowMax + "\" type=\"checkbox\">";
		if (AddUser[i].split('^')[2] != "")
			//1120901 Joe 1120709 弱掃修正Client Potential XSS
			// document.all.dgBack.rows[nTbBackRowNow].cells[1].innerHTML = AddUser[i].split('^')[3] + "<INPUT id=\"txBack" + nTbBackRowMax + "\" type=\"hidden\" value=\"" + AddUser[i] + "\">";
			document.all.dgBack.rows[nTbBackRowNow].cells[1].innerHTML = HtmlEncode(AddUser[i].split('^')[3]) + "<INPUT id=\"txBack" + HtmlEncode(nTbBackRowMax) + "\" type=\"hidden\" value=\"" + HtmlEncode(AddUser[i]) + "\">";
		else
			//1120901 Joe 1120709 弱掃修正Client Potential XSS
			// document.all.dgBack.rows[nTbBackRowNow].cells[1].innerHTML = AddUser[i].split('^')[1] + "<INPUT id=\"txBack" + nTbBackRowMax + "\" type=\"hidden\" value=\"" + AddUser[i] + "\">";
			document.all.dgBack.rows[nTbBackRowNow].cells[1].innerHTML = HtmlEncode(AddUser[i].split('^')[1]) + "<INPUT id=\"txBack" + HtmlEncode(nTbBackRowMax) + "\" type=\"hidden\" value=\"" + HtmlEncode(AddUser[i]) + "\">";

		$(NewRow).attr('style', 'text-align:left');
		nTbBackRowNow++;
		nTbBackRowMax++;
	}
	
	if(ErrMsg != "")
		alert(ErrMsg.substring(0, ErrMsg.length-1) + '已存在，無法再次新增');
}


//1120901 Joe 1120709 弱掃修正Client Potential XSS
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}