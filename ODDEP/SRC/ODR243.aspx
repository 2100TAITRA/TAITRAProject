<%@ Page Language="c#" CodeBehind="ODR243.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR243" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR243 待辦事項提醒視窗</title>
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
    <form id="ODR243" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="dTR">
                <div class="dTD">
                    <div class="DivTable" id="MainTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 10em">
                                <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 13em">
                                <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                                <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                                <asp:TextBox ID="H_Change" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                            </div>
                            <div class="dTDTitle">
                                <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                            </div>
                            <div class="dTD">
                                <cc1:ComboBox ID="dlUser" TabIndex="20" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                                <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 10em">
                                <asp:Label ID="Label3" runat="server">預計辦畢日期：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txSDate" TabIndex="45" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>－
                                    <asp:TextBox ID="txEDate" TabIndex="55" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                                <asp:TextBox ID="H_Date" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 10em">
                                <asp:Label ID="Label5" runat="server">主旨：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txFromSubject" TabIndex="60" runat="server" Width="40em"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 10em">
                                <asp:Label ID="Label4" runat="server">排序方式：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:DropDownList ID="dlOrderBy" runat="server" Width="15em">
                                    <asp:ListItem Value="1">承辦單位、承辦人、公文文號</asp:ListItem>
                                    <asp:ListItem Value="2">展期次數</asp:ListItem>
                                    <asp:ListItem Value="3">燈號</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </div>
                    </div>
                    <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btClean" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btChange" runat="server" Text="反向"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 289px">
                            <asp:DataGrid ID="dg1" runat="server" ShowHeader="True"
                                AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2" PageSize="50">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="註記">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbMark" runat="server" EnableViewState="False"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="燈號">
                                        <ItemTemplate>
                                            <asp:Image ID="btImage" runat="server" ImageUrl="images\alert_yellow.gif"></asp:Image>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="展期次數">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSextTimes" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦人">
                                        <ItemTemplate>
                                            <asp:Label ID="H_UserId" TabIndex="-1" runat="server" CssClass="hide" Width="14px"></asp:Label>
                                            <asp:Label ID="H_OuId" TabIndex="-1" runat="server" CssClass="hide" Width="24px"></asp:Label>
                                            <asp:Label ID="lbEmpName" runat="server" Width="53px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlDocNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="起算日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbStartDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="原始限辦日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbPDueDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="限辦日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="辦理天數">
                                        <ItemTemplate>
                                            <asp:Label ID="lbWorkDay" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="目前所在位置">
                                        <ItemTemplate>
                                            <asp:Label ID="lbPosition" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
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
            <asp:Button ID="btTicket" Accesskey="L" title="催辦單(ALT+L)" runat="server" Text="催辦單(L)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
