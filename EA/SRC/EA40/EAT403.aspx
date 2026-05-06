<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EAT403.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT403" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EAT403 單位庫房公文銷毀計畫維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style type="text/css">
        .auto-style2 {
            height: 30px;
        }

        .auto-style3 {
            width: 212px;
        }
    </style>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT403" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:DropDownList ID="dlStoreNo" runat="server" CssClass="Hide"></asp:DropDownList><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">銷毀批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox ID="txPlanNo" TabIndex="1" onkeypress="jf_UPPERCASE()" runat="server" CssClass="RequireField" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">狀態：</asp:Label>
                        <asp:Label ID="LabelStatus" runat="server" ></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label2" runat="server">批號說明：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox Style="z-index: 0" ID="txPlanDesc" TabIndex="11" runat="server"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 100%; height: 100%">
                    <legend class="InputFieldLabel">清理範圍</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em;">
                            <asp:Label ID="Label4" runat="server" CssClass="RequireField">擬銷燬日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15em;">
                            <asp:TextBox ID="txDesDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:ImageButton ID="ibExtDateS" runat="server" ImageUrl="../../../std/image/SEARCH_DATE.gif" CssClass="hide"></asp:ImageButton>～
                            <asp:TextBox ID="txDesDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:ImageButton ID="ibExtDateE" runat="server" ImageUrl="../../../std/image/SEARCH_DATE.gif" CssClass="hide"></asp:ImageButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em;">
                            <asp:Label ID="Label6" runat="server">檔案產生年度：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15em;">
                            <asp:TextBox ID="txYearS" TabIndex="30" onkeypress="jf_InpNumOnly()" runat="server" Width="1.5em" MaxLength="3"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em;">
                            <asp:Label ID="laSourceOrgName" runat="server">檔案產生機關：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15em;">
                            <asp:DropDownList ID="dlSourcelist" runat="server"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em;">
                            <asp:Label ID="Label21" runat="server"> 承辦單位：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15em;">
                            <select name="ddl" id="dlDept" runat="server"></select>

                        </div>
                    </div>
                </fieldset>
                <div style="z-index: 0; display: none; overflow: auto">
                    <asp:TextBox ID="txFileNoSep" runat="server" Width="31px"></asp:TextBox>
                    <asp:TextBox ID="H_DEPTNO" TabIndex="30" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:ValidationSummary ID="Validationsummary2" runat="server" DESIGNTIMEDRAGDROP="147"></asp:ValidationSummary>
                    <asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator" DESIGNTIMEDRAGDROP="146"></asp:CustomValidator>
                    <asp:ListBox ID="Listbox1" runat="server" Height="25px" DESIGNTIMEDRAGDROP="12"></asp:ListBox>
                    <asp:TextBox ID="txOrgNo" runat="server" Width="31px"></asp:TextBox>
                    <asp:TextBox ID="txOrgNoOri" runat="server" Width="31px"></asp:TextBox>
                    <asp:TextBox ID="txSysDate" runat="server" Width="31px"></asp:TextBox>
                    <asp:TextBox ID="txOrgNameOri" runat="server" Width="31px"></asp:TextBox>
                    <asp:TextBox ID="txTransferToOrg" TabIndex="30" runat="server" CssClass="InputFieldText" Width="165px"></asp:TextBox>
                    <asp:CheckBox ID="cbTransferTo" TabIndex="22" runat="server" CssClass="InputFieldText" Text="移交至機關"></asp:CheckBox>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存(S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除(Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除(D)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消(Z)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="估算表預覽(P)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
