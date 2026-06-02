document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.sf-player').forEach(function(player) {
    var audio = player.querySelector('audio');
    var playBtn = player.querySelector('.sf-play');
    var progress = player.querySelector('.sf-progress');
    var progressBar = player.querySelector('.sf-progress-bar');
    var timeEl = player.querySelector('.sf-time');
    var speedBtn = player.querySelector('.sf-speed');
    var speeds = [1, 1.25, 1.5, 0.75];
    var speedIdx = 0;
    var storageKey = 'sf-pos-' + audio.querySelector('source').src.split('/').pop();

    // Resume position
    var saved = localStorage.getItem(storageKey);
    if (saved) audio.currentTime = parseFloat(saved);

    function fmt(s) {
      var m = Math.floor(s / 60);
      var sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    playBtn.addEventListener('click', function() {
      if (audio.paused) { audio.play(); playBtn.textContent = '⏸'; }
      else { audio.pause(); playBtn.textContent = '▶'; }
    });

    audio.addEventListener('timeupdate', function() {
      if (audio.duration) {
        var pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = pct + '%';
        timeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
        localStorage.setItem(storageKey, audio.currentTime);
      }
    });

    audio.addEventListener('ended', function() {
      playBtn.textContent = '▶';
      localStorage.removeItem(storageKey);
    });

    progress.addEventListener('click', function(e) {
      var rect = progress.getBoundingClientRect();
      var pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    });

    speedBtn.addEventListener('click', function() {
      speedIdx = (speedIdx + 1) % speeds.length;
      audio.playbackRate = speeds[speedIdx];
      speedBtn.textContent = speeds[speedIdx] + 'x';
    });
  });
});
