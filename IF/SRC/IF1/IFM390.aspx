<%@ Page Language="c#" CodeBehind="IFM390.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM390" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFM390 人員職名章維護作業</title>
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
    <form id="IFM390" onkeyup="jf_CheckFull();" method="post" runat="server">
        <object id="Gtf" style="display: none" classid="CLSID:934ECA2D-3841-4A0C-9344-7906B979A4BE" viewastext></object>
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <input id="btFile" style="display: none; width: 10px" type="file" accept=".tif,.png">
            <asp:DropDownList ID="ddlType" runat="server"></asp:DropDownList>
            <asp:TextBox ID="txServerPath" runat="server"></asp:TextBox>
            <asp:TextBox ID="txGenImg" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label class="KeyField" ID="lbOrg" runat="server" CssClass="hide">所屬機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em;">
                        <asp:DropDownList ID="dlOrg" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyUpperField">帳　　號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em;">
                        <asp:TextBox ID="txAccount" runat="server" CssClass="KeyUpperField" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="panel2" runat="server">
                            <fieldset id="newSignPlace">
                                <legend>新增章戳區</legend>
                                <div class="DivTable">
                                    <div class="dTR">
                                        <div class="dTDTitle" style="width: 5em">
                                            <asp:Label ID="Label2" runat="server">姓　　名：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 10em">
                                            <asp:TextBox ID="txNName" runat="server" Width="9em"></asp:TextBox>
                                        </div>
                                        <div class="dTDTitle" style="width: 5em">
                                            <asp:Label ID="Label12" runat="server">顏　　色：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 10em">
                                            <asp:DropDownList ID="dlNColor" runat="server" Width="5em">
                                                <asp:ListItem Value="255,0,0" Selected="True">紅色</asp:ListItem>
                                                <asp:ListItem Value="0,0,255">藍色</asp:ListItem>
                                                <asp:ListItem Value="0,0,0">黑色</asp:ListItem>
                                                <asp:ListItem Value="0,176,240">天藍色</asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                        <div class="dTDTitle" style="width: 6em">
                                            <asp:Label ID="Label9" runat="server">尺寸(mm)：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 7em">
                                            <asp:TextBox ID="txNSize" runat="server" Width="3em"></asp:TextBox>
                                        </div>
                                        <div class="dTD">
                                            <asp:Button ID="btNLoadNew" runat="server" Text="由影像檔新增"></asp:Button>
                                        </div>
                                    </div>
                                    <div class="dTR">
                                        <div class="dTDTitle" style="width: 5em">
                                            <asp:Label ID="Label3" runat="server">章戳名稱：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 10em">
                                            <asp:TextBox ID="txNTitle" runat="server" Width="9em"></asp:TextBox>
                                        </div>
                                        <div class="dTDTitle" style="width: 5em">
                                            <asp:Label ID="Label4" runat="server">職稱首行：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 10em">
                                            <asp:TextBox ID="txNFirst" runat="server" Width="9em"></asp:TextBox>
                                        </div>
                                        <div class="dTDTitle" style="width: 6em">
                                            <asp:Label ID="Label8" runat="server">樣　　式：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 7em">
                                            <asp:DropDownList ID="ddlNPattern" runat="server" Width="6em"></asp:DropDownList>
                                        </div>
                                    </div>
                                    <div class="dTR">
                                        <div class="dTDTitle" style="width: 20em">
                                            <asp:Label ID="Label5" runat="server">職稱次行：</asp:Label>
                                        </div>
                                        <div class="dTD"  style="width: 10em">
                                            <asp:TextBox ID="txNSecond" runat="server" Width="9em"></asp:TextBox>
                                        </div>
                                        <div class="dTDTitle" style="width: 6em">
                                            <asp:Label ID="Label6" runat="server">字　　型：</asp:Label>
                                        </div>
                                        <div class="dTD" style="width: 7em">
                                            
                                            <asp:DropDownList ID="ddlNWord" runat="server" Width="6em">
                                                <asp:ListItem Value="標楷體" Selected="True">標楷體</asp:ListItem>
                                                <asp:ListItem Value="新細明體">新細明體</asp:ListItem>
                                                <asp:ListItem Value="細明體">細明體</asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                        <div class="dTD">
                                            <asp:Button ID="btNNewSig" runat="server" Text="產生並預覽"></asp:Button>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </asp:Panel>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 230px" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                            <asp:TextBox ID="h_txFileName" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="所屬機關">
                                        <ItemTemplate>
                                            <asp:Label ID="lbOrgNo" runat="server" ></asp:Label>
                                            <asp:TextBox ID="txOrgNo" runat="server"  CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="h_txAddByNLoadNew" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="姓名">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txNameL" runat="server" ></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="章戳名稱">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txTitle" runat="server"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="顏色">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlColor" runat="server" Width="4em">
                                                <asp:ListItem Value="255,0,0" Selected="True">紅色</asp:ListItem>
                                                <asp:ListItem Value="0,0,255">藍色</asp:ListItem>
                                                <asp:ListItem Value="0,0,0">黑色</asp:ListItem>
                                                <asp:ListItem Value="0,176,240">天藍色</asp:ListItem>
                                            </asp:DropDownList>
                                            <asp:TextBox ID="txColor" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="尺寸(mm)">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSize" runat="server" Width="3em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="預設">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbDefault" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="預覽章戳">
                                        <ItemTemplate>
                                            <asp:Button ID="btViewSig" runat="server" Text="預覽"></asp:Button>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="刪除章戳">
                                        <ItemTemplate>
                                            <asp:Button ID="btDeleteSig" runat="server" Text="刪除" ></asp:Button><br>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn Visible="False" HeaderText="類別">
                                        <ItemTemplate>
                                            <asp:Image ID="PrivIcon" runat="server"></asp:Image>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                                <PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbDescription" runat="server" CssClass="hide">影像章戳規格：<br>
                            一、依「文書及檔案管理電腦化作業規範」之欄位定義，職名章需使用章戳簽核物件，<br>
                            　　並依設定之顏色顯示，請使用單色之黑白圖檔，解析度為300dpi。<br>
                            二、「由影像檔新增」匯入之彩色圖檔，系統將自動轉為黑白圖檔儲存。<br>
                        </asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
