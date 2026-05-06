<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKS501.aspx.cs" AutoEventWireup="false" Inherits="AK.AKS501" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKS501 應用申請查詢共用子視窗</title>
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
    <form id="AKS501" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div style="display: none; z-index: 105; left: 15px; overflow: auto; width: 261px; position: absolute; top: 478px; height: 78px">
            <asp:TextBox ID="txDateS" runat="server" Width="82px"></asp:TextBox>
            <asp:TextBox ID="txDateE" runat="server" Width="82px"></asp:TextBox>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
            <asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server" Width="83px">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDateS" TabIndex="1" runat="server" Width="4em" MaxLength="7" CssClass="InputFieldNumeric">0920810</asp:TextBox>－
						<asp:TextBox ID="txApplyDateE" TabIndex="6" runat="server" Width="4em" MaxLength="7" CssClass="InputFieldNumeric">0920810</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">申請書號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyNoS" TabIndex="11" runat="server" Width="5.5em" MaxLength="10" CssClass="InputFieldNumeric">0920810111</asp:TextBox>－
						<asp:TextBox ID="txApplyNoE" TabIndex="16" runat="server" Width="5.5em" MaxLength="10" CssClass="InputFieldNumeric">0920810111</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="11em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="txUserValue" runat="server" CssClass="hidden"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStatus" runat="server" Width="11em">
                            <asp:ListItem Value="0">全部</asp:ListItem>
                            <asp:ListItem Value="1">已接獲申請</asp:ListItem>
                            <asp:ListItem Value="2">審核中</asp:ListItem>
                            <asp:ListItem Value="3">駁回</asp:ListItem>
                            <asp:ListItem Value="4">已核准</asp:ListItem>
                            <asp:ListItem Value="7">已寄送</asp:ListItem>
                            <asp:ListItem Value="9">已繳費</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server">999</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請書號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlApplyNo" runat="server" Width="4.5em">HyperLink</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbApplyDate" runat="server">092/01/01</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請人">
                                <ItemTemplate>
                                    <asp:Label ID="lbPubName" runat="server">Label</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server">Label</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUsername" runat="server">Label</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbStatus" runat="server">Label</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜索" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
