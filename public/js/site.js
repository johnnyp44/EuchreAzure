// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {
    var selects = $('select.magic-select');
    $(selects).bind('change', function (evt) {
        var newVal = $(this).val(), oldVal = $(this).data('old-val');
        if (newVal != 0) {
            $(selects).not(this).find('option[value="' + newVal + '"]').attr('disabled', 'disabled');
        }

        $(selects).not(this).find('option[value="' + oldVal + '"]').removeAttr('disabled');
        $(this).data('old-val', newVal);
    });
});

$('.single-checkbox').on('change', function () {
    if ($('.single-checkbox:checked').length > 2) {
        this.checked = false;
    }
});

$('.single-checkbox2').on('change', function () {
    if ($('.single-checkbox2:checked').length > 2) {
        this.checked = false;
    }
});

$('.single-checkbox4').on('change', function () {
    if ($('.single-checkbox2:checked').length > 4) {
        this.checked = false;
    }
});
