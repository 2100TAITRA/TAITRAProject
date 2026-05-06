<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EAR210.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR210" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR210 多案次案卷標籤列印作業</title>
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
    <form id="EAR210" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_VerNo" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox><asp:TextBox ID="H_Source" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox><asp:TextBox ID="H_VerNo2" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox><asp:ListBox ID="H_ClsLenSet" TabIndex="-1" runat="server" Width="1.5em"></asp:ListBox><asp:TextBox ID="H_OrgNickName" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbPrintType" runat="server">標籤格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbPrintType" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0" Selected="True">小卷宗</asp:ListItem>
                            <asp:ListItem Value="1">大卷宗-單頁</asp:ListItem>
                            <asp:ListItem Value="2">大卷宗-多頁</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbClsCaseName" runat="server">案卷名稱列印：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblClsCaseName" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0">分類號+案名</asp:ListItem>
                            <asp:ListItem Value="1">分類名</asp:ListItem>
                            <asp:ListItem Value="2" Selected="True">案名</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="tbTitlePrintType2" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label2" runat="server">年度號</asp:Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<asp:Label ID="Label3" runat="server">分類號</asp:Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<asp:Label ID="Label4" runat="server">案次號</asp:Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<asp:Label ID="Label5" runat="server">卷次號(起)　卷次號(迄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        &nbsp;
						<asp:TextBox onblur="jf_chkYear()" ID="txYear" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                        <asp:TextBox onblur="jf_IsExistClass('1')" ID="txClass" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="ibtCLS" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton ID="ibtCASE" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label11" runat="server">─</asp:Label>
                        <asp:TextBox onblur="jf_chkVol()" ID="txVolS" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="lbSep" runat="server">～</asp:Label>
                        <asp:TextBox onblur="jf_chkVol()" ID="txVolE" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                        <asp:TextBox ID="H_ClsKey" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="6">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷號 ( 年度 － 分類 － 案 － 卷 )">
                                <ItemTemplate>
                                    <div>
                                        <asp:Label ID="lbLeft" runat="server">左：</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear()" ID="txYear1" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('1')" ID="txClass1" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase1" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label11" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol1" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey1" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="lbCenter" runat="server">中：</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear()" ID="txYear2" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label12" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('2')" ID="txClass2" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label13" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase2" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label14" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol2" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey2" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="lbRight" runat="server">右：</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear()" ID="txYear3" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label8" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('3')" ID="txClass3" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label16" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase3" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label15" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol3" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey3" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                    </div>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div id="GridTable2" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg2" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="4">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷號 ( 年度 － 分類 － 案 － 卷 )">
                                <ItemTemplate>
                                    <div>
                                        <asp:Label ID="lbLeft" runat="server">左：</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear()" ID="txYear1" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('1')" ID="txClass1" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase1" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label11" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol1" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey1" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="lbCenter" runat="server">中：</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear()" ID="txYear2" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label12" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('2')" ID="txClass2" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label13" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase2" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label14" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol2" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey2" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="lbRight" runat="server">右：</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear()" ID="txYear3" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label8" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('3')" ID="txClass3" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label16" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase3" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label15" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol3" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" CssClass="InputEnOnlyUpperField" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey3" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                    </div>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
