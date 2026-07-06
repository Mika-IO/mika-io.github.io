## Codifica y decodifica Base64 al instante

Base64 es una codificación fundamental utilizada en toda la informática para representar de forma segura datos binarios como texto. Ya trabajes con APIs, depures peticiones de red, intentes entender un token JWT o incrustes imágenes en HTML, Base64 aparece constantemente. Esta herramienta convierte cualquier texto a Base64 y decodifica cualquier cadena Base64 de vuelta a texto con un solo clic.

## Qué es Base64

Base64 es un esquema de codificación de binario a texto que representa datos binarios usando únicamente 64 caracteres ASCII imprimibles: las 26 letras mayúsculas (A-Z), las 26 minúsculas (a-z), los 10 dígitos (0-9), más los caracteres + y /. Existe un carácter 65, el signo =, que se usa como relleno al final cuando hace falta.

El nombre "Base64" viene precisamente de que la codificación usa 64 caracteres distintos. Cada carácter Base64 representa 6 bits de información (2 elevado a 6 = 64). Como un byte tiene 8 bits, cada 3 bytes de entrada se convierten exactamente en 4 caracteres Base64.

## Por qué existe Base64

Muchos protocolos y sistemas antiguos basados en texto solo pueden manejar caracteres ASCII, no bytes binarios arbitrarios. El correo electrónico (SMTP), las URLs, las cabeceras HTTP y el XML manejan texto de forma segura. Los datos binarios —imágenes, archivos de audio, claves criptográficas o datos comprimidos— no pueden transmitirse con seguridad por esos mismos canales sin antes codificarlos.

Base64 resuelve esto traduciendo cualquier dato binario a un subconjunto de caracteres ASCII que todos los sistemas de texto pueden almacenar y transmitir sin sobresaltos.

## Usos habituales

**URIs de datos**: las imágenes pueden incrustarse directamente en HTML o CSS sin necesidad de peticiones de archivo aparte. Una URI de datos empieza con data:image/png;base64, seguido de los datos de la imagen codificados en Base64.

**Adjuntos de correo (MIME)**: los archivos adjuntos de correo electrónico se codifican en Base64 para su transmisión dentro del protocolo MIME.

**APIs JSON**: los datos binarios (imágenes, archivos, firmas criptográficas) que se transmiten dentro de JSON deben codificarse en Base64 porque JSON solo admite texto.

**Autenticación básica HTTP**: la cabecera Authorization envía las credenciales como Base64(usuario:contraseña). Esto no es seguro por sí solo — sigue haciendo falta HTTPS.

**Tokens JWT**: los JSON Web Tokens constan de tres secciones codificadas en Base64URL (cabecera, carga útil y firma) separadas por puntos.

**Almacenamiento en bases de datos**: los datos binarios guardados en formatos de almacenamiento basados en texto (como algunas bases de datos NoSQL o archivos de configuración) suelen codificarse en Base64.

## Base64 frente a Base64URL

El Base64 estándar usa los caracteres + y /, que tienen un significado especial dentro de las URLs. Base64URL los sustituye por - y _ para que los datos codificados sean seguros dentro de una URL. Los tokens JWT usan Base64URL. El carácter de relleno = también suele omitirse en Base64URL.

## Nota sobre seguridad

Base64 NO es cifrado. Cualquiera que reciba datos codificados en Base64 puede decodificarlos de inmediato con cualquier decodificador Base64 disponible gratis en internet. No uses Base64 para intentar "ocultar" información sensible — para eso, recurre a un cifrado de verdad, diseñado matemáticamente para impedir la lectura sin una clave, a diferencia de Base64, que es solo un reformateo reversible de los mismos datos.

## Cómo usar la herramienta

Pega texto en el campo de codificar para obtener su representación en Base64 al instante, o pega una cadena Base64 en el campo de decodificar para recuperar el texto original, con ambas direcciones actualizándose en vivo mientras escribes. Esto resulta muy práctico para inspeccionar rápidamente el contenido de un JWT, comprobar qué contiene realmente una URI de datos, o preparar un valor que necesita viajar sin problemas por un canal de solo texto, como un parámetro de URL o un campo de un JSON.

## Cómo funciona la codificación Base64 paso a paso

Base64 convierte datos binarios en texto mediante un proceso bastante directo. Primero, toma los datos binarios y agrúpalos en bloques de 3 bytes, es decir, 24 bits. Divide cada bloque de 24 bits en cuatro grupos de 6 bits. Busca cada valor de 6 bits, que va de 0 a 63, en el alfabeto Base64, donde A=0, B=1, y así sucesivamente hasta Z=25, a=26 hasta z=51, 0=52 hasta 9=61, +=62 y /=63. Si la entrada no es un múltiplo exacto de 3 bytes, se añaden caracteres de relleno = al final para completar el último grupo. Como cada 3 bytes se convierten en 4 caracteres Base64, la codificación aumenta el tamaño de los datos en aproximadamente un 33% — un archivo binario de 1 MB codificado en Base64 se convierte en unos 1,37 MB de texto.

## URIs de datos e imágenes incrustadas

Uno de los usos más visibles de Base64 en la web es la URI de datos, que permite incrustar un archivo directamente en HTML o CSS en lugar de referenciarlo como un archivo aparte, con una forma como `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`. Esto elimina una petición HTTP adicional para ese recurso, lo cual puede mejorar el rendimiento en iconos e imágenes pequeñas. Sin embargo, los datos en Base64 no pueden almacenarse en caché de forma independiente de la página en la que están incrustados, y la sobrecarga de tamaño de aproximadamente un 33% hace que este enfoque resulte ineficiente para imágenes grandes, motivo por el cual suele reservarse para recursos pequeños.

## Tokens JWT y Base64URL

Los JSON Web Tokens usan una variante llamada Base64URL, que sustituye los caracteres + y /, que tienen un significado especial dentro de las URLs, por - y _ respectivamente, y por lo general omite por completo el relleno =. Un JWT tiene el aspecto de tres secciones separadas por puntos —cabecera, carga útil y firma—, cada una de ellas un fragmento de datos codificado en Base64URL, razón por la cual un JWT puede colocarse con seguridad directamente en una URL o en una cabecera HTTP sin necesidad de un escapado adicional.

## Base64 en el correo electrónico

El estándar MIME para el correo electrónico define cómo deben codificarse los cuerpos de mensaje y los adjuntos para su transmisión. El contenido basado en texto suele usar un esquema distinto llamado codificación quoted-printable, mientras que los adjuntos binarios usan Base64. Cuando adjuntas un PDF a un correo, tu cliente de correo lo codifica en Base64 antes de enviarlo, y el cliente del destinatario lo decodifica de vuelta al archivo original automáticamente, todo ello de forma invisible para ambas personas.

## Privado e instantáneo

La codificación y la decodificación se ejecutan enteramente en tu navegador usando las funciones nativas btoa y atob, así que los resultados aparecen al instante y ningún dato que codifiques o decodifiques se envía jamás a ningún sitio, ni siquiera cuando estás sin conexión una vez cargada la página, sin ningún límite de uso, coste ni registro de por medio.
