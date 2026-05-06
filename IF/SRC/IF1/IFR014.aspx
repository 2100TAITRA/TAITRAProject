<%@ Page Language="c#" CodeBehind="IFR014.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR014" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>IFR014 使用者清單查詢列印作業</title>
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
    <form id="IFR014" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" Width="88px" Height="16px"></asp:TextBox><asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" Width="5.5em" ForeColor="Red">隸屬機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlOrgno" runat="server" CssClass="KeyUpperField" AutoPostBack="True" OnSelectedIndexChanged="dlOrgno_SelectedIndexChanged"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">使用者帳號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUserName" TabIndex="0" runat="server" Width="12.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">一級單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">使用者姓名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEmpName" TabIndex="0" runat="server" Width="12.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">二級單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlSect" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">使用者狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUserState" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" runat="server" GroupName="sort" Text="單位" Checked="true" /><asp:RadioButton ID="rbUserName" runat="server" GroupName="sort" Text="帳號" /><asp:RadioButton ID="rbEmpName" runat="server" GroupName="sort" Text="姓名" /><asp:RadioButton ID="rbUserTitle" runat="server" GroupName="sort" Text="職稱" /><asp:RadioButton ID="rbStatus" runat="server" GroupName="sort" Text="狀態" />
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbOrgName" Width="8.5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" Width="6.5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="帳號">
                                <ItemTemplate>
                                    <asp:Label ID="lbUserName" Width="4.5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="姓名">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" Width="5.5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="職稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbUserTitle" Width="4.5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電話">
                                <ItemTemplate>
                                    <asp:Label ID="lbTel" Width="5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbState" Width="3.5em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="使用權限">
                                <ItemTemplate>
                                    <asp:Label ID="lbPriv" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
