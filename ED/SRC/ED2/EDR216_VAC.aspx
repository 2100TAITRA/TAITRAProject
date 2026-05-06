<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR216_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR216_VAC" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR216_VAC 承辦公文績效天數明細表列印作業</title>
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
    <form id="EDR216_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_dlDept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">收(創)文日期：</asp:Label> 
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txRcvDateS" CssClass="RequireField DatePicker" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txRcvDateE" CssClass="RequireField DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>                        
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" >核決日期：</asp:Label> 
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txApprovedDateS" CssClass="DatePicker" TabIndex="30" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txApprovedDateE" CssClass="DatePicker" TabIndex="40" runat="server" Width="4em" MaxLength="7"></asp:TextBox>                        
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>　
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label5" runat="server">結案別：</asp:Label>
                    </div>
                    <div class="dTD"  style="width: 20em">
                        <asp:DropDownList ID="dlEnd" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="N">未結案</asp:ListItem>
                            <asp:ListItem Value="Y">已結案</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label6" runat="server">逾期別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOverDue" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Y">已逾期</asp:ListItem>
                            <asp:ListItem Value="N">未逾期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label8" runat="server">辦畢方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">發文</asp:ListItem>
                            <asp:ListItem Value="3-1">存查</asp:ListItem>
                            <asp:ListItem Value="2">單位發文</asp:ListItem>
                            <asp:ListItem Value="3-2">單位存查</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label7" runat="server">收創類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlRCType" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="N">收文</asp:ListItem>
                            <asp:ListItem Value="Y">創稿</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label9" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:DropDownList ID="dlWorkDay" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="0-4">0-3.5天</asp:ListItem>
                            <asp:ListItem Value="4-7">4-6.5天</asp:ListItem>
                            <asp:ListItem Value="7-16">7-15.5天</asp:ListItem>
                            <asp:ListItem Value="16-31">16-20.5天</asp:ListItem>
                            <asp:ListItem Value="31up">>=31天</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label10" runat="server">併文別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCBType" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="M">主併及非併文</asp:ListItem>
                            <asp:ListItem Value="C">併文</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label11" runat="server">展期別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:DropDownList ID="dlSextType" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Y">已展期</asp:ListItem>
                            <asp:ListItem Value="N">未展期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label12" runat="server">專案別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlProType" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Y">專案</asp:ListItem>
                            <asp:ListItem Value="N">非專案</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label13" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:DropDownList ID="dlDocProperty" runat="server" Width="10.5em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label14" runat="server">簽核方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignType" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                            <asp:ListItem Value="E">線上簽核</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>                        
			<asp:Button runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btODS"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
