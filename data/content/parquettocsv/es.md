## Qué hace este conversor

Apache Parquet es el formato que escribe casi cualquier canal de datos actual: columnar, comprimido, binario, pensado para motores analíticos. Es excelente para una máquina e inútil para un ojo humano. No se abre en un editor de texto, no se le manda al compañero que vive en hojas de cálculo y no se pega dentro de un ticket. El CSV es lo contrario: torpe para analítica, legible en todas partes.

Esta página tiende el puente de la manera más directa posible. Eliges un archivo `.parquet` de tu disco, la página lo decodifica, te dice cuántas filas y columnas encontró, muestra una vista previa y te entrega un CSV para descargar. No hay cuenta, ni cola, ni barra de subida, porque no interviene ningún servidor en ningún momento.

Esa última parte es la razón de ser de la herramienta. La mayoría de los conversores de Parquet en línea son un formulario que envía tu archivo a un backend. Si el archivo contiene datos de clientes, nóminas, identificadores médicos o cualquier cosa cubierta por una política de datos, ese envío es justamente el problema. Aquí la conversión es JavaScript ejecutándose en tu pestaña, leyendo bytes que el navegador ya le dio a la página cuando seleccionaste el archivo.

## Cómo usarlo en cuatro pasos

1. Elige tu archivo `.parquet` en el campo de selección. Nada ocurre hasta que eliges uno.
2. Elige el separador. La coma es el valor por defecto; el punto y coma va bien con hojas de cálculo configuradas en idiomas donde la coma es el separador decimal; la tabulación produce un TSV que se pega limpio en casi cualquier programa de hojas.
3. Decide si la primera línea debe llevar los nombres de las columnas. La casilla de encabezado viene marcada y cambiarla rehace la salida al instante, sin volver a leer el archivo.
4. Revisa la vista previa y pulsa **Descargar CSV**. La vista previa muestra las primeras 200 filas para que la página siga ágil; el archivo descargado contiene siempre todas las filas del Parquet.

Cambiar el separador o el encabezado después de convertir no vuelve a leer el disco. La tabla decodificada queda en la memoria de la pestaña, así que esos cambios son inmediatos incluso con cientos de miles de filas.

## Cómo guarda Parquet una tabla, y por qué convertirla no es trivial

Un CSV es un flujo de filas. Parquet es lo contrario: guarda cada columna por separado, en bloques llamados row groups, y dentro de cada row group la columna vive en un chunk formado por páginas. Cada página puede estar comprimida y los valores de dentro pueden estar codificados de varias formas distintas.

Leerlo implica por tanto desenvolver varias capas:

- El **pie de archivo** guarda el esquema y la posición de cada chunk, serializado con el protocolo compacto de Thrift. El archivo termina con cuatro bytes de longitud y el marcador ASCII `PAR1`, que también aparece al principio. Si falta alguno de los dos, o no es Parquet o se truncó durante una copia.
- Cada **página** puede estar comprimida. Esta herramienta decodifica páginas sin comprimir, con Snappy y con Gzip, que juntas cubren la inmensa mayoría de los archivos escritos por pandas, PyArrow, Polars, DuckDB y Spark.
- Los valores dentro de una página están **codificados**. Diseño plano, diccionario, run-length, la familia delta y byte-stream-split se manejan todos, tanto en data page v1 como en el formato v2 más reciente.
- Los **nulos** no se guardan como valores. Parquet registra un nivel de definición por fila, y el conversor usa esos niveles para devolver cada valor a su fila y dejar vacías las posiciones nulas.

Nada de esto importa cuando funciona. Importa cuando no: como el decodificador entiende cada capa, un archivo incompatible produce un mensaje concreto sobre la compresión, la codificación o el anidamiento, en lugar de un CSV silenciosamente estropeado.

## Ejemplo resuelto: los valores que vas a ver

Tres tipos de Parquet no tienen equivalente directo en CSV, así que conviene saber exactamente qué se escribe.

**Una columna de fecha.** El tipo `DATE` guarda un simple contador de 32 bits de días desde el 1 de enero de 1970. Si el número guardado es 19723, entonces 19723 días después de la época dan el 1 de enero de 2024, y la celda del CSV queda como `2024-01-01`. No se aplica ninguna zona horaria, porque una fecha no tiene hora que desplazar.

