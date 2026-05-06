<%@ Page language="c#" Codebehind="AKM103.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM103" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKM103 歸檔公文存放庫房及管理人維護作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="" MS_POSITIONING="GridLayout">
		<form id="AKM103" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<asp:label class="KeyField" id="Label2" runat="server">承辦單位：</asp:label>
					</DIV>
					<DIV class="dTR">
						<cc1:combobox id="dlDept" runat="server" CssClass="KeyField comboBox"></cc1:combobox>
					</DIV>
					<DIV class="dTR">
						<asp:checkbox id="ck1" runat="server" Text="承辦單位所屬分類號一併更新"></asp:checkbox>
					</DIV>
				</DIV>
				<asp:label id="lbOrgNo" runat="server" CssClass="hide"></asp:label>
                <DIV class="DivTable">
				    <DIV id="LTable" class="dTDTitle">
					    <DIV class="dTR">
						    <DIV class="dTDTitle">
							    <asp:label class="RequireField" id="Label1" runat="server">機關歸檔庫房：</asp:label>
						    </DIV>
						    <DIV class="dTD">
							    <asp:dropdownlist id="dlStore1" runat="server" CssClass="RequireField"></asp:dropdownlist>
						    </DIV>
					    </DIV>
					    <DIV class="dTR">
						    <asp:checkbox id="cbOrgno" runat="server" Text="機關歸檔公文納入稽催"></asp:checkbox>
					    </DIV>
					    <DIV class="dTR">
						    <asp:label id="Label4" runat="server">機關庫房管理人：</asp:label>
					    </DIV>
					    <DIV class="DivTable">
						    <DIV class="GridDiv" style="HEIGHT: 10em" data-fixed="true">
							    <asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
								    <Columns>
									    <asp:TemplateColumn HeaderText="序">
										    <ItemTemplate>
											    <asp:Label id="lbSeq" runat="server"></asp:Label>
										    </ItemTemplate>
									    </asp:TemplateColumn>
									    <asp:TemplateColumn HeaderText="管理人">
										    <ItemTemplate>
											    <asp:DropDownList id="dlUser" runat="server" Width="8.5em"></asp:DropDownList>
										    </ItemTemplate>
									    </asp:TemplateColumn>
								    </Columns>
							    </asp:datagrid>
						    </DIV>
					    </DIV>
				    </DIV>
				    <DIV id="RTable" class="dTD">
					    <DIV class="dTR">
						    <DIV class="dTDTitle">
							    <asp:label class="RequireField" id="Label3" runat="server">單位歸檔庫房：</asp:label>
						    </DIV>
						    <DIV class="dTD">
							    <asp:dropdownlist id="dlStore2" runat="server" CssClass="RequireField"></asp:dropdownlist>
						    </DIV>
					    </DIV>
					    <DIV class="dTR">
						    <asp:checkbox id="cbDept" runat="server" Text="單位歸檔公文納入稽催"></asp:checkbox>
					    </DIV>
					    <DIV class="dTR">
						    <asp:label id="Label5" runat="server">單位庫房管理人：</asp:label>
					    </DIV>
					    <DIV class="DivTable">
						    <DIV class="GridDiv" style="HEIGHT: 10em" data-fixed="true">
							    <asp:datagrid id="dg2" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
								    <Columns>
									    <asp:TemplateColumn HeaderText="序">
										    <ItemTemplate>
											    <asp:Label id="lbSeq" runat="server"></asp:Label>
										    </ItemTemplate>
									    </asp:TemplateColumn>
									    <asp:TemplateColumn HeaderText="管理人">
										    <ItemTemplate>
											    <asp:DropDownList id="dlUser" runat="server" Width="8.5em"></asp:DropDownList>
										    </ItemTemplate>
									    </asp:TemplateColumn>
								    </Columns>
							    </asp:datagrid>
						    </DIV>
					    </DIV>
				    </DIV>                    
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
