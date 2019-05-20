package main

import "fmt"
import "math"

func main() {
	inputArr := []int {0, -3, 6, 8, -20, 21, 8, -9, 10, -1, 3, 6, 5}
	sum := maxSubSeq(inputArr)
	fmt.Println(sum)
}

func maxSubSeq(nums []int) int{
	maxSum := nums[0]
	sum := 0
	for i := 0; i < len(nums); i++ {
		sum += nums[i]
		maxSum = int(math.Max(float64(maxSum), float64(sum)))
		if sum < 0 {
			sum = 0
		}
	}
	return maxSum
}