<%@ Page language="c#" Codebehind="IFM306.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM306" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM306 多重機關帳號鏈結作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="/STDN/Lib/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM306" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv">
                <asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
                <asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
                <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em;">
							<asp:label id="Label1" runat="server">隸屬機關：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 12em;">
							<asp:TextBox id="txMainOrg" runat="server" Width="10em"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="WIDTH: 5.5em;">
							<asp:label id="Label2" runat="server">連結機關：</asp:label>
						</div>
						<div class="dTD">
							<asp:DropDownList id="dlConnOrg" runat="server" Width="10em" Height="29px"></asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em;">
							<asp:label id="Label3" runat="server">帳　　號：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 12em;">
							<asp:TextBox id="txAccount" runat="server" Width="10em"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="WIDTH: 5.5em;">
							<asp:label id="Label4" runat="server">連結帳號：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txConnAccount" runat="server" Width="10em"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em;">
							<asp:label id="Label5" runat="server">名　　稱：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 12em;">
							<asp:TextBox id="txName" runat="server" Width="8em"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="WIDTH: 5.5em;">
							<asp:label id="Label6" runat="server">連結名稱：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txConnName" runat="server" Width="8em"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 23em;">
							<asp:label id="Label7" runat="server">密　　碼：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txConnMima" runat="server" Width="10em" TextMode="Password"></asp:TextBox>
							<asp:TextBox id="txGUID" runat="server" Width="10em" CssClass="hide"></asp:TextBox>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<DIV class="dTR">
                        <asp:Button ID="btDgDelete" runat="server" Text="刪除" CssClass="hide"></asp:Button>
					</DIV>
					<DIV class="dTR">
					    <div class="GridDiv" style="HEIGHT: 340px;">
						    <asp:datagrid id="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
							    <Columns>
								    <asp:TemplateColumn HeaderText="序">
									    <ItemTemplate>
										    <asp:Label id="lbSeq" runat="server"></asp:Label>
									    </ItemTemplate>
								    </asp:TemplateColumn>
								    <asp:TemplateColumn HeaderText="選">
									    <ItemTemplate>
										    <asp:CheckBox id="cbdgSelect" runat="server"></asp:CheckBox>
									    </ItemTemplate>
								    </asp:TemplateColumn>
								    <asp:TemplateColumn HeaderText="機關名稱">
									    <ItemTemplate>
										    <asp:Label id="lbdgOrgNo" runat="server" CssClass="hide"></asp:Label>
										    <asp:Label id="lbdgOrgName" runat="server"></asp:Label>
									    </ItemTemplate>
								    </asp:TemplateColumn>
								    <asp:TemplateColumn HeaderText="帳號">
									    <ItemTemplate>
										    <asp:Label id="lbdgAccount" runat="server"></asp:Label>
									    </ItemTemplate>
								    </asp:TemplateColumn>
								    <asp:TemplateColumn HeaderText="姓名">
									    <ItemTemplate>
										    <asp:Label id="lbdgName" runat="server"></asp:Label>
									    </ItemTemplate>
								    </asp:TemplateColumn>
							    </Columns>
						    </asp:datagrid>
					    </DIV>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>>
		</FORM>
	</BODY>
</HTML>
