$(document).ready(function () {

  // 2.1 Form validion (Moldir)
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

  // 2.2 Search & Filter (Ingkar)
  if ($('#portfolioGallery').length) {

    let activeCat = 'all';

    function filter() {
      const q = $('#searchInput').val().toLowerCase().trim();
      let shown = 0;

      $('#portfolioGallery .gallery-item').each(function () {
        const $i = $(this);
        const title = ('' + $i.data('title')).toLowerCase();
        const cat = ('' + $i.data('category')).toLowerCase();

        const matchText = title.indexOf(q) !== -1;
        const matchCat = activeCat === 'all' || cat === activeCat;

        if (matchText && matchCat) { $i.show(); shown++; }
        else { $i.hide(); }
      });

      $('#noResults').toggle(shown === 0);
    }

    $('#searchInput').on('input', filter);

    $('.filter-btn').on('click', function () {
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');
      activeCat = $(this).data('category');
      filter();
    });
  }

  // 2.3 Crud table (Ingkar)
  if ($('#packagesBody').length) {

    let packages = [
      { id: 1, name: 'Mini Session',      duration: '30 min',  photos: '10 edited photos',   price: '$80' },
      { id: 2, name: 'Standard Portrait', duration: '1 hour',  photos: '25 edited photos',   price: '$150' },
      { id: 3, name: 'Wedding Full Day',  duration: '8 hours', photos: '300+ edited photos', price: '$1.200' },
      { id: 4, name: 'Event Coverage',    duration: '4 hours', photos: '150 edited photos',  price: '$650' }
    ];
    let nextId = 5;
    const modal = new bootstrap.Modal(document.getElementById('packageModal'));

    function esc(s) { return $('<div>').text(s).html(); }

    function render() {
      const $body = $('#packagesBody').empty();
      $('#emptyRowMsg').toggle(packages.length === 0);

      packages.forEach(function (p) {
        $body.append(
          '<tr>' +
            '<td>' + esc(p.name) + '</td>' +
            '<td>' + esc(p.duration) + '</td>' +
            '<td>' + esc(p.photos) + '</td>' +
            '<td>' + esc(p.price) + '</td>' +
            '<td class="crud-actions">' +
              '<button class="btn-edit" data-id="' + p.id + '">Edit</button> ' +
              '<button class="btn-delete" data-id="' + p.id + '">Delete</button>' +
            '</td>' +
          '</tr>'
        );
      });
    }

    $('#addPackageBtn').on('click', function () {
      $('#packageForm')[0].reset();
      $('#packageId').val('');
      $('#packageModalTitle').text('Add Package');
      modal.show();
    });

    $('#packagesBody').on('click', '.btn-edit', function () {
      const id = parseInt($(this).data('id'), 10);
      const p = packages.find(function (x) { return x.id === id; });
      if (!p) return;
      $('#packageId').val(p.id);
      $('#pkgName').val(p.name);
      $('#pkgDuration').val(p.duration);
      $('#pkgPhotos').val(p.photos);
      $('#pkgPrice').val(p.price);
      $('#packageModalTitle').text('Edit Package');
      modal.show();
    });

    $('#packagesBody').on('click', '.btn-delete', function () {
      const id = parseInt($(this).data('id'), 10);
      const p = packages.find(function (x) { return x.id === id; });
      if (!p) return;
      if (!confirm('Delete "' + p.name + '"? This cannot be undone.')) return;
      packages = packages.filter(function (x) { return x.id !== id; });
      render();
    });

    $('#packageForm').on('submit', function (e) {
      e.preventDefault();
      const id = $('#packageId').val();
      const data = {
        name:     $('#pkgName').val().trim(),
        duration: $('#pkgDuration').val().trim(),
        photos:   $('#pkgPhotos').val().trim(),
        price:    $('#pkgPrice').val().trim()
      };
      if (!data.name || !data.duration || !data.photos || !data.price) return;

      if (id) {
        const n = parseInt(id, 10);
        const i = packages.findIndex(function (x) { return x.id === n; });
        if (i !== -1) packages[i] = Object.assign({ id: n }, data);
      } else {
        packages.push(Object.assign({ id: nextId++ }, data));
      }
      render();
      modal.hide();
    });

    render();
  }

  // 2.4 Image Gallery (Moldir)
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