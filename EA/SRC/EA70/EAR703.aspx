<%@ Page language="c#" Codebehind="EAR703.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR703" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR703 機密等級變更或註銷清單列印作業</TITLE>
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
		<FORM id="EAR703" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 6.5em; POSITION: absolute; TOP: 0px; HEIGHT: 6.5em">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV  class="dTDTitle" style="WIDTH: 6em">
								<asp:label class="RequireField" id="Label2" tabIndex="-1" runat="server">清理批號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10em">
								<asp:textbox class="RequireField" id="txPlanNo" tabIndex="10" runat="server" Width="4.5em" MaxLength="8"></asp:textbox>
								<asp:imagebutton id="btHelp" tabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" tabIndex="-1" runat="server" >計畫說明：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txDesc" tabIndex="-1" runat="server" Width="12.5em" CssClass="TextLabel" ReadOnly="True"
								ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label5" tabIndex="-1" runat="server" >庫房：</asp:label></DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlStoreNo" tabIndex="15" runat="server" Width="5.5em" ></asp:DropDownList></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label3" tabIndex="-1" runat="server" >承辦單位：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10em">
							<cc1:combobox id="dlDept" tabIndex="40" runat="server" Width="8.5em"  CssClass="comboBox"
								Rows="10"></cc1:combobox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label4" tabIndex="-1" runat="server" >承辦人：</asp:label></DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlUser" tabIndex="40" runat="server" Width="7.5em" CssClass="comboBox"
								Rows="10"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label18" runat="server" >櫥位號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 16em">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoS" tabIndex="40" runat="server" Width="6.5em"
								MaxLength="11"  Font-Size="X-Small"></asp:textbox>
							<asp:label id="Label19" runat="server" >－</asp:label>
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoE" tabIndex="40" runat="server" Width="6.5em"
								MaxLength="11"  Font-Size="X-Small"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
								<asp:label id="Label8" runat="server" >排序方式：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 16em">
							<asp:radiobutton id="rbOrder1" runat="server"  GroupName="g2" Text="依檔號"
								Checked="True"></asp:radiobutton>
							<asp:radiobutton id="rbStock" runat="server"  GroupName="g2" Text="依櫥位號"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label6" runat="server" >跳頁方式：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 16em">
							<asp:radiobutton id="rbGroup1" runat="server"  Checked="True" Text="依檔號"
								GroupName="g3"></asp:radiobutton>
							<asp:radiobutton id="rbGroup2" runat="server"  Text="依櫥位號" GroupName="g3"></asp:radiobutton>
							<asp:radiobutton id="rbGroup3" runat="server"  Text="不跳頁" GroupName="g3"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" AccessKey="O" Title="匯出Excel(ALT+O)" />
			<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:TextBox id="empUserId" style="Z-INDEX: 102; LEFT: 292px; POSITION: absolute; TOP: 219px"
				runat="server" Width="7px" CssClass="hidden"></asp:TextBox>
		</FORM>
	</BODY>
</HTML>
