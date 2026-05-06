<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKT350.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT350" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKT350 併件維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKT350" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" Height="20px" Width="83px">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="KeyUpperField" ID="txDocNo" TabIndex="10" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>
                        <asp:Label class="KeyField" ID="Label8" runat="server" Height="20px" Width="">　版本別：</asp:Label>
                        <asp:TextBox CssClass="KeyFieldNumeric" ID="tbVERNO" TabIndex="10" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label class="KeyField" ID="Label2" runat="server" Width="">　檔號：</asp:Label>
                        <asp:TextBox CssClass="InputFieldNumeric" ID="tbYEAR" TabIndex="20" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label22" runat="server">－</asp:Label>
                        <asp:TextBox ID="tbCLS" TabIndex="30" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
                        <asp:ImageButton ID="btClsHelp" runat="server" ImageUrl="Template/images/help.gif"></asp:ImageButton>
                        <asp:Label ID="Label24" runat="server">－</asp:Label>
                        <asp:TextBox ID="tbCASE" TabIndex="40" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton ID="btCaseHelp" runat="server" ImageUrl="Template/images/help.gif"></asp:ImageButton>
                        <asp:Label ID="Label25" runat="server">－</asp:Label>
                        <asp:TextBox CssClass="InputEnOnlyUpperField" ID="tbVOL" TabIndex="50" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label26" runat="server">－</asp:Label>
                        <asp:TextBox CssClass="InputEnOnlyUpperField" ID="tbSEQ" TabIndex="60" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Width="84px">併件處理：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCancel" TabIndex="70" runat="server" GroupName="grp1" Checked="True" Text="取消併件"></asp:RadioButton>
                        <asp:TextBox ID="htxClsKey" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="htxCaseKey" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbChange" TabIndex="80" runat="server" Width="8.5em" GroupName="grp1" Text="更換參照文號："></asp:RadioButton>
                        <asp:TextBox onchange="jf_ChangeRadioButton();" ID="txChangeDocNo" runat="server" Width="5.5em" TabIndex="90"></asp:TextBox>(此項目包括更換參照文號及新增併件關係)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAdd" TabIndex="100" runat="server" Width="8.5em" GroupName="grp1" Text="併入其他文號："></asp:RadioButton>
                        <asp:TextBox onchange="jf_ChangeRadioButton();" ID="txAddDocNo" runat="server" Width="5.5em" TabIndex="110"></asp:TextBox>
                        <asp:TextBox ID="htxClsKey2" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="htxCaseKey2" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAdd2FileNo" TabIndex="120" runat="server" Width="154px" GroupName="grp1" Text="併入其他檔號："></asp:RadioButton>
                        <asp:Label ID="Label10" runat="server" Width=""></asp:Label>
                        <asp:TextBox CssClass="InputFieldNumeric" onkeypress="jf_ChangeRadioButton();" ID="tbYEAR2" TabIndex="130" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">－</asp:Label>
                        <asp:TextBox ID="tbCLS2" TabIndex="140" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
                        <asp:ImageButton ID="btClsHelp2" runat="server" ImageUrl="Template/images/help.gif"></asp:ImageButton>
                        <asp:Label ID="Label6" runat="server">－</asp:Label>
                        <asp:TextBox ID="tbCASE2" TabIndex="150" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton ID="btCaseHelp2" runat="server" ImageUrl="Template/images/help.gif"></asp:ImageButton>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox CssClass="InputEnOnlyUpperField" ID="tbVOL2" TabIndex="160" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox CssClass="InputEnOnlyUpperField" ID="tbSEQ2" TabIndex="170" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 13.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="ck1" runat="server" Text=" " Checked="True"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txDoc" runat="server" CssClass="TextLabel" Width="5.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="參照文號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txComNo" runat="server" CssClass="TextLabel" Width="5.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前檔號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFileNo" runat="server" CssClass="DisplayOnly" Width="16.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="併件狀態">
                                <ItemTemplate>
                                    <asp:TextBox ID="txComStatus" runat="server" CssClass="DisplayOnly" Width="6.5em" ReadOnly="True"></asp:TextBox>
                                    <asp:TextBox ID="txComtype" runat="server" CssClass="hide" Width="3.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜索(F)" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="執行(S)" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除(C)" ID="btClean"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
