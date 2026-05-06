<%@ Page Language="c#" CodeBehind="ODT390.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT390" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT390 郵資拆帳作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR381" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server">拆帳方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblPropType" runat="server" RepeatDirection="Horizontal"></asp:RadioButtonList>
                        <asp:Label ID="lbPropType" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label6" runat="server">拆帳金額：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbSum" TabIndex="40" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">本次拆帳起始日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPostDateS" TabIndex="40" runat="server" CssClass="DisplayOnly" Width="5em" MaxLength="17" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server">起始郵寄編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPostSeqS" runat="server" CssClass="DisplayOnly" Width="6em" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">本筆金額：</asp:Label>
                        <asp:TextBox ID="txPostCostS" runat="server" CssClass="DisplayOnly" Width="3.5em" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">未拆帳金額：</asp:Label>
                        <asp:TextBox ID="txLastAmountS" runat="server" CssClass="DisplayOnly" Width="3.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">訖止日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPostDateE" runat="server" CssClass="DisplayOnly" Width="5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">訖止郵寄編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPostSeqE" runat="server" CssClass="DisplayOnly" Width="6em" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label15" runat="server">本筆金額：</asp:Label>
                        <asp:TextBox ID="txPostCostE" runat="server" CssClass="DisplayOnly" Width="3.5em" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label17" runat="server">未拆帳金額：</asp:Label>
                        <asp:TextBox ID="txLastAmountE" runat="server" CssClass="DisplayOnly" Width="3.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label9" runat="server">拆帳單編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPropNo" runat="server" CssClass="DisplayOnly" Width="5.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="拆帳估算" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="執行拆帳" DefaultStyle="newmode:block;modifymode:none;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消拆帳" DefaultStyle="newmode:block;modifymode:none;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="最近一次拆帳" DefaultStyle="newmode:block;modifymode:none;" ID="btLast"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 13px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
    </div></TBODY></TABLE>
</body>
</html>
