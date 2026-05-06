<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR412.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR412" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR412 ╰参笆戳玡妒快硄</title>
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
		<form id="ODR412" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
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
				<asp:textbox id="H_Dept_Value" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_Dept_Text" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_User_Value" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_User_Text" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
				<asp:textbox id="H_User_AllValue" tabIndex="-1" runat="server" Width="19px"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label1" runat="server">┯快虫</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 12.5em"><cc1:combobox id="dlDept" tabIndex="10" runat="server" CssClass="comboBox" Width="9.5em"></cc1:combobox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label2" runat="server">┯快</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlUser" tabIndex="15" runat="server" CssClass="comboBox" Width="9.5em"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:dropdownlist id="dlDateType" tabIndex="17" runat="server" Width="8em"></asp:dropdownlist></DIV>
						<DIV class="dTD" style="WIDTH: 12.5em">
							<asp:textbox id="txSDate" tabIndex="20" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>⌒
							<asp:textbox id="txEDate" tabIndex="25" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label6" runat="server">そゅ┦借</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlProperty" tabIndex="27" runat="server" Width="10em"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label5" runat="server">Ξ</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txFromSubject" tabIndex="30" runat="server" Width="25.5em"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False"	HorizontalAlign="Left">
						<Columns>
							<asp:TemplateColumn HeaderText="">
								<ItemTemplate>
									<asp:Label id="lbNo" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="そゅゅ腹">
								<ItemTemplate>
									<asp:Label id="lbDocNo" runat="server" CssClass="TextLabel"></asp:Label><BR>
									<asp:HyperLink id="hlExtend" runat="server" CssClass="TextLabel">甶戳</asp:HyperLink>
									<asp:Label id="Label3" runat="server" CssClass="TextLabel">&nbsp;</asp:Label>
									<asp:HyperLink id="hlFlow" runat="server" CssClass="TextLabel">瑈祘</asp:HyperLink>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="Ξ">
								<ItemTemplate>
									<asp:Label id="lbSubject" runat="server" Width="116px" CssClass="TextLabel" style="OverFlow:hidden"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="Μ(承)ゅら戳">
								<ItemTemplate>
									<asp:Label id="lbRcvDate" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="快ら戳">
								<ItemTemplate>
									<asp:Label id="lbDueDate" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="逞筄快ぱ计">
								<ItemTemplate>
									<asp:Label id="lbOverDay" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="快瞶ぱ计">
								<ItemTemplate>
									<asp:Label id="lbWork" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="絔妒Ω计">
								<ItemTemplate>
									<asp:Label id="lbInspectCount" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="篈">
								<ItemTemplate>
									<asp:Label id="lbStatus" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="┯快">
								<ItemTemplate>
									<asp:Label id="lbEmpName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="┯快虫">
								<ItemTemplate>
									<asp:Label id="lbDeptName" runat="server" CssClass="TextLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:datagrid>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="琩高" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
