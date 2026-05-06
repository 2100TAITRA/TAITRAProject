<%@ Page Language="c#" CodeBehind="EAT831_MOCS.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT831_MOCS" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT831 調案批次登錄作業</title>
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
    <form id="EAT831_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14em">
                        <asp:RadioButton ID="rbSearchMode" runat="server" Text="查調登錄" GroupName="rbMode" Checked="true"></asp:RadioButton>
                        <asp:Label ID="Label5" runat="server">　　　申請日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30.5em">
                        <asp:TextBox ID="txappltDates" class="DatePicker" runat="server" Width="4em" MaxLength="7" TabIndex="10"></asp:TextBox>
                        <asp:DropDownList ID="dlHHs" runat="server" Width="3em" Rows="10"></asp:DropDownList>：
                        <asp:DropDownList ID="dlMMs" runat="server" Width="3em" Rows="10"></asp:DropDownList>
                        <asp:Label ID="Label8" runat="server">至</asp:Label>
                        <asp:TextBox ID="txappltDatee" class="DatePicker" runat="server" Width="4em" MaxLength="7" TabIndex="20"></asp:TextBox>
                        <asp:DropDownList ID="dlHHe" runat="server" Width="3em" Rows="10"></asp:DropDownList>：
                        <asp:DropDownList ID="dlMMe" runat="server" Width="3em" Rows="10"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14em">
                        <asp:Label ID="Label11" runat="server">調案類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="borType" Checked="true"></asp:RadioButton>
                        <asp:RadioButton ID="rbORG" runat="server" Text="機關檔" GroupName="borType"></asp:RadioButton>
                        <asp:RadioButton ID="rbPer" runat="server" Text="個人檔" GroupName="borType"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14em">
                        <asp:Label ID="Label14" runat="server">調案單狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbBortAll" runat="server" Text="全部" GroupName="UrType"></asp:RadioButton>
                        <asp:RadioButton ID="rbBorUr" runat="server" Text="申請中" GroupName="UrType" Checked="true"></asp:RadioButton>
                        <asp:RadioButton ID="rbBorNo" runat="server" Text="已登錄待歸還" GroupName="UrType"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">姓名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFullName" TabIndex="0" runat="server" Width="10em" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14em">
                        <asp:Label ID="Label199" runat="server">歸檔人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlMgrUser" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 15em">
                        <asp:Label ID="Label4" runat="server">四角號碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txFourNo" TabIndex="0" runat="server" Width="5em" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14em">
                        <asp:Label ID="Label1" runat="server">調案單位/調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                        <asp:DropDownList ID="dlUser" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                        <asp:TextBox ID="H_userID" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_UerInfo" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_txDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">調案單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16.5em">
                        <asp:TextBox ID="txBorNoS" runat="server" CssClass="InputFieldNumeric" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelpS" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>－
                        <asp:TextBox ID="txBorNoE" runat="server" CssClass="InputFieldNumeric" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelpE" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" >
                        <asp:RadioButton ID="rbEntryMode" runat="server" Text="直接登錄" GroupName="rbMode"></asp:RadioButton>
                        <asp:Label ID="Label59" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="hide">
                    <asp:Button ID="btDgClear" runat="server" Text="清除" />
                    <asp:Button ID="btDgAll" runat="server" Text="全選" />
                    <asp:Button ID="btDgInverse" runat="server" Text="反向" />
                </asp:Panel>
                <div class="GridDiv" id="MainDGTable" style="height: 18.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbborflag" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_BorNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="h_MgrUser" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="h_Reason" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請日期<BR/>申請時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbApplyDate" runat="server"></asp:Label><br />
                                    <asp:Label ID="lbApplyTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbApplyStatus" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號/檔號/文冊註記/四角號碼">
                                <ItemTemplate>
                                    <asp:Button runat="server" Text="文冊註記" ID="btSetDetail"></asp:Button>
                                    <asp:Label ID="lbfourno" runat="server"></asp:Label><br />
                                    <asp:Label ID="lbBorDetailInfo" runat="server"></asp:Label>
                                    <asp:TextBox ID="tx_DocLIst" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txCloseDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txDocNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txFileNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_DOCCNT" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="身分證號/姓名">
                                <ItemTemplate>
                                    <asp:Label ID="lbPersonInfo" runat="server"></asp:Label><br />
                                    <asp:Label ID="lbPersonName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由(或案名)">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileSubJect" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單位<BR/>調案人">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorDept" runat="server"></asp:Label>
                                    <asp:Label ID="lbBorUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="取消原因">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlCancelReason" runat="server" CssClass="InputFieldText" ></asp:DropDownList>
                                    <asp:TextBox ID="TxCanCelReason" runat="server" Width="95%" CssClass="" Height="2em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>

            </div>
            <div class="hide" id="GridTable2">
                <div class="GridDiv" id="SubDGTable" style="height: 18.5em">
                    <asp:DataGrid ID="dg2" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案類型">
                                <ItemTemplate>
                                    <asp:RadioButton ID="rbOrgType" runat="server" Text="機關檔" GroupName="rbApplyMode" Checked="true"></asp:RadioButton>
                                    <asp:RadioButton ID="rbPerSonType" runat="server" Text="個人檔" GroupName="rbApplyMode"></asp:RadioButton>
                                    <asp:TextBox ID="H_BorNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單位">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlDeptDG2" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                                    <asp:DropDownList ID="dlSectDG2" runat="server" Width="8.5em" Rows="10" CssClass="hide"></asp:DropDownList>
                                    <asp:TextBox ID="dg2H_txDeptName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dg2H_txDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案人">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlUserDG2" runat="server" Width="6.5em" Rows="10"></asp:DropDownList>
                                    <asp:TextBox ID="dg2H_userID" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dg2H_txuserName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dg2H_userInfo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                             <asp:TemplateColumn HeaderText="身分證號/姓名">
                                <ItemTemplate>
                                    <asp:Label ID="lbid" runat="server">身分證號</asp:Label>
                                    <asp:TextBox ID="txFullID" runat="server" Width="6.5em" CssClass="InputEnUpperField" ></asp:TextBox><br/>
                                    <asp:Label ID="lbName" runat="server">　　姓名</asp:Label>
                                    <asp:TextBox ID="txFullName" runat="server" Width="10em"></asp:TextBox>
                                    <asp:ImageButton ID="btSearchPser" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                                    <asp:TextBox ID="h_MgrKey" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="h_txFourNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="h_MgrUser" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號/檔號/文冊註記">
                                <ItemTemplate>
                                    <asp:Button runat="server" Text="文冊註記" ID="btSetDetail"></asp:Button>
                                    <asp:Label ID="lbfourno" runat="server"></asp:Label>
                                    <asp:Label ID="lbBorDetailInfo" runat="server"></asp:Label>
                                    <asp:TextBox ID="txBorDetailInfo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="lbDocNo" runat="server">文(編)號</asp:Label>
                                    <asp:TextBox ID="txDocNo" runat="server" Width="10em"></asp:TextBox>
                                    <asp:TextBox ID="txCloseDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="tx_DocLIst" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_DOCCNT" runat="server" CssClass="hide"></asp:TextBox><br />
                                    <asp:Label ID="lbFileNo" runat="server">檔號</asp:Label>
                                    <asp:TextBox ID="txFileNo" CssClass="DisplayOnly" runat="server" MaxLength="42" Width="16em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                           
                            <asp:TemplateColumn HeaderText="案由(或案名)">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="20em" CssClass="PopUp" ForeColor="Navy"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:block;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Text="預覽調案單" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="登錄" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Text="預覽簽收簿" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview2"></asp:Button>
            <asp:Button runat="server" Text="取消調案" DefaultStyle="newmode:block;modifymode:block;" ID="btDelete"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
