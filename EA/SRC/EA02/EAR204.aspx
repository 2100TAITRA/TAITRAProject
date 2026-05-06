<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAR204.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR204" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR204 附件逾期未歸檔稽催單列印作業</TITLE>
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
		<FORM id="EAR204" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label1" runat="server" CssClass="RequireField">列印處室：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlUnit" tabIndex="10" runat="server" Width="9em" CssClass="RequireField comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label2" runat="server" CssClass="RequireField">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="10.5em" 
								CssClass="RequireField" MaxLength="20"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label3" runat="server">稽催單分頁方式：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbDept" tabIndex="30" runat="server" Text="一級" GroupName="GN"></asp:radiobutton>
							<asp:radiobutton id="rbSect" tabIndex="33" runat="server" Text="二級" GroupName="GN"></asp:radiobutton>
							<asp:radiobutton id="rbUser" tabIndex="36" runat="server" Text="個人" GroupName="GN"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">							
						<FIELDSET style="WIDTH: 431px; HEIGHT: 53px"><LEGEND style="COLOR: navy">稽催範圍</LEGEND>
							<DIV class="DivTable" id="Table1">
								<DIV class="dTR">
									<DIV class="dTDTitle" style="WIDTH: 535px; COLOR: navy">
										<asp:radiobutton id="rbBellow5" runat="server" Width="3.5em" Text="稽催" GroupName="grp"></asp:radiobutton>
										<asp:textbox id="txNum1" runat="server" CssClass="TextLabel" Width="1em"></asp:textbox>&nbsp;
										<asp:label id="Label5" runat="server" Width="6em">次(不含)以下</asp:label>
										<asp:radiobutton id="rbOver5" runat="server" Width="3.5em" Text="稽催" GroupName="grp"></asp:radiobutton>
										<asp:TextBox id="txNum2" runat="server" CssClass="TextLabel" Width="1em"></asp:TextBox>
										<asp:label id="Label6" runat="server" Width="5em">次(含)以上</asp:label>&nbsp;&nbsp;
										<asp:radiobutton id="rbAll" runat="server" Width="4em" Text="全部" GroupName="grp"></asp:radiobutton>&nbsp;&nbsp;&nbsp;&nbsp;
									</DIV>
								</DIV>
							</DIV>
						</FIELDSET>
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
