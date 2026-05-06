<%@ Page language="c#" Codebehind="EAR701.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR701" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR701 機密檔案目錄列印作業</TITLE>
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
		<FORM id="EAR701" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 6.5em; POSITION: absolute; TOP: 0px; HEIGHT: 6.5em"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="RequireField" id="Label2" tabIndex="-1" runat="server">清理批號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 12em"><asp:textbox class="RequireField" id="txPlanNo" tabIndex="10" runat="server" Width="4.5em" MaxLength="8"></asp:textbox><asp:imagebutton id="btHelp" tabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label1" tabIndex="-1" runat="server">計畫說明：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txDesc" tabIndex="-1" runat="server" Width="13em" CssClass="TextLabel" ReadOnly="True"
								ForeColor="Navy"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label5" tabIndex="-1" runat="server">庫房：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlStoreNo" tabIndex="15" runat="server" Width="8.5em"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label3" tabIndex="-1" runat="server">承辦單位：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 12em"><cc1:combobox id="dlDept" tabIndex="40" runat="server" Width="10.5em" CssClass="comboBox"
								Rows="10"></cc1:combobox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label4" tabIndex="-1" runat="server">承辦人：</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlUser" tabIndex="40" runat="server" Width="7.5em" CssClass="comboBox"
								Rows="10"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label18" runat="server">櫥位號：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoS" tabIndex="40" runat="server" Width="6.5em"
								MaxLength="11"></asp:textbox>
							<asp:label id="Label19" runat="server">－</asp:label>
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoE" tabIndex="40" runat="server" Width="6.5em"
								MaxLength="11"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label6" tabIndex="-1" runat="server">排序方式：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbSort1" runat="server" Width="5.5em" Checked="True"
								GroupName="rbSort" Text="依照檔號"></asp:radiobutton><asp:radiobutton id="rbSort2" runat="server" Width="7em" GroupName="rbSort"
								Text="依承辦單位"></asp:radiobutton>
							<asp:radiobutton id="rbORDER_STOCK" runat="server" Width="111px" GroupName="rbSort"
								Text="依櫥位號"></asp:radiobutton>
							<asp:radiobutton  id="rbSecSeq" runat="server" Width="111px" GroupName="rbSort"
								Text="依密件流水號" CssClass ="hide"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label8" tabIndex="-1" runat="server">跳頁方式：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbGROUP_FILENO" runat="server" Width="5em" Checked="True"
								GroupName="rbGroup" Text="依檔號"></asp:radiobutton>
							<asp:radiobutton id="rbGROUP_FILEYEAR" runat="server" Width="5em" Checked="True"
								GroupName="rbGroup" Text="依年度+分類號" ></asp:radiobutton>
							<asp:radiobutton id="rbGROUP_DEPT" runat="server" Width="7em" GroupName="rbGroup"
								Text="依承辦單位"></asp:radiobutton>
							<asp:radiobutton id="rbGROUP_STOCK" runat="server" Width="6em" GroupName="rbGroup"
								Text="依櫥位號"></asp:radiobutton>
							<asp:radiobutton id="rbNONE" runat="server" Width="5em" GroupName="rbGroup"
								Text="不跳頁"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">&nbsp;</DIV>
						<DIV class="dTD"><asp:checkbox id="cbFM" runat="server" Text="依檔管局建議的報表格式輸出"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label7" tabIndex="-1" runat="server">列印範圍：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlPrintRange" runat="server">
								<asp:ListItem Value="0">全部</asp:ListItem>
								<asp:ListItem Value="1">本署(局)核定</asp:ListItem>
								<asp:ListItem Value="2">非本署(局)核定</asp:ListItem>
							</asp:dropdownlist></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="產生Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" AccessKey="O" Title="產生Excel(ALT+O)" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			</iewc:toolbar><asp:textbox id="empUserId" style="Z-INDEX: 102; LEFT: 81px; POSITION: absolute; TOP: 238px"
				runat="server" Width="1px" CssClass="hidden"></asp:textbox>
		</FORM>
	</BODY>
</HTML>
