<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI405.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDI405" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI405 用印申請查詢作業</title>
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
    <form id="EDI405" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">申請單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyNoS" TabIndex="0" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">～</asp:Label>
                        <asp:TextBox ID="txApplyNoE" TabIndex="0" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">用印日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDateS" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">～</asp:Label>
                        <asp:TextBox ID="txAppDateE" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">申請單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNormalFld" TabIndex="0" runat="server" Width="10.5em" CssClass="hide" MaxLength="20"></asp:TextBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">申請人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txReadOnly" TabIndex="0" runat="server" Width="10.5em" CssClass="hide"></asp:TextBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label5" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSubject" TabIndex="0" runat="server" Width="15.5em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:TextBox Style="z-index: 0" ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_User" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox Style="z-index: 0" ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlApplyNo" TabIndex="0" runat="server" NavigateUrl="c:\\" Width="5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="15.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server" Width="7em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請人">
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbAppEmpName" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="用印日期">
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbAppDate" runat="server" Width="6em"></asp:Label>
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
