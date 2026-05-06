<%@ Page Language="c#" CodeBehind="EAC290.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAC290" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAC290 待掃描批號查詢作業</title>
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
    <form id="EAC290" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbScanNo" runat="server">待掃描批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txScanNoS" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="lbline" runat="server">～</asp:Label>
                        <asp:TextBox ID="txScanNoE" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbGroupDate" runat="server">成批日期：</asp:Label>
                    </div>
                    <div class="dTD" style="height: 30px">
                        <asp:TextBox ID="txGrpDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="lbline2" runat="server">～</asp:Label>
                        <asp:TextBox ID="txGrpDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbUpdate" runat="server">更新日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpdateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="lbline3" runat="server">～</asp:Label>
                        <asp:TextBox ID="txUpdateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbState" runat="server">狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlState" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">送掃瞄</asp:ListItem>
                            <asp:ListItem Value="2">已送回待掃描</asp:ListItem>
                            <asp:ListItem Value="3">已掃描送回</asp:ListItem>
                            <asp:ListItem Value="4">收件歸檔</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbDocNo" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">報表種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbReportType1" runat="server" GroupName="rbType" Checked="True" Text="批號清單"></asp:RadioButton>
                        <asp:RadioButton ID="rbReportType2" runat="server" GroupName="rbType" Text="待掃描清單"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="tbSelect" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                            <asp:Button runat="server" Text="全部選取" ID="btSelectAll" Title="勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" Title="反向勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="批次帶回" ID="btSelectBack" Title="將資料帶回主視窗"></asp:Button>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 13.5em">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="待掃描批號">
                                        <ItemTemplate>
                                                <asp:HyperLink ID="hlScanNo" TabIndex="0" runat="server" Width="1.5em"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="目前狀態">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNowState" runat="server"></asp:Label>
                                        </ItemTemplate>
                                        <FooterStyle HorizontalAlign="Center"></FooterStyle>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="成批日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbGroupDay" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="更新日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbUpdateDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="更新人">
                                        <ItemTemplate>
                                            <asp:Label ID="lbUpdateEmp" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜尋(F)" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽(E)" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" Text="列印(P)" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
