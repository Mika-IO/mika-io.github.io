## Convierta marcas de tiempo de Unix en fechas legibles por humanos

Los desarrolladores, administradores de bases de datos y cualquiera que trabaje con archivos de registro o API encuentran regularmente marcas de tiempo de Unix: números largos como 1700000000 que representan un momento en el tiempo. Sin un convertidor, estos números no tienen sentido para la mayoría de las personas. Esta herramienta convierte instantáneamente cualquier marca de tiempo de Unix en una fecha y hora legibles, y también convierte cualquier fecha a su marca de tiempo de Unix.

## ¿Qué es una marca de tiempo de Unix?

Una marca de tiempo Unix cuenta el número de segundos transcurridos desde la medianoche del 1 de enero de 1970, hora universal coordinada (UTC). Este momento, llamado época Unix, fue elegido como punto de referencia cuando se desarrollaron los sistemas operativos Unix. Cada segundo que pasa suma uno a la cuenta. La marca de tiempo 0 representa exactamente la medianoche del 1 de enero de 1970 UTC. La marca de tiempo 1700000000 representa el 14 de noviembre de 2023 a las 22:13:20 UTC.

La belleza de las marcas de tiempo de Unix es que son independientes de la zona horaria. Una marca de tiempo representa exactamente el mismo momento en el tiempo independientemente del lugar del mundo en el que se encuentre. Cuando se convierte a una hora local, la misma marca de tiempo produce lecturas de reloj diferentes en Tokio y Nueva York, pero se refieren al mismo instante físico.

## Cómo utilizar el convertidor

Para convertir una marca de tiempo en una fecha, pegue el número de la marca de tiempo en el campo superior. La fecha y hora UTC y su equivalente local aparecen inmediatamente. Para convertir una fecha en una marca de tiempo, use el selector de fecha en la sección inferior y la marca de tiempo correspondiente aparecerá instantáneamente.

## Milisegundos vs segundos

Algunos sistemas, en particular los navegadores web y las aplicaciones JavaScript, utilizan milisegundos en lugar de segundos para sus marcas de tiempo. Una llamada JavaScript Date.now() devuelve algo así como 1700000000000, un número aproximadamente 1000 veces mayor que la marca de tiempo equivalente de Unix en segundos. Si el número que tiene tiene aproximadamente trece dígitos, probablemente esté en milisegundos: divídalo por 1000 e ingrese el resultado.

## El problema del año 2038

Los primeros sistemas Unix almacenaban marcas de tiempo como enteros con signo de 32 bits, que pueden contener valores de hasta 2.147.483.647. Ese valor máximo corresponde al 19 de enero de 2038 a las 03:14:07 UTC. Los sistemas que almacenan marcas de tiempo en enteros de 32 bits se desbordarán en esa fecha, un problema a veces llamado Y2K38. Los sistemas modernos de 64 bits pueden almacenar marcas de tiempo mucho más allá del año 292 mil millones, lo que hace que esto sea un problema sólo para el software heredado que no ha sido actualizado.

## Usos comunes

Las marcas de tiempo aparecen en archivos de registro, registros de bases de datos, respuestas de API, encabezados de caché, certificados criptográficos y muchos otros contextos. Convertirlos en fechas legibles ayuda con la depuración, el análisis de datos, la auditoría de cumplimiento y cualquier situación en la que necesite comprender cuándo sucedió algo.

## Por qué se eligió 1970 como punto de partida

La elección del 1 de enero de 1970 fue esencialmente una fecha más práctica que significativa en sí misma. Unix se estaba desarrollando a finales de los años 1960 y principios de los 1970 en los Laboratorios Bell, y los diseñadores necesitaban un punto de referencia lo suficientemente reciente como para mantener los números manejables pero lo suficientemente temprano como para cubrir la vida útil probable del sistema operativo. Redondear a principios de 1970 fue sencillamente conveniente. Décadas más tarde, esa elección arbitraria se ha arraigado profundamente: subyace a cómo casi todos los lenguajes de programación, bases de datos y sistemas operativos representan el tiempo internamente, aunque la mayoría de los programadores nunca necesitan pensar en ello directamente.

## Leer una marca de tiempo sin un convertidor

Con un poco de práctica, puedes comprobar la cordura de una marca de tiempo en tu cabeza. Dividir por 31.536.000 (el número de segundos en un año normal) da un número aproximado de años desde 1970: una marca de tiempo de diez dígitos que comienza con 1,7 corresponde aproximadamente al año 2023, por ejemplo, desde 1970 más unos 53-54 años llegan allí. Esta estimación mental aproximada es una forma útil de detectar una marca de tiempo obviamente incorrecta, como una que está equivocada en un factor de 1000 porque en realidad estaba en milisegundos, incluso antes de usar una calculadora.

## Marcas de tiempo negativas

Debido a que una marca de tiempo Unix es simplemente una cuenta firmada de segundos de la época, las fechas anteriores al 1 de enero de 1970 se representan como números negativos en lugar de no ser compatibles. Una marca de tiempo de -86400, por ejemplo, representa exactamente un día antes de la época: 31 de diciembre de 1969. Este conversor maneja los valores negativos de la misma manera que los positivos, lo cual es útil para trabajar con registros históricos o datos anteriores a la era informática pero que todavía están almacenados en formato de marca de tiempo Unix.

## Por qué las marcas de tiempo son independientes de la zona horaria

La mayor ventaja de almacenar un momento como una marca de tiempo Unix en lugar de una cadena de fecha formateada es que evita por completo las zonas horarias durante el almacenamiento y el cálculo. Una marca de tiempo representa exactamente un instante físico y solo se traduce a una fecha y hora del calendario local en el momento en que se muestra a una persona. Esta es la razón por la que las bases de datos, API y archivos de registro almacenan abrumadoramente marcas de tiempo en lugar de fechas locales preformateadas: dos servidores en diferentes zonas horarias pueden comparar, ordenar y calcular diferencias entre marcas de tiempo con total confianza, y solo necesitan convertir a una hora local legible por humanos en el último paso, exactamente como lo hace este conversor cuando muestra tanto el UTC como su equivalente local uno al lado del otro.

## Depuración con marcas de tiempo

Los desarrolladores buscan constantemente un convertidor como este durante la depuración. Un registro de errores del servidor marcado con 1700000000 no tiene sentido a primera vista, pero convertirlo le indica instantáneamente si el error ocurrió durante el horario comercial, durante la noche o en el momento exacto en que se realizó una implementación; a menudo, la forma más rápida de correlacionar un informe de error con el cambio que lo causó. Las respuestas de API, las columnas de auditoría de bases de datos y los encabezados de caducidad de caché comúnmente almacenan marcas de tiempo en lugar de fechas formateadas por la misma razón por la que los motores de almacenamiento las prefieren: un número simple ordena, compara y calcula correctamente sin ambigüedad de ubicación o formato, y solo necesita traducirse a una fecha amigable para los humanos en el paso final de visualización, que es exactamente el trabajo que hace esta herramienta.

## Privado

Todo se ejecuta en su navegador usando el objeto Fecha incorporado de JavaScript, por lo que la conversión es instantánea en ambas direcciones y ninguna marca de tiempo o fecha que ingrese se envía a un servidor, se registra o se comparte.

