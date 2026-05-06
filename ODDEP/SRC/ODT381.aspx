<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT381.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT381" SmartNavigation="False" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT381 非發文寄送維護作業</title>
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
    <form id="ODT381" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">寄送單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="cbxOUId" TabIndex="10" runat="server" CssClass="comboBox RequireField" Width="7em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPostDate" TabIndex="20" runat="server" CssClass="RequireFieldNumeric"
                            Width="4em" MaxLength="7"></asp:TextBox>&nbsp;&nbsp;
						<asp:Label ID="Label8" runat="server">時間：</asp:Label>
                        <asp:TextBox ID="txSTime" TabIndex="10" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">－</asp:Label>
                        <asp:TextBox ID="txETime" TabIndex="10" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList ID="dlTime" TabIndex="10" runat="server" Width="8em">
						</asp:DropDownList>
                    </div>
                </div>
            </div>
            <asp:Label ID="lblen" runat="server" CssClass="hide" Width="0px" Height="0px" DESIGNTIMEDRAGDROP="61"></asp:Label>
            <asp:Button ID="btAdd" runat="server" CssClass="hide" Width="0px" Height="0px" Text="Button"></asp:Button>
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
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" PageSize="50">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSetSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="識別碼">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="(受文者)郵遞區號 住址">
                                <ItemTemplate>
                                    <asp:TextBox ID="txOrgNo" onblur="txOrgNo_onblur();" runat="server" Width="5em"></asp:TextBox>
                                    <asp:ImageButton ID="btOrgPrompt" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                                    <asp:TextBox ID="txOrgName" onblur="txOrgName_onblur();" runat="server" CssClass="RequireField"
                                        Width="26em"></asp:TextBox><br>
                                    <asp:TextBox CssClass="InputFieldNumeric" ID="txPostCode" runat="server" Width="3.5em" MaxLength="6"></asp:TextBox>
                                    <asp:TextBox ID="txAddress" runat="server" Width="30em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderTemplate>
                                    <asp:Label ID="Label3" runat="server" Width="2.5em">&nbsp;櫃號&nbsp;</asp:Label>
                                    <asp:Label ID="Label4" runat="server" Width="7.5em">郵遞方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                                    <asp:Label ID="Label5" runat="server" Width="2.5em">重量&nbsp;</asp:Label>
                                    <asp:Label ID="Label6" runat="server" Width="2.5em">郵資</asp:Label><br>
                                    <asp:Label ID="Label7" runat="server" Width="15em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;備　　　　　　　　　註</asp:Label>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:TextBox CssClass="InputFieldNumeric" ID="txCabinetNo" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                    <asp:DropDownList ID="dgDllSendType" runat="server" Width="7.5em" onchange="fnGetPostCost('Dg');"></asp:DropDownList>
                                    <asp:TextBox CssClass="InputFieldNumeric" ID="txWeight" onblur="fnGetPostCost('Dg');" runat="server"
                                        Width="2.5em" MaxLength="5"></asp:TextBox>
                                    <asp:TextBox ID="dgTxPostCost" runat="server" Width="2.5em" MaxLength="8" CssClass="InputFieldNumeric"></asp:TextBox><br>
                                    <asp:TextBox ID="txDesc" runat="server" Width="15em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵資機">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
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
                <asp:TextBox ID="h_OrgNo" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
                <asp:TextBox ID="h_DeptNo" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
                <asp:TextBox ID="h_UserId" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
