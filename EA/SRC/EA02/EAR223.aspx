<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR223.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR223" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR223 銓敘部個人檔標籤列印作業</title>
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
    <form id="EAR223" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txSourceOrgno" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server">捲動區筆數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txGridNum" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Button ID="btGridNum" runat="server" Text="變更"></asp:Button>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
                    <Columns>
                        <asp:TemplateColumn HeaderText="序">
                            <ItemTemplate>
                                <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="公文文號">
                            <ItemTemplate>
                                <asp:TextBox ID="txDocNo" onblur="GetPersonData(this.id, 'txDocNo')"  runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="任審案人名─四角號碼─身分證字號(英文字母+後4碼)">
                            <ItemTemplate>
                                <div>
                                    <asp:TextBox onblur="CheckDataExist(this.id, 'txPersonFullName')" ID="txPersonFullName" runat="server" Width="5em" TabIndex="-1"></asp:TextBox>
                                    <asp:Label ID="Label9" runat="server">─</asp:Label>
                                    <asp:TextBox onblur="CheckDataExist(this.id, 'txFourCornerNo')" ID="txFourCornerNo" runat="server" Width="5em" MaxLength="5" TabIndex="-1"></asp:TextBox>
                                    <asp:Label ID="Label10" runat="server">─</asp:Label>
                                    <asp:TextBox onblur="CheckDataExist(this.id, 'txPersonId')" ID="txPersonId" runat="server" Width="5em" MaxLength="5" TabIndex="-1"></asp:TextBox>
                                </div>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                    </Columns>
                </asp:DataGrid>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
