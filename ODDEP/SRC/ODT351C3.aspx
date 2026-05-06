<%@ Page Language="c#" CodeBehind="ODT351C3.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT351C3" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT351C3 金鑰密碼輸入作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <!--#include file="/STDN/Lib/Script.shtml"-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT351C3" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <fieldset>
                請插入憑證智慧卡並輸入智慧卡金鑰密碼
                <div class="dTR">
                    <div class="dTD">
                        <asp:TextBox ID="txPinCode" runat="server" Width="42em" TextMode="Password"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Button ID="btSave" runat="server" Text="確認"></asp:Button>
                        <asp:Button ID="btCancel" runat="server" Text="取消"></asp:Button>
                    </div>
                </div>
            </fieldset>

        </div>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
