<%@ Page language="c#" Codebehind="EDR402.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR402" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EDR402 展期及案件申請查詢作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR402" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable" >
				<div class="DivTable" id="MainTable" >
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label16" runat="server" CssClass="RequireField">申請類型：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:dropdownlist id="dlApplyType" tabIndex="60" runat="server" Width="7em" CssClass="RequireField">
								<asp:ListItem Value="1" Selected="True">展期申請案件</asp:ListItem>
								<asp:ListItem Value="2">專案申請案件</asp:ListItem>
								<asp:ListItem Value="3">特殊性案件</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label7" runat="server" EnableViewState="False">公文文號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txSDoc" tabIndex="10" runat="server" Width="5.5em" 
								MaxLength="10"></asp:textbox>－
							<asp:textbox id="txEDoc" tabIndex="20" runat="server" Width="5.5em" 
								MaxLength="10"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label1" runat="server"  EnableViewState="False">承辦單位：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 8em;">
							<cc1:combobox id="dlDept" tabIndex="30" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
						</div>
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label11" runat="server"  EnableViewState="False">承辦科別：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 6em;">
							<cc1:combobox id="dlSect" tabIndex="40" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
						</div>
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label2" runat="server"  EnableViewState="False">承辦人：</asp:label>
						</div>
						<div class="dTD">
							<cc1:combobox id="dlUser" tabIndex="50" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label3" runat="server">公文性質：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:dropdownlist id="dlProperty" tabIndex="60" runat="server" Width="10em" ></asp:dropdownlist>
						</div>
						<div class="dTD" style="WIDTH: 10em"></div>
						<div class="dTD" style="WIDTH: 10em"></div>
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label27" runat="server">業務類別：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlWorkType" tabIndex="70" runat="server" Width="6em" ></asp:dropdownlist>
							<asp:TextBox id="H_txBType" runat="server" CssClass="hide"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label15" runat="server">公文類型：</asp:label></div>
						<div class="dTD" style="WIDTH: 20em;">
							<asp:radiobutton id="rbRcv" runat="server" GroupName="doctype" Text="收文"></asp:radiobutton>
							<asp:radiobutton id="rbNew" runat="server" GroupName="doctype" Text="創簽稿"></asp:radiobutton>
							<asp:radiobutton id="rbAll" runat="server" GroupName="doctype" Text="全部"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label4" runat="server">收創文日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 20em;">
							<asp:textbox style="IME-MODE: disabled" id="txRcvDateS" tabIndex="80"
									onkeypress="jf_InpNumOnly()" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="Label14" runat="server">－</asp:label>
							<asp:textbox style="IME-MODE: disabled" id="txRcvDateE" tabIndex="90"
									onkeypress="jf_InpNumOnly()" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTD" style="WIDTH: 10em;"></div>
						<div class="dTD" style="WIDTH: 10em;"></div>
						<div class="dTD">
							<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
						</div>
					</div>
					<div class="dTR" id="H_TR1">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label5" runat="server">展期次數：</asp:label></div>
						<div class="dTD" style="WIDTH: 14em;">
							<asp:textbox style="IME-MODE: disabled" id="txReborTimes" tabIndex="100"
										onkeypress="jf_InpNumOnly()" runat="server" Width="1.5em"  MaxLength="1"></asp:textbox>
							<asp:label id="Label6" runat="server">次以上</asp:label></div>
						<div class="dTDTitle" style="WIDTH: 20em;"><asp:label id="Label18" runat="server">展期天數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txSextDays" tabIndex="101" CssClass="InputFieldNumeric" runat="server" Width="2em"  MaxLength="3"></asp:textbox>
							<asp:label id="Label19" runat="server">天以上</asp:label>
						</div>
						<div class="dTD"></div>
					</div>
					<div class="dTR" id="H_TR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label12" runat="server">展期日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 14em;">
							<asp:textbox style="IME-MODE: disabled" id="txTX_DATE"  tabIndex="110"
									onkeypress="jf_InpNumOnly()" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="Label8" runat="server">－</asp:label>
							<asp:textbox style="IME-MODE: disabled" id="txTX_DATEE"  tabIndex="120"
									onkeypress="jf_InpNumOnly()" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTD" style="WIDTH: 10em;"></div>
						<div class="dTDTitle" style="WIDTH: 20em;">
							<asp:label id="Label9" runat="server">展期理由：</asp:label></div>
						<div class="dTD">
							<cc1:combobox id="dl_REASON" tabIndex="130" runat="server" Width="14em" CssClass="comboBox"></cc1:combobox>
							<asp:textbox id="H_ED_EDR402_DETAIL" CssClass="hide" Runat="server"></asp:textbox>
							<asp:textbox id="AccLevel" CssClass="hide" Runat="server"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label10" runat="server">排序方式：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbDOCNO" runat="server"  GroupName="sort" Text="公文文號"></asp:radiobutton>
							<asp:radiobutton id="rbDEPTNAME" runat="server"  GroupName="sort" Text="承辦單位"></asp:radiobutton>
							<asp:radiobutton id="rbREASON" runat="server"  GroupName="sort" Text="展期理由"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR" id="H_TR2">
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label13" runat="server">報表種類：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbDetail" runat="server"  GroupName="rpt" Text="公文展期案件明細表"></asp:radiobutton>
							<asp:radiobutton id="rbList" runat="server"  GroupName="rpt" Text="公文展期明細表(逐筆顯示展期理由)"></asp:radiobutton>
							<asp:radiobutton id="rbTimesList" runat="server"  GroupName="rpt" Text="公文展期清單(依公文彙整)"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR" id="H_TR3">
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label17" runat="server">報表種類：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbDetail2" runat="server"  GroupName="rpt2" Text="專案明細表"></asp:radiobutton>
							<asp:radiobutton id="rbList2" runat="server"  GroupName="rpt2" Text="逐筆公文顯示"></asp:radiobutton>
						</div>
					</div>
				</div>
				<asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
				<div class="DivTable" id="GridTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 289px;" id="DIV1">
								<asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" Font-Size="Small" Font-Names="細明體"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDocNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<asp:Label id="lbFromSubject" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="收(創)文<br>日期">
											<ItemTemplate>
												<asp:Label id="lbRcvDate" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦單位">
											<ItemTemplate>
												<asp:Label id="lbDept" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦人">
											<ItemTemplate>
												<asp:Label id="lbUser" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="最後<br>申請日期">
											<ItemTemplate>
												<asp:Label id="lbTX_DATE" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="最後<br>展期理由">
											<ItemTemplate>
												<asp:Label id="lbREASON" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="展期次數">
											<ItemTemplate>
												<asp:Label id="lbReborTimes" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="總展期<br>天數">
											<ItemTemplate>
												<asp:Label id="lbTotalTimes" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 289px;" id="DIV2">
								<asp:datagrid id="dg2" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" Font-Size="Small" Font-Names="細明體"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDocNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<asp:Label id="lbFromSubject" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="收(創)文<br>日期">
											<ItemTemplate>
												<asp:Label id="lbRcvDate" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦單位">
											<ItemTemplate>
												<asp:Label id="lbDept" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦人">
											<ItemTemplate>
												<asp:Label id="lbUser" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="申請日期">
											<ItemTemplate>
												<asp:Label id="lbTX_DATE" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="申請理由">
											<HeaderTemplate>
												<asp:Label id="lbApplyReason" runat="server">申請理由</asp:Label>
											</HeaderTemplate>
											<ItemTemplate>
												<asp:Label id="lbREASON" runat="server" ></asp:Label>
												<asp:Label id="lbREASON_SWITCH" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="擬定作業時程">
											<ItemTemplate>
												<asp:Label id="lbPLAN_SCHEDULE" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel id="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" >
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
