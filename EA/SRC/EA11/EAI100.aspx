<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAI100.aspx.cs" AutoEventWireup="false" Inherits="EA11.EAI100" %>

<!DOCTYPE HTML>
<html>
<head>
 <title>EAI100 已結案未完成歸檔點收案件查詢作業</title>
 <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
 <meta content="C#" name="CODE_LANGUAGE">
 <meta content="JavaScript" name="vs_defaultClientScript">
 <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
 <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
 <form id="EAI100" onkeyup="jf_CheckFull();" method="post" runat="server">
 <!--Template V3 Generated WebForm-->
 <!--#include file="../EALIB/GenericBanner.htm"-->
 <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
 <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
 <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
 <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
 <asp:TextBox id="H_StoreNo" runat="server"></asp:TextBox>
 </div>
<DIV class="DivBaseTable" id="BaseTable">
	<DIV class="DivTable" id="MainTable">
		<asp:Panel runat="server" ID="panel1">
			<DIV class="dTR">
				<DIV class="dTDTitle" style="width:5.5em">
					<asp:Label ID="Label10" runat="server">結案日期：</asp:Label>
				</DIV>
				<DIV class="dTD">
					<asp:TextBox ID="txCLOSE_DATES" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
					<asp:Label ID="Label15" runat="server">－</asp:Label>
					<asp:TextBox ID="txCLOSE_DATEE" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
				</DIV>
			</DIV>
		</asp:Panel>
		<DIV class="dTR">
			<DIV class="dTDTitle" style="width:5.5em">
				<asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
			</DIV>
			<DIV class="dTD">
				<cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" Width="8.5em" CssClass="comboBox"></cc1:ComboBox>
			</DIV>
		</DIV>
		<DIV class="dTR">
			<DIV class="dTDTitle" style="width:5.5em">
				<asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
			</DIV>
			<DIV class="dTD">
				<cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
				<asp:TextBox ID="empUserId" CssClass="hide" runat="server"></asp:TextBox>
				<asp:TextBox ID="txDL" CssClass="hide" runat="server"></asp:TextBox>
			</DIV>
		</DIV>
		<DIV class="dTR">
			<DIV class="dTDTitle" style="width:5.5em">
				<asp:Label ID="Label6" runat="server">庫房類別：</asp:Label>
			</DIV>
			<DIV class="dTD">
				<asp:DropDownList ID="dlStoreType" runat="server">
					<asp:ListItem Value="">全部</asp:ListItem>
					<asp:ListItem Value="1">機關庫房</asp:ListItem>
					<asp:ListItem Value="2">單位庫房</asp:ListItem>
				</asp:DropDownList>
			</DIV>
		</DIV>
		<DIV class="dTR">
			<DIV class="dTDTitle" style="width:5.5em">
				<asp:Label ID="Label7" runat="server">庫房別：</asp:Label>
			</DIV>
			<DIV class="dTD">
				<asp:DropDownList ID="dlStoreNoAll" runat="server"></asp:DropDownList>
				<asp:DropDownList ID="dlStoreNo1" runat="server"></asp:DropDownList>
				<asp:DropDownList ID="dlStoreNo2" runat="server"></asp:DropDownList>
			</DIV>
		</DIV>
		<asp:Panel runat="server" ID="panel2">
			<DIV class="dTR">
				<DIV class="dTDTitle" style="width:5.5em">
					<asp:Label ID="Label1" runat="server">檔案類別：</asp:Label>
				</DIV>
				<DIV class="dTD">
					<asp:DropDownList runat="server" ID="dlDocFileType">
						<asp:ListItem Value=""></asp:ListItem>
						<asp:ListItem Value="1">紙本檔案</asp:ListItem>
						<asp:ListItem Value="2">電子檔案</asp:ListItem>
					</asp:DropDownList>
				</DIV>
			</DIV>
			<DIV class="dTR">
				<DIV class="dTDTitle" style="width:5.5em">
					<asp:Label ID="Label2" runat="server">狀態：</asp:Label>
				</DIV>
				<DIV class="dTD">
					<asp:DropDownList runat="server" ID="dlDocState">
						<asp:ListItem Value=""></asp:ListItem>
						<asp:ListItem Value="10">結案未歸檔</asp:ListItem>
						<asp:ListItem Value="13">送檔待點收</asp:ListItem>
					</asp:DropDownList>
				</DIV>
			</DIV>
			<DIV class="dTR">
				<DIV class="dTDTitle" style="width:5.5em">
					<asp:Label ID="Label5" runat="server">排序方式：</asp:Label>
				</DIV>
				<DIV class="dTD">
					<asp:RadioButton ID="rbCloseDate" runat="server" GroupName="ORDER" Text="依結案日期" Checked="true"></asp:RadioButton>
					<asp:RadioButton ID="rbDeptAndUser" runat="server" GroupName="ORDER" Text="依承辦單位+承辦人"></asp:RadioButton>
					<asp:RadioButton ID="rbDocState" runat="server" GroupName="ORDER" Text="依狀態"></asp:RadioButton>
					<asp:RadioButton ID="rbDocFileType" runat="server" GroupName="ORDER" Text="依檔案類別"></asp:RadioButton>
				</DIV>
			</DIV>
		</asp:Panel>
	</DIV>
	<DIV id="GridTable" class="DivTable">
		<asp:Panel runat="server" ID="panel3">
			<div class="GridDiv" style="height: 16em">
				<asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
					<Columns>
						<asp:TemplateColumn HeaderText="序">
							<ItemTemplate>
								<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="公文文號">
							<ItemTemplate>
								<asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="相關文號">
							<ItemTemplate>
								<asp:Label ID="lbDOC_NO1" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="結案日期">
							<ItemTemplate>
								<asp:Label ID="lbCLOSE_DATE" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="來文機關">
							<ItemTemplate>
								<asp:Label ID="lbFROMORG_NAME" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="主旨">
							<ItemTemplate>
								<asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦單位">
							<ItemTemplate>
								<asp:Label ID="lbDEPT_NO" runat="server" CssClass="hide"></asp:Label>
								<asp:Label ID="lbDEPT_NAME" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦人">
							<ItemTemplate>
								<asp:Label ID="lbUSERNAME" runat="server" CssClass="hide"></asp:Label>
								<asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="狀態">
							<ItemTemplate>
								<asp:Label ID="lbSTATUS" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
					</Columns>
				</asp:DataGrid>
			</div>
		</asp:Panel>
		<asp:Panel runat="server" ID="panel4">
			<div class="GridDiv" style="height: 16em">
				<asp:DataGrid ID="dg2" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
					<Columns>
						<asp:TemplateColumn HeaderText="序">
							<ItemTemplate>
								<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="公文文號">
							<ItemTemplate>
								<asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="相關文號">
							<ItemTemplate>
								<asp:Label ID="lbDOC_NO1" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="主旨">
							<ItemTemplate>
								<asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦單位">
							<ItemTemplate>
								<asp:Label ID="lbDEPT_NO" runat="server" CssClass="hide"></asp:Label>
								<asp:Label ID="lbDEPT_NAME" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦人">
							<ItemTemplate>
								<asp:Label ID="lbUSERNAME" runat="server" CssClass="hide"></asp:Label>
								<asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="檔案類別">
							<ItemTemplate>
								<asp:Label ID="lbDocFileType" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="結案日期">
							<ItemTemplate>
								<asp:Label ID="lbCLOSE_DATE" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="狀態">
							<ItemTemplate>
								<asp:Label ID="lbSTATUS" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
					</Columns>
				</asp:DataGrid>
			</div>
		</asp:Panel>
	</DIV>
 </DIV>
	<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
		<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
		<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
	</asp:Panel>
 </form>
</body>
</html>
