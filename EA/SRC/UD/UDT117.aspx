<%@ Page Language="c#" CodeBehind="UDT117.aspx.cs" AutoEventWireup="false" Inherits="UD.UDT117" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>UDT117 特殊媒體點收及退件異動作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="UDT117" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:DropDownList ID="dlMediaNo" runat="server"></asp:DropDownList><asp:DropDownList ID="dlFileUnit" runat="server"></asp:DropDownList><asp:TextBox ID="txDeptNo" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="txSectNo" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">特殊媒體編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:TextBox ID="txItemNo" TabIndex="0" runat="server" Width="4.5em" CssClass="KeyUpperField" MaxLength="8"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label8" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0" ID="lbItemState" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label3" runat="server">承辦資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:Label Style="z-index: 0" ID="lbDeptName" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0" ID="lbSectName" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0" ID="lbEmpName" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label2" runat="server">申請方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:Label Style="z-index: 0" ID="lbSignType" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label5" runat="server">媒體類別/數量/單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:Label Style="z-index: 0" ID="lbMediaType" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0" ID="lbUnit" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label6" runat="server">名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0; word-break: break-all" ID="lbItemName" runat="server" Width="34.5em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label7" runat="server">作業別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton Style="z-index: 0" ID="rbAcceptDoc" runat="server" Width="4.5em" Text="點收" Checked="True" GroupName="rbG1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:RadioButton Style="z-index: 0" ID="rbRejectDoc" runat="server" Text="退件，退件原因：" GroupName="rbG1"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlReject" runat="server" Width="25.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:Label Style="z-index: 0" ID="Label9" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txDesc" TabIndex="0" runat="server" Width="25.5em" MaxLength="80"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
