<%@ Page language="c#" Codebehind="IFM300C3.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM300C3" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM300C3 帳號扮演角色順序子視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM300C3" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label class="KeyField" id="Label1" runat="server">使用者帳號：</asp:label></div>
                        <div class="dTD">
                            <asp:Label id="lbAccount" runat="server"></asp:Label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 7em">
                            <asp:label class="RequireField" id="Label2" runat="server">使用者姓名：</asp:label></div>
                        <div class="dTD">
                            <asp:Label id="lbName" runat="server"></asp:Label></div>
                    </div>
                </div>
                <div class="DivTable">
                    <DIV class="GridDiv" style="HEIGHT: 197px">
                        <asp:datagrid id="dg1" runat="server" PageSize="50" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
                            ForeColor="Black" BorderWidth="1px" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False"
                            Height="20px">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label id="lbSeq" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="新順序">
                                    <ItemTemplate>
                                        <asp:TextBox id="txNewSeq" runat="server" Width="2em" MaxLength="2"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="角色名稱">
                                    <ItemTemplate>
                                        <asp:TextBox id="txPlayRole" CssClass="DisplayOnly" Width="24em" runat="server"></asp:TextBox>
                                        <asp:TextBox id="txRoleID" CssClass="hide" runat="server"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:datagrid>
                    </DIV>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
