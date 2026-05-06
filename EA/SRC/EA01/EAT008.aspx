<%@ Page Language="c#" CodeBehind="EAT008.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAT008" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT008 機關共通性檔案保存年限基準表匯入作業</title>
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
    <form id="EAT008" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="AP_FILEIO_WS" Style="z-index: 102; left: 249px; position: absolute; top: 257px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="AP_WORK_PATH" Style="z-index: 102; left: 315px; position: absolute; top: 256px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txApplyDate" Style="z-index: 102; left: 315px; position: absolute; top: 256px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="XmlFilePath" Style="z-index: 102; left: 315px; position: absolute; top: 256px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txFileNameH" TabIndex="26" runat="server" MaxLength="16" Width="18px"></asp:TextBox>
            <asp:TextBox ID="txServerPath" Style="z-index: 102; left: 359px; position: absolute; top: 245px" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txFilePath_SV" Style="z-index: 102; left: 359px; position: absolute; top: 245px" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label1" runat="server">路徑：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox type="file" ID="txFilePath" runat="server" Width="12.5em"></asp:TextBox>
                    </div>
                </div>
                <asp:Label ID="Label2" runat="server">注意：重新匯入基準項目會導致原本分類表所建立基準項目編號的關聯資料清除</asp:Label>
                <asp:Label ID="Label3" runat="server">備註：請至檔管局下載保存年限基準表以供匯入</asp:Label>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="執行(E)" DefaultStyle="newmode:block;modifymode:none;" ID="btExecute" AccessKey="E" Title="執行(ALT+E)" TabIndex="1"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
