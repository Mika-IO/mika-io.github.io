## Encuentra el Mínimo Común Múltiplo de cualquier conjunto de números

El Mínimo Común Múltiplo (m.c.m.) es el menor número entero positivo que es divisible exactamente por todos los números de un conjunto dado. Introduce dos o más números separados por comas y el m.c.m. aparece al instante, junto con el Máximo Común Divisor (MCD) como propina.

## Definición y ejemplos

El m.c.m. de un conjunto de números es el número más pequeño en el que todos ellos dividen sin dejar resto.

- m.c.m.(4, 6) = 12 — porque 12 ÷ 4 = 3 y 12 ÷ 6 = 2, y ningún número menor funciona para los dos.
- m.c.m.(3, 5) = 15 — porque 3 y 5 son coprimos (no comparten factores comunes), su m.c.m. es simplemente su producto.
- m.c.m.(12, 18, 24) = 72 — el número más pequeño divisible por los tres.

## Cómo se calcula el m.c.m.

El método más eficiente usa la relación entre el m.c.m. y el MCD: m.c.m.(a, b) = |a × b| / MCD(a, b). Para más de dos números, el m.c.m. se calcula por parejas: m.c.m.(a, b, c) = m.c.m.(m.c.m.(a, b), c).

El MCD se calcula usando el algoritmo de Euclides, que divide repetidamente el número mayor entre el menor y toma el resto hasta que el resto es cero. El último resto distinto de cero es el MCD.

## Sumar fracciones con distinto denominador

La aplicación cotidiana más común del m.c.m. está en la aritmética de fracciones. Para sumar 1/4 y 1/6, necesitas un denominador común. El m.c.m. de 4 y 6 es 12, así que: 1/4 = 3/12 y 1/6 = 2/12, dando 5/12. Usar el m.c.m. da directamente la forma más reducida, mientras que usar cualquier otro múltiplo común (como 24) da un resultado que todavía necesita simplificarse.

## Horarios y ciclos

El m.c.m. aparece en problemas de programación de horarios en los que eventos se repiten a intervalos distintos. Si el autobús A pasa cada 12 minutos y el autobús B cada 18 minutos, y ambos salen a las 8:00, ¿cuándo volverán a salir juntos? m.c.m.(12, 18) = 36, así que vuelven a coincidir a las 8:36.

De forma parecida, los engranajes de los sistemas mecánicos tienen números de dientes cuyo m.c.m. determina cuándo se vuelven a encontrar los mismos dientes. Las líneas de producción con máquinas que funcionan con tiempos de ciclo distintos usan el m.c.m. para encontrar puntos de sincronización.

## Abastecerse sin desperdicio

El m.c.m. también resuelve un problema de compras muy concreto: si las salchichas vienen en paquetes de 10 y los panes en paquetes de 8, ¿cuántos paquetes de cada uno necesitas comprar para acabar con exactamente el mismo número de salchichas y de panes, sin que sobre ninguno? La respuesta es el número más pequeño en el que dividen exactamente tanto el 10 como el 8, que es m.c.m.(10, 8) = 40 — así que comprarías 4 paquetes de salchichas y 5 paquetes de panes. Este mismo escenario, y sus incontables variaciones con cualquier par de paquetes de tamaños distintos, aparece siempre que intentas emparejar dos cosas que se venden en cantidades diferentes.

## Teoría musical

En música, el m.c.m. determina cuándo se repiten los patrones rítmicos. Un patrón de 3 tiempos tocado contra un patrón de 4 tiempos crea un ciclo de m.c.m.(3, 4) = 12 tiempos antes de que los tiempos fuertes vuelvan a coincidir. Esta es la base de la música polirrítmica.

## Cómo usar la calculadora

Introduce dos o más números separados por comas y el m.c.m. aparece al instante, junto con el MCD usado para calcularlo. No hay nada que enviar ni límite alguno de cuántos números puedes listar — la calculadora reduce todo el conjunto por parejas por debajo, así que una lista de cinco o seis números se gestiona con la misma facilidad que un par. Cambiar cualquier número actualiza el resultado de inmediato, lo que facilita explorar cómo cambia el m.c.m. al añadir un número más a un conjunto.

## Por qué el m.c.m. y el MCD son dos caras de la misma moneda

El Mínimo Común Múltiplo y el Máximo Común Divisor describen los extremos opuestos de una misma relación entre dos números, y la elegante identidad m.c.m.(a, b) × MCD(a, b) = a × b los conecta directamente. De forma intuitiva, el MCD extrae todo lo que dos números tienen en común, mientras que el m.c.m. es el número más pequeño lo bastante grande para contener todo lo que ambos números necesitan. Como calcular un MCD mediante el algoritmo de Euclides es rápido incluso para números grandes, y la fórmula del m.c.m. solo necesita una multiplicación y una división adicionales una vez conocido el MCD, esta ruta indirecta es mucho más rápida que buscar múltiplos directamente, sobre todo a medida que los números crecen.

## Un ejemplo resuelto paso a paso

Toma m.c.m.(21, 6). Primero halla el MCD: 21 = 3×6 + 3, luego 6 = 2×3 + 0, así que MCD(21, 6) = 3. Después aplica la fórmula: m.c.m.(21, 6) = (21 × 6) / 3 = 126 / 3 = 42. Puedes comprobarlo directamente — 42 ÷ 21 = 2 y 42 ÷ 6 = 7, ambos números enteros, y ningún número positivo menor divide exactamente tanto a 21 como a 6. Este proceso de dos pasos, primero el MCD y luego una única multiplicación y división, es exactamente lo que la calculadora realiza al instante detrás de los resultados que ves.

## Situaciones cotidianas más allá de fracciones y horarios

El m.c.m. aparece discretamente en situaciones que la gente no siempre etiqueta como un problema matemático. Escalar una receta que necesita cantidades enteras de dos ingredientes vendidos en tamaños de paquete distintos, preparar bolsitas de regalo idénticas con artículos que vienen en cajas de cantidades diferentes, o calcular cuántas rondas de un juego con dos duraciones distintas vuelven a coincidir al principio — todo esto son problemas de m.c.m. disfrazados. Siempre que necesites la cantidad, el tiempo o el recuento más pequeño que satisfaga dos o más requisitos que se repiten a la vez, el m.c.m. es el número que buscas.

## Privado e instantáneo

Todos los cálculos se ejecutan enteramente en tu navegador usando el algoritmo de Euclides, así que nada de lo que introduzcas se sube, se registra ni se comparte jamás. El resultado aparece en el instante en que escribes, funciona sin conexión una vez cargada la página, y cada número desaparece en cuanto cierras o recargas la pestaña.
