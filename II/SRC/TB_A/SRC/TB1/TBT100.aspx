<%@ Page Language="c#" CodeBehind="TBT100.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBT100"%>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<!DOCTYPE HTML>
<html>
<head>
    <title runat="server" id="titleControl">TBT100 公告張貼與維護作業</title>
    <!--"Matte 0960927 001665 新增系統參數設定title"-->
    <!--"Matte 0960713 000966 新增附件描述欄位"-->
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="TBT100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../TBLIB/GenericBanner.htm"-->
        <!--0960713 000966 MATTE 新增hideattdesc-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator" Width="20px"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" Width="20px"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="20px"></asp:ListBox>
            <asp:TextBox ID="txDelFileNames" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileNames" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileTypes" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileSizes" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="hideattdesc" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="strDgFileName" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="strDgFilesize" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txInsideTBWS" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txOutsideTBWS" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txFileSizeLimit" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txFileLocation" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSubDir" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txManager" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txPasteDaysType" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txEmailTo" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txBoardSide" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txArrowData" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txEnableOD17" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txNewAttName" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txNewAttType" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txNewAttSize" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txNewAttDesc" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_ServiceURL" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_OrgNo" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="WEDEP_SERVER_NAME" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_RbEmailType" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_txDispatch" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txDocNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txAllPasteDate" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label1" runat="server" CssClass="KeyField">公告編號：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 11em;">
                                <asp:TextBox ID="txBulletinId" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="8"></asp:TextBox>
                            </div>
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label5" runat="server">發布單位：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 11em;">
                                <asp:Label ID="lbUnitCode" runat="server" CssClass="hide"></asp:Label>
                                <asp:DropDownList ID="dlUnit" runat="server"></asp:DropDownList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label2" runat="server">公布欄：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:RadioButton ID="rbInside" runat="server" Text="內部公布欄" GroupName="rbBoardSide" Enabled="False"></asp:RadioButton>
                                &nbsp;
									<asp:RadioButton ID="rbBoth" runat="server" Text="內部與外部公布欄" GroupName="rbBoardSide" Enabled="False"></asp:RadioButton>
                                &nbsp;
									<asp:RadioButton ID="rbOutside" runat="server" Text="外部公布欄" GroupName="rbBoardSide" Enabled="False"></asp:RadioButton>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label9" runat="server">類別：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 11em;">
                                <asp:DropDownList ID="dlCategory" runat="server"></asp:DropDownList>
                            </div>
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label3" runat="server">公告日期：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 11em;">
                                <asp:TextBox ID="txPasteDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label7" runat="server">刊登天數：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 11em;">
                                <asp:TextBox ID="txPasteDays" TabIndex="0" runat="server" Width="30px" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                <asp:Label ID="Label13" runat="server">天&nbsp;&nbsp;</asp:Label>
                            </div>
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label4" runat="server">公告期限：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 11em;">
                                <asp:TextBox ID="txExpireDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR" id="Range_Show">
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="lbRange" runat="server" CssClass="hide">公告範圍：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:RadioButton ID="rbRange1" runat="server" Text="會內" GroupName="rbRangeType" CssClass="hide"></asp:RadioButton>
                                <asp:RadioButton ID="rbRange2" runat="server" Text="下屬機關" GroupName="rbRangeType" Checked="True" CssClass="hide"></asp:RadioButton>
								<asp:RadioButton ID="rbRange3" runat="server" Text="民眾" GroupName="rbRangeType" CssClass="hide"></asp:RadioButton>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6em;">
                                <asp:Label ID="Label11" runat="server" Width="81px">公告對象：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:RadioButton ID="rbOrg" runat="server" Text="全機關" GroupName="rbAllowType" Checked="True"></asp:RadioButton>
                                &nbsp;
									<asp:RadioButton ID="rbUnit" runat="server" Text="本單位" GroupName="rbAllowType"></asp:RadioButton>
                                &nbsp;
									<asp:RadioButton ID="rbOther" runat="server" Text="其他" GroupName="rbAllowType"></asp:RadioButton>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:Button ID="btCleanAll" runat="server" Text="清除全部"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6em;">&nbsp;</div>
                            <div class="dTD">
                                <div class="GridDiv" style="height: 190px;" data-fixed="true">
                                    <asp:DataGrid ID="dgtarget" runat="server" AutoGenerateColumns="False" PageSize="1" CellPadding="0" GridLines="Vertical">
                                        <HeaderStyle HorizontalAlign="Center" BackColor="#5f9cc5"></HeaderStyle>
                                        <Columns>
                                            <asp:TemplateColumn HeaderText="序">
                                                <ItemTemplate>
                                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="名稱">
                                                <ItemTemplate>
                                                    <asp:TextBox ID="txOrgNo" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="txIdType" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="txOrgCode" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="txGroupCode" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="txUnitCode" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="txRoleCode" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="txUserCode" TabIndex="-1" runat="server" Width="7px" CssClass="hide"></asp:TextBox>
                                                    <asp:TextBox ID="lbtargetName" TabIndex="-1" runat="server" CssClass="TextLabel" Width="8em"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="<input type=checkbox id=cbSelectEmail onclick=fnCheckAll('cbSelectEmail') >通知">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelectEmail" TabIndex="0" runat="server" Text="Email"
                                                        onclick="fnCheckUnitUnChecked();fnUnCheckAll('cbSelectEmail');fnUnCheckAll('cbSelectUnit');"></asp:CheckBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="<input type=checkbox id=cbSelectUnit onclick=fnCheckAll('cbSelectUnit')>只通知登記桌">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelectUnit" title="對象為機關或單位時，只通知單位登記桌" TabIndex="0"
                                                        runat="server" Text="只通知登記桌" onclick="fnCheckMailChecked();fnUnCheckAll('cbSelectUnit');fnUnCheckAll('cbSelectEmail');"></asp:CheckBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="<input type=checkbox id=cbSelectAttach onclick=fnCheckAll('cbSelectAttach')>附件">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelectAttach" TabIndex="0" runat="server" Text="隨Email寄出"
                                                        onclick="fnUnCheckAll('cbSelectAttach')"></asp:CheckBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="動作">
                                                <ItemTemplate>
                                                    <asp:Button ID="btAddClear" runat="server" Enabled="true" Text="清除"></asp:Button>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                        </Columns>
                                    </asp:DataGrid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dTD">
                        <div class="DivTable" style="width: 22em;">
                            <div class="dTR">&nbsp;</div>
                            <div class="dTR" id="cbDiv">
                                <asp:CheckBox ID="cbMail" runat="server" Text="以Email通知"></asp:CheckBox>
                                <asp:CheckBox ID="cbAttach" runat="server" Text="附件隨Email寄出"></asp:CheckBox>
                            </div>
                            <div class="dTR">
                                <asp:Label ID="lbAllowType" runat="server" CssClass="KeyField">請點選以加入左方公告對象：</asp:Label>
                                <asp:RadioButton ID="rbSelectOrg" runat="server" Text="組織" GroupName="rbGSelect" Checked="False"></asp:RadioButton>
                                <asp:RadioButton ID="rbSelectGroup" runat="server" Text="群組" GroupName="rbGSelect"></asp:RadioButton>
                            </div>
                            <div class="dTR">
                                <iframe id="TargetNavbar" height="370" name="TargetNavbar" width="500"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">&nbsp;</div>
                    <div class="dTD">
                        <span id="cbUnitSpan">
                            <asp:CheckBox ID="cbUnit" runat="server" Text="對象為機關或單位時，只通知單位登記桌"></asp:CheckBox></span>
                        <br>
                        <asp:CheckBox ID="cbReSend" runat="server" Text="是否再次以Email通知公告對象"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label12" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrg" TabIndex="0" runat="server" Width="8.5em" MaxLength="60"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" runat="server" ImageUrl="../IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txFromOrg1" TabIndex="0" runat="server" Width="14.5em" MaxLength="17" BackColor="Transparent" BorderStyle="None"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label6" runat="server" CssClass="RequireField">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="47.5em" CssClass="RequireField" MaxLength="200" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label8" runat="server">說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txContent" TabIndex="0" runat="server" Width="47.5em" Height="100px" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label14" runat="server">附件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <input class="hide" id="txFilePath" type="file" multiple="true" style="width: 11em;" tabindex="1" size="9" runat="server">
                        <asp:Button ID="btAddFile" runat="server" Text="加入附件"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">&nbsp;</div>
                    <div class="dTD">
                        <div class="GridDiv" style="height: 10em;">
                            <asp:DataGrid ID="dgAttach" runat="server" AutoGenerateColumns="False" PageSize="1" CellPadding="0" GridLines="Vertical">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔名">
                                        <ItemTemplate>
                                            <asp:Label ID="lbFileName" runat="server"></asp:Label>
                                            <asp:Label ID="lbFilePath" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件大小">
                                        <HeaderStyle CssClass="hide"></HeaderStyle>
                                        <ItemStyle CssClass="hide"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbFileSize" runat="server" CssClass="hide" Visible="True"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件描述">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txFileDesc" runat="server" Visible="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="執行">
                                        <ItemTemplate>
                                            <asp:Button ID="btDelete" runat="server" Text="刪除"></asp:Button>
                                            <asp:Button ID="btOpenFile" runat="server" Text="開啟"></asp:Button>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件類型">
                                        <HeaderStyle CssClass="hide"></HeaderStyle>
                                        <ItemStyle CssClass="hide"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbFileType" runat="server" CssClass="hide"></asp:Label>
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
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
