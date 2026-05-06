<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT801.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT801" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT801 審核調案權限申請作業</title>
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
    <form id="EAT801" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="lbMyAccount" runat="server" Width="1px" Height="1px" Enabled="False"></asp:TextBox><asp:TextBox ID="h_Rolename" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox></div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label1" runat="server" Width="365px" Font-Underline="True">調　　案　　權　　限　　申　　請　　單</asp:Label><br>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:TextBox ID="txAppNo" runat="server" Width="5.5em" CssClass="DisplayOnly" MaxLength="10" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label9" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDate" runat="server" Width="4em" CssClass="DisplayOnly" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server" Width="3.5em">狀態：</asp:Label>
                        <asp:Label ID="lbStatus" runat="server" ForeColor="Navy" Width="4em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">申請單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:TextBox ID="lbMyOrgName" TabIndex="-1" runat="server" Width="10em" CssClass="DisplayOnly" ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">申請人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="lbMyName" TabIndex="-1" runat="server" Width="4em" CssClass="DisplayOnly" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server" Width="3.5em">分機：</asp:Label>
                        <asp:TextBox ID="txEmpExt" runat="server" Width="2.5em" CssClass="DisplayOnly" MaxLength="10" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label13" runat="server">申請調檔權限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbInSect" runat="server" Enabled="False" GroupName="gpType"
                            Text="隸屬科室"></asp:RadioButton>
                    </div>
                    <div class="dTD" align="right">
                        <asp:Label ID="Label14" runat="server" Width="112px" CssClass="hidden">申請有效期限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDueDate0" runat="server" Width="52px" Enabled="False" CssClass="hidden" ForeColor="Navy"
                            GroupName="rbDueDate" Text="永久"></asp:RadioButton>
                        <asp:RadioButton ID="rbDueDate1" runat="server" Enabled="False" CssClass="hidden" ForeColor="Navy"
                            GroupName="rbDueDate" Text="至"></asp:RadioButton>
                        
                        <asp:Label ID="Label16" runat="server" CssClass="hidden">止</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em;">&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCrossSect" runat="server" Width="5em" Enabled="False"
                            GroupName="gpType" Text="跨科室"></asp:RadioButton>
                        <asp:DropDownList ID="dlPrivNo" runat="server" Width="10em" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em;">&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbToUser" runat="server" Width="6.5em" Text="指定承辦人：單位：" GroupName="gpType" Enabled="False"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDeptNo" runat="server" Width="15em" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 15em;">&nbsp;</div>
                    <div class="dTD" style="width: 20em;">
                        <div class="dTD" id="lbTouser">人員：(</div>
                        <asp:RadioButton ID="rbLeave" runat="server" Width="2.5em" Text="離職" GroupName="gpWork" Checked="true" Enabled="False"></asp:RadioButton>
                        <asp:RadioButton ID="rbOnWork" runat="server" Width="2.5em" Text="在職)" GroupName="gpWork" Enabled="False"></asp:RadioButton>)
						<asp:TextBox ID="txleaveEmpName" runat="server" Width="5.5em" MaxLength="10" Enabled="False"></asp:TextBox>
                        <asp:TextBox ID="H_SaveEmpList" runat="server" Width="5.5em" MaxLength="10" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                <div class="dTDTitle" style="width: 7.5em;">
                    <asp:Label ID="Label2" runat="server">權限停止日期：</asp:Label>
                </div>
                <div class="dTD">
                    <asp:TextBox ID="txForEverDate" runat="server" Width="60px" CssClass="hidden" MaxLength="7"></asp:TextBox>
                </div>
            </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label15" runat="server">申請原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppreason" runat="server" Width="25em" CssClass="DisplayOnly" MaxLength="10"
                            ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">審核結果：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlVerifyResult" runat="server" Width="4em"></asp:DropDownList>
                        <asp:Label ID="Label17" runat="server">意見：</asp:Label>
                        <asp:TextBox ID="tbOpinion" runat="server" Width="17em" MaxLength="150"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="lbTitle" runat="server" Font-Underline="True">簽　　核　　歷　　程</asp:Label>
                                </div>
                            </div>
                        </div>
                        <div class="GridDiv" style="height: 256px">
                            <asp:DataGrid ID="dg2" runat="server" ForeColor="Black" EnableViewState="False"
                                AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4" BorderWidth="1px" BorderColor="#DEDFDE"
                                BorderStyle="None" BackColor="White">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="審核流程">
                                        <ItemTemplate>
                                            <asp:TextBox ID="tbChiefTitle" runat="server" ssClass="TextLabel" MaxLength="42"
                                                ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="實際簽核人員">
                                        <ItemTemplate>
                                            <asp:TextBox ID="tbChief" onblur="queryBorrowDetail(this.value)" runat="server"
                                                CssClass="TextLabel" MaxLength="42" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="簽核意見">
                                        <ItemTemplate>
                                            <asp:TextBox ID="tbOpinion1" TabIndex="-1" runat="server" CssClass="TextLabel"
                                                ReadOnly="True"></asp:TextBox>
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
            <asp:Button ID="btReject" runat="server" Text="退回(B)" AccessKey="B" title="退回(ALT+B)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btApprove" runat="server" Text="核准(G)" AccessKey="G" title="核准(ALT+G)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="bttoberecord" runat="server" Text="登錄(L)" AccessKey="L" title="登錄(ALT+L)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送(R):" AccessKey="R" title="線上簽核傳送(ALT+R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btClose" runat="server" Text="關閉(C)" AccessKey="C" title="關閉(ALT+C)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearchFlow" runat="server" Text="流程資訊(I)" AccessKey="I" title="流程資訊(ALT+I)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
