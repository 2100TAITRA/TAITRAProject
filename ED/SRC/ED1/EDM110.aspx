<%@ Page language="c#" Codebehind="EDM110.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDM110" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM110 公文流程文件盒明細維護作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
        <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDM110" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:textbox id="RoleCode" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="RoleName" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="SectCode" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="HaveSubUnit" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="OwnSectOpenStats" tabIndex="-1" runat="server" Width="20px"></asp:textbox>
				<asp:textbox id="FlowType" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label1" runat="server" CssClass="KeyField">簽核類型：</asp:label></div>
                        <div class="dTD" style="WIDTH: 11em">
                            <asp:dropdownlist id="dlSignType" runat="server">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                                <asp:ListItem Value="E">線上簽核</asp:ListItem>
                            </asp:dropdownlist></div>
                        <div class="dTD">
                            <asp:checkbox id="cbIsSourceOnly" runat="server" Text="僅維護目前所屬機關"></asp:checkbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label2" runat="server" CssClass="KeyField">主文件盒：</asp:label></div>
                        <div class="dTD" style="WIDTH: 13.5em">
                            <asp:textbox id="txFolder" tabIndex="0" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="10"></asp:textbox></div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label5" runat="server" CssClass="KeyField">子文件盒：</asp:label></div>
                        <div class="dTD" style="WIDTH: 9em">
                            <asp:textbox id="txSubFolder" tabIndex="0" runat="server" Width="9em" CssClass="KeyField" MaxLength="20"></asp:textbox></div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label6" runat="server" Width="5em">顯示序號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txSeqNo" tabIndex="0" runat="server" Width="1.5em" MaxLength="2"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label3" runat="server" CssClass="RequireField">異動別：</asp:label></div>
                        <div class="dTD" style="WIDTH: 10.5em">
                            <asp:textbox id="txName" tabIndex="0" runat="server" Width="10em" CssClass="RequireField" MaxLength="10"></asp:textbox></div>
                        <div class="dTDTitle" style="WIDTH: 8.5em">
                            <asp:label id="Label4" runat="server" CssClass="RequireField">異動別顯示名稱：</asp:label></div>
                        <div class="dTD" style="WIDTH: 9em">
                            <asp:textbox id="txDisplay" runat="server" Width="7em" CssClass="RequireField"></asp:textbox></div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label7" runat="server">啟用狀態：</asp:label></div>
                        <div class="dTD" style="WIDTH: 10em">
                            <asp:radiobuttonlist id="rlStartState" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Value="1" Selected="True">啟用</asp:ListItem>
                                <asp:ListItem Value="0">停用</asp:ListItem>
                            </asp:radiobuttonlist>
                        </div>
                    </div>
                </div>
                <FIELDSET id="FDUI">
                    <LEGEND>UI設定</LEGEND>
                    <div class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label8" runat="server">傳送對象：</asp:label></div>
                            <div class="dTD" style="WIDTH: 28em">
                                <asp:textbox id="txToOu" tabIndex="0" runat="server" Width="2em" MaxLength="4"></asp:textbox><asp:imagebutton id="btFindOu" tabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton><asp:button id="btSetFlow" runat="server" Text="自訂"></asp:button></div>
                            <div class="dTDTitle" style="WIDTH: 5.5em">
                                <asp:label id="Label14" runat="server">公文狀態：</asp:label></div>
                            <div class="dTD" style="WIDTH: 8em">
                                <asp:dropdownlist id="dlDocStats" runat="server"></asp:dropdownlist></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label9" runat="server">傳送檢核：</asp:label></div>
                            <div class="dTD" style="WIDTH: 37em">
                                <asp:checkboxlist id="clSpecialCheck" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow"></asp:checkboxlist></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label10" runat="server">適用類型：</asp:label></div>
                            <div class="dTD" style="WIDTH: 28em">
                                <asp:dropdownlist id="dlRuleType" Width="28em" runat="server"></asp:dropdownlist></div>
                            <div class="dTDTitle" style="WIDTH: 5.5em">
                                <asp:label id="Label16" runat="server">適用單位：</asp:label></div>
                            <div class="dTD">
                                <asp:dropdownlist id="dlOwnDept" runat="server"></asp:dropdownlist>
                                <asp:dropdownlist id="dlOwnSect" runat="server"></asp:dropdownlist>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label21" runat="server">適用單位層級：</asp:label></div>
                            <div class="dTD">
                                <asp:dropdownlist id="dlOuLen" runat="server">
                                    <asp:ListItem></asp:ListItem>
                                    <asp:ListItem Value="2">一級單位</asp:ListItem>
                                    <asp:ListItem Value="3">二級單位</asp:ListItem>
                                </asp:dropdownlist>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label11" runat="server">退回註記：</asp:label></div>
                            <div class="dTD" style="WIDTH: 28em">
                                <asp:textbox id="txRejectMark" tabIndex="0" runat="server" Width="1.5em" MaxLength="1"></asp:textbox></div>
                            <div class="dTDTitle" style="WIDTH: 5.5em">
                                <asp:label id="Label17" runat="server">唯讀：</asp:label></div>
                            <div class="dTD" style="WIDTH: 13em">
                                <asp:radiobuttonlist id="rbIsReadOnly" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="1">是</asp:ListItem>
                                    <asp:ListItem Value="0" Selected="True">否</asp:ListItem>
                                </asp:radiobuttonlist>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label12" runat="server">功能鍵控制：</asp:label></div>
                            <div class="dTD">
                                <asp:checkboxlist id="clButton" runat="server" RepeatDirection="Horizontal"></asp:checkboxlist></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label13" runat="server">流程設定頁面：</asp:label></div>
                            <div class="dTD" style="WIDTH: 28em">
                                <asp:dropdownlist id="dlWebPage" runat="server"></asp:dropdownlist></div>
                            <div class="dTDTitle" style="WIDTH: 5.5em">
                                <asp:label id="Label19" runat="server">需層級：</asp:label></div>
                            <div class="dTD">
                                <asp:dropdownlist id="dlOptLvl" runat="server"></asp:dropdownlist></div>
                        </div>
                    </div>
                </FIELDSET>
                <FIELDSET id="FDSET">
                    <LEGEND>傳送處理設定</LEGEND>
                    <div class="DivTable" id="Table1">
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label27" runat="server">主會辦明細設定：</asp:label></div>
                            <div class="dTD" style="WIDTH: 26em">
                                <asp:dropdownlist id="dlDcwmFlag" runat="server"></asp:dropdownlist></div>
                            <div class="dTDTitle" style="WIDTH: 7.5em">
                                <asp:label id="Label26" runat="server">承辦資訊設定：</asp:label></div>
                            <div class="dTD" style="WIDTH: 13em">
                                <asp:dropdownlist id="dlMdcmFlag" runat="server"></asp:dropdownlist></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label28" runat="server">歸檔調整：</asp:label></div>
                            <div class="dTD" style="WIDTH: 26em">
                                <asp:dropdownlist id="dlAdjustFlag" runat="server"></asp:dropdownlist></div>
                            <div class="dTDTitle" style="WIDTH: 7.5em">
                                <asp:label id="Label29" runat="server">預排流程設定：</asp:label></div>
                            <div class="dTD" style="WIDTH: 5.5em">
                                <asp:dropdownlist id="dlWwkfFlag" runat="server"></asp:dropdownlist></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label25" runat="server">其他特殊處理：</asp:label></div>
                            <div class="dTD" style="WIDTH: 5.5em">
                                <asp:dropdownlist id="dlSpecialChech" runat="server"></asp:dropdownlist></div>
                        </div>
                        <div class="dTR">
                            <div class="dTD" style="WIDTH: 30em">
                                <asp:checkbox id="cbPicFlagMain" runat="server" Text="新增會核中主辦訊息"></asp:checkbox></div>
                            <div class="dTD" style="WIDTH: 16em">
                                <asp:checkbox id="cbPicFlagSub" runat="server" Text="新增會辦陳核中訊息"></asp:checkbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTD" style="WIDTH: 30em">
                                <asp:checkbox id="cbDispatchF" runat="server" Text="啟動自動分派"></asp:checkbox></div>
                            <div class="dTD">
                                <asp:checkbox id="cbTranFlag" runat="server" Text="新增已送出線上簽核/紙本簽核訊息"></asp:checkbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTD" style="WIDTH: 30em">
                                <asp:checkbox id="cbResignFlag" runat="server" Text="新增回閱訊息"></asp:checkbox></div>
                            <div class="dTD" style="WIDTH: 16em">
                                <asp:checkbox id="cbMapnFlag" runat="server" Text="新增審核明細檔案訊息"></asp:checkbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTD" style="WIDTH: 30em">
                                <asp:checkbox id="cbDelectFlagMain" runat="server" Text="刪除會核中主辦訊息"></asp:checkbox></div>
                            <div class="dTD" style="WIDTH: 16em">
                                <asp:checkbox id="cbDelectFlagSub" runat="server" Text="刪除會辦陳核中訊息"></asp:checkbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTD">
                                <asp:checkbox id="cbDeleteTxanFlag" runat="server" Text="刪除已送出線上簽核/紙本簽核訊息"></asp:checkbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label22" runat="server">下一流程點資訊：</asp:label></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label20" runat="server">主文件盒：</asp:label></div>
                            <div class="dTD" style="WIDTH: 26em">
                                <asp:textbox id="txToFlder" tabIndex="0" runat="server" Width="4.5em" MaxLength="10"></asp:textbox></div>
                            <div class="dTDTitle" style="WIDTH: 7.5em">
                                <asp:label id="Label23" runat="server">子文件盒：</asp:label></div>
                            <div class="dTD"><asp:textbox id="txToSubFolder" tabIndex="0" runat="server" Width="10em" MaxLength="20"></asp:textbox></div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="WIDTH: 8.5em">
                                <asp:label id="Label18" runat="server">單位名稱：</asp:label></div>
                            <div class="dTD" style="WIDTH: 26em">
                                <asp:dropdownlist id="dlDept" runat="server"></asp:dropdownlist></div>
                            <div class="dTDTitle" style="WIDTH: 7.5em">
                                <asp:label id="Label15" runat="server">角色名稱：</asp:label></div>
                            <div class="dTD">
                                <asp:dropdownlist id="dlRole" runat="server" Width="8em"></asp:dropdownlist></div>
                        </div>
                    </div>
                </FIELDSET>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
