<%@ Page Language="c#" CodeBehind="ODT137.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT137" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT137 公佈欄收文待登錄公文查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODT137" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="h_OrgNo" Width="50" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:TextBox ID="h_DeptNo" Width="50" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:TextBox ID="h_UserId" Width="50" runat="server" CssClass="hidden"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txDocNoS" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>─
						<asp:TextBox CssClass="InputFieldNumeric" ID="txDocNoE" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">公告編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txBulletinIDS" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>─
						<asp:TextBox CssClass="InputFieldNumeric" ID="txBulletinIDE" TabIndex="2" runat="server" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">公告日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="DatePicker" ID="txDateS" TabIndex="2" runat="server" Width="4em"></asp:TextBox>─
						<asp:TextBox CssClass="DatePicker" ID="txDateE" TabIndex="2" runat="server" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgName" runat="server" Width="8em" ForeColor="Navy"></asp:TextBox>
                        <asp:ImageButton ID="btFromPrompt" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txFromOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" Width="14em" Visible="True" MaxLength="15" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <asp:Button ID="btSelectAll" runat="server" Text="全選" CausesValidation="False"></asp:Button>
                <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button><br>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="30" CellPadding="1" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlSeqNo" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server" AutoPostBack="False"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公告日期">
                                <HeaderStyle HorizontalAlign="Center" Width="5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDate" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <HeaderStyle HorizontalAlign="Center" Width="5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server" Width="5em"></asp:HyperLink>
                                    <asp:TextBox ID="H_txBulletinId" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <HeaderStyle HorizontalAlign="Center" Width="6.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgName" Style="overflow: hidden" runat="server" CssClass="PopUp" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <HeaderStyle HorizontalAlign="Center" Width="9.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFromWord" Style="overflow: hidden" runat="server" CssClass="PopUp" Width="9.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" Style="overflow: hidden" runat="server" CssClass="PopUp" Width="13.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
