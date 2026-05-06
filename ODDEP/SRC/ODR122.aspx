<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR122.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR122" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR122 送件單列印作業</title>
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
    <form id="ODR122" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">送文批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txBatchNoS" runat="server" MaxLength="8" Width="4em" TabIndex="-1"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoS" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>～
						<asp:TextBox class="KeyUpperField" ID="txBatchNoE" TabIndex="-1" runat="server" MaxLength="8" Width="4em"></asp:TextBox>
                        <asp:ImageButton ID="btBatchNoE" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="InputFieldLabel" ID="Label3" runat="server">收文單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="txRcvDept" TabIndex="-1" runat="server" Width="8.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCommon" TabIndex="-1" runat="server" GroupName="gp" Text="普通"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" TabIndex="-1" runat="server" GroupName="gp" Text="機密等級公文"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" TabIndex="-1" runat="server" GroupName="gp" Text="全部"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" TabIndex="-1" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">列印張數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbPage" TabIndex="-1" runat="server" MaxLength="1" Width="1em" CssClass="inputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">張</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSort" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                            <asp:ListItem Value="公文文號">公文文號</asp:ListItem>
                            <asp:ListItem Value="傳送時間" Selected="True">傳送時間</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Button ID="btAll" runat="server" Text="全部選取"></asp:Button>
                <asp:Button ID="btClear" runat="server" Text="清除選取"></asp:Button>
                <asp:Button ID="btChange" runat="server" Text="反向選取"></asp:Button>
                <div class="GridDiv" id="DIV1" style="overflow: auto; height: 16.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="50" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cb1" runat="server" Checked="True"></asp:CheckBox>
                                    <asp:TextBox ID="H_MsgID" TabIndex="-1" runat="server" CssClass="hide" Width=""></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文單位">
                                <ItemTemplate>
                                    <asp:TextBox ID="DGRcvDept" TabIndex="-1" runat="server" CssClass="TextLabel" Width="10.5em" Height="22" Font-Size="Small" ReadOnly="True"></asp:TextBox>
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
                                    <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="TextLabel" Width="18.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
                <div class="GridDiv" id="DIV2" style="overflow: auto; height: 16.5em">
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
                            <asp:TemplateColumn HeaderText="收文單位">
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
                                    <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="TextLabel" Width="15.5em" ReadOnly="True"></asp:TextBox>
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
