<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>

<%@ Page Language="c#" CodeBehind="AKT800_SMEG.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT800_SMEG" ValidateRequest="false" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>AKT800 調案申請作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
	<link rel="stylesheet" type="text/css" href="LIB/AK.css">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
</head>
<body ms_positioning="GridLayout">
	<form id="AKT800_SMEG" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<!--#include file="Template/Res/GenericBanner.htm"-->
		<div class="DivBaseTable">
			<div class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 100%; text-align: center;">
						<asp:Label ID="Label2" class="InputFieldLabel" runat="server" Font-Underline="True">調　　案　　申　　請　　單</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label3" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">調案單號：</asp:Label>
					</div>
					<div class="dTD" style="width: 16em">
						<asp:TextBox ID="txBorNo" runat="server" Width="5.5em" CssClass="InputFieldText" MaxLength="10"></asp:TextBox>
						<asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
						<asp:Label ID="Label9" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel" ForeColor="Red" Font-Size="Smaller">新增調案單不需鍵入</asp:Label>
					</div>
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label4" runat="server">申請日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 18em">
						<asp:TextBox ID="dateApply" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker" Style="ime-mode: disabled"></asp:TextBox>
						<asp:Label ID="Label10" class="InputFieldLabel" runat="server">狀態：</asp:Label>
						<asp:Label ID="lbStatus" class="InputFieldLabel" runat="server" Width="5.5em"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label1" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">調案單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="lbMyOrgName" TabIndex="-1" runat="server" Width="7.5em" CssClass="displayonly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 11.5em">
						<asp:Label ID="Label5" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">調案人：</asp:Label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:TextBox ID="lbMyName" TabIndex="-1" runat="server" Width="90px" CssClass="displayonly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label7" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">分　　機：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="lbExtPhone" runat="server" Width="3em" CssClass="InputFieldText" MaxLength="10"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 11.5em">
						<asp:Label ID="Label6" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">調案方式：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:DropDownList ID="dlBorType" runat="server" Width="6.5em" CssClass="InputFieldText">
							<asp:ListItem Value="1">檔案原件</asp:ListItem>
							<asp:ListItem Value="2">線上調檔</asp:ListItem>
							<asp:ListItem Value="3" Selected="True">檔案複製品</asp:ListItem>
						</asp:DropDownList>
					</div>
				</div>
				<div class="hide">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label15" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">預計歸還日：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txDueDate" runat="server" Width="4.5em" CssClass="DatePicker" MaxLength="7" Style="ime-mode: disabled"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label23" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">急件申請：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:CheckBox ID="ckUrgent" TabIndex="180" runat="server" Width="1em"></asp:CheckBox>
					</div>
					<div class="dTDTitle" style="width: 11.5em">
						<asp:Label ID="Label24" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">指定負責單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:DropDownList ID="dlDept" runat="server" Width="8.5em"></asp:DropDownList><br />
						<asp:DropDownList ID="dlSect" runat="server" Width="8.5em"></asp:DropDownList>
						<asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Sect_Text" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox Style="z-index: 0" ID="H_Dept_Text" runat="server" CssClass="hide"></asp:TextBox>

					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label25" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
					<div class="dTD" style="width: 30em">
						<asp:TextBox ID="txUrgentReason" TabIndex="-1" runat="server" Width="35em" MaxLength="200" placeholder="請輸入急件申請原因" TextMode="MultiLine"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label26" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel" >調案類型：</asp:Label>
					</div>
					<div class="dTD" style="width: 20em">
						<asp:RadioButton ID="rbNormal" runat="server" Text="一般檔案" GroupName="di" Checked="True"></asp:RadioButton>
						<asp:RadioButton ID="rbClient" runat="server" Text="專案案卷" GroupName="di"></asp:RadioButton>
						<asp:RadioButton ID="rbManaNo" runat="server" Text="逾期列管案卷" GroupName="di"></asp:RadioButton>
						<asp:TextBox Style="z-index: 0" ID="h_BORROW_FILE_TYPE" runat="server" CssClass="hide"></asp:TextBox>
					</div>
				</div>
				<div class="hide">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="lbBorFlag" class="InputFieldLabel" runat="server">調案類型：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:DropDownList ID="dlBorFlag" runat="server">
							<asp:ListItem Value="1" Selected="True">一般檔案</asp:ListItem>
							<asp:ListItem Value="2">法制案</asp:ListItem>
							<asp:ListItem Value="3">行政救濟案件</asp:ListItem>
						</asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 30em">
						<asp:Label ID="Label21" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel"></asp:Label>
					</div>
				</div>
				<div class="hide">
					<div class="dTR">
						<div class="dTDTitle" style="width: 20em">
							<asp:Label ID="Label14" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel" BackColor="#C0C0C0">＊他機關借調請填入公文文號及預計歸還日</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:Label ID="Label13" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">公文文號：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txFromDocNo" runat="server" Width="10em" CssClass="InputFieldText" MaxLength="10"></asp:TextBox>
						</div>

					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:Label ID="Label18" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">對方機關承辦人：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txFromEmp" runat="server" Width="5.5em" CssClass="InputFieldText" MaxLength="10"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 11.5em">
							<asp:Label ID="Label19" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">電　　話：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txFromTel" runat="server" Width="5.5em" CssClass="InputFieldText" MaxLength="30"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:Label ID="Label16" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">來文機關：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" Width="10em" CssClass="displayonly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 11.5em">
							<asp:Label ID="Label17" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">來文字號：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" Width="10em" CssClass="displayonly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:Label ID="Label20" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">案　　由：</asp:Label>
						</div>
						<div class="dTD" style="width: 20em">
							<asp:TextBox ID="txFromSubject" TabIndex="-1" runat="server" Width="35em" CssClass="displayonly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						</div>
					</div>
				</div>
			</div>
		<div class="DivTable">
			<div class="dTR">
				<div class="dTDTitle" style="width: 100%; text-align: center;">
					<asp:Label ID="Label8" class="InputFieldLabel" runat="server" Font-Underline="True">調　　案　　內　　容</asp:Label>
				</div>
			</div>
			<div class="GridDiv" id="MainDGTable">
				<asp:DataGrid ID="dg1" runat="server" PageSize="1" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
					<Columns>
						<asp:TemplateColumn HeaderText="序">
							<HeaderStyle CssClass="hide"></HeaderStyle>
							<ItemStyle CssClass="hide"></ItemStyle>
							<ItemTemplate>
								<asp:Label ID="lbSeqNo" runat="server" CssClass="InputFieldLabel"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="文(編)號／檔號">
							<ItemTemplate>
								<asp:Label ID="Label11" runat="server" CssClass=''>一般案件</asp:Label>
								<asp:TextBox ID="txDocNo" runat="server"
									MaxLength="42" Height="24px" placeholder="公文文號" Width="5.5em"></asp:TextBox>
								<asp:TextBox ID="txComNo" runat="server" MaxLength="9" Height="24px" Width="4.5em" CssClass="hide"></asp:TextBox>
								<asp:HyperLink ID="hyComNo" href="javascript:;" runat="server" CssClass="hide">相關案件</asp:HyperLink>
								<br />
                                <asp:Label ID="Label30" runat="server" CssClass="hide">收創文日期：</asp:Label>
                                <asp:Label ID="lbRcvDate" runat="server" CssClass="hide"></asp:Label>
								<asp:Label ID="Label29" runat="server" CssClass="hide">同一案不可同時調閱紙本及電子卷</asp:Label><br />
								<asp:Label ID="Label12" runat="server" CssClass="hide">專案卡號</asp:Label>
								<asp:TextBox ID="txClientNo" runat="server"
									MaxLength="9" Height="24px" Width="4.5em" CssClass="hide"></asp:TextBox>
								<asp:TextBox ID="txClientVOLS" runat="server"
									MaxLength="4" Height="24px" Width="3em" placeholder="卷號" CssClass="hide"></asp:TextBox><asp:Label ID="Label28" runat="server" CssClass="hide">、</asp:Label>
								<asp:TextBox ID="txClientVOLE" runat="server"
									MaxLength="4" Height="24px" Width="3em" placeholder="卷號" CssClass="hide"></asp:TextBox>
								<asp:Label ID="Label22" runat="server" CssClass="hide">列管編號</asp:Label>
								<asp:TextBox ID="txManageNo" runat="server"
									MaxLength="9" Height="24px" Width="5.5em" CssClass="hide"></asp:TextBox>
								<asp:TextBox ID="txManageNoVOLS" runat="server"
									MaxLength="4" Height="24px" placeholder="卷號" Width="3em" CssClass="hide"></asp:TextBox><asp:Label ID="Label27" runat="server" CssClass="hide">~</asp:Label>
								<asp:TextBox ID="txManageNoVOLE" runat="server"
									MaxLength="4" Height="24px" placeholder="卷號" Width="3em" CssClass="hide"></asp:TextBox>
								<asp:Label ID="lbMaxVol" runat="server" CssClass='hide'>最大卷號：</asp:Label>
								<asp:Label ID="lbMaxVolInfo" runat="server" CssClass='hide'></asp:Label><br />
								<asp:Label ID="LBDesVol" runat="server" CssClass='hide'>銷毀卷號：</asp:Label>
								<asp:Label ID="LBDesVolList" runat="server" CssClass='hide'>無銷毀卷</asp:Label>
								<asp:TextBox ID="txFileNo" runat="server" CssClass="hide"></asp:TextBox>
								<asp:HyperLink ID="lkDOC_NO" title="線上瀏覽" CssClass="hide" runat="server"></asp:HyperLink>
								<asp:TextBox Style="z-index: 0" ID="txHCLS_KEY" runat="server" CssClass="hide"></asp:TextBox>
								<asp:TextBox Style="z-index: 0" ID="txFileNos" runat="server" CssClass="hide"></asp:TextBox>
								<asp:TextBox Style="z-index: 0" ID="txFileNoe" runat="server" CssClass="hide"></asp:TextBox>
								<asp:TextBox Style="z-index: 0" ID="H_TXVolINFO" runat="server" CssClass="hide"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="櫥位號">
							<HeaderStyle CssClass="hide"></HeaderStyle>
							<ItemStyle CssClass="hide"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="txStockNo" runat="server" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦單位/借戶名稱">
							<ItemTemplate>
								<asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="7.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="案由/案名">
							<ItemTemplate>
								<asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="30em" CssClass="PopUp" ForeColor="Navy"></asp:TextBox>
								<asp:TextBox ID="lbFileExist" runat="server" CssClass="hide" MaxLength="1"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="調案原因">
							<ItemTemplate>
								<asp:DropDownList ID="dlPhraseNo" runat="server" CssClass="InputFieldText"></asp:DropDownList>
								<asp:TextBox ID="txReason" runat="server" CssClass="InputFieldText" MaxLength="100" onblur="isMaxLength(this,'調案原因','100')"></asp:TextBox>
								<asp:TextBox ID="txSEC_NO" runat="server" CssClass="hide"></asp:TextBox>
								<asp:TextBox ID="txRealCanBor" runat="server" CssClass="hide"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
					</Columns>
				</asp:DataGrid>
			</div>
		</div>
		<div class="DivTable">
			<div class="dTR">
				<div class="dTDTitle">
					<asp:Label ID="lbTitle" class="InputFieldLabel" runat="server" Font-Underline="True" Width="255px">簽　　核　　歷　　程</asp:Label>
				</div>
			</div>
			<div class="dTR">
				<div class="GridDiv">
					<asp:DataGrid ID="dg2" runat="server" Width="740px" Height="9px" ForeColor="Black" BackColor="White"
						GridLines="Vertical" CellPadding="4" BorderWidth="1px" BorderColor="#DEDFDE" BorderStyle="None" AutoGenerateColumns="False">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSeqNo" runat="server" CssClass="InputFieldLabel" Width="2em"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="審核流程">
								<ItemTemplate>
									<asp:TextBox ID="tbChiefTitle" TabIndex="-1" runat="server" Width="70px" CssClass="displayonly"
										ForeColor="Navy" ReadOnly="True"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="實際簽核主管">
								<ItemTemplate>
									<asp:TextBox ID="tbChief" TabIndex="-1" runat="server" Width="120px" CssClass="displayonly" ForeColor="Navy"
										ReadOnly="True"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="簽核意見">
								<ItemTemplate>
									<asp:TextBox ID="tbOpinion" TabIndex="-1" runat="server" Width="500px" CssClass="displayonly"
										ForeColor="Navy" ReadOnly="True"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		</div>
        <div>
			<asp:ListBox ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
			<asp:TextBox ID="h_SpDeptlist" runat="server" CssClass="hide"></asp:TextBox>
			<asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
			<asp:TextBox ID="hidStockUse" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txCantBorKeepNo" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox ID="txLastBorType" runat="server" CssClass="hide"></asp:TextBox>
			<asp:DropDownList ID="ddlKeepState" runat="server" CssClass="hide"></asp:DropDownList>
			<asp:TextBox ID="H_txDocCnt" runat="server" Width="19px" CssClass="hide" Height="5px"></asp:TextBox>
			<asp:TextBox ID="H_CLS_KEY" runat="server" CssClass="hide"></asp:TextBox>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none" />
			<asp:Button ID="btPrint" runat="server" Text="列印申請單" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPrintVertical" runat="server" Text="列印申請單(直式)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
			<asp:Button ID="btApprove" runat="server" Text="核准" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btDeleteMsg" runat="server" Text="刪除訊息" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btBack" runat="server" Text="撤回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
		</asp:Panel>
	</form>
</body>
</html>
