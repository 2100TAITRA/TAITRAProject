<%@ Page language="c#" Codebehind="AKT900.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT900" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT900 檔案鑑定報告維護作業</title>
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
		<form id="AKT900" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"   >
								<asp:Label id="Label1" runat="server" CssClass="KeyUpperField">鑑定報告編號：</asp:Label></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txRptNo" tabIndex="10" runat="server" CssClass="KeyUpperField" MaxLength="7" Width="4em"></asp:TextBox>
								<asp:label  id="Label9" runat="server"  ForeColor="Red" Font-Size="Smaller">新增鑑定報告不需鍵入</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
								<asp:Label id="Label2" runat="server" >機關名稱：</asp:Label></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txOrgName" tabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="60" ForeColor="Navy" Width="19em" ReadOnly="True"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
								<asp:Label id="Label3" runat="server" >機關功能及職掌：</asp:Label></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txOrgBusiness" tabIndex="20" runat="server"  MaxLength="60" Width="19em"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:Label id="Label4" runat="server" >機關組織沿革：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:TextBox id="txOrgReform" tabIndex="30" runat="server"  MaxLength="100" Width="19em"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:Label id="Label5" runat="server" >鑑定背景資料：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:Button id="btBackGround" tabIndex="40" runat="server" Width="50px" Text="編輯"></asp:Button></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:Label id="Label6" runat="server" >檔案描述：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:Button id="btDesc" tabIndex="50" runat="server" Width="50px" Text="編輯"></asp:Button></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"  >
							<asp:Label id="Label7" runat="server" >鑑定結果：</asp:Label></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txResult" tabIndex="60" runat="server"  MaxLength="300" TextMode="MultiLine"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"  >
								<asp:Label id="Label8" runat="server" >建議事項：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:TextBox id="txSuggestion" tabIndex="70" runat="server"  MaxLength="300" TextMode="MultiLine"></asp:TextBox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
