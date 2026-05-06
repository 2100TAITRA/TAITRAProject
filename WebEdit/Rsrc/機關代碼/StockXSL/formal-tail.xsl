	<xsl:template name="makeTableRow">
		<xsl:param name="nset"/>
		<xsl:param name="from"/>
		<xsl:param name="to"/>
		<xsl:param name="val"/>
		<xsl:param name="xpath"/>
		<table-row row-height="0.0" free-cell="true">
			<xsl:for-each select="$nset">
				<xsl:if test="position() &gt;= $from and position() &lt;= $to">
					<table-cell writing-mode="inherit" align-block="start" border-width="0">
						<xsl:attribute name="cell-width">
							<xsl:value-of select="@width"/>
						</xsl:attribute>
						<para show-in-page="7" space-before="2.0" space-after="0.0" space-start="1.0" space-end="1.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
							<xsl:attribute name="font-family">
								<xsl:value-of select="$預設字型"/>
							</xsl:attribute>
							<xsl:variable name="判斷字">
								<xsl:text>,</xsl:text>
								<xsl:value-of select="."/>
								<xsl:text>,</xsl:text>
							</xsl:variable>
							<a>
<!-- xsl:attribute name="id">請辦單位</xsl:attribute -->
<xsl:attribute name="op">4</xsl:attribute>
								<xsl:attribute name="sync-path"><xsl:value-of select="$xpath"/></xsl:attribute>
								<xsl:attribute name="value">
									<xsl:value-of select="."/>
								</xsl:attribute>
								<xsl:attribute name="checked">
									<xsl:value-of select="contains($val, $判斷字)"/>
								</xsl:attribute>
								<xsl:value-of select="."/>
							</a>
						</para>
					</table-cell>
				</xsl:if>
			</xsl:for-each>
		</table-row>
	</xsl:template>
	<xsl:template match="主旨">
		<xsl:param name="hideparaname"/>
		<xsl:param name="nodispifempty"/>
		<xsl:param name="spacebefore">0.0</xsl:param>
		<xsl:param name="spaceafter">0.0</xsl:param>
		<xsl:param name="spacestart">0.0</xsl:param>
		<xsl:param name="spaceend">0.0</xsl:param>
		<xsl:param name="fontfamily" select="$預設字型"/>
		<xsl:param name="altfont" select="$預設英數字型"/>
		<xsl:param name="fontsize">16</xsl:param>
		<xsl:param name="indent">-3</xsl:param>
		<xsl:param name="offset">3</xsl:param>
		<xsl:param name="lineheight" select="$預設行高"/>
		<xsl:if test="$nodispifempty=0 or string-length(文字) &gt; 0">
			<xsl:variable name="paraname">
				<xsl:choose><xsl:when test="string-length(@段名) &gt; 0">
					<xsl:value-of select="@段名"/>
				</xsl:when><xsl:otherwise>
					<xsl:text>主旨：</xsl:text>
				</xsl:otherwise></xsl:choose>
			</xsl:variable>
			<xsl:element name="para">
				<xsl:attribute name="space-before"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
						<xsl:value-of select="@space-before"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-after"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
						<xsl:value-of select="@space-after"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-start"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
						<xsl:value-of select="@space-start"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-end"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
						<xsl:value-of select="@space-end"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="font-family"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
						<xsl:value-of select="@font-family"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="alt-fontname"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
						<xsl:value-of select="@alt-fontname"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="font-size"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
						<xsl:value-of select="@font-size"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:choose>
					<xsl:when test="$hideparaname=0">
						<xsl:attribute name="indent"><xsl:value-of select="0 - string-length($paraname)"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="string-length($paraname)"/></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="indent"><xsl:value-of select="$indent"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="$offset"/></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="line-height"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
						<xsl:value-of select="@line-height"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="align-inline"><xsl:choose>
					<xsl:when test="string-length(@alignment)>0">
						<xsl:value-of select="@alignment"/>
					</xsl:when>
					<xsl:otherwise>both</xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
					<xsl:attribute name="font-style">
						<xsl:value-of select="@styles"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="$hideparaname=0">
					<xsl:value-of select="$paraname"/>
				</xsl:if>
				<xsl:apply-templates select="文字"/>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="段落">
		<xsl:param name="hideparaname"/>
		<xsl:param name="nodispifempty"/>
		<xsl:param name="paranamebold"/>
		<xsl:param name="spacebefore">0.0</xsl:param>
		<xsl:param name="spaceafter">0.0</xsl:param>
		<xsl:param name="spacestart">0.0</xsl:param>
		<xsl:param name="spaceend">0.0</xsl:param>
		<xsl:param name="fontfamily" select="$預設字型"/>
		<xsl:param name="altfont" select="$預設英數字型"/>
		<xsl:param name="fontsize">16</xsl:param>
		<xsl:param name="indent">0</xsl:param>
		<xsl:param name="offset">0</xsl:param>
		<xsl:param name="lineheight" select="$預設行高"/>
		<!-- 1090423 Raymond 1090293 取得此段落的index, 傳入條列template -->
		<xsl:variable name="nm" select="name(.)"/>
		<xsl:variable name="idx" select="count(./preceding-sibling::*[name()=$nm])"/>
		<xsl:if test="$nodispifempty=0 or .//文字/text() or .//文字/mi[@act != 'del']/text() or .//文字/fmt">
			<xsl:element name="para">
				<xsl:attribute name="space-before">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
							<xsl:value-of select="@space-before"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="space-after">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
							<xsl:value-of select="@space-after"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="space-start">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
							<xsl:value-of select="@space-start"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="space-end">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
							<xsl:value-of select="@space-end"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="font-family">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
							<xsl:value-of select="@font-family"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="alt-fontname">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
							<xsl:value-of select="@alt-fontname"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="font-size">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
							<xsl:value-of select="@font-size"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:choose>
					<xsl:when test="$hideparaname=0">
						<xsl:attribute name="indent"><xsl:value-of select="0 - string-length(@段名)"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="string-length(@段名)"/></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="indent"><xsl:value-of select="$indent"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="$offset"/></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="line-height">
					<xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
							<xsl:value-of select="@line-height"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="align-inline"><xsl:choose>
					<xsl:when test="string-length(@alignment)>0">
						<xsl:value-of select="@alignment"/>
					</xsl:when>
					<!-- 1130319 Raymond 1121074 令的段落條列恢復分散對齊 -->
					<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的段落條列要靠左對齊  -->
					<!--xsl:when test="name(/*)='令' and (/*/令類別/@代碼='令' or /*/函類別/@代碼='令')">start</xsl:when-->
					<xsl:otherwise>both</xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
					<xsl:attribute name="font-style">
						<xsl:value-of select="@styles"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="$hideparaname=0">
					<xsl:choose>
						<xsl:when test="$paranamebold">
							<inline font-style="4">
								<xsl:value-of select="@段名"/>
							</inline>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@段名"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:if>
				<xsl:apply-templates select="文字"/>
			</xsl:element>
			<xsl:apply-templates select="條列">
				<xsl:with-param name="spacebefore" select="$spacebefore"/>
				<xsl:with-param name="spaceafter" select="$spaceafter"/>
				<xsl:with-param name="spacestart" select="$spacestart"/>
				<xsl:with-param name="spaceend" select="$spaceend"/>
				<xsl:with-param name="fontfamily" select="$fontfamily"/>
				<xsl:with-param name="altfont" select="$altfont"/>
				<xsl:with-param name="fontsize" select="$fontsize"/>
				<xsl:with-param name="offset" select="number($offset) + number($indent) + 1"/>
				<xsl:with-param name="lineheight" select="$lineheight"/>
				<xsl:with-param name="paraIndex" select="$idx"/><!-- 1090423 Raymond 1090293 傳入此段落的index, 供人事條列判斷是否對齊冒號 -->
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>
	<xsl:template match="條列">
		<xsl:param name="spacebefore"/>
		<xsl:param name="spaceafter"/>
		<xsl:param name="spacestart"/>
		<xsl:param name="spaceend"/>
		<xsl:param name="fontfamily"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="offset"/>
		<xsl:param name="lineheight"/>
		<xsl:param name="paraIndex"/><!-- 1090423 Raymond 1090293 新增段落的索引值, 供人事條列使用 -->
		<xsl:choose>
			<!-- 1110801 Raymond 考試院序147 新增「令(令類別為『人事令』)」為人事令函 -->
			<!-- 1090226 Raymond 1090116 新增判斷「派兼令」、「令(令類別為『獎懲令』)」、「函(函類別為『獎懲建議函』)」為人事令函 -->
			<xsl:when test="(name(/*)='派免建議函') or (name(/*)='派令') or (name(/*)='派免兼建議函') or (name(/*)='派免令') or (name(/*)='獎懲建議函') or (name(/*)='獎懲令') or (name(/*)='派兼令') or (name(/*)='令' and /*/令類別/@代碼='獎懲令') or (name(/*)='函' and /*/函類別/@代碼='獎懲建議函') or (name(/*)='令' and /*/令類別/@代碼='人事令')">
				<xsl:call-template name="人事條列">
					<xsl:with-param name="spacebefore" select="$spacebefore"/>
					<xsl:with-param name="spaceafter" select="$spaceafter"/>
					<xsl:with-param name="spacestart" select="$spacestart"/>
					<xsl:with-param name="spaceend" select="$spaceend"/>
					<xsl:with-param name="fontfamily" select="$fontfamily"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="offset" select="$offset"/>
					<xsl:with-param name="lineheight" select="$lineheight"/>
					<xsl:with-param name="paraIndex" select="$paraIndex"/><!-- 1090423 Raymond 1090293 傳入此段落的index, 供人事條列判斷是否對齊冒號 -->
				</xsl:call-template>
			</xsl:when>
			<!-- 1140711 Raymond 1140958 新增「會銜令」比照令的凸排方式 -->
			<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的條列次行要空兩格  -->
			<xsl:when test="(name(/*)='令' and (/*/令類別/@代碼='令' or /*/函類別/@代碼='令' or /*/令類別/@代碼='會銜令')) or name(/*)='會銜令'">
				<xsl:call-template name="令條列">
					<xsl:with-param name="spacebefore" select="$spacebefore"/>
					<xsl:with-param name="spaceafter" select="$spaceafter"/>
					<xsl:with-param name="spacestart" select="$spacestart"/>
					<xsl:with-param name="spaceend" select="$spaceend"/>
					<xsl:with-param name="fontfamily" select="$fontfamily"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="offset" select="$offset"/>
					<xsl:with-param name="lineheight" select="$lineheight"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:element name="para">
					<xsl:attribute name="space-before">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
								<xsl:value-of select="@space-before"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="space-after">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
								<xsl:value-of select="@space-after"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="space-start">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
								<xsl:value-of select="@space-start"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="space-end">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
								<xsl:value-of select="@space-end"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="font-family">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
								<xsl:value-of select="@font-family"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="alt-fontname">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
								<xsl:value-of select="@alt-fontname"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="font-size">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
								<xsl:value-of select="@font-size"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="indent">
						<xsl:value-of select="0 - string-length(@序號)"/>
					</xsl:attribute>
					<xsl:attribute name="padding-start">
						<xsl:value-of select="string-length(@序號) + number($offset)"/>
					</xsl:attribute>
					<xsl:attribute name="line-height">
						<xsl:choose>
							<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
								<xsl:value-of select="@line-height"/>
							</xsl:when>
							<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:if test="@AlignParentContext">
						<xsl:attribute name="align-parent-context">
							<xsl:value-of select="@AlignParentContext"/>
						</xsl:attribute>
					</xsl:if>
					<xsl:attribute name="align-inline"><xsl:choose>
						<xsl:when test="string-length(@alignment)>0">
							<xsl:value-of select="@alignment"/>
						</xsl:when>
						<xsl:otherwise>both</xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
						<xsl:attribute name="font-style">
							<xsl:value-of select="@styles"/>
						</xsl:attribute>
					</xsl:if>
					<xsl:value-of select="@序號"/>
					<xsl:apply-templates select="文字"/>
				</xsl:element>
				<xsl:apply-templates select="條列">
					<xsl:with-param name="spacebefore" select="$spacebefore"/>
					<xsl:with-param name="spaceafter" select="$spaceafter"/>
					<xsl:with-param name="spacestart" select="$spacestart"/>
					<xsl:with-param name="spaceend" select="$spaceend"/>
					<xsl:with-param name="fontfamily" select="$fontfamily"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="offset" select="number($offset) + 1"/>
					<xsl:with-param name="lineheight" select="$lineheight"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="人事條列">
		<xsl:param name="spacebefore"/>
		<xsl:param name="spaceafter"/>
		<xsl:param name="spacestart"/>
		<xsl:param name="spaceend"/>
		<xsl:param name="fontfamily"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="offset"/>
		<xsl:param name="lineheight"/>
		<xsl:param name="paraIndex"/><!-- 1090423 Raymond 1090293 新增段落的索引值, 供人事條列使用 -->
		<!-- 1090226 Raymond 1090116 追蹤修訂刪除冒號時, 要取沒有已刪除的文字來判斷冒號位置 -->
		<xsl:variable name="pureTx">
			<xsl:for-each select="文字//text()">
				<xsl:choose>
					<xsl:when test="name(..) = 'mi' and ../@act = 'del'"></xsl:when>
					<xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:variable>
		<xsl:variable name="le">
			<xsl:choose>
				<xsl:when test="$paraIndex = 0 and string-length(substring-before(string($pureTx), '：')) &gt; 0 and string-length(substring-before(string($pureTx), '：')) &lt; (string-length($pureTx) - 1)"><!-- 1090423 Raymond 1090293 人事條列在非第0段落不須對齊冒號, 1140624 Raymond 1140952 若冒號是最後一個字則不要對齊, 以避免冒號出現在靠右邊界甚至下一行時無剩餘空間容納下一個字時, 整行位移至次行的問題 -->
					<xsl:value-of select="string-length(substring-before(string($pureTx), '：'))+1"/>
				</xsl:when>
				<xsl:otherwise>0</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="para">
			<xsl:attribute name="space-before">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
						<xsl:value-of select="@space-before"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-after">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
						<xsl:value-of select="@space-after"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-start">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
						<xsl:value-of select="@space-start"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-end">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
						<xsl:value-of select="@space-end"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="font-family">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
						<xsl:value-of select="@font-family"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="alt-fontname">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
						<xsl:value-of select="@alt-fontname"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="font-size">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
						<xsl:value-of select="@font-size"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="indent">
				<xsl:value-of select="0 - string-length(@序號) - $le"/>
			</xsl:attribute>
			<xsl:attribute name="padding-start">
				<xsl:value-of select="string-length(@序號) + number($offset) + $le"/>
			</xsl:attribute>
			<xsl:attribute name="line-height">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
						<xsl:value-of select="@line-height"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<!-- 1110927 Raymond 1110990 修正令條列沒有對齊父段落功能的問題 -->
			<xsl:if test="@AlignParentContext">
				<xsl:attribute name="align-parent-context">
					<xsl:value-of select="@AlignParentContext"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="align-inline"><xsl:choose>
				<xsl:when test="string-length(@alignment)>0">
					<xsl:value-of select="@alignment"/>
				</xsl:when>
				<xsl:otherwise>both</xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
				<xsl:attribute name="font-style">
					<xsl:value-of select="@styles"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="@序號"/>
			<xsl:apply-templates select="文字"/>
		</xsl:element>
		<xsl:apply-templates select="條列">
			<xsl:with-param name="spacebefore" select="$spacebefore"/>
			<xsl:with-param name="spaceafter" select="$spaceafter"/>
			<xsl:with-param name="spacestart" select="$spacestart"/>
			<xsl:with-param name="spaceend" select="$spaceend"/>
			<xsl:with-param name="fontfamily" select="$fontfamily"/>
			<xsl:with-param name="altfont" select="$altfont"/>
			<xsl:with-param name="fontsize" select="$fontsize"/>
			<xsl:with-param name="offset" select="number($offset) + 1"/>
			<xsl:with-param name="lineheight" select="$lineheight"/>
			<xsl:with-param name="paraIndex" select="$paraIndex"/><!-- 1090423 Raymond 1090293 傳入此段落的index, 供人事條列判斷是否對齊冒號 -->
		</xsl:apply-templates>
	</xsl:template>
	<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的條列次行要空兩格  -->
	<xsl:template name="令條列">
		<xsl:param name="spacebefore"/>
		<xsl:param name="spaceafter"/>
		<xsl:param name="spacestart"/>
		<xsl:param name="spaceend"/>
		<xsl:param name="fontfamily"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="offset"/>
		<xsl:param name="lineheight"/>
		<xsl:element name="para">
			<xsl:attribute name="space-before">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
						<xsl:value-of select="@space-before"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spacebefore"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-after">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
						<xsl:value-of select="@space-after"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spaceafter"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-start">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
						<xsl:value-of select="@space-start"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spacestart"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-end">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
						<xsl:value-of select="@space-end"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spaceend"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="font-family">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
						<xsl:value-of select="@font-family"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$fontfamily"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="alt-fontname">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
						<xsl:value-of select="@alt-fontname"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$altfont"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="font-size">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
						<xsl:value-of select="@font-size"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$fontsize"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="indent">-2</xsl:attribute>
			<xsl:attribute name="padding-start">
				<xsl:value-of select="number($offset) + 2"/>
			</xsl:attribute>
			<xsl:attribute name="line-height">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
						<xsl:value-of select="@line-height"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$lineheight"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<!-- 1110927 Raymond 1110990 修正令條列沒有對齊父段落功能的問題 -->
			<xsl:if test="@AlignParentContext">
				<xsl:attribute name="align-parent-context">
					<xsl:value-of select="@AlignParentContext"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="align-inline">
				<xsl:choose>
					<xsl:when test="string-length(@alignment)&gt;0">
						<xsl:value-of select="@alignment"/>
					</xsl:when>
					<!-- 1130319 Raymond 1121074 令的段落條列恢復分散對齊 -->
					<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的段落條列要靠左對齊  -->
					<xsl:otherwise>both</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
				<xsl:attribute name="font-style">
					<xsl:value-of select="@styles"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="@序號"/>
			<xsl:apply-templates select="文字"/>
		</xsl:element>
		<xsl:apply-templates select="條列">
			<xsl:with-param name="spacebefore" select="$spacebefore"/>
			<xsl:with-param name="spaceafter" select="$spaceafter"/>
			<xsl:with-param name="spacestart" select="$spacestart"/>
			<xsl:with-param name="spaceend" select="$spaceend"/>
			<xsl:with-param name="fontfamily" select="$fontfamily"/>
			<xsl:with-param name="altfont" select="$altfont"/>
			<xsl:with-param name="fontsize" select="$fontsize"/>
			<xsl:with-param name="offset" select="number($offset) + 1"/>
			<xsl:with-param name="lineheight" select="$lineheight"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="文字">
		<xsl:element name="a"><!-- 2016.11.4 fix for 二代 -->
			<xsl:attribute name="sync-path">
				<xsl:call-template name="getXPath">
					<xsl:with-param name="p" select="."/>
				</xsl:call-template>
			</xsl:attribute>
			<xsl:for-each select=".//text()">
				<xsl:choose>
					<xsl:when test="name(..)='mi'">
						<xsl:apply-templates select="..">
							<xsl:with-param name="tnode" select="."/>
						</xsl:apply-templates>
					</xsl:when>
					<xsl:when test="name(..)='fmt'">
						<xsl:apply-templates select="..">
							<xsl:with-param name="tnode" select="."/>
						</xsl:apply-templates>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="."/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
	<xsl:template match="mi">
		<xsl:param name="r">0</xsl:param>
		<xsl:param name="b">0</xsl:param>
		<xsl:param name="u">0</xsl:param>
		<xsl:param name="fontsize"/>
		<xsl:param name="fontname"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fmt">false</xsl:param>
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:apply-templates select="..">
					<xsl:with-param name="r" select="$r"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="fontsize" select="@font-size"/>
					<xsl:with-param name="fontname" select="@font-name"/>
					<xsl:with-param name="altfont" select="@alt-fontname"/>
					<xsl:with-param name="fmt" select="$fmt"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose><!-- 1090212 Raymond 1090051 修正追蹤修訂流程點將草稿時設定的粗、斜、底樣式清除後, 列印文格式仍顯示粗、斜、底樣式的問題 -->
					<xsl:when test="@act='fmt'">
						<xsl:call-template name="makeInline">
							<xsl:with-param name="ustyle" select="@styles"/>
							<xsl:with-param name="nocolor">true</xsl:with-param>
							<xsl:with-param name="fontsize" select="@font-size"/>
							<xsl:with-param name="fontname" select="@font-name"/>
							<xsl:with-param name="altfont" select="@alt-fontname"/>
							<xsl:with-param name="tnode" select="$tnode"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="@act != 'del'">
						<xsl:call-template name="makeInline">
							<xsl:with-param name="ustyle">
								<xsl:choose>
									<xsl:when test="@styles">
										<xsl:value-of select="@styles"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$r + $b + $u"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="fontsize">
								<xsl:choose>
									<xsl:when test="@font-size">
										<xsl:value-of select="@font-size"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$fontsize"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="fontname">
								<xsl:choose>
									<xsl:when test="@font-name">
										<xsl:value-of select="@font-name"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$fontname"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="altfont">
								<xsl:choose>
									<xsl:when test="@alt-fontname">
										<xsl:value-of select="@alt-fontname"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$altfont"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="tnode" select="$tnode"/>
						</xsl:call-template>
					</xsl:when>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="fmt">
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:variable name="b" select="@styles mod 2"/>
				<xsl:variable name="u" select="floor((@styles mod 8) div 4) * 4"/>
				<xsl:apply-templates select="..">
					<xsl:with-param name="r" select="@styles - $b - $u"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="fontsize" select="@font-size"/>
					<xsl:with-param name="fontname" select="@font-name"/>
					<xsl:with-param name="altfont" select="@alt-fontname"/>
					<xsl:with-param name="fmt">true</xsl:with-param>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="makeInline">
					<xsl:with-param name="ustyle" select="@styles"/>
					<xsl:with-param name="fontsize" select="@font-size"/>
					<xsl:with-param name="fontname" select="@font-name"/>
					<xsl:with-param name="altfont" select="@alt-fontname"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="makeInline">
		<xsl:param name="ustyle">0</xsl:param>
		<xsl:param name="fontsize"/>
		<xsl:param name="fontname"/>
		<xsl:param name="altfont"/>
		<xsl:param name="tnode"/>
		<xsl:element name="inline">
			<xsl:attribute name="font-style"><xsl:value-of select="$ustyle"/></xsl:attribute>
			<xsl:if test="string-length($fontsize)&gt;0">
				<xsl:attribute name="font-size"><xsl:value-of select="$fontsize"/></xsl:attribute>
			</xsl:if>
			<xsl:if test="string-length($fontname)&gt;0">
				<xsl:attribute name="font-name"><xsl:value-of select="$fontname"/></xsl:attribute>
			</xsl:if>
			<xsl:if test="string-length($altfont)&gt;0">
				<xsl:attribute name="alt-fontname"><xsl:value-of select="$altfont"/></xsl:attribute>
			</xsl:if>
			<xsl:choose>
				<xsl:when test="$tnode">
					<xsl:value-of select="$tnode"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="."/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>
	<xsl:template name="Make受文者依本別">
		<xsl:param name="本別"/>
		<xsl:param name="稱謂"/>
		<xsl:param name="顯示含附件"/>
		<xsl:choose>
			<!-- 2011/5/31 CDC正副本取代模式 -->
			<xsl:when test="@正副本取代模式='True' and ($本別='正本' or $本別='副本') and ($受文者全銜!='行政院衛生署人事室' and $受文者全銜!='行政院衛生署疾病管制局')">
				<xsl:choose>
					<xsl:when test="$本別='正本'">
						<xsl:value-of select="正本"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="副本"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="$本別='副本'">
				<xsl:variable name="均含附件">
					<xsl:call-template name="deterIncAtt">
						<xsl:with-param name="ns" select="受文者列表/*[(name()='受文者' and @本別='副本') or (name()='受文者列表' and 受文者[1]/@本別='副本')]"/>
						<xsl:with-param name="rfio1">true</xsl:with-param>
					</xsl:call-template>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="$稱謂!=''">
						<xsl:variable name="dataxml">C:\2100\公文製作\MapXSL\Data.xml</xsl:variable>
						<xsl:variable name="副本受文者" select="受文者列表/*[(name()='受文者' and @本別='副本') or (name()='受文者列表' and 受文者[1]/@本別='副本')]"/>
						<xsl:variable name="pos_list">
							<xsl:for-each select="$副本受文者">
								<xsl:variable name="nm" select="全銜"/>
								<xsl:variable name="pos" select="position()"/>
								<xsl:for-each select="document($dataxml)//data[@type='會稿單位']/代碼">
									<xsl:if test=". = $nm"><xsl:value-of select="$pos"/>,</xsl:if>
								</xsl:for-each>
							</xsl:for-each>
						</xsl:variable>
						<xsl:for-each select="$副本受文者">
							<xsl:choose>
								<xsl:when test="name()='受文者'">
									<xsl:if test="position() = number(substring-before($pos_list, ','))">
										<xsl:value-of select="$稱謂"/>
									</xsl:if>
									<xsl:value-of select="全銜"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="文字"/>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:if test="$顯示含附件='true'">
								<xsl:choose>
									<xsl:when test="$均含附件='true'">
										<xsl:if test="position()=last()">(均含附件)</xsl:if>
									</xsl:when>
									<xsl:otherwise>
										<xsl:if test="(name()='受文者列表' and 受文者[1]/含附件='是') or 含附件='是'">(含附件)</xsl:if>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:if>
							<xsl:if test="position()!=last()">、</xsl:if>
						</xsl:for-each>
					</xsl:when>
					<xsl:otherwise>
						<xsl:for-each select="受文者列表/*[(name()='受文者' and @本別=$本別) or (name()='受文者列表' and 受文者[1]/@本別=$本別)]">
							<xsl:choose>
								<xsl:when test="name()='受文者'">
									<xsl:value-of select="全銜"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="文字"/>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:if test="$顯示含附件='true'">
								<xsl:choose>
									<xsl:when test="$均含附件='true'">
										<xsl:if test="position()=last()">(均含附件)</xsl:if>
									</xsl:when>
									<xsl:otherwise>
										<xsl:if test="(name()='受文者列表' and 受文者[1]/含附件='是') or 含附件='是'">(含附件)</xsl:if>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:if>
							<xsl:if test="position()!=last()">、</xsl:if>
						</xsl:for-each>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="受文者列表/*[(name()='受文者' and @本別=$本別) or (name()='受文者列表' and 受文者[1]/@本別=$本別)]">
					<xsl:choose>
						<xsl:when test="name()='受文者'">
							<xsl:value-of select="全銜"/>
							<xsl:if test="position()!=last()">、</xsl:if>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="文字"/>
							<xsl:if test="position()!=last()">、</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="deterIncAtt">
		<xsl:param name="ns"/>
		<xsl:param name="idx">1</xsl:param>
		<xsl:param name="rfio1">false</xsl:param><!-- Return False If Only One, 若ns只有1個, 則一律回傳false, 雖然與函式意義不同, 但能在僅有1個受文者時避免顯示成"均含附件" -->
		<xsl:choose>
			<xsl:when test="name($ns[number($idx)])='受文者列表' and $ns[number($idx)]/受文者[1]/含附件!='是'">false</xsl:when>
			<xsl:when test="name($ns[number($idx)])='受文者' and $ns[number($idx)]/含附件!='是'">false</xsl:when>
			<xsl:when test="$rfio1='true' and count($ns)=1">false</xsl:when>
			<!--  last node  -->
			<xsl:when test="$idx=count($ns)">true</xsl:when>
			<xsl:otherwise>
				<xsl:if test="$idx &lt; count($ns)">
					<xsl:call-template name="deterIncAtt">
						<xsl:with-param name="ns" select="$ns"/>
						<xsl:with-param name="idx" select="$idx + 1"/>
					</xsl:call-template>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="getXPath">
		<xsl:param name="p"/>
		<xsl:if test="$p/..">
			<xsl:call-template name="getXPath">
				<xsl:with-param name="p" select="$p/.."/>
			</xsl:call-template>
			<xsl:text>/</xsl:text>
			<xsl:choose>
				<xsl:when test="$p/self::*"><xsl:value-of select="name($p)"/></xsl:when>
				<xsl:otherwise>@<xsl:value-of select="name($p)"/></xsl:otherwise>
			</xsl:choose>
			<xsl:variable name="this" select="name($p)"/>
			<xsl:if test="$this = '條列' or count($p/../*[name()=$this]) &gt; 1">
				<xsl:variable name="no" select="count($p/preceding-sibling::*[name()=$this]) + 1"/>
				<xsl:value-of select="concat('[', $no, ']')"/>
			</xsl:if>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
