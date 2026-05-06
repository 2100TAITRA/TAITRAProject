<%@ Page language="c#" Codebehind="EDM451.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDM451" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM451 交辦議案件辦理情形維護作業</TITLE>
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
		<FORM id="EDM451" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			    <asp:textbox id="h_txYM" runat="server" CssClass="hide"></asp:textbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">案件編號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbAssignNo" runat="server" CssClass="RequireField"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbDept" runat="server" ></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label3" runat="server">交辦指示：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbAssingInfo" runat="server" ></asp:label>
						</DIV>
					</DIV>
                    <div class="dTR">
                        <div class="dTDTitle" style="width:5.5em">
                            <asp:Label ID="Label4" runat="server">辦理情形：</asp:Label>
                        </div>
                        <div class="dTD">
							<asp:textbox id="txDesc" runat="server" TextMode="MultiLine">TEST4567</asp:textbox>
                        </div>
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
						            <asp:TextBox ID="H_txAssignNo" runat="server" CssClass="hide"></asp:TextBox>
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
                <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
