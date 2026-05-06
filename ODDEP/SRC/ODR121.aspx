<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR121.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR121" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR121 送件單列印作業</title>
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
    <form id="ODR121" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label CssClass="KeyField" ID="Label1" runat="server">送文批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="KeyUpperField" ID="txBatchNoS" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoS" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>～
						<asp:TextBox CssClass="KeyUpperField" ID="txBatchNoE" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoE" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">送件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSendDept" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txAllSendDept" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">收件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlRcvDept" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txAllRcvDept" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCommon" runat="server" Text="普通" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" runat="server" Text="機密等級公文" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" runat="server" Text="全部" GroupName="gp"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">列印張數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbPage" runat="server" CssClass="InputFieldNumeric" Width="1.5em" MaxLength="1"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">張</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">排　　序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSend" runat="server" Text="送件單位" GroupName="rbSort"></asp:RadioButton>
                        <asp:RadioButton ID="rbRcv" runat="server" Text="收件單位" GroupName="rbSort"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <asp:Button ID="btAll" runat="server" Text="全部選取"></asp:Button>
                    <asp:Button ID="btClear" runat="server" Text="清除選取"></asp:Button>
                    <asp:Button ID="btChange" runat="server" Text="反向選取"></asp:Button>
                </div>
                <div class="GridDiv" id="DIV1" style="overflow: auto; height: 16.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cb1" runat="server" Checked="True"></asp:CheckBox>
                                    <asp:TextBox ID="H_MsgID" runat="server" CssClass="hide" Width=""></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送件單位">
                                <ItemTemplate>
                                    <asp:TextBox ID="DGSendDept" runat="server" CssClass="TextLabel" Width="14.5em" Height="22" Font-Size="Small" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件單位">
                                <ItemTemplate>
                                    <asp:TextBox ID="DGRcvDept" runat="server" CssClass="TextLabel" Width="14.5em" Height="22" Font-Size="Small" ReadOnly="True"></asp:TextBox>
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
                                    <asp:TextBox ID="txSubject" runat="server" CssClass="TextLabel" Width="13.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
                <div id="DIV2" style="overflow: auto; height: 16.5em">
                    <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" PageSize="50" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="批號">
                                <ItemTemplate>
                                    <asp:Label ID="lbBatchNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送件單位">
                                <ItemTemplate>
                                    <asp:Label ID="DGSendDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件單位">
                                <ItemTemplate>
                                    <asp:Label ID="DGRcvDept" runat="server"></asp:Label>
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
                                    <asp:TextBox ID="txSubject" runat="server" CssClass="TextLabel" Width="10.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Text="成批(S)" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" AccessKey="S" Title="成批(ALT+S)"></asp:Button>
            <asp:Button runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Text="待送公文查詢(Q)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="Q" Title="待送公文查詢(ALT+Q)"></asp:Button>
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
