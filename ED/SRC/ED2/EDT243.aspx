<%@ Page Language="c#" CodeBehind="EDT243.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT243" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT243 公文移轉交作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT243" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; visibility: hidden;" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
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
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label1" runat="server">移交人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txUserName" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton Style="z-index: 0" ID="btUser" TabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox Style="z-index: 0" ID="txEmpName" TabIndex="0" runat="server" Width="10.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label2" runat="server">被移交人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="30" runat="server" Width="10em" CssClass="comboBox">
                        </cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" Width="10em" CssClass="comboBox">
                        </cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" TabIndex="50" runat="server" Width="10em" CssClass="comboBox">
                        </cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton Style="z-index: 0" ID="rbType" runat="server" GroupName="Sort" Text="業務類別" Checked="True"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbDocNo" runat="server" GroupName="Sort" Text="公文文號"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD DgSelectToolBar" id="tbSelect" style="display: none">
                        <asp:Button ID="btSelectAll" runat="server" Text="全部選取"></asp:Button>
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向選取"></asp:Button>
                        <asp:Button ID="btSelectClear" runat="server" Text="清除選取"></asp:Button>
                    </div>
                </div>
                <div class="GridDiv" style="height: 300px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號&lt;br&gt;申請單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                    <asp:Label ID="lbOuId" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="業務類別&lt;br&gt;申請類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="異動" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btOpen" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
