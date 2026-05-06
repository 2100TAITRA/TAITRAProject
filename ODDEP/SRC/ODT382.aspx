<%@ Page Language="c#" CodeBehind="ODT382.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT382" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT382 公文郵寄彙整作業</title>
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
    <form id="ODT382" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label class="RequireField" ID="Label11" runat="server">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:TextBox ID="txDate" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">郵寄時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSTime" TabIndex="10" runat="server" CssClass="InputFieldNumeric" MaxLength="4" Width="2.5em"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">－</asp:Label>
                        <asp:TextBox ID="txETime" TabIndex="10" runat="server" CssClass="InputFieldNumeric" MaxLength="4" Width="2.5em"></asp:TextBox>
                        <asp:DropDownList ID="dlTime" TabIndex="10" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">啟始彙整日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:TextBox ID="txLatestcom" TabIndex="10" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label12" runat="server">啟始彙整時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txLatestTime" TabIndex="10" runat="server" CssClass="InputFieldNumeric" MaxLength="4" Width="2.5em"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="h_txCollectUser" TabIndex="10" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
                        <asp:Label ID="lbLatest" runat="server" Visible="False"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label class="RequireField" ID="Label10" runat="server" DESIGNTIMEDRAGDROP="195">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="yes" TabIndex="13" runat="server" Width="22.5em" Text="依發文資料更新時,實體公文之順序,由後往前。<br>受文機關最前一份之公文順序排序" GroupName="order"></asp:RadioButton><br>
                        <asp:RadioButton ID="no" TabIndex="12" runat="server" Width="24.5em" Text="依發文機關所有待彙整公文發文資料最早時間排序<br>(本作業原本之順序)" GroupName="order"></asp:RadioButton>
                        <asp:Label ID="lbLatestDate" runat="server" Visible="False"></asp:Label>
                        <asp:Label ID="lbLatestTime" runat="server" Width="48px" Visible="False"></asp:Label>
                    </div>
                </div>
                <asp:Panel ID="P1" runat="server" Width="35em">
                    <div class="DivTable" id="Table1">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label4" runat="server">序：</asp:Label>
                                <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                <asp:Label ID="Label8" runat="server">/</asp:Label>
                                <asp:Label ID="lbTotal" runat="server"></asp:Label>
                            </div>
                            <div class="dTD">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            <asp:Button ID="btFirst" title="第一筆" runat="server" Width="2.5em" Text="<<"></asp:Button>&nbsp;
                            <asp:Button ID="btPrev" title="上一筆" runat="server" Width="2em" Text="<"></asp:Button>&nbsp;
                            <asp:Button ID="btNext" title="下一筆" runat="server" Width="2em" Text=">"></asp:Button>&nbsp;
                            <asp:Button ID="btLast" title="最末筆" runat="server" Width="2.5em" Text=">>"></asp:Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:TextBox ID="txSeq" runat="server" CssClass="InputFieldNumeric" Width="2.5em"></asp:TextBox>
                                <asp:Button ID="btToSeq" runat="server" Text="跳至"></asp:Button>
                                <asp:Button ID="btToOrgName" runat="server" Text="受文者查跳"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 7.5em">
                                <asp:Label ID="Label5" runat="server">受文者：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txOrgName" runat="server" CssClass="TextLabel" Width="26em" ReadOnly="True"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 7.5em">
                                <asp:Label ID="Label6" runat="server">櫃號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txCabinetNo" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 7.5em">
                                <asp:Label ID="Label3" runat="server">郵遞區號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txPostNo" CssClass="InputFieldNumeric" runat="server" MaxLength="6" Width="3.5em"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 7.5em">
                                <asp:Label ID="Label1" runat="server">住　　址：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txAddr" runat="server" MaxLength="60" Width="26em"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                </asp:Panel>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="郵寄序號">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbPostName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄方式代碼">
                                <ItemTemplate>
                                    <asp:Label ID="lbPostNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="重量">
                                <ItemTemplate>
                                    <asp:TextBox ID="txWeight" onblur="fnGetPostCost();" runat="server" CssClass="InputFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵資">
                                <ItemTemplate>
                                    <asp:TextBox ID="txCost" runat="server" Width="3.5em" MaxLength="8" CssClass="InputFieldNumeric"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵資機">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbPrint" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號或非公文郵寄項目編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbSrcNo" runat="server" CssClass="TextLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="彙整(O)" Accesskey = "O" Title = "線上簽核傳送(ALT+O)" DefaultStyle="newmode:block;modifymode:none;" ID="btOrder"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="彙整刪除(X)" Accesskey = "X" Title = "線上簽核傳送(ALT+X)" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 103; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
