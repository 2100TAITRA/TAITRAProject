<%@ Page Language="c#" CodeBehind="ODI250.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI250" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODI250 專案申請查詢子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODI250" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:TextBox ID="Textbox1" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Dept" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Sect_Text" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Dept_Text" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_User_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_User_Text" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_Sect_AllValue" runat="server" Width="19px" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_User_AllValue" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label Style="z-index: 0" ID="Label10" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSDoc" TabIndex="4" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>～
						<asp:TextBox Style="z-index: 0" ID="txEDoc" TabIndex="4" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label Style="z-index: 0" ID="Label9" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSDate" TabIndex="20" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>～
						<asp:TextBox Style="z-index: 0" ID="txEDate" TabIndex="25" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" Width="10em" CssClass="hide" ReadOnly="True"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlDept" runat="server" Width="11em" Rows="8"></asp:DropDownList>
                        <asp:DropDownList Style="z-index: 0" ID="dlSect" runat="server" Width="17em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlUser" runat="server" Width="8em" Rows="8"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar" Visible="False">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                        <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                    </asp:Panel>
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPPLY_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbTX_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位/科別">
                                <ItemTemplate>
                                    <asp:Label ID="lbRPSDEPT_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
