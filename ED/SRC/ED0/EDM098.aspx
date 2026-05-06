<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDM098.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM098" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM098 待議對象設定作業</TITLE>
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
		<FORM id="EDM098" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:dropdownlist id="H_dlDept" runat="server" Width="80px"></asp:dropdownlist><asp:dropdownlist id="H_dlSect" runat="server" Width="80px"></asp:dropdownlist><asp:dropdownlist id="H_dlRole" runat="server" Width="80px"></asp:dropdownlist><asp:TextBox id="H_RoleID" runat="server" Width="80px"></asp:TextBox><asp:TextBox id="H_OUID" runat="server" Width="80px"></asp:TextBox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" width="8em">
                            <asp:label id="Label2" runat="server" CssClass="KeyField">訊息擁有單位：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlDept" runat="server" CssClass="KeyField" Width="9em"></asp:dropdownlist>
                            <asp:dropdownlist id="dlSect" runat="server" CssClass="KeyField" Width="9em"></asp:dropdownlist></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" width="8em">
                            <asp:label id="Label3" runat="server" CssClass="KeyField">訊息擁有角色：</asp:label></div>
                        <div class="dTD">
                            <asp:dropdownlist id="dlRole" runat="server" Width="9em" CssClass="KeyField"></asp:dropdownlist></div>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 400px;">
                                <asp:datagrid id="dg1" runat="server" PageSize="10" AutoGenerateColumns="False"
                                    GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server" Font-Size="Small" Font-Names="細明體"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="可指定單位">
                                            <ItemTemplate>
                                                <asp:dropdownlist id="dlDgDept" runat="server" Width="9em"></asp:dropdownlist>
                                                <asp:dropdownlist id="dlDgSect" runat="server" Width="9em"></asp:dropdownlist>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="可指定角色">
                                            <ItemTemplate>
                                                <asp:dropdownlist id="dlDgRole" runat="server" Width="9em" CssClass="RequireField"></asp:dropdownlist>
                                                <asp:TextBox id="H_DgOUID" runat="server" Width="80px" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="H_DgRoleID" runat="server" Width="80px" CssClass="hide"></asp:TextBox>
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
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
