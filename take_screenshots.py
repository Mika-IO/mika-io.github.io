import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Lista de URLs
urls = [
    "https://mikaio.dev/tools/",
    "https://pixbitcoin.org/",
    "https://mikaio.dev/pixfruta",
    "https://mikaio.dev/deepcam.online/",
    "https://mikaio.dev/birth-calc/",
    "https://mikaio.dev/calc-gast/",
    "https://mikaio.dev/type-effect-js/",
    "https://mikaio.dev/buzypage/",
    "https://langmentor-ai.com/",
    "https://mikaio.dev/moedas/",
    "https://mikaio.dev/verify-credit-card/",
    "https://mikaio.dev/karate/",
    "https://mikaio.dev/paper-wallet-generator/",
    "https://mikaio.dev/llm-in-front/",
]

# Criar a pasta imgs se não existir
os.makedirs("proj-imgs", exist_ok=True)

# Configurar o driver do Chrome
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Rodar em segundo plano
options.add_argument("--window-size=1920x1080")  # Definir tamanho da janela

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Função para capturar as imagens
def capture_screenshots():
    for index, url in enumerate(urls):
        try:
            driver.get(url)
            time.sleep(2)  # Esperar a página carregar
            filename = f"proj-imgs/screenshot_{index+1}.png"
            driver.save_screenshot(filename)
            print(f"Screenshot salva: {filename}")
        except Exception as e:
            print(f"Erro ao acessar {url}: {e}")

    driver.quit()

# Executar a função
if __name__ == "__main__":
    capture_screenshots()
