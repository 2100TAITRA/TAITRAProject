<%@ Page Language="c#" CodeBehind="AKT860.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT860" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKT860 檔案應用申請審核作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKT860" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <DIV class="DivBaseTable" id="MainTable">
			<DIV class="DivTable">
				<DIV class="dTR">
					<DIV class="dTDTitle" style="width: 10em" >
						<asp:Label  ID="Label7" runat="server" CssClass="KeyField">申請書號：</asp:Label></DIV>
					<DIV class="dTD" style="width: 13em">
						<asp:TextBox ID="txApplyNo" TabIndex="1" runat="server" CssClass="KeyFieldNumeric"
							MaxLength="8" Width="4.5em">00000001</asp:TextBox><asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton></DIV>
					<DIV class="dTDTitle" style="width: 7em" >
						<asp:Label  ID="Label5" runat="server" CssClass="requirefield" >申請日期：</asp:Label></DIV>
					<DIV class="dTD">
						<asp:TextBox ID="txApplyDate" TabIndex="6" runat="server" CssClass="DatePicker"
							MaxLength="7" Width="4em">0920810</asp:TextBox><asp:Label  ID="Label99" runat="server" CssClass="requirefield">應用時間：</asp:Label><asp:TextBox  ID="txTime" TabIndex="6" runat="server" CssClass="requirefieldNumeric"
								MaxLength="7" Width="4em">0920810</asp:TextBox><asp:Label  ID="Label98" runat="server" CssClass="requirefield">小時</asp:Label></DIV>
				</DIV>
				<DIV class="dTR">
					<DIV class="dTDTitle" style="width: 10em" >
						<asp:Label  ID="Label1" runat="server" CssClass="requirefield" >收文文號：</asp:Label></DIV>
					<DIV class="dTD" style="width: 13em">
						<asp:TextBox ID="txRcvNo" TabIndex="11" runat="server" CssClass="requirefield" MaxLength="15"
							Width="7.5em">123456789012347</asp:TextBox></DIV>
					<DIV class="dTDTitle" style="width: 7em" >
						<asp:Label  ID="Label2" runat="server" CssClass="requirefield" >收文日期：</asp:Label></DIV>
					<DIV class="dTD">
						<asp:TextBox  ID="txRcvDate" TabIndex="16" runat="server" CssClass="DatePicker"
							MaxLength="7" Width="4em">0920810</asp:TextBox></DIV>
				</DIV>
				<DIV class="dTR">
					<DIV class="dTDTitle" style="width: 10em">
						<asp:Label  ID="Label6" runat="server" >承辦單位：</asp:Label></DIV>
					<DIV class="dTD" style="width: 13em">
						<cc1:ComboBox ID="dlDept" TabIndex="21" runat="server" Width="12em" CssClass="comboBox"></cc1:ComboBox></DIV>
					<DIV class="dTDTitle" style="width: 7em" >
						<asp:Label  ID="Label3" runat="server">承辦人：</asp:Label></DIV>
					<DIV class="dTD" >
						<cc1:ComboBox ID="dlUser" TabIndex="26" runat="server" Width="6em"  CssClass="comboBox"></cc1:ComboBox>
					</DIV>
					<DIV class="dTDTitle" style="width: 4em" >
						<asp:Label  ID="Label18" runat="server">分機：</asp:Label>
						</DIV>
					<DIV class="dTD" >
					<asp:TextBox CssClass="InputFieldNumeric" ID="txEmpExt" TabIndex="31" runat="server" MaxLength="10"
							Width="4em">0920810</asp:TextBox></DIV>
				</DIV>
				<DIV class="dTR">
					<DIV class="dTDTitle" style="width: 10em" >
						<asp:Label  ID="Label8" runat="server" >目前狀態：</asp:Label></DIV>
					<DIV class="dTD" style="width: 13em">
						<asp:TextBox ID="txStatus" TabIndex="-1" runat="server" CssClass="displayonly" Width="12em"
							ReadOnly="True"></asp:TextBox></DIV>
                    <DIV class="dTDTitle" style="width: 7em" >
                        <asp:CheckBox ID="cbPostFor" runat="server" Text="代為郵寄"></asp:CheckBox></DIV>
				</DIV>
                <br/>
				<DIV class="dTR">
					<DIV style="height: 30px" ><span id="Tab1" onmouseover="this.style.cursor = 'hand'" style="border-bottom-style: outset; text-align: center; border-right-style: outset; background-color: darkblue; width: 147px; border-top-style: outset; height: 25px; color: aliceblue; border-left-style: outset"
						onclick="TabChange('1');" onmouseout="this.style.cursor='default'">申請應用內容</span>
						<span id="Tab2" onmouseover="this.style.cursor = 'hand'" style="border-bottom-style: outset; text-align: center; border-right-style: outset; background-color: darkblue; width: 147px; border-top-style: outset; height: 25px; color: aliceblue; border-left-style: outset"
							onclick="TabChange('2');" onmouseout="this.style.cursor='default'">申請人資料</span>
						<span id="Tab3" onmouseover="this.style.cursor = 'hand'" style="border-bottom-style: outset; text-align: center; border-right-style: outset; background-color: darkblue; width: 147px; border-top-style: outset; height: 25px; color: aliceblue; border-left-style: outset"
							onclick="TabChange('3');" onmouseout="this.style.cursor='default'">收費資料</span>
					</DIV>
				</DIV>
			</DIV>
			<DIV id="Table1" class="DivTable">
                <DIV valign="top" >
                    <div id="DIV1">
                        <DIV id="Table3"  class="DivTable">
                                <DIV class="dTR">
                                    <DIV class="dTD" style="width : 48em">駁回原因代碼：1.涉及國家機密 2.涉及個人犯罪資料 3.涉及工商秘密 4.涉及學識技能檢定及資格審查 5.涉及人事及薪資資料 6.
						依法令或契約有保密之義務 7.有侵害公共利益或第三人正當權益之虞 8.其他
                                    </DIV>
                                </DIV>
                                <DIV>
                                    <DIV>
                                        <div style="height: 24em" class="GridDiv" data-fixed="true">
                                            <asp:DataGrid ID="dg1" runat="server" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
                                                <Columns>
                                                    <asp:TemplateColumn HeaderText="序">
                                                        <ItemTemplate>
                                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="文號或檔號">
                                                        <ItemTemplate>
                                                            <asp:TextBox ID="txDocNo" runat="server" MaxLength="42" Width="5em"></asp:TextBox>
                                                            <asp:TextBox ID="txDocFileNo" TabIndex="-1" runat="server" CssClass="hide" Width="6em" MaxLength="42"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="檔案名稱或內容要旨">
                                                        <ItemTemplate>
                                                            <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="11em" TextMode="MultiLine">0920801</asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="抄錄、閱覽">
                                                        <ItemTemplate>
                                                            <asp:Label ID="Label11" runat="server" Font-Size="Smaller">申請：</asp:Label>
                                                            <asp:DropDownList ID="dlApplyView" runat="server" Width="5em">
                                                                <asp:ListItem></asp:ListItem>
                                                                <asp:ListItem Value="1">原件</asp:ListItem>
                                                                <asp:ListItem Value="2" Selected="True">複製品</asp:ListItem>
                                                            </asp:DropDownList><br>
                                                            <asp:Label ID="Label17" runat="server" Font-Size="Smaller">審核：</asp:Label>
                                                            <asp:DropDownList ID="dlApproveView" runat="server" Width="5em">
                                                                <asp:ListItem></asp:ListItem>
                                                                <asp:ListItem Value="1">原件</asp:ListItem>
                                                                <asp:ListItem Value="2" Selected="True">複製品</asp:ListItem>
                                                            </asp:DropDownList>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="提供複製品">
                                                        <ItemTemplate>
                                                            <asp:DropDownList ID="dlApplyCopy" runat="server" Width="6em">
                                                                <asp:ListItem></asp:ListItem>
                                                                <asp:ListItem Value="1">紙本</asp:ListItem>
                                                                <asp:ListItem Value="2">電子媒體</asp:ListItem>
                                                                <asp:ListItem Value="3">檔案傳送</asp:ListItem>
                                                                <asp:ListItem Value="4" Selected="True">線上瀏覽</asp:ListItem>
                                                            </asp:DropDownList><br>
                                                            <asp:DropDownList ID="dlApproveCopy" runat="server" Width="6em">
                                                                <asp:ListItem></asp:ListItem>
                                                                <asp:ListItem Value="1">紙本</asp:ListItem>
                                                                <asp:ListItem Value="2">電子媒體</asp:ListItem>
                                                                <asp:ListItem Value="3">檔案傳送</asp:ListItem>
                                                                <asp:ListItem Value="4" Selected="True">線上瀏覽</asp:ListItem>
                                                            </asp:DropDownList>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="提供附件複製品">
                                                        <ItemTemplate>
                                                            <asp:DropDownList ID="dlApplyAttachCopy" runat="server" Width="6em">
                                                                <asp:ListItem></asp:ListItem>
                                                                <asp:ListItem Value="1">紙本</asp:ListItem>
                                                                <asp:ListItem Value="2">電子媒體</asp:ListItem>
                                                                <asp:ListItem Value="3">檔案傳送</asp:ListItem>
                                                                <asp:ListItem Value="4" Selected="True">線上瀏覽</asp:ListItem>
                                                            </asp:DropDownList><br>
                                                            <asp:DropDownList ID="dlApproveAttachCopy" runat="server" Width="6em">
                                                                <asp:ListItem></asp:ListItem>
                                                                <asp:ListItem Value="1">紙本</asp:ListItem>
                                                                <asp:ListItem Value="2">電子媒體</asp:ListItem>
                                                                <asp:ListItem Value="3">檔案傳送</asp:ListItem>
                                                                <asp:ListItem Value="4" Selected="True">線上瀏覽</asp:ListItem>
                                                            </asp:DropDownList>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="駁回原因/遮掩頁次">
                                                        <ItemTemplate>
                                                            <asp:TextBox ID="txRejectCode" runat="server" Width="9em"></asp:TextBox><br>
                                                            <asp:TextBox ID="txRejectPage" runat="server" Width="9em"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                    <asp:TemplateColumn HeaderText="核可頁數">
                                                        <ItemTemplate>
                                                            <asp:TextBox ID="txApproveCnt" CssClass="InputFieldNumeric" runat="server" Width="4em" MaxLength="5">12345</asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateColumn>
                                                </Columns>
                                            </asp:DataGrid>
                                        </div>
                                    </DIV>
                                </DIV>
                        </DIV>
                        <asp:Label  ID="Label27" runat="server" >閱覽檔案原件事由：</asp:Label><asp:TextBox ID="txOriginReason" runat="server" MaxLength="100" Width="26em"></asp:TextBox>
                    </div>
                    <div id="DIV2"  >
                        <DIV id="Table4" class="DivTable">
                            <DIV class="dTR">
                                <DIV class="dTDTitle" style="width: 8em" >&nbsp;</DIV>
                                <DIV class="dTD" style="width: 5.5em" >
                                    <asp:Label  ID="Label33" runat="server">姓名</asp:Label></DIV>
                                <DIV class="dTD" style="width: 6em" >
                                    <asp:Label  ID="Label32" runat="server" >出生年月日</asp:Label></DIV>
                                <DIV class="dTD" style="width: 9em" >
                                    <asp:Label  ID="Label31" runat="server">身分證明文件字號</asp:Label></DIV>
                                <DIV class="dTD" style="width: 8.5em" >
                                    <asp:Label  ID="Label30" runat="server">電話</asp:Label></DIV>
                                <DIV class="dTD" >
                                    <asp:Label  ID="Label10" runat="server">地址</asp:Label></DIV>
                            </DIV>
                            <DIV class="dTR">
                                <DIV class="dTDTitle" style="width: 8em" >
                                    <asp:Label  ID="Label29" runat="server">申請人：</asp:Label></DIV>
                                <DIV class="dTD" style="width: 5.5em" >
                                    <asp:TextBox ID="txPubName" TabIndex="32" runat="server" MaxLength="20" Width="4.5em">李大明</asp:TextBox></DIV>
                                <DIV class="dTD" style="width: 6em" >
                                    <asp:TextBox CssClass="DatePicker" ID="txPubBirth" TabIndex="33" runat="server" MaxLength="7"
                                        Width="4em">0920810</asp:TextBox></DIV>
                                <DIV class="dTD" style="width: 9em" >
                                    <asp:TextBox ID="txPubId" TabIndex="34" runat="server" CssClass="upper" MaxLength="10" Width="5.5em">A123456789</asp:TextBox></DIV>
                                <DIV class="dTD" style="width: 8.5em" >
                                    <asp:Label  ID="Label4" runat="server">(H):</asp:Label><asp:TextBox ID="txPubHTel" TabIndex="35" runat="server" MaxLength="20" Width="5.5em">(02)22222222</asp:TextBox><asp:Label  ID="Label28" runat="server">(O):</asp:Label><asp:TextBox ID="txPubOTel" TabIndex="36" runat="server" MaxLength="20" Width="5.5em">(02)33333333</asp:TextBox></DIV>
                                <DIV class="dTD" style="height: 48px" >
                                    <asp:TextBox ID="txPubAddress" TabIndex="37" runat="server" MaxLength="60" Width="10em" 
                                        TextMode="MultiLine"></asp:TextBox></DIV>
                            </DIV>
                            <DIV class="dTR">
                                <DIV class="dTDTitle" style="width: 8em" >
                                    <asp:Label  ID="Label26" runat="server">※代理人：</asp:Label></DIV>
                                <DIV  class="dTD" style="width: 5.5em" >
                                    <asp:TextBox ID="txBehalfName" TabIndex="41" runat="server" MaxLength="20" Width="4.5em">陳小明</asp:TextBox></DIV>
                                <DIV class="dTD"  style="width: 6em" >
                                    <asp:TextBox CssClass="DatePicker" ID="txBehalfBirth" TabIndex="46" runat="server" MaxLength="7"
                                        Width="4em">0920810</asp:TextBox></DIV>
                                <DIV class="dTD"  style="width: 9em" >
                                    <asp:TextBox ID="txBehalfId" TabIndex="51" runat="server" CssClass="upper" MaxLength="10" Width="5.5em">A123456789</asp:TextBox></DIV>
                                <DIV class="dTD"  style="width: 8.5em" >
                                    <asp:Label  ID="Label12" runat="server">(H):</asp:Label><asp:TextBox ID="txBehalfHTel" TabIndex="56" runat="server" MaxLength="20" Width="5.5em">(03)44444444</asp:TextBox><asp:Label  ID="Label13" runat="server">(O):</asp:Label><asp:TextBox ID="txBehalfOTel" TabIndex="61" runat="server" MaxLength="20" Width="5.5em">(03)55555555</asp:TextBox></DIV>
                                <DIV class="dTD"  >
                                    <asp:TextBox ID="txBehalfAddress" TabIndex="66" runat="server" MaxLength="60" Width="10em" 
                                        TextMode="MultiLine"></asp:TextBox></DIV>
                            </DIV>
                            <DIV class="dTR">
                                <DIV class="dTDTitle" style="width: 8em" >
                                    <asp:Label  ID="Label14" runat="server">※申請人EMail：</asp:Label><br/><asp:Label  ID="Label15" runat="server">　※法人名稱：</asp:Label></DIV>
                                <DIV class="dTD" style="width: 12em"  >
                                    <asp:TextBox ID="txPubEMail" TabIndex="71" runat="server" MaxLength="30" Width="13em">test@2100t.com.tw</asp:TextBox><br/><asp:TextBox ID="txProxyName" TabIndex="76" runat="server" MaxLength="20" Width="13em"></asp:TextBox></DIV>
                                <DIV class="dTDTitle" style="width: 17em" >
                                    <asp:Label  ID="Label20" runat="server">※法人地址：</asp:Label></DIV>
                                <DIV class="dTD" style="width: 14.5em" >
                                    <asp:TextBox ID="txProxyAddress" TabIndex="81" runat="server" MaxLength="60" Width="10em" 
                                        TextMode="MultiLine"></asp:TextBox></DIV>
                            </DIV>
                            <DIV class="dTR">
                                <DIV class="dTDTitle" style="width: 8em" >
                                    <asp:Label  ID="Label21" runat="server" Width="115px">　※手機：</asp:Label></DIV>
                                <DIV class="dTD" style="width: 12em"  >
                                    <asp:TextBox ID="txPubMobile" TabIndex="86" runat="server" MaxLength="20" Width="5.5em">0918001001</asp:TextBox></DIV>
                                <DIV class="dTDTitle" style="Width:17em"  >
                                    <asp:Label  ID="Label22" runat="server" >※代理人與申請人關係：</asp:Label></DIV>
                                <DIV class="dTD" style="width: 12em" >
								<asp:TextBox ID="txRelation" TabIndex="91" runat="server" MaxLength="10" Width="9em"></asp:TextBox></DIV>
                            </DIV>
                            <DIV class="dTR">
                                <DIV class="dTDTitle" style="width: 8em" >
                                    <asp:Label  ID="Label16" runat="server">申請目的：</asp:Label></DIV>
                                <DIV  class="dTD"  >
                                    <asp:CheckBox ID="cbPurpose1" TabIndex="96" runat="server" Text="歷史考證"></asp:CheckBox><asp:CheckBox ID="cbPurpose2" TabIndex="101" runat="server"  Text="學術研究" Checked="True"></asp:CheckBox><asp:CheckBox ID="cbPurpose3" TabIndex="106" runat="server" Text="事證稽憑"></asp:CheckBox><asp:CheckBox ID="cbPurpose4" TabIndex="111" runat="server" Text="業務參考"></asp:CheckBox>
                                    <asp:CheckBox ID="cbPurpose5" runat="server" Text="權益保障"></asp:CheckBox><br/><asp:CheckBox ID="cbPurpose6" TabIndex="116" runat="server" Text="其他："></asp:CheckBox><asp:TextBox ID="txOtherPurpose" TabIndex="117" runat="server" MaxLength="121" Width="35em"></asp:TextBox></DIV>
                            </DIV>
                        </DIV>
                    </div>
                    <div id="DIV3">
                        <br>
                        <DIV id="Table2" class="DivTable">
                            <DIV>
                                <DIV>&nbsp;
								<div style="height: 16em" class="GridDiv" data-fixed="true">
                                    <asp:DataGrid ID="dg2" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                                        <Columns>
                                            <asp:TemplateColumn HeaderText="序">
                                                <ItemTemplate>
                                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="收費項目">
                                                <ItemTemplate>
                                                    <asp:DropDownList ID="dlChargeNo" runat="server" Width="6.5em">
                                                        <asp:ListItem Value="磁片">磁片</asp:ListItem>
                                                    </asp:DropDownList>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="單價">
                                                <ItemTemplate>
                                                    <asp:TextBox ID="txUnitCost" TabIndex="-1" runat="server" CssClass="displayonly" Width="4em">10</asp:TextBox>
                                                    <asp:TextBox ID="txChargeUnit" TabIndex="-1" runat="server" CssClass="displayonly" Width="3em">頁</asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="數量">
                                                <ItemTemplate>
                                                    <asp:TextBox CssClass="InputFieldNumeric" ID="txUnitCount" runat="server" Width="2.5em"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="金額">
                                                <ItemTemplate>
                                                    <asp:TextBox CssClass="InputFieldNumeric" ID="txPrices" runat="server" Width="4em"></asp:TextBox>
                                                    <asp:Label ID="Label23" runat="server">元</asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                        </Columns>
                                    </asp:DataGrid>
                                    </div>
                                </DIV> 
                            </DIV>
                            <DIV>
                                <DIV >
                                    <asp:Label ID="Label24" runat="server" Width="48px">合計：</asp:Label><asp:TextBox ID="txTotal" runat="server" CssClass="displayonly" Width="6em" ReadOnly="True">10</asp:TextBox><asp:Label ID="Label25" runat="server">元</asp:Label></DIV>
                            </DIV>
                        </DIV>
                    </div>
                </DIV>
			</DIV>
        </DIV>
        <div style="z-index: 103; position: absolute; width: 129px; display: none; height: 260px; overflow: auto; top: 14.5em; left: 888px">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hidden" Style="z-index: 0"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
			<asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:TextBox ID="txFileNoSep" runat="server" Width="31px"></asp:TextBox>
			<asp:TextBox  ID="txApplyNoPostBack" TabIndex="1" runat="server" CssClass="KeyFieldNumeric" MaxLength="8" Width="4.5em" AutoPostBack="True"></asp:TextBox>
			<asp:DropDownList ID="dlChargeNoTmp" runat="server"></asp:DropDownList>
			<asp:TextBox CssClass="InputFieldNumeric" ID="txClientDLPath" TabIndex="1" runat="server" MaxLength="8" Width="42px" AutoPostBack="True"></asp:TextBox>
			<asp:TextBox CssClass="InputFieldNumeric" ID="txServerIP" TabIndex="1" runat="server" MaxLength="8" Width="41px" AutoPostBack="True"></asp:TextBox>
			<asp:TextBox CssClass="InputFieldNumeric" ID="txServerPort" TabIndex="1" runat="server" MaxLength="8" Width="36px" AutoPostBack="True"></asp:TextBox>
			<asp:TextBox CssClass="InputFieldNumeric" ID="txFile" TabIndex="1" runat="server" MaxLength="8" Width="36px" AutoPostBack="True"></asp:TextBox>
            <asp:HiddenField ID="tbcheckChargeContainIsMail" runat="server"></asp:HiddenField>
        </div>		
		<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btInfoOut" runat="server" Text="通知書轉出" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btInfoEdit" runat="server" Text="通知書編輯" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btInfoPrint" runat="server" Text="通知書列印" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btInfoUpload" runat="server" Text="夾帶申請書" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btJudgeInfo" runat="server" Text="審查通知" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
		</asp:Panel>
        <object style="visibility: hidden" id="BF" codebase="Lib/brsr.cab"
            classid="CLSID:FDDE9481-9E0F-4B6A-A368-9632F5C93028"
            progid="Browser.FolderBrowser" viewastext>
        </object>

        <object
            style="z-index: 104; position: absolute; width: 112px; height: 25px; visibility: hidden; top: 5.5em; left: 9px"
            id="dnFile" codebase="Lib/HttpTrans.ocx#version=1,0,1,5"
            classid="CLSID:E7479B6F-DE74-11D5-8CF6-00E018005651"
            data="data:application/x-oleobject;base64,b5tH53Te1RGM9gDgGABWUQADAACTCwAAlQIAAA=="
            progid="HttpTrans.HttpTransCtrl" viewastext>
        </object>
    </form>
</body>
</html>
