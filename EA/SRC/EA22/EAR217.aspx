<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR217.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAR217" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR217 檔案卷數統計表列印作業</title>
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
    <form id="EAR217" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <fieldset style="width: 22.5em; height: 4em">
                    <legend>列印報表</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em;">
                            <asp:Label ID="Label1" runat="server">歸檔分類：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbAA" runat="server" Text="專案卷" GroupName="ClassType"></asp:RadioButton>
                            <asp:RadioButton ID="rbBB" runat="server" Text="列管卷" GroupName="ClassType"></asp:RadioButton>
                            <asp:RadioButton ID="rbOther" runat="server" Text="雜項卷" GroupName="ClassType"></asp:RadioButton>
                            <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="ClassType"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em;">
                            <asp:Label ID="Label2" runat="server">註記分類：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlStoreNo" runat="server">
                                <asp:ListItem Value=""></asp:ListItem>
								<asp:ListItem Value="01">未註記</asp:ListItem>
								<asp:ListItem Value="02">註記1</asp:ListItem>
								<asp:ListItem Value="03">註記2</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
