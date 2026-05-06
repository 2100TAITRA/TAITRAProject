<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT690.aspx.cs" AutoEventWireup="false" Inherits="ED6.EDT690" %>

<!DOCTYPE HTML>
<html>
<head>
	<title>EDT690 案件辦理情形維護作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
	<base target="_self">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="EDT690" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EDLIB/GenericBanner.htm"-->
		<div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
			<asp:TextBox ID="txWt1" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txWt2" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txWt3" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txTimeCount" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txIsExtend" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_RcvDate" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_IssueDate" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txPermitMark" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txComNoTimeCount" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_Open" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_NewByOu" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_txOutState" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="H_OrgNo" runat="server" CssClass="hide"></asp:TextBox>
			<asp:Label ID="lbLastOutState" runat="server" CssClass="hide"></asp:Label>
			<asp:TextBox ID="txOutUserId" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txOutCopyUserId" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txScrType" runat="server" CssClass="hide"></asp:TextBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label21" runat="server">母文資訊：</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label1" runat="server" CssClass="KeyField">母文文號：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em;">
						<asp:TextBox ID="txComNo" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 5.5em;">
						<asp:Label ID="Label7" runat="server">業務類別：</asp:Label>
					</div>
					<div class="dTD" style="width: 9em;">
						<asp:TextBox ID="txBType" runat="server" Width="8em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 5.5em;">
						<asp:Label ID="Label8" runat="server">關聯案件：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em;">
						<asp:TextBox ID="txComCaseNo" runat="server" Width="5em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label2" runat="server">主旨：</asp:Label>
					</div>
					<div class="dTD" style="width: 32em;">
						<asp:TextBox ID="txSubject" runat="server" Width="31em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label16" runat="server">來文單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 32em;">
						<asp:TextBox ID="txFromOrgName" runat="server" Width="31em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 11em;">
						<asp:TextBox ID="txDeptName" runat="server" Width="10em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 5em;">
						<asp:Label ID="Label9" runat="server">承辦人：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:TextBox ID="txEmpName" runat="server" Width="9.5em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label10" runat="server">起算日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 11em;">
						<asp:TextBox ID="txStartDate" runat="server" Width="5em" CssClass="DisplayOnly" MaxLength="7"></asp:TextBox>
					</div>
					<div class="dTD" style="width: 5em;">
						<asp:Label ID="Label11" runat="server">限辦日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 11em;">
						<asp:TextBox ID="txDueDate" runat="server" Width="5em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label4" runat="server">補件次數：</asp:Label>
					</div>
					<div class="dTD" style="width: 2em;">
						<asp:TextBox ID="txResupplyCount" runat="server" Width="1.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
					</div>
					<div class="dTD" style="width: 5.5em;">
						<asp:Label ID="Label12" runat="server">展延次數：</asp:Label>
					</div>
					<div class="dTD" style="width: 2.5em;">
						<asp:TextBox ID="txExtCount" runat="server" Width="1.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
					</div>
					<div class="dTD" style="width: 6em;">
						<asp:Label ID="Label13" runat="server">補件到期日：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em;">
						<asp:TextBox ID="txResentDueDate" runat="server" Width="5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<asp:Panel ID="panOut1" runat="server">
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;">
							<asp:Label ID="Label27" runat="server">外審資訊：</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em;">
							<asp:Label ID="Label23" runat="server">起算日：</asp:Label>
						</div>
						<div class="dTD" style="width: 6em;">
							<asp:TextBox ID="txLastOutStartDate" runat="server" Width="5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 10em;">
							<asp:Label ID="Label24" runat="server">到期日：</asp:Label>
						</div>
						<div class="dTD" style="width: 6em;">
							<asp:TextBox ID="txLastOutDueDate" runat="server" Width="5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 6em;">
							<asp:Label ID="Label25" runat="server">可用天數：</asp:Label>
						</div>
						<div class="dTD" style="width: 4em;">
							<asp:TextBox ID="txLastOutUseDay" runat="server" Width="3em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
						</div>
					</div>
				</asp:Panel>
				<br>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label19" runat="server">新辦理情形：</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label14" runat="server">公文文號：</asp:Label>
					</div>
					<div class="dTD" style="width: 6em;">
						<asp:TextBox ID="txDocNo" runat="server" Width="5.5em" CssClass="DisplayOnly" MaxLength="10"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label17" runat="server">辦理日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 10.5em;">
						<asp:DropDownList ID="dlTaskDate" runat="server" Width="5.5em" CssClass="DisplayOnly"></asp:DropDownList>
						<asp:TextBox ID="txTaskDate" runat="server" Width="4em" CssClass="DisplayOnly" MaxLength="7"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label15" runat="server">辦理情形：</asp:Label>
					</div>
					<div class="dTD" style="width: 15em;">
						<asp:TextBox ID="txFlowName" runat="server" Width="1.5em" CssClass="DisplayOnly" MaxLength="2"></asp:TextBox>
						<asp:ImageButton ID="ibFlow_Name" TabIndex="-1" runat="server" ImageUrl="../../../std/image/HELPWIN_E.gif"></asp:ImageButton>
						<asp:Label ID="lbFlow_Name" runat="server" Width="12em"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label18" runat="server">辦理說明：</asp:Label>
					</div>
					<div class="dTD" style="width: 31em;">
						<asp:TextBox ID="txTaskDesc" runat="server" Width="30em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label20" runat="server">補件原因：</asp:Label>
					</div>
					<div class="dTD" style="width: 31em;">
						<asp:TextBox ID="txSuppNotesNo" runat="server" Width="1.5em" CssClass="DisplayOnly" MaxLength="2"></asp:TextBox>
						<asp:ImageButton ID="ibSuppNotes" TabIndex="-1" runat="server" ImageUrl="../../../std/image/HELPWIN_E.gif"></asp:ImageButton>
						<asp:TextBox ID="txSuppNotesName" runat="server" Width="26.5em" CssClass="DisplayOnly"></asp:TextBox>
					</div>
				</div>
				<asp:Panel ID="panOut2" runat="server">
					<div class="dTR">
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label22" runat="server">許可證字號：</asp:Label>
						</div>
						<div class="dTD" style="width: 31em;">
							<asp:TextBox ID="txPermitNo" runat="server" Width="30em" CssClass="DisplayOnly"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label28" runat="server">外審資訊：</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label5" runat="server">單位：</asp:Label>
						</div>
						<div class="dTD" style="width: 9em;">
							<asp:DropDownList ID="dlOutOu" runat="server" Width="8em" CssClass="DisplayOnly"></asp:DropDownList>
						</div>
						<div class="dTDTitle" style="width: 5em;">
							<asp:Label ID="Label6" runat="server">承辦人：</asp:Label>
						</div>
						<div class="dTD" style="width: 7em;">
							<asp:TextBox ID="txOutUser" runat="server" Width="3em" CssClass="DisplayOnly" MaxLength="20"></asp:TextBox>
							<asp:ImageButton ID="ibOutUser" TabIndex="-1" runat="server" ImageUrl="../../../std/image/HELPWIN_E.gif"></asp:ImageButton>
						</div>
						<div class="dTDTitle" style="width: 5em;">
							<asp:Label ID="Label26" runat="server">副知對象：</asp:Label>
						</div>
						<div class="dTD" style="width: 7em;">
							<asp:TextBox ID="txOutCopyUser" runat="server" Width="3em" CssClass="DisplayOnly" MaxLength="20"></asp:TextBox>
							<asp:ImageButton ID="ibOutCopyUser" TabIndex="-1" runat="server" ImageUrl="../../../std/image/HELPWIN_E.gif"></asp:ImageButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label30" runat="server">初篩結果：</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label29" runat="server">名稱：</asp:Label>
						</div>
						<div class="dTD" style="width: 9em;">
							<asp:TextBox ID="txScrOuName" runat="server" CssClass="DisplayOnly"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label31" runat="server">人員：</asp:Label>
						</div>
						<div class="dTD" style="width: 9em;">
							<asp:TextBox ID="txScrEmpName" runat="server" CssClass="DisplayOnly"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7em;">
							<asp:Label ID="Label32" runat="server">Email：</asp:Label>
						</div>
						<div class="dTD" style="width: 14em;">
							<asp:TextBox ID="txScrEmail" runat="server" CssClass="DisplayOnly"></asp:TextBox>
							<asp:ImageButton ID="ibScrEmail" TabIndex="-1" runat="server" ImageUrl="../../../std/image/HELPWIN_E.gif"></asp:ImageButton>
						</div>
					</div>
				</asp:Panel>
				<br>
				<div class="dTR">
					<div class="dTD" style="width: 5em;">
						<asp:Label ID="lbTaskNow" runat="server">辦理狀況</asp:Label>
					</div>
				</div>
				<div class="GridDiv" id="GridTable" style="height: 262px" data-fixed="true">
					<asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="選">
								<ItemTemplate>
									<asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="辦理日期">
								<ItemTemplate>
									<asp:Label ID="lbTaskDate" runat="server" Width="70px"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="辦理情形&lt;br&gt;補件原因">
								<ItemTemplate>
									<asp:Label Style="z-index: 0" ID="lbFlowName" runat="server"></asp:Label><br>
									<asp:Label Style="z-index: 0" ID="lbSuppNotes" runat="server"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbTaskNo" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbTaskReasonNo" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOtherTaskReason" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbTimeCount" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbIsExtend" runat="server" CssClass="hide"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="公文文號">
								<ItemTemplate>
									<asp:Label Style="z-index: 0" ID="lbDocNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="收發別">
								<ItemTemplate>
									<asp:Label Style="z-index: 0" ID="lbTaskRel" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="說明">
								<ItemTemplate>
									<asp:Label Style="z-index: 0" ID="lbTaskDesc" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="外審單位&lt;br&gt;外審承辦人">
								<ItemTemplate>
									<asp:Label Style="z-index: 0" ID="lbOutName" runat="server"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutOu" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutUser" runat="server"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutState" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbTxOu" runat="server" CssClass="hide"></asp:Label>

									<asp:Label Style="z-index: 0" ID="lbOutUserId" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutCopyUser" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutCopyUserId" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutStartDate" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutDueDate" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbOutUseDay" runat="server" CssClass="hide"></asp:Label>

									<asp:Label Style="z-index: 0" ID="lbScrType" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbScrOuName" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbScrEmpName" runat="server" CssClass="hide"></asp:Label>
									<asp:Label Style="z-index: 0" ID="lbScrEmail" runat="server" CssClass="hide"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
				<div class="dTR">
					<div class="dTD" style="width: 5em;">
						<asp:Label ID="lbRefDoc" runat="server">相關公文</asp:Label>
					</div>
				</div>
				<div class="GridDiv" style="height: 184px">
					<asp:DataGrid ID="dg2" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO2" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="起算日期">
								<ItemTemplate>
									<asp:Label ID="lbStartDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="公文文號">
								<ItemTemplate>
									<asp:Label ID="lbDocNo2" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="收創文別">
								<ItemTemplate>
									<asp:Label ID="lbNewByOu" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="主旨">
								<ItemTemplate>
									<asp:Label ID="lbSubject" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="新增辦理情形(S)" title="新增辦理情形(S)" accesskey="S" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除辦理情形(D)" title="刪除辦理情形(D)" accesskey="D" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSrcEmail" runat="server" Text="寄送初篩結果通知(W)" title="寄送初篩結果通知(W)" accesskey="W" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
