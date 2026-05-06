<%@ Page language="c#" Codebehind="EDI350.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDI350" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDI350 公文電子郵件發文狀態查詢及寄送作業</TITLE>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDI350" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="txSetting4" runat="server"></asp:textbox><asp:textbox id="txMsgId" runat="server"></asp:textbox><asp:textbox id="H_AllEmail" runat="server"></asp:textbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label2" runat="server" >發文日期：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txSDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
							<asp:textbox id="txEDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label3" runat="server" >寄送狀態：</asp:label></div>
						<div class="dTD">
							<asp:checkbox id="cbNConfirn" runat="server" Text="待確認"></asp:checkbox>
							<asp:checkbox id="cbConfirn" runat="server" Text="已確認"></asp:checkbox>
							<asp:checkbox id="cbWSend" runat="server" Text="待寄送"></asp:checkbox>
							<asp:checkbox id="cbTran" runat="server" Text="轉紙本發文"></asp:checkbox>
							<asp:checkbox id="cbFail" runat="server" Text="寄送失敗"></asp:checkbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label4" runat="server" >發文天數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDay" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:textbox>
							<asp:label id="Label5" runat="server" >天以上</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label6" runat="server" >寄送次數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="tx_TX_TIME" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:textbox>
							<asp:label id="Label7" runat="server" >次以上</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label1" runat="server" >發文文號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNoS" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:textbox>─
							<asp:textbox id="txDocNoE" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label11" runat="server" >受文者：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txORGNAME" runat="server" Width="5.5em" ></asp:textbox>
							<asp:imagebutton id="Imagebutton2" tabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
							<asp:textbox id="TextBox10" runat="server" Width="9.5em" CssClass="hide"></asp:textbox>
							<asp:label id="lbOrgName" runat="server" ></asp:label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em;">
							<asp:label id="Label19" runat="server" >排序：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbDocNo" runat="server" Text="發文號" GroupName="OrderBy" Checked="True"></asp:radiobutton>
							<asp:radiobutton id="rbIssueName" runat="server" Text="受文者" GroupName="OrderBy"></asp:radiobutton></div>
					</div>
				</div>
				<HR style="WIDTH: 88.23%;" SIZE="1">
				<div class="DivTable" id="Table2">
					<div class="dTR">
						<div class="dTD">
							<asp:label id="Label10" runat="server" Width="14em" >電子郵件寄送及訊息通知設定</asp:label>
							<asp:button id="btSubjectDiv" tabIndex="196" runat="server" Width="2.5em" Text=">>"></asp:button>&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:button id="btSave" runat="server" Text="更新設定值"></asp:button>
						</div>
					</div>
				</div>
				<div class="DivTable" id="divSubject" style="DISPLAY: none">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 17em;">
							<asp:label id="Label9" runat="server">受文者未回覆：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txReplyDay" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:textbox>
							<asp:label id="Label12" runat="server" Width="17em" >天以上，系統自動重新寄送電子郵件</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 17em;">
							<asp:label id="Label13" runat="server">寄送次數限制：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txSendLimit" runat="server" Width="1.5em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label14" runat="server" >次</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 17em;">
							<asp:label id="Label16" runat="server">通知時機：</asp:label></div>
						<div class="dTD">
							<asp:checkbox id="cbSYS_Confirm" runat="server"  Text="系統接收受文者讀取確認時，通知"></asp:checkbox>
							<asp:checkbox id="cbSYS_user" runat="server"  Text="承辦人"></asp:checkbox>
							<asp:checkbox id="cbSYS_Sender" runat="server"  Text="發文人員"></asp:checkbox><BR>
							<asp:checkbox id="cbSendLimit" runat="server"  Text="重新寄送次數超過設定時，通知"></asp:checkbox>
							<asp:checkbox id="cbSL_User" runat="server"  Text="承辦人"></asp:checkbox>
							<asp:checkbox id="cbSL_Sender" runat="server"  Text="發文人員"></asp:checkbox><BR>
							<asp:checkbox id="cbNoreply" runat="server"  Text="受文者無回覆系統自動重新寄送時，通知"></asp:checkbox>
							<asp:checkbox id="cbNo_User" runat="server"  Text="承辦人"></asp:checkbox>
							<asp:checkbox id="cbNo_Sender" runat="server"  Text="發文人員"></asp:checkbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 17em;">
							<asp:label id="Label18" runat="server" Visible="False">通知方式：</asp:label></div>
						<div class="dTD">
							<asp:checkbox id="cbSYS_NOTIFY" runat="server"  Text="系統訊息通知" Visible="False"></asp:checkbox>
							<asp:checkbox id="cbEmail" runat="server"  Text="電子郵件" Visible="False"></asp:checkbox>
							<asp:checkbox id="cbSYS_Email" runat="server"  Text="系統訊息通知及電子郵件" Visible="False"></asp:checkbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 17em;">
							<asp:label id="Label8" runat="server" Visible="False">信件說明文字：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txMailDetail" runat="server" Width="26em"  Visible="False"></asp:textbox></div>
					</div>
					<asp:textbox id="txSearchResult" CssClass="hide" Runat="server"></asp:textbox>
				</div>
				<HR style="WIDTH: 88.23%;" SIZE="1">
				<div class="DivTable" id="GridTable" style="HEIGHT: 187px">
					<div class="dTR">
						<div class="dTD" >	
							<div class="dTR">
								<div class="dTD" >
									<asp:button id="btSelectAll" runat="server" Text="全選"></asp:button></div>
								<div class="dTD" >
									<asp:button id="btSelectInverse" runat="server" Text="反向"></asp:button></div>
								<div class="dTD">
									<asp:button id="btSelectClear" runat="server" Text="清除"></asp:button></div>
							</div>	
							<DIV class="GridDiv" style="HEIGHT: 236px;">
								<asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2" 
								BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None" BackColor="White">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server" EnableViewState="true"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="發文號">
											<ItemTemplate>
												<asp:Label id="lbIssueNo" runat="server" EnableViewState="true"></asp:Label>
												<asp:Label id="hiddenSep" runat="server">-</asp:Label>
												<asp:Label id="hiddenSubNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="發文日期">
											<ItemTemplate>
												<asp:Label id="lbIssueDate" runat="server" EnableViewState="true"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="受文者">
											<ItemTemplate>
												<asp:Label id="lbRcvUser" runat="server" Width="4.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="電子郵件">
											<ItemTemplate>
												<asp:TextBox id="txEmail" runat="server" Width="9em"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<asp:Label id="lbSubject" runat="server" Width="9em"></asp:Label>
												<asp:Label id="hiddenDraft" runat="server" CssClass="hide"></asp:Label>
												<asp:Label id="hiddenORGID" runat="server" CssClass="hide"></asp:Label>
												<asp:Label id="hiddenDocType" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="寄送<br>狀態">
											<ItemTemplate>
												<asp:Label id="lbStatus" style="OVERFLOW: hidden" runat="server" Width="3.5em" EnableViewState="true"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="異常原因">
											<ItemTemplate>
												<asp:Label id="lbMailErrorMsg" style="OVERFLOW: hidden" runat="server" Width="5.5em" EnableViewState="true"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="寄送日期<br>(第一次)">
											<ItemTemplate>
												<P>
													<asp:Label id="lbFSend_Date" runat="server" Width="1em"></asp:Label><BR>
													<asp:Label id="lbFSend_Time" runat="server" Width="1em"></asp:Label>
												</P>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="寄送日期<br>(最近一次)">
											<ItemTemplate>
												<P>
													<asp:Label id="lbLSend_Date" runat="server" Width="1em"></asp:Label><BR>
													<asp:Label id="lbLSend_Time" runat="server" Width="1em"></asp:Label>
												</P>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="寄送<br>次數">
											<ItemTemplate>
												<asp:Label id="lbMailTimes" runat="server" Width="1em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="確認時間">
											<ItemTemplate>
												<P>
													<asp:Label id="lbConfirm_Date" runat="server" Width="5em"></asp:Label><BR>
													<asp:Label id="lbConfirm_Time" runat="server" Width="5em"></asp:Label>
												</P>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="備註">
											<ItemTemplate>
												<asp:TextBox id="txDesc" runat="server" Width="5em" MaxLength="50"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="受文者<br>是否含附件">
											<ItemTemplate>
												<asp:Label id="lbIsAtt" runat="server" Width="1em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btEmail" runat="server" Text="電子郵件寄送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btTransfer" runat="server" Text="改為紙本" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="清單預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btConfirm" runat="server" Text="讀取確認" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDeleteDoc" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDeleteSingleMsg" runat="server" Text="刪除此筆訊息" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDeleteAllMsg" runat="server" Text="刪除歷史訊息" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
