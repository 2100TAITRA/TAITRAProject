<%@ Page language="c#" Codebehind="IFM140.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM140" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM140 程式選單維護作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM140" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5em"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label1" runat="server" Width="7.5em" CssClass="KeyField">應用程式名稱：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txApplicationNo" tabIndex="1" runat="server" Width="8.5em" MaxLength="50" CssClass="KeyField"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label2" runat="server" Width="7.5em">應用程式類型：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="ddlApplicationType" tabIndex="2" runat="server" Width="10em">
								<asp:ListItem Value="1">伺服器端應用程式</asp:ListItem>
								<asp:ListItem Value="2">使用者端Win32程式</asp:ListItem>
							</asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR" id="tr_FileName">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label3" runat="server" Width="7.5em">檔案名稱：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txFilename" tabIndex="3" runat="server" Width="8.5em" MaxLength="100"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR hide" id="tr_VirtualDir">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label4" runat="server" Width="7.5em">虛擬目錄：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txVirtualDir" tabIndex="99" runat="server" Width="8.5em" CssClass="DisplayOnly" MaxLength="20"></asp:textbox>
							<asp:button id="btVD_Set" tabIndex="4" runat="server" Text="設定"></asp:button>&nbsp;
							<asp:button id="btVD_Del" tabIndex="5" runat="server" Text="刪除"></asp:button>
						</DIV>
					</DIV>
					<DIV class="dTR hide" id="tr_AutoLogin">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label13" runat="server" Width="7.5em">自動登入：　</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbLoginAuto" tabIndex="8" runat="server" Text="啟動" GroupName="login"></asp:radiobutton>
							<asp:radiobutton id="rbLoginNoAuto" tabIndex="9" runat="server" Text="不啟動" GroupName="login"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR" id="tr_PassParam">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label14" runat="server" Width="7.5em">傳入參數：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV id="td_PassArtifact">
								<asp:checkbox id="cbPassArtifact" runat="server" Text="Artifact"></asp:checkbox>
							</DIV>
							<DIV id="td_PassIdPwd">
								<asp:checkbox id="cbPassIdMima" runat="server" Text="帳號密碼"></asp:checkbox>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR hide" id="tr_AccountObjID">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label5" runat="server">帳號物件ID：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAccountObjID" tabIndex="10" runat="server" Width="8.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR hide" id="tr_PasswdObjID">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label6" runat="server" Width="6.5em">密碼物件ID：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txPasswdObjID" tabIndex="11" runat="server" Width="8.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR hide" id="tr_ChkBtnObjID">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label10" runat="server" Width="6em">確認鈕ID：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txChkBtnID" tabIndex="12" runat="server" Width="8.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR hide" id="tr_FuncNameObjID">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label11" runat="server">函式名稱ID：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txFuncNameID" tabIndex="13" runat="server" Width="8.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label7" runat="server" Width="7.5em">執行紀錄檔：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="ddlAuditMode" tabIndex="14" runat="server" Width="8.5em"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label8" runat="server" Width="9.5em">執行需具備之權限：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:TextBox id="txUserPrivilege" runat="server" Width="8.5em" CssClass="DisplayOnly"></asp:TextBox>
							<asp:button id="btPriv_Set" tabIndex="15" runat="server" Text="設定"></asp:button>&nbsp;
							<asp:button id="btPriv_Del" tabIndex="16" runat="server" Text="刪除"></asp:button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label9" runat="server" Width="5em">說　　明：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDescription" tabIndex="17" runat="server" Width="15em" Rows="3" TextMode="MultiLine" MaxLength="200"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="lbSeq" runat="server">排　　序：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSeq" runat="server" Width="3em" MaxLength="4" CssClass="InputFieldNumeric"></asp:textbox>
						</DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 10em">
							<asp:Label ID="Label12" runat="server">操作手冊：</asp:Label>
							<asp:TextBox ID="H_ManaulName" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_FileName" runat="server" CssClass="hide"></asp:TextBox>							
                            <asp:TextBox ID="H_FileDel" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_Artifact" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_WebService" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_AllowAtt" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="H_UpLoad" runat="server" CssClass="hide"></asp:TextBox>
						</div>				
						<DIV class="dTD">
						<div class="GridDiv" style="height: 200px">
							<asp:DataGrid ID="dgManual" runat="server" PageSize="5" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>									
									<asp:TemplateColumn HeaderText="手冊檔名">						
										<ItemTemplate>										
										<asp:Label ID="lbFileName" runat="server" CssClass="InputFieldLabel" Style="white-space: normal; word-break: break-all;"></asp:Label>     
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="手冊名稱">
										<ItemTemplate>
											<asp:TextBox ID="txManual" runat="server" Style="text-align: left;" MaxLength="10"></asp:TextBox>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="執行">
										<ItemTemplate>
											<div style="text-align: center;">
											<asp:Button ID="btAddFile" runat="server" Text="新增"></asp:Button>
                                            <input type="file" id="fileInput" runat="server"  style="display: none" onchange="fnAddFile()" />
											<asp:Button ID="btOpenFile" runat="server" Text="下載" CssClass="hidden"></asp:Button>
											<asp:Button ID="btDelFile" runat="server" Text="刪除" CssClass="hidden"></asp:Button>
											</div>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>	
						</DIV>
					</div>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
					<asp:Button ID="btOpen" runat="server" Text="新增" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:Button ID="btRpt" runat="server" Text="報表:" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
						<asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
						<asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
						<asp:ListItem Value="預設">預設</asp:ListItem>
					</asp:DropDownList>
					<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
			</asp:Panel>			
			<asp:TextBox style="Z-INDEX: 102; LEFT: 824px; POSITION: absolute; TOP: 288px" id="txPriv" runat="server" CssClass="hide"></asp:TextBox>
			<asp:TextBox style="Z-INDEX: 103; LEFT: 832px; POSITION: absolute; TOP: 336px" id="txPrivIdentity" runat="server" CssClass="hide"></asp:TextBox>
		</FORM>
	</BODY>
</HTML>
