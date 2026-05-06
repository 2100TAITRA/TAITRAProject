<%@ Page Language="c#" CodeBehind="EDT241_BSMI.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT241_BSMI" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT241 公文移交作業</title>
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
    <form id="EDT241" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="width: 6.5em; position: absolute; left: 0px; z-index: -100; top: 0px; visibility: hidden" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_PrivInfo" runat="server"></asp:TextBox>
            <asp:TextBox ID="ShowDisableAccount" runat="server"></asp:TextBox>
            <asp:TextBox ID="txOldTakeUser" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Sect_AllValue" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txAppRole" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_TakeRole" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">移交人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" runat="server" Width="10.5em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btUser" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txUserName" runat="server" Width="6.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">移交組室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="12em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">移交科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSect" runat="server" Width="12em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">查詢範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbxUnClosedDoc" runat="server" Text="辦理中未結案及核示中公文" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbxClosedDoc" runat="server" Text="已辦畢但尚未歸檔公文(僅供查詢無法進行移交)" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbxOtherDoc" runat="server" Text="受會中公文(僅供查詢無法進行移交)"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR" style="display: none" id="trOtherSettings">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbOtherSettings" runat="server">其他設定：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbxDisableAccount" runat="server" Text="完成移交後停用帳號"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbxDeleteRole" runat="server" Text="完成移交後清空移交人所有角色，"></asp:CheckBox><br>
                        <asp:Label ID="Label6" runat="server">　 並移至</asp:Label>
                        <asp:DropDownList ID="ddlNewDeptNo" runat="server" Width="4em" Enabled="False"></asp:DropDownList>
                        <asp:Label ID="Label5" runat="server">單位承辦人</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">接管人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTakeUser" runat="server" Width="4em" CssClass="KeyUpperField"></asp:TextBox>
                        <asp:ImageButton ID="btTakeUser" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txTakeUserName" runat="server" Width="6.5em" CssClass="DisplayOnly"></asp:TextBox>
                        <input style="display: none" id="btSetTakeUser" onclick="fnSetTakeUser()" value="設定" type="button">
                        <asp:TextBox ID="txTakeDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txTakeDeptName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height:1px">
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlTakeUserRoleList" runat="server" Width="12em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbNote" runat="server" Text="說明" GroupName="Sort"></asp:RadioButton>
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="公文文號" GroupName="Sort"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel Style="display: none" ID="tbSelect" runat="server" EnableViewState="False">
                    <asp:Button runat="server" Text="全部選取" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="清除選取" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                </asp:Panel>
                <div class="GridDiv" data-oldHeight="0">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="移交組室/科別">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                    <asp:Label ID="lbDeptNo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="移交人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                    <asp:Label ID="lbUserName" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="接管人">
                                <ItemTemplate>
                                    <asp:TextBox ID="txTakeName" runat="server" Width="4.5em" CssClass="TextLabel"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="說明">
                                <ItemTemplate>
                                    <asp:Label ID="lbNote" runat="server"></asp:Label>
                                    <asp:TextBox ID="txTakeId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeRoleID" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeDeptName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="lbSubject" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbFileNo" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbCurrLocation" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbMsgOutLmt" runat="server" CssClass="hide"></asp:Label>
                                    <asp:TextBox ID="txMsgId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txComNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txComType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_txOwnOuid" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_txOwnRoleid" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="資料夾">
                                <ItemTemplate>
                                    <asp:Label ID="lbFolderSubFolder" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" ToolTip="查詢(ALT+F)"></asp:Button>
            <asp:Button runat="server" Text="預覽待移交公文清單(E)" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview" AccessKey="E" ToolTip="預覽待移交公文清單(ALT+E)"></asp:Button>
            <asp:Button runat="server" Text="移交(M)" DefaultStyle="newmode:none;modifymode:block;" ID="btMove" AccessKey="M" ToolTip="將公文移交給下列所設定之接管人(ALT+M)"></asp:Button>
            <asp:Button runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel" ToolTip="取消(ALT+Z)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
