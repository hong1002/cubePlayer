const player = e('audio')
const m0 = {
	singer: '光GENJI',
	name: '勇気100%',
	duration: '04:11',
	wholeName: '光GENJI - 勇気100%.mp3',
}
const m1 = {
	singer: 'Beast',
	name: '下雨的日子',
	duration: '03:45',
	wholeName: 'Beast - 下雨的日子.mp3',
}
const m2 = {
	singer: 'wacci',
	name: '大丈夫',
	duration: '04:46',
	wholeName: 'wacci - 大丈夫.mp3',
}
const m3 = {
	singer: '戴荃',
	name: '悟空',
	duration: '03:20',
	wholeName: '戴荃 - 悟空.mp3',
}
const m4 = {
	singer: '李蚊香',
	name: '樱花樱花想见你',
	duration: '04:59',
	wholeName: '李蚊香 樱花樱花想见你.mp3',
}
const m5 = {
	singer: '青山テルマ、SoulJa',
	name: 'そばにいるね',
	duration: '05:04',
	wholeName: '青山テルマ、SoulJa - そばにいるね.mp3',
}
const m6 = {
	singer: '山猿',
	name: '無口な明日を嫌わないで',
	duration: '04:24',
	wholeName: '山猿 - 無口な明日を嫌わないで.mp3',
}
const Musics = [m0, m1, m2, m3, m4, m5, m6]
const musicRoute = 'music/'


// 给列表图标绑定事件
var bindListIcon = function() {
    // 进入歌曲列表
    var listIcon = e('.list')
    bindEvent(listIcon, 'click', function(event) {
        var target = event.target
        // log('点击列表图标')
        var listTarget = e('.musicList')
        listTarget.classList.add('musiclistActive')
    })

    // 点击空白处回到回来页面
    var mlist = e('.musicList')
    bindEvent(mlist, 'click', function(event) {
        var target = event.target
        if (target.classList.contains('musicList')) {
            toggleClass(mlist, 'musiclistActive')
        }
    })
}

// 添加歌曲到列表
var musicList = function() {
	var con = e('.musicList')
	for (var i = 0; i < Musics.length; i++) {
 		var	formEven = '<div class="hs-music-listSong even">'
		var formOdd = '<div class="hs-music-listSong odd">'
		var formChild = `
					<span class="hs-listSong-icon"></span>
					<span class="hs-listSong">${i + 1}</span>
					<span class="hs-listSong-song">${Musics[i].name}</span>
					<span class="hs-listSong-time">${Musics[i].duration}</span>
					<span class="hs-listSong-singer">${Musics[i].singer}</span>
		`
		if(i % 2 === 0) {
			var form = formEven + formChild + '</div>'
		}else {
			var form = formOdd + formChild + '</div>'
		}
		con.innerHTML += form
	}
}

var curIconChange = function(index) {
			// 点亮播放图标
			var listSong = es('.hs-music-listSong')[index]
			var icon = listSong.querySelector('.hs-listSong-icon')
			// log('icon',icon)
			if(icon != null) {
				icon.classList.remove('hs-listSong-icon')
				var i = e('.hs-listSong-icon-play')
				if(i != null) {
					i.classList.remove('hs-listSong-icon-play')
					i.classList.add('hs-listSong-icon')
				}
				icon.classList.add('hs-listSong-icon-play')
			}
}

// 给歌曲列表绑定点击播放事件
var bindMusicList = function() {
    bindAll('.hs-music-listSong', 'click', function(event) {
        var target = event.target
        // log('点击歌曲',target)
        var listSong = target.parentElement
        if (target.classList.contains('hs-music-listSong')) {
            listSong = target
        }
        // 播放音乐
        var index = listSong.querySelector('.hs-listSong').innerHTML
        index = parseInt(index) -1
        player.dataset.index = index
        player.src = musicRoute + Musics[index].wholeName
        playMusic()
        changeName(index)
				curIconChange(index)

    })
}
// 在播放列表里面播放音乐
var playMusic = function() {
      //如果当前没有在播放歌曲，就点一次主界面的播放按钮
      //但是如果当前在播放歌曲，就先暂停一次，然后再播放
      //这样是为了保证主界面的播放暂停按钮保持一致。
      var playIcon = e('img.play')
      var state = playIcon.dataset.state
      if (state == 'pause') {
          setTimeout(function(){
            playIcon.click()
          }, 1000)
      } else if (state == 'play') {
            setTimeout(function(){
              playIcon.click()
            }, 1000)
            setTimeout(function(){
              playIcon.click()
            }, 1000)
      }
}

// 给主界面播放按钮绑定事件
var bindPlay = function() {
    var playIcon = e('img.play')
    bindEvent(playIcon, 'click', function() {
        var state = playIcon.dataset.state
        if (state == 'pause') {
            bindEvent(player, 'canplay', function() {
                player.play()
            })
            player.play()
            playIcon.dataset.state = 'play'
            playIcon.src = 'img/pause.png'
        } else if (state == 'play') {
              player.pause()
              playIcon.dataset.state = 'pause'
              playIcon.src = 'img/play.png'
        }
				var index = parseInt(player.dataset.index)
				curIconChange(index)
    })
}

// 上一首，下一首绑定
var bindPreNext = function() {
    bindAll('.pn', 'click', function(event) {
        var target = event.target
        var nums = Musics.length
        var index = parseInt(player.dataset.index)
        var offset = parseInt(target.dataset.offset)
        var nextI = (nums + index + offset) % nums
        player.dataset.index = nextI
        player.src = musicRoute + Musics[nextI].wholeName
        playMusic()
        changeName(nextI)
				curIconChange(nextI)
    })
}

// 换歌曲名字
var changeName = function(index) {
    var name = e('.songname')
    var form = `${Musics[index].name} -- ${Musics[index].singer}`
    name.innerHTML = form
}

var playMode = function(offset) {
    var next = e('.next')
    next.dataset.offset = offset
    bindEvent(player, 'ended', function() {
        next.click()
    })
}

// 改变播放模式
var changeMode = function() {
    var modeIcon = e('.mode')
    bindEvent(modeIcon, 'click', function() {
        var mode = modeIcon.dataset.mode
        if (mode == 'loop') {
            modeIcon.src = 'img/random.png'
            modeIcon.dataset.mode = 'random'
            var offset = Math.floor(Math.random() * 10)
            playMode(offset)
        } else if (mode == 'random') {
            modeIcon.src = 'img/one.png'
            modeIcon.dataset.mode = 'one'
            playMode(0)
        } else if (mode == 'one') {
            modeIcon.src = 'img/loop.png'
            modeIcon.dataset.mode = 'loop'
            playMode(1)
        }
    })
}

var __main = function() {
    bindListIcon()
    musicList()
    bindMusicList()
    bindPlay()
    bindPreNext()
    changeMode()
    playMode(1)
}

__main()
