/*
 * @lc app=leetcode.cn id=2 lang=golang
 *
 * [2] 两数相加
 */
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
package main

type ListNode struct {
	Val int
	Next *ListNode
}
func main() {
	test := &ListNode{Val: 4}
	addTwoNumbers(test, test)
}
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	result := &ListNode{}
	current := result
	each_sums := 0

	for l1 != nil || l2 != nil || each_sums != 0{
		if l1 != nil{
			each_sums += l1.Val
			l1 = l1.Next
		}
		if l2 != nil{
			each_sums += l2.Val
			l2 = l2.Next
		}
		current.Next = &ListNode{Val: each_sums % 10}
		each_sums /= 10
		current = current.Next
	}

	return result.Next
}

