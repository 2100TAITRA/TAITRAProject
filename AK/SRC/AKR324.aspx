<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="AKR324.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR324" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR324 機關檔多案次卷次標籤列印作業</title>
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
    <form id="AKR324" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_VerNo" runat="server" TabIndex="-1"></asp:TextBox><asp:TextBox ID="H_txSourceOrgno" runat="server" TabIndex="-1"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">列印報表：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblClsCaseName" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0" Selected="True">案卷封面</asp:ListItem>
                            <asp:ListItem Value="1">案卷背脊</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                <div class="dTDTitle" style="width: 5.5em">
                <asp:Label ID="Label2" runat="server"  CssClass="RequireUpperField">版本別：</asp:Label>
                </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly();" TabIndex="-1" ID="txVerNo" runat="server" Width="2em"   CssClass="RequireUpperField" MaxLength="3"></asp:TextBox>
                        <asp:ImageButton ID="ibVer" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                 </div>
                 <div class="dTR">
                <div class="dTDTitle" style="width: 5.5em">
                <asp:Label ID="Label6" runat="server"  CssClass="RequireUpperField">文號加入：</asp:Label>
                </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                 </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
                    <Columns>
                        <asp:TemplateColumn HeaderText="序">
                            <ItemTemplate>
                                <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="卷號(年度 - 分類 - 案 - 卷)">
                            <ItemTemplate>
                                <div>
                                    <asp:TextBox  ID="txYear" onblur="jf_CheckCaseMain(this.id,'txYear')" runat="server" Width="2.5em" MaxLength="3" ></asp:TextBox>
                                    <asp:Label ID="Label3" runat="server">─</asp:Label>
                                    <asp:TextBox ID="txClass" onblur="jf_checkClsNo(this.id,'txClass')" runat="server" Width="10.5em" MaxLength="20" ></asp:TextBox>
                                    <asp:TextBox ID="txClassName" runat="server" CssClass="hide" TabIndex="-1"></asp:TextBox>
                                    <asp:Label ID="Label4" runat="server">─</asp:Label>
                                    <asp:TextBox ID="txCase" onblur="jf_CheckCaseMain(this.id,'txCase')" runat="server" Width="7em" MaxLength="12" ></asp:TextBox>
                                    <asp:TextBox ID="txCaseName" runat="server"  CssClass="hide" TabIndex="-1"></asp:TextBox>
                                    <asp:TextBox ID="txCaseKey" runat="server"  CssClass="hide" TabIndex="-1"></asp:TextBox>
                                     <asp:Label ID="Label5" runat="server">─</asp:Label>
                                    <asp:TextBox  ID="txVol" runat="server" Width="2.5em" MaxLength="4"  ></asp:TextBox>
                                </div>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                    </Columns>
                </asp:DataGrid>
            </div>
        </div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
