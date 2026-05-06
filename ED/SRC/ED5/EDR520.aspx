<%@ Page Language="c#" CodeBehind="EDR520.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDR520" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR520 郵件清單列印作業</title>
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
    <form id="EDR520" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:DropDownList ID="H_dlSubclassNo" runat="server" CssClass="hide"></asp:DropDownList><asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_SubNo" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireFieldNumeric">郵寄時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSendDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="txSendTimeS" TabIndex="0" runat="server" Width="2.5em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label5" runat="server" Width="1em">～</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txSendDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="txSendTimeE" TabIndex="0" runat="server" Width="2.5em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">郵寄大類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:DropDownList Style="z-index: 0" ID="dlClassNo" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">郵寄小類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlSubclassNo" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">寄件單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" runat="server" CssClass="comboBox" Width="6.5em"></cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" runat="server" CssClass="comboBox" Width="6.5em"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">國別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlCountryType" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
	                <asp:Button ID="btSelectAll" runat="server" Text="全選" />
	                <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
	                <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                </asp:Panel>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemStyle Wrap="false"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="掛號號碼">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txBulkNo" runat="server" Width="4.5em" MaxLength="20"></asp:TextBox>
                                    <asp:TextBox Style="z-index: 0" ID="txPostDate" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle Width="14em"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="Label6" runat="server">發文文號或寄件單位</asp:Label><br>
                                    <asp:Label ID="Label7" runat="server">多組以|分隔</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:TextBox ID="txCountName" runat="server" Width="15em" MaxLength="500" TextMode="MultiLine"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="寄送地區">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txRegionName" runat="server" Width="4.5em" MaxLength="20"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件者">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txOrgName" runat="server" Width="10.5em" MaxLength="50"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄<br>大類">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txClassName" runat="server" Width="3.5em" MaxLength="10"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄小類">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txSubclassName" runat="server" Width="4.5em" MaxLength="10"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="件數">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txCountNo" runat="server" Width="2em" MaxLength="5"></asp:TextBox>
                                </ItemTemplate>
                                <FooterStyle Wrap="False"></FooterStyle>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="Excel(C)" Accesskey = "C" Title = "Excel(ALT+C)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
