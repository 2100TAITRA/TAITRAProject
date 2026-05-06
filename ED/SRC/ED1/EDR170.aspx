<%@ Page Language="c#" CodeBehind="EDR170.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR170" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR170 被代理公文查詢作業</title>
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
    <form id="EDR170" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txArtifact" runat="server"></asp:TextBox>
            <asp:TextBox ID="authWS" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDOC_NO" runat="server"></asp:TextBox>
            <asp:TextBox ID="txFROM_SUBJECT" runat="server"></asp:TextBox>
            <asp:TextBox ID="txFILE_CLS" runat="server"></asp:TextBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="44px"></asp:TextBox>
            <asp:TextBox ID="H_txSortType" runat="server"></asp:TextBox>
        </div>
        <asp:TextBox Style="z-index: 118; position: absolute; top: 624px; left: 992px" ID="H_Deptp_Value" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 117; position: absolute; top: 592px; left: 992px" ID="H_Deptp" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 116; position: absolute; top: 560px; left: 1048px" ID="H_Userp" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 115; position: absolute; top: 528px; left: 1048px" ID="H_Userp_Value" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 114; position: absolute; top: 496px; left: 992px" ID="H_Sectp" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 113; position: absolute; top: 464px; left: 992px" ID="H_Sectp_Value" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 112; position: absolute; top: 432px; left: 992px" ID="H_dlUserp_Value" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 111; position: absolute; top: 400px; left: 992px" ID="H_dlSectp_Value" runat="server" Width="152px" CssClass="hide"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">被代理人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox ID="dlSect" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Width="80px" CssClass="RequireField">代理期間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">代理人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDeptp" TabIndex="30" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;
                    <cc1:ComboBox ID="dlSectp" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;
                    <cc1:ComboBox ID="dlUserp" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbMain" runat="server" Text="主辦" GroupName="WorkType" Checked="true"></asp:RadioButton>
                        <asp:RadioButton ID="rbCowork" runat="server" Text="會辦" GroupName="WorkType"></asp:RadioButton>
                        <asp:RadioButton ID="rbElse" runat="server" Text="其他" GroupName="WorkType"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="WorkType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <asp:Label ID="Label6" runat="server">※「紙本簽核」公文若未於系統上傳送流程，將無法提供相關查詢。</asp:Label>
                </div>
                <div class="dTR">
                    <asp:Label ID="Label7" runat="server">※「紙本簽核」公文僅能查詢【主辦】及【會辦】兩種類別。</asp:Label>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 26.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前簽核類型">
								<HeaderTemplate>
									<asp:HyperLink runat="server" Text="目前簽核類型" NavigateUrl="javascript:RecordSortType('SignType')"> </asp:HyperLink>
								</HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="H_lbSignType" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbSignType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前位置">
								<HeaderTemplate>
									<asp:HyperLink runat="server" Text="目前位置" NavigateUrl="javascript:RecordSortType('CurrLocation')"> </asp:HyperLink>
								</HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbCURR_LOCATOIN" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="被代理人">
								<HeaderTemplate>
									<asp:HyperLink runat="server" Text="被代理人" NavigateUrl="javascript:RecordSortType('OwnUserId')"> </asp:HyperLink>
								</HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="H_lbOwnUserId" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbOWN_USER" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代理人">
								<HeaderTemplate>
									<asp:HyperLink runat="server" Text="代理人" NavigateUrl="javascript:RecordSortType('FromUser')"> </asp:HyperLink>
								</HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="lbPROXY_USER" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動別">
                                <ItemTemplate>
                                    <asp:Label ID="lbTX_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="類別">
								<HeaderTemplate>
									<asp:HyperLink runat="server" Text="類別" NavigateUrl="javascript:RecordSortType('WorkType')"> </asp:HyperLink>
								</HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label ID="H_lbCoworkType" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbWorkType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTX_TIME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="流程">
                                <ItemTemplate>
                                    <asp:Button ID="btDocData" runat="server" Text="公文明細"></asp:Button><br>
                                    <asp:Button ID="btEDocP" runat="server" Text="簽核頁面"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
                <asp:Button runat="server" Style="display: none" Text="搜尋" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            </asp:Panel>
            <asp:TextBox Style="z-index: 102; position: absolute; top: 96px; left: 992px" ID="H_SourceOrgno" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 103; position: absolute; top: 128px; left: 992px" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 104; position: absolute; top: 160px; left: 992px" ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 105; position: absolute; top: 248px; left: 992px" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 106; position: absolute; top: 288px; left: 992px" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 107; position: absolute; top: 192px; left: 1064px" ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 108; position: absolute; top: 216px; left: 1064px" ID="H_User" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 109; position: absolute; top: 320px; left: 992px" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 110; position: absolute; top: 352px; left: 992px" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
