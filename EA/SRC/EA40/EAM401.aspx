
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAM401.aspx.cs" AutoEventWireup="false" Inherits="EA04.EAM401" %>
<!DOCTYPE HTML  >
<HTML>
	<HEAD>
		<TITLE>EAM401 媒體型式代碼維護作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAM401" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<TABLE class="BaseTable" id="BaseTable" >
				<TR>
					<TD style="HEIGHT: 118px" vAlign="top" align="middle" colSpan="3">
						<TABLE class="MainTable" id="MainTable" style="Z-INDEX: 101; WIDTH: 361px; HEIGHT: 136px" cellSpacing="0" cellPadding="0">
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label1" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="KeyField">媒體代碼：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txMediaNo" tabIndex="0" runat="server" Width="22px" Font-Names="細明體" Font-Size="Small" CssClass="KeyUpperField" MaxLength="1" Height="25px" style="IME-MODE:disabled"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label2" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField">媒體名稱：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txMediaDesp" tabIndex="0" runat="server" Width="245px" Font-Names="細明體" Font-Size="Small" CssClass="RequireField" MaxLength="20" Height="25px"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label3" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">計量單位：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txUnit" tabIndex="0" runat="server" Width="76px" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel" MaxLength="4" Height="25px"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label5" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">預設代碼：</asp:label>
								</TD>
								<TD>
									<asp:RadioButtonList id="rbDefaultCode" runat="server" CssClass="InputFieldLabel" RepeatDirection="Horizontal">
										<asp:ListItem Value="1">是</asp:ListItem>
										<asp:ListItem Value="0" Selected="True">否</asp:ListItem>
									</asp:RadioButtonList>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label4" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField">群組代碼：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txGrpNo" tabIndex="0" runat="server" Width="22px" Font-Names="細明體" Font-Size="Small" CssClass="RequireField" MaxLength="1" Height="25px" style="IME-MODE:disabled"></asp:textbox>
									<asp:ImageButton id="btHelp" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
									<asp:TextBox id="txGrpName" tabIndex="-1" runat="server" Width="187px" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="middle">
					</TD>
					<TD style="WIDTH:10%"></TD>
				</TR>
			</TABLE>
			<iewc:toolbar id="tbTool" runat="server" Font-Size="X-Small" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
				<iewc:ToolbarButton Text="開啟(M)" ImageUrl="../../../STD/IMAGE/MODIFY_E.gif" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" AccessKey="M" ToolTip="開啟舊檔(ALT+M)" TabIndex="1"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="儲存(S)" ImageUrl="../../../STD/IMAGE/Save_E.gif" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" AccessKey="S" ToolTip="儲存(ALT+S)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="清除(Z)" ImageUrl="../../../STD/IMAGE/Cancel_E.gif" DefaultStyle="newmode:block;modifymode:none;" ID="btClean" AccessKey="Z" ToolTip="清除(ALT+Z)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="刪除(D)" ImageUrl="../../../STD/IMAGE/DELETE_E.gif" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete" AccessKey="D" ToolTip="刪除(ALT+D)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="取消(Z)" ImageUrl="../../../STD/IMAGE/CANCEL_E.gif" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel" AccessKey="Z" ToolTip="取消(ALT+Z)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:none;modifymode:block;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="查詢(F)" ImageUrl="../../../STD/IMAGE/Search_E.gif" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></iewc:ToolbarButton>
			</iewc:toolbar>
		</FORM>
	</BODY>
</HTML>
