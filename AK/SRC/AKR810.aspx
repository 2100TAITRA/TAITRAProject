<%@ Page Language="c#" CodeBehind="AKR810.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR810" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR810 調案記錄查詢列印</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR810" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="7em" MaxLength="15">88888</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">調案單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBorNo" TabIndex="20" runat="server" Width="5.5em" MaxLength="10">0920000099</asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="autoPB" runat="server" Width="1em" MaxLength="1" Visible="False" AutoPostBack="True" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">調案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txDateBegin" TabIndex="30" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7">0920901</asp:TextBox>
                        <asp:Label ID="Label13" runat="server">─</asp:Label>
                        <asp:TextBox ID="txDateEnd" TabIndex="40" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7">0920915</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">調案方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbOriginBorrow" TabIndex="50" runat="server" Width="2.5em" Text="調案原件" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbOnlineBorrow" TabIndex="50" runat="server" Width="2.5em" Text="線上調檔" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbCopyBorrow" TabIndex="50" runat="server" Width="2.5em" Text="複製品" Checked="True"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">歸還日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txRetDateS" TabIndex="30" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7">0920901</asp:TextBox>
                        <asp:Label ID="Label14" runat="server">─</asp:Label>
                        <asp:TextBox ID="txRetDateE" TabIndex="40" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7">0920915</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:Label ID="lbCaseType" runat="server" CssClass="hide">案件類型：</asp:Label>
                        <asp:Label ID="lbRtnType" runat="server" CssClass="hide">歸還狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList id="dlCaseType" runat="server" CssClass="hide">
                            <asp:ListItem Selected="True" Value="AA">專案案件</asp:ListItem>
                            <asp:ListItem Value="BB">列管案件</asp:ListItem>
                            <asp:ListItem Value="">雜項案件</asp:ListItem>
                        </asp:DropDownList>
                        <asp:RadioButton ID="rbRtnN" runat="server" Text="未歸還" GroupName="RtnType" CssClass="hide"></asp:RadioButton>
						<asp:RadioButton ID="rbRtnY" runat="server" Text="已歸還" GroupName="RtnType" CssClass="hide"></asp:RadioButton>
						<asp:RadioButton ID="rbRtnAll" runat="server" Text="全部" GroupName="RtnType" CssClass="hide"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">檔號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYr" TabIndex="60" runat="server" Width="2em" MaxLength="3">092</asp:TextBox>
                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                        <asp:TextBox ID="txFileCls" TabIndex="70" runat="server" Width="10.5em" MaxLength="20">7786</asp:TextBox>
                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                        <asp:TextBox ID="txFileCase" TabIndex="80" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:TextBox ID="txCountryNo" TabIndex="80" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txDivisionNo" TabIndex="80" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNo" TabIndex="80" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">─</asp:Label>
                        <asp:TextBox ID="txFileVol" TabIndex="90" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server">─</asp:Label>
                        <asp:TextBox ID="txFileSeq" TabIndex="100" runat="server" Width="2em" MaxLength="3"></asp:TextBox>

                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16.5em">
                        <cc1:ComboBox ID="ComboBoxDept" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:Label ID="Label7" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="ComboBoxEmp" runat="server" CssClass="comboBox" Width="5em"></cc1:ComboBox>
                        <asp:TextBox ID="txUserValue" runat="server" CssClass="hidden" Width="1.5em"></asp:TextBox>
						<asp:TextBox id="txEmpName" runat="server" CssClass="hide" Width="46px" Height="16px" tabIndex="-1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbMgrUser" runat="server" CssClass="hide">歸檔人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlMgrUser" runat="server" Width="9em" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server">櫥位號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStockNoS" TabIndex="30" runat="server" Width="4em"></asp:TextBox>
                        <asp:Label ID="Label16" runat="server">－</asp:Label>
                        <asp:TextBox ID="txStockNoE" TabIndex="30" runat="server" Width="4em"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR" id="trOrder" runat="server">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label17" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:RadioButton ID="rbFileNo" runat="server" Text="檔號" GroupName="Order"></asp:RadioButton>
						<asp:RadioButton ID="rbBorNo" runat="server" Text="調案單號+序" GroupName="Order"></asp:RadioButton>
                    </div>
                </div>
               <div class="dTR" id="trChangePage" runat="server">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">跳頁方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:RadioButton ID="rbChangePageDept" runat="server" Text="依調案單位" GroupName="ChangePage"></asp:RadioButton>
						<asp:RadioButton ID="rbChangePageUser" runat="server" Text="依調案人員" GroupName="ChangePage"></asp:RadioButton>
                        <asp:RadioButton ID="rbChangePageNone" runat="server" Text="不跳頁" GroupName="ChangePage"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbFM" runat="server" Width="15em" Text="依檔管局建議的報表格式輸出"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Accesskey = "O" Title = "匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" Accesskey = "C" Title = "匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSMEGBorList" runat="server" Text="借卷簽收清單" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
