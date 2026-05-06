<%@ Page Language="c#" CodeBehind="UDT116.aspx.cs" AutoEventWireup="false" Inherits="UD.UDT116" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>UDT116 特殊媒體點收及退件作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="UDT116" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:DropDownList ID="dlMediaNo" runat="server"></asp:DropDownList><asp:DropDownList ID="dlFileUnit" runat="server"></asp:DropDownList><asp:ListBox ID="lboxWorkType" runat="server"></asp:ListBox><asp:ListBox ID="lboxItemNo" runat="server"></asp:ListBox><asp:ListBox ID="lboxSignType" runat="server"></asp:ListBox><asp:ListBox ID="lboxDeptNM" runat="server"></asp:ListBox><asp:ListBox ID="lboxDeptNO" runat="server"></asp:ListBox><asp:ListBox ID="lboxMedia" runat="server"></asp:ListBox><asp:ListBox ID="lboxMark" runat="server"></asp:ListBox><asp:ListBox ID="lboxReturnNo" runat="server"></asp:ListBox><asp:ListBox ID="lboxRemark" runat="server"></asp:ListBox>
            <asp:ListBox Style="z-index: 0" ID="lboxSectNO" runat="server"></asp:ListBox>
            <asp:ListBox Style="z-index: 0" ID="lboxSectNM" runat="server"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable1" class="DivTable">
                <fieldset style="width: 40em">
                    <legend>資料輸入</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label3" runat="server">特殊媒體編號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox Style="z-index: 0" ID="txItemNo" TabIndex="0" runat="server" Width="5.5em" ReadOnly="True" MaxLength="10"></asp:TextBox>
                            <asp:Button ID="btAdd" runat="server" Text="加入"></asp:Button>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                        </div>
                        <div class="dTD">
                            <cc1:ComboBox Style="z-index: 0" ID="dlDept" CssClass="comboBox" runat="server" Width="10em" Rows="10"></cc1:ComboBox>
                            <asp:Button ID="btAddBatch" runat="server" Text="帶出待點收"></asp:Button>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div id="MainTable2" class="DivTable">
                <fieldset style="width: 40em">
                    <legend>作業別</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label2" runat="server">作業別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton Style="z-index: 0" ID="rbAcceptDoc" runat="server" Width="4.5em" Text="點收" GroupName="rbG1" Checked="True"></asp:RadioButton>
                            <asp:RadioButton ID="rbRejectDoc" runat="server" Width="4.5em" Text="退件" GroupName="rbG1"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label4" runat="server">退件原因：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList Style="z-index: 0" ID="dlReject" runat="server" Width="25.5em"></asp:DropDownList>
                            <asp:Button ID="btChange" runat="server" Text="批次註記"></asp:Button>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label Style="z-index: 0" ID="Label5" runat="server">備註：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDesc" TabIndex="0" runat="server" Width="25.5em" MaxLength="80"></asp:TextBox>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                    <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                    <asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
                </asp:Panel>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Right"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="註記">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="作業別">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbWorkType" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="特殊媒體編號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbItemNo" runat="server" Width="7em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請方式">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSignType" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦科別">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSectName" runat="server" Width="6em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體類型/數量/單位">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbMedia" runat="server" Width="9.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="退件原因">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbMark" runat="server" Width="10.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                    <asp:Label ID="lbShowMsg" runat="server"></asp:Label>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="點收或退件(S)" AccessKey="S" Title="點收或退件(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
