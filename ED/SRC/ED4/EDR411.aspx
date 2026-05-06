<%@ Page Language="c#" CodeBehind="EDR411.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR411" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR411 代發署函明細查詢及列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR411" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker InputFieldNumeric" MaxLength="7"></asp:TextBox>~
						<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker InputFieldNumeric" MaxLength="7"></asp:textbox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">發文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txIssueNoWord" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">發文方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBoxList ID="cbIssueType" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="1" Selected="True">電子交換</asp:ListItem>
                            <asp:ListItem Value="2" Selected="True">紙本（郵寄）</asp:ListItem>
                            <asp:ListItem Value="3" Selected="True">紙本（人工傳遞）</asp:ListItem>
                        </asp:CheckBoxList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSort" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="DI.ISSUE_TYPE" Selected="True">發文方式</asp:ListItem>
                            <asp:ListItem Value="DM.DOC_NO">發文文號</asp:ListItem>
                            <asp:ListItem Value="DM.ISSUE_DATE">發文日期</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">統計方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbStat" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="1" Selected="True">全機關</asp:ListItem>
                            <asp:ListItem Value="2">各組室</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div style="overflow: auto; height: 14em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbCategory" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="決行層次">
                                <ItemTemplate>
                                    <asp:Label ID="lbAppLvl" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="分層負責代碼">
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbDelaminateLvl" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="查詢" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="明細表預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="件數統計表預覽" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="明細表EXCEL檔" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
