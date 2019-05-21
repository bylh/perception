/*
 * @lc app=leetcode.cn id=5 lang=golang
 *
 * [5] 最长回文子串 
 babad  bab aba
 */
package main

import "fmt"

func main() {
	s := "fg abcddcba e"
	sr := "e abcddcba fg"

	fmt.Println(longestPalindrome(s), sr)
}
// 动态规划
func longestPalindrome(s string) string {
	min := 0
	max := 0
	slen := len(s)

	for i := 0; i < slen; i++ {
	    // find longest palindromic substring with odd length and center at i
		l := i
		h := i
		for l >= 0 && h < slen && s[l] == s[h] {
			l--
			h++
		}
		if h-l-1 > max-min {
			min = l + 1
			max = h
		}

	    // find longest palindromic substring with even length and center at i,i+1
		l = i
		h = i + 1
		for l >= 0 && h < slen && s[l] == s[h] {
			l--
			h++
		}
		if h-l-1 > max-min {
			min = l + 1
			max = h
		}
	}

	return s[min:max]
}

