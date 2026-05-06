<%@ Page Language="c#" CodeBehind="DFM310C1.aspx.cs" AutoEventWireup="false" Inherits="AK.DFM310C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>DFM310C1 伺服機查詢子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style type="text/css">
        .formatCommentText {
            word-break: break-all;
        }
    </style>

</head>
<body ms_positioning="GridLayout">
    <form id="DFM310C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜索" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 102; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 103; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" TabIndex="-1" runat="server">伺服機屬性：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlProperty" TabIndex="10" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">正式伺服機</asp:ListItem>
                            <asp:ListItem Value="2">備援伺服機</asp:ListItem>
                            <asp:ListItem Value="3">光碟櫃伺服機</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" id="dgDIV" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="伺服機編號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="<%# &quot;javascript:ReturnValue('&quot;+DataBinder.Eval(Container,&quot;DataItem.SRV_NO&quot;)+&quot;','&quot;+DataBinder.Eval(Container,&quot;DataItem.SRV_ALIAS&quot;)+&quot;','&quot;+DataBinder.Eval(Container,&quot;DataItem.SRV_NAME&quot;)+&quot;','&quot;+ DataBinder.Eval(Container,&quot;DataItem.SRV_IP&quot;)+&quot;')&quot; %>" Text='<%# DataBinder.Eval(Container, "DataItem.SRV_NO") %>'></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:BoundColumn DataField="SRV_ALIAS" HeaderText="伺服機別名"></asp:BoundColumn>
                            <asp:BoundColumn DataField="SRV_NAME" HeaderText="電腦名稱" ItemStyle-CssClass="formatCommentText"></asp:BoundColumn>
                            <asp:BoundColumn DataField="SRV_TYPENAME" HeaderText="伺服機屬性"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
