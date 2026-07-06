## Convierte números entre cualquier base al instante

El conversor de bases numéricas te permite escribir cualquier número en binario (base 2), octal (base 8), decimal (base 10) o hexadecimal (base 16) y ver de inmediato su equivalente en los cuatro sistemas. No hace falta recordar fórmulas de conversión ni hacer cuentas mentales — elige tu base de origen, escribe el número, y la herramienta se encarga del resto en tiempo real.

## Por qué existen distintas bases numéricas

Los humanos contamos de forma natural en base 10 (decimal) porque tenemos diez dedos. Pero los ordenadores no tienen dedos — trabajan con señales eléctricas que están encendidas o apagadas, lo que da lugar a la base 2 (binaria). Otras bases surgieron como atajos prácticos para el binario: la base 8 (octal) agrupa tres dígitos binarios, y la base 16 (hexadecimal) agrupa cuatro, haciendo que las cadenas binarias largas resulten mucho más legibles y manejables para ingenieros e ingenieras.

## Binario — base 2

El binario es la base de la informática digital. Cada valor almacenado en un ordenador, cada instrucción ejecutada por un procesador, cada píxel de una pantalla termina resolviéndose en una secuencia de ceros y unos. A un solo dígito binario se le llama bit. Ocho bits forman un byte. Como los números binarios se alargan rápido —el número decimal 255 necesita ocho dígitos binarios (11111111)—, quienes programan raramente escriben binario en crudo. Prefieren el hexadecimal, mucho más compacto.

Entender el binario resulta esencial para estudiantes de informática, ingenieros de software y cualquiera que trabaje cerca del hardware. La manipulación de bits —usando operaciones como AND, OR, XOR y NOT— es una técnica habitual en programación de sistemas, criptografía y procesamiento gráfico.

## Octal — base 8

El octal usa los dígitos del 0 al 7. Un dígito octal representa exactamente tres dígitos binarios, así que los grupos de tres bits encajan de forma limpia en un solo dígito octal. Esto hizo que el octal fuera muy conveniente en la época de los mainframes y las minicomputadoras, cuando la memoria solía organizarse en grupos de tres bits.

Hoy en día, el uso más visible del octal está en los códigos de permisos de archivos de Unix y Linux. Cuando ejecutas `chmod 755` sobre un archivo, estás fijando permisos con notación octal: 7 (rwx), 5 (r-x), 5 (r-x). Cada dígito codifica tres bits de permiso (lectura, escritura, ejecución) para el propietario, el grupo y el resto de usuarios. Cualquier administrador de sistemas o desarrollador que trabaje con Linux se encuentra con permisos octales a diario.

## Decimal — base 10

El decimal es el sistema numérico cotidiano usado por prácticamente todas las culturas humanas. Utiliza los dígitos del 0 al 9. Cada posición de un número decimal representa una potencia de 10: unidades, decenas, centenas, millares, y así sucesivamente. El decimal es el estándar para las aplicaciones dirigidas a personas — los saldos bancarios, las temperaturas, las distancias y las marcas de tiempo se muestran todas en decimal.

Dentro de un ordenador, sin embargo, el decimal resulta relativamente costoso. Los procesadores trabajan de forma nativa en binario, así que representar números decimales exige esquemas de codificación como el Decimal Codificado en Binario (BCD) o algoritmos de conversión. Por eso, la mayoría de los cálculos internos usan aritmética binaria, y solo la salida final se convierte a decimal para mostrarla.

## Hexadecimal — base 16

El hexadecimal amplía el conjunto de dígitos más allá del 9 usando las letras de la A a la F para representar del 10 al 15. Un dígito hexadecimal representa exactamente cuatro dígitos binarios (un nibble). Esto hace del hexadecimal una representación extremadamente compacta de los datos binarios. El byte de 8 bits 11111111 en binario se convierte en un simple FF en hexadecimal.

El hexadecimal está por todas partes en informática y electrónica. Las direcciones de memoria en depuradores, los códigos de color en diseño web (#FF6347 es un tono rojo tomate), las direcciones MAC, los hashes SHA y los listados de bytecode usan todos hexadecimal. Si alguna vez has leído un volcado hexadecimal de un archivo o inspeccionado un paquete de red, ya has trabajado directamente con hexadecimal.

## Cómo funciona la conversión de bases

Convertir un número de cualquier base a decimal es directo: multiplica cada dígito por su base elevada a la potencia de su posición (contando desde la derecha empezando en 0), y luego suma los resultados.

Por ejemplo, el número binario 1011 se convierte a decimal así:
1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11

Convertir de decimal a otra base requiere divisiones sucesivas: divide el número entre la base de destino, anota el resto como el siguiente dígito (de derecha a izquierda), y repite con el cociente hasta que el cociente sea cero.

Por ejemplo, para convertir 11 a binario:
11 ÷ 2 = 5 con resto 1, 5 ÷ 2 = 2 con resto 1, 2 ÷ 2 = 1 con resto 0, 1 ÷ 2 = 0 con resto 1. Leyendo los restos de abajo hacia arriba: 1011.

## Aplicaciones en el mundo real

**Códigos de color:** el diseño web y gráfico depende de los códigos de color hexadecimales. Cada color CSS como #3A86FF son tres pares de dígitos hexadecimales que codifican los canales rojo, verde y azul, cada uno entre 00 (0) y FF (255).

**Direcciones de red:** las direcciones MAC y las direcciones IPv6 se escriben en hexadecimal. Una dirección IPv6 como 2001:0db8:85a3::8a2e:0370:7334 comprime 128 bits en un formato legible por humanos, aunque sea complejo.

**Depuración:** al recorrer código ensamblador o inspeccionar memoria en un depurador, las direcciones y los valores de datos en crudo se muestran en hexadecimal. Saber traducir rápido entre hexadecimal y decimal —o entender que 0xFF = 255— es una habilidad clave para quien programa a bajo nivel.

**Permisos:** los sistemas de archivos de Linux y macOS usan octal para los permisos. Entender que 644 significa que el propietario puede leer y escribir (4+2=6), mientras que el grupo y los demás solo pueden leer (4), resulta esencial para la administración de servidores.

## Trucos para convertir de cabeza

Con práctica, ciertas conversiones se vuelven automáticas:

- Binario 1111 = Hex F = Decimal 15
- Binario 1000 = Hex 8 = Decimal 8
- Hex FF = Decimal 255 = Binario 11111111
- Hex 10 = Decimal 16 = Binario 10000

Un atajo útil: divide un número binario en grupos de 4 dígitos desde la derecha y convierte cada grupo a un dígito hexadecimal por separado. Para 11111100, divídelo en 1111 y 1100 → F y C → FC en hexadecimal.

## Privado e instantáneo

Todos los cálculos se ejecutan enteramente en tu navegador. No se envía ningún dato a ningún servidor. La conversión ocurre localmente usando los métodos nativos de JavaScript parseInt y toString, muy fiables para enteros dentro del rango seguro de JavaScript (hasta 2^53 − 1).

## Preguntas frecuentes

**¿Es gratis esta herramienta?** Sí, totalmente gratis, sin necesidad de registro ni suscripción.

**¿Funciona sin conexión?** Una vez cargada la página, la herramienta funciona por completo sin conexión a internet.

**¿Puedo usarla desde el móvil?** Sí. La herramienta está optimizada para móviles y funciona en iOS y Android.

**¿Cuál es el número más grande que admite?** La herramienta funciona con precisión hasta el límite de enteros seguros de JavaScript (Number.MAX_SAFE_INTEGER = 9.007.199.254.740.991 en decimal).
