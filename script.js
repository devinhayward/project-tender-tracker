fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    function renderNotesHTML(scope) {
      if (!scope.notes || scope.notes.length === 0) {
        return '<div class="notes"><em>No notes yet.</em></div>';
      }

      return `
        <div class="notes">
          <strong>Notes:</strong>
          <ul>
            ${scope.notes.map(note => {
              const date = new Date(note.timestamp);
              const time = date.toLocaleString('en-CA', {
                timeZone: 'America/Toronto',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
              return `<li><strong>${note.author}</strong> (${time}): ${note.text}</li>`;
            }).join('')}
          </ul>
        </div>
      `;
    }

    const container = document.getElementById('projects-container');
    projects.sort((a, b) => (a.projectOrder ?? 9999) - (b.projectOrder ?? 9999));

    projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';

      const stateGroups = {
        Active: [],
        Awarded: [],
        'Not Active': []
      };

      // Flatten and classify scopes by state
      const allScopes = Array.isArray(project.scopes) ? project.scopes : (
        Object.values(project.scopes).flat()
      );

      allScopes.forEach(scope => {
        const state = scope.state === 'Awarded' ? 'Awarded' :
                      scope.state === 'Not Active' ? 'Not Active' : 'Active';
        stateGroups[state].push(scope);
      });

      projectDiv.innerHTML = `
        <h2>${project.projectName}</h2>
        ${['Not Active', 'Active', 'Awarded'].map(state => (
          stateGroups[state].length > 0 ? `
            <h3>${state} Scopes</h3>
            <ul>
              ${stateGroups[state]
                .sort((a, b) => a.division - b.division)
                .map(scope => `
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
                    ${renderNotesHTML(scope)}
                  </li>
                `).join('')}
            </ul>
          ` : ''
        )).join('')}
      `;

      container.appendChild(projectDiv);
    });
  })
  .catch(error => console.error('Error loading project data:', error));