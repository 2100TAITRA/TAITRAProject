<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKM334.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM334" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM334 電子檔案資訊維護</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden" ms_positioning="GridLayout">
    <form id="AKM334" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div Class="hidden" style="z-index: 103; width: 506px; height: 39px; overflow: auto; top: 202px; left: 168px">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="88px" Height="32px"></asp:ListBox>
            <asp:TextBox Style="z-index: 102; position: absolute; top: 352px; left: 32px" ID="H_FileID" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable">
                <div class="GridDiv" style="height: 27.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server">Label</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="儲存媒體">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFileID" TabIndex="-1" runat="server" CssClass="displayonly" Width="5.5em" ReadOnly="True">1234567890</asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子檔別">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFileGrp" TabIndex="-1" runat="server" Width="6.5em" CssClass="displayonly" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子檔名">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFileName" TabIndex="-1" runat="server" CssClass="displayonly" Width="14.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="儲存位置">
                                <ItemTemplate>
                                    <asp:TextBox ID="txVolume" TabIndex="-1" runat="server" CssClass="displayonly" Width="13.5em" ReadOnly="True"></asp:TextBox>
                                    <asp:TextBox ID="H_txVolume" TabIndex="-1" runat="server" CssClass="hide" ReadOnly="True"></asp:TextBox>
                                    <asp:TextBox ID="dbFile_ID" TabIndex="-1" runat="server" CssClass="hide" ReadOnly="True"></asp:TextBox>
                                    <asp:TextBox ID="H_txFileID" TabIndex="-1" runat="server" CssClass="hide" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" Enabled="False"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
