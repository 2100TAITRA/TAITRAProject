<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT412.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT412" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT412檔案保存現況批次註記作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT412" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="DivTable" id="MainTable">
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label1" runat="server" CssClass="RequireField">清理批號：</asp:label></DIV>
							<DIV class="dTD" style="width: 8em; "><asp:textbox onkeypress="jf_UPPERCASE()" id="txPlanNo" tabIndex="1" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="8"></asp:textbox><asp:imagebutton id="btKeyHelp" tabIndex="1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:imagebutton></DIV>
							<DIV class="dTDTitle" style="width: 6em; "><asp:label id="labeldesc" runat="server" >計畫說明：</asp:label></DIV>
							<DIV class="dTD" style="width: 18em; "><asp:textbox id="txPlanDesc" tabIndex="-1" runat="server" Width="17.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label2" runat="server" >媒體類型：</asp:label></DIV>
							<DIV class="dTD" style="width: 8em; ">
								<asp:dropdownlist id="dlMediaType" tabIndex="4" runat="server" Width="7.5em" >
									<asp:ListItem></asp:ListItem>
								</asp:dropdownlist>
								<asp:textbox id="txPlanNoBak" runat="server" Width="6.5em" CssClass="hide"></asp:textbox><asp:textbox id="txFileNoSep" runat="server" Width="6.5em" CssClass="hide"></asp:textbox>
							</DIV>
							<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label11" runat="server" >檔號範圍：</asp:label></DIV>
							<DIV class="dTD" style="width: 18em; "><asp:textbox id="txFileRange" tabIndex="-1" runat="server" Width="17.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:textbox></DIV>
						</DIV>
						<DIV class="dTR">
							<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label3" runat="server" > 註記種類：</asp:label></DIV>
							<DIV class="dTD" style="width: 31em; ">
								<asp:radiobutton id="rbDoc" tabIndex="2" runat="server" Checked="True" Text="本文" GroupName="gType"></asp:radiobutton><asp:radiobutton id="rbAtt" tabIndex="3" runat="server" Text="另存附件" GroupName="gType"></asp:radiobutton>
								<asp:radiobutton style="Z-INDEX: 0" id="rbElc" tabIndex="3" runat="server" GroupName="gType" Text="紙本來文併同歸檔"></asp:radiobutton>
							</DIV>
						</DIV>
						<FIELDSET style="WIDTH: 44em;"><LEGEND >註記資料範圍設定</LEGEND>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label4" runat="server" >文(編)號：</asp:label></DIV>
								<DIV class="dTD" style="width: 38em; ">
									<asp:textbox id="txDocNo" tabIndex="5" runat="server" Width="8.5em" ></asp:textbox><asp:button id="btDocAdd" tabIndex="6" runat="server" Text="加入"></asp:button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
									&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="Label6" runat="server" Width="9.5em" >批號下所有檔號：</asp:label><asp:button id="btAll" tabIndex="6" runat="server" Text="加入"></asp:button>
								</DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="width: 5em; "><asp:label id="Label5" runat="server" >檔號：</asp:label></DIV>
								<DIV class="dTD" style="width: 38em; ">
									<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearS" tabIndex="7" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox>－
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsS" tabIndex="8" runat="server" Width="11.5em" MaxLength="20" ></asp:textbox>－
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseS" tabIndex="9" runat="server" Width="7.5em" MaxLength="12" ></asp:textbox>－
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txVolS" tabIndex="10" runat="server" Width="3.5em" MaxLength="4" ></asp:textbox>－
									<asp:textbox onkeypress="jf_InpNumOnly()" id="txSeqS" tabIndex="11" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox>
								</DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="width: 5em; ">&nbsp;</DIV>
								<DIV class="dTD" style="width: 38em; ">
									<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearE" tabIndex="12" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox>－
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsE" tabIndex="13" runat="server" Width="11.5em" MaxLength="20" ></asp:textbox>－
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseE" tabIndex="14" runat="server" Width="7.5em" MaxLength="12" ></asp:textbox>－
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txVolE" tabIndex="15" runat="server" Width="3.5em" MaxLength="4" ></asp:textbox>－
									<asp:textbox onkeypress="jf_InpNumOnly()" id="txSeqE" tabIndex="16" runat="server" Width="2.5em" MaxLength="3" ></asp:textbox>&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:button id="btFileAdd" tabIndex="17" runat="server" Text="加入"></asp:button>
								</DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="width: 5em; ">
										<asp:label id="Label18" runat="server" >櫥位號：</asp:label></DIV>
								<DIV class="dTD" style="width: 31em; ">
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoS" tabIndex="17" runat="server" Width="7.5em" MaxLength="11" ></asp:textbox>
									<asp:label id="Label19" runat="server">－</asp:label>
									<asp:textbox onkeypress="jf_UPPERCASE()" id="txStockNoE" tabIndex="17" runat="server" Width="7.5em" MaxLength="11" ></asp:textbox>
									<asp:button id="btAdd_Stock" runat="server" Text="加入" tabIndex="17"></asp:button>
								</DIV>
							</DIV>
						</FIELDSET>
						<BR>
						<FIELDSET style="WIDTH: 44em; "><LEGEND >註記內容</LEGEND>
							<DIV class="dTR">
								<DIV class="dTD" style="width: 8.5em; "><asp:radiobutton id="rbMarkClean" tabIndex="18" runat="server" Checked="True" Text="清查異常註記：" GroupName="gMark"></asp:radiobutton></DIV>
								<DIV class="dTD" style="width: 17em; "><asp:dropdownlist id="dlKeepState" tabIndex="19" runat="server" Width="13.5em" ></asp:dropdownlist></DIV>
								<div class="dTD" style="width: 8em"><asp:CheckBox ID="cbIsDestroy" runat="server" Text="毀損無法修復"></asp:CheckBox></div>
								<div class="dTD" style="width: 5em"><asp:CheckBox ID="cbIsmiss" runat="server" Text="已遺失"></asp:CheckBox></div>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="width: 8.5em; height: 3em"><asp:label id="Label7" runat="server" >說明/原因註記：</asp:label></DIV>
								<DIV class="dTD" style="width: 35em; ">
									<asp:textbox  id="txRemark" tabIndex="7" runat="server" Width="30em" TextMode="MultiLine" ></asp:textbox>
								</DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTD" style="width: 10em; "><asp:radiobutton id="rbMarkComplete" tabIndex="20" runat="server" Text="完成修護更新註記" GroupName="gMark"></asp:radiobutton></DIV>
								<DIV class="dTD" style="width: 30em; "><asp:dropdownlist id="dlComplete" tabIndex="21" runat="server" Width="15.5em"></asp:dropdownlist><asp:button id="btSet" tabIndex="22" runat="server" Text="設定"></asp:button></DIV>
							</DIV>
						</FIELDSET>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:Panel ID="tbSelect" runat="server" EnableViewState="False">
								<asp:Button runat="server" Text="全部選取" ID="btSelectAll"></asp:Button>
								<asp:Button runat="server" Text="反向選取" ID="btSelectInverse"></asp:Button>
								<asp:Button runat="server" Text="清除選取" ID="btSelectClear"></asp:Button>
								<asp:Button runat="server" Text="刪除選取" ID="btDeleteSelected"></asp:Button>
							</asp:Panel>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rb1" runat="server" Checked="True" Text="設定" GroupName="Type1"></asp:radiobutton>
							<asp:radiobutton id="rb2" runat="server" Text="更新" GroupName="Type1"></asp:radiobutton>
							<asp:radiobutton id="rb3" runat="server" Text="刪除" GroupName="Type1"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 282px">
								<asp:datagrid id="dg1" runat="server" PageSize="1" Style="word-break:break-all" AutoGenerateColumns="False"  GridLines="Vertical" CellPadding="0">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" Width="2.5em" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="設定">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="更新">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect2" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="刪除">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect3" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔號">
											<ItemTemplate>
												<asp:Label id="lbFileNo" runat="server" Width="12.5em" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="文(編)號">
											<ItemTemplate>
												<asp:Label id="lbDocNo" runat="server" Width="5.5em" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="保存現況">
											<ItemTemplate>
												<asp:Label id="lbKeepState" runat="server" Width="9.5em" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="案由">
											<ItemTemplate>
												<asp:Label id="lbReason" runat="server" Width="13.5em" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="保存現況代碼(隱藏)">
											<ItemTemplate>
												<asp:Label id="lbKeepNo" runat="server"></asp:Label>
												<asp:Label id="lbISdestory" runat="server"></asp:Label>
												<asp:Label id="lbISmiss" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="說明/原因">
											<ItemTemplate>
												<asp:TextBox id="lbRemark" runat="server" Width="13.5em" CssClass="PopUp" ReadOnly="True" Wrap="False" ></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="更新註記" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="清查註記查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch2" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
