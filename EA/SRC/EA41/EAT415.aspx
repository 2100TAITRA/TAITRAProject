<%@ Page Language="c#" CodeBehind="EAT415.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT415" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT415 數位內容清查抽樣作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
</head>
<body ms_positioning="GridLayout">
    <form id="EAT415" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:Button ID="btCancel2" Runat="server" CssClass="hide"></asp:Button>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">抽樣編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSampling_NO" TabIndex="0" runat="server" Width="6em" CssClass="RequireField" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPLAN_NO" TabIndex="0" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btPLAN" TabIndex="-1" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">檔案年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearS" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">～</asp:Label>
                        <asp:TextBox ID="txYearE" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label13" runat="server">抽樣類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbType1" runat="server" Text="電子檔案" GroupName="grpType"></asp:RadioButton>
                        <asp:RadioButton ID="rbType2" runat="server" Text="數位內容" GroupName="grpType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div style="overflow: auto; width: 11.5em; height: 8.5em">
                            <asp:CheckBoxList ID="cbListDept" runat="server"></asp:CheckBoxList>
                        </div>
                        <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">抽樣比例：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRtype1" runat="server" Checked="True" GroupName="Unit"></asp:RadioButton>
                        <asp:TextBox ID="txNum" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">筆</asp:Label>
                        <asp:RadioButton ID="rbRtype2" runat="server" GroupName="Unit"></asp:RadioButton>
                        <asp:TextBox ID="txPercent" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">％</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">抽樣方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" Checked="True" GroupName="Range" Text="全部檔案依比例抽樣"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbGroup" runat="server" GroupName="Range" Text="依"></asp:RadioButton>
                        <asp:CheckBox ID="cbDept" runat="server" Checked="True" Text="承辦單位"></asp:CheckBox>
                        <asp:CheckBox ID="cbYear" runat="server" Checked="True" Text="年度　抽樣"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:Label ID="Label10" runat="server">抽樣結果每頁顯示</asp:Label>
                        <asp:TextBox ID="txCount" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">筆</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPrint" runat="server" Text="列印時僅印出異常項目" Checked="True" ForeColor="Navy"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟(M)" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="抽樣(S)" DefaultStyle="newmode:block;modifymode:none;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢(F)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="檢視抽樣內容(C)" DefaultStyle="newmode:none;modifymode:block;" ID="btCheck" AccessKey="C" Title="檢視抽樣內容(ALT+C)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消(Z)" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽(E)" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印(P)" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
