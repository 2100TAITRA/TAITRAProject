<%@ Page language="c#" Codebehind="DFM310.aspx.cs" AutoEventWireup="false" Inherits="AK.DFM310" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>DFM310 伺服機設定作業</title>
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
		<form id="DFM310" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>	
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 101; POSITION: absolute; TOP: 293px; LEFT: 28px"
				runat="server" CssClass="hidden"></asp:validationsummary>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label class="KeyField" id="Label1" tabIndex="-1" runat="server">伺服機編號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox class="KeyUpperField" id="txServerNo" tabIndex="10" runat="server" Width="2em"
									MaxLength="2">88</asp:textbox><asp:textbox id="txServerNoChanged" runat="server" CssClass="hide" Width="2em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label2" tabIndex="-1" runat="server" CssClass="RequireField">伺服機別名：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txServerName" tabIndex="20" runat="server" CssClass="RequireField" Width="9em"
									MaxLength="20"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label12" tabIndex="-1" runat="server" CssClass="RequireField">檔案存取WEBSERVICE：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txWEB_SERVICE" tabIndex="25" runat="server" CssClass="RequireField" Width="18.5em"
									MaxLength="100"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em">
							<asp:label id="Label16" tabIndex="-1" runat="server" CssClass="RequireField">檔案時戳加簽WEBSERVICE：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txEnvelopWS" tabIndex="27" runat="server" CssClass="RequireField" Width="18.5em"
								MaxLength="100"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label3" tabIndex="-1" runat="server" CssClass="RequireField">電腦名稱：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txCpuName" tabIndex="30" runat="server" CssClass="RequireField" Width="9em"
									MaxLength="60"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em; HEIGHT: 2em"><asp:label id="Label4" tabIndex="-1" runat="server">伺服機IP：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txIP1" tabIndex="40" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric">888</asp:textbox>.
								<asp:textbox id="txIP2" tabIndex="50" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric">888</asp:textbox>.
								<asp:textbox id="txIP3" tabIndex="60" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric">888</asp:textbox>.
								<asp:textbox id="txIP4" tabIndex="70" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric">888</asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label5" tabIndex="-1" runat="server">開放通訊埠：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txPort" tabIndex="80" runat="server" Width="3em"
									MaxLength="5" CssClass="InputFieldNumeric"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label13" tabIndex="-1" runat="server" CssClass="RequireField">總容量：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txTOTAL_SPACE" tabIndex="105" runat="server" CssClass="RequireFieldNumeric"
									Width="3em" MaxLength="6"></asp:textbox><asp:label id="Label15" tabIndex="-1" runat="server" CssClass="RequireField" Width="1.5em">MB</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label14" tabIndex="-1" runat="server">已使用量：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txUSE_SPACE" tabIndex="-1" runat="server" CssClass="DISPLAYONLY" Width="3em"
									ReadOnly="True" MaxLength="6"></asp:textbox>MB</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label8" tabIndex="-1" runat="server" CssClass="RequireField">伺服機屬性：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlProperty" tabIndex="110" runat="server" CssClass="RequireField">
									<asp:ListItem Value="1">正式伺服機</asp:ListItem>
									<asp:ListItem Value="2">備援伺服機</asp:ListItem>
									<asp:ListItem Value="3">光碟櫃伺服機</asp:ListItem>
								</asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label9" tabIndex="-1" runat="server" CssClass="RequireField">工作群組：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txStationNo" tabIndex="120" runat="server" Width="2em" MaxLength="2"></asp:textbox><asp:imagebutton id="btWGrp" tabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton><asp:textbox id="txStationName" tabIndex="-1" runat="server" CssClass="TextLabel" Width="14.5em"
								></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label10" tabIndex="-1" runat="server" CssClass="RequireField">儲存區位置：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txSaveLocation" tabIndex="130" runat="server" CssClass="RequireField" Width="17em"
									MaxLength="40"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label11" tabIndex="-1" runat="server">儲存區分享名稱：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txShareName" tabIndex="140" runat="server" Width="10em"
									MaxLength="20"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; POSITION: absolute; TOP: 23em; LEFT: 2em"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:listbox id="lbReturnValue" runat="server" CssClass="hidden" style="Z-INDEX: 104; POSITION: absolute; TOP: 150px; LEFT: 51px"></asp:listbox></form>
	</body>
</HTML>
