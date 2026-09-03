(function () {
  var isEN = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0;
  var T = isEN ? {
    reqFields: 'Please complete your name, phone and email.',
    badEmail: 'Please check your email address.',
    subject: 'Rental application — ',
    hName: 'Name', hPhone: 'Phone', hEmail: 'Email', hProp: 'Property', hMsg: 'Message',
    intro: 'Rental application — VanRose Real Estate'
  } : {
    reqFields: 'Completa tu nombre, teléfono y correo.',
    badEmail: 'Revisa tu correo, no parece válido.',
    subject: 'Solicitud de renta — ',
    hName: 'Nombre', hPhone: 'Teléfono', hEmail: 'Correo', hProp: 'Propiedad', hMsg: 'Mensaje',
    intro: 'Solicitud de renta — VanRose Real Estate'
  };

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var hamb = document.getElementById('hamb');
  var menu = document.getElementById('menu');
  if (hamb && menu) {
    hamb.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  var playBtn = document.getElementById('playBtn');
  var video = document.getElementById('walk');
  var tag = document.querySelector('.media-tag');
  if (playBtn && video) {
    playBtn.addEventListener('click', function () {
      video.play();
      playBtn.style.display = 'none';
      if (tag) tag.style.display = 'none';
    });
    var restore = function () {
      if (video.ended || video.paused) {
        playBtn.style.display = 'flex';
        if (tag) tag.style.display = 'block';
      }
    };
    video.addEventListener('ended', restore);
  }

  var form = document.getElementById('rentForm');
  var err = document.getElementById('formErr');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      var tel = form.tel.value.trim();
      var correo = form.correo.value.trim();
      var prop = form.prop.value;
      var msg = form.msg.value.trim();

      if (!nombre || !tel || !correo) { err.textContent = T.reqFields; err.style.display = 'block'; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) { err.textContent = T.badEmail; err.style.display = 'block'; return; }
      err.style.display = 'none';

      var body =
        T.intro + '%0D%0A%0D%0A' +
        T.hName + ': ' + encodeURIComponent(nombre) + '%0D%0A' +
        T.hPhone + ': ' + encodeURIComponent(tel) + '%0D%0A' +
        T.hEmail + ': ' + encodeURIComponent(correo) + '%0D%0A' +
        T.hProp + ': ' + encodeURIComponent(prop) + '%0D%0A' +
        T.hMsg + ': ' + encodeURIComponent(msg);

      window.location.href =
        'mailto:Cristel.noel@icloud.com?subject=' +
        encodeURIComponent(T.subject + nombre) + '&body=' + body;
    });
  }
})();
