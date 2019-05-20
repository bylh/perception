package main

import "fmt"
import "strings"
import "unicode/utf8"

func main() {
	test := "12测试"
	testRune := []rune(test)
	fmt.Println("测试", testRune[0:4], len(test), len(testRune), utf8.RuneCountInString(test));
	str := "abcabcbb"
	fmt.Println("最大无重复子串", lengthOfLongestSubstring(str))
	// fmt.Println("测试最大无重复子串", lengthOfLongestSubstring("aab"), len(" "))
}
func lengthOfLongestSubstring(s string) int {
	if len(s) == 0 {
		return 0
	}
	maxLen := 0
	str := ""
	for _, char := range s {
		matchIndex := strings.Index(str, string(char))
		if matchIndex != -1 {
			runeStr := []rune(str)
			str = string(runeStr[matchIndex + 1:len(runeStr)])
		}
		str = strings.Join([]string{str, string(char)}, "")

		if (maxLen < len([]rune(str))) {
			maxLen = len([]rune(str));
		}
	}
	return maxLen
}