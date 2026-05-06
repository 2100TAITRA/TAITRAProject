<%@ Page Language="c#" CodeBehind="DLMI100.aspx.cs" AutoEventWireup="false" Inherits="DLM1.DLMI100" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html lang="zh-tw">
<head>
    <meta charset="utf-8">
    <title>DLMI100 附件下載區</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="DLMI100.css">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>

    <!--#include file="/STDN/Lib/Script.shtml"-->
</head>
<body>
    <form id="DLMI100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <div style="z-index: 0; position: absolute; width: 10px; height: 10px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:Label ID="ValidationSummary1" runat="server"></asp:Label>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox ID="H_ButtonType" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_TotalNum" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_tbGetDept" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_loadAttachId" runat="server"></asp:TextBox>
            <asp:DropDownList ID="ddlAttachInfoId" runat="server"></asp:DropDownList>
            <asp:TextBox ID="H_FromOutside" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_DocHash" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_tbSelectFlag" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_tbToolFlag" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_UserName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_IssueOrgName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_IssueNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Downloadguid" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_OutSideMes" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable" style="width: 99%">
            <div align="center" style="position: relative; top: -3em">
                <asp:Label ID="lbTitle" runat="server" CssClass="hide" Style="font-size: 140%"></asp:Label>
            </div>
            <div class="DivTable">
                <asp:Label ID="lbOutSide0" runat="server" CssClass="hide" Width="21.5em">本頁面支援 Chrome 15.0、Firefox 8.0、IE8以上版本</asp:Label>
                <asp:Label ID="lbOutSide1" runat="server" Width="4.5em" CssClass="RequireFieldNumeric">發文號：</asp:Label>
                <asp:TextBox ID="txOutIssueNo" runat="server" Width="5.5em" MaxLength="20"></asp:TextBox>
                <asp:Label ID="lbOutSide2" runat="server" CssClass="RequireFieldNumeric">發文日期：</asp:Label>
                <asp:TextBox ID="txOutDate" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                <asp:Label ID="lbOutSide3" runat="server" Width="4.5em" CssClass="RequireFieldNumeric">識別碼：</asp:Label>
                <asp:TextBox ID="txOutIdentifyCode" runat="server" Width="7.5em" MaxLength="8"></asp:TextBox>
                <input id="btOutSearch" onclick="btSearchss()" value="搜尋" type="button">
                <br />
                <br />
                <br />
                <br />
                <asp:Label ID="lbOutVerify" runat="server" CssClass="RequireField hide">驗證碼：</asp:Label>
                <asp:TextBox ID="txOutVerify" runat="server" CssClass="RequireField hide" Width="3em" MaxLength="5"></asp:TextBox>
                <asp:Image ID="iVerify" runat="server" CssClass="hide" Width="120px" Height="60px" Style="position: relative; top: -33px"></asp:Image>
                <asp:TextBox ID="btOutVerify" runat="server" CssClass="hide" onclick="RefreshCaptcha()" value="重取" type="button"></asp:TextBox>

                <asp:Panel runat="server" ID="pnManual">
                    <div class="DivTable">
                        <div class="dTR">
                            操作步驟說明：
                        </div>
                        <div class="dTR">
                            1. 發文文號共10碼或11碼(格式為：3碼年度 + 7碼流水號 + 1碼支號)，例如：1050006685；若該文有支號1，則輸入10500066851
                        </div>
                        <div class="dTR">
                            2. 發文日期共7碼(格式為：YYYMMDD)，例如：1050101
                        </div>
                        <div class="dTR">
                            3. 識別碼英數字共8碼(格式為：XXXXXXXX)，例如：WCW1QKVV
                        </div>
                        <div class="dTR">
                            4. 上述條件輸入完成後，點選「搜尋」
                        </div>
                    </div>
                </asp:Panel>
				</div >
				
                <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
                    <asp:Label runat="server" Text="主旨"></asp:Label>
                    <asp:TextBox runat="server" Width="5em" ID="txSubject"></asp:TextBox>
                    <asp:Label runat="server" Text="發布單位"></asp:Label>
                    <asp:DropDownList runat="server" Width="4.5em" ID="ddlDept"></asp:DropDownList>
                    <asp:Label runat="server" Text="發文號"></asp:Label>
                    <asp:TextBox runat="server" Width="5.5em" ID="txIssueNo"></asp:TextBox>
                    <asp:Label runat="server" Text="發文日期"></asp:Label>
                    <asp:TextBox runat="server" Width="4em" MaxLength="7" ID="txStartIssueDate" CssClass="InputFieldNumeric DatePicker"></asp:TextBox>
                    <asp:Label runat="server" Text="─"></asp:Label>
                    <asp:TextBox runat="server" Width="4em" MaxLength="7" ID="txEndIssueDate" CssClass="InputFieldNumeric DatePicker"></asp:TextBox>
                    <asp:Label runat="server" Text="識別碼" ID="lbIdentifyCode"></asp:Label>
                    <asp:TextBox runat="server" Width="2em" MaxLength="8" ID="txIdentifyCode"></asp:TextBox>
                    <asp:Label runat="server" Text="受文機關" ID="lbOrgName"></asp:Label>
                    <asp:TextBox runat="server" Width="4.5em" ID="txOrgName"></asp:TextBox>
                    <asp:Button runat="server" Text="搜尋" ID="btSearch" ToolTip="搜尋"></asp:Button>
                </asp:Panel>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="2" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" ItemStyle-VerticalAlign="Middle">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="tbdgSubject" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發文號">
                                        <ItemTemplate>
                                            <asp:Label ID="tbdgIssueNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發文日期">
                                        <ItemTemplate>
                                            <asp:Label ID="tbdgIssueDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發布單位">
                                        <ItemTemplate>
                                            <asp:Label ID="tbdgDept" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="卸載日期">
                                        <ItemTemplate>
                                            <asp:Label ID="tbdgExpireDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="開啟附件">
                                        <ItemTemplate>
                                            <asp:DataGrid ID="dgAttach" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" ShowHeader="False" CssClass="disableHeadFix">
                                                <Columns>
                                                    <asp:TemplateColumn HeaderText="lbSEQ_NO" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                                        <ItemTemplate>
                                                            <asp:Label ID="Label1" runat="server"></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="鏈結欄位">
                                                        <ItemTemplate>
                                                            <asp:HyperLink ID="hlLink" TabIndex="0" runat="server"></asp:HyperLink>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                </Columns>
                                            </asp:DataGrid>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="打包下載">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlLinkAll" TabIndex="0" runat="server"></asp:HyperLink>
                                            <asp:Label ID="H_AttachInfoId" runat="server" Width="1px" CssClass="hidden"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔案驗證碼(SHA512)">
                                        <ItemTemplate>
                                            <asp:Label ID="tbFileHash" runat="server" CssClass="hide"></asp:Label>
                                            <asp:HyperLink ID="hltbFileVerify" TabIndex="0" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                            <asp:Panel ID="tbSelect" runat="server" Width="100%" CssClass="DgSelectToolBar InputFieldNumeric" EnableViewState="False">
                                <asp:Label runat="server" Text="每頁筆數："></asp:Label>
                                <asp:TextBox runat="server" Width="30px" ID="txPageCntSet" CssClass="InputFieldNumeric"></asp:TextBox>
                                <asp:Label runat="server" Text="總筆數："></asp:Label>
                                <asp:TextBox runat="server" Width="46px" TabIndex="-1" Style="text-align: right;" ID="txTotalCnt" BackColor="LightGray" CssClass="DisplayOnly InputFieldNumeric" ReadOnly="True"></asp:TextBox>
                                <asp:Button runat="server" Text="第一頁" DefaultStyle="cursor:hand;" ID="btFirst" ToolTip="第一頁"></asp:Button>
                                <asp:Button runat="server" Text="上一頁" DefaultStyle="cursor:hand;" ID="btPreview" ToolTip="上一頁"></asp:Button>
                                <asp:Button runat="server" Text="下一頁" DefaultStyle="cursor:hand;" ID="btNext" ToolTip="下一頁"></asp:Button>
                                <asp:Button runat="server" Text="最後一頁" DefaultStyle="cursor:hand;" ID="btLast" ToolTip="最後一頁"></asp:Button>
                                <asp:Label runat="server" Text="第"></asp:Label>
                                <asp:TextBox runat="server" Width="30px" Style="text-align: right; ime-mode: disabled;" MaxLength="3" ID="txViewPage" CssClass="InputFieldNumeric"></asp:TextBox>
                                <asp:Label runat="server" Text="頁／共"></asp:Label>
                                <asp:TextBox runat="server" Width="30px" TabIndex="-1" Style="text-align: right;" MaxLength="3" ID="txTotalPage" BackColor="LightGray" CssClass="DisplayOnly InputFieldNumeric" ReadOnly="True"></asp:TextBox>
                                <asp:Label runat="server" Text="頁"></asp:Label>
                                <asp:Button runat="server" Text="GO" DefaultStyle="cursor:hand;" ID="btChangePage" ToolTip="到指定的頁面"></asp:Button>
                            </asp:Panel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
