<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT241.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT241" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT241 公文移交作業</title>
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
    <form id="EDT241" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox><asp:TextBox ID="h_PrivInfo" runat="server"></asp:TextBox>
            <asp:TextBox ID="ShowDisableAccount" runat="server"></asp:TextBox><asp:TextBox ID="txOldTakeUser" runat="server"></asp:TextBox>
            <asp:TextBox ID="txTakeRoleNametemp" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">移交人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btUser" TabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txUserName" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">查詢範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbxUnClosedDoc" runat="server" Text="辦理中未結案及核示中公文(含線上申請)" Checked="True"></asp:CheckBox><br>
                        <asp:Label ID="lbClosedDoc" runat="server" Text="已辦畢但尚未歸檔公文(僅供查詢無法進行移交)"></asp:Label>
                        <asp:CheckBox Style="z-index: 0" ID="cbClose" runat="server" Text="結案未歸檔" Checked="True"></asp:CheckBox>
                        <asp:CheckBox Style="z-index: 0" ID="cbContinue" runat="server" Text="續辦未歸檔" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbWaitCheck" runat="server" Text="已歸檔待點收" Checked="True"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbxMsgNotice" runat="server" CssClass="hide" Text="待處理訊息通知" Checked="True"></asp:CheckBox>
						<asp:checkbox id="cbProxyDoc" runat="server" Text="代理負責流程公文"></asp:checkbox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">歸檔庫房類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbOrgStore" runat="server" Text="機關庫房" Checked="True"></asp:CheckBox>
                        <asp:CheckBox Style="z-index: 0" ID="cbUnitStore" runat="server" Checked="True" Text="單位庫房"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR" id="trOtherSettings" style="display: none">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbOtherSettings" runat="server">其他設定：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbxDisableAccount" runat="server" Text="完成移交後停用帳號"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbxDeleteRole" runat="server" Text="完成移交後清空移交人所有角色，"></asp:CheckBox><br>
                        <asp:Label ID="Label6" runat="server">　 並移至</asp:Label>
                        <asp:DropDownList ID="ddlNewDeptNo" runat="server" Enabled="False"></asp:DropDownList>
                        <asp:Label ID="Label5" runat="server">單位承辦人</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">接管人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTakeUser" TabIndex="0" runat="server" Width="10.5em"></asp:TextBox>
                        <asp:ImageButton ID="btTakeUser" TabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txTakeUserName" TabIndex="0" runat="server" CssClass="DisplayOnly" Width="10.5em"></asp:TextBox>
                        <input id="btSetTakeUser" style="display: none" onclick="fnSetTakeUser()" type="button" value="設定">
                        <asp:TextBox ID="txTakeDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txTakeDeptName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="dTD">
                           <asp:DropDownList ID="ddlTakeUserRoleList" runat="server" Width="10.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbNote" runat="server" Text="說明" GroupName="Sort"></asp:RadioButton>
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="公文文號" GroupName="Sort"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD DgSelectToolBar" id="tbSelect" style="display: none">
                        <asp:Button ID="btSelectAll" runat="server" Text="全部選取"></asp:Button>
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向選取"></asp:Button>
                        <asp:Button ID="btSelectClear" runat="server" Text="清除選取"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 157px">
                            <asp:DataGrid ID="dg1" Style="display: none" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server" onclick="jf_SelectComNo()"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="移交單位">
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
                                            <asp:TextBox ID="txTakeName" TabIndex="0" runat="server" CssClass="TextLabel" Width="5em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="說明">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNote" runat="server"></asp:Label>
                                            <asp:TextBox ID="txTakeId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txTakeDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txTakeDeptName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:Label ID="lbSubject" runat="server" CssClass="hide"></asp:Label>
                                            <asp:Label ID="lbFileNo" runat="server" CssClass="hide"></asp:Label>
                                            <asp:Label ID="lbCurrLocation" runat="server" CssClass="hide"></asp:Label>
                                            <asp:Label ID="lbMsgOutLmt" runat="server" CssClass="hide"></asp:Label>
                                            <asp:TextBox ID="txTakeRoleName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txMsgId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txComNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txComType" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽待移交公文清單" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btMove" runat="server" Text="移交" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview2" runat="server" Text="預覽已辦畢未歸檔清單" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
