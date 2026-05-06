<%@ Page Language="c#" CodeBehind="EDT221.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT221" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>EDT221 公文展期批次核可作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
</head>
<body ms_positioning="GridLayout">
	<form id="EDT221" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EDLIB/GenericBanner.htm"-->
		<div style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px"
			id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
		</div>
		<div class="DivBaseTable">
			<div class="DivTable" id="MTable1">
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="Label3" runat="server">審核意見：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlPhraseNo" runat="server"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
					<div class="dTD">
						<asp:TextBox ID="txAuditMsg" TabIndex="0" runat="server" Width="514px" Font-Names="細明體" Font-Size="Small"
							CssClass="InputFieldText" TextMode="MultiLine" MaxLength="200" Height="40px"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 9.5em">
						<asp:Label ID="lbDespMain" runat="server" Width="85px" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">說明：</asp:Label>
					</div>
					<div class="dTD">
						<asp:Label ID="lbDesp" runat="server" Width="508px" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel" Height="8px"></asp:Label>
					</div>
				</div>
			</div>
			<div class="DivTable">
				<div class="dTR">
					<div class="dTD DgSelectToolBar" id="tbSelect" style="display: none">
						<asp:Button ID="btSelectAll" runat="server" Text="全部選取"></asp:Button>
						<asp:Button ID="btSelectInverse" runat="server" Text="反向選取"></asp:Button>
						<asp:Button ID="btSelectClear" runat="server" Text="清除選取"></asp:Button>
						<asp:RadioButton ID="rbDocNo" runat="server" Font-Names="新細明體" Font-Size="Small" CssClass="InputFieldLabel"
							GroupName="gSort" Checked="True" Text="依文號"></asp:RadioButton><asp:RadioButton ID="rbTxDate" runat="server" Font-Names="新細明體" Font-Size="Small" CssClass="InputFieldLabel"
								GroupName="gSort" Text="依申請日期"></asp:RadioButton><asp:Button ID="btSort" runat="server" Font-Names="新細明體" Font-Size="Small" Height="25px" Text="重新排序"></asp:Button>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD">
						<div class="GridDiv" style="height: 390px">
							<asp:DataGrid ID="dg1" Style="display: none" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbSEQ_NO" runat="server" Font-Size="Small" Font-Names="細明體"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="選">
										<ItemTemplate>
											<asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="申請單號&lt;BR&gt;公文文號">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
										<ItemTemplate>
											<asp:HyperLink ID="hlExtNo" runat="server" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel"></asp:HyperLink><br>
											<asp:Label Style="z-index: 0" ID="lbDocNo" runat="server" Font-Names="細明體" Font-Size="Small"
												CssClass="InputFieldLabel"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="主旨">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemTemplate>
											<asp:Label Style="z-index: 0" ID="lbSubject" runat="server" Font-Names="細明體" Font-Size="Small"
												CssClass="InputFieldLabel"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="承辦單位&lt;BR&gt;承 辦 人">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
										<ItemTemplate>
											<asp:Label Style="z-index: 0" ID="lbDeptNM" runat="server" Font-Names="細明體" Font-Size="Small"
												CssClass="InputFieldLabel"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbRpsUser" runat="server" Font-Names="細明體" Font-Size="Small"
												CssClass="InputFieldLabel"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="收創文日期&lt;BR&gt;申 請 日 期">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
										<ItemTemplate>
											<asp:Label Style="z-index: 0" ID="lbRcvDate" runat="server" CssClass="InputFieldLabel" Font-Size="Small"
												Font-Names="細明體"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbExtDate" runat="server" CssClass="InputFieldLabel" Font-Size="Small"
												Font-Names="細明體"></asp:Label><br>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="辦　理　時　限&lt;BR&gt;申請後限辦日期">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
										<ItemTemplate>
											<asp:Label Style="z-index: 0" ID="lbLimitDate" runat="server" CssClass="InputFieldLabel" Font-Size="Small"
												Font-Names="細明體"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbDueDate" runat="server" CssClass="InputFieldLabel" Font-Size="Small"
												Font-Names="細明體"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="申請展期天數&lt;BR&gt;已  展  期  天  數">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
										<ItemTemplate>
											<asp:Label Style="z-index: 0" ID="lbApplyDays" runat="server" Font-Names="細明體" Font-Size="Small"
												CssClass="InputFieldLabel"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbExtDay" runat="server" Font-Names="細明體" Font-Size="Small"
												CssClass="InputFieldLabel"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="速　　　　別&lt;BR&gt;申請展延次數">
										<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
										<ItemTemplate>
											<asp:Label Style="z-index: 0" ID="lbSpdNM" runat="server" CssClass="InputFieldLabel" Font-Size="Small"
												Font-Names="細明體"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbExtTimes" runat="server" CssClass="InputFieldLabel" Font-Size="Small"
												Font-Names="細明體"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="">
										<HeaderStyle CssClass="hide"></HeaderStyle>
										<ItemStyle CssClass="hide"></ItemStyle>
										<ItemTemplate>
											<asp:Label ID="lbNmMsgId" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbAppExtDate" runat="server" ></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbAlarmDate" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbPDueDate" runat="server" CssClass="hide"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbAppNmMsgId" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbApplyOwnOu" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbApplyOwnUser" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbApplyOwnRole" runat="server" CssClass="hide"></asp:Label><br>
											<asp:Label Style="z-index: 0" ID="lbOwnOuId" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbOwnUser" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbOwnRole" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbCanCommit" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbODueDay" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbUpdateProg" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbUpdateTime" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbFlowNo" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbExtFlowType" runat="server" CssClass="hide"></asp:Label>
											<asp:Label Style="z-index: 0" ID="lbSTEP" runat="server" CssClass="hide"></asp:Label>
											<asp:TextBox ID="H_MAXROLE" runat="server" CssClass="hide"></asp:TextBox>
											<asp:TextBox ID="H_Enabled" runat="server" CssClass="hide"></asp:TextBox>
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
			<asp:Button ID="btCommit" runat="server" Text="核可(G)" AccessKey="G" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btBack" runat="server" Text="退回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
