<%@ Page Language="c#" CodeBehind="IFM331.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM331" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFM331 預設兼辦代理人設定作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="/STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="IFM100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="KeyField">使用者帳號：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txAccount" runat="server" Width="10.5em" TabIndex="2" MaxLength="20" CssClass="KeyUpperField"></asp:TextBox></div>
                </div>
                <br/>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">兼任單位1：</div>
                    <div class="dTD"><asp:DropDownList ID="dlDept1" runat="server"  Width="10em"></asp:DropDownList></div>
                    <div class="dTDTitle" style="width: 6.5em">代理人：</div>
                    <div class="dTD"><asp:TextBox ID="txAgent1" runat="server"></asp:TextBox><asp:imagebutton id="btHelp1" tabIndex="0" runat="server" ImageUrl="/STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton><asp:TextBox ID="txEmpName1" ReadOnly="true" CssClass="DisplayOnly" runat="server"></asp:TextBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">兼任單位2：</div>
                    <div class="dTD"><asp:DropDownList ID="dlDept2" runat="server" Width="10em"></asp:DropDownList></div>
                    <div class="dTDTitle" style="width: 6.5em">代理人：</div>
                    <div class="dTD"><asp:TextBox ID="txAgent2" runat="server"></asp:TextBox><asp:imagebutton id="btHelp2" tabIndex="0" runat="server" ImageUrl="/STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton><asp:TextBox ID="txEmpName2" ReadOnly="true" CssClass="DisplayOnly" runat="server"></asp:TextBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">兼任單位3：</div>
                    <div class="dTD"><asp:DropDownList ID="dlDept3" runat="server"  Width="10em"></asp:DropDownList></div>
                    <div class="dTDTitle" style="width: 6.5em">代理人：</div>
                    <div class="dTD"><asp:TextBox ID="txAgent3" runat="server"></asp:TextBox><asp:imagebutton id="btHelp3" tabIndex="0" runat="server" ImageUrl="/STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton><asp:TextBox ID="txEmpName3" ReadOnly="true" CssClass="DisplayOnly" runat="server"></asp:TextBox></div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
