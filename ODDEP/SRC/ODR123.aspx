<%@ Page Language="c#" CodeBehind="ODR123.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR123" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR123 送件單列印作業</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR123" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">送件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSendDept" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txAllSendDept" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">收件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlRcvDept" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txAllRcvDept" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label8" runat="server">傳送日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTransDateS" runat="server" CssClass="DatePicker" MaxLength="7" Width="4em"></asp:TextBox>
                        ～
							<asp:TextBox ID="txTransDateE" runat="server" CssClass="DatePicker" MaxLength="7" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label9" runat="server">傳送時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAssignTimeS" Style="ime-mode: disabled" TabIndex="100" runat="server"
                            MaxLength="4" Width="2.5em"></asp:TextBox>－
							<asp:TextBox ID="txAssignTimeE" Style="ime-mode: disabled" TabIndex="110" runat="server"
                                MaxLength="4" Width="2.5em"></asp:TextBox>&nbsp;&nbsp;&nbsp;
							<asp:DropDownList ID="dlAssignTime" TabIndex="120" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label2" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCommon" runat="server" Text="普通" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" runat="server" Text="機密等級公文" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" runat="server" Text="全部" GroupName="gp"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" runat="server" Text="密件公文列印主旨"></asp:CheckBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPersonOnly" runat="server" Text="僅列出個人待送公文"></asp:CheckBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">列印張數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="tbPage" runat="server" Width="1.5em" MaxLength="1"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">張</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">排　　序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSend" runat="server" Text="送件單位" GroupName="rbSort"></asp:RadioButton>
                        <asp:RadioButton ID="rbRcv" runat="server" Text="收件單位" GroupName="rbSort"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox><asp:TextBox ID="txSHOW_TXTIME" CssClass="hide" runat="server"></asp:TextBox>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="dTR">
                            <div class="dTD">
                                <asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
                            </div>
                            <div class="dTD">
                                <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                            </div>
                            <div class="dTD">
                                <asp:Button ID="btChange" runat="server" Text="反向"></asp:Button>
                            </div>
                        </div>
                        <div class="GridDiv" id="DIV1" style="height: 257px;">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50"
                                BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="4" GridLines="Vertical" ShowHeader="true">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選取">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cb1" runat="server" Checked="True"></asp:CheckBox>
                                            <asp:TextBox ID="H_MsgID" runat="server" CssClass="hide" Width="34px"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="送件單位">
                                        <ItemTemplate>
                                            <asp:TextBox ID="DGSendDept" runat="server" CssClass="TextLabel" Width="10em" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="收件單位">
                                        <ItemTemplate>
                                            <asp:TextBox ID="DGRcvDept" runat="server" CssClass="TextLabel" Width="10em" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="送文別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbType" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                                <asp:Label Style="overflow: hidden; display: inline-block; height: 1.2em; word-break:break-all" ID="lbSubject" runat="server"></asp:Label>
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
            <asp:Button ID="btSearch2" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
