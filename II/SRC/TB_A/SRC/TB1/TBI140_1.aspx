<%@ Page language="c#" Codebehind="TBI140_1.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI140_1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>TBI140_1</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> 
		<asp:Literal ID ="LiteralCSS" runat ="server"></asp:Literal>
		<!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<BODY style="background-color: #a6e2ff" ms_positioning="GridLayout">
		<FORM id="TBI140_1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" CssClass="hidden" runat="server" Width="22px"></asp:listbox>
				<asp:textbox id="txDownload" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Di" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="H_Pdf" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:label id="H_TBWS" runat="server" Width="23px"></asp:label>
				<asp:label id="H_lbDi" runat="server" Width="23px"></asp:label>
				<asp:label id="H_lbPdf" runat="server" Width="14px"></asp:label>
				<asp:label id="H_lbAllowName" runat="server" Width="14px"></asp:label>
				<asp:label id="H_lbPlugInSource" runat="server" Width="14px"></asp:label>
				<asp:customvalidator id="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="Validationsummary2" runat="server"></asp:validationsummary>
				<asp:listbox id="Listbox1" runat="server" Height="8px" Width="80px"></asp:listbox>
				<asp:textbox id="txBusinessType" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txOrgNo" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txUserId" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txSourceSw" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txInspGcd" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txMainUserId" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txMainUserName" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txInspCd" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txDoseCd" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txUserName" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txDeptNo" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txCoWorkType" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txMainOuId" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txModify" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txCaseNoH" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txCaseClose" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txRole" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txWebService" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txApWebService" runat="server" Width="26px"></asp:textbox>
				<asp:textbox id="txStartPath" runat="server" Width="26px"></asp:textbox>
				<asp:listbox id="lbPrintXSLPath" runat="server" CssClass="hidden"></asp:listbox>
				<asp:textbox id="H_txWebService" runat="server"></asp:textbox>
				<asp:textbox id="H_txWorkPath" runat="server"></asp:textbox>
				<asp:textbox id="H_txTBSrvName" runat="server"></asp:textbox>
				<asp:textbox id="H_txLogin" runat="server"></asp:textbox>
				<asp:textbox id="H_Artifact" runat="server"></asp:textbox>
			</DIV>
			<OBJECT style="Z-INDEX: 102; POSITION: absolute; TOP: 2px; LEFT: 41px" id="exp" 
				classid="CLSID:210FF79A-A4A1-429F-BABC-0B0A574B8748"
				data="data:application/x-oleobject;base64,mvcPIaGkn0K6vAsKV0uHSAADAAAaAAAAGgAAAA=="
				width="1" VIEWASTEXT>
			</OBJECT>
			<div id="BaseTable" class="DivBaseTable">
				<div class="DivTable" style="width: 90%">
					<div class="dTD" style="width: 18%">
						<DIV class="GridDiv" id="DivBulletin" align="center">
							<div class="dTR" width="50%" bgColor="#a6e2ff">
								<div class="dTD" style=" align-items:center">
									<div style="BACKGROUND-IMAGE: url(../image/BulletinId.gif); WIDTH: 4.5em; COLOR: white">公告編號</div>
								</div>
							</div>
							
							<div class="dTR">
								<div class="dTD" style="width: 7.5em">
									<asp:label id="lbBulletinId" runat="server" BackColor="#a6e2ff"></asp:label>
									<asp:TextBox ID="txSourceOrgno" runat="server" CssClass="hide"></asp:TextBox>
								</div>
							</div>
							<div class="dTR">
								<div class="dTD" style="width: 100%;">
									<asp:image id="AttachImage" runat="server" Width="7em" ImageUrl="../image/icon_downloud-orange.gif"></asp:image>
										<div style="width: 100%;" class="GridDiv" data-fixed="true">
											<asp:datagrid id="dg1" runat="server" data-fixed="true" Height="1px" Width="9em" BackColor="White" BorderStyle="None"
												BorderColor="#DEDFDE" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30" ShowHeader="False" ForeColor="Black">
												<Columns>
													<asp:TemplateColumn HeaderText="選">
														<ItemTemplate>
															<asp:TextBox id="H_FileName" runat="server" CssClass="hide"></asp:TextBox>
															<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
														</ItemTemplate>
													</asp:TemplateColumn>
													<asp:TemplateColumn HeaderText="鏈結欄位">
														<ItemTemplate>
															<asp:CheckBox id="cbSelect2" tabIndex="0" runat="server" CssClass="hide"></asp:CheckBox>
															<asp:HyperLink id="hlLink" tabIndex="0" runat="server"></asp:HyperLink>
														</ItemTemplate>
													</asp:TemplateColumn>
													<asp:TemplateColumn HeaderText="類型">
														<ItemTemplate>
															<asp:label id="lbFileType" runat="server" CssClass="hide"></asp:label>
														</ItemTemplate>
													</asp:TemplateColumn>
												</Columns>
											</asp:datagrid>
										</div>
									</div>
								</div>
								<div class="dTR" width: 100%;">
									<div class="dTD">
										<div id="divDownload" style="WIDTH:7em; padding: 5px; text-align: center">
											<asp:imagebutton id="btdownload" runat="server"  CssClass="" BackColor="#99CCFF" ImageUrl="../IMAGE/bt_07-04.gif"></asp:imagebutton>
										</div>
									</div>
								</div>
							</div>
						</DIV>
					<div class="dTD" style="border-width: 3px; border-style: solid;border-color:#6B696B;" bgColor="#a6e2ff" borderColorLight="#003333" border="1">
					
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;"  bgColor="#a7d4eb">
									<asp:label id="Label7" runat="server" Width="6em">
										類　　別：
									</asp:label>
								</div>
								<div class="dTD" bgColor="white" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width:35em; background-color: white;" colSpan="5">
									<asp:label id="lbCategory" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb">
									<asp:label id="Label2" runat="server" Width="6em">
										公告日期：
									</asp:label>
								</div>
								<div class="dTD" bgColor="white" style="width: 550px; border-width: 1px; border-style: solid; width:35em; border-color: #f0f0f0; background-color: white;">
									<asp:label id="lbPasteDate" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb">
									<asp:label id="Label4" runat="server" Width="6em">
										公告期限：
									</asp:label>
								</div>
								<div class="dTD" bgColor="white" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width:35em; background-color: white;">
									<asp:label id="lbExpireDate" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb">
									<asp:label id="Label1" runat="server" Width="6em">
										發布單位：
									</asp:label>
								</div>
								<div class="dTD" bgColor="white" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width:35em; background-color: white;">
									<asp:label id="lbPaster" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb">
									<asp:label id="Label6" runat="server" Width="6em">
										發布人員：
									</asp:label>
								</div>
								<div class="dTD" bgColor="white" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width:35em; background-color: white;">
									<asp:label id="lbPasterName" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb">
									<asp:label id="Label3" runat="server" Width="6em">
										來文機關：
									</asp:label>
								</div>
								<div class="dTD" bgColor="white" style="border-width: 1px; width:35em; border-style: solid; border-color: #f0f0f0; background-color: white;">
									<asp:label id="lbFromOrgName" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF"></asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb">
									<asp:label id="Label5" runat="server" Width="6em">
										主　　旨：
									</asp:label>
								</div>
								<div class="dTD" style="border-width: 1px; border-style: solid; width:35em; border-color: #f0f0f0; background-color: white;" colSpan="5">
									<asp:label id="lbSubject" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="border-width: 1px; border-style: solid; height:10em; border-color: #f0f0f0; width: 6em;" bgColor="#a7d4eb" vAlign="top">
									<asp:label id="lbContentField" runat="server" Width="6em">
										說　　明：
									</asp:label>
								</div>
								<div class="dTD" style="border-width: 1px; border-style: solid; width:35em; height:10em; border-color: #f0f0f0; background-color: white;" colSpan="5">
									<asp:label id="lbContent" oncontextmenu="fnContextMenu()" runat="server" Width="100%" Height="100%" BackColor="#FFFFFF">
									</asp:label>
								</div>
							</div>
							<div id="dlgASPXPage" style="display: none; width: 99%; height: 99%; padding: 0px;">
								<div class="pane" style="width: 101%; height: 101%; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch;">
									<iframe class="aspx_page_content" style="width: 99%; height: 99%;"></iframe>
								</div>
								<a class="closeBtn" style="display: none"></a>
							</div>
						</div>
					</div>
				</div>
			
		</FORM>
	</BODY>
</HTML>
