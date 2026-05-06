<%@ Page Language="c#" CodeBehind="EAT006.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAT006" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT006 分類號匯出入作業</title>
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
    <form id="EAT006" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="AP_FILEIO_WS" Style="z-index: 102; position: absolute; top: 257px; left: 249px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txApplyDate" Style="z-index: 102; position: absolute; top: 256px; left: 315px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txServerPath" Style="z-index: 102; position: absolute; top: 245px; left: 359px" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txLog" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server" CssClass="RequireField">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" Width="2em" CssClass="RequireUpperField" MaxLength="3"></asp:TextBox>
                        <asp:ImageButton ID="ibVer" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">作業模式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbImport" runat="server" Text="匯入" GroupName="btGroup" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbExport" runat="server" Text="匯出" GroupName="btGroup"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb_XML" runat="server" GroupName="btType" Text="XML" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb_EXCEL" runat="server" GroupName="btType" Text="EXCEL"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbVersion" runat="server">版本：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlVersion" runat="server" Width="6.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR" id="divDirection">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">路徑：</asp:Label>
                    </div>
                    <div class="dTD">
                        <input ID="txFilePath" type="File" runat="server" Width="12.5em"/>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label5" runat="server">匯入僅提供匯入XML功能</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="執行(E)" AccessKey="E" Title="執行(ALT+E)" DefaultStyle="newmode:block;modifymode:none;" ID="btExecute"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
