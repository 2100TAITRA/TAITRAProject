<%@ Page Language="c#" CodeBehind="EDT131.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT131" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT131 批次分文作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="/STDN/Lib/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDT131" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="h_OrgNo" runat="server"></asp:TextBox><asp:TextBox ID="h_DeptNo" runat="server"></asp:TextBox><asp:TextBox ID="h_UserId" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSysRcvDate" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSysRcvMin" runat="server"></asp:TextBox>
            <asp:DropDownList ID="dlAssignOrgSet" runat="server"></asp:DropDownList>
            <asp:TextBox ID="H_txOD_ODT130_CHECK_DELIVORG" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable" style="margin: 40px auto;">
            <div id="MainTable" class="DivTable" style="border-collapse: collapse;">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 26em">
                        <asp:RadioButton ID="rbType1" runat="server" Text="電子來文" GroupName="gpType"></asp:RadioButton>
                        <asp:RadioButton ID="rbTypeES" runat="server" Text="電子來文(已暫存)" GroupName="gpType"></asp:RadioButton>
                        <asp:RadioButton ID="rbType2" runat="server" Text="紙本來文(已暫存)" GroupName="gpType"></asp:RadioButton>
						<asp:RadioButton ID="rbType3" runat="server" Text="改分銷號" GroupName="gpType" CssClass="hide"></asp:RadioButton>
                    </div>
                     <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="Label2" runat="server">信心水準：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:RadioButton ID="rbConfVaue0" runat="server" Text="全部" GroupName="gp2Type"></asp:RadioButton>
                        <asp:RadioButton ID="rbConfVaue1" runat="server" Text="高" GroupName="gp2Type"></asp:RadioButton>
                        <asp:RadioButton ID="rbConfVaue2" runat="server" Text="中" GroupName="gp2Type"></asp:RadioButton>
                        <asp:RadioButton ID="rbConfVaue3" runat="server" Text="低" GroupName="gp2Type"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="lbRcvDate" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label runat="server">－</asp:Label>
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 4em">
                        <asp:Label ID="lbSpd" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:DropDownList ID="dlSpd" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="lbFromNo" runat="server">來文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox ID="txFromNo" runat="server" Width="5.5em" MaxLength="40"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbFromOrg" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txFromOrgNo" runat="server" MaxLength="17" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif" TabIndex="-1"></asp:ImageButton>
                        <asp:TextBox ID="txFromOrgName" runat="server" CssClass="TextLabel" Width="10em" TabIndex="-1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="lbFromDate" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:TextBox ID="txFromDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label runat="server">－</asp:Label>
                        <asp:TextBox ID="txFromDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 4em">
                        <asp:Label ID="lbSec" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:DropDownList ID="dlSec" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="lbCategory" runat="server">文別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:DropDownList ID="dlCategory" runat="server" Width="6em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSubject" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txSubject" runat="server" Width="19em" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Button ID="btSet" runat="server" Text="傳送設定" />
                        <asp:Label ID="lbSendType" runat="server">：</asp:Label>
                    </div>
                    <div style="border-top-style: groove; border-top-color: blue; border-top-width: thin; height: 2px; width: 60em; display: flex;">
                    <div class="dTD" style="width: 6.5em">
                        <asp:RadioButton ID="rbSendType1" runat="server" Text="承辦單位" GroupName="gpSendType"></asp:RadioButton>
                    </div>
                    <div class="dTD" style="width: 24.2em">
                        <asp:DropDownList ID="dlDept" runat="server" Width="13em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" runat="server" Width="10em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbUser" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" runat="server" Width="6em"></asp:DropDownList>
                    </div>
                    </div>
                </div>
                <asp:Panel ID="divSendType2" runat="server">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        &nbsp;
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:RadioButton ID="rbSendType2" runat="server" Text="移(轉)文" GroupName="gpSendType"></asp:RadioButton>
                    </div>
                    <div class="dTD" style="width: 23.9em">
                        <asp:DropDownList ID="dlAssign" runat="server" Width="13em"></asp:DropDownList>
                    </div>
                </div>
                </asp:Panel>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        &nbsp;
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:RadioButton ID="rbSendType3" runat="server" Text="銷號" GroupName="gpSendType"></asp:RadioButton>
                    </div>
                    <div class="dTD" style="width: 23.9em">
                        <asp:DropDownList ID="dlCancel" runat="server" Width="13em"></asp:DropDownList>
                    </div>
                </div>
                <div id="divDocInfo">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10em">
                            <asp:Label ID="lbProperty" runat="server">公文性質：</asp:Label>
                        </div>
                        <div style="border-bottom-style: groove; border-bottom-color: blue; border-bottom-width: thin; height: 0px; width: 60em; display: flex;">
                        </div>
                        <div class="dTD" style="width: 13em">
                            <asp:DropDownList ID="dlProperty" runat="server" Width="10em"></asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="lbBTypeNo" runat="server">業務類別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 8.5em">
                            <asp:DropDownList ID="dlBTypeNo" runat="server" Width="10em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10em">
                            <asp:Label ID="lbMeetDate" runat="server">開會日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 13em">
                            <asp:TextBox ID="txMeetDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="lbLeadTime" runat="server">處理期限：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:TextBox ID="txLeadTime" TabIndex="245" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                            <asp:DropDownList ID="dlLtUom" TabIndex="246" runat="server" Width="2.5em">
                                <asp:ListItem Value="天">天</asp:ListItem>
                                <asp:ListItem Value="月">月</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="lbDueDate" runat="server">限辦日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10.5em">
                            <asp:TextBox ID="txDueDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10em">
                            <asp:Label ID="lbCaseNo" runat="server">案件編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 13em">
                            <asp:TextBox ID="txCaseNo" runat="server" Width="5em" MaxLength="10"></asp:TextBox>
                            <asp:ImageButton ID="btCaseNoPrompt" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="lbDocSource" runat="server">公文來源：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:DropDownList ID="dlDocSource" runat="server" Width="8em">
							    <asp:ListItem Value=" " Selected="True">正常公文</asp:ListItem>
								<asp:ListItem Value="1">上級機關交辦</asp:ListItem>
								<asp:ListItem Value="2">上級機關交議</asp:ListItem>
								<asp:ListItem Value="3">會銜</asp:ListItem>
							</asp:DropDownList>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                    <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                    <asp:RadioButton ID="rbSet" runat="server" Text="設定" GroupName="gpSetType"></asp:RadioButton>
                    <asp:RadioButton ID="rbTran" runat="server" Text="傳送" GroupName="gpSetType"></asp:RadioButton>
                </asp:Panel>
                <div class="GridDiv" style="height: 11.5em;">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="5" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="設定">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbCheckSet" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbCheckSend" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>

                            <asp:TemplateColumn HeaderText="信心燈號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Button ID="dgbtSimilarDoc" runat="server" Text="輔助檢索" />
                                    <asp:Label ID="dglbConfLight" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="dglbInfrdeptno" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>

                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server" onclick="OpenODT130(this)" href="javascript: void(0)"></asp:HyperLink>
                                    <asp:TextBox ID="dgtxSignType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxSecNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxSysId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxDocumentId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxControlCaseNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvScanSysId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxDocType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvTypeDescNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvDmType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvDmDesc" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxMoiGroupCaseNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxSrcRcvNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxSrcRcvDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="dglbRepeatDocNo" runat="server" CssClass="hide" />
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbFromDateTitle" runat="server">來文日期</asp:Label><br>
                                    <asp:Label ID="dglbRcvTimeTitle" runat="server">收文時間</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbFromDateShow" runat="server" /><br>
                                    <asp:Label ID="dglbRcvTimeShow" runat="server" />
                                    <asp:TextBox ID="dgtxFromDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxRcvTime" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbFromNoTitle" runat="server">來文字號</asp:Label><br>
                                    <asp:Label ID="dglbFromOrgNameTitle" runat="server">來文機關</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbFromWordNoShow" runat="server" /><br>
                                    <asp:Label ID="dglbFromOrgName" runat="server" />
                                    <asp:TextBox ID="dgtxFromNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxFromWord" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="dglbOriFromOrgName" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子檔">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Button ID="dgbtOpenErcv" runat="server" Text="開啟" />
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="dglbSubject" runat="server"></asp:Label>
                                    <asp:TextBox ID="dgtxSubject" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者">
                                <ItemTemplate>
                                    <asp:Label ID="dglbRcvOrg" runat="server"></asp:Label>
                                    <asp:Label ID="dglbOriRcvOrg" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="dglbOriRcvOrgNo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="傳送對象">
                                <ItemTemplate>
                                    <asp:Label ID="dglbTarget" runat="server"></asp:Label>
                                    <asp:TextBox ID="dgtxSendType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxAssignOrgNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxAssignOrgName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToOuId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToDeptName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToSectNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToSectName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToUserName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxToEmpName" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbDocCategoryTitle" runat="server">文別</asp:Label><br>
                                    <asp:Label ID="dglbSpdTitle" runat="server">速別</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbDocCategoryName" runat="server" /><br>
                                    <asp:Label ID="dglbSpdName" runat="server" />
                                    <asp:TextBox ID="dgtxDocCategory" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxSpdNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbDocPropertyTitle" runat="server">公文性質</asp:Label><br>
                                    <asp:Label ID="dglbBTypeNoTitle" runat="server">業務類別</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbPtyName" runat="server" /><br>
                                    <asp:Label ID="dglbBTypeName" runat="server" />
                                    <asp:TextBox ID="dgtxDocProperty" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxBTypeNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbDocSourceTitle" runat="server">公文來源</asp:Label><br>
                                    <asp:Label ID="dglbCaseNoTitle" runat="server">案件編號</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbDocSourceName" runat="server" /><br>
                                    <asp:Label ID="dglbCaseNo" runat="server" />
                                    <asp:TextBox ID="dgtxDocSource" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxCaseNo" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="處理期限">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbLeadTimeUom" runat="server" />
                                    <asp:TextBox ID="dgtxLeadTime" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxLtUom" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn>
                                <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                                <HeaderTemplate>
                                    <asp:Label ID="dglbMeetDateTitle" runat="server">開會日期</asp:Label><br>
                                    <asp:Label ID="dglbDueDateTitle" runat="server">限辦日期</asp:Label>
                                </HeaderTemplate>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="dglbMeetDate" runat="server" /><br>
                                    <asp:Label ID="dglbDueDate" runat="server" />
                                    <asp:TextBox ID="dgtxSumType" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxStartDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxStartTime" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxMeetDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="dgtxDueDate" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSend" runat="server" Text="傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
