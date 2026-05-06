<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR439_BSMI.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR439_BSMI" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>EDR439_BSMI 人民陳情案件統計及明細表列印作業</title>
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
    <form id="EDR439_BSMI" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label3" runat="server">收文日期：</asp:Label></td>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txRcvDateS" TabIndex="1" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>─
                        <asp:TextBox ID="txRcvDateE" TabIndex="2" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txCloseDateS" TabIndex="3" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>─
									<asp:TextBox ID="txCloseDateE" TabIndex="4" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label2" runat="server">時效選項：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em;">
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="rangeType"></asp:RadioButton>
                        <asp:RadioButton ID="rbIn6Days" runat="server" Text="6天以內" GroupName="rangeType"></asp:RadioButton>
                        <asp:RadioButton ID="rb7to14Days" runat="server" Text="7-14天" GroupName="rangeType"></asp:RadioButton>
                        <asp:RadioButton ID="rb15to30Days" runat="server" Text="15-30天" GroupName="rangeType"></asp:RadioButton>
                        <asp:RadioButton ID="rbOver31Days" runat="server" Text="逾期(31天以上)" GroupName="rangeType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label4" runat="server">報表類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:RadioButton ID="rbRptCount" runat="server" Text="統計表" GroupName="rptType"></asp:RadioButton>
                        <asp:RadioButton ID="rbRptDetail" runat="server" Text="明細表" GroupName="rptType"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
