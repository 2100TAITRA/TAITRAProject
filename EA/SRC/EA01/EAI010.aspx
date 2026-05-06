<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAI010.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAI010" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAI010 檢調未還公文查詢作業</title>
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
    <form id="EAI010" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <asp:TextBox ID="txApply_Limit" TabIndex="0" runat="server" Width="1.5em" MaxLength="20" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txDeptNo_h" TabIndex="0" runat="server" Width="1.5em" MaxLength="20" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txUserNo_h" TabIndex="0" runat="server" Width="1.5em" MaxLength="20" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txOk_h" TabIndex="0" runat="server" Width="1.5em" MaxLength="20" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txOrgNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txSectNo_h" TabIndex="0" runat="server" Width="1.5em" MaxLength="20" CssClass="hide"></asp:TextBox>
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDept" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="30" runat="server" Width="7.5em" MaxLength="10" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
					<div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" Width="7.5em" MaxLength="10" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbUser" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" TabIndex="50" runat="server" Width="7.5em" MaxLength="10" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid Style="z-index: 0" ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle Wrap="False" HorizontalAlign="Center"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單號">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlBor_No" runat="server" Width="5.5em"></asp:HyperLink>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbDoc_No" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="應歸日期">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbDue_Date" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="展期次數">
                                <HeaderStyle Wrap="False" HorizontalAlign="Center"></HeaderStyle>
                                <ItemStyle Wrap="False" HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbReBor_Count" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文主旨">
                                <HeaderStyle Wrap="False" HorizontalAlign="Center"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbFile_Subject" runat="server" Width="11em"></asp:Label>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox ID="txDeptName_h" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txSectName_h" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txUserName_h" runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
