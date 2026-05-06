<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT251.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT251" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EDT251 專案申請批次核可作業</TITLE>
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
		<FORM id="EDT251" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:label style="Z-INDEX: 0" id="Label3" runat="server" Width="5.5em" >審核意見：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist style="Z-INDEX: 0" id="dlPhraseNo" runat="server" Width="10em" ></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">&nbsp;</div>
						<div class="dTD">
							<asp:textbox style="Z-INDEX: 0" id="txAuditMsg" tabIndex="0" runat="server" Width="30em" 
								  TextMode="MultiLine" MaxLength="200" Height="40px"></asp:textbox></div>
					</div>
				</div>
				<div class="DivTable" id="GridTable">
					<div class="dTR">
						<div class="dTD">
							<asp:Panel ID="tbSelect" runat="server" CssClass="dTD DgSelectToolBar">
								<asp:Button ID="btSelectAll" runat="server" Text="全選" />
								<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
								<asp:Button ID="btSelectClear" runat="server" Text="清除" />
							</asp:Panel>
						</div>
						<div class="dTD">
							<asp:radiobutton style="Z-INDEX: 0" id="rbAppNo" runat="server" GroupName="gSort" Checked="True" Text="依申請單號"></asp:radiobutton>
							<asp:radiobutton style="Z-INDEX: 0" id="rbDocNo" runat="server" GroupName="gSort" Text="依文號"></asp:radiobutton>
							<asp:button style="Z-INDEX: 0" id="btSort" runat="server" Text="重新排序"></asp:button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 472px;">
								<asp:datagrid id="dg1" runat="server"  BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="申請單號<BR>公文文號">
											<ItemTemplate>
												<P>
													<asp:HyperLink style="Z-INDEX: 0" id="hlAppNo" runat="server" ></asp:HyperLink>
													<asp:Label style="Z-INDEX: 0" id="lbUrl" runat="server" Width="0px"  
														CssClass="hidden"></asp:Label><BR>
													<asp:Label style="Z-INDEX: 0" id="lbDocNo" runat="server" ></asp:Label>
												</P>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<div>
													<asp:Label style="Z-INDEX: 0" id="lbSubject" runat="server"  ></asp:Label>
												</div>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦單位<br>承辦人">
											<ItemTemplate>
												<asp:Label style="Z-INDEX: 0" id="lbDeptNM" runat="server" ></asp:Label><BR>
												<asp:Label style="Z-INDEX: 0" id="lbRpsUser" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="收創文日期<br>限辦日期">
											<ItemTemplate>
												<asp:Label style="Z-INDEX: 0" id="lbRcvDate" runat="server" ></asp:Label><BR>
												<asp:Label style="Z-INDEX: 0" id="lbDueDate" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="專案名稱<br>申請天數/申請後限辦日">
											<ItemTemplate>
												<asp:Label style="Z-INDEX: 0" id="lbName" runat="server" ></asp:Label><BR>
												<asp:Label style="Z-INDEX: 0" id="lbAppDays" runat="server" ></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbSap" runat="server" >天/</asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbNDueDate" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="申請理由">
											<ItemTemplate>
											<div>
												<asp:Label style="Z-INDEX: 0" id="lbReason" runat="server" ></asp:Label>
											</div>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="展期申請資訊" >
											<ItemTemplate>
												<asp:Label style="Z-INDEX: 0" id="lbMsgId" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbOwnOuId" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbOwnUserId" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbOwnRoleId" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbAppEnable" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbTxDate" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbDocProperty" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbBType" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbFromMsg" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbAppOuId" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbAppRoleId" runat="server"></asp:Label>
												<asp:Label style="Z-INDEX: 0" id="lbAppUserId" runat="server"></asp:Label>
												<asp:Label Style="z-index: 0" ID="lbSTEP" runat="server" CssClass="hide"></asp:Label>
												<asp:TextBox ID="H_MAXROLE" runat="server" CssClass="hide"></asp:TextBox>
												<asp:TextBox ID="H_Enabled" runat="server" CssClass="hide"></asp:TextBox>
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
				<asp:Button ID="btCommit" runat="server" Text="核可" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btBack" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
