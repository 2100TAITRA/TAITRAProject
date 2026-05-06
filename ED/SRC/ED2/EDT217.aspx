<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT217.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT217" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT217 預排流程設定作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="../../../MS/CSS/RD-acinput.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT217" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:TextBox ID="txMode" TabIndex="0" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTD" id="Dept" style="width: 11em">
					<div class="dTR" Style="Height: 6em">
						<div class="dTD" style="width: 6em">
							<asp:RadioButton ID="rbDeptFirst" runat="server" Text="決行人員" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton><br>
							<asp:RadioButton ID="rbDeptCowork" runat="server" Text="會辦單位" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton><br>
							<asp:RadioButton ID="rbDeptNow" runat="server" Text="本單位" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton><br>
							<asp:RadioButton ID="rbDeptOther" runat="server" Text="其他" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton>
						</div>
						<div class="dTD" style="width: 5em" id="DivCoworkType">
							<asp:RadioButton ID="rbCoworkType1" runat="server" Text="順會" GroupName="CoworkType"></asp:RadioButton><br>
							<asp:RadioButton ID="rbCoworkType2" runat="server" Text="後會" GroupName="CoworkType"></asp:RadioButton><br>
							<asp:RadioButton ID="rbCoworkType3" runat="server" Text="分會" GroupName="CoworkType"></asp:RadioButton>
						</div>
						<div class="dTD" style="width: 5em" id="DivCoworkTypeInside">
							<asp:RadioButton ID="rbCoworkTypeInside1" runat="server" Text="內會" GroupName="CoworkTypeInside"></asp:RadioButton><br>
							<asp:RadioButton ID="rbCoworkTypeInside2" runat="server" Text="內分會" GroupName="CoworkTypeInside"></asp:RadioButton>
						</div>
				    </div>
					<div class="dTR">
						<div class="DivTable DgSelectToolBar" id="GridTable2">
							<div class="GridDiv" style="overflow: auto; height: 218px" data-fixed="true">
								<table id="dgDept" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
									style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
									<tbody>
										<tr>
											<td style="width: 1.5em">選</td>
											<td style="width: 10.5em">對象</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
                <div class="dTD" style="width: 3em">
					<div class="dTR" Style="Height: 10em">
					</div>
					<div class="dTR">
						<asp:Button ID="btAdd" runat="server" Text="→"></asp:Button>
					</div>
				</div>
                <div class="dTD" id="Flow">
					<div class="dTR" Style="Height: 4.5em">
						<div class="hide">
							<div id="CoworkHide1">
								<div class="dTR">
									<div class="dTDTitle" style="width: 13em">
										<asp:Label ID="Label4" runat="server">傳送對象：</asp:Label>
									</div>
									<div class="dTD">
										<asp:RadioButton ID="rbMode1" runat="server" Text="選單" GroupName="ModeType" onclick="fnModeChange()"></asp:RadioButton>
										<asp:RadioButton ID="rbMode2" runat="server" Text="關鍵字搜尋" GroupName="ModeType" onclick="fnModeChange()"></asp:RadioButton>
									</div>
								</div>
							</div>
						</div>
						<div id="Mode1" class="hide">
							<div class="dTDTitle" style="width: 13em">
								<asp:Label ID="Label2" runat="server">單位：</asp:Label>
							</div>
							<div class="dTD">
								<asp:DropDownList ID="dlDept" TabIndex="0" runat="server" Width="10em"></asp:DropDownList>
								<asp:DropDownList ID="dlSect" TabIndex="0" runat="server" Width="10em"></asp:DropDownList>
							</div>
							<div class="dTDTitle" style="width: 4em">
								<asp:Label ID="Label6" runat="server">人員：</asp:Label>
							</div>
							<div class="dTD">
								<asp:DropDownList ID="dlUser" TabIndex="0" runat="server" Width="10em"></asp:DropDownList>
							</div>
						</div>
						<div id="Mode2" class="dTR" style="display: none">
							<div class="dTDTitle" style="width: 13em">
								<asp:Label ID="Label7" runat="server">關鍵字：</asp:Label>
							</div>
							<div class="dTD">
								<asp:textbox id="txNewPoint" tabIndex="0" runat="server" Width="34em"></asp:textbox>
							</div>
						</div>
						<div class="hide">
							<div class="dTDTitle" style="width: 13em">&nbsp;
							</div>
							<div id="CoworkHide2">
								<div class="dTD">
									<asp:RadioButton ID="rb1" runat="server" Text="順會" GroupName="CoworkType" onClick="CoworkTypeChange()"></asp:RadioButton>
									<asp:RadioButton ID="rb2" runat="server" Text="後會" GroupName="CoworkType" onClick="CoworkTypeChange()"></asp:RadioButton>
									<asp:RadioButton ID="rb3" runat="server" Text="內會" GroupName="CoworkType" onClick="CoworkTypeChange()"></asp:RadioButton>
								</div>
							</div>
							<div class="hide">
								<asp:Button ID="btAdd2" runat="server" Text="新增單筆流程"></asp:Button>
							</div>
						</div>
						<div id="CoworkHide3">
							<div class="hide">
								<div class="dTR">
									<div class="dTDTitle" style="width: 13em">
										<asp:Label ID="Label3" runat="server">分會設定：</asp:Label>
									</div>
									<div class="dTD DgSelectToolBar">
										<asp:Button ID="btAddCowork" runat="server" Text="新增分會流程"></asp:Button>
									</div>
								</div>
							</div>
							<div class="dTR">
								<div class="dTDTitle" style="width: 13em">
									<asp:Label ID="Label5" runat="server">機關共用流程：</asp:Label>
								</div>
								<div class="dTD DgSelectToolBar">
									<asp:DropDownList ID="ddlWorkFlow" TabIndex="0" runat="server" Width="10em"></asp:DropDownList>
									<asp:Button ID="btAddWorkFlow" runat="server" Text="新增"></asp:Button>
								</div>
							</div>
							<div id="divHidePersonal" class="dTR" style="display: none">
								<div class="dTDTitle" style="width: 13em">
									<asp:Label ID="Label1" runat="server">個人化預排流程：</asp:Label>
								</div>
								<div class="dTD DgSelectToolBar">
									<asp:DropDownList ID="dlPersonalFlowSet" TabIndex="0" runat="server" Width="10em"></asp:DropDownList>
									<asp:Button ID="btChangePersonalFlowSet" runat="server" Text="替換預排流程"></asp:Button>
								</div>
							</div>
						</div>
					</div>
					<div class="dTR">
						<div class="DivTable DgSelectToolBar" id="GridTable">
							<asp:Button ID="btDgSelectAll" runat="server" Text="全選"></asp:Button>
							<asp:Button ID="btDgInverse" runat="server" Text="反選"></asp:Button>
							<asp:Button ID="btDgDelete" runat="server" Text="刪除"></asp:Button>
							<asp:Button ID="btDgMoveUp" runat="server" Text="上移"></asp:Button>
							<asp:Button ID="btDgMoveDown" runat="server" Text="下移"></asp:Button>
							<div class="GridDiv" style="overflow: auto; height: 218px" data-fixed="true">
								<table id="dg1" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
									style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
									<tbody>
										<tr>
											<td style="width: 1.5em">選</td>
											<td style="width: 20.5em">單位</td>
											<td style="width: 6.5em">角色</td>
											<td style="width: 5em">人員</td>
											<td style="width: 7em">異動別</td>
											<td style="width: 7em">功能</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="儲存" AccessKey="S" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:block;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
        <div id="WWKF_COWORK_DIV" class="ui-slide-pane-right" style="display: none;">
            <iframe id="WWKF-CoworkPage" style="width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; z-index: 0"></iframe>
            <a id="Dlg_NewThread_close_btn" style="display: none"></a>
            <a id="Dlg_ModifyThread_close_btn" style="display: none"></a>
        </div>
    </form>
</body>
</html>
