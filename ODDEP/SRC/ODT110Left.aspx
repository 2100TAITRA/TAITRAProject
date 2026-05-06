<%@ Page Language="c#" CodeBehind="ODT110Left.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT110Left" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT110Left</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="lib/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<style>
			.ztree li a:hover,
			.ztree li a.curSelectedNode,
			.ztree li a span {
			    text-decoration: none !important;
			}
		</style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT110Left" method="post" runat="server">
    <!--Template V2 Generated WebForm-->
    <!--#include file="Template/Res/GenericBanner.htm"-->
    <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
        <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
        <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
    </div>
        <table id="Table1" style="z-index: 102; left: 12px; position: absolute; top: 18px; height: 298px" width="100%" border="0">
            <tr>
                <td valign="top" align="left">
                    <ul id="Classtree" class="ztree"></ul>
                </td>
            </tr>
        </table>
    </form>
</body>
<script type="text/javascript" src="lib/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="lib/jquery.ztree.exhide-3.5.js"></script>
</html>
