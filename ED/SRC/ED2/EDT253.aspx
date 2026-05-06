<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT253.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT253" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT253 紙本預排流程設定作業</title>
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
    <form id="EDT253" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:TextBox ID="H_ServicePath" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_DocPath" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_ClientPath" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_NowMsg" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_LastProg" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_LastDt" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable">
				<div class="dTR">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:label id="Label1" runat="server" CssClass="KeyField" width="6em" >公文文號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txDocNo" runat="server" CssClass="DisplayOnly" width="6em"></asp:textbox>
                        </div>
                    </div>
				</div>
			</div>
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTD" id="Dept" style="width: 11em">
						<div class="dTR" Style="Height: 6em">
							<div class="dTD" style="width: 6em">
								<asp:RadioButton ID="rbDeptFirst" runat="server" Text="決行人員" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton><br>
								<asp:RadioButton ID="rbDeptCowork" runat="server" Text="會辦單位" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton><br>
								<asp:RadioButton ID="rbDeptNow" runat="server" Text="本單位" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton><br>
								<asp:RadioButton ID="rbDeptOther" runat="server" Text="其他" GroupName="DeptType" onclick="DeptTypeChange()"></asp:RadioButton>
							</div>
							<div class="dTD" style="width: 4em" id="DivCoworkType">
								<asp:RadioButton ID="rbCoworkType1" runat="server" Text="順會" GroupName="CoworkType"></asp:RadioButton>
								<asp:RadioButton ID="rbCoworkType2" runat="server" Text="後會" GroupName="CoworkType"></asp:RadioButton>
								<asp:RadioButton ID="rbCoworkType3" runat="server" Text="分會" GroupName="CoworkType"></asp:RadioButton>
							</div>
						</div>
						<div class="dTR">
							<div class="DivTable DgSelectToolBar" id="GridTable2">
								<div class="GridDiv" style="overflow: auto; height: 20em" data-fixed="true">
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
						</div>
						<div class="dTR">
							<div class="DivTable DgSelectToolBar" id="GridTable">
								<asp:Button ID="btDgSelectAll" runat="server" Text="全選"></asp:Button>
								<asp:Button ID="btDgInverse" runat="server" Text="反選"></asp:Button>
								<asp:Button ID="btDgDelete" runat="server" Text="刪除"></asp:Button>
								<asp:Button ID="btDgMoveUp" runat="server" Text="上移"></asp:Button>
								<asp:Button ID="btDgMoveDown" runat="server" Text="下移"></asp:Button>
								<div class="GridDiv" style="overflow: auto; height:  20em" data-fixed="true">
									<table id="dg1" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
										style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
										<tbody>
											<tr>
												<td style="width: 1.5em">選</td>
												<td style="width: 20.5em">單位</td>
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
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
