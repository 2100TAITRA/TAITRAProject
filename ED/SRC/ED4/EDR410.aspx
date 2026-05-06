<%@ Page Language="c#" CodeBehind="EDR410.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR410" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR410 人民申請案件辦理情形查詢作業</title>
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
    <form id="EDR410" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_SectNo_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_UserNo_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_BTypeNo_List" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_BTypeNo_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlBTypeNo_Value" TabIndex="-1" runat="server" Width="165px" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                        <asp:DropDownList ID="lbDept" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlSect" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">承 辦 人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlBType" runat="server" Width="16em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">署收件號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpperDocNo" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">關 鍵 字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txKeyWord" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSRcvDate" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>&nbsp;～&nbsp;
						<asp:TextBox ID="txERcvDate" TabIndex="0" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:DropDownList ID="dlNoType" runat="server">
                            <asp:ListItem Value="DocNo" Selected="True">公文文號</asp:ListItem>
                            <asp:ListItem Value="CaseNo">案號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDocNo" TabIndex="0" runat="server" Width="8em" CssClass="InputFieldNumeric" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label13" runat="server">(起)─</asp:Label>
                        <asp:TextBox ID="txEDocNo" TabIndex="0" runat="server" Width="8em" CssClass="InputFieldNumeric" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server">(迄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label15" runat="server">自</asp:Label>
                        <asp:TextBox ID="txCount" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label16" runat="server">天起</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">待辦剩餘天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRemainDays" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>天以內
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">案件狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbComplement" runat="server" Text="補件中"></asp:CheckBox>
                        <asp:CheckBox ID="cbInspect" runat="server" Text="審查中"></asp:CheckBox>
                        <asp:CheckBox ID="cbClosed" runat="server" Text="辦結"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label11" runat="server">案件別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbCaseType0" runat="server" Text="檢驗"></asp:CheckBox>
                        <asp:CheckBox ID="cbCaseType1" runat="server" Text="綠標"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label12" runat="server">報表別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbVertical" runat="server" Text="直式" Checked="True" GroupName="ReportType"></asp:RadioButton>
                        <asp:RadioButton ID="rbHorizontal" runat="server" Text="橫式" GroupName="ReportType"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 15.5em;overflow:auto">
                    <asp:DataGrid scroll ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1" HeaderStyle-HorizontalAlign ="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號<br>承辦人 ">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="業務類別">
                                <ItemTemplate>
                                    <asp:Label ID="lbType_Name" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="會辦天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbCoworkDay" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="可使用<br>辦理天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbLEAD_TIME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="已使用<br>天數承廠">
                                <ItemTemplate>
                                    <asp:Label ID="lbTOTAL_USE_DAYS" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbUSE_DAYS" runat="server"></asp:Label>
                                    <asp:Label ID="lbSUPPLY_USE_DAYS" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="剩餘辦<br>理天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbREMAIN_DAYS" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="到期日">
                                <ItemTemplate>
                                    <asp:Label ID="lbDUE_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="結案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCLOSE_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="相關<br>文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlHAVE_COM" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_STATUS" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檢體數">
                                <ItemTemplate>
                                    <asp:Label ID="lbInspCount" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
