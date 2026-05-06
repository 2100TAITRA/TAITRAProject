<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT140.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT140" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT140 公文簽收作業</title>
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
    <form id="ODT140" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:RadioButton ID="rbBatch" runat="server" GroupName="gn" Text="送文批號：" TabIndex="5"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBatchNo" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:RadioButton ID="rbDept" runat="server" GroupName="gn" Text="送文單位：" TabIndex="13"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="5.5em" CssClass="comboBox" TabIndex="15"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox ID="dlSect" runat="server" Width="5.5em" CssClass="comboBox" TabIndex="15"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox ID="dlUser" runat="server" Width="5.5em" CssClass="comboBox" TabIndex="15"></cc1:ComboBox>，
                        <asp:Label ID="Label1" runat="server">送文日期：</asp:Label>
                        <asp:TextBox ID="txSDate" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7" TabIndex="20"></asp:TextBox>－
                        <asp:TextBox ID="txEDate" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7" TabIndex="25"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbDoc" runat="server" GroupName="gn" Text="讀入文號條碼，文號：" Width="11.5em" TabIndex="30"></asp:RadioButton>
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Button ID="btInsert" runat="server" Text="←┘"></asp:Button>
                        <asp:TextBox ID="H_MSGID" TabIndex="-1" runat="server" CssClass="hide" Width="9px"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="Table1">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelect" runat="server" Text="全部選取"></asp:Button>
                    <asp:Button ID="btChange" runat="server" Text="反向選取"></asp:Button>
                    <asp:Button ID="btRemove" runat="server" Text="清除選取"></asp:Button>
                    <asp:TextBox ID="txConfirm" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    <asp:Button ID="btConfirm" runat="server" Text="←┘"></asp:Button>
                </asp:Panel>
                <div class="GridDiv" id="DIV1" style="height: 16.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server"></asp:Label>
                                    <asp:Label ID="H_Msg" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cb1" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txDoc" TabIndex="-1" runat="server" Width="5.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="TextLabel" Width="9.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>

        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜尋" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="點收" ID="btSave"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>

        <div id="hiddenDiv" style="display: none; visibility: hidden; width: 708px; height: 42px">
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
    </form>
</body>
</html>
