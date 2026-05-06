<%@ Page language="c#" Codebehind="EAT803.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT803" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT803 調檔權限依分類號及使用者設定作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT803" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_DATA" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:6.5em"><asp:label id="Label1" runat="server" CssClass="KeyField">帳號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txAcc" tabIndex="1" runat="server" Width="10.5em" 
								CssClass="KeyUpperField" MaxLength="20"></asp:textbox><asp:textbox id="txOrgNo" CssClass="hide" Runat="server"></asp:textbox>
							<asp:Label id="lbEmp" runat="server" Width="8.5em"></asp:Label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:6.5em"><asp:label id="Label4" runat="server">分類號資訊：</asp:label></DIV>
						<DIV class="dTD">
							<asp:label id="Label5" runat="server">版本別</asp:label>
							<asp:textbox id="txVerNo" tabIndex="2" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:textbox>
							<asp:imagebutton id="ibVer" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
							<asp:label id="Label6" runat="server">分類號</asp:label>
							<asp:textbox id="txFileCls" tabIndex="3" runat="server" Width="10.5em" CssClass="RequireField" style="IME-MODE: disabled" MaxLength="20"></asp:textbox>
							<asp:imagebutton id="ibCls" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:button id="btAdd" runat="server" Text="加入" tabIndex="4"></asp:button>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
							<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
						</asp:Panel>
					</DIV>
					<DIV style="HEIGHT: 23em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn ItemStyle-HorizontalAlign="Center" HeaderText="版別-分類號(含下層分類號)">
									<ItemTemplate>
										<asp:TextBox ID="txVerCls" Runat="server" CssClass="TextLabel" Width="6.5em"></asp:TextBox>
										<asp:TextBox ID="txClsKey" Runat="server" CssClass="hide"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消(X)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
