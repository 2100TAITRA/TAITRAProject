<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR250.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR250" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR250 公文歸檔清單列印作業</title>
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
    <form id="ODR250" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="H_UserValue" runat="server" CssClass="hidden"></asp:TextBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">送文批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBatchNo" TabIndex="10" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox><asp:ImageButton ID="btBatchNo" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSecNo" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="1">普通</asp:ListItem>
                            <asp:ListItem Value="2" Selected="True">機密等級公文</asp:ListItem>
                            <asp:ListItem Value="0">全部</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDeptNo" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label11" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="ddlUser" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">含代擬公文：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIsUpOrg" runat="server" CssClass="InputFieldLabel" Text="含代擬公文" GroupName="GroupOrg"></asp:RadioButton>
                        <asp:RadioButton ID="rbNotUpOrg" runat="server" CssClass="InputFieldLabel" Text="不含代擬公文" GroupName="GroupOrg"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" CssClass="InputFieldLabel" Text="全部公文" Checked="True" GroupName="GroupOrg"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="chESign">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIncludeSecDoc" runat="server" Width="13.5em" Text="含線上簽核公文："></asp:CheckBox>
                        <asp:RadioButton ID="rbIncludeSecAll" runat="server" CssClass="InputFieldLabel" Text="全部" Checked="True" GroupName="GroupSecDoc"></asp:RadioButton>
                        <asp:RadioButton ID="rbIncludeSecRcvP" runat="server" CssClass="InputFieldLabel" Text="僅含有紙本來文" GroupName="GroupSecDoc"></asp:RadioButton>
                    </div>
                </div>
                <div class="hide" id="chSignType">
                    <div class="dTDTitle" style="width: 6.5em">簽核類型：</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSignP" runat="server" Width="13.5em" Text="紙本簽核"></asp:CheckBox>
                        <asp:CheckBox ID="cbSignE" runat="server" Width="13.5em" Text="線上簽核"></asp:CheckBox>
                        <asp:CheckBox ID="cbSignERcvP" runat="server" Width="13.5em" Text="紙本來文轉線上簽核"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbFM" runat="server" Width="13.5em" Text="依檔管局建議的報表格式輸出"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPersonOnly" runat="server" Text="僅列出目前角色之個人待送公文"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbInclodeSect" runat="server" Text="待歸檔公文搜尋時包含二級單位"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlSortType" runat="server" Width="9.5em">
                            <asp:ListItem Value="0">歸檔時間</asp:ListItem>
                            <asp:ListItem Value="1">發文資料更新時間</asp:ListItem>
                            <asp:ListItem Value="2" Selected="True">文(編)號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
				<div class="dTR" runat="server" id = "divSortDesc">
                    <div class="dTDTitle" style="width: 6.5em">
                        &nbsp;
                    </div>
                    <div class="dTD">
                        <asp:label id="lbSortDesc" runat="server">
                            如果公文有併案子文資訊，子文之排序方式依照結案日期降冪排序
                        </asp:label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label class="InputFieldLabel" ID="Label5" runat="server">列印張數：</asp:Label>
                    </div>
                    <div>
                        <asp:TextBox ID="txPage" TabIndex="10" runat="server" Width="24px" MaxLength="1"></asp:TextBox>
                        <asp:Label class="InputFieldLabel" ID="Label6" runat="server" Width="1.5em" Height="8px">張</asp:Label>
                        <asp:TextBox ID="h_txCheckBoxStatus" TabIndex="10" runat="server" Width="5em" CssClass="hide" MaxLength="1"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" id="dgDIV" style="height: 365px;" data-fixed='true'>
                            <asp:DataGrid ID="dg1" runat="server" ShowHeader="True" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="文(編)號">
                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                        </ItemTemplate>
                                        <EditItemTemplate>
                                            <asp:TextBox ID="TextBox1" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.FROM_SUBJECT") %>'>
                                            </asp:TextBox>
                                        </EditItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="hide" id="dtHead2Tool">
                            <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                            <asp:Button ID="btSelectInverse" runat="server" Text="反向"></asp:Button>
                            <asp:Button ID="btSelectClear" runat="server" Text="取消"></asp:Button>
                            <asp:Label class="InputFieldLabel" ID="Label3" runat="server" Width="5.5em">公文文號：</asp:Label>
                            <asp:TextBox ID="txCheckDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                            <asp:Button ID="btEnter" runat="server" Text="確認"></asp:Button>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" id="DIV2" style="height: 356px" data-fixed='true'>
                            <asp:DataGrid ID="dg2" runat="server" Height="5px" ShowHeader="True" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="50">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cb1" runat="server"></asp:CheckBox>
                                            <asp:TextBox ID="H_MsgID" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
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
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" id="divdg3" style="height: 356px;">
                            <asp:DataGrid ID="dg3" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" PageSize="1">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo3" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cb13" runat="server"></asp:CheckBox>
                                            <asp:TextBox ID="H_MsgID3" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="文(編)號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo3" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject3" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="相關文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbComNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" AccessKey="S" title="成批(ALT+S)" runat="server" Text="成批(S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" Accesskey="Q" title="待歸檔公文搜尋(ALT+Q)" runat="server" Text="待歸檔公文搜尋(Q)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" CssClass="hide" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
