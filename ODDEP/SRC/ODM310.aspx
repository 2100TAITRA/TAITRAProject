<%@ Page Language="c#" CodeBehind="ODM310.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM310" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODM310 業務類別代碼維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden" ms_positioning="GridLayout">
    <form id="ODM310" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="KeyField" ID="Label3" runat="server">業務類別代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyField" ID="txBTypeNo" runat="server" Width="3.5em" MaxLength="6"></asp:TextBox>
                        <asp:TextBox ID="txHideDept" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txHideDeptName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="RequireField" ID="Label4" runat="server">業務類別名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txBTypeName" runat="server" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="RequireField" ID="Label27" runat="server">使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="9.5em" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="txUseDept" runat="server" ReadOnly="True" BackColor="Silver" TextMode="MultiLine" Width="22.5em" Height="1.5em"></asp:TextBox>
                        <asp:Button ID="btPty" runat="server" Text="設定" EnableViewState="False"></asp:Button>
                        <asp:Button ID="btCleanText" runat="server" Text="清除" EnableViewState="False"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="RequireField" ID="lbSubject" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txSubject" runat="server" Width="18.5em" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="RequireField" ID="Label5" runat="server">案件系統代號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txProvider" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label6" runat="server">案件維護程式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txLinkURL" runat="server" Width="32.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label28" runat="server">案件查詢程式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSearchURL" runat="server" Width="32.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label29" runat="server">案件WebService：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseService" runat="server" Width="32.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="RequireField" ID="Label7" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList class="RequireField" ID="ddDocProperty" runat="server"></asp:DropDownList>
                        <span id="snApply">&nbsp;&nbsp;&nbsp;&nbsp;
 		                    <asp:Label ID="Label25" runat="server">查登類別：</asp:Label>
                            <asp:TextBox ID="txApplyType" runat="server" Width="1.5em" MaxLength="2" ForeColor="Navy" CssClass="InputEnUpperField"></asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		                    <asp:CheckBox ID="cbPreMark" runat="server" Text="申復案"></asp:CheckBox>
                        </span>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="RequireField" ID="Label8" runat="server">時效統計類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList class="RequireField" ID="ddSumType" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label9" runat="server">處理期限方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddLTBy" runat="server">
                            <asp:ListItem Value="I">使用者輸入</asp:ListItem>
                            <asp:ListItem Value="S">依速別判斷</asp:ListItem>
                            <asp:ListItem Value="B">依處理期限天數設定</asp:ListItem>
                            <asp:ListItem Value="M">依處理期限天數及開會日期設定</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label10" runat="server">處理期限天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTotal" runat="server" Text="總天數，" GroupName="GN"></asp:RadioButton>
                        <asp:TextBox ID="txLeadTime" runat="server" Width="3em" CssClass="InputFieldNumeric" MaxLength="5" Enabled="False"></asp:TextBox>
                        <asp:DropDownList ID="ddLTUOM" runat="server" Enabled="False">
                            <asp:ListItem Value="天">天</asp:ListItem>
                            <asp:ListItem Value="月">月</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbStep" runat="server" Text="辦理階段設定，計" GroupName="GN"></asp:RadioButton>
                        <asp:TextBox ID="txTotalLeadTime" runat="server" Width="3em" MaxLength="5" CssClass="DisplayOnly" TabIndex="-1"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">天，</asp:Label>
                        <asp:Button ID="btStep" runat="server" CssClass="hide" Text="辦理階段設定"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label24" runat="server">處理期限使用日曆別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbHd" runat="server" Text="日曆日" GroupName="gIncHD" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbWkD" runat="server" Text="工作日" GroupName="gIncHD"></asp:RadioButton>
                        <asp:RadioButton ID="rbConHd" runat="server" Text="扣抵聯休日曆日" GroupName="gIncHD"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:CheckBox Style="z-index: 0" ID="cbHoliday" runat="server" Text="限辦日期遇假日則順延至工作日"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label12" runat="server">起算日期原則：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12.5em">
                        <asp:DropDownList ID="ddStartRule" runat="server">
                            <asp:ListItem Value="1">由系統計算不得修改</asp:ListItem>
                            <asp:ListItem Value="2">由系統計算可以修改</asp:ListItem>
                            <asp:ListItem Value="3">人工輸入</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label13" runat="server">起算方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddStartDate" runat="server">
                            <asp:ListItem Value="1">收文次日</asp:ListItem>
                            <asp:ListItem Value="2">收文當日</asp:ListItem>
                            <asp:ListItem Value="3">來文日期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <fieldset>
                        <legend>
                            <asp:Label ID="Label33" runat="server">展期流程設定</asp:Label>
                        </legend>
                        <div class="dTR">
                            <div class="dTD">
                                <asp:Label ID="Label34" runat="server">預設天數：</asp:Label>
                                <asp:TextBox ID="txExtFefdays" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                <asp:DropDownList ID="dlExtFefunit" runat="server" Width="2.5em">
                                    <asp:ListItem Value="D">天</asp:ListItem>
                                    <asp:ListItem Value="M">月</asp:ListItem>
                                </asp:DropDownList> 
                                <asp:Label ID="Label35" runat="server">線上申請流程代碼：</asp:Label>
                                <asp:TextBox ID="txExtFlowset" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                <asp:Label ID="Label36" runat="server">審核流程依據：</asp:Label>
                                <asp:RadioButton ID="rbExtFlowTypeDays" runat="server" Text="依天數" GroupName="ExtFlowType" Checked="True"></asp:RadioButton>
                                <asp:RadioButton ID="rbExtFlowTypeTimes" runat="server" Text="依次數" GroupName="ExtFlowType"></asp:RadioButton>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="DivTable" id="Table4">
                <div class="dTR">
                    <div class="dTDTitle">
                        <fieldset>
                            <legend>
                                <asp:Label ID="Label30" runat="server">計算設定</asp:Label>
                            </legend>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:CheckBox ID="cbUDINCHD" runat="server" Text="使用日數是否包含假日" Enabled="False" ForeColor="Navy"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:CheckBox ID="cbUDAdjust" runat="server" Text="使用日數是否特殊處理" ForeColor="Navy"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:CheckBox ID="cbUDIssue" runat="server" Text="是否計算發文使用日數" ForeColor="Navy"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:CheckBox ID="cbUDClose" runat="server" Text="是否計算辦結使用日數"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:CheckBox ID="cbUDOverDue" runat="server" Text="是否計算逾期天數使用日數"></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:CheckBox ID="cbNeedScreen" runat="server" Text="是否需進行初篩"></asp:CheckBox>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset>
                            <legend>
                                <asp:Label ID="Label26" runat="server">補件可用天數設定</asp:Label>
                            </legend>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label1" runat="server">第一次補件可用天數</asp:Label>
                                    <asp:TextBox ID="txWt1" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label2" runat="server">天</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label15" runat="server">第二次補件可用天數</asp:Label>
                                    <asp:TextBox ID="txWt2" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label19" runat="server">天</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label16" runat="server">第三次補件可用天數</asp:Label>
                                    <asp:TextBox ID="txWt3" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label20" runat="server">天</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label17" runat="server">第一次廠商展延天數</asp:Label>
                                    <asp:TextBox ID="txExt1" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label21" runat="server">天</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label18" runat="server">第二次廠商展延天數</asp:Label>
                                    <asp:TextBox ID="txExt2" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label22" runat="server">天</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label14" runat="server">第三次廠商展延天數</asp:Label>
                                    <asp:TextBox ID="txExt3" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label23" runat="server">天</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label31" runat="server">外審單位可辦理天數</asp:Label>
                                    <asp:TextBox ID="txOutUseDays" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="Label32" runat="server">天</asp:Label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>

        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
