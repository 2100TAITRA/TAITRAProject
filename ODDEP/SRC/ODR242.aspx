<%@ Page Language="c#" CodeBehind="ODR242.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR242" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR242 逾期公文查詢列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR242" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:DropDownList ID="dlDocType" TabIndex="2" runat="server" Width="7em">
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                            <asp:ListItem Value="2">部收文號</asp:ListItem>
                            <asp:ListItem Value="3">會銜機關收文號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDoc" TabIndex="4" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>(起)－
							<asp:TextBox ID="txEDoc" TabIndex="6" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server" CssClass="InputFieldText">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                        <asp:TextBox ID="H_Change" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="InputFieldText">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="20" runat="server" CssClass="comboBox" Width="6em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:DropDownList ID="dlDateType" TabIndex="25" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:TextBox ID="txSDate" TabIndex="30" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>－
							<asp:TextBox ID="txEDate" TabIndex="35" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:TextBox ID="H_Date" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlProperty" TabIndex="40" runat="server" Width="10em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">逾期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:Label ID="Label3" runat="server">自</asp:Label>
                        <asp:TextBox ID="txCount" TabIndex="50" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">天起</asp:Label>
                        <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbFinish" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0">未辦畢</asp:ListItem>
                            <asp:ListItem Value="1">辦畢</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" runat="server">逾原限辦日：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label11" runat="server">自</asp:Label>
                        <asp:TextBox ID="txCountPDue" TabIndex="50" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server">天起</asp:Label>
                        <asp:TextBox ID="Textbox2" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromSubject" TabIndex="60" runat="server" Width="40em"></asp:TextBox>
                        <asp:TextBox ID="H_Width" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Artifact" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Height" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Url" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label9" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSort" runat="server" RepeatDirection="Horizontal" Width="36em">
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                            <asp:ListItem Value="2">收(創)文日</asp:ListItem>
                            <asp:ListItem Value="3">限辦日</asp:ListItem>
                            <asp:ListItem Value="4">公文性質</asp:ListItem>
                            <asp:ListItem Value="5">逾期天數</asp:ListItem>
                            <asp:ListItem Value="6">原始限辦日期</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 277px;">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical" ShowHeader="True">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" CssClass="TextLabel"></asp:Label><br>
                                    <asp:HyperLink ID="hlApply" runat="server" CssClass="TextLabel">展期</asp:HyperLink>&nbsp;
												<asp:HyperLink ID="hlView" runat="server" CssClass="TextLabel">流程</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收(創)文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原始限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbPdueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="逾期天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbDelay" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前所在位置[辦畢日期]">
                                <ItemTemplate>
                                    <asp:Label ID="lbPosition" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦理天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbWork" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <div id="hiddenDiv" style="width: 708px; display: none; height: 42px; visibility: hidden">
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" />
            <asp:Button ID="btExcel" Accesskey="O" title="匯出Excel(ALT+O)" runat="server" Text="匯出Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
