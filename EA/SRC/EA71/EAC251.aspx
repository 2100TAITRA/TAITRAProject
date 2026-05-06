<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAC251.aspx.cs" AutoEventWireup="false" Inherits="EA71.EAC251" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAC251 檔案目錄執行記錄查詢視窗</title>
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
    <form id="EAC251" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericChild.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">執行日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="Textbox2" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>－
                        <asp:TextBox ID="Textbox3" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">檔案目錄類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="CheckBox8" runat="server" Text="案卷檔案目錄彙送"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox3" runat="server" Text="案卷檔案銷毀目錄"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox2" runat="server" Text="案卷檔案移交目錄"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox7" runat="server" Text="案卷檔案移轉目錄"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox6" runat="server" Text="案件檔案目錄彙送"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox5" runat="server" Text="案件檔案銷毀目錄"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox4" runat="server" Text="案件檔案移交目錄"></asp:CheckBox><br>
                        <asp:CheckBox ID="CheckBox1" runat="server" Text="案件檔案移轉目錄"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div style="height: 12.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="執行日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRead1" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="作業批號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlLink" TabIndex="0" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目錄類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbRead2" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="資料範圍">
                                <ItemTemplate>
                                    <asp:Label ID="Label3" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Text="搜尋" ID="btSearch"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="關閉" ID="btPrint" ToolTip="關閉"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
