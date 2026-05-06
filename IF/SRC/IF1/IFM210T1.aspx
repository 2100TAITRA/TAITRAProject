<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Page language="c#" Codebehind="IFM210T1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM210T1" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>Left</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<link rel="stylesheet" href="../IFLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
		<!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<body bgColor="#ffffff" MS_POSITIONING="GridLayout">
		<form id="Left" method="post" runat="server">
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute;VISIBILITY: hidden">
				<asp:customvalidator id="Validator" style="Z-INDEX: 105; POSITION: absolute; TOP: 195px; LEFT: 23px" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" runat="server" CssClass="hidden"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em" CssClass="hidden"></asp:listbox>
                <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" style="margin: 1.5em auto;">
				<DIV class="DivTable" id="tbMain">
					<DIV class="dTR" >
						<DIV class="dTD">
							
							<asp:checkbox id="cbShowAll" runat="server" AutoPostBack="True" Text="顯示已停用單位資訊"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR" >
					    
	
						<DIV class="dTD" id="divForTreeView" style="height: calc(100vh - 3em);width: calc(100vw - 10px);overflow: auto;">
							<ul id="Classtree" class="ztree"></ul>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server" style="height: 1.2em"></asp:Panel>
		</form>
	</body>
	<script type="text/javascript" src="../IFLIB/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../IFLIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
