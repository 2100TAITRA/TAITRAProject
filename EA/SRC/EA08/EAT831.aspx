<%@ Page Language="c#" CodeBehind="EAT831.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT831" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>EAT831 調案批次登錄作業</title>
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
	<form id="EAT831" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EALIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
		</div>
		<div class="DivBaseTable" id="BaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label11" runat="server">檔案類別：</asp:Label>
					</div>
					<div class="dTD" style="width: 20.5em">
						<asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="borType" Checked="true"></asp:RadioButton>
						<asp:RadioButton ID="rbClsAA" runat="server" Text="專案卷" GroupName="borType"></asp:RadioButton>
						<asp:RadioButton ID="rbClsBB" runat="server" Text="列管卷" GroupName="borType"></asp:RadioButton>
						<asp:RadioButton ID="rbClsNo" runat="server" Text="一般雜項" GroupName="borType"></asp:RadioButton>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label14" runat="server">優先案件：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButton ID="rbBortAll" runat="server" Text="全部" GroupName="UrType" Checked="true"></asp:RadioButton>
						<asp:RadioButton ID="rbBorUr" runat="server" Text="急件" GroupName="UrType"></asp:RadioButton>
						<asp:RadioButton ID="rbBorNo" runat="server" Text="一般" GroupName="UrType"></asp:RadioButton>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label2" runat="server">專案卡號：</asp:Label>
					</div>
					<div class="dTD" style="width: 19.5em">
						<asp:TextBox ID="txAaCaseNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label6" runat="server">列管編號：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txBankNo" TabIndex="0" runat="server" Width="1.5em" MaxLength="10"></asp:TextBox>-
                        <asp:TextBox ID="txBaCaseNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label4" runat="server">雜項文號：</asp:Label>
					</div>
					<div class="dTD" style="width: 15.5em">
						<asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5em" MaxLength="10"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label1" runat="server">調案單位/調案人：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlDept" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
						<asp:DropDownList ID="dlUser" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
						<asp:TextBox ID="H_userID" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_UerInfo" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_txDeptNo" runat="server" CssClass="hide"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label3" runat="server">調案單號：</asp:Label>
					</div>
					<div class="dTD" style="width: 16.5em">
						<asp:TextBox ID="txBorNoS" runat="server" CssClass="InputFieldNumeric" Width="5.5em"></asp:TextBox>
						<asp:ImageButton ID="btHelpS" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>－
                        <asp:TextBox ID="txBorNoE" runat="server" CssClass="InputFieldNumeric" Width="5.5em"></asp:TextBox>
						<asp:ImageButton ID="btHelpE" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
					</div>
				</div>
			</div>
			<div class="DivTable" id="GridTable">
				<asp:Panel ID="tbSelect" runat="server" CssClass="hide">
					<asp:Button ID="btDgClear" runat="server" Text="清除" />
					<asp:Button ID="btDgAll" runat="server" Text="全選" />
					<asp:Button ID="btDgInverse" runat="server" Text="反向" />
				</asp:Panel>
				<div class="GridDiv" id="MainDGTable" style="height: 18.5em">
					<asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
						<Columns>
							<asp:TemplateColumn HeaderText="選">
								<ItemTemplate>
									<asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="急">
								<ItemTemplate>
									<asp:Label ID="lbUrgent" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="檔案類別<BR/>(卡號/編號/文號)">
								<ItemTemplate>
									<asp:Label ID="lbFileio" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收創文日期">
								<ItemTemplate>
									<asp:Label ID="lbRcvDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="公司名稱或事由">
								<ItemTemplate>
									<asp:Label ID="lbTaxForSubject" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="卷號">
								<ItemTemplate>
									<asp:Label ID="lbFileVolLst" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="卷數">
								<ItemTemplate>
									<asp:Label ID="lbFileVolCount" runat="server"></asp:Label>
									<asp:TextBox ID="H_TxMailDocList" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調案單位">
								<ItemTemplate>
									<asp:Label ID="lbBorDept" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調案人">
								<ItemTemplate>
									<asp:Label ID="lbBorUserName" runat="server"></asp:Label>
									<asp:TextBox ID="H_EmpMail" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_UserName" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調案單號">
								<ItemTemplate>
									<asp:Label ID="lbBorNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調案方式">
								<ItemTemplate>
									<asp:Label ID="lbBorWay" runat="server"></asp:Label>
									<asp:TextBox ID="H_TxBorType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_DueDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_ApplyDate" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
			<asp:Button runat="server" Text="搜索(Q)" DefaultStyle="newmode:block;modifymode:block;" ID="btOpen" TabIndex="1"></asp:Button>
			<asp:Button runat="server" Text="登錄借卷(S)" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
			<asp:Button runat="server" Text="刪除(D)" DefaultStyle="newmode:block;modifymode:block;" ID="btDelete"></asp:Button>
			<asp:Button runat="server" Text="清除(P)" DefaultStyle="newmode:none;modifymode:block;" ID="btClean"></asp:Button>
		</asp:Panel>
	</form>
</body>
</html>
