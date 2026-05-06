<%@ Page Language="c#" CodeBehind="ODI310.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI310" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODI310 業務類別查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODI310" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlProperty" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" Width="9em" CssClass="comboBox" ViewStateMode="Enabled"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">業務類別代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBTypeNo" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
							<asp:Label id="Label2" runat="server" >業務類別名稱：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox id="txBTypeNm" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
					</div>
				</div>
                <div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
							<asp:Label id="Label4" runat="server" >案件系統代號：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox id="txProvider" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
					</div>
				</div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 296px">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="業務類別代碼／名稱">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlBTypeNo" runat="server"></asp:HyperLink>
                                    <asp:Label ID="lbBTypeName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="使用單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbUseDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案件系統代號">
                                <ItemTemplate>
                                    <asp:Label ID="lbProvider" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文性質">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocProperty" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
