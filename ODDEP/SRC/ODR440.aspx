<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="ODR440.aspx.cs" AutoEventWireup="false" Inherits="DF.ODR440" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR440 公文數量時效分析列印</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR440" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" CssClass="RequireField">列印年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txSYear" TabIndex="1" runat="server" CssClass="RequireField" Width="2em" MaxLength="3">092</asp:TextBox>
                        <asp:TextBox ID="tx1" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">列印單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="6em">
                            <asp:ListItem Value="主任秘書室">主任秘書室</asp:ListItem>
                            <asp:ListItem Value="企劃組">企劃組</asp:ListItem>
                            <asp:ListItem Value="檔案徵集組">檔案徵集組</asp:ListItem>
                            <asp:ListItem Value="檔案典藏組">檔案典藏組</asp:ListItem>
                            <asp:ListItem Value="應用服務組">應用服務組</asp:ListItem>
                            <asp:ListItem Value="檔案資訊組">檔案資訊組</asp:ListItem>
                            <asp:ListItem Value="秘書室">秘書室</asp:ListItem>
                            <asp:ListItem Value="人事室">人事室</asp:ListItem>
                            <asp:ListItem Value="會計室">會計室</asp:ListItem>
                        </cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">統計方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" GroupName="wd" Text="全機關"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" runat="server" GroupName="wd" Text="依處室(組)"></asp:RadioButton>
                        <asp:RadioButton ID="rb3" runat="server" GroupName="wd" Text="依科(股)"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
