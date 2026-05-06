<%@ Page Language="c#" CodeBehind="IFM003.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM003" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFM003 新增角色作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="IFM003" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <DIV id="BaseTable" class="DivBaseTable">
                    <DIV class="DivTable" id="MainTable">
                        <DIV class="dTR">
                            <DIV class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="lbOrg" runat="server" CssClass="KeyField">隸屬機關：</asp:Label></DIV>
                            <DIV class="dTD">
                                <asp:DropDownList ID="dlOrgno" runat="server" Width="15em"></asp:DropDownList></DIV>
                        </DIV>
                        <DIV class="dTR">
                            <DIV class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="lbDept" runat="server" CssClass="KeyField">隸屬單位：</asp:Label></DIV>
                            <DIV class="dTD">
                                <asp:DropDownList ID="dlDept" runat="server" Width="15em"></asp:DropDownList></DIV>
                        </DIV>
                        <DIV class="dTR">
                            <DIV class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="lbRoleNo" runat="server" CssClass="RequireField">角色代碼：</asp:Label></DIV>
                            <DIV class="dTD">
                                <asp:TextBox ID="txRoleNo" TabIndex="0" runat="server" Width="3em" CssClass="RequireUpperField" MaxLength="5"></asp:TextBox></DIV>
                        </DIV>
                        <DIV class="dTR">
                            <DIV class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="lbRoleName" runat="server" CssClass="RequireField">角色名稱：</asp:Label></DIV>
                            <DIV class="dTD">
                                <asp:TextBox ID="txRoleName" TabIndex="0" runat="server" Width="15em" CssClass="RequireField" MaxLength="20"></asp:TextBox></DIV>
                        </DIV>
                    </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; left: 776px; position: absolute; top: 112px" ID="H_dlDept_Value"
            runat="server" Width="1px" CssClass="hide" Height="24px"></asp:TextBox>
    </form>
</body>
</html>
