<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR435.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR435" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR435 癳诀闽そゅ参璸</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR435" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label class="RequireField" id="Label2" runat="server">琩高る</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox class="RequireFieldNumeric" id="txMon" tabIndex="1" runat="server" Width="3em" MaxLength="5"></asp:textbox>
						</div>
						<div class="dTD">
							<asp:label runat="server" class="RequireField" id="Label3"> ⌒ </asp:label>
						</div>
						<div class="dTD">
							<asp:textbox class="RequireFieldNumeric" id="txMonE" tabIndex="1" runat="server" Width="3em" MaxLength="5"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label1" runat="server">厨Α</asp:label>
						</div>
						<div class="dTD">
							<asp:radiobuttonlist id="rblType" runat="server" tabIndex="15">
								<asp:ListItem Value="0" Selected="True">场</asp:ListItem>
								<asp:ListItem Value="1,そゅ参璸">そゅ参璸</asp:ListItem>
								<asp:ListItem Value="2,ミ猭〆借高ン参璸">ミ猭〆借高ン参璸</asp:ListItem>
								<asp:ListItem Value="3,チビ叫ン参璸">チビ叫ン参璸</asp:ListItem>
								<asp:ListItem Value="4,禗腀ン参璸">禗腀ン参璸</asp:ListItem>
								<asp:ListItem Value="5,きチ朝薄ン参璸">チ朝薄ン参璸</asp:ListItem>
								<asp:ListItem Value="6,せ盡恨ン参璸">盡恨ン参璸</asp:ListItem>
								<asp:ListItem Value="7,菏诡ン参璸">菏诡ン参璸</asp:ListItem>
								<asp:ListItem Value="8,疭ン参璸">疭ン参璸</asp:ListItem>
							</asp:radiobuttonlist>
						</div>
					</div>
				    <div class="dTR">
					    <div>
						    <asp:label id="lbMaxYear" runat="server">ヘ玡参璸程る</asp:label>
					    </div>
				    </div>
				</div>
				<div class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 12.5em">
						<asp:datagrid id="dg1" runat="server" Width="28em" PageSize="50" CellPadding="4" GridLines="Vertical"></asp:datagrid>
						<asp:textbox class="KeyUpperField" id="h_txYM" tabIndex="15" runat="server" CssClass="hidden" MaxLength="5" Width="3em"></asp:textbox>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="参璸" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="蹲Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"	runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
