<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKT802_SMEG.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT802_SMEG" ValidateRequest="false" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>AKT802 調案審核作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
	<link href="LIB/AK.css" type="text/css" rel="stylesheet">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
</head>
<body ms_positioning="GridLayout">
	<form id="AKT802" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<!--#include file="Template/Res/GenericBanner.htm"-->
		<div class="DivBaseTable">
			<div class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 100%; text-align: center;">
						<asp:Label class="InputFieldLabel" ID="Label2" runat="server" Font-Underline="True">調　　案　　申　　請　　單</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label3" runat="server" CssClass="KeyField">調案單號：</asp:Label>
					</div>
					<div class="dTD" style="width: 5.5em">
						<asp:TextBox ID="txBorNo" runat="server" Width="104px" CssClass="KeyUpperField"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 12em">
						<asp:Label ID="Label4" runat="server">申請日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="dateApply" runat="server" Width="72px" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label1" runat="server">調案單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 5.5em">
						<asp:TextBox ID="lbMyOrgName" TabIndex="-1" runat="server" Width="7.5em" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 12em">
						<asp:Label ID="Label5" runat="server">調案人：</asp:Label>
					</div>
					<div class="dTD" style="width: 8em">
						<asp:TextBox ID="lbMyName" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label7" runat="server">調案方式：</asp:Label>
					</div>
					<div class="dTD" style="width: 5.5em">
						<asp:TextBox ID="lbBorType" runat="server" Width="103px" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="lbBorFlag" runat="server">調案類型：</asp:Label>
					</div>
					<div class="dTD" style="width: 5.5em">
						<asp:TextBox ID="txBorFlag" runat="server" Width="6.5em" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label23" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">急件申請：</asp:Label>
					</div>
					<div class="dTD" style="width: 5.5em">
						<asp:CheckBox ID="ckUrgent" TabIndex="180" runat="server" Width="1em" ReadOnly="True" CssClass="DisplayOnly" ForeColor="Navy"></asp:CheckBox>
					</div>
					<div class="dTDTitle" style="width: 12em">
						<asp:Label ID="Label24" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">指定負責單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txTargetData" runat="server" Width="15em" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label25" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
					<div class="dTD" style="width: 30em">
						<asp:TextBox ID="txUrgentReason" TabIndex="-1" runat="server" Width="35em" TextMode="MultiLine" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="hide">
					<div class="dTR">
						<div class="dTDTitle" style="width: 20em">
							<asp:Label ID="Label8" runat="server" Font-Underline="True">外　機　關　借　調　來　文　資　訊</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 8em">
							<asp:Label ID="Label13" runat="server">文(編)號：</asp:Label>
						</div>
						<div class="dTD" style="width: 5.5em">
							<asp:TextBox ID="txFromDocNo" runat="server" Width="104px" CssClass="displayonly" MaxLength="10" ForeColor="Navy"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 12em">
							<asp:Label ID="Label15" runat="server">預計歸還日：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txDueDate" runat="server" Width="60px" CssClass="displayonly" MaxLength="7" ForeColor="Navy"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 8em">
							<asp:Label class="InputFieldLabel" ID="Label18" runat="server" CssClass="InputFieldLabel">對方機關承辦人：</asp:Label>
						</div>
						<div class="dTD" style="width: 5.5em">
							<asp:TextBox ID="txFromEmp" runat="server" Width="104px" CssClass="displayonly" MaxLength="10" ForeColor="Navy"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 12em">
							<asp:Label ID="Label19" runat="server">電　　話：</asp:Label>
						</div>
						<div class="dTD" style="width: 5.5em">
							<asp:TextBox ID="txFromTel" runat="server" Width="104px" CssClass="displayonly" MaxLength="10" ForeColor="Navy"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 8em">
							<asp:Label ID="Label16" runat="server">來文機關：</asp:Label>
						</div>
						<div class="dTD" style="width: 5.5em">
							<asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" CssClass="displayonly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 12em">
							<asp:Label ID="Label17" runat="server">來文字號：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
						</div>
					</div>

					<div class="dTR">
						<div class="dTDTitle" style="width: 8em">
							<asp:Label class="InputFieldLabel" ID="Label20" runat="server" CssClass="InputFieldLabel">案　　由：</asp:Label>
						</div>
						<div class="dTD" style="width: 20em">
							<asp:TextBox ID="txFromSubject" TabIndex="-1" runat="server" Width="20em" CssClass="displayonly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
						</div>
					</div>
				</div>
			</div>
			<div class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 100%; text-align: center;">
						<asp:Label ID="Label6" class="InputFieldLabel" runat="server" Font-Underline="True">調　　案　　內　　容</asp:Label>
					</div>
				</div>
				<div class="GridDiv" data-fixed="true">
					<asp:DataGrid ID="dg1" runat="server" PageSize="5" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSeqNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="文(編)號/檔號(卡號)">
								<ItemTemplate>
										<asp:TextBox ID="txDocNo" runat="server" Width="152px" CssClass="TextLabel" MaxLength="42" ForeColor="Navy"
											ReadOnly="True" ></asp:TextBox>
										<asp:TextBox ID="txCase" runat="server" Width="152px" CssClass="TextLabel" MaxLength="42" ForeColor="Navy"
											ReadOnly="True" ></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦單位/借戶名稱">
								<ItemTemplate>
									<asp:TextBox ID="txDept" TabIndex="-1" runat="server" CssClass="TextLabel" ReadOnly="True"
										ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="案由/案名">
								<ItemTemplate>
									<asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="20em" CssClass="PopUp" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
									<asp:TextBox ID="lbFileExist" runat="server" Width="12px" CssClass="hide" MaxLength="1"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調案原因">
								<ItemTemplate>
									<asp:TextBox ID="txReason" runat="server" Width="178px" CssClass="TextLabel" MaxLength="100" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
			<div class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label9" runat="server" CssClass="InputFieldLabel">意　　見：</asp:Label>
					</div>
					<div class="dTD" style="width: 12em">
						<asp:DropDownList ID="dlPhraseNo" runat="server" Width="178px"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						&nbsp;&nbsp;<asp:Label ID="Label12" runat="server">備註意見：</asp:Label>
					</div>
					<div class="dTD" style="width: 20em">
						<asp:TextBox ID="tbOpinion" runat="server" Width="20em" CssClass="InputFieldText"></asp:TextBox>
					</div>
				</div>
			</div>
			<div class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 100%; text-align: center;">
						<asp:Label class="InputFieldLabel" ID="lbTitle" runat="server" Width="255px" Font-Underline="True">簽　　核　　歷　　程</asp:Label>
					</div>
				</div>
				<div class="GridDiv">
					<asp:DataGrid ID="dg2" runat="server" PageSize="5" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSeqNo" runat="server" CssClass="InputFieldLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="審核流程">
								<ItemTemplate>
									<asp:TextBox ID="tbChiefTitle" TabIndex="-1" runat="server" Width="70px" CssClass="TextLabel"
										ReadOnly="True" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="實際簽核主管">
								<ItemTemplate>
									<asp:TextBox ID="tbChief" onblur="queryBorrowDetail(this.value)" TabIndex="-1" runat="server"
										Width="120px" CssClass="TextLabel" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="簽核意見">
								<ItemTemplate>
									<asp:TextBox ID="tbOpinion1" TabIndex="-1" runat="server" Width="500px" CssClass="TextLabel"
										ReadOnly="True" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
			<div>
				<asp:ListBox ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
				<asp:TextBox ID="H_txDocCnt" runat="server" Width="4px" CssClass="hide"></asp:TextBox>
				<asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
				<asp:CustomValidator ID="Validator" runat="server" CssClass="hide" ErrorMessage="CustomValidator"></asp:CustomValidator>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btApprove" runat="server" Text="核准" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btReject" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			</asp:Panel>
	</form>
</body>
</html>
