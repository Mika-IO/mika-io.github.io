// JavaScript
function loadArticles() {
  // Ler o arquivo JSON (substitua "caminho/do/arquivo.json" pelo caminho correto)
  fetch("content/articles/articles.json")
    .then((response) => response.json())
    .then((data) => {
      const articlesContainer = document.getElementById("articles-cards");
      const searchInput = document.getElementById("searchInputArticles");

      // Função de filtro de artigos
      function filterArticles() {
        const searchText = searchInput.value.toLowerCase();

        // Limpar o conteúdo atual dos artigos
        articlesContainer.innerHTML = "";

        // Filtrar os artigos de acordo com o texto de pesquisa
        const filteredArticles = data.filter(
          (article) =>
            article.name.toLowerCase().includes(searchText) ||
            article.description.toLowerCase().includes(searchText)
        );

        // Iterar sobre os artigos filtrados e criar os elementos HTML correspondentes
        filteredArticles.forEach((article) => {
          const card = document.createElement("div");
          card.className = "card";

          const img = document.createElement("img");
          img.src = article.img;

          const title = document.createElement("h5");
          title.textContent = article.name;

          const description = document.createElement("p");
          description.textContent = article.description;

          const readMoreLink = document.createElement("a");
          readMoreLink.href = article.url;
          readMoreLink.textContent = "Read more";

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(description);
          card.appendChild(readMoreLink);

          articlesContainer.appendChild(card);
        });
      }

      // Adicionar evento de digitação ao input para filtrar os artigos
      searchInput.addEventListener("input", filterArticles);

      // Carregar todos os artigos no início
      filterArticles();
    })
    .catch((error) => {
      console.error("Erro ao carregar os artigos:", error);
    });
}

// Chamar a função para carregar os artigos
loadArticles();
