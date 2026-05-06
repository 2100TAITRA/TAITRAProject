<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR130.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR130" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR130 收文清冊列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR130" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="H_OdExecCheckPriv" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(O)" ID="btExcel" AccessKey="O" Title="匯出Excel(ALT+O)"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS(C)" ID="btODS" AccessKey="C" Title="匯出ODS(ALT+C)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
        <div class="DivBaseTable" id="BaseTable">
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txDocNoS" TabIndex="10" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>－
						<asp:TextBox ID="txDocNoE" TabIndex="20" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">公文來源：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDocSource" TabIndex="30" runat="server" Width="7em">
                            <asp:ListItem Value="全部" Selected="True">全部</asp:ListItem>
                            <asp:ListItem Value=" ">正常公文</asp:ListItem>
                            <asp:ListItem Value="1">上級機關交辦</asp:ListItem>
                            <asp:ListItem Value="2">上級機關交議</asp:ListItem>
                            <asp:ListItem Value="3">會銜</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txRcvDateS" CssClass="DatePicker" TabIndex="40" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txRcvDateE" CssClass="DatePicker" TabIndex="50" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_DeptNo" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromDateS" CssClass="DatePicker" TabIndex="60" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txFromDateE" CssClass="DatePicker" TabIndex="70" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" runat="server">來源收文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txSrcRcvNoS" TabIndex="80" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>－
						<asp:TextBox ID="txSrcRcvNoE" TabIndex="90" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server">來源收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSrcRcvDateS" CssClass="DatePicker" TabIndex="100" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txSrcRcvDateE" CssClass="DatePicker" TabIndex="110" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_UserId" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">分文單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <cc1:ComboBox ID="dlDept" TabIndex="120" runat="server" Width="9.5em" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="H_Orgno" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" TabIndex="130" runat="server" MaxLength="17" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" TabIndex="-1"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" runat="server" CssClass="TextLabel" Width="10em" TabIndex="-1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txFromNo" TabIndex="140" runat="server" Width="7em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">來源別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlSource" TabIndex="300" runat="server">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="P">紙本來文</asp:ListItem>
                            <asp:ListItem Value="E">電子交換</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em" position:>&nbsp;</div>
                    <div class="dTD" style="width: 15em">
                        <asp:Label ID="Label19" runat="server">為加速查詢回應，需要模糊查詢</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label20" runat="server">來源註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlRcvtypeDesc" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="H_dlAllRcvtypeDesc" CssClass="hidden" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="H_txRcvTyprDescNo" CssClass="hidden" runat="server"></asp:TextBox>
                        <asp:TextBox ID="H_txRcvTyprDesc" CssClass="hidden" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em" position:>&nbsp;</div>
                    <div class="dTD" style="width: 15em">
                        <asp:Label ID="Label15" runat="server">時，第一個字請加上*符號。</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label16" runat="server" CssClass="hide">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSignType" runat="server" CssClass="hide">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="E">線上簽核</asp:ListItem>
                            <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em" position:>&nbsp;</div>
                    <div class="dTD" style="width: 15em">
                        <asp:Label ID="Label21" runat="server">例：*軒字第123號</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbSendMode" runat="server">傳送方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSendMode" runat="server" Width="7.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">自動傳送</asp:ListItem>
                            <asp:ListItem Value="2">人工傳送</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbSendTime" runat="server" CssClass="hide">傳送時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSendTimeS" TabIndex="-1" runat="server" CssClass="hide InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label17" runat="server" CssClass="hide">~</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txSendTimeE" TabIndex="-1" runat="server" CssClass="hide InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList ID="dlTime" runat="server" CssClass="hide">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">上午 07:00~13:00</asp:ListItem>
                            <asp:ListItem Value="2">下午 13:01~22:00</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbState" runat="server" CssClass="hide">結案別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlState" runat="server" Width="12em" CssClass="hide">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="Close">已結案</asp:ListItem>
                            <asp:ListItem Value="Wait">未結案</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label12" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="ddlProperty" TabIndex="160" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label13" runat="server" CssClass="hide">收文單位：</asp:Label>
                        <asp:Label ID="Label14" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlOrder" TabIndex="300" runat="server">
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                            <asp:ListItem Value="2">收文日期</asp:ListItem>
                            <asp:ListItem Value="3">來文日期</asp:ListItem>
                        </asp:DropDownList><asp:CheckBox ID="cbPagedBy" runat="server" CssClass="hide" Text="依承辦單位分頁"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label11" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:RadioButton ID="rbCommon" TabIndex="180" runat="server" Text="普通" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" TabIndex="160" runat="server" Text="機密等級公文" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" TabIndex="160" runat="server" Text="全部" GroupName="gp"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label18" runat="server">來文文別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDocCategory" runat="server" Width="12.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" TabIndex="190" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <asp:DropDownList ID="lbDept" runat="server" CssClass="hide"></asp:DropDownList>
            <asp:DropDownList ID="dlRcv" TabIndex="170" runat="server" CssClass="hide"></asp:DropDownList>
            <div class="DivTable">
                <div class="GridDiv" style="height: 11.5em;">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgName" Style="overflow: hidden; width: 6.5em" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgDate" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromNoNo" Style="overflow: hidden; width: 9.5em" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvType" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" Style="overflow: hidden; width: 5.5em" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" Style="overflow: hidden; width: 4em" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" Style="overflow: hidden; width: 9.5em;" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn Visible="False" HeaderText="簽核類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignType" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <div id="lbToolTip" style="z-index: 300; border-bottom: black 1px solid; position: absolute; border-left: black 1px solid; padding-bottom: 1px; background-color: infobackground; padding-left: 1px; width: 40px; padding-right: 1px; display: none; height: 22px; font-size: x-small; border-top: black 1px solid; top: 75px; border-right: black 1px solid; padding-top: 1px; left: 10px" ms_positioning="FlowLayout"></div>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 300; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
