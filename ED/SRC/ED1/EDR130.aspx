<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR130.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR130" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR130 收發文清冊列印作業</title>
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
    <form id="EDR130" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label25" runat="server">清冊類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlReportType" runat="server">
                            <asp:ListItem Value="RCV">收文清冊</asp:ListItem>
                            <asp:ListItem Value="ISSUE">發文清冊</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbNo" runat="server">總收文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSNo" TabIndex="10" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">－</asp:Label>
                        <asp:TextBox ID="txENo" TabIndex="20" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="lbDate" runat="server">收文時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txSDate" TabIndex="21" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvTimeS" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4" TabIndex="22"></asp:TextBox>
                        <asp:Label class="RequireField" ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox class="RequireField" ID="txEDate" TabIndex="23" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvTimeE" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4" TabIndex="24"></asp:TextBox>
                        <asp:TextBox ID="H_Name" runat="server" Width="14px" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="tr01">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label5" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txFromDateS" TabIndex="25" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label class="RequireField" ID="Label6" runat="server">－</asp:Label>
                        <asp:TextBox class="RequireField" ID="txFromDateE" TabIndex="26" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txFromEDate" runat="server" Width="14px" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="tr02">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="InputFieldLabel" ID="Label2" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" runat="server" Width="5.5em" MaxLength="10" TabIndex="27"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" Width="15.5em" CssClass="TextLabel"></asp:TextBox>
                        <asp:TextBox ID="H_Roler" TabIndex="-1" runat="server" Width="2px" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="atweb" runat="server" Width="9px" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="h_OrgNo" runat="server" Width="1px" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="h_DeptNo" runat="server" Width="1px" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="h_UserId" runat="server" Width="1px" CssClass="hidden"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="tr03">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromWord1" TabIndex="125" runat="server" Width="5.5em" MaxLength="10" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">字第</asp:Label>
                        <asp:TextBox ID="txFromNo1" TabIndex="130" runat="server" Width="8em" MaxLength="15" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFromNo2" TabIndex="130" runat="server" Width="8em" MaxLength="15" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label20" runat="server">號</asp:Label>
                    </div>
                </div>
                <div class="dTR" id="tr04">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">收文別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbClass" runat="server" Width="15.5em" RepeatDirection="Horizontal" TabIndex="131">
                            <asp:ListItem Value="DI.ISSUE_TYPE" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="DM.DOC_NO">紙本公文</asp:ListItem>
                            <asp:ListItem Value="DM.ISSUE_DATE">電子收文</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR" id="tr05">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label12" runat="server">速　　別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSpeed" TabIndex="132" runat="server" Width="15.5em" RepeatDirection="Horizontal">
                            <asp:ListItem Value="ALL" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="SPD_COMMON">普通</asp:ListItem>
                            <asp:ListItem Value="SPD_URGENT">速件</asp:ListItem>
                            <asp:ListItem Value="SPD_MOSTURGENT">最速件</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSec" runat="server" Width="15.5em" RepeatDirection="Horizontal" TabIndex="132">
                            <asp:ListItem Value="DI.ISSUE_TYPE" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value="DM.DOC_NO">普通</asp:ListItem>
                            <asp:ListItem Value="DM.ISSUE_DATE">機密等級公文</asp:ListItem>
                        </asp:RadioButtonList>
                        <asp:CheckBox ID="cbSubject" Text="密件公文列印主旨" runat="server" TabIndex="133"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR" id="tr06">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">分文單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSpeed" runat="server" Width="10.5em" TabIndex="134"></asp:DropDownList>
                        <asp:DropDownList ID="dlDocCategory" runat="server" CssClass="Hide"></asp:DropDownList>
                        <asp:DropDownList ID="dlDeptHide" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="總收文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbDateTime" runat="server" Width="">0930101</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromDate" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgno" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromNo" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvType" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server" Width=""></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                    <asp:DataGrid ID="dg2" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq2" runat="server" Width="20px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server" Width="80px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueNoNo" runat="server" Width="90px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueOrg" runat="server" Width="90px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueNo" runat="server" Width="110px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbCategory" runat="server" Width="50px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" Width="290px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件數">
                                <ItemTemplate>
                                    <asp:Label ID="lbAttachNum" runat="server" Width="40px"></asp:Label>
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
