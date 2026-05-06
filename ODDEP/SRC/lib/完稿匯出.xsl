<?xml version="1.0" encoding="UTF-16"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="no" encoding="UTF-16" />
	<xsl:template match="/ | @* | node()">
		<xsl:choose>\
			<xsl:when test="name()=\'mi\'">
				<xsl:choose>
					<xsl:when test="name(..)=\'mi\'">
						<xsl:apply-templates select=".."/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:if test="@act != \'del\'">
							<xsl:value-of select="."/>
						</xsl:if>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="name()=\'fmt\'">
				<xsl:choose>
					<xsl:when test="name(..)=\'mi\'">
						<xsl:apply-templates select=".."/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="."/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="name()=\'函類別\'">
				<xsl:element name="函類別">
					<xsl:attribute name="代碼">
						<xsl:value-of select="@代碼"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:when>
			<xsl:when test="name()=\'速別\'">
				<xsl:element name="速別">
					<xsl:attribute name="代碼">
						<xsl:value-of select="@代碼"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="name()=\'文字\'">
						<文字>
							<xsl:call-template name="conv文字"/>
						</文字>
					</xsl:when>
					<xsl:otherwise>
						<xsl:copy>
							<xsl:apply-templates select="@* | node()"/>
						</xsl:copy>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="conv文字">
		<xsl:for-each select=".//text()">
			<xsl:choose>
				<xsl:when test="name(..)=\'mi\'">
					<xsl:apply-templates select=".."/>
				</xsl:when>
				<xsl:when test="name(..)=\'fmt\'">
					<xsl:apply-templates select=".."/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="translate(., \'&#x9;&#xD;&#xA;\', \'\')"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>