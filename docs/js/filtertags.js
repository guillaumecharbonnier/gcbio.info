document.addEventListener("DOMContentLoaded", function() {
    // Toggle active class on portfolio tag click
    document.querySelectorAll(".portfolio-tag").forEach(function(tag) {
        tag.addEventListener("click", function() {
            tag.classList.toggle("active");
            filterPortfolioItems();
        });
    });

    // Filter mode button click handler
    document.querySelectorAll(".filter-mode-button").forEach(function(btn) {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".filter-mode-button").forEach(function(b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");
            filterPortfolioItems();
        });
    });

    // Clear filters button
    document.getElementById("clearFilters").addEventListener("click", function() {
        document.querySelectorAll(".portfolio-tag").forEach(function(tag) {
            tag.classList.remove("active");
        });
        filterPortfolioItems();
    });

    // Function to filter portfolio items
    function filterPortfolioItems() {
        // Collect selected keywords (in lowercase)
        var selectedKeywords = Array.from(document.querySelectorAll(".portfolio-tag.active"))
            .map(function(tag) {
                return tag.dataset.keyword.toLowerCase();
            });

        // Get current filter mode (default to "single" if none active)
        var modeEl = document.querySelector(".filter-mode-button.active");
        var filterMode = modeEl ? modeEl.dataset.mode : "single";

        // Iterate over each portfolio item and decide to show or hide
        document.querySelectorAll(".portfolio-item").forEach(function(item) {
            var keywordsEl = item.querySelector(".keywords");
            if (!keywordsEl) return; // Skip if not found

            var keywords = Array.from(keywordsEl.querySelectorAll("span")).map(function(span) {
                return span.textContent.toLowerCase();
            });
            var showItem = false;

            if (filterMode === 'union') {
                // Show if no keywords are selected, or any key is present
                if (selectedKeywords.length === 0) {
                    showItem = true;
                } else {
                    showItem = selectedKeywords.some(function(kw) {
                        return keywords.includes(kw);
                    });
                }
            } else if (filterMode === 'intersection') {
                // Show only if every selected keyword is present
                showItem = selectedKeywords.every(function(kw) {
                    return keywords.includes(kw);
                });
            }

            item.style.display = showItem ? "" : "none";
        });
    }

    // Initialize default filter mode if needed. In this example, assume a mode is already active in the HTML.
    filterPortfolioItems();
});