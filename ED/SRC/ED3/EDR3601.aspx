<%@ Page Language="c#" CodeBehind="EDR3601.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR3601" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR3601 郵寄清單列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR3601" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MTable1" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPostDateS" runat="server" CssClass="RequireField DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList ID="dlTimeS" runat="server" Height="29px" ></asp:DropDownList>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox ID="txPostDateE" runat="server" CssClass="RequireField DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList ID="dlTimeE" runat="server" Height="29px" ></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">郵寄方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:DropDownList ID="dlPostType" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">寄件類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:DropDownList ID="dlPostTypeMOCS" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">註記：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox ID="txRemark" runat="server" Width="8.5em"  ></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
