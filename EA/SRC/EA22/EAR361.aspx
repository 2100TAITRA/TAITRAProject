<%@ Page Language="c#" CodeBehind="EAR361.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAR361" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR361 案卷檔案編目數量統計列印作業</title>
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
    <form id="EAR361" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">編目年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="0" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbHaveSec" runat="server" Text="含密件" CssClass ="hide"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbUser" runat="server">編目人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR" >
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="hide">查詢範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbFileuser" runat="server" Text="依編目人員" GroupName="range" CssClass="hide"></asp:RadioButton>
                        <asp:RadioButton ID="rbUser" runat="server" Text="本人" GroupName="range" CssClass="hide"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全機關" GroupName="range" CssClass="hide"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="統計(S)" ID="btStatic"   Accesskey = "S" Title = "統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview" AccessKey="E"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint" AccessKey="P"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(O)" ID="btExcel" AccessKey="O" Title="匯出Excel(ALT+O)"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS" ID="btODS"  Title="匯出ODS"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
