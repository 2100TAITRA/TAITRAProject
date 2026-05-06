<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDI521.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDI521" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI521 待郵寄公文郵件查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDI521" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
            <asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_User_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_User" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlUser_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" Width="5em">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox Style="z-index: 0" ID="txSendDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label5" runat="server">～</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txSendDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" Width="5em">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Width="5em">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" TabIndex="50" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label6" runat="server">國別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList Style="z-index: 0" ID="rbCountryType" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="All" Selected="True">不限</asp:ListItem>
                            <asp:ListItem Value="In">國內</asp:ListItem>
                            <asp:ListItem Value="Out">國外</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
						<asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemStyle Wrap="False"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:HyperLink ID="hlDocNo" TabIndex="0" runat="server"></asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦單位">
                                    <ItemStyle Wrap="False"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦人">
                                    <ItemStyle Wrap="False"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="國別">
                                    <ItemStyle Wrap="False"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label Style="z-index: 0" ID="lbCountryType" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
   			<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
    </form>
</body>
</html>
