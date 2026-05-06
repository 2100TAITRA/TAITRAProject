<%@ Page language="c#" Codebehind="EDR120_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR120_VAC" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR120_VAC 送發清單列印作業</TITLE>
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
		<FORM id="EDR120_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 6em;VISIBILITY: hidden">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="Basediv">
				<div class="DivTable" id="Maindiv">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label1" runat="server" >送發日期：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 15em">
							<asp:textbox id="txSendDateS" tabIndex="0" runat="server" Width="4.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="Label4" runat="server">～</asp:label>
							<asp:textbox id="txSendDateE" tabIndex="0" runat="server" Width="4.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label6" runat="server">簽核類型：</asp:label>
						</div>
						<div class="dTD">
							<asp:RadioButton id="rbSignTypeAll" runat="server" Text="全部" Checked="True" GroupName="SignGroup"></asp:RadioButton>
							<asp:RadioButton id="rbSignTypeP" runat="server" Text="紙本簽核" GroupName="SignGroup"></asp:RadioButton>
							<asp:RadioButton id="rbSignTypeE" runat="server" Text="線上簽核" GroupName="SignGroup"></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server">密等：</asp:label>
						</div>
						<div class="dTD">
							<asp:RadioButton id="rbSecAll" runat="server" Text="全部" Checked="True" GroupName="SecGroup"></asp:RadioButton>
							<asp:RadioButton id="rbNoSec" runat="server" Text="普通" GroupName="SecGroup"></asp:RadioButton>
							<asp:RadioButton id="rbSec" runat="server" Text="機密等級公文" GroupName="SecGroup"></asp:RadioButton>
						</div>
					</div>
				</div>
				<div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
						<asp:Panel runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btAll" runat="server" Text="全部選取"></asp:Button>
							<asp:Button ID="btClear" runat="server" Text="清除選取"></asp:Button>
							<asp:Button ID="btChange" runat="server" Text="反向選取"></asp:Button>
						</asp:Panel>
                        <div class="GridDiv" style="height: 280px; overflow: auto" id="DIV1">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" runat="server" Checked="True"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
											<asp:textbox id="txSDocList" tabIndex="0" runat="server" CssClass="hide" ></asp:textbox>
											<asp:textbox id="txDraftCnt" tabIndex="0" runat="server" CssClass="hide" ></asp:textbox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="送發日期">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbTxTime" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server" Width="15.5em" ReadOnly="True"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="密等">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSecName" runat="server"></asp:Label>
											<asp:textbox id="txSecNo" tabIndex="0" runat="server" CssClass="hide" ></asp:textbox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦單位">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="承辦人">
                                        <ItemTemplate>
                                            <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="多稿">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbDarftCnt" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="併號">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbIsCom" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="受文者數量">
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbReceive" runat="server"></asp:Label>
											<asp:Label ID="Label3" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
