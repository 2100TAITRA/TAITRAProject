<%@ Page language="c#" Codebehind="IFM020.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM020" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM020 群組設定作業</TITLE>
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
		<FORM id="IFM020" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label1" runat="server" CssClass="KeyField">群組編號：</asp:label></div>
						<div class="dTD"><asp:textbox id="txNo" tabIndex="0" runat="server" Width="2.5em" CssClass="KeyField" MaxLength="4"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label2" runat="server" CssClass="RequireField">群組名稱：</asp:label></div>
						<div class="dTD"><asp:textbox id="txName" tabIndex="0" runat="server" Width="19em" CssClass="RequireField" MaxLength="50"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em;"><asp:label id="Label3" runat="server" CssClass="RequireField">群組層級：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbOrg" runat="server" Text="機關" GroupName="RBGRP"></asp:radiobutton>
							<asp:radiobutton id="rbDept" runat="server" Text="單位" GroupName="RBGRP"></asp:radiobutton>
							<asp:radiobutton id="rbPrivate" runat="server" Text="個人" GroupName="RBGRP"></asp:radiobutton>
							<asp:textbox id="txPrivate" runat="server" Width="4.5em" CssClass="displayonly"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em;"><asp:label id="lbGroupType" runat="server" CssClass="RequireField">群組類型：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbTypeDept" runat="server" Text="單位" GroupName="RBType"></asp:radiobutton>
							<asp:radiobutton id="rbTypeAcc" runat="server" Text="帳號" GroupName="RBType"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR" id="trDept">
						<div class="dTDTitle" style="WIDTH: 6em;"><asp:label id="Label5" runat="server" CssClass="RequireField">所屬單位：</asp:label></div>
						<div class="dTD"><asp:dropdownlist id="ddlDept" runat="server" CssClass="RequireField"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label4" runat="server" >筆數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txCnt" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:textbox>
							<asp:button id="btChange" runat="server" Text="變更"></asp:button>
							<asp:textbox id="txFileFullName" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="txRadioValue" runat="server" CssClass="hide"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="lbFile" runat="server" >檔案：</asp:label></div>
						<div class="dTD">
							<INPUT id="txFilePath" type="file" accept=".csv,.txt" style="WIDTH: 11em;" tabIndex="1" size="9" name="txFilePath" runat="server">
							<asp:button ID="btUpLoad" runat="server" Text="批次匯入"></asp:button>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
								<asp:Button ID="btSelectAll" runat="server" Text="全部選取"/>
								<asp:Button ID="btSelectInverse" runat="server" Text="反向選取"/>
								<asp:Button ID="btSelectClear" runat="server" Text="清除選取"/>
								<asp:Button ID="btDeleteSelected" runat="server" Text="刪除選取"/>
							</asp:Panel>
						</div>
					</div>
					<div class="dTR" id="trDg1">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 290px">
								<asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="人員帳號">
											<ItemTemplate>
												<asp:textbox id="txUserId" onblur="txUserId_onblur();" tabIndex="0" runat="server" Width="10.5em" CssClass="InputEnUpperField" MaxLength="20"></asp:textbox>
												<asp:imagebutton id="btHelp" tabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="姓名">
											<ItemTemplate>
												<asp:TextBox id="txUserName" tabIndex="-1" runat="server" Width="4.5em"
													CssClass="TextLabel"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
					<div class="dTR" id="trDg2">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 290px">
								<asp:datagrid id="dg2" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="單位名稱">
											<ItemTemplate>
												<asp:textbox id="txDeptName" tabIndex="0" runat="server" Width="14.5em"></asp:textbox>
												<asp:textbox id="txDeptNo" runat="server" CssClass="hide"></asp:textbox>
												<asp:button id="btSetting" tabIndex="0" runat="server" Text ="設定"></asp:button>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDownLoad" runat="server" Text="下載範本檔" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
