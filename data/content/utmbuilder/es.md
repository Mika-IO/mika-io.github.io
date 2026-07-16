## Cree URL con etiquetas UTM para un seguimiento preciso de la campaña

Los parámetros UTM son la forma estándar de indicar a las plataformas de análisis como Google Analytics exactamente de dónde proviene el tráfico del sitio web. Sin etiquetas UTM, el tráfico de su boletín informativo por correo electrónico, sus publicaciones en las redes sociales y sus anuncios pagados se ven iguales en los análisis: todos clasificados como "directos" o agrupados en categorías de referencia genéricas. Con las etiquetas UTM, sabes con precisión qué campaña, qué medio y qué fuente impulsaron a cada visitante.

## ¿Qué son los parámetros UTM?

UTM significa Módulo de seguimiento de Urchin. Urchin Software era una empresa de análisis web adquirida por Google en 2005 y su módulo de seguimiento se convirtió en la base de Google Analytics. La denominación UTM se ha mantenido como estándar de la industria a pesar de que Urchin fue descontinuado.

Los parámetros UTM son pares clave-valor agregados a una URL como una cadena de consulta. Por ejemplo:

https://example.com/sale?utm_source=newsletter&utm_medium=email&utm_campaign=summer_sale

Cuando alguien hace clic en este enlace y llega a su sitio web, Google Analytics (o cualquier otra plataforma de análisis que admita UTM) registra los tres parámetros junto con los datos de la visita.

## Los cinco parámetros UTM

**utm_source** (obligatorio): Identifica de dónde proviene el tráfico. Ejemplos: newsletter, facebook, google, linkedin, twitter, instagram, podcast.

**utm_medium** (obligatorio): Describe el canal o mecanismo de marketing. Ejemplos: correo electrónico, redes sociales, cpc (coste por clic), orgánico, referencia, banner, afiliado.

**utm_campaign** (obligatorio): nombra la campaña de marketing específica. Ejemplos: summer_sale_2024, product_launch_v2, brand_awareness_q1.

**utm_term** (opcional): se utiliza principalmente en búsquedas pagas para identificar la palabra clave que activó el anuncio. Ejemplo: zapatillas+para correr, el mejor+software+crm.

**utm_content** (opcional): se utiliza para pruebas A/B o para diferenciar entre varios enlaces en la misma campaña. Ejemplos: cta_button, hero_image, footer_link, version_a.

## Mejores prácticas para la denominación UTM

**La coherencia es fundamental**: utm_source=Email y utm_source=email se tratan como dos fuentes diferentes. Establezca una convención de nomenclatura y cúmplala en toda su organización.

**Usar minúsculas**: la mayoría de los equipos usan minúsculas con guiones bajos o guiones. Evite los espacios (use + o %20 si es necesario, pero herramientas como esta manejan la codificación automáticamente).

**Sea descriptivo pero conciso**: utm_campaign=summer_sale_2024 le dice más que utm_campaign=campaign1.

**No utilizar UTM en enlaces internos**: Los parámetros UTM restablecen la sesión en Google Analytics. Los enlaces internos con UTM atribuirán tráfico incorrectamente.

## Ejemplos de URL de campaña comunes

Boletín informativo: utm_source=boletín&utm_medium=correo electrónico&utm_campaign=weekly_digest
Anuncio de Facebook: utm_source=facebook&utm_medium=cpc&utm_campaign=brand_awareness
Publicación de LinkedIn: utm_source=linkedin&utm_medium=social&utm_campaign=product_launch
Código QR en un folleto: utm_source=print_flyer&utm_medium=qr_code&utm_campaign=event_2024

## Cómo utilizar el constructor

Ingrese su URL de destino y complete los campos de fuente, medio y campaña, agregando términos y contenido si su campaña los necesita, y la URL etiquetada completa aparecerá de inmediato, codificada correctamente y lista para copiar en un correo electrónico, una plataforma publicitaria o una publicación social. Construirlo de esta manera elimina los dos errores más comunes que cometen las personas al escribir enlaces UTM a mano: un error tipográfico en el nombre de un parámetro que los análisis no reconocen silenciosamente, y mayúsculas inconsistentes que dividen lo que debería ser una fuente de tráfico en varias de apariencia diferente en un informe.

## Por qué la coherencia importa más que los nombres exactos que elijas

Las plataformas de análisis tratan los valores UTM como cadenas literales en lugar de interpretar su significado, por lo que "Newsletter", "newsletter" y "news_letter" se registran como tres fuentes completamente separadas, aunque un humano que lea el informe las reconocería como la misma cosa. Esta es la forma más común en que el seguimiento UTM falla silenciosamente dentro de los equipos de marketing más grandes: todos están de acuerdo en el concepto, pero nadie impone la ortografía exacta, y meses después el informe analítico se fragmenta en una docena de filas casi duplicadas que significan la misma campaña. Decidir una convención de nomenclatura antes de su primera campaña y hacer que cada miembro del equipo cree enlaces a través de la misma herramienta con los mismos valores evita esto de manera mucho más confiable que intentar limpiar los datos después del hecho.

## Etiquetas UTM y seguimiento nativo de la plataforma

Algunas plataformas publicitarias, incluidas Google Ads y Facebook Ads, ofrecen sus propios sistemas de etiquetado automático (gclid, fbclid) que pueden duplicar o entrar en conflicto con los parámetros UTM creados manualmente si ambos se usan descuidadamente en el mismo enlace. La mejor práctica general es permitir que el etiquetado automático de la plataforma maneje la atribución específica de la plataforma mientras se usan parámetros UTM para la historia más amplia a nivel de campaña que desea ver en Google Analytics (la fuente, el medio y el nombre de la campaña), ya que los parámetros UTM son el único esquema de etiquetado que prácticamente todas las plataformas de análisis entienden de manera consistente, independientemente de qué red publicitaria realmente sirvió el clic.

## Auditar sus enlaces UTM antes del lanzamiento

Antes de que se active una campaña, vale la pena probar cada enlace etiquetado UTM exactamente como lo encontraría un destinatario: pegue la URL completa en una ventana privada del navegador y confirme que llegue a la página deseada con las etiquetas intactas, ya que algunos sistemas de administración de contenido y acortadores de enlaces eliminan silenciosamente los parámetros de consulta durante una redirección. Una campaña que parece perfectamente etiquetada en el creador pero que pierde sus parámetros UTM en algún lugar de una cadena de redireccionamiento se informará como tráfico "directo" en el análisis, borrando silenciosamente la atribución exacta que las etiquetas debían proporcionar.

## Mantener una referencia de nomenclatura compartida

Los equipos más grandes se benefician de mantener un documento de referencia compartido simple que enumera los valores exactos aprobados para utm_source y utm_medium ("correo electrónico", no "correo electrónico" o "correo electrónico"), de modo que todos los que crean enlaces de campaña, independientemente de la herramienta que utilicen, produzcan valores UTM que se acumulan limpiamente en las mismas filas en un informe analítico en lugar de fragmentarse en casi duplicados con el tiempo.

## Privado e instantáneo

La URL se crea completamente en su navegador, por lo que aparece instantáneamente a medida que escribe y nada de lo que ingresa se envía a ningún servidor, se registra o se comparte.

