<%@ Page language="c#" Codebehind="EDT521.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDT521" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT521 公文郵件郵寄方式登錄作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT521" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:dropdownlist style="Z-INDEX: 0" id="H_ALL_dlSubclassNo" runat="server" 
					></asp:dropdownlist><asp:dropdownlist style="Z-INDEX: 0" id="H_dlClassNo" runat="server" 
					></asp:dropdownlist></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 9em; "><asp:label id="Label3" runat="server" CssClass="KeyUpperField">公文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 18em; "><asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="6.5em" CssClass="KeyFieldNumeric" MaxLength="10" ></asp:textbox></DIV>
						<DIV class="dTD" style="width: 5em; ">&nbsp;</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 9em; "><asp:label style="Z-INDEX: 0" id="Label1" runat="server">郵寄大類、小類：</asp:label></DIV>
						<DIV class="dTD" style="width: 18em; "><asp:dropdownlist style="Z-INDEX: 0" id="dlClassNo" runat="server" ></asp:dropdownlist><asp:dropdownlist style="Z-INDEX: 0" id="dlSubclassNo" runat="server" ></asp:dropdownlist></DIV>
						<DIV class="dTD" style="width: 5em; "><asp:button style="Z-INDEX: 0" id="btSetDgDl" runat="server" Text="批次設定"></asp:button><asp:textbox style="Z-INDEX: 0" id="H_txSubNo" runat="server" CssClass="hide"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
								<asp:Button ID="btSelectAll" runat="server" Text="全選"/>
								<asp:Button ID="btSelectInverse" runat="server" Text="反向"/>
								<asp:Button ID="btSelectClear" runat="server" Text="清除"/>
							</asp:Panel>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="GridDiv" style="WIDTH: 540px;HEIGHT: 129px;">
								<asp:datagrid id="dg1" runat="server" ageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
									<Columns>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="H_lbSeq_no" runat="server" 
													CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="受文者">
											<ItemTemplate>
												<asp:Label id="lbOrgName" runat="server" Width="86px" 
													></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="國別">
											<ItemTemplate>
												<asp:DropDownList id="dlCountryType" runat="server" Width="102px" Height="22px">
													<asp:ListItem Value="0">國內</asp:ListItem>
													<asp:ListItem Value="1">國外</asp:ListItem>
												</asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="郵寄大類">
											<ItemTemplate>
												<asp:DropDownList id="dlPostClass" runat="server" Width="102px" Height="22px"></asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="郵寄小類">
											<ItemTemplate>
												<asp:DropDownList id="dlPostSubclass" runat="server" Width="102px" Height="22px"></asp:DropDownList>
												<asp:TextBox id="H_txSubclassNo" runat="server" Width="30px" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="郵寄地區">
											<ItemTemplate>
												<asp:DropDownList id="dlRegionName" runat="server" Width="84px" Height="22px"></asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存(S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除(Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消(Z)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢(F)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
