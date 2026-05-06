<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="TBM300.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBM300" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>TBM300 維護公布欄系統設定</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="TBM300" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../TBLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">公告預設刊登天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDays" TabIndex="0" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox><asp:Label ID="Label4" runat="server">天</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblDayType" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="1" Selected="True">日曆天</asp:ListItem>
                            <asp:ListItem Value="2">工作天</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">內部Web Service網址：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInsideWS" TabIndex="0" runat="server" Width="22.5em" CssClass="RequireField" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label3" runat="server">郵件伺服器：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMailSrv" TabIndex="0" runat="server" Width="22.5em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label12" runat="server">寄件者之名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSenderName" TabIndex="0" runat="server" Width="7.5em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label10" runat="server">寄件者之郵件位址：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSenderMail" TabIndex="0" runat="server" Width="22.5em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label5" runat="server">檔案大小限制：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileSize" TabIndex="0" runat="server" Width="3em" CssClass="InputFieldNumeric" MaxLength="5"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">KB</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label6" runat="server">外部伺服器：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbYes" runat="server" Text="有" GroupName="rbHasOutside"></asp:RadioButton>
                        <asp:RadioButton ID="rbNo" runat="server" Text="無" GroupName="rbHasOutside"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label8" runat="server">外部Web Service網址：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOutsideWS" TabIndex="0" runat="server" Width="22.5em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label9" runat="server">發布單位以機關名稱取代之代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUnitChangeOrg" TabIndex="0" runat="server" Width="10em" MaxLength="60"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">(代碼以';'隔開 ex:12;32)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15.5em">
                        <asp:Label ID="Label13" runat="server">TBI100列表是否包含代理之公告：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIncludeProxy" runat="server" GroupName="rbProxy" Text="包含"></asp:RadioButton>
                        <asp:RadioButton ID="rbNotIncludeProxy" runat="server" GroupName="rbProxy" Text="不包含"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
