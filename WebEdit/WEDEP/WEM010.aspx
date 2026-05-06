<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="WEM010.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM010" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>WEM010 機關維護作業</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="WEM010" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV class="hide">
				<asp:textbox id="H_Orgno" runat="server" Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_HasAuth" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Dept" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Owner" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:listbox style="Z-INDEX: 101; POSITION: absolute; TOP: 102px; LEFT: 10px" id="lbReturnValue"
					runat="server" CssClass="hidden"></asp:listbox>
				<asp:textbox id="H_ReturnOwner" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Answer" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_ServiceURL" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_txExportRange" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_OldGrp" runat="server"  Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_HasOs" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_OrgNickName" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_UserInfoOrg" runat="server" Width="8px" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_WEM010C1OWNER" runat="server" Width="8px" CssClass="hide"></asp:textbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="tb1">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label16" class="KeyField" runat="server">編修權擁有者：</asp:label></div>
						<div class="dTD">
							<asp:RadioButton ID="rbBasic" TabIndex="30" runat="server" Text="基本(地址簿)" GroupName="rbOwner" ></asp:RadioButton>
							<asp:RadioButton ID="rbOrg" TabIndex="30" runat="server" Text="機關共用" GroupName="rbOwner" ></asp:RadioButton>
							<asp:RadioButton ID="rbUser" TabIndex="30" runat="server" Text="個人" GroupName="rbOwner" ></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label1" class="KeyField" runat="server">識別碼：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txSYSIDMain" class="KeyUpperField" tabIndex="1" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label15" runat="server">類別：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlOrgType" runat="server"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label2" runat="server">名稱：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txOrgName" runat="server" Width="20em" MaxLength="60"></asp:textbox></div>
					</div>
					<div class="dTR" id="tr3">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbMan" runat="server">聯絡人：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txMan" runat="server" Width="5.5em" MaxLength="10"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label4" runat="server">電話：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txPhone" runat="server" Width="6em" MaxLength="20"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label9" runat="server">傳真：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txFax" runat="server" Width="6em" MaxLength="20"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label6" runat="server">郵遞區號：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em;">
							<asp:textbox class="InputFieldNumeric" id="txPost" runat="server" Width="3.5em" MaxLength="6"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label5" runat="server">電子信箱：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txMail" runat="server" Width="10em" MaxLength="60"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label11" runat="server">地址：</asp:label></div>
						<div class="dTD" colSpan="3">
							<asp:textbox id="txAddr" runat="server" Width="20em" MaxLength="200"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label style="Z-INDEX: 0" id="lbRegion" runat="server" CssClass="hide">郵寄地區：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:dropdownlist style="Z-INDEX: 0" id="dlRegion" runat="server" CssClass="hide"></asp:dropdownlist></div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbCountryType" runat="server" CssClass="hide">國別：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlCountryType" runat="server" CssClass="hide"></asp:dropdownlist></div>
					</div>
					<div class="dTR" id="trAccount">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label8" runat="server">對應帳號代碼：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em;">
							<asp:textbox id="txInternalAccount" runat="server" Width="5.5em" MaxLength="10"></asp:textbox></div>
					</div>
				</div>
				<div class="DivTable" id="tb2">
					<div class="dTR" id="trUnit">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label7" runat="server">內部單位代碼：</asp:label></div>
						<div class="dTD" style="WIDTH: 11em;">
							<asp:textbox id="txInternalUnit" runat="server" Width="5.5em" MaxLength="10"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label style="Z-INDEX: 0" id="lbOverSea" runat="server" CssClass="hide">海外單位：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist style="Z-INDEX: 0" id="dlOverSea" runat="server" CssClass="hide"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label3" runat="server">機關代碼：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em;">
							<asp:textbox id="txStdID" runat="server" Width="9em" MaxLength="17"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 8em;" id="tdlbCabinet">
							<asp:label id="Label14" runat="server">櫃號：</asp:label></div>
						<div class="dTD" id="tdtxCabinet">
							<asp:textbox id="txCabinetNo" runat="server" Width="2.5em" MaxLength="4"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label12" runat="server">電子交換現況：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:dropdownlist id="dlElcType" runat="server"></asp:dropdownlist></div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label13" runat="server">預設發文方式：</asp:label></div>
						<div class="dTD" style="WIDTH: 10.3em">
							<asp:dropdownlist id="dlIssueType" runat="server">
								<asp:ListItem></asp:ListItem>
								<asp:ListItem Value="1">人工傳遞</asp:ListItem>
								<asp:ListItem Value="2">郵寄</asp:ListItem>
								<asp:ListItem Value="3">電子交換</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label10" runat="server">發文閘道：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:dropdownlist id="dlIssueGateWay" runat="server">
								<asp:ListItem Value="O">閘道外</asp:ListItem>
								<asp:ListItem Value="I">閘道內</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 146px;" data-fixed="true">
								<asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemStyle HorizontalAlign="Center"></ItemStyle>
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="簡稱／別名">
											<ItemTemplate>
												<asp:TextBox id="txName" runat="server" Width="24em" MaxLength="40"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 168px;" data-fixed="true">
								<asp:datagrid id="dg2" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="群組代號">
											<ItemTemplate>
												<asp:TextBox id="txGrpNo" onblur="CheckGrpInfo()" runat="server" Width="3em" MaxLength="6"></asp:TextBox>
												<asp:ImageButton id="btSearchGrp" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="群組名稱">
											<ItemTemplate>
												<asp:TextBox id="txGrpName" tabIndex="-1" runat="server" CssClass="TextLabel" Width="18em" ></asp:TextBox>
												<asp:TextBox id="txSYSID" tabIndex="-1" runat="server" CssClass="hide"  Width="18em"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:customvalidator style="Z-INDEX: 103; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" id="ValidationSummary1"
				runat="server" CssClass="hidden"></asp:validationsummary>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btImport" runat="server" Text="批次匯入" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide"/>
				<asp:Button ID="btExport" runat="server" Text="批次匯出" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" CssClass="hide"/>
				<asp:Button ID="btHelp" runat="server" Text="操作說明" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide"/>
			</asp:Panel>
		</form>
	</body>
</HTML>
