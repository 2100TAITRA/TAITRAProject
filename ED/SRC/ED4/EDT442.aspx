<%@ Page language="c#" Codebehind="EDT442.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT442" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EDT442 批示錄案追蹤解除作業</TITLE>
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
		<FORM id="EDT442" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable" >
				<div class="DivTable" id="MainTable" >
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" CssClass="KeyField" runat="server">公文文號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNo" tabIndex="1" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="10"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server">收創日期：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 4.5em">
							<asp:textbox id="txRcvDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label10" runat="server">結案日期：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 4.5em">
							<asp:textbox id="txCloseDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label3" runat="server">限辦日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDueDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label4" runat="server">主旨：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txSubject" TextMode="MultiLine" Width="24em" runat="server"></asp:TextBox>
						</div>
					</div>
                    <div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label5" runat="server">批示長官：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em">
                            <asp:textbox id="txRecorder" tabIndex="-1" runat="server" Width="8em"></asp:textbox>
						</div>
                        <div class="dTDTitle" style="WIDTH: 10em">
							<asp:label id="Label6" runat="server">批示限辦日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txRecordDueDate" tabIndex="3" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label7" runat="server">批示內容：</asp:label></div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:textbox id="txRecordDesc" TextMode="MultiLine" tabIndex="4" runat="server" Width="24em"></asp:textbox>
						</div>
					</div>
                    <DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label9" runat="server">執行功能：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbReRecord" runat="server" Checked="True" Text="新批示限辦日期：" GroupName="function"></asp:radiobutton>
                            <asp:TextBox id="txNewRecordDueDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox><br>
							<asp:radiobutton id="rbCancelRecord" runat="server" Text="解除批示錄案追蹤" GroupName="function"></asp:radiobutton>
						</DIV>
					</DIV>
                    <div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label8" runat="server" >辦理狀況：</asp:label></div>
						<div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 155px;" data-fixed="true">
                                <asp:datagrid id="dg1" runat="server" BackColor="White" ForeColor="Black"
                                    GridLines="Vertical" CellPadding="4" BorderWidth="1px" BorderColor="#DEDFDE" BorderStyle="None"
                                    AutoGenerateColumns="False" PageSize="3">
                                    <Columns>
                                         <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="辦理日期">
                                            <ItemTemplate>
                                                <asp:Label id="lbDetailDate" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="辦理情形">
                                            <ItemTemplate>
                                                <asp:Label id="lbDetailDesc" style="word-break: normal;" runat="server"></asp:Label>
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
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
