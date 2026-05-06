<?xml version="1.0" encoding="Big5"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="Big5"/>
<xsl:preserve-space elements="*"/>
<xsl:template match="/">
	<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "93_roster.dtd"&gt;&#10;</xsl:text>
	<交換表單>
		<xsl:apply-templates select="*/受文者列表//受文者">
			<xsl:with-param name="hasatt">
				<xsl:choose>
					<xsl:when test="*/附件列表/附件檔名/text()">true</xsl:when>
					<xsl:otherwise>false</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
		</xsl:apply-templates>
	</交換表單>
</xsl:template>

<xsl:template match="受文者">
	<xsl:param name="hasatt">false</xsl:param>
	<xsl:if test="發文方式 ='電子交換' and string-length(string(機關代碼)) = 10 and string-length(string(正式名稱))">
		<xsl:choose>
			<xsl:when test="string-length(string(單位代碼)) = 7 ">
				<單位名><xsl:value-of select="正式名稱"/></單位名>
					<xsl:apply-templates select="機關代碼"/>
					<xsl:apply-templates select="單位代碼"/>
			</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates select="正式名稱"/>
			<xsl:apply-templates select="機關代碼"/>
		</xsl:otherwise>
		</xsl:choose>
		<xsl:if test="含附件 and $hasatt='true'">
			<xsl:apply-templates select="含附件"/>
		</xsl:if>
	</xsl:if>
</xsl:template>

<xsl:template match="姓名">
	<姓名><xsl:value-of select="."/></姓名>
</xsl:template>

<xsl:template match="職稱">
	<職稱><xsl:value-of select="."/></職稱>
</xsl:template>
<xsl:template match="正式名稱">
	<全銜><xsl:value-of select="."/></全銜>
</xsl:template>
<xsl:template match="全銜">
	<全銜><xsl:value-of select="."/></全銜>
</xsl:template>

<xsl:template match="機關代碼">
	<機關代碼><xsl:value-of select="."/></機關代碼>
</xsl:template>

<xsl:template match="單位代碼">
	<單位代碼><xsl:value-of select="."/></單位代碼>
</xsl:template>

<xsl:template match="含附件">
	<含附件>
	<xsl:choose>
		<xsl:when test=". ='是'">含附件</xsl:when>
		<xsl:otherwise>不含附件</xsl:otherwise>
	</xsl:choose>
	</含附件>
</xsl:template>

</xsl:stylesheet>