<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>

<%@ Page Language="c#" CodeBehind="EDM030.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM030" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDM030 公文性質代碼維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDM030" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文性質代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPtyNo" runat="server" Width="1.5em" CssClass="ED_KeyField" MaxLength="1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">公文性質名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPtyName" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">管制方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlDocMode" runat="server" Width="6.5em">
                            <asp:ListItem Value="0">以文管制</asp:ListItem>
                            <asp:ListItem Value="1">以案管制</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">限辦期限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIsOpen" runat="server" Text="開放輸入"></asp:CheckBox>
                        <asp:CheckBox Style="z-index: 0" ID="cbOutDueRule" runat="server" Text="外陳外會時應調整限辦日期"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label Style="z-index: 0" ID="Label7" runat="server">逾限基準：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton Style="z-index: 0" ID="rbDDueDate" runat="server" Text="限辦日期" GroupName="OverDue"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbPDueDate" runat="server" Text="原始限辦日期" GroupName="OverDue"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPtyDesc" runat="server" Width="20.5em" MaxLength="80"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">歸檔類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrgStore" runat="server" Text="機關庫房" GroupName="StoreType"></asp:RadioButton>
                        <asp:RadioButton ID="rbUnitStore" runat="server" Text="單位庫房" GroupName="StoreType"></asp:RadioButton>
                        <asp:RadioButton ID="rbDefaultStore" runat="server" Text="依系統預設" GroupName="StoreType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRankSeq" runat="server" Width="2em" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" style="display:none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
