<%@ Page Language="c#" CodeBehind="EDM050.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM050" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDM050 公文文別代碼維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDM050" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="lbNo" runat="server" CssClass="KeyField">文別代碼：</asp:Label>
                    </div>
                    <div>
                        <asp:TextBox ID="txKeyFld" onkeyup="ED_jf_CheckFull()" TabIndex="0" runat="server" Width="2em" CssClass="ED_KeyField" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="lbName" runat="server" CssClass="RequireField">文別名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocName" onkeyup="ED_jf_CheckFull()" TabIndex="1" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="80"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="lbInnerNo" runat="server">內部代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInnerNo" onkeyup="ED_jf_CheckFull()" TabIndex="2" runat="server" Width="1.5em" CssClass="ED_InpField" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="lbInnerName" runat="server">內部名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInnerName" onkeyup="ED_jf_CheckFull()" TabIndex="3" runat="server" Width="10.5em" MaxLength="80"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="lbDefBTypeNo" runat="server">預設業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDefBTypeNo" TabIndex="5" runat="server" CssClass="comboBox" Width="13.5em" Rows="5"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="lbDefultNo" runat="server">預設代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbDefaultNo" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="*" Selected="True">是</asp:ListItem>
                            <asp:ListItem Value=" ">否</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
