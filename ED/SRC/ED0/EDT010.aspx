<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT010.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDT010" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT010 指定回閱設定作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
        <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT010" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_txOuId" tabIndex="0" runat="server"></asp:textbox>
				<asp:textbox id="H_txRoleId" tabIndex="0" runat="server"></asp:textbox>
				<asp:textbox id="H_txMsgId" tabIndex="0" runat="server"></asp:textbox>
				<asp:textbox id="H_txProxy" tabIndex="0" runat="server"></asp:textbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label1" runat="server" CssClass="KeyField" Width="83px">公文文號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="126px" CssClass="DisplayOnly" MaxLength="15"></asp:textbox></div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
					<div class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						</asp:Panel>
					</div>
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 157px;">
                                <asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False"
                                    GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="選">
                                            <ItemTemplate>
                                                <asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="單位">
                                            <ItemTemplate>
                                                <asp:Label id="lbOuName" runat="server"></asp:Label>
                                                <asp:textbox id="txOuId" tabIndex="0" runat="server" CssClass="hide"></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="角色">
                                            <ItemTemplate>
                                                <asp:Label id="lbRoleName" runat="server"></asp:Label>
                                                <asp:textbox id="txRoleNo" tabIndex="0" runat="server" CssClass="hide"></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="名稱">
                                            <ItemTemplate>
                                                <asp:Label id="lbEmpName" runat="server"></asp:Label>
                                                <asp:textbox id="txUsereName" tabIndex="0" runat="server" CssClass="hide"></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
