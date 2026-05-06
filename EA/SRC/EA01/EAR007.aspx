<%@ Page Language="c#" CodeBehind="EAR007.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAR007" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR007 案名表預覽列印作業</title>
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
    <form id="EAR007" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" TabIndex="1" runat="server" Width="2em" CssClass="RequireField" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="2" runat="server" Width="2em" CssClass="RequireField" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls" TabIndex="3" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="ibCls" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="KeepYear"></asp:RadioButton>
                        <asp:RadioButton ID="rbPermanent" runat="server" Text="永久" GroupName="KeepYear"></asp:RadioButton>
                        <asp:RadioButton ID="rbRegular" runat="server" Text="定期" GroupName="KeepYear"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
             <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel" AccessKey="O" Title="匯出Excel(ALT+O)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出ODS(C)" DefaultStyle="newmode:block;modifymode:block;" ID="btODS" AccessKey="C" Title="匯出ODS(ALT+C)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
