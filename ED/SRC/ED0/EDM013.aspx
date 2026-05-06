<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDM013.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM013" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDM013 機關稿件資料檔維護作業</title>
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
    <form id="EDM013" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label3" runat="server" CssClass="KeyField">機關別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrgList" runat="server" Width="9.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlServerList" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="txActiveOrg" CssClass="hide" TabIndex="0" runat="server"></asp:TextBox>
                        <asp:TextBox ID="txActiveDg" CssClass="hide" TabIndex="0" runat="server"></asp:TextBox>
                        <asp:TextBox ID="txGridNum" CssClass="hide" TabIndex="0" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label4" runat="server">維護類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSingName" runat="server" Text="署名條戳" GroupName="di"></asp:RadioButton>
                        <asp:RadioButton ID="rbIssueOrg" runat="server" Text="發文機關" GroupName="di"></asp:RadioButton>
                        <asp:RadioButton ID="rbNomal" runat="server" Text="一般類型" GroupName="di"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="dlNormalTypeListDiv">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label5" runat="server">一般類型名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlNormalTypeList" runat="server" Width="9.5em"></asp:DropDownList>
                        <asp:Button runat="server" Text="新增" ID="btNormalAdd"></asp:Button>
                        <asp:TextBox ID="txADDnewOption" CssClass="hide" TabIndex="0" runat="server" Width="10em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="SingDiv">
                <div id="LTable" class="dTD">
                    <div class="dTR">
                        <div class="dTD">
                            <asp:Label ID="Label1" runat="server">署名1：</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <asp:Panel ID="tbSelect" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                            <asp:Button runat="server" Text="上移" ID="dg1_btUp"></asp:Button>
                            <asp:Button runat="server" Text="下移" ID="dg1_btDown"></asp:Button>
                            <asp:Button runat="server" Text="清除" ID="dg1_btSelectClear"></asp:Button>
                            <asp:TextBox ID="txdg1Num" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:Button runat="server" Text="變更" ID="dg1_btGridNum"></asp:Button>
                        </asp:Panel>
                    </div>
                    <div class="DivTable">
                        <div class="GridDiv" style="height: 30em;" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="2" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="署名文字<br>取代章戳 使用單位代碼">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSingName" TabIndex="0" runat="server" Width="20em" MaxLength="30"></asp:TextBox><br>
                                            <asp:TextBox ID="txSirName" TabIndex="0" runat="server" CssClass="hide" Width="20em" MaxLength="30"></asp:TextBox>
                                            <asp:TextBox ID="txReplaceSmtp" TabIndex="0" runat="server" Width="16em" MaxLength="30"></asp:TextBox>
                                            <asp:TextBox ID="txDeptID" TabIndex="0" runat="server" Width="3em" MaxLength="3"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="圖檔名稱<br>SIZE">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txPageName" TabIndex="0" runat="server" Width="15em" MaxLength="20"></asp:TextBox><br>
                                            <asp:TextBox ID="txW" TabIndex="0" runat="server" Width="2em" MaxLength="3"></asp:TextBox>Ｘ
                                            <asp:TextBox ID="txH" TabIndex="0" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="差假日期" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                        <ItemTemplate>
                                            <asp:TextBox ID="tbDATES" onblur="CheckDate(this.id, '差假日期', false, 7)" onkeypress="jf_UPPERCASE();" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                                            <asp:DropDownList ID="dlHours" runat="server" Width="3em"></asp:DropDownList>時<asp:DropDownList ID="dlMins" runat="server" Width="3em"></asp:DropDownList>分 ~
                                            <asp:TextBox ID="tbDATEE" onblur="CheckDate(this.id, '差假日期', false, 7)" onkeypress="jf_UPPERCASE();" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                                            <asp:DropDownList ID="dlHoure" runat="server" Width="3em"></asp:DropDownList>時<asp:DropDownList ID="dlMine" runat="server" Width="3em"></asp:DropDownList>分
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div id="RTable" class="dTD">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:Label ID="Label2" runat="server">署名2：</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <asp:Panel ID="tbSelect2" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                            <asp:Button runat="server" Text="上移" ID="dg2_btUp"></asp:Button>
                            <asp:Button runat="server" Text="下移" ID="dg2_btDown"></asp:Button>
                            <asp:Button runat="server" Text="清除" ID="dg2_btSelectClear"></asp:Button>
                            <asp:TextBox ID="txdg2Num" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:Button runat="server" Text="變更" ID="dg2_btGridNum"></asp:Button>
                        </asp:Panel>
                    </div>
                    <div class="DivTable">
                        <div class="GridDiv" style="height: 30em" data-fixed="true">
                            <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="2" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="署名文字<br>取代章戳 使用單位代碼">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSingName" TabIndex="0" runat="server" Width="20em" MaxLength="30"></asp:TextBox><br>
                                            <asp:TextBox ID="txSirName" TabIndex="0" runat="server" CssClass="hide" Width="20em" MaxLength="30"></asp:TextBox>
                                            <asp:TextBox ID="txReplaceSmtp" TabIndex="0" runat="server" Width="16em" MaxLength="30"></asp:TextBox>
                                            <asp:TextBox ID="txDeptID" TabIndex="0" runat="server" Width="3em" MaxLength="3"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="圖檔名稱<br>SIZE">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txPageName" TabIndex="0" runat="server" Width="15em" MaxLength="20"></asp:TextBox><br>
                                            <asp:TextBox ID="txW" TabIndex="0" runat="server" Width="2em" MaxLength="3"></asp:TextBox>Ｘ
                                            <asp:TextBox ID="txH" TabIndex="0" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="差假日期" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                        <ItemTemplate>
                                            <asp:TextBox ID="tbDATES" onblur="CheckDate(this.id, '差假日期', false, 7)" onkeypress="jf_UPPERCASE();" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                                            <asp:DropDownList ID="dlHours" runat="server" Width="3em"></asp:DropDownList>時<asp:DropDownList ID="dlMins" runat="server" Width="3em"></asp:DropDownList>分 ~
                                            <asp:TextBox ID="tbDATEE" onblur="CheckDate(this.id, '差假日期', false, 7)" onkeypress="jf_UPPERCASE();" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                                            <asp:DropDownList ID="dlHoure" runat="server" Width="3em"></asp:DropDownList>時<asp:DropDownList ID="dlMine" runat="server" Width="3em"></asp:DropDownList>分
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="IssueOrgDiv">

                <div class="dTR">
                    <asp:Panel ID="tbSelect3" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                        <asp:Button runat="server" Text="上移" ID="dg3_btUp"></asp:Button>
                        <asp:Button runat="server" Text="下移" ID="dg3_btDown"></asp:Button>
                        <asp:Button runat="server" Text="清除" ID="dg3_btSelectClear"></asp:Button>
                        <asp:TextBox ID="txdg3Num" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Button runat="server" Text="變更" ID="dg3_btGridNum"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="DivTable">
                    <div class="GridDiv" style="height: 30em" data-fixed="true">
                        <asp:DataGrid ID="dg3" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="2" GridLines="Vertical">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="全銜<br>機關代碼 使用單位代碼">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txFullName" TabIndex="0" runat="server" Width="20em" MaxLength="60"></asp:TextBox><br>
                                        <asp:TextBox ID="txOrgNo" TabIndex="0" runat="server" Width="12em" MaxLength="17"></asp:TextBox>
                                        <asp:TextBox ID="txDeptID" TabIndex="0" runat="server" Width="3em" MaxLength="3"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="地址">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txOrgAddress" TabIndex="0" runat="server" Width="30em" MaxLength="100"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦單位<br>承辦人">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txDeptName" TabIndex="0" runat="server" Width="10em" MaxLength="20"></asp:TextBox><br>
                                        <asp:TextBox ID="txEmpName" TabIndex="0" runat="server" Width="4em" MaxLength="10"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="連絡電話<br>分機">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txTelNo" TabIndex="0" runat="server" Width="5em" MaxLength="8"></asp:TextBox><br>
                                        <asp:TextBox ID="txExt" TabIndex="0" runat="server" Width="3em" MaxLength="3"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="傳真<br>Email">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txFax" TabIndex="0" runat="server" Width="5em" MaxLength="8"></asp:TextBox><br>
                                        <asp:TextBox ID="txEmail" TabIndex="0" runat="server" Width="20em" MaxLength="40"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="預設署名<br>條戳">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txSign" TabIndex="0" runat="server" Width="30em" MaxLength="20"></asp:TextBox><br>
                                        <asp:TextBox ID="txSmtp" TabIndex="0" runat="server" Width="30em" MaxLength="30"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="NormalDiv">

                <div class="dTR">
                    <asp:Panel ID="tbSelect4" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                        <asp:Button runat="server" Text="上移" ID="dg4_btUp"></asp:Button>
                        <asp:Button runat="server" Text="下移" ID="dg4_btDown"></asp:Button>
                        <asp:Button runat="server" Text="清除" ID="dg4_btSelectClear"></asp:Button>
                        <asp:TextBox ID="txdg4Num" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Button runat="server" Text="變更" ID="dg4_btGridNum"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="DivTable">
                    <div class="GridDiv" style="height: 30em" data-fixed="true">
                        <asp:DataGrid ID="dg4" runat="server" AutoGenerateColumns="False" PageSize="20" CellPadding="2" GridLines="Vertical">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="值">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txValues" TabIndex="0" runat="server" Width="15em" MaxLength="30"></asp:TextBox><br>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="內容">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txText" TabIndex="0" runat="server" Width="15em" MaxLength="20"></asp:TextBox><br>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
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
