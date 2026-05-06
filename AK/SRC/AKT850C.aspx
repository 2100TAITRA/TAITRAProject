
<%@ Page language="c#" Codebehind="AKT850C.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT850C" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>AKT850C 請詳閱後附填寫須知</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<!--LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet"-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="AKT850C" onkeyup="jf_CheckFull();" method="post" runat="server">
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable" >
				<DIV class="DivTable">
					<DIV>
						<FONT face="標楷體">請詳閱後附填寫須知 </FONT>
						<DIV><FONT face="標楷體">
								<P align="center">
									<asp:Panel id="Panel1" runat="server" Width="623px"></P>
								<P align="center"><U>
								填&nbsp;&nbsp;&nbsp; 寫&nbsp;&nbsp;&nbsp; 須&nbsp;&nbsp;&nbsp; 知</FONT>&nbsp;</U></U></P>
							<P><FONT face="標楷體">一、</FONT> <FONT face="標楷體">※標記者，請依需要加填，其他欄位請填據完整。</FONT></P>
							<P><FONT face="標楷體">二、身份證明文件字號請填列身份證字號或護照號碼。</FONT></P>
							<P><FONT face="標楷體">三、代理人如係意定代理者，請檢具委任書；如係法定代理者，請檢具相關證明文</FONT><FONT face="新細明體">件影&nbsp; </FONT>
							</P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  本。申請案件屬個人隱私者，請檢具身份關係證明文件。</FONT></P>
							<P><FONT face="標楷體">四、法人、團體、事務所或營業所請付登記證影本。</FONT></P>
							<P><FONT face="標楷體">五、申請機關檔案有檔案法第18條所定情形之一者，本機關得予以駁回。</FONT></P>
							<P><FONT face="標楷體">六、閱覽、抄錄或複製檔案，應遵守〈檔案應用規範〉...有關規定，並不得有下列行為：</FONT></P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;〈一〉添註、塗改、更換、抽取、圈點或污損檔案。</FONT></P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;〈二〉拆散已裝訂完成之檔案。</FONT></P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 〈三〉以其他方法破壞檔案或變更檔案內容。</FONT></P>
							<P><FONT face="標楷體">八、閱覽、抄錄或複製檔案收費標準：</FONT></P>
							<P><FONT face="標楷體">九、申請書具填後，得以書面通訊方式送&nbsp; <asp:Label id="lbOrgName" runat="server" Width="20em"></asp:Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址： <asp:Label id="lbAddress" runat="server" Width="31em"></asp:Label>
								</FONT>
							</P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 電話： <asp:Label id="lbTel" runat="server" Width="31em"></asp:Label>
								</FONT>
							</P>
							<P><FONT face="標楷體">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 傳真： <asp:Label id="lbFax" runat="server" Width="31em"></asp:Label>
								</FONT>
							</P>
							<P><FONT face="標楷體">十、其他應告知事項：</FONT></P>
							<P align="center"></asp:Panel></P>
							</FONT>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
		</FORM>
	</BODY>
</HTML>
