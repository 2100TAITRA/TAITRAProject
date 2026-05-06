<%@ Page Language="c#" CodeBehind="ODT315.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT315" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT315 派繕調整作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout" class="">
    <form id="ODT315" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" Width="5.5em">繕印人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOwnUserId" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <fieldset style="width: 23.5em; height: 6.5em">
                        <legend>調整設定</legend>
                        <div class="DivTable" id="Table3">
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5.5em">
                                    <asp:Label ID="Label7" runat="server">公文文號：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txDocNo" runat="server" CssClass="TextLabel" Width="8.5em" TabIndex="-1"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5.5em">
                                    <asp:TextBox ID="Textbox3" runat="server" CssClass="hide" Width="48px" AutoPostBack="True"></asp:TextBox>
                                    <asp:Label ID="Label3" runat="server">改分配給：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:DropDownList ID="dlOwnUserId2" runat="server" Width="8.5em"></asp:DropDownList>
                                    <asp:Button ID="Button1" runat="server" Text="確定"></asp:Button>
                                    <asp:Button ID="Button2" runat="server" Text="取消"></asp:Button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="overflow: auto; height: 12.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="50" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="HyDocNo" runat="server" NavigateUrl="javascript:ReturnValue()"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="繕印人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbOwnUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="查詢" ID="btSearch"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
