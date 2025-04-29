# Session Export\n\n## Overview\nThis session involved updating the project to accept 
    an array of `SubTrades` under each scope in `projects.json`, as well as updating the 
    JavaScript file to display this new data on the webpage.\n\n## Changes Made\n1. 
    **Updated `projects.json`:**\n   - Added `subTrades` to each scope.\n   - Example 
    structure for `SubTrade`: `[{\"company\": \"Company Name\", \"contact\": \"Contact 
    Person\", \"contact_email\": \"email@example.com\", \"contact_phone\": \"(123) 
    456-7890\"}]`\n\n2. **Updated `script.js`:**\n   - Modified the JavaScript code to 
    fetch `projects.json`, parse the data, and display the scopes along with the 
    associated `subTrades`.\n\n## Script 
    Changes\n```javascript\nfetch('data/projects.json')\n  .then(response => 
    response.json())\n  .then(projects => {\n    const container = 
    document.getElementById('projects-container');\n    projects.forEach(project => {\n   
       const projectDiv = document.createElement('div');\n      projectDiv.className = 
    'project';\n      projectDiv.innerHTML = `\n        <h2>${project.projectName}</h2>\n 
           <ul>\n          ${project.scopes.map(scope => `\n            <li 
    class=\"scope\"><strong>${scope.scopeName}</strong> — Estimator: 
    ${scope.estimator}</li>\n\n            <ul>\n              
    ${scope.subTrades.map(subTrade => `\n                <li class=\"subtrade\">Company: 
    ${subTrade.company}, Contact: ${subTrade.contact}, Email: ${subTrade.contact_email}, 
    Phone: ${subTrade.contact_phone}</li>\n              `).join('')}\n            </ul>\n
              `).join('')}\n        </ul>\n      `;\n      
    container.appendChild(projectDiv);\n    });\n  })\n  .catch(error => 
    console.error('Error loading project data:', error));\n```\n\n## Next Steps\n- 
    Continue working on displaying the new data on the webpage.\n```