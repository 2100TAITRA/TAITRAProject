<%@ Page Language="c#" CodeBehind="EDR131.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR131" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR131 索引簿列印作業</title>
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
    <form id="EDR131" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 90px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txMake" runat="server" Width="90px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbNo" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSNo" TabIndex="10" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">－</asp:Label>
                        <asp:TextBox ID="txENo" TabIndex="20" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="lbDate" runat="server">收文時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txSDate" TabIndex="21" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvTimeS" TabIndex="22" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label class="RequireField" ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox class="RequireField" ID="txEDate" TabIndex="23" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvTimeE" TabIndex="24" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:TextBox ID="H_Name" runat="server" Width="14px" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="InputFieldLabel" ID="Label2" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" TabIndex="27" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" Width="250px" CssClass="TextLabel"></asp:TextBox>
                        <asp:TextBox ID="H_Roler" TabIndex="-1" runat="server" Width="2px" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="atweb" runat="server" Width="9px" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="h_OrgNo" runat="server" Width="1px" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="h_DeptNo" runat="server" Width="1px" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="h_UserId" runat="server" Width="1px" CssClass="hidden"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromWord1" TabIndex="125" runat="server" Width="5.5em" MaxLength="10" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">字第</asp:Label>
                        <asp:TextBox ID="txFromNo1" Style="ime-mode: disabled" TabIndex="130" runat="server" Width="8em" MaxLength="15" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFromNo2" Style="ime-mode: disabled" TabIndex="130" runat="server" Width="8em" MaxLength="15" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label20" runat="server">號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">文　　別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDocCategory" TabIndex="134" runat="server" Width="10.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="125" runat="server" Width="10.5em" MaxLength="10" ForeColor="Navy"></asp:TextBox>(搜尋兩個詞以上，請用" "隔開)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">收文別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbClass" TabIndex="131" runat="server" Width="15.5em" RepeatDirection="Horizontal">
                            <asp:ListItem Value="DI.ISSUE_TYPE" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="DM.DOC_NO">紙本公文</asp:ListItem>
                            <asp:ListItem Value="DM.ISSUE_DATE">電子收文</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDeptNo" TabIndex="134" runat="server" Width="10.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlDept" runat="server" CssClass="Hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label12" runat="server">辦畢類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbCloseType" TabIndex="132" runat="server" Width="15.5em" RepeatDirection="Horizontal">
                            <asp:ListItem Value="ALL" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="SPD_COMMON">發文</asp:ListItem>
                            <asp:ListItem Value="SPD_URGENT">存查</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                </tbody>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="dTD DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button><br>
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 15em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" Width="15px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server" Checked="True"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" Width="70px"></asp:Label><br>
                                    <asp:Label ID="lbDateTime" runat="server" Width="70px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <!--<asp:TextBox id="txDocNo" runat="server" Width="90px"></asp:TextBox>-->
                                    <asp:Label ID="lbDocNo" runat="server" Width="90px"></asp:Label><br>
                                    <asp:Label ID="lbOldDocNo" runat="server" Width="90px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgno" runat="server" Width="90px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromNo" runat="server" Width="150px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocCategory" runat="server" Width="70px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvType" runat="server" Width="70px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width="70px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦畢類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbCloseType" runat="server" Width="70px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
