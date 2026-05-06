<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="AKT116.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT116" ValidateRequest="false" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKT116 點收及退文作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<style> <!-- 
	.DataHeader{height:inherit; display:table-cell;float:left;text-align:center;margin:0 auto;BORDER-LEFT-STYLE: outset;font-size: medium;
				color:white; BORDER-BOTTOM-STYLE: outset; BORDER-RIGHT-STYLE: outset; BORDER-TOP-STYLE: outset;border-right-width:0.08em;
			  border-left-width:0.08em;border-top-width:0.08em;border-bottom-width:0.08em;}
	.Datalist{display:table-cell;text-align:center;margin:0 auto;BORDER-LEFT-STYLE: outset;font-size: medium;color:black; 
			  BORDER-BOTTOM-STYLE: outset; BORDER-RIGHT-STYLE: outset; BORDER-TOP-STYLE: outset;border-bottom-color:rgba(221, 221, 221, 1);
			  border-top-color:rgba(221, 221, 221, 1);border-left-color:rgba(221, 221, 221, 1);border-right-width:0.08em;
			  border-left-width:0.08em;border-top-width:0.08em;border-bottom-width:0.08em;word-break:break-all;}
	/*1060823	Leslie		效能調校*/
	.WD_1{Width:1em;}
	.WD_1H{Width:2em;}
	.WD_2{Width:2em;}
	.WD_3{Width:3.5em;}
	.WD_4{Width:4em;}
	.WD_4H{Width:4.5em;}
	.WD_5H{Width:5.5em;}
	.WD_7{Width:7em;}
	.WD_7H{Width:7.5em;}
	.WD_8{Width:8em;}
	.WD_9{Width:9em;}
	--></style>
