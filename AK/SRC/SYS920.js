//1110705 Kevin 序137 修正選單開啟之程式無法抓到首頁問題

function ActionConfirm()
{   
	var xObjectName = document.activeElement.id;
	var ret;

	//alert(xObjectName);		
	//alert("Client端--SelectedIndexChange Event");		
    switch (xObjectName) 
    {
		
    }
}

function jf_OpenWindow(sUrl,sName)
{
    //var sName = sUrl.substring(0,sUrl.indexOf('.'));
    var pWidth=(screen.availWidth-360)/2;    //螢幕解析度之寬
    var pHeight=(screen.availHeight-300)/2;  //螢幕解析度之高
    
    oWindowID = open(sUrl,sName,"width=320,height=280,top="+pHeight+",left="+pWidth+"");
    
    oWindowID.focus();
}
function fnLoad()
{
	/*var version  = document.all.nVersion.value;
	if(version!="")
	{
		var webfile  = document.all.nWS.value;
		var rsrc     = document.all.nRsrc.value;
		var regType = "HKEY_CLASSES_ROOT";
		var regPath = "UniView.Document\\shell\\open\\command";
		document.all.UPD.U1(version,webfile,rsrc,
				regType,regPath);
	}*/

	var zNodes = JSON.parse($('#TreeJson').val())
	var zTreeNode = zNodes.NodeList.NodeItem1;
	for (var item in zNodes.NodeList.Node1)
		zTreeNode.push(zNodes.NodeList.Node1[item]);

	var zTreeSetting = {
		view: {
			selectedMulti: false,//是否可多點選擇
		},
		data: {
			key: {
				children: "NodeItem1",
				name: "@NodeTitle",
				//1110705 Kevin 不指定url由click處理
				//url:"@url",
			}
		},
		callback: {
			beforeClick: ProgBeforeClick,
			onClick: ProgOnClick
		}
	}

	$.fn.zTree.init($("#Classtree"), zTreeSetting, zTreeNode);
}


//1110520 Leslie[1110371] 純檔管升級二代	Leslie	改用純JS Tree
function ProgOnClick(event, treeId, treeNode) {
	
	//1110705 Kevin 修正取得url方式
	//if (treeNode.Url != undefined) {
		//theStart.ChildWin.push(window.open(treeNode.Url));
	if (treeNode['@url'] != undefined) {
		window.open(treeNode['@url']);
	}
		
	return false;
}

function ProgBeforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	if (treeNode.level > 0) {
		zTree.expandNode(treeNode);
		return true;
	}
	return true;
	//1110705 Kevin 修正無法觸發click問題
	//return false;
}
