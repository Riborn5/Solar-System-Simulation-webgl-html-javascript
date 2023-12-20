document.addEventListener('DOMContentLoaded', function() {
    var toggleArrows = document.querySelectorAll('.toggleArrow');

    toggleArrows.forEach(function(arrow) {
        arrow.addEventListener('click', function() {
            var content = this.nextElementSibling.nextElementSibling;
            if (content.style.display === 'none') {
                content.style.display = 'block';
                this.innerHTML = '&#x25B2;'; // Up arrow
            } else {
                content.style.display = 'none';
                this.innerHTML = '&#x25BC;'; // Down arrow
            }
        });
    });
});
