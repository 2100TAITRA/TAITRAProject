<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR503.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR503" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>EAR503提供史政機關檔案目錄列印作業</title>
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
    <form id="EAR503" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">銷毀計畫：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDPlan" TabIndex="4" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" runat="server" Title="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">計畫批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="4" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="8" Title="計畫批號(8)"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp1" runat="server" Title="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="4" runat="server" Width="15.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">史政機關名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrgName" runat="server" Width="22.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStore" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSort1" runat="server" Checked="True" GroupName="rbSort" Text="依檔號"></asp:RadioButton>
                        <asp:RadioButton ID="rbORDER_STOCK" runat="server" GroupName="rbSort" Text="依櫥位號"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">跳頁方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbGROUP_FILENO" runat="server" Checked="True" GroupName="rbGroup" Text="依檔號"></asp:RadioButton>
                        <asp:RadioButton ID="rbGROUP_STOCK" runat="server" GroupName="rbGroup" Text="依櫥位號"></asp:RadioButton>
                        <asp:RadioButton ID="rbGROUP_PLANNO" runat="server" GroupName="rbGroup" Text="依清理批號"></asp:RadioButton>
                        <asp:RadioButton ID="rbNONE" runat="server" GroupName="rbGroup" Text="不跳頁"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
