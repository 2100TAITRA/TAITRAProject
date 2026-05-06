<%@ Page Language="c#" CodeBehind="EDT235.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT235" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT235 人民陳情案件處理情形設定作業</title>
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
    <form id="EDT235" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>～
                        <asp:TextBox ID="txDocNoE" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">案件類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCaseType" runat="server" Width="9.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">行政興革之建議</asp:ListItem>
                            <asp:ListItem Value="2">行政法令之查詢</asp:ListItem>
                            <asp:ListItem Value="3">行政違失之舉發</asp:ListItem>
                            <asp:ListItem Value="4">行政權益之維護</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>～
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">處理情形：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="9.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">轉請權責機關處理</asp:ListItem>
                            <asp:ListItem Value="2">自行回復</asp:ListItem>
                            <asp:ListItem Value="3">不予受理</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txCloseDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>～
                        <asp:TextBox ID="txCloseDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">受理方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlFromType" runat="server" Width="9.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">書面來函</asp:ListItem>
                            <asp:ListItem Value="2">電子郵件</asp:ListItem>
                            <asp:ListItem Value="3">便民專線</asp:ListItem>
                            <asp:ListItem Value="4">現場受理及電話</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">案件來源：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCaseFrom" runat="server" Width="9.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">總統府函轉</asp:ListItem>
                            <asp:ListItem Value="2">行政院函轉</asp:ListItem>
                            <asp:ListItem Value="3">機關自行受理</asp:ListItem>
                            <asp:ListItem Value="4">其他</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 20.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" EnableViewState="true">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                    <asp:Button ID="btPreview" runat="server" Text="影像瀏覽"></asp:Button>
                                    <asp:Label ID="H_lbSignType" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="H_lbIsExist" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案件類別">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlCaseType" runat="server" Width="9em">
                                        <asp:ListItem Value=""></asp:ListItem>
                                        <asp:ListItem Value="1">行政興革之建議</asp:ListItem>
                                        <asp:ListItem Value="2">行政法令之查詢</asp:ListItem>
                                        <asp:ListItem Value="3">行政違失之舉發</asp:ListItem>
                                        <asp:ListItem Value="4">行政權益之維護</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="處理情形">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlCloseType" runat="server" Width="10em">
                                        <asp:ListItem Value=""></asp:ListItem>
                                        <asp:ListItem Value="1">轉請權責機關處理</asp:ListItem>
                                        <asp:ListItem Value="2">自行回復</asp:ListItem>
                                        <asp:ListItem Value="3">不予受理</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受理方式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlFromType" runat="server" Width="9em">
                                        <asp:ListItem Value=""></asp:ListItem>
                                        <asp:ListItem Value="1">書面來函</asp:ListItem>
                                        <asp:ListItem Value="2">電子郵件</asp:ListItem>
                                        <asp:ListItem Value="3">便民專線</asp:ListItem>
                                        <asp:ListItem Value="4">現場受理及電話</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案件來源">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlCaseFrom" runat="server" Width="8em">
                                        <asp:ListItem Value=""></asp:ListItem>
                                        <asp:ListItem Value="1">總統府函轉</asp:ListItem>
                                        <asp:ListItem Value="2">行政院函轉</asp:ListItem>
                                        <asp:ListItem Value="3">機關自行受理</asp:ListItem>
                                        <asp:ListItem Value="4">其他</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
