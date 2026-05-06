<%@ Page Language="c#" CodeBehind="EAR231.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR231" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>EAR231 歸檔案件數量統計表列印作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> 
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="EAR231" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EALIB/GenericSearch.htm"-->
		<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox id="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label id="Label2" runat="server" >編目日期：</asp:Label>
					</div>
					<div class="dTD">
						<asp:textbox id="txInpFileDateStart" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						-
						<asp:textbox id="txInpFileDateEnd" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:label id="Label1" runat="server">承辦單位：</asp:label>
					</div>
					<div class="dTD">
						<asp:dropdownlist id="dlDept" runat="server"></asp:dropdownlist>
					</div>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button ID="btPreview" runat="server" Text="預覽(E)" AccessKey="E" Title="預覽(ALT+E)" Style="display:none" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
			<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" Style="display:none" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
			<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display:none" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
	</form>
</body>
</html>
