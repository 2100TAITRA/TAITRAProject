<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDR145.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR145" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR145 衛生福利部移文清單查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR145" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txDocNoS" runat="server" MaxLength="15" Width="8em" CssClass="InputEnUpperField"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">(起)－</asp:Label>
                        <asp:TextBox ID="txDocNoE" runat="server" MaxLength="15" Width="8em" CssClass="InputEnUpperField"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">(迄)</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">部收文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvNoS" runat="server" MaxLength="15" Width="8em" CssClass="InputEnUpperField"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">(起)－</asp:Label>
                        <asp:TextBox ID="txRcvNoE" runat="server" MaxLength="15" Width="8em" CssClass="InputEnUpperField"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">(迄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:DropDownList ID="dlDohState" runat="server" Width="13.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="待收件">待收件</asp:ListItem>
                            <asp:ListItem Value="所屬機關尚未執行公文收件">所屬機關尚未執行公文收件</asp:ListItem>
                            <asp:ListItem Value="已收件">已收件</asp:ListItem>
                            <asp:ListItem Value="改分部內單位">改分部內單位</asp:ListItem>
                            <asp:ListItem Value="改分附屬機關">改分附屬機關</asp:ListItem>
                            <asp:ListItem Value="收文退號">收文退號</asp:ListItem>
                            <asp:ListItem Value="取消改分">取消改分</asp:ListItem>
                            <asp:ListItem Value="取消退號">取消退號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">部收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">(起)－</asp:Label>
                        <asp:TextBox ID="txDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">(迄)</asp:Label>
                    </div>
                </div>
				<div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">排序依據：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:DropDownList ID="dlOrder" runat="server" Width="13.5em">
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                            <asp:ListItem Value="2">部收文號</asp:ListItem>
                            <asp:ListItem Value="3">部收日期</asp:ListItem>
                            <asp:ListItem Value="4">署收日期</asp:ListItem>
                            <asp:ListItem Value="5">來文機關</asp:ListItem>
                            <asp:ListItem Value="6">來文字號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label12" runat="server">署收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label13" runat="server">(起)－</asp:Label>
                        <asp:TextBox ID="txRcvDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server">(迄)</asp:Label>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="部收文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbASSIGN_DOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="部收日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="署收日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_ORG" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOH_STATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="最後<br>修改日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbEXEUPT_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文<br>方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_TYPE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
