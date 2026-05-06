<%@ Page Language="c#" CodeBehind="IFC050.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFC050" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML  >
<html>
<head>
	<title>IFC050 應用程式提示視窗</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<!--#include file="/STDN/Lib/Script.shtml"-->
	<link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<link rel="stylesheet" href="../IFLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="Literal1" runat="server"></asp:Literal>
	<style>
		BODY {
			BACKGROUND-COLOR: white;
		}

		TD {
			FONT-FAMILY: verdana,helvetica;
			WHITE-SPACE: nowrap;
			FONT-SIZE: 10pt;
			TEXT-DECORATION: none;
		}

		A {
			COLOR: black;
			TEXT-DECORATION: none;
		}

		SPAN {
			BACKGROUND-COLOR: white;
		}
	</style>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>

</head>
<body style="background-color: window" ms_positioning="GridLayout">
	<form id="Left" method="post" runat="server">
		<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute;VISIBILITY: hidden">
			<asp:customvalidator id="Customvalidator1" style="Z-INDEX: 105; POSITION: absolute; TOP: 195px; LEFT: 23px" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary2" style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" runat="server" CssClass="hidden"></asp:validationsummary>
			<asp:listbox id="lbReturnValue" runat="server" Width="5.5em" CssClass="hidden"></asp:listbox>
            <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
		</DIV>
		<asp:CustomValidator Style="z-index: 105; position: absolute; top: 195px; left: 23px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
		<asp:ValidationSummary Style="z-index: 104; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
		<table id="tbMain" style="width: 100%; table-layout: fixed; height: auto" cellspacing="0" cols="1" cellpadding="0" rows="2">
        </table>
		<asp:DropDownList Style="z-index: 101; position: absolute; display: none; top: 102px; left: 10px" ID="dlAppInfo" runat="server">
		</asp:DropDownList>
		<asp:TextBox Style="z-index: 103; position: absolute; display: none; top: 258px; left: 12px" ID="txAppSetRootPath" runat="server"></asp:TextBox>
		<asp:TextBox Style="z-index: 103; position: absolute; display: none; top: 258px; left: 12px" ID="txAuthWS" runat="server"></asp:TextBox>
		<div id="TheGreatTV"></div>
        <DIV id="divForTreeView" style=" WIDTH: 100%; OVERFLOW: auto">
			<ul id="Classtree" class="ztree"></ul>
		</DIV>
		<div>
			<asp:TextBox ID="txArtifa" runat="server" CssClass="hidden"></asp:TextBox>
		</div>
	</form>
</body>
<script type="text/javascript" src="../IFLIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../IFLIB/jquery.ztree.exhide-3.5.js"></script>
</html>
