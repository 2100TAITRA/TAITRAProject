<%@ Page Language="c#" CodeBehind="AKP310C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKP310C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKP310C1 檔案目錄執行記錄查詢</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKP310C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 101; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">執行日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="40" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7">0123456</asp:TextBox>
                        <asp:Label ID="Label4" runat="server">─</asp:Label>
                        <asp:TextBox ID="txEDate" TabIndex="50" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7">0123456</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">檔案目錄類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbCO_TYPE" runat="server" Width="8.5em" Checked="True" Text="定期檔案目錄"></asp:CheckBox>
                        <asp:CheckBox ID="cbTO_TYPE" runat="server" Width="8.5em" Checked="True" Text="移轉檔案目錄"></asp:CheckBox>
                        <asp:CheckBox Style="z-index: 0" ID="cbEO_TYPE" runat="server" Width="8.5em" Checked="True" Text="移交檔案目錄"></asp:CheckBox>
                        <asp:CheckBox ID="cbDO_TYPE" runat="server" Checked="True" Text="銷毀檔案目錄"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 16em">
                    <asp:DataGrid ID="dg1" runat="server" CssClass="hide" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <itemtemplate>
                                    <asp:Label ID="lbSqlNo" runat="server"></asp:Label>
                                </itemtemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="轉出日期">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <itemtemplate>
                                    <asp:Label ID="lbEXEC_DATE" runat="server"></asp:Label>
                                </itemtemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔案目錄單位">
                                <itemtemplate>
                                    <asp:Label ID="lbFD_UNIT" runat="server"></asp:Label>
                                </itemtemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔案目錄種類">
                                <itemtemplate>
                                    <asp:Label ID="lbEXEC_TYPE" runat="server"></asp:Label>
                                </itemtemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目錄處理模式">
                                <itemtemplate>
                                    <asp:Label ID="lbEXEC_95FILE" runat="server"></asp:Label>
                                </itemtemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動日期區間">
                                <itemtemplate>
                                    <asp:Label ID="lbOUT_DATE" runat="server"></asp:Label>
                                </itemtemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="重新搜索(Q)" AccessKey="Q" Title="重新搜索(ALT+Q)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 102; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 103; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
