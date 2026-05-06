<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR480.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR480" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR480 公文電子交換統計作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR480" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <cc1:ComboBox ID="lbDept" runat="server" CssClass="hide" Width="95px"></cc1:ComboBox><asp:TextBox CssClass="hide" ID="h_txYM" TabIndex="15" runat="server" MaxLength="5"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label CssClass="KeyField" ID="Label1" runat="server">列印月份：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="KeyFieldNumeric" ID="txSMon" TabIndex="10" runat="server" Width="3em" MaxLength="5"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox CssClass="KeyFieldNumeric" ID="txEMon" TabIndex="15" runat="server" Width="3em" MaxLength="5"></asp:TextBox>
                        <asp:Panel ID="pCombine" runat="server" style="display:inline-block">
                            <asp:CheckBox ID="cbCombine" runat="server" Text="區間列印"></asp:CheckBox>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">列印單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrg" runat="server" Text="全機關" Checked="True" GroupName="report"></asp:RadioButton>
                        <asp:RadioButton ID="rbUnit" runat="server" Text="內部單位" GroupName="report"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubOu" runat="server" Text="含二級單位"></asp:CheckBox>
                    </div>
                </div>
                <asp:Panel ID="dTRIssueDetail" runat="server">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">&nbsp;&nbsp;</div>
                        <div class="dTD">
                            <asp:CheckBox ID="cbIssueDetail" runat="server" Text="發文細項統計"></asp:CheckBox>
                        </div>
                    </div>
                </asp:Panel>
                <asp:Panel ID="dTRODR480L2" runat="server">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">&nbsp;&nbsp;</div>
                        <div class="dTD">
                            <asp:CheckBox Style="z-index: 0" ID="cbODR480L2" runat="server" Text="填報系統資料"></asp:CheckBox>
                        </div>
                    </div>
                </asp:Panel>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server" Visible="False">列印單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="6em" Rows="8" Visible="False"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 1em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">目前統計最大年月：888年88月</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="統計(S)" AccessKey="S" title="統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
