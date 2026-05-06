<%@ Page Language="c#" CodeBehind="EDT394C2.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDT394C2" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT394C2 併封明細子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDT394C2" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator" CssClass="hide"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hide"></asp:ListBox>
            <asp:TextBox ID="txhidden" runat="server" AutoPostBack="True" EnableViewState="False" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbIssueNo" TabIndex="0" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbIssueOrgName" TabIndex="0" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
	                <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                </asp:Panel>
                <div class="GridDiv" style="overflow: auto; height: 218px">
                    <table id="dg1" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
                        style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="width: 1.5em">選</td>
                                <td style="width: 2.5em">序</td>
                                <td style="width: 6.5em">併封文號</td>
                                <td style="width: 15em">受文者</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
