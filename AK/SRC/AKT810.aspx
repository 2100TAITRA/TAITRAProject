
<%@ Page language="c#" Codebehind="AKT810.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT810" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT810 調案歸還及展期作業</title>
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
		<form id="AKT810" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR" id="trBatch">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label class="RequireField" id="Label13" runat="server">還卷批號：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txBatchNo" runat="server" CssClass="RequireField" Width="4.5em" MaxLength="10"></asp:textbox>
							<asp:imagebutton id="IborBatch" tabIndex="15" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label class="RequireField" id="Label10" runat="server">調案單號：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txBorNo" runat="server" CssClass="RequireField" Width="5.5em" MaxLength="10"></asp:textbox>
							<asp:imagebutton id="btHelp" tabIndex="15" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>
							<asp:textbox id="txBorNo1" tabIndex="-1" runat="server" CssClass="hidden" Width="28px" MaxLength="8"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label class="RequireField" id="Label2" runat="server">承辦單位：</asp:label></div>
						<div class="dTD" style="WIDTH: 13em">
							<cc1:combobox id="dlUnit" runat="server" Width="9em" CssClass="RequireField comboBox"></cc1:combobox></div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label class="RequireField" id="Label1" runat="server">承辦人：</asp:label></div>
						<div class="dTD">
							<cc1:combobox id="dlName" runat="server" Width="6em" CssClass="RequireField comboBox"></cc1:combobox>
							<asp:textbox id="txUserValue" runat="server" CssClass="hidden" Width="24px"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label4" runat="server" CssClass="RequireField">異動日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:textbox id="txDate" runat="server" Width="4em" MaxLength="7" CssClass="RequireField"></asp:textbox>
							<asp:label id="lbHidParam" runat="server" CssClass="hide"></asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label11" runat="server" BackColor="#E0E0E0" >＊異動別為歸還需填寫保存狀況：</asp:label>
						</div>
						<div class="dTD"></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label12" runat="server" CssClass="RequireField">保存現況：</asp:label></div>
						<div class="dTD">
							<asp:DropDownList id="dlKeepNo" runat="server"></asp:DropDownList></div>
					</div>
					<div class="dTR">
						<div class="dTD" >
							<asp:label id="Label3" runat="server" BackColor="#E0E0E0">＊異動別為展期需填寫展期原因和展期說明：</asp:label>
						</div>
						<div class="dTD"></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label5" runat="server" >展期原因：</asp:label></div>
						<div class="dTD" style="WIDTH: 13em">
							<asp:dropdownlist id="dlReason" runat="server" Width="9em"></asp:dropdownlist></div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label7" runat="server" >原因說明：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDesc" runat="server" Height="21px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="hide" id="trLawDueDate">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label599" runat="server" >歸還日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 13em">
							<asp:textbox id="txLawDueDate" runat="server" CssClass="DatePicker" style="WIDTH: 4em"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTD" colSpan="4">
							<asp:label id="Label9" runat="server" BackColor="#E0E0E0">＊他機關借調展期需填寫來文文號和展期期限：</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label8" runat="server" >來文文號：</asp:label></div>
						<div class="dTD" style="WIDTH: 13em">
							<asp:textbox id="txDocNo" runat="server" Width="8em" MaxLength="15"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label6" runat="server" >展期期限：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txLimit" runat="server" Width="4em" MaxLength="7"></asp:textbox></div>
					</div>
				</div>
				<div class="DivTable">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="hide">
                        <asp:Button ID="btDgClear" runat="server" Text="清除" />
                        <asp:Button ID="btDgAll" runat="server" Text="全選" />
                        <asp:Button ID="btDgInverse" runat="server" Text="反向" />
                    </asp:Panel>
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 198px">
								<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="20" BackColor="White" 
								BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="4" GridLines="Vertical">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
												<asp:Label id="lbSeq" runat="server" CssClass="hide" Width="37px"></asp:Label>
												<asp:Label id="lbDueDate" runat="server" CssClass="hide"></asp:Label>
												<asp:TextBox id="txIsLawBor" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案單號">
											<ItemTemplate>
												<asp:HyperLink id="hlBorNo" runat="server"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="借調　總件數/總頁數">
											<ItemTemplate>
												<asp:TextBox id="txBorCount" tabIndex="-1" runat="server" CssClass="TextLabel" ></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="歸還　總件數/總頁數">
											<ItemTemplate>
												<asp:TextBox id="txRetCount" tabIndex="-1" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
												<asp:Label id="lbHidOrgno" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="展期次數">
											<ItemTemplate>
												<asp:Label id="lbReBorLimit" runat="server" CssClass="hide"></asp:Label>
												<asp:Label id="lbReBorCnt" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="異動別">
											<ItemTemplate>
												<asp:DropDownList id="dlBorType1" runat="server" onchange="dlBorType1OnChange(this);">
													<asp:ListItem></asp:ListItem>
													<asp:ListItem Value="歸還">歸還</asp:ListItem>
													<asp:ListItem Value="展期">展期</asp:ListItem>
												</asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
                                <asp:datagrid id="dg2" runat="server" AutoGenerateColumns="False" PageSize="20" BackColor="White" 
								BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="4" GridLines="Vertical">
									<Columns>
                                        <asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
                                                <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案單號">
											<ItemTemplate>
                                                <asp:Label id="lbBorNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔案類別(卡號/文號)">
											<ItemTemplate>
												<asp:Label ID="lbFileNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公司名稱或事由">
											<ItemTemplate>
                                                <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案單位/調案人">
											<ItemTemplate>
												<asp:Label ID="lbBorDeptUser" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="借調總卷數">
											<ItemTemplate>
												<asp:Label ID="lbAllVol" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="展期次數">
											<ItemTemplate>
												<asp:Label ID="lbExtCount" runat="server"></asp:Label>
                                                <asp:Label ID="lbInspCount" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="放棄" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
