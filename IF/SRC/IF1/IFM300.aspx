<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFM300.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM300" Trace="false" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFM300 個人資訊維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="IFM300" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label6" runat="server" Width="7em" ForeColor="Red">隸屬機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrgno" runat="server" Width="10em" AutoPostBack="True"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label1" runat="server" Width="7em" ForeColor="Red">帳　　號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:TextBox ID="txAccount" TabIndex="10" onkeypress="jf_UPPERCASE()" runat="server" Width="10em" CssClass="KeyUpperField" MaxLength="20">
                        </asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label5" runat="server" Width="6em">密　　碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMima" TabIndex="11" runat="server" Width="10em" MaxLength="32" TextMode="Password">
                        </asp:TextBox>
                        <asp:Button ID="btSetMima" runat="server" CssClass="hide" Text="密碼設定"></asp:Button>
                        <asp:CheckBox ID="cbChangeMima" runat="server" Text="下次登入時變更密碼"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 32em;">
                        <asp:Label ID="Label7" runat="server" Width="6em">原 密 碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOldMima" TabIndex="11" runat="server" Width="10em" MaxLength="32" TextMode="Password">
                        </asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">名　　稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:TextBox ID="txName" TabIndex="12" runat="server" Width="7em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label24" runat="server" CssClass="">別　　名：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txAliasName" TabIndex="12" runat="server" Width="7em" CssClass="" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="trLastName">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label21" runat="server">姓　　氏：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:TextBox ID="txLastName" TabIndex="12" runat="server" Width="7em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="z-index: 0" ID="Label23" runat="server" Width="6em" CssClass="hide">部　　門：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="13em" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label3" runat="server">性　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:RadioButton ID="rbMale" TabIndex="14" runat="server" Text="男" GroupName="sex" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbFemale" TabIndex="14" runat="server" Text="女" GroupName="sex"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label10" runat="server" Width="5em">出生日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBirthday" TabIndex="15" onkeypress="jf_UPPERCASE()" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7">
                        </asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="lbUserNid" runat="server" CssClass="hide">身分證字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:TextBox ID="txUserNid" runat="server" CssClass="hide" Width="6em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label18" runat="server">調檔權限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:DropDownList ID="ddlPrivLevel" runat="server" Width="6em"></asp:DropDownList>
                        <asp:Button ID="btPrivUpdate" runat="server" Text="維護鍵" Enabled="False"></asp:Button>
                    </div>
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label19" runat="server">應用限制：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlAppyLimit" runat="server">
                            <asp:ListItem Value="1">僅能看開放</asp:ListItem>
                            <asp:ListItem Value="4">可看開放及本人限制開放</asp:ListItem>
                            <asp:ListItem Value="2">可看開放及所有限制開放</asp:ListItem>
                            <asp:ListItem Value="3">不限制</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label20" runat="server" Width="6em">帳號狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:RadioButton ID="rbEnable" TabIndex="16" runat="server" Text="在職" GroupName="status"></asp:RadioButton>
                        <asp:RadioButton ID="rbDisable" TabIndex="16" runat="server" Text="停用" GroupName="status"></asp:RadioButton>
                        <asp:RadioButton ID="rbQuit" TabIndex="16" runat="server" Text="離職" GroupName="status"></asp:RadioButton>
                        <asp:Button ID="btSetProxy" runat="server" Text="設定代理人" Enabled="False"></asp:Button>
                        <asp:CheckBox ID="cbLock" runat="server" Text="鎖定" Enabled="False"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label8" runat="server">所具備權利：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btDeployPrivilege" TabIndex="13" runat="server" Text="設定" Enabled="False"></asp:Button>
                    </div>
                </div>
                <div class="dTR" id="txAccExpires">
                    <div class="dTDTitle" style="width: 7em"></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbNeverExpires" runat="server" Text="永久" GroupName="AccountExpires" Checked="True"></asp:RadioButton>
                        <asp:TextBox ID="txAccountExpires" TabIndex="15" onkeypress="jf_UPPERCASE()" runat="server" Width="6em" CssClass="DisplayOnly DatePicker" MaxLength="7">
                        </asp:TextBox>
                        <asp:RadioButton ID="rbAccountExpires" runat="server" Text="帳號到期日" GroupName="AccountExpires"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em;">
                        <asp:Label ID="Label17" runat="server" Width="6em">職　　稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em;">
                        <asp:TextBox ID="txTitle" TabIndex="17" runat="server" Width="7em" MaxLength="40"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="lbGrade" runat="server" Width="6em" CssClass="hide">職　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btSetGroup" runat="server" CssClass="hide" Text="網域群組"></asp:Button>
                        <asp:TextBox ID="txGrade" TabIndex="17" runat="server" Width="7em" MaxLength="75" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label4" runat="server" Width="6em">辦公室電話：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:TextBox ID="txOfficePhone" TabIndex="30" runat="server" Width="7.5em" MaxLength="60"></asp:TextBox>
                        -
							<asp:TextBox ID="txExt" TabIndex="30" runat="server" Width="2.5em" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label11" runat="server" Width="6em">公務員代號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEmpNo" TabIndex="30" onkeypress="jf_UPPERCASE()" runat="server" Width="6em" MaxLength="20">
                        </asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label13" runat="server" Width="6em">電子信箱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:TextBox ID="txEmail" TabIndex="30" runat="server" Width="10em" MaxLength="40"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label12" runat="server" Width="6em">傳真機號碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFax" TabIndex="30" onkeypress="jf_UPPERCASE()" runat="server" Width="6em" MaxLength="60">
                        </asp:TextBox>
                    </div>
                </div>

                <div class="dTR">
                    <div class="dTDTitle" style="width: 32em;">
                        <asp:Label ID="lbMobileNo" runat="server" Width="6em" CssClass="hide">行動電話：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMobileNo" TabIndex="11" runat="server" Width="10em" MaxLength="20" CssClass="hide">
                        </asp:TextBox>
                    </div>
                </div>

                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label16" runat="server" Width="5em">角色扮演：</asp:Label><br>
                        <asp:HyperLink ID="hlSetRoleRank" runat="server" Width="5em" NavigateUrl="javascript:SetPlayRoleRank()" Visible="False">
                            設定順序</asp:HyperLink><br>
                        <asp:HyperLink ID="hlSetRole" runat="server" Width="5em" NavigateUrl="javascript:SetPlayRole()" Visible="False">
                            設定角色</asp:HyperLink>
                    </div>
                    <div runat="server" class="dTD" id="playRole"></div>
                </div>
            </div>
            <asp:TextBox ID="txLdapSet" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="更新組織結構檔(P)" AccessKey="P" title="更新組織結構檔(ALT+P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" />
            <asp:Button ID="btAccSync" runat="server" Text="啟動人員同步(Y)" AccessKey="Y" title="啟動人員同步(ALT+Y)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btRegistMoica" runat="server" Text="行動自然人憑證驗證登錄" title="行動自然人憑證驗證登錄" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 536px; left: 768px" ID="H_Account" runat="server" CssClass="hide">
        </asp:TextBox>
        <asp:TextBox Style="z-index: 103; position: absolute; top: 472px; left: 768px" ID="txOldInfo" runat="server" CssClass="hide">
        </asp:TextBox>
        <asp:TextBox Style="z-index: 104; position: absolute; top: 536px; left: 416px" ID="H_txUnitNo" runat="server" CssClass="hide">
        </asp:TextBox>
    </form>
</body>
</html>
