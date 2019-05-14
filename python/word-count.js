function wordCount(data) {
  let pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
  let m = data.match(pattern)
  let count = 0
  if (m == null) {
    return count
  }
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  Rege
  return count
}

            string test = @"测试，一下。     one line;
And               ano-
ther line.
ssss_ss we'are
  空格        制表符
";
            richTextBox1.Text = test;
            richTextBox2.Text += "英文单词数：".PadRight(10) + Regex.Matches(test, @"(?i)[a-z_'-]+").Count + "\n";
            richTextBox2.Text += "汉字数：".PadRight(10) + Regex.Matches(test, @"[\u0391-\uFFE5]").Count + "\n";
            richTextBox2.Text += "字符数（计空格）：".PadRight(10) + Regex.Matches(test, @"[^\r\n]").Count + "\n";
            richTextBox2.Text += "字符数（不计空格）：".PadRight(10) + Regex.Matches(test, @"[^\s]").Count + "\n";




let textValue = value;
                textValue = textValue.replace(/[\r\n]/g,' ');// 换行用空格代替
                // 单独统计中文个数
                let chineseCount = textValue.match(/[^\x00-\xff]/g);
                console.log('前：', value, chineseCount);

                // 去除中文计数，只记录英文
                textValue = textValue.replace(/[^\x00-\xff]/g, ' ');
                textValue = textValue.replace(/[\u0000-\u0019]|[\u0021-\u00FF]/g, 'a');//所有除空格外的半角符变为a
                textValue = textValue.replace(/a+/g, 's');//把字符串变成s
                textValue = textValue.replace(/\s+/g, ' ');// 多个空格合并为1个
                textValue = textValue.trim(); // 去除前后空格

                console.log('后', textValue);
                return textValue.split(' ').length + (chineseCount ? chineseCount : 0); // 有可能返回null

                