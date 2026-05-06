<%@ Page Language="c#" CodeBehind="ODR132.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR132" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR132 移文公文查詢列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR132" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 101; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
			<asp:Button runat="server" Style="display: none" Text="匯出Excel" DefaultStyle="newmode:block;modifymode:none;" ID="btExcel"></asp:Button>
        </asp:Panel>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19.5em">
                        <asp:TextBox ID="txDocNoS" TabIndex="10" runat="server" Width="8em" MaxLength="15"></asp:TextBox>－
						<asp:TextBox ID="txDocNoE" TabIndex="20" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromNo" TabIndex="30" runat="server" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19.5em">
                        <asp:TextBox ID="txFromDateS" TabIndex="40" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txFromDateE" TabIndex="50" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" TabIndex="60" runat="server" Width="9em" MaxLength="17"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" runat="server" CssClass="TextLabel" Width="10.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">移文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19.5em">
                        <asp:TextBox ID="txAssignDateS" TabIndex="70" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txAssignDateE" TabIndex="80" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">移文單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAssignOrg" TabIndex="90" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">移文時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19.5em">
                        <asp:TextBox ID="txAssignTimeS" TabIndex="100" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox ID="txAssignTimeE" TabIndex="110" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList ID="dlAssignTime" TabIndex="120" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSec" TabIndex="125" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">收文類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbRcvP" runat="server" Text="紙本"></asp:CheckBox>
                        <asp:CheckBox ID="cbRcvE" runat="server" Text="電子交換"></asp:CheckBox>
                        <asp:CheckBoxList ID="cblRcvType" runat="server" Width="400px" RepeatDirection="Horizontal" RepeatLayout="Flow" RepeatColumns="5"></asp:CheckBoxList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">公文主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="130" runat="server" Width="28.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbRank" TabIndex="140" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="公文文號">公文文號</asp:ListItem>
                            <asp:ListItem Value="移文時間">移文時間</asp:ListItem>
                            <asp:ListItem Value="移文單位">移文單位</asp:ListItem>
                            <asp:ListItem Value="收文人員+移文單位">收文人員+移文單位</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar hide">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 16em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                    <asp:Label ID="lbTypeName" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbOwnOrgName" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromNoNo" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgName" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="移文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbAssignDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="移文單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbAssignOrgName" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:TextBox ID="H_Orgno" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
        <asp:TextBox ID="H_DeptNo" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
        <asp:TextBox ID="H_UserId" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
        <asp:CustomValidator Style="z-index: 103; position: absolute; top: 21.5em; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 300; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
