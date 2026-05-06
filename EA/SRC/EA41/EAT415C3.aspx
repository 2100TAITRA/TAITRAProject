<%@ Page Language="c#" CodeBehind="EAT415C3.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT415C3" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT415C3 抽樣異常登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style type="text/css">
        .InputFieldLabel {
        }

        .auto-style2 {
            width: 97%;
        }
    </style>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT415C3" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txChild" CssClass="hide" runat="server"></asp:TextBox>
            <asp:TextBox ID="txClose" CssClass="hide" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">抽樣編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSampling_NO" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDOC_NO" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="lbEtop" runat="server" CssClass="hide">已轉為紙本公文</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="DetailTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:CheckBox ID="cbType1" runat="server" CssClass="InputFieldLabel" Text="線上瀏覽異常，異常訊息(原因)"></asp:CheckBox><br>
                        <asp:TextBox ID="txType1" runat="server" Width="35em" CssClass="InputFieldLabel" MaxLength="300" Height="4em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:CheckBox ID="cbType2" runat="server" CssClass="InputFieldLabel" Text="數位內容檢測軟體測試異常，異常訊息(原因)"></asp:CheckBox><br>
                        <asp:TextBox ID="txType2" runat="server" Width="35em" CssClass="InputFieldLabel" MaxLength="300" Height="4em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:CheckBox ID="cbTypeZ" runat="server" CssClass="InputFieldLabel" Text="其他異常，異常訊息(原因)"></asp:CheckBox><br>
                        <asp:TextBox ID="txTypeZ" runat="server" Width="35em" CssClass="InputFieldLabel" MaxLength="300" Height="4em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <asp:RadioButtonList ID="rbErrProce" runat="server" RepeatDirection="Horizontal" Width="35.5em">
                        <asp:ListItem Value="1" OnClick="fnErrProce('1');">處理中</asp:ListItem>
                        <asp:ListItem Value="2" OnClick="fnErrProce('2');">由備份倒回</asp:ListItem>
                        <asp:ListItem Value="3" OnClick="fnErrProce('3');">重新掃描</asp:ListItem>
                        <asp:ListItem Value="4" OnClick="fnErrProce('4');">轉為紙本公文</asp:ListItem>
                        <asp:ListItem Value="5" OnClick="fnErrProce('5')">無法修復，銷毀處理</asp:ListItem>
                    </asp:RadioButtonList>
                    <asp:Label ID="lbFileInfo" runat="server" CssClass="InputFieldLabel"></asp:Label>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" AccessKey="M" Title="開啟舊檔" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" AccessKey="S" Title="儲存"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete" AccessKey="D" Title="清除"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel" AccessKey="Z" Title="取消"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:none;modifymode:none;" ID="btPreview" AccessKey="E" Title="預覽"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" DefaultStyle="newmode:none;modifymode:none;" ID="btPrint" AccessKey="P" Title="列印"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
