<%@ Page Language="c#" CodeBehind="EAT702.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAT702" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>EAT702 年度清理降解密登錄作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
	<form id="EAT702" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EALIB/GenericBanner.htm"-->
		<div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
			id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="empUserId" runat="server" Width="9px" CssClass="hide"></asp:TextBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div id="MainTable" class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label2" runat="server" CssClass="RequireField">清理批號：</asp:Label>
					</div>
					<div class="dTD" style="width: 6.5em">
						<asp:TextBox ID="txPlanNo" class="RequireField" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
						<asp:ImageButton ID="btHelp" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
					</div>
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="labeldesc" runat="server">計畫說明：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txPlanDesc" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
					<div class="dTD" style="width: 6.5em">&nbsp;&nbsp;</div>
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label14" runat="server">檔號範圍：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txFileRange" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<fieldset style="width: 40em;">
					<legend>資料範圍</legend>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label10" runat="server">文(編)號：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txDocNo" runat="server" MaxLength="15"></asp:TextBox>
							<asp:TextBox ID="H_OrgNo" CssClass="hide" runat="server"></asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:Button ID="btAdd3" runat="server" Text="加入"></asp:Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:Label ID="Label9" runat="server">批號下所有公文</asp:Label>&nbsp;
							<asp:Button ID="btAdd2" runat="server" Text="加入"></asp:Button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label6" runat="server">檔號：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txFileYearS" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
                            <asp:TextBox ID="txFileClsS" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
                            <asp:TextBox ID="txFileCaseS" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
                            <asp:TextBox ID="txFileVolS" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
                            <asp:TextBox ID="txFileSeqS" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
						<div class="dTD">
							<asp:TextBox ID="txFileYearE" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
                            <asp:TextBox ID="txFileClsE" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
                            <asp:TextBox ID="txFileCaseE" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
                            <asp:TextBox ID="txFileVolE" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
                            <asp:TextBox ID="txFileSeqE" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label Style="z-index: 0" ID="Label20" runat="server">庫房別：</asp:Label>
						</div>
						<div class="dTD">
							<asp:DropDownList Style="z-index: 0" ID="ddlStoreNo" runat="server" Width="8.5em"></asp:DropDownList>
							<asp:Button ID="btAdd5" runat="server" Text="加入" Style="z-index: 0"></asp:Button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label18" runat="server">櫥位號：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txStockNoS" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
							<asp:Label ID="Label19" runat="server">－</asp:Label>
							<asp:TextBox ID="txStockNoE" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
							<asp:Button ID="btAdd_Stock" runat="server" Text="加入"></asp:Button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label3" TabIndex="-1" runat="server">承辦單位：</asp:Label>
						</div>
						<div class="dTD" style="width: 14.5em">
							<cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="8.5em" Rows="10"></cc1:ComboBox>
						</div>
						<div class="dTD" style="width: 14.5em">
							<asp:Label ID="Label4" TabIndex="-1" runat="server">承辦人：</asp:Label>
							<cc1:ComboBox ID="dlUser" runat="server" CssClass="comboBox" Width="7.5em" Rows="10"></cc1:ComboBox>
						</div>
						<div class="dTD">
							<asp:Button ID="btAdd1" runat="server" Text="加入"></asp:Button>
						</div>
					</div>
				</fieldset>
				<fieldset style="width: 40em;">
					<legend>降解密核定資訊</legend>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label12" TabIndex="-1" runat="server">新密等：</asp:Label>
						</div>
						<div class="dTD">
							<asp:DropDownList ID="dlSec" runat="server">
								<asp:ListItem></asp:ListItem>
							</asp:DropDownList>&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:Label ID="Label8" TabIndex="-1" runat="server">保密期限：</asp:Label>
							<asp:TextBox ID="txSecret" runat="server" Width="4em" MaxLength="7"></asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:Label ID="Label11" TabIndex="-1" runat="server">應用限制：</asp:Label>
							<asp:DropDownList ID="dlApplyLimit" runat="server">
								<asp:ListItem></asp:ListItem>
							</asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label1" TabIndex="-1" runat="server">解密條件：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txCond" runat="server" Width="22.5em" MaxLength="40"></asp:TextBox>&nbsp;
							<asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="lbComment" TabIndex="-1" runat="server">檢討意見：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txComment" runat="server" Width="22.5em" MaxLength="40"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label13" TabIndex="-1" runat="server">審核結果：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txInspect" runat="server" Width="11.5em" MaxLength="40"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label7" TabIndex="-1" runat="server">主旨：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txFromSubject" runat="server" Width="17.5em" MaxLength="200"></asp:TextBox>
							<asp:Label ID="Label16" TabIndex="-1" runat="server" CssClass="KeyField" EnableViewState="False">※若為空白表示不修改</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:Label ID="Label15" TabIndex="-1" runat="server">通知機關：</asp:Label>
						</div>
						<div class="dTD">
							<asp:TextBox ID="txSourceOrgName" runat="server" Width="15.5em" MaxLength="60"></asp:TextBox>
							<asp:ImageButton ID="ibtSourceOrgNo" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示檔案產生機關"></asp:ImageButton>
							<asp:TextBox ID="txOrgNo" runat="server" CssClass="hide"></asp:TextBox>
							<asp:TextBox ID="txTempOrg" runat="server" CssClass="hide"></asp:TextBox>
							<asp:Label ID="Label17" TabIndex="-1" runat="server" CssClass="KeyField" EnableViewState="False">※若為空白表示不修改</asp:Label>
						</div>
					</div>
				</fieldset>
				<asp:TextBox ID="txOldPlanNo" runat="server" Width="1em" CssClass="hidden"></asp:TextBox>
			</div>
		</div>
		<div id="GridTable" class="DivTable">
			<div class="dTR">
				<div class="dTD" style="width: 14.5em">
					<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
						<asp:Button ID="btSelectAll" runat="server" Text="全選" />
						<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
						<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
					</asp:Panel>
				</div>
				<div class="dTD">
					<asp:RadioButton ID="rb1" runat="server" Text="設定" Checked="True" GroupName="Type1"></asp:RadioButton>
					<asp:RadioButton ID="rb2" runat="server" Text="更新" GroupName="Type1"></asp:RadioButton>
					<asp:RadioButton ID="rb3" runat="server" Text="刪除" GroupName="Type1"></asp:RadioButton>
				</div>
			</div>
			<div class="GridDiv">
				<asp:DataGrid ID="dg1" runat="server" PageSize="20" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
					<Columns>
						<asp:TemplateColumn HeaderText="序">
							<HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="設定">
							<HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="更新">
							<HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:CheckBox ID="cbSelect2" runat="server"></asp:CheckBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="刪除">
							<HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:CheckBox ID="cbSelect3" runat="server"></asp:CheckBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="文(編)號">
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="txDocNo1" runat="server" Width="5.5em" CssClass="PopUp"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="檔號">
							<ItemStyle Wrap="False" HorizontalAlign="Left"></ItemStyle>
							<ItemTemplate>
								<asp:Label ID="lbFileNo" runat="server" Width="9em" CssClass="PopUp"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="主旨<br>新主旨">
							<HeaderStyle HorizontalAlign="Center"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbFromSubject" runat="server" CssClass="PopUp" Width="9.5em"></asp:TextBox><br>
								<asp:TextBox ID="lbNewSubject" runat="server" CssClass="PopUp" Width="9.5em" ForeColor="#000066"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="原密等">
							<HeaderStyle HorizontalAlign="Center" Width="3.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbOldSec" runat="server" Width="3.5em" CssClass="PopUp"></asp:TextBox>
								<asp:TextBox ID="H_txOldSec" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="新密等">
							<HeaderStyle HorizontalAlign="Center" Width="3.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbNewSec" runat="server" Width="3.5em" CssClass="PopUp"></asp:TextBox>
								<asp:TextBox ID="H_txNewSec" runat="server" Width="3.5em" CssClass="hide"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="保密期限">
							<HeaderStyle HorizontalAlign="Center" Width="4.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbSecDate" runat="server" Width="2em" CssClass="PopUp"></asp:TextBox>
								<asp:TextBox ID="H_txExtRmvSec_Date" runat="server" Width="3.5em"  CssClass="hide" ></asp:TextBox><!--應降解密日期-->
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="應用限制">
							<HeaderStyle HorizontalAlign="Center" Width="4.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbApplyLimit" runat="server" Width="2em" CssClass="PopUp"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="解密條件">
							<HeaderStyle HorizontalAlign="Center" Width="4.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbCond" runat="server" Width="2em" CssClass="PopUp"></asp:TextBox>
								<asp:TextBox ID="lbOCond" runat="server" CssClass="hidden"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="檢討意見">
							<HeaderStyle HorizontalAlign="Center" Width="4.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbComment" runat="server" Width="5em" CssClass="PopUp"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="審核結果">
							<HeaderStyle HorizontalAlign="Center" Width="4.5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbInspect" runat="server" Width="2em" CssClass="PopUp"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="通知機關">
							<HeaderStyle HorizontalAlign="Center" Width="5em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:TextBox ID="lbFromOrg" runat="server" Width="5em" CssClass="PopUp"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="庫房別">
							<HeaderStyle Width="6em"></HeaderStyle>
							<ItemStyle HorizontalAlign="Center"></ItemStyle>
							<ItemTemplate>
								<asp:Label ID="lbSTORE_NAME" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
					</Columns>
				</asp:DataGrid>
			</div>
		</div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="更新註記(S)" AccessKey="S" Title="更新註記(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除註記(D)" AccessKey="D" Title="刪除註記(ALT+D)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btSearch" runat="server" Text="查詢註記現況(C)" AccessKey="C" Title="查詢註記現況(ALT+C)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btPreview" runat="server" Text="意見表列印(L)" AccessKey="L" Title="意見表列印(ALT+L)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPrint" runat="server" Text="紀錄單列印(P)" AccessKey="P" Title="紀錄單列印(ALT+P)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btFinish" runat="server" Text="完成降解密(X)" AccessKey="X" Title="完成降解密(ALT+X)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCheck" runat="server" Text="刪除通知" CssClass="hide" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
