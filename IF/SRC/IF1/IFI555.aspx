<%@ Page language="c#" Codebehind="IFI555.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFI555" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFI555 稽核紀錄</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="IFI555" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="Validationsummary2" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清理" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btSaveBack" runat="server" Text="回存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 101; POSITION: absolute; TOP: 217px; LEFT: 12px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 102; POSITION: absolute; TOP: 251px; LEFT: 12px"
				runat="server" CssClass="hidden"></asp:validationsummary><br>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="lbOrg" runat="server" CssClass="hide" Width="114px" ForeColor="Red">所屬機關：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlOrg" runat="server" CssClass="hide" AutoPostBack="True"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label6" runat="server">單　　位：</asp:label></div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:dropdownlist id="ddlDept" runat="server"></asp:dropdownlist></div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label3" runat="server">人　　員：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="ddlUser" runat="server"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label4" runat="server">時間範圍：</asp:label></div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:textbox id="txDateStart" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							至
							<asp:textbox id="txDateEnd" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label5" runat="server">種　　類：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="ddlType" runat="server"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label1" runat="server">重要性：</asp:label></div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:checkboxlist id="cbImportList" runat="server" Width="9em" RepeatDirection="Horizontal">
								<asp:ListItem Value="高">高</asp:ListItem>
								<asp:ListItem Value="中">中</asp:ListItem>
								<asp:ListItem Value="低">低</asp:ListItem>
							</asp:checkboxlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label2" runat="server">標的物關鍵字：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txKeyWord" runat="server" Width="8em" ></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label7" runat="server">IP位置：</asp:label></div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:textbox id="txIP" runat="server" Width="8em" ></asp:textbox>
							<asp:checkbox id="cbIPFullCheck" runat="server" Text="精確搜尋"></asp:checkbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label9" runat="server">描述關鍵字：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDesc" runat="server" Width="8em" ></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label8" runat="server">&nbsp;</asp:label></div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:checkbox id="cbHideAcc" runat="server" Text="是否隱藏帳號"></asp:checkbox></div>
					</div>
				</DIV>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 424px; ">
								<asp:datagrid id="dg1" runat="server" EnableViewState="False" AutoGenerateColumns="False"
									GridLines="Vertical" CellPadding="4" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White" PageSize="50">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="姓名">
											<ItemTemplate>
												<asp:Label id="lbEmpname" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="存取人員">
											<ItemTemplate>
												<asp:Label id="lbAccount" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="存取時間">
											<ItemTemplate>
												<asp:Label id="lbAccessTime" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="存取種類">
											<ItemTemplate>
												<asp:Label id="lbCategory" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="IP位置">
											<ItemTemplate>
												<asp:Label id="lbIP" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="電腦名稱">
											<ItemTemplate>
												<asp:Label id="lbCOMPUTER" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="重要性">
											<ItemTemplate>
												<asp:Label id="lbImportant" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="使用標的物">
											<ItemTemplate>
												<asp:Label id="lbAccessTarget" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="描述">
											<ItemTemplate>
												<asp:TextBox id="txActionDesc" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</DIV>
		</form>
	</body>
</HTML>
