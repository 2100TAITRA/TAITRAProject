<%@ Page Language="c#" CodeBehind="AKS116.aspx.cs" AutoEventWireup="false" Inherits="AK.AKS116"%>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKS116 待點收公文查詢</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKS116" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div style="z-index: 103; position: absolute; width: 124px; display: none; height: 303px; top: 70px; left: 800px" ms_positioning="FlowLayout">
            <asp:TextBox ID="tbPageSize" TabIndex="-1" runat="server" Width="50px" Height="30px" EnableViewState="False"></asp:TextBox>
            <asp:TextBox ID="tbDocNoForTakeBack" TabIndex="-1" runat="server" Width="79px" Height="30px" EnableViewState="False"></asp:TextBox>
            <asp:ListBox ID="lbComNo" runat="server" Height="31px"></asp:ListBox>
            <asp:TextBox ID="txArch" runat="server" Width="48px"></asp:TextBox>
            <asp:TextBox ID="tbHideDocNo" runat="server" Width="48px"></asp:TextBox>
            <asp:TextBox ID="txFlag" runat="server" Width="48px"></asp:TextBox>
            <asp:TextBox ID="htxEmp" runat="server" Width="30px"></asp:TextBox>
            <asp:TextBox ID="hUserName" runat="server"></asp:TextBox>
            <asp:TextBox ID="txWEB_WORKPATH" runat="server" Width="78px"></asp:TextBox>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" Width="122px" Height="60px"></asp:ValidationSummary>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Text" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Text" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>&lt;
				<asp:TextBox ID="DOC_CHECK" runat="server" CssClass="hidden" Width="97px"></asp:TextBox>
            <asp:TextBox ID="USE_T2100_OD" runat="server" CssClass="hidden" Width="97px"></asp:TextBox>
            <asp:TextBox ID="H_txOrderType" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Info" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Info" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server" Width="6.5em">歸檔批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em;">
                        <asp:TextBox ID="txLotNoS" onkeyup="jf_CheckFull();" TabIndex="2" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp1" TabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        －
							<asp:TextBox ID="txLotNoE" onkeyup="jf_CheckFull();" TabIndex="3" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp2" TabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label2" runat="server" Width="7.5em">歸檔單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 25em;">
                        <cc1:ComboBox CssClass="comboBox" ID="dlSend" TabIndex="4" runat="server" Width="12.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label3" runat="server" Width="6.5em">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em;">
                        <asp:TextBox CssClass="DatePicker" ID="txDateS" onkeyup="jf_CheckFull();" TabIndex="10" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                        －
							<asp:TextBox CssClass="DatePicker" ID="txDateE" onkeyup="jf_CheckFull();" TabIndex="12" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label4" runat="server" Width="7.5em">承辦單位／人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32em;">
                        <cc1:ComboBox CssClass="comboBox" ID="dlDept" TabIndex="14" runat="server" Width="8em"></cc1:ComboBox>
                        <cc1:ComboBox CssClass="comboBox" ID="dlSect" TabIndex="45" runat="server" Width="7.5em" MaxLength="40"></cc1:ComboBox>
                        &nbsp;&nbsp;／
							<cc1:ComboBox CssClass="comboBox" ID="dlUser" TabIndex="16" runat="server" Width="3.5em" Rows="15"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR" id="trMgrINfo">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbMgrType" runat="server" Width="6.5em">歸檔類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em;">
                        <asp:RadioButton ID="rbOrg" runat="server" Text="機關檔" GroupName="MgrType" data-CN="機關檔"></asp:RadioButton>
                        <asp:RadioButton ID="rbPer" runat="server" Text="個人檔" GroupName="MgrType" data-CN="個人檔"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="MgrType" data-CN="全部"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="lbMgrUser" runat="server" Width="7.5em">歸檔人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em;">
                        <asp:DropDownList ID="dlMgrUser" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbFileCls" runat="server" Width="6.5em">案件類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em;">
                        <asp:DropDownList Style="z-index: 0" ID="dlFileCls" TabIndex="17" runat="server">
                            <asp:ListItem Value="AA">專案件</asp:ListItem>
                            <asp:ListItem Value="BB">列管件</asp:ListItem>
                            <asp:ListItem Value="">雜項件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label5" runat="server" Width="6.5em">公文類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em;">
                        <asp:CheckBox ID="cbPaperFile" TabIndex="20" runat="server" Width="5.5em" Text="紙本檔案"></asp:CheckBox>
                        <asp:CheckBox ID="cbEPaper" TabIndex="22" runat="server" Width="5.5em" Text="電子檔案"></asp:CheckBox>
                        <asp:Label ID="Label6" runat="server" Width="2.5em">抽樣</asp:Label>
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txLotRate" onkeyup="jf_CheckFull();" TabIndex="23" runat="server" Width="2.5em" MaxLength="2"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server" Width="1.5em">％</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label8" runat="server" Width="7.5em">詮釋資料：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:CheckBox ID="cbOk" TabIndex="26" runat="server" Width="5.5em" Text="正確"></asp:CheckBox>
                        <asp:CheckBox ID="cbErr" TabIndex="28" runat="server" Width="5.5em" Text="異常"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">&nbsp;</div>
                    <div class="dTD" style="width: 17.5em;">
                        <asp:CheckBox ID="cbNotEcFile" TabIndex="30" runat="server" Width="10.5em" Text="電子檔案未數位化附件"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label10" runat="server" Width="6.5em">機密等級：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:CheckBox ID="cbSec" TabIndex="35" runat="server" Width="5.5em" Text="密件"></asp:CheckBox><asp:CheckBox ID="cbNor" TabIndex="40" runat="server" Width="6.5em" Text="普通件"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label9" runat="server" Width="5.5em">排序：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:RadioButton ID="rbOrderDocNo" TabIndex="45" runat="server" Width="8.5em" Text="依公文文號" GroupName="G1" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderFile_Cls" TabIndex="45" runat="server" Width="7.5em" Text="依分類號" GroupName="G1"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderLotSeq" TabIndex="45" runat="server" Width="5.5em" Text="依批序" GroupName="G1"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrderExecDate" TabIndex="45" runat="server" Width="8.5em" Text="依歸檔時間" GroupName="G1"></asp:RadioButton>
                        <asp:Label ID="Label11" runat="server" Width="14.5em" ForeColor="#8080FF">(*最多顯示200筆待點收公文)</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="dgTool">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Button ID="btClear" AccessKey="C" runat="server" Width="4.5em" Text="清除(C)" ToolTip="清除(Alt+C)"></asp:Button>
                        <asp:Button ID="btAll" AccessKey="A" runat="server" Width="4.5em" Text="全選(A)" ToolTip="全選(Alt+A)"></asp:Button>
                        <asp:Button ID="btRever" AccessKey="N" runat="server" Width="4.5em" Text="反向(N)" ToolTip="反向(Alt+N)"></asp:Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:Label ID="laSetItem" runat="server" Width="80px">設定項目：</asp:Label>
                        <asp:RadioButton ID="rbAcpSelect" TabIndex="50" runat="server" Width="93px" Height="5px" Text="點收選取" GroupName="g99" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbViewFile" TabIndex="52" runat="server" Width="129px" Height="10px" Text="瀏覽文件選取" GroupName="g99"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 275px;">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" PageSize="50" CellPadding="1">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="詮釋資料">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlErr" runat="server" Width="31px"></asp:HyperLink>
                                            <asp:Label ID="lbErr" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選取">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" runat="server" Width="30px" Checked="True"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="瀏覽文件">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbView" runat="server" Width="30px"></asp:CheckBox>
                                            <asp:Button ID="btViewDoc" runat="server" Text="瀏覽" />
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeqNo" runat="server">123</asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlDocNo" runat="server">0920000001</asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文主旨">
                                        <ItemTemplate>
                                            <asp:TextBox Style="border-bottom: 0px; border-left: 0px; overflow-x: hidden; overflow-y: hidden; border-top: 0px; border-right: 0px" ID="lbDocFromSubject" TabIndex="-1" runat="server" CssClass="PopUp" Width="100%"  TextMode="MultiLine" Rows="3" ReadOnly="True">
                                </asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔案類別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocFileType" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="來文機關" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFromOrgName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="歸檔<BR>送件日">
                                        <ItemTemplate>
                                            <asp:Label ID="lbCloseDate" runat="server">092/01/01</asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="歸檔單位">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSendName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦單位<BR>承辦人">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDeptName" runat="server"></asp:Label><BR>
                                            <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="分類號<BR>密等">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFileCls" runat="server" Height="11px"></asp:Label><BR>
                                            <asp:Label ID="lbSecName" runat="server">普通</asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="母文文號">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlComNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="異常訊息">
                                        <ItemTemplate>
                                            <asp:Label ID="lbErrMsg" runat="server" Width="76px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="歸檔批號<BR>前次退文原因">
                                        <ItemTemplate>
                                            <asp:Label ID="lbdgLotNo" runat="server" Width="76px"></asp:Label><BR>
                                            <asp:Label ID="lbBackReason" runat="server" Width="76px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="確定(S)" AccessKey="S" title="確定(Alt+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="瀏覽文件(P)" AccessKey="P" title="瀏覽文件(Alt+P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出EXCEL(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
