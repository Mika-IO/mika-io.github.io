## Crea degradados CSS impresionantes sin ninguna herramienta de diseño

Los degradados son una de las formas más eficaces de añadir profundidad visual y una estética moderna a un sitio web. Los degradados CSS no necesitan ningún archivo de imagen y cargan al instante porque los genera el propio navegador. Este generador te permite diseñar un degradado de forma visual eligiendo colores y ajustando el ángulo, y luego copia el código CSS exacto que necesitas para usarlo.

## Tipos de degradados CSS

**Los degradados lineales** hacen una transición en línea recta de un color a otro. El ángulo determina la dirección: 0° va de abajo hacia arriba, 90° va de izquierda a derecha, 180° va de arriba hacia abajo, y 270° va de derecha a izquierda. Los ángulos más habituales en diseño son 135° (diagonal) y 90° (horizontal). Cualquier ángulo entre 0° y 360° es válido.

CSS: linear-gradient(135deg, #667eea, #764ba2)

**Los degradados radiales** emanan hacia fuera desde un punto central en formas circulares o elípticas. Resultan útiles para efectos de foco de luz, estados al pasar el ratón sobre un botón, y elementos focales centrados.

CSS: radial-gradient(circle, #667eea, #764ba2)

## Soporte en todos los navegadores modernos

Los degradados lineales y radiales tienen soporte en todos los navegadores modernos sin necesidad de ningún prefijo de proveedor. Versiones antiguas de Safari y Chrome exigían en su día un prefijo -webkit- para que los degradados se renderizaran correctamente, un resto de los primeros tiempos en los que la sintaxis de degradado CSS todavía se estaba estandarizando, pero esto no ha sido necesario en ningún navegador de uso común desde hace muchos años, así que la sintaxis simple y sin prefijo que produce este generador funciona en todas partes sin modificación.

## Añadir más paradas de color

El generador usa dos colores, pero los degradados CSS admiten cualquier número de paradas de color en cualquier posición. Para añadir un tercer color a mitad de camino:

linear-gradient(135deg, #667eea 0%, #ff6b6b 50%, #764ba2 100%)

También puedes especificar paradas en porcentajes concretos para controlar dónde ocurren las transiciones:

linear-gradient(90deg, #000000 0%, #000000 50%, #ff0000 50%, #ff0000 100%)

Esto crea una división nítida en lugar de un degradado — útil para ciertos efectos de diseño.

## Paletas de degradado populares

Algunas combinaciones de degradado muy apreciadas:
- **Océano**: #2193b0 → #6dd5ed
- **Atardecer**: #FF512F → #DD2476
- **Bosque**: #134E5E → #71B280
- **Sueño violeta**: #667eea → #764ba2
- **Fuego**: #f7971e → #ffd200
- **Cielo nocturno**: #0f0c29 → #302b63 → #24243e

## Usar degradados en CSS

La propiedad abreviada background o la propiedad background-image aceptan funciones de degradado directamente:

    .header {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

Los degradados también pueden aplicarse a texto, bordes y capas de máscara mediante técnicas avanzadas de CSS.

## Combinar degradados con imágenes

CSS permite combinar un degradado con una imagen de fondo usando varias capas de fondo:

    .hero {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('foto.jpg') center/cover;
    }

Esto superpone un degradado oscuro semitransparente sobre una imagen, mejorando la legibilidad del texto en las secciones destacadas.

## Cómo usar el generador

Elige tus dos colores con los selectores de color, ajusta el control deslizante del ángulo para fijar la dirección de la transición, y la vista previa se actualiza en vivo para que veas exactamente cómo queda el degradado antes de usarlo en cualquier sitio. Cuando quede como quieres, copia el código CSS generado con un clic y pégalo directamente en tu hoja de estilos — no hay ningún paso de exportación, ninguna imagen que descargar, ni ningún proceso de compilación de por medio.

## Por qué los degradados CSS superan a los degradados en imagen

Antes de que los degradados CSS tuvieran buen soporte, quienes diseñaban tenían que exportar un degradado como archivo PNG o JPEG para usarlo en un sitio web, lo que añadía un archivo extra que descargar, aumentaba el peso de la página, y se veía borroso o con bandas visibles en pantallas de alta resolución a menos que la imagen se exportara con cuidado en un tamaño grande. Un degradado CSS lo calcula el propio navegador a la resolución que exija la pantalla, así que siempre queda perfectamente nítido, se escala a cualquier tamaño sin ningún archivo adicional, y puede cambiarse al instante editando unos pocos caracteres de código en lugar de volver a exportar una imagen. Por eso prácticamente todos los sitios web modernos usan degradados CSS en lugar de archivos de imagen para este tipo de efecto.

## Elegir colores que combinen bien

Un degradado transmite un aspecto pulido cuando los dos colores comparten cierta lógica visual en lugar de chocar de forma arbitraria. Un enfoque habitual y fiable es elegir dos colores cercanos entre sí en la rueda de color (un par análogo, como azul pasando a violeta) para una sensación tranquila y coherente, o dos colores situados aproximadamente uno frente al otro (un par complementario, como naranja pasando a azul) para un aspecto más atrevido y de mayor contraste. Mantener la luminosidad de los dos colores razonablemente parecida suele producir una transición de aspecto más suave, mientras que una gran diferencia de luminosidad —un azul marino oscuro pasando a un amarillo pálido, por ejemplo— crea un degradado más dramático y de mayor energía. Experimentar directamente en la vista previa en vivo resulta más rápido que razonar sobre teoría del color en abstracto, ya que puedes ver de inmediato si una combinación funciona para tu diseño concreto.

## Degradados en texto y otros elementos

Más allá de los fondos simples, los degradados pueden aplicarse al propio texto combinando `background-clip: text` con un color de texto transparente, un efecto popular para títulos y logotipos que buscan un tratamiento colorido y llamativo sin recurrir a un archivo de imagen. La misma sintaxis de degradado subyacente también funciona en bordes y puede combinarse con máscaras CSS para efectos de forma más avanzados, aunque estas técnicas requieren algo más de CSS de apoyo que un simple degradado de fondo. Una vez que tengas un degradado que te guste con este generador, merece la pena saber que las mismas paradas de color pueden reutilizarse en varios de estos efectos distintos para lograr un diseño visualmente coherente.

## Privado e instantáneo

Todo se ejecuta enteramente en tu navegador, así que la vista previa se actualiza al instante mientras ajustas colores o ángulo, y nada sobre el degradado que diseñes se envía jamás a un servidor, se registra ni se comparte.
