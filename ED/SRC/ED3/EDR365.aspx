<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDR365.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR365" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR365 內部交換狀態查詢作業</title>
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
    <form id="EDR365" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>～
						<asp:TextBox ID="txDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
						<asp:checkbox id="cbDocAutoSearch" runat="server" Text="輸入文號自動查詢"></asp:checkbox>
                        <asp:Label ID="Label8" runat="server" CssClass="hide">～</asp:Label>
						<asp:TextBox ID="txDocNoE" runat="server" Width="5.5em" MaxLength="10" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" runat="server">發文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txIssueNo" runat="server" Width="6em" MaxLength="11"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">發文人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlIssuer" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">電子檔是否轉出：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlTransRecord" runat="server">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已轉出</asp:ListItem>
                            <asp:ListItem Value="0">未轉出</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">內部交換處理狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlInternal" runat="server">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="ReceiveAll">全部接收</asp:ListItem>
                            <asp:ListItem Value="ReceiveSome">部分接收</asp:ListItem>
                            <asp:ListItem Value="ReceiveNone">尚未接收</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv"  style="height: 15em" data-fixed="true">
                    <div class="dTR">
                        <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1SEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1IssueDate" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文時間">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1IssueTime" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemTemplate>
                                        <asp:HyperLink ID="hldg1DocNo" runat="server" ></asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemTemplate>
                                        <asp:TextBox ID="lbdg1Subject" runat="server" TextMode="MultiLine" CssClass="TextLabel" style="height: 1.3em; width: 14em" ReadOnly="true"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦單位">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1OuName" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦人">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1EmpName" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="電子檔是否轉出">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1TransRecord" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="內部交換處理狀態">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg1Internal" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="總發數">
                                    <ItemTemplate>
                                        <asp:Label ID="lbTotalCnt" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <asp:Label ID="Label4" runat="server">受文者明細：</asp:Label>
                </div>
                <div class="GridDiv">
                    <div class="dTR">
                        <asp:DataGrid ID="dg2" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg2SEQ_NO" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg2IssueNo" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="收文號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg2DocNo" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="受文機關名稱">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg2OrgName" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="接收時間">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdg2RcvDt" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
