<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT261.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT261" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT261 裁處書公文歸檔作業</title>
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
    <form id="EDT261" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:ListBox ID="lbDept" runat="server" Width="92px" CssClass="hide"></asp:ListBox>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:TextBox>
            <asp:DropDownList ID="dlAppUser2" runat="server"></asp:DropDownList>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">歸檔批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBatchNo" TabIndex="0" runat="server" Width="4.5em" CssClass="KeyFieldNumeric" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="12em" CssClass="InputFieldText" MaxLength="11"></asp:TextBox>(起)－
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="12em" CssClass="InputFieldText" MaxLength="11"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <cc1:ComboBox ID="dlDept" TabIndex="30" runat="server" Width="7.5em" CssClass="RequireField comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="40" runat="server" Width="7.5em" CssClass="RequireField comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="50" runat="server" Width="7.5em" CssClass="RequireField comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">成案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" TabIndex="60" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">－</asp:Label>
                        <asp:TextBox ID="txRcvDateE" TabIndex="70" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" Visible="False" EnableViewState="False">
                    <asp:Button runat="server" Text="全部選取" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="清除選取" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                </asp:Panel>
                <div style="height: 19.5EM">
                    <asp:DataGrid ID="dg1" runat="server" Visible="False" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                    <asp:Label ID="H_MsgID" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                    <asp:Label ID="lbOU_ID" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbOU_NAME" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                    <asp:Label ID="lbUserName" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="成案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlAppUser" runat="server"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢(F)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></asp:Button>
            <asp:Button runat="server" Text="歸檔(T)" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" AccessKey="T" ToolTip="歸檔(ALT+T)"></asp:Button>
            <asp:Button runat="server" Text="刪除(D)" DefaultStyle="newmode:none;modifymode:none;" ID="btDelete" AccessKey="D" ToolTip="刪除(ALT+D)"></asp:Button>
            <asp:Button runat="server" Text="取消(Z)" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel" AccessKey="Z" ToolTip="取消(ALT+Z)"></asp:Button>
            <asp:Button runat="server" Text="預覽(E)" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview" AccessKey="E" ToolTip="預覽(ALT+E)"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印(P)" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint" AccessKey="P" ToolTip="列印(ALT+P)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
