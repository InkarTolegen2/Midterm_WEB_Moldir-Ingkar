$(document).ready(function () {

  // 2.1 Form valiidation (Moldir)
  if ($('#registerForm').length) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFeedback($el, msg, ok) {
      $el.text(msg).removeClass('success error').addClass(ok ? 'success' : 'error');
      return ok;
    }

    function validateName() {
      const v = $('#regName').val().trim();
      const $f = $('#nameFeedback');
      if (v === '') return setFeedback($f, 'Name is required', false);
      if (v.length < 2) return setFeedback($f, 'Too short (min 2 characters)', false);
      return setFeedback($f, 'Looks good', true);
    }

    function validateEmail() {
      const v = $('#regEmail').val().trim();
      const $f = $('#emailFeedback');
      if (v === '') return setFeedback($f, 'Email is required', false);
      if (!emailRegex.test(v)) return setFeedback($f, 'Wrong email format', false);
      return setFeedback($f, 'Valid email', true);
    }

    function validatePassword() {
      const pwd = $('#regPassword').val();
      const $f = $('#passwordFeedback');
      const $bar = $('#strengthBar');

      if (pwd === '') {
        $bar.attr('class', 'password-meter-bar').width('0%');
        return setFeedback($f, 'Password is required', false);
      }

      let score = 0;
      if (pwd.length >= 8) score++;
      if (/[a-z]/.test(pwd)) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/\d/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;

      let level, msg;
      if (pwd.length < 8 || score <= 3) {
        level = 'weak';
        msg = 'Weak — add uppercase, numbers or symbols';
      } else if (score === 4) {
        level = 'medium';
        msg = 'Medium — add a symbol to make it stronger';
      } else {
        level = 'strong';
        msg = 'Strong password';
      }

      const widths = { weak: '33%', medium: '66%', strong: '100%' };
      $bar.attr('class', 'password-meter-bar ' + level).width(widths[level]);

      return setFeedback($f, msg, level === 'strong');
    }

    function validateConfirm() {
      const pwd = $('#regPassword').val();
      const c = $('#regConfirm').val();
      const $f = $('#confirmFeedback');
      if (c === '') return setFeedback($f, 'Please confirm your password', false);
      if (pwd !== c) return setFeedback($f, "Passwords don't match", false);
      return setFeedback($f, 'Passwords match', true);
    }

    $('#regName').on('input', validateName);
    $('#regEmail').on('input', validateEmail);
    $('#regPassword').on('input', function () {
      validatePassword();
      if ($('#regConfirm').val() !== '') validateConfirm();
    });
    $('#regConfirm').on('input', validateConfirm);

    $('#registerForm').on('submit', function (e) {
      e.preventDefault();

      const ok = validateName() & validateEmail() & validatePassword() & validateConfirm();
      const $alert = $('#formAlert');

      if (ok) {
        $alert.html('<div class="alert alert-success">Registration successful! Welcome.</div>');
        this.reset();
        $('#strengthBar').attr('class', 'password-meter-bar').width('0%');
        $('.feedback').text('').removeClass('success error');
      } else {
        $alert.html('<div class="alert alert-danger">Please fix the errors above.</div>');
      }
    });
  }

  // 2.2 Dynamic Search & Filter Functionality (Ingkar)

  // 2.3 Dynamic Table with CRUD Operations (Ingkar)

  // 2.4 Image Gallery  (Moldir)
  if ($('#lightbox').length) {

    const $lb = $('#lightbox');
    const $img = $('#lightboxImg');
    let current = 0;

    function visibleImgs() {
      return $('#portfolioGallery .gallery-item').filter(':visible').find('img');
    }

    function show(i) {
      const $imgs = visibleImgs();
      if (!$imgs.length) return;
      if (i < 0) i = $imgs.length - 1;
      if (i >= $imgs.length) i = 0;
      current = i;

      const src = $imgs.eq(i).attr('src');
      const alt = $imgs.eq(i).attr('alt');

      $img.fadeOut(150, function () {
        $(this).attr({ src: src, alt: alt }).fadeIn(200);
      });
    }

    $('#portfolioGallery').on('click', '.gallery-item', function () {
      const $imgs = visibleImgs();
      const clicked = $(this).find('img')[0];
      current = $imgs.index(clicked);
      if (current < 0) current = 0;
      show(current);
      $lb.fadeIn(250);
    });

    $('.lightbox-close').on('click', function () { $lb.fadeOut(250); });
    $('.lightbox-prev').on('click', function (e) { e.stopPropagation(); show(current - 1); });
    $('.lightbox-next').on('click', function (e) { e.stopPropagation(); show(current + 1); });

    $lb.on('click', function (e) {
      if (e.target === this) $lb.fadeOut(250);
    });

    $(document).on('keydown', function (e) {
      if (!$lb.is(':visible')) return;
      if (e.key === 'Escape') $lb.fadeOut(250);
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

});