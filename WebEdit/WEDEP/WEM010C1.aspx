<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="WEM010C1.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM010C1" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>機關群組檢索子視窗</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
	<link href="Template/LIB/common.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="stylesheet" href="lib/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<style>
			.ztree li a:hover,
			.ztree li a.curSelectedNode,
			.ztree li a span {
			    text-decoration: none !important;
			}
		</style>
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<!--#include file="/STDN/Lib/Script.shtml"-->
	<style>
		.TreeView {
			FONT-SIZE: 11pt;
			FONT-FAMILY: Arial;
		}

		.New {
			FONT-SIZE: 11pt;
			FONT-FAMILY: Arial;
			BACKGROUND-COLOR: #00cc66;
		}

		.Old {
			FONT-SIZE: 11pt;
			FONT-FAMILY: Arial;
			BACKGROUND-COLOR: #ff6633;
		}
	</style>
	
</head>
<body style="background-color: #c6d9ec" ms_positioning="GridLayout">
	<form id="WEM010C1" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
		    <asp:CustomValidator ID="CustomValidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
		    <asp:ValidationSummary ID="ValidationSummary2" runat="server"></asp:ValidationSummary>
		    <asp:ListBox ID="ListBox1" runat="server" Width="80px"></asp:ListBox>
		    <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
		</div>
		<div class="DivTable">
			<div class="DivTable" id="MTable1">
				<div class="dTR">
					<div class="dTDTitle" style="width: 16em">
						<asp:Button ID="btSave" TabIndex="10" runat="server" CssClass="sbttn" Text="確認"></asp:Button>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:Button ID="btExit" TabIndex="20" runat="server" CssClass="sbttn" Text="離開"></asp:Button>
					</div>
				</div>
				<div class="dTR">
					<fieldset id="fs1" style="width: 30em">
						<legend>搜尋範圍</legend>
						<div class="dTR">
							<asp:RadioButton ID="rbAll" TabIndex="30" runat="server" Text="全部" GroupName="rbGsearch" Checked="True"></asp:RadioButton><asp:RadioButton ID="rbGroup" TabIndex="40" runat="server" Text="群組" GroupName="rbGsearch"></asp:RadioButton><asp:RadioButton ID="rbOrg" TabIndex="50" runat="server" Text="只含機關" GroupName="rbGsearch"></asp:RadioButton><asp:CheckBox ID="cbFuzzy" TabIndex="60" runat="server" Text="模糊比對"></asp:CheckBox><asp:CheckBox ID="cbExpand" TabIndex="70" runat="server" Text="帶回時展開群組" Checked="True" Width="10em"></asp:CheckBox>
							<asp:CheckBox ID="cbDept" runat="server" Text="含單位" Checked="True"></asp:CheckBox>&nbsp;
						</div>
						<div class="dTR">
							<div class="dTDTitle">
								<asp:Label ID="Label3" runat="server">搜尋分類：</asp:Label>
							</div>
							<div class="dTD">
								<asp:CheckBox ID="cbUserid" runat="server" Text="個人"></asp:CheckBox>
								<asp:CheckBox ID="cbDeptid" runat="server" Text="部門" CssClass="hide"></asp:CheckBox>
								<asp:CheckBox ID="cbOrgid" runat="server" Text="全機關共用"></asp:CheckBox>
								<asp:CheckBox ID="cbOther" runat="server" Text="其他"></asp:CheckBox>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="DivTable" id="MTable2">
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label1" runat="server">機關代碼：</asp:Label>
					</div>
					<div class="dTD" style="width: 5.5em">
						<asp:TextBox ID="txOrgNo" TabIndex="80" runat="server" Width="5em" ></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 6em">
						<asp:Label ID="Label2" runat="server">機關名稱：</asp:Label>
					</div>
					<div class="dTD" style="width: 24em">
						<asp:TextBox ID="txOrgName" TabIndex="90" runat="server" Width="19em"></asp:TextBox>
						<asp:Button ID="btSearch" TabIndex="100" runat="server" CssClass="sbttn" Text="搜尋"></asp:Button>
					</div>
					
				</div>
			</div>
			<div class="DivTable" id="MTable3">
				<div class="dTR" id="trDetail">
					<div class="dTD">
						<fieldset id="Fieldset1" style="width: 40em" >
							<legend>搜尋結果</legend>
							<div class="dTD" id="detailDiv" style="overflow: auto; height: 15em; width: 100%;">
								<ul id="Classtree" class="ztree"></ul>
							</div>
						</fieldset>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD" style="width: 10em">
						<asp:Button ID="btOrgMgmt" TabIndex="120" runat="server" CssClass="sbttn" Text="機關維護"></asp:Button>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:Button ID="btGrpMgmt" TabIndex="130" runat="server" CssClass="sbttn" Text="群組維護"></asp:Button>
					</div>
				</div>
			</div>
			<asp:Label ID="lbResult" runat="server" Visible="False" ForeColor="Red">搜尋範圍過大，若要顯示全部搜尋結果請縮小範圍</asp:Label>
		</div>

		<div style="display: none; z-index: 105; left: 8px; visibility: hidden; overflow: auto">
			<asp:DataGrid ID="dg1" runat="server" ShowHeader="False" EnableViewState="False"></asp:DataGrid>
			<asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px"
				runat="server" CssClass="hidden"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px"
				runat="server" CssClass="hidden"></asp:ListBox>
		</div>
		<object id="IEControl" style="display: none" codebase="VerifyOcx.ocx" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88"
			viewastext>
		</object>
	</form>
</body>
<script type="text/javascript" src="lib/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="lib/jquery.ztree.exhide-3.5.js"></script>
</html>
