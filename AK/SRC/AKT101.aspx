<%@ Page language="c#" Codebehind="AKT101.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT101" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT101 庫房間檔案搬移作業</title>
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
		<form id="AKT101" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 6em" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"><asp:label class="KeyField" id="Label1" runat="server" >搬移日期 ：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox class="KeyUpperField DatePicker" id="txMoveDate" tabIndex="10" runat="server" MaxLength="7" Width="4em">0920819</asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:label class="RequireField" id="Label2" runat="server">轉出庫房：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
								<asp:DropDownList id="dlMoveoStore" runat="server" Width="5.5em" tabIndex="20"></asp:DropDownList></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:label class="RequireField" id="Label6" runat="server">轉入庫房：</asp:label></DIV>
						<DIV class="dTD">
								<asp:DropDownList id="dlMoveiStore" runat="server" Width="5.5em" tabIndex="30"></asp:DropDownList></DIV>
					</DIV>
				</DIV>
				<DIV id="Table3" class="DivTable" >
					<FIELDSET style="WIDTH: 30em; HEIGHT: 12em"><LEGEND>轉出檔案條件</LEGEND>
						<P>
							<DIV class="dTR">
								<DIV style="WIDTH: 8em" class="dTDTitle">
									<asp:label id="Label5" runat="server">年度號：</asp:label></DIV>
								<DIV class="dTD">
									<asp:textbox id="txBegFileYear" tabIndex="40" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric">087</asp:textbox>
									<asp:Label id="Label7" runat="server">至</asp:Label>
									<asp:textbox id="txEndFileYear" tabIndex="50" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric">088</asp:textbox>
								</DIV>
							</DIV>
							<DIV class="dTR">
								<DIV style="WIDTH: 8em" class="dTDTitle">
									<asp:label id="Label4" runat="server">分類號：</asp:label></DIV>
								<DIV class="dTD">
										<asp:textbox id="Textbox3" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:textbox>
										<asp:textbox id="txBegFileCls" tabIndex="60" runat="server" MaxLength="20" Width="4em">100</asp:textbox>
										<asp:Label id="Label3" runat="server">至</asp:Label>
										<asp:textbox id="txEndFileCls" tabIndex="70" runat="server" MaxLength="20" Width="4em">199</asp:textbox>
										<asp:TextBox id="htxBegClsKey" runat="server" CssClass="hide" Width="3em"></asp:TextBox>
										<asp:TextBox id="htxEndClsKey" runat="server" CssClass="hide" Width="3em"></asp:TextBox></DIV>
							</DIV>
							<DIV class="dTR">
								<DIV style="WIDTH: 8em" class="dTDTitle">
									<asp:label id="Label8" runat="server">保存年限：</asp:label></DIV>
								<DIV class="dTD">
										<asp:textbox id="Textbox4" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:textbox>
										<asp:textbox id="txBegKeepYear" tabIndex="80" runat="server" MaxLength="2" Width="1.5em" CssClass="InputFieldNumeric"></asp:textbox>
										<asp:Label id="Label9" runat="server">至</asp:Label>
										<asp:textbox id="txEndKeepYear" tabIndex="90" runat="server" MaxLength="2" Width="1.5em" CssClass="InputFieldNumeric"></asp:textbox></DIV>
							</DIV>
							<DIV class="dTR">
								<DIV style="WIDTH: 8em" class="dTDTitle">
									<asp:label id="Label10" runat="server">密等：</asp:label></DIV>
								<DIV class="dTD">
										<asp:textbox id="Textbox7" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:textbox>
										<asp:RadioButton id="rb1" runat="server" Text="普通件" GroupName="grp" Checked="True" tabIndex="100"></asp:RadioButton>
										<asp:RadioButton id="rb2" runat="server" Text="密件" GroupName="grp"></asp:RadioButton>
										<asp:RadioButton id="rb3" runat="server" Text="全部" GroupName="grp"></asp:RadioButton></DIV>
							</DIV>
							<DIV class="dTR">
								<DIV style="WIDTH: 8em" class="dTDTitle">
									<asp:CheckBox id="ck1" runat="server" Checked="True" tabIndex="110"></asp:CheckBox></DIV>
								<DIV class="dTD">
										<asp:textbox id="Textbox10" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:textbox>
										<asp:Label id="Label12" runat="server">含另存附件</asp:Label></DIV>
							</DIV>
							<DIV class="dTR">
								<DIV style="WIDTH: 8em" class="dTDTitle">
									<asp:CheckBox id="ck2" runat="server" tabIndex="120"></asp:CheckBox></DIV>
								<DIV class="dTD">
										<asp:textbox id="Textbox13" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:textbox>
										<asp:Label id="Label13" runat="server">含電子檔案未數位化附件</asp:Label></DIV>
							</DIV>
						</P>
					</FIELDSET>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btMove" runat="server" Text="搬移" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 250px; POSITION: absolute; TOP: 503px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 56px; POSITION: absolute; TOP: 491px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
