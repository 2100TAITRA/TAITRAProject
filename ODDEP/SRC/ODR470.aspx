<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR470.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR470" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR470 祇ゅら计参璸穨</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR470" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:ListBox ID="lbDept" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireFieldN">厨癬ù</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearSt" TabIndex="10" runat="server" MaxLength="5" Width="3em" CssClass="RequireFieldNumeric">12345</asp:TextBox>
                        <asp:Label ID="Label2" runat="server">~</asp:Label>
                        <asp:TextBox ID="txYearEt" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5">12345</asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="rptCtrl">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireFieldN">ン计参璸よΑ</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:radiobutton id="rbAll" runat="server" Text="ぃ跋だ" GroupName="RptType"></asp:radiobutton>
						<asp:radiobutton id="rbSignType" runat="server" Text="ㄌ帽よΑ参璸" GroupName="RptType"></asp:radiobutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIssueCount" runat="server" Text="陪ボ祇ゅン计"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubOu" runat="server" Text="虫"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <asp:Label ID="lbMaxYear" runat="server">ヘ玡参璸程888</asp:Label>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="参璸" ID="btStatic"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="箇凝" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" Text="" ID="btPrint"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
