<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM700C3.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM700C3" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM700C3 公告對象設定程式</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
		<!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM700C3" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server"></asp:listbox>
				<asp:TextBox id="txOrgNo" runat="server"></asp:TextBox>
				<asp:TextBox id="txIdType" runat="server"></asp:TextBox>
				<asp:TextBox id="txId1" runat="server"></asp:TextBox>
				<asp:TextBox id="txId2" runat="server"></asp:TextBox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label1" runat="server" Visible="False">發布對象類型：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="ddlTargetType" runat="server" tabIndex="1" Visible="False">
								<asp:ListItem Value="人員">人員</asp:ListItem>
								<asp:ListItem Value="組織">組織</asp:ListItem>
								<asp:ListItem Value="角色">角色</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label3" runat="server">發布對象選擇：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txTarget" runat="server" CssClass="DisplayOnly" Width="9.5em"></asp:textbox>
							<asp:button id="btSetTarget" runat="server" Text="..." tabIndex="2" Width="3.5em"></asp:button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label4" runat="server">執　　行：</asp:label></div>
						<div class="dTD"><asp:button id="btAddTarget" runat="server" Text="新增至可瀏覽清單" tabIndex="3"></asp:button></div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD"><asp:label id="Label2" runat="server" BackColor="DimGray" ForeColor="White">公告發布對象</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 221px">
								<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="對象">
											<ItemTemplate>
												<asp:Label id="lbName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText=" 執行">
											<ItemTemplate>
												<asp:Button id="btDel" runat="server" Text="刪除"></asp:Button>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid></DIV>
						</div>
					</div>
				</div>
			</div>
		</FORM>
	</BODY>
</HTML>
