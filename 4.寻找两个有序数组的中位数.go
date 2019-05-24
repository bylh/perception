/*
 * @lc app=leetcode.cn id=4 lang=golang
 *
 * [4] 寻找两个有序数组的中位数
 */

package main

func main() {

}

// 123 1234
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {

	len1 := len(nums1)
	len2 := len(nums2)
	len := len1 + len2
	var nums []int
	if nums1[0] > nums2[len2-1] {
		// numus2 nums1
		nums = append(nums2, nums1...)
	} else if nums1[len1-1] < nums2[0] {
		// nums1 nums2
		nums = append(nums1, nums2...)
	} else {
		current := 0
		if nums1[0] < nums2[0] {
			// nums1 nums2
			current = len1
			for i := 0; i < current; i++ {
				if nums2[0] < nums1[current / 2] {
					current = current / 2
				}
			}
		} else {
			// nums2 nums1
			current = len2
		}
	}

	mid := 0
	if len%2 == 0 {
		mid = nums[(len-1)/2]
	} else {
		mid = (nums[len/2] + nums[len/2-1]) / 2
	}
	return float64(mid)
}
