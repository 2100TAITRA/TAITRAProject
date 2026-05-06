<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT270.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT270" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT270 批次傳送作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <script>
        if (typeof theLogger == 'undefined' || theLogger === null) {
            theLogger = console;
        }
    </script>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT270" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:DropDownList ID="dlAllSubUnit" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="dllAllAppRole" runat="server"></asp:DropDownList>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTD">
                        <fieldset>
                            <legend>流程設定</legend>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5em;">
                                    <asp:Label ID="Label1" runat="server">傳送至：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 1.5em;">
                                    <asp:RadioButton Style="z-index: 0" ID="rbInchargeOu" TabIndex="5" runat="server" GroupName="rbSendTarget" Text=""></asp:RadioButton>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:Label ID="Label5" runat="server">原承辦單位/原承辦人</asp:Label>
                                </div>
                            </div>
                            <div class="dTR" id="trReject">
                                <div class="dTDTitle" style="width: 5em;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="dTD" style="width: 1.5em;">
                                    <asp:RadioButton Style="z-index: 0" ID="rbRejectOu" TabIndex="10" runat="server" GroupName="rbSendTarget" Text=""></asp:RadioButton>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:Label ID="Label11" runat="server">退文</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5em;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="dTD" style="width: 1.5em;">
                                    <asp:RadioButton Style="z-index: 0" ID="rbCustomOu" TabIndex="15" runat="server" GroupName="rbSendTarget" Text=""></asp:RadioButton>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:Label ID="Label2" runat="server">[單位]</asp:Label>
                                    <asp:DropDownList ID="ddlFlowUnit" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="dTR" id="trFlowSubUnit">
                                <div class="dTDTitle" style="width: 5em;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="dTD" style="width: 1.5em;">
                                    &nbsp;
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:Label ID="Label6" runat="server">[科別]</asp:Label>
                                    <asp:DropDownList ID="ddlFlowSubUnit" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5em;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="dTD" style="width: 1.5em;">
                                    &nbsp;
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:Label ID="Label3" runat="server">[角色]</asp:Label>
                                    <asp:DropDownList ID="ddlFlowRole" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5em;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="dTD" style="width: 1.5em;">
                                    &nbsp;
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:Label ID="Label4" runat="server">[人員]</asp:Label>
                                    <asp:DropDownList ID="ddlFlowUser" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset>
                            <legend>擬辦設定</legend>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    <asp:DropDownList ID="ddlAppType" runat="server" Style="width: 5em"></asp:DropDownList>
                                    <asp:Label ID="Label7" runat="server">：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:DropDownList ID="ddlApply" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:CheckBox ID="cbAutoApp" runat="server" Text="依流程自動設定核決者"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    <asp:Label ID="Label8" runat="server">發文類型：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:RadioButton Style="z-index: 0" ID="rbSame" TabIndex="10" runat="server" GroupName="rbCloseType" Text="原設定"></asp:RadioButton>
                                    <asp:RadioButton Style="z-index: 0" ID="rbO" TabIndex="10" runat="server" GroupName="rbCloseType" Text="總發文"></asp:RadioButton>
                                    <asp:RadioButton Style="z-index: 0" ID="rbU" TabIndex="10" runat="server" GroupName="rbCloseType" Text="單位發文"></asp:RadioButton>
                                    <asp:RadioButton Style="z-index: 0" ID="rbSave" TabIndex="10" runat="server" GroupName="rbCloseType" Text="存查"></asp:RadioButton>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    <asp:Label ID="Label9" runat="server">歸檔類型：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:RadioButton Style="z-index: 0" ID="rbOrgStore" TabIndex="10" runat="server" GroupName="rbStoreType" Text="檔案室"></asp:RadioButton>
                                    <asp:RadioButton Style="z-index: 0" ID="rbUnitStore" TabIndex="10" runat="server" GroupName="rbStoreType" Text="單位庫房"></asp:RadioButton>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    <asp:Label ID="Label10" runat="server">原因註紀：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:DropDownList ID="ddlRemark" runat="server" Style="width: 5em"></asp:DropDownList>
                                    <asp:TextBox Style="z-index: 0" ID="txRemark" TabIndex="50" runat="server" Width="5em" MaxLength="20"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    <asp:Label ID="lbClsNo" runat="server">分類號：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:TextBox Style="z-index: 0" ID="txClsNo" TabIndex="50" runat="server" Width="3.5em"></asp:TextBox>
                                    <asp:Label ID="lbKeepYear" runat="server">保存年限：</asp:Label>
                                    <asp:TextBox Style="z-index: 0" ID="txKeepYear" TabIndex="50" runat="server" Width="2.7em" CssClass="InputFieldNumeric"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 7em;">
                                    <asp:Label ID="lbFileYear" runat="server">年度號：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 20em;">
                                    <asp:TextBox Style="z-index: 0" ID="txFileYear" TabIndex="50" runat="server" Width="2.7em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                                    <asp:Label ID="lbFileCase" runat="server">案次號：</asp:Label>
                                    <asp:TextBox Style="z-index: 0" ID="txFileCase" TabIndex="50" runat="server" Width="6.5em" MaxLength="12"></asp:TextBox>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD DgSelectToolBar">
                        <asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btChange" runat="server" Text="反向"></asp:Button>
                        <asp:Label ID="Label13" runat="server" Font-Size="Smaller">檔案數量：</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txFileCnt" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server" Font-Size="Smaller">公文文號：</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txDocNo2" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Button ID="btDocNo2" runat="server" Text="確認"></asp:Button>
                        <asp:CheckBox ID="cbSet" runat="server" Text="確認時一併設定流程及擬辦資訊" Font-Size="Smaller"></asp:CheckBox>
                        <asp:Label ID="Label15" runat="server" Font-Size="Smaller">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勾選傳送筆數：</asp:Label>
                        <asp:Label ID="CheckSendCount" runat="server" Font-Size="Smaller"></asp:Label>
                        <asp:Label ID="Label12" runat="server" Font-Size="Smaller">筆</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 400px;">
                            <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="傳送">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbDgSend" runat="server" onclick="RecordCheckDocIndex(this,1)"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="設定">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbDgSet" runat="server" onclick="RecordCheckDocIndex(this,2)"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="狀態">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDgStatus" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgDocNo" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgOrgNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgWebService" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgStoragePath" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgSubDir" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgDocState" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgInCharge" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgIcOuName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgIcUserId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgIcUserName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgOwnOuId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgMsgId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgFolder" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgSubFolder" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgNewByOu" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgIsOuRcv" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgBTypeNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgMeetDate" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgXmlInfo" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔案<br>數量">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txdgFileCnt" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="年度號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgFileYear" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgFileYear" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="分類號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgFileCls" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgFileCls" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="保存<br>年限">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgKeepYear" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgKeepYear" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="案次號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgFileCase" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgFileCase" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemStyle HorizontalAlign="Left" />
                                        <ItemTemplate>
                                            <asp:Label ID="lbDgSubject" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="核決者">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgAppUserName" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgAppUserName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgAppUserId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgAppRoleId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgRejectUserName" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="異動別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgTxName" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgTxName" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="傳送至">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgSendTarget" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgToUserId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgToUserName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgToOuId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgToOuName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgToRoleId" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgToRoleName" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發文<br>設定">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgCloseType" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgCloseType" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="歸檔<br>類型">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgStoreType" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgStoreType" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txdgOldStoreType" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="原因註紀">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgRemark" runat="server"></asp:Label>
                                            <asp:TextBox ID="txdgRemark" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSubFolder" runat="server" Text="文件盒" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:DropDownList ID="ddlSubFolder" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btSet" runat="server" Text="設定(S)" AccessKey="S" title="傳送(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block" />
            <asp:Button ID="btTransfer" runat="server" Text="傳送(R)" AccessKey="R" title="傳送(ALT+R)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSetTransfer" runat="server" Text="設定並傳送(B)" AccessKey="B" title="設定並傳送(ALT+B)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
