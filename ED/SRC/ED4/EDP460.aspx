<%@ Page Language="c#" CodeBehind="EDP460.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDP460" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EDP460 公文彙併辦設定作業</title>
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
    <form id="EDP460" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDIV" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txOrgNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txRoleNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_NewDocList" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_MainCloseDate" runat="server"></asp:TextBox>
            <asp:TextBox ID="txMainLastUpdateProg" runat="server"></asp:TextBox>
            <asp:TextBox ID="txMainLastUpdateTime" runat="server"></asp:TextBox>
            <asp:TextBox ID="txIsAudit" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_ComSignType" runat="server" CssClass="hidden"></asp:TextBox>

            <asp:TextBox ID="H_txComNoNewByOu" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txDocNoNewByOu" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txOldComNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txNewComNo" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbComNo" runat="server" CssClass="KeyField">母文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txComNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbLocation" runat="server" Width="5em">目前位置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em;">
                        <asp:TextBox ID="txLocation" runat="server" Width="6em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" runat="server" id="hgcClassNo">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbCls" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txCls" TabIndex="0" runat="server" Width="3.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="txClsName" runat="server" Width="12.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbKeepYear" runat="server" Width="5em">保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em;">
                        <asp:TextBox ID="txKeepYear" runat="server" Width="2em" CssClass="DisplayOnly" MaxLength="2" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbCnt" runat="server">頁數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txCnt" TabIndex="0" runat="server" Width="2em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_txSubFolder" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txOuId" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txUserName" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txClsKey" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txOuName" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txDocPty" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txBType" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txRpsSectNo" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txRpsSectName" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txStartDate" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txDueDate" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txMainComNo" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txEmpName" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txRpsDeptNo" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txRpsDeptName" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txSumType" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txCanAppRoleList" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txDeptNo" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txSelectedIdx" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txFileYear" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txFileCase" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:CheckBox ID="cbComType" TabIndex="0" runat="server" CssClass="hidden" Text="彙辦"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em;">
                    </div>
                    <div class="dTD" style="width: 8em;">
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbSubject" runat="server">母文主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 26em;" colspan="3">
                        <asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="29em" CssClass="DisplayOnly" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="min-height:1px; width:5em"></div>
                    <div class="dTD" style="width: 14em;">&nbsp;</div>
                    <div class="dTD" style="width: 20em;">
                        <asp:Label ID="lbNewDocNo" runat="server">新加入公文：</asp:Label>
                        <asp:TextBox ID="txNewDocNo" runat="server" Width="5.5em" CssClass="DisplayOnly" MaxLength="10" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_txNewRcvDate" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txMsgId" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txNewSubFolder" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txDelMsgId" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txSignType" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txNewDocDueDate" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txIsRcvFile" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txRcvFileCnt" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txNewDocSDate" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txNewLastUpdateProg" runat="server" CssClass="hidden"></asp:TextBox>
                        <asp:TextBox ID="H_txNewLastUpdateTime" runat="server" CssClass="hidden"></asp:TextBox>
                        <!--<asp:CheckBox id="cbComStatus" runat="server" Text="併件"></asp:CheckBox>-->
                        <asp:Button Style="z-index: 0" ID="btOpenSearch" runat="server" Text="查詢"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="min-height:1px; width:5em"></div>
                    <div class="dTD" style="width: 14em;">
                        <asp:Label ID="Label1" runat="server">目前彙併辦公文：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <asp:Label ID="lbNewCnt" runat="server" Width="6em">頁　　　數：</asp:Label>
                        <asp:TextBox ID="txNewCnt" runat="server" Width="2em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="lbAppUserName" runat="server" Width="6em" CssClass="hide">核決者：</asp:Label>
                        <asp:DropDownList ID="dlAppUserName" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:Button ID="btNewAdd" runat="server" Text="加入"></asp:Button>
                        <asp:Button Style="z-index: 0" ID="btBatchAddNew" runat="server" Text="加入" CssClass="hide"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="min-height:1px; width:5em"></div>
                    <div class="dTD" style="width: 14em;">
                        <asp:Panel ID="tbSelect1" CssClass="DgSelectToolBar" runat="server">
                            <asp:Button ID="btSelectAll1" runat="server" Text="全部選取" />
                            <asp:Button ID="btSelectInverse1" runat="server" Text="反向選取" />
                        </asp:Panel>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
                            <asp:Button ID="btSelectAll" runat="server" Text="全部選取" />
                            <asp:Button ID="btSelectInverse" runat="server" Text="反向選取" />
                            <asp:Button ID="btDeleteSelected" runat="server" Text="刪除選取" />
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="min-height:1px; width:5em"></div>
                    <div class="dTD" style="width: 14em;">
                        <div class="GridDiv" style="height: 210px;">
                            <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDg1DocNo" runat="server" Width="5.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg1SignType" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg1DueDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="txDg1LastUpdateProg" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="txDg1LastUpdateTime" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg1PDueDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="txDg1StartDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txCombineType" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg1PduteDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg1OduteDate" runat="server" CssClass="hidden"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="頁數">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDg1Cnt" TabIndex="0" runat="server" Width="2em" MaxLength="20"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn>
                                        <HeaderTemplate>
                                            <asp:Label ID="Label2" runat="server">併同歸檔</asp:Label><br>
                                            <asp:Label ID="Label3" runat="server">數量</asp:Label>
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDg1FileCnt" TabIndex="0" runat="server" Width="2em" CssClass="TextLabel" MaxLength="20" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <div class="GridDiv" style="height: 210px;">
                            <asp:DataGrid ID="dg2" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO2" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect2" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDg2DocNo" runat="server" Width="5.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2SubFolder" runat="server" Width="2em" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2RcvDate" runat="server" Width="2em" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2MsgId" runat="server" Width="2em" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2DelMsgId" runat="server" Width="2em" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2SDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2DDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="txDg2LastUpdateProg" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="txDg2LastUpdateTime" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2PdueDate" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2OdueDate" runat="server" CssClass="hidden"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="頁數">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDg2Cnt" TabIndex="0" runat="server" Width="2em" MaxLength="20"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="併件">
                                        <ItemTemplate>
                                            <!--<asp:TextBox id="txDg2ComStatus" runat="server" Width="2em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>-->
                                            <asp:CheckBox ID="cbDg2ComStatus" TabIndex="0" runat="server" onclick="if_CheckComStatus()"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn>
                                        <HeaderTemplate>
                                            <asp:Label ID="Label4" runat="server">併同歸檔</asp:Label><br>
                                            <asp:Label ID="Label5" runat="server">數量</asp:Label>
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDg2FileCnt" TabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2SignType" runat="server" CssClass="hidden"></asp:TextBox>
                                            <asp:TextBox ID="H_txDg2IsRcvFile" runat="server" CssClass="hidden"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn>
                                        <HeaderTemplate>
                                            <asp:Label ID="Label6" runat="server">更新分類</asp:Label><br>
                                            <asp:Label ID="Label7" runat="server">案次號</asp:Label>
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbDg2UpdateClsCase" TabIndex="0" runat="server" onclick="if_CheckComStatus()"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btAdd" AccessKey="S" title="新增彙併辦(ALT+S)" runat="server" Text="新增彙併辦(S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btRemove" AccessKey="R" title="解除彙併辦(ALT+R)" runat="server" Text="解除彙併辦(R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btModify" AccessKey="U" title="修正數量(ALT+U)" runat="server" Text="修正數量(U)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
