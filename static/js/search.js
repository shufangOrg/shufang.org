// Search functionality for shufang.org
(function() {
  // Check if we're on the search page
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchButton || !searchResults) {
    return;
  }

  let searchIndex = null;
  let fuse = null;

  // Load Fuse.js and search index
  function initSearch() {
    // Show loading message
    searchResults.innerHTML = '<div class="search-loading">加载搜索索引中...</div>';

    // Load Fuse.js from CDN
    const fuseScript = document.createElement('script');
    fuseScript.src = 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js';
    fuseScript.onload = function() {
      // Load search index
      fetch('/search.json')
        .then(response => response.json())
        .then(data => {
          searchIndex = data;
          
          // Configure Fuse.js options
          const fuseOptions = {
            keys: [
              { name: 'title', weight: 0.4 },
              { name: 'content', weight: 0.3 },
              { name: 'summary', weight: 0.2 },
              { name: 'section', weight: 0.1 }
            ],
            includeScore: true,
            threshold: 0.4,
            ignoreLocation: true,
            minMatchCharLength: 2
          };
          
          fuse = new Fuse(searchIndex, fuseOptions);
          searchResults.innerHTML = '<div class="search-no-results">请输入搜索关键词</div>';
        })
        .catch(error => {
          console.error('Error loading search index:', error);
          searchResults.innerHTML = '<div class="search-no-results">加载搜索索引失败</div>';
        });
    };
    fuseScript.onerror = function() {
      console.error('Error loading Fuse.js');
      searchResults.innerHTML = '<div class="search-no-results">加载搜索库失败</div>';
    };
    document.head.appendChild(fuseScript);
  }

  // Perform search
  function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
      searchResults.innerHTML = '<div class="search-no-results">请输入搜索关键词</div>';
      return;
    }

    if (!fuse) {
      searchResults.innerHTML = '<div class="search-no-results">搜索功能尚未就绪，请稍候再试</div>';
      return;
    }

    const results = fuse.search(query);
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">没有找到相关内容</div>';
      return;
    }

    // Display results
    let html = `<div class="search-results-count">找到 ${results.length} 个结果</div>`;
    
    results.forEach(result => {
      const item = result.item;
      const date = item.date ? new Date(item.date).toLocaleDateString('zh-CN') : '';
      const sectionName = getSectionName(item.section);
      
      // Truncate summary to 200 characters
      let summary = item.summary || item.content || '';
      if (summary.length > 200) {
        summary = summary.substring(0, 200) + '...';
      }
      
      html += `
        <div class="search-result-item">
          <div class="search-result-title">
            <a href="${item.permalink}">${item.title}</a>
          </div>
          <div class="search-result-meta">
            ${sectionName}${date ? ' · ' + date : ''}
          </div>
          <div class="search-result-summary">${summary}</div>
        </div>
      `;
    });
    
    searchResults.innerHTML = html;
  }

  // Get Chinese section name
  function getSectionName(section) {
    const sectionNames = {
      'blog': '博客',
      'books': '书目',
      'podcast': '播客',
      'syyj': '声音邮局',
      'talks': '作家说'
    };
    return sectionNames[section] || section;
  }

  // Event listeners
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Initialize search on page load
  initSearch();

  // Check for URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  if (query) {
    searchInput.value = query;
    // Wait for search to be ready before performing search
    const checkReady = setInterval(function() {
      if (fuse) {
        clearInterval(checkReady);
        performSearch();
      }
    }, 100);
  }
})();
