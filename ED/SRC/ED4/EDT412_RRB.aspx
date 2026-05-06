<%@ Page Language="c#" CodeBehind="EDT412_RRB.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT412_RRB" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT412_RRB 解除列管作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDT412_RRB" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_SignType" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <asp:TextBox ID="H_OrgNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_UserId" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Location" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_AUDIT_REASON" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_COM_NO" runat="server" CssClass="hide"></asp:TextBox>
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server" Width="9.5em" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txDOC_NO" onkeyup="ED_jf_CheckFull()" TabIndex="0" runat="server" Width="5.5em" CssClass="ED_KeyField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server" Width="7.5em">目前列管狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAUDIT_STATUS" TabIndex="0" runat="server" Width="5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server" Width="9.5em">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txDEPT_NAME" TabIndex="0" runat="server" Width="10.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" Width="7.5em">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEMP_NAME" TabIndex="0" runat="server" Width="10.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server" Width="9.5em">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFROM_SUBJECT" TabIndex="0" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div id="open" class="hide">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label6" runat="server" Width="9.5em" CssClass="RequireField">解除列管日期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDEAUDIT_DATE" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label7" runat="server" Width="9.5em" CssClass="RequireField">解除列管原因：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbType1" runat="server" Text="會議記錄或出席報告單" GroupName="type" CssClass="RequireField"></asp:RadioButton>
                            <asp:RadioButton ID="rbType2" runat="server" Text="不需填寫會議記錄或出席報告單" GroupName="type" CssClass="RequireField"></asp:RadioButton>
                        </div>
                    </div>
                </div>
                <div id="Type1" class="hide">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label8" runat="server" Width="9.5em">紀錄或報告單文號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDEAUDIT_DOC_NO" runat="server" Width="9em" MaxLength="17"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label9" runat="server" Width="9.5em">會議記錄主旨：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDEAUDIT_SUBJECT" TabIndex="0" runat="server" Width="32.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div id="Type2" class="hide">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">原因：</div>
                        <div class="dTD">
                            <asp:TextBox ID="txDEAUDIT_REMARK" TabIndex="60" runat="server" Width="32.5em" Height="10em" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" AccessKey="U" Title="線上瀏覽(ALT+U)" Text="線上瀏覽(U)" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
