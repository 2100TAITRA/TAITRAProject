<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR214.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR214" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR214 承辦公文案件明細表列印作業</title>
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
    <form id="EDR214" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_dlDept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>~
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDueDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>　
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>　
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:DropDownList ID="dlDocProperty" runat="server" Width="12em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">專案別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlIsDocProperty3" runat="server" Width="12em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Y">專案類</asp:ListItem>
                            <asp:ListItem Value="N">非專案</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">逾期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:DropDownList ID="dlOverDue" runat="server" Width="12em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1-6">1-5.5</asp:ListItem>
                            <asp:ListItem Value="6-12">6-11.5</asp:ListItem>
                            <asp:ListItem Value="12-18">12-17.5</asp:ListItem>
                            <asp:ListItem Value="18-30">18-29.5</asp:ListItem>
                            <asp:ListItem Value="30-42">30-41.5</asp:ListItem>
                            <asp:ListItem Value="42-">>=42</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">逾期別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlIsOverDue" runat="server" Width="12em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Delay">已逾期</asp:ListItem>
                            <asp:ListItem Value="NoDelay">未逾期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">公文別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:DropDownList ID="dlNewByOu" runat="server" Width="12em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="N">來文</asp:ListItem>
                            <asp:ListItem Value="Y">創稿</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">結案別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlState" runat="server" Width="12em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Close">已結案</asp:ListItem>
                            <asp:ListItem Value="Wait">未結案</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出Excel(ALT+C)" ID="btODS"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
