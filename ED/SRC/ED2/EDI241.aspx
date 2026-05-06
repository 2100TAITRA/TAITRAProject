<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI241.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI241" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI241 簽核案件清單查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI241" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_SignDeptNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_SignUser" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_SignName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlSignUser" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">─</asp:Label>
                        <asp:TextBox ID="txDocNoE" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">簽核單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignDept" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">簽核者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignUser" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">傳送時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTxDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txTxTimeS" runat="server" Width="2.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">─</asp:Label>
                        <asp:TextBox ID="txTxDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txTxTimeE" runat="server" Width="2.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">核決日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                        <asp:TextBox ID="txAppDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">批示類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="SignType"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignType1" runat="server" Text="核示" GroupName="SignType"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignType2" runat="server" Text="核閱" GroupName="SignType"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 23.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="20px">1</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDOC_NO" runat="server" Width="90px">1020000001</asp:HyperLink>
                                    <asp:Label ID="lbFILE_CLS" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server" Width="160px">測試公文一行十個字。</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPP_USER_NAME" runat="server" Width="60px">長官一號</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPPROVED_DATE" runat="server" Width="80px">102/01/01</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOU_NAME" runat="server" Width="120px">會計室</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收創日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_DATE" runat="server" Width="80px">102/01/01</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批示&lt;BR&gt;類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPP_TYPE" runat="server" Width="40px">核示</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTX_TIME" runat="server" Width="80px">102/01/01<BR>09:00</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前位置">
                                <ItemTemplate>
                                    <asp:Label ID="lbCURR_LOCATION" runat="server" Width="120px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="清除" ID="btClean" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="搜尋" ID="btSearch" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" Accesskey = "O" Title = "匯出excel(ALT+O)" ID="btExcel" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
