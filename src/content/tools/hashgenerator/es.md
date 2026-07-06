## Genera hashes criptográficos para cualquier texto

Una función hash toma cualquier entrada y produce una huella digital de longitud fija llamada hash o resumen. La misma entrada siempre produce la misma salida, pero cambiar un solo carácter produce un hash completamente distinto — una propiedad llamada efecto avalancha. Esta herramienta genera hashes SHA-256, SHA-1 y MD5 para cualquier texto que introduzcas, calculados enteramente en tu navegador.

## SHA-256, SHA-1 y MD5 comparados

SHA-256, parte de la familia SHA-2, produce un hash de 256 bits escrito como 64 caracteres hexadecimales y se considera criptográficamente seguro para todas las aplicaciones actuales, razón por la cual es la opción por defecto para los sistemas nuevos hoy en día. SHA-1 produce un hash más corto, de 160 bits, y quedó obsoleto para fines de seguridad desde 2017, después de que investigadores demostraran que se podían fabricar deliberadamente dos entradas distintas que produjeran el mismo hash — una colisión que socava las garantías que el algoritmo pretendía ofrecer, aunque todavía está presente en algunos sistemas heredados y en partes antiguas de Git, que a su vez está migrando gradualmente fuera de él. MD5 produce un hash todavía más corto, de 128 bits, y se considera criptográficamente roto: se pueden generar colisiones de forma deliberada y rápida con hardware moderno, así que MD5 hoy solo sirve para fines no relacionados con la seguridad, como sumas de verificación básicas de archivos o búsquedas rápidas en bases de datos, donde no preocupa que un adversario fabrique una colisión maliciosa.

## Para qué se usan las funciones hash

**Integridad de archivos**: los sitios de descarga publican el hash SHA-256 de cada archivo. Tras descargarlo, calculas el hash y lo comparas con el valor publicado. Si coinciden, el archivo no se corrompió ni fue manipulado durante la transferencia.

**Almacenamiento de contraseñas**: los sitios web nunca deberían guardar contraseñas en texto plano. En su lugar, guardan un hash (idealmente SHA-256 o bcrypt con una sal aleatoria) y calculan el hash de tu intento de inicio de sesión para compararlo.

**Firmas digitales**: firmar un documento implica calcular su hash y cifrar ese hash con una clave privada. Quien lo recibe puede verificar el hash usando la clave pública.

**Minería de Bitcoin**: SHA-256 se usa en el algoritmo de prueba de trabajo de Bitcoin. Quienes minan deben encontrar una entrada (nonce) que produzca un hash que empiece por cierto número de ceros.

**Control de versiones**: Git usa SHA-1 (en proceso de migración a SHA-256) para identificar cada commit, archivo y objeto del repositorio. El hash es el identificador único.

## El efecto avalancha

Una propiedad definitoria de las funciones hash criptográficas es que incluso cambios diminutos en la entrada producen salidas radicalmente distintas:

"Hello" → SHA-256: 185f8db3...
"hello" → SHA-256: 2cf24dba...

Los dos hashes no comparten ninguna relación visible pese a diferir solo en la capitalización. Esto es el efecto avalancha.

## Una función de un solo sentido

Los hashes son de un solo sentido: puedes calcular un hash a partir de una entrada, pero no puedes revertir el proceso para recuperar la entrada a partir del hash. La única forma de "romper" un hash es probar muchas entradas (fuerza bruta o ataque de diccionario) y ver cuál produce el mismo hash.

## Cómo usar la herramienta

Escribe o pega cualquier texto en el cuadro de entrada y los tres hashes —SHA-256, SHA-1 y MD5— aparecen de inmediato debajo, recalculándose con cada tecla que pulsas. Esto facilita verificar la suma de comprobación publicada de un archivo, generar rápidamente un identificador único para un fragmento de texto, o simplemente explorar cómo se comporta el efecto avalancha editando tu entrada carácter a carácter y observando cómo cambia por completo cada hash.

## Por qué no puedes revertir un hash

Una función hash criptográfica está deliberadamente diseñada para destruir información de una forma concreta: toma una entrada de cualquier longitud y la comprime en una salida corta y fija, descartando mucha más información de la que conserva. Como incontables entradas distintas podrían en teoría comprimirse en la misma salida corta, no existe una operación inversa única para recuperar la entrada original a partir del hash — el proceso solo funciona en una dirección. La única forma de encontrar una entrada que produzca un hash dado es probar entradas candidatas una tras otra y comprobar si alguna coincide, y por eso resulta eficaz aplicar un hash a las contraseñas en lugar de guardarlas directamente: aunque roben un hash, recuperar la contraseña original a partir de él resulta computacionalmente inviable para un algoritmo de hash bien elegido y una contraseña suficientemente larga.

## Elegir el hash adecuado para cada tarea

Para cualquier cosa relacionada con la seguridad hoy en día —almacenamiento de contraseñas, firmas digitales, verificar que un archivo descargado no ha sido manipulado— SHA-256 o un miembro más fuerte de la familia SHA-2 o SHA-3 es la elección adecuada, ya que tanto SHA-1 como MD5 tienen debilidades conocidas que un atacante decidido puede explotar. SHA-1 y MD5 siguen siendo útiles solo en contextos donde la seguridad no es en absoluto el objetivo: una comprobación rápida para detectar corrupción accidental, una forma rápida de generar una clave corta y única para una búsqueda en caché, o compatibilidad con un sistema antiguo que no se ha actualizado. Ante la duda sobre cuál usar para algo que de verdad importa, SHA-256 es casi siempre la opción más segura por defecto.

## Comprobar la integridad de un archivo descargado

Un uso muy concreto de esta herramienta es verificar que un archivo que acabas de descargar no se corrompió ni fue manipulado en el camino. Muchos sitios de descarga de software publican el hash SHA-256 oficial de cada archivo junto al enlace de descarga. Después de descargarlo, puedes calcular el hash del archivo con una herramienta del sistema operativo y pegar aquí solo el texto para comparar valores de referencia, o usar esta calculadora para entender qué aspecto tiene un hash correcto antes de fiarte de cualquier utilidad de verificación. Si el hash calculado no coincide exactamente con el publicado, ni siquiera en un solo carácter, el archivo no es idéntico al original — el efecto avalancha garantiza que no hay términos medios entre "coincide" y "no coincide".

## Privado e instantáneo

SHA-256 y SHA-1 se calculan usando la API Web Crypto integrada del navegador, y MD5 se calcula mediante una implementación en JavaScript puro, así que cada hash aparece al instante y ningún texto que introduzcas se envía jamás a ningún sitio, se registra ni se comparte, y funciona sin conexión una vez cargada la página, sin límite de cuántos hashes generes, sin coste y sin nada que instalar.
