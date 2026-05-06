<%@ Page Language="c#" CodeBehind="EAR412.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR412" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR412遺失(損毀)檔案清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAR412" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" runat="server" Width="4.5em" CssClass="RequireUpperField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" runat="server" Title="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
						<asp:Label ID="Label5" runat="server">庫房：</asp:Label>
                        <asp:DropDownList ID="dlStoreNo" TabIndex="6" runat="server" Width="5.5em"></asp:DropDownList>
                        <asp:TextBox ID="txFileNoSep" runat="server" Width="5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">註記日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="11" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>&nbsp;至&nbsp;
						<asp:TextBox ID="txDateE" TabIndex="16" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">檔號 (起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearS" TabIndex="30" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>－
                        <asp:TextBox ID="txClsS" TabIndex="35" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>－
                        <asp:TextBox ID="txCaseS" TabIndex="40" runat="server" Width="7em" CssClass="InputUpperField" MaxLength="12"></asp:TextBox>－
                        <asp:TextBox ID="txVolS" TabIndex="45" runat="server" Width="2.5em" CssClass="InputEnUpperField" MaxLength="4"></asp:TextBox>－
                        <asp:TextBox ID="txSeqS" TabIndex="50" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">檔號 (訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearE" TabIndex="55" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>－
                        <asp:TextBox ID="txClsE" TabIndex="60" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>－
                        <asp:TextBox ID="txCaseE" TabIndex="65" runat="server" Width="7em" CssClass="InputUpperField" MaxLength="12"></asp:TextBox>－
                        <asp:TextBox ID="txVolE" TabIndex="70" runat="server" Width="2.5em" CssClass="InputEnUpperField" MaxLength="4"></asp:TextBox>－
                        <asp:TextBox ID="txSeqE" TabIndex="75" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">櫥位號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStockNoS" TabIndex="76" runat="server" Width="6em" CssClass="InputEnUpperField" MaxLength="11"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">－</asp:Label>
                        <asp:TextBox ID="txStockNoE" TabIndex="77" runat="server" Width="6em" CssClass="InputEnUpperField" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server"> 密等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" TabIndex="89" runat="server" Text="全部" GroupName="rbSeq" ></asp:RadioButton>
                        <asp:RadioButton ID="rbNormal" TabIndex="89" runat="server" Text="普通" GroupName="rbSeq" ></asp:RadioButton>
                        <asp:RadioButton ID="rbSecret" TabIndex="89" runat="server" Text="機密等級公文" GroupName="rbSeq"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server"> 清單內容：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb11" TabIndex="80" runat="server" Text="遺失及毀損無法修護檔案" GroupName="rb1" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb12" TabIndex="86" runat="server" Text="遺失檔案" GroupName="rb1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb13" TabIndex="87" runat="server" Text="毀損無法修護檔案" GroupName="rb1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server"> 排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb21" TabIndex="88" runat="server" Text="依承辦單位" GroupName="rb2" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb22" TabIndex="89" runat="server" Text="依檔號" GroupName="rb2"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrder_Stock" TabIndex="89" runat="server" GroupName="rb2" Text="依櫥位號"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server"> 跳頁方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb31" TabIndex="90" runat="server" Text="依承辦單位" GroupName="rb3" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb32" TabIndex="91" runat="server" Text="依案次號" GroupName="rb3"></asp:RadioButton>
                        <asp:RadioButton ID="rbGroup_Stock" TabIndex="91" runat="server" Text="依櫥位號" GroupName="rb3"></asp:RadioButton>
                        <asp:RadioButton ID="rb33" TabIndex="92" runat="server" Text="不跳頁" GroupName="rb3"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbFM" runat="server" Text="依檔管局建議的報表格式輸出"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button Text="預覽" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button Text="列印" runat="server" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button Text="匯出Excel" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btExcel"></asp:Button>
            <asp:Button Text="匯出ODS" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btODS"></asp:Button>
            <asp:Button Text="清除" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
