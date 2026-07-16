## Encuentra la raíz cuadrada de cualquier número al instante

La raíz cuadrada es una de las operaciones matemáticas más utilizadas. Desde el teorema de Pitágoras hasta la desviación estándar, desde las ecuaciones cuadráticas hasta las fórmulas financieras, las raíces cuadradas aparecen por todas partes. Ingrese cualquier número no negativo y su raíz cuadrada se mostrará inmediatamente, junto con el cuadrado (n²) como referencia.

## ¿Qué es una raíz cuadrada?

La raíz cuadrada de un número n es el valor que multiplicado por sí mismo da igual a n. Escrito como √n o n^(1/2). Por ejemplo:
- √9 = 3 porque 3 × 3 = 9
- √25 = 5 porque 5 × 5 = 25
- √2 ≈ 1.4142135... (un número irracional)
- √100 = 10

Todo número positivo tiene dos raíces cuadradas: una positiva y otra negativa. La raíz positiva se llama raíz cuadrada principal. La raíz cuadrada de cero es cero.

## cuadrados perfectos

Un cuadrado perfecto es un número que tiene raíz cuadrada entera:
- 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...

Reconocer cuadrados perfectos es útil en aritmética, geometría y álgebra.

## Raíces cuadradas irracionales

La mayoría de los números no tienen raíces cuadradas enteras exactas. √2, √3, √5, √6, √7 y muchos otros son irracionales: sus expansiones decimales son infinitas y no se repiten. Estos valores son importantes en geometría: la diagonal de un cuadrado unitario tiene longitud √2 ≈ 1.41421356...

## Aplicaciones

**Teorema de Pitágoras**: La hipotenusa c de un triángulo rectángulo satisface c = √(a² + b²). Calcular esto requiere sacar una raíz cuadrada.

**Desviación estándar**: la desviación estándar de un conjunto de datos es la raíz cuadrada de la varianza. Al sacar la raíz cuadrada, la medida vuelve a las unidades originales de los datos.

**Fórmula cuadrática**: Las soluciones de ax² + bx + c = 0 son x = (-b ± √(b² - 4ac)) / 2a. El discriminante b² - 4ac bajo la raíz cuadrada determina si las soluciones son reales.

**Fórmula de distancia**: La distancia entre dos puntos (x₁, y₁) y (x₂, y₂) es √((x₂-x₁)² + (y₂-y₁)²).

**Modelos financieros**: La desviación estándar de los rendimientos mide el riesgo de inversión. El portafolio de matemáticas utiliza ampliamente las raíces cuadradas.

**Física**: Las ecuaciones de ondas, los cálculos de energía y muchas relaciones físicas involucran raíces cuadradas.

## Números negativos y números imaginarios.

La raíz cuadrada de un número negativo no es un número real. En el sistema de números complejos, √(-1) se define como la unidad imaginaria i. Los números complejos tienen la forma a + bi y se utilizan en ingeniería eléctrica, mecánica cuántica y muchos otros campos.

## Cómo funciona el cálculo

La calculadora utiliza la función Math.sqrt() de JavaScript, que implementa el algoritmo de raíz cuadrada de punto flotante de doble precisión IEEE 754. Los resultados tienen una precisión de aproximadamente 15 a 16 cifras significativas.

## Cómo usar la calculadora

Escriba cualquier número no negativo en el cuadro y tanto su raíz cuadrada como su cuadrado aparecerán inmediatamente, actualizándose a medida que escribe. No hay ningún botón que presionar ni nada que configurar. Probar algunos números uno al lado del otro es una forma rápida de desarrollar la intuición: observe cómo la raíz cuadrada de un número menor que 1 es en realidad mayor que el número mismo (√0,25 = 0,5), lo que sorprende a muchas personas la primera vez que lo ven, mientras que la raíz cuadrada de cualquier número mayor que 1 siempre es menor que el número.

## Estimar una raíz cuadrada a mano

Antes de utilizar una calculadora, es útil saber cómo estimar aproximadamente una raíz cuadrada. Encuentra los dos cuadrados perfectos más cercanos que encierran tu número: para √50, los cuadrados perfectos más cercanos son 49 (√49 = 7) y 64 (√64 = 8), por lo que la respuesta debe estar entre 7 y 8, y como 50 está mucho más cerca de 49, la respuesta debe estar cerca de 7 pero un poco más alto; el valor verdadero, 7,07, confirma este instinto. Esta técnica de paréntesis es una prueba de cordura útil siempre que desee confirmar que el resultado de una calculadora está en el estadio correcto, y es exactamente el tipo de habilidad de estimación que los cursos de aritmética mental y álgebra inicial pretenden desarrollar.

## El método de Newton, el algoritmo detrás de escena

Las computadoras modernas no buscan raíces cuadradas en una tabla; los calculan utilizando métodos iterativos rápidos, siendo el más famoso el método de Newton (también llamado método babilónico, ya que los antiguos matemáticos babilónicos conocían una versión del mismo). A partir de una suposición aproximada, cada paso refina la estimación usando la fórmula: siguiente suposición = (suposición + número ÷ suposición) ÷ 2. Aplicado para encontrar √10 a partir de una suposición de 3: (3 + 10/3)/2 ≈ 3,1667, luego (3,1667 + 10/3,1667)/2 ≈ 3,1623, que ya está extremadamente cerca al valor verdadero de 3,16228. Cada iteración duplica aproximadamente el número de dígitos correctos, razón por la cual los procesadores modernos pueden calcular una raíz cuadrada con total precisión en sólo un puñado de pasos.

## Cuadrados y raíces cuadradas como operaciones inversas.

Cuadrar y sacar raíz cuadrada se deshacen entre sí, razón por la cual esta calculadora muestra ambos a la vez: la raíz cuadrada de n² devuelve n (para n no negativo) y el cuadrado de √n devuelve n. Esta relación inversa es fundamental en todo el álgebra: así es exactamente como se resuelven las ecuaciones que involucran términos cuadrados, como la fórmula cuadrática o el teorema de Pitágoras, aplicando la raíz cuadrada a ambos lados en el momento adecuado.

## Privado e instantáneo

El cálculo se ejecuta completamente en su navegador utilizando aritmética estándar de doble precisión, con una precisión de aproximadamente quince cifras significativas, por lo que el resultado aparece instantáneamente y ningún número que ingresa se carga, registra o comparte.

