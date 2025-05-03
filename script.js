fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';

      // Sort scopes by division before rendering
      project.scopes.sort((a, b) => a.division - b.division);

      console.log("Scopes for project:", project.projectName, project.scopes);

      projectDiv.innerHTML = `
        <h2>${project.projectName}</h2>
        <ul>
          ${project.scopes.map(scope => `
            <li class="scope">
              <strong>${scope.division !== undefined ? `Div ${scope.division} — ` : ''}${scope.scopeName}</strong> — Estimator: ${scope.estimator}
              ${scope.subTrades && scope.subTrades.length > 0 ? `
                <div class="subtrades-section">
                  <strong>SubTrades:</strong>
                  <ul class="subtrades">
                    ${scope.subTrades.map(subTrade => `
                      <li class="subtrade">
                        ${subTrade.company} (${subTrade.subTrade_contact}, ${subTrade.contact_phone}, ${subTrade.contact_email})
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
            </li>
          `).join('')}
        </ul>
      `;
      container.appendChild(projectDiv);
    });
  })
  .catch(error => console.error('Error loading project data:', error));