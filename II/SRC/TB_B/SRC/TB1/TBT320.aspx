<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBT320.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBT320" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>TBT320 他網RSS頻道訂閱設定作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBT320" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericBanner.htm"-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<TABLE class="BaseTable" id="BaseTable">
				<TR>
					<TD style="HEIGHT: 118px" vAlign="top" align="center" colSpan="3">
						<TABLE class="MainTable" id="MainTable" style="Z-INDEX: 101; WIDTH: 251px; HEIGHT: 23px"
							cellSpacing="0" cellPadding="0">
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label1" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="KeyField"
										Width="80px">頻道名稱：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txKeyFld" tabIndex="0" runat="server" Width="246px" Font-Names="細明體" Font-Size="Small"
										CssClass="KeyUpperField" Height="25px"></asp:textbox><asp:TextBox ID="H_SOURCE_ORGNO" Runat="server" CssClass="hide"></asp:TextBox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label2" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField"
										Width="80px">RSS URL：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txFeed" tabIndex="0" runat="server" Width="326px" Font-Names="細明體" Font-Size="Small"
										CssClass="RequireField" Height="25px"></asp:textbox>
									<asp:Button id="btCheck" runat="server" Text="驗證"></asp:Button>
									<asp:ImageButton id="btRSS" runat="server" ImageUrl="../IMAGE/RSS.gif"></asp:ImageButton>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label3" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField"
										Width="80px">發布日期：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txPubDate" tabIndex="0" runat="server" Width="78px" Font-Names="細明體" Font-Size="Small"
										CssClass="DisplayOnly" Height="25px" ReadOnly="True"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1" style="HEIGHT: 83px">
									<asp:label id="Label4" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField"
										Width="80px">頻道描述：</asp:label>
								</TD>
								<TD style="HEIGHT: 83px">
									<asp:textbox id="txDesc" tabIndex="0" runat="server" Width="486px" Font-Names="細明體" Font-Size="Small"
										CssClass="DisplayOnly" Height="86px" ReadOnly="True" TextMode="MultiLine"></asp:textbox>
								</TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="right" colSpan="1" rowSpan="1">
									<asp:label id="Label5" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="RequireField"
										Width="80px">頻道網址：</asp:label>
								</TD>
								<TD>
									<asp:textbox id="txLink" tabIndex="0" runat="server" Width="486px" Font-Names="細明體" Font-Size="Small"
										CssClass="DisplayOnly" Height="25px" ReadOnly="True"></asp:textbox>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="center">
					</TD>
					<TD style="WIDTH:10%"></TD>
				</TR>
			</TABLE>
			<iewc:toolbar id="tbTool" runat="server" Font-Size="X-Small" CssClass="V3_GenericBannerToolBar"
				EnableViewState="False">
				<iewc:ToolbarButton Text="開啟(M)" ImageUrl="../../../STD/IMAGE/MODIFY_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btOpen" AccessKey="M" ToolTip="開啟舊檔(ALT+M)" TabIndex="1"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="儲存(S)" ImageUrl="../../../STD/IMAGE/Save_E.gif" DefaultStyle="newmode:block;modifymode:block;"
					ID="btSave" AccessKey="S" ToolTip="儲存(ALT+S)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="清除(Z)" ImageUrl="../../../STD/IMAGE/Cancel_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btClean" AccessKey="Z" ToolTip="清除(ALT+Z)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="刪除(D)" ImageUrl="../../../STD/IMAGE/DELETE_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btDelete" AccessKey="D" ToolTip="刪除(ALT+D)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="取消(Z)" ImageUrl="../../../STD/IMAGE/CANCEL_E.gif" DefaultStyle="newmode:none;modifymode:block;"
					ID="btCancel" AccessKey="Z" ToolTip="取消(ALT+Z)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:none;modifymode:block;"></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="查詢(F)" ImageUrl="../../../STD/IMAGE/Search_E.gif" DefaultStyle="newmode:block;modifymode:none;"
					ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator DefaultStyle="newmode:block;modifymode:none;"></iewc:ToolbarSeparator>
			</iewc:toolbar>
		</FORM>
	</BODY>
</HTML>
