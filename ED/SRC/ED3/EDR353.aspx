<%@ Page Language="c#" CodeBehind="EDR353.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR353" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR353 派繕發文公文查詢列印作業</title>
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
    <form id="EDR353" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="txNotSendFolder" runat="server"></asp:TextBox><asp:TextBox ID="txSendFolder" runat="server"></asp:TextBox><asp:TextBox ID="txNoTIssueFolder" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">查詢類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbType1" runat="server" Text="已派繕" GroupName="gpType"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbType2" runat="server" Text="未派繕" GroupName="gpType"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbType3" runat="server" Text="未完成發文" GroupName="gpType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSendDate" runat="server">派繕日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div id="SendDatedtd">
                            <asp:TextBox ID="txSendDateS" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:TextBox ID="txSendTimeS" TabIndex="0" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                            <asp:Label ID="lbSendStamp" runat="server">～</asp:Label>
                            <asp:TextBox ID="txSendDateE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:TextBox Style="z-index: 0" ID="txSendTimeE" TabIndex="0" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label2" runat="server">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList Style="z-index: 0" ID="dlSingType" runat="server" Width="6.5em">
                            <asp:ListItem Value="">全部</asp:ListItem>
                            <asp:ListItem Value="P">紙本</asp:ListItem>
                            <asp:ListItem Value="E">線上</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="z-index: 0" ID="lbHourS" runat="server">超過</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txHour" TabIndex="0" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="1"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="lbHourE" runat="server">小時未處理</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbPerson" runat="server">發文人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPerson" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbSign" runat="server">是否簽收：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlSign" runat="server" Width="6.5em">
                            <asp:ListItem Value="1">是</asp:ListItem>
                            <asp:ListItem Value="2">否</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbOrder" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrder" runat="server">
                            <asp:ListItem Value="1">派繕時間</asp:ListItem>
                            <asp:ListItem Value="2">公文文號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbNewDate" runat="server" Width="6em"></asp:Label><br>
                                    <asp:Label ID="lbNewTime" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width="6em"></asp:Label>
                                    <asp:Label ID="lbIssuePerson" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="21.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽核&lt;BR&gt;類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignType" runat="server" Width="3.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽收時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignDate" runat="server" Width="6em"></asp:Label><br>
                                    <asp:Label ID="lbSignTime" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