**Una marca de tiempo en microsegundos.** Una columna `TIMESTAMP` con precisión de microsegundo guarda un contador de 64 bits de microsegundos desde la época. Toma el valor 1704112215123456. Divídelo entre 1.000.000 y quedan 1704112215 segundos enteros, que son el 1 de enero de 2024 a las 12:30:15 UTC, más 123456 microsegundos de resto. La celda queda como `2024-01-01 12:30:15.123456`. Los ceros finales de la fracción se recortan, así que una marca exacta en el segundo sale sin parte decimal.

**Una columna decimal.** Una columna `DECIMAL(12,2)` se guarda como un entero más una escala. El entero 1230 con escala 2 significa 12,30, y se escribe literalmente como `12.30`. Por eso una columna financiera nunca debería pasar por un float: el texto conserva el valor exacto y el número exacto de decimales que prometía el esquema.

Los booleanos se escriben como `true` y `false`, los nulos quedan como campos vacíos, y las columnas binarias que no son UTF-8 válido se escriben en base64, para que unos bytes crudos no rompan la estructura del CSV.

## Dónde se gana su lugar un conversor sin conexión

El caso evidente es la confidencialidad: una exportación de registros de usuarios que necesitas mirar antes de que se acerque a una unidad compartida. Nada sale del portátil, así que ninguna política se estira.

El segundo caso es la fricción. Un compañero manda un extracto en Parquet, quieres comprobar tres columnas, e instalar Python más PyArrow solo para inspeccionar un archivo que borrarás en cinco minutos es un precio absurdo. Abrir una pestaña no lo es.

El tercer caso es una máquina que no puedes configurar: un portátil corporativo bloqueado, el ordenador de un cliente, un equipo de laboratorio donde no instalas paquetes. El navegador ya está ahí.

El cuarto caso es didáctico. Ver la misma tabla primero como bloque binario opaco y luego como texto llano vuelve concreta la diferencia entre almacenamiento columnar y orientado a filas, algo que un diagrama rara vez logra.

## Errores frecuentes y cómo evitarlos

**Abrir el CSV en la hoja de cálculo y ver una única columna gigante.** Tu programa espera el separador de tu idioma. Regenera el CSV con la opción de punto y coma, o usa el diálogo de importación e indica el separador de forma explícita.

**Identificadores numéricos largos convertidos en notación científica.** Eso es la hoja de cálculo, no el CSV. El archivo tiene los dígitos; el programa decidió mostrarlos como float. Importa esa columna como texto.

**Esperar hora local.** Las marcas de tiempo se escriben en UTC. Parquet suele guardarlas como un instante, y convertirlas a la zona en la que casualmente esté tu equipo cambiaría en silencio todos los valores. Desplázalas después, a propósito, si necesitas hora local.

**Darle una exportación anidada.** Un archivo con columnas struct, list o map se rechaza. Apláñalo antes con `pandas.json_normalize`, con `unnest` de Polars o con una consulta DuckDB que seleccione los campos hoja, escribe un Parquet plano y convierte ese.

## Límites: cuándo esta no es la herramienta adecuada

Lee el archivo entero en memoria, así que las exportaciones muy grandes —de varios cientos de megabytes en adelante— se resuelven mejor con DuckDB o con un script que recorra los row groups en streaming. La compresión Zstd, Brotli y LZ4 se rechaza en vez de decodificarse a medias; reescribe esos archivos con Snappy o Gzip. Los archivos Parquet cifrados no se admiten, por diseño. Y los esquemas anidados quedan fuera del alcance, porque aplanar una columna de lista dentro de una celda CSV es una decisión sobre tus datos que un conversor genérico no debería tomar en silencio.

## Privacidad

La página no contiene código de subida, no hace analítica sobre tu archivo y no lanza ninguna llamada de red durante la conversión. El archivo se lee con la propia API de archivos del navegador y se decodifica en la pestaña. Si quieres pruebas en lugar de promesas: carga la página, desconecta la red y convierte un archivo. Funciona igual, porque nunca hubo nada al otro lado del cable.
