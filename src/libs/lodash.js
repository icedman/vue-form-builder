const tree = {

  guid () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4()
  },

  findById(node, id) {
    if (node.id == id) {
      return node
    }
    if (node.children) {
      for(var child of node.children) {
        var n = tree.findById(child, id)
        if (n) {
          return n
        }
      }
    }
    return null
  },

  appendChild(parent, node, idx) {
    if (!node.id) {
      node.id = tree.guid()
    }
    node.parent = parent.id
    parent.children = parent.children || []
    if (idx != null && idx != undefined && idx >= 0) {
      parent.children.splice(idx, 0, node)
      return
    }
    parent.children.push(node)
  },

  getChildIndex(parent, child) {
    return (parent.children || []).map(c=>c.id).indexOf(child.id)
  },

  removeChild(parent, node) {
    node.parent = null
    parent.children = parent.children || []
    parent.children = parent.children.filter(c=>c.parent!=null && c.parent!=undefined) 
    parent.children.forEach(c=>{
      tree.removeChild(c, node)
    })
  },

  print(node) {
    console.log(node.name + ':' + node.id)
    var children = node.children || []
    for(var child of children) {
      tree.print(child)
    }
  }

}

const underscore = {
  // underscore
  debounce: function (func, wait) {
    let timeout
    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), wait)
    }
  },

  chunk: function (arr, chunkSize, cache = [], padWith = null) {
    const tmp = [...arr]
    if (padWith !== null) {
      var diff = chunkSize - (arr.length % chunkSize)
      var i
      if (arr.length > chunkSize) {
        for (i = 0; i < diff; i++) tmp.push(padWith)
      } else {
        diff = Math.floor(diff / 2)
        for (i = 0; i < diff; i++) {
          tmp.unshift(padWith)
          tmp.push(padWith)
        }
      }
    }
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
  },

  // UI

  lazy: function () {
    var promises = [];
    var imgs = document.querySelectorAll('img');
    for(var i=0;i<imgs.length;i++) {
      if (imgs[i].dataset.src){
        promises.push(new Promise(function(resolve, reject) {
          imgs[i].src = imgs[i].dataset.src;
          resolve();
        }));
      }
    }

    var bgs = document.querySelectorAll('.lazy');
    for(i=0;i<bgs.length;i++) {
      if (bgs[i].dataset.src) {
        promises.push(new Promise(function(resolve, reject) {
          bgs[i].style.backgroundImage='url("' + bgs[i].dataset.src + '")';
          resolve();
        }));
      }
    }

    Promise.all(imgs);
  },

  fitContent: function () {
    setTimeout(() => {
      var nav = document.querySelector('div.navbar-brand')
      if (!nav)
        return
      var navHeight = nav.getBoundingClientRect().height
      var availableHeight = document.body.clientHeight - navHeight
      var content = document.querySelector('ion-content')
      if (content) {
        content.style.height = (availableHeight + 1) + 'px'
      }
      content = document.querySelectorAll('.fit-content')
      content.forEach(c=>{c.style.height = (availableHeight + 1) + 'px'})
    }, 500); // next tick
  },

  tree: tree
}

export var _ = underscore
