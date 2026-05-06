<%@ Page Language="c#" CodeBehind="TBT150.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBT150" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>TBT150 公文公告發布作業</title>
    <!--Matte 0960713 000966 新增附件描述欄位-->
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="TBT150" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../TBLIB/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 6em">
                                <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                                <asp:Label ID="lbUnitCode" runat="server" CssClass="hidden"></asp:Label>
                            </div>
                            <asp:Panel ID="pEmailTitle" runat="server" CssClass="hide">
                                <div class="dTDTitle" style="width: 6.5em">
                                    <asp:Label ID="Label23" runat="server">Email標題：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <cc1:ComboBox ID="dlEmailTitle" runat="server" Width="10.5em" CssClass="comboBox" MaxLength="20"></cc1:ComboBox>
                                </div>
                            </asp:Panel>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label6" runat="server">主　　旨：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 25em">
                                <asp:TextBox ID="txSubject" TabIndex="0" runat="server" MaxLength="300" Style="width: 25em; height: 60px" TextMode="MultiLine"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="lbPastRcv" runat="server">公告方式：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 10em">
                                <asp:RadioButton ID="rbPasteRcvE" runat="server" CssClass="hidden" Text="直接轉貼來文" GroupName="PasteMode"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 15.5em">
                                <asp:RadioButton ID="cbRcvPateInstructed" runat="server" CssClass="hidden" Text="張貼來文批示文面及電子來文檔" GroupName="PasteMode"></asp:RadioButton>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label Style="z-index: 0" ID="lbPastDi" runat="server">公告方式：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 10.5em">
                                <asp:RadioButton Style="z-index: 0" ID="cbDocInfo" runat="server" Text="張貼本份公文稿件：" GroupName="PasteMode"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 10em">
                                <asp:DropDownList ID="dlDoc" runat="server" CssClass="InputFieldLabel"></asp:DropDownList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div class="dTD" style="width: 10.5em">
                                <asp:RadioButton ID="rbPateInstructed" runat="server" CssClass="hidden" Text="以批示文面方式發佈" GroupName="PasteMode"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 10em">
                                <asp:CheckBox ID="cbRcvFile" runat="server" Text="含來文電子檔" Visible="False" CssClass="InputFieldLabel"></asp:CheckBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label5" runat="server">發布單位：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 10em">
                                <asp:DropDownList ID="dlUnit" runat="server"></asp:DropDownList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label99" runat="server">公 布 欄：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 6.5em">
                                <asp:RadioButton ID="rbInside" runat="server" Text="內部公布欄" GroupName="rbBoardSide" Enabled="False"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 10em">
                                <asp:RadioButton ID="rbBoth" runat="server" Text="內部與外部公布欄" GroupName="rbBoardSide" Enabled="False"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 7em">
                                <asp:RadioButton ID="rbOutside" runat="server" Text="外部公布欄" GroupName="rbBoardSide" CssClass="hide" Enabled="False"></asp:RadioButton>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label9" runat="server">類　　別：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 6em">
                                <asp:DropDownList ID="dlCategory" runat="server" Style="width: 6em"></asp:DropDownList>
                            </div>
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label3" runat="server">公告日期：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 6em">
                                <asp:TextBox ID="txPasteDate" TabIndex="0" runat="server" CssClass="DatePicker" MaxLength="7" Style="width: 4em"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label7" runat="server">刊登天數：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 3em">
                                <asp:TextBox ID="txPasteDays" Style="width: 2em" TabIndex="0" runat="server" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            </div>
                            <div class="dTD" style="width: 4.5em">
                                <asp:Label ID="Label13" runat="server">天</asp:Label>
                            </div>
                            <div class="dTD" style="width: 5em">
                                <asp:Label ID="Label4" runat="server">公告期限：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 6.5em">
                                <asp:TextBox ID="txExpireDate" TabIndex="0" runat="server" CssClass="DatePicker" MaxLength="7" Style="width: 4em"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR" id="Range_Show">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="lbRange" runat="server" CssClass="hide">公告範圍：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 6.5em">
                                <asp:RadioButton ID="rbRange1" runat="server" Text="會內" GroupName="rbRangeType" CssClass="hide"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 6.5em">
                                <asp:RadioButton ID="rbRange2" runat="server" Text="下屬機關" GroupName="rbRangeType" CssClass="hide"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 6.5em">
                                <asp:RadioButton ID="rbRange3" runat="server" Text="民眾" GroupName="rbRangeType" CssClass="hide"></asp:RadioButton>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label11" runat="server">公告對象：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 5em">
                                <asp:RadioButton ID="rbOrg" runat="server" Text="全機關" GroupName="rbAllowType" Checked="True"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 5em">
                                <asp:RadioButton ID="rbUnit" runat="server" Text="本單位" GroupName="rbAllowType"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 4em">
                                <asp:RadioButton ID="rbOther" runat="server" Text="其他" GroupName="rbAllowType"></asp:RadioButton>
                            </div>
                            <div class="dTD" style="width: 5em">
                                <asp:CheckBox ID="cbDispatch" runat="server" Text="內部發文"></asp:CheckBox>
                            </div>
                            <div class="dTD" style="width: 6.5em">
                                <asp:Button ID="btCleanAll" runat="server" Text="清除全部"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR" id="TR_dgtarget">
                            <div class="dTDTitle" style="width: 6.5em">
                                <asp:Label ID="Label199" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                            </div>
                            <div class="dTD">
                                <div class="GridDiv" style="height: 140px;" data-fixed="true">
                                    <asp:DataGrid ID="dgtarget" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                                        <HeaderStyle HorizontalAlign="Center" ForeColor="White" BackColor="#5f9cc5"></HeaderStyle>
                                        <Columns>
                                            <asp:TemplateColumn HeaderText="序">
                                                <ItemTemplate>
                                                    <asp:Label ID="lbSEQ_NO" runat="server" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="名稱">
                                                <ItemTemplate>
                                                    <asp:TextBox ID="txOrgNo" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txIdType" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txOrgCode" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txGroupCode" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txUnitCode" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txRoleCode" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txUserCode" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="txName" TabIndex="-1" runat="server" CssClass="hidden"></asp:TextBox>
                                                    <asp:TextBox ID="lbtargetName" TabIndex="-1" runat="server" ReadOnly="True" CssClass="TextLabel"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="<input type=checkbox id=cbSelectEmail onclick=fnCheckAll('cbSelectEmail') >通知">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelectEmail" TabIndex="0" CssClass="InputFieldLabel" runat="server" Text="Email" onclick="fnCheckUnitUnChecked();fnUnCheckAll('cbSelectEmail');fnUnCheckAll('cbSelectUnit');"></asp:CheckBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="<input type=checkbox id=cbSelectUnit onclick=fnCheckAll('cbSelectUnit')>只通知登記桌">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelectUnit" title="對象為機關或單位時，只通知單位登記桌" TabIndex="0" CssClass="InputFieldLabel" runat="server" Text="只通知登記桌" onclick="fnCheckMailChecked();fnUnCheckAll('cbSelectUnit');fnUnCheckAll('cbSelectEmail');"></asp:CheckBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="<input type=checkbox id=cbSelectAttach onclick=fnCheckAll('cbSelectAttach')>附件">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="cbSelectAttach" TabIndex="0" CssClass="InputFieldLabel" runat="server" Text="隨Email寄出" onclick="fnUnCheckAll('cbSelectAttach')"></asp:CheckBox>
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
                            <div class="dTR" id="cbDiv">
                                <asp:CheckBox ID="cbMail" runat="server" CssClass="InputFieldLabel" Text="以Email通知"></asp:CheckBox>
                                <asp:CheckBox ID="cbAttach" runat="server" CssClass="InputFieldLabel" Text="附件隨Email寄出"></asp:CheckBox>
                            </div>
                            <div class="dTR">
                                <asp:Label ID="Label2" runat="server" Height="14px">請點選以加入左方公告對象：</asp:Label>
                                <asp:RadioButton ID="rbSelectOrg" runat="server" Font-Size="8" Text="組織" GroupName="rbGSelect"></asp:RadioButton>
                                <asp:RadioButton ID="rbSelectGroup" runat="server" Font-Size="8" Text="群組" GroupName="rbGSelect"></asp:RadioButton>
                            </div>
                        </div>
                        <div class="dTR">
                            <iframe height="260" width="500" id="TargetNavbar" name="TargetNavbar"></iframe>
                        </div>
                    </div>
                </div>
                <div class="dTR" id="cbUnitSpan">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label14" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:CheckBox ID="cbUnit" runat="server" CssClass="InputFieldLabel" Text="對象為機關或單位時，只通知單位登記桌"></asp:CheckBox>
                    </div>
                </div>
                <div id="divSITCA" class="dTR">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.5em">
                            <asp:Label ID="Label10" runat="server" CssClass="InputFieldLabel">受文對象：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 11em">
                            <asp:TextBox ID="txSitcaIssueType" runat="server"></asp:TextBox>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:Label ID="Label12" runat="server" CssClass="InputFieldLabel">請填代號，例如：ABC</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.5em">
                            <asp:Label ID="Label22" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                        </div>
                        <div class="dTD" style="width: 16em">
                            <asp:Label ID="Label15" runat="server" CssClass="InputFieldLabel">A-->各會員公司</asp:Label><br>
                            <asp:Label ID="Label16" runat="server" CssClass="InputFieldLabel">B-->各投信會員公司</asp:Label><br>
                            <asp:Label ID="Label17" runat="server" CssClass="InputFieldLabel">C-->各投顧會員公司</asp:Label><br>
                            <asp:Label ID="Label18" runat="server" CssClass="InputFieldLabel">D-->全權委託投資業務之會員公司</asp:Label><br>
                            <asp:Label ID="Label19" runat="server" CssClass="InputFieldLabel">E-->境外基金總代理業務之會員公司</asp:Label><br>
                            <asp:Label ID="Label20" runat="server" CssClass="InputFieldLabel">F-->其他</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.5em">
                            <asp:CheckBox ID="cbSitcaRegulation" runat="server" Text="法規函令："></asp:CheckBox>
                        </div>
                        <div class="dTD">
                            <asp:CheckBoxList ID="cblSitcaRegulation" runat="server" RepeatDirection="Horizontal"></asp:CheckBoxList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.5em">
                            <asp:Label ID="Label21" runat="server">法令依據：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSitcaBasis" runat="server" MaxLength="500"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server" CssClass="InputFieldLabel">附件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btAddFile" runat="server" Text="加入附件"></asp:Button>
                        <input type="file" id="fileInput" runat="server" class="hide" onchange="fnAddFile()" multiple />

                    </div>
                    <div class="dTD">
                        <asp:Button ID="btAddScanImg" runat="server" Text="下載檔管掃描影像"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label189" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="GridDiv" style="height: 140px;" data-fixed="true">
                                <asp:DataGrid ID="dgAttach" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label ID="lbAttSeq" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="檔名">
                                            <ItemTemplate>
                                                <asp:Label ID="lbFileName" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                                <asp:Label ID="lbFilePath" runat="server" CssClass="hidden"></asp:Label>
                                                <asp:Label ID="lbFileSize" runat="server" CssClass="hidden"></asp:Label>
                                                <asp:Label ID="lbFileDesc" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                                <asp:Label ID="lbFileComeFrom" runat="server" CssClass="hidden"></asp:Label>
                                                <asp:Label ID="lbFileDraftSeq" runat="server" CssClass="hidden"></asp:Label>
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
                                                <asp:Button ID="btOpenFile" runat="server" Text="下載"></asp:Button>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" Width="20px"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="20px"></asp:ListBox>
            <asp:TextBox ID="txDelFileNames" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileNames" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAddFileSizes" Width="20px" runat="server"></asp:TextBox>
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
            <asp:TextBox ID="H_HasDL" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txDraftUrl" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txUploadToDL" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_DIServerPath" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_AttachServerPath" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_ServiceURL" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="PrintXSLPath" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFromOrgName" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txDefaultCategroy" runat="server" Width="16px">0</asp:TextBox>
            <asp:TextBox ID="txEnableOD17" runat="server" Width="16px">N</asp:TextBox>
            <asp:TextBox ID="TB_ARCMODE" runat="server" Width="16px">N</asp:TextBox>
            <asp:TextBox ID="H_RbEmailType" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txRcvFileDefault" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDispatch" runat="server"></asp:TextBox>
            <asp:DropDownList ID="dlAttach" runat="server"></asp:DropDownList>
            <asp:TextBox ID="H_txSITCA" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFounderAccount" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFounderName" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFounderDeptNo" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFounderDeptName" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFounderSectNo" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txFounderSectName" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="txApWebFileio" runat="server" Width="16px"></asp:TextBox>
            <asp:DropDownList ID="ddlSitcaRegulation" runat="server"></asp:DropDownList>
            <asp:TextBox ID="H_OrgNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_WORKSTURL" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_WORKSTPATH" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_ATTINFOLIST" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_DOCDIINFO" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_RCVFILEINFO" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_RCVSCANFILEINFO" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_SIGNTYPE" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_ATTDETAILINFOLIST" runat="server"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block" />
            <asp:Button ID="btSave" runat="server" Text="發布" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
