<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKM336.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM336" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKM336 附件資訊</title>
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
    <form id="AKM336" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    <asp:Label ID="lbAttSeqNo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件另存">
                                <ItemTemplate>
                                    <asp:CheckBox ID="ckAttScan" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbDESC" runat="server" Width="14.5em" MaxLength="50"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體型式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlREM" runat="server" Width="5em"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="數量">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbCNT" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計量單位">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlUNIT" runat="server" Width="4em"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="另存附件條碼號">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbRemark" runat="server" Width="8em" MaxLength="30"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="另存附件儲位">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbPlace" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                    <asp:TextBox ID="txIsEcfile" runat="server" Width="10px" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txIsScan" runat="server" Width="10px" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="歸檔否">
                                <ItemTemplate>
                                    <asp:Label ID="lbIsSend" runat="server" Width="1.5em"></asp:Label>
                                    <asp:Label ID="lbFileType" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
                <asp:TextBox ID="txNote" runat="server" Width="666px" CssClass="TextLabel">附註說明：勾選附件另存狀況下執行儲存時另存附件條碼號會由系統自動產生。亦可由使用者自行指定編號。</asp:TextBox>
                <div style="display: none; width: 506px; height: 195px">
                    <asp:ListBox ID="lbReturnValue" runat="server" Height="26px" DESIGNTIMEDRAGDROP="12"></asp:ListBox>
                    <asp:CustomValidator ID="Validator" runat="server" DESIGNTIMEDRAGDROP="46" ErrorMessage="CustomValidator"></asp:CustomValidator>
                    <asp:ValidationSummary ID="ValidationSummary1" runat="server" DESIGNTIMEDRAGDROP="47"></asp:ValidationSummary>
                    <asp:TextBox ID="tbInpFileDate" runat="server" Width="19px"></asp:TextBox>
                    <asp:TextBox ID="tbDocNo" runat="server" Width="19px"></asp:TextBox>
                    <asp:TextBox ID="tbOrgNo" runat="server" Width="19px"></asp:TextBox>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" Text="儲存" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" Text="增加附件欄位數(A)" ID="btAddColumn" AccessKey="A" title="增加附件欄位數(A)"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" Text="附件另存自動要號(N)" ID="btGetNumber" AccessKey="N" title="附件另存自動要號(N)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
