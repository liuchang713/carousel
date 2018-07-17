  var left = document.getElementById('left')
  var right = document.getElementById('right')
  var main = document.getElementById('main')
  var contain = document.getElementsByClassName('container')[0]
  var buttons = document.getElementsByTagName('span')
  var index = 1
  var animateFlag = false
  var isAuto = true
  var timer 

  function carousel(data, width){
    var length = data.length
    var subChild = '<img src="'+data[length-1]+'">'
    for(var i=0;i<length;i++){
      subChild += '<img src="'+data[i]+'">'
    }
    subChild += '<img src="'+data[0]+'">'
    main.innerHTML = subChild
  }

  play()
  
  //自动轮播
  function play() {
   timer =  setInterval(function(){
      moveContian()
    },2000)
  }

  //轮播结束
  function stop(){
    clearInterval(timer)
  }
  //移动
  function moveContian(e) {
    if (animateFlag){
      return
    }
    if (e) {
      isAuto = false
      stop()
    }
    if (e == undefined|| e.target.id == 'right'){
        index ++ 
        animate(-400)
    } else if (e.target.id == 'left') {
        index --
        animate(400)
    }
  }

  //平滑的移动的动画
  function animate(offset){
    var newLeft = parseInt(main.style.left) + offset
    var speed = offset / 20
    animateFlag = true
    function go(){
      if((speed < 0 && parseInt(main.style.left) > newLeft) || (speed > 0 && parseInt(main.style.left) < newLeft)) {
        main.style.left = parseInt(main.style.left) + speed + 'px'
        setTimeout(go,10)
      } else {
        animateFlag = false
        main.style.left = newLeft + 'px'
        if (index == 5){
          index = 1
          main.style.left = -400 + 'px'
        } else if (index == 0) {
          index = 4
          main.style.left = -1600 + 'px'
        }
        showButtons()
        if (!isAuto) {
          isAuto = true
          play()
        }
      }
    }
    go()
  }
   
  function showButtons(){
    for (let i=0;i<buttons.length;i++){
      buttons[i].className = ''
    }
    buttons[index-1].className = 'special-color'
  }

 // 点击焦点
  for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',function(){
      if (this.className == 'special-color'){
        return
      }
      isAuto = false
      stop()
      let nowIndex = this.getAttribute('index')
      let offset = -400 * (nowIndex - index)
      index = nowIndex
      animate(offset)
    },false)
  }  

  right.addEventListener('click',moveContian,false)

  left.addEventListener('click', moveContian,false)
