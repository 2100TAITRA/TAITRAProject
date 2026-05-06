<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFM340.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM340" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>IFM340 維護允許以帳號密碼登入之名單</title>
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
    <form id="IFM340" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <asp:Label ID="lbOrg" runat="server" Width="5em" ForeColor="Red" CssClass="hide">所屬機關：</asp:Label>
                <asp:DropDownList ID="dlOrg" runat="server" AutoPostBack="True"></asp:DropDownList>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 384px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" Height="6px" GridLines="Vertical" CellPadding="4" PageSize="50">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="帳號">
                                <ItemTemplate>
                                    <asp:TextBox onblur="CallGetAccountName(this)" ID="txUser" TabIndex="0" runat="server" Width="5.5em" MaxLength="20"></asp:TextBox>
                                    <asp:ImageButton ID="btHelp" TabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                                    <asp:Label ID="lbUserName" runat="server" Width="6em" BackColor="LightGrey" BorderColor="gray"
                                        BorderWidth="1"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="期間">
                                <ItemTemplate>
                                    <asp:Label ID="Label2" runat="server">起</asp:Label>
                                    <asp:TextBox onblur="fnCheckDate(this)" ID="txStartDate" runat="server" Width="4em" CssClass="DatePicker InputFieldNumeric" MaxLength="7"></asp:TextBox>
                                    <asp:Label ID="Label5" runat="server">迄</asp:Label>
                                    <asp:TextBox onblur="fnCheckDate(this)" ID="txEndDate" runat="server" Width="4em" CssClass="DatePicker InputFieldNumeric" MaxLength="7"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="動作">
                                <ItemTemplate>
                                    <asp:Button ID="btClean" runat="server" Width="3.5em" Text="清除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 568px; left: 376px" ID="txActiveOrgNo"
            runat="server" CssClass="hide"></asp:TextBox>
        <asp:DropDownList Style="z-index: 103; position: absolute; top: 544px; left: 232px" ID="DdlforscAcc"
            runat="server" CssClass="hide">
        </asp:DropDownList>
    </form>
</body>
</html>
