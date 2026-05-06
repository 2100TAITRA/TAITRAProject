<%@ Page language="c#" Codebehind="EAR226.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR226" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR226 歸檔案件統計表</TITLE>
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
		<FORM id="EAR226" onkeyup="jf_CheckFull();" method="post" runat="server"> 
			<!--Template V3 Generated WebForm--> 
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle"><asp:radiobutton id="rbDetail" runat="server" Text="月　　　報："
								GroupName="RptType"></asp:radiobutton></DIV>
						<DIV class="dTD"><asp:textbox id="txMonth" tabIndex="0" runat="server" Width="3em" 
									 MaxLength="5" CssClass="InputFieldNumeric"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle"><asp:radiobutton id="rbMonth" runat="server" Text="季報、年報："
									GroupName="RptType"></asp:radiobutton></DIV>
						<DIV class="dTD"><asp:textbox id="txMonS" tabIndex="0" runat="server" Width="3em" CssClass="DisplayOnly"
										 MaxLength="5"></asp:textbox>
								<asp:label id="LINE" value="－" runat="server"></asp:label>
									<asp:textbox id="txMonE" tabIndex="0" runat="server" Width="3em" CssClass="DisplayOnly"
										 MaxLength="5"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle"><asp:radiobutton id="rbDate" runat="server" Text="日 期 區 間 ："
								GroupName="RptType"></asp:radiobutton></DIV>
						<DIV class="dTD"><asp:textbox id="txDateS" tabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly DatePicker"
									 MaxLength="7"></asp:textbox>									 
								<asp:label id="LINE2" value="－" runat="server"></asp:label>
								<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly DatePicker"
									 MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle"><asp:label id="Label4" runat="server" 
									>密件別：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="ddlSecNo" runat="server">
									<asp:ListItem Value="">全部</asp:ListItem>
									<asp:ListItem Value="1">普通件</asp:ListItem>
									<asp:ListItem Value="2">密件</asp:ListItem>
								</asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle"><asp:label id="Label3" runat="server" 
								>處理別：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbNormal" runat="server" Text="一般公文" GroupName="DocType"></asp:radiobutton>
							<asp:radiobutton id="rbLeader" runat="server" Text="總董、總監、首長"
									GroupName="DocType"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
