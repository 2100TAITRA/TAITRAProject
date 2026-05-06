<%@ Page Language="c#" CodeBehind="ODR241.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR241" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR241 待辦公文查詢作業</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta name="format-detection" content="telephone=no">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR241" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:DropDownList ID="dlDocType" TabIndex="2" runat="server" Width="120px">
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                            <asp:ListItem Value="2">部收文號</asp:ListItem>
                            <asp:ListItem Value="3">會銜機關收文號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDoc" TabIndex="4" runat="server" Width="7.7em" MaxLength="15"></asp:TextBox>
                        (起)－
										<asp:TextBox ID="txEDoc" TabIndex="6" runat="server" Width="7.7em" MaxLength="15"></asp:TextBox>
                        (迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em;">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox" Width="8.5em"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox" Width="8.5em"></cc1:ComboBox>
                        <asp:TextBox ID="H_Change" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em;">
                        <cc1:ComboBox ID="dlUser" TabIndex="20" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:DropDownList ID="dlDateType" TabIndex="22" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 16em;">
                        <asp:TextBox ID="txDate1" TabIndex="23" runat="server" Width="3.7em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        －
										<asp:TextBox ID="txDate2" TabIndex="25" runat="server" Width="3.7em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label4" runat="server">類　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em;">
                        <asp:RadioButton ID="rb1" TabIndex="30" runat="server" Text="主辦" GroupName="gn"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" TabIndex="35" runat="server" Text="會辦" GroupName="gn"></asp:RadioButton>
                        <asp:RadioButton ID="rb3" TabIndex="40" runat="server" Text="全部" GroupName="gn"></asp:RadioButton>
                        <asp:TextBox ID="H_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Artifact" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Height" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Url" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Width" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label3" runat="server">預計辦畢日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em;">
                        <asp:TextBox ID="txSDate" TabIndex="45" runat="server" Width="4.7em" CssClass="DatePicker" MaxLength="7" type="tel"></asp:TextBox>
                        －
						<asp:TextBox ID="txEDate" TabIndex="55" runat="server" Width="4.7em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_Date" TabIndex="-1" runat="server" CssClass="hide" Width="27px"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label6" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em;">
                        <asp:DropDownList ID="dlProperty" TabIndex="57" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label7" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em;">
                        <asp:Label ID="Label8" runat="server">自</asp:Label>
                        <asp:TextBox ID="txCount" TabIndex="50" CssClass="InputFieldNumeric" runat="server" Width="2.7em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">天起</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label12" runat="server">到期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em;">
                        <asp:TextBox Style="z-index: 0" ID="txOverDayS" CssClass="InputFieldNumeric" TabIndex="50" runat="server" Width="2.7em" MaxLength="3"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label13" runat="server">(起)－</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txOverDayE" CssClass="InputFieldNumeric" TabIndex="50" runat="server" Width="2.7em" MaxLength="3"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label14" runat="server">(迄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label5" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromSubject" TabIndex="60" runat="server" Width="26.2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="lbNewByOu" runat="server">查詢公文類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em;">
                        <asp:CheckBox ID="cb1" runat="server" Text="來文"></asp:CheckBox>
                        <asp:CheckBox ID="cb2" runat="server" Text="創稿"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label10" runat="server">公文來源：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em;">
                        <asp:DropDownList ID="dlDocSource" TabIndex="57" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label11" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton Style="z-index: 0" ID="rbOrderDocNo" TabIndex="30" runat="server" GroupName="Order" Text="公文文號" Checked="True"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbOrderRcvDate" TabIndex="30" runat="server" GroupName="Order" Text="收(創)文日"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbOrderDueDate" TabIndex="30" runat="server" GroupName="Order" Text="限辦日期"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbOrderEmp" TabIndex="30" runat="server" GroupName="Order" Text="承辦人"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbOrderPdueDate" TabIndex="30" runat="server" GroupName="Order" Text="原始限辦日期"></asp:RadioButton>
                    </div>

                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD DgSelectToolBar">
                        <asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btClean" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btChange" runat="server" Text="反向"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 404px;">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical" ShowHeader="True">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo" runat="server" CssClass="TextLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="註記">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbMark" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlDocNo" runat="server" CssClass="TextLabel"></asp:HyperLink>
                                            <br>
                                            <asp:HyperLink ID="hlApply" runat="server" CssClass="TextLabel">展期</asp:HyperLink>&nbsp;
												<asp:HyperLink ID="hlView" runat="server" CssClass="TextLabel">流程</asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="收(創)文日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="限辦日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="原始限辦日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbPdueDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="辦理天數">
                                        <ItemTemplate>
                                            <asp:Label ID="lbWorkDay" runat="server" CssClass="TextLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="目前所在位置">
                                        <ItemTemplate>
                                            <asp:Label ID="lbPosition" runat="server" CssClass="TextLabel"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主／<BR>會辦">
                                        <ItemTemplate>
                                            <asp:Label ID="lbType" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦人">
                                        <ItemTemplate>
                                            <asp:TextBox ID="H_UserId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="H_OuId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="hiddenDiv" style="width: 708px; display: none; height: 42px; visibility: hidden">
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <asp:Panel CssClass="V2_GenericBannerToolBar" ID="tbTool" runat="server">
            <asp:Button ID="btSearch" runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:block;" CausesValidation="False" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" CausesValidation="False" />
            <asp:Button ID="btPrint" runat="server" Text="列印" DefaultStyle="newmode:block;modifymode:block;" CausesValidation="False" CssClass="hide" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" title="匯出Excel(ALT+O)" DefaultStyle="newmode:block;modifymode:block;" CausesValidation="False" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" title="匯出ODS(ALT+C)" DefaultStyle="newmode:block;modifymode:block;" CausesValidation="False" />
            <asp:Button ID="btTicket" runat="server" Text="催辦單(K)" AccessKey="K" title="催辦單(ALT+K)" DefaultStyle="newmode:none;modifymode:block;" CausesValidation="False" />
            <asp:Button ID="btTicket2" runat="server" Text="會辦催辦單(L)" AccessKey="L" title="會辦催辦單(ALT+L)" DefaultStyle="newmode:none;modifymode:block;" CausesValidation="False" />
        </asp:Panel>
        <div id="lbToolTip" style="z-index: 300; border-bottom: black 1px solid; position: absolute; border-left: black 1px solid; padding-bottom: 1px; background-color: infobackground; padding-left: 1px; width: 40px; padding-right: 1px; display: none; height: 22px; font-size: x-small; border-top: black 1px solid; top: 75px; border-right: black 1px solid; padding-top: 1px; left: 10px" ms_positioning="FlowLayout"></div>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
