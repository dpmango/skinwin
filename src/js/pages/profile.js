(function () {
    var category = 'history', subCategory = 'csgo',
        activeClassCategory = 'c-aqua', activeClassSubCategory = 'fw-400 c-aqua td-underline',
        $catBtns = $('#stat_category').find('.tab-link'), $subCatBtns = $('#stat_subcategory').find('.tab-link'), $statTables = $('.l-table');

    $catBtns.click(function () {
        var key = $(this).attr('data-key');
        if(key != category) {
            $catBtns.removeClass(activeClassCategory);
            $(this).addClass(activeClassCategory);
            category = key;
            showStatTable();
        }
    });

    $subCatBtns.click(function () {
        var key = $(this).attr('data-key');
        if(key != subCategory) {
            $subCatBtns.removeClass(activeClassSubCategory);
            $(this).addClass(activeClassSubCategory);
            subCategory = key;
            showStatTable();
        }
    });

    var showStatTable = function () {
        $statTables.addClass('is-hidden')
            .filter('.tab-' + category + '.tab-' + subCategory).removeClass('is-hidden');
    };
})();
