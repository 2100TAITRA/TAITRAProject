<%@ Page Language="c#" CodeBehind="IFT930.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFT930" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFT930 臨時憑證維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="IFT930" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
            <asp:TextBox Style="z-index: 0" ID="H_txCardId" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_txCardCert" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyUpperField">申請人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txUserName" runat="server" Width="8em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="lbEmpName" runat="server" CssClass="KeyUpperField"></asp:Label>
                        <asp:TextBox ID="H_txEmpName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label6" runat="server">新軟體憑證密碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txNewPin" runat="server" Width="5em" MaxLength="20"  TextMode="Password"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">軟體憑證密碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txPincode" runat="server" Width="5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">申請日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txApplyDate" runat="server" Width="5em" CssClass="RequireField" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label7" runat="server">舊軟體憑證密碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txOldPin" runat="server" Width="5em" MaxLength="20" TextMode="Password"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">申請原因：</asp:Label><BR/>
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">(最多50字)</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyReason" runat="server" Width="24em" CssClass="RequireField" Height="90px" MaxLength="50" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
            <asp:Button ID="btApply" runat="server" Text="申請憑證並啟用(S)" title="申請憑證並啟用(S)" AccessKey="S" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除憑證(D)" title="申請憑證並啟用(D)" AccessKey="D" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btGet" runat="server" Text="啟用憑證(S)" title="啟用憑證(S)" AccessKey="S" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btChangePin" runat="server" Text="密碼變更" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
