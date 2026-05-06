<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI245.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI245" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI245 回閱通知查詢檢視作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDI245" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txMsgIdList" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:DropDownList Style="z-index: 0" ID="dlDate" runat="server">
                        </asp:DropDownList>
                        <asp:Label ID="Label1" runat="server">：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" runat="server" Width="4em" CssClass="DatePicker"></asp:TextBox>—
                        <asp:TextBox ID="txDateE" runat="server" Width="4em" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp&nbsp
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label3" runat="server">核決者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlApproveUser" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label5" runat="server">狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbReadN" runat="server" Text="未刪除" GroupName="Read"></asp:RadioButton>
                        <asp:RadioButton ID="rbReadY" runat="server" Text="已刪除" GroupName="Read"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label4" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbNewTime" runat="server" Text="流程新增時間" GroupName="SortBy"></asp:RadioButton>
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="公文文號" GroupName="SortBy"></asp:RadioButton>
                        <asp:RadioButton ID="rbInchargeOu" runat="server" Text="承辦單位" GroupName="SortBy"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="dTR DgSelectToolBar" EnableViewState="False">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                    <asp:Button ID="btSelectClear" runat="server" Text="清除"></asp:Button>
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向"></asp:Button>
                </asp:Panel>
                <div class="GridDiv" style="overflow: auto; height: 15.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" EnableViewState="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
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
                            <asp:TemplateColumn HeaderText="文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位<br>承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbInchargeOu" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbInUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="回閱通知擁有者">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptFName" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:Label ID="lbApprovedRole" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbApprovedUser" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="流程新增時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbNewTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檢視">
                                <ItemTemplate>
                                    <asp:Button ID="btView" runat="server" Text="開啟"></asp:Button>
                                    <asp:Label ID="lbSignType" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbMsgId" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="搜尋" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="刪除" DefaultStyle="newmode:block;modifymode:block;" ID="btDelete"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
