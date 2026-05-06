<%@ Page language="c#" Codebehind="EDT450.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT450" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT450 交辦議案件維護作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT450" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_MainOuId" runat="server" CssClass="hide"></asp:textbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label1" runat="server">案件編號：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 15.5em">
							<asp:textbox id="txAssignNo" runat="server" Width="8em" MaxLength="15"></asp:textbox>
							<asp:label id="Label14" runat="server">(自動編號)</asp:label>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label6" runat="server" CssClass="RequireField">交辦日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAssignDate" runat="server" CssClass="DatePicker RequireField" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAssignTime" runat="server" CssClass="RequireField" Width="2.5em" MaxLength="4"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">來文機關：</asp:label>
						</DIV>
						<DIV class="dTD"  style="WIDTH: 15.5em">
							<asp:textbox id="txFromOrg" runat="server" MaxLength="30" Width="6.5em" CssClass="RequireField"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label7" runat="server">來文文號：</asp:label>
						</DIV>
						<DIV class="dTD"  style="WIDTH: 10.5em">
							<asp:textbox id="txFromNo" runat="server" MaxLength="20" Width="6.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label3" runat="server" CssClass="RequireField">來文事由：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txFromReason" runat="server" TextMode="MultiLine" Width="22.5em" CssClass="RequireField"></asp:textbox>
						</DIV>
					</DIV>
                    <div class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label4" runat="server">開會日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txMeetingDate" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txMeetingTime" runat="server" Width="2.5em" MaxLength="4"></asp:textbox>
						</DIV>
                    </div>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label8" runat="server" CssClass="RequireField">交辦指示：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAssignReason" runat="server" TextMode="MultiLine" Width="22.5em" CssClass="RequireField"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label9" runat="server" CssClass="RequireField">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlDept1" runat="server" Width="7em" CssClass="RequireField"></asp:DropDownList>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDept1" runat="server" Width="4.5em" CssClass="RequireField"></asp:textbox>
						</DIV>
						<DIV class="dTD">
						    <asp:Button ID="btDept1" runat="server" Text="辦理情形"></asp:Button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label10" runat="server" CssClass="RequireField">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlDept2" runat="server" Width="7em" CssClass="RequireField"></asp:DropDownList>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDept2" runat="server" Width="4.5em" CssClass="RequireField"></asp:textbox>
						</DIV>
						<DIV class="dTD">
						    <asp:Button ID="btDept2" runat="server" Text="辦理情形"></asp:Button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label11" runat="server" CssClass="RequireField">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlDept3" runat="server" Width="7em" CssClass="RequireField"></asp:DropDownList>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDept3" runat="server" Width="4.5em" CssClass="RequireField"></asp:textbox>
						</DIV>
						<DIV class="dTD">
						    <asp:Button ID="btDept3" runat="server" Text="辦理情形"></asp:Button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label12" runat="server">備註：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txRemark" runat="server" Width="22.5em" TextMode="MultiLine"></asp:textbox>
						</DIV>
					</DIV>
                    <div class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label13" runat="server">結案日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txCloseDate" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width:5.5em">
                            <asp:Label ID="Label5" runat="server">附件：</asp:Label>
                        </div>
                        <div class="dTD">          
				            <div class="dTR">
					            <div class="dTD">
						            <asp:Button ID="btAddFile" runat="server" Text="加入附件"></asp:Button>
						            <input type="file" id="fileInput" style="display: none" onchange="fnAddFile()" />
						            <asp:TextBox ID="H_AttachFromDB" runat="server" CssClass="hide"></asp:TextBox>
						            <asp:TextBox ID="H_AttachInf" runat="server" CssClass="hide"></asp:TextBox>
						            <asp:TextBox ID="H_AttachDel" runat="server" CssClass="hide"></asp:TextBox>
						            <asp:TextBox ID="H_WS" runat="server" CssClass="hide"></asp:TextBox>
						            <asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
					            </div>
				            </div>
				            <div class="dTR">
					            <div class="GridDiv" style="height: 140px;">
						            <asp:DataGrid ID="dgAttach" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
							            <Columns>
								            <asp:TemplateColumn HeaderText="序">
									            <ItemTemplate>
										            <asp:Label ID="lbAttSeq" runat="server" CssClass="InputFieldLabel"></asp:Label>
									            </ItemTemplate>
								            </asp:TemplateColumn>
								            <asp:TemplateColumn HeaderText="檔名">
									            <ItemTemplate>
										            <asp:Label ID="lbFileName" runat="server" CssClass="InputFieldLabel"></asp:Label>
										            <asp:Label ID="lbFilePath" runat="server" CssClass="hidden"></asp:Label>
										            <asp:Label ID="lbFileSize" runat="server" CssClass="hidden"></asp:Label>
										            <asp:Label ID="lbFileDesc" runat="server" CssClass="InputFieldLabel"></asp:Label>
										            <asp:Label ID="lbFileComeFrom" runat="server" CssClass="hidden"></asp:Label>
										            <asp:Label ID="lbFileDraftSeq" runat="server" CssClass="hidden"></asp:Label>
									            </ItemTemplate>
								            </asp:TemplateColumn>
								            <asp:TemplateColumn HeaderText="附件描述">
									            <ItemTemplate>
										            <asp:TextBox ID="txFileDesc" runat="server" Visible="True"></asp:TextBox>
									            </ItemTemplate>
								            </asp:TemplateColumn>
								            <asp:TemplateColumn HeaderText="執行">
									            <ItemTemplate>
										            <asp:Button ID="btOpenFile" runat="server" Text="開啟"></asp:Button>
										            <asp:Button ID="btDelete" runat="server" Text="刪除"></asp:Button>
									            </ItemTemplate>
								            </asp:TemplateColumn>
							              </Columns>
						                </asp:DataGrid>
					                </div>
					            </div>
                            </div>
                        </div>
				    </DIV>
			    </DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
