<%@ Page Language="c#" CodeBehind="EDR132.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR132" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR132 公文異動查詢作業</title>
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
    <form id="EDR132" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">儲存時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">~</asp:Label>
                        <asp:TextBox ID="txDateE" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 18em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="儲存時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSaveTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="儲存人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbUser" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="處理期限">
                                <ItemTemplate>
                                    <asp:Label ID="lbLeadTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="業務類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbWorkType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文性質">
                                <ItemTemplate>
                                    <asp:Label ID="lbProperty" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="速別">
                                <ItemTemplate>
                                    <asp:Label ID="lbSpeed" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="密等">
                                <ItemTemplate>
                                    <asp:Label ID="lbSec" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="解密條件">
                                <ItemTemplate>
                                    <asp:Label ID="lbRmvSec_Cond" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
