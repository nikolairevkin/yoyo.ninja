$(document).ready(function() {
    var checked = [];
    $('#table-form :checkbox').change(function() {
        if (this.checked) {
            checked.push($(this).val());
            console.log(checked);
        }
    })
})