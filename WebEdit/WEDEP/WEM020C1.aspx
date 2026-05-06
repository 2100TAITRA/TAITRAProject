<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="WEM020C1.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM020C1" %>

<!DOCTYPE HTML >
<html>
<head>
	<title>WEM020C1 群組批次匯入作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<!--#include file="/STDN/Lib/Script.shtml"-->
</head>
<body ms_positioning="GridLayout">
	<form id="WEM020C1" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_Orgno" runat="server" Width="8px" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Dept" runat="server" Width="8px" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Owner" runat="server" Width="8px" CssClass="hide"></asp:TextBox>
		</div>
		<div class="DivBaseTable" id="BaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 15em">
						<asp:Label class="KeyField" ID="Label1" runat="server">上傳檔案：</asp:Label>
					</div>
					<div class="dTD">
						<input id="txFile" type="file" name="txFile" multiple runat="server" style="width: 20em" size="49">
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 15em">
						<asp:Label class="InputFieldLabel" ID="Label2" runat="server">不匯入更新已存在的群組代碼：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButtonList class="InputFieldLabel" ID="rbUpdateOrgid" runat="server" RepeatDirection="Horizontal">
							<asp:ListItem Value="Y">是</asp:ListItem>
							<asp:ListItem Value="N" Selected="True">否</asp:ListItem>
						</asp:RadioButtonList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 15em">
						<asp:Label class="InputFieldLabel" ID="Label3" runat="server">匯入一筆失敗則全部不匯入：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButtonList class="InputFieldLabel" ID="rbAllimport" runat="server" RepeatDirection="Horizontal">
							<asp:ListItem Value="Y">是</asp:ListItem>
							<asp:ListItem Value="N" Selected="True">否</asp:ListItem>
						</asp:RadioButtonList>
					</div>
				</div>
			</div>
		</div>
		<asp:Panel CssClass="V2_GenericBannerToolBar" ID="tbTool" runat="server">
			<asp:Button ID="btImport" runat="server" Text="批次匯入" DefaultStyle="newmode:block;modifymode:block;" CausesValidation="False" />
		</asp:Panel>
	</form>
</body>
</html>
