<%@ Page language="c#" Codebehind="AKR870.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR870" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR870 檔案應用收據及簽收單列印</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKR870" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"   ><asp:label class="KeyField" id="Label1" runat="server">申請書號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 9.5em"><asp:textbox class="KeyField" id="txApplyNo" runat="server" Width="5em" MaxLength="8" tabIndex="10"></asp:textbox><asp:imagebutton id="btKeyHelp" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton></DIV>
						<DIV class="dTDTitle" style="WIDTH: 8em" ><asp:label id="Label3" runat="server" >申請人：</asp:label></DIV>
						<DIV class="dTD">
							<asp:label id="lbPubName" runat="server" Width="4em"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" >
							<asp:label id="Label4" runat="server" >列印項目：</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"  >&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 9.5em">
								<asp:label id="Label5" runat="server"  Width="6em"></asp:label>
                                <asp:RadioButton id="ckForm1" runat="server" Width="9em" Text="檔案應用簽收單" tabIndex="20" Checked="True" GroupName="rbRptType"
									></asp:RadioButton></DIV>
						<DIV class="dTDTitle" style="WIDTH: 8em" ><asp:label id="Label2" runat="server" >約定應用日期：</asp:label></DIV>
						<DIV class="dTD" >
							<asp:textbox id="txAppointDate" tabIndex="30" runat="server" Width="4em" Rows="7" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"  >&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 9.5em">
								<asp:label id="Label6" runat="server"  Width="6em"></asp:label>
                                <asp:RadioButton id="ckForm2" runat="server" Width="8.5em" Text="檔案應用費收據" tabIndex="40" GroupName="rbRptType"
									></asp:RadioButton></DIV>
						<DIV class="dTDTitle"  style="WIDTH: 8em" ><asp:label id="Label99" runat="server"  Width="5em">起算時間：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 4em"><asp:textbox CssClass="InputFieldNumeric" id="txTimeS" runat="server" Width="4em" MaxLength="4"
									tabIndex="10"></asp:textbox></DIV>
						<DIV class="dTDTitle"  style="WIDTH: 5.5em" ><asp:label id="Label98" runat="server"  Width="6em">調用時間：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox CssClass="InputFieldNumeric" id="txTime" runat="server" Width="4em" MaxLength="4"
									tabIndex="10"></asp:textbox></DIV>
						<DIV class="dTD">
								<asp:Label id="Label9" runat="server" >小時</asp:Label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" >
								<asp:label id="Label7" runat="server" >收費註記：</asp:label></DIV>
						<DIV style="WIDTH: 9em" ></DIV>
						<DIV style="WIDTH: 8em"></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"  >&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 9.5em">
								<asp:checkbox id="cbRvcMoney" tabIndex="40" runat="server"  Width="6.5em"
									Text="已收到費用" Checked="True"></asp:checkbox></DIV>
						<DIV style="WIDTH: 8em"></DIV>
					</DIV>
				</DIV>
				<asp:Label id="lbORGNO" runat="server" CssClass="hide"></asp:Label>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
