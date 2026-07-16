## Un cronómetro preciso, directamente en tu navegador

Cronometrar algo con precisión solía significar llevar un cronómetro exclusivo. Ahora cualquier dispositivo con un navegador puede cumplir ese propósito. Este cronómetro en línea se ejecuta completamente en su navegador mediante un temporizador de alta resolución, registra tiempos de vuelta y muestra el tiempo transcurrido en minutos, segundos y milisegundos. No hay nada que descargar ni instalar.

## como usarlo

Presione el botón Iniciar para comenzar a cronometrar. La pantalla cuenta en tiempo real mostrando minutos, segundos y milésimas de segundo. Mientras el cronómetro está funcionando, presione Lap para registrar el tiempo transcurrido actual como una división. La lista de vueltas se acumula debajo de la pantalla y numera cada división para que puedas compararlas. Presione Detener para pausar el cronómetro sin perder el tiempo transcurrido ni los registros de vuelta. Presione Iniciar nuevamente para continuar desde donde hizo la pausa. Presione Restablecer para borrar todo y volver a cero.

## Temporizadores de precisión y navegador

Los navegadores modernos exponen un temporizador de alta resolución a través de la API de rendimiento, que mide el tiempo en fracciones de milisegundo. Esto es mucho más preciso que la resolución de un milisegundo del antiguo método Date.now(). En la práctica, el cronómetro tiene una precisión de menos de un milisegundo en la mayoría de los dispositivos, lo cual es más que adecuado para cronometrar deportes, cocinar, presentaciones o cualquier uso diario. Para el cronometraje legalmente certificado en competiciones, utilice siempre un dispositivo de cronometraje aprobado.

Una limitación que vale la pena conocer: si cambia a una pestaña diferente del navegador, los navegadores pueden acelerar JavaScript en segundo plano para ahorrar recursos. Esto podría provocar que el cronómetro se retrase ligeramente con respecto al tiempo real transcurrido. Mantenga la pestaña del cronómetro enfocada para obtener la mayor precisión.

## Usos comunes

Los atletas usan un cronómetro para cronometrar carreras, nadar, intervalos de ciclismo o cualquier ejercicio repetitivo en el que comparar divisiones sea importante. El registro de vueltas te ayuda a ver si estás manteniendo el ritmo, mejorando o disminuyendo. Los entrenadores cronometran a varios atletas de forma secuencial y comparan los resultados.

En la cocina, un cronómetro es más flexible que un temporizador de cuenta regresiva cuando estás haciendo malabarismos con varios platos y cada uno de ellos necesita una cantidad de tiempo diferente. Comienzas a cronometrar cada plato cuando entra y anotas el tiempo de vuelta para saber cuánto tiempo lleva cocinándose cada uno.

Las presentaciones y discursos se benefician de un cronómetro en funcionamiento. Saber que estás exactamente en cuatro minutos y treinta segundos te ayuda a juzgar si debes expandir o condensar una sección para alcanzar la longitud objetivo.

Los científicos y estudiantes que realizan experimentos de cronometraje aprecian la función de vuelta, que registra un punto de datos sin tener que reiniciar el cronómetro para la siguiente prueba.

## Compatible con el tacto y el teclado

Los botones Inicio, Vuelta y Restablecer funcionan con clics del mouse y toques con los dedos. El diseño se adapta perfectamente a teléfonos y tabletas.

## Por qué el cronómetro de un navegador es realmente preciso

Vale la pena entender por qué se puede confiar en una herramienta gratuita que se ejecuta en una página web para cualquier cosa que vaya más allá de un momento casual. Los navegadores modernos exponen un temporizador de alta resolución a través de la API de rendimiento, distinto del método más antiguo y tosco Date.now(), capaz de medir el tiempo en fracciones de milisegundos en lugar de milisegundos completos. En la práctica, esto significa que el cronómetro avanza mucho menos de un milisegundo en el transcurso de una sesión de cronometraje normal, lo cual es más que suficiente para deportes, cocina, presentaciones y trabajo de laboratorio; la única advertencia es que los navegadores ralentizan deliberadamente el JavaScript que se ejecuta en una pestaña en segundo plano para ahorrar batería y CPU, por lo que mantener la pestaña del cronómetro activa y enfocada es el único hábito que preserva su precisión.

## Tiempos de vuelta vs tiempos parciales

Los entusiastas del cronometraje a veces distinguen entre un "tiempo de vuelta" (la duración de ese segmento, independiente de los demás) y un "tiempo fraccionado" (el tiempo acumulado transcurrido en ese punto de control desde la salida). Esta herramienta registra divisiones (cada tiempo registrado es el tiempo total transcurrido en el momento en que presionaste Vuelta), que es la convención más común en el cronometraje casual y coincide con lo que la mayoría de la gente espera cuando mira un cronómetro en marcha. Si necesita duraciones de vuelta individuales en lugar de divisiones acumulativas, reste cada tiempo registrado del anterior.

## Cronómetro frente al temporizador integrado de un teléfono

Todos los teléfonos inteligentes modernos vienen con una aplicación de cronómetro, por lo que es justo preguntarse por qué vale la pena usar una basada en navegador. La respuesta honesta es conveniencia en lugar de precisión superior: en una computadora compartida, durante una videollamada o integrado en un flujo de trabajo que ya se encuentra en una pestaña del navegador, acceder a una página web es más rápido que desbloquear un teléfono y encontrar la aplicación correcta, y la precisión de sincronización subyacente de la API de rendimiento es comparable a lo que logra una aplicación nativa para cualquier uso diario, no competitivo.

## Cronometrar múltiples actividades

Algunas situaciones requieren el seguimiento de más de una cosa a la vez: varios platos cocinándose con diferentes horas de inicio o varias etapas de relevos en una carrera. Dado que este cronómetro mantiene un único total acumulado más una lista de vueltas, el enfoque práctico para múltiples actividades simultáneas es abrir la herramienta en pestañas separadas del navegador, una por actividad, cada una de las cuales comienza de forma independiente en el momento en que comienza su propia actividad.

## Restablecer a mitad de sesión

Si presiona accidentalmente Restablecer antes de guardar los tiempos de vuelta que necesitaba, no se puede deshacer: el conteo vuelve a cero inmediatamente. Para cualquier sesión en la que el historial de vueltas realmente importe, vale la pena anotar las divisiones clave a medida que ocurren en lugar de confiar únicamente en que la lista en pantalla sobreviva hasta el final.

## Privado y siempre disponible.

No se envían datos a ninguna parte, el cronómetro se ejecuta completamente en su navegador, funciona sin conexión una vez que la página se ha cargado y no requiere cuenta: vuelva a cargar la página en cualquier momento para restablecer todo a cero.

