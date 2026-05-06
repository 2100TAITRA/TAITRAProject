<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT380.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT380" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT380 公文郵遞設定作業</title>
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
    <form id="ODT380" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox class="KeyUpperField" ID="txDocNo" TabIndex="10" runat="server" MaxLength="15" Width="6.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbPD" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbIssueDate" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
				<div class="dTR" id="SetDiv" runat="server">
					<asp:Panel ID="tbSelect" runat="server" CssClass="dTD DgSelectToolBar">
						<asp:Button ID="btSelectAll" runat="server" Text="全選" />
						<asp:Button ID="btClear" runat="server" Text="清除" />
						<asp:Button ID="btReverse" runat="server" Text="反向" />
					</asp:Panel>
					<asp:Label ID="Label20" runat="server">郵遞方式：</asp:Label>
                    <asp:DropDownList ID="dlSetSendType" runat="server" Width="7.5em" onchange="fnGetPostCost('Set');">
					</asp:DropDownList>
					<asp:Label ID="Label21" runat="server">重量：</asp:Label>
                    <asp:TextBox ID="txSetWeight" runat="server" Width="2.5em" MaxLength="5" onblur="fnGetPostCost('Set');"></asp:TextBox>
					<asp:Label ID="Label22" runat="server">郵資：</asp:Label>
                    <asp:TextBox ID="txSetCost" runat="server" Width="4em" MaxLength="8" CssClass="InputFieldNumeric"></asp:TextBox>
					<asp:Button ID="btSet" runat="server" Text="設定" />
				</div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="0" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" readonly="readonly"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSetSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="(受文者)郵遞區號  地址">
                                <ItemTemplate>
                                    <asp:TextBox ID="txRcvOrg" runat="server" CssClass="TextLabel" Width="32em" ReadOnly="True"></asp:TextBox><br>
                                    <asp:TextBox ID="txPostCode" runat="server" Width="3.5em" MaxLength="6"></asp:TextBox>
                                    <asp:TextBox ID="txAddress" runat="server" Width="30em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="櫃號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txCabinetNo" CssClass="InputFieldNumeric" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵遞方式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dgDllSendType" runat="server" Width="7.5em" onchange="fnGetPostCost('Dg');"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="重量">
                                <ItemTemplate>
                                    <asp:TextBox ID="txWeight" runat="server" Width="2.5em" onblur="fnGetPostCost('Dg');" CssClass="InputFieldNumeric" MaxLength="5"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵資">
                                <ItemTemplate>
                                    <asp:TextBox ID="dgTxPostCost" runat="server" Width="2.5em" MaxLength="8" CssClass="InputFieldNumeric"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵資機">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                    <asp:Label ID="lbDocSeq" runat="server" CssClass="hidden"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="彙整">
                                <ItemTemplate>
                                    <asp:CheckBox ID="dgCbIsCombine" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 102; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 103; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
