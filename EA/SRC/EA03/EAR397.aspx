<%@ Page language="c#" Codebehind="EAR397.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAR397" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR397 年度歸檔案件統計表</TITLE>
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
		<FORM id="EAR397" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div id="BaseTable" class="DivBaseTable">
				<div id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label1" runat="server" CssClass="RequireField">統計年度：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txYear" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" MaxLength="3" Width="2em"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label3" runat="server">統計範圍：</asp:Label>
						</div>
						<div class="dTD">
							<asp:RadioButton ID="rbAll" runat="server" Text="全局庫房" GroupName="rptType"></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label2" runat="server">&nbsp</asp:Label>
						</div>
						<div class="dTD">
							<asp:RadioButton ID="rbMain" runat="server" Text="機關庫房(不含航務中心)" GroupName="rptType"></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label4" runat="server">&nbsp</asp:Label>
						</div>
						<div class="dTD">
							<asp:RadioButton ID="rbFly" runat="server" Text="航務中心庫房" GroupName="rptType"></asp:RadioButton>
						</div>
					</div>
					&nbsp;<asp:Label ID="lbMaxYear" runat="server"></asp:Label>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計(S)" AccessKey="S" Title="統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
