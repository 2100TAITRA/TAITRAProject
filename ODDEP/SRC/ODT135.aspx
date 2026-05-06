<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT135.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT135" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT135 已登錄待傳送電子收文查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT135" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label1" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField DatePicker" ID="txSDate" TabIndex="10" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                        <asp:Label class="RequireField" ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox class="RequireField DatePicker" ID="txEDate" TabIndex="20" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">速別：</asp:Label>
                        <asp:DropDownList ID="dlSpeed" runat="server" Width="4.5em"></asp:DropDownList>
                        <asp:Label ID="Label6" runat="server">密等：</asp:Label>
                        <asp:DropDownList ID="dlSecNo" runat="server" Width="5em"></asp:DropDownList>
                        <asp:TextBox ID="H_Name" runat="server" CssClass="hide" Width="14px"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" runat="server" Width="9em"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" Width="15em"></asp:TextBox>
                        <asp:TextBox ID="H_Roler" TabIndex="-1" runat="server" CssClass="hide" Width="2px"></asp:TextBox>
                        <asp:TextBox ID="atweb" runat="server" CssClass="hide" Width="9px"></asp:TextBox>
                        <asp:TextBox ID="h_OrgNo" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
                        <asp:TextBox ID="h_DeptNo" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
                        <asp:TextBox ID="h_UserId" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 17em">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="50" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlDocNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="收文時間">
                                        <ItemTemplate>
                                            <asp:Label ID="laDateTime" runat="server">0930101</asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文日期">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txFromDate" TabIndex="-1" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文機關">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txFromOrgno" TabIndex="-1" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文字號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="H_ID" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:Label ID="lbFromNo" runat="server"></asp:Label>
                                            <asp:Button ID="btOpenElec" runat="server" Width="71px" Text="開啟電子檔" Visible="False"></asp:Button>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txFromSubject" TabIndex="-1" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
            </div>
        </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜索" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除" ID="btClean"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
