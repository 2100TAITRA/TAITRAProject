<%@ Page language="c#" Codebehind="EAR507.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR507" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR507續存公文目次表列印作業</TITLE>
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
		<FORM id="EAR507" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">銷毀計畫：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDPlan" tabIndex="5" runat="server" Width="5.5em" 
								CssClass="RequireField" MaxLength="10"></asp:textbox>
							<asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"
								ToolTip="提示計畫批號"></asp:imagebutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">清理批號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txPlanNo" tabIndex="10" runat="server" Width="5.5em" 
								CssClass="RequireField" MaxLength="10"></asp:textbox>
							<asp:imagebutton id="btHelp" tabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"
								ToolTip="提示計畫批號"></asp:imagebutton>
						</DIV>
						<DIV class="dTDTitle" style="width:8.5em">
							<asp:label id="Label5" runat="server" CssClass="RequireField">批號說明：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDesc" tabIndex="0" runat="server" Width="9.5em" CssClass="DisplayOnly" 
								 ReadOnly="True"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label3" runat="server">庫房：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlStore" runat="server" Width="7.5em" tabIndex="15"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label4" runat="server">年度號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:TextBox id="txYearS" runat="server" Width="2em" tabIndex="20" MaxLength="3" CssClass="InputFieldNumeric"
								></asp:TextBox>至
								<asp:TextBox id="txYearE" runat="server" Width="2em" tabIndex="25" MaxLength="3" CssClass="InputFieldNumeric"
									></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
								<asp:label id="Label6" runat="server">分類號：</asp:label></DIV>
						<DIV style="WIDTH: 32em">
							<asp:TextBox id="txClsS" runat="server" Width="10.5em" MaxLength="20" tabIndex="30" 
								></asp:TextBox>
							<asp:Label id="Label7" runat="server">至</asp:Label>
							<asp:TextBox id="txClsE" runat="server" Width="10.5em" MaxLength="20" tabIndex="35" 
								></asp:TextBox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" AccessKey="O" Title="匯出Excel(O)" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
