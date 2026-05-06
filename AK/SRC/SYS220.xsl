<?xml version="1.0" encoding="Big5" standalone="yes"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<!-- Html Code -->
		<HTML>
			<HEAD>
				<META name="VI60_DefaultClientScript" Content="VBScript" />
				<TITLE>MenuBar</TITLE>
				<SCRIPT ID="clientEventHandlersVBS" LANGUAGE="vbscript"> 
Sub document_onclick
	//Msgbox window.event.srcElement.className+":"+window.event.srcElement.id,0,"Title"
	//Msgbox window.event.srcElement.style.display,0,"Title"
	if (window.event.srcElement.className="parent") or (window.event.srcElement.className="child1") or (window.event.srcElement.className="child2") then
		if (window.event.srcElement.className="parent") or (window.event.srcElement.className="child1")  then	  
		  if window.event.srcElement.children(2).style.display="none" then 
		     window.event.srcElement.children(0).src="images/FOLDER_B.gif" 
		     window.event.srcElement.children(2).style.display="block"
		  else 
		     window.event.srcElement.children(0).src="images/FOLDER_A.gif" 
		     window.event.srcElement.children(2).style.display="none" 
		  end if
		end if
	end if
	
	if (not(window.event.srcElement.id = "")) and (not(Left(window.event.srcElement.id,2) = "__")) and (not(Left(window.event.srcElement.id,2) = "lk")) then
		//WinName = Left(window.event.srcElement.id,6)
		Dim dotLocation
		dotLocation = Instr(1, window.event.srcElement.id, ".", 1)
		if (dotLocation >= 7) then
			WinName = Mid(window.event.srcElement.id, dotLocation-6, 6)
		end if
   	    
		if (document.all("Cwin").value="") then
   			document.all("Cwin").value = WinName
   		else
   			if InStr(document.all("Cwin").value,WinName)=0 then
   				document.all("Cwin").value = document.all("Cwin").value + "," + WinName
   			end if
   		end if
   		
		test= CInt(window.screen.height-200)

		'for web param
		Dim url, qPos
		url = window.event.srcElement.id
		qPos = Instr(1, url, "?", 1)
		if qPos = 0 then
			url = url + window.location.search
		else
			dim s1, s2
			s1 = Mid(url, 1, qPos - 1)
			s2 = Mid(url, qPos + 1)
			url = s1 + window.location.search + "&amp;" + s2
		end if
	    
		if(url = "divTree")then
		else
			if(window.event.srcElement.type="O")then
				Set WinOpen = window.open (url, "","Height="+CStr(window.screen.height-90)+",Width="+CStr(window.screen.width-8)+",Top=0,Left=0,Scrollbars=yes,menubar=yes,resizable=yes")
			else
				Set WinOpen = window.open (url, "","Height=" + CStr(window.screen.height-90) + ",Width=" + CStr(window.screen.width-10) + ",Top=0,Left=0,Scrollbars=yes,status=yes,resizable=yes")
			end if
			WinOpen.focus()
		end if
	end if
End Sub

Sub OpenWindow(argURL)
	//Msgbox argURL,0,"Title"
	//window.open(argURL)
End Sub
</SCRIPT>

				<style>
.parent { cursor:hand;font-size:13px;height:18px;Display: block }
.child1	{ cursor:hand;font-size:13px;height:18px; DISPLAY: none}
.child2	{ cursor:hand;font-size:13px;height:18px; DISPLAY: none}
.title 	{ color:maroon;font-size:13px;height:18px }
a { TEXT-DECORATION: none; height:16px }
</style>
			</HEAD>
			<BODY rightmargin="0" style="FONT-FAMILY: Verdana; FONT-SIZE: 12px">
				<div>
<!--
					<DIV class="title">
						<b>
							<xsl:for-each select="//NodeList">
								<xsl:value-of select="@NodeTitle" />
								<br />
							</xsl:for-each>
						</b>
					</DIV>
