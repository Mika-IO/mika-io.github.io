## Encuentra el Máximo Común Divisor de cualquier conjunto de números

El Máximo Común Divisor (MCD) —también llamado máximo factor común— es el número más grande que divide a todos los números dados sin dejar resto. Introduce dos o más números separados por comas y el MCD se calcula al instante usando el algoritmo de Euclides.

## Definición y ejemplos

- MCD(12, 18) = 6 — porque 6 es el número más grande que divide tanto a 12 como a 18.
- MCD(48, 36, 24) = 12 — el número más grande que divide a los tres.
- MCD(7, 13) = 1 — estos son coprimos (no comparten ningún factor más allá del 1).

## El algoritmo de Euclides

El método más famoso para calcular el MCD es el algoritmo de Euclides, descrito por Euclides hacia el año 300 a.C. en sus Elementos. El algoritmo establece que MCD(a, b) = MCD(b, a mod b), y se repite hasta que b = 0. Por ejemplo: MCD(48, 36) → MCD(36, 12) → MCD(12, 0) = 12.

## Simplificar fracciones

El uso cotidiano más común del MCD es simplificar fracciones a su mínima expresión. Para simplificar 48/72, calcula MCD(48, 72) = 24, y luego divide ambos entre 24: 2/3. El resultado queda totalmente reducido porque el numerador y el denominador ahora son coprimos.

## Criptografía

El cifrado RSA, el algoritmo que protege la mayoría de las comunicaciones en internet, depende fundamentalmente de la teoría de números que involucra el MCD y los números coprimos. El algoritmo de generación de claves RSA exige elegir dos números primos grandes, que siempre son coprimos entre sí y con sus productos.

## Repartir cosas en grupos iguales

Un uso muy práctico del MCD es dividir colecciones de tamaños distintos en el mayor número posible de grupos idénticos sin que sobre nada. Si tienes 48 manzanas y 36 naranjas y quieres montar cestas de fruta idénticas usando toda la fruta sin que sobre nada, el mayor número de cestas que puedes hacer es MCD(48, 36) = 12, cada una con 4 manzanas y 3 naranjas. Esta misma lógica se aplica a cortar telas o maderas en trozos iguales, organizar sillas en filas iguales en salas de tamaños distintos, o repartir un presupuesto entre departamentos en las mayores cuotas iguales posibles.

## Ingeniería

En ingeniería mecánica, el MCD del número de dientes de dos engranajes determina con qué frecuencia se encuentra el mismo par de dientes. Si el engranaje A tiene 48 dientes y el engranaje B tiene 36, MCD(48, 36) = 12, lo que significa que cada 12 dientes del engranaje A engranan con cada 12 dientes del engranaje B.

## Cómo usar la calculadora

Escribe tus números en el cuadro separados por comas — dos números, o tantos como quieras. Pulsa calcular y el MCD de todo el conjunto aparece de inmediato, junto con la reducción paso a paso mediante el algoritmo de Euclides, para que veas exactamente cómo se llegó a la respuesta en lugar de tratarla como una caja negra. Introducir un solo número, o números que no comparten ningún factor más allá del 1, se gestiona con naturalidad: la herramienta simplemente indica un MCD de 1 en ese segundo caso, confirmando que los números son coprimos.

## Por qué el algoritmo de Euclides es tan eficiente

Antes del método de Euclides, hallar un MCD significaba listar todos los factores de cada número y elegir el mayor que tuvieran en común — manejable para números pequeños, pero desesperadamente lento para números grandes. El algoritmo de Euclides, en cambio, sustituye repetidamente el número mayor por el resto de dividirlo entre el menor, reduciendo el problema con rapidez. Para dos números de cualquier tamaño realista, suele terminar en bastante menos de cincuenta pasos, razón por la cual sigue siendo el método estándar que se enseña hoy y el que está integrado en prácticamente toda calculadora, función de hoja de cálculo y biblioteca de programación que calcula un MCD.

## Extender el método a más de dos números

Cuando introduces tres o más números, la calculadora no necesita un algoritmo nuevo — simplemente aplica el caso de dos números de forma repetida. El MCD de una lista completa es igual al MCD de los dos primeros números combinado con el tercero, y así sucesivamente: MCD(a, b, c) = MCD(MCD(a, b), c). Esto funciona porque cualquier número que divida a la vez a a, b y c debe dividir primero al MCD de cualquier par de ellos, así que reducir la lista de dos en dos nunca pierde información. Es un buen ejemplo de cómo un elemento sencillo —el MCD de dos números— se escala de forma limpia para manejar una lista de cualquier longitud.

## Números coprimos y qué te dice un MCD de 1

Cuando la calculadora indica un MCD de 1, los números que introdujiste se llaman coprimos, o primos entre sí, lo que significa que no comparten ningún factor mayor que 1 aunque cada uno pueda tener individualmente muchos factores. Por ejemplo, 8 y 15 son coprimos aunque 8 = 2×2×2 y 15 = 3×5 — simplemente no comparten ninguno de los mismos bloques primos de construcción. La coprimalidad aparece constantemente en la teoría de números y en criptografía, porque muchos algoritmos dependen de elegir números garantizados para no compartir una estructura común oculta.

## Un ejemplo resuelto paso a paso

Observa el algoritmo de Euclides en acción para MCD(48, 18). Primero, 48 = 2×18 + 12, así que el problema se convierte en MCD(18, 12). Después, 18 = 1×12 + 6, así que se convierte en MCD(12, 6). Por último, 12 = 2×6 + 0, así que el resto llega a cero y el último resto distinto de cero, 6, es el MCD. Cada paso del algoritmo reduce rápidamente los números implicados, precisamente por eso termina en solo un puñado de pasos incluso para números muy grandes, a diferencia de listar todos los factores, que se ralentiza rápidamente a medida que los números crecen.

## Privado e instantáneo

Todos los cálculos se ejecutan enteramente en tu navegador usando el algoritmo de Euclides, así que el resultado aparece en el instante en que escribes y ningún número que introduzcas se envía jamás a un servidor, se registra ni se comparte. Funciona sin conexión una vez cargada la página, y cada cálculo se descarta en cuanto cierras o recargas la pestaña.
