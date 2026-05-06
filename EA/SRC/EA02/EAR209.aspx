<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EAR209.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR209" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR209 多案次案卷標籤列印作業</title>
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
    <form id="EAR209" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="H_VerNo" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox><asp:TextBox ID="H_VerNo2" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox><asp:TextBox ID="H_Source" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox><asp:TextBox ID="OrgNickName" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label17" runat="server">案卷名稱列印：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblClsCaseName" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0" Selected="True">單卷次卷脊</asp:ListItem>
                            <asp:ListItem Value="1">雙卷次卷脊</asp:ListItem>
                            <asp:ListItem Value="2">案卷封面</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn >
								<HeaderTemplate>
									<asp:Label ID="lbFileVol" runat="server" Width="2em">卷號 ( 年度 － 分類 － 案 － 卷 )</asp:Label>
								</HeaderTemplate>
                                <ItemTemplate>
                                    <div>
                                        <asp:Label ID="Label5" runat="server">右：</asp:Label>
										<asp:TextBox onblur="jf_chkVerNo('1')" ID="txVerNo1" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
										<asp:TextBox onblur="jf_chkVerNo('1')" ID="h_txVerNo1" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="lbVerno1" runat="server" CssClass="hide">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear('1')" ID="txYear1" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('1')" ID="txClass1" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase1" TabIndex="0" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label11" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol1" TabIndex="0" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey1" TabIndex="-1" runat="server" Width="1.5em" ReadOnly="True" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="Label2" runat="server">左：</asp:Label>
										<asp:TextBox onblur="jf_chkVerNo('2')" ID="txVerNo2" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
										<asp:TextBox ID="h_txVerNo2" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="lbVerno2" runat="server" CssClass="hide">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkYear('2')" ID="txYear2" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                        <asp:Label ID="Label3" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('2')" ID="txClass2" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label4" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase2" TabIndex="0" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label6" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol2" TabIndex="0" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey2" TabIndex="-1" runat="server" Width="1.5em" ReadOnly="True" CssClass="hide"></asp:TextBox>
                                    </div>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
