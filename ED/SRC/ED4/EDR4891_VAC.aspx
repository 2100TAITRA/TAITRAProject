<%@ Page Language="c#" CodeBehind="EDR4891_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4891_VAC" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4891_VAC 線上簽核公文件數報表統計列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR4891_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="dTR">
                            <asp:TextBox ID="txRCVDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server" Width="16px" CssClass="RequireField">～</asp:Label>
                            <asp:TextBox ID="txRCVDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label12" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <cc1:ComboBox ID="dlDept" TabIndex="240" runat="server" CssClass="comboBox" Width="10em" data-CN="承辦單位"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label13" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="252" runat="server" Rows="10" CssClass="comboBox" Width="6em" data-CN="承辦人"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label14" runat="server">警示比率：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAlertRatio" TabIndex="0" runat="server" Width="3em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server" Width="16px">%</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">彙總別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" runat="server" Text="單位" GroupName="rbSummaryType" data-CN="單位"></asp:RadioButton>
                        <asp:RadioButton ID="rbUser" runat="server" Text="個人" GroupName="rbSummaryType" data-CN="個人"></asp:RadioButton>
                    </div>
                </div>
                <asp:ListBox id="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
