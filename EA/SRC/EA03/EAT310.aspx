<%@ Page language="c#" Codebehind="EAT310.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAT310" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT310 調案展期申請作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT310" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label1" runat="server" CssClass="KeyField">調案單號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txBorNo" tabIndex="0" runat="server" Width="5.5em" 
								CssClass="KeyUpperField" MaxLength="10"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 13em">
							<asp:label id="Label5" runat="server" Width="90px">申請日期：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txApplyDate" tabIndex="0" runat="server" Width="4em" 
								CssClass="DisplayOnly" ></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label4" runat="server">申請單單號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txApplyNo" tabIndex="0" runat="server" Width="5.5em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 13em">
							<asp:label id="Label8" runat="server" Width="103px" >已展延次數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txReborCont" tabIndex="0" runat="server" Width="1em" CssClass="DisplayOnly"
								ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label2" runat="server">調案日期：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txBorDate" tabIndex="0" runat="server" Width="4em"
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 14.5em">
							<asp:label id="Label6" runat="server" >調案期限：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txBorDueDate" tabIndex="0" runat="server" Width="4em" 
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label3" runat="server">調案單位：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDeptName" tabIndex="0" runat="server" Width="10em"
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label id="Label7" runat="server">調 案 人：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txEmpName" tabIndex="0" runat="server" Width="6em"
								CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></div>
					</div>
					<div class="dTR" class="hide" id="trDg1">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="lbdg1" runat="server" >調案明細：</asp:label></div>
						<div class="dTD">
							<DIV class="GridDiv" id="DIV_dg1" style="HEIGHT: 120px;" data-fixed="true">
								<asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None"
									BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="文　　號">
											<ItemTemplate>
												<asp:Label id="lbDOC_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主　　旨">
											<ItemTemplate>
												<asp:Label id="lbSUBJECT" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
					<div class="dTR" class="hide" id="trApplyData">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="lbApplyData" runat="server" CssClass="RequireField">預計歸還日：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txApplyData" tabIndex="0" runat="server" Width="4em" 
								CssClass="RequireField DatePicker" MaxLength="7"></asp:textbox></div>
					</div>
					<div class="dTR hide" id="trApplyReason1">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="lbApplyReason" runat="server" CssClass="RequireField">展期理由：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlPhraseNo" runat="server" Width="10em" CssClass="RequireField"></asp:dropdownlist></div>
					</div>
					<div class="dTR" class="hide" id="trApplyReason">
						<div class="dTDTitle" style="WIDTH: 6.5em">&nbsp;</div>
						<div class="dTD">
							<asp:textbox id="txApplyReason" tabIndex="0" runat="server" Width="28em" 
								CssClass="RequireField" MaxLength="100" Height="75px" TextMode="MultiLine" onblur="isMaxLength(this,'展期理由','100')"></asp:textbox></div>
					</div>
					<div class="dTR" class="hide" id="trCurrStatus">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label10" runat="server" >目前狀態：</asp:label></div>
						<div class="dTD">
							<asp:label id="lbStatus" runat="server"></asp:label></div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 118px;">
								<asp:datagrid id="dg2" runat="server" BackColor="White" BorderStyle="None"
									BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeqNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="審核時間">
											<ItemTemplate>
												<asp:Label id="lbEntryDateTime" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="審核主管">
											<ItemTemplate>
												<asp:Label id="lbDirectorName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="審核意見">
											<ItemTemplate>
												<asp:Label id="lbReborCode" runat="server"></asp:Label>
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
				<asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btSave" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
                <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btOnlySave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btDelete" runat="server" Text="刪除申請" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearchFlow" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btBack" runat="server" Text="撤回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />            
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
