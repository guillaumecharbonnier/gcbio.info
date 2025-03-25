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

    // Select all keywords button
    document.getElementById("selectAllKeywords").addEventListener("click", function() {
        selectAllKeywords();
        filterPortfolioItems();
    });

    // Unselect all keywords button
    document.getElementById("unselectAllKeywords").addEventListener("click", function() {
        document.querySelectorAll(".portfolio-tag").forEach(function(tag) {
            tag.classList.remove("active");
        });
        filterPortfolioItems();
    });

    // Function to select all keywords
    function selectAllKeywords() {
        document.querySelectorAll(".portfolio-tag").forEach(function(tag) {
            tag.classList.add("active");
        });
    }

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

            if (selectedKeywords.length === 0) {
                // Hide all items if no keywords are selected
                showItem = false;
            } else if (filterMode === 'union') {
                // Show if any selected keyword is present
                showItem = selectedKeywords.some(function(kw) {
                    return keywords.includes(kw);
                });
            } else if (filterMode === 'intersection') {
                // Show only if every selected keyword is present
                showItem = selectedKeywords.every(function(kw) {
                    return keywords.includes(kw);
                });
            }

            item.style.display = showItem ? "" : "none";
        });
    }

    // Initialize default filter mode and select specific keywords
    // document.querySelectorAll(".portfolio-tag").forEach(function(tag) {
    //     if (tag.dataset.keyword === 'Transcriptomics' || tag.dataset.keyword === 'Publications') {
    //         tag.classList.add("active");
    //     } else {
    //         tag.classList.remove("active");
    //     }
    // });
    document.querySelectorAll(".portfolio-tag").forEach(function(tag) {
        tag.classList.add("active");
    });
    filterPortfolioItems();

    // Modal transition handling
    var originModal;

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(function (element) {
        element.addEventListener('click', function (event) {
            var targetModal = document.querySelector(this.getAttribute('data-bs-target'));
            originModal = document.querySelector(this.getAttribute('data-origin-modal'));

            if (originModal) {
                targetModal.addEventListener('hidden.bs.modal', function () {
                    var modal = new bootstrap.Modal(originModal);
                    modal.show();
                }, { once: true });
            }
        });
    });
});