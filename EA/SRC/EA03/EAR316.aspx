<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EAR316.aspx.cs" Inherits="EA03.EAR316" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html>
<html>
<head runat="server">
    <title>EAR316 點收編目清單列印作業</title>
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
    <form id="EAR316" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 6.5em; position: absolute; top: 0px; height: 6.5em">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox ID="empUserId" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label1" runat="server">點收日期：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox class="DatePicker" ID="txFileDateS" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                        －
                        <asp:TextBox class="DatePicker" ID="txFileDateE" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label22" runat="server">編目日期：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox class="DatePicker" ID="txinpFileDateS" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                        －
                        <asp:TextBox class="DatePicker" ID="txinpFileDateE" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label11" runat="server" Height="11px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Label ID="laFileYear" runat="server" Font-Size="X-Small">年度號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11.5em">
                        <asp:Label ID="laFileCls" runat="server" Font-Size="X-Small">分類號</asp:Label>
                    </div>
                    <div class="dTD" id="dCaseSize" style="width: 9.5em">
                        <asp:Label ID="laFileCase" runat="server" Font-Size="X-Small">案次號</asp:Label>
                        <asp:Label ID="laFileCaseTAITRA" runat="server" Font-Size="X-Small" CssClass="hide">國別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;處別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;細目號/產品別</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.5em">
                        <asp:Label ID="laFileVol" runat="server" Font-Size="X-Small">卷次號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Label ID="lbFileComboSeq" runat="server" CssClass="RequireField" Font-Size="X-Small" Visible="False"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label4" runat="server">檔號：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYearS" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">－</asp:Label>
                        <asp:TextBox ID="txClsNoS" runat="server" MaxLength="20" Width="8.5em"></asp:TextBox>
                        <asp:TextBox ID="txClsKeyS" runat="server" MaxLength="20" CssClass="hide"></asp:TextBox>
                        <asp:ImageButton ID="btHelpS" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label8" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCaseNoS" runat="server" MaxLength="10" Width="6.5em"></asp:TextBox>
                        <asp:TextBox ID="txCountryNo"  runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox> <asp:ImageButton ID="btHelpCountry" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif" CssClass="hide"></asp:ImageButton><asp:TextBox ID="txDivisionNo"  runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNo" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox> <asp:ImageButton ID="btHelpProduct" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif" CssClass="hide"></asp:ImageButton>
                        <asp:ImageButton ID="btHelpS2" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox ID="txVolNoS" runat="server" MaxLength="4" Width="3em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label16" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label18" runat="server">結案種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="4em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">存查</asp:ListItem>
                            <asp:ListItem Value="2">發文</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label17" runat="server">編目狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlhasInpFileDate" runat="server" Width="4.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已編目</asp:ListItem>
                            <asp:ListItem Value="2">未編目</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label26" runat="server">簽核類型：</asp:Label></div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignType" runat="server" Width="4em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="P">紙本</asp:ListItem>
                            <asp:ListItem Value="E">線上</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label20" runat="server">排序方式：</asp:Label></div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrderby" runat="server" Width="5.5em">
                            <asp:ListItem Value="1">檔號</asp:ListItem>
                            <asp:ListItem Value="2">歸檔批號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">機密等級：</asp:Label></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" GroupName="rbSort" Text="普通" Checked="true"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" runat="server" GroupName="rbSort" Text="密以上"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Title="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
