<%@ Page Language="c#" CodeBehind="EDT4901_EXAM.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT4901_EXAM" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT4901_EXAM 考試院各類案件辦理情形登錄作業</title>
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
    <form id="EDT4901_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txSect" runat="server" ></asp:TextBox>
            <asp:TextBox ID="txUser" runat="server" ></asp:TextBox>
            <asp:TextBox ID="txSectIndex" runat="server" ></asp:TextBox>
            <asp:TextBox ID="txUserIndex" runat="server" ></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div id="MainTable" class="DivTable" style="border-collapse: collapse;">

                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbDocNo" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                        <asp:Label runat="server">－</asp:Label>
                        <asp:TextBox ID="txDocNoE" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">公文狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTypeClose" runat="server" Text="結案" GroupName="gpType"></asp:RadioButton>
                        <asp:TextBox ID="txCloseDate" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:RadioButton ID="rbTypeWait" runat="server" Text="未結案" GroupName="gpType"></asp:RadioButton>
                        <asp:RadioButton ID="rbTypeAll" runat="server" Text="全部" GroupName="gpType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbSendType" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em">
                        <asp:DropDownList ID="dlDept" runat="server" Width="8em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbUser" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" runat="server" Width="6em"></asp:DropDownList>
                    </div>

                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">辦理狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIsChecked" runat="server" Text="已登錄" GroupName="gpChecked"></asp:RadioButton>
                        <asp:RadioButton ID="rbUnChecked" runat="server" Text="未登錄" GroupName="gpChecked"></asp:RadioButton>
                        <asp:RadioButton ID="rbWithOutChecked" runat="server" Text="全部" GroupName="gpChecked"></asp:RadioButton>
                    </div>
                </div>
            </div>


            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 11.5em;">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="5" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbDocNo" runat="server" />
                                    <asp:Label ID="dglbCloseDate" runat="server" CssClass="hide" />
                                    <asp:Label ID="dglbOuType" runat="server" CssClass="hide" />
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbFromNoTitle" runat="server">來文字號</asp:Label><br>
                                    <asp:Label ID="dglbFromOrgNameTitle" runat="server">來文機關</asp:Label><br>
                                    <asp:Label ID="dglbDocCategoryNameTitle" runat="server">文別</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbFromWordNo" runat="server" /><br>
                                    <asp:Label ID="dglbFromOrgName" runat="server" /><br>
                                    <asp:Label ID="dglbDocCategoryName" runat="server" />
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="dglbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者">
                                <ItemTemplate>
                                    <asp:Label ID="dglbIssueOrgName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關別">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlOrgType" runat="server" Width="8em">
                                        <asp:ListItem Value="" Selected="True"></asp:ListItem>
                                        <asp:ListItem Value="1" Selected="False">總統府及所屬</asp:ListItem>
                                        <asp:ListItem Value="2" Selected="False">行政院及所屬</asp:ListItem>
                                        <asp:ListItem Value="3" Selected="False">立法院</asp:ListItem>
                                        <asp:ListItem Value="4" Selected="False">司法院及所屬</asp:ListItem>
                                        <asp:ListItem Value="5" Selected="False">考試院</asp:ListItem>
                                        <asp:ListItem Value="6" Selected="False">考選部</asp:ListItem>
                                        <asp:ListItem Value="7" Selected="False">銓敘部</asp:ListItem>
                                        <asp:ListItem Value="8" Selected="False">公務人員保訓會及所屬</asp:ListItem>
                                        <asp:ListItem Value="9" Selected="False">公務人員退撫基金監理會</asp:ListItem>
                                        <asp:ListItem Value="10" Selected="False">公務人員退撫基金管理局</asp:ListItem>
                                        <asp:ListItem Value="11" Selected="False">監察院及所屬</asp:ListItem>
                                        <asp:ListItem Value="12" Selected="False">地方各機關</asp:ListItem>
                                        <asp:ListItem Value="13" Selected="False">個人</asp:ListItem>
                                        <asp:ListItem Value="14" Selected="False">非政府機關</asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:TextBox ID="dglbOrgType" runat="server" CssClass="hide" />
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦理種類">
                                <ItemTemplate>
                                    <asp:CheckBoxList ID="cblWorkType" runat="server" RepeatDirection="Horizontal" style="font-Size:1em">
                                        <asp:ListItem Value="1" Selected="False">人事政策</asp:ListItem>
                                        <asp:ListItem Value="2" Selected="False">機關組織法規</asp:ListItem>
                                        <asp:ListItem Value="3" Selected="False">任免</asp:ListItem>
                                        <asp:ListItem Value="4" Selected="False">考績</asp:ListItem>
                                        <asp:ListItem Value="5" Selected="False">級俸</asp:ListItem>
                                        <asp:ListItem Value="6" Selected="False">陞遷</asp:ListItem>
                                        <asp:ListItem Value="7" Selected="False">獎懲</asp:ListItem>
                                        <asp:ListItem Value="8" Selected="False">保險</asp:ListItem>
                                        <asp:ListItem Value="9" Selected="False">退休</asp:ListItem>
                                        <asp:ListItem Value="10" Selected="False">撫卹</asp:ListItem>
                                        <asp:ListItem Value="11" Selected="False">福利</asp:ListItem>
                                        <asp:ListItem Value="12" Selected="False">登記</asp:ListItem>
                                        <asp:ListItem Value="13" Selected="False">其他</asp:ListItem>
                                    </asp:CheckBoxList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦理結果">
                                <ItemTemplate>
                                    <asp:CheckBoxList ID="cblCloseType" runat="server" RepeatDirection="Horizontal" style="font-Size:1em">
                                        <asp:ListItem Value="1" Selected="False">提會</asp:ListItem>
                                        <asp:ListItem Value="2" Selected="False">發布</asp:ListItem>
                                        <asp:ListItem Value="3" Selected="False">函復</asp:ListItem>
                                        <asp:ListItem Value="4" Selected="False">存查</asp:ListItem>
                                        <asp:ListItem Value="5" Selected="False">交辦</asp:ListItem>
                                        <asp:ListItem Value="6" Selected="False">創稿</asp:ListItem>
                                        <asp:ListItem Value="7" Selected="False">其他</asp:ListItem>
                                    </asp:CheckBoxList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>


        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDoc" runat="server" Text="操作說明" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
