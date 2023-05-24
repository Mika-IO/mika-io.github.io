function loadProjects() {
  fetch("content/projects/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsContainer = document.getElementById("projects-cards");
      const searchInput = document.getElementById("searchInputProjects");

      const filterProjects = () => {
        const searchTerm = searchInput.value.toLowerCase();

        projectsContainer.innerHTML = "";

        const filteredProjects = data.filter((project) => {
          const projectName = project.name.toLowerCase();
          return projectName.includes(searchTerm);
        });

        filteredProjects.forEach((project) => {
          const card = document.createElement("div");
          card.className = "card";

          const title = document.createElement("h5");
          title.textContent = project.name;

          const description = document.createElement("p");
          description.textContent = project.description;

          const repoLink = document.createElement("a");
          repoLink.href = project.repo_url;
          repoLink.textContent = "Repository";

          card.appendChild(title);
          card.appendChild(description);
          card.appendChild(repoLink);

          if (project.live_url && project.live_url !== "") {
            const liveLink = document.createElement("a");
            liveLink.href = project.live_url;
            liveLink.textContent = "Live";
            card.appendChild(liveLink);
          }
          if (project.article_url && project.article_url !== "") {
            const articleLink = document.createElement("a");
            articleLink.href = project.article_url;
            articleLink.textContent = "Article";
            card.appendChild(articleLink);
          }

          projectsContainer.appendChild(card);
        });
      };

      searchInput.addEventListener("input", filterProjects);

      // Chamar a função de filtragem inicialmente
      filterProjects();
    })
    .catch((error) => {
      console.error("Erro ao carregar os projetos:", error);
    });
}

// Chamar a função para carregar os projetos
loadProjects();
