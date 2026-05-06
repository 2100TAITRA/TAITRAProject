<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR450.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR450" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR450 文書處理流程個案抽樣分析表列印作業</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR450" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label1" runat="server" >公文文號：</asp:label></div>
						<div class="dTD">
							<asp:TextBox id="txDocNo" tabIndex="5" runat="server"  MaxLength="15"
								Width="10.5em"></asp:TextBox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server" >承辦單位：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="H_Value" tabIndex="-1" runat="server" CssClass="hide" Width="165px"></asp:textbox>
							<cc1:combobox id="dlDept" runat="server" CssClass="comboBox" Width="7em" Rows="8"></cc1:combobox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
								<asp:label id="Label4" runat="server" >承辦人：</asp:label></div>
						<div class="dTD">
							<cc1:combobox id="dlUser" runat="server" CssClass="comboBox" Width="7em" Rows="8"></cc1:combobox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label2" runat="server" >登錄日期：</asp:label></div>
						<div class="dTD">
							<asp:TextBox id="txSDate" runat="server" Width="4em" tabIndex="10" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
							－
							<asp:TextBox id="txEDate" tabIndex="15" runat="server" CssClass="DatePicker" MaxLength="7" Width="4em"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label5" runat="server" >辦畢日期：</asp:label></div>
						<div class="dTD">
							<asp:TextBox id="txCloseDateS" runat="server" Width="4em" CssClass="DatePicker InputFieldNumeric" MaxLength="7"></asp:TextBox>
							<asp:label id="Label7" runat="server" >－</asp:label>
							<asp:TextBox id="txCloseDateE" runat="server" CssClass="DatePicker InputFieldNumeric" MaxLength="7" Width="4em"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label6" runat="server" >辦畢天數：</asp:label></div>
						<div class="dTD">
							<asp:TextBox id="txUdIssueS" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
							<asp:label id="Label8" runat="server" >－</asp:label>
							<asp:TextBox id="txUdIssueE" runat="server" CssClass="InputFieldNumeric" MaxLength="3" Width="2em"></asp:TextBox>
						</div>
					</div>
				</div>
				<asp:ListBox id="lbDept" runat="server" CssClass="hide"></asp:ListBox>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
