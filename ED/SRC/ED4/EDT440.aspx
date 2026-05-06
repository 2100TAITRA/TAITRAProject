<%@ Page language="c#" Codebehind="EDT440.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT440" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EDT440 批示錄案追蹤登錄作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT440" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable" >
				<div class="DivTable" id="MainTable" >
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" CssClass="KeyField" runat="server">公文文號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNo" tabIndex="1" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="10"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server">收創日期：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txRcvDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label3" runat="server">限辦日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDueDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label4" runat="server">主旨：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txSubject" TextMode="MultiLine" Width="24em" runat="server"></asp:TextBox>
						</div>
					</div>
                    <div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label5" runat="server">批示長官：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:dropdownlist id="dlRecorder" tabIndex="2" runat="server" Width="10em"></asp:dropdownlist>
						</div>
                        <div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label6" runat="server">批示限辦日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txRecordDueDate" tabIndex="3" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label7" runat="server">批示內容：</asp:label></div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:textbox id="txRecordDesc" TextMode="MultiLine" tabIndex="4" runat="server" Width="24em"></asp:textbox>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel id="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" >
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCheck" runat="server" Text="確認(C)" accesskey = "C" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
