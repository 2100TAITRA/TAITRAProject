<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT603.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAT603" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT603 移轉移交檔案箱號設定作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAT603" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">移轉(交)計畫編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTPlan" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14.5em">
                        <asp:Label ID="Label2" runat="server">接管機關：</asp:Label>
                        <asp:TextBox ID="txOrg" TabIndex="0" runat="server" Width="7.5em" CssClass="displayonly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label3" runat="server">發文字號：</asp:Label>
                        <asp:TextBox ID="txWord" TabIndex="0" runat="server" Width="3em" CssClass="displayOnly" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label7" runat="server">字第</asp:Label>
                        <asp:TextBox ID="txNumber" runat="server" Width="7.5em" CssClass="displayOnly"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">號</asp:Label>
                    </div>
                </div>
                <fieldset style="width: 35em; height: 8.5em">
                    <legend>檔管機關</legend>
                    <div id="Table3" class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label11" runat="server">編箱範圍：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:RadioButtonList ID="rbRange" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="0" Selected="True">紙質檔案</asp:ListItem>
                                    <asp:ListItem Value="1">電子檔案</asp:ListItem>
                                    <asp:ListItem Value="2">全部</asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label12" runat="server">機密等級：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:RadioButtonList ID="rbSec" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="0" Selected="True">普通</asp:ListItem>
                                    <asp:ListItem Value="1">機密</asp:ListItem>
                                    <asp:ListItem Value="2">全部</asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                            <div class="dTD">
                                <asp:RadioButtonList ID="rbType" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="依案件判斷" Selected="True">依案件判斷</asp:ListItem>
                                    <asp:ListItem Value="依案卷判斷">依案卷判斷</asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label13" runat="server">每箱卷數：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox CssClass="InputFieldNumeric" ID="txVol" runat="server" Width="3.5em" MaxLength="7"></asp:TextBox>
                                <asp:RadioButton ID="rb1" runat="server" Checked="True" Text="由最大箱號編起，箱號" GroupName="g1"></asp:RadioButton>
                                <asp:TextBox CssClass="InputFieldNumeric" ID="txBoxNum" runat="server" Width="3.5em" MaxLength="7"></asp:TextBox>
                                <asp:RadioButton ID="rb2" runat="server" Text="重編" GroupName="g1"></asp:RadioButton>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷號">
                                <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbRead" runat="server" Width="11.5em"></asp:Label>
                                    <asp:Label ID="lbYEAR" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbCLS" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbCASE" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbVOL" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔案類型">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFileType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="密等(依案件)">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSecCase" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="密等(依案卷)">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSecVol" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="箱號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="txInput1" TabIndex="0" runat="server" Width="2.5em" MaxLength="20"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備份最大箱號(隱藏)">
                                <ItemTemplate>
                                    <asp:Label ID="lbMaxBoxSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="分類號(隱藏)">
                                <ItemTemplate>
                                    <asp:Label ID="lbClsKey" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案次號(隱藏)">
                                <ItemTemplate>
                                    <asp:Label ID="lbCaseKey" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備份箱號(隱藏)">
                                <ItemTemplate>
                                    <asp:Label ID="lbBkBoxSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btBox" runat="server" Text="編箱(D)" AccessKey="D" Title="編箱(ALT+D)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="確認(S)" AccessKey="S" Title="確認(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btAbandon" runat="server" Text="放棄(B)" AccessKey="C" Title="放棄(ALT+B)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
