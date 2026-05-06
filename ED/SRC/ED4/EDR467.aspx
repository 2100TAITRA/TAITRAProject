<%@ Page Language="c#" CodeBehind="EDR467.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR467" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR467 會辦明細表列印作業</title>
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
    <form id="EDR467" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label5" runat="server" EnableViewState="False">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDoc" TabIndex="4" runat="server" Width="7.5em" MaxLength="15"></asp:TextBox>(起)－
                        <asp:TextBox ID="txEDoc" TabIndex="6" runat="server" Width="7.5em" MaxLength="15"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:label id="Label1" runat="server" EnableViewState="False">會辦單位：</asp:label>
                    </div>
                    <div class="dTD" style="width:16.5em">
                        <cc1:combobox id="dlDept" tabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:combobox>&nbsp;
                        <cc1:combobox id="dlSect" tabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:combobox>
                    </div>
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label2" runat="server" EnableViewState="False">會辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="15" runat="server" CssClass="comboBox" Width="8.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:DropDownList ID="dlDateType" TabIndex="17" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                    <div class="dTD" style="width:16.5em">
                        <asp:TextBox ID="txSDate" TabIndex="20" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="25" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label6" runat="server" EnableViewState="False">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:dropdownlist id="ddlProperty" tabIndex="27" runat="server" Width="11em"></asp:dropdownlist>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:label id="Label4" runat="server">辦畢否：</asp:label>
                    </div>
                    <div class="dTD" style="width:16.5em">
                        <asp:RadioButton ID="rbEnd" TabIndex="40" runat="server" EnableViewState="False" Text="會畢" GroupName="gn"></asp:RadioButton>
                        <asp:RadioButton ID="rbCurr" TabIndex="35" runat="server" EnableViewState="False" Text="會辦中" GroupName="gn"></asp:RadioButton>
                        <asp:radiobutton id="rbgnAll" tabIndex="30" runat="server" Text="全部" GroupName="gn" Checked="True"></asp:radiobutton>
                    </div>
                    <div class="dTDTitle" style="width:7.5em">&nbsp;
						<asp:label id="Label3" runat="server" EnableViewState="False">會辦是否逾期：</asp:label>
                    </div>
                    <div class="dTD">
                        <asp:textbox id="H_Change" tabIndex="-1" runat="server" Width="16px" CssClass="hide" ReadOnly="True"></asp:textbox>
                        <asp:textbox id="H_Url" tabIndex="-1" runat="server" Width="10px" CssClass="hide" ReadOnly="True"></asp:textbox>
                        <asp:textbox id="H_Width" tabIndex="-1" runat="server" Width="10px" CssClass="hide" ReadOnly="True"></asp:textbox>
                        <asp:textbox id="H_Height" tabIndex="-1" runat="server" Width="10px" CssClass="hide" ReadOnly="True"></asp:textbox>
                        <asp:textbox id="H_Artifact" tabIndex="-1" runat="server" Width="10px" CssClass="hide" ReadOnly="True"></asp:textbox>
                        <asp:radiobutton id="rbOver" tabIndex="30" runat="server" Text="逾期" GroupName="isOver"></asp:radiobutton>
                        <asp:radiobutton id="rbNoOver" tabIndex="35" runat="server" Text="未逾期" GroupName="isOver"></asp:radiobutton>
                        <asp:radiobutton id="rbisOverAll" tabIndex="40" runat="server" Text="全部" GroupName="isOver" Checked="True"></asp:radiobutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label9" runat="server" EnableViewState="False">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrderDept" TabIndex="30" runat="server" Text="受會單位" GroupName="Order" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderEmp" TabIndex="30" runat="server" Text="受會人" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderDocNo" TabIndex="30" runat="server" Text="公文文號" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderDate" TabIndex="30" runat="server" Text="會辦起始日期" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderDueDate" TabIndex="30" runat="server" Text="限辦日期" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderPdueDate" TabIndex="30" runat="server" Text="原始限辦日期" GroupName="Order"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" Width="92px" CssClass="hide"></asp:ListBox>
        </div>
        <div style="width: 708px; display: none; height: 42px; visibility: hidden" id="hiddenDiv2">
            <asp:TextBox ID="H_Dept" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" Width="19px" CssClass="hidden"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" style="display:none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" style="display:none" DefaultStyle="newmode:block;modifymode:block;" Text="列印" CssClass="hide" ID="btPrint"></asp:Button>
            <asp:Button runat="server" style="display:none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出Excel" ID="btExcel"></asp:Button>
        </asp:Panel>
        
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="Validationsummary2" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
