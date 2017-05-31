var songList = [
    {name: '当你老了', src: 'static/media/1.mp3'},
    {name: 'My soul', src: 'static/media/2.mp3'},
    {name: 'MKAlieZ-a0v', src: 'static/media/3.mp3'},
]

//点击歌曲列表切换歌曲
var bindSwitch = function() {
    $('.main-song-name').on('click', function(event) {
        var player = $('audio')[0]
        var target = $(event.target)
        var songName = target.html()
        var src = target.data('src')
        $('h2').text(songName)
        player.src = src
    })
    $('#id-audio-player').on('canplay', function(event) {
        var player = $('audio')[0]
        var t = player.duration
        var time = templateTime(t)
        $('#time-runnable').val(0)
        $('#time-currenttime').text('0:00')
        $('#time-alltime').text(time)
    })
}
//点击按钮切换歌曲
var bindPlayEvents = function() {
    $('.player-icon').on('click', 'i', function(event) {
        console.log(1);
        var target = $(event.target)
        var type= target[0].dataset.action
        console.log(type);
        var actions = {
            prev : prevSong,
            pause : pauseSong,
            play : playSong,
            next : nextSong,
            mute : mutedSong,
            unmute : unmutedSong,
        }
        actions[type](target)
    })
}
//播放歌曲
var playSong = function(target) {
    var player = $('#id-audio-player')[0]
    player.play()
    target[0].dataset.action = 'pause'
    target.removeClass('fa-play')
    target.addClass('fa-pause')
}
//暂停歌曲
var pauseSong = function(target) {
    var player = $('#id-audio-player')[0]
    player.pause()
    target[0].dataset.action = 'play'
    target.removeClass('fa-pause')
    target.addClass('fa-play')
}
//静音
var mutedSong = function(target) {
    var player = $('#id-audio-player')[0]
    player.muted = true
    target[0].dataset.action = 'unmute'
    target.removeClass('fa-volume-up')
    target.addClass('fa-volume-off')
}
//关闭静音
var unmutedSong = function(target) {
    var player = $('#id-audio-player')[0]
    player.muted = false
    target[0].dataset.action = 'mute'
    target.removeClass('fa-volume-off')
    target.addClass('fa-volume-up')
}
//上一首歌曲信息
var prevName = function() {
    var name = $('h2').text()
    for (var i = 0; i < songList.length; i++) {
        if(songList[i].name === name) {
            var song
            if(i === 0) {
                return song = songList[songList.length - 1]
            }
            return song = songList[i - 1]
        }
    }
}
//上一首
var prevSong = function() {
    $('h2').text(prevName().name)
    $('audio')[0].src = prevName().src
}
//下一首歌曲信息
var nextName = function() {
    var name = $('h2').text()
    for (var i = 0; i < songList.length; i++) {
        if(songList[i].name === name) {
            var song
            if(i === (songList.length - 1)) {
                return song = songList[0]
            }
            return song = songList[i + 1]
        }
    }
}
//下一首
var nextSong = function() {
    var songMessage = nextName()
    $('h2').text(songMessage.name)
    $('audio')[0].src = songMessage.src
}
//设置播放时间
var setTime = function(value) {
    var player = $('audio')[0]
    var time = player.duration * value / 100
    player.currentTime = time
}
//拖动滑条改变歌曲进度,拖动音量滑条改变音量
var bindTimeSlider = function() {
    var player = $('audio')[0]
    $('#time-runnable').on('change', function(event) {
        var value = event.target.value
        setTime(value)
    })
    $('#id-input-volume').on('change', function(event) {
        var value = event.target.value
        player.volume = value / 100
    })
}
//滑条时间模板化
var setSliderTime = function(value) {
    var v = value * 100
    $('#time-runnable').val(v)
}
//滑条跟着播放移动
var bindAudioEvents = function() {
    var player = $('audio')[0]
    $('#id-audio-player').on('timeupdate', function() {
        var value = player.currentTime / player.duration
        setSliderTime(value)
        var time = templateTime(player.currentTime)
        $('#time-currenttime').text(time)
    })
}
//时间模板化
var templateTime = function(time) {
    var minutes = Math.floor(time / 60)
    var seconds = Math.floor(time % 60)
    if(seconds < 10) {
        seconds = '0' + seconds
    }
    var t = `${minutes}:${seconds}`
    return t
}
//单曲播放
var playLoop = function() {
    $('audio').attr('loop', 'loop')
    $('audio')[0].play()
    $('audio').removeAttr('loop')
}
//列表循环
var playList = function() {
    var songMessage = nextName()
    $('h2').text(songMessage.name)
    $('audio')[0].src = songMessage.src
 }
//随机播放
var playRandom = function() {
    var index =Math.floor(Math.random() * songList.length)
    songMessage = songList[index]
    $('h2').text(songMessage.name)
    $('audio')[0].src = songMessage.src
}
//播放模式监听
var bindListEvents = function() {
    $('#id-audio-player').on('ended', function() {
        var text = $('.player-icon-mode').text()
        var playmode = {
            '单曲循环': playLoop,
            '列表循环': playList,
            '随机播放': playRandom,
        }
        playmode[text]()
    })
    // $('.player-icon').on('click', 'i', function() {
    //     var text = $('.player-icon-mode').text()
    //     console.log(text);
    //     var playmode = {
    //         '单曲循环': playLoop,
    //         '列表循环': playList,
    //         '随机播放': playRandom,
    //     }
    //     playmode[text]()
    // })
    // $('.mute').on('click', function() {
    //     if ($(this)[0].dataset.action == 'mute') {
    //         mutedSong($(this))
    //     }else {
    //         unmutedSong($(this))
    //     }
    // })
}
//播放模式选择
var bindModeEvents = function() {
    $('.player-icon-mode').on('click', function() {
        if($('.player-mode').hasClass('player-list')) {
            $('.player-mode').removeClass('player-list')
        }else {
            $('.player-mode').addClass('player-list')
        }
    })
    $('.player-mode li').on('click',  function() {
        var text = $(this).text()
        $('.player-icon-mode').text(text)
        $('.player-mode').addClass('player-list')
    })
}
//事件集合
var bindEvents = function() {
    bindSwitch()
    bindTimeSlider()
    bindAudioEvents()
    bindPlayEvents()
    bindModeEvents()
    bindListEvents()
}

var __main = function() {
    bindEvents()
}

$('document').ready(function() {
    __main()
})
