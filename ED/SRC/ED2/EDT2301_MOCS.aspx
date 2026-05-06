<%@ Page Language="c#" CodeBehind="EDT2301_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT2301_MOCS" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT2301 人民陳情案件維護作業</title>
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
    <form id="EDT2301" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txDocNo" runat="server" Width="6.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">身分類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlIdType" runat="server" Width="7em">
                            <asp:ListItem Value="1">一般公務人員</asp:ListItem>
                            <asp:ListItem Value="2">人事人員</asp:ListItem>
                            <asp:ListItem Value="3">退休人員</asp:ListItem>
                            <asp:ListItem Value="4">一般民眾</asp:ListItem>
                            <asp:ListItem Value="5">匿名</asp:ListItem>
                            <asp:ListItem Value="6">其他</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">來文類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlRcvType" runat="server" Width="5em">
                            <asp:ListItem Value="1">函及書函</asp:ListItem>
                            <asp:ListItem Value="2">電子郵件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">案情分析：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlCaseType" runat="server" Width="5em">
                            <asp:ListItem Value="01">人事制度</asp:ListItem>
                            <asp:ListItem Value="02">組織編制</asp:ListItem>
                            <asp:ListItem Value="03">職務列等</asp:ListItem>
                            <asp:ListItem Value="04">法規疑義</asp:ListItem>
                            <asp:ListItem Value="05">任用審查</asp:ListItem>
                            <asp:ListItem Value="06">考績俸級</asp:ListItem>
                            <asp:ListItem Value="07">退撫資遣</asp:ListItem>
                            <asp:ListItem Value="08">公保事項</asp:ListItem>
                            <asp:ListItem Value="09">退休照護</asp:ListItem>
                            <asp:ListItem Value="10">服務休假</asp:ListItem>
                            <asp:ListItem Value="11">精省權益</asp:ListItem>
                            <asp:ListItem Value="12">分發訓練</asp:ListItem>
                            <asp:ListItem Value="13">進用遷調</asp:ListItem>
                            <asp:ListItem Value="14">其他</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">答覆區分：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">函覆內容符合陳情者所請意旨</asp:ListItem>
                            <asp:ListItem Value="2">陳情內容留供參考</asp:ListItem>
                            <asp:ListItem Value="3">不合規定予以婉復</asp:ListItem>
                            <asp:ListItem Value="4">尚未答覆陳情者</asp:ListItem>
                            <asp:ListItem Value="5">轉請各單位逕復</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
