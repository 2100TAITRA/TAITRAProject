<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKT116C4.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT116C4" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>AKT116C4 檢視退文原因子視窗</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT116C4" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em" colSpan="1" rowSpan="1">
								<asp:Label id="Label1" runat="server">公文文號：</asp:Label></div>
						<div class="dTD" style="WIDTH: 25em">
								<asp:TextBox id="txDocNo" tabIndex="-1" runat="server" CssClass="DisplayOnly" Width="5.5em" ReadOnly="True"></asp:TextBox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
								<asp:Label id="Label2" runat="server">退文日時：</asp:Label></div>
						<div class="dTD" style="WIDTH: 25em">
								<asp:TextBox id="txDateTime" tabIndex="-1" runat="server" CssClass="DisplayOnly" Width="6.5em" ReadOnly="True"></asp:TextBox>
								<asp:TextBox id="H_IsClose" tabIndex="-1" runat="server" CssClass="hide"></asp:TextBox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
								<asp:Label id="Label4" runat="server">退文人員：</asp:Label></div>
						<div class="dTD" style="WIDTH: 25em">
								<asp:TextBox id="txUser" tabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="4em"></asp:TextBox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:Label id="Label3" runat="server">退文原因：</asp:Label></div>
						<div class="dTD" style="WIDTH: 25em">
							<asp:TextBox id="txReason" tabIndex="-1" runat="server" CssClass="DisplayOnly" Width="25em" ReadOnly="True"></asp:TextBox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:Label id="Label5" runat="server">備　　註：</asp:Label></div>
						<div class="dTD" style="WIDTH: 25em">
							<asp:TextBox id="txDesc" tabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="25em"></asp:TextBox></div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"/>
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
