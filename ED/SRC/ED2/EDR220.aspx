<%@ Page language="c#" Codebehind="EDR220.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR220" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR220 改分公文清單查詢及列印作業</TITLE>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR220" onkeyup="jf_CheckFull();" method="post" runat="server"> 
			<!--Template V3 Generated WebForm--> <!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:dropdownlist id="dlAllUnit" runat="server"></asp:dropdownlist><asp:textbox id="txOD_FLOW_TYPE" runat="server"></asp:textbox><asp:textbox id="H_Old_Sect" runat="server"></asp:textbox><asp:textbox id="H_New_Sect" runat="server"></asp:textbox><asp:textbox id="HOldSectNo" runat="server"></asp:textbox><asp:textbox id="HNewSectNo" runat="server"></asp:textbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label1" runat="server">收(創)文日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txRcvDateS" tabIndex="1" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							～
							<asp:textbox id="txRcvDateE" tabIndex="2" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label5" runat="server">改分日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txChgDateS" tabIndex="3" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							～
							<asp:textbox id="txChgDateE" tabIndex="4" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="Label2" runat="server">原承辦單位：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dl_Old_Dept" tabIndex="5" runat="server"></asp:dropdownlist>
							<asp:dropdownlist id="dl_Old_Sect" tabIndex="6" runat="server"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label3" runat="server" >承辦單位：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dl_New_Dept" tabIndex="7" runat="server"></asp:dropdownlist>
							<asp:dropdownlist id="dl_New_Sect" tabIndex="8" runat="server"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="rbReportTypeTitle" runat="server" CssClass="hide">報表類型：</asp:label>
						</div>
						<div class="dTD">
							<asp:RadioButton ID="rbDetail" runat="server" Text="明細表" GroupName="rbReportType" data-CN="明細表" CssClass="hide"></asp:RadioButton>
							<asp:RadioButton ID="rbSummary" runat="server" Text="統計表" GroupName="rbReportType" data-CN="統計表" CssClass="hide"></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="rbPaginationTypeTitle" runat="server" CssClass="hide" >分頁方式：</asp:label>
						</div>
						<div class="dTD">
							<asp:RadioButton ID="rbNoPaginated" runat="server" Text="不跳頁" GroupName="rbPaginationType" data-CN="不跳頁" CssClass="hide"></asp:RadioButton>
							<asp:RadioButton ID="rbPaginated" runat="server" Text="依原承辦單位跳頁" GroupName="rbPaginationType" data-CN="依原承辦單位跳頁" CssClass="hide"></asp:RadioButton>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="height: 333px">
								<asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False"
									GridLines="Vertical" CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDocNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="收(創)文日期">
											<ItemTemplate>
												<asp:Label id="lbRcvDate" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<asp:Label id="lbFromSubject" runat="server" CssClass="PopUp" Style="overflow:hidden"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="改分日期 時間">
											<ItemTemplate>
												<asp:Label id="lbDateTime" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="申請改分理由">
											<ItemTemplate>
												<asp:Label id="lbReason" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦單位">
											<ItemTemplate>
												<asp:Label id="lb_new_OU" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="原承辦單位">
											<ItemTemplate>
												<asp:Label id="lb_old_OU" runat="server"></asp:Label>
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
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" CssClass="hide"></asp:Button>
				<asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"  CssClass="hide" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
