<%@ Page Language="c#" CodeBehind="ODT352.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT352" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT352 發文登錄批次作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal></head><body ms_positioning="GridLayout">
        <form id="ODT352" onkeyup="jf_CheckFull();" method="post" runat="server">
            <!--Template V2 Generated WebForm-->
            <!--#include file="Template/Res/GenericChild.htm"-->
            <object style="width: 0px; height: 0px" id="PDF" classid="CLSID:210FF79A-A4A1-429F-BABC-0B0A574B8748" data="data:application/x-oleobject;base64,mvcPIaGkn0K6vAsKV0uHSAADAAAAAAAAAAAAAA==" viewastext></object>
            <object style="display: none" id="LoginCOM" codebase="dll\LoginCOM.dll" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88" viewastext></object>
            <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:TextBox ID="H_AutoTransDi" runat="server" CssClass="hidden"></asp:TextBox>
            <div id="BaseTable" class="DivBaseTable">
                <div id="MainTable" class="DivTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label1" runat="server">顯示來源：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlSource" runat="server" AutoPostBack="True">
                                <asp:ListItem Value="0" Selected="True">未執行發文資料更新公文</asp:ListItem>
                                <asp:ListItem Value="1">已執行發文資料更新公文</asp:ListItem>
                                <asp:ListItem Value="2">全部</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="InputFieldNumeric" Width="8em" MaxLength="15"></asp:TextBox>
                            <asp:Button ID="btConfirm" TabIndex="11" runat="server" Text="確認"></asp:Button>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label13" runat="server">發文別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbAll" runat="server" Text="總發文" GroupName="IssueType"></asp:RadioButton>
                            <asp:RadioButton ID="rbUnit" runat="server" Text="單位發文" GroupName="IssueType"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR" id="trsend">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="lbSendMode" runat="server">傳送：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbReturn" runat="server" Text="退回" GroupName="gt"></asp:RadioButton><br>
                            <asp:RadioButton ID="rbArchive" runat="server" Text="歸檔(續辦公文退回不歸檔)" GroupName="gt"></asp:RadioButton><br>
                            <asp:RadioButton ID="rbNone" runat="server" Text="無" GroupName="gt"></asp:RadioButton><br>
                            <asp:RadioButton ID="rbETypeArc" runat="server" Text="僅將線上簽核公文依是否續辦退回或歸檔" GroupName="gt"></asp:RadioButton><br>
                            <div id="trStamp"><asp:RadioButton ID="rbStamp" runat="server" Text="用印" GroupName="gt"></asp:RadioButton></div>
                        </div>
                    </div>
                    <div class="hide">
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="Label3" runat="server">Email通知：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="cbEmailNotifyMain" runat="server" Text="正本"></asp:CheckBox>
                            <asp:CheckBox ID="cbEmailNotifyCopy" TabIndex="20" runat="server" Text="副本"></asp:CheckBox>
                            <asp:CheckBox ID="cbEmailNotifyScript" TabIndex="21" runat="server" Text="抄件"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6em"></div>
                        <div class="dTD">
                            <asp:CheckBox ID="cbPostBullet" TabIndex="22" runat="server" Visible="False" Text="發佈至系統公告"></asp:CheckBox>
                        </div>
                    </div>
                </div>
                <asp:TextBox ID="txCheckFile" runat="server" CssClass="hidden"></asp:TextBox>
                <div class="DivTable">
                    <div class="dTR" id="tbSelect"">
                        <asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
                            <asp:Button ID="btSelectAll" TabIndex="30" runat="server" Text=" 全選 "></asp:Button>
                            <asp:Button ID="btClean" TabIndex="40" runat="server" Text=" 清除 "></asp:Button>
                            <asp:Button ID="btReverse" TabIndex="50" runat="server" Text=" 反向 "></asp:Button>
                        </asp:Panel>
                    </div>
                    <div class="GridDiv" style="height: 13.5em">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        <asp:Label ID="lbLegislatorNo" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="lbSignType" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="lbMsgId" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="lbReturnInfo" runat="server" CssClass="hide"></asp:Label>
                                        <asp:Label ID="lbArchiveInfo" runat="server" CssClass="hide"></asp:Label>
										<asp:Label ID="lbDeptName" runat="server" CssClass="hide"></asp:Label>
										<asp:Label ID="lbOwnOuId" runat="server" CssClass="hide"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txSubject" runat="server" CssClass="PopUp" Width="10.5em" ReadOnly="True"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文字號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbIssueNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDate" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="單筆登錄">
                                    <ItemTemplate>
                                        <asp:Button ID="btExec" runat="server" Text="執行"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn Visible="False" HeaderText="公文製作">
                                    <ItemTemplate>
                                        <asp:Button ID="btEdit" runat="server" Text="編輯"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn Visible="False" HeaderText="系統公告">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbBulletin" runat="server" Text="發布"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="簽核類型">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSignType2" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文別">
                                    <ItemTemplate>
                                        <asp:Label ID="lbIType" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="續辦">
                                    <ItemTemplate>
                                        <asp:Label ID="lbCaseCon" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="重新發文原因<br>重新發文備註">
                                    <ItemStyle Wrap="false"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbDmTypeDesc" runat="server"></asp:Label><br>
                                        <asp:Label ID="lbDmDesc" runat="server"></asp:Label>
                                        <asp:TextBox ID="txDmType" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
                <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="發文結案" ID="btUpdate"></asp:Button>
                <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="發文轉出" ID="btTransfer"></asp:Button>
                <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" Text="發文路徑設定" ID="btSetup"></asp:Button>
            </asp:Panel>

            <asp:CustomValidator Style="z-index: 102; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary Style="z-index: 103; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
            <asp:ListBox ID="lbIssuePath" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:ListBox ID="lbPrintXSLPath" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:TextBox ID="txCommonWS" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_PDFMode" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_NotifyRole" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_DIType" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_EnvDIType" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Artifact" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txSendMode" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="nIsTrans" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="h_txRole" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="h_txOD17UnitNo" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_TransAttSize" runat="server" CssClass="hidden"></asp:TextBox>
        </form>
        <xml id="data" src="C:\\2100\\ISSUE.XML"></xml>
    </body>
</html>
