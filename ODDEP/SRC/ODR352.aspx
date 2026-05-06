<%@ Page Language="c#" CodeBehind="ODR352.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR352" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODR352 公文受文者清單列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR352" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <DIV class="DivTable" id="MainTable">
                <DIV class="dTR">
                    <DIV class="dTDTitle">
                        <asp:Label ID="Label7" runat="server">發文日期：</asp:Label></div>
                    <DIV class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="20" runat="server" CssClass="DatePicker" MaxLength="7"
                            Width="4em"></asp:TextBox>－
					    <asp:TextBox ID="txEDate" TabIndex="25" runat="server" CssClass="DatePicker" MaxLength="7"
                            Width="4em"></asp:TextBox></div>
                </div>
                <DIV class="dTR">
                    <DIV class="dTDTitle">
                        <asp:Label ID="Label3" runat="server">公文文號：</asp:Label></div>
                    <DIV class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="20" runat="server" CssClass="InputFieldNumeric" MaxLength="15" Width="9em"></asp:TextBox>
                    </div>
                </div>
                <DIV class="dTR">
                    <DIV class="dTDTitle">
                        <asp:Label ID="Label1" runat="server">列印報表：</asp:Label></div>
                    <DIV class="dTD">
                        <asp:RadioButton ID="rbReportA" runat="server" Text="電子公文清單(電子交換受文者)" GroupName="Report"></asp:RadioButton><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <asp:RadioButton ID="rbSortA" runat="server" Text="依發文日期及受文者分組" GroupName="Sort"></asp:RadioButton><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <asp:RadioButton ID="rbSortB" runat="server" Text="依發文日期及公文文號分組" GroupName="Sort"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbReportB" runat="server" Text="發文單位校對清單(全部受文者)" GroupName="Report"></asp:RadioButton></div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
