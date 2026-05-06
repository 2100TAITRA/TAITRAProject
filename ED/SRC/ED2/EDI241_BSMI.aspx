<%@ Page Language="c#" CodeBehind="EDI241_BSMI.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI241_BSMI" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI241_BSMI 簽核案件清單查詢作業</title>
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
    <form id="EDI241_BSMI" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="6em" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">─</asp:Label>
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="6em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">簽核單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignDept" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">簽核者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignUser" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">傳送時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTxDateS" TabIndex="0" runat="server" Width="4.5em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txTxTimeS" TabIndex="0" runat="server" Width="3em" CssClass="RequireField" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">─</asp:Label>
                        <asp:TextBox ID="txTxDateE" TabIndex="0" runat="server" Width="4.5em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txTxTimeE" TabIndex="0" runat="server" Width="3em" CssClass="RequireField" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">核決日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDateS" TabIndex="0" runat="server" Width="4.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">─</asp:Label>
                        <asp:TextBox ID="txAppDateE" TabIndex="0" runat="server" Width="4.5em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label6" runat="server">批示類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" GroupName="SignType" Text="全部"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignType1" runat="server" GroupName="SignType" Text="核示"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignType2" runat="server" GroupName="SignType" Text="核閱"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label10" runat="server">代理選項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbNoProxy" runat="server" Checked="true" Text="非代理公文"></asp:CheckBox>
                        <asp:CheckBox ID="cbSignedByProxy" runat="server" Text="代理人簽核"></asp:CheckBox>
                        <asp:CheckBox ID="cbProxySigned" runat="server" Text="代理期間簽核他人公文(不依簽核單位搜尋)"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Right"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server">1</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDOC_NO" runat="server">1020000001</asp:HyperLink>
                                    <asp:Label ID="lbFILE_CLS" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbSignType" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動撤銷">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink Style="z-index: 0" ID="hlFlowBack" runat="server">異</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server">測試公文一行十個字。</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決者">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPP_USER_NAME" runat="server">長官一號</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核決日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPPROVED_DATE" runat="server">102/01/01</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOU_NAME" runat="server">會計室</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收創日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_DATE" runat="server">102/01/01</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批示&lt;BR&gt;類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbAPP_TYPE" runat="server">核示</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTX_TIME" runat="server">102/01/01<br>09:00</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前位置">
                                <ItemTemplate>
                                    <asp:Label ID="lbCURR_LOCATION" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Text="搜尋" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(C)" ID="btExcel" AccessKey="C" ToolTip="匯出Excel(ALT+C)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
