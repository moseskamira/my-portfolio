
// =================== COBWEB ANIMATION ===================

var canvas = document.getElementById('cobweb');

if (canvas && canvas.getContext) {

    var ctx = canvas.getContext('2d');

    var width;
    var height;

    var POINT_COUNT = 40;
    var CONNECTION_DISTANCE = 150;
    var points = [];

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resizeCanvas();

    // Create animation points
    for (var i = 0; i < POINT_COUNT; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1
        });
    }

    function drawCobweb() {

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(0, 123, 255, 0.15)';
        ctx.lineWidth = 1;

        for (var i = 0; i < POINT_COUNT; i++) {

            var p1 = points[i];

            p1.x += p1.vx;
            p1.y += p1.vy;

            // Keep points inside the canvas
            if (p1.x < 0 || p1.x > width) {
                p1.vx *= -1;
            }

            if (p1.y < 0 || p1.y > height) {
                p1.vy *= -1;
            }

            // Connect nearby points
            for (var j = i + 1; j < POINT_COUNT; j++) {

                var p2 = points[j];

                var dx = p1.x - p2.x;
                var dy = p1.y - p2.y;

                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();

                }
            }
        }

        requestAnimationFrame(drawCobweb);
    }

    drawCobweb();

    window.addEventListener('resize', resizeCanvas);

}


// =================== INTERSECTION OBSERVERS ===================

if ('IntersectionObserver' in window) {

    // Skills animation
    var skills = document.querySelectorAll('.skill');

    var observerSkills = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerSkills.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.3
    });

    skills.forEach(function (skill) {
        observerSkills.observe(skill);
    });


    // Experience and project animations
    var cards = document.querySelectorAll(
        '.experience-item, .project-item'
    );

    var observerCards = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerCards.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(function (card) {
        observerCards.observe(card);
    });


    // Timeline animation
    var items = document.querySelectorAll('.timeline-item');

    var observerTimeline = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observerTimeline.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.2
    });

    items.forEach(function (item) {
        observerTimeline.observe(item);
    });

} else {

    // Show content if IntersectionObserver is unavailable
    var animatedElements = document.querySelectorAll(
        '.skill, .experience-item, .project-item, .timeline-item'
    );

    for (var k = 0; k < animatedElements.length; k++) {
        animatedElements[k].classList.add('visible', 'show');
    }

}