</head>
<body>
    <form id="AKT116" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable">
				<div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                        <asp:TextBox ID="H_ORGNO" CssClass="hide" runat="server"></asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="tbDocNo" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
					</div>
					<div class="dTD" style="width: 4.5em">
                        <asp:Button AccessKey="S" Style="z-index: 0" ID="btConfirm" TabIndex="7" runat="server" Text="確定[S]" ToolTip="確定[Alt+S]" Height="36px"></asp:Button>
					</div>
					<div class="dTD" style="width: 4.5em">
                        <asp:Button AccessKey="Q" Style="z-index: 0" ID="btCls" TabIndex="50" runat="server" Text="取消[Q]" ToolTip="取消[Alt+Q]" Height="36px"></asp:Button>
					</div>
					<div class="dTD" style="width: 4.5em">
                        <asp:Button AccessKey="H" Style="z-index: 0" ID="btDocInfo" TabIndex="-1" runat="server" Text="基資維護[H]" ToolTip="基資維護[Alt+H]" Height="36px"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label99" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
                    <div class="dTD" style="width: 25em">
                        <asp:RadioButton Style="z-index: 0" ID="rbAcceptDoc" TabIndex="1" runat="server" Text="點收" ToolTip="點收公文" GroupName="2" Checked="True"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbRejectDoc" TabIndex="2" runat="server" Text="退文" ToolTip="點收公文" GroupName="2"></asp:RadioButton>
                        <asp:Label Style="z-index: 0" ID="Label13" runat="server">，退文至(單位)：</asp:Label>
                        <asp:RadioButton Style="z-index: 0" ID="rbType1" TabIndex="1" runat="server" Text="承辦" GroupName="rbType"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbType2" TabIndex="2" runat="server" Text="歸檔" GroupName="rbType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="Label17" runat="server" Height="19px">公文主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox Style="z-index: 0" ID="txDocSubject" TabIndex="0" runat="server" MaxLength="80" TextMode="MultiLine" Height="2.5em" Width="30em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="Label1" runat="server" Height="19px">註記：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:DropDownList Style="z-index: 0" ID="dlAcceptDoc" TabIndex="3" runat="server" Width="20em"></asp:DropDownList>
                        <asp:Button Style="z-index: 0" ID="btChange" runat="server" Width="6.5em" Text="批次更改註記"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="Label4" runat="server" >備註：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox Style="z-index: 0" ID="tbTxDesc" TabIndex="4" runat="server" MaxLength="80"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="Label12" runat="server" CssClass="hide">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox Style="z-index: 0" ID="txCloseDate" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label3" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
                    <div class="dTD" style="width: 25em">
                        <asp:CheckBox Style="z-index: 0" ID="cbDelayAttFlag" TabIndex="5" runat="server" Text="附件抽存"></asp:CheckBox>
                        <asp:Label Style="z-index: 0" ID="Label11" runat="server">，附件預計歸檔日期：</asp:Label>
                        <asp:TextBox Style="z-index: 0" ID="txExtfileDate" TabIndex="6" runat="server" CssClass="DatePicker" Width="63px" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label5" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
					</div>
					<div class="dTD" style="width: 25em">
                        <asp:Label Style="z-index: 0" ID="Label14" runat="server" Width="80px">併案公文：</asp:Label>
                        <asp:Label Style="z-index: 0" ID="lbComNo" runat="server" Width="80px"></asp:Label>
                        <asp:Label Style="z-index: 0" ID="Label15" runat="server" Width="96px">有抽存附件，</asp:Label>
                        <asp:CheckBox Style="z-index: 0" ID="cbWithAttach" TabIndex="5" runat="server" Text="要一併點收"></asp:CheckBox>
                    </div>
                </div>
			</div>
            <div style="height: 594px" id="WorkArea" class="DivTable" >
                <div class="dTR" style="height: 36px;">
                    <div class="dTD" style="width: 5em">
                        <asp:Button AccessKey="C" ID="btClearSelect" TabIndex="-1" runat="server" Text="清除(C)" ToolTip="清除(Alt+C)" Height="36px" DESIGNTIMEDRAGDROP="911"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Button AccessKey="O" ID="btSelectAll" TabIndex="-1" runat="server" Text="全選(O)" ToolTip="全選(Alt+O)" Height="36px" DESIGNTIMEDRAGDROP="904"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Button AccessKey="N" ID="btReverse" TabIndex="-1" runat="server" Text="反向(N)" ToolTip="反向(Alt+N)" Height="36px" DESIGNTIMEDRAGDROP="905"></asp:Button>
                    </div>
                </div>
				<div class="dTR">
				<div class="dTD">
                <div id="TableTitle" style="text-align: center; background-color: #6facd5; height: 3.1em; margin: 0px auto">
                            <div class="DataHeader" style="width: 2em ;">詮釋資料</div>
                            <div class="DataHeader" style="width: 1em ;" >取消</div>
                            <div class="DataHeader" style="width: 1em ;" >註記</div>
                            <div class="DataHeader" style="width: 2em ;" >序</div>
                            <div class="DataHeader" style="width: 5.5em ;">公文文號</div>
                            <div class="DataHeader" style="width: 2em ;">檔案類別</div>
                            <div class="DataHeader" style="width: 2em ;" id="lbFileCnt" >頁數</div>
                            <div class="DataHeader" style="width: 2em ;" >來文歸檔</div>
                            <div class="DataHeader" style="width: 2em ;" >頁數</div>
                            <div class="DataHeader" style="width: 4.5em ;" id="lbSendDept" >歸檔單位</div>
                            <div class="DataHeader" style="width: 4.5em ;" id="lbDept" >承辦單位</div>
                            <div class="DataHeader" style="width: 2em ;" id="lbWorkType" >作業別</div>
                            <div class="DataHeader" style="width: 2em ;" id="lbRejectType" >退文類型</div>
                            <div class="DataHeader" style="width: 7em ;" id="lbMark" >點收 / 退文註記</div>
                            <div class="DataHeader" style="width: 2em ;" >附件抽存</div>
                            <div class="DataHeader" style="width: 4em ;" >附件預計歸檔日期</div>
                            <div class="DataHeader" style="width: 4em ;" >歸檔<br> 送件日</div>
                            <div class="DataHeader" style="width: 2em ;" id="lbCloseType" >結案別</div>
                            <div class="DataHeader" style="width: 4.5em ;" id="lbFileCls" >分類號</div>
                            <div class="DataHeader" style="width: 3.5em ;" id="lbAppUserName" >核決者</div>
                            <div class="DataHeader" style="width: 5em ;" id="lbDect" >備註</div>
                            <div class="DataHeader" style="width: 4.5em ;" id="lbErrMsg" >異常訊息</div>
                            <div class="DataHeader" style="width: 5.5em ;" id="lbDOC_D" ></div>
                    </div>
					<div style="width: 100%; height: 315px; overflow: auto;" id="divSignArea">
					<div id="DATA1" style="text-align:center;";></div>
                    <asp:Label ID="lbMsg" runat="server"></asp:Label>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="執行(R)" AccessKey="R" ToolTip="點收(ALT+R)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除(Z)" AccessKey="Z" ToolTip="清除(ALT+Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="待點收公文查詢(I)" AccessKey="I" ToolTip="查詢(ALT+I)" Style="display: none" DefaultStyle="newmode:block;modifymode:none" />
            <asp:Button ID="btAcpList" runat="server" Text="點收清單(G)" AccessKey="G" ToolTip="預覽/列印點收清單(ALT+G)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btRejectList" runat="server" Text="退文清單(P)" AccessKey="P" ToolTip="預覽/列印退文清單(ALT+P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <div style="z-index: 102; position: absolute; width: 506px; display: none; height: 83px; overflow: auto; top: 500px; left: 3px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Height="24px" DESIGNTIMEDRAGDROP="12"></asp:ListBox>
            <asp:ListBox ID="h_lbInitCase" runat="server" Height="24px" DESIGNTIMEDRAGDROP="129"></asp:ListBox>
            <asp:TextBox ID="txMsg" runat="server" Width="16px" Height="25px" ValidateRequestMode="Disabled"></asp:TextBox>
            <asp:TextBox ID="txMsgColor" runat="server" Width="16px" Height="25px" ValidateRequestMode="Disabled"></asp:TextBox>
            <asp:TextBox ID="htxShowDocInfo" runat="server" Height="25px"></asp:TextBox>
            <asp:TextBox ID="tbSaveDocNo" runat="server" Height="25px"></asp:TextBox>
            <asp:TextBox ID="tbComNo" runat="server" Height="25px"></asp:TextBox>
            <asp:TextBox ID="tbCom_Acc" runat="server" Height="25px"></asp:TextBox>
            <asp:TextBox ID="tbRecord" runat="server" Height="25px"></asp:TextBox>
            <asp:ListBox ID="Record" runat="server" Height="23px"></asp:ListBox>
            <asp:ListBox ID="Listbox1" runat="server" Height="23px"></asp:ListBox>
            <asp:Label ID="lbRejectDoc" runat="server" Height="23px"></asp:Label>
            <asp:CustomValidator ID="Customvalidator1" runat="server" Width="71px" Height="23px" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:TextBox ID="tbAcceptDoc" runat="server" MaxLength="2" Height="25px"></asp:TextBox>
            <asp:TextBox ID="tbRejectDoc" runat="server" MaxLength="2" Height="25px"></asp:TextBox>
            <asp:TextBox ID="txUser" runat="server" MaxLength="2" Height="25px"></asp:TextBox>
            <asp:TextBox ID="txDocFileType" runat="server" MaxLength="2" Height="25px"></asp:TextBox>
            <asp:TextBox ID="txErrMsgTmp" runat="server" MaxLength="2" Height="25px"></asp:TextBox>
            <asp:TextBox ID="txRtnRcvDept" runat="server" MaxLength="2" Height="25px"></asp:TextBox>
            <asp:TextBox ID="H_Artif" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_ISALERT" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAK_AKT116_SHOW_CLOSETYPE" runat="server" CssClass="hide"></asp:TextBox>
			<asp:textbox id="txClsNo" tabIndex="10" runat="server" Width="70px" MaxLength="20" Height="20px" Font-Size="Smaller"></asp:textbox>
			<asp:textbox id="txComNo" tabIndex="15" runat="server" Width="70px" MaxLength="20" Height="20px" Font-Size="Smaller"></asp:textbox>
			<asp:textbox id="txCaseNo" tabIndex="27" runat="server" Width="70px" MaxLength="10" Height="20px"></asp:textbox>
			<asp:textbox id="txCaseName" tabIndex="29" runat="server" Width="262px" Height="20px" Font-Size="Smaller"></asp:textbox>
			<asp:textbox id="txErrMsg" tabIndex="-1" runat="server" CssClass="displayonly" ReadOnly="True" Font-Size="Smaller" TextMode="MultiLine"></asp:textbox>
        </div>
    </form>
</body>
</html>
