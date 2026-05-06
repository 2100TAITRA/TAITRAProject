<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAM201C1.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAM201C1" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAM201C1 案卷名查詢子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAM201C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label7" TabIndex="-1" runat="server" >版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label6" TabIndex="-1" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.0em">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txFileYear" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 11.0em">
                        <asp:Label  ID="Label1" TabIndex="-1" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txClsNo" runat="server" MaxLength="20" Width="9.5em"></asp:TextBox>
                        <asp:Label ID="lbClsName" TabIndex="-1" runat="server"></asp:Label>
                        <asp:TextBox ID="txClsName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label  ID="Label4" TabIndex="-1" runat="server">國別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCountryCodeS" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                        <asp:ImageButton ID="btCountryCodeS" TabIndex="-1" runat="server" ToolTip="國別起" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        －
                        <asp:TextBox ID="txCountryCodeE" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                        <asp:ImageButton ID="btCountryCodeE" TabIndex="-1" runat="server" ToolTip="國別迄" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
					<div class="dTDTitle" style="width: 5.0em">
                        <asp:Label  ID="Label5" TabIndex="-1" runat="server">處別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOfficeCode" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                        －
                        <asp:TextBox ID="txOfficeCodeE" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label  ID="Label8" TabIndex="-1" runat="server">細目/產品別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txProductCodeS" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                        <asp:ImageButton ID="btProductCodeS" TabIndex="-1" runat="server" ToolTip="細目/產品別起" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        －
                        <asp:TextBox ID="txProductCodeE" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                        <asp:ImageButton ID="btProductCodeE" TabIndex="-1" runat="server" ToolTip="細目/產品別迄" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label  ID="Label2" TabIndex="-1" runat="server">卷次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVolNo" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>－
                        <asp:TextBox ID="txVolNoE" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                    </div>
					<div class="dTDTitle" style="width: 11.0em">
                        <asp:Label  ID="Label3" TabIndex="-1" runat="server">案卷名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox  ID="txVolName" runat="server" MaxLength="100" Width="9.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label  ID="Label9" TabIndex="-1" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox  ID="txKeepYear" runat="server" MaxLength="2" Width="1.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <DIV style="HEIGHT: 22em;" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
							<Columns>
                                <asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
                                        <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="年度號">
									<ItemTemplate>
                                        <asp:HyperLink id="lbFILEYEAR" runat="server"></asp:HyperLink>
                                        <asp:TextBox ID="h_txVerNo" runat="server" CssClass="hide"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="分類號">
									<ItemTemplate>
										<asp:Label id="lbCLSNO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="國別">
									<ItemTemplate>
										<asp:Label id="lbCOUNTRYCODE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="處別">
									<ItemTemplate>
										<asp:Label id="lbOFFICECODE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="細目號/產品別">
									<ItemTemplate>
										<asp:Label id="lbPRODUCTCODE" runat="server"></asp:Label>
                                        <asp:TextBox ID="h_CaseNo" runat="server" CssClass="hide"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="卷別">
									<ItemTemplate>
										<asp:Label id="lbVOLNO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="名稱">
									<ItemTemplate>
										<asp:Label id="lbVOLNAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 144px; left: 776px" ID="H_dlDept_Text" CssClass="hide" runat="server" Width="0px" Height="0px"></asp:TextBox>
        <cc1:ComboBox Style="z-index: 103; position: absolute; top: 168px; left: 776px" ID="dlUser" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
    </form>
</body>
</html>
