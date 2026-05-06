<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT140.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT140" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT140 部來文維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT140" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width : 6.5em">
                            <asp:Label ID="Label1" runat="server" CssClass="KeyField">處收文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 14em">
                            <asp:TextBox ID="txDocNo" runat="server" Width="8em" CssClass="KeyUpperField" MaxLength="15"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width : 6.5em">
                            <asp:Label ID="Label4" runat="server" CssClass="InputFieldLabel">部收文號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSrcRcvNo" runat="server" Width="8em" CssClass="DisplayOnly" MaxLength="15" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width : 6.5em">
                            <asp:Label ID="Label5" runat="server" CssClass="InputFieldLabel">主旨：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSubject" runat="server" Width="28.5em" CssClass="DisplayOnly" MaxLength="100"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width : 6.5em" style="height: 8px">
                            <asp:Label ID="Label2" runat="server" CssClass="InputFieldLabel">回報經濟部：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbIsReturnY" runat="server" Text="是" GroupName="gIsReturn" Checked="True"></asp:RadioButton>
                            <asp:RadioButton ID="rbIsReturnN" runat="server" Text="否" GroupName="gIsReturn" Checked="True"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width : 6.5em">
                            <asp:Label ID="Label3" runat="server" CssClass="InputFieldLabel">備註：</asp:Label>
                        </div>
                        <div class="dTD" style="width : 5.5em">
                            <asp:TextBox ID="txRemark" runat="server" Width="28.5em" MaxLength="100"></asp:TextBox>
                        </div>
                    </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
