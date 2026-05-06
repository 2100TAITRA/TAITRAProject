<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAC205.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAC205" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAC205 相關案卷維護視窗</TITLE>
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
		<FORM id="EAC205" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericChild.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_CaseKey" tabIndex="-1" runat="server" Width="1.5em"></asp:textbox>
				<asp:textbox id="H_VerNo" tabIndex="-1" runat="server" Width="1.5em"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV id="GridTable" class="DivTable">
					<DIV style="HEIGHT: 19em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="案號">
									<ItemTemplate>
										<asp:TextBox onblur="txOnblur('txYear')" id="txYear" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
										<asp:Label id="Label1" runat="server">(年度)</asp:Label>
										<asp:Label id="Label2" runat="server">－</asp:Label>
										<asp:TextBox onblur="txOnblur('txCls')" id="txCls" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
										<asp:imagebutton id="btClsHelp" tabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
										<asp:Label id="Label6" runat="server">(分類)</asp:Label>
										<asp:Label id="Label7" runat="server">－</asp:Label>
										<asp:TextBox onblur="txOnblur('txCase')" id="txCase" runat="server" Width="7em" 
											 MaxLength="12"></asp:TextBox>
										<asp:imagebutton id="btCaseHelp" tabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
										<asp:Label id="Label8" runat="server">(案次)</asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="案名">
									<ItemTemplate>
										<asp:Label id="lbCaseName" style="OVERFLOW: hidden" runat="server" Width="9.5em" CssClass="PopUp"></asp:Label>
										<asp:TextBox id="H_dgCaseKey" tabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
										<asp:TextBox id="H_dgClsKey" tabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExit" runat="server" Text="關閉(X)" accesskey="X" title="關閉(Alt+X)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
