package main

import "fmt"

func main() {
	inputArr := []int {0, -3, 6, 8, -20, 21, 8, -9, 10, -1, 3, 6, 5}
	sum := 0
	currentSum := 0
	max := inputArr[0]
	start := 0;
	end := 0;
	for i := 0; i < len(inputArr); i++ {
		if max < inputArr[i] {
			max = inputArr[i]
		}
		currentSum += inputArr[i]
		if currentSum < 0 {
			start = i + 1
			end = i + 1
			currentSum = 0
		}
		if currentSum > sum {
			sum = currentSum
			end = i
		}
		if i == len(inputArr) {
			if start > len(inputArr) {
				start = len(inputArr)
			}
			if end == len(inputArr) {
				end = len(inputArr)
			}
		}
		if max < 0 {
			sum = max;
		}
	}
	fmt.Println(start, end, sum)
}