<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR411.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR411" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR411 系統自動稽催通知</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<LINK href="LIB/AK.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR411" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:listbox id="lbDept" runat="server" Width="25px" Height="25px"></asp:listbox>
				<asp:textbox id="H_Change" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Url" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Width" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Height" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Artifact" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Privilege" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_WSLocation" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Value" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:textbox id="H_Sect_Text" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_Dept_Value" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_Dept_Text" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_User_Value" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_User_Text" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_Sect_AllValue" runat="server" tabIndex="-1" Width="19px"></asp:textbox>
				<asp:textbox id="H_User_AllValue" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:dropdownlist id="H_AllSectNo" tabIndex="-1" runat="server" Width="19px"></asp:dropdownlist>
				<asp:dropdownlist id="H_OldUser" tabIndex="-1" runat="server" Width="19px"></asp:dropdownlist>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label id="Label1" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 20em">
							<cc1:combobox id="dlDept" tabIndex="10" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlUser" tabIndex="15" runat="server" Width="8.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:dropdownlist id="dlDateType" tabIndex="17" runat="server" Width="7.5em"></asp:dropdownlist>
						</DIV>
						<DIV class="dTD" style="WIDTH: 20em">
							<asp:textbox id="txSDate" tabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:textbox>－
							<asp:textbox id="txEDate" tabIndex="25" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label6" runat="server">公文性質：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlProperty" tabIndex="27" runat="server" Width="9.5em"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label id="Label5" runat="server">主　　旨：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txFromSubject" tabIndex="30" runat="server" Width="25em"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
		
				<DIV class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 17em">
						<asp:datagrid id="dg1" runat="server" HorizontalAlign="Left" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbNo" runat="server" CssClass="TextLabel" Width="20px"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server" CssClass="TextLabel"></asp:Label><BR>
										<asp:HyperLink id="hlExtend" runat="server" CssClass="TextLabel" Width="2em">展期</asp:HyperLink>
										<asp:Label id="Label3" runat="server" CssClass="TextLabel">&nbsp;</asp:Label>
										<asp:HyperLink id="hlFlow" runat="server" CssClass="TextLabel" Width="2em">流程</asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbSubject" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收(創)文日期">
									<ItemTemplate>
										<asp:Label id="lbRcvDate" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="限辦日期">
									<ItemTemplate>
										<asp:Label id="lbDueDate" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="逾期天數">
									<ItemTemplate>
										<asp:Label id="lbOverDay" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="辦理天數">
									<ItemTemplate>
										<asp:Label id="lbWork" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催次數">
									<ItemTemplate>
										<asp:Label id="lbInspectCount" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="目前所在位置">
									<ItemTemplate>
										<asp:Label id="lbPosition" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn>
									<ItemTemplate>
										<asp:Button id="btWrite" runat="server" width="4em" Text="填 寫"></asp:Button>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="狀態">
									<ItemTemplate>
										<asp:Label id="lbStatus" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbEmpName" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDeptName" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="來文單位">
									<ItemTemplate>
										<asp:Label id="lbFromOrgName" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="來文字號">
									<ItemTemplate>
										<asp:Label id="lbFromNo" runat="server" CssClass="TextLabel"></asp:Label><BR>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