-->
					<xsl:for-each select="//Node1">
						<DIV class="parent">
							<xsl:choose>
								<xsl:when test="@url!=''">
									<DIV onmouseover="style.color='red'" onmouseout="style.color='black'">
										<xsl:attribute name="ID">
											<xsl:value-of select="@url" />
										</xsl:attribute>
										<xsl:attribute name="type">
										     <xsl:value-of select="@ExecType" />
										</xsl:attribute>										
										<IMG src="images/IE.GIF" style="CURSOR: default" />
										<xsl:value-of select="@NodeTitle" />
										<br />
									</DIV>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="ID">__n1</xsl:attribute>
									<IMG src="images/FOLDER_A.GIF" style="CURSOR: default" />
									<xsl:value-of select="@NodeTitle" />
									<br />
								</xsl:otherwise>
							</xsl:choose>
							<DIV class="child1" style="DISPLAY: none">
								<xsl:for-each select="Node2">
									<DIV class="parent">
										<xsl:choose>
											<xsl:when test="@url!=''">
												<DIV onmouseover="style.color='red'" onmouseout="style.color='black'">
													<xsl:attribute name="ID">
														<xsl:value-of select="@url" />
													</xsl:attribute>
													<xsl:attribute name="type">
														 <xsl:value-of select="@ExecType" />
													</xsl:attribute>										
													<xsl:text>　</xsl:text>
													<IMG src="images/IE.GIF" style="CURSOR: default" />
													<xsl:value-of select="@NodeTitle" />
													<br />
												</DIV>
											</xsl:when>
											<xsl:otherwise>
												<xsl:attribute name="ID">__n1</xsl:attribute>
												<xsl:text>　</xsl:text>
												<IMG src="images/FOLDER_A.GIF" style="CURSOR: default" />
												<xsl:value-of select="@NodeTitle" />
												<br />
											</xsl:otherwise>
										</xsl:choose>
										<DIV class="child1" style="DISPLAY: none">
											<xsl:for-each select="NodeItem1">
											  <xsl:choose>
												<xsl:when test="@url!=''">
												<DIV onmouseover="style.color='red'" onmouseout="style.color='black'">
													<xsl:attribute name="ID">
														<xsl:value-of select="@url" />
													</xsl:attribute>
													<xsl:attribute name="type">
														 <xsl:value-of select="@ExecType" />
													</xsl:attribute>										
													<xsl:text>　</xsl:text>
													<xsl:text>　</xsl:text>
													<IMG src="images/IE.gif" style="CURSOR: default" />
													<xsl:value-of select="@NodeTitle" />
												</DIV>
												</xsl:when>
												<xsl:otherwise>
													<xsl:attribute name="ID">__n2</xsl:attribute>
													<xsl:text>　</xsl:text>
													<xsl:text>　</xsl:text>
													<IMG src="images/FOLDER_A.GIF" style="CURSOR: default" />
													<xsl:value-of select="@NodeTitle" />
													<br />
													<DIV class="child2" style="DISPLAY: none">
														<xsl:for-each select="NodeItem2">
														   <DIV onmouseover="style.color='red'" onmouseout="style.color='black'">
															  <xsl:attribute name="ID">
																 <xsl:value-of select="@url" />
															  </xsl:attribute>
															  
															  
															  <xsl:text>　</xsl:text>
															  <IMG src="images/IE.gif" style="CURSOR: default" />
															  <xsl:value-of select="@NodeTitle" />
														   </DIV>								    	        
														</xsl:for-each>
													</DIV>
												</xsl:otherwise>
											  </xsl:choose>
											</xsl:for-each>
										</DIV>
									</DIV>
								</xsl:for-each>

								<xsl:for-each select="NodeItem1">
								  <xsl:choose>
								    <xsl:when test="@url!=''">
									<DIV onmouseover="style.color='red'" onmouseout="style.color='black'">
										<xsl:attribute name="ID">
											<xsl:value-of select="@url" />
										</xsl:attribute>
										<xsl:attribute name="type">
										     <xsl:value-of select="@ExecType" />
										</xsl:attribute>										
										<xsl:text>　</xsl:text>
										<IMG src="images/IE.gif" style="CURSOR: default" />
										<xsl:value-of select="@NodeTitle" />
									</DIV>
								    </xsl:when>
								    <xsl:otherwise>
								        <xsl:attribute name="ID">__n2</xsl:attribute>
								    	<xsl:text>　</xsl:text>
								    	<IMG src="images/FOLDER_A.GIF" style="CURSOR: default" />
								    	<xsl:value-of select="@NodeTitle" />
								    	<br />
								    	<DIV class="child2" style="DISPLAY: none">
								    	    <xsl:for-each select="NodeItem2">
								    	       <DIV onmouseover="style.color='red'" onmouseout="style.color='black'">
								    	          <xsl:attribute name="ID">
								    	             <xsl:value-of select="@url" />
								    	          </xsl:attribute>
								    	          
								    	          
								    	          <xsl:text>　</xsl:text>
								    	          <IMG src="images/IE.gif" style="CURSOR: default" />
								    	          <xsl:value-of select="@NodeTitle" />
								    	       </DIV>								    	        
								    	    </xsl:for-each>
								    	</DIV>
								    </xsl:otherwise>
								  </xsl:choose>
								</xsl:for-each>
							</DIV>
						</DIV>
					</xsl:for-each>
				</div>
			</BODY>
		</HTML>
	</xsl:template>
</xsl:stylesheet>
