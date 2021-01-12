


let fun = {
  lastLen: 0,
  interval: {},
  keywords: ["什么专业","年龄","这是什么语言"],
  keywordsObj: {
    "年龄": "年龄要保密的啦~(自动回复)",
    "这是什么语言": "是javaScript~(自动回复)",
    "什么专业": "up是日语专业哦(自动回复)"
  },
  setint() {
    fun.interval = setTimeout(()=>{
      console.log("start");
      let len = $("#chat-items").children().length;
      if (len > fun.lastLen) fun.wordsInit();
    },1000);
  },
  // 获取最新的单词列表
  wordsInit() {
    var words = fun.getWords();
    var needrecall = fun.checkKeywords(words);
    console.log(needrecall);
    if (needrecall.length) this.recall(needrecall);
  },
  // 回复
  recall(data) {
    for (var i = 0; i < data.length; i++) {
      setTimeout(()=>{
        $(".chat-input.border-box")[0].value = data[i];
        $(".bl-button.live-skin-highlight-button-bg.live-skin-button-text.bl-button--primary.bl-button--small")[0].click();
      },500);
    }
  },
  // 检测是否含关键词
  checkKeywords(data) {
    var needwords = [];
    var length = data.length;
    var keywordsLength = fun.keywords.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < keywordsLength; j++) {
        if (data[i] && data[i].indexOf(fun.keywords[j])>-1) needwords.push(fun.keywordsObj[fun.keywords[j]]);
      }
    }
    return needwords;
  },
  // 从dom中获取新的文字数组
  getWords() {
    var list = $("#chat-items").children();
    var strArr = list.slice(fun.lastLen);
    var arr = [];
    var length = strArr.length;
    for (var i = 0; i < length; i++) {
      arr.push(strArr[i].dataset.danmaku);
    }
    fun.lastLen+= length;
    return arr;
  },
  init() {
    // 
    fun.setint();
  }
}


fun.init();
