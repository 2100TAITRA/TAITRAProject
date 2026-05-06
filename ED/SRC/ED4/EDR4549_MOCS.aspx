<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR4549_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4549_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4549 公文個人時效分析列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR4549_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">統計月份：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearMonth" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15em">
                        <asp:Label ID="Label2" runat="server">列印單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                   <div class="dTR">
                    <div class="dTDTitle" style="width: 15em">
                        <asp:Label ID="Label3" runat="server">報表類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:RadioButton ID="tbTypeStat" runat="server" Text="承辦人時效分析表" GroupName="rptType"></asp:RadioButton>
                        <asp:RadioButton ID="rbTypeIssue" runat="server" Text="個人辦理案件天數統計表" GroupName="rptType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 19.5em">
                        <asp:Label ID="lbMaxYearmonth" runat="server"></asp:Label>
                        <asp:TextBox ID="hMaxMonth" runat="server" CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="統計" DefaultStyle="newmode:block;modifymode:none;" ID="btStatic"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
