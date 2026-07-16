## Compara dos textos y encuentra las diferencias.

Ya sea que esté revisando un documento revisado, verificando qué cambió en un contrato, comparando dos versiones de un ensayo o verificando que copiar y pegar fue correcto, una herramienta de diferenciación de texto ahorra tiempo al resaltar exactamente lo que cambió. Pega el texto original en el primer cuadro y la nueva versión en el segundo, y las diferencias se marcan al instante.

## Cómo funciona la diferenciación a nivel de palabra

La herramienta utiliza el algoritmo de subsecuencia común más larga (LCS), el mismo algoritmo subyacente al comando Unix diff y git diff. Encuentra la secuencia más grande de palabras que aparecen en ambos textos en el mismo orden y luego marca todo lo que está fuera de esa secuencia como agregado o eliminado.

Las palabras que se muestran en rojo y tachadas están en el original pero no en la nueva versión (eliminadas). Las palabras resaltadas en verde están en la nueva versión pero no en la original (agregada). Las palabras sin cambios aparecen en el texto normal.

## Usos comunes para la comparación de texto

**Revisiones de documentos**: cuando un colaborador devuelve un documento revisado, vea rápidamente exactamente qué palabras u oraciones cambiaron sin leer ambas versiones en su totalidad.

**Revisión de contratos**: los profesionales jurídicos utilizan diff para realizar un seguimiento de los cambios entre las versiones de los contratos. Un documento de "línea roja" o "marcado" es esencialmente una diferencia aplicada al texto legal.

**Revisión académica**: compare un primer borrador con un borrador revisado para verificar que las ediciones previstas se realizaron correctamente y que no se introdujeron cambios no deseados.

**Revisión de código**: si bien las diferencias de código se manejan mejor con herramientas como git diff (que opera línea por línea), una diferenciación a nivel de palabra puede ayudar al revisar documentación o comentarios.

**Comprobación de plagio**: compare un texto enviado con un original para detectar paráfrasis: palabras reordenadas o sustituidas que conservan el mismo significado.

**Verificación de la traducción**: compare un texto fuente con su traducción palabra por palabra para garantizar que esté completo (aunque esto es aproximado debido a las diferencias naturales del lenguaje).

## Limitaciones de la diferenciación a nivel de palabra

Esta herramienta compara palabras sin comprender la semántica. Una oración completamente reescrita con el mismo significado aparecerá completamente eliminada y agregada. Para comprender la similitud semántica, se necesitan herramientas de procesamiento del lenguaje natural.

La comparación tampoco distingue el formato, las mayúsculas o la puntuación dentro de las palabras a menos que formen parte de un token de palabra. "Hola" y "hola" se tratan como palabras diferentes.

## Cómo utilizar la herramienta

Pegue el texto original en el primer cuadro y la versión revisada en el segundo, y la comparación aparecerá inmediatamente debajo, con las eliminaciones tachadas en rojo y las adiciones resaltadas en verde. No hay que presionar ningún botón para activar la comparación: se actualiza en vivo, por lo que puede pegar una nueva versión en cualquier momento y ver inmediatamente en qué se diferencia de la anterior.

## Por qué la comparación a nivel de palabra, no a nivel de carácter

En teoría, una herramienta de diferenciación podría comparar carácter por carácter en lugar de palabra por palabra, pero ese enfoque produce resultados que son técnicamente precisos y prácticamente inútiles: corregir un solo error tipográfico en medio de una oración larga mostraría que casi todo el resto de la oración ha cambiado, porque cada carácter después de la corrección cambia de posición. En cambio, comparar a nivel de palabra significa que una sola palabra corregida se muestra como una eliminación y una adición, mientras que todo lo demás en la oración que en realidad no cambió se deja solo correctamente: una señal mucho más útil para un ser humano que intenta comprender lo que realmente se editó, que es exactamente el nivel de granularidad que interesa a la mayoría de las tareas reales de edición y corrección.

## Leer una diferencia de manera eficiente

Al revisar una comparación larga, es útil buscar grupos de colores en lugar de leer cada palabra: un grupo apretado de rojo y verde uno al lado del otro generalmente indica una pequeña reformulación, mientras que una ejecución larga e ininterrumpida de un color indica un pasaje genuinamente nuevo o eliminado en lugar de una edición. Sentirse cómodo con este enfoque de escaneo de patrones es lo que permite a los editores y revisores legales experimentados procesar una revisión de varias páginas en unos pocos minutos en lugar de volver a leer todo el documento línea por línea.

## Herramientas de diferenciación en software frente a prosa

Los programadores utilizan constantemente herramientas de diferenciación basadas en líneas como git diff, y vale la pena entender por qué una diferenciación a nivel de palabra como esta es una herramienta diferente y complementaria en lugar de un reemplazo. El código fuente está organizado naturalmente en líneas discretas, por lo que comparar línea por línea es la granularidad correcta: una línea modificada es una unidad lógica modificada. La prosa no tiene tales límites naturales; una sola oración puede abarcar varias líneas dependiendo del ancho de la ventana, y la unidad de cambio significativa es la palabra o frase, no dondequiera que se rompa una línea. Precisamente por eso, comparar prosa requiere un enfoque a nivel de palabra en lugar de reutilizar una herramienta de comparación basada en líneas y orientada a código.

## Comparing translation drafts

Los editores y traductores bilingües a veces utilizan una diferencia a nivel de palabra para comparar dos versiones de una traducción del mismo texto fuente (por ejemplo, el borrador de un traductor humano con una versión traducida automáticamente, o dos revisiones sucesivas del mismo párrafo) para detectar rápidamente exactamente dónde divergen las opciones de palabras, sin necesidad de volver a leer el pasaje completo buscando la diferencia.

## Una rápida comprobación de cordura antes de confiar en una diferencia

Antes de confiar en un resultado de diferenciación para algo importante (un documento legal, una tarea calificada), primero pegue un pequeño cambio conocido en los dos cuadros y confirme que la herramienta resalta exactamente ese cambio y nada más, de la misma manera que probaría una nueva báscula de cocina con un peso conocido antes de confiar en ella para una receta.

## Privado e instantáneo

Todas las comparaciones se ejecutan íntegramente en su navegador utilizando el algoritmo de subsecuencia común más larga, por lo que los resultados aparecen instantáneamente y ningún texto que pegue se envía a ningún servidor, se registra o se comparte.

