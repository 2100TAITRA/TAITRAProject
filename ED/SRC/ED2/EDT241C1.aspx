<%@ Page Language="c#" CodeBehind="EDT241C1.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT241C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT241C1 承辦單位選擇子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
    <script language="JavaScript" src="EDT241C1.js"></script>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT241C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <table class="BaseTable" id="BaseTable" style="z-index: 100; left: 24px; width: 472px; top: 64px; height: 137px">
            <tr>
                <td style="width: 560px; height: 81px" valign="top" align="center" colspan="3">
                    <table class="MainTable" id="MainTable" style="width: 312px; height: 115px" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <td>
                                    <br>
                                    <br>
                                    <span id="PageTitle" style="font-size: 12pt">
                                        <asp:Label ID="Label1" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">
                                        </asp:Label>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table id="GridTable" cellspacing="1" cellpadding="1" width="100%" border="0">
                                        <tr id="TitleTr" style="font-weight: bold; font-size: small; color: white; font-family: 細明體" align="center" warp="warp">
                                            <td align="center" width="15">序</td>
                                            <td align="center" width="150">單位名稱</td>
                                            <td align="center" width="100">角色名稱</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div id="EditGrp" style="overflow: auto"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style="width: 10%">
            </tr>
            <tr>
                <td></td>
                <td style="width: 10%"></td>
            </tr>
        </table>
    </form>
</body>
</html>
