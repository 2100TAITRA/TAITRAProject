<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="SYR520.aspx.cs" AutoEventWireup="false" Inherits="AK.SYR520" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>SYR520 工作量統計表列印作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
<meta name="format - detection" content="telephone = no">
<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="SYR520" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label class="KeyField" id="Label1" runat="server" tabIndex="-1">列印月份：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; ">
							<asp:textbox class="KeyUpperField" onkeypress="jf_InpNumOnly()" id="txSMonth" tabIndex="1" runat="server" MaxLength="5" Width="3.5em">09101</asp:textbox>－
							<asp:textbox class="KeyUpperField" onkeypress="jf_InpNumOnly()" id="txEMonth" tabIndex="2" runat="server" MaxLength="5" Width="3.5em">09112</asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:Label id="Label2" runat="server">列印報表：</asp:Label></DIV>
						<DIV class="dTD" style="width: 11em; ">
							<asp:radiobutton id="rbTotal" tabIndex="10" runat="server" Text="人員別工作量統計表" GroupName="job_calc"></asp:radiobutton><br>
							<asp:radiobutton id="rbUser" tabIndex="13" runat="server" GroupName="job_calc" Text="人員別工作量分析表"></asp:radiobutton><br>
							<asp:radiobutton id="rbDept" tabIndex="15" runat="server" GroupName="job_calc" Text="處室別工作量分析表"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 17em; ">
							<asp:TextBox id="txMsg" tabIndex="-1" runat="server" CssClass="TextLabel" Width="16.5em" ReadOnly="True"></asp:TextBox>
						</DIV>
					</DIV>	
					<asp:ListBox id="lbDept" runat="server" CssClass="hide"></asp:ListBox>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" CssClass="hide" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
