/* 单词统计 */
function count(str) {
  var value = str
  //标点转换为空格
  value = value.replace(
    /[\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,
    ' '
  )
  //统计中文个数
  var chinese = value.match(/[\u4e00-\u9fa5]/g)
  //去除中文
  value = value.replace(/[\u4e00-\u9fa5]+/g, ' ')
  // 将换行符，前后空格替换为空格
  value = value.replace(/\n|\r|^\s+|\s+$/gi, ' ')
  // 多个空格替换成一个空格
  value = value.replace(/\s+/gi, ' ')
  // 更新计数
  var length = 0
  var match = value.match(/\s/g)
  if (match) {
    length = match.length + 1
  } else if (value) {
    length = 1
  }
  length = length + (chinese ? chinese.length : 0);
  return length;
}
/* 单词统计 */

function toText(HTML) {
  var input = HTML
  return input
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<[^>]+?>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, ' ')
    .replace(/>/g, ' ')
}