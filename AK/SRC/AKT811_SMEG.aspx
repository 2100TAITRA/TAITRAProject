<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKT811_SMEG.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT811_SMEG" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>AKT811 調案登錄作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="AKT811" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<!--#include file="Template/Res/GenericBanner.htm"-->
		<asp:ListBox Style="z-index: 101; position: absolute; top: 101px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
		<div class="DivBaseTable" id="BaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label1" class="KeyField" TabIndex="-1" runat="server">調案單號：</asp:Label>
					</div>
					<div class="dTD" style="width: 16em">
						<asp:TextBox ID="txBorNo" class="KeyUpperField" TabIndex="10" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
						<asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
						<asp:TextBox ID="txHid" TabIndex="-1" runat="server" CssClass="hide" Width="48px" AutoPostBack="True"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label7" TabIndex="-1" runat="server" CssClass="RequireField">調案方式：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlBorType" TabIndex="20" runat="server" CssClass="RequireField" Width="6em"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label2" TabIndex="-1" runat="server" CssClass="RequireField">調案單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 16em">
						<cc1:ComboBox ID="dlUnit" TabIndex="30" runat="server" CssClass="RequireField comboBox" Width="9em"></cc1:ComboBox>
					</div>
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label8" TabIndex="-1" runat="server" CssClass="RequireField">調   案   人：</asp:Label>
					</div>
					<div class="dTD">
						<cc1:ComboBox ID="dlName" TabIndex="40" runat="server" CssClass="RequireField comboBox" Width="5.5em"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label4" TabIndex="-1" runat="server" CssClass="RequireField">調案日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 18em">
						<asp:TextBox ID="txDate" TabIndex="70" runat="server" CssClass="RequireField" Width="4em" MaxLength="7"></asp:TextBox>
						<asp:Label ID="lbHideParam" TabIndex="-1" runat="server" CssClass="hide"></asp:Label>
					</div>
					<div class="dTDTitle" style="width: 7em">
						<asp:Label ID="Label5" TabIndex="-1" runat="server" CssClass="RequireField">應歸還日期：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txLimit" TabIndex="80" runat="server" CssClass="RequireField" Width="4em" MaxLength="7"></asp:TextBox>
						<asp:TextBox ID="OldLimit" TabIndex="80" runat="server" CssClass="hide" Width="4em" MaxLength="7"></asp:TextBox>
						<asp:TextBox ID="txUserValue" runat="server" CssClass="hidden" Width="46px"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label3" runat="server" CssClass="RequireField">登錄日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 16em">
						<asp:TextBox ID="txEntryDate" TabIndex="70" runat="server" CssClass="RequireField" Width="4em" MaxLength="7"></asp:TextBox>
					</div>
					<div class="hide" style="width: 9em">
						<asp:Label ID="lbBorFlag" runat="server" CssClass="RequireField">調案類型：</asp:Label>
					</div>
					<div class="hide">
						<asp:DropDownList ID="dlBorFlag" runat="server" CssClass="RequireField">
							<asp:ListItem Value="1" Selected="True">一般檔案</asp:ListItem>
							<asp:ListItem Value="2">法制案</asp:ListItem>
							<asp:ListItem Value="3">行政救濟案件</asp:ListItem>
						</asp:DropDownList>
					</div>
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label24" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">指定負責單位：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:TextBox ID="txTargetData" runat="server" Width="15em" CssClass="DisplayOnly" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label26" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">調案類型：</asp:Label>
					</div>
					<div class="dTD" style="width: 20em">
						<asp:RadioButton ID="rbNormal" runat="server" Text="一般檔案" GroupName="di" Checked="True" CssClass="DisplayOnly"></asp:RadioButton>
						<asp:RadioButton ID="rbClient" runat="server" Text="專案案卷" GroupName="di" CssClass="DisplayOnly"></asp:RadioButton>
						<asp:RadioButton ID="rbManaNo" runat="server" Text="逾期列管案卷" GroupName="di" CssClass="DisplayOnly"></asp:RadioButton>
						<asp:TextBox Style="z-index: 0" ID="h_BORROW_FILE_TYPE" runat="server" CssClass="hide"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label23" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">急件申請：</asp:Label>
					</div>
					<div class="dTD" style="width: 9em">
						<asp:CheckBox ID="ckUrgent" TabIndex="180" runat="server" Width="1em"></asp:CheckBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label25" class="InputFieldLabel" runat="server" CssClass="InputFieldLabel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
					<div class="dTD" style="width: 30em">
						<asp:TextBox ID="txUrgentReason" TabIndex="-1" runat="server" Width="35em"  TextMode="MultiLine"></asp:TextBox>
					</div>
				</div>
				<div class="hide" id="trMode">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label9" class="RequireField" runat="server">處理異動：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButton ID="rbRecord" runat="server" Text="調案登錄" GroupName="HandleModify" TabIndex="76" class="RequireField" Checked="True"></asp:RadioButton>
						<asp:RadioButton ID="rbReturn" runat="server" Text="歸還" GroupName="HandleModify" TabIndex="76" class="hide" ></asp:RadioButton>
						<asp:RadioButton ID="rbEXT" runat="server" Text="展期" GroupName="HandleModify" TabIndex="76" class="hide" ></asp:RadioButton>
						<asp:Label ID="lbExtTimesWarn" TabIndex="-1" runat="server" ForeColor="Red" class="hide">已展期過三次不可再展期</asp:Label>
					</div>
				</div>
				<div class="hide" id="trReturn">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label13" runat="server" CssClass="RequireField">實際歸還日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 16em">
						<asp:TextBox ID="txReturnDate" TabIndex="70" runat="server" CssClass="RequireField" Width="4em" MaxLength="7"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label21" runat="server" CssClass="RequireField">歸還保存狀況：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlKeepNo" runat="server" CssClass="RequireField"></asp:DropDownList>
					</div>
				</div>
				<div class="hide" id="trDG">
					<div class="dTDTitle" style="width: 9em">
						<asp:Label ID="Label22" class="RequireField" runat="server">展期：</asp:Label>
					</div>
					<div class="dTD">
						<asp:Panel ID="Panel1" runat="server">
							<div class="GridDiv" style="height: 113px;">
								<asp:DataGrid ID="dg2" runat="server" BackColor="White" ForeColor="Black" GridLines="Vertical" CellPadding="4" BorderWidth="1px" BorderColor="#DEDFDE" BorderStyle="None" AutoGenerateColumns="False" PageSize="3">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label ID="lbNo" TabIndex="-1" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="日期">
											<ItemTemplate>
												<asp:TextBox ID="txEntryDate" TabIndex="90" runat="server" Width="4em" MaxLength="15"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="原因">
											<ItemTemplate>
												<asp:DropDownList Style="z-index: 0" ID="dlReason" runat="server" Width="9em"></asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="說明">
											<ItemTemplate>
												<asp:TextBox ID="txComment" TabIndex="90" runat="server" Width="20em"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:DataGrid>
							</div>
						</asp:Panel>
					</div>
				</div>
				<div class="hide">
					<div class="dTR">
						<div class="dTDTitle">
							<asp:Label ID="Label12" TabIndex="-1" runat="server" BackColor="#E0E0E0" ForeColor="Black">＊他機關借調請填入來文文號：</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label6" TabIndex="-1" runat="server">來文文號：</asp:Label>
						</div>
						<div class="dTD" style="width: 18em">
							<asp:TextBox ID="txDocNo" TabIndex="60" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 7em">
							<asp:Label ID="Label15" runat="server">預計歸還日：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txDueDate" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label18" runat="server">對方機關承辦人：</asp:Label>
						</div>
						<div class="dTD" style="width: 16em">
							<asp:TextBox ID="txFromEmp" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label19" runat="server">電　　話：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txFromTel" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label16" runat="server">來文機關：</asp:Label>
						</div>
						<div class="dTD" style="width: 16em">
							<asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="14em" ForeColor="Navy"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label17" runat="server">來文字號：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="10em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label20" runat="server">案　　由：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txFromSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="31em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						</div>
					</div>
				</div>
			</div>
			<div class="DivTable">
				<asp:TextBox ID="txTest" runat="server" CssClass="hide"></asp:TextBox>
				<div class="dTR">
					<asp:DropDownList Style="z-index: 0" ID="dlHideDocNo" runat="server" CssClass="hide" Width="136px"></asp:DropDownList>
					<div class="dTD">
						<asp:Panel ID="pTitle" runat="server">
							<div class="GridDiv" style="height: 327px;">
								<asp:DataGrid ID="dg1" runat="server" BackColor="White" ForeColor="Black" GridLines="Vertical" CellPadding="4" BorderWidth="1px" BorderColor="#DEDFDE" BorderStyle="None" AutoGenerateColumns="False" PageSize="1">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label ID="lbNo" TabIndex="-1" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="文(編)號／檔號">
											<ItemTemplate>
												<div id="docinfo">
													<asp:Label ID="Label11" runat="server" Width="2.5em">文號</asp:Label>
													<asp:TextBox ID="txDoc" onblur="queryBorrowDetail(this.value,'1');" TabIndex="90" runat="server" Width="5.5em" MaxLength="15" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>&nbsp;
                                                    <br />
                                                    <asp:Label ID="Label30" runat="server" CssClass="hide">收創文日期：</asp:Label>
                                                    <asp:Label ID="lbRcvDate" runat="server" CssClass="hide"></asp:Label>
													<asp:CheckBox ID="cbCom" onclick="queryBorrowDetail(this,'3')" runat="server" Text="併件借出" CssClass="hide"></asp:CheckBox><br>
													<asp:Label ID="Label14" runat="server" Width="2.5em" CssClass="hide">檔號</asp:Label>
													<asp:TextBox ID="txCase" onblur="queryBorrowDetail(this.value,'2');" TabIndex="90" runat="server" Width="12.5em" CssClass="hide"></asp:TextBox>
												</div>
												<div id="caseinfoAA">
													<asp:Label ID="Label12" runat="server" >專案卡號</asp:Label>
													<asp:TextBox ID="txClientNo" runat="server"
														MaxLength="9" Height="24px" Width="4.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
													<asp:TextBox ID="txClientVOLS" runat="server"
														MaxLength="4" Height="24px" Width="2.5em" placeholder="卷號" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox><asp:Label ID="Label28" runat="server">、</asp:Label>
													<asp:TextBox ID="txClientVOLE" runat="server"
														MaxLength="4" Height="24px" Width="2.5em" placeholder="卷號" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
												</div>
												<div id="caseinfoBB">
													<asp:Label ID="Label22" runat="server">列管編號</asp:Label>
													<asp:TextBox ID="txManageNo" runat="server"
														MaxLength="9" Height="24px" Width="5.5em" CssClass="DisplayOnly"></asp:TextBox>
													<asp:TextBox ID="txManageNoVOLS" runat="server"
														MaxLength="4" Height="24px" placeholder="卷號" Width="2.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox><asp:Label ID="Label27" runat="server" >~</asp:Label>
													<asp:TextBox ID="txManageNoVOLE" runat="server" MaxLength="4" Height="24px" placeholder="卷號" Width="2.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
												</div>
												<div id="caseinfoDes">
													<asp:Label ID="lbMaxVol" runat="server" >最大卷號：</asp:Label>
													<asp:Label ID="lbMaxVolInfo" runat="server" ></asp:Label><br />
													<asp:Label ID="LBDesVol" runat="server" CssClass='hide'>銷毀卷號：</asp:Label>
													<asp:Label ID="LBDesVolList" runat="server" CssClass='hide'>無銷毀卷</asp:Label>
												</div>
												<asp:TextBox Style="z-index: 0" ID="txFileNos" runat="server" CssClass="hide"></asp:TextBox>
												<asp:TextBox Style="z-index: 0" ID="txFileNoe" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="櫥位號">
											<HeaderStyle CssClass="hide"></HeaderStyle>
											<ItemStyle CssClass="hide"></ItemStyle>
											<ItemTemplate>
												<asp:Label ID="lbStockNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="案由(案名)">
											<ItemTemplate>
												<asp:Label ID="txDesc" TabIndex="-1" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦單位/借戶名稱">
											<ItemTemplate>
												<asp:TextBox ID="txDept" TabIndex="-1" runat="server" Width="7.5em" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="總卷數/總件數/總頁數">
											<ItemTemplate>
												<asp:TextBox ID="txVolNum" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="1.5em" ReadOnly="True"></asp:TextBox>
												<asp:Label ID="Label290" runat="server" Width="1.5em">／</asp:Label>
												<asp:TextBox ID="txDocNum" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="1.5em" ReadOnly="True"></asp:TextBox>
												<asp:Label ID="Label10" runat="server" Width="1.5em">／</asp:Label>
												<asp:TextBox ID="txPageNum" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="2.5em"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案原因">
											<ItemTemplate>
												<asp:Label ID="lbReason" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案範圍">
											<HeaderStyle CssClass="hide"></HeaderStyle>
											<ItemStyle CssClass="hide"></ItemStyle>
											<ItemTemplate>
												<asp:CheckBox ID="cbAll" TabIndex="90" runat="server" Text="整卷借出"></asp:CheckBox>
												<asp:Label ID="lbPacked" runat="server" CssClass="hidden" BackColor="#FFE0C0" ForeColor="Red">整卷裝訂</asp:Label>
												<asp:TextBox ID="txReason" runat="server" CssClass="hide" Width="27px"></asp:TextBox><br>
												<asp:DropDownList ID="dlRange" TabIndex="90" runat="server" Width="8em"></asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="複製品／<BR>另存編號">
											<HeaderStyle CssClass="hide"></HeaderStyle>
											<ItemStyle CssClass="hide"></ItemStyle>
											<ItemTemplate>
												<asp:TextBox ID="txVolume" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="5em" ReadOnly="True"></asp:TextBox><br>
												<asp:TextBox ID="txAttNo" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="5em" ReadOnly="True"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>

										<asp:TemplateColumn HeaderText="密文">
											<HeaderStyle CssClass="hide"></HeaderStyle>
											<ItemStyle CssClass="hide"></ItemStyle>
											<ItemTemplate>
												<asp:TextBox ID="txReborCnt" TabIndex="-1" runat="server" CssClass="hide" ReadOnly="True"></asp:TextBox>
												<asp:CheckBox ID="cbIsSecDoc" runat="server" Enabled="False"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="簽核類型／<BR>密件流水號">
											<HeaderStyle CssClass="hide"></HeaderStyle>
											<ItemStyle CssClass="hide"></ItemStyle>
											<ItemTemplate>
												<asp:Label ID="lbSignType" runat="server"></asp:Label><br>
												<asp:Label ID="lbSecSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:DataGrid>
							</div>
						</asp:Panel>
					</div>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btEmail" runat="server" Text="E-Mail通知" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btIsdn" runat="server" Text="開啟數位內容" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btPrint" runat="server" Text="外機關借調移交單" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPrintT" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
		</asp:Panel>
		<asp:CustomValidator Style="z-index: 102; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hide" ErrorMessage="CustomValidator"></asp:CustomValidator>
		<asp:ValidationSummary Style="z-index: 103; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
		<asp:TextBox Style="z-index: 105; position: absolute; top: 192px; left: 8px" ID="txBorType" runat="server" CssClass="hidden"></asp:TextBox>
		<asp:TextBox ID="txLastBorType" runat="server" CssClass="hide"></asp:TextBox>
	</form>
</body>
</html>
