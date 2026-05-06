<%@ Page language="c#" Codebehind="ODM210.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM210" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODM210 案件維護作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODM210" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label class="KeyField" id="Label1" runat="server">案件編號：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txCaseNo" tabIndex="10" runat="server" CssClass="KeyField" MaxLength="10" Width="5.5em"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server">立案日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txNewDate" tabIndex="15" runat="server" MaxLength="7" Width="4em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:textbox id="H_Now" runat="server" CssClass="hide" Width="1em"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label4" runat="server">案件名稱：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txCaseName" tabIndex="35" runat="server" Width="34em"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">主要公文號：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txDocNo" tabIndex="40" runat="server" CssClass="RequireField" MaxLength="10" Width="6.5em"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label6" runat="server">業務類別：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txBType" tabIndex="-1" runat="server" CssClass="DisplayOnly" Width="10em"></asp:textbox>
							<asp:listbox id="lbBType" runat="server" CssClass="hide"></asp:listbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label5" runat="server">公文性質：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txProperty" tabIndex="-1" runat="server" CssClass="DisplayOnly" Width="7em"></asp:textbox>
							<asp:listbox id="lbProperty" runat="server" CssClass="hide"></asp:listbox>
						</div>
						<div style="WIDTH: 7em">
							<asp:textbox id="IsClose" runat="server" CssClass="hide" Width="1em"></asp:textbox>
						</div>
					</div>
				</div>
				<div class="DivTable">
                    <div class ="dTR">
                        <div class="dTDTitle">
					        <DIV class="GridDiv" style="HEIGHT: 13.5em " data-fixed="true">
						        <asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="0" GridLines="Vertical">
							        <Columns>
								        <asp:TemplateColumn HeaderText="相關機關、人">
									        <ItemTemplate>
										        <asp:TextBox id="txOrgno" tabIndex="50" runat="server" Width="17em"></asp:TextBox>
									        </ItemTemplate>
								        </asp:TemplateColumn>
							        </Columns>
						        </asp:datagrid>
					        </DIV>
                        </div>
                        <div class="dTD" style="width:15em">&nbsp;</div>
                        <div class="dTD">
					        <DIV class="GridDiv" style="HEIGHT: 13.5em " data-fixed="true">
						        <asp:datagrid id="dg2" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="0" GridLines="Vertical">
							        <Columns>
								        <asp:TemplateColumn HeaderText="關鍵詞">
									        <ItemTemplate>
										        <asp:TextBox id="txWord" tabIndex="55" runat="server" Width="17em"></asp:TextBox>
									        </ItemTemplate>
								        </asp:TemplateColumn>
							        </Columns>
						        </asp:datagrid>
					        </DIV>
                        </div>
                    </div>
				</div>
				<div class="DivTable">
					<div  class="GridDiv" style="HEIGHT:8em">	
						<asp:datagrid id="dg3Title" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="0" GridLines="Vertical">
                        <Columns>
							<asp:TemplateColumn HeaderText="相關文號">
								<ItemTemplate>
									<asp:Label runat="server" style="margin:0 auto;"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
						</asp:datagrid>
						<asp:datagrid id="dg3" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="0" GridLines="Vertical">
							<Columns>
								<asp:TemplateColumn HeaderText="文號" >
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收創文日期">
									<ItemTemplate>
										<asp:Label id="lbDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:TextBox id="txSubject" tabIndex="-1" runat="server" CssClass="TextLabel" Width="25em" ReadOnly="True"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
