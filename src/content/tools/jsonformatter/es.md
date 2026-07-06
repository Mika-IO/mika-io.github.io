## Da formato, valida y minifica JSON al instante

JSON (JavaScript Object Notation) es el formato estándar de intercambio de datos para las API web, los archivos de configuración y el almacenamiento de datos. Cuando recibes JSON en crudo o compacto desde la respuesta de una API o una herramienta de depuración, darle formato lo hace legible para las personas en segundos. Cuando necesitas transmitir JSON de forma eficiente, minificarlo elimina todos los espacios en blanco innecesarios.

## Cómo usar la herramienta

Pega el JSON en el cuadro de entrada, y luego elige formatear para verlo bien indentado y legible, o minificar para eliminar cada espacio y salto de línea innecesarios y obtener el tamaño más pequeño posible. Si el JSON contiene un error, la herramienta indica qué ha fallado en lugar de fallar en silencio, lo que suele ser la forma más rápida de localizar una coma perdida o un corchete que falta, enterrado en un bloque grande pegado desde un archivo de registro o una respuesta de API.

## Qué es JSON

JSON es un formato de datos basado en texto que representa datos estructurados como pares clave-valor (objetos) y listas ordenadas (arrays). Se derivó de la sintaxis de objetos de JavaScript, pero es independiente del lenguaje — prácticamente todos los lenguajes de programación tienen un analizador de JSON.

Un documento JSON válido es uno de estos: un objeto, un array, una cadena de texto, un número, un booleano (true o false), o null.

Ejemplo de JSON válido:

    {
      "nombre": "Alicia",
      "edad": 30,
      "puntuaciones": [95, 87, 91],
      "activo": true
    }

## JSON frente a XML

JSON reemplazó en gran medida a XML como formato dominante de intercambio de datos en la web porque es más compacto, más fácil de leer, y encaja de forma natural con las estructuras de datos de la mayoría de los lenguajes de programación (objetos y arrays).

## Estructuras anidadas de un vistazo

El valor real de dar formato se hace evidente en cuanto los objetos y los arrays empiezan a anidarse unos dentro de otros varios niveles de profundidad, algo habitual en las respuestas de API reales. Un bloque de JSON profundamente anidado y minificado resulta casi imposible de seguir a simple vista — hacer coincidir una llave de apertura con su llave de cierre correcta varias líneas más abajo es exactamente el tipo de tarea tediosa y propensa a errores que un ordenador hace mucho mejor que una persona. El JSON formateado con una indentación coherente convierte esa misma estructura en algo que puedes seguir visualmente, nivel a nivel, razón por la cual casi toda herramienta de desarrollo que muestra JSON, desde las herramientas de desarrollo del navegador hasta los clientes de API, le da formato por defecto en lugar de mostrar la cadena en crudo y compacta que realmente envió un servidor.

## Impresión legible (formateo)

Una cadena JSON "minificada" no contiene ningún espacio en blanco innecesario:

    {"nombre":"Alicia","edad":30,"puntuaciones":[95,87,91],"activo":true}

Aunque es válida, resulta difícil de leer. El "pretty-printing" o formateo añade indentación y saltos de línea:

Cada nivel de anidamiento se indenta con 2 o 4 espacios. Esto hace que las estructuras profundamente anidadas sean fáciles de recorrer visualmente.

## Una breve historia del auge de JSON

JSON se popularizó a principios de los años 2000 gracias a Douglas Crockford, quien documentó y bautizó un formato de datos que notó que ya estaba implícito en la propia sintaxis de los literales de objeto de JavaScript, en lugar de inventar algo completamente nuevo. Su momento coincidió con el crecimiento de las aplicaciones web basadas en AJAX que necesitaban una forma ligera de intercambiar datos entre el navegador y el servidor sin recargar la página entera, y su parecido cercano con los objetos nativos de JavaScript significaba que los navegadores podían analizarlo casi gratis. Esa combinación de sencillez y buen momento explica en gran parte por qué JSON superó al más verboso XML como opción por defecto para las API web en apenas una década.

## JSON en el desarrollo web

Las API web usan JSON de forma abrumadora para los cuerpos de solicitud y de respuesta. La API fetch() del navegador y XMLHttpRequest gestionan JSON de forma nativa. Los lenguajes del lado del servidor analizan JSON usando bibliotecas integradas: json en Python, JSON.parse en JavaScript, json_decode en PHP, Gson o Jackson en Java.

## Por qué formatear y minificar cumplen propósitos distintos

Estas dos operaciones existen porque el JSON lo leen dos públicos muy distintos. El JSON formateado e indentado es para personas: alguien que inspecciona la respuesta de una API, depura un archivo de configuración, o revisa datos durante el desarrollo se beneficia enormemente de una indentación clara que hace visible de un vistazo la estructura de los objetos y arrays anidados. El JSON minificado es para máquinas: eliminar cada espacio y salto de línea innecesarios reduce el número de bytes que hay que transmitir por una red o almacenar en disco, algo que importa cuando una carga JSON se envía miles o millones de veces al día entre servidores. Ninguna de las dos formas es más "correcta" que la otra — simplemente optimizan para lectores distintos, y un buen flujo de trabajo se mueve entre ambas según si en ese momento está leyendo una persona o una máquina.

## Errores comunes de JSON y cómo detectarlos

Una coma sobrante después del último elemento de un objeto o un array es uno de los errores más frecuentes, ya que es válida en los literales de objeto de JavaScript pero está explícitamente prohibida en JSON. Los nombres de propiedad siempre deben ser cadenas entre comillas dobles — tanto las claves sin comillas como las cadenas con comillas simples son inválidas, aunque ambas sean legales en JavaScript. Los comentarios no se admiten en absoluto en el JSON estándar, así que un archivo de configuración con comentarios útiles en línea (como el formato JSONC que usa VS Code para su configuración) técnicamente no es JSON válido y necesita un analizador especial. Como la gramática de JSON es intencionadamente más estricta que la de JavaScript, copiar un literal de objeto de JavaScript directamente en un campo JSON es una fuente muy común de los errores de sintaxis que esta herramienta te ayuda a detectar.

## Validar antes de confiar en los datos

Además de hacer que el JSON sea legible, esta herramienta también lo valida, lo cual importa porque un solo carácter mal colocado puede hacer que un bloque de JSON que parece correcto resulte completamente imposible de interpretar. En lugar de escanear manualmente cientos de líneas en busca de una coma que falta o un corchete sin cerrar, pegar el texto y dejar que el analizador indique exactamente dónde falló convierte una búsqueda visual tediosa en una respuesta instantánea y precisa, algo especialmente valioso al depurar un archivo de configuración o la respuesta de una API que un programa se niega a aceptar.

## Privado e instantáneo

Todo el procesamiento se ejecuta enteramente en tu navegador, así que formatear y minificar ocurren al instante y ningún JSON que pegues se envía jamás a ningún sitio, se registra ni se comparte, y funciona sin conexión una vez cargada la página.
