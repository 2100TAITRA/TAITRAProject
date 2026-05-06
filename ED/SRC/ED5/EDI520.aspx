<%@ Page Language="c#" CodeBehind="EDI520.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDI520" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI520 非發文郵件查詢作業</title>
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
    <form id="EDI520" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="H_OuIdInit" runat="server"></asp:TextBox><asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:DropDownList ID="H_dlSubclassNo" runat="server"></asp:DropDownList><asp:TextBox ID="H_SubNo" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">寄送單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label1" runat="server" CssClass="RequireField">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSendDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label8" runat="server">～</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txSendDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">內容物：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txContent" TabIndex="0" runat="server" Width="30.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">國別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:DropDownList Style="z-index: 0" ID="dlCountryType" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="0">國內</asp:ListItem>
                            <asp:ListItem Value="1">國外</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label5" runat="server">郵寄地區：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlRegionNo" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label6" runat="server">郵寄大類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:DropDownList Style="z-index: 0" ID="dlClassNo" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label7" runat="server">郵寄小類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlSubclassNo" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="識別碼">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlSeqNo" TabIndex="0" runat="server" Width="2em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn Visible="False" HeaderText="序">
                                <ItemStyle HorizontalAlign="Right"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="寄送單位">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄日期">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSendDateTime" runat="server"></asp:Label>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="內容物">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbContent" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbOrgName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="國別">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbCountryType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄地區">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbRegion" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄大類">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbClassName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄小類">
                                <ItemStyle Wrap="False"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbSubclassName" runat="server"></asp:Label>
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
