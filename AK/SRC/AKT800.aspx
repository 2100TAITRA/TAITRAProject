<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>

<%@ Page Language="c#" CodeBehind="AKT800.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT800" ValidateRequest="false" %>

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
	<form id="AKT800" method="post" runat="server">
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
						<asp:Label ID="Label4" runat="server" >申請日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 18em">
						<asp:TextBox ID="dateApply" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker" style="IME-MODE:disabled"></asp:TextBox>
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
				<div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
						<asp:Label ID="lbUsageType" class="InputFieldLabel" runat="server">調案運用類型：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:DropDownList ID="dlUsageType" runat="server">
                            <asp:ListItem Selected="True"></asp:ListItem>
							<asp:ListItem Value="1">內部人員借調</asp:ListItem>
							<asp:ListItem Value="2">他機關借調</asp:ListItem>
							<asp:ListItem Value="3">依法調用</asp:ListItem>
						</asp:DropDownList>
                        <asp:TextBox ID="h_txUsageTypeIndex" runat="server" CssClass="hide"></asp:TextBox>
					</div>
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
					<div class="dTDTitle" style="width: 11.5em">
						<asp:Label ID="Label15" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">預計歸還日：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txDueDate" runat="server" Width="4.5em" CssClass="DatePicker" MaxLength="7" style="IME-MODE:disabled"></asp:TextBox>
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
						<asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" Width="10em" CssClass="DisplayOnly" ></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 11.5em">
						<asp:Label ID="Label17" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">來文字號：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" Width="10em" CssClass="DisplayOnly" ></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label20" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">案　　由：</asp:Label>
					</div>
					<div class="dTD" style="width: 20em">
						<asp:TextBox ID="txFromSubject" TabIndex="-1" runat="server" Width="35em" CssClass="DisplayOnly" ></asp:TextBox>
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
					<asp:DataGrid ID="dg1" runat="server" PageSize="5" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSeqNo" runat="server" CssClass="InputFieldLabel"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="文(編)號／檔號">
								<HeaderTemplate>
									<span id="colNameHeader">文(編)號／檔號</span>
								</HeaderTemplate>
								<ItemTemplate>
										<asp:Label ID="Label11" runat="server" Font-Size="Smaller">文(編)號</asp:Label>
										<asp:HyperLink ID="lkDOC_NO" title="線上瀏覽" CssClass="hide" runat="server"></asp:HyperLink>
										<asp:TextBox ID="txDocNo"  runat="server" MaxLength="42" Width="10em" ></asp:TextBox><br>
										<asp:Label ID="lbFileNoTtile" runat="server" Font-Size="Smaller">檔號</asp:Label>
										<asp:TextBox ID="txFileNo" runat="server" MaxLength="42" Width="17em" ></asp:TextBox>
										<asp:TextBox Style="z-index: 0" ID="txHCLS_KEY" runat="server" Width="1px" Height="1px" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="H_txUpestClsKey" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="櫥位號">
								<ItemTemplate>
									<asp:TextBox ID="txStockNo" runat="server" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                                    <asp:TextBox ID="h_AllStock" runat="server" CssClass="hide" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="年度號">
								<ItemTemplate>
									<asp:TextBox ID="lbYear" TabIndex="-1" runat="server" Width="3.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="分類號">
								<ItemTemplate>
									<asp:TextBox ID="lbCls" TabIndex="-1" runat="server" Width="10em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="國別">
								<ItemTemplate>
									<asp:TextBox ID="lbCountry" TabIndex="-1" runat="server" Width="3.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="處別">
								<ItemTemplate>
									<asp:TextBox ID="lbOffice" TabIndex="-1" runat="server" Width="3.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="細目/產品別">
								<ItemTemplate>
									<asp:TextBox ID="lbProduct" TabIndex="-1" runat="server" Width="6.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="卷次號">
								<ItemTemplate>
									<asp:TextBox ID="lbVol" TabIndex="-1" runat="server" Width="4em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="件次號">
								<ItemTemplate>
									<asp:TextBox ID="lbSeq" TabIndex="-1" runat="server" Width="4em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦單位">
								<ItemTemplate>
									<asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="7.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="案由(或案名)">
								<ItemTemplate>
									<asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="20em" CssClass="PopUp" ForeColor="Navy"></asp:TextBox>
									<asp:TextBox ID="lbFileExist" runat="server" CssClass="hide" MaxLength="1"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調案原因">
								<ItemTemplate>
									<asp:DropDownList ID="dlPhraseNo" runat="server" CssClass="InputFieldText" ></asp:DropDownList>
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
			<asp:TextBox ID="autoPB" runat="server" Width="16px" CssClass="hide" MaxLength="1" Visible="False" AutoPostBack="True"></asp:TextBox>
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
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btApprove" runat="server" Text="核准" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none" />
			<asp:Button ID="btPrint" runat="server" Text="列印申請單" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPrintVertical" runat="server" Text="列印申請單(直式)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btDeleteMsg" runat="server" Text="刪除訊息" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btBack" runat="server" Text="撤回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
			<asp:Button ID="btPreviewDetail" runat="server" Text="核可調案單預覽"  Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
		</asp:Panel>
	</form>
</body>
</html>
