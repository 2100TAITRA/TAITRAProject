<%@ Page Language="c#" CodeBehind="EAT832.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT832" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT832 調案申請批次審核作業</title>
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
    <form id="EAT832" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <fieldset style="width: 100%; height: 100%">
                    <legend>搜索條件</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label11" runat="server">檔案類別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 20.5em">
                            <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="borType" Checked="true"></asp:RadioButton>
                            <asp:RadioButton ID="rbClsAA" runat="server" Text="專案卷" GroupName="borType"></asp:RadioButton>
                            <asp:RadioButton ID="rbClsBB" runat="server" Text="列管卷" GroupName="borType"></asp:RadioButton>
                            <asp:RadioButton ID="rbClsNo" runat="server" Text="一般雜項" GroupName="borType"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label14" runat="server">優先案件：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbBortAll" runat="server" Text="全部" GroupName="UrType" Checked="true"></asp:RadioButton>
                            <asp:RadioButton ID="rbBorUr" runat="server" Text="急件" GroupName="UrType"></asp:RadioButton>
                            <asp:RadioButton ID="rbBorNo" runat="server" Text="一般" GroupName="UrType"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label3" runat="server">申請日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15.5em">
                            <asp:TextBox ID="txApplyDate" runat="server" CssClass="DatePicker" Width="4.5em"></asp:TextBox>
                        </div>
                    </div>
                </fieldset>
                <div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label9" runat="server" CssClass="InputFieldLabel">審核意見：</asp:Label>
					</div>
					<div class="dTD" style="width: 12em">
						<asp:DropDownList ID="dlPhraseNo" runat="server" Width="10em"></asp:DropDownList>
                        <asp:DropDownList ID="dlOD94List" runat="server" CssClass="hide"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
                        &nbsp;&nbsp;<asp:label id="Label12" runat="server">　　　</asp:label>
					</div>
					<div class="dTD" style="width: 20em">
						<asp:TextBox ID="tbOpinion" runat="server" Width="20em" CssClass="InputFieldText"></asp:TextBox>
					</div>
				</div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server">
                    <asp:Button ID="btDgClear" runat="server" Text="清除" />
                    <asp:Button ID="btDgAll" runat="server" Text="全選" />
                    <asp:Button ID="btDgInverse" runat="server" Text="反向" />
                </asp:Panel>
                <div class="GridDiv" id="MainDGTable" style="height: 18.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="急">
                                <ItemTemplate>
                                    <asp:Label ID="lbUrgent" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorNo" runat="server" CssClass="hide"></asp:Label>
                                    <asp:TextBox ID="H_Applydate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_Enabled" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_DueDays" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_DueDate" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_FLOWNO" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_MAXROLE" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_OwnOuid" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_OwnRoleid" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_STEP" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_MSGID" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_TxMailDocList" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_COUNT" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_RpsDept" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_RpsUser" runat="server" CssClass="hide" ></asp:TextBox>
                                    <asp:TextBox ID="H_AppMsgId" runat="server" CssClass="hide" ></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號/檔號(卡號)">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileio" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位/借戶名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案名/案由">
                                <ItemTemplate>
                                    <asp:Label ID="lbTaxForSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorDeptName" runat="server"></asp:Label>
                                    <asp:Label ID="lbBorEmpName" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_AppdeptNo" runat="server" CssClass="hide" ></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案人">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorUserName" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_EmpMail" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_UserName" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="外借機關調閱<BR/>來文機關<BR/>來文主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbOutSideBorInfo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案原因<BR/>急件原因">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorReason" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbBorWay" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_TxBorType" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="搜索(Q)" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="核可(S)" DefaultStyle="newmode:block;modifymode:block;" ID="btApprove"></asp:Button>
            <asp:Button runat="server" Text="退回(D)" DefaultStyle="newmode:block;modifymode:block;" ID="btReject"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
