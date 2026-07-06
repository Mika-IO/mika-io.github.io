## Elige cualquier color y obtén su código al instante

Los códigos de color están en todas partes en el diseño web, el diseño gráfico y la programación. Cuando ves un color que quieres usar o reproducir, necesitas su código — ya sea un valor HEX para CSS, un triplete RGB para Photoshop, o una especificación HSL para manipular color mediante programación. Esta herramienta te da los tres formatos a la vez para cualquier color que elijas.

## Los tres formatos de código de color

**HEX (hexadecimal)**: el formato más usado en desarrollo web. Una cadena de seis caracteres con dígitos del 0 al 9 y letras de la A a la F, precedida de una almohadilla. Cada par de caracteres representa un canal de color: #RRGGBB. Por ejemplo, #FF5733 tiene el máximo de rojo (FF = 255), verde moderado (57 = 87) y poco azul (33 = 51). Los códigos HEX también pueden escribirse de forma abreviada cuando los dos caracteres de cada par son idénticos: #FF5500 se convierte en #F50.

**RGB (rojo, verde, azul)**: especifica cada canal de color como un entero de 0 (nada) a 255 (máximo). Es el formato nativo de las pantallas digitales, que emiten luz en rojo, verde y azul. rgb(255, 87, 51) es el mismo color que #FF5733. Los valores RGB se usan en CSS (rgb(r, g, b)), JavaScript, Python y la mayoría del software de edición de imágenes.

**HSL (matiz, saturación, luminosidad)**: un formato más intuitivo para las personas. El matiz es el color puro expresado como un ángulo de 0° a 360° alrededor de una rueda de color: 0° = rojo, 120° = verde, 240° = azul. La saturación indica lo vívido o gris que es el color (0% = gris, 100% = totalmente saturado). La luminosidad indica lo claro u oscuro que es (0% = negro, 100% = blanco, 50% = el color "normal" totalmente saturado). El HSL resulta excelente para ajustar colores de forma sistemática: aumenta la luminosidad para crear tintes, redúcela para crear sombras.

## Cómo usar el selector

Haz clic o toca la muestra de color para abrir el selector de color nativo de tu navegador, elige un color visualmente o escribe un valor conocido, y los códigos HEX, RGB y HSL se actualizan todos juntos de inmediato, listos para copiar en la herramienta o el código en el que estés trabajando. Como el selector usa la propia interfaz integrada del navegador en lugar de una personalizada, se comporta exactamente como cabría esperar y funciona de forma fiable en distintos dispositivos.

## Qué formato usar

**CSS y diseño web**: tanto HEX como RGB tienen un soporte amplio, pero el HSL se prefiere cada vez más porque resulta muy intuitivo de ajustar. Hacer un color un 10% más claro es sencillo en HSL; en RGB, requiere calcular nuevos valores de canal.

**Diseño para impresión**: la impresión suele usar CMYK (cian, magenta, amarillo, negro), que esta herramienta no cubre. Para convertir de digital a impreso, usa software profesional como Adobe Illustrator.

**Programación**: RGB es el formato nativo de la mayoría de las bibliotecas gráficas. HSL resulta útil cuando quieres generar paletas de color mediante código.

## Fundamentos de la teoría del color

Entender los colores te ayuda a usar mejor esta herramienta:

**Colores complementarios**: los colores opuestos entre sí en la rueda de matices (a 180° de distancia) crean el máximo contraste. Rojo (0°) y cian (180°).

**Colores análogos**: los colores adyacentes en la rueda de matices (a 30-60° de distancia) crean paletas armoniosas y de bajo contraste.

**Colores tríada**: tres colores igualmente espaciados a 120° crean combinaciones vibrantes y equilibradas.

**Tintes y sombras**: aumenta la luminosidad HSL por encima del 50% para crear tintes (versiones más claras). Redúcela por debajo del 50% para obtener sombras (versiones más oscuras).

## Accesibilidad y contraste

Los estándares de accesibilidad web exigen un contraste suficiente entre el texto y el color de fondo. Las directrices WCAG 2.1 especifican una relación de contraste mínima de 4,5:1 para texto normal y 3:1 para texto grande. Usa los códigos de color de este selector en una calculadora de contraste dedicada para verificar la accesibilidad.

## Armonías de color para el diseño

Más allá de los pares básicos ya mencionados, hay otras combinaciones que aparecen a menudo en el trabajo de diseño. Un esquema monocromático usa distintas sombras, tintes y tonos de un mismo matiz, creado variando la luminosidad HSL mientras se mantienen constantes el matiz y la saturación — una forma fiable de construir una paleta coherente sin ningún riesgo de que los colores choquen entre sí. Un esquema complementario dividido toma un color base más los dos colores adyacentes a su complementario, ofreciendo buena parte del contraste visual de un par complementario directo pero con un aire más suave y matizado.

## Accesibilidad web y contraste de color

Las Pautas de Accesibilidad para el Contenido Web definen requisitos de relación de contraste para que el texto sea legible: el estándar AA exige al menos 4,5:1 para texto normal y 3:1 para texto grande (18pt o más, o 14pt en negrita), mientras que el estándar más estricto AAA exige 7:1 y 4,5:1 respectivamente. Un contraste alto entre el texto y el fondo importa para cualquier persona con baja visión, y especialmente para el aproximadamente 8% de los hombres y el 0,5% de las mujeres con algún tipo de deficiencia en la visión del color, para quienes ciertos pares de colores que parecen distintos a la mayoría de la gente pueden verse casi idénticos.

## Colores con nombre en CSS

CSS define 147 colores con nombre que pueden usarse directamente en lugar de un valor hexadecimal o RGB, desde nombres obvios como red, blue y black hasta otros más curiosos como cornflowerblue, papayawhip y rebeccapurple — este último nombrado en 2014 en memoria de Rebecca Meyer, la hija del desarrollador de CSS Eric Meyer. Elegir un color con esta herramienta y compararlo con el color CSS con nombre más cercano es una forma rápida de comprobar si ya existe un nombre estándar para aproximadamente el tono que tienes en mente.

## Privado e instantáneo

El selector de color se ejecuta enteramente en tu navegador usando la entrada de color nativa del navegador, así que los resultados aparecen al instante y ningún color que elijas se envía jamás a un servidor, se registra ni se comparte.
