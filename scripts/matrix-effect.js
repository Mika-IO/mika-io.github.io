window.onload = function () {
    // Configurações
    var matrixCanvas = document.getElementById('matrix-canvas');
    var context = matrixCanvas.getContext('2d');
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-=_+[]{}|;\':",./<>?`~';
    var fontSize = 15;
    var columns;
    var drops = [];

    // Configurações iniciais
    function setup() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        columns = matrixCanvas.width / fontSize;

        for (var x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    }

    // Desenha os caracteres na tela
    function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        context.fillStyle = '#0F0';
        context.font = fontSize + 'px arial';

        for (var i = 0; i < drops.length; i++) {
            var text = characters[Math.floor(Math.random() * characters.length)];
            context.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Loop de animação
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    // Inicializa o efeito de matriz
    setup();
    animate();
}
