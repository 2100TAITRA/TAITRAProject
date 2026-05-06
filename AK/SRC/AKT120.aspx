<%@ Page language="c#" Codebehind="AKT120.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT120" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register assembly="Microsoft.Web.UI.WebControls" namespace="Microsoft.Web.UI.WebControls" tagprefix="iewc" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT120 退文作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT120" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<asp:textbox id="txExtFile_Date" style="Z-INDEX: 106; LEFT: 8px; POSITION: absolute; TOP: 133px"
				runat="server" CssClass="hidden" Width="32px"></asp:textbox>
			<asp:textbox id="txOrgNo" style="Z-INDEX: 105; LEFT: 11px; POSITION: absolute; TOP: 202px" runat="server"
				CssClass="hidden" Width="40px"></asp:textbox>
			<asp:textbox id="txDocReturn" style="Z-INDEX: 105; POSITION: absolute; TOP: 202px; LEFT: 11px"
				runat="server" CssClass="hidden" Width="40px"></asp:textbox>
            <asp:textbox id="txDocLen" runat="server" CssClass="hidden" ></asp:textbox>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em" >
							<asp:label class="KeyField" id="Label1" runat="server" >公文文號：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em">
							<asp:textbox class="KeyUpperField" onkeypress="jf_UPPERCASE();" id="txDocNo" tabIndex="1" runat="server" 
								MaxLength="10" ></asp:textbox>
							<asp:label id="lbDocState" runat="server"></asp:label></DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em"><asp:label style="Z-INDEX: 0" id="Label17" runat="server">公文主旨：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em"><asp:textbox style="Z-INDEX: 0" id="txSubject" tabIndex="4" runat="server" Width="30em" MaxLength="80" TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em">
								<asp:label class="RequireField" id="Label2" runat="server">退文原因：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em">
							<asp:dropdownlist id="dlReject" tabIndex="3" runat="server" Width="30em"></asp:dropdownlist>
							<asp:textbox class="RequireField" onkeypress="jf_UPPERCASE();" id="txReject" tabIndex="2" runat="server"
								MaxLength="2" Width="2.5em" CssClass="hide"></asp:textbox>&nbsp; 
						</DIV>
					</DIV>
					<div class="dTR" id="tr_1">
						<div class="dTDTitle" style="WIDTH: 8.5em;"><asp:label id="Label11" runat="server">退文至：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em">
							<asp:RadioButtonList id="rbListReturn" runat="server" Width="17em" RepeatDirection="Horizontal">
								<asp:ListItem id="rtnType0" Value="1" Selected="True">承辦單位</asp:ListItem>
								<asp:ListItem id="rtnType1" Value="2">歸檔單位</asp:ListItem>
							</asp:RadioButtonList>
						</DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label id="Label3" runat="server">備註：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em">
							<asp:textbox id="txDesc" tabIndex="4" runat="server" MaxLength="80" Width="30em"></asp:textbox></DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em">
								<asp:label id="Label4" runat="server" ForeColor="Gray">功能說明：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em">
								<asp:label id="Label5" runat="server" ForeColor="Gray">1.未點收公文退文</asp:label></DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em">&nbsp;</DIV>
						<div class="dTD" style="WIDTH: 30em">
								<asp:label id="Label6" runat="server" ForeColor="Gray">2.已點收公文退文</asp:label>
						</DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em">
								<asp:label id="Label7" runat="server" ForeColor="Gray">可退文公文狀態：</asp:label></DIV>
						<div class="dTD" style="WIDTH: 30em">
								<asp:label id="Label8" runat="server" ForeColor="Gray">1.未點收</asp:label>
								<asp:TextBox id="H_UserId" tabIndex="-1" runat="server" CssClass="hide"></asp:TextBox></DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8.5em">&nbsp;</DIV>
						<div class="dTD" style="WIDTH: 30em">
								<asp:label id="Label9" runat="server" ForeColor="Gray">2.已點收且掃描未檢視完畢</asp:label></DIV>
					</DIV>
					<div class="dTR">
						<div class="dTD" colSpan="2">&nbsp;
								<asp:label id="Label10" runat="server" ForeColor="Gray">(非上面所列公文之狀態，不允許執行退文作業)</asp:label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" AccessKey="M" title="退文(ALT+M)" runat="server" Text="退文(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"/>
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancelOpen" AccessKey="C" title="取消退文(ALT+C)" runat="server" Text="取消退文(C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 102; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
