<%@ Page language="c#" Codebehind="AKP340.aspx.cs" AutoEventWireup="false" Inherits="AK.AKP340" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKP340 批次調整作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKP340" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 100; POSITION: absolute; TOP: 102px; LEFT: 10px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; "><asp:label id="Label1" runat="server" Width="9.5em">◎調整內容:</asp:label></DIV></DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; "><asp:label id="Label21" runat="server" Width="2.5em"></asp:label><asp:radiobutton id="rb_ModCls" runat="server" Width="20.5em" GroupName="group1" Text="分類號批次修正(將一併調整立案記錄)" Checked="True"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; ">
							<asp:label id="Label2" runat="server">　　新分類號：</asp:label>
							<asp:textbox id="tbNewClsNo" runat="server" Width="7.5em"></asp:textbox>
							<asp:imagebutton id="btClsNo" tabIndex="-1" runat="server" ToolTip="提示分類號" ImageUrl="Template/images/HELPWIN_E.gif"></asp:imagebutton>
							<asp:label id="Label3" runat="server"> 　類目名稱：</asp:label>
							<asp:TextBox id="tbClsName2" runat="server" Width="15.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; "><asp:label id="Label4" runat="server" Width="2.5em"></asp:label><asp:checkbox id="cbAdjustKeepYear" runat="server" Width="11.5em" Text="一併調整保存年限" Checked="True"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; "><asp:label id="Label22" runat="server" Width="2.5em"></asp:label><asp:radiobutton id="rb_ModCase" runat="server" Width="9.5em" GroupName="group1" Text="案次號批次修正"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; ">
							<asp:label id="Label5" runat="server">　　新案次號：年度號：</asp:label><asp:textbox id="tbYear" runat="server" Width="3.5em" tabIndex="1"></asp:textbox>
							<asp:label id="Label6" runat="server">　分類號：</asp:label>
							<asp:textbox id="tbClsNo" runat="server" Width="7.5em" tabIndex="2"></asp:textbox>
							<asp:imagebutton id="btClsNo2" tabIndex="-1" runat="server" ToolTip="提示分類號" ImageUrl="Template/images/HELPWIN_E.gif"></asp:imagebutton>
							<asp:label id="Label7" runat="server">　案次號：</asp:label>
							<asp:textbox id="tbCase" runat="server" Width="7em" tabIndex="3"></asp:textbox>
							<asp:imagebutton id="btClsNo3" tabIndex="-1" runat="server" ToolTip="提示案次號" ImageUrl="Template/images/HELPWIN_E.gif"></asp:imagebutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; ">
							<asp:label id="Label8" runat="server"> 　　類目名稱：</asp:label>
							<asp:textbox id="tbClsName" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:textbox>
							<asp:label id="Label9" runat="server">　案名：</asp:label>
							<asp:textbox id="tbCaseName" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; ">
							<asp:label id="Label23" runat="server" Width="2.5em"></asp:label>
							<asp:radiobutton id="rb_ModKeepyear" runat="server" Width="9.5em" GroupName="group1" Text="保存年限修正："></asp:radiobutton>
							<asp:customvalidator id="CustomValidator1" runat="server" Visible="False" ErrorMessage="CustomValidator"></asp:customvalidator>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; "><asp:label id="Label10" runat="server" Width="9.5em">　　新保存年限： </asp:label><asp:dropdownlist id="ddlKeepYear" runat="server"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; "><asp:label id="Label12" runat="server" Width="11.5em">◎調整範圍:</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; ">
							<asp:label id="Label13" runat="server" Width="6.5em">　檔號(起)：</asp:label>
							<asp:textbox onkeypress="jf_InpNumOnly();" id="tbFYear_B" tabIndex="21" runat="server" Width="2.5em" Height="24" MaxLength="3"></asp:textbox>
							<asp:label id="Label16" runat="server">－</asp:label>
							<asp:textbox id="tbFCls_B" tabIndex="23" runat="server" Height="24" MaxLength="20"></asp:textbox>
							<asp:label id="Label15" runat="server">－</asp:label>
							<asp:textbox id="tbFCase_B" tabIndex="25" runat="server" Width="7em" MaxLength="12"></asp:textbox>
							<asp:label id="Label14" runat="server">－</asp:label>
							<asp:textbox id="tbFVol_B" tabIndex="27" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 45em; ">
							<asp:label id="Label17" runat="server" Width="6.5em">　檔號(訖)：</asp:label>
							<asp:textbox onkeypress="jf_InpNumOnly();" id="tbFYear_E" tabIndex="22" runat="server" Width="2.5em" Height="24" MaxLength="3"></asp:textbox>
							<asp:label id="Label20" runat="server">－</asp:label>
							<asp:textbox id="tbFCls_E" tabIndex="24" runat="server" Height="24" MaxLength="20"></asp:textbox>
							<asp:label id="Label19" runat="server">－</asp:label>
							<asp:textbox id="tbFCase_E" tabIndex="26" runat="server" Width="7em" MaxLength="12"></asp:textbox>
							<asp:label id="Label18" runat="server">－</asp:label>
							<asp:textbox id="tbFVol_E" tabIndex="28" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>		
				<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
					<asp:Button ID="btSave" runat="server" Text="調整(S)" accesskey = "S" title = "調整(Alt+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				</asp:Panel>
				<asp:customvalidator id="Validator" style="Z-INDEX: 102; POSITION: absolute; TOP: 450px; LEFT: -62px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 103; POSITION: absolute; TOP: 230px; LEFT: -3px" runat="server" CssClass="hidden"></asp:validationsummary>
			</DIV>
		</form>
	</body>
</HTML>
