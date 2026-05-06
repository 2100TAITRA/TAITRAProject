<%@ Page language="c#" Codebehind="AKT850.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT850" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML> 
<HTML>
	<HEAD>
		<title>AKT850 檔案應用申請作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT850" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<OBJECT id="BF" style="VISIBILITY: hidden;display: none" codeBase="Lib/brsr.cab" classid="CLSID:FDDE9481-9E0F-4B6A-A368-9632F5C93028"
				VIEWASTEXT progid="Browser.FolderBrowser">
			</OBJECT>
			<DIV class="DivBaseTable" id="MainTable">
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em"><asp:label id="Label2" runat="server" CssClass="KeyField">申請書號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txApplyNo" tabIndex="1" runat="server" CssClass="KeyFieldNumeric"
									MaxLength="8" Width="4.5em"></asp:textbox><asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton></DIV>
						<DIV class="dTDTitle" style="WIDTH: 15em"><asp:label id="Label11" runat="server">申請日期：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 8.5em"><asp:textbox CssClass="DatePicker" id="txApplyDate" tabIndex="6" runat="server" MaxLength="7"
									Width="4em">0920810</asp:textbox></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txFileName" runat="server" Width="2em" CssClass="hide"></asp:TextBox>
								<asp:TextBox id="txClientPath" runat="server" Width="2em" CssClass="hide"></asp:TextBox>
								<asp:TextBox id="AP_FILEIO_WS" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
								<asp:TextBox id="AP_WORK_PATH" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
								<asp:TextBox id="FileUpload" runat="server" Width="2em" CssClass="hide"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9.5em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 5.5em"><asp:label id="Label6" runat="server">姓名</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 8.5em"><asp:label id="Label7" runat="server">出生年月日</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 17em"><asp:label id="Label8" runat="server">身分證明文件字號</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 12.5em"><asp:label id="Label9" runat="server">電話</asp:label></DIV>
						<DIV class="dTD"><asp:label id="Label10" runat="server">地址</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em"><asp:label id="Label3" runat="server">申請人：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 7.5em"><asp:textbox id="txPubName" tabIndex="11" runat="server" MaxLength="20" Width="4.5em">李大明</asp:textbox></DIV>
						<DIV class="dTD" style="WIDTH: 9em"><asp:textbox CssClass="DatePicker" id="txPubBirth" tabIndex="16" runat="server" MaxLength="7"
									Width="4em">0920810</asp:textbox></DIV>
						<DIV class="dTD" style="WIDTH: 13em"><asp:textbox id="txPubId" tabIndex="21" runat="server" CssClass="upper" MaxLength="10" Width="5.5em">A123456789</asp:textbox></DIV>
						<DIV class="dTD" style="WIDTH: 12.5em"><asp:label id="Label4" runat="server">(H):</asp:label><asp:textbox id="txPubHTel" tabIndex="26" runat="server" MaxLength="20" Width="5.5em">(02)22222222</asp:textbox><br/><asp:label id="Label5" runat="server">(O):</asp:label><asp:textbox id="txPubOTel" tabIndex="31" runat="server" MaxLength="20" Width="5.5em">(02)33333333</asp:textbox></DIV>
						<DIV class="dTD"><asp:textbox id="txPubAddress" tabIndex="36" runat="server" MaxLength="60" Width="10em" 
									TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em"><asp:label id="Label1" runat="server">※代理人：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 7.5em"><asp:textbox id="txBehalfName" tabIndex="41" runat="server" MaxLength="20" Width="4.5em">陳小明</asp:textbox></DIV>
						<DIV class="dTD" style="WIDTH: 9em"><asp:textbox CssClass="DatePicker" id="txBehalfBirth" tabIndex="46" runat="server" MaxLength="7"
									Width="4em">0920810</asp:textbox></DIV>
						<DIV class="dTD" style="WIDTH: 13em"><asp:textbox id="txBehalfId" tabIndex="51" runat="server" CssClass="upper" MaxLength="10" Width="5.5em">A123456789</asp:textbox></DIV>
						<DIV class="dTD" style="WIDTH: 12.5em"><asp:label id="Label12" runat="server">(H):</asp:label><asp:textbox id="txBehalfHTel" tabIndex="56" runat="server" MaxLength="20" Width="5.5em">(03)44444444</asp:textbox><br/><asp:label id="Label13" runat="server">(O):</asp:label><asp:textbox id="txBehalfOTel" tabIndex="61" runat="server" MaxLength="20" Width="5.5em">(03)55555555</asp:textbox></DIV>
						<DIV class="dTD"><asp:textbox id="txBehalfAddress" tabIndex="66" runat="server" MaxLength="60" Width="10em" 
									TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em"><asp:label id="Label14" runat="server">※申請人EMail：</asp:label><br/><asp:label id="Label15" runat="server">　※法人名稱：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 20em"><asp:textbox id="txPubEMail" tabIndex="71" runat="server" MaxLength="30" Width="13em">test@2100t.com.tw</asp:textbox><br/><asp:textbox id="txProxyName" tabIndex="76" runat="server" MaxLength="20" Width="13em"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 22em"><asp:label id="Label20" runat="server" Width="6em">※法人地址：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 14.5em"><asp:textbox id="txProxyAddress" tabIndex="81" runat="server" MaxLength="60" Width="10em" 
									TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em"><asp:label id="Label21" runat="server">　※手機：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 12em"><asp:textbox id="txPubMobile" tabIndex="86" runat="server" MaxLength="20" Width="5.5em">0918001001</asp:textbox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 30em"><asp:label id="Label22" runat="server" Width="15em">※代理人與申請人關係：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 12em">
								<asp:textbox id="txRelation" tabIndex="91" runat="server" MaxLength="10" Width="9em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8em"><asp:label id="Label16" runat="server">申請目的：</asp:label></DIV>
						<DIV class="dTD"><asp:checkbox id="cbPurpose1" tabIndex="96" runat="server" Text="歷史考證"></asp:checkbox><asp:checkbox id="cbPurpose2" tabIndex="101" runat="server" Text="學術研究" Checked="True"></asp:checkbox><asp:checkbox id="cbPurpose3" tabIndex="106" runat="server" Text="事證稽憑"></asp:checkbox><asp:checkbox id="cbPurpose4" tabIndex="111" runat="server" Text="業務參考"></asp:checkbox>
								<asp:CheckBox id="cbPurpose5" runat="server" Text="權益保障"></asp:CheckBox><asp:checkbox id="cbPurpose6" tabIndex="116" runat="server" Text="其他："></asp:checkbox><asp:textbox id="txOtherPurpose" tabIndex="117" runat="server" MaxLength="100" Width="23em" onkeydown="isMaxLength(this,'申請目的','100')"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 38em"><asp:label id="Label17" runat="server">申　請　應　用　檔　案</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="DivTable">
							<DIV class="GridDiv" style="HEIGHT: 12em" data-fixed="true">
								<asp:datagrid id="dg1" tabIndex="131" runat="server" AutoGenerateColumns="False" PageSize="10" CellPadding="4" GridLines="Vertical">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:label id="lbSeqNo" runat="server">12</asp:label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="文(編)號/檔號">
											<ItemTemplate>
												<asp:TextBox id="txDocNo" tabIndex="-1" runat="server" Width="6em" MaxLength="42"></asp:TextBox>
												<asp:TextBox id="txDocFileNo" tabIndex="-1" runat="server" CssClass="hide" Width="6em" MaxLength="42"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="案由(案名)">
											<ItemTemplate>
												<asp:TextBox id="txSubject" tabIndex="-1" runat="server" CssClass="displayOnly" Width="12em" ></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="抄錄閱覽">
											<ItemTemplate>
												<asp:DropDownList id="dlApplyView" runat="server" Width="7.5em">
													<asp:ListItem Selected="True"></asp:ListItem>
													<asp:ListItem Value="1">原件</asp:ListItem>
													<asp:ListItem Value="2">複製品</asp:ListItem>
												</asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="提供複製品">
											<ItemTemplate>
												<asp:DropDownList id="dlApplyCopy" runat="server" Width="7.5em">
													<asp:ListItem Selected="True"></asp:ListItem>
													<asp:ListItem Value="1">紙本</asp:ListItem>
													<asp:ListItem Value="2">電子媒體</asp:ListItem>
													<asp:ListItem Value="3">檔案傳送</asp:ListItem>
													<asp:ListItem Value="4">線上瀏覽</asp:ListItem>
												</asp:DropDownList>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>						
						</DIV>
					</DIV>
					<DIV class="dTR" style="height: 2em">
						<DIV class="dTDTitle" style="WIDTH: 13em"><asp:label id="Label18" runat="server">※閱覽檔案原件事由：</asp:label></DIV>
						<DIV><asp:textbox id="txOriginReason" tabIndex="136" runat="server" MaxLength="100" Width="26em" onblur="isMaxLength(this,'閱覽檔案原件事由','100')"></asp:textbox><asp:checkbox id="cbPostFor" tabIndex="141" runat="server" Width="13.5em" Text="代為郵寄(寄至申請人地址)"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 13em"><asp:label id="Label19" runat="server" Width="11.5em">※證明文件檔名：</asp:label></DIV>
						<DIV><INPUT id="txFile" style="WIDTH: 28em" tabIndex="146" type="file"></DIV>
					</DIV>
					<DIV class="dTR">
		            	<asp:label id="Label23" runat="server">※非必要欄位</asp:label>
					</DIV>
				</DIV>
			</DIV>
			<DIV style="DISPLAY: none; Z-INDEX: 108; LEFT: 824px; OVERFLOW: auto; WIDTH: 129px; POSITION: absolute; TOP: 316px; HEIGHT: 260px">
				<asp:validationsummary id="ValidationSummary1" runat="server" CssClass="hidden"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" CssClass="Hidden"></asp:listbox>
				<asp:customvalidator id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:textbox id="txFileNoSep" runat="server" Width="31px"></asp:textbox>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btApplyInfo" runat="server" Text="申請需知" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btGetEcFile" runat="server" Text="另存電子檔" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
