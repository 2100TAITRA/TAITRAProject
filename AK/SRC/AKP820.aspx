<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKP820.aspx.cs" AutoEventWireup="false" Inherits="AK.AKP820" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKP820 檔管稽催作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKP820" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<fieldset style="width: 19em" >
                            <legend style="width: 5em;">稽催對象</legend>
                            <div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:CheckBox ID="cbInspFile" TabIndex="10" runat="server" Checked="True" Text="逾期未歸檔稽催" Width="9.5em"></asp:CheckBox>
                                    <asp:CheckBox Style="z-index: 0" ID="cbWithSendOU" runat="server" Text="含歸檔單位"></asp:CheckBox>
                                </div>
                            </div>
								<div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:Label ID="Label2" runat="server" Width="6.5em">　逾期天數：</asp:Label>
                                    <asp:TextBox ID="txInspFile" TabIndex="20" runat="server" CssClass="InputFieldNumeric" Width="3.5em" MaxLength="3">1</asp:TextBox>
                                </div>
                            </div>
								 <div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:CheckBox ID="cbInspRtn" TabIndex="30" runat="server" Checked="True" Text="調案逾期未歸還稽催"></asp:CheckBox>
                                </div>
                            </div>
								<div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:Label ID="Label1" runat="server" Width="6.5em">　逾期天數：</asp:Label>
                                    <asp:TextBox ID="txInspRtn" TabIndex="40" runat="server" CssClass="InputFieldNumeric" Width="3.5em" MaxLength="3">1</asp:TextBox>
                                </div>
                            </div>
							<div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:CheckBox ID="cbNotifyRtn" runat="server" Checked="True" Text="調案公文急用催還通知"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:Label ID="Label4" runat="server" Width="6.5em">　公文文號：</asp:Label>
                                    <asp:TextBox ID="txNotifyDocNo" runat="server" Width="5.5em"></asp:TextBox>
                                </div>
                            </div>
								<div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:CheckBox ID="cbInspAtt" TabIndex="30" runat="server" Text="附件逾期未歸檔稽催" Checked="True"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD" style="width: 15em;">
                                    <asp:Label ID="Label3" runat="server" Width="6.5em">　逾期天數：</asp:Label>
                                    <asp:TextBox ID="txInspAtt" TabIndex="40" runat="server" CssClass="InputFieldNumeric" Width="3.5em" MaxLength="3">1</asp:TextBox>
                                </div>
                            </div>
							</fieldset>
                    	</div>
                	</div>
					<DIV class="dTR">
						<DIV class="dTD">
							<FIELDSET style="WIDTH: 15em; HEIGHT: 43px">
								<LEGEND style="WIDTH: 5em;">稽催方式</LEGEND>
								<DIV class="dTR">
									<DIV class="dTD" style="width: 15em; ">
										<asp:checkbox id="cbEmail" tabIndex="50" runat="server" Text="以Email傳送稽催通知" Width="231px"></asp:checkbox>
									</DIV>
								</DIV>
							</FIELDSET>
						</DIV>
					</DIV>
					<DIV class="hide">
						<DIV style="width: 16em;text-align:center; ">
							<asp:button id="btRun" tabIndex="60" runat="server" Text="執行" CssClass="hide"></asp:button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:button id="btExit" tabIndex="70" runat="server" Text="離開" CssClass="hide"></asp:button>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="GridDiv" style="DISPLAY: none;HEIGHT: 195px;">
								<asp:datagrid id="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical"></asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:listbox id="lbReturnValue" runat="server" CssClass="hidden"></asp:listbox>
			<asp:customvalidator id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
	            <asp:Button ID="btPreview" runat="server" Text="預覽待稽催公文清單(P)" DefaultStyle="newmode:block;modifymode:block;" AccessKey="P" Title="預覽待稽催公文清單(ALT+P)" />
	            <asp:Button ID="btExcel" runat="server" Text="匯出待稽催公文Excel(O)" DefaultStyle="newmode:block;modifymode:block;" AccessKey="O" Title ="匯出待稽催公文Excel(ALT+O)" />
	            <asp:Button ID="btExecute" runat="server" Text="執行(S)" DefaultStyle="newmode:block;modifymode:block;" AccessKey="S" Title="執行(ALT+S)" />
        	</asp:Panel>
			
		</form>
	</body>
</HTML>
