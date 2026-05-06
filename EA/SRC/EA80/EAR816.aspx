<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR816.aspx.cs" AutoEventWireup="false" Inherits="EA80.EAR816" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR816 還卷清單列印作業</title>
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
    <form id="EAR816" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txDeptNo" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">還卷批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txBatchNo" runat="server" Width="4.5em"></asp:TextBox>
                        <asp:ImageButton ID="IBatchNo" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="6.5em"></asp:TextBox>－
                        <asp:TextBox ID="txDocNoE" runat="server" Width="6.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">調案單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBorNoS" runat="server" CssClass="InputFieldNumeric" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelpS" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>－
                        <asp:TextBox ID="txBorNoE" runat="server" CssClass="InputFieldNumeric" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelpE" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">調案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txBorDateS" runat="server" Width="4.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>－
                        <asp:TextBox ID="txBorDateE" runat="server" Width="4.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">檔案類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAA" runat="server" Text="專案案件" GroupName="ClassType"></asp:RadioButton>
                        <asp:RadioButton ID="rbBB" runat="server" Text="列管案件" GroupName="ClassType"></asp:RadioButton>
                        <asp:RadioButton ID="rbOther" runat="server" Text="一般雜項件" GroupName="ClassType"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="ClassType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlDept" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:DropDownList ID="dlUser" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                        <asp:TextBox ID="H_userID" runat="server" CssClass="hide" ></asp:TextBox>
                        <asp:TextBox ID="H_UerInfo" runat="server" CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="hide">
                    <asp:Button ID="btDgClear" runat="server" Text="清除" />
                    <asp:Button ID="btDgAll" runat="server" Text="全選" />
                    <asp:Button ID="btDgInverse" runat="server" Text="反向" />
                </asp:Panel>
                <div class="GridDiv" style="height: 20em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" EnableViewState="true">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔案類別<br>(卡號/編號/文號)">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileTpye" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="借戶名稱或事由">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileVol" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卷數">
                                <ItemTemplate>
                                    <asp:Label ID="lbVolCnt" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUsername" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件數">
                                <ItemTemplate>
                                    <asp:Label ID="lbAttCnt" runat="server"></asp:Label>
                                    <asp:Label ID="H_lbAttList" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索待成批調案單" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="成批" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
