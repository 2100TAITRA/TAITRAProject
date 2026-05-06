<%@ Page language="c#" Codebehind="IFM700C1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM700C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM700C1 系統公告新增程式</TITLE>
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
		<FORM id="IFM700C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server"></asp:listbox>
				<asp:textbox id="H_nIFM700C1" runat="server"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="KeyField" id="Label1" runat="server" CssClass="KeyField">主　　旨：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txSubject" tabIndex="10" runat="server" Width="15.5em" MaxLength="40" CssClass="KeyField"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="RequireField" id="Label2" runat="server" CssClass="RequireField">內　　容：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txContent" tabIndex="20" runat="server" Width="15.5em" Rows="4" Height="75px"
									TextMode="MultiLine" CssClass="RequireField"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="" id="Label6" runat="server">公告日期：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txPublishDate" tabIndex="30" runat="server" Width="5em" MaxLength="7" CssClass="DatePicker"></asp:textbox>(YYYMMDD)</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="" id="Label4" runat="server">公告期限：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txDate" tabIndex="40"	runat="server" Width="5em" MaxLength="7" CssClass="DatePicker"></asp:textbox>(YYYMMDD)</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="" id="Label3" runat="server">附件檔案：</asp:label></DIV>
						<DIV class="dTD"><asp:button id="btnAttach" tabIndex="50" runat="server" Width="4em" Text="設定"></asp:button></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="" id="Label5" runat="server">發布對象：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbAllTarget" tabIndex="60" runat="server" Text="全機關人員均可瀏覽" Checked="True" GroupName="rb"></asp:radiobutton><br>
							<asp:radiobutton id="rbSomeTarget" tabIndex="61" runat="server" Text="特定對象方可瀏覽" GroupName="rb"></asp:radiobutton><asp:button id="btnTargetSet" tabIndex="62" runat="server" Width="4em" Text="設定"></asp:button></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">&nbsp</DIV>
						<DIV class="dTD"><asp:checkbox id="cbSendEmail" runat="server" Text="發送Email通知"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">&nbsp</DIV>
						<DIV class="dTD"><asp:checkbox id="cbSendNotify" runat="server" Text="發送線上訊息"></asp:checkbox></DIV>
					</DIV>
				</DIV>
				<asp:textbox id="hText" runat="server" CssClass="hide"></asp:textbox>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;"/>
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"/>
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"/>
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"/>
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
