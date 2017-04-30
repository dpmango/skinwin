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

    $('.btn-menu .icon').click(function () {
        $(this).parent().toggleClass('is-btn-open');
    });

    // switcher
    $('.switch').each(function () {
        var $t = $(this), $items = $('.switch-item', $t), $nav =  $('.switch-next, .switch-prev', $t), len = $items.length, i = 0;

        $nav.click(function () {
            if($(this).hasClass('switch-next') && i + 1 < len) {
                i++;
            } else if ($(this).hasClass('switch-prev') && i > 0) {
                i--;
            }

            if(i + 1 < len) {
                $nav.filter('.switch-next').removeClass('inactive');
            } else {
                $nav.filter('.switch-next').addClass('inactive');
            }

            if(i == 0) {
                $nav.filter('.switch-prev').addClass('inactive');
            } else {
                $nav.filter('.switch-prev').removeClass('inactive');
            }

            $items.removeClass('is-active').eq(i).addClass('is-active');
        });
    });

})();
